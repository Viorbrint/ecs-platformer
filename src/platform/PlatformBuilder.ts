import { Collider } from "../collision/Collider";
import { EntityBuilder } from "../core/EntityBuilder";
import { Position } from "../position/Position";
import { RectPrimitive } from "../render/RectPrimitive";
import { Transform } from "../transform/Transform";
import { Color } from "../utils/Color";

export class PlatformBuilder extends EntityBuilder {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color,
  ) {
    super();
    this.add(new Transform(width, height))
      .add(new Position(x, y))
      .add(new RectPrimitive(color))
      .add(new Collider());
  }
}
