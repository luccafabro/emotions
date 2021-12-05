let validacaoInicial = (login, senha) => {
  'use strict';
  if (login.length < 5 || senha.length < 8) {
    return false;
  } else {
    return true;
  }
};

function fazerLogin(objeto) {
  'use strict';
  if (localStorage.getItem(`logado`) != null) {
    localStorage.removeItem(`logado`);
  }

  localStorage.setItem(
    `logado`,
    JSON.stringify(objeto)
  );
}

let verificaCredenciais = (login, senha) => {
  'use strict';
  for (let i = 1; i <= localStorage.length - 1; i++) {
    let eCadastro = localStorage.getItem(`cadastro_${i}`);
    if (eCadastro != null) {
      let objeto = JSON.parse(eCadastro);
      
      if (objeto.nome === login && objeto.senha === senha) {
          fazerLogin(objeto);
          return true;
      }
    }
  }
  return false;
};

async function redireciona (url) {
  'use strict';
  await new Promise(r => setTimeout(r, 2500));
  setTimeout(function(){ 
    document.querySelector('body').style.opacity='0';
  }, 2000);

  window.location.href = url;
}

let btnLogin = document.querySelector('#btn-enjoy');
btnLogin.onclick = function () {
  'use strict';
  let login = document.getElementById('input-email').value;
  let passwd = document.getElementsByName('campo-senha')[0].value;

  if (!validacaoInicial(login, passwd)) {
    alertify.error('Por favor insira credenciais válidas');
  } else {
    if (verificaCredenciais(login, passwd)) {
      alertify.success('Seja bem-vindo(a) novamente');
      redireciona('feed.html');
    } else {
      alertify.error('Por favor insira credenciais válidas');
    }
  }
};