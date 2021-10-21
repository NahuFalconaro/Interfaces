class Obstaculo {


    constructor() {
        this.coordenadas = {};
        this.height = 0;
        this.width = 0;
    }


    create() {
        let obstaculo = document.createElement("div");
        obstaculo.classList.toggle("obstaculo");
        obstaculo.style.width = "200px";
        obstaculo.style.height = "400px";
        document.body.appendChild(obstaculo);
    }

}