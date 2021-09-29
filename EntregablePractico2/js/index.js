let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imgTablero = './img/celda.png';

let filas;
let columnas;
let juego;
let jugador1;
let jugador2;
let imgFicha1 = "";
let imgFicha2 = "";
let colorImg1;
let colorImg2;

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
    columnas = 6;
    filas = 7;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}


function startCincoEnLinea() {
    columnas = 7;
    filas = 8;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}
function startSeisEnLinea() {
    columnas = 8;
    filas = 9;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}
function startSieteEnLinea() {
    columnas = 9;
    filas = 10;
    colorImg1 = document.getElementById("elegirColor1").value;
    colorImg2 = document.getElementById("elegirColor2").value;
    jugador1 = document.getElementById("nombreJugador1").value;
    jugador2 = document.getElementById("nombreJugador2").value;
    closePopUp();
    juego = new Juego(jugador1, jugador2, 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
}

canvas.addEventListener("mousedown", function(e) {
    if (juego != null) {
        juego.onMouseDown(e);
    }
});

canvas.addEventListener("mousemove", function(e) {
    if (juego != null) {
        juego.onMouseMove(e);
    }
});

canvas.addEventListener("mouseup", function(e) {
    if (juego != null) {
        juego.onMouseUp(e);
    }

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