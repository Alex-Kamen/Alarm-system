import {Element} from "./Object";
import {SettingInput} from "./SettingInput";
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

  hoverEffect() {
    let circle = new paper.Path.Circle(new paper.Point(this.x, this.y), 21);
    circle.strokeWidth = 3;
    circle.strokeColor = '#101165';
    circle.fillColor = '#101165';
  }

  activeEffect() {
    this.hoverEffect();
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }
}

export class CircleSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius = 10, area = 100) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius);
    this.area = area;
    this.settings = [
      new SettingInput('x', 'x', 'number'),
      new SettingInput('y', 'y', 'number'),
      new SettingInput('Наименование', 'treeName', 'text'),
      new SettingInput('Охват', 'area', 'number')
    ];
  }

  activeEffect() {
    let circle = new paper.Path.Circle(new paper.Point(this.x, this.y), this.area);
    circle.strokeWidth = 3;
    circle.strokeColor = this.color;
    circle.fillColor = this.opacityColor;
  }
}

export class LineSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius, width = 100, height = 50, angle = 0) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius);
    this._width = width;
    this._height = height;
    this._angle = angle;

    this.settings = [
      new SettingInput('x', 'x', 'number'),
      new SettingInput('y', 'y', 'number'),
      new SettingInput('Наименование', 'treeName', 'text'),
      new SettingInput('Длина охвата', 'width', 'number'),
      new SettingInput('Ширина охвата', 'height', 'number'),
      new SettingInput('Угол', 'angle', 'number')
    ];
  }

  activeEffect() {
    let path = new paper.Path();
    path.add(new paper.Point(this.x, this.y));
    path.add(new paper.Point(this.x + this.width, this.y + this.height / 2));
    path.add(new paper.Point(this.x + this.width, this.y - this.height / 2));
    path.closed = true;
    path.rotate(this.angle, new paper.Point(this.x, this.y))

    path.strokeWidth = 3;
    path.strokeColor = this.color;
    path.fillColor = this.opacityColor;
  }

  get angle() {
    return this._angle;
  }

  set angle(newVal) {
    this._angle = +newVal;
  }

  get width() {
    return this._width;
  }

  set width(newVal) {
    this._width = +newVal;
  }

  get height() {
    return this._height;
  }

  set height(newVal) {
    this._height = +newVal;
  }
}

export class UPKSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius, capacity = 16) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius);
    this._capacity = capacity;
    this.settings = [
      new SettingInput('x', 'x', 'number'),
      new SettingInput('y', 'y', 'number'),
      new SettingInput('Наименование', 'treeName', 'text'),
      new SettingInput('Ёмкость', 'capacity', 'number')
    ];
  }

  get capacity() {
    return this._capacity;
  }

  set capacity(newVal) {
    this._capacity = +newVal;
  }
}
