import { Entity } from "../core/Entity.js";
import { Transform } from "../components/Transform.js";
import { Physics } from "../components/Physics.js";
import { Collider } from "../components/Collider.js";
import { Renderable } from "../components/Renderable.js";
import { Input } from "../components/Input.js";

export class Mario extends Entity {
  constructor(x: number, y: number) {
    super();
    this.addComponent(new Transform(x, y, 40, 60));
    this.addComponent(new Physics());
    this.addComponent(new Collider());
    this.addComponent(new Renderable("blue"));
    this.addComponent(new Input());
  }
}
