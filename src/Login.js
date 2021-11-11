bd = localStorage;
var btnLogin = document.querySelector("#btn-enjoy");

btnLogin.onclick = function () {
  let login = document.getElementById("input-email").value;
  let passwd = document.getElementsByName("campo-senha")[0].value;

  if (!validacaoInicial(login, passwd)) {
    alertify.error("Por favor insira credenciais válidas")
  } else {
    if (verificaCredenciais(login, passwd)) {
      alertify.success("Seja bem-vindo(a) novamente")
      redireciona('feed.html')
    } else {
      alertify.error("Por favor insira credenciais válidas")
    }
  }
};

verificaCredenciais = (login, senha) => {
  for (var i = 1; i <= bd.length - 1; i++) {
    var eCadastro = bd.getItem(`cadastro_${i}`);
    if (eCadastro != null) {
      objeto = JSON.parse(eCadastro);
      
      if (objeto.nome == login && objeto.senha == senha) {
          fazerLogin(objeto)
          return true
      }
    }
  }
  return false
};

validacaoInicial = (login, senha) => {
  if (login.length < 5 || senha.length < 8) {
    return false;
  } else {
    return true;
  }
};

function fazerLogin(objeto) {
  if (bd.getItem(`logado`) != null) {
    bd.removeItem(`logado`)
  }

  bd.setItem(
    `logado`,
    JSON.stringify(objeto)
  );
}

async function redireciona (url) {
  await new Promise(r => setTimeout(r, 2500));
  setTimeout(function(){ 
    document.querySelector('body').style.opacity='0';
  }, 2000)

  window.location.href = url
}