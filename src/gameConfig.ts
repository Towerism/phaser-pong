import Phaser from "phaser";
import { scenes } from "./scenes";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  title: "Ping Pong",
  banner: {
    text: "white",
    background: ["#FD7400", "#FFE11A", "#BEDB39", "#1F8A70", "#004358"],
  },
  scene: scenes,
  physics: {
    default: "arcade",
  },
};
