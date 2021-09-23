class Ficha {

    constructor(img, jugador) {
        this.img = img;
        this.pertenece = jugador;
    }

    setPertenece(jugador) {
        this.pertenece = jugador
    }
    getPertenece() {
        return this.pertenece;
    }

    drawFicha(x, y, ctx) {
        ctx.beginPath();
        ctx.arc(x, y, 36, 0, 2 * Math.PI);
        ctx.strokeStyle = "#FFFFFF0"
            //despues falta poner con imagen
        ctx.stroke();
    }
}