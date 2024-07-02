class GameLevel extends Phaser.Scene {



  constructor(levelName = "level1" , mapName ,  Data) {
    super({ key: levelName });
    
    this.levelName = levelName;
    this.mapName = mapName;

    this.intialData = Data;
    
    this.levelCount = 3;

    

  }


  
    preload() {



      this.load.image("tileset", "./assets/tileset.png");
      this.load.image("background", "./assets/Ground.png");

      /*this.load.image("character1", "./assets/firecharacter.png");
      this.load.image("character2", "./assets/watercharacter.png");*/
      this.load.image(
        "character1",
        this.loadImageFromLocalStorage1("character1")
      );
      this.load.image(
        "character2",
        this.loadImageFromLocalStorage2("character2")
      );

      this.load.audio("coin", "./assets/coin.mp3");
      this.load.audio("jump", "./assets/jump.mp3");
      this.load.audio("dead", "./assets/dead.mp3");
      this.load.audio("theme", "./assets/theme.mp3");
      this.load.image("coin", "./assets/diamond.png");
      this.load.image("coin2", "./assets/fire.png");
      this.load.image("wall", "./assets/Wall.png");
      this.load.image("wallBtn", "./assets/wallBtn.png");
      
      
      
      
      this.load.tilemapCSV("tilemap1", "./assets/LEVEL1.csv");
      this.load.tilemapCSV("tilemap2", "./assets/level2.csv");
      this.load.tilemapCSV("tilemap3", "./assets/level3.csv");
      


    }








  
    create() {

    this.Data = structuredClone(this.intialData);



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




  
      const groundLevel = this.cameras.main.height - 600;








  
      this.character1 = this.physics.add
        .sprite(190, groundLevel, "character1")
        .setOrigin(0.5, 1)
        .setCollideWorldBounds(true)
        .setBounce(0.2)
        .setDrag(100)
        .setGravityY(500)
        .setScale(0.3);
  
      this.character1.body.setSize(80, 200);





  
      this.character2 = this.physics.add
        .sprite(200, groundLevel, "character2")
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

      //this.physics.add.collider(this.character1, this.wallBtns, this.handleCollisionCharacter1, null, this);
      
      /*this.physics.add.overlap(this.character1, this.wallBtns, this.handleCollisionCharacter1, null, this);
      this.physics.add.overlap(this.character2, this.wallBtns, this.handleCollisionCharacter2, null, this);*/


      //loading audios and playing the theme
  
      this.loadAudios();
      this.playMusic();
  
      this.score = 0;
  
      this.scoreText = this.add.text(16, 16, "Score: 0", {
        fontSize: "24px",
        fill: "#fff",
      }).setScrollFactor(0).setDepth(5);






      // for development only
      this.dimensionsText = this.add.text(400, 40, "Dimensions", {
        fontSize: "24px",
        fill: "#00f",
      }).setScrollFactor(0).setDepth(5);








  
      this.updateScoreEvent = this.time.addEvent({
        delay: 100,
        callback: () => this.updateScore(),
        callbackScope: this,
        loop: true,
      });
  
      this.cursors = this.input.keyboard.createCursorKeys();
      this.cameras.main.startFollow(this.character1, true);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
      this.physics.world.createDebugGraphic();
      layer.setDepth(1);
      this.character1.setDepth(2);
      this.character2.setDepth(2);
      this.character1.setDebug(true, true, 0xff0000);
      this.character2.setDebug(true, true, 0xff0000);
  
      this.createCoins();
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
        wall,false
      )


      }
    )

          console.log(this.Data.walls)     


    this.physics.add.collider(this.character1, this.walls);
    this.physics.add.collider(this.character2, this.walls);


    }


  /*handleCollisionCharacter1(character, wallBtn) {

    console.log("sadasd");
    this.isColliding = false;

  


  }

  handleCollisionCharacter2(character, wallBtn) {

    console.log("sadasd");
    this.isColliding = false;

       /*   this.wallLinks.forEach((item)=>{
            if(item[0] == wallBtn){
              item[2] =1;
            }
          }
  )*//*


  }*/


  
    hitCoin(player, coin) {
      this.playAudio("coin");
      this.showPoints(100, coin.x, coin.y);
      this.updateScore(100);
      coin.destroy();
    }
  
    loadAudios() {
      this.audios = {
        jump: this.sound.add("jump"),
        coin: this.sound.add("coin"),
        dead: this.sound.add("dead"),
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
        volume: 0,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      });
    }




  
    update() {


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
      


      const thresholdY = 150; 
      if (this.character1.y <= thresholdY && this.character2.y <= thresholdY
          && this.character1.x <= 100 && this.character2.x <= 100 ) {

        this.finishScene();

      }


      this.Data.walls.forEach((item)=>{

        if (this.character1.x > item[3]-20  && this.character1.x <= item[3]+20 && this.character1.y > item[4]-10  &&  this.character1.y <= item[4]+70
          ||this.character1.x > item[5]-20  && this.character1.x <= item[5]+20 && this.character1.y > item[6]-10  &&  this.character1.y <= item[6]+70
          ||this.character2.x > item[3]-20  && this.character2.x <= item[3]+20 && this.character2.y > item[4]-10  &&  this.character2.y <= item[4]+70
          ||this.character2.x > item[5]-20  && this.character2.x <= item[5]+20 && this.character2.y > item[6]-10  &&  this.character2.y <= item[6]+70) {
              
          item[8].setY(item[1]-35);
          item[8].setAngle(90);
          item[8].body.enable = false;
         item[8].refreshBody();

      }else {
        item[8].setY(item[1]);
        item[8].setAngle(0);
        item[8].body.enable = true;
       item[8].refreshBody();

      }

}      
)    




      this.dimensionsText.setText(Math.floor(this.character2.x) + " x "+Math.floor(this.character2.y))


      

    }





    loadImageFromLocalStorage1(key) {
      let imgData = localStorage.getItem(key);
      if (imgData) {
        return imgData;
      }
      return "assets/firecharacter.png";
    }
  
    loadImageFromLocalStorage2(key) {
      let imgData = localStorage.getItem(key);
      if (imgData) {
        return imgData;
      }
      return "assets/watercharacter.png";
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
  
    finishScene() {

      if(this.registry.get("currentLevel")  === undefined){
      this.registry.set("currentLevel", 1);
      }
      let currentLevel = this.registry.get("currentLevel") ;
      if(currentLevel == this.levelCount){
        this.registry.set("score", this.score);
        this.playAudio("dead");
        this.scene.stop();
        this.theme.stop();
        this.registry.set("currentLevel", 1);
        this.scene.start("gameover", { level: currentLevel, score: this.score });
      }else{
      this.registry.set("score", this.score);
      this.playAudio("dead");
      this.scene.stop();
      this.theme.stop();
      this.scene.start("nextScenex", { level: currentLevel, score: this.score }); 
      }

    }
  }
  
  export default GameLevel;
  