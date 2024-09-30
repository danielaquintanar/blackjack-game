let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let deck = [];

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    deck = deck.sort(() => Math.random() - 0.5); // Mezclar el mazo
}

function getCardValue(card) {
    if (card.value === 'A') return 11;
    if (['K', 'Q', 'J'].includes(card.value)) return 10;
    return parseInt(card.value);
}

function dealCard() {
    return deck.pop();
}

function updateScores() {
    playerScore = playerCards.reduce((sum, card) => sum + getCardValue(card), 0);
    dealerScore = dealerCards.reduce((sum, card) => sum + getCardValue(card), 0);
    document.getElementById('player-score').innerText = `Score: ${playerScore}`;
    document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;
}

function displayCards() {
    document.getElementById('player-cards').innerHTML = playerCards.map(card => `${card.value} of ${card.suit}`).join(', ');
    document.getElementById('dealer-cards').innerHTML = dealerCards.map(card => `${card.value} of ${card.suit}`).join(', ');
}

function checkGameStatus() {
    if (playerScore > 21) {
        document.getElementById('message').innerText = 'You busted! Dealer wins.';
    } else if (dealerScore > 21) {
        document.getElementById('message').innerText = 'Dealer busted! You win!';
    }
}

document.getElementById('hit-button').addEventListener('click', () => {
    playerCards.push(dealCard());
    updateScores();
    displayCards();
    checkGameStatus();
});

document.getElementById('stand-button').addEventListener('click', () => {
    while (dealerScore < 17) {
        dealerCards.push(dealCard());
        updateScores();
        displayCards();
        checkGameStatus();
    }
    if (playerScore <= 21 && dealerScore <= 21) {
        if (playerScore > dealerScore) {
            document.getElementById('message').innerText = 'You win!';
        } else {
            document.getElementById('message').innerText = 'Dealer wins!';
        }
    }
});

createDeck();
playerCards.push(dealCard(), dealCard());
dealerCards.push(dealCard(), dealCard());
updateScores();
displayCards();
