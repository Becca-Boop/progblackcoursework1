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
    resp.send(JSONgames["games"][0]["characters"][0]["characterName"]);
    console.log('${games}')
    //const games = JSON.parse('/data/characters.json');
    const characters = games.characters;
    var actualresponse = 'lara';

    for (const character of characters){
        console.log('${character.name}');
        actualresponse = actualresponse + ('${character.name} \n${character.paragraph} \nBehaviour: ${character.behaviour}');
    }
    //resp.send(actualresponse);
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


