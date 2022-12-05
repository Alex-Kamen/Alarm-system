import {Sensor} from "../Sensor";

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
