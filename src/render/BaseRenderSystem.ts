import { Game } from "../core/Game";
import { System } from "../core/System";
import { RenderService } from "./RenderService";

export abstract class RenderSystem extends System {
  abstract render(): void;

  constructor(
    game: Game,
    protected readonly renderService: RenderService,
  ) {
    super(game);
  }

  update() {
    this.render();
  }
}
