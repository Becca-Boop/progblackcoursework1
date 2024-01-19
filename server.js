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

app.get('/:game/:character/description', async function(req,resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games

    for (const thisgame of JSONgames){
        if (thisgame.id == req.params['game']){
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters){
                if(thischaracter.id == req.params['character']){
                    const foundcharacter = thischaracter
                    const json = JSON.stringify(foundcharacter.description);
                    resp.send(json);
                }
            }
        }
    }
});

app.get('/:game/:character/behaviour', async function(req,resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games

    for (const thisgame of JSONgames){
        if (thisgame.id == req.params['game']){
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters){
                if(thischaracter.id == req.params['character']){
                    const foundcharacter = thischaracter
                    const json = JSON.stringify(foundcharacter.behaviour);
                    resp.send(json);
                }
            }
        }
    }
});

app.get('/:game/:character/image', async function(req,resp){
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games

    for (const thisgame of JSONgames){
        if (thisgame.id == req.params['game']){
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters){
                if(thischaracter.id == req.params['character']){
                    const foundcharacter = thischaracter
                    const json = JSON.stringify(foundcharacter.image);
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
    //const JSONgames = JSON.parse(data);

    const characters = data.games[0].characters;


    for (const character of characters){
        if (character.id == req.params['character']){
            resp.send(JSON.stringify(character.description));
        }
    }
});


