import { CameraBuilder } from "../camera/CameraBuilder";
import { CameraSystem } from "../camera/CameraSystem";
import { CollisionSystem } from "../collision/CollisionSystem";
import { InputService } from "../input/InputService";
import { InputSystem } from "../input/InputSystem";
import { JumpSystem } from "../jump/JumpSystem";
import { PhysicsSystem } from "../physics/PhysicsSystem";
import { PlatformBuilder } from "../platform/PlatformBuilder";
import { PlayerBuilder } from "../player/PlayerBuilder";
import { PlayerInputSystem } from "../player/PlayerInputSystem";
import { PlayerMoveSystem } from "../player/PlayerMoveSystem";
import { RectRenderSystem } from "../render/RectRenderSystem";
import { RenderService } from "../render/RenderService";
import { Color } from "../utils/Color";
import { Game } from "./Game";
import {
  INPUT_SERVICE,
  RENDER_SERVICE,
  ServiceContainer,
} from "./ServiceContainer";

export class GameFactory {
  private game: Game;

  constructor() {
    this.game = new Game();
    this.registerServices();
  }

  private registerServices() {
    const container = ServiceContainer.getInstance();
    container.register(RENDER_SERVICE, () => new RenderService("gameCanvas"));
    container.register(INPUT_SERVICE, () => new InputService());
  }

  public addDefaultSystems() {
    this.game.addSystem(new InputSystem(this.game));
    this.game.addSystem(new PlayerInputSystem(this.game));
    this.game.addSystem(new JumpSystem(this.game));
    this.game.addSystem(new PlayerMoveSystem(this.game));
    this.game.addSystem(new PhysicsSystem(this.game));
    this.game.addSystem(new CollisionSystem(this.game));
    this.game.addSystem(new CameraSystem(this.game));
    this.game.addSystem(new RectRenderSystem(this.game));

    return this;
  }

  public build(): Game {
    return this.game;
  }
}
