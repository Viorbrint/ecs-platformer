import { GameAction } from "./GameAction";
import { KeyCode } from "./KeysTypes";

export interface IInputService {
  isKeyPressed(keyCode: string): boolean;
  isActionPressed(action: GameAction): boolean;
  isActionJustPressed(action: GameAction): boolean;
  destroy(): void;
  rebindAction(action: GameAction, newKey: KeyCode): void;
  update(): void;
}
