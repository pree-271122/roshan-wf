const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var stage,stageimg;
var steve,steveimg;
var alex,aleximg;
var idle;
var stone,stonei;
var stonep,stonepi;
var boss,bossi;
var invi;
var gamestate="start";
var score=0;

function preload()
{
  idle = loadAnimation("idle.png");
  stageimg = loadImage("bg.jpg");
  steveimg = loadAnimation("n1.png","n2.png","n3.png","n4.png","n5.png","n6.png");
  aleximg = loadImage("alex.png");
  stonei = loadImage("stone.png");
  stonepi = loadImage("stonep.png");
  bossi = loadImage("baby boss.png");
}

function setup() {
  createCanvas(1000,600);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  stoneGroup = new Group()
  bossGroup = new Group()
  bulletGroup = new Group()
  
  stage = createSprite(500,300,1000,600)
  stage.addImage("stageimg",stageimg)
  stage.scale = 1.7;

  steve = createSprite(975,475,10,100)
  steve.addAnimation("idle",idle)
  steve.addAnimation("steveimg",steveimg)
  steve.scale = 0.4;

  stonep = createSprite(600,670,10,100)
  stonep.addImage("stonepi",stonepi)
  stonep.scale = 1.2

  invi = createSprite(500,300,10,600)
  invi.visible = false;

  invi2 = createSprite(500,550,1000,10)
  invi2.visible = false;


  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  
  Engine.update(engine);
  drawSprites();

  if(stonep.x>700){stonep.x = width/2}
  if(stage.x>0){stage.x = 500}

  if(gamestate==="start"){
    fill("white")
    textSize(30)
    text("Press space to start" ,350,200);
    if(keyDown("space")){
      gamestate="play1"
    }
  }
  else if(gamestate==="play1"){
    gameplay1();
  }
  
  else{
    gameend()
  }
  stones();
  Boss();

  fill("white")
  text ("SCORE : " + score,800,100)
}

function stones(){
  if(frameCount%100===0){
    stone = createSprite(0,570,10,100)
    stone.addImage("stonei",stonei)
    stone.scale = 0.2 
   //stone.velocityX=5;
   stoneGroup.add(stone);
  }
  }
  function Boss(){
    if(frameCount%400===0){
      boss = createSprite(30,475,10,100)
      boss.addImage("bossi",bossi)
      boss.scale = 0.4
      bossGroup.add(boss);
      boss.lifetime=1000
    }
    }
    function Bullet(){
      if(frameCount%100===0){
        bullet = createSprite(100,10,10,100)
        bullet.addImage("bossi",bossi)
        bullet.scale = 0.4
        bullet.velocityY=2;
        bullet.x=Math.round(random(10,1000))
        bulletGroup.add(bullet);
        //bullet.lifetime=200
      }
      }

  function gameplay1(){
  
    if (keyWentDown("LEFT_ARROW")){
      steve.changeAnimation("steveimg",steveimg)
      stage.velocityX = -5
      stonep.velocityX = 5
      }
    if (keyWentUp("LEFT_ARROW")){
      steve.changeAnimation("idle",idle)
      stage.velocityX = 0
      stonep.velocityX = 0
      stoneGroup.setVelocityXEach(0)
      bossGroup.setVelocityXEach(0)
        }
    if (keyDown("LEFT_ARROW")){
      stoneGroup.setVelocityXEach(5)
      bossGroup.setVelocityXEach(5)
    }
    if(bossGroup.isTouching(invi)){
    
    bossGroup.setVelocityXEach(0)
    stoneGroup.setVelocityXEach(0)
    stonep.velocityX = 0;
    
    if(keyDown("UP_ARROW")){
      steve.x=steve.x-2;
      steve.velocityY=-1;
      steve.changeAnimation("steveimg",steveimg)
    }
    if(keyDown("Right_ARROW")){
      steve.x=steve.x+2;
      steve.velocityY=-1;
      steve.changeAnimation("steveimg",steveimg)
    }
    steve.velocityY = steve.velocityY + 0.5;
    steve.collide(invi2)
    
    Bullet();
    if(bulletGroup.isTouching(invi2)){
      score=score+1
    }
    if(score>=1000){
      bulletGroup.destroyEach();
      bossGroup.destroyEach();
      gamestate="end"
    }
      }
    }

    function gameend(){
      if(gamestate==="end"){
        fill ("white")
      text("GAME OVER" , 350,200);
    steve.changeAnimation("idle",idle)
    stage.velocityX = 0
    stonep.velocityX = 0
      }
    }


  

    