import { Entity } from "../core/Entity";
import { Camera } from "./Camera";

export class CameraEntity extends Entity {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 100,
    public height: number = 100,
    public followSpeed: number = 1000,
    public target?: Entity,
  ) {
    super();
    this.addComponent(new Camera(x, y, width, height, followSpeed, target));
  }
}
