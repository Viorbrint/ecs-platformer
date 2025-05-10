import { Position } from "../position/Position";
import { Color } from "../utils/Color";

export interface IRenderService {
  clear(): void;
  setCamera(camera: Position): void;
  worldToScreen(x: number, y: number): { x: number; y: number };
  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color,
  ): void;
}
