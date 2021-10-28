bd = localStorage;
var btnCadastro = document.querySelector(".cadastro");

btnCadastro.onclick = function () {
  if (bd.getItem("contador") == null) {
    bd.setItem("contador", "1");
  }
  let login = document.getElementById("input-email").value;
  let password = document.getElementById("input-senha").value;
  let about = document.getElementById("input-sobre").value;
  let picture = document.getElementById("input-foto").value;

  if (!validaSenha(password)) {
    alertify.error('Senha, pelo menos 8 caracteres, dentre eles 1 caractere especial, 1 letra maiscúla, 1 letra minuscúla')
  }

  if (!validaLogin(login)) {
      alertify.error('Seu usuário deve conter pelo menos 5 caracteres')
  }

  if (validaFoto(picture) && validaLogin(login) && validaSenha(password)) {
    console.log(login);
    console.log(password);
    console.log(about);
    console.log(picture);
    localStorage.setItem(
      `cadastro_${valorContador()}`,
      JSON.stringify({
        nome: login,
        senha: password,
        sobre: about,
        foto: picture,
      })
    );
    acrescentaUm()
    alertify.success(`Cadastro conclúido, você será rediciona a página inicial`)
    redireciona(
      'login.html'
    )
  }
}

function validaSenha(str) {
  aux = str.replace(/[^\w\-]+/g, "");
  hasLowerCase = 0;
  hasUpperCase = 0;
  hasNumber = 0;
  hasSpecial = 0;

  if (str.length < 8) {
    return false
  }

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
  return true;
}


acrescentaUm = () => {
    let contador = bd.getItem("contador")
    contador = Number(contador)

    bd.setItem("contador", `${contador+1}`)
}

valorContador = () => {
    let contador = bd.getItem("contador")
    return Number(contador)
}

async function redireciona (url) {
  await new Promise(r => setTimeout(r, 2500));
  setTimeout(function(){ 
    document.querySelector('body').style.opacity='0';
  }, 2000)

  window.location.href = url
}