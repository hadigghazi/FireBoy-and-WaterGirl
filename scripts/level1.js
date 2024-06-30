// level1.js
class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  init(data) {
    this.charactersData = data.characters || []; // Initialize with passed characters data
  }

  preload() {
    this.load.image("tileset", "./assets/tileset.png");
    this.load.image("background", "./assets/Ground.png");
    this.load.tilemapCSV("tilemap", "./assets/level1.csv");
    this.load.audio("coin", "./assets/coin.mp3");
    this.load.audio("jump", "./assets/jump.mp3");
    this.load.audio("win", "./assets/win.mp3");
    this.load.audio("theme", "./assets/theme.mp3");

    // Load character images based on data
    this.charactersData.forEach((charKey, index) => {
      this.load.image(`character${index + 1}`, `./assets/${charKey}.png`);
    });

    this.load.image("coin", "./assets/diamond.png");
    this.load.image("coin2", "./assets/fire.png");
  }

  create() {
    const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "background");
    background.displayWidth = this.cameras.main.width;
    background.displayHeight = this.cameras.main.height;
    background.setScrollFactor(0);

    const map = this.make.tilemap({
      key: "tilemap",
      tileWidth: 32,
      tileHeight: 32,
    });
    const tiles = map.addTilesetImage("tileset");
    const layerY = background.displayHeight / map.heightInPixels;
    const layer = map.createLayer(0, tiles, 0, layerY);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.coins = this.physics.add.group();
    this.coins2 = this.physics.add.group();

    const groundLevel = this.cameras.main.height - 32;

    // Create characters dynamically based on chosen characters
    this.characters = [];
    this.charactersData.forEach((charKey, index) => {
      const character = this.physics.add.sprite(100 + index * 100, groundLevel, `character${index + 1}`)
        .setOrigin(0.5, 1)
        .setCollideWorldBounds(true)
        .setBounce(0.2)
        .setDrag(100)
        .setGravityY(500)
        .setScale(0.3);

      character.body.setSize(80, 200);
      this.characters.push(character);
    });

    map.setCollisionBetween(0, 2);
    this.characters.forEach(character => {
      this.physics.add.collider(character, layer);
    });

    this.physics.add.overlap(this.characters[0], this.coins2, this.hitCoin, null, this);
    this.physics.add.overlap(this.characters[1], this.coins, this.hitCoin, null, this);

    this.loadAudios();
    this.playMusic();

    this.score = 0;

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "24px",
      fill: "#fff",
    }).setScrollFactor(0).setDepth(5);

    this.updateScoreEvent = this.time.addEvent({
      delay: 100,
      callback: () => this.updateScore(),
      callbackScope: this,
      loop: true,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.characters[0], true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.createDebugGraphic();
    layer.setDepth(1);
    this.characters.forEach(character => {
      character.setDepth(2);
      character.setDebug(true, true, 0xff0000);
    });

    this.createCoins();
  }

  createCoins() {
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(100, 800);
      const y = Phaser.Math.Between(100, 600);
      const coin = this.coins.create(x, y, "coin");
      coin.body.allowGravity = false;
    }
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(100, 800);
      const y = Phaser.Math.Between(100, 600);
      const coin2 = this.coins2.create(x, y, "coin2");
      coin2.body.allowGravity = false;
    }
  }

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
      win: this.sound.add("win"),
     // dead: this.sound.add("dead"),
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
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });
  }

  update() {
    this.characters[0].setVelocityX(0);
    if (this.cursors.left.isDown) {
      this.characters[0].setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.characters[0].setVelocityX(200);
    }
    if (this.cursors.up.isDown && this.characters[0].body.blocked.down) {
      this.characters[0].setVelocityY(-500);
      this.playAudio("jump");
    }

    this.characters[1].setVelocityX(0);
    if (this.input.keyboard.addKey('A').isDown) {
      this.characters[1].setVelocityX(-200);
    } else if (this.input.keyboard.addKey('D').isDown) {
      this.characters[1].setVelocityX(200);
    }
    if (this.input.keyboard.addKey('W').isDown && this.characters[1].body.blocked.down) {
      this.characters[1].setVelocityY(-500);
      this.playAudio("jump");
    }

    const thresholdY = 150;
    if (this.characters[0].y <= thresholdY && this.characters[1].y <= thresholdY) {
      this.finishScene();
    }
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
    const currentLevel = 1;
    this.registry.set("currentLevel", currentLevel);
    this.registry.set("score", this.score);
    this.playAudio("win");
    this.theme.stop();
    this.scene.start("nextlevel", { level: currentLevel, score: this.score });
  }
}

export default level1;
