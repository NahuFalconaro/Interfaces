var canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");
let pencil = new Pencil(1,'circle');
let width = canvas.width;
let height = canvas.height;
let mouseDown=false;
fillWhite();


document.getElementById("pencil").addEventListener("click",()=>{
    pencil.setForm('circle');
})
 document.getElementById("rubber").addEventListener("click",()=>{
     pencil.setForm('rubber');
 })


document.getElementById("paint").addEventListener("mousedown",()=>{
    mouseDown=true;
    ctx.beginPath();
})

document.getElementById("paint").addEventListener("mousemove",(e)=>{
    if(mouseDown){
        draw(e)
    }

})

document.getElementById("paint").addEventListener("mouseup",()=>{
    mouseDown=false;
})

function draw(e){
        ctx.lineWidth = pencil.getGrosor();
        let color= document.getElementById("color").value;
        let grosor = document.getElementById("grosor").value;
        if (pencil.getForm() == 'circle') {
            ctx.lineCap = 'round';
        }else{
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

window.addEventListener('click', function(e){
    //si el div no contiene el target lo oculta
    if(!(pop_up.contains(e.target))){
        pop_up.classList.add("hidden");
    }
})

function close_popUp(){
    pop_up.classList.add("hidden");
    fillWhite();  
}

function fillWhite(){
    ctx.fillStyle = "#FFFFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


//Codigo para borrar imagen de canvas
let btn_borrar = document.getElementById("borrar_imagen");

btn_borrar.addEventListener('click', borrar_canvas);

function borrar_canvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = width;
    canvas.height = height;
    fillWhite();
}


    
let file = document.getElementById('archivo');
let fileModal = document.getElementById('archivoModal');

file.addEventListener('change', subirImagen);
fileModal.addEventListener('change', subirImagen);

function subirImagen(event){
 
    close_popUp();
    borrar_canvas();
    let reader = new FileReader();
    let fileReader = event.target.files[0];
    reader.readAsDataURL(fileReader);
    reader.onloadend = (event)=> {
        let contenido = event.target.result;
        let image = new Image();
        image.src = contenido;
        image.onload = ()=> {
            //Sacando el if y el else todas las imagenes se adaptarian al tamaño del canvas
            if ((canvas.width<image.width)||(canvas.height<image.height)){
                var hRatio = canvas.width / image.width;
                var vRatio = canvas.height / image.height;
                var ratio  = Math.min ( hRatio, vRatio );
                canvas.width=image.width*ratio;
                canvas.height=image.height*ratio;
                ctx.drawImage(image, 0,0, image.width, image.height, 0,0,image.width*ratio, image.height*ratio);
            }else{
                ctx.clearRect(0, 0, width, height);
                canvas.width=image.width
                canvas.height=image.height
                ctx.drawImage(image,0,0); 
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

document.getElementById("select-filters").addEventListener("click",showOrHideFilters)

function showOrHideFilters(){
    let divFilters = document.getElementById("filters")
    divFilters.classList.toggle("hidden");
}


//filtros


//negativo 

document.getElementById("negative").addEventListener("click",negativeFilter);

function negativeFilter(){
    let a = 255;
    let imageData = ctx.getImageData(0,0,width,height);
    applyNegative(imageData,a);
    ctx.putImageData(imageData,0,0)*4;
}

function applyNegative(imageData,a){
    for (let x=0;x<width;x++){
        for (let y=0;y<height;y++){
            setPixelNegative(imageData,x,y,a);
        }
    }
}

function setPixelNegative(imageData, x, y, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = 255-imageData.data[index];
    imageData.data[index+1] = 255-imageData.data[index+1];
    imageData.data[index+2] = 255-imageData.data[index+2];
    imageData.data[index+3] = a;
}


//Binarizacion


document.getElementById("binarizacion").addEventListener("click", binarizacionFilter);

function binarizacionFilter(){
    let a = 255;
    let imageData = ctx.getImageData(0,0,width,height);
    applyBinarizacion(imageData,a);
    ctx.putImageData(imageData,0,0)*4;
}

function applyBinarizacion(imageData, a){
    for (let x=0;x<width;x++){
        for (let y=0;y<height;y++){
            setPixelBinarizacion(imageData,x,y,a);
        }
    }
}

function setPixelBinarizacion(imageData, x, y, a){

    let index = (x + y * imageData.width) * 4;
    var binarizacion= (imageData.data[index+0]+imageData.data[index+1]+imageData.data[index+2]) / 3;
    imageData.data[index+0] = binarizacion;
    imageData.data[index+1] = binarizacion;
    imageData.data[index+2] = binarizacion;
    imageData.data[index+3] = a;
}

//Sepia

document.getElementById("sepia").addEventListener("click", sepiaFilter);

function sepiaFilter(){
    let a = 255;
    let imageData = ctx.getImageData(0,0,width,height);
    applySepia(imageData,a);
    ctx.putImageData(imageData,0,0)*4;
}

function applySepia(imageData, a){
    for (let x=0;x<width;x++){
        for (let y=0;y<height;y++){
            setPixelSepia(imageData,x,y,a);
        }
    }
}

function setPixelSepia(imageData, x, y, a){
    //https://stackoverflow.com/questions/1061093/how-is-a-sepia-tone-created
    //https://www.techrepublic.com/blog/how-do-i/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/
    let index = (x + y * imageData.width) * 4;
    var r = imageData.data[index+0];
    var g = imageData.data[index+1];
    var b = imageData.data[index+2];
    
    imageData.data[index+0] = 255 - r;
    imageData.data[index+0] = 255 - g;
    imageData.data[index+0] = 255 - b;

    imageData.data[index+0] = (r * .393) + (g * .769 ) + (b * .189);
    imageData.data[index+1] = (r * .349) + (g * .686) + (b * .168);
    imageData.data[index+2] = (r * .272) + (g * .534) + (b * .131);
    imageData.data[index+3] = a;
}