// ChooseChar.js
class ChooseChar extends Phaser.Scene {
    constructor() {
        super("ChooseChar");
        this.selectedCharacters = [];
    }

    preload() {
        this.load.image("firecharacter", "assets/firecharacter.png");
        this.load.image("watercharacter", "assets/watercharacter.png");
    }

    create() {
        this.cameras.main.setBackgroundColor(0x87ceeb);

        // Create character sprites with increased scale
        this.char1 = this.add.sprite(76.94102, 109.35331, "firecharacter").setInteractive();
        this.char1.setScale(0.5).setOrigin(0.0); // Increased scale for ChooseChar screen

        this.char2 = this.add.sprite(408.21283, 116.134476, "firecharacter").setInteractive();
        this.char2.setScale(0.5).setOrigin(0.0); // Increased scale for ChooseChar screen

        this.char3 = this.add.sprite(76.94102, 200, "watercharacter").setInteractive();
        this.char3.setScale(0.5).setOrigin(0.0); // Increased scale for ChooseChar screen

        this.char4 = this.add.sprite(408.21283, 200, "watercharacter").setInteractive();
        this.char4.setScale(0.5).setOrigin(0.0); // Increased scale for ChooseChar screen

        this.char1.on("pointerdown", () => this.selectCharacter(this.char1));
        this.char2.on("pointerdown", () => this.selectCharacter(this.char2));
        this.char3.on("pointerdown", () => this.selectCharacter(this.char3));
        this.char4.on("pointerdown", () => this.selectCharacter(this.char4));

        // Add submit button with arcade font
        this.submitButton = this.add.bitmapText(400, 500, 'arcade', "Submit", 32).setOrigin(0.5).setInteractive();
        this.submitButton.on("pointerdown", () => {
            if (this.selectedCharacters.length === 2) {
                this.scene.start("level1", { characters: this.selectedCharacters });
            }
        });
    }

    selectCharacter(character) {
        if (this.selectedCharacters.length < 2) {
            this.selectedCharacters.push(character.texture.key);
            character.setScale(0.25).setPosition(231.5 + this.selectedCharacters.length * 200, 107.2);
            if (this.selectedCharacters.length === 2) {
                [this.char1, this.char2, this.char3, this.char4].forEach((char) => {
                    if (!this.selectedCharacters.includes(char.texture.key)) {
                        char.disableInteractive();
                    }
                });
            }
        }
    }
}

export default ChooseChar;
