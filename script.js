const cardsArray = [
    { name: 'figura1', img: 'https://via.placeholder.com/100' },
    { name: 'figura2', img: 'https://via.placeholder.com/100' },
    { name: 'figura3', img: 'https://via.placeholder.com/100' },
    { name: 'figura4', img: 'https://via.placeholder.com/100' },
    { name: 'figura5', img: 'https://via.placeholder.com/100' },
    { name: 'figura6', img: 'https://via.placeholder.com/100' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

const gameArea = document.getElementById('gameArea');
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

function createBoard() {
    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `<img src="${item.img}" alt="${item.name}">`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameArea.appendChild(card);
    });
}

function matchCards() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
        card.classList.remove('flipped');
    });
}

gameArea.addEventListener('click', function(event) {
    const clicked = event.target;

    if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('flipped') ||
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
            clicked.parentNode.classList.add('flipped');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
            clicked.parentNode.classList.add('flipped');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(matchCards, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});

document.getElementById('startGame').addEventListener('click', function() {
    gameArea.innerHTML = '';
    gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
    createBoard();
});
