import {Sensor} from "../Sensor";

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
