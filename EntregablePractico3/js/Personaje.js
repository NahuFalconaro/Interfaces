class Personaje {

    constructor(personaje, img) {
        this.pj = personaje;
        this.imgPj = img;
        this.height = 0;
        this.width = 0;
        this.iniciarAvatar();
    }
    esconderAvatar() {
        this.pj.classList.add("hidden");
    }
    mostrarAvatar() {
        this.pj.classList.remove("hidden");
    }

    iniciarAvatar() {
        this.pj.style.background = "url(" + this.imgPj + "/Running/SpriteSheetRunning.png)"
        this.pj.style.backgroundRepeat = "no-repeat";
    }
    detenerAvatar() {
        this.pj.style.animationPlayState = "paused";
    }

    agacharAvatar() {
        this.pj.style.background = "url(" + this.imgPj + "/Sliding/Sliding.png) no-repeat";
        this.pj.style.backgroundPositionY = '0px';
        this.pj.style.height = '113px';
        this.pj.style.top = '445px';
        this.pj.style.width = '148px';
        this.pj.style.animationName = "";
    }

    saltarAvatar() {
        this.pj.style.animationName = "salto";
        this.pj.style.background = "url(" + this.imgPj + "/JumpStart/salto.png)";
        this.pj.style.animationDuration = "0.5s";
        this.pj.style.animationTimingFunction = "linear";
        this.pj.style.animationIterationCount = "forward";
        this.pj.style.backgroundPositionX = '0px';
        this.pj.style.backgroundPositionY = '0px';
        this.pj.style.height = '131px'
        this.pj.style.width = '90px';
        this.pj.style.top = '425px'
    }

    moverAvatar() {
        this.pj.style.animationName = "walkRight";
        this.pj.style.backgroundPositionX = '0px';
        this.pj.style.backgroundPositionY = '0px';
        this.pj.style.height = '131px'
        this.pj.style.width = '148px';
        this.pj.style.top = '425px'
        this.pj.style.background = "url(" + this.imgPj + "/Running/SpriteSheetRunning.png) no-repeat"
        this.pj.style.animationDuration = ".8s";
        this.pj.style.animationTimingFunction = "steps(11)";
        this.pj.style.animationIterationCount = "infinite";

    }
}