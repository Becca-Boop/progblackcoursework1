const { request } = require("express");

//document.write('<html><body><h2>HTML</h2></body></html>');

const characterRoutes = (app, fs) => {
    async function populate() {
        const requestURL = "https://raw.githubusercontent.com/Becca-Boop/progblackcoursework1/main/data/characters.json";

        const request = new Request(requestURL);
        //const request = new Request('../data/characters.json');

        const response = await fetch(request);
        const gamesText = await response.text();

        const games =JSON.parse(gamesText);
        populateHeader(games);
        populateCharacters(games);
    }

    function populateHeader(obj){
        const header = document.querySelector("header");
        const myH1 = document.createElement("h1");
        myH1.textContent = obj.gamename;
        header.appendChild(myH1);

        const mypara = document.createElement("p");
        mypara.textContent = 'Entry: ${obj.gamenumber}';
        header.appendChild(mypara);
    }

    function populateCharacters(obj){
        const selection = document.querySelector("section")
        const characters = obj.characters;

        for (const character of characters){
            const myArticle = document.createElement("article");
            const myH2 = document.createElement("H2");
            const mypara1 = document.createElement("p");
            const mypara2 = document.createElement("p");

            myH2.textContent = character.name;
            mypara1.textContent = character.paragraph;
            mypara2.textContent = 'Behaviour: ${character.behaviour}';

            myArticle.appendChild(myH2);
            myArticle.appendChild(mypara1);
            myArticle.appendChild(mypara2);

            selection.appendChild(myArticle);
        }
    }
    // if (typeof window !== "undefined") {
    //     res.send(populate());
    // }
    populate();
};

module.exports = characterRoutes;