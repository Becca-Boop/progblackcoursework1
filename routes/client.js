// window.addEventListener('click', async function(event){
//     try{
//         let response = await fetch('http://127.0.0.1:8090');
//         let body = await response.text()
//         this.document.getElementById('content').innerHTML=body
//     } catch(e) {
//         this.alert(e);
//     }
// });

var html = `<!DOCTYPE html> <html lang="en"><head> <meta charset="UTF-8"><link rel="stylesheet" href="styles.css"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Five Nights At Freddy\'s Character Guide</title> </head><body><h1>Five Nights At Freddy\'s Character Guide</h1><div id = "root"></div><script type="text/javascript" src="routes.js"></script></body></html>`
var html1 = `<!DOCTYPE html> <html lang="en"><head> <meta charset="UTF-8"><link rel="stylesheet" href="styles.css"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Five Nights At Freddy\'s Character Guide</title> </head><body><h1>Five Nights At Freddy\'s Character Guide</h1>`;
var html2 = `<div id = "root"></div><script type="text/javascript" src="routes/routes.js"></script></body></html>`;
var first = `initial text`;

async function populate2(content){
    if (content == 'initial'){

    }
    else{
        const JSONgames = JSON.parse(content);
        const characters = JSONgames.games[0].characters;
        var actualresponse = '';

        for (const character of characters){
            actualresponse = actualresponse + (`<h2>${character.characterName}</h2> <p>${character.description}</p> <p>Behaviour: ${character.behaviour}</p>`);
        }
        return html1 + actualresponse + html2


    }
};

async function populate(content) {
    console.log(content);
    if (content == 'initial'){
        const myArticle = document.createElement("article");
        const header = document.querySelector("header");
        console.log(first);
        const init = first;
        const mypara = document.createElement("h1");
        mypara.textContent = 'hello lara';
        //myArticle.appendChild(mypara);
        header.appendChild(mypara);
        console.log('here');

    }
    else {

    }

    // const response = await fetch(request);
    // const gamesText = await response.text();

    // const games =JSON.parse(gamesText);
    // populateHeader(games);
    // populateCharacters(games);
}

window.onload = () => {
    const myArticle = document.createElement("article");
    //const header = document.querySelector("header");
    console.log(header);
    const init = first;
    const mypara = document.createElement("h2");
    mypara.textContent = 'hello lara';
    //myArticle.appendChild(mypara);
    const para = document.getElementById(1);
    para.appendChild(mypara);
    console.log('here');}

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

// window.onload = (event) => {
//     async function populate() {


//         const response = await fetch(request);
//         const gamesText = await response.text();

//         const games =JSON.parse(gamesText);
//         populateHeader(games);
//         populateCharacters(games);
//     }

//     function populateHeader(obj){
//         const header = document.querySelector("header");
//         const myH1 = document.createElement("h1");
//         myH1.textContent = obj.gamename;
//         header.appendChild(myH1);

//         const mypara = document.createElement("p");
//         mypara.textContent = 'Entry: ${obj.gamenumber}';
//         header.appendChild(mypara);
//     }

//     function populateCharacters(obj){
//         const selection = document.querySelector("section")
//         const characters = obj.characters;

//         for (const character of characters){
//             const myArticle = document.createElement("article");
//             const myH2 = document.createElement("H2");
//             const mypara1 = document.createElement("p");
//             const mypara2 = document.createElement("p");

//             myH2.textContent = character.name;
//             mypara1.textContent = character.paragraph;
//             mypara2.textContent = 'Behaviour: ${character.behaviour}';

//             myArticle.appendChild(myH2);
//             myArticle.appendChild(mypara1);
//             myArticle.appendChild(mypara2);

//             selection.appendChild(myArticle);
//         }
//     }
//     populate();
// };

// functionfreddy(){
    
// };

async function fetchchar(event) {
    //const response = await fetch(request);
    //const movies = await response.json();

    // fetch('http://127.0.0.1:8090/index1')
    // .then(response => response.text())
    // .then(body => document.getElementById(1).innerHTML=body)
    // .catch((error) => alert (error))
    try {
    let response = await fetch('http://127.0.0.1:8090/index1');
    if(response.ok){
    let jsonbody = await response.json();
    let body = JSON.parse(jsonbody);
    document.getElementById(1).innerHTML=body;
    } else{
        alert("Error: 404");
    }
    } catch(e) {
        alert(e);
    }
};

