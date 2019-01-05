console.log('working');

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasOffset = $("#canvas").offset();
let centerCanvasX = canvas.width / 2;
let centerCanvasY = canvas.height / 2;

let gameObjects = class {
    constructor(name, greeting, item1, item2, x, y, width, height) {
        this.name = name;
        this.greeting = greeting;
        this.item1 = item1;
        this.item2 = item2;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.centerPoint = [this.width / 2 + this.x, this.height / 2 + this.y]
        this.xCenter = this.height / 2 + this.x
        this.yCenter = this.height / 2 + this.y
        gameArry.push(this);
    }
}

let gameArry = []

let player = new gameObjects("player", "hello im the player", "", "", 0, 0, 20, 20);
const NPC = new gameObjects("Metis", "Hello im an Metis", "key", 0, 100, 250, 20, 20);
const house = new gameObjects("house", "door is locked", 0, 0, 600, 600, 70, 40);

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
const checkDistance = () => {
    console.log('works');
}

function drawObjects() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    for (let i = 0; i < gameArry.length; i++) {
        let node = gameArry[i];
        context.rect(node.x, node.y, node.width, node.height);


        context.stroke();
    }

    context.restore();
}

drawObjects()



const activate = () => {
    // if (player.xCenter == NPC.xCenter && player.yCenter == NPC.yCenter && e.keyCode == 32) {
    //     alert('NPC gave you a key');
    // }

    if (gameArry[0].x == gameArry[1].x && gameArry[0].y == gameArry[1].y && e.keyCode == 32) {
        alert('NPC gave you a key');
        player.item1 = "key"
    }
}

//------------------------------------


function move(e) {
    console.log(e.keyCode);

    //move right     
    if (e.keyCode == 39 && gameArry[0].x < 780) {
        gameArry[0].x += 5;
    }
    //move left
    if (e.keyCode == 37 && gameArry[0].x > 0) {
        gameArry[0].x -= 5;
    }
    //movedown
    if (e.keyCode == 40 && gameArry[0].y < 780) {
        gameArry[0].y += 5;
    }
    //moveup
    if (e.keyCode == 38 && gameArry[0].y > 0) {
        gameArry[0].y -= 5;
    }
    //want to call function in here
    //activate();
    if (gameArry[0].x == gameArry[1].x && gameArry[0].y == gameArry[1].y && e.keyCode == 32) {
        alert('NPC gave you a key');
    }


    canvas.width = canvas.width;
    drawObjects();

}

document.onkeydown = move;