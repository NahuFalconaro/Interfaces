class Tablero {
    constructor(x, y, ctx, canvas, img, col, fil) {
        this.matrizTablero = [];
        this.maxX = x;
        this.maxY = y
        this.col = col;
        this.fil = fil;
        this.inicMatriz();
        this.img = img;
        this.heightImg = 72;
        this.widthImg = 75;
        this.imgTablero = new Image();
        this.dibujarTablero(ctx, canvas, img, col, fil)
    }

    inicMatriz() {
        for (let i = 0; i < this.fil; i++) {
            this.matrizTablero[i] = [];
            for (let j = 0; j < this.col; j++) {
                this.matrizTablero[i][j] = null;
            }
        }

    }
    getMedidasImgTablero() {
        let medidas = { height: this.heightImg, width: this.widthImg }
        return medidas;
    }
    getMatrizTablero() {
        return this.matrizTablero;
    }

    dibujarTablero(ctx, canvas, img, col, fil) {
        let posX = 500;
        let posY = 100;
        if (this.imgTablero.src === "") {
            this.imgTablero.src = img;
            let cargarImagen = function() {
                for (let x = 0; x < fil; x++) {
                    for (let y = 0; y < col; y++) {
                        ctx.drawImage(this.imgTablero, posX, posY, this.widthImg, this.heightImg);
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
                    ctx.drawImage(this.imgTablero, posX, posY, this.widthImg, this.heightImg);
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
    getWidth() {
        let width = 0;
        for (let i = 0; i < this.col; i++) {
            width += 75;
        }
        return width;
    }
    getHeight() {
        let height = 0;
        for (let i = 0; i < this.fil; i++) {
            height += 72;
        }
        return height;
    }
    getPosComienzoTableroX() {
        return 500;
    }
    getPosComienzoTableroY() {
        return 100;
    }
    colocarFichaMatriz(x, y, jugador) {

        this.matrizTablero[y][x] = jugador;
    }
}