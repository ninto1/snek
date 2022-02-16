const sizeX = 20;
const sizeY = 20;
const multiplier = 30;
var fps = 0.2;
var cheats = false;
var playField = new Array(sizeY);
var playFieldAges = new Array(sizeY);
var startPosX = Math.round((Math.random() * Math.round(sizeX - 6) + 3));
var startPosY = Math.round((Math.random() * Math.round(sizeY - 6) + 3));
var headX = startPosX;
var headY = startPosY;
var snakeLength = 3;
var nextPosX, direction = 2, nextPosY;
var frame = 0;
var started = false;
var alive = true;
var intervalID;
var inputstack = [];
var inputs = 0;
function setup() {
    createCanvas(sizeX * multiplier, sizeY * multiplier);
}
function draw() {
    clear();

    if (alive) {
        for (var i = 0; i < sizeY; i++) {
            for (var j = 0; j < sizeX; j++) {
                if (playField[i][j] != ' ' || (i == nextPosX && j == nextPosY)) {
                    if (playField[i][j] == '#') {
                        stroke('black');
                        if (cheats) {
                            fill('red');
                            textSize(20);
                            text('Cheats activated', sizeX * multiplier - 200, 50);
                        }
                        else fill('white');
                        rect(i * multiplier, j * multiplier, multiplier - 1, multiplier - 1);
                    }
                    else if (playField[i][j] == 'Q') {
                        stroke('Chartreuse');
                        fill('Chartreuse');
                        ellipse((i * multiplier) + multiplier / 2, (j * multiplier) + multiplier / 2, multiplier - 1, multiplier - 1);
                    }
                    else if (playField[i][j] == 'o') {

                        stroke('CornFlowerBlue');
                        fill('CornFlowerBlue');
                        rect(i * multiplier, j * multiplier, multiplier - 1, multiplier - 1);
                        stroke('Aqua');
                        fill('Aqua');
                        rect(((i * multiplier) + ((multiplier - (multiplier - 1) / (snakeLength / playFieldAges[i][j])) / 2)) + 1, ((j * multiplier) + ((multiplier - (multiplier - 1) / (snakeLength / playFieldAges[i][j])) / 2)) + 1, ((multiplier - 1) / (snakeLength / playFieldAges[i][j])) - 3, ((multiplier - 1) / (snakeLength / playFieldAges[i][j])) - 3);
                    }
                    if (i == nextPosX && j == nextPosY) {
                        stroke('blue');
                        fill('blue');
                        rect(i * multiplier, j * multiplier, multiplier - 1, multiplier - 1);
                    }

                }
            }
        }
    }
    else {
        line(0, 0, sizeX * multiplier, sizeY * multiplier);
        line(0, sizeY * multiplier, sizeX * multiplier, 0);
    }
    fill('red');
    textSize(15);
    //textSize(150);
    text('Creator: Ninto', sizeX * multiplier - 130, sizeY * multiplier - 40);
    //text('Creator:\n Ninto', 0, (sizeY * multiplier)/2);
    fill('Maroon');
    var scoreString = "Score: " + (snakeLength - 3);
    text(scoreString, 40, 50);
}
document.addEventListener('keydown', logKey);
function logKey(e) {
    switch (e.code) {
        case 'KeyA':
            inputstack.push(2);
            started = true;
            break;
        case 'KeyS':
            inputstack.push(1);
            started = true;
            break;
        case 'KeyD':
            inputstack.push(0);
            started = true;
            break;
        case 'KeyW':
            inputstack.push(3);
            started = true;
            break;
        case 'KeyX':
            die();
            break;
        case 'KeyU':
            cheats = true;
            console.log("cheats activated!");
            break;
        case 'KeyM':
            if (cheats) game();
            else console.log("cheats are disabled");
            break;
        case 'KeyV':
            if (cheats) genApple(false);
            else console.log("cheats are disabled");
            break;
        case 'KeyB':
            if (cheats) snakeLength++;
            else console.log("cheats are disabled");
            break;
        case 'KeyO':
            if (cheats) {
                fps--;
                clearInterval(intervalID);
                intervalID = setInterval(game, 1000 / fps);
            }
            else console.log("cheats are disabled");
            break;
        case 'KeyP':
            if (cheats) {
                fps++;
                clearInterval(intervalID);
                intervalID = setInterval(game, 1000 / fps);
            }
            else console.log("cheats are disabled");
            break;
        default:
            break;
    }
}

function initPlayField() {
    for (var i = 0; i < sizeY; i++) {
        playField[i] = new Array(sizeX);
        for (var j = 0; j < sizeX; j++) {
            if (i == 0 || i == sizeY - 1 || j == 0 || j == sizeX - 1) playField[i][j] = '#';
            else playField[i][j] = ' ';
        }
    }
    for (var i = 0; i < sizeY; i++) {
        playFieldAges[i] = new Array(sizeX);
        for (var j = 0; j < sizeX; j++) {
            playFieldAges[i][j] = 0;
        }
    }
}
function genApple(firstTime) {
    var appleX = Math.round((Math.random() * Math.round(sizeX - 2) + 1));
    var appleY = Math.round((Math.random() * Math.round(sizeY - 2) + 1));
    while (playField[appleX][appleY] != ' ' || (firstTime && appleX == startPosX && appleY == startPosY)) {
        appleX = Math.round((Math.random() * Math.round(sizeX - 2) + 1));
        appleY = Math.round((Math.random() * Math.round(sizeY - 2) + 1));
    }
    playField[appleX][appleY] = 'Q';
}
function pickUpApple() {
    snakeLength++;
    genApple(false);
}
function move() {
    nextPosX = headX;
    nextPosY = headY;
    if (inputstack.length != inputs) {
        if (direction - inputstack[inputs] != 2 && direction - inputstack[inputs] != -2) direction = inputstack[inputs];
        inputs++;
    }
    switch (direction) {
        case 0:
            nextPosX++;
            break;
        case 1:
            nextPosY++;
            break;
        case 2:
            nextPosX--;
            break;
        case 3:
            nextPosY--;
            break;
    }
}
function snakeMagic() {
    for (var i = 0; i < sizeY; i++) {
        for (var j = 0; j < sizeX; j++) {
            if (playFieldAges[i][j] != 0) {
                playFieldAges[i][j]--;
                if (playFieldAges[i][j] == 0) {
                    playField[i][j] = ' ';
                }
            }
        }
    }
    playFieldAges[headX][headY] = snakeLength;
}
function randomiseStartPos() {

}
function die() {
    console.log("U died! L! HAHA NOOB!");
    alive = false;
    clearInterval(intervalID);
    alert("You died!\nScore: " + (snakeLength - 3));
    resetGame();
}
function game() {
    frame++;
    switch (direction) {
        case 0:
            playField[headX][headY] = '>';
            break;
        case 1:
            playField[headX][headY] = 'v';
            break;
        case 2:
            playField[headX][headY] = '<';
            break;
        case 3:
            playField[headX][headY] = '^';
            break;

    }

    if (started) {
        drawScreen();
        console.log("score: " + (snakeLength - 3));
        playField[headX][headY] = 'o';

        move();
        snakeMagic();
        if (playField[nextPosX][nextPosY] != ' ' && playField[nextPosX][nextPosY] != 'Q' && alive) {
            die();
        } else if (playField[nextPosX][nextPosY] == 'Q') {
            pickUpApple();
            headY = nextPosY;
            headX = nextPosX;
        }
        else {
            headY = nextPosY;
            headX = nextPosX;
        }
    }

}
function drawScreen() {
    console.clear();
    for (var i = 0; i < sizeY; i++) {
        var buffer = "";
        for (var j = 0; j < sizeX; j++) {
            buffer += " " + playField[j][i];
        }
        console.log(buffer);
    }
}
function resetGame() {

    playField = new Array(sizeY);
    playFieldAges = new Array(sizeY);


    snakeLength = 3;
    direction = 2;
    frame = 0;
    alive = true;
    startPosX = Math.round((Math.random() * Math.round(sizeX - 9) + 5));
    startPosY = Math.round((Math.random() * Math.round(sizeY - 9) + 5));
    headX = startPosX;
    headY = startPosY;
    inputstack = [];
    inputs = 0;
    initPlayField();
    genApple(true);
    console.clear();
    started = true;
    game();
    game();
    started = false;
    drawScreen();
    intervalID = setInterval(game, 1000 / fps);
}
initPlayField();
genApple(true);
switch (direction) {
    case 0:
        playField[headX][headY] = '>';
        break;
    case 1:
        playField[headX][headY] = 'v';
        break;
    case 2:
        playField[headX][headY] = '<';
        break;
    case 3:
        playField[headX][headY] = '^';
        break;

}
resetGame();
