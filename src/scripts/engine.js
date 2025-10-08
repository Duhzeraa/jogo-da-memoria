// Seleciona o container do jogo e o NOVO botão
const gameContainer = document.querySelector('.memory-game');
const resetButton = document.querySelector('#reset-btn');

const emojis = ['😂', '😍', '🥶', '😡', '🤔', '😎', '🥳', '🤯'];
let gameCards = [...emojis, ...emojis];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function generateCards() {
    // Embaralha as cartas toda vez que o tabuleiro é gerado
    shuffle(gameCards); 
    
    gameCards.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.emoji = emoji;

        card.innerHTML = `
            <div class="front-face">?</div>
            <div class="back-face">${emoji}</div>
        `;

        gameContainer.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1200);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// ===============================================
// NOVA FUNÇÃO PARA RESETAR O JOGO
function resetGame() {
    // 1. Limpa completamente o tabuleiro atual
    gameContainer.innerHTML = '';

    // 2. Reseta as variáveis de controle da jogada
    resetBoard();
    
    // 3. Gera um novo tabuleiro com as cartas embaralhadas
    generateCards();
}
// ===============================================

// ADICIONA O EVENTO DE CLIQUE AO BOTÃO
resetButton.addEventListener('click', resetGame);

// Inicia o jogo pela primeira vez quando a página carrega
generateCards();