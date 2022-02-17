var playField = new Array()
const sizeX = 20;
const sizeY = 20;
function initPlayField() {
    for (var i = 0; i < sizeY; i++) {
        playField[i] = new Array(sizeX);
        for (var j = 0; j < sizeX; j++) {
            if (i == 0 || i == sizeY - 1 || j == 0 || j == sizeX - 1) playField[i][j] = sizeX*sizeY;
            else playField[i][j] = 0;
        }
    }
}
function drawScreen() {
    console.clear();
    for (var i = 0; i < sizeY; i++) {
        var buffer = "";
        for (var j = 0; j < sizeX; j++) {
            if(playField[j][i]!=sizeX*sizeY)buffer += " " + playField[j][i];
            else buffer+=" #"
        }
        console.log(buffer);
    }
}
console.clear();
initPlayField();
drawScreen();