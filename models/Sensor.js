import {Element} from "./Object";
import {SettingInput} from "./SettingInput";
const paper = require('paper');

export class Sensor extends Element {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius, area, width, height, angle, type) {
    super(x, y);
    this.icon = icon;
    this.treeIcon = treeIcon;
    this.treeName = treeName;
    this.opacityColor = opacityColor;
    this.color = color;
    this.radius = radius;
    this.area = area;
    this._width = width;
    this._height = height;
    this._angle = angle;
    this.type = type;
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
    circle.fillColor = 'rgba(0,0,0,0)';
  }

  activeEffect() {
    if (this.type === 'line') {
      let path = new paper.Path();
      path.add(new paper.Point(this.x, this.y));
      path.add(new paper.Point(this.x + this.width, this.y + this.height / 2));
      path.add(new paper.Point(this.x + this.width, this.y - this.height / 2));
      path.closed = true;
      path.rotate(this.angle, new paper.Point(this.x, this.y))

      path.strokeWidth = 3;
      path.strokeColor = this.color;
      path.fillColor = this.opacityColor;
    } else if (this.type === 'circle') {
      let circle = new paper.Path.Circle(new paper.Point(this.x, this.y), this.area);
      circle.strokeWidth = 3;
      circle.strokeColor = this.color;
      circle.fillColor = this.opacityColor;
    } else {
      this.hoverEffect();
    }
  }

  get settings() {
    if (this.type === 'line') {
      return [
        new SettingInput('x', 'x', 'number'),
        new SettingInput('y', 'y', 'number'),
        new SettingInput('Наименование', 'treeName', 'text'),
        new SettingInput('Длина охвата', 'width', 'number'),
        new SettingInput('Ширина охвата', 'height', 'number'),
        new SettingInput('Угол', 'angle', 'number'),
        new SettingInput('Тип', 'type', 'select'),
        new SettingInput('Максимальный ток', 'amperage', 'number'),
      ]
    } else if (this.type === 'circle') {
      return [
        new SettingInput('x', 'x', 'number'),
        new SettingInput('y', 'y', 'number'),
        new SettingInput('Наименование', 'treeName', 'text'),
        new SettingInput('Охват', 'area', 'number'),
        new SettingInput('Тип', 'type', 'select'),
        new SettingInput('Максимальный ток', 'amperage', 'number'),
      ]
    } else if (this.type === 'pkp') {
      return [
        new SettingInput('x', 'x', 'number'),
        new SettingInput('y', 'y', 'number'),
        new SettingInput('Наименование', 'treeName', 'text'),
        new SettingInput('Ёмкость', 'capacity', 'number'),
        new SettingInput('Сопротивление ШС', 'resistance', 'number'),
        new SettingInput('Напряжение питания', 'voltage', 'number'),
      ]
    } else {
      return [
        new SettingInput('Цвет', 'color', 'color')
      ]
    }
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
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

export class CircleSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius = 10, area = 100, amperage = 1) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius, area, 100, 50, 0, 'circle');
    this.area = area;
    this._width = 100;
    this._height = 50;
    this._angle = 0;
    this.type = 'circle'
    this._amperage = amperage;
  }

  get amperage() {
    return +this._amperage;
  }

  set amperage(amperage) {
    this._amperage = +amperage;
  }
}

export class LineSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius, width = 100, height = 50, angle = 0, amperage = 1) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius, 100, width, height, angle, 'line');
    this._amperage = amperage;
  }

  get amperage() {
    return +this._amperage;
  }

  set amperage(amperage) {
    this._amperage = +amperage;
  }
}

export class UPKSensor extends Sensor {
  constructor(x, y, icon, treeIcon, treeName, opacityColor, color, radius, capacity = 16, resistance = 1, voltage = 1) {
    super(x, y, icon, treeIcon, treeName, opacityColor, color, radius);
    this._capacity = capacity;
    this.type = 'pkp'
    this._resistance = resistance;
    this._voltage = voltage;
  }

  get capacity() {
    return this._capacity;
  }

  set capacity(newVal) {
    this._capacity = +newVal;
  }

  get resistance() {
    return this._resistance;
  }

  set resistance(newVal) {
    this._resistance = +newVal;
  }

  get voltage() {
    return this._voltage;
  }

  set voltage(newVal) {
    this._voltage = +newVal;
  }
}

export class Wire extends Sensor {
  constructor(path, color, treeName) {
    super();
    this.path = path;
    this.color = color;
    this.treeIcon = 'Wall';
    this.treeName = treeName ? treeName : 'Проводник';
    this.type = 'wire';
  }

  drawObject(width) {
    let path = new paper.Path();
    this.path.forEach((point) => {
      if (point._x && point._y) {
        path.add(new paper.Point(point._x, point._y))
      } else {
        path.add(new paper.Point(point.x, point.y))
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
