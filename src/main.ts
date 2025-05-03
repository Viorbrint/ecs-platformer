import { Game } from "./core/Game";
import { Mario } from "./entities/Mario";
import { Platform } from "./entities/Platform";
import { CollisionSystem } from "./systems/CollisionSystem";
import { InputSystem } from "./systems/InputSystem";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { RenderSystem } from "./systems/RenderSystem";

const game = new Game();

game.addSystem(new InputSystem(game));
game.addSystem(new PhysicsSystem(game));
game.addSystem(new CollisionSystem(game));
game.addSystem(new RenderSystem(game, "gameCanvas"));

game.addEntity(new Mario(300, 300));
game.addEntity(new Platform(0, 0, 500, 100));
game.addEntity(new Platform(600, 0, 200, 200));
game.addEntity(new Platform(800, 0, 200, 100));
game.addEntity(new Platform(700, 400, 200, 100));

let lastTime = 0;
function gameLoop(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;

  game.update(deltaTime);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
