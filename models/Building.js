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
