let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imgTablero = "img/7enLinea(9x8).png";
let fil = 9;
let col = 8;
let imgFicha = "aca va a ir una imagen de disco xd"
let juego = new Juego("nahue", "juanpe", 10000, 0, 0, ctx, canvas, imgTablero, imgFicha, col, fil)