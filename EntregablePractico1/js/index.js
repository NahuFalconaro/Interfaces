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

function blurFilter() {
    let a = 255;
    let imageData = ctx.getImageData(0, 0, width, height);
    applyBlur(imageData, a);
    ctx.putImageData(imageData, 0, 0) * 4;
}

function applyBlur(imageData, a){
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let rgbAverage = [];
            rgbAverage = averageMatrix(x, y, imageData);
            let r = rgbAverage[0];
            let g = rgbAverage[1];
            let b = rgbAverage[2];
            setPixel(imageData,x,y,r,g,b,a);
        }
    }
}
function averageMatrix(imageData, x ,y){
    let retorno = [];
    let r=0;
    let g=0;
    let b=0;
    for (let imgX = x - 1; imgX < x + 1; x++) {
        for (let imgY = y - 1; imgY < y + 1; y++) { 
            let rgb = [];
            rgb = getRgb(imageData, x, y);
            r += rgb[0];
            g += rgb[1];
            b += rgb[2];
        } 
    }

    r = r/9;
    g = g/9;
    b = b/9;
    retorno.push(r);
    retorno.push(g);
    retorno.push(b);
    return retorno;
}

function getRed(imageData, x , y){
    let index = (x + y * imgData.width) * 4;
    return imgData.data[index];
}
function getGreen(imageData, x , y){
    let index = (x + y * imgData.width) * 4;
    return imgData.data[index + 1];
}
function getBlue(imageData, x , y){
    let index = (x + y * imgData.width) * 4;
    return imgData.data[index + 2];
}
