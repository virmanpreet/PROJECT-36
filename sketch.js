var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var gameState;
var garden_img,living_img,bedroom_img,loading_gif;
var currentTime,loading,changeP;
var box,Button;

function preload(){
happyDog=loadImage("happy dog.png");
garden_img = loadImage("Garden.png");
living_img = loadImage("Living Room.png");
bedroom_img = loadImage("Bed Room.png");
loading_gif= loadImage("Loading_2.gif");
}

function setup() {
  database=firebase.database();
   createCanvas(600,500);

  loading= createSprite(300,250,1,1);

  foodObj = new Food();
  foodObj.getState();

  //box = createSprite(800,250,400,500);

  //button = createButton('Change Button');
  //button.position(690,600);
   
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  feed=createButton("Feed the dog");
  feed.position(475,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(575,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  //button.mousePressed(setCanvasSize);
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

   if(gameState !== 0){
    feed.hide();
    addFood.hide();
   }else{
     feed.show();
     addFood.show();
   }

   currentTime=hour();
   if(currentTime===(lastFed+1)){
    resizeCanvas(600,500,true);
     foodObj.update(1);
     foodObj.garden();
   }else if(currentTime===(lastFed+2)){
    resizeCanvas(600,500,true);
    foodObj.update(2);
     foodObj.bedRoom();
   }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    resizeCanvas(600,500,true);
    foodObj.update(3);
    foodObj.livingRoom();
   }else{
    foodObj.update(0);
    foodObj.display();
   }

   if(foodS === undefined){
     loading.addImage(loading_gif);
     loading.scale = 0.5;
   }else{
     loading.remove();
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function setCanvasSize(){
      resizeCanvas(1000,500);
}

