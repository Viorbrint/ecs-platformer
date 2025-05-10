import { System } from "../core/System";
import { Position } from "../position/Position";
import { Camera } from "./Camera";
import { RenderService } from "../render/RenderService";
import { Game } from "../core/Game";

export class CameraSystem extends System {
  constructor(
    game: Game,
    private readonly renderService: RenderService,
  ) {
    super(game);
  }

  update() {
    const cameras = this.query(Camera);

    if (cameras.length === 0) return;

    const camera = cameras[0].getComponent(Camera)!;
    console.log(cameras);

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
