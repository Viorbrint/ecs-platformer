import { Game } from "../core/Game";
import { System } from "../core/System";

export class RenderSystem extends System {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(game: Game, canvasId: string) {
    super(game);
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.game.entities.forEach((entity) => {
      const transform = entity.getComponent(Transform);
      const renderable = entity.getComponent(Renderable);

      if (transform && renderable) {
        this.ctx.fillStyle = renderable.color;
        this.ctx.fillRect(
          transform.x,
          this.canvas.height - transform.y - transform.height,
          transform.width,
          transform.height,
        );
      }
    });
  }
}
