let fondoSeleccionado;
let layers = [];
let carpetaAngel;
let fondo2 = document.getElementById("fondo2");
let fondo3 = document.getElementById("fondo3");
let angel1 = document.getElementById("Angel1");
let angel2 = document.getElementById("Angel2");
let angel3 = document.getElementById("Angel3");
let DivEnemigo = document.getElementById("enemigo");
let enemigo;
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
    enemigo = new Enemigo(DivEnemigo, "url(/img/Enemigo/EnemigoRojo.png) no-repeat")
    enemigo.esconderEnemigo();
    setFondo();
});
 fondo3.addEventListener('click', () => {
    fondoSeleccionado = '/img/Escenario/fondo3/layers';
    fondo2.classList.remove('selected');
    fondo3.classList.add('selected');
    enemigo = new Enemigo(DivEnemigo, "url(/img/Enemigo/EnemigoVerde.png) no-repeat")
    enemigo.esconderEnemigo();
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
    fondo.style.background = 'url('+fondoSeleccionado+'/Fondo.png)';
    fondo.style.backgroundSize = '1080px 720px';
    fondo.style.backgroundRepeat = 'repeat-x';
    
    layers.push(img1);
    layers.push(img2);
    layers.push(img3);
    layers.push(img4);
    layers.push(img5);
    layers.push(img6);
    

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
let coleccionable;
let divColeccionable;
let puntaje = 0;

function comenzarJuego() {
   
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
/*         if (detectarColision()) {
            //Cambiar img x la img de muerte
            frenarJuego();
            elapsed = 0;
        }
        if (detectarColisionColeccionable()){
            //Animar coleccionabl
            coleccionable.borrarColeccionable();
            coleccionable = new Coleccionable();
            coleccionable.create();
            coleccionable.mostrarColeccionable();
            divColeccionable = document.getElementById("coleccionable");
            coleccionable.moverColeccionable(divColeccionable);
            puntaje++;
        } */


        //Avanzar la velocidd de animciones, si consiguio 10monedas, o pso determindo tiempo

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
    puntaje = 0;
    personaje.detenerAvatar();
    escenario.detenerFondo();
    obstaculo.detenerObstaculo(divObstaculo);
    coleccionable.detenerColeccionable(divColeccionable)
    enemigo.detenerEnemigo();
    clearInterval(intervaObs);
}

function detectarColisionColeccionable(){
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