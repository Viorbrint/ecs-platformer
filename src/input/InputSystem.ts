import { System } from "../core/System";
import { PlayerInput } from "../player/PlayerInput";

export class InputSystem extends System {
  update() {
    const inputService = this.game.services.input;
    const inputEntities = this.query(PlayerInput);

    inputEntities.forEach((e) => {
      const input = e.getComponent(PlayerInput)!;

      input.moveLeft = inputService.isKeyPressed("ArrowLeft");
      input.moveRight = inputService.isKeyPressed("ArrowRight");
      input.jump = inputService.isKeyPressed("ArrowUp");
    });
  }
}
