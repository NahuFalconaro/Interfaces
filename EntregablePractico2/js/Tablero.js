class Tablero {
    constructor(x, y, ctx, canvas, img, col, fil) {
        this.matrizTablero = [];
        this.maxX = x;
        this.maxY = y
        this.inicMatriz();
        this.img = img;
        this.imgTablero = new Image();
        this.dibujarTablero(ctx, canvas, img, col, fil)
    }

    inicMatriz() {
        for (let i = 0; i < this.maxX; i++) {
            matrizTablero[i] = [];
            for (let j = 0; j < this.maxY; j++) {
                matrizTablero[i][j] = null;
            }
        }
    }

    dibujarTablero(ctx, canvas, img, col, fil) {
        let posX = 500;
        let posY = 100;
        if (this.imgTablero.src === "") {
            this.imgTablero.src = img;
            let cargarImagen = function() {
                for (let x = 0; x < fil; x++) {
                    for (let y = 0; y < col; y++) {
                        ctx.drawImage(this.imgTablero, posX, posY, 75, 72);
                        posX += 75;
                    }
                    posX = 500;
                    posY += 72;
                }
                posY = 100;
            }
            this.imgTablero.onload = cargarImagen.bind(this);
        } else {
            for (let x = 0; x < fil; x++) {
                for (let y = 0; y < col; y++) {
                    ctx.drawImage(this.imgTablero, posX, posY, 75, 72);
                    posX += 75;
                }
                posX = 500;
                posY += 72;
            }
            posY = 100;
        }
    }

    addFicha(x, y, ficha) {
        this.matrizTablero[x][y] = ficha;
    }

    hayEnLinea() {

    }
    busquedaVertical() {}
    busquedaHorizontal() {}
    busquedaDiagonal() {}


}