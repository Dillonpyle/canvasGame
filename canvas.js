console.log('working');

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasOffset = $("#canvas").offset();
let centerCanvasX = canvas.width / 2;
let centerCanvasY = canvas.height / 2;

let playerConstructor = class {
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
        buildingArry.push(this);
    }
}

let gameArry = []
let npcArry = []
let buildingArry = []

let player = new playerConstructor("player", "hello im the player", "", "", 0, 0, 20, 20);
const metis = new npcConstructor("Metis", "Hello im an Metis, here is a key to the house", "key", 0, 100, 250, 20, 20);
const house1 = new buildingConstructor("house", "door is locked", 0, 0, 600, 600, 80, 40);
const doorHouse1 = new buildingConstructor("door", "door is locked", false, 0, 640, 620, 20, 20);


// const getDistanceBetweenEntity = (entity1, entity2) => {
//     let vx = entity1.x - entity2.x;
//     let vx = entity1.x - entity2.x;
//     return Math.sqrt(vx * vx + vy * vy);
// }

// const testDistanceEntity = (entity1, entity2) => {
//     let distance = getDistanceBetweenEntity(entity1, entity2);
//     return distance < 10;
//}

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
    for (let i = 0; i < buildingArry.length; i++) {
        let node = buildingArry[i];
        context.rect(node.x, node.y, node.width, node.height);
        context.stroke();
    }


    context.restore();
}
drawMainMap();

function drawHouseMap() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    context.rect(player.x, player.y, player.width, player.height);
    context.stroke();

    context.restore();
}




const updatePlayerCenter = () => {
    player.centerPointX = player.x + player.xObjectCenter;
    player.centerPointY = player.y + player.yObjectCenter;

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

    //talk to metis within a certain distance
    if (player.centerPointX - metis.centerPointX < 30 &&
        player.centerPointX - metis.centerPointX > -30 &&
        player.centerPointY - metis.centerPointY < 30 &&
        player.centerPointY - metis.centerPointY > -30 &&
        e.keyCode == 32) {
        alert(metis.greeting);
        player.item1 = "key"
    }

    //-----------------unlock the home----------------------
    //tell you house is locked if you dont have a key unlocks if you do from a distance
    if (player.centerPointX - doorHouse1.centerPointX < 30 &&
        player.centerPointX - doorHouse1.centerPointX > -30 &&
        player.centerPointY - doorHouse1.centerPointY < 30 &&
        player.centerPointY - doorHouse1.centerPointY > -30 &&
        e.keyCode == 32) {
        if (player.item1 === "key") {
            alert("the key unlocked the house");
            doorHouse1.item1 = true;
        } else {
            alert(doorHouse1.greeting);
        }
    }

    updatePlayerCenter();
    canvas.width = canvas.width;
    //----------------enter the house--------------------------------
    if (doorHouse1.item1 == false) {
        drawMainMap();
    } else {
        drawHouseMap();
    }
}


//document.onkeydown = talkToMatis;
document.onkeydown = move;