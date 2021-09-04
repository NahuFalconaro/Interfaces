let canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");
let pencil = new Pencil(3,'circle');


let colorPencil = document.getElementById("color").addEventListener("click",()=>{
    let color = colorPencil.getValue();
    pencil.setGrosor(color);
})

/*let grosorPencil = document.getElementById("grosorPencil").addEventListener("click",()=>{
    let grosor = grosorPencil.getValue();
    pencil.setGrosor(grosor);
})*/

document.getElementById("pencil").addEventListener("click",()=>{
    pencil.setForm('circle');
})
document.getElementById("rubber").addEventListener("click",()=>{
    pencil.setForm('rubber');
    pencil.setColor('FFFFFFFF')
})

let mouseDown=false;

document.getElementById("paint").addEventListener("mousedown",()=>{
    mouseDown=true;
    ctx.beginPath();
})

document.getElementById("paint").addEventListener("mousemove",(e)=>{
    ctx.lineWidth = pencil.getGrosor();
    if (pencil.getForm === 'circle') {
        ctx.lineCap = 'round';
    }else{
        ctx.lineCap = 'square';
    }
    ctx.moveTo(e.layerX,e.layerY);
    ctx.lineTo(e.layerX,e.layerY);
    ctx.stroke();
})

document.getElementById("paint").addEventListener("mouseup",()=>{
    mouseDown=false;
})


