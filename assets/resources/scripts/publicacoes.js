class FuncionouComigo {
  constructor(texto) {
    this.texto = texto;
  } 
}

class Experiencia extends FuncionouComigo {
  constructor(texto, modo) {
    super(texto);
    let user, foto;
    if (modo) {
      user = 'anônimo';
      foto = 'https://res.cloudinary.com/lucca221/image/upload/'+
      'v1636720119/crumpled-black-paper-texture_pywxnk.jpg';
    } else {
      user = JSON.parse(localStorage.getItem('logado')).nome;
      foto = JSON.parse(localStorage.getItem('logado')).foto;
    }
    /*modo ? (user = 'anônimo')
      : (user = JSON.parse(localStorage.getItem('logado')).nome);
    modo ? (foto =
          'https://res.cloudinary.com/lucca221/image/upload/v1636720119/crumpled-black-paper-texture_pywxnk.jpg')
      : (foto = JSON.parse(localStorage.getItem('logado')).foto);*/
    this.usuario = user;
    this.foto = foto;
    this.modo = modo;
  }
}

function armazenaExperiencia(experiencia) {
  'use strict';
  if (localStorage.getItem('EX-post') === null) {
    let postagensExperiencias = {
      postagens: [],
    };

    postagensExperiencias.postagens.push(experiencia);
    localStorage.setItem('EX-post', JSON.stringify(postagensExperiencias));
  } else {
    let auxPost = JSON.parse(localStorage.getItem('EX-post'));
    localStorage.removeItem('EX-post');

    if (auxPost.postagens.length > 3) {
      auxPost.postagens.shift();
    }
    auxPost.postagens.push(experiencia);
    localStorage.setItem('EX-post', JSON.stringify(auxPost));
  }
}

function gerarPostagensExperiencias() {
  'use strict';
  let postagens = JSON.parse(localStorage.getItem('EX-post')).postagens;
  document.getElementById('postagens-ex').innerHTML = '';
  postagens.reverse();
  for (let i = 0; i < postagens.length; i++) {
    document.getElementById('postagens-ex').innerHTML += `
        <div id="postagem-ex">
        <div id="cima-post-ex">
          <img src="${postagens[i].foto}" alt="postagem foto pessoa" id="img-post-ex">
          ${postagens[i].usuario}
        </div>
        <div id="baixo-post-ex">
          <p>
            ${postagens[i].texto}
          </p>
        </div>
      </div>
        `;
  }
}

// 'mudarCorLogo' is defined but never used -> É utilizado via HTML
let mudarCorLogo = (color) => {
  'use strict';
  let corLogo = document.getElementById('emotions-logo');
  if (color === 'rgb(254, 0, 102)') {
    corLogo.style.color = '#0bd3ff';
  } else {
    corLogo.style.color = 'rgb(254, 0, 102)';
  }
};

// 'ativar' is defined but never used -> É utilizado via HTML
let ativar = () => {
  'use strict';
  let on = document.querySelector('.ex-on#on');
  let off = document.querySelector('.ex-off#off');

  on.setAttribute('value', 'Ativo');
  off.setAttribute('value', 'null');
  off.style.opacity = 0.5;
  on.style.opacity = 1;
};

// 'desativar' is defined but never used -> É utilizado via HTML
let desativar = () => {
  'use strict';
  let on = document.querySelector('.ex-on#on');
  let off = document.querySelector('.ex-off#off');

  on.setAttribute('value', 'null');
  off.setAttribute('value', 'Ativo');
  off.style.opacity = 1;
  on.style.opacity = 0.5;
};

document.querySelector('.ex-pub#btn-publicar').onclick = function () {
  'use strict';
  let campoEx = document.getElementById('experiencia-input');
  let on = document.querySelector('.ex-on#on').getAttribute('value');

  let modo = false;
  if (on === 'Ativo') {
    modo = true;
  }

  let aux = new Experiencia(campoEx.value, modo);
  armazenaExperiencia(aux);
  gerarPostagensExperiencias();
};

window.onload = function () {
  'use strict';
  gerarPostagensExperiencias();
};