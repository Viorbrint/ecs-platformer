import { Renderable } from "../components/Renderable";
import { Transform } from "../components/Transform";
import { Game } from "../core/Game";
import { System } from "../core/System";

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

    this.game.entities.forEach((entity) => {
      const transform = entity.getComponent(Transform);
      const renderable = entity.getComponent(Renderable);

      if (transform && renderable) {
        this.ctx.fillStyle = renderable.color;
        this.drawRect(
          transform.x,
          transform.y,
          transform.width,
          transform.height,
          "red",
        );
      }
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
