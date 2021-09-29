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
            let nuevaFicha = new Ficha(imgFicha, jugador, inicioX, inicioY, ctx, colorImg)
            nuevaFicha.drawFicha(inicioX, inicioY)
            this.fichas.push(nuevaFicha);
            cantFichas++;
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
    onMouseMove(e) {
        if (isMouseDown && ultimaFichaClickeada != null) {
            //if layerX layerY == algunapostablero
            ultimaFichaClickeada.setPosition(e.layerX, e.layerY);
            this.drawFichasYTablero();
        }
    }

    onMouseUp(e) {
        isMouseDown = false;
    }

    drawFichasYTablero() {
        this.clearCanvas();
        this.drawTablero();
        this.drawFichas();
        this.drawUserName();
    }
    drawFichas() {
        for (let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].renderizar();
        }
    }
    drawTablero() {
        this.tablero.dibujarTablero(ctx, canvas, imgTablero, this.col, this.fil);
    }
    drawUserName(jugador, x, y){
        this.ctx.fillStyle = "black"; 
        this.ctx.font = "bold 25px Arial"; 
        this.ctx.fillText(jugador, x, y);
    }
    clearCanvas() {
        this.ctx.fillStyle = "#FFFFFF"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

}