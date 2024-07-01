export default class GameStart extends Phaser.Scene {
    constructor() {
        super({ key: "gamestart" });
    }

    preload() {
        this.load.bitmapFont("arcade", "assets/arcade.png", "assets/arcade.xml");
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x87ceeb);

        this.add
            .bitmapText(
                this.center_width,
                this.center_height,
                "arcade",
                "START GAME",
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

        this.input.keyboard.on("keydown-SPACE", this.startGame, this);
        this.input.on("pointerdown", () => this.startGame(), this);
    }

    startGame() {
        this.scene.start("ChooseChar");
    }
}