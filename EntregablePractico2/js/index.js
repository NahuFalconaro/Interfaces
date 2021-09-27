let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imgTablero;
let filas;
let columnas;
let juego;
let jugador1;
let jugador2;
let imgFicha1 = "";
let imgFicha2 = "";
let colorImg1;
let colorImg2;

//hacer panel configuracion, donde cargue nombre de jugadores, imagenes a usar, y tablero a utilizar.
let cuatroEnLinea = document.getElementById('4linea');
let cincoEnLinea = document.getElementById('5linea');
let seisEnLinea = document.getElementById('6linea');
let sieteEnLinea = document.getElementById('7linea');

cuatroEnLinea.addEventListener('click', startCuatroEnLinea)
cincoEnLinea.addEventListener('click', startCincoEnLinea)
seisEnLinea.addEventListener('click', startSeisEnLinea)
sieteEnLinea.addEventListener('click', startSieteEnLinea)

let img1 = document.getElementById('elegirImagen1');
img1.addEventListener('change', obtenerRuta);

function obtenerRuta(event) {
    let reader = new FileReader();
    let fileReader = event.target.files[0];
    reader.readAsDataURL(fileReader);
    reader.onloadend = (event) => {
        imgFicha1 = event.target.result;

    }
}

let img2 = document.getElementById('elegirImagen2');
img2.addEventListener('change', obtenerRuta2);

function obtenerRuta2(event) {
    let reader = new FileReader();
    let fileReader = event.target.files[0];
    reader.readAsDataURL(fileReader);
    reader.onloadend = (event) => {
        imgFicha2 = event.target.result;
    }
}

function startCuatroEnLinea() {

    imgTablero = './img/4enLinea(6x5).png';
    columnas = 6;
    filas = 5;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}

function startCincoEnLinea() {
    imgTablero = './img/5enLinea(7x6).png';
    columnas = 7;
    filas = 6;
    imgFicha1 = document.getElementById("elegirImagen1").value;
    imgFicha2 = document.getElementById("elegirImagen2").value;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}

function startSeisEnLinea() {
    imgTablero = './img/6enLinea(8x7).png';
    columnas = 8;
    filas = 7;
    imgFicha1 = document.getElementById("elegirImagen1").value;
    imgFicha2 = document.getElementById("elegirImagen2").value;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}

function startSieteEnLinea() {
    imgTablero = './img/7enLinea(9x8).png';
    columnas = 9;
    filas = 8;
    imgFicha1 = document.getElementById("elegirImagen1").value;
    imgFicha2 = document.getElementById("elegirImagen2").value;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}



canvas.addEventListener("mousedown", function(e) {
    juego.onMouseDown(e);
});

canvas.addEventListener("mousemove", function(e) {
    juego.onMouseMove(e);
});

canvas.addEventListener("mouseup", function(e) {
    juego.onMouseUp(e);
});

document.getElementById("imagen").addEventListener('click', mostrarModalImagen);

function mostrarModalImagen() {
    document.getElementById("imagen").classList.toggle("hidden");
    document.getElementById("color").classList.toggle("hidden");
    document.getElementById("elegirImagen1").classList.toggle("hidden");
    document.getElementById("elegirImagen2").classList.toggle("hidden");

}

document.getElementById("color").addEventListener('click', mostrarModalColor);

function mostrarModalColor() {
    document.getElementById("imagen").classList.toggle("hidden");
    document.getElementById("color").classList.toggle("hidden");
    document.getElementById("elegirColor1").classList.toggle("hidden");
    document.getElementById("elegirColor2").classList.toggle("hidden");
}

let pop_up = document.getElementById("pop-up");

function closePopUp() {
    pop_up.classList.add("hidden");
}


// //Empieza codigo modal inicio

// let closePop = document.getElementById("close-pop-up");

// closePop.addEventListener("click", close_popUp);



// //Le agrego un listener al evento en toda la ventana

// window.addEventListener('click', function(e) {
//     //si el div no contiene el target lo oculta
//     if (!(pop_up.contains(e.target))) {
//         pop_up.classList.add("hidden");

//     }W
// })