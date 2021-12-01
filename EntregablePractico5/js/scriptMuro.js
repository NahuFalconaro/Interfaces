//https://www.youtube.com/watch?v=WVMaadP1OYc&ab_channel=AlexCGDesign
//Loader con window.load

window.onload = function(){
    setTimeout(function(){
        let contenidoPagina = document.getElementById("contenidoPagina");
        let loader = document.getElementById("loader");
        contenidoPagina.classList.toggle("displayNone");
        loader.classList.toggle("displayNone")
    }, 1500);
 };



let btns_seguir = document.querySelectorAll(".btn-a-quien-seguir-desktop");

for (const btn of btns_seguir) {
    btn.addEventListener("click", ()=>{
        if(btn.innerHTML == "Seguir"){
            btn.innerHTML = "Dejar de seguir"
            btn.classList.add("solicitud-enviada")
            btn.classList.remove("btn-a-quien-seguir-desktop")
        }else{
            btn.innerHTML = "Seguir"
            btn.classList.remove("solicitud-enviada")
            btn.classList.add("btn-a-quien-seguir-desktop")
        }
    })
}

let dislikes = document.querySelectorAll(".dislike");

for (const dislike of dislikes) {
    dislike.addEventListener("click", ()=>{
        let p = dislike.lastChild.textContent;
        p += "3"
    })
}




let likes = document.querySelectorAll(".like");

for (const like of likes) {
    like.addEventListener("click", ()=>{
        console.log("Aprete like");
    })
}