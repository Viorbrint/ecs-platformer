type KeyBindings = Record<string, string>;
type KeyState = {
  isPressed: boolean;
  justPressed: boolean;
  justReleased: boolean;
};

export class InputService {
  private keyStates: Map<string, KeyState>;
  private keyBindings: KeyBindings;
  private handlers: {
    keydown: (e: KeyboardEvent) => void;
    keyup: (e: KeyboardEvent) => void;
  };

  constructor(bindings: KeyBindings = {}) {
    this.keyBindings = {
      jump: "ArrowUp",
      moveLeft: "ArrowLeft",
      moveRight: "ArrowRight",
      ...bindings,
    };

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
    const currentState = this.keyStates.get(key) || this.createKeyState();

    // Обновляем состояние с учетом предыдущего кадра
    this.keyStates.set(key, {
      isPressed,
      justPressed: isPressed && !currentState.isPressed,
      justReleased: !isPressed && currentState.isPressed,
    });

    // Предотвращаем "распространение" стандартных действий браузера
    if (isPressed && Object.values(this.keyBindings).includes(key)) {
      event.preventDefault();
    }
  }

  private createKeyState(): KeyState {
    return { isPressed: false, justPressed: false, justReleased: false };
  }

  // Основные методы API
  isActionPressed(action: string): boolean {
    const key = this.keyBindings[action];
    return key ? (this.keyStates.get(key)?.isPressed ?? false) : false;
  }

  isActionJustPressed(action: string): boolean {
    const key = this.keyBindings[action];
    return key ? (this.keyStates.get(key)?.justPressed ?? false) : false;
  }

  // Для систем, которым нужно сырое состояние клавиш
  isKeyPressed(keyCode: string): boolean {
    return this.keyStates.get(keyCode)?.isPressed ?? false;
  }

  // Очистка (вызывать при уничтожении игры)
  destroy() {
    window.removeEventListener("keydown", this.handlers.keydown);
    window.removeEventListener("keyup", this.handlers.keyup);
    this.keyStates.clear();
  }

  // Динамическое изменение привязок
  rebindAction(action: string, newKey: string) {
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
