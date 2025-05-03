const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
};

window.addEventListener("keydown", (e) => {
  if (e.key in keys) {
    keys[e.key] = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key in keys) {
    keys[e.key] = false;
  }
});

prev = 0;
function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (keys.ArrowLeft) {
    mario.goLeft();
  } else if (keys.ArrowRight) {
    mario.goRight();
  } else {
    mario.stop();
  }
  if (keys.ArrowUp) {
    mario.jump();
  }

  mario.update(time - prev);

  mario.draw();
  rects.forEach((rect) => {
    rect.draw();
  });
  requestAnimationFrame(animate);
  prev = time;
}

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x,
      canvas.height - this.y - this.height,
      this.width,
      this.height,
    );
  }
}

class Mario extends Rect {
  xSpeed = 0;
  XMAXSPEED = 0.3;
  XGOACC = 0.003;
  ySpeed = 0;
  YACC = -0.001;
  xAcc = 0;

  constructor(x, y, width, height, colliders) {
    super(x, y, width, height);
    this.colliders = colliders || [];
  }

  collideAll() {
    this.colliders.forEach((collider) => {
      this.collide(collider);
    });
  }

  collide(obj) {
    if (
      this.x + this.width > obj.x &&
      this.x < obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    ) {
      const topCollision = Math.abs(this.y + this.height - obj.y);
      const bottomCollision = Math.abs(this.y - (obj.y + obj.height));
      const leftCollision = Math.abs(this.x + this.width - obj.x);
      const rightCollision = Math.abs(this.x - (obj.x + obj.width));

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision,
      );

      if (minCollision === topCollision) {
        this.y = obj.y - this.height;
        this.ySpeed = 0;
      } else if (minCollision === bottomCollision) {
        this.y = obj.y + obj.height;
        this.ySpeed *= -0.2;
      } else if (minCollision === leftCollision) {
        this.x = obj.x - this.width;
        this.xSpeed = 0;
      } else if (minCollision === rightCollision) {
        this.x = obj.x + obj.width;
        this.xSpeed = 0;
      }
    }
  }

  update(time) {
    if (time == undefined) {
      throw new Error("time is required");
    }
    this.ySpeed += this.YACC * time;
    this.updateXSpeed(this.xSpeed + this.xAcc * time);
    this.x += this.xSpeed * time;
    this.y += this.ySpeed * time;
    this.collideAll();
    // console.log(this.x, this.y);
    // console.log(this.xSpeed, this.ySpeed);
  }

  updateXSpeed(newSpeed) {
    if (newSpeed > 0 && newSpeed > this.XMAXSPEED) {
      this.xSpeed = this.XMAXSPEED;
    } else if (newSpeed < 0 && newSpeed < -this.XMAXSPEED) {
      this.xSpeed = -this.XMAXSPEED;
    } else {
      this.xSpeed = newSpeed;
    }
  }

  goLeft() {
    this.xAcc = -this.XGOACC;
  }

  goRight() {
    this.xAcc = this.XGOACC;
  }

  stop() {
    this.xAcc = 0;
    this.xSpeed = 0;
  }

  jump() {
    const a = this.getUnderColiders()
      .map((obj) => {
        return Math.abs(this.y - (obj.y + obj.height));
      })
      .sort((a, b) => a - b)[0];
    if (a < 0.5) {
      this.ySpeed = 0.5;
    }
  }

  getUnderColiders() {
    return this.colliders.filter(
      (obj) =>
        this.x + this.width > obj.x &&
        this.x < obj.x + obj.width &&
        this.y >= obj.y + obj.height,
    );
  }
}

const rects = [];
rects.push(new Rect(0, 0, 500, 100));
rects.push(new Rect(600, 0, 200, 200));
rects.push(new Rect(800, 0, 200, 100));
rects.push(new Rect(700, 400, 200, 100));

const mario = new Mario(300, 300, 40, 60, rects);

animate(0);
