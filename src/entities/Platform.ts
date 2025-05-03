import { Entity } from "../core/Entity.js";
import { Transform } from "../components/Transform.js";
import { Renderable } from "../components/Renderable.js";
import { Collider } from "../components/Collider.js";

export class Platform extends Entity {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.addComponent(new Transform(x, y, width, height));
    this.addComponent(new Renderable("red"));
    this.addComponent(new Collider());
  }
}
