// Iniciar jogo
document.getElementById('iniciar-jogo').addEventListener('click', () => {
    // Criar tabuleiro de xadrez
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';

    // Criar casas do tabuleiro
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const casa = document.createElement('div');
            casa.classList.add('casa');
            if ((i + j) % 2 === 0) {
                casa.classList.add('preto');
            }
            tabuleiro.appendChild(casa);
        }
    }

    // Adicionar peças ao tabuleiro
    const pecas = [
        // Peças brancas
        { nome: 'rei', imagem: 'rei.png', linha: 0, coluna: 4, cor: 'branco' },
        { nome: 'rainha', imagem: 'rainha.png', linha: 0, coluna: 3, cor: 'branco' },
        { nome: 'torre', imagem: 'torre.png', linha: 0, coluna: 0, cor: 'branco' },
        { nome: 'torre', imagem: 'torre.png', linha: 0, coluna: 7, cor: 'branco' },
        { nome: 'cavalo', imagem: 'cavalo.png', linha: 0, coluna: 1, cor: 'branco' },
        { nome: 'cavalo', imagem: 'cavalo.png', linha: 0, coluna: 6, cor: 'branco' },
        { nome: 'bispo', imagem: 'bispo.png', linha: 0, coluna: 2, cor: 'branco' },
        { nome: 'bispo', imagem: 'bispo.png', linha: 0, coluna: 5, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 0, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 1, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 2, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 3, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 4, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 5, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 6, cor: 'branco' },
        { nome: 'peao', imagem: 'peao.png', linha: 1, coluna: 7, cor: 'branco' },
        // Peças pretas
        { nome: 'rei', imagem: 'rei.png', linha: 7, coluna: 4, cor: 'preto' },
        { nome: 'rainha', imagem: 'rainha.png', linha: 7, coluna: 3, cor: 'preto' },
        { nome: 'torre', imagem: 'torre.png', linha: 7, coluna: 0, cor: 'preto' },
        { nome: 'torre', imagem: 'torre.png', linha: 7, coluna: 7, cor: 'preto' },
        { nome: 'cavalo', imagem: 'cavalo.png', linha: 7, coluna: 1, cor: 'preto' },
        { nome: 'cavalo', imagem: 'cavalo.png', linha: 7, coluna: 6, cor: 'preto' },
        { nome: 'bispo', imagem: 'bispo.png', linha: 7, coluna: 2, cor: 'preto' },
        { nome: 'bispo', imagem: 'bispo.png', linha: 7, coluna: 5, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 0, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 1, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 2, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 3, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 4, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 5, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 6, cor: 'preto' },
        { nome: 'peao', imagem: 'peao.png', linha: 6, coluna: 7, cor: 'preto' },
    ];

    // Adicionar peças ao tabuleiro
    pecas.forEach((peca) => {
        const casa = tabuleiro.children[peca.linha * 8 + peca.coluna];
        const imagem = document.createElement('img');
        imagem.src = `imgs/${peca.imagem}`;
        imagem.alt = peca.nome;
        imagem.style.width = '100%';
        imagem.style.height = '100%';
        imagem.style.objectFit = 'cover';
        casa.appendChild(imagem);
    });

    // Adicionar eventos de clique às casas
    tabuleiro.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const casa = e.target.parentNode;
            const peca = pecas.find((p) => p.nome === e.target.alt);
            if (peca) {
                // Mostrar casas possíveis para a peça
                mostrarCasasPossiveis(peca, casa);
            }
        }
    });
});

// Função para mostrar as casas possíveis para a peça
function mostrarCasasPossiveis(peca, casa) {
    // Verificar se a peça é válida
    if (!peca) {
        return;
    }

    // Verificar se a casa é válida
    if (!casa) {
        return;
    }

    // Mostrar as casas possíveis para a peça
    const tabuleiro = document.getElementById('tabuleiro');
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const casaPossivel = tabuleiro.children[i * 8 + j];
            if (casaPossivel === casa) {
                continue;
            }

            // Verificar se a casa é uma casa possível para a peça
            if (validarMovimento(peca, casa, casaPossivel)) {
                casaPossivel.classList.add('possivel');
                casaPossivel.addEventListener('click', () => {
                    // Mover a peça para a casa de destino
                    moverPeca(casa, casaPossivel);
                });
            }
        }
    }
}

// Função para mover as peças
function moverPeca(casaOrigem, casaDestino) {
    // Verificar se a casa de origem é válida
    if (!casaOrigem) {
        return;
    }

    // Verificar se a casa de destino é válida
    if (!casaDestino) {
        return;
    }

    // Verificar se a peça pode ser movida para a casa de destino
    const peca = casaOrigem.children[0];
    if (!peca) {
        return;
    }

    // Verificar se a casa de destino está vazia
    if (casaDestino.children.length > 0) {
        // Se a casa de destino não está vazia, verificar se a peça pode capturar a peça na casa de destino
        const pecaDestino = casaDestino.children[0];
        if (pecaDestino && peca.alt !== pecaDestino.alt) {
            // Se a peça pode capturar a peça na casa de destino, remover a peça na casa de destino
            casaDestino.removeChild(pecaDestino);
        } else {
            // Se a peça não pode capturar a peça na casa de destino, não mover a peça
            return;
        }
    }

    // Mover a peça para a casa de destino
    casaDestino.appendChild(peca);
    casaOrigem.removeChild(peca);

    // Verificar se o jogo está em xeque
    if (verificarXeque()) {
        // Se o jogo está em xeque, não mover a peça
        casaOrigem.appendChild(peca);
        casaDestino.removeChild(peca);
        return;
    }

    // Verificar se o jogo está em xeque-mate
    if (verificarXequeMate()) {
        // Se o jogo está em xeque-mate, finalizar o jogo
        alert("Xeque-mate! O jogo terminou.");
    }
}

// Função para validar o movimento da peça
function validarMovimento(peca, casaOrigem, casaDestino) {
    // Verificar se a peça é válida
    if (!peca) {
        return false;
    }

    // Verificar se a casa de origem é válida
    if (!casaOrigem) {
        return false;
    }

    // Verificar se a casa de destino é válida
    if (!casaDestino) {
        return false;
    }

    // Verificar se a peça pode se mover para a casa de destino
    if (peca.nome === 'rei') {
        // Rei pode se mover uma casa em qualquer direção
        if (Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) <= 1 && Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) <= 1) {
            return true;
        }
    } else if (peca.nome === 'rainha') {
        // Rainha pode se mover qualquer número de casas em qualquer direção
        if (Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt)) {
            return true;
        }
    } else if (peca.nome === 'torre') {
        // Torre pode se mover qualquer número de casas em linha ou coluna
        if (casaOrigem.children[0].alt === casaDestino.children[0].alt || casaOrigem.children[0].alt === casaDestino.children[0].alt) {
            return true;
        }
    } else if (peca.nome === 'cavalo') {
        // Cavalo pode se mover duas casas em uma direção e uma casa em outra direção
        if (Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === 2 && Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === 1) {
            return true;
        } else if (Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === 1 && Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === 2) {
            return true;
        }
    } else if (peca.nome === 'bispo') {
        // Bispo pode se mover qualquer número de casas em diagonal
        if (Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt)) {
            return true;
        }
    } else if (peca.nome === 'peao') {
        // Peão pode se mover uma casa para frente, mas captura em diagonal
        if (casaOrigem.children[0].alt === casaDestino.children[0].alt && Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === 1) {
            return true;
        } else if (casaOrigem.children[0].alt === casaDestino.children[0].alt && Math.abs(casaOrigem.children[0].alt - casaDestino.children[0].alt) === 1) {
            return true;
        }
    }

    return false;
}

// Função para verificar se o jogo está em xeque-mate
function verificarXequeMate() {
    // Verificar se o jogo está em xeque
    if (!verificarXeque()) {
        return false;
    }

    // Verificar se há alguma peça que possa salvar o rei
    const pecas = document.querySelectorAll('img');
    for (let i = 0; i < pecas.length; i++) {
        const peca = pecas[i];
        if (peca.alt !== 'rei') {
            const casaOrigem = peca.parentNode;
            const casasPossiveis = Array.from(casaOrigem.parentNode.children).filter((casa) => {
                return validarMovimento({ nome: peca.alt }, casaOrigem, casa);
            });

            for (let j = 0; j < casasPossiveis.length; j++) {
                const casaDestino = casasPossiveis[j];
                const imagem = peca.cloneNode();
                casaDestino.appendChild(imagem);
                casaOrigem.removeChild(peca);

                if (!verificarXeque()) {
                    casaOrigem.appendChild(peca);
                    casaDestino.removeChild(imagem);
                    return false;
                }

                casaOrigem.appendChild(peca);
                casaDestino.removeChild(imagem);
            }
        }
    }

    return true;
}

// Função para iniciar o jogo
function iniciarJogo() {
    // Criar tabuleiro de xadrez
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';

    // Criar casas do tabuleiro
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const casa = document.createElement('div');
            casa.classList.add('casa');
            if ((i + j) % 2 === 0) {
                casa.classList.add('preto');
            } else {
                casa.classList.add('branco');
            }
            casa.style.gridRow = i + 1;
            casa.style.gridColumn = j + 1;
            tabuleiro.appendChild(casa);
        }
    }
};