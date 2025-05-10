import { System } from "../core/System";
import { Physics } from "../physics/Physics";
import { PlayerMove } from "./PlayerMove";

export class PlayerMoveSystem extends System {
  update() {
    this.query(PlayerMove, Physics).forEach((e) => {
      const move = e.getComponent(PlayerMove)!;
      const p = e.getComponent(Physics)!;

      if (move.moveRightRequested) {
        p.xSpeed = 300;
      }

      if (move.moveLeftRequested) {
        p.xSpeed = -300;
      }

      if (move.stopRequested) {
        p.xSpeed = 0;
      }
    });
  }
}
