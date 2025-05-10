import { Entity } from "../core/Entity";
import { Position } from "../position/Position";
import { Camera } from "./Camera";

export class CameraEntity extends Entity {
  constructor(
    public followSpeed?: number,
    public target?: Entity,
  ) {
    super();
    this.addComponent(new Camera(followSpeed, target));
    this.addComponent(new Position(0, 0));
  }
}
