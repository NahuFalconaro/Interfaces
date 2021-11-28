'use strict';
window.addEventListener('DOMContentLoaded', () => {

    // -- Botones de filtro --

    let btnPersona = document.getElementById("btn-persona");
    let btnLugar = document.getElementById("btn-lugar");
    let btnGrupo = document.getElementById("btn-grupo");

    let svgPersona = document.getElementById("svg-persona");
    let svgLugar = document.getElementById("svg-lugar");
    let svgGrupo = document.getElementById("svg-grupo");

    let ulPersona = document.getElementById("ul-persona");
    let ulGrupo = document.getElementById("ul-grupo");
    let ulLugar = document.getElementById("ul-lugar");

    btnPersona.addEventListener("click", () => {


        btnPersona.classList.add("btn-selected");
        btnPersona.classList.remove("btn-deselected");

        btnLugar.classList.add("btn-deselected");
        btnLugar.classList.remove("btn-selected");

        btnGrupo.classList.add("btn-deselected");
        btnGrupo.classList.remove("btn-selected");

        svgPersona.classList.add("svgWhite");
        svgPersona.classList.remove("svgPurple");

        svgGrupo.classList.add("svgPurple");
        svgGrupo.classList.remove("svgWhite");

        svgLugar.classList.add("svgPurple");
        svgLugar.classList.remove("svgWhite");

        if (document.getElementById("input-buscar").value == "a" || document.getElementById("input-buscar").value == "A")
            ulPersona.classList.remove("hidden");
        else
            ulPersona.classList.add("hidden");

        ulGrupo.classList.add("hidden");
        ulLugar.classList.add("hidden");

    });

    btnGrupo.addEventListener("click", () => {
        btnGrupo.classList.add("btn-selected");
        btnGrupo.classList.remove("btn-deselected");

        btnPersona.classList.add("btn-deselected");
        btnPersona.classList.remove("btn-selected");

        btnLugar.classList.add("btn-deselected");
        btnLugar.classList.remove("btn-selected");

        svgGrupo.classList.add("svgWhite");
        svgGrupo.classList.remove("svgPurple");

        svgPersona.classList.add("svgPurple");
        svgPersona.classList.remove("svgWhite");

        svgLugar.classList.add("svgPurple");
        svgLugar.classList.remove("svgWhite");

        if (document.getElementById("input-buscar").value == "a" || document.getElementById("input-buscar").value == "A")
            ulGrupo.classList.remove("hidden");
        else
            ulGrupo.classList.add("hidden");

        ulPersona.classList.add("hidden");
        ulLugar.classList.add("hidden");

    });

    btnLugar.addEventListener("click", () => {
        btnLugar.classList.add("btn-selected");
        btnLugar.classList.remove("btn-deselected");

        btnGrupo.classList.add("btn-deselected");
        btnGrupo.classList.remove("btn-selected");

        btnPersona.classList.add("btn-deselected");
        btnPersona.classList.remove("btn-selected");

        svgLugar.classList.add("svgWhite");
        svgLugar.classList.remove("svgPurple");

        svgPersona.classList.add("svgPurple");
        svgPersona.classList.remove("svgWhite");

        svgGrupo.classList.add("svgPurple");
        svgGrupo.classList.remove("svgWhite");

        if (document.getElementById("input-buscar").value == "a" || document.getElementById("input-buscar").value == "A")
            ulLugar.classList.remove("hidden");
        else
            ulLugar.classList.add("hidden");


        ulPersona.classList.add("hidden");
        ulGrupo.classList.add("hidden");


    });

    // -- Botones Follow/Unfollow --

    let buttonsSeguir = document.querySelectorAll("#btn-seguir");

    for (let i = 0; i < buttonsSeguir.length; i++) {
        buttonsSeguir[i].addEventListener("click", () => {
            if (buttonsSeguir[i].innerText == "Seguir") {
                buttonsSeguir[i].classList.add("btn-desactivado");
                buttonsSeguir[i].innerText = "Seguido"
            } else {
                buttonsSeguir[i].classList.remove("btn-desactivado");
                buttonsSeguir[i].innerText = "Seguir"
            }
        })
    }

    let buttonSolicitar = document.querySelectorAll("#btn-solicitar");

    for (let i = 0; i < buttonSolicitar.length; i++) {
        buttonSolicitar[i].addEventListener("click", () => {
            if (buttonSolicitar[i].innerText == "Solicitar Entrada") {
                buttonSolicitar[i].classList.add("btn-desactivado");
                buttonSolicitar[i].innerText = "Solicitud Enviada"
            } else {
                buttonSolicitar[i].classList.remove("btn-desactivado");
                buttonSolicitar[i].innerText = "Solicitar Entrada"
            }
        })
    }

    // -- Buscador

    document.getElementById("input-buscar").addEventListener("input", () => {
        let ulls = document.querySelectorAll("ul");
        if (document.getElementById("input-buscar").value == "a" || document.getElementById("input-buscar").value == "A") {
            if (btnPersona.classList.contains("btn-selected"))
                ulls[0].classList.remove("hidden");
            else
            if (btnGrupo.classList.contains("btn-selected"))
                ulls[1].classList.remove("hidden");
            else
                ulls[2].classList.remove("hidden");
        } else {
            ulls.forEach(ul => {
                ul.classList.add("hidden")
            });

        }

    })

});