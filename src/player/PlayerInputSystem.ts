import { System } from "../core/System";
import { Jump } from "../jump/Jump";
import { PlayerInput } from "./PlayerInput";
import { PlayerMove } from "./PlayerMove";

export class PlayerInputSystem extends System {
  update() {
    this.query(PlayerInput, Jump, PlayerMove).forEach((e) => {
      const input = e.getComponent(PlayerInput)!;
      const jump = e.getComponent(Jump)!;
      const move = e.getComponent(PlayerMove)!;

      if (input.jump) {
        jump.jumpRequested = true;
      } else {
        jump.jumpRequested = false;
      }

      if (
        (input.moveLeft && input.moveRight) ||
        (!input.moveLeft && !input.moveRight)
      ) {
        move.stopRequested = true;
        move.moveLeftRequested = false;
        move.moveRightRequested = false;
        return;
      }
      if (input.moveLeft) {
        move.moveLeftRequested = true;
        move.stopRequested = false;
        move.moveRightRequested = false;
      }
      if (input.moveRight) {
        move.moveRightRequested = true;
        move.stopRequested = false;
        move.moveLeftRequested = false;
      }
    });
  }
}
