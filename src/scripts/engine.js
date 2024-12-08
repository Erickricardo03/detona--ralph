const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        score: 0,
        timeLeft: 30,
        timerId: null,
        result: 0, // Initialize the result to track the score
        hitPosition: null, // Track the hit position
    },
};

// Função para gerar um quadrado aleatório com a classe "enemy"
function randomSquare() {
    // Remove a classe 'enemy' de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Gera um número aleatório entre 0 e 8 (para 9 quadrados)
    let randomNumber = Math.floor(Math.random() * 9);
    let selectedSquare = state.view.squares[randomNumber];

    // Adiciona a classe 'enemy' ao quadrado aleatório
    selectedSquare.classList.add("enemy");

    // Atualiza a posição do inimigo
    state.values.hitPosition = selectedSquare.id;
}

// Função para mover o inimigo a cada segundo
function moveEnemy() {
    state.timerId = setInterval(randomSquare, 1000);
}

// Função para adicionar o evento de clique aos quadrados
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // Verifica se o quadrado clicado contém a classe 'enemy'
            if (square.classList.contains("enemy")) {
                state.values.result++; // Incrementa a pontuação
                state.view.score.textContent = state.values.result; // Atualiza a pontuação na tela
                square.classList.remove("enemy"); // Remove a classe 'enemy' após o clique
            }
        });
    });
}

// Função para o contador de tempo
function countdown() {
    state.values.timerId = setInterval(() => {
        state.values.timeLeft -= 1;
        state.view.timeLeft.textContent = state.values.timeLeft;

        // Se o tempo acabar, termina o jogo
        if (state.values.timeLeft <= 0) {
            clearInterval(state.values.timerId);
            clearInterval(state.timerId); 
            alert("Game Over! Your score: " + state.values.result); // Exibe o score final
        }
    }, 1000);
}

// Função para inicializar o jogo
function initialize() {
    moveEnemy(); // Começa a mover o inimigo
    addListenerHitBox(); // Adiciona o evento de clique aos quadrados
    countdown(); // Começa a contagem regressiva
}

initialize(); // Inicializa o jogo
