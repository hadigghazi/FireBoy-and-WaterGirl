    let scores =[];


class GameLevel extends Phaser.Scene {



  constructor(levelName = "level1" , mapName ,  Data) {
    super({ key: levelName });
    
    this.levelName = levelName;
    this.mapName = mapName;

    this.intialData = Data;
    


    this.levelCount = 3;


    

  }

  init(data){
    this.hearts = data.hearts
  }


  
    preload() {
      //Loading to phaser's cache 
      //to have all ressources in ram


      this.load.image("tileset", "./assets/images/tileset.png");
      this.load.image("background", "./assets/images/Ground.png");


      this.load.image(
        "character1",
        this.loadImageFromLocalStorage1("character1")
      );
      this.load.image(
        "character2",
        this.loadImageFromLocalStorage2("character2")
      );

      this.load.audio("coin", "./assets/audio/coin.mp3");
      this.load.audio("jump", "./assets/audio/jump.mp3");
      this.load.audio("levelEnd", "./assets/audio/levelEnd.mp3");
      this.load.audio("theme", "./assets/audio/theme.mp3");
      
      this.load.image("coin", "./assets/images/diamond.png");
      this.load.image("coin2", "./assets/images/fire.png");
      this.load.image("wall", "./assets/images/Wall.png");
      this.load.image("wallBtn", "./assets/images/wallBtn.png");
      this.load.image("heart" , "../assets/images/heart.png")
      
      this.load.audio("wallOpen" , "../assets/audio/wallOpen.mp3")
      this.load.audio("wallClose" , "../assets/audio/wallClose.mp3")
      this.load.audio("lose" , "../assets/audio/lose.mp3")
      this.load.audio("gameOverSound" , "../assets/audio/gameOver.mp3")
      

      this.load.tilemapCSV("tilemap1", "./assets/maps/LEVEL1.csv");
      this.load.tilemapCSV("tilemap2", "./assets/maps/level2.csv");
      this.load.tilemapCSV("tilemap3", "./assets/maps/level3.csv");
      


    }








  
    create() {

    this.Data = structuredClone(this.intialData);// To allow repeating of the cycle of levelswithout problems
    /* explantion:

    The constructor is runned once when the object of a levvel is declared and initialized
    
    and having the this.Data have the same refrencee in memory to the object created the first time will cause a problem

    the game pushes to an array.
    I need that resetted
    

    */
    this.levelStartTime = Math.floor(new Date().getTime() / 1000);



      const background = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "background"
      );
  
      background.displayWidth = this.cameras.main.width;
      background.displayHeight = this.cameras.main.height;
      background.setScrollFactor(0);
  
      const map = this.make.tilemap({
        key: this.mapName,
        tileWidth: 32,
        tileHeight: 32,
      });


      const tiles = map.addTilesetImage("tileset");
      const layerY = background.displayHeight / map.heightInPixels;
      const layer = map.createLayer(0, tiles, 0, layerY);
  
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);




  
      const groundLevel = this.cameras.main.height - 50;








  
      this.character1 = this.physics.add
        .sprite(100, groundLevel, "character1")
        .setOrigin(0.5, 1)
        .setCollideWorldBounds(true)
        .setBounce(0.2)
        .setDrag(100)
        .setGravityY(500)
        .setScale(0.3);
  
      this.character1.body.setSize(80, 200);





  
      this.character2 = this.physics.add
        .sprite(160, groundLevel, "character2")
        .setOrigin(0.5, 1)
        .setCollideWorldBounds(true)
        .setBounce(0.2)
        .setDrag(100)
        .setGravityY(500)
        .setScale(0.3);
  
      this.character2.body.setSize(80, 200);


      this.coins = this.physics.add.staticGroup();
      this.coins2 = this.physics.add.staticGroup(); 







      map.setCollisionBetween(0, 2);
      this.physics.add.collider(this.character1, layer);
      this.physics.add.collider(this.character2, layer);

  
      this.physics.add.overlap(
        this.character2,
        this.coins,
        this.hitCoin,
        null,
        this
      );
      this.physics.add.overlap(
        this.character1,
        this.coins2,
        this.hitCoin,
        null,
        this
      );




      this.walls = this.physics.add.staticGroup();
      this.wallBtns = this.physics.add.staticGroup();

      this.createWalls();

 



      //loading audios and playing the theme
  
      this.loadAudios();
      this.playMusic();
  
      this.score = 0;
  
      this.scoreText = this.add.text(16, 10, "Score: 0", {
        fontSize: "24px",
        fill: "#fff",
      }).setScrollFactor(0).setDepth(5);





      // for development only
      /*this.dimensionsText = this.add.text(400, 40, "Dimensions", {
        fontSize: "24px",
        fill: "#00f",
      }).setScrollFactor(0).setDepth(5);*/








  
      /*this.updateScoreEvent = this.time.addEvent({
        delay: 100,
        callback: () => this.updateScore(),
        callbackScope: this,
        loop: true,
      });*/
  
      this.cursors = this.input.keyboard.createCursorKeys();
      this.cameras.main.startFollow(this.character1, true);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
     layer.setDepth(1);
      this.character1.setDepth(2);
      this.character2.setDepth(2);


     /* this.physics.world.createDebugGraphic();
      this.character1.setDebug(true, true, 0xff0000);
      this.character2.setDebug(true, true, 0xff0000);*/
  
      this.createCoins();
      this.createHearts();
      this.setupTouchControls();
    }


    setupTouchControls() {
      const leftButton1 = document.getElementById("left1");
      const rightButton1 = document.getElementById("right1");
      const upButton1 = document.getElementById("up1");
  
      leftButton1.addEventListener("touchstart", () => this.moveCharacter(this.character1, "left"));
      rightButton1.addEventListener("touchstart", () => this.moveCharacter(this.character1, "right"));
      upButton1.addEventListener("touchstart", () => this.jumpCharacter(this.character1));
  
      const leftButton2 = document.getElementById("left2");
      const rightButton2 = document.getElementById("right2");
      const upButton2 = document.getElementById("up2");
  
      leftButton2.addEventListener("touchstart", () => this.moveCharacter(this.character2, "left"));
      rightButton2.addEventListener("touchstart", () => this.moveCharacter(this.character2, "right"));
      upButton2.addEventListener("touchstart", () => this.jumpCharacter(this.character2));
    }
  
    moveCharacter(character, direction) {
      if (direction === "left") {
        character.setVelocityX(-400);
      } else if (direction === "right") {
        character.setVelocityX(400);
      }
    }
  
    jumpCharacter(character) {
      if (character.body.blocked.down) {
        character.setVelocityY(-500);
        this.playAudio("jump");
      }
    }
  
  
    createCoins() {
      let coinsX = this.Data.waterCoinsX;
      let coinsY = this.Data.waterCoinsy;

      console.log(coinsX)
      console.log(coinsY)


      for (let i = 0; i < 10; i++) {
        const x = coinsX[i];
        const y = coinsY[i]-60;
        const coin = this.coins.create(x, y, "coin");
        coin.body.allowGravity = false;
      }


       coinsX = this.Data.fireCoinsX;
       coinsY = this.Data.fireCoinsy;

      for (let i = 0; i < 10; i++) {
        const x = coinsX[i];
        const y = coinsY[i]-60;
        const coin2 = this.coins2.create(x, y, "coin2");
        coin2.body.allowGravity = false;
      }


    }

    createHearts(){

    this.heartsGroup = this.physics.add.staticGroup().setDepth(5);

    for (let i = 0; i < this.hearts; i++) {
        let heart = this.heartsGroup.create(770 - i * 25, 16, 'heart').setDepth(5).setScale(0.1);
        heart.refreshBody();
        this.heartsGroup.add(heart);
    }

    }

     loseHeart() {
      // Remove the last heart from the group
      if (this.heartsGroup.getLength() > 0) {
          let lastHeart = this.heartsGroup.getLast(true);
          lastHeart.destroy();

          if(this.hearts == 0){
            this.looseGame();
          }else{
           this.playAudio("lose");

          }
      }
  }


    createWalls() {



      this.Data.walls.forEach(
        (item )=>{
      let wall = this.walls.create(item[0], item[1], 'wall').setScale(item[2]).refreshBody();
      let wallBtn1 = this.wallBtns.create(item[3], item[4], 'wallBtn').setScale(item[7]).refreshBody();
      let wallBtn2 = this.wallBtns.create(item[5], item[6], 'wallBtn').setScale(item[7]).refreshBody();

      wall.body.allowGravity = false;
      wallBtn1.body.allowGravity = false;
      wallBtn2.body.allowGravity = false;

      item.push(
        wall,false,"close","close"
      )


      }
    )

          console.log(this.Data.walls)     


    this.physics.add.collider(this.character1, this.walls);
    this.physics.add.collider(this.character2, this.walls);


    }



    





  
    hitCoin(player, coin) {
      this.playAudio("coin");
      this.showPoints(100, coin.x, coin.y);
      this.updateScore(100);
      coin.destroy();
    }
  
    loadAudios() {//filling audio objects in an arraay
      this.audios = {
        jump: this.sound.add("jump"),
        coin: this.sound.add("coin"),
        levelEnd: this.sound.add("levelEnd"),
        wallOpen: this.sound.add("wallOpen"),
        wallClose: this.sound.add("wallClose"),
        lose: this.sound.add("lose"),
        gameOverSound: this.sound.add("gameOverSound"),
        
      };
    }
  
    playAudio(key) {
      this.audios[key].play();
    }
  
    playMusic(theme = "theme") {
      this.theme = this.sound.add(theme);
      this.theme.stop();
      this.theme.play({
        mute: false,
        volume: 0.1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      });
    }




  
    update() {// a continouees infinite loop till the level ends


      this.character1.setVelocityX(0);
      if (this.cursors.left.isDown) {
        this.character1.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.character1.setVelocityX(200);
      }
      if (this.cursors.up.isDown && this.character1.body.blocked.down) {
        this.character1.setVelocityY(-500);
        this.playAudio("jump");
      }
  
      this.character2.setVelocityX(0);
      if (this.input.keyboard.addKey('A').isDown) {
        this.character2.setVelocityX(-200);
      } else if (this.input.keyboard.addKey('D').isDown) {
        this.character2.setVelocityX(200);
      }
      if (this.input.keyboard.addKey('W').isDown && this.character2.body.blocked.down) {
        this.character2.setVelocityY(-500);
        this.playAudio("jump");
      }
      


      //End the game when the door is reacvhed
      const thresholdY = 150; 
      if (this.character1.y <= thresholdY && this.character2.y <= thresholdY
          && this.character1.x <= 100 && this.character2.x <= 100 ) {

        this.finishScene();

      }

      let x1,x2,y1,y2;
      x1 = this.character1.x ;
      y1 = this.character1.y ;
      x2 = this.character2.x ;
      y2 = this.character2.y ;


      this.Data.walls.forEach( (item)=>{

            item[9] = item[10];

          
        if (x1> item[3]-20    &&   x1<= item[3]+20   &&   y1 > item[4]-10   &&    y1 <= item[4]+70
          ||x1> item[5]-20    &&   x1<= item[5]+20   &&   y1 > item[6]-10   &&    y1 <= item[6]+70
          ||x2 > item[3]-20   &&   x2 <= item[3]+20  &&   y2 > item[4]-10   &&    y2 <= item[4]+70
          ||x2 > item[5]-20   &&   x2 <= item[5]+20  &&   y2 > item[6]-10   &&    y2 <= item[6]+70) {
          
            item[10] = "open";
          item[8].setY(item[1]-35);
          item[8].setAngle(90);
          item[8].body.enable = false; 
         item[8].refreshBody();


      }else {
        item[10] = "close";
        item[8].setY(item[1]);
        item[8].setAngle(0);
        item[8].body.enable = true;
       item[8].refreshBody();

      } 

      if(item[9] == "open" && item[10] == "close" ){
          //console.log("close")
          this.playAudio("wallClose");
        }else if(item[9] == "close" && item[10]=="open"){
          //console.log("open")
          this.playAudio("wallOpen");


        }

}      
)  




this.Data.fire.forEach( (item)=>{
  /*console.log("in");
  console.log(item[0]);
  console.log(item[1]);*/

if (x2 > item[0]-17   &&   x2 <= item[0]+17  &&   y2 > item[1]-8   &&    y2 <= item[1]+8) {

 this.character2.x = x2 + 70;/**/

 this.hearts--;
 this.loseHeart();
}
}      
)




this.Data.water.forEach( (item)=>{


if (x1 > item[0]-17   &&   x1 <= item[0]+17  &&   y1 > item[1]-8   &&    y1 <= item[1]+8) {

 this.character1.x = x1 - 70;

 this.hearts--;
 this.loseHeart();


}
}      
) 






      //this.dimensionsText.setText(Math.floor(this.character2.x) + " x "+Math.floor(this.character2.y))


      

    }





    loadImageFromLocalStorage1(key) {
      let imgData = localStorage.getItem(key);
      if (!useDefault  && imgData) {
        return imgData;
      }
      return "assets/images/firecharacter.png";
    }
  
    loadImageFromLocalStorage2(key) {
      let imgData = localStorage.getItem(key);
      if (!useDefault  && imgData) {
        return imgData;
      }
      return "assets/images/watercharacter.png";
    }
  
  

    

    




  
    updateScore(points = 0) {
      this.score += points;
      this.scoreText.setText("Score: " + this.score);
    }
  
    showPoints(score, x, y) {
      let pointsText = this.add.text(x, y, `+${score}`, {
        fontSize: "24px",
        fill: "#ff0",
      }).setOrigin(0.5).setDepth(5); 
  
      this.tweens.add({
        targets: pointsText,
        y: y - 50,
        alpha: { from: 1, to: 0 },
        duration: 800,
        onComplete: () => {
          pointsText.destroy();
        },
      });
    }



    looseGame(){
        this.registry.set("currentLevel", 1);

        let currentLevel = this.registry.get("currentLevel") ;
  
        scores.push(this.score);


          this.registry.set("score", this.score);
          this.playAudio("gameOverSound");
          this.scene.stop();
          this.theme.stop();
          this.scene.start("gameover", {  scores: scores });
          scores = []; 

  



    }
    
  
    finishScene() {

      if(this.registry.get("currentLevel")  === undefined){
      this.registry.set("currentLevel", 1);
      }
      let currentLevel = this.registry.get("currentLevel") ;

      const levelEndTime = Math.floor(new Date().getTime() / 1000);
      const speedValue =Math.floor(10 / (levelEndTime - this.levelStartTime) * 10000)
      this.score +=speedValue;
      scores.push(this.score);
      if(currentLevel == this.levelCount){

        this.playAudio("levelEnd");
        this.scene.stop();
        this.theme.stop();
        this.registry.set("currentLevel", 1);
        this.scene.start("end", { level: currentLevel, scores: scores });
        scores = [];
      }else{
        //console.log(scores)
        this.registry.set("score", this.score);
        this.playAudio("levelEnd");
        this.scene.stop();
        this.theme.stop();
        this.scene.start("nextScenex", { score : this.score, hearts: this.hearts}); 
      }

    }
  }
  
  export default GameLevel;
  