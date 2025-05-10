import { Component } from "../core/Component";
import { Color } from "../utils/Color";

export class RectPrimitive extends Component {
  constructor(public color: Color) {
    super();
  }
}
