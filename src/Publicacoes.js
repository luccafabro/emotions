function Experiencia(texto, modo) {
  let user, foto;
  modo
    ? (user = "anônimo")
    : (user = JSON.parse(localStorage.getItem("logado")).nome);
  modo
    ? (foto =
        "https://res.cloudinary.com/lucca221/image/upload/v1636720119/crumpled-black-paper-texture_pywxnk.jpg")
    : (foto = JSON.parse(localStorage.getItem("logado")).foto);
  this.usuario = user;
  this.foto = foto;
  this.texto = texto;
  this.modo = modo;
}

document.querySelector(".ex-pub#btn-publicar").onclick = function () {
  var campoEx = document.getElementById("experiencia-input");
  let on = document.querySelector(".ex-on#on").getAttribute("value");

  var modo = false;
  if (on == "Ativo") {
    modo = true;
  }

  let aux = new Experiencia(campoEx.value, modo);
  armazenaExperiencia(aux)
};

function armazenaExperiencia(experiencia) {
    if (localStorage.getItem('EX-post') == null) {
        postagensExperiencias = {
            postagens : []
        }

        postagensExperiencias.postagens.push(experiencia)
        localStorage.setItem(
            'EX-post', JSON.stringify(postagensExperiencias)
        )
    } else {
        let auxPost = JSON.parse(localStorage.getItem('EX-post'))
        localStorage.removeItem('EX-post')

        if (auxPost.postagens.length > 3) {
            auxPost.postagens.shift()
        }
        auxPost.postagens.push(experiencia)
        localStorage.setItem(
            'EX-post', JSON.stringify(auxPost)
        )
    }
}

ativar = () => {
  let on = document.querySelector(".ex-on#on");
  let off = document.querySelector(".ex-off#off");

  on.setAttribute("value", "Ativo");
  off.setAttribute("value", "null");
  off.style.opacity = 0.5;
  on.style.opacity = 1;
};

desativar = () => {
  let on = document.querySelector(".ex-on#on");
  let off = document.querySelector(".ex-off#off");

  on.setAttribute("value", "null");
  off.setAttribute("value", "Ativo");
  off.style.opacity = 1;
  on.style.opacity = 0.5;
};
