class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  preload() {
    this.load.image("tileset", "./assets/tileset.png");
    this.load.image("background", "./assets/Ground.png");
    this.load.image("character1", "./assets/firecharacter.png");
    this.load.image("character2", "./assets/watercharacter.png");
    this.load.tilemapCSV("tilemap", "./assets/Level1.csv");
    this.load.audio("coin", "./assets/coin.mp3");
    this.load.audio("jump", "./assets/jump.mp3");
    this.load.audio("dead", "./assets/dead.mp3");
    this.load.audio("theme", "./assets/theme.mp3");
    this.load.image("coin", "./assets/diamond.png");
    this.load.image("coin2", "./assets/fire.png");
  }

  create() {
    const background = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "background"
    );

    background.displayWidth = this.cameras.main.width;
    background.displayHeight = this.cameras.main.height;
    background.setScrollFactor(0);

    console.log('Creating tilemap for level 1');
    const map = this.make.tilemap({
      key: "tilemap",
      tileWidth: 32,
      tileHeight: 32,
    });
    const tiles = map.addTilesetImage("tileset");
    const layer = map.createLayer(0, tiles, 0, 0);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.coins = this.physics.add.group();
    this.coins2 = this.physics.add.group(); 

    const groundLevel = this.cameras.main.height - 32;

    this.character1 = this.physics.add
      .sprite(100, groundLevel, "character1")
      .setOrigin(0.5, 1)
      .setCollideWorldBounds(true)
      .setBounce(0.2)
      .setDrag(100)
      .setGravityY(500)
      .setScale(0.3);

    this.character1.body.setSize(80, 200);
    map.setCollisionBetween(1);
    this.character2 = this.physics.add
      .sprite(200, groundLevel, "character2")
      .setOrigin(0.5, 1)
      .setCollideWorldBounds(true)
      .setBounce(0.2)
      .setDrag(100)
      .setGravityY(500)
      .setScale(0.3);

    this.character2.body.setSize(80, 200);

    map.setCollisionBetween(0, 2);
    this.physics.add.collider(this.character1, layer);
    this.physics.add.collider(this.character2, layer);

    this.physics.add.overlap(
      this.character2,
      this.coins,
      this.hitCoin,
      null,
      this
    );
    this.physics.add.overlap(
      this.character1,
      this.coins2,
      this.hitCoin,
      null,
      this
    );

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
    this.cameras.main.startFollow(this.character1, true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.world.createDebugGraphic();
    layer.setDepth(1);
    this.character1.setDepth(2);
    this.character2.setDepth(2);
    this.character1.setDebug(true, true, 0xff0000);
    this.character2.setDebug(true, true, 0xff0000);

    this.createCoins();
  }

  createCoins() {
    // Coin positions for character 1 (blue)
    const coinPositions = [
      { x: 240, y: 280 },
      { x: 60, y: 470 },
      { x: 100, y: 60 },
      { x: 190, y: 60 },
      { x: 280, y: 60 },
      { x: 200, y: 190 },
      { x: 430, y: 130 },
      { x: 580, y: 60 },
      { x: 580, y: 440 },
      { x: 380, y: 480 },
      { x: 580, y: 220 }
    ];

    // Create coins at the specified positions
    for (let i = 0; i < coinPositions.length; i++) {
      const pos = coinPositions[i];
      const coin = this.coins.create(pos.x, pos.y, "coin");
      coin.body.allowGravity = false;
    }

    // Coin2 positions for character 2 (red)
    const coin2Positions = [
      { x: 200, y: 270 },
      { x: 60, y: 60 },
      { x: 140, y: 60 },
      { x: 230, y: 60 },
      { x: 150, y: 190 },
      { x: 580, y: 360 },
      { x: 540, y: 60 },
      { x: 400, y: 130 },
      { x: 100, y: 460 },
      { x: 440, y: 580 },
      { x: 550, y: 210 }
    ];

    // Create coins2 at the specified positions
    for (let i = 0; i < coin2Positions.length; i++) {
      const pos = coin2Positions[i];
      const coin2 = this.coins2.create(pos.x, pos.y, "coin2");
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
      dead: this.sound.add("dead"),
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
    this.character1.setVelocityX(0);
    if (this.cursors.left.isDown) {
      this.character1.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.character1.setVelocityX(200);
    }
    if (this.cursors.up.isDown && this.character1.body.blocked.down) {
      this.character1.setVelocityY(-500);
      this.playAudio("jump");
    }

    this.character2.setVelocityX(0);
    if (this.input.keyboard.addKey('A').isDown) {
      this.character2.setVelocityX(-200);
    } else if (this.input.keyboard.addKey('D').isDown) {
      this.character2.setVelocityX(200);
    }
    if (this.input.keyboard.addKey('W').isDown && this.character2.body.blocked.down) {
      this.character2.setVelocityY(-500);
      this.playAudio("jump");
    }

    const thresholdY = 150; 
    if (this.character1.y <= thresholdY && this.character2.y <= thresholdY) {
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
    console.log('Finishing level 1 and transitioning to next level');
    const nextLevel = 2; // Adjust this based on the level
    this.registry.set("currentLevel", nextLevel);
    this.registry.set("score", this.score);
    this.playAudio("dead");
    this.theme.stop();
    this.scene.start("nextlevel", { level: nextLevel, score: this.score });
  }
}

export default level1;
