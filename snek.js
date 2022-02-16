const sizeX = 20;
const sizeY = 20;
const multiplier = 30;
var fps = 7;
var cheats = false;
var playField = new Array(sizeY);
var playFieldAges = new Array(sizeY);
var startPosX = Math.round((Math.random() * Math.round(sizeX - 10) + 5));
var startPosY = Math.round((Math.random() * Math.round(sizeY - 10) + 5));
var headX = startPosX;
var headY = startPosY;
var snakeLength = 3;
var nextPosX, direction = Math.round(Math.random() * 4);
//var nextPosY = headY;
var frame = 0;
var started = false;
var alive = true;
var intervalID;
var inputstack = [];
var inputs = 0;
var paused = false;
var ag = false;
var codeComp = Math.random();;
var framesSinceLastApple=0,admin = false;admin2 = false;admin3 = false;highscore = getCookie('highscore'), newHS = false, aCID = setInterval(antiCheat, 100), chain = 0, color = new Array(3), rgb = getCookie('rgb'), rgbSeed = Math.round(Math.random() * 100000000);
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
                        else if (!paused) fill('white');
                        else {
                            fill('blue');
                            textSize(20);
                            text('Paused', sizeX * multiplier - 100, 50);
                        }
                        rect(i * multiplier, j * multiplier, multiplier - 1, multiplier - 1);
                    }
                    else if (playField[i][j] == 'Q') {
                        stroke('Chartreuse');
                        fill('Chartreuse');
                        ellipse((i * multiplier) + multiplier / 2, (j * multiplier) + multiplier / 2, multiplier - 1, multiplier - 1);
                    }
                    else if (playField[i][j] == 'o') {

                        if (rgb) {
                            stroke(toColor(playFieldAges[i][j]*10000 - (rgbSeed-254)));
                            fill(toColor(playFieldAges[i][j]*10000 - (rgbSeed-254)));
                        }
                        else {
                            stroke('CornFlowerBlue');
                            fill('CornFlowerBlue');
                        }
                        rect(i * multiplier, j * multiplier, multiplier - 1, multiplier - 1);
                        stroke('Aqua');
                        fill('Aqua');
                        rect(((i * multiplier) + ((multiplier - (multiplier - 1) / (snakeLength / playFieldAges[i][j])) / 2)) + 1, ((j * multiplier) + ((multiplier - (multiplier - 1) / (snakeLength / playFieldAges[i][j])) / 2)) + 1, ((multiplier - 1) / (snakeLength / playFieldAges[i][j])) - 3, ((multiplier - 1) / (snakeLength / playFieldAges[i][j])) - 3);
                        //text(playFieldAges[i][j],i*multiplier,j*multiplier);
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
    var highScoreString = "Highscore: " + highscore;
    text(highScoreString, 40, sizeY * multiplier - 40);
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
            started = true;;
            break;
        case 'KeyX':
            die();;
            break;
        case 'KeyZ':
            resetScores();
            break;
        case 'KeyY':
            resetScores();
            break;
        case 'KeyJ':
            resetScores();
            break;
        case 'KeyI':
            resetScores();
            break;
        case 'KeyK':
            setCookie('rgb', false, 14);
            rgb = false;
            break;
        case 'KeyL':
            setCookie('rgb', true, 14);
            rgb = true;
            break;
        case 'KeyG':
            if (paused) {
                paused = false;
                intervalID = setInterval(game, 1000 / fps);
            }
            else {
                paused = true;
                clearInterval(intervalID);
            }
            if (chain == 3) {
                admin = true;
                admin2 = false;
                
            }
            break;
        case 'KeyU':
            cheats = true;
            console.log("cheats activated!");
            if (chain == 0) chain++;
            break;
        case 'KeyM':
            if (cheats) game();
            else console.log("cheats are disabled");
            break;
        case 'KeyV':
            if (cheats) {
                ag = true;
                genApple(false);
            }
            else console.log("cheats are disabled");
            break;
        case 'KeyE':
            if (chain == 1) chain++;
            break;
        case 'KeyQ':
            if (chain == 2) chain++;
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
function setCookie(cname, cvalue, exdays) //function found on the internet. Source: https://www.w3schools.com/js/js_cookies.asp
{
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function a1597(){
    if(admin&&!admin2){
        admin3 = true;
        console.clear();
        console.log("#---------------------------#");
        console.log("|Entered Administrator mode!|");
        console.log("#---------------------------#");
    }
    
}
function getCookie(cname) //function found on the internet. Source: https://www.w3schools.com/js/js_cookies.asp
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function toColor(num) //function found on the internet. Source: https://stackoverflow.com/questions/11866781/how-do-i-convert-an-integer-to-a-javascript-color/11866980
{
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ((num & 0xFF000000) >>> 24) / 255;
    return "rgba(" + [r, g, b, a].join(",") + ")";
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
    if (ag) {
        var appleX = Math.round((Math.random() * Math.round(sizeX - 2) + 1));
        var appleY = Math.round((Math.random() * Math.round(sizeY - 2) + 1));
        while (playField[appleX][appleY] != ' ' || (firstTime && appleX == startPosX && appleY == startPosY)) {
            appleX = Math.round((Math.random() * Math.round(sizeX - 2) + 1));
            appleY = Math.round((Math.random() * Math.round(sizeY - 2) + 1));
        }
        playField[appleX][appleY] = 'Q';
    }
    ag = false;
}
function pickUpApple(code) {
    if (code == codeComp) {
        snakeLength++;
        ag = true;
        genApple(false);
        framesSinceLastApple=0;
    }
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
function die() {
    console.log("U died! L! HAHA NOOB!");
    alive = false;
    clearInterval(intervalID);
    if (!newHS) alert("You died!\nScore: " + (snakeLength - 3));
    else alert("You scored a new Highscore!\nYou died!\nScore: " + (snakeLength - 3));
    resetGame();
}
function resetScores() {
    setCookie('highscore', 0, 14);
    snakeLength = 3;
    highscore = 0;
}
function antiCheat() {
    if (!cheats&&!admin3) {
        if (highscore != getCookie('highscore') - 1 && highscore != getCookie('highscore') + 1 && highscore != getCookie('highscore')) resetScores();
        if(!admin||!admin2)admin3 = false;
    }
    if(admin!=admin2){
        admin = false;
        admin2 = false;
    }
    if(((!cheats)&&countApples()>2)){
        resetGame();
        resetScores();
    }
    if((!cheats)&&(headX>nextPosX+1||headX<nextPosX-1||headY>nextPosY+1||headY<nextPosY-1)){
        resetGame();
        resetScores();
    }
    if(!cheats&&!analyseAge()){
        resetGame();
        resetScores();
    }
}
function countApples(){
    var counter = 0;
    for (var i = 0; i < sizeY; i++) {
        for (var j = 0; j < sizeX; j++) {
            if(playField[i][j] == 'Q'){
                counter++;
            }
        }
    }
    return counter;
}
function newHighScore() {
    if (!cheats||admin3) {
        newHS = true;
        highscore = snakeLength - 3;
        setCookie('highscore', highscore, 14);
    }
}
function game(canDie) {
    frame++;
    framesSinceLastApple++;
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
        //drawScreen();
        console.log("score: " + (snakeLength - 3));
        playField[headX][headY] = 'o';

        move();
        snakeMagic();
        if (playField[nextPosX][nextPosY] != ' ' && playField[nextPosX][nextPosY] != 'Q' && alive&&canDie) {
            die();
        } else if (playField[nextPosX][nextPosY] == 'Q') {
            var buff = Math.random();
            codeComp = buff;
            pickUpApple(buff);
            headY = nextPosY;
            headX = nextPosX;
        }
        else if(!canDie&&playField[nextPosX][nextPosY] != ' ' && playField[nextPosX][nextPosY] != 'Q' && alive){
            resetGame();
        }
        else {
            headY = nextPosY;
            headX = nextPosX;
        }
        if (snakeLength - 3 > highscore) {
            newHighScore();
        }
        antiCheat();
    }

}
function drawScreen() {
    console.clear();
    for (var i = 0; i < sizeY; i++) {
        var buffer = "";
        for (var j = 0; j < sizeX; j++) {
            buffer += " " + playFieldAges[j][i];
        }
        console.log(buffer);
    }
}
function resetGame() {

    playField = new Array(sizeY);
    playFieldAges = new Array(sizeY);
    rgbSeed = Math.round(Math.random() * 100000000);
    snakeLength = 3;
    direction = Math.round(Math.random() * 4);
    frame = 0;
    alive = true;
    startPosX = Math.round((Math.random() * Math.round(sizeX - 10) + 5));
    startPosY = Math.round((Math.random() * Math.round(sizeY - 10) + 5));
    headX = startPosX;
    headY = startPosY;
    inputstack = [];
    inputs = 0;
    newHS = false;
    initPlayField();
    ag = true;
    genApple(true);
    console.clear();
    started = true;
    game(false);
    game(false);
    started = false;
    drawScreen();
    clearInterval(intervalID);
    intervalID = setInterval(game, 1000 / fps);
}
function analyseAge(){
    //do fancy algorythm stuff, to check if the age array makes sense
    var smallestValue = sizeX*sizeY;
    for (var i = 1; i < sizeY-1; i++) {
        for (var j = 1; j < sizeX-1; j++) {
            if(playFieldAges[i][j]!=0&&playFieldAges[i][j]<smallestValue)smallestValue=playFieldAges[i][j];
        }
    }
    for (var i = 1; i < sizeY-1; i++) {
        for (var j = 1; j < sizeX-1; j++) {
            var valid = true;
            if(playFieldAges[i][j]!=0&&started==true&&frame>10){
                //check for smaller value
                if((playFieldAges[i][j]>smallestValue)&&(playFieldAges[i-1][j]!=playFieldAges[i][j]-1)&&(playFieldAges[i+1][j]!=playFieldAges[i][j]-1)&&(playFieldAges[i][j-1]!=playFieldAges[i][j]-1)&&(playFieldAges[i][j+1]!=playFieldAges[i][j]-1))valid = false;
                //check for bigger value
                if((playFieldAges[i][j]!=snakeLength)&&(playFieldAges[i-1][j]!=playFieldAges[i][j]+1)&&(playFieldAges[i+1][j]!=playFieldAges[i][j]+1)&&(playFieldAges[i][j-1]!=playFieldAges[i][j]+1)&&(playFieldAges[i][j+1]!=playFieldAges[i][j]+1))valid = false;
                if(!valid&&framesSinceLastApple<snakeLength+1)valid = true;
            }
            if(!valid)return false;
        }
    }
    return true;
}
initPlayField();
ag = true;
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
