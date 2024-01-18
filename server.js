const express = require('express');
//const bodyParser = require('body-parser');
const app = express()

const fs = require('fs');

const cors = require('cors');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({encoded: true}));



const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(8090, () => {
    console.log('listening on port %s...', server.address().port);
});

app.use(express.static('routes'));
app.use(express.static('data'));
//app.set('data', require('./data/data.js'));
app.set('jsondata', require('./data/characters.json'));


//http://127.0.0.1:8090/index1
app.get('/index1', async function(req, resp){
    const data = req.app.get('jsondata');

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


app.get('/:game/:character', async function(req,resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games

    for (const thisgame of JSONgames){
        if (thisgame.id == req.params['game']){
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters){
                if(thischaracter.id == req.params['character']){
                    const foundcharacter = thischaracter
                    const json = JSON.stringify(foundcharacter.characterName);
                    resp.send(json);
                }
            }
        }
    }
});

app.get('/:game/:character:/info', async function(req,resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games

    for (const thisgame of JSONgames){
        if (thisgame.id == req.params['game']){
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters){
                if(thischaracter.id == req.params['character']){
                    const foundcharacter = thischaracter
                    const whichinfo = req.parems['info'];
                    const json = JSON.stringify(foundcharacter.whichinfo);
                    resp.send(json);
                }
            }
        }
    }
});

// app.get('/:game', async function(req,resp){
//     const data = req.app.get('jsondata');
//     const JSONgames = data.games;

//     for (const thisgame of JSONgames){
//         if (thisgame.id == req.params['game']){
//             resp.send(JSON.stringify(thisgame.name))
//         };
//     };
// });

app.get('/:game', async function(req,resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games;
    var i = 0;

    for (const thisgame of JSONgames){
        if (thisgame.id == req.params['game']){
            for(const character of thisgame.characters){
                i++;
            };
        };
    };
    resp.send(JSON.stringify(i));
});

app.get('/character/:character', async function(req,resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    //const JSONgames = JSON.parse(data);

    const characters = data.games[0].characters;


    for (const character of characters){
        if (character.id == req.params['character']){
            resp.send(JSON.stringify(character.description));
        }
    }

    //const json = JSON.stringify(characters[0].characterName)
    //const json = JSON.stringify(character.description);
    //resp.send(json);
});

app.get('/w', async function(req, resp){
    app.use(cors());
    const data = req.app.get('jsondata');

    const JSONgames = JSON.parse(data);

    //req.query.person

    const characters = data.games[0].characters;
    var actualresponse = '';

    for (const character of characters){
        if (JSON.parse(character.characterName) == req.query.name){
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
