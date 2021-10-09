<?php

session_start();

if (isset($_SESSION["loggedIn"])) {
    header('Location: home.php');
}
else {
    header('Location: logIn.php');
}