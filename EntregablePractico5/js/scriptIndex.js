
let exampleInputEmail1 = document.getElementById("exampleInputEmail1");
let exampleInputPassword1 = document.getElementById("exampleInputPassword1");
 
document.getElementById("btn-iniciar-sesion").addEventListener("click", (e)=> {
    if(exampleInputEmail1.value.length <= 0 || exampleInputPassword1.value.length <= 0){
        e.preventDefault()
        let msg_completar_campos = document.getElementById("msg-completar-campos");
        msg_completar_campos.classList.toggle("displayNone");
    }
})
