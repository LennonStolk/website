<?php

$host = "rdbms.strato.de";
$database = "dbs1554223";
$gebruiker = "dbu230922";
$wachtwoord = "Tamboerijn18";
$charset = "utf8mb4";
$databaseString = "mysql:host=$host;dbname=$database;charset=$charset";
$connectie = new PDO($databaseString, $gebruiker, $wachtwoord);

$highscoreNaam = isset($_GET["naam"]) ? $_GET["naam"] : null;
$highscoreScore = isset($_GET["score"]) ? $_GET["score"] : null;
$highscoreNiveau = isset($_GET["niveau"]) ? $_GET["niveau"] : null;

if ($highscoreNaam == null) {
    $stmt = $connectie->query("SELECT * FROM `among-us-memory-highscores`");
    $data = $stmt->fetchAll();
    echo json_encode($data);
}
else {
    $stmt = $connectie->prepare("INSERT INTO `among-us-memory-highscores` (naam, score, niveau) VALUES (:naam, :score, :niveau)");
    $stmt->execute([
        ":naam" => $highscoreNaam,
        ":score" => $highscoreScore,
        ":niveau" => $highscoreNiveau
    ]);
}

