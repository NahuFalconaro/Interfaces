//https://www.youtube.com/watch?v=WVMaadP1OYc&ab_channel=AlexCGDesign
//Loader con window.load

window.onload = function(){
    setTimeout(function(){
        let contenidoPagina = document.getElementById("contenidoPagina");
        let loader = document.getElementById("loader");
        contenidoPagina.classList.toggle("displayNone")
        loader.classList.toggle("displayNone")
    }, 1000);
 };
