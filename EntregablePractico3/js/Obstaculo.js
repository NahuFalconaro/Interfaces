class Obstaculo {


    constructor() {
        this.coordenadas = {};
        this.height = 0;
        this.width = 0;
        this.img = "url(../img/photoroom-removebg-preview.png) repeat-x";
    }


    create() {
        let obstaculo = document.createElement("div");
        obstaculo.classList.toggle("obstaculo");
        obstaculo.style.background = this.img;
        obstaculo.id = "obstaculo";
        this.id = obstaculo.id;
        let divFondo = document.getElementById("fondo5");
        divFondo.appendChild(obstaculo);
    }

    detenerObstaculo(id) {
        id.style.animationPlayState = 'paused';
    }


}