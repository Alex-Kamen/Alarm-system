import paper from "paper";
import {Sensor} from "../Sensor";

export class Wire extends Sensor {
  constructor(path, color, treeName) {
    super();
    this.path = path;
    this.color = color;
    this.treeIcon = 'Wall';
    this.treeName = treeName ? treeName : 'Проводник';
    this.type = 'wire';
  }

  drawObject({width, fieldPosition}) {
    let path = new paper.Path();
    this.path.forEach((point) => {
      if (point._x && point._y) {
        path.add(new paper.Point((point._x + fieldPosition.x), (point._y + fieldPosition.y)))
      } else {
        path.add(new paper.Point((point.x + fieldPosition.x), (point.y + fieldPosition.y)))
      }
    });


    path.strokeColor = this.color;
    path.strokeWidth = width;
  }

  get length() {
    let point1 = this.path[0];
    let length = 0;

    if (point1) {
      for (let i = 1; i < this.path.length; i++) {
        let point2 = this.path[i];
        let point1X = point1._x ? point1._x : point1.x;
        let point1Y = point1._y ? point1._y : point1.y;
        let point2X = point2._x ? point2._x : point2.x;
        let point2Y = point2._y ? point2._y : point2.y;

        length += Math.sqrt(Math.pow(point1X - point2X, 2) + Math.pow(point1Y - point2Y, 2));
        point1 = point2;
      }

      return length;
    } else {
      return 0;
    }
  }

  hoverEffect() {
  }
}
