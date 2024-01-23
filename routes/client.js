let buttonNum = 9;

async function character (game) { // eslint-disable-line
    deleteparagraphs();
    deleteintro();
    try {
        const response = await fetch(`http://127.0.0.1:8090/${game}`);
        if (response.ok) {
            const json = await response.json();
            const numcharacters = parseInt(JSON.parse(json));
            const image = document.getElementById('titleimage');
            image.src = 'images/titlesmall.png';
            buttoncolorchange(game);
            deletecharacterbuttons();
            for (let i = 0; i < numcharacters; i++) {
                getcharacters(game, i);
            };
        } else {
        alert('Error: 404');
    }
    } catch (e) {
        alert(e);
    }
};

async function getcharacters (game, character) {
    try {
        const response = await fetch(`http://127.0.0.1:8090/${game}/${character}`);
        if (response.ok) {
            const jsonbody = await response.json();
            const body = JSON.parse(JSON.stringify(jsonbody));

            buttonNum += 1;
            deleteparagraphs();
            const selection = document.getElementById('characterbuttons');
            const newButton = document.createElement('button');
            newButton.id = `${buttonNum}`;
            newButton.textContent = body;
            newButton.dataset.gameid = game;
            newButton.dataset.characterid = character;
            const thisgame = game; // eslint-disable-line
            const thischaracter = character; // eslint-disable-line
            newButton.addEventListener('click', () => {
                deleteparagraphs();
                buttoncolorchange(newButton.dataset.gameid);
                buttoncolorchange(newButton.id);
                getcharacterinformation(newButton.dataset.gameid, newButton.dataset.characterid);
            });
            selection.appendChild(newButton);
        } else {
            alert('Error: 404');
        }
    } catch (e) {
        alert(e);
    }
}

function buttoncolorchange (id) {
    if (id != -1) {
        const button1 = document.getElementById(id);
        button1.style.color = 'whitesmoke';
        button1.style.backgroundColor = '#051834';
    }
    if (id > 9) {
        for (let i = 10; i < buttonNum + 1; i++) {
            if (i != id) {
                const button2 = document.getElementById(i);
                button2.style.backgroundColor = 'whitesmoke';
                button2.style.color = '#051834';
            }
        }
    } else {
        for (let i = 1; i < 10; i++) {
            if (i != id) {
                const button2 = document.getElementById(i);
                button2.style.backgroundColor = 'whitesmoke';
                button2.style.color = '#051834';
            }
        }
    }
}

function deletecharacterbuttons () {
    const buttons = document.querySelectorAll('button');
    let countbuttons = buttons.length;

    if (countbuttons > 9) {
        const extrabuttons = countbuttons -= 9;
        for (let i = 1; i <= extrabuttons; i++) {
            const byebyebutton = document.getElementById(i + 9);
            byebyebutton.remove();
        }
        buttonNum = 9;
    };
};

function deleteparagraphs () {
    const selection = document.getElementById('characterdescriptions');
    while (selection.firstChild != null) {
        selection.removeChild(selection.firstChild);
    }
};

function deleteintro () {
    const selection = document.getElementById('intro');
    while (selection.firstChild != null) {
        selection.removeChild(selection.firstChild);
    }
}

async function getcharacterinformation (game, character) {
    const selection = document.getElementById('characterdescriptions');
    const mypara1 = document.createElement('p');
    mypara1.textContent = 'Waiting For Server';
    selection.appendChild(mypara1);
    try {
        const response1 = await fetch(`http://127.0.0.1:8090/${game}/${character}/info`);
        if (response1.ok) {
            deleteparagraphs();
            const jsonbody = await response1.json();
            const body = JSON.parse(JSON.stringify(jsonbody));

            for (let i = 0; i < body.length; i++) {
                const selection = document.getElementById('characterdescriptions');
                const mypara1 = document.createElement('p');
                mypara1.textContent = body[i];
                selection.appendChild(mypara1);
            };
        } else {
            alert('Error: 404');
        }
    } catch (e) {
        alert(e);
    }
};

async function Search () { // eslint-disable-line
    searchtext = document.getElementById('searchtext').value; // eslint-disable-line
    const image = document.getElementById('titleimage');
    image.src = 'images/titlesmall.png';
    const selection = document.getElementById('characterdescriptions');
    const mypara1 = document.createElement('p');
    mypara1.textContent = 'Waiting For Server';
    selection.appendChild(mypara1);
    buttoncolorchange(-1);
    deletecharacterbuttons();
    deleteintro();
    try {
        const response = await fetch(`http://127.0.0.1:8090/search/${searchtext}`); // eslint-disable-line
        if (response.ok) {
            const jsonbody = await response.json();
            const body = JSON.parse(JSON.stringify(jsonbody));
            if (body.length == 1 && body[0] == 'no results') {
                const selection = document.getElementById('characterdescriptions');
                const mypara1 = document.createElement('p');
                deleteparagraphs();
                mypara1.textContent = `No Search Results For '${searchtext}'`; // eslint-disable-line
                selection.appendChild(mypara1);
            } else {
                for (let i = 0; i < body.length; i++) {
                    SearchCharacterName(body[i]);
                };
            }
        } else {
        alert('Error: 404');
    }
    } catch (e) {
        alert(e);
    }
};

async function SearchCharacterName (name) {
    try {
        const response = await fetch(`http://127.0.0.1:8090/charactergame/${name}`);
        if (response.ok) {
            deleteparagraphs();
            const jsonbody = await response.json();
            const body = JSON.parse(JSON.stringify(jsonbody));
            getcharacters(body[0], body[1]);
        } else {
        alert('Error: 404');
    }
    } catch (e) {
        alert(e);
    }
}
