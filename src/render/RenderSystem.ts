import { Game } from "../core/Game";
import { System } from "../core/System";
import { Position } from "../position/Position";
import { Transform } from "../transform/Transform";
import { Renderable } from "./Renderable";

export class RenderSystem extends System {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(game: Game, canvasId: string) {
    super(game);
    const canvas = document.getElementById(canvasId);
    if (canvas == null || canvas instanceof HTMLCanvasElement === false) {
      throw new Error(
        "Renderer: Could not get canvas element or is not a canvas",
      );
    }
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (ctx == null) {
      throw new Error("Renderer: Could not get canvas context");
    }
    this.ctx = ctx;
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  update() {
    this.clear();

    this.query(Transform, Renderable).forEach((entity) => {
      const t = entity.getComponent(Transform)!;
      const p = entity.getComponent(Position)!;
      const renderable = entity.getComponent(Renderable)!;

      this.ctx.fillStyle = renderable.color;
      this.drawRect(p.x, p.y, t.width, t.height, "red");
    });
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, this.canvas.height - y - height, width, height);
  }
}
