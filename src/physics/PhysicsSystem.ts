import { System } from "../core/System";
import { Position } from "../position/Position";
import { Physics } from "./Physics";

export class PhysicsSystem extends System {
  update(deltaTime: number) {
    this.query(Position, Physics).forEach((entity) => {
      const p = entity.getComponent(Position)!;
      const physics = entity.getComponent(Physics)!;
      physics.xSpeed += physics.xAcc * deltaTime;
      physics.xSpeed = Math.max(
        -physics.maxXSpeed,
        Math.min(physics.maxXSpeed, physics.xSpeed),
      );

      physics.ySpeed += physics.yAcc * deltaTime;

      p.x += physics.xSpeed * deltaTime;
      p.y += physics.ySpeed * deltaTime;
    });
  }
}
