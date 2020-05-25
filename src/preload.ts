import { Scene } from "phaser";
import { AssetId } from "./identifiers/assetId";
import images from "./assets/*.png";

const assetMap: Record<string, string> = {
  [AssetId.PaddleOne]: images.player,
  [AssetId.PaddleTwo]: images.pc,
  [AssetId.Ball]: images.ball,
  [AssetId.Ground]: images.ground,
};

export function preload(scene: Scene) {
  for (const key in assetMap) {
    scene.load.image(key, assetMap[key]);
  }
}
