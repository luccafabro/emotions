bd = localStorage;
var btnLogin = document.querySelector("#btn-enjoy");

btnLogin.onclick = function () {
  let login = document.getElementById("input-email").value;
  let passwd = document.getElementById("input-senha").value;

  if (!validacaoInicial(login, passwd)) {
    alertify.error("Por favor insira credenciais válidas")
  } else {
    if (verificaCredenciais(login, passwd)) {
      alertify.success("Seja bem-vindo(a) novamente")
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