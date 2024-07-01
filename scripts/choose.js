class ChooseChar extends Phaser.Scene {
    constructor() {
        super("ChooseChar");
        this.selectedCharacters = [];
        this.fireSelected = false; // Flag to track if fire character has been selected
    }

    preload() {
        this.load.image("firecharacter", "assets/firecharacter.png");
        this.load.image("watercharacter", "assets/watercharacter.png");
        this.load.image("firegirl", "assets/firegirl.png");
        this.load.image("watergirl", "assets/watergirl.png");
    }

    create() {
        this.cameras.main.setBackgroundColor(0x87ceeb);

        this.char1 = this.add.sprite(75, 110, "firecharacter").setInteractive();
        this.char1.setScale(0.3).setOrigin(0);

        this.char2 = this.add.sprite(410, 117, "firegirl").setInteractive();
        this.char2.setScale(0.3).setOrigin(0);

        this.char3 = this.add.sprite(77, 200, "watercharacter").setInteractive();
        this.char3.setScale(0.3).setOrigin(0);

        this.char4 = this.add.sprite(408, 200, "watergirl").setInteractive();
        this.char4.setScale(0.3).setOrigin(0);

        this.char1.on("pointerdown", () => this.selectCharacter(this.char1));
        this.char2.on("pointerdown", () => this.selectCharacter(this.char2));
        this.char3.on("pointerdown", () => this.selectCharacter(this.char3));
        this.char4.on("pointerdown", () => this.selectCharacter(this.char4));

        this.submitButton = this.add.bitmapText(500, 500, 'arcade', "Submit", 32).setOrigin(0.5).setInteractive();
        this.submitButton.on("pointerdown", () => {
            if (this.selectedCharacters.length === 2) {
                this.scene.start("level1", { characters: this.selectedCharacters });
            }
        });
    }

    selectCharacter(character) {
        // Check if the character is already selected
        if (this.selectedCharacters.includes(character.texture.key)) {
            return;
        }

        // Check if we already have a character of the same type (fire or water)
        const isFire = character.texture.key === "firecharacter" || character.texture.key === "firegirl";
        const isWater = character.texture.key === "watercharacter" || character.texture.key === "watergirl";

        // If fire has not been selected yet and user tries to select water first, ignore it
        if (!this.fireSelected && isWater) {
            return;
        }

        // Check if the selected character type already exists in selectedCharacters
        const selectedFire = this.selectedCharacters.some(char => char === "firecharacter" || char === "firegirl");
        const selectedWater = this.selectedCharacters.some(char => char === "watercharacter" || char === "watergirl");

        // If the selected character type already exists, return
        if ((isFire && selectedFire) || (isWater && selectedWater)) {
            return;
        }

        // If fire is selected, mark it
        if (isFire) {
            this.fireSelected = true;
        }

        // Select the character
        this.selectedCharacters.push(character.texture.key);
        character.setScale(0.25).setPosition(230, 107);

        // Disable selection for other characters if two are selected
        if (this.selectedCharacters.length === 2) {
            [this.char1, this.char2, this.char3, this.char4].forEach((char) => {
                if (!this.selectedCharacters.includes(char.texture.key)) {
                    char.disableInteractive();
                }
            });
        }
    }
}

export default ChooseChar;
