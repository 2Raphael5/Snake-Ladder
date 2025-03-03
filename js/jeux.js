document.querySelector("#lancerDice").addEventListener("click",rollDice); 
function rollDice(){
    let nombre = Math.trunc(Math.random() * 6) + 1;
    document.querySelector("#dice").src = "img/De/dé"+nombre+".png";
}