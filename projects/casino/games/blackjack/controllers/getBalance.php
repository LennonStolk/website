<?php

session_start();
include_once "../includes/databaseConnection.php";
include_once "../includes/databaseFunctions.php";

if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $balance = getBalanceByName($db, $username);

    echo json_encode([$username, $balance]);
}