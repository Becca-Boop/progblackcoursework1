var buttonNum = 9;

async function character(game) {
    deleteparagraphs()
    deleteintro()
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
            //const selection = document.querySelector("div")
            const selection = document.getElementById("characterbuttons");
            const newButton = document.createElement('button');
            newButton.id = `${buttonNum}`;
            newButton.textContent = body;
            newButton.dataset.gameid = game;
            newButton.dataset.characterid = character
            let thisgame = game;
            let thischaracter = character;
            newButton.addEventListener('click', () => {
                deleteparagraphs();
                buttoncolorchange(newButton.id);
                getcharacterinformation(newButton.dataset.gameid,newButton.dataset.characterid);
            });
            selection.appendChild(newButton);
        }
        else{
            alert("Error: 404")
        }
    } catch(e) {
        alert(e);
    }
}

function buttoncolorchange(id) {
    if (id != -1){
        var button1 = document.getElementById(id);
        button1.style.color = "whitesmoke";
        button1.style.backgroundColor = "#051834";
    }
    if (id > 9){
        for (let i = 10; i<buttonNum+1; i++){
            if(i!= id){
                var button2 = document.getElementById(i);
                button2.style.backgroundColor = "whitesmoke"
                button2.style.color = "#051834";
            }
        }
    }
    else{
        for (let i = 1; i<10;i++){
            if(i!= id){
                var button2 = document.getElementById(i);
                button2.style.backgroundColor = "whitesmoke"
                button2.style.color = "#051834";
            }
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
    const selection = document.getElementById("characterdescriptions")
    while (selection.firstChild != null) {
        selection.removeChild(selection.firstChild);
    }
};

function deleteintro() {
    const selection = document.getElementById("intro")
    while(selection.firstChild != null){
        selection.removeChild(selection.firstChild);
    }
}

async function getcharacterinformation(game, character){
    const selection = document.getElementById("characterdescriptions")
    const mypara1 = document.createElement("p");
    mypara1.textContent = "Waiting For Server";
    selection.appendChild(mypara1);
    try {
        let response1 = await fetch(`http://127.0.0.1:8090/${game}/${character}/info`);
        if(response1.ok){
            deleteparagraphs();
            let jsonbody = await response1.json();
            let body = JSON.parse(JSON.stringify(jsonbody));

            for (let i=0; i<body.length; i++){
                const selection = document.getElementById("characterdescriptions")
                const mypara1 = document.createElement("p");
                mypara1.textContent = body[i];
                selection.appendChild(mypara1);
            };
        }
        else{
            alert("Error: 404")
        }
    } catch(e) {
        alert(e);
    }
};


async function Search(){
    searchtext = document.getElementById('searchtext').value;
    var image = document.getElementById("titleimage");
    image.src = "images/titlesmall.png";
    buttoncolorchange(-1);
    deletecharacterbuttons();
    deleteintro();
    deleteparagraphs();
    try {
        let response = await fetch(`http://127.0.0.1:8090/search/${searchtext}`);
        if(response.ok){
            let jsonbody = await response.json();
            let body = JSON.parse(JSON.stringify(jsonbody));
            if(body.length == 1 && body[0] == "no results"){
                const selection = document.getElementById("characterdescriptions")
                const mypara1 = document.createElement("p");
                mypara1.textContent = `No Search Results For '${searchtext}'`;
                selection.appendChild(mypara1);
            }
            else{
                for(let i = 0; i<body.length;i++){
                    SearchCharacterName(body[i]);
                };
            }
        } else{
        alert("Error: 404");
    }
    } catch(e) {
        alert(e);
    }
};

async function SearchCharacterName(name){
    try {
        let response = await fetch(`http://127.0.0.1:8090/charactergame/${name}`);
        if(response.ok){
            let jsonbody = await response.json();
            let body = JSON.parse(JSON.stringify(jsonbody));
            console.log(body[0], body[1]);
            getcharacters(body[0], body[1]);
        } else{
        alert("Error: 404");
    }
    } catch(e) {
        alert(e);
    }
}