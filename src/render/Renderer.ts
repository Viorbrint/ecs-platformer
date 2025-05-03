export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvasId: string) {
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
