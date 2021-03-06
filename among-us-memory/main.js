/*
    Functies voor het Among Us memory spel
    Setup functie: init()
    Spel setup functie: loadGame()
    Main functie: cardClick()
*/

// Leest de waardes van de knoppen in de UI, en genereert een 
// object die belangrijke informatie bevat over de moeilijkheidsgraad
// en andere opties.
function getOptionData() {
    let radioInput = document.querySelector('input[name="gridSize"]:checked').value;
    let gridDimensions = radioInput.split("x");
    let totalSize = gridDimensions[0] * gridDimensions[1];
    let lives = (totalSize / 2) + 4;
    let difficulty = "";

    if (totalSize == 16) {difficulty = "easy"};
    if (totalSize == 24) {difficulty = "medium"};
    if (totalSize == 36) {difficulty = "hard"};

    return {
        height: gridDimensions[0],
        width: gridDimensions[1],
        lives: lives,
        difficulty: difficulty
    }
}

// Genereert een array van variabele grootte met willekeurige kaarten (2 van elke kleur).
function getDeck(deckSize) {
    let output = [];
    let characters = ["aqua", "black", "blue", "brown", "cyan", "darkbrown", "gray", "green", "lightblue", "lightbrown", "lightgray", "lime", "orange", "peach", "pink", "purple", "red", "violet", "white", "yellow"];
    
    for (i = 0; i < deckSize / 2; i++) {
        let randomIndex = getRandomIndex(characters);
        let randomCharacter = characters[randomIndex];

        removeArrayItem(characters, randomCharacter);
        output.push(randomCharacter);
        output.push(randomCharacter);
    }

    return output;
}

// Haal een willekeurige kaart uit een array en returnt die kaart.
function getRandomCard(deck) {
    let randomIndex = getRandomIndex(deck);
    let randomCard = deck[randomIndex];

    removeArrayItem(deck, randomCard);

    return randomCard;
}

// Genereert een willekeurige index voor een array.
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

// Haalt een specifiek item uit een array
function removeArrayItem(array, item) {
    let removingIndex = array.indexOf(item);

    array.splice(removingIndex, 1);
}

// Vult een globale array en het scherm met willekeurige kaarten uit een ander array.
function fillGrid(deck) {
    let deckLength = deck.length;

    for (i = 0; i < deckLength; i++) {
        let card = getRandomCard(deck);
        let divElement = `<div class="card" id="${i}" onClick="cardClick(this.id)"></div>`;

        globalData.cards[i] = {};
        globalData.cards[i].color = card;
        globalData.cards[i].state = "hidden";
        document.getElementById("memoryContainer").innerHTML += divElement;

        changeImage(i, "mystery");
    }
}

// Verandert een plaatje op het scherm
function changeImage(id, color) {
    let imageElement =`<img src="img/characters/${color}.png" width="84px" draggable="false">`;

    document.getElementById(id).innerHTML = imageElement;
}

// Maakt het scherm met alle kaarten leeg.
function clearScreen() {
    let loseScreenText = document.getElementById("loseScreenText");
    let loseScreenImage = document.getElementById("loseScreenImage");
    let grid = document.getElementById("memoryContainer");
    let winScreen = document.getElementById("winScreenContainer");
    
    grid.innerHTML = "";
    loseScreenText.style.display = "none";
    loseScreenImage.style.display = "none";
    loseScreenText.style.opacity = "0";
    loseScreenImage.style.opacity = "0";
    winScreen.style.display = "none";
    winScreen.style.opacity = 0;
}

// Dit is de algemene logica van het spel. 
// Het bepaalt wat er gebeurd als je op een kaart klikt.
// Het kijkt ook of je gewonnen of verloren hebt.
function cardClick(id) {
    let card = globalData.cards[id];
    let color = card.color;
    let flippedCard = globalData.flipped;
    let flippedID = flippedCard.id;
    let flippedState = flippedCard.state;
    let flippedColor = flippedCard.color;

    if (flippedState === "no") {
        changeImage(id, color);

        globalData.flipped.id = id;
        globalData.flipped.color = color;
        globalData.flipped.state = "flipped";
    } 
    else {
        changeImage(id, color);

        if (flippedID == id) {return;}
        if (color == flippedColor) {guessRight(id, flippedID);} 
        else {guessWrong(id, flippedID);}
    }

    checkLose();
    checkWin();
}

// Als je de juiste kaart om hebt gedraaid, 
// zorgt deze functie ervoor dat de kaart van het scherm verdwijnt
// en dat je score omhoog gaat.
function guessRight(id, flippedID) {
    globalData.flipped.state = "no";
    globalData.cards[id].state = "found";
    globalData.cards[flippedID].state = "found";

    document.getElementById(id).setAttribute("onClick", "");
    document.getElementById(flippedID).setAttribute("onClick", "");

    setTimeout(() => {
        document.getElementById(id).style.opacity = "0";
        document.getElementById(flippedID).style.opacity = "0";
    }, 600);

    addScore(500);
}

// Als je de onjuiste kaart om hebt gedraaid,
// zorgt deze functie ervoor dat je een leven verliest
// en dat de kaarten weer "mystery" worden.
function guessWrong(id, flippedID) {
    globalData.flipped.state = "no";
    globalData.lives -= 1;
    
    setTimeout(() => {
        changeImage(id, "mystery");
        changeImage(flippedID, "mystery");
    }, 600);

    updateHeart();
}

// Voegt score toe als je de juiste kaart om hebt gedraaid.
function addScore(addedScore) {
    globalData.score += addedScore;
    
    updateScore();
}

// Update het score divje naar de actuele score
function updateScore() {
    let score = globalData.score;

    document.getElementById("scoreCounter").innerText = score;
}

// Deze funtie zorgt ervoor dat het hart op het scherm overeen
// komt met de "lives" in het globale object.
function updateHeart() {
    let optionData = getOptionData();
    let maxLives = optionData.lives;
    let currentLives = globalData.lives;
    let percentage = (currentLives / maxLives);
    let height = 105 - (percentage * 105);

    document.getElementById("heartBackground").style.height = `${height}px`;
    document.getElementById("heartText").innerHTML = currentLives;
}

// Deze functie kijkt of je verloren hebt.
function checkLose() {
    let lives = globalData.lives;
    
    if (lives <= 0) {
        lose();
    }
}

// Deze functie kijkt of je gewonnen hebt.
function checkWin() {
    let cards = globalData.cards;
    let anyHidden = cards.some(card => card.state == "hidden");

    if (anyHidden == false) {
        win();
    }
}

// Deze functie laat aan de gebruiker zien dat hij/zij verloren heeft.
function lose() {
    globalData.score = 0;

    clearScreen();
    updateScore();
    showLoseScreen();
}

// Laat het verlies scherm zien
function showLoseScreen() {
    let text = document.getElementById("loseScreenText");
    let image = document.getElementById("loseScreenImage");

    text.style.display = "block";
    image.style.display = "block";

    setTimeout(() => {
        text.style.opacity = "1";
        image.style.opacity = "1";
    }, 500);
}

// Deze functie laat aan de gebruiker zien dat hij/zij gewonnen heeft.
function win() {
    calculateFinalScore();
    updateScore();
    showWinScreen();
}

// Laat win scherm zien
function showWinScreen() {
    let winScreen = document.getElementById("winScreenContainer");
    let winScreenScore = document.getElementById("winScreenScore");
    let score = globalData.score;
    
    winScreen.style.display = "block";
    winScreenScore.innerText = `Score: ${score}`;

    setTimeout(() => {
        winScreen.style.opacity = "1";
    }, 1000);
}

// Stuurt highscore naar database
function submitHighscore() {
    let name = document.getElementById("winScreenInput").value;
    let score = globalData.score;
    let difficulty = globalData.difficulty;

    if (name == "" || difficulty == "") {
        return
    }

    fetch(`highscores.php?naam=${name}&score=${score}&niveau=${difficulty}`);
    clearScreen();

    if (globalData.highscoreToggle == true) {
        showHighscoresTable();
    }
}

// Berekent uiteindelijke score
function calculateFinalScore() {
    let score = globalData.score;
    let lives = globalData.lives;
    let finalScore = score + (lives * 250);

    globalData.score = finalScore;
}

// Deze functie laat een nieuw spel gebaseerd op de "optionData" 
// en zet alle globale variabelen terug naar de standaard waarden.
function loadGame() {
    let optionData = getOptionData();
    let gridHeight = optionData.height;
    let gridWidth = optionData.width;
    let gridSize = gridHeight * gridWidth;
    let deck = getDeck(gridSize);

    clearScreen();
    setScreenSize();
    setGameVariables();
    removeStartup();
    fillGrid(deck);
    updateHeart();
}

// Zet de globale variabelen van het spel naar beginwaarden
function setGameVariables() {
    let optionData = getOptionData();
    let lives = optionData.lives;
    let difficulty = optionData.difficulty;

    globalData.cards = [];
    globalData.flipped.state = "no";
    globalData.flipped.color = "";
    globalData.flipped.id = 0;
    globalData.lives = lives;
    globalData.score = 0;
    globalData.difficulty = difficulty;
}

// Maakt het scherm de juiste grootte
function setScreenSize() {
    let optionData = getOptionData();
    let gridHeight = optionData.height;
    let gridWidth = optionData.width;
    let grid = document.getElementById("memoryContainer");

    grid.style.height = `${gridHeight * 120}px`;
    grid.style.width = `${gridWidth * 120}px`;
}

// Haalt het startup scherm weg
function removeStartup() {
    let startup = document.getElementById("startupContainer");
    let grid = document.getElementById("memoryContainer");

    startup.children["startupBlock"].style.height = "0";
    startup.children["startupText"].style.opacity = "0";
    startup.children["startupText"].style.bottom = "-200px";
    startup.children["startupImage"].style.opacity = "0";
    startup.children["startupImage"].style.bottom = "-300px";
    grid.style.opacity = "1";

    setTimeout(() => {
        startup.style.display = "none";
        grid.style.transition = "none";
    }, 500);
}

// Haalt de Highscores op uit de database
async function getHighscores() {
    let data = await fetch("highscores.php");
    let highscores = data.json();

    return highscores;
}

// Laat zien of verbergt highscores lijst.
function toggleHighscores() {
    let highscoresContainer = document.getElementById("highscoresContainer");
    let highscoreToggle = globalData.highscoreToggle;
    let highscoresTable = document.getElementById("highscoresTable")

    highscoreToggle = !highscoreToggle;
    globalData.highscoreToggle = highscoreToggle;

    if (highscoreToggle == true) {
        highscoresContainer.style.width = "350px";
        showHighscoresTable();
    }
    else {
        highscoresContainer.style.width = "110px";
        highscoresTable.innerHTML = "";
    }
}

// Genereert en laat highscores tabel zien
function showHighscoresTable() {
    let tableContainer = document.getElementById("highscoresTable");
    let highscoresData = getHighscores();

    tableContainer.innerHTML = "";
    
    highscoresData.then(data => {
        let table = document.createElement("table");
        let tableRow = document.createElement("tr");
        let tableHeaderRanking = document.createElement("th");
        let tableHeaderName = document.createElement("th");
        let tableHeaderScore = document.createElement("th");
        let tableHeaderDifficulty = document.createElement("th");
        
        tableHeaderRanking.innerText = "Rank";
        tableHeaderName.innerText = "Name";
        tableHeaderScore.innerText = "Score";
        tableHeaderDifficulty.innerText = "Difficulty";

        tableContainer.appendChild(table);
        table.appendChild(tableRow);
        tableRow.appendChild(tableHeaderRanking);
        tableRow.appendChild(tableHeaderName);
        tableRow.appendChild(tableHeaderScore);
        tableRow.appendChild(tableHeaderDifficulty);

        data.sort((a, b) => (a.score < b.score) ? 1 : -1);

        for (i = 0; i < data.length; i++) {
            let tableRow = document.createElement("tr");
            let tableDataRanking = document.createElement("td");
            let tableDataName = document.createElement("td");
            let tableDataScore = document.createElement("td");
            let tableDataDifficulty = document.createElement("td");

            tableDataRanking.innerText = `#${i + 1}`;
            tableDataName.innerText = data[i].naam;
            tableDataScore.innerText = data[i].score;
            tableDataDifficulty.innerText = data[i].niveau;
            tableDataName.style.color = "cornflowerblue";
            
            if (data[i].niveau == "easy") {tableDataDifficulty.style.color = "limegreen"}
            if (data[i].niveau == "medium") {tableDataDifficulty.style.color = "orange"}
            if (data[i].niveau == "hard") {tableDataDifficulty.style.color = "red"}

            table.appendChild(tableRow);
            tableRow.appendChild(tableDataRanking);
            tableRow.appendChild(tableDataName);
            tableRow.appendChild(tableDataScore);
            tableRow.appendChild(tableDataDifficulty);
        }
    })
}

// Initialiseert een globaal object.
function init() {
    globalData = {
        cards: [],
        flipped: {
            state: "no",
            color: "",
            id: 0
        },
        lives: 0,
        score: 0,
        highscoreToggle: false,
        difficulty: ""
    };
}

init();