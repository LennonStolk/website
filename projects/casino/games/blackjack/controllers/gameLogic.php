<?php


// Includes
include_once "../classes/Card.php";
include_once "../classes/Game.php";
include_once "../includes/databaseConnection.php";
include_once "../includes/databaseFunctions.php";


// Get variables
$action = isset($_GET["action"]) ? $_GET["action"] : "";
$bet = isset($_GET["bet"]) ? $_GET["bet"] : 0;


// Session variables
session_start();
$username = isset($_SESSION["username"]) ? $_SESSION["username"] : "";


// Check if user exists
if ($username == "") {
    echo("no user found");
    die();
}
else {
    $balance = getBalanceByName($db, $username);
}


// Checks if game exists. If not, it makes a new game
if (checkGameExists($db, $username)) {
    $gamefromdb = json_decode(getExistingGame($db, $username)); 
    $game = new Game($username, $bet);
    foreach (get_object_vars($gamefromdb) as $key => $value) {
        $game->$key = $value;
    }
} 
elseif ($balance >= $bet && $action == "start") {
    $game = new Game($username, $bet);
}
else {
    echo("couldn't start game: bet was too high or action was not start");
    die();
}


// Check if game is already won or lost, if so it makes a new game
if ($game->gameState == "lose" || $game->gameState == "win") {
    if ($balance >= $bet && $action == "start") {
        $game = new Game($username, $bet);
    }
    else {
        echo("couldn't start game: bet was too high or action was not start");
        die();
    }
}

// Checks if player balance is high enough to double
if ($balance < $game->currentBet * 2 && $action == "double") {
    $action = "";
}


// Runs the game's main loop
$game->main($action);


// Check if game is won, if so awards the player credits
if ($game->gameState == "win") {
    alterBalance($db, $username, $game->currentBet);
}


// Check if game is lost, if so subtract credits from player's account
if ($game->gameState == "lose") {
    alterBalance($db, $username, -($game->currentBet));
}


// Saves the game to the database
if (checkGameExists($db, $username)) {
    saveGame($db, $username, $game);
}
else {
    makeGame($db, $username, $game);
}


// Return game state to front-end
echo(json_encode($game));