function generateDisplayCard(card) {
    let displayCard = document.createElement("div");
    let cardImage = document.createElement("img");
    let src = `img/cards/${card.symbol} ${card.suit}.png`;

    displayCard.setAttribute("class", "displayCard");
    cardImage.setAttribute("src", src);
    cardImage.setAttribute("width", "111px");
    cardImage.setAttribute("draggable", "false");
    displayCard.appendChild(cardImage);

    return displayCard;
}

function changeBet(action) { 
    if (action == "Raise" && betIndex < possibleBets.length - 1) {
        betIndex += 1;
    }
    if (action == "Lower" && betIndex > 0) {
        betIndex -= 1;
    }
    document.getElementById("currentBet").innerText = `Bet ${possibleBets[betIndex]}`;
}

function confirmBet() {
    currentBet = possibleBets[betIndex];

    main("start");
}

function disableAllButtons() {
    let buttons = document.getElementsByClassName("button");

    for (let i = 0; i < 4; i++) {
        buttons[i].classList.add("button-inactive");
        buttons[i].setAttribute("disabled", "True");

        let innerButtons = buttons[i].childNodes;

        innerButtons.forEach((innerButton) => {
            if (innerButton.nodeName == "BUTTON") {
                innerButton.setAttribute("disabled", "True");
            }
        })
    }
}

function updateScoreDisplays() {
    document.getElementById("dealerScore").innerText = `${dealerScore} Punten`;
    document.getElementById("yourScore").innerText = `${playerScore} Punten`;
}

function enableButton(buttonName) {
    let button = document.getElementById(buttonName);

    button.classList.remove("button-inactive");
    button.removeAttribute("disabled");

    let innerButtons = button.childNodes;

    innerButtons.forEach((innerButton) => {
        if (innerButton.nodeName == "BUTTON") {
            innerButton.removeAttribute("disabled");
        }
    })
}

function enableButtons(buttonNames) {
    disableAllButtons();
    if (buttonNames.includes("hit")) {
        enableButton("buttonHit");
    }
    if (buttonNames.includes("stand")) {
        enableButton("buttonStand");
    }
    if (buttonNames.includes("double")) {
        enableButton("buttonDouble");
    }
    if (buttonNames.length == 0 || buttonNames.includes("start")) {
        enableButton("buttonBet");
    }
}

function drawCardsAnimated() {
    clearInterval(cardAnimation);
    cardAnimation = setInterval(drawCardAnimated, 1500);
}

function drawCardAnimated() {
    if (gameState.cardHistory.length == 0) {
        clearInterval(cardAnimation);
        refreshBalancePanel();
        enableButtons(gameState.permittedActions);
    }
    else {
        let card = gameState.cardHistory[0];
        if (gameState.playerCards.some(c => c.displayName == card.displayName)) {
            displayCard = generateDisplayCard(card);
            document.getElementById("yourCards").appendChild(displayCard);
            playerScore += card.points;;
        }
        if (gameState.dealerCards.some(c => c.displayName == card.displayName)) {
            displayCard = generateDisplayCard(card);
            document.getElementById("dealerCards").appendChild(displayCard);
            dealerScore += card.points;
        }
        gameState.cardHistory.shift();
        updateScoreDisplays();
    }    
}

function drawCards(cards) {
    cards.forEach((card) => {
        if (gameState.playerCards.some(c => c.displayName == card.displayName)) {
            displayCard = generateDisplayCard(card);
            document.getElementById("yourCards").appendChild(displayCard);
        }
        if (gameState.dealerCards.some(c => c.displayName == card.displayName)) {
            displayCard = generateDisplayCard(card);
            document.getElementById("dealerCards").appendChild(displayCard);
        } 
    });
}

function clearCards() {
    var cardElements = document.querySelectorAll(".displayCard");

    for (let element of cardElements) {
        element.remove();
    }
}

function resetUserInterface() {
    gameState = {};
    playerScore = 0;
    dealerScore = 0;
    disableAllButtons();
    enableButton("buttonBet");
    clearCards();
    updateScoreDisplays();
}

async function main(action) {
    try {
        let rawGameState = await fetch(`controllers/gameLogic.php?bet=${currentBet}&action=${action}`);
        gameState = await rawGameState.json();
    }
    catch {
        resetUserInterface();
        refreshBalancePanel();
        return;
    }

    if (action == "") {
        playerScore = gameState.playerScore;
        dealerScore = gameState.dealerScore;
        refreshBalancePanel();
        updateScoreDisplays();
        drawCards(gameState.playerCards);
        drawCards(gameState.dealerCards);
        enableButtons(gameState.permittedActions);
    }
    else {
        disableAllButtons();
    }

    if (action == "start") {
        playerScore = 0;
        dealerScore = 0;
        updateScoreDisplays();
        clearCards();
    }

    console.log(gameState);
    playerCards = gameState.playerCards;
    dealerCards = gameState.dealerCards;
    drawCardsAnimated(gameState.cardHistory);
}

let gameState;
let possibleBets = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
let betIndex = 3;
let currentBet = 0;
let balance = 500;
let playerScore = 0;
let dealerScore = 0;
let playerCards = [];
let dealerCards = [];
let cardAnimation;

main("");