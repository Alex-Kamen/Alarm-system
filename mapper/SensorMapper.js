import {UPKSensor} from "../models/Sensors/UPKSensor";
import {CircleSensor} from "../models/Sensors/CircleSensor";
import {LineSensor} from "../models/Sensors/LineSensor";
import {Wire} from "../models/Sensors/Wire";


export class SensorMapper {
  toObject(object) {
    if (object.type === 'pkp') {
      return new UPKSensor(
        object._x,
        object._y,
        object.icon,
        object.treeIcon,
        object.treeName,
        object.opacityColor,
        object.color,
        object.radius,
        object._capacity,
        object._resistance,
        object._voltage,
      );
    } else if (object.type === 'circle') {
      return new CircleSensor(
        object._x,
        object._y,
        object.icon,
        object.treeIcon,
        object.treeName,
        object.opacityColor,
        object.color,
        object.radius,
        object.area,
        object._amperage,
      );
    } else if (object.type === 'line') {
      return new LineSensor(
        object._x,
        object._y,
        object.icon,
        object.treeIcon,
        object.treeName,
        object.opacityColor,
        object.color,
        object.radius,
        object._width,
        object._height,
        object._angle,
        object._amperage,
      )
    } else if (object.type === 'wire') {
      return new Wire(object.path, object.color, object.treeName);
    }
  }
}
