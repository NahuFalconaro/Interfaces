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
                pCant.style.color = "red"
                btn_info_pass.style.borderColor = "red"
                btn_info_pass.style.color = "red"
                pass.style.outline = "1px solid red"
                validaCant = false;
            }else{
                validaCant = true;
                pMsgCant.style.display = "none"
                pCant.style.color = "#4DFF00"
            }
            if(pass.value.search(/[0-9]/) < 0){
                    pMsgNumer.innerHTML = "*La contraseña debe tener al menos 1 caracter numerico"
                    pMsgNumer.style.display = "initial"
                    pNumer.style.color = "red"
                    validaNum = false;
            }else{
                    validaNum = true;
                    pMsgNumer.style.display = "none"
                    pNumer.style.color = "#4DFF00"
            }
            if(pass.value.search(/[A-Z]/) < 0){
                    pMsgMayus.innerHTML = "*La contraseña debe tener al menos 1 letra mayuscula"
                    pMsgMayus.style.display = "initial"
                    pMayus.style.color = "red"
                    validaMayus = false;
            }else{
                    validaMayus = true;
                    pMsgMayus.style.display = "none"
                    pMayus.style.color = "#4DFF00"
            }
            if(validaCant && validaNum && validaMayus){
                pass.style.outline = "1px solid #4DFF00"
            }else if(!validaCant){
                pass.style.outline = "1px solid red"
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
            pass.style.outline = "1px solid #782DB2"
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