import { Position } from "../position/Position";
import { Transform } from "../transform/Transform";
import { RenderSystem } from "./BaseRenderSystem";
import { RectPrimitive } from "./RectPrimitive";

export class RectRenderSystem extends RenderSystem {
  render() {
    // it will work if only rects in game
    this.renderService.clear();
    this.query(RectPrimitive, Position, Transform).forEach((e) => {
      const { color } = e.getComponent(RectPrimitive)!;
      const { x, y } = e.getComponent(Position)!;
      const { width, height } = e.getComponent(Transform)!;
      const ctx = this.renderService.context;
      ctx.fillStyle = color;
      ctx.fillRect(x, this.renderService.invertY(y) - height, width, height);
    });
  }
}
