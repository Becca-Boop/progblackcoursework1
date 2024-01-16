const express = require('express');
//const bodyParser = require('body-parser');
const app = express()

const fs = require('fs');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({encoded: true}));



const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(8090, () => {
    console.log('listening on port %s...', server.address().port);
});

app.use(express.static(__dirname + '/public'));

//http://127.0.0.1:8090/w?game=1/w?character=FreddyFazbear
app.get('/characters/w', async function(req,  resp){
    //const characterss = require('./routes/index.html')(app, fs);
    const requestURL = "https://raw.githubusercontent.com/Becca-Boop/progblackcoursework1/main/data/characters.json";

    const request = new Request(requestURL);
    //const request = new Request('../data/characters.json');

    const response = await fetch(request);
    const gamesText = await response.text();

    const games = JSON.parse(gamesText);
    //const games = JSON.parse('/data/characters.json');
    resp.send(req.params);
    const characters = games.characters;
    var actualresponse = 'lara';

    for (const character of characters){
        console.log(req.query.character);
        if (character.name == req.query.character){
            actualresponse = ('${character.name} \n${character.paragraph} \nBehaviour: ${character.behaviour}');
        }
    }
    resp.send(actualresponse);
})


//http://127.0.0.1:8090/
app.get('/', function(req, resp){
    resp.send('Hello');
});

//http://127.0.0.1:8090/index
app.get('/index', async function(req, resp){
    const requestURL = "https://raw.githubusercontent.com/Becca-Boop/progblackcoursework1/main/data/characters.json";

    const request = new Request(requestURL);
    //const request = new Request('../data/characters.json');

    const response = await fetch(request);
    const gamesText = await response.text();

    const JSONgames = JSON.parse(gamesText);
    //resp.send(JSONgames[0]["games"][0]["characters"][0]["characterName"]);
    //resp.send(JSONgames[0]);
    console.log(`${JSONgames}`)
    //const games = JSON.parse('/data/characters.json');
    const characters = JSONgames.games[0].characters;
    var actualresponse = '';

    //resp.send(JSONgames.games[0].characters[0].characterName);
    //resp.send(`${character}`)

    for (const character of characters){
        console.log(`${character.characterName}`);
        actualresponse = actualresponse + (`<h2>${character.characterName}</h2> <p>${character.description}</p> <p>Behaviour: ${character.behaviour}</p>`);
    }
    //resp.send(actualresponse);
    resp.send(`<!DOCTYPE html> <html lang="en"><head> <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Five Nights At Freddy\'s Character Guide</title> </head><body><h1>Five Nights At Freddy\'s Character Guide</h1>${actualresponse}<div id = "root"></div><script src="routes.js" defer></script></body></html>`)
});

//http://127.0.0.1:8090/users/34/books/8989
app.get('/users/:userId/books/:bookId', function(req, resp){
    resp.send(req.params)
});

//http://127.0.0.1:8090/users/34/books/8989
app.get('/:name&email', function(req, resp){
    resp.send(req.params)
});


//http://127.0.0.1:8090/w?person=Lara
app.get('/w', function(req, resp){
    resp.send(req.query.person)
});

app.post('/new', function(req,resp){
    
    //resp.write
});


