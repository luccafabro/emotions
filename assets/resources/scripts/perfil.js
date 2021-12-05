function colocarFoto(url) {
  'use strict';
  let fotoPerfil = document.getElementById('user-img');
  fotoPerfil.setAttribute('src', `${url}`);
}

function alterarNome(nome) {
  'use strict';
  let nomeUsuario = document.querySelector('h2#nome-usuario');

  nomeUsuario.innerHTML = nome;
}

function usuarioNaoLogado(login) {
  'use strict';
  let contador = 0;
  Object.values(localStorage).forEach(function (value) {
    let objeto = JSON.parse(value);
    if (objeto.nome === login) {
      contador += 1;
    }
  });

  (function (contador) {
    if (contador > 0) {
      let valorConfirm = confirm(
        'Você já possui cadastro, aperte OK para ir para tela de login' +
         ' e CANCELAR para ir na página inicial'
      );
      if (valorConfirm) {
        window.location.href = 'login.html';
      } else {
        window.location.href = '../index.html';
      }
      /*valorConfirm ? (window.location.href = 'login.html') 
      : (window.location.href = 'index.html');*/
    } else {
      let valorConfirm = confirm(
        'Você ainda não possui cadastro, mas se cadastre agora mesmo!'
      );
      if (valorConfirm) {
        window.location.href = 'cadastro.html';
      } else {
        window.location.href = '../index.html';
      }
      /*valorConfirm ? window.location.href = 'cadastro.html' 
      : window.location.href = 'index.html';*/
    }
  })(contador);
}

function carregarInfomacoes() {
  'use strict';
  let bd = localStorage;
  let objeto = bd.getItem('logado');

  if (objeto != null) {
    let pessoaLogada = JSON.parse(objeto);
    colocarFoto(pessoaLogada.foto);
    alterarNome(pessoaLogada.nome);
  } else {
    alert('Você não está logado, por favor faça seu login');
    usuarioNaoLogado(
      prompt('Digite seu login, para verificarmos se você tem cadastro')
    );
  }
}

window.addEventListener('load', carregarInfomacoes());