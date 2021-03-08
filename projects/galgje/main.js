/* Deze functie haalt eerst de letter op uit het form. Dan kijkt of de functie of de letter al gebruikt is.
Als de letter in het woord zit, dan kijkt de functie waar die letter(s) staat in het woord, en vervangt
hem daarna in de _ _ _ string. Als de letter niet in het woord zit dan wordt de letter toegevoegd aan de
lijst van de foute letters. */
function checkLetter() {
    if (document.getElementById("bericht").innerText == "Je hebt gewonnen!" || document.getElementById("bericht").innerText == "Je hebt verloren.") {
        reset();
        return;
    }
    var letter = document.getElementById("text").value.toLowerCase();
    document.getElementById("text").value = "";
    document.getElementById("bericht").innerText = "";
    if (wrongLetters.includes(letter) || hiddenWord.includes(letter)) {
        document.getElementById("bericht").innerText = "Je hebt deze letter al geraden";
    }
    else if (word.includes(letter)) {
        for (i = 0; i < word.length; i++) {
            if (letter == word.substr(i, 1)) {
                var hiddenWordExploded = hiddenWord.split("");
                hiddenWordExploded[i] = letter;
                hiddenWord = hiddenWordExploded.join("");
            }
        }
        document.getElementById("goed").innerText = hiddenWord;
    }
    else {
        wrongLetters += letter;
        document.getElementById("fout").innerText = wrongLetters;
        addGallow();
    }
    checkWinLose();
}

/* Deze functie is ervoor om een willekeurig woord uit de lijst te kiezen, en de functie genereert ook een lege _ _ _ string. */ 
function initialize(wordArray) {
    word = wordArray[Math.floor(Math.random() * wordArray.length)];
    for (i = 0; i < word.length; i++) {
        hiddenWord += "_";
    }
    document.getElementById("goed").innerText = hiddenWord;
    for (i = 1; i < 12; i++) {
        document.getElementById("galgContainer").innerHTML += `<div id="galg${i}"></div>`;
    }
}

/* Vergelijkt de _ _ _ string met het woord en kijkt of je gewonnen hebt. Of kijkt of je verloren hebt. */
function checkWinLose() {
    if (hiddenWord == word) {
        document.getElementById("bericht").innerText = "Je hebt gewonnen!";
    }
    else  if (gallowCount >= 11) {
        document.getElementById("bericht").innerText = "Je hebt verloren."
    }
}

/* Laat elke de functie gecalld word een deel van de galg verschijnen */
function addGallow() {
    gallowCount++;
    if (gallowCount > 11) {gallowCount = 11}
    document.getElementById("galg" + gallowCount).style.display = "block";
}

/* Deze functie reset alle waardes, tekst en genereert een nieuw woord */
function reset() {
    gallowCount = 0;
    hiddenWord = "";
    wrongLetters = "";
    document.getElementById("bericht").innerText = "";
    document.getElementById("fout").innerText = "";
    document.getElementById("text").value = "";
    initialize(wordArray);
    for (i = 1; i < 12; i++) {
        document.getElementById("galg" + i).style.display = "none";
    }
}

var wordArray = ["hond", "auto", "kat", "appel", "peer", "kaas", "brood", "broodje", "tafel", "kanarie", "huismus", "viool", "koekje", "zwaan", "eend", "boom", "bos", "man", "corona", "roderick", "visser", "pooier","uilenbal","fantoompijn","kattenbak","trema","jazz","poep","taxi"];
var word = "";
var hiddenWord = "";
var wrongLetters = "";
var gallowCount = 0;

initialize(wordArray);
console.log(word);


