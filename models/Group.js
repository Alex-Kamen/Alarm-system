import paper from "paper";
import {SettingInput} from "./SettingInput";

export class Group {
  active = false;

  constructor(treeName, list) {
    this.treeName = treeName;
    this.list = list;
    this.treeIcon = list[0].treeIcon;
    this.settings = [
      new SettingInput('x', 'x', 'number'),
      new SettingInput('y', 'y', 'number'),
      new SettingInput('Наименование', 'treeName', 'text'),
    ]
  }

  get x() {
    return this._x;
  }

  set x(newVal) {
    this._x = +newVal;
  }

  get y() {
    return this._y;
  }

  set y(newVal) {
    this._y = +newVal;
  }
}

export class SensorGroup extends Group {
  constructor(treeName, list) {
    super(treeName, list);

    let x = list[0].x;
    let y = list[0].y;
    this._x = x - 25;
    this._y = y + 25;
  }

  isHover(cursorX, cursorY) {
    return this.list.some((sensor) => sensor.isHover(cursorX, cursorY));
  }

  drawObject({fieldPosition}) {
    this.list.forEach((sensor) => sensor.drawObject({fieldPosition}));
  }

  hoverEffect() {
    this.list.forEach((sensor) => sensor.hoverEffect());
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;

    this.list[0].x = this.x + 25;
    this.list[0].y = this.y - 25;

    this.list.forEach((object, index) => {
      object.x = this.list[0].x + 50 * index;
      object.y = this.list[0].y;
    })
  }

  activeEffect() {
    this.list.forEach((sensor) => sensor.activeEffect());
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x, this.y),
      new paper.Point(this.x + 50 * this.list.length, this.y - 50)
    );

    path.strokeWidth = 3;
    path.strokeColor = '#101165';
    path.fillColor = 'rgba(16,17,101,0.2)';
  }
}

export class BuildingGroup extends Group {
  constructor(treeName, list) {
    super(treeName, list);

    let minX = Math.min(...list.map((building) => building.x - building.width / 2));
    let minY = Math.min(...list.map((building) => building.y - building.height / 2));
    let maxX = Math.max(...list.map((building) => building.x + building.width / 2));
    let maxY = Math.max(...list.map((building) => building.y + building.height / 2));

    this._x = minX - 10;
    this._y = minY - 10;
    this.width = Math.abs(minX - maxX) + 20;
    this.height = Math.abs(minY - maxY) + 20;
    this.treeIcon = list[0].treeIcon;
  }

  isHover(cursorX, cursorY) {
    return this.list.some((sensor) => sensor.isHover(cursorX, cursorY));
  }

  drawObject({fieldPosition}) {
    this.list.forEach((building) => building.drawObject());
  }

  hoverEffect() {
    this.list.forEach((building) => building.hoverEffect());
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;

    this.list.forEach((building) => building.moveEffect(currentX, currentY, prevX, prevY));
  }

  activeEffect() {
    this.list.forEach((sensor) => sensor.activeEffect());

    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - 3, this.y - 3),
      new paper.Point(this.x + this.width + 3, this.y + this.height + 3)
    );

    path.strokeWidth = 3;
    path.strokeColor = '#101165';
    path.fillColor = 'rgba(16,17,101,0.2)';
  }
}
