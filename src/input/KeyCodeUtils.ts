import { KeyCode, KeyCodes } from "./KeysTypes";

export function isKeyCode(value: string): value is KeyCode {
  return Object.values(KeyCodes).includes(value as KeyCode);
}
