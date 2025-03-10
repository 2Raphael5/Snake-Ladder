const button = document.querySelector("#lancerDice");
button.addEventListener("click", rollDice);
document.querySelectorAll(".reponse").forEach((span) => {
    span.addEventListener("click", repondre)
});
let joueurAJouer = 0;
let questions = [];
let idQuestionActuel = -1;

fetch('./json/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
    })
    .catch(error => console.error('Erreur :', error));
const caseSpecial = [
    new CaseSpecial(2, true, 2),
    new CaseSpecial(3, true, 3),
    new CaseSpecial(4, false, 16),
    new CaseSpecial(5, true, 5),
    new CaseSpecial(7, true, 7),
    new CaseSpecial(13, true, 13),
    new CaseSpecial(17, true, 17),
    new CaseSpecial(19, true, 19),
    new CaseSpecial(23, true, 23),
    new CaseSpecial(27, false, 48),
    new CaseSpecial(29, true, 29),
    new CaseSpecial(31, true, 31),
    new CaseSpecial(37, true, 37),
    new CaseSpecial(39, false, 45),
    new CaseSpecial(41, true, 41),
    new CaseSpecial(42, false, 22),
    new CaseSpecial(43, true, 43),
    new CaseSpecial(47, true, 47),
    new CaseSpecial(49, false, 68),
    new CaseSpecial(53, true, 53),
    new CaseSpecial(54, false, 85),
    new CaseSpecial(56, false, 26),
    new CaseSpecial(59, true, 59),
    new CaseSpecial(61, true, 61),
    new CaseSpecial(62, false, 81),
    new CaseSpecial(64, false, 46),
    new CaseSpecial(69, false, 50),
    new CaseSpecial(71, true, 71),
    new CaseSpecial(73, true, 73),
    new CaseSpecial(76, false, 96),
    new CaseSpecial(79, true, 79),
    new CaseSpecial(83, true, 83),
    new CaseSpecial(87, false, 68),
    new CaseSpecial(89, true, 89),
    new CaseSpecial(97, true, 97),
    new CaseSpecial(98, false, 25),
];

function rollDice(event) {
    button.disabled = true;

    let nombre = Math.trunc(Math.random() * 6) + 1;
    
    document.querySelector("#dice").src = "img/De/dé" + nombre + ".png";
    deplacement(nombre);
}

function finTour() {
    joueurAJouer++;
    if (joueurAJouer > listePlayers.length - 1) {
        joueurAJouer = 0;
    }
    button.disabled = false;
    document.querySelector("#TourJoueur").innerHTML = `C'est à ${listePlayers[joueurAJouer].pseudo} de jouer`;
}

function startGame() {
    console.log(listePlayers[joueurAJouer]);
    document.querySelector("#TourJoueur").innerHTML = `C'est à ${listePlayers[joueurAJouer].pseudo} de jouer`;
}


function repondre(event) {
    const span = event.target;
    let questionActuel = null;
    questions.forEach((question) => {
        if (question.id == idQuestionActuel) {
            questionActuel = question;
        }
    });

    let test = "reponse" + questionActuel.reponse;
    if (test == span.id) {
        deplacement(3);
        finTour();
    }
    else {
        finTour();
    }
    document.querySelector("#questionDiv").className = "invisible";
    questions.splice(idQuestionActuel, 1);
}


function deplacement(nombre) {
    const playerActuel = listePlayers[joueurAJouer];
    let nouvellePosition = playerActuel.caseActuel + nombre;

    let caseOccupee = listePlayers.some(player => player !== playerActuel && player.caseActuel === nouvellePosition);

    while (caseOccupee) {
        nouvellePosition++;
        caseOccupee = listePlayers.some(player => player !== playerActuel && player.caseActuel === nouvellePosition);
    }

    if (nouvellePosition === 100) {
        alert(`${playerActuel.pseudo} a gagné !`);
        return;
    } else if (nouvellePosition > 100) {
        nouvellePosition = 100 - (nouvellePosition - 100);
    }

    let td = document.querySelectorAll("td");
    td.forEach(value => {
        if (value.dataset.number == playerActuel.caseActuel) {
            value.innerHTML = `${playerActuel.caseActuel}`;
        }
        if (value.dataset.number == nouvellePosition) {
            value.innerHTML = `${nouvellePosition}  ${playerActuel.affichage()}`;
        }
    });

    playerActuel.deplacement(nouvellePosition);

    let caseSpecifique = caseSpecial.find(c => c.position === nouvellePosition);

    if (caseSpecifique) {
        if (caseSpecifique.estQuestion) {
            if (questions.length > 0) {    
                document.querySelector("#questionDiv").className = "visible";

                let random = Math.floor(Math.random() * questions.length);
                let question = questions[random];

                document.querySelector("#question").innerHTML = question.question;
                document.querySelector("#reponse1").innerHTML = question.listeResponse.reponse1;
                document.querySelector("#reponse2").innerHTML = question.listeResponse.reponse2;
                document.querySelector("#reponse3").innerHTML = question.listeResponse.reponse3;
                document.querySelector("#reponse4").innerHTML = question.listeResponse.reponse4;

                idQuestionActuel = question.id;
            } else {
                finTour();
                alert("Plus de question disponible");
            }
        } else {
            nouvellePosition = caseSpecifique.arrive;
            let td = document.querySelectorAll("td");
            td.forEach(value => {
                if (value.dataset.number == playerActuel.caseActuel) {
                    value.innerHTML = `${playerActuel.caseActuel}`;
                }
                if (value.dataset.number == nouvellePosition) {
                    value.innerHTML = `${nouvellePosition}  ${playerActuel.affichage()}`;
                }
            });
            playerActuel.deplacement(nouvellePosition);
            finTour();
            return;
        }
    }
    else{
        finTour();
    }
}



