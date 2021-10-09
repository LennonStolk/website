<?php

// Adds all function files that are needed
include_once "../includes/validationFunctions.php";

// Makes a connection to the database
include_once "../includes/databaseConnection.php";

// Checks for a method
if (isset($_POST["method"])) {
    $method = $_POST["method"];
}
else {
    echo "No method found";
}

/*                 */
/*  ===METHODS===  */
/*                 */

if ($method == "createAccount") {
    $userName = isset($_POST["userName"]) ? $_POST["userName"] : null;
    $email = isset($_POST["email"]) ? $_POST["email"] : null;
    $password = isset($_POST["password"]) ? $_POST["password"] : null;
    createAccount($db, $userName, $email, $password);
}

if ($method == "logIn") {
    $userName = isset($_POST["userName"]) ? $_POST["userName"] : null;
    $password = isset($_POST["password"]) ? $_POST["password"] : null;
    logIn($db, $userName, $password);
}

if ($method == "deleteAccount") {

} 

if ($method == "getAccountData") {

}

if ($method == "alterBalance") {
    
}

if ($method == "checkEmailExists") {
    $email = isset($_POST["email"]) ? $_POST["email"] : null;

    echo json_encode(checkEmailExists($db, $email));
}

if ($method == "checkNameExists") {
    $userName = isset($_POST["userName"]) ? $_POST["userName"] : null;

    echo json_encode(checkNameExists($db, $userName));
}

function getBalanceByName($db, $userName) {
    $sql = 'SELECT balance FROM casino_users WHERE username = :userName';
    $vars = ["userName" => $userName];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = $stmt->fetch()[0];

    return $result;
}

function getProfilePictureByName($db, $userName) {
    $sql = 'SELECT profilepicture FROM casino_users WHERE username = :userName';
    $vars = ["userName" => $userName];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = $stmt->fetch()[0];

    return $result;
}

function getPasswordHash($db, $userName) {
    $sql = 'SELECT password FROM casino_users WHERE username = :userName';
    $vars = ["userName" => $userName];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = $stmt->fetch()[0];

    return $result;
}

function checkNameExists($db, $userName) {
    $sql = 'SELECT * FROM casino_users WHERE username = :userName';
    $vars = ["userName" => $userName];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = ($stmt->fetch() > 0) ? true : false;

    return $result;
}

function checkEmailExists($db, $email) {
    $sql = 'SELECT * FROM casino_users WHERE email = :email';
    $vars = ["email" => $email];
    $stmt = $db->prepare($sql);
    $stmt->execute($vars);
    $result = ($stmt->fetch() > 0) ? true : false;

    return $result;
}

function createAccount($db, $userName, $email, $password) {
    if (anyEmpty([$userName, $email, $password])) {
        header('Location: ../signUp.php?response=emptyFields');
        die();
    } 
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: ../signUp.php?response=invalidEmail');
        die();
    }
    elseif (strlen($userName) > 15) {
        header('Location: ../signUp.php?response=nameTooLong');
        die();
    }
    elseif (strlen($email) > 50) {
        header('Location: ../signUp.php?response=emailTooLong');
        die();
    }
    elseif (checkNameExists($db, $userName)) {
        header('Location: ../signUp.php?response=nameAlreadyExists');
        die();
    }
    elseif (checkEmailExists($db, $email)) {
        header('Location: ../signUp.php?response=emailAlreadyExists');
        die();
    }
    elseif (($password = password_hash($password, PASSWORD_DEFAULT)) == false) {
        header('Location: ../signUp.php?response=passwordCantBeHashed');
        die();
    }
    elseif (checkLegalCharacters($userName, "abcdefghijklmnopqrstuvwxyz1234567890_-") == false) {
        header('Location: ../signUp.php?response=illegalCharacters');
        die();
    }
    else {
        $sql = 'INSERT INTO casino_users (username, email, password, balance, profilepicture) VALUES (:userName, :email, :password, 500, :profilePicture);';
        $vars = [
            "userName" => $userName,
            "email" => $email,
            "password" => $password,
            "profilePicture" => file_get_contents("../img/defaultProfilePicture.png")
        ];
        $stmt = $db->prepare($sql);
        $stmt->execute($vars);

        header('Location: ../home.php?response=successfullyMadeAccount');
        die();
    }
}

function logIn($db, $userName, $password) {
    if (anyEmpty([$userName, $password])) {
        header('Location: ../logIn.php?response=emptyFields');
        die();
    } 
    elseif (!checkNameExists($db, $userName)) {
        header('Location: ../logIn.php?response=nameDoesntExist');
        die();
    }
    else {
        $dbHash = getPasswordHash($db, $userName);
        $passwordCorrect = password_verify($password, $dbHash);

        if ($passwordCorrect != 1) {
            header('Location: ../logIn.php?response=wrongPassword');
            die();
        }
        else {
            session_start();
            $_SESSION["username"] = $userName;
            $_SESSION["balance"] = getBalanceByName($db, $userName);
            $_SESSION["profilePicture"] = getProfilePictureByName($db, $userName);
            header('Location: ../home.php?response=successfullyLoggedIn');
            die();
        }
    }
}