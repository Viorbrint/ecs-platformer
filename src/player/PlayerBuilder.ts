import { Collider } from "../collision/Collider";
import { EntityBuilder } from "../core/EntityBuilder";
import { Jump } from "../jump/Jump";
import { Physics } from "../physics/Physics";
import { Position } from "../position/Position";
import { RectPrimitive } from "../render/RectPrimitive";
import { Transform } from "../transform/Transform";
import { Color } from "../utils/Color";
import { PlayerInput } from "./PlayerInput";
import { PlayerMove } from "./PlayerMove";
import { PlayerTag } from "./PlayerTag";

export class PlayerBuilder extends EntityBuilder {
  constructor(x: number, y: number, color: Color) {
    super();
    this.add(new PlayerTag())
      .add(new PlayerInput())
      .add(new Jump())
      .add(new PlayerMove())
      .add(new Physics())
      .add(new Transform(40, 60))
      .add(new Position(x, y))
      .add(new Collider())
      .add(new RectPrimitive(color));
  }
}
