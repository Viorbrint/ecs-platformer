import { Position } from "../position/Position";

export interface IRenderService {
  setCamera(camera: Position): void;
  worldToScreen(x: number, y: number): { x: number; y: number };
  // dont think this is a good idea
  invertY(y: number): void;
}
