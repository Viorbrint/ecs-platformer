import { System } from "../core/System";
import { Position } from "../position/Position";
import { Camera } from "./Camera";
import { RenderService } from "../render/RenderService";
import { Game } from "../core/Game";
import { RENDER_SERVICE, ServiceContainer } from "../core/ServiceContainer";

export class CameraSystem extends System {
  private readonly renderService: RenderService;
  constructor(game: Game) {
    super(game);
    this.renderService = ServiceContainer.getInstance().resolve(RENDER_SERVICE);
  }

  update() {
    const cameras = this.query(Camera);

    if (cameras.length === 0) return;

    const camera = cameras[0].getComponent(Camera)!;

    if (camera.target) {
      const targetPos = camera.target.getComponent(Position);
      // camera looks for left bottom corner of target pos
      if (targetPos) {
        camera.x +=
          (targetPos.x - camera.x - camera.width / 2) * camera.followSpeed;
        camera.y +=
          (targetPos.y - camera.y - camera.height / 3) * camera.followSpeed;
      }
    }

    this.renderService.setCamera(camera);
  }
}
