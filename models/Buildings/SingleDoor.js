import paper from "paper";
import {Building} from "../Building";

export class SingleDoor extends Building {
  _rotateCase = [
    [-1, -1, 1, -1, -1, 1, 1, 1, -1, 1],
    [-1, 1, -1, 1, -1, 1, 1, -1, 1, 1],
    [1, 1, -1, 1, 1, -1, -1, -1, 1, -1],
    [1, -1, 1, -1, 1, -1, -1, 1, -1, -1],
  ]

  get linkPoint() {
    if (this.rotateCoefficient === 0) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y + this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 1) {
      return {
        pointLeft: {x: this.x + this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 2) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y - this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 3) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x - this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    }
  }

  constructor(x, y, height, width, treeName, rotateCoefficient) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Одностворчатая дверь';
    this.treeIcon = 'SingleDoor';
    this.rotateCoefficient = rotateCoefficient ? +rotateCoefficient : 0;
  }

  get rotateCase() {
    return this._rotateCase[this.rotateCoefficient]
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject({fieldPosition}) {
    let door = new paper.Path.Arc(
      new paper.Point((this.x + fieldPosition.x) + this.width / 2 * this.rotateCase[0], (this.y + fieldPosition.y) + this.height / 2 * this.rotateCase[1]),
      new paper.Point(Math.sqrt(2) / 2 * this.height * this.rotateCase[2] + (this.x + fieldPosition.x) + this.width / 2 * this.rotateCase[3], Math.sqrt(2) / 2 * this.height * this.rotateCase[4] + (this.y + fieldPosition.y) + this.height / 2 * this.rotateCase[5]),
      new paper.Point((this.x + fieldPosition.x) + this.width / 2 * this.rotateCase[6], (this.y + fieldPosition.y) + this.height / 2 * this.rotateCase[7])
    );

    door.add(new paper.Point(this.x + this.width / 2 * this.rotateCase[8], this.y + this.height / 2 * this.rotateCase[9]));
    door.add(new paper.Point(this.x + this.width / 2 * this.rotateCase[0], this.y + this.height / 2 * this.rotateCase[1]));
    door.fillColor = '#ffffff';
    door.strokeColor = '#000000';
    door.strokeWidth = '3';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 1.5, this.y - this.height / 2 - 1.5),
      new paper.Point(this.x + this.width / 2 + 1.5, this.y + this.height / 2 + 1.5)
    );

    path.strokeWidth = '3';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    this.rotateCoefficient = (this.rotateCoefficient + 1) % 4;
  }

  linkHoverEffect(cursorX, cursorY) {
    if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointRight.x, 2) + Math.pow(cursorY - this.linkPoint.pointRight.y, 2)) < this.linkPoint.pointRight.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointRight.x, this.linkPoint.pointRight.y), this.linkPoint.pointRight.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointRight;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointLeft.x, 2) + Math.pow(cursorY - this.linkPoint.pointLeft.y, 2)) < this.linkPoint.pointLeft.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointLeft.x, this.linkPoint.pointLeft.y), this.linkPoint.pointLeft.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointLeft;
    }

    return false;
  }
}
