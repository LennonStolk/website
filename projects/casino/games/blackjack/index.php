<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Reggae+One&display=swap" rel="stylesheet"> 
    <script src="main.js" defer></script>
</head>
<body>
    <?php include "includes/balancePanel.php" ?>
    <div id="gameFlex">
        <div id="dealerCards">
            <h1 id="dealerScore" class="pointsDisplay">0 Punten</h1>
        </div>
        <div id="yourCards">
            <h1 id="yourScore" class="pointsDisplay">0 Punten</h1>
        </div>
        <div id="buttonArea">
            <div id="buttonBet" class="button button-bet button-inactive">
                <button onclick="changeBet('Raise')">🠕</button>
                <button onclick="changeBet('Lower')">🠗</button>
                <button onclick="confirmBet()" id="currentBet">Bet 25</button>
            </div>
            <button id="buttonHit" onclick="main('hit')" class="button button-hit button-inactive">Hit</button>
            <button id="buttonStand" onclick="main('stand')" class="button button-stand button-inactive">Stand</button>
            <button id="buttonDouble" onclick="main('double')" class="button button-double button-inactive">Double</button>
        </div>
    </div>
</body>
</html>