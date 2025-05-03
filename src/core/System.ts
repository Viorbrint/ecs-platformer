import { Game } from "./Game";

export class System {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  update(deltaTime: number) {}
}
