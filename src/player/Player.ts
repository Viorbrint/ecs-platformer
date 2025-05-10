import { Collider } from "../collision/Collider.js";
import { Entity } from "../core/Entity.js";
import { Jump } from "../jump/Jump.js";
import { Physics } from "../physics/Physics.js";
import { Renderable } from "../render/Renderable.js";
import { Transform } from "../transform/Transform.js";
import { PlayerInput } from "./PlayerInput.js";
import { PlayerMove } from "./PlayerMove.js";

export class Player extends Entity {
  constructor(x: number, y: number) {
    super();
    this.addComponent(new PlayerInput());
    this.addComponent(new Jump());
    this.addComponent(new PlayerMove());
    this.addComponent(new Physics());
    this.addComponent(new Transform(x, y, 40, 60));
    this.addComponent(new Collider());
    this.addComponent(new Renderable("blue"));
  }
}
