export class RenderService {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId);
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(`Canvas with id "${canvasId}" not found`);
    }

    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    this.ctx = ctx;

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  invertY(y: number) {
    return this.height - y;
  }

  get context() {
    return this.ctx;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
