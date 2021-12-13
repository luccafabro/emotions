(function() {
    contadorHeader = 0

    $(document).ready(function() {
        gerarPostagensFuncionouComigo()

        new jBox('Tooltip', {
            attach: '.dicaFoto'
          });
    })

    $('footer').click(function() {
        $(this).html('Visite meu Github e meu Linkedin para mais informações!')
        setTimeout(function() {
            $('footer').html('Copyright &copy; 2021 Lucca Fabro')
        }, 3000)
    })

    $('#header-fc').click(function() {
        if (contadorHeader == 1) {
            $('#header-fc').css('color', '#fe0066');
            contadorHeader = 0;
        } else {
            $('#header-fc').css('color', 'white');
            contadorHeader = 1;
        }
        $('#header-fc').slideToggle()
        setTimeout(function() {
            $('#header-fc').slideToggle()
        }, 1000);
    })

    $('.funcao').click(function() {
        new jBox('Modal', {
            width: 300,
            height: 100,
            attach: '.popupFuncoes',
            title: 'Funcionalidades ainda não implementadas',
            content: '<i>Ficamos felizes de você estar utilizando o emotions, e em breve implementaremos essa funcionalidade</i>'
          })
    })

    $('.btn-azul').on('click', function() {
        let funcionouComigo = $('#fc-input').val();
        $('#fc-input').val('');

        armazenaFuncionouComigo(
            new FuncionouComigo(funcionouComigo)
        );
        gerarPostagensFuncionouComigo();
    })

    let armazenaFuncionouComigo = function(funcionouComigo) {
        if (localStorage.getItem('FC-post') === null) {
            let postagensFuncionouComigo = {
                postagens: []
            };
            postagensFuncionouComigo.postagens.push(funcionouComigo);
            localStorage.setItem('FC-post', JSON.stringify(postagensFuncionouComigo));
        } else {
            let auxPost = JSON.parse(localStorage.getItem('FC-post'));
            localStorage.removeItem('FC-post');
        
            if (auxPost.postagens.length > 7) {
              auxPost.postagens.shift();
            }
            auxPost.postagens.push(funcionouComigo);
            localStorage.setItem('FC-post', JSON.stringify(auxPost));
        }
    }

    let gerarPostagensFuncionouComigo = function() {
        let postagens = JSON.parse(localStorage.getItem('FC-post')).postagens;
        postagens.reverse();
        $('#funcionou-comigo').children('#postagens-fc').html('')
        for (let i = 0; i < postagens.length; i++) {
            $('#postagens-fc').append( `
            <div id="postagem-fc">
            <div id="bloco-postagem-fc">
              <div id="texto-fc">
                <p>
                    ${postagens[i].texto}
                </p>
              </div>
              <button id="vou-testar" type="submit">
                vou testar
              </button>
            </div>
          </div>
            ` ).addClass('tamanho-postagens');
        }
        $('#postagens-fc #bloco-postagem-fc').each(function() {
            $(this).find('p').css('color', corAleatoria)
        })
    }

    let corAleatoria = function() {
        let letras = '0123456789ABCDEF';
        var codigoHexa = '';
        for (let i = 0; i < 6; i++) {
          codigoHexa += letras[Math.floor(Math.random() * 16)];
        }
        return `#${codigoHexa}`;
      }
})()