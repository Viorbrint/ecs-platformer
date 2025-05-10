import { Component } from "../core/Component";
import { Entity } from "../core/Entity";

export class Camera extends Component {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 100,
    public height: number = 100,
    public followSpeed: number = 0.05,
    public target?: Entity,
  ) {
    super();
  }
}
