import { Entity } from "../core/Entity.js";
import { Transform } from "../components/Transform.js";
import { Physics } from "../components/Physics.js";
import { Collider } from "../components/Collider.js";
import { Renderable } from "../components/Renderable.js";
import { PlayerInput } from "../components/PlayerInput.js";
import { Jump } from "../components/Jump.js";
import { PlayerMove } from "../components/PlayerMove.js";

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
