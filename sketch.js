var baloon, ballonImg;
var bg, bgImg;

var bottom, top;

var obsTop1Img, obsTop2Img;
var barImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var obsTopGroup;
var barGroup;

var reset, resetImg;

function preload() {
    ballonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    bgImg = loadImage("assets/bg.png");

    obsTop1Img = loadImage("assets/obsTop1.png");
    obsTop2Img = loadImage("assets/obsTop2.png");

    barImg = loadImage("assets/obsBottom2.png");

    resetImg = loadImage("assets/restart.png");
}

function setup() {
    createCanvas(1000, 400);

    obsTopGroup = new Group();
    barGroup = new Group();
    
    bg = createSprite(500, 200);
    bg.addImage(bgImg);

    baloon = createSprite(200, 150);
    baloon.addAnimation('ballon', ballonImg);
    baloon.scale = 0.22

    reset = createSprite(width/2, 250);
    reset.addImage(resetImg);
    reset.visible = false;
}

function draw() {
    background(0);

    if(gameState === PLAY) {
        baloon.velocityY += 1
        if(keyDown("space")) {
            baloon.velocityY = -10
        }

        spawnObstacleTop();
        spawnBar();

        if(obsTopGroup.isTouching(baloon)) {
            gameState = END
        }
        drawSprites();
    }
    else if(gameState === END) {
        obsTopGroup.destroyEach();
        barGroup.destroyEach();

        baloon.velocityY = 0;
        baloon.velocityX = 0;

        reset.visible = true;

        if(mousePressedOver(reset)) {
            reset.visible = false;
            gameState = PLAY
        }

        drawSprites();

        textSize(55);
        fill("red");
        stroke("black");
        strokeWeight(5)
        text("Game Over", width/2 -150, 200);
    }
}

function spawnObstacleTop() {
    if(frameCount %120 ===0) {
    var obsTop = createSprite(1000, 50, 50, 50);
    obsTop.y = random(30, 100)
    obsTop.velocityX = -3

    var rand = Math.round(random(1, 2));

    switch(rand) {
        case 1: obsTop.addImage(obsTop1Img);
        break;
        case 2: obsTop.addImage(obsTop2Img);
        break;
        default: break;
    }

    obsTop.scale = 0.07

    obsTop.lifetime = 333

    baloon.depth = obsTop.depth +1;

    obsTopGroup.add(obsTop);

    }

}

function spawnBar() {
    if(frameCount% 170 ===0) {
        var bar = createSprite(1000, 330, 50, 200);
        bar.velocityX = -3
        bar.addImage(barImg);
        bar.scale = 0.1

        bar.lifetime = 333;

        barGroup.add(bar);
    }
}

