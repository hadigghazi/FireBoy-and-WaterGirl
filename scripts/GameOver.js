export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "gameover" });
    }

    init(data) {
        this.scores = data.scores;
        console.log(data)

    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x79c4eb);

        this.add
            .bitmapText(
                this.center_width,
                this.center_height - 220,
                "arcade", 
                "You lost :(",
                45
            )
            .setOrigin(0.5);



        this.add
            .bitmapText(
                this.center_width,
                this.center_height - 160,
                "arcade", 
                "Your Scores:",
                40
            )
            .setOrigin(0.5);



        const lineHeight = 41;
        const startY = this.center_height - 95 ;

            console.log(this.scores)
        for (let i = 0; i < this.scores.length; i++) {
            this.add
                .bitmapText(
                    this.center_width,
                    startY + i * lineHeight,
                    "arcade",
                    `Level ${i + 1}:          ${this.scores[i]}`,
                    21
                )
                .setOrigin(0.5);
        }

        this.add
            .bitmapText(
                this.center_width,
                this.center_height + this.scores.length * lineHeight + 30,
                "arcade",
                "Press SPACE or Click to restart!",
                15
            )
            .setOrigin(0.5);

        this.input.keyboard.on("keydown-SPACE", this.restartGame, this);
        this.input.on("pointerdown", () => this.restartGame(), this);
    }

    restartGame() {
        this.scene.start("gamestart");
    }
}