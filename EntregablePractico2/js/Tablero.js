class Tablero{
    constructor(x,y,ctx,canvas,img){
        this.matrizTablero=[];
        this.maxX=x;
        this.maxY=y
        this.inicMatriz();
        this.dibujarTablero(ctx,canvas,img)
    }

    inicMatriz(){
        for (let i = 0; i < this.maxX; i++) {
            matrizTablero[i] = [];
            for (let j = 0; j < this.maxY; j++) {
                matrizTablero[i][j] = null;
            }
        }
    }
    
    dibujarTablero(ctx,canvas,img){

        let image = new Image();

        image.src = img;
    
        image.onload = function() {
            myDrawImage(this);
        }
    
        function myDrawImage(image){
            ctx.drawImage(image,canvas.width / 2 - image.width / 2,canvas.height  - image.height );
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



