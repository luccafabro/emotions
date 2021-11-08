(function() {
    let bd = localStorage
    var objeto = bd.getItem('logado') 

    if (objeto != null) {
        let pessoaLogada = JSON.parse(objeto);
        colocarFoto(pessoaLogada.foto)
        alterarNome(pessoaLogada.nome)
    } else {
        alert('Você não está logado, por favor faça seu login')
        window.location.href = "index.html"
    }
})();

function colocarFoto(url) {
    let fotoPerfil = document.getElementById('user-img')
    fotoPerfil.setAttribute('src', `${url}`)
}

function alterarNome(nome) {
    let nomeUsuario = document.querySelector('h2#nome-usuario')

    nomeUsuario.innerHTML = nome
}