bd = localStorage;
var btnCadastro = document.querySelector(".cadastro");
contadorAlerta = 0

validaSenha = function(str) {
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

  if (hasLowerCase > 0 && hasUpperCase > 0 && hasNumber > 0 && hasSpecial > 0) {
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
    let aux = new Conta(login, password, about, picture)
    console.log(password)
    bd.setItem(
      `cadastro_${valorContador()}`,
      JSON.stringify(aux)
    );
    acrescentaUm()
    alertify.success(`Cadastro conclúido, você será rediciona a página inicial`)
    redireciona(
      'login.html'
    )
  }
}

document.getElementById("input-senha").addEventListener('keypress', function(e) {
  var requisitoEspecial = 0
  var requisitoNumero = 0

  if (e.charCode > 32 && e.charCode < 48 || 
    e.charCode > 57 && e.charCode < 65) {
    requisitoEspecial += 1
  } else if (e.charCode > 47 && e.charCode < 58) {
    requisitoNumero += 1
  }

  if (requisitoEspecial > 0 && requisitoEspecial > 0 && contadorAlerta == 0) {
    alertify.set('notifier','position', 'top-right')
    alertify.success(`Parabéns sua senha já contém pelo menos um carácter especial e um número`)
    contadorAlerta += 1
  }
})

async function redireciona (url) {
  await new Promise(r => setTimeout(r, 2500));
  setTimeout(function(){ 
    document.querySelector('body').style.opacity='0';
  }, 2000)

  window.location.href = url
}

function padronizarLoginLower() {
  let campoLogin = document.getElementById("input-email")
  campoLogin.value = campoLogin.value.toLowerCase()
  campoLogin.style.backgroundColor = "#00000000"
}

function deixarFundoVerde() {
  var password = document.getElementById("input-senha")

  password.addEventListener('keypress', function() {
    if (validaSenha(password.value)) {
      password.style.backgroundColor = "#00ff7217"
    }
  })
}

function voltarAoNormal() {
  document.getElementById("input-senha").style.backgroundColor = "#00000000"
}