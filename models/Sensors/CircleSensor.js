import {Sensor} from "../Sensor";

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
