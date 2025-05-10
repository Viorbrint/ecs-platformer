import { CameraEntity } from "./camera/CameraEntity";
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
import { Platform } from "./platform/Platform";
import { Player } from "./player/Player";
import { PlayerInputSystem } from "./player/PlayerInputSystem";
import { PlayerMoveSystem } from "./player/PlayerMoveSystem";
import { RectRenderSystem } from "./render/RectRenderSystem";
import { RenderService } from "./render/RenderService";

const game = new Game();

const renderService = new RenderService("gameCanvas");

new InputService();

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

const player = game.addEntity(new Player(300, 1000));
game.addEntity(new Platform(0, 0, 500, 100));
game.addEntity(new Platform(600, 0, 200, 200));
game.addEntity(new Platform(800, 0, 200, 100));
game.addEntity(new Platform(900, 200, 200, 100));
game.addEntity(new Platform(1100, 0, 2000, 100));

game.addEntity(
  new CameraEntity(
    0,
    0,
    renderService.width,
    renderService.height,
    0.05,
    player,
  ),
);

game.start();
