const express = require('express');
//const bodyParser = require('body-parser');
const app = express()

const fs = require('fs');

const cors = require('cors');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({encoded: true}));



//const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(8090, () => {
    console.log('listening on port %s...', server.address().port);
});

app.use(express.static('routes'));
app.use(express.static('data'));
//app.set('data', require('./data/data.js'));
app.set('jsondata', require('./data/characters.json'));


//http://127.0.0.1:8090/index1
// app.get('/index1', async function(req, resp){
//     const data = req.app.get('jsondata');

//     //const JSONgames = JSON.parse(data);

//     const characters = data.games[0].characters;
//     var actualresponse = '';

//     // for (const character of characters){
//     //     actualresponse = actualresponse + (`<h2>${character.characterName}</h2> <p>${character.description}</p> <p>Behaviour: ${character.behaviour}</p>`);
//     // }
//     //const json = JSON.stringify(characters[0].characterName)
//     const wholecharacter = JSON.stringify(characters[0].characterName + `\n` + characters[0].description + `\n` + characters[0].behaviour);
//     const json = JSON.stringify(wholecharacter);
//     resp.send(json);
// });


app.get('/search/:searchtxt', async function(req, resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games
    //const space = new RegExp(`\+|(%20)`);
    const space = new RegExp('%20');

    const search = req.params['searchtxt'].toLowerCase();
    search.replaceAll((space, "g"), ' ')

    var jsonObj = [];
    for (const thisgame of JSONgames){
        const thisgamecharacters = thisgame.characters;
        for (const thischaracter of thisgamecharacters){
            if(thischaracter.characterName.toLowerCase().search(search) != -1){
                const foundcharacter = thischaracter;
                //json = `${json} ${foundcharacter.characterName}`;
                jsonObj.push(foundcharacter.characterName);
            }
        }
    }
    if (jsonObj.length < 1){
        jsonObj.push("no results");
    }
    resp.send(JSON.stringify(jsonObj));
});

app.get('/charactergame/:name', async function(req, resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games
    //const space = new RegExp(`\+|(%20)`);
    const space = new RegExp('%20');

    const charactername = req.params['name'];
    charactername.replaceAll((space, "g"), ' ')

    var jsonObj = [];
    for (const thisgame of JSONgames){
        const thisgamecharacters = thisgame.characters;
        for (const thischaracter of thisgamecharacters){
            if(thischaracter.characterName == charactername){
                const foundcharacter = thischaracter;
                //json = `${json} ${foundcharacter.characterName}`;
                jsonObj.push(thisgame.id ,foundcharacter.id);
            }
        }
    }
    resp.send(JSON.stringify(jsonObj));
});

app.get('/:game/:character/info', async function(req, resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games;

    var jsonObj = [];
    for (const thisgame of JSONgames){
        if(thisgame.id == req.params['game']){
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters){
                if(thischaracter.id == req.params['character']){
                    const foundcharacter = thischaracter;
                    //json = `${json} ${foundcharacter.characterName}`;
                    jsonObj.push(foundcharacter.characterName, foundcharacter.description, foundcharacter.behaviour);
                }
            }
        }
    }
    resp.send(JSON.stringify(jsonObj));
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
    const characters = data.games[0].characters;
    for (const character of characters){
        if (character.id == req.params['character']){
            resp.send(JSON.stringify(character.description));
        }
    }
});
