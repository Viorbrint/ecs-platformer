import { Entity } from "../core/Entity";
import { EntityBuilder } from "../core/EntityBuilder";
import { Position } from "../position/Position";
import { Camera } from "./Camera";

export class CameraBuilder extends EntityBuilder {
  constructor(target?: Entity, followSpeed?: number) {
    super();
    this.add(new Camera(followSpeed, target)).add(new Position(0, 0));
  }
}
