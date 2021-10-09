<?php

function getBalanceByName($db, $userName) {
    $sql = 'SELECT balance FROM casino_users WHERE username = :userName';
    $vars = ["userName" => $userName];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = $stmt->fetch()[0];

    return $result;
}

function checkGameExists($db, $userName) {
    $sql = 'SELECT * FROM blackjack_games WHERE username = :userName';
    $vars = ["userName" => $userName];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = ($stmt->fetch() > 0) ? true : false;

    return $result;
}

function getExistingGame($db, $userName) {
    $sql = 'SELECT gamestate FROM blackjack_games WHERE username = :userName';
    $vars = ["userName" => $userName];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = $stmt->fetch()[0];

    return $result;
}

function makeGame($db, $userName, $gameState) {
    $sql = 'INSERT INTO blackjack_games (username, gamestate) VALUES (:userName, :gameState);';
    $vars = [
        "userName" => $userName,
        "gameState" => json_encode($gameState)
    ];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
}

function saveGame($db, $userName, $gameState) {
    $sql = 'UPDATE blackjack_games SET gamestate = :gameState WHERE username = :userName';
    $vars = [
        "userName" => $userName,
        "gameState" => json_encode($gameState)
    ];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
}

function alterBalance($db, $userName, $amount) {
    $sql = 'UPDATE casino_users SET balance = :balance WHERE username = :userName';
    $vars = [
        "userName" => $userName,
        "balance" => getBalanceByName($db, $userName) + $amount
    ];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
}