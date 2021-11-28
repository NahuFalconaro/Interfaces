let inputs = document.getElementsByClassName("input-formulario");

for(let input of inputs){
    input.addEventListener("change", ()=>{
        if(input.value !== '')
            input.classList.add("visited")
        else
            input.classList.remove("visited")
    })
}
    let cantErr;
    let pass = document.getElementById("inputPassword1");
    let passVerify = document.getElementById("inputPassword2")
    pass.addEventListener("keyup", passCorrecta);
    passVerify.addEventListener("keyup", passIguales);

function passCorrecta(){ 
    setTimeout(() => {
        let pMsgCant = document.getElementById("incorrect-password-cant");
        let pMsgNumer = document.getElementById("incorrect-password-numer");
        let pMsgMayus = document.getElementById("incorrect-password-mayus");
        if(pass.value.length < 8){
            pMsgCant.innerHTML = "*La contraseña debe tener al menos 8 caracteres"
            pMsgCant.style.display = "initial"
        }else{
            pMsgCant.style.display = "none"
        }
        if(pass.value.search(/[0-9]/) < 0){
                pMsgNumer.innerHTML = "*La contraseña debe tener al menos 1 caracter numerico"
                pMsgNumer.style.display = "initial"
        }else{
                pMsgNumer.style.display = "none"
        }
        if(pass.value.search(/[A-Z]/) < 0){
                pMsgMayus.innerHTML = "*La contraseña debe tener al menos 1 letra mayuscula"
                pMsgMayus.style.display = "initial"
        }else{
                pMsgMayus.style.display = "none"
        }
    }, 1000);
}   
function passIguales(){
        setTimeout(() => {
            let pMsg = document.getElementById("diferent-password");
            if(pass.value !== passVerify.value){
                pMsg.innerText = "*Las contraseñas no coinciden"
                pMsg.style.display = "initial"
            }else{
                pMsg.style.display = "none"
            }
        }, 1000);
}


let btn_info = document.getElementById("btn-info");

btn_info.addEventListener("click", ()=>{
    let modal = document.getElementById("modal-info-pass");
    modal.classList.toggle("d-none");
})