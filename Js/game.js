//global varible
var myBird;
var myPillar = [];
var score = 0;
const playerBodyWidth = 30;
const playerBodyHeight = 30;
const playerBodyColor = "#FF0000";
const playerSpawnX = 235;
const playerSpawnY = 0;
const pillarWidth = 20;
const pillarColor = "#FFD700";

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 1);
        myBird = new bird();
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function bird() { 
    this.bodyWidth = playerBodyWidth;
    this.bodyHeight = playerBodyHeight;
    this.bodyColor = playerBodyColor;
    this.x = playerSpawnX;
    this.y = playerSpawnY;    
    this.gravity = 0;
    this.gravitySpeed = 0;    
    //keyboard control
    this.fly = function() {
        this.gravitySpeed += this.gravity;
        this.y += this.gravitySpeed;
    }
    this.drawBird = function() { 
    	ctx = myGameArea.context;    
        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.x, this.y, this.bodyWidth, this.bodyHeight);
    }
    this.update = function() {
        this.fly();
        this.drawBird();
    }
}

function pillar(bird) {
    this.bodyWidth = 10;
    this.bodyHeight = 10;
    this.bodyColor;
    this.speedX = 1;
    this.x = Math.random() * 250;
    this.y = Math.random() * 200;
    
    this.drawPillar = function() {
    	ctx = myGameArea.context;
        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.x, this.y, this.bodyWidth, this.bodyHeight);
    }
    this.move = function() {
        this.x -= this.speedX;
    }
    this.checkWin = function() {
        //silentmatt.com/intersection.html 
        upperX1 = this.x;
        upperX2 = this.x + this.bodyWidth;
        upperY1 = this.y;
        upperY2 = this.y + this.bodyHeight;
        birdX1 = bird.x;
        birdX2 = bird.x + bird.bodyWidth;
        birdY1 = bird.y;
        birdY2 = bird.y + bird.bodyHeight;
        if (enemyX1 < birdX2 && enemyX2 > birdX1 && enemyY1 < birdY2 && enemyY2 > birdY1) {
            document.location.reload();
        }
    }
    this.update = function() {
        this.drawPillar();
        this.move();
        this.checkWin();
    }
}

function pillarUpdate(pillarArray, bird) {
    for (i = 0; i < pillarArray.length; i++) {
        enemyArray[i].update();
        //score + 1 if
        if (pillarArray[i].x2 < bird.x) {
            score ++;
        }
                    
        if (pillarArray[i].x < 0) {
            pillarArray.splice(i, 1);
            myPillar.push(new pillar(myBird));
        }
    }
}

function drawScore() {
    ctx = myGameArea.context;
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, 8, 20);
}

function accelerate(n) {
    myBird.gravity = n;
    console.log(n);
}

function updateGameArea() {
    myGameArea.clear();  
    //drawScore();
    myBird.update();
    //pillarUpdate(myBird);
}