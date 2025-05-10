import { Game } from "../core/Game";
import { System } from "../core/System";
import { PlayerInput } from "../player/PlayerInput";
import { InputService } from "./InputService";

export class InputSystem extends System {
  constructor(
    game: Game,
    private readonly inputService: InputService,
  ) {
    super(game);
  }

  update() {
    const inputEntities = this.query(PlayerInput);

    inputEntities.forEach((e) => {
      const input = e.getComponent(PlayerInput)!;

      input.moveLeft = this.inputService.isKeyPressed("ArrowLeft");
      input.moveRight = this.inputService.isKeyPressed("ArrowRight");
      input.jump = this.inputService.isKeyPressed("ArrowUp");
    });
  }
}
