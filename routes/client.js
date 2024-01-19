var buttonNum = 9

async function fetchchar(event) {
    try {
        let response = await fetch('http://127.0.0.1:8090/index1');
        if(response.ok){
        let jsonbody = await response.json();
        let body = JSON.parse(JSON.stringify(jsonbody));
        document.getElementById("para").innerHTML=body;
        var image = document.getElementById("titleimage");
        image.src = "images/titlesmall.png";
        } else{
            alert("Error: 404");
        }
    } catch(e) {
        alert(e);
    }
};

async function character(game) {
    deleteparagraphs()
    try {
        let response = await fetch(`http://127.0.0.1:8090/${game}`);
        if(response.ok){
            let json = await response.json();
            let numcharacters = parseInt(JSON.parse(json));
            var image = document.getElementById("titleimage");
            image.src = "images/titlesmall.png";
            buttoncolorchange(game);
            deletecharacterbuttons();
            for(let i = 0; i<numcharacters;i++){
                getcharacters(game, i);
            };

        } else{
        alert("Error: 404");
    }
    } catch(e) {
        alert(e);
    }
};

async function getcharacters(game, character){
    try {
        let response = await fetch(`http://127.0.0.1:8090/${game}/${character}`);
        if(response.ok){
            let jsonbody = await response.json();
            let body = JSON.parse(JSON.stringify(jsonbody));
            
            buttonNum += 1;
            //const selection = document.querySelector("newbuttons")
            const selection = document.querySelector("section")

            const newButton = document.createElement('button');
            newButton.id = `${buttonNum}`;
            newButton.textContent = body;
            newButton.dataset.gameid = game;
            newButton.dataset.characterid = character
            let thisgame = game;
            let thischaracter = character;
            //newButton.onclick = getcharacterinformation(game, character);
            console.log(`${thisgame} , ${thischaracter}`)
            newButton.addEventListener('click', () => {
                deleteparagraphs()
                getcharacterinformation(newButton.dataset.gameid,newButton.dataset.characterid);
            });
            selection.appendChild(newButton);
            //document.body.appendChild(newButton);


        }
        else{
            alert("Error: 404")
        }
    } catch(e) {
        alert(e);
    }
}

function buttoncolorchange(id) {
    var button1 = document.getElementById(id);
    button1.style.color = "whitesmoke";
    button1.style.backgroundColor = "#051834";
    for (let i = 1; i<10;i++){
        if(i!= id){
            var button2 = document.getElementById(i);
            button2.style.backgroundColor = "whitesmoke"
            button2.style.color = "#051834";
        }
    }
}

function deletecharacterbuttons() {
    var buttons = document.querySelectorAll('button');
    var countbuttons = buttons.length;

    if(countbuttons>9){
        var extrabuttons = countbuttons -= 9;
        for (let i = 1; i<=extrabuttons; i++){
            const byebyebutton = document.getElementById(i+9);
            byebyebutton.remove();
        }
        buttonNum = 9;
    };
};

function deleteparagraphs() {
    const selection = document.querySelector("section")
    while (selection.firstChild != null) {
        selection.removeChild(selection.firstChild);
    }
};

async function getcharacterinformation(game, character){
    console.log(`function sent http://127.0.0.1:8090/${game}/${character}`);

    try {

        let response1 = await fetch(`http://127.0.0.1:8090/${game}/${character}`);
        if(response1.ok){
            let jsonbody = await response1.json();
            let body = JSON.parse(JSON.stringify(jsonbody));
            const selection = document.querySelector("section")
            const mypara1 = document.createElement("p");
            mypara1.textContent = body;
            selection.appendChild(mypara1);
        }
        else{
            alert("Error: 404")
        }
        let response2 = await fetch(`http://127.0.0.1:8090/${game}/${character}/description`);
        if(response2.ok){
            let jsonbody = await response2.json();
            let body = JSON.parse(JSON.stringify(jsonbody));
            console.log(body);
            const selection = document.querySelector("section")
            const mypara1 = document.createElement("p");
            mypara1.textContent = body;
            selection.appendChild(mypara1);
        }
        else{
            alert("Error: 404")
        }
        let response3 = await fetch(`http://127.0.0.1:8090/${game}/${character}/behaviour`);
        if(response3.ok){
            let jsonbody = await response3.json();
            let body = JSON.parse(JSON.stringify(jsonbody));
            console.log(body);
            const selection = document.querySelector("section")
            const mypara1 = document.createElement("p");
            mypara1.textContent = body;
            selection.appendChild(mypara1);
        }
        else{
            alert("Error: 404")
        }
    } catch(e) {
        alert(e);
    }
};
