var altura = 0
var largura = 0
var vidas = 1
var tempo = 15
var criaMosquitoTempo = 1500
var nivel = window.location.search
nivel = nivel.replace('?', '')


if (nivel === 'normal') {
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
    criaMosquitoTempo = 750
}

// evento onresize -- ocorrer quando o elemento no qual esse evento foi aplicado sofre algum redimensionamento
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight // capturando altura da tela
    largura = window.innerWidth // capturando largura da tela
    console.log(altura, largura)
}

var cronometro = setInterval (function(){
    document.getElementById("cronometro").innerHTML = tempo
    tempo -= 1

    if (tempo < 0) {
        clearInterval(criaMosquito) // parar a criação do mosquito
        clearInterval(cronometro) // parar o set interval
        window.location.href = 'gameWin.html'
    } else {
        document.getElementById("cronometro").innerHTML = tempo
    }
}, 1000)

function posicaoRandomica() {

    // remover o mosquito anterior caso ele exista
    if(document.getElementById("mosquito")) {
        document.getElementById("mosquito").remove()

        // GAME OVER, quando todas as vidas forem esgotadas
        if (vidas > 3) {
            window.location.href = 'gameOver.html'
        }

        // excluir as vidas caso o mosquito não seja clicado
        document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
        vidas++
    }

    //Math.floor arredonda para baixo
    //Math.random sorteia um numero de 0 a 1, quando multiplicado por alguma valor, sorteia de 0 ate o mesmo.
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    // se posição x ou y for menor que 0, recebe 0, se nao recebe ela mesma
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(`X: ${posicaoX} e Y: ${posicaoY}`)

    //criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.style.position = 'absolute'
    mosquito.style.left = (`${posicaoX}px`)
    mosquito.style.top = (`${posicaoY}px`)
    // o elemento recebe classes definidas nas respectivas funções para definir seu tamanho e lado
    mosquito.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`
    mosquito.id = 'mosquito'


    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
    console.log(ladoAleatorio())
}

ajustaTamanhoPalcoJogo()
posicaoRandomica()

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

// controla o tempo em que o mosquito aparece
var criaMosquito = setInterval(function(){
    posicaoRandomica()
}, criaMosquitoTempo)


