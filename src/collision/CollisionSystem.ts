import { System } from "../core/System";
import { Position } from "../position/Position";
import { Physics } from "../physics/Physics";
import { Transform } from "../transform/Transform";
import { Entity } from "../core/Entity";

export class CollisionSystem extends System {
  update() {
    const colliders = this.query(Position, Transform);

    for (let i = 0; i < colliders.length; i++) {
      for (let j = i + 1; j < colliders.length; j++) {
        this.checkCollision(colliders[i], colliders[j]);
      }
    }
  }

  private checkCollision(a: Entity, b: Entity) {
    const aPos = a.getComponent(Position)!;
    const bPos = b.getComponent(Position)!;
    const aTransform = a.getComponent(Transform)!;
    const bTransform = b.getComponent(Transform)!;

    if (
      aPos.x + aTransform.width <= bPos.x ||
      aPos.x >= bPos.x + bTransform.width ||
      aPos.y + aTransform.height <= bPos.y ||
      aPos.y >= bPos.y + bTransform.height
    ) {
      return;
    }

    const physA = a.hasComponent(Physics);
    const physB = b.hasComponent(Physics);

    if (!physA && !physB) return;

    // here maybe problems with 2 active entities
    const active = physA ? a : b;

    const penetrationX =
      Math.min(aPos.x + aTransform.width, bPos.x + bTransform.width) -
      Math.max(aPos.x, bPos.x);

    const penetrationY =
      Math.min(aPos.y + aTransform.height, bPos.y + bTransform.height) -
      Math.max(aPos.y, bPos.y);

    if (penetrationX < penetrationY) {
      if (aPos.x < bPos.x) {
        active.getComponent(Position)!.x = bPos.x - aTransform.width;
      } else {
        active.getComponent(Position)!.x = bPos.x + bTransform.width;
      }

      if (physA) a.getComponent(Physics)!.xSpeed = 0;
      if (physB) b.getComponent(Physics)!.xSpeed = 0;
    } else {
      if (aPos.y < bPos.y) {
        active.getComponent(Position)!.y = bPos.y - aTransform.height;
      } else {
        active.getComponent(Position)!.y = bPos.y + bTransform.height;
      }

      if (physA) a.getComponent(Physics)!.ySpeed = 0;
      if (physB) b.getComponent(Physics)!.ySpeed = 0;
    }
  }
}
