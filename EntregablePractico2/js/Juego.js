var ultimaFichaClickeada = null;
var isMouseDown = false;
class Juego {

    constructor(jugador1, jugador2, maxTime, x, y, ctx, canvas, imgTablero, imgFicha1, imgFicha2, col, fil, colorImg1, colorImg2) {
        this.tablero = new Tablero(x, y, ctx, canvas, imgTablero, col, fil);
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.turno = jugador1;
        this.fichas = [];
        this.ctx = ctx;
        this.canvas = canvas;
        this.col = col;
        this.fil = fil;
        this.posiciones = [];
        //this.posiciones = this.completarPosiciones()
        //this.timer = setTimeout(tiempoTerminado(), maxTime * 1000);
        this.drawUserName(jugador1, 105, 400);
        this.drawUserName(jugador2, 1250, 400);
        this.nuevasFichas(col, fil, ctx, imgFicha1, imgFicha2, colorImg1, colorImg2);
    }

    nuevasFichas(col, fil, ctx, imgFicha1, imgFicha2, colorImg1, colorImg2) {
        this.ponerFichas(col, fil, imgFicha1, 125, 500, this.jugador1, colorImg1)
        this.ponerFichas(col, fil, imgFicha2, 1300, 500, this.jugador2, colorImg2)
    }

    ponerFichas(col, fil, imgFicha, inicioX, inicioY, jugador, colorImg) {
        let i = 0;
        let cantFichas = 0;
        let mitadTotalFichas = (col * fil) / 2;
        for (let y = inicioY; cantFichas < mitadTotalFichas; y++) {
            let nuevaFicha = new Ficha(i, imgFicha, jugador, inicioX, inicioY, ctx, colorImg)
            nuevaFicha.drawFicha(inicioX, inicioY)
            this.fichas.push(nuevaFicha);
            cantFichas++;
            i++;
        }
    }

    setJugador1(jugador1) {
        this.jugador1 = jugador1;
    }

    setJugador2(jugador2) {
        this.jugador2 = jugador2;
    }

    setTurno(jugador) {
        this.turno = jugador;
    }

    reiniciarJuego() {
        tablero.vaciar();
        mostrarPopUp(); //para elegir color de ficha etc
    }

    mostrarPopUp() {

    }

    buscarFichaClickeada(x, y) {
        for (let i = 0; i < this.fichas.length; i++) {
            let f = this.fichas[i];
            if (f.isPointInside(x, y)) {
                return f;
            }
        }
    }

    ponerFicha(x, y, ficha) {
        this.tablero.addFicha(x, y, ficha)
        checkear4EnLinea();
    }

    checkearSiAlguienGano() {
        if (tablero.hayEnLinea()) {
            return mostrarGanador(turno)
        }
    }

    mostrarGanador() {

    }

    onMouseDown(e) {
        isMouseDown = true;

        if (ultimaFichaClickeada != null) {
            ultimaFichaClickeada.setResaltado(false); //a la ultima figura seleccionada, le saca el resaltado
            ultimaFichaClickeada = null;
        }

        let clickFicha = this.buscarFichaClickeada(e.layerX, e.layerY);
        if (clickFicha != null) {
            clickFicha.setResaltado(true); //la resalto
            ultimaFichaClickeada = clickFicha;
        }
        this.drawFichasYTablero();
    }

    //Checkea si la ficha arrastrada esta dentro del tablero
    cursorEnTablero(e, widthMax, heightMax, minWidth) {

        return (e.layerX >= minWidth && e.layerX <= widthMax && e.layerY >= 0 && e.layerY <= heightMax)
    }
    completarPosiciones() {
        this.posiciones = []
        let posInicial = 500; //se cambia por el valor inicial del tablero, con la funcion getPosInicialTablero
        for (let i = 0; i < this.col; i++) {
            let pos = {
                posI: posInicial,
                posF: posInicial + 70
            }
            this.posiciones.push(pos)
            posInicial += 75
        }
    }


    onMouseMove(e) {
        if (isMouseDown && ultimaFichaClickeada != null) {

            ultimaFichaClickeada.setPosition(e.layerX, e.layerY);
            this.drawFichasYTablero();
        }
    }

    getPosX(e) {
        for (let x = 0; x < this.posiciones.length; x++) {
            if ((e.layerX >= this.posiciones[x].posI) && (e.layerX <= this.posiciones[x].posF)) {

                return x;
            }
        }
    }
    getPosY(posX) {
        let matrizTablero = this.tablero.getMatrizTablero();
        for (let i = this.fil - 1; i >= 0; i--) {
            if (matrizTablero[i][posX] == null) {
                return i;
            }
        }
        return -1 // todas las posiciones en Y estan ocupadas
    }
    onMouseUp(e) {
        isMouseDown = false;
        this.completarPosiciones();
        let heightMax = this.tablero.getHeight();
        let widthMax = this.tablero.getWidth() + this.tablero.getPosComienzoTableroX();
        let minWidth = this.tablero.getPosComienzoTableroX();
        if (this.cursorEnTablero(e, widthMax, heightMax, minWidth)) {
            let posX = this.getPosX(e) //devuelve una posicion del arreglo a partir de la posicion del cursor
            let posY = this.getPosY(posX) //devuelve una posicion para Y checkeando la cantidad de fichas que hay colocadas en la matriz
            if (posY != -1) { //si no hay posiciones ocupadas
                this.tablero.colocarFichaMatriz(posX, posY, ultimaFichaClickeada.getPertenece())
                this.colocarFicha(posX, posY); //esto es para el canvas 
                //  if (this.checkearSiAlguienGano){
                //      this.mostrarGanador
                //  }
            }
        }
    }
     
    colocarFicha(x, y) {
        let medidasCelda = this.tablero.getMedidasImgTablero()
        let valorX = this.posiciones[x];
        valorX = (valorX.posI + valorX.posF)/2;
        let posX = valorX + 3;
        console.log(medidasCelda.height * y)
        let posY = (this.tablero.getPosComienzoTableroY() + (y * medidasCelda.height)) + 37;
        let newFicha = new Ficha(ultimaFichaClickeada.getId(), ultimaFichaClickeada.getImg(), ultimaFichaClickeada.getPertenece(), posX, posY, ultimaFichaClickeada.getCtx(), ultimaFichaClickeada.getColor());
        let result = this.arrayRemove(this.fichas, ultimaFichaClickeada);
        this.fichas = result;
        this.fichas.push(newFicha);
        newFicha.setResaltado(false);
        
        //newFicha.drawFicha(posX, posY);
        this.drawFichasYTablero()
    }
    arrayRemove(arr, value) {

        return arr.filter(function(ele) {
            return (ele.getId() != value.getId()) || (ele.getPertenece() != value.getPertenece());
        });
    }

    drawFichasYTablero() {
        this.clearCanvas();
        //pintarBackground
        this.drawTablero();
        this.drawFichas();
        //pintar boton de resetGame
        //pintar timer
        this.drawUserName(jugador1, 105, 400);
        this.drawUserName(jugador2, 1250, 400);
    }
    drawFichas() {
        for (let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].renderizar();
        }
    }
    drawTablero() {
        this.tablero.dibujarTablero(ctx, canvas, imgTablero, this.col, this.fil);
    }
    drawUserName(jugador, x, y) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 25px Arial";
        this.ctx.fillText(jugador, x, y);
    }
    clearCanvas() {
        this.ctx.fillStyle = "#FFFFFF"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

}