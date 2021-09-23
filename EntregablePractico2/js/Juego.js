class Juego {

    constructor(jugador1, jugador2, maxTime, x, y, ctx, canvas, imgTablero, imgFicha1, imgFicha2, col, fil) {
        this.tablero = new Tablero(x, y, ctx, canvas, imgTablero);
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.turno = jugador1;

        //this.timer = setTimeout(tiempoTerminado(), maxTime * 1000);
        this.nuevasFichas(col, fil, ctx, imgFicha1,imgFicha2);
    }

    nuevasFichas(col, fil,ctx, imgFicha1, imgFicha2) {
        this.ponerFichas(col, fil, imgFicha1, 50, 100, this.jugador1)
        this.ponerFichas(col, fil, imgFicha2, 1200, 100, this.jugador2)
    }

    ponerFichas(col, fil, imgFicha, inicioX, inicioY, jugador) {
        let i = 0;
        let cantFichas = 0;
        for (let y = inicioY; cantFichas < ((col * fil) / 2); y += 85) {
            for (let x = inicioX; i < 4; x += 80) {
                let nuevaFicha = new Ficha(imgFicha, jugador)
                nuevaFicha.drawFicha(x, y, ctx)
                cantFichas++;
                i++;
            }
            i = 0;
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






}