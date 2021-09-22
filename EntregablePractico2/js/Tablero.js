class Tablero{
    constructor(img,maxX,maxY,ctx){
        //this.matrizTablero=[];
        this.fondo=img;
        //inicMatriz(maxX,maxY);
        dibujarTablero(ctx);
    }

    inicMatriz(maxX,maxY){
        for (let i = 0; i < maxX; i++) {
            matrizTablero[i] = [];
            for (let j = 0; j < maxY; j++) {
                matrizTablero[i][j] = null;
            }
        }
    }
    dibujarTablero(ctx){

        let image = new Image();

        image.src = fondo;

        image.onload = function() {
            myDrawImage(this);
        }

        function myDrawImage(image){
            ctx.drawImage(image, 0, 0);
        }
    }
    
    addFicha(x, y, ficha){
        this.matrizTablero[x][y]=ficha;
    }
    
    hayEnLinea(){
        
    }
    busquedaVertical(){}
    busquedaHorizontal(){}
    busquedaDiagonal(){}

    
}



