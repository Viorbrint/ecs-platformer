import { CameraBuilder } from "../camera/CameraBuilder";
import { PlatformBuilder } from "../platform/PlatformBuilder";
import { PlayerBuilder } from "../player/PlayerBuilder";
import { Color } from "../utils/Color";
import { Entity } from "./Entity";
import { Game } from "./Game";

export type PlatformConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: Color;
};

export class LevelManager {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public loadDefaultLevel(): void {
    const player = this.createPlayer(300, 500, Color.MAGENTA);
    this.createPlatforms([
      { x: 0, y: 0, width: 500, height: 100, color: Color.GREEN },
      { x: 600, y: 0, width: 200, height: 200, color: Color.RED },
      { x: 800, y: 0, width: 200, height: 100, color: Color.BLUE },
      { x: 900, y: 200, width: 200, height: 100, color: Color.YELLOW },
      { x: 1100, y: 0, width: 2000, height: 100, color: Color.GRAY },
    ]);

    this.setupCamera(player);
  }

  private createPlayer(x: number, y: number, color: Color): Entity {
    return this.game.addEntity(new PlayerBuilder(x, y, color).build());
  }

  private createPlatforms(platforms: PlatformConfig[]): void {
    platforms.forEach((p) => {
      this.game.addEntity(
        new PlatformBuilder(p.x, p.y, p.width, p.height, p.color).build(),
      );
    });
  }

  private setupCamera(target: Entity): void {
    this.game.addEntity(new CameraBuilder(target).build());
  }
}
