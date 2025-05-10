import { Component } from "../core/Component";
import { Entity } from "../core/Entity";

export class Camera extends Component {
  constructor(
    public followSpeed: number = 0.05,
    public target?: Entity,
  ) {
    super();
  }
}
