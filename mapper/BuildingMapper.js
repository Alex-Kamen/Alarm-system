import {Column, Wall, DoubleDoor, SingleDoor, SingleWindow, DoubleWindow} from "../models/Building";

export class BuildingMapper {
  toObject(object) {
    if (object.treeIcon === 'DoubleDoor') {
      return new DoubleDoor(object._x, object._y, object._width, object._height, object.treeName, object.rotateCoefficient);
    } else if (object.treeIcon === 'Column') {
      return new Column(object._x, object._y, object._width, object._height, object.treeName);
    } else if (object.treeIcon === 'SingleDoor') {
      return new SingleDoor(object._x, object._y, object._width, object._height, object.treeName, object.rotateCoefficient);
    } else if (object.treeIcon === 'SingleWindow') {
      return new SingleWindow(object._x, object._y, object._width, object._height, object.treeName, object.rotateCoefficient);
    } else if (object.treeIcon === 'DoubleWindow') {
      return new DoubleWindow(object._x, object._y, object._width, object._height, object.treeName, object.rotateCoefficient);
    } else if (object.treeIcon === 'Wall') {
      return new Wall(object.path, object._width, object.treeName);
    }
  }
}
