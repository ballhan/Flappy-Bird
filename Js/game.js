var myBird;
var pillarArray = [];
var myScore = 0;
var pillarCount = 0;
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
const canvasHeight = canvas.height = 0.8 * window.innerHeight;
const canvasWidth = canvas.width = 0.5 * canvasHeight;
const birdWidth = 0.06 * canvasHeight;
const birdHeight = birdWidth;
const birdColor = "#FF0000";
const pillarWidth = 1.3 * birdWidth;
const pillarGapX = 2/3 * canvasWidth;
const pillarGapY = 5 * birdWidth;
const pillarColor = "#0B6623";

function startGame() {
    myBird = new bird();
    pillarArray.push(new pillar(myBird));
    myGameArea.start();
}

var myGameArea = {
    startScreen : function() {

    },
    endScreen : function() {

    },
    start : function() {
        updateGameArea();
    },
    clear : function() {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function bird() {
    this.bodyWidth = birdWidth;
    this.bodyHeight = birdHeight;
    this.bodyColor = birdColor;  
    //spawn X,Y
    this.x = 0.1 * canvasWidth;
    this.y = 0.3 * canvasHeight;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.draw = function() {
        c.fillStyle = this.bodyColor;
        c.fillRect(this.x, this.y, this.bodyWidth, this.bodyHeight);
    }
    this.move = function() {
        var buttomMargin = canvasHeight - birdHeight;
        var topMargin = 0; 
        this.gravitySpeed += this.gravity;
        this.y += this.gravitySpeed;
        if (this.y >= buttomMargin) {
            this.y = buttomMargin;
            this.gravitySpeed = 0;
        }
        if (this.y <= topMargin) {
            this.y = topMargin;
            this.gravitySpeed = 0.05;
        }
    }
    this.update = function() {
        this.draw();
        this.move();
    }
}

function pillar(bird) {
    this.speedX = 1 / 500 * canvasWidth;
    this.bodyColor = pillarColor;  
    this.x = canvasWidth;
    this.y = 0;
    this.y2Buttom = canvasHeight;
    this.bodyWidth = pillarWidth;
    this.bodyHeightTop = Math.random() * canvasHeight * 2 / 3;
    this.bodyHeightButtom = this.bodyHeightTop + pillarGapY;
    this.draw = function() {
        c.fillStyle = this.bodyColor;
        //top pillar
        c.fillRect(this.x, this.y, this.bodyWidth, this.bodyHeightTop);
        //buttom
        c.fillRect(this.x, this.bodyHeightButtom, this.bodyWidth, this.y2Buttom);
    }
    this.move = function() {
        this.x -= this.speedX;
    }
    this.crash = function() {
        var x1 = bird.x;
        var x2 = bird.x + bird.bodyWidth;
        var y1 = bird.y;
        var y2 = bird.y + bird.bodyHeight;
        var topPillarX1 = buttomPillarX1 = this.x;
        var topPillarX2 = buttomPillarX2 = this.x + this.bodyWidth;
        var topPillarY1 = this.y;
        var topPillarY2 = this.bodyHeightTop;
        var buttomPillarY1 = this.bodyHeightButtom;
        var buttomPillarY2 = this.y2Buttom;
        if ((topPillarX1 < x2 && topPillarX2 > x1 && topPillarY1 < y2 && topPillarY2 > y1) || (buttomPillarX1 < x2 && buttomPillarX2 > x1 && buttomPillarY1 < y2 && buttomPillarY2 > y1)) {
            document.location.reload();
        }
    }
    this.update = function() {
        this.draw();
        this.move();
        this.crash();
    }
}

function drawScore() {
    c.font = "16px Arial";
    c.fillStyle = "#000000";
    c.fillText("Score: " + myScore, 8, 20);
}

function pillarUpdate(pillarArray) {
    for (var i = 0; i < pillarArray.length; i++) {
        pillarArray[i].update();
        //remove pillar 
        if (pillarArray[i].x <= 0 - pillarWidth) {
            pillarArray.splice(i, 1);
            myScore ++;
            pillarCount --;
        }
        //pushing new pillars
        if (pillarArray[pillarCount].x < canvasWidth - pillarGapX) {
            pillarCount ++;
            pillarArray.push(new pillar(myBird));
        }
    }
}

function updateGameArea() {
    myGameArea.clear();  
    drawScore();
    myBird.update();
    pillarUpdate(pillarArray);
    requestAnimationFrame(updateGameArea);
}

function fly() {
    myBird.y -= birdHeight;
    myBird.gravitySpeed = 0;
}
