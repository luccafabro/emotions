window.addEventListener("load", this.carregarInfomacoes())

function carregarInfomacoes() {
  let bd = localStorage;
  var objeto = bd.getItem("logado");

  if (objeto != null) {
    let pessoaLogada = JSON.parse(objeto);
    colocarFoto(pessoaLogada.foto);
    alterarNome(pessoaLogada.nome);
  } else {
    alert("Você não está logado, por favor faça seu login");
    usuarioNaoLogado(
      prompt("Digite seu login, para verificarmos se você tem cadastro")
    );
  }
};

function colocarFoto(url) {
  let fotoPerfil = document.getElementById("user-img");
  fotoPerfil.setAttribute("src", `${url}`);
}

function alterarNome(nome) {
  let nomeUsuario = document.querySelector("h2#nome-usuario");

  nomeUsuario.innerHTML = nome;
}

function usuarioNaoLogado(login) {
  var contador = 0;
  Object.values(localStorage).forEach(function (value) {
    let objeto = JSON.parse(value);
    if (objeto.nome == login) {
      contador += 1;
    }
  });

  direciona = (function (contador) {
    if (contador > 0) {
      let valorConfirm = confirm(
        "Você já possui cadastro, aperte OK para ir para tela de login e CANCELAR para ir na página inicial"
      );
      valorConfirm
        ? (window.location.href = "login.html")
        : (window.location.href = "index.html");
    } else {
      let valorConfirm = confirm(
        "Você ainda não possui cadastro, mas se cadastre agora mesmo!"
      );
      valorConfirm
        ? (window.location.href = "cadastro.html")
        : (window.location.href = "index.html");
    }
  })(contador);
}