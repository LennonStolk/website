function generateGrid(tlc, trc, blc, brc) {
    for (y = 0; y < 8; y++) {
        for (x = 0; x < 8; x++) {
            var topHoriAvg = averageOf(7 - x, 0 + x, tlc, trc);
            var botHoriAvg = averageOf(7 - x, 0 + x, blc, brc);
            var color = averageOf(7 - y, 0 + y, topHoriAvg, botHoriAvg);
            color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            var id = (y * 8) + x;
            changeColor(color, x, y, id);
        }
    }
}

function averageOf(amountA, amountB, a, b) {
    var redValue = Math.round((a[0] * amountA / 7) + (b[0] * amountB / 7));
    var blueValue = Math.round((a[1] * amountA / 7) + (b[1] * amountB / 7));
    var greenValue = Math.round((a[2] * amountA / 7) + (b[2] * amountB / 7));
    return [redValue, blueValue, greenValue];
}

function changeColor(color, xpos, ypos, id) {
    var input = "changeColor";
    var httpr = new XMLHttpRequest();
    httpr.open("POST", "interactDB.php", true);
    httpr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpr.onreadystatechange = function() {
        if (httpr.readyState == 4 && httpr.status == 200) {
            console.log(httpr.responseText);
            init();
        }
    }
    httpr.send("input=" + input + "&color=" + color + "&xpos=" + xpos + "&ypos=" + ypos + "&id=" + id);
}

function clickBlock(index) {
    var xpos = index % 8;
    var ypos = Math.floor(index / 8);
    console.log(xpos, ypos);
    changeColor(getRandomColor(), xpos, ypos, index);
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function convertToJason(response) {
    return response.json();
}

function processData(data) {
    console.log(data);
    document.getElementById("gridContainer").innerHTML = "";
    for (i = 0; i < data.length; i++) {
        document.getElementById("gridContainer").innerHTML += `<div class="block" id="${i}" style="background-color: ${data[i]["kleur"]};" onClick="clickBlock(${i});"><div>`;
    }
}

function init() {
    fetch("fetchDB.php").then(convertToJason).then(processData);
}

function hexToRGB(h) {
    var r = "0x" + h[1] + h[2];
    var g = "0x" + h[3] + h[4];
    var b = "0x" + h[5] + h[6];
    return [parseInt(r), parseInt(g), parseInt(b)];
}

function submitGrid() {
    var tlc = hexToRGB(document.getElementById("color1").value);
    var trc = hexToRGB(document.getElementById("color2").value);
    var blc = hexToRGB(document.getElementById("color3").value);
    var brc = hexToRGB(document.getElementById("color4").value);
    generateGrid(tlc, trc, blc, brc);
}

init();