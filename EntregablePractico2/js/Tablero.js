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
    hayEnLinea(posX, posY, jugador) {
        return this.busquedaVertical(posX, posY, jugador) || this.busquedaHorizontal(posY, jugador);
    }
    busquedaVertical(posX, posY, jugador) {
        //posX estatico, posY busca hacia abajo
        let cont = 0;
        for (let y = posY; y < this.fil; y++) {
            if (this.matrizTablero[y][posX] == jugador) {
                cont++;
                if (cont == 4)
                    return true
            } else
                cont = 0
        }

        return false
    }
    busquedaHorizontal(posY, jugador) {
        //posY estatico,posX busca hacia los costados
        //empezando de un borde
        let cont = 0;
        for (let x = 0; x < this.col; x++) {
            if (this.matrizTablero[posY][x] == jugador) {
                cont++;
                if (cont == 4)
                    return true
            } else
                cont = 0
        }

        return false
    }
    busquedaDiagonal(posX, posY, jugador) {
        //dos doble for?
        //arrancado las diagonales desde la pos de la ficha
        //this.busquedaIzqSuperiorADerInferior(posX, posY, jugador)
        //return this.busquedaDerSuperiorAIzqInferior(posX, posY, jugador)
        //this.busquedaIzqInfADerSup(posX, posY, jugador)
    }
    busquedaIzqSuperiorADerInferior(posX, posY, jugador) {
        let posInicial = {
            x: posX,
            y: posY,
        }

        while (posX > 0 && posY > 0) {
            posInicial.x--;
            posInicial.y--;
            posX--;
            posY--;
        }
        let x = posInicial.x;
        let y = posInicial.y;
        let cont = 0;
        while (x <= this.fil && y <= this.col) {
            if (this.matrizTablero[y][x] == jugador) {
                cont++
                if (cont == 4)
                    return true;
            } else
                cont = 0;
            x++;
            y++;
        }
        return false

    }
    busquedaDerSuperiorAIzqInferior(posX, posY, jugador) {
        let cont = 0;
        let posInicial = {
            x: posX,
            y: posY,
        };
        while (posY > 0 && posX < this.col) {
            posInicial.x++;
            posInicial.y--;
        }
        while (posInicial.x >= this.fil && posInicial.y <= this.col) {
            if (this.matrizTablero[y][x] == jugador) {
                cont++;
                console.log(cont)
                if (cont == 4)
                    return true
            } else
                cont = 0
            posInicial.x--;
            posInicial.y++;
        }

        return false
    }
}