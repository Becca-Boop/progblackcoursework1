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

app.use(express.static('routes'));
app.set('data', require('./data/data.js'));

//app.set('styles', require('./routes/styles.css'));



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

//http://127.0.0.1:8090/index1
app.get('/index1', async function(req, resp){
    const data = req.app.get('data');

    //const JSONgames = JSON.parse(data);

    const characters = data.games[0].characters;
    var actualresponse = '';

    // for (const character of characters){
    //     actualresponse = actualresponse + (`<h2>${character.characterName}</h2> <p>${character.description}</p> <p>Behaviour: ${character.behaviour}</p>`);
    // }
    //const json = JSON.stringify(characters[0].characterName)
    const wholecharacter = JSON.stringify(characters[0].characterName + `\n` + characters[0].description + `\n` + characters[0].behaviour);
    const json = JSON.stringify(wholecharacter);
    resp.send(json);
});

app.get('/1', async function(req, resp){
    const data = req.app.get('data');

    //const JSONgames = JSON.parse(data);

    const characters = data.games[0].characters;
    var actualresponse = '';

    // for (const character of characters){
    //     actualresponse = actualresponse + (`<h2>${character.characterName}</h2> <p>${character.description}</p> <p>Behaviour: ${character.behaviour}</p>`);
    // }
    //const json = JSON.stringify(characters[0].characterName)
    const json = JSON.stringify(characters[0].description);
    resp.send(json);
});

app.get('/w', async function(req, resp){
    const data = req.app.get('data');

    const JSONgames = JSON.parse(data);

    //req.query.person

    const characters = data.games[0].characters;
    var actualresponse = '';

    for (const character of characters){
        if (JSON.parse(character.characterName) == req.query.name){
            console.log(character.description);
            const json = JSON.stringify(character.description);
        }
    }
    //const json = JSON.stringify(characters[0].characterName)
    resp.send(json);
});

app.get('/index2', async function(req, resp){
    const requestURL = "https://raw.githubusercontent.com/Becca-Boop/progblackcoursework1/main/data/characters.json";

    const request = new Request(requestURL);
    //const request = new Request('../data/characters.json');

    const response = await fetch(request);
    const gamesText = await response.text();

    
    const JSONgames = JSON.parse(gamesText);
    //resp.send(JSONgames[0]["games"][0]["characters"][0]["characterName"]);
    //resp.send(JSONgames[0]);
    //const games = JSON.parse('/data/characters.json');
    const characters = JSONgames.games[0].characters;
    var actualresponse = '';

    //resp.send(JSONgames.games[0].characters[0].characterName);
    //resp.send(`${character}`)

    for (const character of characters){
        actualresponse = actualresponse + (`<h2>${character.characterName}</h2> <p>${character.description}</p> <p>Behaviour: ${character.behaviour}</p>`);
    }
    //resp.send(actualresponse);
    resp.send(`<!DOCTYPE html> <html lang="en"><head> <meta charset="UTF-8"><link rel="stylesheet" href="styles"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Five Nights At Freddy\'s Character Guide</title> </head><body><h1>Five Nights At Freddy\'s Character Guide</h1>${actualresponse}<div id = "root"></div><script type="text/javascript" src="routes/routes.js"></script></body></html>`)
});

app.get('/index3', function(req, resp){
    const data = req.app.get('data');

    const characters = data.games[0].characters;
    var actualresponse = '';

    const json = JSON.stringify(data);
    resp.send(populate2(json));
    
});

//http://127.0.0.1:8090/users/34/books/8989
app.get('/users/:userId/books/:bookId', function(req, resp){
    resp.send(req.params)
});

//http://127.0.0.1:8090/routes/styles.css
// app.get('/routes/styles.css', function(req, resp){
//     resp.send(`body { background-color: #051834;}h1 {color: whitesmoke;}p {color: whitesmoke;} h2{color: whitesmoke;} img {width: 100%;height: auto;}button {background-color:whitesmoke;color: #051834;}`);
// });

//http://127.0.0.1:8090/users/34/books/8989
app.get('/:name&email', function(req, resp){
    resp.send(req.params)
});


//http://127.0.0.1:8090/w?person=Lara
app.get('/wss', function(req, resp){
    resp.send(req.query.person)
});

app.post('/new', function(req,resp){
    
    //resp.write
});


