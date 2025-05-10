import { Collider } from "../components/Collider";
import { Jump } from "../components/Jump";
import { Physics } from "../components/Physics";
import { Transform } from "../components/Transform";
import { Entity } from "../core/Entity";
import { System } from "../core/System";

export class JumpSystem extends System {
  update() {
    this.query(Jump, Physics, Transform).forEach((e) => {
      const jump = e.getComponent(Jump)!;
      const physics = e.getComponent(Physics)!;

      if (jump.jumpRequested && this.canJump(e)) {
        physics.ySpeed = 800;
      }
    });
  }

  private canJump(e: Entity): boolean {
    const t1 = e.getComponent(Transform)!;

    const a = this.query(Collider, Transform)
      .filter((c) => c != e)
      .filter((c) => {
        const t2 = c.getComponent(Transform)!;
        return (
          t1.x + t1.width > t2.x &&
          t1.x < t2.x + t2.width &&
          t1.y >= t2.y + t2.height
        );
      })
      .map((c) => {
        const t2 = c.getComponent(Transform)!;
        return Math.abs(t1.y - (t2.y + t2.height));
      })
      .sort((a, b) => a - b)[0];
    if (a < 2) {
      return true;
    }
    return false;
  }
}
