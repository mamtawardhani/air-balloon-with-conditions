var title1,title2,title3,title4,button,input
var limit = 0
var limited=0
var db,pc,gs,greet,rbutton
var playerdata
var replace
var bg,bgim
var airbaloon,airim
var cloud,cloudim
var coin,coinim
var bird,birdim
var score =0
function preload(){
bgim=loadImage("bg21.png")
airim=loadImage("air.png")
cloudim=loadImage("cloud1.png")
coinim=loadImage("coin.png")
birdim=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png",)
}

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  title1 = createElement("H1")
title1.html("HOT --- AIR --- BALLOON")
title1.position(window.innerWidth/2-200,50)

title2 = createElement("H2")
title2.html("1. press to uparrow key and downarrow key to move baloon up and down")
title2.position(window.innerWidth/2-600,500)

title3 = createElement("H2")
title3.html("2. collect coin to make highest score")
title3.position(window.innerWidth/2-600,530)

title4 = createElement("H2")
title4.html("3. save from birds")
title4.position(window.innerWidth/2-600,560)

input=createInput()
input.position(window.innerWidth/2-100,300)
input.attribute("placeholder","Enter Your Name")
input.style("textAlign","center")
input.style("height","30px")

button =createButton("submit")
button.position(window.innerWidth/2-50,350)
button.style("backgroundColor","red")
button.style("height","60px")
button.style("width","60px")
button.style("borderRadius","30px")

airbaloon=createSprite(300,300,50,50)
airbaloon.addImage("air",airim)
airbaloon.scale=1

rbutton= createButton("Reset")
rbutton.position(110,100)
rbutton.mousePressed(function(){
  db.ref("/").update(({playerCount : 0,gameState:0}))
  db.ref("players").remove()

})

db=firebase.database()
db.ref("playerCount").on("value",function (data){
pc=data.val()

})

db.ref("gameState").on("value",function(data){
  gs=data.val()
})

button.mousePressed(playerentry)
coinsGroup = new Group();
}

function draw() {
  background(200,200,200);
  
  if ( gs === 1 && limit===0){
    db.ref("players").on("value",function(data){
    playerdata=data.val()
    
    })
    limit=1
    }  
    if (pc===2){
      gs=1
      db.ref("/").update({gameState:gs})
      
      }
      
      if(gs===1){
      
        
        image(bgim,0,0)
        // textSize(50)
        // fill("black")
        // text("Score is : " + score , width - 100, 50)

   //airbaloon.image(airim,200,200)
 airbaloon.y=mouseY
 cloudS()
 gold()
 birds()

        // if(airbaloon.isTouching(coinsGroup)){
        //   score = score + 1

        //   for(var i =0; i<coinsGroup.length ; i ++){
        //     coinsGroup(i).destroyEach()
        //   }

        // }


        for(var i = 0; i<coinsGroup.length; i++){
          if(coinsGroup.get(i).isTouching(airbaloon)){
            score = score + 1;
            coinsGroup.destroyEach()
          }
        }

 textSize(32)
        text ('score='+ score ,100,50)
        drawSprites()
        
   
      }
      
}

function playerentry(){
  pc=pc+1
  replace=pc
  db.ref("/").update({
    playerCount:pc
  })
  button.hide()
  input.hide()
  title1.hide()
  title2.hide()
  title3.hide()
  title4.hide()

  greet= createElement("H2")
  greet.html("  "+ input.value() +"  ")
  greet.position(50,15)
}

  
function cloudS(){
  if(World.frameCount%290===0){ 
  cloud=createSprite(2000,200,20,20);
  cloud.addAnimation("moving",cloudim);
  cloud.y=Math.round(random(50,500));
  cloud.velocityX=-8;
  cloud.setLifetime=50;
  cloud.scale=2
  cloud.depth = airbaloon.depth;
  airbaloon.depth = airbaloon.depth + 1;
  
  } 
}
function gold(){
  if(World.frameCount%50===0){ 
  coin=createSprite(2000,200,20,20);
  coin.addAnimation("moving",coinim);
  coin.y=Math.round(random(50,450));
  coin.velocityX=-8;
  coin.setLifetime=50;
  coin.scale=0.3
  coinsGroup.add(coin);
  
  } 
}
function birds(){
  if(World.frameCount%180===0){ 
    bird=createSprite(2000,200,20,20);
    bird.addAnimation("moving",birdim);
    bird.y=Math.round(random(50,450));
    bird.velocityX=-6;
    bird.setLifetime=50;
    bird.scale=0.7
  
  
  } 
}