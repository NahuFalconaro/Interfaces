class Tablero {
    constructor(x, y, ctx, canvas, img) {
        this.matrizTablero = [];
        this.maxX = x;
        this.maxY = y
        this.inicMatriz();
        this.img = img;
        this.imgTablero = new Image();
        this.dibujarTablero(ctx, canvas, img)
    }

    inicMatriz() {
        for (let i = 0; i < this.maxX; i++) {
            matrizTablero[i] = [];
            for (let j = 0; j < this.maxY; j++) {
                matrizTablero[i][j] = null;
            }
        }
    }

    dibujarTablero(ctx, canvas, img) {

        if (this.imgTablero.src === "") {
            this.imgTablero.src = img;
            let cargarImagen = function () {
                ctx.drawImage(this.imgTablero, canvas.width / 2 - this.imgTablero.width / 2, 50);
            }
            this.imgTablero.onload = cargarImagen.bind(this);
        } else {
            ctx.drawImage(this.imgTablero, canvas.width / 2 - this.imgTablero.width / 2, 50);
        }
    }

    addFicha(x, y, ficha) {
        this.matrizTablero[x][y] = ficha;
    }

    hayEnLinea() {

    }
    busquedaVertical() { }
    busquedaHorizontal() { }
    busquedaDiagonal() { }


}



