bd = localStorage;
var btnCadastro = document.querySelector("#btn-enjoy");

btnCadastro.onclick = function () {
  let login = document.getElementById("input-email").value
  let password = document.getElementById("input-senha").value;
  let about = document.getElementById("input-sobre").value
  let picture = document.getElementById("input-foto").value

  validaLogin(login);
  validaSenha(password);
  validaFoto(picture);

  if (validaFoto || validaLogin || validaSenha) {
      localStorage.setItem("cadastro", {
          "user": login,
          "senha": password,
          "sobre" : about,
          "foto" : picture
      })
      console.log('Inserido com sucesso')
  }
};

function validaSenha(str) {
  aux = str.replace(/[^\w\-]+/g, "");
  hasLowerCase = 0;
  hasUpperCase = 0;
  hasNumber = 0;
  hasSpecial = 0;

  if (aux.length < str.length) {
    hasSpecial++;
  }

  for (var i = 0; i < str.length; i++) {
    c = str.charAt(i);
    if (!isNaN(c)) {
      hasNumber++;
    } else if (c == c.toUpperCase()) {
      hasUpperCase++;
    } else if (c == c.toLowerCase()) {
      hasLowerCase++;
    }
  }

  if (hasLowerCase > 0 || hasUpperCase > 0 || hasNumber > 0 || hasSpecial > 0) {
    return true;
  } else {
    return false;
  }
}

function validaLogin(str) {
  if (str.length >= 5) {
    return true;
  } else {
    return false;
  }
}

function validaFoto(url) {
    return true
}
