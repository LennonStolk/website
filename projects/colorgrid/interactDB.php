<?php

//Verbind met de database
$host = "localhost";
$dbname = "colorgrid";
$username = "root";
$password = "";
$connectStr = "mysql:host=" . $host . ";dbname=" . $dbname . ";charset=utf8";
$db = new PDO($connectStr, $username, $password);

//
if ($_POST["input"] == "changeColor") {
    $input = $_POST["input"];
    $color = $_POST["color"];
    $xpos = $_POST["xpos"];
    $ypos = $_POST["ypos"];
    $id = $_POST["id"];
    $db->query("INSERT INTO gridtable (id, positie_x, positie_y, kleur) VALUES ('$id', '$xpos', '$ypos', '$color')
        ON DUPLICATE KEY UPDATE positie_x='$xpos', positie_y='$ypos', kleur='$color'");
    echo "Change color $color id $id at $xpos $ypos";
}
?>