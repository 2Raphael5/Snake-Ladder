class Player {
    caseActuel;
    nomImage;

    constructor(lienImg) {
        this.caseActuel = 0;
        this.lienImg = lienImg;
    }

    deplacement(nouvelleCase) {
        this.caseActuel = nouvelleCase;
    }

    affichage() {
        return `<img src="img/${this.nomImage}.png">`;
    }
}