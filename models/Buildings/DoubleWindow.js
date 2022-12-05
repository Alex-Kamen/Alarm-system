import paper from "paper";
import {Building} from "../Building";

export class DoubleWindow extends Building {
  constructor(x, y, height, width, treeName, rotateCoefficient) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Двустворчатое окно';
    this.treeIcon = 'DoubleWindow';
    this.rotateCoefficient = rotateCoefficient ? +rotateCoefficient : 0;
  }

  get linkPoint() {
    if (this.rotateCoefficient === 0) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y, radius: 5},
      }
    } else if (this.rotateCoefficient === 1) {
      return {
        pointLeft: {x: this.x, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x, y: this.y + this.height / 2, radius: 5},
      }
    }
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject({fieldPosition}) {
    if (this.rotateCoefficient === 0) {
      let path = new paper.Path.Rectangle(
        new paper.Point((this.x + fieldPosition.x) + this.width / 2, (this.y + fieldPosition.y) + this.height / 2),
        new paper.Point((this.x + fieldPosition.x), (this.y + fieldPosition.y) - this.height / 2)
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';

      path = new paper.Path.Rectangle(
        new paper.Point((this.x + fieldPosition.x), (this.y + fieldPosition.y) + this.height / 2),
        new paper.Point((this.x + fieldPosition.x) - this.width / 2, (this.y + fieldPosition.y) - this.height / 2)
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';
    } else {
      let path = new paper.Path.Rectangle(
        new paper.Point(this.x + this.width / 2, this.y + this.height / 2),
        new paper.Point(this.x - this.width / 2, this.y)
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';

      path = new paper.Path.Rectangle(
        new paper.Point((this.x + fieldPosition.x) - this.width / 2, (this.y + fieldPosition.y) - this.height / 2),
        new paper.Point((this.x + fieldPosition.x) + this.width / 2, (this.y + fieldPosition.y))
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';
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
    this.rotateCoefficient = (this.rotateCoefficient + 1) % 2;
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
