import { Collider } from "../collision/Collider.js";
import { Entity } from "../core/Entity.js";
import { Renderable } from "../render/Renderable.js";
import { Transform } from "../transform/Transform.js";

export class Platform extends Entity {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.addComponent(new Transform(x, y, width, height));
    this.addComponent(new Renderable("red"));
    this.addComponent(new Collider());
  }
}
