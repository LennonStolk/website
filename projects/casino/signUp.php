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
    <h1 id="pageTitle">Sign Up</h1>

    <form class="basicForm" id="signUpForm" action="controllers/userController.php" method="post">
        <label for="userName">Username:</label>
        <input id="userName" type="text" name="userName" maxlength="15"><br><br>
        <label for="email">Email:</label>
        <input id="email" type="text" id="email" name="email"><br><br>
        <label for="password">Password:</label>
        <input id="password" type="text" id="password" name="password" maxlength="50"><br><br>
        <input type="hidden" name="method" value="createAccount">
        <input id="submit" type="submit" value="Create account" disabled="">

        <p style="color: orange;">
            <?php echo isset($_GET["response"]) ? $_GET["response"] : null; ?>
        </p>
    </form>
    <div id="errorDiv"></div>
    <script src="js/signUpValidation.js" defer></script>
</body>
</html>

