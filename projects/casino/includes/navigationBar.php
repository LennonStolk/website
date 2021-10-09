<script src="js/hamburgerMenu.js" defer></script>

<div class="container">
    <nav>
        <a class="logo" href="home.php">
            <img src="img/logo.png" height="40px" style="margin: -5px 10px">
        </a>
        <a href="home.php">HOME</a>
        <a href="games.php">GAMES</a>
        <a href="toDoList.php">TO DO</a>
        <a href="store.php">STORE</a>
        <button class="hamburger">
            <div class="bar"></div>
        </button>
        <?php 
            session_start();
            $username = isset($_SESSION["username"]) ? $_SESSION["username"] : null;

            if ($username != null) {
                echo '<a href="logOut.php">LOG OUT</a>';
            }
            else {
                echo '<a href="logIn.php">LOG IN</a>';
            }
            if (isset($_SESSION["profilePicture"])) {
                echo '<a href="profile.php">';
                echo '<img src="data:image/jpg;base64,' . base64_encode($_SESSION["profilePicture"]) . '" class="navbarProfilePicture"/>';
                echo '</a>';
            }
        ?>
    </nav>
</div>
<nav class="mobile-nav hidden">
    <a href="home.php">HOME</a>
    <a href="games.php">GAMES</a>
    <a href="toDoList.php">TO DO</a>
    <a href="store.php">STORE</a>
    <?php 
        if (isset($_SESSION["username"])) {
            echo '<a href="logOut.php">LOG OUT</a>';
        }
        else {
            echo '<a href="logIn.php">LOG IN</a>';
        }
    ?>
</nav>