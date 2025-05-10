import { GameAction } from "./GameAction";
import { IInputService } from "./IInputService";
import { isKeyCode } from "./KeyCodeUtils";
import { KeyBindings, KeyCode, KeyCodes } from "./KeysTypes";

type KeyState = {
  isPressed: boolean;
  justPressed: boolean;
  justReleased: boolean;
};

export class InputService implements IInputService {
  private defaultBindings: KeyBindings = {
    jump: KeyCodes.ARROW_UP,
    moveLeft: KeyCodes.ARROW_LEFT,
    moveRight: KeyCodes.ARROW_RIGHT,
  };
  private keyStates: Map<string, KeyState>;
  private keyBindings: KeyBindings;
  private handlers: {
    keydown: (e: KeyboardEvent) => void;
    keyup: (e: KeyboardEvent) => void;
  };

  constructor(customBindings: KeyBindings = {}) {
    this.keyBindings = { ...this.defaultBindings, ...customBindings };

    this.keyStates = new Map();
    this.handlers = {
      keydown: (e) => this.handleKey(e, true),
      keyup: (e) => this.handleKey(e, false),
    };

    this.setupEventListeners();
  }

  private setupEventListeners() {
    window.addEventListener("keydown", this.handlers.keydown);
    window.addEventListener("keyup", this.handlers.keyup);
  }

  private handleKey(event: KeyboardEvent, isPressed: boolean) {
    const key = event.code;

    if (isPressed && !isKeyCode(key)) {
      // console.log("Not a key code: " + key);
      return;
    }

    const currentState = this.keyStates.get(key) || this.createKeyState();

    this.keyStates.set(key, {
      isPressed,
      justPressed: isPressed && !currentState.isPressed,
      justReleased: !isPressed && currentState.isPressed,
    });
  }

  private createKeyState(): KeyState {
    return { isPressed: false, justPressed: false, justReleased: false };
  }

  // Основные методы API
  isActionPressed(action: GameAction): boolean {
    const key = this.keyBindings[action];
    return key ? (this.keyStates.get(key)?.isPressed ?? false) : false;
  }

  isActionJustPressed(action: GameAction): boolean {
    const key = this.keyBindings[action];
    return key ? (this.keyStates.get(key)?.justPressed ?? false) : false;
  }

  // Для систем, которым нужно сырое состояние клавиш
  isKeyPressed(keyCode: KeyCode): boolean {
    return this.keyStates.get(keyCode)?.isPressed ?? false;
  }

  // Очистка (вызывать при уничтожении игры)
  destroy() {
    window.removeEventListener("keydown", this.handlers.keydown);
    window.removeEventListener("keyup", this.handlers.keyup);
    this.keyStates.clear();
  }

  // Динамическое изменение привязок
  rebindAction(action: GameAction, newKey: KeyCode) {
    this.keyBindings[action] = newKey;
  }

  // Обновление состояния (вызывать в начале каждого кадра)
  update() {
    // Сбрасываем флаги "just" состояний
    this.keyStates.forEach((state) => {
      state.justPressed = false;
      state.justReleased = false;
    });
  }
}
