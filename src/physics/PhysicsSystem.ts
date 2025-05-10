import { System } from "../core/System";
import { Transform } from "../transform/Transform";
import { Physics } from "./Physics";

export class PhysicsSystem extends System {
  update(deltaTime: number) {
    this.query(Transform, Physics).forEach((entity) => {
      const transform = entity.getComponent(Transform)!;
      const physics = entity.getComponent(Physics)!;
      physics.xSpeed += physics.xAcc * deltaTime;
      physics.xSpeed = Math.max(
        -physics.maxXSpeed,
        Math.min(physics.maxXSpeed, physics.xSpeed),
      );

      physics.ySpeed += physics.yAcc * deltaTime;

      transform.x += physics.xSpeed * deltaTime;
      transform.y += physics.ySpeed * deltaTime;
    });
  }
}
