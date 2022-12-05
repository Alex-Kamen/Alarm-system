import paper from "paper";
import {Building} from "../Building";

export class Wall extends Building {
  constructor(path, width, treeName) {
    super();
    this.settings.pop();
    this.path = path;
    this.width = width;
    this.treeName = treeName ? treeName : 'Стена';
    this.treeIcon = 'Wall';
  }

  isHover(cursorX, cursorY) {
    let minX = this.path[0].x;
    let minY = this.path[0].y;
    let maxX = this.path[0].x;
    let maxY = this.path[0].y;

    this.path.forEach((point) => {
      if (point.x > maxX) {
        maxX = point.x;
      }

      if (point.x < minX) {
        minX = point.x;
      }

      if (point.y > maxY) {
        maxY = point.y;
      }

      if (point.y < minY) {
        minY = point.y;
      }
    })

    return minX <= cursorX && minY <= cursorY && maxX >= cursorX && maxY >= cursorY;
  }

  drawObject({fieldPosition}) {
    let path = new paper.Path();
    this.path.forEach((point) => path.add(new paper.Point((this.x + fieldPosition.x), (this.y + fieldPosition.y))));

    path.strokeColor = 'black';
    path.strokeWidth = this.width;
  }

  hoverEffect() {
    let path = new paper.Path();
    this.path.forEach((point) => path.add(new paper.Point(point.x, point.y)));

    path.strokeColor = '#101165';
    path.strokeWidth = this.width + 5;
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.path.forEach((point) => {
      point.x += currentX - prevX;
      point.y += currentY - prevY;
    })
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    //[this.height, this.width] = [this.width, this.height];
  }
}
