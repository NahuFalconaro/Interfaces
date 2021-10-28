let obstaculos = ["img/obstaculoTierra.png", "img/obstaculoAire.png"];

class Obstaculo {


    constructor() {
        //Genera un obstaculo random a partir de un arreglo
        this.img = "url(" + obstaculos[Math.floor(Math.random() * 2)] + ") repeat-x";
    }

    //Crea el div para el obstaculo
    create() {
        let obstaculo = document.createElement("div");
        if (this.img == "url(img/obstaculoTierra.png) repeat-x") {
            obstaculo.classList.add("obstaculoTierra");
        } else
        if ((this.img == "url(img/obstaculoAire.png) repeat-x")) {
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

    //Detiene la animacion del obstaculo.
    detenerObstaculo(id) {
        id.style.animationPlayState = 'paused';
    }

    //Activa la animacion del obstaculo.
    moverObstaculo(id) {
        id.style.animationPlayState = 'running';
    }

    //Elimina el obstaculo.
    borrarObstaculo() {
        let node = document.getElementById("obstaculo");
        node.parentNode.removeChild(node);
    }



}