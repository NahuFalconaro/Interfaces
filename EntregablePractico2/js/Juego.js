let ultimaFichaClickeada = null;
let isMouseDown = false;
class Juego {

    constructor(ctx, canvas) {
            this.tablero = null;
            this.jugador1 = "";
            this.jugador2 = "";
            this.imgFicha1 = "";
            this.imgFicha2 = "";
            this.imgTablero = "";
            this.colorImg1 = "";
            this.colorImg2 = "";
            this.turno = "";
            this.fichas = [];
            this.ctx = ctx;
            this.canvas = canvas;
            this.col = "";
            this.fil = "";
            this.interval = "";
            this.timer = 60 * 3;
            this.posiciones = [];
            this.xEnLinea = "";
        }
        //Invoca los metodos ponerFichas, para dibujar las fichas en las posiciones indicadas
    nuevasFichas(col, fil, ctx, imgFicha1, imgFicha2, colorImg1, colorImg2) {
            this.ponerFichas(col, fil, imgFicha1, 125, 500, this.jugador1, colorImg1)
            this.ponerFichas(col, fil, imgFicha2, 1300, 500, this.jugador2, colorImg2)
        }
        //Dibuja las fichas para un determinado jugador
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
        //Cambia el turno del jugador
    cambiarTurno() {
        if (this.turno == this.jugador1) {
            this.turno = this.jugador2;
        } else {
            this.turno = this.jugador1;
        }
    }


    //Recorre el arreglo de fichas disponibles y busca sobre cual se hizo click.
    buscarFichaClickeada(x, y) {
        for (let i = 0; i < this.fichas.length; i++) {
            let f = this.fichas[i];
            if (f.isPointInside(x, y) && f.getPuedeMover() && f.getPertenece() == this.turno) {
                return f;
            }
        }
    }

    //Si el usuario clickeo una ficha la resalta y luego redibuja el tablero
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

    //Completa el arreglo posiciones con las posiciones inicial y final de cada celda del tablero
    completarPosiciones() {
        this.posiciones = []
        let posInicial = 500;
        for (let i = 0; i < this.col; i++) {
            let pos = {
                posI: posInicial,
                posF: posInicial + 70
            }
            this.posiciones.push(pos)
            posInicial += 75
        }
    }

    //Arrastra la ficha hacia donde se encuentra el mouse
    onMouseMove(e) {
        if (isMouseDown && ultimaFichaClickeada != null) {

            ultimaFichaClickeada.setPosition(e.layerX, e.layerY);
            this.drawFichasYTablero();
        }
    }

    //Obtiene la posicion x de la matriz (a partir de la posicion x del mouse) para colocar la ficha
    getPosX(e) {
        for (let x = 0; x < this.posiciones.length; x++) {
            if ((e.layerX >= this.posiciones[x].posI) && (e.layerX <= this.posiciones[x].posF)) {

                return x;
            }
        }
    }

    //Obtiene la posicion y de la matriz tablero para colocar la ficha
    getPosY(posX) {
        let matrizTablero = this.tablero.getMatrizTablero();
        for (let i = this.fil - 1; i >= 0; i--) {
            if (matrizTablero[i][posX] == null) {
                return i;
            }
        }
        return -1 // todas las posiciones en Y estan ocupadas
    }

    //Cuando suelta el mouse, se obtiene las posiciones donde colocar la ficha y si es posible colocar al ficha,
    //se comprueba si hay un ganador
    onMouseUp(e) {
        isMouseDown = false;
        let heightMax = this.tablero.getHeight();
        let widthMax = this.tablero.getWidth() + this.tablero.getPosComienzoTableroX();
        let minWidth = this.tablero.getPosComienzoTableroX();
        if (this.cursorEnTablero(e, widthMax, heightMax, minWidth)) {
            let posX = this.getPosX(e) //devuelve una posicion del arreglo a partir de la posicion del cursor
            let posY = this.getPosY(posX) //devuelve una posicion para Y checkeando la cantidad de fichas que hay colocadas en la matriz
            if (posY != -1 && (ultimaFichaClickeada != null)) { //si no hay posiciones ocupadas
                this.tablero.colocarFichaMatriz(posX, posY, ultimaFichaClickeada.getPertenece())
                this.colocarFicha(posX, posY); //esto es para el canvas
                let turnoActual = this.turno;
                this.cambiarTurno();
                if (this.tablero.hayEnLinea(posX, posY, turnoActual, this.xEnLinea)) {
                    this.mostrarGanador(turnoActual)
                    this.turno = "";
                }

            }
        }
    }

    //Muestra en el html si hay un ganador
    mostrarGanador(ganador) {
        let pGanador = document.getElementById("showGanador");
        pGanador.innerHTML = ganador;
        document.getElementById("ganador").classList.remove("hidden")
    }




    //error, se coloca la ficha aunque no tenga posI valida, osea en el medio de una celda jajaj te puse
    colocarFicha(x, y) {
        let medidasCelda = this.tablero.getMedidasImgTablero()
        let valorX = this.posiciones[x];
        valorX = (valorX.posI + valorX.posF) / 2;
        let posX = valorX + 3;

        let posY = (this.tablero.getPosComienzoTableroY() + (y * medidasCelda.height)) + 37;

        let newFicha = new Ficha(ultimaFichaClickeada.getId(), ultimaFichaClickeada.getImg(), ultimaFichaClickeada.getPertenece(), posX, posY, ultimaFichaClickeada.getCtx(), ultimaFichaClickeada.getColor());
        let result = this.arrayRemove(this.fichas, ultimaFichaClickeada);
        this.fichas = result;
        this.fichas.push(newFicha);
        newFicha.setResaltado(false);
        this.drawFichasYTablero();
        newFicha.setPuedeMover(false);
    }

    //remueve la ficha del arreglo de fichas, si al ficha puede insertarse en el tablero
    arrayRemove(arr, value) {

        return arr.filter(function(ele) {
            return (ele.getId() != value.getId()) || (ele.getPertenece() != value.getPertenece());
        });
    }

    //Dibuja el tablero, las fichas, y los nombres de los jguadores
    drawFichasYTablero() {
        this.clearCanvas();
        this.drawTablero();
        this.drawFichas();
        this.drawUserName(this.jugador1, 105, 400);
        this.drawUserName(this.jugador2, 1250, 400);
    }

    //Dibuja las fichas
    drawFichas() {
        for (let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].renderizar();
        }
    }

    //Dibuja el tablero
    drawTablero() {
        this.tablero.dibujarTablero(imgTablero, this.col, this.fil);
    }

    //dibuja el nombre del jugador
    drawUserName(jugador, x, y) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 25px Arial";
        this.ctx.fillText(jugador, x, y);
    }

    //borra el canvas
    clearCanvas() {
        this.ctx.fillStyle = "#FFFFFF"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getTablero() {
        return this.tablero;
    }

    //esconde un elemento del html
    closePopUp() {
        let pop_up = document.getElementById("pop-up");
        pop_up.classList.add("hidden");
    }

    //Inicia los metodos necesarios para comenzar el juego
    comenzar() {
        this.tablero = new Tablero(this.canvas, this.imgTablero, this.col, this.fil);
        this.drawUserName(this.jugador1, 105, 400);
        this.drawUserName(this.jugador2, 1250, 400);
        this.nuevasFichas(this.col, this.fil, this.ctx, this.imgFicha1, this.imgFicha2, this.colorImg1, this.colorImg2);
        this.completarPosiciones();
    }

    //Inicia el juego y el reloj 
    comenzarJuego(jugador1, jugador2, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2, xEnLinea) {

        let timeOver = document.getElementById("timerOver");
        this.jugador1 = document.getElementById("nombreJugador1").value;
        this.jugador2 = document.getElementById("nombreJugador2").value;
        this.imgTablero = imgTablero;
        if (((imgFicha1 != "" && imgFicha2 != "") || (colorImg1 != "" && colorImg2 != "")) && filas != 0 && columnas != 0 && xEnLinea != "") {
            this.imgTablero = imgTablero;
            this.imgFicha1 = imgFicha1;
            this.imgFicha2 = imgFicha2;
            this.colorImg1 = colorImg1;
            this.colorImg2 = colorImg2;
            this.fil = filas;
            this.col = columnas;
            this.xEnLinea = xEnLinea;
            this.turno = this.jugador1;
            this.comenzar();
            timeOver.classList.add("hidden");
            this.closePopUp();
            this.interval = setInterval(() => {
                if (this.timer >= 0) {
                    reloj.innerHTML = this.convertMinSec(this.timer).toString();
                    this.timer--;
                } else {
                    timeOver.classList.remove("hidden");
                    this.turno = "";
                    this.stopIntervalTimer(this.interval)
                }
            }, 1000);

        }
    }


    //Reinicia el juego y el reloj
    reiniciarJuego(reloj) {
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.tablero = null;
            this.imgFicha1 = "";
            this.imgFicha2 = "";
            this.colorImg1 = "";
            this.colorImg2 = "";
            this.timer = 60 * 3;
            reloj.innerHTML = "03:00";
            this.showPopUp();
            this.stopIntervalTimer(this.interval);
        }
        //Muestra el pop-up de configuracion inicial del juego.
    showPopUp() {
        document.getElementById("pop-up").classList.remove("hidden");
        document.getElementById("tablero").classList.remove("hidden");
        document.getElementById("jugadores").classList.remove("hidden");
        document.getElementById("personalizar").classList.remove("hidden");
        document.getElementById("formatos").classList.remove("hidden");
        document.getElementById("imagen").classList.remove("hidden");
        document.getElementById("color").classList.remove("hidden");
        document.getElementById("verImagenes").classList.remove("hidden");
        document.getElementById("verColores").classList.remove("hidden");

        document.getElementById("elegirImagen1").classList.add("hidden");
        document.getElementById("elegirImagen2").classList.add("hidden");
        document.getElementById("elegirColor1").classList.add("hidden");
        document.getElementById("elegirColor2").classList.add("hidden");
        document.getElementById("leagueOfLegends").classList.add("hidden");
        document.getElementById("naruto").classList.add("hidden");
        document.getElementById("harryPotter").classList.add("hidden");
        document.getElementById("green").classList.add("hidden");
        document.getElementById("red").classList.add("hidden");
        document.getElementById("blue").classList.add("hidden");
        document.getElementById("ganador").classList.add("hidden");
    }

    //detiene el timer
    stopIntervalTimer(interval) {
        clearInterval(interval);
    }

    //Convierte un valor entero en formato minutos segund
    convertMinSec(value) {
        let minutes = Math.floor((value) / 60);
        let seconds = value - (minutes * 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ':' + seconds;
    }


}