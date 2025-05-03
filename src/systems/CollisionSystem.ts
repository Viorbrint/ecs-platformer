import { Collider } from "../components/Collider";
import { Physics } from "../components/Physics";
import { Transform } from "../components/Transform";
import { Entity } from "../core/Entity";
import { System } from "../core/System";

export class CollisionSystem extends System {
  update() {
    const colliders = this.game.entities.filter((e) =>
      e.getComponent(Collider),
    );

    for (let i = 0; i < colliders.length; i++) {
      for (let j = i + 1; j < colliders.length; j++) {
        this.checkCollision(colliders[i], colliders[j]);
      }
    }
  }

  checkCollision(a: Entity, b: Entity) {
    const aTransform = a.getComponent(Transform);
    const bTransform = b.getComponent(Transform);

    if (
      aTransform.x + aTransform.width > bTransform.x &&
      aTransform.x < bTransform.x + bTransform.width &&
      aTransform.y + aTransform.height > bTransform.y &&
      aTransform.y < bTransform.y + bTransform.height
    ) {
      const topCollision = Math.abs(
        aTransform.y + aTransform.height - bTransform.y,
      );
      const bottomCollision = Math.abs(
        aTransform.y - (bTransform.y + bTransform.height),
      );
      const leftCollision = Math.abs(
        aTransform.x + aTransform.width - bTransform.x,
      );
      const rightCollision = Math.abs(
        aTransform.x - (bTransform.x + bTransform.width),
      );

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision,
      );

      if (minCollision === topCollision) {
        aTransform.y = bTransform.y - aTransform.height;
        a.getComponent(Physics).ySpeed = 0;
      } else if (minCollision === bottomCollision) {
        aTransform.y = bTransform.y + bTransform.height;
        a.getComponent(Physics).ySpeed *= -0.2;
      } else if (minCollision === leftCollision) {
        aTransform.x = bTransform.x - aTransform.width;
        a.getComponent(Physics).xSpeed = 0;
      } else if (minCollision === rightCollision) {
        aTransform.x = bTransform.x + bTransform.width;
        a.getComponent(Physics).xSpeed = 0;
      }
    }
  }
}
