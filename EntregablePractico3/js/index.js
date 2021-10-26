let fondoSeleccionado;
let carpetaAngel;

document.getElementById("Angel1").addEventListener('click', () => {
    carpetaAngel = "/img/Angel1";
});
document.getElementById("Angel2").addEventListener('click', () => {
    carpetaAngel = "/img/Angel2";
});
document.getElementById("Angel3").addEventListener('click', () => {
    carpetaAngel = "/img/Angel3";
});
document.getElementById("fondo2").addEventListener('click', () => {
    fondoSeleccionado = '/img/Escenario/fondo2/layers';
    setFondo();
});
document.getElementById("fondo3").addEventListener('click', () => {
    fondoSeleccionado = '/img/Escenario/fondo3/layers';
    setFondo();
});



function setFondo() {

    let img1 = fondoSeleccionado + "/1.png";
    let img2 = fondoSeleccionado + "/2.png";
    let img3 = fondoSeleccionado + "/3.png";
    let img4 = fondoSeleccionado + "/4.png";
    let img5 = fondoSeleccionado + "/5.png";
    let img6 = fondoSeleccionado + "/6.png";



    let fondo = document.getElementById("fondo");
    fondo.style.background = "url(" + img1 + ")";

    let fondo1 = document.getElementById("fondo1");
    fondo1.style.background = "url(" + img2 + ")";

    let fondo2 = document.getElementById("fondo2");
    fondo2.style.background = "url(" + img3 + ") ";

    let fondo3 = document.getElementById("fondo3");
    fondo3.style.background = 'url(' + img4 + ') ';

    let fondo4 = document.getElementById("fondo4");
    fondo4.style.background = 'url(' + img5 + ') ';

    let fondo5 = document.getElementById("fondo5");
    fondo5.style.background = 'url(' + img6 + ') ';
}

//comenzar juego

let comenzar = document.getElementById("comenzar");

comenzar.addEventListener("click", comenzarJuego);

let popup = document.getElementById("pop-up");
let personaje;
let escenario;
let obstaculo;
let divPersonaje;
let divObstaculo;
let intervaObs;

function comenzarJuego() {
    divPersonaje = document.getElementById("personaje");

    personaje = new Personaje(divPersonaje, carpetaAngel);
    escenario = new Fondo();

    popup.classList.add("hidden");
    personaje.mostrarAvatar();
    obstaculo = new Obstaculo();
    obstaculo.create();
    divObstaculo = document.getElementById("obstaculo");
    intervaObs = setInterval(() => {
        obstaculo.borrarObstaculo();
        obstaculo = new Obstaculo();
        obstaculo.create();
        obstaculo.mostrarObstaculo();
        divObstaculo = document.getElementById("obstaculo");

        obstaculo.moverObstaculo(divObstaculo);

    }, 3000)


    escenario.iniciarFondo();
    window.requestAnimationFrame(step);
}

let fondos = document.querySelectorAll('.bgmove');

let keyDown;
let ev;

window.addEventListener("keydown", (e) => {
    keyDown = true;
    ev = e;
})
window.addEventListener("keyup", (e) => {
    keyDown = false;
    ev = e;

})




let start, previousTimeStamp;


function step(timestamp) {

    if (start == undefined) {
        start = timestamp
    }
    const elapsed = timestamp - start;
    if (previousTimeStamp !== timestamp) {

        if (keyDown) {
            if (ev.key == 'ArrowDown') {
                personaje.agacharAvatar();
                escenario.moverFondoIzquierda();
            }
            if (ev.key == 'ArrowUp') {
                personaje.saltarAvatar();
                escenario.moverFondoIzquierda()
            }
        } else {
            personaje.moverAvatar();
            escenario.moverFondoIzquierda();
        }
        if (detectarColision()) {
            frenarJuego();
            elapsed = 0;
        }


        if (elapsed < 100000) {
            previousTimeStamp = timestamp;
            window.requestAnimationFrame(step);
        } else {
            frenarJuego();
            console.log("juego terminado")
        }

    }
}

function frenarJuego() {
    personaje.detenerAvatar();
    escenario.detenerFondo();
    obstaculo.detenerObstaculo(divObstaculo);
    clearInterval(intervaObs);
}

function detectarColision() {
    console.log(divObstaculo);
    console.log(divPersonaje)
    var rect1 = { x: divPersonaje.getBoundingClientRect().x, y: divPersonaje.getBoundingClientRect().y, width: divPersonaje.getBoundingClientRect().width, height: divPersonaje.getBoundingClientRect().height }
    var rect2 = { x: divObstaculo.getBoundingClientRect().x, y: divObstaculo.getBoundingClientRect().y, width: divObstaculo.getBoundingClientRect().width, height: divObstaculo.getBoundingClientRect().height }

    if ((rect1.x + 50) < (rect2.x + rect2.width) &&
        (rect1.x + rect1.width) - 50 > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        (rect1.height + rect1.y) - 50 > rect2.y) {
        return true;
    }
    return false;
}