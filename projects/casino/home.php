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
    <h1 id="pageTitle">Casino</h1>
    <p style="color: lime;">
        <?php echo isset($_GET["response"]) ? $_GET["response"] : null; ?>
    </p>
</body>
</html>