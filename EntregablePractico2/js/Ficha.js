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
        let imgX = x - 36;
        let imgY = y - 36;
        ctx.beginPath();
        ctx.arc(x, y, 36, 0, 2 * Math.PI);
        let imagen = new Image();
        imagen.src = this.img;
        imagen.onload = function (){
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, 36, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            console.log(imagen.width)
            ctx.drawImage(imagen, imgX, imgY, 70, 70);

            ctx.beginPath();
            ctx.arc(x, y, 36, 0, 2 * Math.PI);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
        }
        ctx.strokeStyle = "#FFFFFF0"
        ctx.stroke();
    }
}



   


    