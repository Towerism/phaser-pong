import { Game } from "phaser";
import { gameConfig } from "./gameConfig";

let game: Game | null = null;

function newGame() {
  if (game) return;
  console.log("Creating new game");
  game = new Phaser.Game(gameConfig);
}

function destroyGame() {
  if (!game) return;
  console.log("Destroying new game");
  game.destroy(true);
}

if (module.hot) {
  module.hot.dispose(destroyGame);
  module.hot.accept(newGame);
}

if (!game) newGame();
