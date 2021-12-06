const campoSobre = document.forms[0].elements[2];
let contadorAlerta = 0;

let validaSenha = function(str) {
  'use strict';
  let aux = str.replace(/[^\w\-]+/g, '');
  let hasLowerCase = 0;
  let hasUpperCase = 0;
  let hasNumber = 0;
  let hasSpecial = 0;

  if (str.length < 8) {
    return false;
  }

  if (aux.length < str.length) {
    hasSpecial++;
  }

  for (let i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if (!isNaN(c)) {
      hasNumber++;
    } else if (c === c.toUpperCase()) {
      hasUpperCase++;
    } else if (c === c.toLowerCase()) {
      hasLowerCase++;
    }
  }

  if (hasLowerCase > 0 && hasUpperCase > 0 && hasNumber > 0 && hasSpecial > 0) {
    return true;
  } else {
    return false;
  }
};

function validaLogin(str) {
  'use strict';
  if (str.length >= 5) {
    return true;
  } else {
    return false;
  }
}

campoSobre.addEventListener('invalid', function() {
  'use strict';
  if (campoSobre.validity.valueMissing) {
    campoSobre.setCustomValidity('Conte nós, um pouco sobre você!');
    campoSobre.value = 'Me chamo ?, tenho ? anos...';
  } else {
    campoSobre.setCustomValidity('');
  }

  if (campoSobre.value === 'Me chamo ?, tenho ? anos...') {
    campoSobre.setCustomValidity('Conte nós, um pouco sobre você!');
  } else {
    campoSobre.setCustomValidity('');
  }
});

function limparMensagemDeAlerta() {
  'use strict';
  if (campoSobre.checkValidity()) {
    campoSobre.setCustomValidity('');
  }
}

function validaFoto(url) {
  'use strict';
  if (url) {
   // Fill 
  }
  return true;
}

let acrescentaUm = () => {
  'use strict';
    let contador = localStorage.getItem('contador');
    contador = Number(contador);

    localStorage.setItem('contador', `${contador+1}`);
};

let valorContador = () => {
  'use strict';
    let contador = localStorage.getItem('contador');
    return Number(contador);
};

async function redireciona (url) {
  'use strict';
  await new Promise(r => setTimeout(r, 2500));
  setTimeout(function(){ 
    document.querySelector('body').style.opacity='0';
  }, 2000);

  window.location.href = url;
}

// "message": "'padronizarLoginLower' is defined but never used. (W098)", mas é utilizada pelo HTML
function padronizarLoginLower() {
  'use strict';
  let campoLogin = document.getElementById('input-email');
  campoLogin.value = campoLogin.value.toLowerCase();
  campoLogin.style.backgroundColor = '#00000000';
}

// "message": "'deixarFundoVerde' is defined but never used. (W098)", mas é utilizada pelo HTML
function deixarFundoVerde() {
  'use strict';
  let password = document.getElementById('input-senha');

  password.addEventListener('keypress', function() {
    if (validaSenha(password.value)) {
      password.style.backgroundColor = '#00ff7217';
    }
  });
}

// "message": "'voltarAoNormal' is defined but never used. (W098)", mas é utilizada pelo HTML
function voltarAoNormal() {
  'use strict';
  document.getElementById('input-senha').style.backgroundColor = '#00000000';
}

function validaTudo() {
  'use strict';
  if (localStorage.getItem('contador') == null) {
    localStorage.setItem('contador', '1');
  }
  let login = document.getElementById('input-email').value;
  let password = document.getElementById('input-senha').value;
  let about = document.getElementById('input-sobre').value;
  let picture = document.getElementById('input-foto').value;

  if (!validaSenha(password)) {
    alertify.error('Senha, pelo menos 8 caracteres,' + 
    'dentre eles 1 caractere especial, 1 letra maiscúla, 1 letra minuscúla');
  }

  if (!validaLogin(login)) {
      alertify.error('Seu usuário deve conter pelo menos 5 caracteres');
  }

  if (validaFoto(picture) && validaLogin(login) && validaSenha(password)) {
    let aux = new Conta(login, password, about, picture);
    localStorage.setItem(
      `cadastro_${valorContador()}`,
      JSON.stringify(aux)
    );
    acrescentaUm();
    alertify.success(`Cadastro conclúido, você será rediciona a página inicial`);
    redireciona(
      'login.html'
    );
  }
}

document.getElementById('input-foto').onmouseup = function(e) {
  'use strict';
  alertify.set('notifier','position', 'top-right');
  if (e.isTrusted) {
    alertify.success('Já verificamos e você não é um robo!').dismissOthers();
  }
  alertify.message('insira um link da sua foto, use cloudinary ou google drive');
};

document.getElementById('input-senha').addEventListener('keypress', function(e) {
  'use strict';
  let requisitoEspecial = 0;
  let requisitoNumero = 0;

  if (e.charCode > 32 && e.charCode < 48 || 
    e.charCode > 57 && e.charCode < 65) {
    requisitoEspecial += 1;
  } else if (e.charCode > 47 && e.charCode < 58) {
    requisitoNumero += 1;
  }

  if (requisitoEspecial > 0 && requisitoEspecial > 0 && contadorAlerta === 0) {
    alertify.set('notifier','position', 'top-right');
    alertify.success(`Parabéns sua senha já contém pelo menos um carácter especial e um número`);
    contadorAlerta += 1;
  }
});