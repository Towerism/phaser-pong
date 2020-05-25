import { Scene, Types, Physics } from "phaser";
import { AssetId } from "~/identifiers/assetId";

export class PlayScene extends Scene {
  private cursor!: Types.Input.Keyboard.CursorKeys;
  private player!: Physics.Arcade.Sprite;
  private pc!: Physics.Arcade.Sprite;
  private ball!: Physics.Arcade.Sprite;
  private keyW!: Phaser.Input.Keyboard.Key;
  private keyS!: Phaser.Input.Keyboard.Key;
  private velocityX: number;
  private velocityY: number;
  private scorePlayer = 0;
  private scorePc = 0;
  private scoreTextPlayer;
  private scoreTextPc;

  public constructor() {
    super("PlayScene");
    console.log("In play scene");

    this.velocityX = Phaser.Math.Between(-100, 100);
    this.velocityY = 100;
  }

  public create() {
    this.add.image(400, 200, AssetId.Ground);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.player = this.physics.add.sprite(780, 200, AssetId.PaddleOne);
    this.player.setCollideWorldBounds(true);

    this.pc = this.physics.add.sprite(20, 200, AssetId.PaddleTwo);
    this.pc.setCollideWorldBounds(true);

    this.ball = this.physics.add.sprite(400, 200, AssetId.Ball);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocityX(this.velocityX);
    this.ball.setVelocityY(this.velocityY);

    this.physics.add.collider(
      this.ball,
      this.player,
      this.hitPlayer,
      undefined,
      this
    );

    this.physics.add.collider(this.ball, this.pc, this.hitPc, undefined, this);

    this.scoreTextPc = this.add.text(16, 16, "score: 0", {
      fontSize: "16px",
      fill: "#F00",
    });
    this.scoreTextPlayer = this.add.text(700, 16, "score: 0", {
      fontSize: "16px",
      fill: "#00F",
    });
  }

  public update() {
    if (this.cursor.up?.isDown) {
      this.player.setVelocityY(-150);
    } else if (this.cursor.down?.isDown) {
      this.player.setVelocityY(150);
    } else {
      this.player.setVelocityY(0);
    }

    if (this.keyW.isDown) {
      this.pc.setVelocityY(-150);
    } else if (this.keyS.isDown) {
      this.pc.setVelocityY(150);
    } else {
      this.pc.setVelocityY(0);
    }

    if (this.ball.x === 796) {
      this.scorePc += 1;
      this.scoreTextPc.setText(`score: ${this.scorePc}`);
      this.reset();
    }

    if (this.ball.x === 4) {
      this.scorePlayer += 1;
      this.scoreTextPlayer.setText(`score: ${this.scorePlayer}`);
      this.reset();
    }
  }

  private hitPlayer() {
    this.velocityX += 50;
    this.velocityX *= -1;

    this.ball.setVelocityX(this.velocityX);

    if (this.velocityY < 0) {
      this.velocityY *= -1;
      this.ball.setVelocity(this.velocityY);
    }
    this.player.setVelocityX(-1);
  }

  private hitPc() {
    this.velocityX -= 50;
    this.velocityX *= -1;
    this.ball.setVelocityX(this.velocityX);

    if (this.velocityY < 0) {
      this.velocityY *= -1;
      this.ball.setVelocity(this.velocityY);
    }
    this.pc.setVelocityX(-1);
  }

  public reset() {
    this.velocityX = Phaser.Math.Between(-100, 100);
    this.velocityY = 100;
    this.ball.x = 400;
    this.ball.y = 200;
    this.player.x = 780;
    this.player.y = 200;
    this.pc.x = 20;
    this.pc.y = 200;
    this.ball.setVelocityX(this.velocityX);
    this.ball.setVelocityY(this.velocityY);
  }
}
