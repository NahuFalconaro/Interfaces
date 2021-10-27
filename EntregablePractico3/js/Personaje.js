class Personaje {

    constructor(personaje, img) {
        this.pj = personaje;
        this.imgPj = img;
        this.iniciarAvatar();
    }
    esconderAvatar() {
        this.pj.classList.add("hidden");
    }
    mostrarAvatar() {
        this.pj.classList.remove("hidden");
    }

    //Crea el avatar
    iniciarAvatar() {
        this.pj.style.background = "url(" + this.imgPj + "/Running/SpriteSheetRunning.png)"
        this.pj.style.backgroundRepeat = "no-repeat";
    }
    detenerAvatar() {
        this.pj.style.animationPlayState = "paused";
    }

    //Crea la animacion de agachar 
    agacharAvatar() {
        this.pj.style.background = "url(" + this.imgPj + "/Sliding/Sliding.png) no-repeat";
        this.pj.style.backgroundPositionY = '0px';
        this.pj.style.height = '113px';
        this.pj.style.top = '550px';
        this.pj.style.width = '148px';
        this.pj.style.animationName = "";
    }

    //Crea la animacion de saltar 
    saltarAvatar() {
        this.pj.style.animationName = "salto";
        this.pj.style.background = "url(" + this.imgPj + "/JumpStart/salto.png)";
        this.pj.style.animationDuration = "0.5s";
        this.pj.style.animationTimingFunction = "linear";
        this.pj.style.animationIterationCount = "forward";
        this.pj.style.height = '131px'
        this.pj.style.width = '90px';
        this.pj.style.top = '425px'
    }

    //Crea la animacion de correr 
    moverAvatar() {
        this.pj.style.animationName = "walkRight";
        this.pj.style.height = '131px'
        this.pj.style.width = '148px';
        this.pj.style.top = '530px'
        this.pj.style.background = "url(" + this.imgPj + "/Running/SpriteSheetRunning.png) no-repeat"
        this.pj.style.animationDuration = ".8s";
        this.pj.style.animationTimingFunction = "steps(11)";
        this.pj.style.animationIterationCount = "infinite";
    }

    //Crea la animacion de agachar el personaje
    morir() {
        this.pj.style.background = "url(" + this.imgPj + "/Dying/MuerteAire.png) no-repeat";
        this.pj.style.animationName = "";
        this.pj.style.height = '131px'
        this.pj.style.width = '148px';
    }
}