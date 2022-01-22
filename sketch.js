var mario, marioSprite;
var coin, coinSprite;
var backg, groundSprite;
var obstacle_sprite;

var invisibleGround_sprite;

var coins;

var obstacles = []
var obstacleSprite;
var ob_group;

function preload() {
    mario = loadAnimation('Capture1.png', 'Capture3.png', 'Capture4.png');
    coin = loadImage('coin.png');
    backg = loadImage('backg.jpg');

    coins = createGroup();
    ob_group = createGroup();
    for (var i = 1; i <= 3; i++) {
        obstacles.push(loadImage('obstacle' + i + '.png'));
    }
}

function setup() {
    createCanvas(600, 200);
    marioSprite = createSprite(40, 140, 50, 50);
    marioSprite.addAnimation('Sprites', mario);
    marioSprite.scale = 0.475;

    //groundSprite = createSprite(300, 170, 600, 10);
    invisibleGround_sprite = createSprite(300, 170, 600, 10);
    invisibleGround_sprite.visible = false;
}

function draw() {
    background(backg);
    drawSprites();

    generateCoins();
    generateObstacles();

    marioSprite.collide(invisibleGround_sprite);

    if (keyDown('space') && invisibleGround_sprite.isTouching(marioSprite)) {
        marioSprite.velocityY = -14.25;
    }
    marioSprite.velocityY++;

//   if (backg.x <= 0) backg.x = 300;
//   backg.x = backg.x - 5;
}

function generateCoins() {
    if (frameCount % 60 === 0) {
        coinSprite = createSprite(550, 75, 50, 40);
        coinSprite.addImage(coin);
        coinSprite.y = random(5, 75);

        coinSprite.velocityX = -5;
        coinSprite.lifetime = 120;
        coins.add(coinSprite);
    }
}
  
function generateObstacles() {
    if (frameCount % 60 === 0) {
        obstacleSprite = createSprite(550, 171, 50, 50);
        obstacleSprite.velocityX = -5;
        obstacleSprite.scale = 0.475;
        obstacleSprite.lifetime = 120;

        var randomizer = Math.round(random(1, 3));
        var randomObstacle = obstacles.includes(randomizer);

        obstacleSprite.addImage(randomObstacle);
        ob_group.add(obstacleSprite);
    }
}