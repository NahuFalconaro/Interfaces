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
        return this.busquedaVertical(posX, posY, jugador) || this.busquedaHorizontal(posY, jugador) || this.busquedaDiagonal(posX, posY, jugador);
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
        return  this.busquedaIzqInferiorADerSuperior(posX, posY, jugador) || this.busquedaIzqSuperiorADerInferior(posX, posY, jugador);
    }
    busquedaIzqSuperiorADerInferior(posX, posY, jugador) {

        let posInicial = {
            x: posX,
            y: posY,
        }
        
        while (posInicial.x > 0 && posInicial.y > 0) {
            posInicial.x--;
            posInicial.y--;
        }
        let cont = 0;
        while ( posInicial.x <= this.fil && posInicial.y <= this.col) {
            if (this.matrizTablero[posInicial.y][ posInicial.x] == jugador) {
                cont++
                if (cont == 4)
                    return true;
            } else{
                cont = 0;
            }
                posInicial.x++;
                posInicial.y++;
            
        }
        return false
    }
    busquedaIzqInferiorADerSuperior(posX, posY, jugador) {
        let posInicial = {
            x: posX,
            y: posY,
        }
        console.log(posInicial.x, posInicial.y)
        console.table(this.matrizTablero);
         let cont = 0;

         while((posInicial.x >= 0) && (posInicial.y <= this.fil - 1)){
            //  console.log(posInicial.x + "col" + this.col);
            //  console.log(posInicial.y + "fil" + this.fil);
             if (this.matrizTablero[posInicial.y][posInicial.x] == jugador) {
                cont++
                console.log(cont)
                 if(cont==4){
                     return true;
                 }

             }else{
                 cont=0;
             }
             posInicial.x--;
             posInicial.y++;
         }
    }
}