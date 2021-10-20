
//tiempo total

let timer = 5 * 60;

//inic imagenes fondo
let img1= '../img/Escenario/fondo2/layers/1.png';
let img2= '../img/Escenario/fondo2/layers/2.png';
let img3= '../img/Escenario/fondo2/layers/3.png';
let img4= '../img/Escenario/fondo2/layers/4.png';
let img5= '../img/Escenario/fondo2/layers/5.png';
let img6= '../img/Escenario/fondo2/layers/6.png';


let fondo = document.getElementById("fondo");
fondo.style.background = 'url('+img1+')';

let fondo1 = document.getElementById("fondo1");
fondo1.style.background = 'url('+img2+')';

let fondo2 = document.getElementById("fondo2");
fondo2.style.background = 'url('+img3+') ';

let fondo3 = document.getElementById("fondo3");
fondo3.style.background = 'url('+img4+') ';

let fondo4 = document.getElementById("fondo4");
fondo4.style.background = 'url('+img5+') ';

let fondo5 = document.getElementById("fondo5");
fondo5.style.background = 'url('+img6+') ';

//inic avatar

let carpetaAngel = "Angel1"

let spriteCaminar = "..img/"+carpetaAngel+"/SpriteSheetRunning.png"

let spriteSaltar = "..img/"+carpetaAngel+"/spriteSaltar.png"

let spriteMorir = "..img/"+carpetaAngel+"/spriteMorir.png"


let pj = document.getElementById("personaje");
let personajeParado = "url(../img/"+carpetaAngel+"/Running/SpriteSheetRunning.png)"
pj.style.background = personajeParado;
pj.style.backgroundRepeat ="no-repeat";



//frenar fondo

let fondos = document.querySelectorAll('.bgmove');
function detenerFondo(){
    fondos.forEach((f)=> {
       // f.style.animationDuration = "0s";
       f.style.animationPlayState = "paused";
    })
}
iniciarMundo();
function iniciarMundo(){
    fondos.forEach((f) => {
        f.style.backgroundSize = '1080px';
        f.style.backgroundRepeat = 'repeat-x'
        f.style.animationTimingFunction = "linear";
        f.style.animationIterationCount = "infinite"
        f.style.animationPlayState = "initial";
        
    })
}
//mover fondo 
function moverFondoIzquierda(){
    let i = 9;
    fondos.forEach((f) => {
        f.style.animationPlayState = "initial";
        f.style.animationName = "moveBackgroundLeft";
        f.style.animationDuration = ""+i+"s";
        i--;
    })
}

function moverFondoDerecha(){
    let i = 9;
    fondos.forEach((f) => {
        f.style.animationPlayState = "initial";
        f.style.animationName = "moveBackgroundRight";
        f.style.animationDuration = ""+i+"s";
        i--;
    })
}

    
    



//mover avatar


function moverAvatarDerecha(){
    pj.style.transform = 'rotateY(0)';
    pj.style.animationName = "walkRight";
    pj.style.animationDuration = ".8s";
    pj.style.animationTimingFunction = "steps(11)";
    pj.style.animationIterationCount = "infinite";
    
}

function detenerAvatar(){
    pj.style.background = personajeParado;
    pj.style.animationDuration = "0s";
}

function moverAvatarIzquierda(){
    pj.style.animationName = "walkRight";
    pj.style.animationDuration = "1s";
    pj.style.animationTimingFunction = "steps(11)";
    pj.style.animationIterationCount = "infinite";
    pj.style.transform = 'rotateY(180deg)';
}

function agacharAvatar(){
    pj.style.background = "url(../img/Angel1/Sliding/0_Fallen_Angels_Sliding_001.png)";
    pj.style.backgroundRepeat ="no-repeat";
    pj.style.animationName = "";
}

function saltarAvatar(){
    pj.style.animationName = "salto";
    pj.style.background = "url(../img/Angel1/Running/0_Fallen_Angels_Running_008.png)";        
    pj.style.animationDuration = "2s";
    pj.style.animationTimingFunction = "linear";
    pj.style.animationIterationCount = "forward";            
}




// pj.style.animationName = "walkRight";
// pj.style.animationDuration = "1s";
// pj.style.animationTimingFunction = "steps(11)";
// pj.style.animationIterationCount = "infinite";


// window.addEventListener('keydown',checkKey)
// window.addEventListener('keyup', ()=>{
    

//     // pj.style.transform = 'translateY(0px)';
//      //setPj();


// })
// function setPj(){
//     pj.style.background = personajeParado;
//     pj.style.backgroundRepeat ="no-repeat";
//     pj.style.animationName = "walkRight";
//     pj.style.animationDuration = "1s";
//     pj.style.animationTimingFunction = "steps(11)";
//     pj.style.animationIterationCount = "infinite";
// }
// function checkKey(e) {
//     e = e || window.event;
    

//     if (e.keyCode == '38' && keyDown) {
       
//         // up arrow
//         keyDown=false;
//         pj.style.background = "url(../img/Angel1/Running/0_Fallen_Angels_Running_008.png)";
//         pj.style.backgroundRepeat ="no-repeat";
//         pj.style.animationName = "salto";
//         pj.style.animationDuration = "2s";
//         pj.style.animationTimingFunction = "cubic-bezier(.79,.52,.99,.01)";
//         pj.style.animationIterationCount = "";
//         pj.style.animationIterationCount = "forwards";
//         setPj();
//         keyDown=true;
//     }
//     else if (e.keyCode == '40') {
//         pj.style.background = "";
//         pj.style.background = "url(../img/Angel1/Sliding/0_Fallen_Angels_Sliding_001.png)";
//         pj.style.backgroundRepeat ="no-repeat";
//         pj.style.animationName = "";
//         // down arrow
//     }
//     else if (e.keyCode == '37') {
//        // left arrow
//     //    fondo.style.animationName = "moveBackgroundRight";
//     //    fondo.style.animationDuration = "6s";
//     //    fondo.style.animationTimingFunction = "linear";
//     //    fondo.style.animationIterationCount = "infinite";
//     //    pj.style.transform = 'translateX(-100px) rotateY(180deg)';
//        //pj.style.animation: walkLeft 4s steps(11) foward;
//        //fondo.stlye.animation: moveBackgroundRight 5s linear foward;
//     }
//     else if (e.keyCode == '39') {
//        // right arrow
//        fondo.style.animationName = "moveBackgroundLeft";
//     //    pj.style.transform = 'translateX(100px)';
//     //    pj.style.animation = 'walkRight 5s steps(11) foward';
//     //    fondo.style.animation = "moveBackgroundLeft 5s linear foward";
//     }
// }




let keyDown;
let ev;
window.addEventListener("keydown", (e) =>{
    keyDown = true;
    ev = e;
})
window.addEventListener("keyup", (e) =>{
    keyDown = false;
    ev = e;

})

let start, previousTimeStamp;


function step(timestamp){
    if(start == undefined){
        start = timestamp
    }
    const elapsed = timestamp - start;

    if(previousTimeStamp !== timestamp){
        if(keyDown){
            if (ev.key == "ArrowRight"){
                moverFondoIzquierda();
                moverAvatarDerecha();
            } 
            if (ev.key == "ArrowLeft"){
                moverFondoDerecha();
                moverAvatarIzquierda();
            } 
            if (ev.key == "ArrowDown"){
                agacharAvatar();
            }
                
            if (ev.key == "ArrowUp"){
                saltarAvatar();
                //Cuando termina de saltar, obtengo la altura del pj y se la paso al metodo dejar de saltar
                
            }
        }else{
            detenerFondo();
            detenerAvatar();
            //parar mundo
            //animacion tipito parado
            //sacar las animaciones a todo
            //classList.remove animaciones?
        }
    }

    if(elapsed < 1000000){
        previousTimeStamp = timestamp;
        window.requestAnimationFrame(step);
    }
    else{
        //terminar juego
    }
}
window.requestAnimationFrame(step);


