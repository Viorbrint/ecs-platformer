import { Collider } from "../collision/Collider";
import { Entity } from "../core/Entity";
import { System } from "../core/System";
import { Physics } from "../physics/Physics";
import { Position } from "../position/Position";
import { Transform } from "../transform/Transform";
import { Jump } from "./Jump";

export class JumpSystem extends System {
  update() {
    this.query(Jump, Physics, Transform, Position).forEach((e) => {
      const jump = e.getComponent(Jump)!;
      const physics = e.getComponent(Physics)!;

      if (jump.jumpRequested && this.canJump(e)) {
        physics.ySpeed = 800;
      }
    });
  }

  private canJump(e: Entity): boolean {
    const t1 = e.getComponent(Transform)!;
    const p1 = e.getComponent(Position)!;

    const a = this.query(Collider, Transform)
      .filter((c) => c != e)
      .filter((c) => {
        const t2 = c.getComponent(Transform)!;
        const p2 = c.getComponent(Position)!;
        return (
          p1.x + t1.width > p2.x &&
          p1.x < p2.x + t2.width &&
          p1.y >= p2.y + t2.height
        );
      })
      .map((c) => {
        const t2 = c.getComponent(Transform)!;
        const p2 = c.getComponent(Position)!;
        return Math.abs(p1.y - (p2.y + t2.height));
      })
      .sort((a, b) => a - b)[0];
    if (a < 2) {
      return true;
    }
    return false;
  }
}
