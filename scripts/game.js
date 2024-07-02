import ChooseChar from "./choose.js"
import GameOver from "./end.js";
import GameLevel from "./level1.js";
import level1 from "./level1.js";
import level2 from "./level2.js";
import level3 from "./level3.js";
import NextLevel from "./next.js";
import GameStart from "./start.js";

class Generator {
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
}


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

      this.play({ key: "coin", repeat: -1 });
  }
}

var config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  parent: "gameContainer",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [GameStart, ChooseChar, level1, NextLevel, level2, level3, GameOver],
};

var game = new Phaser.Game(config);
