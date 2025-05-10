import { Position } from "../position/Position";
import { Color } from "../utils/Color";

export class RenderService {
  private currentCamera?: Position;
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

  drawRect(x: number, y: number, width: number, height: number, color: Color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, this.invertY(y) - height, width, height);
  }

  setCamera(camera: Position) {
    this.currentCamera = camera;
  }

  worldToScreen(x: number, y: number): { x: number; y: number } {
    if (!this.currentCamera) {
      return { x, y: this.invertY(y) };
    }

    return {
      x: x - this.currentCamera.x,
      y: y - this.currentCamera.y,
    };
  }

  private invertY(y: number) {
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
