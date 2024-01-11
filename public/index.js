var para1 = document.getElementById("para1");
var para2 = document.getElementById("para2");
function changeImage() {
    var inp = document.getElementById("inp");
    var enteredText = inp.value;
    para1.innerText = enteredText + ", This text is changed using the innerText property. ";
    para2.innerHTML = " <u> " + enteredText + " </u> " + ", <b> This text is changed using the <em> innerHTML </em> property. <b> <br> ";
    image1.parentNode.removeChild(image1);

}

var image1 = document.getElementById("titleimage");
function larafunction() {
    image1.src = "images/titlesmall.png";
}

function homescreen() {
    image1.src = "images/title.png";
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
            //button2.style.backgroundColor = "whitesmoke"
        }
    }
}

function fnaf1(id) {
    larafunction()
    buttoncolorchange(id)
}



function fnaf2(id) {
    larafunction()
    buttoncolorchange(id)
}

function fnaf3(id) {
    larafunction()
    buttoncolorchange(id)
}

function fnaf4(id) {
    larafunction()
    buttoncolorchange(id)
}

function sisterlocation(id) {
    larafunction()
    buttoncolorchange(id)
}

function pizzariasimulator(id) {
    larafunction()
    buttoncolorchange(id)
}

function helpwanted(id) {
    larafunction()
    buttoncolorchange(id)
}

function securitybreach(id) {
    larafunction()
    buttoncolorchange(id)
}

function helpwanted2(id) {
    larafunction()
    buttoncolorchange(id)
}