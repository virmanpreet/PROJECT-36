class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage("Milk.png");
    this.sadDog=loadImage("Dog.png");
    }

    getState(){
      var gameStateRef = database.ref('gameState');
          gameStateRef.on("value",function(data){
            gameState = data.val(); 
          }) 
    }

    update(state){
      database.ref('/').update({
          gameState:state
      });
    }

    bedRoom(){
      background(bedroom_img,550,500);
    }

    livingRoom(){
      background(living_img,550,500);
    }

    garden(){
      background(garden_img,550,500);
    }

   

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      background(46,139,87);
      var x=80,y=100;
      
      imageMode(CENTER);
      fill("yellow");
      textSize(15);
      text("Feed Me",400,105);
        
      fill(255,255,2);
      textSize(15);
      if(lastFed>=12){
        text("Last Feed : "+ lastFed%12 + " PM", 100,30);
       }else if(lastFed==0){
         text("Last Feed : 12 AM",100,30);
       }else{
         text("Last Feed : "+ lastFed, 100,30);
       }

     

      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%7==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
          fill("black");
          line(440,190,430,105);
          image(this.sadDog,440,190,145,145);
          image(this.image,380,220,90,90);

        
        }
      }
    }
}
