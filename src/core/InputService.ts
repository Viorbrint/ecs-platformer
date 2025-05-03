export class InputService {
  state = {
    moveLeft: false,
    moveRight: false,
    jump: false,
  };
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));
  }

  handleKey(e: KeyboardEvent, isPressed: boolean) {
    switch (e.key) {
      case "ArrowLeft":
        this.state.moveLeft = isPressed;
        break;
      case "ArrowRight":
        this.state.moveRight = isPressed;
        break;
      case "ArrowUp":
        this.state.jump = isPressed;
        break;
    }
  }
}
