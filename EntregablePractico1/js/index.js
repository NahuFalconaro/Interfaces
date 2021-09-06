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
function returnPosMouse(canvas, e){
    var c = canvas.getBoundingClientRect();
    return { //objeto
       x: (e.clientX - c.left),
       y: (e.clientY - c.top)
    }
}
document.getElementById("paint").addEventListener("mouseup",()=>{
    mouseDown=false;
})

function draw(e){
    if(mouseDown){
        ctx.lineWidth = pencil.getGrosor();
        let color= document.getElementById("color").value;
        let grosor = document.getElementById("grosor").value;
        if (pencil.getForm() == 'circle') {
            ctx.lineCap = 'round';
        }else{
            console.log("estoy en el else");
            ctx.lineCap = 'square';
        }
        pencil.setGrosor(grosor);
        pencil.setColor(color);
        ctx.strokeStyle = pencil.getColor();
        //ctx.moveTo(e.layerX,e.layerY);
        let pos = returnPosMouse(canvas, e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
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
        close_popUp();
    }
})
function close_popUp(){
    pop_up.classList.add("hidden");
}

//////////////////////////////////////////////////////////////////////////////////////
//Codigo para borrar imagen de canvas
let btn_borrar = document.getElementById("borrar_imagen");

btn_borrar.addEventListener('click', borrar_canvas);

function borrar_canvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//////////////////////////////////////////////////////////////////////////////////////
//suibir image

//let btn_load_image = document.getElementById("subir_image");
//btn_load_image.addEventListener('click', fill);


//function fill(){
    let image = new Image();
    let file = document.getElementById('archivo');
    let reader = new FileReader();
    
    
    file.addEventListener('change', (event) => {
        let fileList = event.target.files;
        image.src = fileList[0].name; 
        console.log(image.src)   
    })
    // reader.onloadend = function () {
    //     image.src = reader.result;
    // }

    // if(file){
    //     alert("aa")
    //     reader.readAsDataURL(file);
    // }else{
    //     image.src = "";
    // }
//}



//     image.src = file;
//     console.log(image.src)
//     image.onload = function() {
//          myDrawImage(this);
//      }
//  }


//  function myDrawImage(image){
//      ctx.drawImage(image, 0, 0)
//  }