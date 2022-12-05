import paper from "paper";
import {Building} from "../Building";

export class DoubleDoor extends Building {
  _rotateCase = [
    [-1, -1, 1, -1, -1, 1, 1, 1, -1, 1],
    [-1, 1, -1, 1, -1, 1, 1, -1, 1, 1],
    [1, 1, -1, 1, 1, -1, -1, -1, 1, -1],
    [1, -1, 1, -1, 1, -1, -1, 1, -1, -1],
  ]

  constructor(x, y, height, width, treeName, rotateCoefficient) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Двустворчатая дверь';
    this.treeIcon = 'DoubleDoor';
    this.rotateCoefficient = rotateCoefficient ? +rotateCoefficient : 0;
  }

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

  get rotateCase() {
    return [this._rotateCase[this.rotateCoefficient], this._rotateCase[(this.rotateCoefficient + 1) % 4]];
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject({fieldPosition}) {
    const x1 = (this.x + fieldPosition.x) - this.width / 4 * (this.rotateCoefficient % 2 === 0) * (-1 * +(this.rotateCoefficient === 2) + +(this.rotateCoefficient === 0));
    const x2 = (this.x + fieldPosition.x) + this.width / 4 * (this.rotateCoefficient % 2 === 0) * (-1 * +(this.rotateCoefficient === 2) + +(this.rotateCoefficient === 0));
    const y1 = (this.y + fieldPosition.y) + this.height / 4  * (this.rotateCoefficient % 2 === 1) * (-1 * +(this.rotateCoefficient === 3) + +(this.rotateCoefficient === 1));
    const y2 = (this.y + fieldPosition.y) - this.height / 4  * (this.rotateCoefficient % 2 === 1) * (-1 * +(this.rotateCoefficient === 3) + +(this.rotateCoefficient === 1));

    if (this.rotateCoefficient === 0 || this.rotateCoefficient === 2) {
      let door = new paper.Path.Arc(
        new paper.Point(x1 + this.width / 4 * this.rotateCase[0][0], y1 + this.height / 2 * this.rotateCase[0][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.height * this.rotateCase[0][2] + (x1 + this.width / 4 * this.rotateCase[0][3]), Math.sqrt(2) / 2 * this.height * this.rotateCase[0][4] + y1 + this.height / 2 * this.rotateCase[0][5]),
        new paper.Point(x1 + this.width / 4  * this.rotateCase[0][6], y1 + this.height / 2 * this.rotateCase[0][7])
      );

      door.add(new paper.Point(x1 + this.width / 4  * this.rotateCase[0][8], y1+ this.height / 2  * this.rotateCase[0][9]));
      door.add(new paper.Point(x1 + this.width / 4 * this.rotateCase[0][0], y1 + this.height / 2 * this.rotateCase[0][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';

      door = new paper.Path.Arc(
        new paper.Point(x2 + this.width / 4 * this.rotateCase[1][0], y2 + this.height / 2 * this.rotateCase[1][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.height * this.rotateCase[1][2] + (x2 + this.width / 4 * this.rotateCase[1][3]), Math.sqrt(2) / 2 * this.height * this.rotateCase[1][4] + y2 + this.height / 2 * this.rotateCase[1][5]),
        new paper.Point(x2 + this.width / 4  * this.rotateCase[1][6], y2 + this.height / 2 * this.rotateCase[1][7])
      );

      door.add(new paper.Point(x2 + this.width / 4  * this.rotateCase[1][8], y2+ this.height / 2  * this.rotateCase[1][9]));
      door.add(new paper.Point(x2 + this.width / 4 * this.rotateCase[1][0], y2 + this.height / 2 * this.rotateCase[1][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';
    } else {
      let door = new paper.Path.Arc(
        new paper.Point(x1 + this.width / 2 * this.rotateCase[0][0], y1 + this.height / 4 * this.rotateCase[0][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.width * this.rotateCase[0][2] + (x1 + this.width / 2 * this.rotateCase[0][3]), Math.sqrt(2) / 2 * this.width * this.rotateCase[0][4] + y1 + this.height / 4 * this.rotateCase[0][5]),
        new paper.Point(x1 + this.width / 2  * this.rotateCase[0][6], y1 + this.height / 4 * this.rotateCase[0][7])
      );

      door.add(new paper.Point(x1 + this.width / 2 * this.rotateCase[0][8], y1 + this.height / 4 * this.rotateCase[0][9]));
      door.add(new paper.Point(x1 + this.width / 2 * this.rotateCase[0][0], y1 + this.height / 4 * this.rotateCase[0][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';

      door = new paper.Path.Arc(
        new paper.Point(x2 + this.width / 2 * this.rotateCase[1][0], y2 + this.height / 4 * this.rotateCase[1][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.width * this.rotateCase[1][2] + (x2 + this.width / 2 * this.rotateCase[1][3]), Math.sqrt(2) / 2 * this.width * this.rotateCase[1][4] + y2 + this.height / 4 * this.rotateCase[1][5]),
        new paper.Point(x2 + this.width / 2  * this.rotateCase[1][6], y2 + this.height / 4 * this.rotateCase[1][7])
      );

      door.add(new paper.Point(x2 + this.width / 2  * this.rotateCase[1][8], y2 + this.height / 4  * this.rotateCase[1][9]));
      door.add(new paper.Point(x2 + this.width / 2 * this.rotateCase[1][0], y2 + this.height / 4 * this.rotateCase[1][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';
    }
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
    [this.height, this.width] = [this.width, this.height];
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
