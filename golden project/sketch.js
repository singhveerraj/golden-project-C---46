var mask1,mask2;
var covidGroup;
var saniGroup;
var sanitizer;
var line;
var gameOver;
var score = 0;
var gameState = "WAIT";
var chances = 3;

function preload(){
    mask1Image = loadImage("images/medical_mask_PNG31.png");
    cov1Image = loadImage("images/cov1.png");
    gameOverImage = loadImage("images/game over.png");
level2Image = loadImage("images/level-2.png");
backgroundImage = loadImage("images/download (5).jpg");
restartImage = loadImage("images/restart.png");
sanitizerImg = loadImage("images/sanitizer.png");
}
function setup(){
 createCanvas(750,600);
 edges = createEdgeSprites();

 mask1 = createSprite(100,550,20,20);
 mask1.addImage(mask1Image);
 mask1.scale = 0.1;
 mask1.visible = false;
 gameOver = createSprite(375,200);
 gameOver.addImage(gameOverImage);
 gameOver.scale = 0.3;
 gameOver.visible = false;
 restart =createSprite(375,400);
 restart.addImage(restartImage);
 restart.scale = 0.25;
 restart.visible = false;
 
 mask1.collide(edges[0]);
 mask1.collide(edges[1]);
 line = createSprite(0,580,1600,5);
 line.shapeColor= "red";
 covidGroup = new Group();
 saniGroup= new Group();
}

function draw(){
background(backgroundImage);


if(gameState==="WAIT"){
textSize(40);
fill("yellow");
text("C-VIRUS",300,50);
textSize(20);
text("Instructions: ",30,150);
text("Your goal is to stop Corona from touching the red line which is the Line Of Safety",30,200);
text("You have to use left and right arrow keys to move your mask",30,250);
text("There are three levels and only three chances",30,300);
text("You have to score 15 points in each level to go to the next level",30,350);
text("press enter to start",30,400);

if(keyDown("enter") && gameState==="WAIT"){
gameState = "LEVEL1";
}
}
if(gameState==="LEVEL1"){
    spawnCovid1();
    textSize(40);
    fill("yellow");
    text("LEVEL 1",300,50);
    commonCondition();
if(score === 15 && gameState === "LEVEL1"){
    score = 0;
    gameState = "WAIT2";
}
}
if(gameState==="WAIT2"){
    textSize(40);
    fill("yellow");
    text("C-VIRUS",300,50);
    textSize(40);
    text("LEVEL - 2 ",250,250);
    text("Press Enter to Start",220,400);
    
    if(keyDown("enter") && gameState==="WAIT2"){
    gameState = "LEVEL2";
    }
    }

if(gameState==="LEVEL2"){
spawnCovid2();
    textSize(40);
    fill("yellow");
    text("LEVEL 2",300,50);
   
    commonCondition();
    if(score===15 && gameState === "LEVEL2"){
        score = 0;
        gameState = "WAIT3";
    }
}
if(gameState==="WAIT3"){
    textSize(40);
    fill("yellow");
    text("C-VIRUS",300,50);
    textSize(40);
    text("LEVEL - 3 ",250,250);
    text("Press Enter to Start",220,400);
    
    if(keyDown("enter") && gameState==="WAIT3"){
    gameState = "LEVEL3";
    }
    }
if(gameState==="LEVEL3"){
    spawnCovid2();
    spawnCovid3();
    
    textSize(40);
    fill("yellow");
    text("LEVEL 3",300,50);
    if(mask1.isTouching(saniGroup)){
        saniGroup.destroyEach();
        score = score+1;
    }
    if(saniGroup.isTouching(line)){
        chances = chances - 1;
        saniGroup.destroyEach();
    }
    
  
    commonCondition();
    if(score===15 && gameState === "LEVEL3"){
        gameState = "WON";
    }
}
if(gameState==="WON"){
    textSize(55);
    fill("yellow");
    text("YOU WIN",300,300);
}





 drawSprites();
}

function spawnCovid1(){
if(frameCount % 80 === 0){
var covid1 = createSprite(150,-20,20,20);
covid1.addImage(cov1Image);
covid1.scale = 0.027
covid1.x = Math.round(random(15,735));
covid1.velocityY = 10;
covid1.lifetime = 800;
covidGroup.add(covid1);
}
}

function spawnCovid2(){
    if(frameCount % 80 === 0){
    var covid1 = createSprite(150,-20,20,20);
    covid1.addImage(cov1Image);
    covid1.scale = 0.027
    covid1.x = Math.round(random(15,735));
    covid1.velocityY = Math.round(random(6,10));
    covid1.lifetime = 800;
    covidGroup.add(covid1);
    }
    }

    function spawnCovid3(){
        if(frameCount % 90 === 0){
        var sani1 = createSprite(150,-20,20,20);
        sani1.addImage(sanitizerImg);
        sani1.scale = 0.1
        sani1.x = Math.round(random(15,735));
        sani1.velocityY = Math.round(random(4,7));
        sani1.lifetime = 800;
        saniGroup.add(sani1);
        }
        }
    

function commonCondition(){
    
    textSize(18);
    fill(255);
    mask1.visible = true;
    
    text("Score: "+score,30,50);
    text("Chances: "+chances,600,50);



if(keyDown("LEFT_ARROW")){
    mask1.x = mask1.x-8;

}
if(keyDown("RIGHT_ARROW")){
    mask1.x=mask1.x+8;
}
if(mask1.isTouching(covidGroup)){
    covidGroup.destroyEach();
    score = score+1;
}

if(covidGroup.isTouching(line)){
    chances = chances - 1;
    covidGroup.destroyEach();
}

if(chances===0){
    gameOver.visible = true;
    restart.visible = true;
    mask1.visible = false;
    covidGroup.destroyEach();
}
if(mousePressedOver(restart)){
    gameRestart();
}
}
function gameRestart(){
    gameState = "WAIT";
    chances = 3;
    score = 0;
    gameOver.visible = false;
    restart.visible = false;
    
}
