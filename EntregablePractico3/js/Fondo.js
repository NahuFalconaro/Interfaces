class Fondo {
    constructor(fondos) {
        this.fondos = fondos
    }

    detenerFondo() {
        this.fondos.forEach((f) => {
            // f.style.animationDuration = "0s";
            f.style.animationPlayState = "paused";
        })
    }

    iniciarFondo() {
        this.fondos.forEach((f) => {
            f.style.backgroundSize = '1080px';
            f.style.backgroundRepeat = 'repeat-x'
            f.style.animationTimingFunction = "linear";
            f.style.animationIterationCount = "infinite"
            f.style.animationPlayState = "initial";
        })
    }

    moverFondoIzquierda() {
        let i = 9;
        fondos.forEach((f) => {
            f.style.animationPlayState = "initial";
            f.style.animationName = "moveBackgroundLeft";

            f.style.animationDuration = "" + i + "s";
            i--;
        })
    }
}