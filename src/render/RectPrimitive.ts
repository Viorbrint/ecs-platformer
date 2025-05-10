import { Component } from "../core/Component";

export class RectPrimitive extends Component {
  color: string;
  constructor(color: string) {
    super();
    this.color = color;
  }
}
