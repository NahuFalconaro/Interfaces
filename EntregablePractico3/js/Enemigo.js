class Enemigo {

    constructor(personaje, img) {
        this.pj = personaje;
        this.imgPj = img;
        this.iniciarEnemigo();
    }
    esconderEnemigo() {
        this.pj.classList.add("hidden");
    }
    mostrarEnemigo() {
            this.pj.classList.remove("hidden");
        }
        //Detiene la animacion
    detenerEnemigo() {
            this.pj.style.animationPlayState = "paused";
        }
        //Setea la imagen al enemigo y la animacion de caminar
    iniciarEnemigo() {
        this.pj.style.background = this.imgPj;
        this.pj.style.animationName = "walkRight";
        this.pj.style.animationDuration = ".8s";
        this.pj.style.animationTimingFunction = "steps(11)";
        this.pj.style.animationIterationCount = "infinite";
        this.pj.style.animationPlayState = "initial";
    }
}