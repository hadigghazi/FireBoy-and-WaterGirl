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



/*
  A data object for every level
*/

const data1 = {
    waterCoinsX:[165, 299 , 390 , 100, 550 ,550, 340 , 70 , 300, 150 ],
    waterCoinsy:    [227, 227, 227  , 320, 320, 100, 80 , 70, 160,160],
    fireCoinsX:[250, 375 , 500 , 500, 550 ,480, 380 , 300 , 380, 200 ],
    fireCoinsy:[570, 570, 570  , 440, 320, 100, 80 , 400, 210,160],

    walls :[
        [480, 435 , 0.8 , 450, 606,420 , 478,0.2 ],
        [650, 305 , 0.8 , 418, 318,500 , 190,0.2 ]
    ]
}



const data2 = {
    waterCoinsX:[437, 299 , 390 , 100, 550 ,550, 340 , 70 , 300, 150 ],
    waterCoinsy:    [227, 227, 227  , 320, 320, 100, 80 , 70, 160,160],
    fireCoinsX:[250, 375 , 500 , 500, 550 ,480, 380 , 300 , 380, 200 ],
    fireCoinsy:[570, 570, 570  , 440, 320, 100, 80 , 400, 210,160],

    walls :[
        [480, 435 , 0.8 , 450, 606,420 , 478,0.2 ],
        [650, 305 , 0.8 , 418, 318,500 , 190,0.2 ]
    ]
}


const data3 = {
    waterCoinsX:[437, 299 , 390 , 100, 550 ,550, 340 , 70 , 300, 150 ],
    waterCoinsy:    [227, 227, 227  , 320, 320, 100, 80 , 70, 160,160],
    fireCoinsX:[250, 375 , 500 , 500, 550 ,480, 380 , 300 , 380, 200 ],
    fireCoinsy:[570, 570, 570  , 440, 320, 100, 80 , 400, 210,160],

    walls :[
        [480, 435 , 0.8 , 450, 606,420 , 478,0.2 ], /* wallx , wally , wall scale, pad1x, pad1y ,pad2x , pad2y,pads scale*/
        [650, 305 , 0.8 , 418, 318,500 , 190,0.2 ]
    ]
}

// levelkey,  map name , data object
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
