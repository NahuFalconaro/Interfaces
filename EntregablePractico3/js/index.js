let carpetaAngel = "Angel1"

let spriteCaminar = "..img/" + carpetaAngel + "/SpriteSheetRunning.png"

let spriteSaltar = "..img/" + carpetaAngel + "/spriteSaltar.png"

let spriteMorir = "..img/" + carpetaAngel + "/spriteMorir.png"


let imgPersonaje = "url(../img/" + carpetaAngel + "/Running/SpriteSheetRunning.png)";


//inic imagenes fondo
let img1 = '../img/Escenario/fondo2/layers/1.png';
let img2 = '../img/Escenario/fondo2/layers/2.png';
let img3 = '../img/Escenario/fondo2/layers/3.png';
let img4 = '../img/Escenario/fondo2/layers/4.png';
let img5 = '../img/Escenario/fondo2/layers/5.png';
let img6 = '../img/Escenario/fondo2/layers/6.png';

let fondo = document.getElementById("fondo");
fondo.style.background = 'url(' + img1 + ')';

let fondo1 = document.getElementById("fondo1");
fondo1.style.background = 'url(' + img2 + ')';

let fondo2 = document.getElementById("fondo2");
fondo2.style.background = 'url(' + img3 + ') ';

let fondo3 = document.getElementById("fondo3");
fondo3.style.background = 'url(' + img4 + ') ';

let fondo4 = document.getElementById("fondo4");
fondo4.style.background = 'url(' + img5 + ') ';

let fondo5 = document.getElementById("fondo5");
fondo5.style.background = 'url(' + img6 + ') ';



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

let divPersonaje = document.getElementById("personaje");
let personaje = new Personaje(divPersonaje, imgPersonaje);
let escenario = new Fondo(fondos);
let start, previousTimeStamp;

//tiempo total

//let timer = 5 * 60

window.requestAnimationFrame(step);

function step(timestamp) {

    if (start == undefined) {
        start = timestamp
    }
    const elapsed = timestamp - start;
    if (previousTimeStamp !== timestamp) {
        if (keyDown) {
            if (ev.key == 'ArrowDown') {
                personaje.agacharAvatar();
            }
            if (ev.key == 'ArrowUp') {
                personaje.saltarAvatar();
            }
        } else {
            personaje.moverAvatar();
            escenario.moverFondoIzquierda();
            /*  let animaciones = pj.getAnimations();
        if (animaciones[0].animationName === "salto") {
            console.log("entre")
            pj.style.animationDelay = "8s";
        } else {
            pj.style.animationDelay = "0s";

        } */

        }
    }
    if (elapsed < 1000000) {
        previousTimeStamp = timestamp;
        window.requestAnimationFrame(this.step);
    } else {
        //terminar juego
    }
}