class Coleccionable {
    constructor() {}

    //Crea un div para el coleccionable y se le asigna una clase que tiene animaciones
    create() {
            let coleccionable = document.createElement("div");
            coleccionable.classList.add("coleccionable");
            coleccionable.style.background = "url(img/Coleccionable1.png) no-repeat";
            coleccionable.id = "coleccionable";
            this.id = coleccionable;
            let upOrDown = Math.floor(Math.random() * 2)
            if (upOrDown == 1) {
                coleccionable.style.top = "470px";
            } else {
                coleccionable.style.top = "560px"
            }
            let divFondo = document.getElementById("fondo5");
            divFondo.appendChild(coleccionable);
        }
        //Muestra el coleccionable sacandole la class hidden
    mostrarColeccionable() {
            this.id.classList.remove("hidden");
        }
        //Detiene la animacion del coleccionable
    detenerColeccionable(id) {
        id.style.animationPlayState = 'paused';
    }

    borrarColeccionable() {
        let node = document.getElementById("coleccionable");
        node.parentNode.removeChild(node);
    }

    //Reanuda la animacion de coleccionable
    moverColeccionable(id) {
            id.style.animationPlayState = 'running';
        }
        //Agrega la animacion al coleccionable al agarrarlo
    animar() {
        this.id.classList.add("animacionColeccionable")
    }

}