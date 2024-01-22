const express = require('express');
const app = express();

const fs = require('fs'); // eslint-disable-line

const cors = require('cors');

app.use(express.static('routes'));
app.use(express.static('data'));
app.set('jsondata', require('./data/characters.json'));

app.get('/search/:searchtxt', async function (req, resp) {
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games;
    const space = new RegExp('%20'); // eslint-disable-line

    let search = req.params.searchtxt.toLowerCase();
    search = search.replaceAll((space, 'g'), ' ');
    const regsearch = new RegExp(search); // eslint-disable-line

    const jsonObj = [];
    for (const thisgame of JSONgames) {
        const thisgamecharacters = thisgame.characters;
        for (const thischaracter of thisgamecharacters) {
            if (thischaracter.characterName.toLowerCase().search(regsearch) != -1) {
                const foundcharacter = thischaracter;
                jsonObj.push(foundcharacter.characterName);
            }
        }
    }
    if (jsonObj.length < 1) {
        jsonObj.push('no results');
    }
    resp.setHeader('Content-Type', 'applications/json');
    resp.send(JSON.stringify(jsonObj));
});

app.get('/charactergame/:name', async function (req, resp) {
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games;
    const space = new RegExp('%20'); // eslint-disable-line

    const charactername = req.params.name;
    charactername.replaceAll((space, 'g'), ' ');

    const jsonObj = [];
    for (const thisgame of JSONgames) {
        const thisgamecharacters = thisgame.characters;
        for (const thischaracter of thisgamecharacters) {
            if (thischaracter.characterName == charactername) {
                const foundcharacter = thischaracter;
                jsonObj.push(thisgame.id, foundcharacter.id);
            }
        }
    }
    resp.setHeader('Content-Type', 'applications/json');
    resp.send(JSON.stringify(jsonObj));
});

app.get('/:game/:character/info', async function (req, resp) {
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games;

    const jsonObj = [];
    for (const thisgame of JSONgames) {
        if (thisgame.id == req.params.game) {
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters) {
                if (thischaracter.id == req.params.character) {
                    const foundcharacter = thischaracter;
                    jsonObj.push(foundcharacter.characterName, foundcharacter.description, foundcharacter.behaviour);
                }
            }
        }
    }
    resp.setHeader('Content-Type', 'applications/json');
    resp.send(JSON.stringify(jsonObj));
});

app.get('/:game/:character', async function (req, resp) {
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games;

    for (const thisgame of JSONgames) {
        if (thisgame.id == req.params.game) {
            const thisgamecharacters = thisgame.characters;
            for (const thischaracter of thisgamecharacters) {
                if (thischaracter.id == req.params.character) {
                    const foundcharacter = thischaracter;
                    const json = JSON.stringify(foundcharacter.characterName);
                    resp.setHeader('Content-Type', 'applications/json');
                    resp.send(json);
                }
            }
        }
    }
});

app.get('/:game', async function (req, resp) {
    app.use(cors());
    const data = req.app.get('jsondata');
    const JSONgames = data.games;
    let numCharacters = 0;

    for (const thisgame of JSONgames) {
        if (thisgame.id == req.params.game) {
            for (const character of thisgame.characters) { // eslint-disable-line
                numCharacters++;
            };
        };
    };
    resp.setHeader('Content-Type', 'applications/json');
    resp.send(JSON.stringify(numCharacters));
});

module.exports = app;
