import {Element} from "./Object";
import {SettingInput} from "./SettingInput";
const paper = require('paper');

export class Building extends Element {
  width = null;
  height = null;

  constructor(x, y, height, width) {
    super(x, y);
    this._width = width;
    this._height = height;
    this.settings = [
      new SettingInput('x', 'x', 'number'),
      new SettingInput('y', 'y', 'number'),
      new SettingInput('Наименование', 'treeName', 'text'),
      new SettingInput('Ширина', 'width', 'number'),
      new SettingInput('Длина', 'height', 'number'),
    ];
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

export class Column extends Building {
  constructor(x, y, height, width) {
    super(x, y, height, width);
    this.treeName = 'Колонна';
    this.treeIcon = 'Column';
  }

  isHover(cursorX, cursorY) {
    return this.x <= cursorX && this.y <= cursorY
      && this.x + this.width >= cursorX && this.y + this.height >= cursorY;
  }

  drawObject() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x, this.y),
      new paper.Point(this.x + this.width, this.y + this.height)
    );

    path.fillColor = '#000000';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - 3, this.y - 3),
      new paper.Point(this.x + this.width + 3, this.y + this.height + 3)
    );

    path.strokeWidth = '5';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }
}

export class DoubleDoor extends Building {
  constructor(x, y, height, width) {
    super(x, y, height, width);
    this.treeName = 'Двустворчатая дверь';
    this.treeIcon = 'DoubleDoor';
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y >= cursorY
      && this.x + this.width / 2 >= cursorX && this.y - this.height <= cursorY;
  }

  drawObject() {
    let door = new paper.Path.Arc(
      new paper.Point(this.x - this.width / 2, this.y - this.height),
      new paper.Point(Math.sqrt(2) / 2 * this.height + (this.x - this.width / 2), -Math.sqrt(2) / 2 * this.height + this.y),
      new paper.Point(this.x, this.y)
    );

    door.add(new paper.Point(this.x - this.width / 2, this.y));
    door.add(new paper.Point(this.x - this.width / 2, this.y - this.height));
    door.fillColor = '#ffffff';
    door.strokeColor = '#000000';
    door.strokeWidth = '3';

    door = new paper.Path.Arc(
      new paper.Point(this.x + this.width / 2, this.y - this.height),
      new paper.Point(-Math.sqrt(2) / 2 * this.height + (this.x + this.width / 2), -Math.sqrt(2) / 2 * this.height + this.y),
      new paper.Point(this.x, this.y)
    );

    door.add(new paper.Point(this.x + this.width / 2, this.y));
    door.add(new paper.Point(this.x + this.width / 2, this.y - this.height));

    door.fillColor = '#ffffff';
    door.strokeColor = '#000000';
    door.strokeWidth = '3'
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 3, this.y + 3),
      new paper.Point(this.x + this.width / 2 + 3, this.y - this.height - 3)
    );

    path.strokeWidth = '5';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }
}

export class SingleDoor extends Building {
  constructor(x, y, height, width) {
    super(x, y, height, width);
    this.treeName = 'Одностворчатая дверь';
    this.treeIcon = 'SingleDoor';
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width <= cursorX && this.y >= cursorY
      && this.x + this.width >= cursorX && this.y - this.height <= cursorY;
  }

  drawObject() {
    let door = new paper.Path.Arc(
      new paper.Point(this.x, this.y - this.height),
      new paper.Point(Math.sqrt(2) / 2 * this.height + this.x, -Math.sqrt(2) / 2 * this.height + this.y),
      new paper.Point(this.x + this.width, this.y)
    );

    door.add(new paper.Point(this.x, this.y));
    door.add(new paper.Point(this.x, this.y - this.height));
    door.fillColor = '#ffffff';
    door.strokeColor = '#000000';
    door.strokeWidth = '3';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - 3, this.y + 3),
      new paper.Point(this.x + this.width + 3, this.y - this.height - 3)
    );

    path.strokeWidth = '5';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }
}

export class SingleWindow extends Building {
  constructor(x, y, height, width) {
    super(x, y, height, width);
    this.treeName = 'Одностворчатое окно';
    this.treeIcon = 'SingleWindow';
  }

  isHover(cursorX, cursorY) {
    return this.x <= cursorX && this.y <= cursorY
      && this.x + this.width >= cursorX && this.y + this.height >= cursorY;
  }

  drawObject() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x, this.y),
      new paper.Point(this.x + this.width, this.y + this.height)
    );

    path.fillColor = '#ffffff';
    path.strokeWidth = '3';
    path.strokeColor = '#000000';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - 3, this.y - 3),
      new paper.Point(this.x + this.width + 3, this.y + this.height + 3)
    );

    path.strokeWidth = '5';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }
}

export class DoubleWindow extends Building {
  constructor(x, y, height, width) {
    super(x, y, height, width);
    this.treeName = 'Двустворчатое окно';
    this.treeIcon = 'DoubleWindow';
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y >= cursorY
      && this.x + this.width / 2 >= cursorX && this.y - this.height <= cursorY;
  }

  drawObject() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2, this.y),
      new paper.Point(this.x, this.y - this.height)
    );

    path.fillColor = '#ffffff';
    path.strokeWidth = '3';
    path.strokeColor = '#000000';

    path = new paper.Path.Rectangle(
      new paper.Point(this.x, this.y),
      new paper.Point(this.x + this.width / 2, this.y - this.height)
    );

    path.fillColor = '#ffffff';
    path.strokeWidth = '3';
    path.strokeColor = '#000000';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 3, this.y + 3),
      new paper.Point(this.x + this.width / 2 + 3, this.y - this.height - 3)
    );

    path.strokeWidth = '5';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }
}

export class Wall extends Building {
  constructor(startX, startY, endX, endY) {
    super(startX, startY, endX, endY);
    this.treeName = 'Стена';
    this.treeIcon = 'Wall';
  }

  isHover(cursorX, cursorY) {
    return this.x <= cursorX && this.y <= cursorY
      && this.x + this.width >= cursorX && this.y + this.height >= cursorY;
  }

  drawObject() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x, this.y),
      new paper.Point(this.x + this.width, this.y + this.height)
    );

    path.fillColor = '#000000';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - 3, this.y - 3),
      new paper.Point(this.x + this.width + 3, this.y + this.height + 3)
    );

    path.strokeWidth = '5';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }
}
