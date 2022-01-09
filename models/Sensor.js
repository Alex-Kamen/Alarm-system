import {Element} from "./Object";
const paper = require('paper');

export class Sensor extends Element {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius) {
    super(x, y);
    this.icon = icon;
    this.treeIcon = treeIcon;
    this.treeName = treeName;
    this.opacityColor = opacityColor;
    this.color = color;
    this.radius = radius;
  }
}

export class CircleSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius = 10, area = 100) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius);
    this.area = area;
  }

  isHover(cursorX, cursorY) {
    return Math.sqrt(Math.pow(cursorX - this.x, 2) + Math.pow(cursorY - this.y,  2)) < 20;
  }

  drawObject() {
    let image = new Image(1, 1);
    image.src = this.icon
    let raster = new paper.Raster(image, new paper.Point(100, 100));
    raster.scale(0.4);
    raster.position.x += this.x;
    raster.position.y += this.y;
  }

  hoverEffect(x, y) {
    let circle = new paper.Path.Circle(new paper.Point(this.x, this.y), 21);
    circle.strokeWidth = 3;
    circle.strokeColor = '#101165';
    circle.fillColor = '#101165';
  }

  activeEffect() {
    let circle = new paper.Path.Circle(new paper.Point(this.x, this.y), this.area);
    circle.strokeWidth = 3;
    circle.strokeColor = this.color;
    circle.fillColor = this.opacityColor;
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }
}

export class LineSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius, width) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius);
    this.width = width;
  }
}
