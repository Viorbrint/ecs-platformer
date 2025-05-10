import { Position } from "../position/Position";
import { Transform } from "../transform/Transform";
import { RenderSystem } from "./BaseRenderSystem";
import { RectPrimitive } from "./RectPrimitive";

export class RectRenderSystem extends RenderSystem {
  render() {
    this.renderService.clear();

    this.query(RectPrimitive, Position, Transform).forEach((e) => {
      const { color } = e.getComponent(RectPrimitive)!;
      const { x, y } = e.getComponent(Position)!;
      const { width, height } = e.getComponent(Transform)!;

      const screenPos = this.renderService.worldToScreen(x, y);

      const ctx = this.renderService.context;
      ctx.fillStyle = color;
      ctx.fillRect(
        screenPos.x,
        this.renderService.invertY(screenPos.y) - height,
        width,
        height,
      );
    });
  }
}
