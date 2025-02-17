class Player {
    caseActuel;
    lienImg;
    pseudo;

    constructor(lienImg,pseudo) {
        this.caseActuel = 0;
        this.lienImg = lienImg;
        this.pseudo = pseudo
    }

    deplacement(nouvelleCase) {
        this.caseActuel = nouvelleCase;
    }

    affichage() {
        return `<img src="${this.lienImg}">`;
    }
}