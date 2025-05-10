import { System } from "../core/System";
import { Position } from "../position/Position";
import { Camera } from "./Camera";
import { Game } from "../core/Game";
import { RENDER_SERVICE, ServiceContainer } from "../core/ServiceContainer";
import { IRenderService } from "../render/IRenderService";

export class CameraSystem extends System {
  private readonly renderService: IRenderService;
  constructor(game: Game) {
    super(game);
    this.renderService = ServiceContainer.getInstance().resolve(RENDER_SERVICE);
  }

  update() {
    const cameras = this.query(Camera, Position);

    if (cameras.length === 0) return;

    const camera = cameras[0].getComponent(Camera)!;
    const cameraPos = cameras[0].getComponent(Position)!;

    if (camera.target) {
      const targetPos = camera.target.getComponent(Position);
      // camera looks for left bottom corner of target pos
      if (targetPos) {
        cameraPos.x +=
          (targetPos.x - cameraPos.x - this.renderService.width / 2) *
          camera.followSpeed;
        cameraPos.y +=
          (targetPos.y - cameraPos.y - this.renderService.height / 3) *
          camera.followSpeed;
      }
    }

    this.renderService.setCamera(cameraPos);
  }
}
