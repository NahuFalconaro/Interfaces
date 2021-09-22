
let canvas =  document.getElementById("myCanvas");
canvas.w
ctx = canvas.getContext("2d");
//let tablero = new Tablero ("img/4enLinea(6x5).png",0,0,ctx)

//dibujarTablero(ctx){

    let image = new Image();

    image.src = "img/7enLinea(9x8).png";

    image.onload = function() {
        canvas.height = image.height;
        canvas.width = image.width;
        myDrawImage(this);
    }

    function myDrawImage(image){
        ctx.drawImage(image, 0, 0);
    }
//}