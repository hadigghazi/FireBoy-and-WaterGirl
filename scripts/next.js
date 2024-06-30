export default class NextLevel extends Phaser.Scene {
  constructor() {
    super({ key: "nextlevel" });
  }

  init(data) {
    this.score = data.score || 0;
    this.currentLevel = data.level || 1;
  }

  preload() {
    this.load.bitmapFont("arcade", "assets/arcade.png", "assets/arcade.xml");
  }

  create(data) {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);

    const previousScore = data.score || 0;
    this.add
      .bitmapText(
        this.center_width,
        this.center_height - 50,
        "arcade",
        `Score: ${previousScore}`,
        25
      )
      .setOrigin(0.5);

    this.add
      .bitmapText(
        this.center_width,
        this.center_height,
        "arcade",
        "NEXT LEVEL",
        45
      )
      .setOrigin(0.5);

    this.add
      .bitmapText(
        this.center_width,
        this.center_height + 50,
        "arcade",
        "Press SPACE or Click to start!",
        15
      )
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-SPACE", this.startNextLevel, this);
    this.input.on("pointerdown", () => this.startNextLevel(), this);
  }

  startNextLevel() {
    const currentLevel = this.registry.get("currentLevel") || this.currentLevel;
    const nextLevel = `level${currentLevel}`;
    console.log(`Starting next level: ${nextLevel}`);
    this.scene.start(nextLevel, { level: currentLevel });
  }
}
