<?php

//Verbind met de database
$host = "localhost";
$dbname = "colorgrid";
$username = "root";
$password = "";
$connectStr = "mysql:host=" . $host . ";dbname=" . $dbname . ";charset=utf8";
$db = new PDO($connectStr, $username, $password);


$colorGridData = $db->query("SELECT * FROM gridtable")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($colorGridData);

?>