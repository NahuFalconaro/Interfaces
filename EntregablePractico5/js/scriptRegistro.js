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
    let validaCant = false;
    let validaNum = false;
    let validaMayus = false;
    setTimeout(() => {
        let pMsgCant = document.getElementById("incorrect-password-cant");
        let pMsgNumer = document.getElementById("incorrect-password-numer");
        let pMsgMayus = document.getElementById("incorrect-password-mayus");

        let pCant = document.getElementById("password-cant");
        let pNumer = document.getElementById("password-numer");
        let pMayus = document.getElementById("password-mayus");
        let btn_info_pass = document.getElementById("btn-info");
        if(pass.value.length != 0){
            if(pass.value.length < 8){
                pMsgCant.innerHTML = "*La contraseña debe tener al menos 8 caracteres"
                pMsgCant.style.display = "initial"
                pCant.style.color = "#bb2124"
                btn_info_pass.style.borderColor = "#bb2124"
                btn_info_pass.style.color = "#bb2124"
                pass.style.outline = "1px solid #bb2124"
                validaCant = false;
            }else{
                validaCant = true;
                pMsgCant.style.display = "none"
                pCant.style.color = "#22bb33"
            }
            if(pass.value.search(/[0-9]/) < 0){
                    pMsgNumer.innerHTML = "*La contraseña debe tener al menos 1 caracter numerico"
                    pMsgNumer.style.display = "initial"
                    pNumer.style.color = "#bb2124"
                    validaNum = false;
            }else{
                    validaNum = true;
                    pMsgNumer.style.display = "none"
                    pNumer.style.color = "#22bb33"
            }
            if(pass.value.search(/[A-Z]/) < 0){
                    pMsgMayus.innerHTML = "*La contraseña debe tener al menos 1 letra mayuscula"
                    pMsgMayus.style.display = "initial"
                    pMayus.style.color = "#bb2124"
                    validaMayus = false;
            }else{
                    validaMayus = true;
                    pMsgMayus.style.display = "none"
                    pMayus.style.color = "#22bb33"
            }
            if(validaCant && validaNum && validaMayus){
                pass.style.outline = "1px solid #22bb33"
                btn_info_pass.style.borderColor = "black"
                btn_info_pass.style.color = "black"
            }else if(!validaCant){
                pass.style.outline = "1px solid #bb2124"
            }else if(!validaNum || !validaMayus){
                pass.style.outline = "1px solid yellow"
            }
        }else{
            btn_info_pass.style.borderColor = "black"
            btn_info_pass.style.color = "black"
            pMsgCant.style.display = "none"
            pMsgNumer.style.display = "none"
            pMsgMayus.style.display = "none"
            pMayus.style.color = "black"
            pNumer.style.color = "black"
            pCant.style.color = "black"
            pass.style.outline = "none"
        }
    }, 1000);
}  
let inputPassword2 = document.getElementById("inputPassword2")
function passIguales(){
        setTimeout(() => {
            let pMsg = document.getElementById("diferent-password");
            if(passVerify.value.length != 0){
                if(pass.value !== passVerify.value){
                    pMsg.innerText = "*Las contraseñas no coinciden"
                    inputPassword2.style.outline = "1px solid #bb2124"
                    pMsg.style.display = "initial"
                }else{
                    pMsg.style.display = "none"
                    inputPassword2.style.outline = "1px solid #22bb33"
                }
            }else{
                inputPassword2.style.outline = "none"
                pMsg.innerText = ""
            }
        }, 1000);
}


let btn_info = document.getElementById("btn-info");
let modal = document.getElementById("contenedor-modal");

btn_info.addEventListener("click", ()=>{
    modal.classList.toggle("displayNone");
})


document.getElementById("btn-iniciar-registro").addEventListener("click", (e)=> {
    if(pass.value.length <= 0 || passVerify.value.length <= 0 || exampleInputEmail1.value.length <= 0){
        e.preventDefault()
        let msg_completar_campos = document.getElementById("msg-completar-campos");
        msg_completar_campos.classList.toggle("displayNone");
    }
})

