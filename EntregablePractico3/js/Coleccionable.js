class Coleccionable{
    constructor(){
    }

    create(){
        let coleccionable = document.createElement("div");
        coleccionable.classList.add("coleccionable");
        coleccionable.style.background = "url(../img/Coleccionable1.png) no-repeat";
        coleccionable.id = "coleccionable";
        this.id = coleccionable;
        let upOrDown = Math.floor(Math.random()*2)
        if (upOrDown == 1){
            coleccionable.style.top = "470px";
        }else{
            coleccionable.style.top = "560px"
        }
        let divFondo = document.getElementById("fondo5");
        divFondo.appendChild(coleccionable);
    }

    mostrarColeccionable() {
        this.id.classList.remove("hidden");
    }

    detenerColeccionable(id) {
        id.style.animationPlayState = 'paused';
    }

    borrarColeccionable() {
        this.id.classList.add("hidden");
        let node = document.getElementById("coleccionable");
        node.parentNode.removeChild(node);
    }

    moverColeccionable(id){
        id.style.animationPlayState = 'running';
    }

}