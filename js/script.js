/*( Variaveis )*/
let pecaSelecionada = null; 
let quadradoOriginal = null; 

function selecionarPeca(event, peca) {

  event.stopPropagation(); 
  limparDestinos(); 

  pecaSelecionada = peca; 
  quadradoOriginal = peca.parentElement; 

  quadradoOriginal.classList.add("selecionado");

  mostrarMovimentosValidos(quadradoOriginal);

}

function mostrarMovimentosValidos(origem) {
    const tabuleiro = document.querySelector(".tabuleiro");
    const linhas = Array.from(tabuleiro.children);
  
    const linhaIndex = linhas.indexOf(origem.parentElement);
    const colunaIndex = Array.from(origem.parentElement.children).indexOf(origem);
  
    const simbolo = pecaSelecionada.textContent;
  
    
    if (simbolo === "♜" || simbolo === "♖") {
      const direcoes = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
      ];
      for (let [dx, dy] of direcoes) {
        let i = linhaIndex + dx;
        let j = colunaIndex + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
          const destino = linhas[i].children[j];
          if (destino.children.length === 0) {
            destino.classList.add("destino");
            i += dx;
            j += dy;
          } else {
            break;
          }
        }
      }
    }
  
    else if (simbolo === "♟" && pecaSelecionada.classList.contains("pecaP")) {
      const novaLinha = linhaIndex + 1;
      if (novaLinha < 8) {
        const destino = linhas[novaLinha].children[colunaIndex];
        if (destino.children.length === 0) {
          destino.classList.add("destino");
        }
      }
    }
  
    else if (simbolo === "♟" && pecaSelecionada.classList.contains("pecaB")) {
      const novaLinha = linhaIndex - 1;
      if (novaLinha >= 0) {
        const destino = linhas[novaLinha].children[colunaIndex];
        if (destino.children.length === 0) {
          destino.classList.add("destino");
        }
      }
    }
  
    else if (simbolo === "♝" || simbolo === "♗") {
      const direcoes = [
        [-1, -1], [-1, 1], [1, -1], [1, 1]
      ];
      for (let [dx, dy] of direcoes) {
        let i = linhaIndex + dx;
        let j = colunaIndex + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
          const destino = linhas[i].children[j];
          if (destino.children.length === 0) {
            destino.classList.add("destino");
            i += dx;
            j += dy;
          } else {
            break;
          }
        }
      }
    }
  
    else if (simbolo === "♞" || simbolo === "♘") {
      const movimentos = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1],
      ];
  
      for (let [dx, dy] of movimentos) {
        const i = linhaIndex + dx;
        const j = colunaIndex + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
          const destino = linhas[i].children[j];
          if (destino.children.length === 0) {
            destino.classList.add("destino");
          }
        }
      }
    }
  
    else if (simbolo === "♛" || simbolo === "♕") {
      const direcoes = [
        [-1, 0], [1, 0], [0, -1], [0, 1],     
        [-1, -1], [-1, 1], [1, -1], [1, 1]    
      ];
      for (let [dx, dy] of direcoes) {
        let i = linhaIndex + dx;
        let j = colunaIndex + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
          const destino = linhas[i].children[j];
          if (destino.children.length === 0) {
            destino.classList.add("destino");
            i += dx;
            j += dy;
          } else {
            break;
          }
        }
      }
    }
  
  
    else if (simbolo === "♚" || simbolo === "♔") {
      const direcoes = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]    
      ];
      for (let [dx, dy] of direcoes) {
        const i = linhaIndex + dx;
        const j = colunaIndex + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
          const destino = linhas[i].children[j];
          if (destino.children.length === 0) {
            destino.classList.add("destino");
          }
        }
      }
    }
  }

function marcarQuadrado(div) {

  if (div.children.length === 0) {
    div.classList.add("destino");
  }

}

function limparDestinos() {

  document.querySelectorAll(".destino").forEach(div => div.classList.remove("destino"));
  document.querySelectorAll(".selecionado").forEach(div => div.classList.remove("selecionado"));

}

function handleClick(quadrado) {

  if (quadrado.classList.contains("destino") && pecaSelecionada) {
    quadrado.appendChild(pecaSelecionada);
  }

  limparDestinos(); 
  pecaSelecionada = null;
  quadradoOriginal = null;

}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/