class Juego {

    constructor(jugador1, jugador2, maxTime, x, y, ctx, canvas, imgTablero, imgFicha, col, fil) {
        this.tablero = new Tablero(x, y, ctx, canvas, imgTablero);
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.turno = jugador1;
        //this.timer = setTimeout(tiempoTerminado(), maxTime * 1000);
        this.nuevasFichas(col, fil, ctx, imgFicha);
    }

    nuevasFichas(col, fil, img) {
        this.ponerFichas(col, fil, img, 200, 200, this.jugador1)
        this.ponerFichas(col, fil, img, 1500, 200, this.jugador2)
    }

    ponerFichas(col, fil, img, inicioX, inicioY, jugador) {
        let i = 0;
        let cantFichas = 0;
        for (let y = inicioY; cantFichas < ((col * fil) / 2); y += 100) {
            for (let x = inicioX; i < 3; x += 100) {
                let nuevaFicha = new Ficha(img, jugador)
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