var canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");
let pencil = new Pencil(1,'circle');
let width = canvas.width;
let height = canvas.height;

let mouseDown=false;

// let colorPencil = document.getElementById("color").addEventListener("click",()=>{
//     let color = colorPencil.;
//     pencil.setGrosor(color);
// })


//.addEventListener("click",()=>{
   // let grosor = grosorPencil.getValue();
   // pencil.setGrosor(grosor);
//})

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

////////////////////////////////////////////////////////////////////////////////////
//Empieza codigo modal inicio
let pop_up = document.getElementById("pop-up");
let closePop = document.getElementById("close-pop-up");

closePop.addEventListener("click", close_popUp);

//https://es.stackoverflow.com/questions/326168/saber-si-se-hizo-click-dentro-fuera-del-div
//Documentacion
//Le agrego un luistener al evento en toda la ventana
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

//////////////////////////////////////////////////////////////////////////////////////
//Codigo para borrar imagen de canvas
let btn_borrar = document.getElementById("borrar_imagen");

btn_borrar.addEventListener('click', borrar_canvas);

function borrar_canvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = width;
    canvas.height = height;
    fillWhite();
}

//////////////////////////////////////////////////////////////////////////////////////
//suibir image

//let btn_load_image = document.getElementById("subir_image");
//btn_load_image.addEventListener('click', fill);


//function fill(){
    
    let file = document.getElementById('archivo');
    let fileModal = document.getElementById('archivoModal');

    file.addEventListener('change', subirImagen);
    fileModal.addEventListener('change', subirImagen);

    function subirImagen(event){
        close_popUp();
        borrar_canvas();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = (event)=> {
            let contenido = event.target.result;
            let image = new Image();
            console.log(image.src) 
            image.src = contenido;
            image.onload = ()=> {
                if ((canvas.width<image.width)||(canvas.height<image.height)){
                    var hRatio = canvas.width / image.width;
                    var vRatio = canvas.height / image.height;
                    var ratio  = Math.min ( hRatio, vRatio );
                    ctx.drawImage(image, 0,0, image.width, image.height, 0,0,image.width*ratio, image.height*ratio);
                }else{
                    ctx.clearRect(0, 0, width, height);
                    canvas.width=image.width
                    canvas.height=image.height
                    ctx.drawImage(image,0,0); 
                }   
            }
        }
    }

//////////////////////////////////////////////////////////////////////////////////////
//guardar imagen

let btn_guardarImagen = document.getElementById("guardar_imagen");

btn_guardarImagen.addEventListener('click', () => {
    let boton = document.createElement('a');
    boton.download = "Paint.png";
    boton.href = document.getElementById('paint').toDataURL("image/png").replace("image/png", "image/octet-stream");
    boton.click();
})