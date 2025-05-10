import { Game } from "../core/Game";
import { RENDER_SERVICE, ServiceContainer } from "../core/ServiceContainer";
import { System } from "../core/System";
import { RenderService } from "./RenderService";

export abstract class RenderSystem extends System {
  abstract render(): void;
  protected readonly renderService: RenderService;

  constructor(game: Game) {
    super(game);
    this.renderService = ServiceContainer.getInstance().resolve(RENDER_SERVICE);
  }

  update() {
    this.render();
  }
}
