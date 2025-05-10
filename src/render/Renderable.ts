import { Component } from "../core/Component";

export class Renderable extends Component {
  color: string;
  constructor(color: string) {
    super();
    this.color = color;
  }
}
