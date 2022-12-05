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

  drawObject({fieldPosition}) {
    let image = new Image(1, 1);
    image.src = this.icon
    let raster = new paper.Raster(image, new paper.Point(100, 100));
    raster.scale(0.4);
    raster.position.x += (this.x + fieldPosition.x);
    raster.position.y += (this.y + fieldPosition.y);
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
