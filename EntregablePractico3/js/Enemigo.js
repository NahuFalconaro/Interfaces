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
    detenerEnemigo() {
        this.pj.style.animationPlayState = "paused";
    }
    iniciarEnemigo() {
        this.pj.style.background = this.imgPj;
        this.pj.style.animationName = "walkRight";
        this.pj.style.animationDuration = ".8s";
        this.pj.style.animationTimingFunction = "steps(11)";
        this.pj.style.animationIterationCount = "infinite";
    }
}