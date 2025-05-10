import { GameFactory } from "./core/GameBuilder";
import { LevelManager } from "./core/LevelManager";

function bootstrapGame() {
  const game = new GameFactory().addDefaultSystems().build();

  const levelManager = new LevelManager(game);
  levelManager.loadDefaultLevel();

  game.start();
}

bootstrapGame();
