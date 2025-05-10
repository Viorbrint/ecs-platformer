import { Entity } from "../core/Entity";
import { System } from "../core/System";
import { Physics } from "../physics/Physics";
import { Position } from "../position/Position";
import { Transform } from "../transform/Transform";
import { Collider } from "./Collider";

export class CollisionSystem extends System {
  update() {
    const colliders = this.query(Position, Collider);

    for (let i = 0; i < colliders.length; i++) {
      for (let j = i + 1; j < colliders.length; j++) {
        this.checkCollision(colliders[i], colliders[j]);
      }
    }
  }

  checkCollision(a: Entity, b: Entity) {
    const aT = a.getComponent(Transform)!;
    const bT = b.getComponent(Transform)!;
    const aP = a.getComponent(Position)!;
    const bP = b.getComponent(Position)!;

    if (
      aP.x + aT.width > bP.x &&
      aP.x < bP.x + bT.width &&
      aP.y + aT.height > bP.y &&
      aP.y < bP.y + bT.height
    ) {
      const topCollision = Math.abs(aP.y + aT.height - bP.y);
      const bottomCollision = Math.abs(aP.y - (bP.y + bT.height));
      const leftCollision = Math.abs(aP.x + aT.width - bP.x);
      const rightCollision = Math.abs(aP.x - (bP.x + bT.width));

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision,
      );

      if (minCollision === topCollision) {
        aP.y = bP.y - aT.height;
        a.getComponent(Physics)!.ySpeed = 0;
      } else if (minCollision === bottomCollision) {
        aP.y = bP.y + bT.height;
        a.getComponent(Physics)!.ySpeed *= -0.2;
      } else if (minCollision === leftCollision) {
        aP.x = bP.x - aT.width;
        a.getComponent(Physics)!.xSpeed = 0;
      } else if (minCollision === rightCollision) {
        aP.x = bP.x + bT.width;
        a.getComponent(Physics)!.xSpeed = 0;
      }
    }
  }
}
