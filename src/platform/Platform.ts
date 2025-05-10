import { Collider } from "../collision/Collider.js";
import { Entity } from "../core/Entity.js";
import { Position } from "../position/Position.js";
import { RectPrimitive } from "../render/RectPrimitive.js";
import { Transform } from "../transform/Transform.js";

export class Platform extends Entity {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.addComponent(new Transform(width, height));
    this.addComponent(new Position(x, y));
    this.addComponent(new RectPrimitive("red"));
    this.addComponent(new Collider());
  }
}
