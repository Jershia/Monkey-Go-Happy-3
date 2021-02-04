var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage
var obstacle,obstacleImage
var foodGroup,obstacleGroup
var ground;
var score;
var survivalTime =0;
var restart,restartImage;
var jungle,jungleImage;
   
function preload(){
  jungleImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 restartImage = loadImage("restart_icon-removebg-preview.png");
}
function setup() {
  createCanvas(800,400);
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  jungle = createSprite(0,0,800,400);
  jungle.addImage(jungleImage);
  jungle.scale=1.5;
  jungle.x=jungle.width/2;
  jungle.velocityX=-4;

// Creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

// Creating ground
  ground = createSprite(400,350,900,50);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.shapeColor="green";
  console.log(ground.x);
  ground.visible = false;
  score = 0;
  survivalTime=0;
  restart = createSprite(300,230);
   restart.addImage(restartImage);
   restart.scale = 0.1
}
function draw() {
  background("lightblue");
   //jungle.velocity = -4;
  if (gameState === PLAY){
  restart.visible = false;
    survivalTime = survivalTime + Math.ceil(frameCount % 10 === 0)

// Make the ground sprite move half its width
if(jungle.x< 200){
  jungle.x=jungle.width/2;
}
  ground.x = ground.width/2;

// Make the monkey collide with ground
  monkey.collide(ground);

// Make the monkey jump when space key is pressed
if(keyWentDown("space")){
  monkey.velocityY = -12;
} 
// Add gravity
  monkey.velocityY = monkey.velocityY + 0.8  ;
         
// Create function for Food and obstacles
  Bananas();
  Obstacles(); 

  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score+5;
 }
if(monkey.isTouching(obstacleGroup)){
       gameState = END;
}
}
//Creating Gamestate "END"
 if (gameState === END) {
    restart.visible = true;
    foodGroup.destroyEach();
 obstacleGroup.destroyEach();
 foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
   monkey.velocityY = monkey.velocityY + 0.8  ;
   jungle.velocityX = 0;
    ground.velocityX = 0;   
    score=0;
    survivalTime=0;
    monkey.collide(ground);
    fill("black");
    textSize(50);
if(mousePressedOver(restart)){
  reset();
}
} 
  drawSprites();
  textSize(20);
  fill("red");
  textStyle("ITALIC")
  text("Score: " + score,450,50);
  
  textSize(20);
  fill("red");
  textStyle("ITALIC")
  text("Survival Time: " + survivalTime,450,75);
  
  
}
function reset(){
  gameState = PLAY;
  restart.visible = false;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  score=0;
  survivalTime=0;
  jungle.velocityX = -4;
  jungle.x = jungle.width/2;
}
// Creating function for bananas
function Bananas(){
if(World.frameCount % 100 === 0){
    banana = createSprite(600,100,40,10);
      banana.scale = 0.1;
  r = Math.round(random(1,4));
   if(r == 1) {
   banana.addImage(bananaImage);
 } else if (r == 2) {
   banana.addImage(bananaImage)
 }else if (r == 3){
   banana.addImage(bananaImage);
 }else 
   banana.addImage(bananaImage);
    banana.y = Math.round(random(150,200));
   // banana.addImage(bananaImage);
    banana.velocityX = -3;
    //banana.lifetime = 0;
    foodGroup.add(banana);
}
}
// Creating function for obstacles
function Obstacles(){
if (frameCount % 300 === 0){
   obstacle = createSprite(400,290,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.velocityX = -4;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
}
}