var canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");
let pencil = new Pencil(1, 'circle');
let width = canvas.width;
let height = canvas.height;
let mouseDown = false;
fillWhite();




document.getElementById("pencil").addEventListener("click", () => {
    pencil.setForm('circle');
})
document.getElementById("rubber").addEventListener("click", () => {
    pencil.setForm('rubber');
})


document.getElementById("paint").addEventListener("mousedown", () => {
    mouseDown = true;
    ctx.beginPath();
})

document.getElementById("paint").addEventListener("mousemove", (e) => {
    if (mouseDown) {
        draw(e)
    }

})

document.getElementById("paint").addEventListener("mouseup", () => {
    mouseDown = false;
})

window.addEventListener("mouseup", () => {
    mouseDown = false;
})

function draw(e) {
    ctx.lineWidth = pencil.getGrosor();
    let color = document.getElementById("color").value;
    let grosor = document.getElementById("grosor").value;
    if (pencil.getForm() == 'circle') {
        ctx.lineCap = 'round';
    } else {
        color = "#ffffff"
        ctx.lineCap = 'square';
    }
    pencil.setGrosor(grosor);
    pencil.setColor(color);
    ctx.strokeStyle = pencil.getColor();
    let c = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - c.left, e.clientY - c.top);
    ctx.stroke();

}

//Empieza codigo modal inicio
let pop_up = document.getElementById("pop-up");
let closePop = document.getElementById("close-pop-up");

closePop.addEventListener("click", close_popUp);


//Documentacion
//https://es.stackoverflow.com/questions/326168/saber-si-se-hizo-click-dentro-fuera-del-div
//Le agrego un listener al evento en toda la ventana

window.addEventListener('click', function (e) {
    //si el div no contiene el target lo oculta
    if (!(pop_up.contains(e.target))) {
        pop_up.classList.add("hidden");
    }
})

function close_popUp() {
    pop_up.classList.add("hidden");
    fillWhite();
}

function fillWhite() {
    ctx.fillStyle = "#FFFFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


//Codigo para borrar imagen de canvas
let btn_borrar = document.getElementById("borrar_imagen");

btn_borrar.addEventListener('click', borrar_canvas);

function borrar_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = width;
    canvas.height = height;
    fillWhite();
}



let file = document.getElementById('archivo');
let fileModal = document.getElementById('archivoModal');

file.addEventListener('change', subirImagen);
fileModal.addEventListener('change', subirImagen);

function subirImagen(event) {
    close_popUp();
    borrar_canvas();
    let reader = new FileReader();
    let fileReader = event.target.files[0];
    reader.readAsDataURL(fileReader);
    reader.onloadend = (event) => {
        let contenido = event.target.result;
        let image = new Image();
        image.src = contenido;
        image.onload = () => {
            //Sacando el if y el else todas las imagenes se adaptarian al tamaño del canvas
            if ((canvas.width < image.width) || (canvas.height < image.height)) {
                var hRatio = canvas.width / image.width;
                var vRatio = canvas.height / image.height;
                var ratio = Math.min(hRatio, vRatio);
                canvas.width = image.width * ratio;
                canvas.height = image.height * ratio;
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * ratio, image.height * ratio);
            } else {
                ctx.clearRect(0, 0, width, height);
                canvas.width = image.width
                canvas.height = image.height
                ctx.drawImage(image, 0, 0);
            }
        }
    }
    file.value = "";
}

//guardar imagen

let btn_guardarImagen = document.getElementById("guardar_imagen");

btn_guardarImagen.addEventListener('click', () => {
    let boton = document.createElement('a');
    boton.download = "Paint.png";
    boton.href = document.getElementById('paint').toDataURL("image/png").replace("image/png", "image/octet-stream");
    boton.click();
})

//pop-up filtro

document.getElementById("select-filters").addEventListener("click", showOrHideFilters)
function showOrHideFilters() {
    let divFilters = document.getElementById("filters")
    divFilters.classList.toggle("hidden");
}


//filtros


//negativo 

document.getElementById("negative").addEventListener("click", negativeFilter);

function negativeFilter() {
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applyNegative(imageData, a);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applyNegative(imageData, a) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            setPixelNegative(imageData, x, y, a);
        }
    }
}

function setPixelNegative(imageData, x, y, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = 255 - imageData.data[index];
    imageData.data[index + 1] = 255 - imageData.data[index + 1];
    imageData.data[index + 2] = 255 - imageData.data[index + 2];
    imageData.data[index + 3] = a;
}


//brillo


document.getElementById("menosBrillo").addEventListener("click", brightnessFilter);
document.getElementById("masBrillo").addEventListener("click", brightnessFilter);

function brightnessFilter(e) {
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applyBrightnessFilter(imageData, a, e);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applyBrightnessFilter(imageData, a, e) {
    if(e.target.id === "masBrillo"){
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelMore(imageData,x,y,a);
            }
        }
    }else{
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelLess(imageData,x,y,a);
            }
        }
    }
    
}
function setPixelLess(imageData, x, y, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = imageData.data[index + 0] - 5;
    imageData.data[index + 1] = imageData.data[index + 1] - 5;
    imageData.data[index + 2] = imageData.data[index + 2] - 5;
    imageData.data[index + 3] = a;
}
function setPixelMore(imageData, x, y, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = imageData.data[index + 0] + 5;
    imageData.data[index + 1] = imageData.data[index + 1] + 5;
    imageData.data[index + 2] = imageData.data[index + 2] + 5;
    imageData.data[index + 3]= a;
}
//greyscale
document.getElementById("greyScale").addEventListener("click", greyScaleFilter);

function greyScaleFilter() {
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applyGreyScale(imageData, a);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applyGreyScale(imageData, a) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            setPixelGreyScale(imageData, x, y, a);
        }
    }
}

function setPixelGreyScale(imageData, x, y, a) {
    let index = (x + y * imageData.width) * 4;
    var grey = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
    imageData.data[index + 0] = grey;
    imageData.data[index + 1] = grey;
    imageData.data[index + 2] = grey;
    imageData.data[index + 3] = a;
}

//binarizacion

document.getElementById("binarizacion").addEventListener("click", binarizacionFilter);

function binarizacionFilter() {
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applyBinarizacion(imageData, a);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applyBinarizacion(imageData, a) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            setPixelBinarizacion(imageData, x, y, a);
        }
    }
}

function setPixelBinarizacion(imageData, x, y, a) {
    //Sacas el promedio, si el promedio es mayor a 255/2, es 255, si no, es 0
    let index = (x + y * imageData.width) * 4;
    var binarizacion = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
    (binarizacion > (255/2)) ? binarizacion = 255: binarizacion = 0;
    imageData.data[index + 0] = binarizacion;
    imageData.data[index + 1] = binarizacion;
    imageData.data[index + 2] = binarizacion;
    imageData.data[index + 3] = a;
}

//Sepia

document.getElementById("sepia").addEventListener("click", sepiaFilter);

function sepiaFilter() {
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applySepia(imageData, a);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applySepia(imageData, a) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            setPixelSepia(imageData, x, y, a);
        }
    }
}

function setPixelSepia(imageData, x, y, a) {
    //https://stackoverflow.com/questions/1061093/how-is-a-sepia-tone-created
    //https://www.techrepublic.com/blog/how-do-i/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/
    let index = (x + y * imageData.width) * 4;
    var r = imageData.data[index + 0];
    var g = imageData.data[index + 1];
    var b = imageData.data[index + 2];

    imageData.data[index + 0] = 255 - r;
    imageData.data[index + 0] = 255 - g;
    imageData.data[index + 0] = 255 - b;

    imageData.data[index + 0] = (r * .393) + (g * .769) + (b * .189);
    imageData.data[index + 1] = (r * .349) + (g * .686) + (b * .168);
    imageData.data[index + 2] = (r * .272) + (g * .534) + (b * .131);
    imageData.data[index + 3] = a;
}


//Saturacion

document.getElementById("saturacion").addEventListener("change", saturacionFilter);

function saturacionFilter() {
    let sat = document.getElementById("saturacion").value;
    sat = sat/100
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applySaturacion(imageData, a,sat);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applySaturacion(imageData, a,sat) {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            //obtengo rgb
            let arr=[];
            arr=getRgb(imageData, x, y);
            let r = arr[0];
            let g = arr[1];
            let b = arr[2];
            
            //paso de rgb a hsl
            let arrHsl=[]
            arrHsl=rgbToHsl(r, g, b);
            let h = arrHsl[0];
            let s = arrHsl[1];
            let l = arrHsl[2];
            //modifico s
            s=sat;
            //paso de hsl a rgb
            arr=hslToRgb(h,s,l);
            r=arr[0];
            g=arr[1];
            b=arr[2];
            //reemplazo el pixel
            setPixel(imageData,x,y,r,g,b,a);
        }
    }
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h, s, l ];
  }


  function hslToRgb(h, s, l) {
    var r, g, b;
  
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }
  
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return [ r * 255, g * 255, b * 255 ];
  }




function getRgb(imageData, x, y) {

    let index = (x + y * imageData.width) * 4;
    let arr=[];
    arr[0]=imageData.data[index + 0];
    arr[1]=imageData.data[index + 1];
    arr[2]=imageData.data[index + 2];
    return arr;
}

function setPixel(imageData, x, y,r,g,b, a) {

    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

//Falta hacer andar el de brillo
//Opcion : volver al metodo anterior, con dos botones, uno que sume 1 a brillo y otro que reste 1
//Logica : sumar uno o restar uno a los valores rgb.

//anotacion
//Trabajar con el canvas al aplicar los filtros, o trabajar con los pixeles de la foto y aplicarlos al canvas sin modificar la foto?

//promedio matriz

document.getElementById("blur").addEventListener("click", blurFilter);


function getRed(imageData, x , y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index];
}
function getGreen(imageData, x , y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}
function getBlue(imageData, x , y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}

function blurFilter() {
    let mat = [[1/9, 1/9, 1/9],
                [1/9, 1/9, 1/9],
                [1/9,1/9,1/9]]
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applyBlur(imageData,mat, a);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applyBlur(imageData, mat, a){
    for (let x = 1; x < canvas.width - 1; x++) {
        for (let y = 1; y < canvas.height - 1; y++) {
           let rgb = averageMatrix(imageData, mat, x, y, a );
           setPixel(imageData,x,y,rgb[0],rgb[1],rgb[2],a);
        }
    }
}

//Forma vertical y horizontal:
	//[(x + 1), y] + [(x - 1), y] + [(x,(y + 1))] + [(x, (y - 1))] 
    // Hago, x+1 y obtengo el vecino de adelante en horizontal, x-1 el vecino anterior
	// Hago, y+1 y obtengo el vecino de superior en vertical, y-1 el vecino inferior
//Forma diagonal:
    //[(x - 1), (y - 1)]+ [(x + 1), (y - 1)]  + [(x - 1), (y - 1)] + [(x - 1), (y + 1)] ,[(x,y)]
    // Hago, x+1, y-1 y obtengo el vecino de diagonal superior derecha
	// Hago, x-1, y-1 y obtengo el vecino de diagonal superior izquierda
	// Hago, x-1, y+1 y obtengo el vecino de diagonal inferior izquierda
	// Hago, x+1, y+1 y obtengo el vecino de diagonal inferior derecha


// function averageMatrix(imageData, mat, x ,y, a){
//      let r=0;
//      let g=0;
//      let b=0;
//      let promed = 1/9;

//     for (let imgX = x - 1; imgX <= x + 1; imgX++) {
//         for (let imgY = y - 1; imgY <= y + 1; imgY++) { 
//                 r += getRed(imageData, imgX, imgY) * promed;
//                 g += getGreen(imageData, imgX, imgY) * promed;
//                 b += getBlue(imageData, imgX, imgY) * promed;
//             }

//         }
//     setPixel(imageData,x,y,r,g,b,a);
// }
// function averageMatrix(imageData, mat, x ,y){
//     let r=0;
//     let g=0;
//     let b=0;
//     let matX = 0;
//     let matY = 0;
//     for (let imgX = x - 1; imgX <= x + 1; imgX++) {
//         for (let imgY = y - 1; imgY <= y + 1; imgY++) { 
//                 r += getRed(imageData, imgX, imgY) * devolverValorEnMatriz(mat, matX, matY );
//                 g += getGreen(imageData, imgX, imgY) * devolverValorEnMatriz(mat, matX, matY );
//                 b += getBlue(imageData, imgX, imgY) * devolverValorEnMatriz(mat, matX, matY );
//             matY++;
//         }
//         matY=0;
//         matX++;
//     }
//     return [r,g,b]
// }

function averageMatrix(imageRestore,matriz, x, y) {
    r = getRed(imageRestore, x - 1, y - 1) * matriz[0][0] + getRed(imageRestore, x, y - 1) * matriz[0][1] + getRed(imageRestore, x + 1, y - 1) * matriz[0][2]
        + getRed(imageRestore, x - 1, y) * matriz[1][0] + getRed(imageRestore, x, y) * matriz[1][1] + getRed(imageRestore, x + 1, y) * matriz[1][2]
        + getRed(imageRestore, x - 1, y + 1) * matriz[2][0] + getRed(imageRestore, x, y + 1) * matriz[2][1] + getRed(imageRestore, x + 1, y + 1) * matriz[2][2];

    //indice = matriz.lenght - 2;
    //for(let i=0; i < matriz.lenght; i++)
    //  for(let j=0; j < matriz.lenght; j++)
    //      getGreen() * matriz[i][j]   ----- si j=0 -> x-1  -- si j=1 -> x -- si j=2 -> x+1
    //                                  ----- si i=0 -> y-1  -/- si i=1 -> y -/- si i=2 y+1

    g = getGreen(imageRestore, x - 1, y - 1) * matriz[0][0] + getGreen(imageRestore, x, y - 1) * matriz[0][1] + getGreen(imageRestore, x + 1, y - 1) * matriz[0][2]
        + getGreen(imageRestore, x - 1, y) * matriz[1][0] + getGreen(imageRestore, x, y) * matriz[1][1] + getGreen(imageRestore, x + 1, y) * matriz[1][2]
        + getGreen(imageRestore, x - 1, y + 1) * matriz[2][0] + getGreen(imageRestore, x, y + 1) * matriz[2][1] + getGreen(imageRestore, x + 1, y + 1) * matriz[2][2];

    b = getBlue(imageRestore, x - 1, y - 1) * matriz[0][0] + getBlue(imageRestore, x, y - 1) * matriz[0][1] + getBlue(imageRestore, x + 1, y - 1) * matriz[0][2]
        + getBlue(imageRestore, x - 1, y) * matriz[1][0] + getBlue(imageRestore, x, y) * matriz[1][1] + getBlue(imageRestore, x + 1, y + 1) * matriz[1][2]
        + getBlue(imageRestore, x - 1, y + 1) * matriz[2][0] + getBlue(imageRestore, x, y + 1) * matriz[2][1] + getBlue(imageRestore, x + 1, y + 1) * matriz[2][2];

    setPixel(imageRestore, x, y, r, g, b, 255);
}
function devolverValorEnMatriz( mat, x, y){
    return mat[x][y];
}

//deteccion de bordes

document.getElementById("deteccionBordes").addEventListener("click", deteccionDeBordesFilter);
// function deteccionDeBordesFilter() {
//     let mat = [[-1, 0, 1],
//                 [-2, 0, 2],
//                 [-1, 0, 1]];

//     let matY=[[-1, -2, -1],
//               [0, 0, 0],
//               [1, 2, 1]];
//     let a = 255;
//     let imageData = ctx.getImageData(0, 0, width, height);
//     applyDeteccionDeBordes(imageData,mat,matY, a);
//     ctx.putImageData(imageData, 0, 0);
// }

// function applyDeteccionDeBordes(imageData, mat,matY, a){
//     applyGreyScale(imageData, a);
//     for (let x = 1; x < imageData.width -1 ; x++) {
//         for (let y = 1; y < imageData.height -1; y++) {
            
//             //let gX = averageMatrix(imageData, mat, x, y);
//             //gX = (gX[0] + gX[1] + gX[2]) / 3;
//             //let gY = averageMatrix(imageData, matY, x, y);
//             //gY = (gY[0] + gY[1] + gY[2]) / 3;
//             averageMatrix(imageData, mat, x, y);
//             //averageMatrix(imageData, matY, x, y);
//             //let magnitud = Math.sqrt(Math.pow(gX, 2) + Math.pow(gY, 2));
            
//             //magnitud = (magnitud/1000) * 255;
//             //Math.floor(magnitud);
//             //setPixel(imageData,x,y,magnitud,magnitud,magnitud,255);

//         }

//     }
// }

function deteccionDeBordesFilter (){
    let pictureData = ctx.getImageData(0, 0, width, height);
        let bkpPicture = backupImage(pictureData);
        let k_x =[
            [-1,0,1],
            [-2,0,2],
            [-1,0,1]
        ];  // matriz para multiplicar el lado  horizontal
        let k_y =[
            [-1,-2,-1],
            [0,0,0],
            [1,2,1]
        ];// matriz para multiplicar el lado vertical
        let datos = pictureData ;
        let grayscale = [];

        function mixPixel (data){
            return function(x,y,i){
                i = i || 0 ; 
                return data[((pictureData.width*y)+x)*4+i];//accede a los datos de la amagen solo si el valor de i es i o 0
            };
        } 

         let data = pictureData.data ; // toma los datos de la imagen a la que se le quiere aplicar el filtro 
         let pixel = mixPixel(data); // contiene la funcion anonima que rsta dentro de mixPixel () , paso la variable data para que cuando se acceda con x,y recorra sobre los datos que tiene la variable data.
             for (let y = 0; y< pictureData.height;y++){
                 for (let x = 0 ; x < pictureData.width ; x++){
                     let r = pixel(x,y,0); // accede al pixel r de la posicion x,y actual   
                     let g = pixel(x,y,1); // accede al pixel g de la posicion x,y actual   
                     let b = pixel(x,y,2);// accede al pixel b de la posicion x,y actual   
                     let avg = (r + g + b) / 3 ; // hace el promedio de los 3 para transformar en una tonalidad gris 
                     grayscale.push(avg,avg,avg,255); // va guardando en un arreglo los valores que van tomando los pixel rgb y el a en 255 ya que no es necesario modificar 
                 }
             }
            
           
          pixel = mixPixel(grayscale); // contiene la funcion anonima que rsta dentro de mixPixel () , paso la variable grayscale que tiene los valores de los pixeles de la imagen con las tonalidades de grises,  para que cuando se acceda con x,y recorra sobre los datos que tiene la variable grayscale.
            for (let y = 0; y< pictureData.height;y++){
                for (let x = 0 ; x < pictureData.width ; x++){
                    let pixelX = (
                    (k_x[0][0]* pixel (x-1,y-1))+
                    (k_x[0][1]* pixel (x,y-1))+
                    (k_x[0][2]* pixel (x+1,y-1))+
                    (k_x[1][0]* pixel (x-1,y))+
                    (k_x[1][1]* pixel (x,y))+
                    (k_x[1][2]* pixel (x+1,y))+
                    (k_x[2][0]* pixel (x-1,y+1))+
                    (k_x[2][1]* pixel (x,y+1))+
                    (k_x[2][2]* pixel (x +1,y+1))
                    );//multiplico los valores de la matriz horizontal  (k_x) con los pixel de la imagen con las tonalidades de grises  y los guardo como matriz en pixelX 
                    let pixelY = (
                    (k_y[0][0]*pixel(x-1,y-1))+
                    (k_y[0][1]*pixel(x,y-1))+
                    (k_y[0][2]*pixel(x+1,y-1))+
                    (k_y[1][0]*pixel(x-1,y))+
                    (k_y[1][1]*pixel(x,y))+
                    (k_y[1][2]*pixel(x+1,y))+
                    (k_y[2][0]*pixel(x-1,y+1))+
                    (k_y[2][1]*pixel(x,y+1))+
                    (k_y[2][2]*pixel(x+1,y+1))
                    );//multiplico los valores de la matriz vertical (k_y) con los pixel de la imagen con las tonalidades de grises  y lo guardo como matriz en pixelY
                    let magnitud = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY));// Math.sqrt retorna la raiz cuadrada de  pixelX elevado al cuadrado (pixelX * pixelX) + pixelY elevado al cuadrado (pixelY * pixelY).
                    magnitud = (magnitud/1000) * 255;
                    setPixel(datos,x,y,magnitud,magnitud,magnitud,255);
                }
            } 
            ctx.putImageData(datos, 0, 0);      
            pictureData = bkpPicture;
}





// function deteccionDeBordesFilter (){
//     let pictureData = ctx.getImageData(0, 0, width, height);
//         let bkpPicture = backupImage(pictureData);
//         let k_x =[
//             [-1,0,1],
//             [-2,0,2],
//             [-1,0,1]
//         ];  // matriz para multiplicar el lado  horizontal
//         let k_y =[
//             [-1,-2,-1],
//             [0,0,0],
//             [1,2,1]
//         ];// matriz para multiplicar el lado vertical
//         let datos = pictureData ;
//         let grayscale = [];

//         function mixPixel (data){
//             return function(x,y,i){
//                 i = i || 0 ; 
//                 return data[((pictureData.width*y)+x)*4+i];//accede a los datos de la amagen solo si el valor de i es i o 0
//             };
//         } 

//          let data = pictureData.data ; // toma los datos de la imagen a la que se le quiere aplicar el filtro 
//          let pixel = mixPixel(data); // contiene la funcion anonima que rsta dentro de mixPixel () , paso la variable data para que cuando se acceda con x,y recorra sobre los datos que tiene la variable data.
//              for (let y = 0; y< pictureData.height;y++){
//                  for (let x = 0 ; x < pictureData.width ; x++){
//                      let r = pixel(x,y,0); // accede al pixel r de la posicion x,y actual   
//                      let g = pixel(x,y,1); // accede al pixel g de la posicion x,y actual   
//                      let b = pixel(x,y,2);// accede al pixel b de la posicion x,y actual   
//                      let avg = (r + g + b) / 3 ; // hace el promedio de los 3 para transformar en una tonalidad gris 
//                      grayscale.push(avg,avg,avg,255); // va guardando en un arreglo los valores que van tomando los pixel rgb y el a en 255 ya que no es necesario modificar 
//                  }
//              }
            
           
//           pixel = mixPixel(grayscale); // contiene la funcion anonima que rsta dentro de mixPixel () , paso la variable grayscale que tiene los valores de los pixeles de la imagen con las tonalidades de grises,  para que cuando se acceda con x,y recorra sobre los datos que tiene la variable grayscale.
//             for (let y = 0; y< pictureData.height;y++){
//                 for (let x = 0 ; x < pictureData.width ; x++){
//                     let pixelX = (
//                     (k_x[0][0]* pixel (x-1,y-1))+
//                     (k_x[0][1]* pixel (x,y-1))+
//                     (k_x[0][2]* pixel (x+1,y-1))+
//                     (k_x[1][0]* pixel (x-1,y))+
//                     (k_x[1][1]* pixel (x,y))+
//                     (k_x[1][2]* pixel (x+1,y))+
//                     (k_x[2][0]* pixel (x-1,y+1))+
//                     (k_x[2][1]* pixel (x,y+1))+
//                     (k_x[2][2]* pixel (x +1,y+1))
//                     );//multiplico los valores de la matriz horizontal  (k_x) con los pixel de la imagen con las tonalidades de grises  y los guardo como matriz en pixelX 
//                     let pixelY = (
//                     (k_y[0][0]*pixel(x-1,y-1))+
//                     (k_y[0][1]*pixel(x,y-1))+
//                     (k_y[0][2]*pixel(x+1,y-1))+
//                     (k_y[1][0]*pixel(x-1,y))+
//                     (k_y[1][1]*pixel(x,y))+
//                     (k_y[1][2]*pixel(x+1,y))+
//                     (k_y[2][0]*pixel(x-1,y+1))+
//                     (k_y[2][1]*pixel(x,y+1))+
//                     (k_y[2][2]*pixel(x+1,y+1))
//                     );//multiplico los valores de la matriz vertical (k_y) con los pixel de la imagen con las tonalidades de grises  y lo guardo como matriz en pixelY
//                     let magnitud = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY));// Math.sqrt retorna la raiz cuadrada de  pixelX elevado al cuadrado (pixelX * pixelX) + pixelY elevado al cuadrado (pixelY * pixelY).
//                     magnitud = (magnitud/1000) * 255;
//                     setPixel(datos,x,y,magnitud,magnitud,magnitud,255);
//                 }
//             } 
//             ctx.putImageData(datos, 0, 0);      
//             pictureData = bkpPicture;
// }
function backupImage(pictureData){
    let backupPicture = new ImageData(pictureData.width, pictureData.height);
    for (let x = 0; x < pictureData.width; x++){
        for (let y = 0; y < pictureData.height; y++){
            let index = (x + y * pictureData.width) * 4
            let r = pictureData.data[index + 0];
            let g = pictureData.data[index + 1];
            let b = pictureData.data[index + 2];
            let a = pictureData.data[index + 3];
            setPixel(backupPicture, x, y, r, g, b, 255);
        }
    }
    return backupPicture;
}