import { Physics } from "../components/Physics";
import { PlayerMove } from "../components/PlayerMove";
import { System } from "../core/System";

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
