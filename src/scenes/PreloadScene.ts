import { Scene } from "phaser";
import { SceneId } from "~/identifiers/sceneId";
import { preload } from "~/preload";

export class PreloadScene extends Scene {
  public constructor() {
    super("PreloadScene");
  }

  preload() {
    let bg = this.add.rectangle(400, 300, 400, 30, 0x666666);
    let bar = this.add
      .rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff)
      .setScale(0, 1);

    preload(this);

    this.load.on("progress", (progress: number) => {
      bar.setScale(progress, 1);
    });
    console.log("preloaded!");
  }

  update() {
    this.scene.start(SceneId.PlayScene);
  }
}
