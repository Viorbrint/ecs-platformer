// export class InputSystem extends System {
//   update() {
//     const input = this.game.services.input.state;
//     const gameState = this.game.state;
//
//     gameState.moveLeft = input.moveLeft;
//     gameState.moveRight = input.moveRight;
//     gameState.jump = input.jump;
//   }
// }

import { Collider } from "../components/Collider";
import { Input } from "../components/Input";
import { Physics } from "../components/Physics";
import { Transform } from "../components/Transform";
import { System } from "../core/System";

export class InputSystem extends System {
  update() {
    const input = this.game.services.input.state;
    const player = this.game.entities.find((e) => e.getComponent(Input));

    if (!player) return;

    const inputComponent = player.getComponent(Input);
    const physics = player.getComponent(Physics);

    inputComponent.keys.ArrowLeft = input.moveLeft;
    inputComponent.keys.ArrowRight = input.moveRight;
    inputComponent.keys.ArrowUp = input.jump;

    if (inputComponent.keys.ArrowLeft) {
      physics.xAcc = -0.003;
    } else if (inputComponent.keys.ArrowRight) {
      physics.xAcc = 0.003;
    } else {
      physics.xAcc = 0;
      physics.xSpeed = 0;
    }

    if (inputComponent.keys.ArrowUp) {
      const transform = player.getComponent(Transform);

      const colliders = this.game.entities.filter(
        (e) => e.getComponent(Collider) && e != player,
      );

      const a = colliders
        .filter(
          (obj) =>
            transform.x + transform.width > obj.getComponent(Transform).x &&
            transform.x <
              obj.getComponent(Transform).x +
                obj.getComponent(Transform).width &&
            transform.y >=
              obj.getComponent(Transform).y +
                obj.getComponent(Transform).height,
        )
        .map((obj) => {
          console.log(obj);
          return Math.abs(
            transform.y -
              (obj.getComponent(Transform).y +
                obj.getComponent(Transform).height),
          );
        })
        .sort((a, b) => a - b)[0];
      if (a < 0.5) {
        physics.ySpeed = 0.5;
      }
    }
  }
}
