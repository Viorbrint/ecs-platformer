import { GameAction } from "./GameAction";

export const KeyCodes = {
  SPACE: "Space",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  KEY_W: "KeyW",
  KEY_A: "KeyA",
  KEY_S: "KeyS",
  KEY_D: "KeyD",
  SHIFT_LEFT: "ShiftLeft",
} as const;

export type KeyCode = (typeof KeyCodes)[keyof typeof KeyCodes];
export type KeyBindings = Partial<Record<GameAction, KeyCode>>;
