import { CollisionSystem } from "./collision/CollisionSystem";
import { Game } from "./core/Game";
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

game.addSystem(new InputSystem(game, new InputService()));
game.addSystem(new PlayerInputSystem(game));
game.addSystem(new JumpSystem(game));
game.addSystem(new PlayerMoveSystem(game));
game.addSystem(new PhysicsSystem(game));
game.addSystem(new CollisionSystem(game));
game.addSystem(new RectRenderSystem(game, new RenderService("gameCanvas")));

game.addEntity(new Player(300, 300));
game.addEntity(new Platform(0, 0, 500, 100));
game.addEntity(new Platform(600, 0, 200, 200));
game.addEntity(new Platform(800, 0, 200, 100));
game.addEntity(new Platform(900, 200, 200, 100));

game.start();
