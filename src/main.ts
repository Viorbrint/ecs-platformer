import { CameraBuilder } from "./camera/CameraBuilder";
import { CameraSystem } from "./camera/CameraSystem";
import { CollisionSystem } from "./collision/CollisionSystem";
import { Game } from "./core/Game";
import {
  INPUT_SERVICE,
  RENDER_SERVICE,
  ServiceContainer,
} from "./core/ServiceContainer";
import { InputService } from "./input/InputService";
import { InputSystem } from "./input/InputSystem";
import { JumpSystem } from "./jump/JumpSystem";
import { PhysicsSystem } from "./physics/PhysicsSystem";
import { PlatformBuilder } from "./platform/PlatformBuilder";
import { PlayerBuilder } from "./player/PlayerBuilder";
import { PlayerInputSystem } from "./player/PlayerInputSystem";
import { PlayerMoveSystem } from "./player/PlayerMoveSystem";
import { RectRenderSystem } from "./render/RectRenderSystem";
import { RenderService } from "./render/RenderService";
import { Color } from "./utils/Color";

const game = new Game();

const container = ServiceContainer.getInstance();

container.register(RENDER_SERVICE, () => new RenderService("gameCanvas"));
container.register(INPUT_SERVICE, () => new InputService());

game.addSystem(new InputSystem(game));
game.addSystem(new PlayerInputSystem(game));
game.addSystem(new JumpSystem(game));
game.addSystem(new PlayerMoveSystem(game));
game.addSystem(new PhysicsSystem(game));
game.addSystem(new CollisionSystem(game));
game.addSystem(new CameraSystem(game));
game.addSystem(new RectRenderSystem(game));

const player = new PlayerBuilder(300, 500, Color.MAGENTA).build();
game.addEntity(player);
game.addEntity(new PlatformBuilder(0, 0, 500, 100, Color.CYAN).build());
game.addEntity(new PlatformBuilder(600, 0, 200, 200, Color.CYAN).build());
game.addEntity(new PlatformBuilder(800, 0, 200, 100, Color.CYAN).build());
game.addEntity(new PlatformBuilder(900, 200, 200, 100, Color.CYAN).build());
game.addEntity(new PlatformBuilder(1100, 0, 2000, 100, Color.CYAN).build());

game.addEntity(new CameraBuilder(player).build());

game.start();
