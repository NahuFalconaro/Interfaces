//Definicion de variables principales

let fondoSeleccionado = null;
let layers = [];
let carpetaAngel = null;
let fondo2 = document.getElementById("showFondo2");
let fondo3 = document.getElementById("showFondo3");
let angel1 = document.getElementById("Angel1");
let angel2 = document.getElementById("Angel2");
let angel3 = document.getElementById("Angel3");
let DivEnemigo = document.getElementById("enemigo");
let enemigo;
let personaje;
let escenario;
let obstaculo;
let divPersonaje;
let divObstaculo;
let intervaObs;
let coleccionable;
let divColeccionable;
let puntaje = 0;
let imgEnemigo;

//Esconder reglas y controles
document.getElementById("reglas").classList.add("hidden");
document.getElementById("controles").classList.add("hidden");

//Para cambiar el tiempo de juego cambiar la variable timer (linea 31 y linea 382)

let timer = (60 * 5);
let reloj = document.getElementById("reloj");
reloj.innerHTML = "Tiempo restante: " + convertMinSec(timer);

//Boton comenzar Juego
let comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", comenzarJuego);

//Tablero que se muestra el tiempo y el puntaje
let tablero = document.getElementById('tablero');
tablero.classList.add('hidden');
let popup = document.getElementById("pop-up");


//Botones seleccionar personajes y escenarios
angel1.addEventListener('click', () => {
    carpetaAngel = "/img/Angel1";
    angel1.classList.add('selected');
    angel2.classList.remove('selected');
    angel3.classList.remove('selected');
});
angel2.addEventListener('click', () => {
    carpetaAngel = "/img/Angel2";
    angel2.classList.add('selected');
    angel1.classList.remove('selected');
    angel3.classList.remove('selected');
});
angel3.addEventListener('click', () => {
    carpetaAngel = "/img/Angel3";
    angel3.classList.add('selected');
    angel1.classList.remove('selected');
    angel2.classList.remove('selected');
});
document.getElementById("Angel3").addEventListener('click', () => {
    carpetaAngel = "/img/Angel3";
});
fondo2.addEventListener('click', () => {
    fondoSeleccionado = '/img/Escenario/fondo2/layers';
    fondo2.classList.add('selected');
    fondo3.classList.remove('selected');
    imgEnemigo = "url(/img/Enemigo/EnemigoRojo.png) no-repeat";
    previsualizacionJuego();
});
fondo3.addEventListener('click', () => {
    fondoSeleccionado = '/img/Escenario/fondo3/layers';
    fondo2.classList.remove('selected');
    fondo3.classList.add('selected');
    imgEnemigo = "url(/img/Enemigo/EnemigoVerde.png) no-repeat";
    previsualizacionJuego();
});


//Setea el fondo seleccionado para previsualizarlo antes de jugar
function previsualizacionJuego() {
    let fondo = document.getElementById("fondo");
    fondo.style.background = 'url(' + fondoSeleccionado + '/Fondo.png)';
    fondo.style.backgroundSize = '1080px 720px';
    fondo.style.backgroundRepeat = 'repeat-x';
}
//Setea el fondo seleccionado al juego
function setFondos() {

    let img1 = fondoSeleccionado + "/1.png";
    let img2 = fondoSeleccionado + "/2.png";
    let img3 = fondoSeleccionado + "/3.png";
    let img4 = fondoSeleccionado + "/4.png";
    let img5 = fondoSeleccionado + "/5.png";
    let img6 = fondoSeleccionado + "/6.png";

    layers.push(img1);
    layers.push(img2);
    layers.push(img3);
    layers.push(img4);
    layers.push(img5);
    layers.push(img6);


}

//Empezar el juego
function comenzarJuego() {
    if ((fondoSeleccionado != null && carpetaAngel != null)) {
        document.getElementById("divReglas").classList.add("hidden");
        document.getElementById("divControles").classList.add("hidden");
        document.getElementById("controles").classList.add("hidden");
        document.getElementById("reglas").classList.add("hidden");
        countDown();
        setFondos();
        DivEnemigo = document.getElementById("enemigo");
        enemigo = new Enemigo(DivEnemigo, imgEnemigo);
        enemigo.iniciarEnemigo();
        tablero.classList.remove('hidden')
        popup.classList.add("hidden");

        divPersonaje = document.getElementById("personaje");
        personaje = new Personaje(divPersonaje, carpetaAngel);
        personaje.mostrarAvatar();
        enemigo.mostrarEnemigo();
        escenario = new Fondo(layers);

        coleccionable = new Coleccionable();
        coleccionable.create();
        divColeccionable = document.getElementById("coleccionable");

        obstaculo = new Obstaculo();
        obstaculo.create();
        divObstaculo = document.getElementById("obstaculo");

        intervaObs = setInterval(() => {
            coleccionable.borrarColeccionable();
            obstaculo.borrarObstaculo();

            obstaculo = new Obstaculo();
            obstaculo.create();
            obstaculo.mostrarObstaculo();
            divObstaculo = document.getElementById("obstaculo");
            obstaculo.moverObstaculo(divObstaculo);

            coleccionable = new Coleccionable();
            coleccionable.create();
            coleccionable.mostrarColeccionable();
            divColeccionable = document.getElementById("coleccionable");
            coleccionable.moverColeccionable(divColeccionable);

        }, 3000)
        escenario.iniciarFondo();
        window.requestAnimationFrame(step);
    }
}



//Eventos de teclado

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

//Transformar un valor al formato minutos/segundos
function convertMinSec(value) {
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
let contador;

//Iniciar reloj
function countDown() {
    contador = setInterval(() => {
        timer--;
        reloj.innerHTML = "Tiempo restante: " + convertMinSec(timer);
    }, 1000)
}

//Queda intrucciones, opcional: mensaje seleccion, aumento velocidad





//Game loop: el juego itera por cada milisegundo hasta terminar el tiempo

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
            personaje.morir();
            document.getElementById('loss').classList.remove('hidden');
            document.getElementById('msgLoss').innerHTML = "Perdiste! Tu puntaje fue: " + puntaje + " Vuelve a jugar para superarte!";
            frenarJuego();
            elapsed = 0;
        }
        if (detectarColisionColeccionable()) {
            coleccionable.animar();
            setTimeout(() => {
                puntaje++;
                document.getElementById('puntaje').innerHTML = "Puntaje: " + puntaje;
            }, 500)

        }
        if (elapsed < timer * 10000) {
            previousTimeStamp = timestamp;
            window.requestAnimationFrame(step);
        } else {
            let overTime = document.getElementById('sinTiempo')
            overTime.classList.remove('hidden');
            document.getElementById('msgSinTiempo').innerHTML = "Te quedaste sin tiempo! Tu puntaje fue: " + puntaje + " Vuelve a jugar para superarte!";
            frenarJuego();
            console.log("juego terminado por tiempo")
        }

    }
}
// Frena las animaciones del juego
function frenarJuego() {
    puntaje = 0;
    personaje.detenerAvatar();
    escenario.detenerFondo();
    obstaculo.detenerObstaculo(divObstaculo);
    coleccionable.detenerColeccionable(divColeccionable)
    enemigo.detenerEnemigo();
    clearInterval(intervaObs);

    clearInterval(contador);
}

//Checkea si el personaje colisiono con la moneda

function detectarColisionColeccionable() {
    var rect1 = { x: divPersonaje.getBoundingClientRect().x, y: divPersonaje.getBoundingClientRect().y, width: divPersonaje.getBoundingClientRect().width, height: divPersonaje.getBoundingClientRect().height }
    var rect2 = { x: divColeccionable.getBoundingClientRect().x, y: divColeccionable.getBoundingClientRect().y, width: divColeccionable.getBoundingClientRect().width, height: divColeccionable.getBoundingClientRect().height }

    if ((rect1.x + 50) < (rect2.x + rect2.width) &&
        (rect1.x + rect1.width) - 50 > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        (rect1.height + rect1.y) - 50 > rect2.y) {
        return true;
    }
    return false;
}
//Checkea si el personje colisiono con un obstculo
function detectarColision() {
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

//Eventos para reiniciar juego
let btnReiniciar1 = document.getElementById("buttonLoss1").addEventListener('click', reiniciarJuego)
let btnReiniciar2 = document.getElementById("buttonLoss2").addEventListener('click', reiniciarJuego)


//Metodo para reiniciar el juego
let sinTiempo = document.getElementById("sinTiempo");
let loss = document.getElementById("loss");

//Reinicia el juego y muestra seleccion de personaje y escenario
function reiniciarJuego() {
    fondoSeleccionado = null;
    carpetaAngel = null;
    if (personaje != null)
        personaje = null;
    if (obstaculo != null)
        obstaculo = null;
    if (escenario != null)
        escenario = null;
    if (enemigo != null)
        enemigo = null;

    let divFondo0 = document.getElementById("fondo");
    let divFondo1 = document.getElementById("fondo1");
    let divFondo2 = document.getElementById("fondo2");
    let divFondo3 = document.getElementById("fondo3");
    let divFondo4 = document.getElementById("fondo4");
    let divFondo5 = document.getElementById("fondo5");

    divFondo0.remove();
    divFondo1.remove();
    divFondo2.remove();
    divFondo3.remove();
    divFondo4.remove();
    divFondo5.remove();

    divFondo0 = document.createElement("div");
    divFondo0.classList.add("bgmove");
    divFondo0.id = "fondo";

    divFondo1 = document.createElement("div");
    divFondo1.classList.add("bgmove");
    divFondo1.id = "fondo1";

    divFondo2 = document.createElement("div");
    divFondo2.classList.add("bgmove");
    divFondo2.id = "fondo2";

    divFondo3 = document.createElement("div");
    divFondo3.classList.add("bgmove");
    divFondo3.id = "fondo3";

    divFondo4 = document.createElement("div");
    divFondo4.classList.add("bgmove");
    divFondo4.id = "fondo4";

    divFondo5 = document.createElement("div");
    divFondo5.classList.add("bgmove");
    divFondo5.id = "fondo5";

    document.body.appendChild(divFondo0);

    divFondo0.appendChild(divFondo1);
    divFondo1.appendChild(divFondo2);
    divFondo2.appendChild(divFondo3);
    divFondo3.appendChild(divFondo4);
    divFondo4.appendChild(divFondo5);

    let fondoPadre = document.getElementById("fondo5");

    while (fondoPadre.firstChild) {
        fondoPadre.removeChild(fondoPadre.lastChild);
    }

    let divNuev1 = document.createElement("div");
    divNuev1.classList.add("personaje");
    divNuev1.id = "personaje";

    let divNuev2 = document.createElement("div");
    divNuev2.classList.add("enemigo");
    divNuev2.id = "enemigo";

    layers = [];
    timer = (60 * 5)
    puntaje = 0;

    reloj.innerHTML = "Tiempo restante: " + convertMinSec(timer);
    document.getElementById('puntaje').innerHTML = "Puntaje: 0";

    fondoPadre.appendChild(divNuev1);
    fondoPadre.appendChild(divNuev2);

    document.getElementById("Angel1").classList.remove("selected");
    document.getElementById("Angel2").classList.remove("selected");
    document.getElementById("Angel3").classList.remove("selected");

    fondo2.classList.remove("selected");
    fondo3.classList.remove("selected");


    sinTiempo.classList.add("hidden");
    loss.classList.add("hidden");
    popup.classList.remove("hidden");

    document.getElementById("divReglas").classList.remove("hidden");
    document.getElementById("divControles").classList.remove("hidden");
    document.getElementById("btnReglas").classList.remove("hidden");
    document.getElementById("btnControles").classList.remove("hidden");
}

//Eventos y funciones para mostrar las reglas

document.getElementById("btnReglas").addEventListener('click', showReglas);
document.getElementById("btnControles").addEventListener('click', showControles);

function showReglas() {
    document.getElementById("reglas").classList.toggle("hidden");
    document.getElementById("controles").classList.add("hidden");
}

function showControles() {

    document.getElementById("controles").classList.toggle("hidden");
    document.getElementById("reglas").classList.add("hidden");
}