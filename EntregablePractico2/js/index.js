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


// Mostrar tablero vacio    v
// mostrar dos grupos de fichas    v   
// las piezas de cada jugador se dibujan con una imagen en lugar de un color solido    r//subir imagen de color rojo?
// cada jugador va seleccionando sus fichas y las ubica en las columnas del tablero    v
// se debe implementar logica de juego, implementando los turnos    v
// el juego termina cuando el jugador consigue ubicar cuatro fichas en linea    r//falta terminar el juego una vez haya ganado
// las fichas deben elegirse con el click del mouse, y el usuario debe poder arrastrar la ficha y soltarla donde quiera    v
// se debe poder reiniciar el juego, colocar un timer que limite el tiempo    n

// promocion:
//         poder establecer la dimension del tablero, x en linea, haciendo 6 en linea etc    v
//         agregar dif tipos de fichas, colores, formatos.    v



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

let lol = document.getElementById('leagueOfLegends');
lol.addEventListener('click', ()=>{
    marcarSeleccionado(lol.parentNode, lol)
    imgFicha1 = "./img/anivia.jfif"
    imgFicha2 = "./img/gnar.jfif"
});
let naruto = document.getElementById('naruto');
naruto.addEventListener('click', ()=>{
    marcarSeleccionado(naruto.parentNode, naruto)
    imgFicha1 = "./img/naruto.jfif"
    imgFicha2 = "./img/sasuke.jfif"
});
let harryPotter = document.getElementById('harryPotter');
harryPotter.addEventListener('click', ()=>{
    marcarSeleccionado(harryPotter.parentNode, harryPotter)
    imgFicha1 = "./img/harryPotter.jfif"
    imgFicha2 = "./img/voldemort.jfif"
});


let red = document.getElementById('red');
red.addEventListener('click', ()=>{
    marcarSeleccionado(red.parentNode, red)
    colorImg1 = "red"
    colorImg2 = "black"
    
});
let green = document.getElementById('green');
green.addEventListener('click', ()=>{
    marcarSeleccionado(green.parentNode, green)
    colorImg1 = "green"
    colorImg2 = "violet"
});
let blue = document.getElementById('blue');
blue.addEventListener('click', ()=>{
    marcarSeleccionado(blue.parentNode, blue)
    colorImg1 = "blue"
    colorImg2 = "yellow"
    
});
let colorPersonalizado1 = document.getElementById("elegirColor1");
colorPersonalizado1.addEventListener("change", ()=>{
    colorImg1 = colorPersonalizado1.value;
    colorImg2 = colorPersonalizado2.value;
})
let colorPersonalizado2 = document.getElementById("elegirColor2");
colorPersonalizado2.addEventListener("change", ()=>{
    colorImg2 = colorPersonalizado2.value;
    colorImg1 = colorPersonalizado1.value;
})


function marcarSeleccionado(padre, elemento){
    if(padre.hasChildNodes()){
        let hijos = padre.childNodes;
        let i = 0;
        while(i < hijos.length){
            if(hijos[i].id != elemento.id && hijos[i].nodeName == "BUTTON"){
                hijos[i].classList.add("noSelected");
            }else{
                elemento.classList.remove("noSelected");
                elemento.classList.add("selected");
            }
            i++;
        }
    }
}

let cuatroEnLinea = document.getElementById('4linea');
cuatroEnLinea.addEventListener('click', ()=>{
    marcarSeleccionado(cuatroEnLinea.parentNode, cuatroEnLinea)
    columnas = 6;
    filas = 7;
})
let cincoEnLinea = document.getElementById('5linea');
cincoEnLinea.addEventListener('click', ()=>{
    marcarSeleccionado(cincoEnLinea.parentNode, cincoEnLinea)
    columnas = 7;
    filas = 8;
})
let seisEnLinea = document.getElementById('6linea');
seisEnLinea.addEventListener('click', ()=>{
    marcarSeleccionado(seisEnLinea.parentNode, seisEnLinea)
    columnas = 8;
    filas = 9;
})
let sieteEnLinea = document.getElementById('7linea');
sieteEnLinea.addEventListener('click', ()=>{
    marcarSeleccionado(sieteEnLinea.parentNode, sieteEnLinea)
    columnas = 9;
    filas = 10;
})


jugador1 = document.getElementById("nombreJugador1").value;
jugador2 = document.getElementById("nombreJugador2").value;

let reinicio = document.getElementById("reiniciarJuego");
reinicio.addEventListener("click", () =>{
    // timer = 120;
    juego  = "" ;
    jugador1  = "";
    jugador2  = "";
    imgFicha1 = "";
    imgFicha2 = "";
    colorImg1  = "";
    colorImg2  = "";//Hay que hacer el reiniciar juego, en la clase juego, dibujando tablero, fichas, todo de nuevo
                    //Controlar si es mejor llamar y obtener los datos, en la clase juego.
    reiniciarJuego();
    mostrarPopUp()
})
let clonacionPopUp = document.getElementById("pop-up").cloneNode(true);
// document.addEventListener("DOMContentLoaded", ()=>{

//     console.log(clonacionPopUp)
//     console.log(pop_up )
// })


function reiniciarJuego() {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}
function mostrarPopUp(){
    let padrePopUp = pop_up.parentNode;
    padrePopUp.replaceChild(clonacionPopUp, pop_up);
}
let comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", comenzarJuego);

function comenzarJuego() { 
    closePopUp();
    juego = new Juego(jugador1, jugador2, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, columnas, filas, colorImg1, colorImg2)
  
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
    document.getElementById("formatos").classList.toggle("hidden");
    document.getElementById("elegirImagen1").classList.toggle("hidden");
    document.getElementById("elegirImagen2").classList.toggle("hidden");
}

document.getElementById("color").addEventListener('click', mostrarModalColor);

function mostrarModalColor() {
    document.getElementById("imagen").classList.toggle("hidden");
    document.getElementById("color").classList.toggle("hidden");
    document.getElementById("formatos").classList.toggle("hidden");
    document.getElementById("elegirColor1").classList.toggle("hidden");
    document.getElementById("elegirColor2").classList.toggle("hidden");
}

document.getElementById("verImagenes").addEventListener('click', mostrarImagenes);

function mostrarImagenes() {
    document.getElementById("verImagenes").classList.toggle("hidden");
    document.getElementById("verColores").classList.toggle("hidden");
    document.getElementById("personalizar").classList.toggle("hidden");
    document.getElementById("leagueOfLegends").classList.toggle("hidden");
    document.getElementById("naruto").classList.toggle("hidden");
    document.getElementById("harryPotter").classList.toggle("hidden");
}

document.getElementById("verColores").addEventListener('click', mostrarColores);

function mostrarColores() {
    document.getElementById("verImagenes").classList.toggle("hidden");
    document.getElementById("verColores").classList.toggle("hidden");
    document.getElementById("personalizar").classList.toggle("hidden");
    document.getElementById("red").classList.toggle("hidden");
    document.getElementById("green").classList.toggle("hidden");
    document.getElementById("blue").classList.toggle("hidden");
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