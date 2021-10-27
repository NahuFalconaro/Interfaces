class Fondo {
    constructor(layers) {
        this.layers = layers;
        this.fondos = document.querySelectorAll('.bgmove');
    }

    detenerFondo() {
        this.fondos.forEach((f) => {
            // f.style.animationDuration = "0s";
            f.style.animationPlayState = "paused";
        })
    }

    iniciarFondo() {
        let i = 0;
        this.fondos.forEach((f) => {
            f.style.background = 'url(' + layers[i] + ') ';
            f.style.backgroundSize = '1080px 720px';
            f.style.backgroundRepeat = 'repeat-x';
            f.style.animationTimingFunction = "linear";
            f.style.animationIterationCount = "infinite"
            f.style.animationPlayState = "initial";
            i++;
        })
    }

    moverFondoIzquierda() {
        let i = 9;
        this.fondos.forEach((f) => {
            f.style.animationPlayState = "initial";
            f.style.animationName = "moveBackgroundLeft";
            f.style.animationDuration = "" + i + "s";
            i = i - 1.3;
        })
    }
}