document.querySelector("form").addEventListener("submit", submit);
let listePlayers = [];
let nbPlayer = 4;
document.querySelectorAll(".radioButton").forEach(function (element) {
    element.addEventListener("change", changeChecked);
});
document.querySelectorAll("select").forEach(function (element) {
    start(element);
    element.addEventListener("change", changeOption);
});
const players = document.querySelectorAll(".player");

function submit(event) {

    const form = event.target;
    const data = new FormData(form);
    let imgOK = true;
    for (let index = 0; index < nbPlayer; index++) {
        const img = data.get(index+1);
        listePlayers.push(new Player(`./img/${img}.png`, document.querySelector(`#player${index+1}`).value));
    }
    for (let index = 0; index < listePlayers.length; index++) {
        let imgActuel = listePlayers[index].affichage();
        for (let i = 0; i < listePlayers.length; i++) {
            if(i !== index){
                if(imgActuel === listePlayers[i].affichage()){
                    imgOK = false;
                }
            }
        }
    }
    event.preventDefault();
    if(imgOK){
        document.querySelector("form").classList.remove("visible");
        document.querySelector("form").classList.add("invisible");
        document.querySelector("#board").classList.remove("invisible");
        document.querySelector("#board").classList.add("visible");
    }
    else{
        listePlayers = [];
        alert("Au minimum deux joueur on les  même pions");
    }

}

function changeChecked(event) {
    const radio = event.target;
    nbPlayer = radio.value;
    for (let index = 0; index < players.length; index++) {
        if (index < radio.value) {
            players[index].classList.remove("invisible")
            players[index].classList.add("visible")
        }
        else {
            players[index].classList.add("invisible")
            players[index].classList.remove("visible")
        }
    }
}
function changeOption(event) {
    let select = event.target;
    let text = "#img" + select.name;
    let img = document.querySelector(text);
    img.src = "./img/" + select.value + ".png";
}
function start(select) {
    let text = "#img" + select.name;
    let img = document.querySelector(text);
    img.src = "./img/" + select.value + ".png";
}