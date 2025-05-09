import { Component } from "../core/Component";

export class Physics extends Component {
  xSpeed = 0;
  ySpeed = 0;
  xAcc = 0;
  yAcc = -2000;
  maxXSpeed = 3000;
}
