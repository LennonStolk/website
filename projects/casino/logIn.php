<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include_once "includes/navigationBar.php" ?>
    <h1 id="pageTitle">Log In</h1>
    <form class="basicForm" id="logInForm" action="controllers/userController.php" method="post">
        <label for="userName">Username:</label>
        <input type="text" name="userName"><br><br>
        <label for="password">Password:</label>
        <input type="text" id="password" name="password"><br><br>
        <input type="hidden" name="method" value="logIn">
        <input type="submit" value="Log in">

        <p style="color: orange;">
            <?php echo isset($_GET["response"]) ? $_GET["response"] : null; ?>
        </p>
    </form>
    <h3 style="text-align: center;">
        <a href="signUp.php" class="subtleLink">Don't have an account yet? Sign up here</a>
    </h3>
</body>
</html>
