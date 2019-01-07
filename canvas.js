console.log('working');
let canvas, context;
let canvasOffset = $("#canvas").offset();


let playerConstructor = class {
    constructor(id, greeting, item1, x, y, width, height) {
        this.id = id;
        this.greeting = greeting;
        this.item1 = item1;
        this.health = 100;
        this.sword = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xObjectCenter = this.width / 2
        this.yObjectCenter = this.height / 2
        this.centerPointX = this.x + this.xObjectCenter;
        this.centerPointY = this.y + this.yObjectCenter;
        gameArry.push(this);
    }
}

let npcConstructor = class {
    constructor(id, greeting, item1, item2, x, y, width, height) {
        this.id = id;
        this.greeting = greeting;
        this.item1 = item1;
        this.item2 = item2;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xObjectCenter = this.width / 2
        this.yObjectCenter = this.height / 2
        this.centerPointX = this.x + this.xObjectCenter;
        this.centerPointY = this.y + this.yObjectCenter;
        npcArry.push(this);
    }
}

let buildingConstructor = class {
    constructor(id, greeting, x, y, width, height) {
        this.id = id;
        this.greeting = greeting;
        this.unlocked = false;
        this.inside = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xObjectCenter = this.width / 2
        this.yObjectCenter = this.height / 2
        this.centerPointX = this.x + this.xObjectCenter;
        this.centerPointY = this.y + this.yObjectCenter;
        buildingArry.push(this);
    }
}

let enemyConstructor = class {
    constructor(id, greeting, health, x, y, width, height) {
        this.id = id;
        this.greeting = greeting;
        this.health = health;
        this.damage = 5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xObjectCenter = this.width / 2
        this.yObjectCenter = this.height / 2
        this.centerPointX = this.x + this.xObjectCenter;
        this.centerPointY = this.y + this.yObjectCenter;
        enemyArry.push(this);
    }
}

let gameArry = []
let npcArry = []
let buildingArry = []
let enemyArry = []


let player = new playerConstructor("player", "hello im the player", "", 0, 0, 20, 20);
const metis = new npcConstructor("Metis", "Hello im an Metis, here is a key to the house", "key", 0, 100, 250, 20, 20);
const house1 = new buildingConstructor("house", "door is locked", 600, 600, 80, 40);
const doorHouse1 = new buildingConstructor("door", "door is locked", 640, 620, 20, 20);
const chest1 = new buildingConstructor("chest1", "open chest", 340, 620, 20, 20);
const enemy1 = new enemyConstructor("enemy1", "prepare to die", 10, 340, 520, 20, 20);

canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

let framesPerSecond = 100;
window.onload = function () {
    setInterval(updateAll, 1000 / framesPerSecond);
}

function updateAll() {
    if (doorHouse1.unlocked == false) {
        drawMainMap();
    } else if (doorHouse1.inside == true) {
        drawHouseMap();
    }
}


//want to check the distance between player and enities
const checkDistance = () => {}

//draws from the constructor array 
function drawMainMap() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    for (let i = 0; i < gameArry.length; i++) {
        let node = gameArry[i];
        context.rect(node.x, node.y, node.width, node.height);
        context.stroke();
    }
    for (let i = 0; i < npcArry.length; i++) {
        let node = npcArry[i];
        context.rect(node.x, node.y, node.width, node.height);
        context.stroke();
    }

    context.rect(house1.x, house1.y, house1.width, house1.height);
    context.stroke();

    context.rect(doorHouse1.x, doorHouse1.y, doorHouse1.width, doorHouse1.height);
    context.stroke();

    context.restore();
}


//in first house
function drawHouseMap() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    context.rect(player.x, player.y, player.width, player.height);
    context.stroke();

    context.rect(chest1.x, chest1.y, chest1.width, chest1.height);
    context.stroke();


    context.restore();
}

const updatePlayerCenter = () => {
    player.centerPointX = player.x + player.xObjectCenter;
    player.centerPointY = player.y + player.yObjectCenter;
}

function talkToMatis(e) {
    if (player.centerPointX - metis.centerPointX < 30 &&
        player.centerPointX - metis.centerPointX > -30 &&
        player.centerPointY - metis.centerPointY < 30 &&
        player.centerPointY - metis.centerPointY > -30 &&
        e.keyCode == 32) {
        alert(metis.greeting);
        player.item1 = "key"
    }
}

function unlockHouse1(e) {
    if (player.centerPointX - doorHouse1.centerPointX < 30 &&
        player.centerPointX - doorHouse1.centerPointX > -30 &&
        player.centerPointY - doorHouse1.centerPointY < 30 &&
        player.centerPointY - doorHouse1.centerPointY > -30 &&
        e.keyCode == 32) {
        if (player.item1 === "key") {
            alert("the key unlocked the house");
            doorHouse1.unlocked = true;
        } else {
            alert(doorHouse1.greeting);
        }
    }
}

function enterHouse1(e) {

    if (player.centerPointX - doorHouse1.centerPointX < 30 &&
        player.centerPointX - doorHouse1.centerPointX > -30 &&
        player.centerPointY - doorHouse1.centerPointY < 30 &&
        player.centerPointY - doorHouse1.centerPointY > -30 &&
        doorHouse1.unlocked == true &&
        e.keyCode == 38) {
        doorHouse1.inside = true
    }
}

function recieveSword(e) {
    if (player.centerPointX - chest1.centerPointX < 30 &&
        player.centerPointX - chest1.centerPointX > -30 &&
        player.centerPointY - chest1.centerPointY < 30 &&
        player.centerPointY - chest1.centerPointY > -30 &&
        doorHouse1.unlocked == true &&
        e.keyCode == 32) {
        alert('you recieved a sword from the chest');
        player.sword = 2
    }
}

//------------------------------------

function move(e) {
    console.log(e.keyCode);

    //move right     
    if (e.keyCode == 39 && gameArry[0].x < 780) {
        gameArry[0].x += 10;
    }
    //move left
    if (e.keyCode == 37 && gameArry[0].x > 0) {
        gameArry[0].x -= 10;
    }
    //movedown
    if (e.keyCode == 40 && gameArry[0].y < 780) {
        gameArry[0].y += 10;
    }
    //moveup
    if (e.keyCode == 38 && gameArry[0].y > 0) {
        gameArry[0].y -= 10;
    }

    updatePlayerCenter();
    canvas.width = canvas.width;

    //------------enter house 1---------------------

}

function activate(e) {
    console.log("ACTIVATING" + e.keyCode)
    if (e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 40 || e.keyCode == 38) {
        console.log("MOVING")
        move(e);
        enterHouse1(e);
    }
    if (e.keyCode == 32) {
        console.log("TALKING/UNLOCKING/RECEIVING")
        talkToMatis(e);
        unlockHouse1(e);
        recieveSword(e);
    }
}


document.onkeydown = activate;