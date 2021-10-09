function init() {
    initCanvas()
    updateScreen();
    addEventListeners();
}

function cycleGame() {
    updateScreen();
}

function updateScreen() {
    drawMap();
    drawObjects();
    drawPlayer();
}

function initCanvas() {
    ctx.imageSmoothingEnabled = false;
}

function drawCanvasTile(targetId, imageSource) {
    let currentRoom = globalGame.player.currentRoom;
    let mapSize = globalGame.world.rooms[currentRoom].size;
    let tileSize = 800 / mapSize;
    let targetX = targetId % mapSize;
    let targetY = (targetId - targetX) / mapSize;
    let image;

    if (cachedImages.hasOwnProperty(imageSource) == true) {
        image = cachedImages[imageSource];
        ctx.drawImage(image, targetX * tileSize, targetY * tileSize, tileSize, tileSize);
    }
    else {
        image = new Image();
        image.onload = () => {
            ctx.drawImage(image, targetX * tileSize, targetY * tileSize, tileSize, tileSize); 
            cachedImages[imageSource] = image;
        }
        image.src = imageSource;
    }
}

function drawObjects() {

}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addEventListeners() {
    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode == 229) {
            return;
        }
        if (event.keyCode == 87 || event.keyCode == 38) {
            movePlayer("up");
        }
        if (event.keyCode == 65 || event.keyCode == 37) {
            movePlayer("left");
        }
        if (event.keyCode == 83 || event.keyCode == 40) {
            movePlayer("down");
        }
        if (event.keyCode == 68 || event.keyCode == 39) {
            movePlayer("right");
        }
    });
}

function drawPlayer() {
    let xpos = globalGame.player.xpos;
    let ypos = globalGame.player.ypos;
    let currentRoom = globalGame.player.currentRoom;
    let mapSize = globalGame.world.rooms[currentRoom].size;
    let targetId = (ypos * mapSize) + xpos;
    let facingDirection = globalGame.player.facing;
    let imageSource = `images/characters/player/player-${facingDirection}.png`;

    drawCanvasTile(targetId, imageSource);
}

function movePlayer(direction) {
    let player = globalGame.player;
    let initialX = player.xpos;
    let initialY = player.ypos;
    let currentRoom = globalGame.player.currentRoom;
    let mapSize = globalGame.world.rooms[currentRoom].size;
    let offsetX = globalGame.world.rooms[currentRoom].connections[direction].offsetx;
    let offsetY = globalGame.world.rooms[currentRoom].connections[direction].offsety;
    let maxCoordinate = mapSize - 1;

    switch (direction) {
        case "up":
            player.ypos -= 1;
            player.facing = "north";
            break;
        case "right":
            player.xpos += 1;
            player.facing = "east";
            break;
        case "down":
            player.ypos += 1;
            player.facing = "south";
            break;
        case "left":
            player.xpos -= 1;
            player.facing = "west";
            break;
    }

    if (player.ypos < 0) {
        moveRoom("up");
        player.ypos = maxCoordinate;
        adjustPosForOffset(offsetX, offsetY);
    }
    else if (player.xpos > maxCoordinate) {
        moveRoom("right");
        player.xpos = 0;
        adjustPosForOffset(offsetX, offsetY);
    }
    else if (player.ypos > maxCoordinate) {
        moveRoom("down");
        player.ypos = 0;
        adjustPosForOffset(offsetX, offsetY);
    } 
    else if (player.xpos < 0) {
        moveRoom("left");
        player.xpos = maxCoordinate;
        adjustPosForOffset(offsetX, offsetY);
    } 
    else if (checkCollision(player.xpos, player.ypos) == true) {
        player.xpos = initialX;
        player.ypos = initialY;
    }    

    console.log(player.xpos, player.ypos);
}

function adjustPosForOffset(offsetX, offsetY) {
    let player = globalGame.player;

    player.xpos += offsetX;
    player.ypos += offsetY;
}

function moveRoom(direction) {
    let currentRoom = globalGame.player.currentRoom;
    let connectionState = globalGame.world.rooms[currentRoom].connections[direction].warp;

    if (connectionState != "none") {
        globalGame.player.currentRoom = connectionState;
    }
}

function checkCollision(playerX, playerY) {
    let currentRoom = globalGame.player.currentRoom;
    let mapSize = globalGame.world.rooms[currentRoom].size;
    let targetId = (playerY * mapSize) + playerX;
    let targetTile = globalGame.world.rooms[currentRoom].tiles[targetId];
    let targetCollision = globalGame.world.tiles[targetTile].collision;

    return targetCollision == "yes";
}

function drawMap() {
    let currentRoom = globalGame.player.currentRoom;
    let mapSize = globalGame.world.rooms[currentRoom].size;
    let gridSize = mapSize ** 2;
    let tileId = 0;

    for (let i = 0; i < gridSize; i++) {
        tileId = globalGame.world.rooms[currentRoom].tiles[i];
        let imageSource = `images/tiles/${tileId}.png`;
        drawCanvasTile(i, imageSource);
    }
}