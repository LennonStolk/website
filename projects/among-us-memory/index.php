<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory</title>
    <link rel="stylesheet" href="style.css">
    <script src="main.js" defer></script>
</head>
<body>
    <div id="userOptions" >
        <label for="radio4x4">Easy
            <input type="radio" id="radio4x4" name="gridSize" value="4x4">
        </label><br>
        <label for="radio4x6">Medium
            <input type="radio" id="radio4x6" name="gridSize" value="4x6">
        </label><br>
        <label for="radio6x6">Hard
            <input type="radio" id="radio6x6" name="gridSize" value="6x6">
        </label><br>
        <button onClick="loadGame()">Start</button>
    </div>
    <div id="highscoresContainer">
        <button onClick="toggleHighscores()">Highscores</button>
        <div id="highscoresTable"></div>
    </div>
    <div id="memoryContainer"></div>
    <div id="startupContainer">
        <img id="startupImage" src="img/menu/titlescreenimage.png">
        <div id="startupBlock"></div>
        <h1 id="startupText">Among Us Memory</h1>
    </div>
    <div id="livesContainer">
        <div id="heartContainer">
            <div id="heartBackground">
                <p id="heartText">0</p>
            </div>
            <img src="img/menu/heart.png" width="110px">
        </div>
        <p>Lives</p>
    </div>
    <div id="scoreContainer">
        <p>Score</p>
        <p id="scoreCounter">0</p>
    </div>
    <div id="loseScreenContainer">
        <p id="loseScreenText">You lost...</p>
        <img id="loseScreenImage" src="img/menu/death.png" width="200px">
    </div>
    <div id="winScreenContainer">
        <div id="winScreenScore">
            Score: 0
        </div>
        <div id="winScreenName">
            <label for="name">Name:</label>
            <input type="text" name="name" id="winScreenInput" maxlength="10" minlength="1">
        </div>
        <button style="color: red" onClick="clearScreen()">Return</button><button style="color: limegreen" onClick="submitHighscore()">Submit</button>
    </div>
</body>
</html>