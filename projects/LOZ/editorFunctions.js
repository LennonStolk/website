let editorData = {
    selectedTile: "",
    mouseX: 0,
    mouseY: 0
}

function initTilePanel() {
    let panel = document.createElement("div");
    panel.classList.add("tilePanel");
    document.querySelector("body").appendChild(panel);

    let index = 0;
    for (let tile in gameData.world.tiles) {
        let image = document.createElement("img");
        image.src = `images/tiles/${tile}.png`;
        image.style.width = "50px";
        image.style.height = "50px";
        image.style.filter = "brightness(80%)";
        image.classList.add("tile");
        image.id = tile;
        image.setAttribute("onclick", `highlightTile(this.id)`);

        panel.appendChild(image);
        
        index++;
    }
}

function initEventListeners() {
    let interval;
    canvas.addEventListener('mousedown', (e) => {
        interval = setInterval(editTile, 5);
    });
    canvas.addEventListener('mouseup', (e) => {
        clearInterval(interval);
    });
    canvas.addEventListener("mousemove", function(e) { 
        let cRect = canvas.getBoundingClientRect();
        let canvasX = Math.round(e.clientX - cRect.left);  
        let canvasY = Math.round(e.clientY - cRect.top);   

        editorData.mouseX = canvasX;
        editorData.mouseY = canvasY;
    });
}

function editTile() {
    let tile = editorData.selectedTile;
    let currentRoom = gameData.player.currentRoom;
    let roomSize = gameData.world.rooms[currentRoom].size;
    let mouseX = editorData.mouseX;
    let mouseY = editorData.mouseY;
    let tileSize = Math.floor(800 / roomSize)
    let tileX = Math.floor(mouseX / tileSize);
    let tileY = Math.floor(mouseY / tileSize);
    let tileID = (tileY * roomSize) + tileX;
    
    gameData.world.rooms[currentRoom].tiles[tileID] = tile;
}

function highlightTile(id) {
    let tiles = [].slice.call(document.getElementsByClassName("tile"));
    let tile = document.getElementById(id);
    tiles.forEach(tile => {
        tile.style.filter = "brightness(80%)";
    });
    tile.style.filter = "brightness(100%)";

    editorData.selectedTile = id;
}