var towerImage, tower;
var doorImage, door, doorsGroup;
var climberImage, climber, climbersGroup;
var ghost, ghostImage;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  inviBlockGroup = new Group();
  
  ghost = createSprite(300,300,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImage);
}
 function draw(){
    background(0);
    if(gameState === "play"){
      
      if(keyDown("space")){
        ghost.velocityY = -10;
      }
      
      if(keyDown("left_arrow")){
         ghost.x = ghost.x - 3;
         }
      
      
      if(keyDown("right_arrow")){
         ghost.x = ghost.x + 3;
         }
      
      ghost.velocityY = ghost.velocityY + 0.7
      
      
      if(tower.y>600){
      tower.y=300;
    }
      
      if(inviBlockGroup.isTouching(ghost)||ghost.y>600){
         gameState="END"
        
         
         }
      
      ghost.collide(climbersGroup);
      createDoors();
      
    }
      
   
   else if(gameState==="END"){
   inviBlockGroup.destroyEach();
   doorsGroup.destroyEach();
   climbersGroup.destroyEach();
   tower.destroy();
   ghost.destroy();
   textSize(30);
   text("GAME OVER",220,300);
   
   }
   
      
      
    
   drawSprites();
 }


function createDoors(){
  
  if(frameCount%100===0){
    var door = createSprite(Math.round(random(100,500)),-50,20,20)
    door.velocityY= 2;
    door.addImage(doorImage);
    doorsGroup.add(door);
    
    var climber = createSprite(door.x,door.y+50);
    climber.velocityY= 2;
    climber.addImage(climberImage);
    climbersGroup.add(climber)
    
    
    var inviBlock = createSprite(climber.x,climber.y+20,45,7)
    inviBlock.velocityY=2;
    inviBlockGroup.add(inviBlock);
    inviBlock.visible=false;
    
    ghost.depth = door.depth+1;
    
    doorsGroup.setLifetimeEach(800);
    climbersGroup.setLifetimeEach(800);
    inviBlockGroup.setLifetimeEach(800);
  }
  
  
}