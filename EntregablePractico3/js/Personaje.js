class Personaje {

    constructor(personaje, img) {
        this.pj = personaje;
        this.imgPj = img;
        this.height = 0;
        this.width = 0;
        this.iniciarAvatar();
    }

    iniciarAvatar() {
        this.pj.style.background = this.imgPj;
        this.pj.style.backgroundRepeat = "no-repeat";
    }
    detenerAvatar() {
        this.pj.style.animationPlayState = "paused";
    }

    agacharAvatar() {
        this.pj.style.background = "url(../img/Angel1/Sliding/0_Fallen_Angels_Sliding_001.png)";
        this.pj.style.backgroundPositionX = '-10px';
        this.pj.style.backgroundPositionY = '-60px';
        this.pj.style.height = '120px'
        this.pj.style.top = '450px'
        this.pj.style.width = '110px';
        this.pj.style.animationName = "";
    }

    saltarAvatar() {
        this.pj.style.animationName = "salto";
        this.pj.style.background = "url(../img/Angel1/Running/0_Fallen_Angels_Running_008.png)";
        this.pj.style.animationDuration = "0.5s";
        this.pj.style.animationTimingFunction = "linear";
        this.pj.style.animationIterationCount = "forward";
    }

    moverAvatar() {
        this.pj.style.animationName = "walkRight";
        this.pj.style.width = '90px';
        this.pj.style.top = '420px'
        this.pj.style.background = this.imgPj;
        this.pj.style.animationDuration = ".8s";
        this.pj.style.animationTimingFunction = "steps(11)";
        this.pj.style.animationIterationCount = "infinite";

    }
}