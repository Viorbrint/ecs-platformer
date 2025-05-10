import { Game } from "../core/Game";
import { INPUT_SERVICE, ServiceContainer } from "../core/ServiceContainer";
import { System } from "../core/System";
import { PlayerInput } from "../player/PlayerInput";
import { IInputService } from "./IInputService";

export class InputSystem extends System {
  private readonly inputService: IInputService;

  constructor(game: Game) {
    super(game);
    this.inputService = ServiceContainer.getInstance().resolve(INPUT_SERVICE);
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
