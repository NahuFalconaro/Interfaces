class Ficha{

    constructor(ctx, img){
        this.ctx = ctx;
        this.img = img;
        this.pertenece = "";
    }

    setPertenece(jugador){
        this.pertenece = jugador
    }
    getPertenece(){
        return this.pertenece;
    }

    drawFicha(x,y){
        //Dibujo un circulo con metodos de canvas.arc
        //Dibujo la imagen arriba de la posicion de la ficha
    }
}