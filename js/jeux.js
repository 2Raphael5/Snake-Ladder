document.querySelector("#lancerDice").addEventListener("click",rollDice);
let joueurAJouer = 0;

const caseSpecial = [
    new CaseSpecial(2,true,2),
    new CaseSpecial(3,true,3),
    new CaseSpecial(4,false,16),
    new CaseSpecial(5,true,2),
    new CaseSpecial(7,true,2),
    new CaseSpecial(13,true,2),
    new CaseSpecial(17,true,2),
    new CaseSpecial(19,true,2),
    new CaseSpecial(23,true,2),
    new CaseSpecial(27,true,2),
    new CaseSpecial(29,true,2),
    new CaseSpecial(31,true,2),
    new CaseSpecial(37,true,2),
    new CaseSpecial(39,false,45),
    new CaseSpecial(41,true,2),
    new CaseSpecial(42,false,22),
    new CaseSpecial(43,true,2),
    new CaseSpecial(47,true,2),
    new CaseSpecial(49,false,68),
    new CaseSpecial(53,true,2),
    new CaseSpecial(59,true,2),
    new CaseSpecial(61,true,2),
    new CaseSpecial(71,true,2),
    new CaseSpecial(73,true,2),
    new CaseSpecial(79,true,2),
    new CaseSpecial(83,true,2),
    new CaseSpecial(89,true,2),
    new CaseSpecial(97,true,2),
];

function rollDice(event){
    const button = event.target;
    button.disabled = true;
    let nombre = Math.trunc(Math.random() * 6) + 1;
    document.querySelector("#dice").src = "img/De/dé"+nombre+".png";
    const playerActuel = listePlayers[joueurAJouer];
    playerActuel.chercheCase = true;
    while(playerActuel.chercheCase){
        let nbPlayerMemeCase = 0;
        listePlayers.forEach(element => {
            if (element !== playerActuel && playerActuel.caseActuel + nombre === element.caseActuel) {
                nbPlayerMemeCase++;
            }
        });
        if (nbPlayerMemeCase > 0) {
            nombre++;
        } else {
            playerActuel.chercheCase = false;
        }
    }
    let td = document.querySelectorAll("td");
    td.forEach(value => {
        if(value.dataset.number == playerActuel.caseActuel){
            value.innerHTML = `${playerActuel.caseActuel}`;
        }
        if(value.dataset.number == playerActuel.caseActuel + nombre){
            value.innerHTML = `${playerActuel.caseActuel + nombre}  ${playerActuel.affichage()}`;
        }
    });
    playerActuel.deplacement(playerActuel.caseActuel + nombre);
    finTour(button);
}

function finTour(button){
    joueurAJouer++;
    if(joueurAJouer > listePlayers.length - 1){
        joueurAJouer = 0;
    }
    button.disabled = false;

    document.querySelector("#TourJoueur").innerHTML = `C'est à ${listePlayers[joueurAJouer].pseudo} de jouer`;
}

function startGame(){
    console.log(listePlayers[joueurAJouer]);
    document.querySelector("#TourJoueur").innerHTML = `C'est à ${listePlayers[joueurAJouer].pseudo} de jouer`;
}
