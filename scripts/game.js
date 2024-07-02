import GameOver from "./end.js";
import GameLevel from "./GameLevel.js";
//import level2 from "./level2.js";
import NextLevel from "./next.js";
import GameStart from "./start.js";

/*class Generator {



  constructor(scene) {
      this.scene = scene;
      this.scene.time.delayedCall(2000, () => this.init(), null, this);
      this.pinos = 0;
  }

  init() {
      this.generateCoin();
  }

  generateCoin() {
      this.scene.coins.add(
          new Coin(
              this.scene,
              800,
              this.scene.height - Phaser.Math.Between(32, 128)
          )
      );
      this.scene.time.delayedCall(
          Phaser.Math.Between(500, 1500),
          () => this.generateCoin(1),
          null,
          this
      );
  }
}*/




class Coin extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
      super(scene, x, y, "coin");
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setAllowGravity(false);
      const alpha = 1 / Phaser.Math.Between(1, 3);

      this.init();
  }

  init() {
      this.scene.tweens.add({
          targets: this,
          x: { from: 820, to: -100 },
          duration: 2000,
          onComplete: () => {
              this.destroy();
          },
      });

      const coinAnimation = this.scene.anims.create({
          key: "coin",
          frames: this.scene.anims.generateFrameNumbers("coin", {
              start: 0,
              end: 7,
          }),
          frameRate: 8,
      });
      this.play({ key: "coin", repeat: -1 });
  }
}





const data1 = {
    waterCoinsX:[288, 127 , 667 , 700, 136 ,430, 750, 276 ],
    waterCoinsy:[130, 230, 220  , 130, 318, 430, 510, 606 ],
    fireCoinsX:[228, 60 , 567 , 600, 296 ,50, 650, 376 ],
    fireCoinsy:[130, 230, 220  , 130, 318, 480, 490, 606],

    walls :[
        [480, 435 , 0.8 , 450, 606,420 , 478,0.2 ],
        [650, 305 , 0.8 , 418, 318,500 , 190,0.2 ]
    ]
}



var data2 = {
    waterCoinsX:[288, 127 , 667 , 700, 136 ,430, 750, 276 ],
    waterCoinsy:[130, 600, 220  , 130, 318, 430, 510, 606 ],
    fireCoinsX:[348, 60 , 550 , 600, 296 ,50, 650, 376 ],
    fireCoinsy:[130, 350, 200  , 300, 338, 480, 500, 640],

    walls :[
        [470, 465 , 0.8 , 408, 510,583 , 510,0.2 ],
        [215, 83 , 0.8 , 265, 222,130 , 126,0.2 ]
    ]
}



const data3 = {
    waterCoinsX:[288, 127 , 720 , 700, 116 ,250, 750, 276 ],
    waterCoinsy:[130, 250, 400  , 130, 400, 500, 510, 636 ],
    fireCoinsX:[228, 60 , 670 , 600, 226 ,50, 650, 376 ],
    fireCoinsy:[130, 260, 400  , 130, 400, 500, 500, 636],

    walls :[
        [424, 340 , 0.8 , 177, 253,475 , 382,0.2 ], /* wallx , wally , wall scale, pad1x, pad1y ,pad2x , pad2y,pads scale*/
        [542, 83 , 0.8 , 737, 254,410 , 158,0.2 ]
    ]
}

var GameLevel1 = new GameLevel("level1", "tilemap1",data1);
var GameLevel2 = new GameLevel("level2", "tilemap2",data2);
var GameLevel3 = new GameLevel("level3", "tilemap3",data3);





var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  parent: "gameContainer",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [GameStart, GameLevel1, NextLevel, GameLevel2, GameLevel3, GameOver],
};

var game = new Phaser.Game(config);
