//https://www.youtube.com/watch?v=WVMaadP1OYc&ab_channel=AlexCGDesign
//Loader con window.load

window.onload = function(){
    setTimeout(function(){
        let contenidoPagina = document.getElementById("contenidoPagina");
        let loader = document.getElementById("loader");
        contenidoPagina.classList.toggle("displayNone")
        loader.classList.toggle("displayNone")
    }, 1500);
 };

let exampleInputEmail1 = document.getElementById("exampleInputEmail1");
let exampleInputPassword1 = document.getElementById("exampleInputPassword1");
 
 document.getElementById("btn-iniciar-registro").addEventListener("click", (e)=> {
    if(exampleInputEmail1.value.length <= 0 || exampleInputPassword1.value.length <= 0){
        e.preventDefault()
        let msg_completar_campos = document.getElementById("msg-completar-campos");
        msg_completar_campos.classList.toggle("displayNone");
    }
})