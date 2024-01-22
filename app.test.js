'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test the search service', () => {
    test('GET /search/freddy succeeds', () => {
        return request(app)
            .get('/search/freddy')
            .expect(200)
    });
    test('GET /search/freddy returns JSON', () => {
        return request(app)
            .get('/search/freddy')
            .expect('Content-type', /json/);
    });
    test('GET /search/chi succeeds', () => {
        return request(app)
            .get('/search/chi')
            .expect(200)
    });
    test('GET /search/chi returns JSON', () => {
        return request(app)
            .get('/search/chi')
            .expect('Content-type', /json/);
    });
    test('GET /search/lara succeeds', () => {
        return request(app)
            .get('/search/lara')
            .expect(200)
    });
    test('GET /search/lara returns JSON', () => {
        return request(app)
            .get('/search/lara')
            .expect('Content-type', /json/);
    });
    test('GET /search/aloy succeeds', () => {
        return request(app)
            .get('/search/aloy')
            .expect(200)
    });
    test('GET /search/aloy returns JSON', () => {
        return request(app)
            .get('/search/aloy')
            .expect('Content-type', /json/);
    });
});

describe('Test the /charactergame/:name service', () => {
    const characters = [
        ["Freddy Fazbear", [1,0]],
        ["Bonnie The Bunny", [1,1]],
        ["Chica Chicken", [1,2]],
        ["Foxy The Pirate", [1,3]],
        ["Golden Freddy", [1,4]],
        ["Toy Freddy", [2,0]],
        ["Toy Bonnie", [2,1]],
        ["Mangle", [2,2]],
        ["Withered Freddy", [2,3]],
        ["Withered Bonnie", [2,4]],
        ["Withered Chica", [2,5]],
        ["Withered Foxy", [2,6]],
        ["The Puppet", [2,7]],
        ["Balloon Boy", [2,8]],
        ["JJ", [2,9]],
        ["Shadow Freddy", [2,10]],
        ["RWQFSFASXC - 'Shadow Bonnie'", [2,11]],
        ["Springtrap", [3,0]],
        ["Phantom Freddy", [3,1]],
        ["Phantom Foxy", [3,2]],
        ["Phantom Chica", [3,3]],
        ["Phantom Balloon Boy", [3,4]],
        ["Phantom Mangle", [3,5]],
        ["Phantom Puppet", [3,6]],
        ["Nightmare Freddy", [4,0]],
        ["Nightmare Bonnie", [4,1]],
        ["Nightmare Chica", [4,2]],
        ["Nightmare Foxy", [4,3]],
        ["Nightmare Fredbear", [4,4]],
        ["Nightmare", [4,5]],
        ["Plushtrap", [4,6]],
        ["Circus Baby", [5,0]],
        ["Ballora", [5,1]],
        ["Funtime Freddy (and Bon Bon)", [5,2]],
        ["Funtime Foxy", [5,3]],
        ["Ennard", [5,4]],
        ["Bidybab", [5,5]],
        ["Minireena", [5,6]],
        ["Scrap Baby", [6,0]],
        ["William Afton - 'Scraptrap'", [6,1]],
        ["Molten Freddy", [6,2]],
        ["Lefty", [6,3]],
        ["Happy Frog", [7,0]],
        ["Mr Hippo", [7,1]],
        ["Orville Elephant", [7,2]],
        ["Nedd Bear", [7,3]],
        ["Pigpatch", [7,4]],
        ["Rockstar Freddy", [7,5]],
        ["Rockstar Bonnie", [7,6]],
        ["Rockstar Chica", [7,7]],
        ["Rockstar Foxy", [7,8]],
        ["El Chip", [7,9]],
        ["Music Man", [7,10]],
        ["Funtime Chica", [7,11]],
        ["Nightmarionne", [7,12]],
        ["Glitchtrap", [8,0]],
        ["Glamrock Freddy", [9,0]],
        ["Glamrock Chica", [9,1]],
        ["Roxanne Wolf", [9,2]],
        ["Montgomery Gator", [9,3]],
        ["Vanny", [9,4]],
        ["DJ Music Man", [9,5]],
        ["Daycare Attendant", [9,6]],
        ["The Amalgamation", [9,7]],
        ["Burntrap", [9,8]]
    ];
    test.each(characters)('GET /charactergame/all characters succeeds', (str, expected) => {
        return request(app)
            .get(`/charactergame/${str}`)
            .expect(200);
    });
    test.each(characters)('GET /charactergame/all characters succeeds', (str, expected) => {
        return request(app)
            .get(`/charactergame/${str}`)
            .expect('Content-type', /json/);
    });
});

describe('Test the /:game/:character/info service and /:game/:character', () => {
    const characters = [
        [1,0],
        [1,1],
        [1,2],
        [1,3],
        [1,4],
        [2,0],
        [2,1],
        [2,2],
        [2,3],
        [2,4],
        [2,5],
        [2,6],
        [2,7],
        [2,8],
        [2,9],
        [2,10],
        [2,11],
        [3,0],
        [3,1],
        [3,2],
        [3,3],
        [3,4],
        [3,5],
        [3,6],
        [4,0],
        [4,1],
        [4,2],
        [4,3],
        [4,4],
        [4,5],
        [4,6],
        [5,0],
        [5,1],
        [5,2],
        [5,3],
        [5,4],
        [5,5],
        [5,6],
        [6,0],
        [6,1],
        [6,2],
        [6,3],
        [7,0],
        [7,1],
        [7,2],
        [7,3],
        [7,4],
        [7,5],
        [7,6],
        [7,7],
        [7,8],
        [7,9],
        [7,10],
        [7,11],
        [7,12],
        [8,0],
        [9,0],
        [9,1],
        [9,2],
        [9,3],
        [9,4],
        [9,5],
        [9,6],
        [9,7],
        [9,8]
    ]
    test.each(characters)('GET /:game/:character/info service succeeds', (game, character) => {
        return request(app)
            .get(`/${game}/${character}/info`)
            .expect(200)
    });
    test.each(characters)('GET /:game/:character/info service returns JSON', (game, character) => {
        return request(app)
            .get(`/${game}/${character}/info`)
            .expect('Content-type', /json/);
    });
    test.each(characters)('GET /:game/:character/ service succeeds', (game, character) => {
        return request(app)
            .get(`/${game}/${character}`)
            .expect(200)
    });
    test.each(characters)('GET /:game/:character/ service returns JSON', (game, character) => {
        return request(app)
            .get(`/${game}/${character}`)
            .expect('Content-type', /json/);
    });
});

describe('Test the /:game service', () => {
    const characterNums = [
        [1,5],
        [2,13],
        [3,7],
        [4,7],
        [5,7],
        [6,4],
        [7,13],
        [8,1],
        [9,9],
    ]
    test.each(characterNums)('GET /:game succeeds', (game, expected) => {
        return request(app)
            .get(`/${game}`)
            .expect(200)
            .expect('Content-type', /json/);
    });
});