class nextlevel extends Phaser.Scene {
  constructor() {
    super({ key: "nextlevel" });
  }

  init(data) {
    this.score = data.score || 0;
    this.currentLevel = data.currentlevel || 1;
  }

  preload() {
    this.load.audio("win", "./assets/win.mp3");
  }

  create() {
    const winSound = this.sound.add("win");
    winSound.play();

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, "Level Complete!", {
      fontSize: "32px",
      fill: "#fff",
    }).setOrigin(0.5);

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Score: ${this.score}`, {
      fontSize: "24px",
      fill: "#fff",
    }).setOrigin(0.5);

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, "Press SPACE to continue", {
      fontSize: "24px",
      fill: "#fff",
    }).setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      if (this.currentLevel === 1) {
        this.scene.start("level2");
      } else if (this.currentLevel === 2) {
        this.scene.start("level3");
      } else {
        this.scene.start("gameover");
      }
    });
  }
}

export default nextlevel;
