import { Physics } from "../components/Physics";
import { Transform } from "../components/Transform";
import { System } from "../core/System";

export class PhysicsSystem extends System {
  update(deltaTime: number) {
    this.game.entities.forEach((entity) => {
      const transform = entity.getComponent(Transform);
      const physics = entity.getComponent(Physics);

      if (transform && physics) {
        physics.xSpeed += physics.xAcc * deltaTime;
        physics.xSpeed = Math.max(
          -physics.maxXSpeed,
          Math.min(physics.maxXSpeed, physics.xSpeed),
        );

        physics.ySpeed += physics.yAcc * deltaTime;

        transform.x += physics.xSpeed * deltaTime;
        transform.y += physics.ySpeed * deltaTime;
      }
    });
  }
}
