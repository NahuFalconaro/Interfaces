class Obstaculo {


    constructor() {
        this.coordenadas = {};
        this.height = 0;
        this.width = 0;
        this.img = "url(../img/obstaculoTierra.png) repeat-x";
    }


    create() {
        let obstaculo = document.createElement("div");
        obstaculo.classList.toggle("obstaculo");
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



}