let obstaculos = ["../img/obstaculoTierra.png", "../img/obstaculoAire.png"];

class Obstaculo {


    constructor() {
        this.coordenadas = {};
        this.height = 0;
        this.width = 0;
        this.img = "url(" + obstaculos[Math.floor(Math.random() * 2)] + ") repeat-x";
    }


    create() {
        let obstaculo = document.createElement("div");
        if (this.img == "url(../img/obstaculoTierra.png) repeat-x") {
            obstaculo.classList.add("obstaculoTierra");
        } else
        if ((this.img == "url(../img/obstaculoAire.png) repeat-x")) {
            obstaculo.classList.add("obstaculoAire");

        }
        obstaculo.style.background = this.img;
        obstaculo.id = "obstaculo";
        this.id = obstaculo;
        let divFondo = document.getElementById("fondo5");
        divFondo.appendChild(obstaculo);
    }
    esconderObstaculo() {
        this.id.classList.add("hidden");
    }
    mostrarObstaculo() {
        this.id.classList.remove("hidden");
    }

    detenerObstaculo(id) {
        id.style.animationPlayState = 'paused';
    }
    moverObstaculo(id) {
        id.style.animationPlayState = 'running';
    }

    borrarObstaculo() {
        let node = document.getElementById("obstaculo");
        node.parentNode.removeChild(node);
    }



}