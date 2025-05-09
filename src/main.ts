import { Game } from "./core/Game";
import { Player } from "./entities/Player";
import { Platform } from "./entities/Platform";
import { CollisionSystem } from "./systems/CollisionSystem";
import { InputSystem } from "./systems/InputSystem";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { PlayerMoveSystem } from "./systems/PlayerMoveSystem";
import { PlayerInputSystem } from "./systems/PlayerInputSystem";
import { JumpSystem } from "./systems/JumpSystem";

const game = new Game();

game.addSystem(new InputSystem(game));
game.addSystem(new PlayerInputSystem(game));
game.addSystem(new JumpSystem(game));
game.addSystem(new PlayerMoveSystem(game));
game.addSystem(new PhysicsSystem(game));
game.addSystem(new CollisionSystem(game));
game.addSystem(new RenderSystem(game, "gameCanvas"));

game.addEntity(new Player(300, 300));
game.addEntity(new Platform(0, 0, 500, 100));
game.addEntity(new Platform(600, 0, 200, 200));
game.addEntity(new Platform(800, 0, 200, 100));
game.addEntity(new Platform(900, 200, 200, 100));

game.start();
