class Juego{

    constructor (jugador1,jugador2,maxTime){
        this.tablero = new Tablero(img,maxX,maxY);
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.turno = jugador1;
        this.timer = setTimeout(tiempoTerminado(), maxTime*1000);
    }

    setJugador1(jugador1){
        this.jugador1=jugador1;
    }

    setJugador2(jugador2){
        this.jugador2=jugador2;
    }

    setTurno(jugador){
        this.turno=jugador;
    }

    reiniciarJuego(){
        tablero.vaciar();
        mostrarPopUp(); //para elegir color de ficha etc
    }

    mostrarPopUp(){
        
    }

    ponerFicha(x,y,ficha){
        this.tablero.addFicha(x,y,ficha)
        checkear4EnLinea();
    }

    checkearSiAlguienGano(){
        if  (tablero.hayEnLinea()){
            return mostrarGanador(turno)
        }
    }
    
    mostrarGanador(){
        
    }

    

    


}
