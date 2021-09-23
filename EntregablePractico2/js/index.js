let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imgTablero = "img/7enLinea(9x8).png";
let imgFicha1 = "img/fichaAnivia.png";
let imgFicha2 = "img/descarga.jpg";
let fil = 9;
let col = 8;
let juego = new Juego("nahue", "juanpe", 10000, 0, 0, ctx, canvas, imgTablero, imgFicha1, imgFicha2, col, fil)