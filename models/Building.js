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
  constructor(x, y, height, width, treeName) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Колонна';
    this.treeIcon = 'Column';
  }

  get linkPoint() {
    return {
      pointUp: {x: this.x, y: this.y - this.height / 2, radius: 5},
      pointDown: {x: this.x, y: this.y + this.height / 2, radius: 5},
      pointLeft: {x: this.x - this.width / 2, y: this.y, radius: 5},
      pointRight: {x: this.x + this.width / 2, y: this.y, radius: 5},
    }
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2, this.y - this.height / 2),
      new paper.Point(this.x + this.width / 2, this.y + this.height / 2)
    );

    path.fillColor = '#000000';
  }

  hoverEffect(cursorX, cursorY) {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 1.5, this.y - this.height / 2 - 1.5),
      new paper.Point(this.x + this.width / 2 + 1.5, this.y + this.height / 2 + 1.5)
    );

    path.strokeWidth = '3';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    [this.height, this.width] = [this.width, this.height];
  }

  linkHoverEffect(cursorX, cursorY) {
    if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointUp.x, 2) + Math.pow(cursorY - this.linkPoint.pointUp.y, 2)) < this.linkPoint.pointUp.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointUp.x, this.linkPoint.pointUp.y), this.linkPoint.pointUp.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointUp;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointDown.x, 2) + Math.pow(cursorY - this.linkPoint.pointDown.y, 2)) < this.linkPoint.pointDown.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointDown.x, this.linkPoint.pointDown.y), this.linkPoint.pointDown.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointDown;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointRight.x, 2) + Math.pow(cursorY - this.linkPoint.pointRight.y, 2)) < this.linkPoint.pointRight.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointRight.x, this.linkPoint.pointRight.y), this.linkPoint.pointRight.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointRight;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointLeft.x, 2) + Math.pow(cursorY - this.linkPoint.pointLeft.y, 2)) < this.linkPoint.pointLeft.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointLeft.x, this.linkPoint.pointLeft.y), this.linkPoint.pointLeft.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointLeft;
    }

    return false;
  }
}

export class DoubleDoor extends Building {
  _rotateCase = [
    [-1, -1, 1, -1, -1, 1, 1, 1, -1, 1],
    [-1, 1, -1, 1, -1, 1, 1, -1, 1, 1],
    [1, 1, -1, 1, 1, -1, -1, -1, 1, -1],
    [1, -1, 1, -1, 1, -1, -1, 1, -1, -1],
  ]

  constructor(x, y, height, width, treeName, rotateCoefficient) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Двустворчатая дверь';
    this.treeIcon = 'DoubleDoor';
    this.rotateCoefficient = rotateCoefficient ? +rotateCoefficient : 0;
  }

  get linkPoint() {
    if (this.rotateCoefficient === 0) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y + this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 1) {
      return {
        pointLeft: {x: this.x + this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 2) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y - this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 3) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x - this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    }
  }

  get rotateCase() {
    return [this._rotateCase[this.rotateCoefficient], this._rotateCase[(this.rotateCoefficient + 1) % 4]];
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject() {
    const x1 = this.x - this.width / 4 * (this.rotateCoefficient % 2 === 0) * (-1 * +(this.rotateCoefficient === 2) + +(this.rotateCoefficient === 0));
    const x2 = this.x + this.width / 4 * (this.rotateCoefficient % 2 === 0) * (-1 * +(this.rotateCoefficient === 2) + +(this.rotateCoefficient === 0));
    const y1 = this.y + this.height / 4  * (this.rotateCoefficient % 2 === 1) * (-1 * +(this.rotateCoefficient === 3) + +(this.rotateCoefficient === 1));
    const y2 = this.y - this.height / 4  * (this.rotateCoefficient % 2 === 1) * (-1 * +(this.rotateCoefficient === 3) + +(this.rotateCoefficient === 1));

    if (this.rotateCoefficient === 0 || this.rotateCoefficient === 2) {
      let door = new paper.Path.Arc(
        new paper.Point(x1 + this.width / 4 * this.rotateCase[0][0], y1 + this.height / 2 * this.rotateCase[0][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.height * this.rotateCase[0][2] + (x1 + this.width / 4 * this.rotateCase[0][3]), Math.sqrt(2) / 2 * this.height * this.rotateCase[0][4] + y1 + this.height / 2 * this.rotateCase[0][5]),
        new paper.Point(x1 + this.width / 4  * this.rotateCase[0][6], y1 + this.height / 2 * this.rotateCase[0][7])
      );

      door.add(new paper.Point(x1 + this.width / 4  * this.rotateCase[0][8], y1+ this.height / 2  * this.rotateCase[0][9]));
      door.add(new paper.Point(x1 + this.width / 4 * this.rotateCase[0][0], y1 + this.height / 2 * this.rotateCase[0][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';

      door = new paper.Path.Arc(
        new paper.Point(x2 + this.width / 4 * this.rotateCase[1][0], y2 + this.height / 2 * this.rotateCase[1][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.height * this.rotateCase[1][2] + (x2 + this.width / 4 * this.rotateCase[1][3]), Math.sqrt(2) / 2 * this.height * this.rotateCase[1][4] + y2 + this.height / 2 * this.rotateCase[1][5]),
        new paper.Point(x2 + this.width / 4  * this.rotateCase[1][6], y2 + this.height / 2 * this.rotateCase[1][7])
      );

      door.add(new paper.Point(x2 + this.width / 4  * this.rotateCase[1][8], y2+ this.height / 2  * this.rotateCase[1][9]));
      door.add(new paper.Point(x2 + this.width / 4 * this.rotateCase[1][0], y2 + this.height / 2 * this.rotateCase[1][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';
    } else {
      let door = new paper.Path.Arc(
        new paper.Point(x1 + this.width / 2 * this.rotateCase[0][0], y1 + this.height / 4 * this.rotateCase[0][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.width * this.rotateCase[0][2] + (x1 + this.width / 2 * this.rotateCase[0][3]), Math.sqrt(2) / 2 * this.width * this.rotateCase[0][4] + y1 + this.height / 4 * this.rotateCase[0][5]),
        new paper.Point(x1 + this.width / 2  * this.rotateCase[0][6], y1 + this.height / 4 * this.rotateCase[0][7])
      );

      door.add(new paper.Point(x1 + this.width / 2 * this.rotateCase[0][8], y1 + this.height / 4 * this.rotateCase[0][9]));
      door.add(new paper.Point(x1 + this.width / 2 * this.rotateCase[0][0], y1 + this.height / 4 * this.rotateCase[0][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';

      door = new paper.Path.Arc(
        new paper.Point(x2 + this.width / 2 * this.rotateCase[1][0], y2 + this.height / 4 * this.rotateCase[1][1]),
        new paper.Point(Math.sqrt(2) / 2 * this.width * this.rotateCase[1][2] + (x2 + this.width / 2 * this.rotateCase[1][3]), Math.sqrt(2) / 2 * this.width * this.rotateCase[1][4] + y2 + this.height / 4 * this.rotateCase[1][5]),
        new paper.Point(x2 + this.width / 2  * this.rotateCase[1][6], y2 + this.height / 4 * this.rotateCase[1][7])
      );

      door.add(new paper.Point(x2 + this.width / 2  * this.rotateCase[1][8], y2 + this.height / 4  * this.rotateCase[1][9]));
      door.add(new paper.Point(x2 + this.width / 2 * this.rotateCase[1][0], y2 + this.height / 4 * this.rotateCase[1][1]));

      door.fillColor = '#ffffff';
      door.strokeColor = '#000000';
      door.strokeWidth = '3';
    }
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 1.5, this.y - this.height / 2 - 1.5),
      new paper.Point(this.x + this.width / 2 + 1.5, this.y + this.height / 2 + 1.5)
    );

    path.strokeWidth = '3';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    [this.height, this.width] = [this.width, this.height];
    this.rotateCoefficient = (this.rotateCoefficient + 1) % 4;
  }

  linkHoverEffect(cursorX, cursorY) {
    if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointRight.x, 2) + Math.pow(cursorY - this.linkPoint.pointRight.y, 2)) < this.linkPoint.pointRight.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointRight.x, this.linkPoint.pointRight.y), this.linkPoint.pointRight.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointRight;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointLeft.x, 2) + Math.pow(cursorY - this.linkPoint.pointLeft.y, 2)) < this.linkPoint.pointLeft.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointLeft.x, this.linkPoint.pointLeft.y), this.linkPoint.pointLeft.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointLeft;
    }

    return false;
  }
}

export class SingleDoor extends Building {
  _rotateCase = [
    [-1, -1, 1, -1, -1, 1, 1, 1, -1, 1],
    [-1, 1, -1, 1, -1, 1, 1, -1, 1, 1],
    [1, 1, -1, 1, 1, -1, -1, -1, 1, -1],
    [1, -1, 1, -1, 1, -1, -1, 1, -1, -1],
  ]

  get linkPoint() {
    if (this.rotateCoefficient === 0) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y + this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 1) {
      return {
        pointLeft: {x: this.x + this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 2) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y - this.height / 2, radius: 5},
      }
    } else if (this.rotateCoefficient === 3) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x - this.width / 2, y: this.y + this.height / 2, radius: 5},
      }
    }
  }

  constructor(x, y, height, width, treeName, rotateCoefficient) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Одностворчатая дверь';
    this.treeIcon = 'SingleDoor';
    this.rotateCoefficient = rotateCoefficient ? +rotateCoefficient : 0;
  }

  get rotateCase() {
    return this._rotateCase[this.rotateCoefficient]
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject() {
    let door = new paper.Path.Arc(
      new paper.Point(this.x + this.width / 2 * this.rotateCase[0], this.y + this.height / 2 * this.rotateCase[1]),
      new paper.Point(Math.sqrt(2) / 2 * this.height * this.rotateCase[2] + this.x + this.width / 2 * this.rotateCase[3], Math.sqrt(2) / 2 * this.height * this.rotateCase[4] + this.y + this.height / 2 * this.rotateCase[5]),
      new paper.Point(this.x + this.width / 2 * this.rotateCase[6], this.y + this.height / 2 * this.rotateCase[7])
    );

    door.add(new paper.Point(this.x + this.width / 2 * this.rotateCase[8], this.y + this.height / 2 * this.rotateCase[9]));
    door.add(new paper.Point(this.x + this.width / 2 * this.rotateCase[0], this.y + this.height / 2 * this.rotateCase[1]));
    door.fillColor = '#ffffff';
    door.strokeColor = '#000000';
    door.strokeWidth = '3';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 1.5, this.y - this.height / 2 - 1.5),
      new paper.Point(this.x + this.width / 2 + 1.5, this.y + this.height / 2 + 1.5)
    );

    path.strokeWidth = '3';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    this.rotateCoefficient = (this.rotateCoefficient + 1) % 4;
  }

  linkHoverEffect(cursorX, cursorY) {
    if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointRight.x, 2) + Math.pow(cursorY - this.linkPoint.pointRight.y, 2)) < this.linkPoint.pointRight.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointRight.x, this.linkPoint.pointRight.y), this.linkPoint.pointRight.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointRight;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointLeft.x, 2) + Math.pow(cursorY - this.linkPoint.pointLeft.y, 2)) < this.linkPoint.pointLeft.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointLeft.x, this.linkPoint.pointLeft.y), this.linkPoint.pointLeft.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointLeft;
    }

    return false;
  }
}

export class SingleWindow extends Building {
  constructor(x, y, height, width, treeName, rotateCoefficient) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Одностворчатое окно';
    this.treeIcon = 'SingleWindow';
    this.rotateCoefficient = rotateCoefficient ? +rotateCoefficient : 0;
  }

  get linkPoint() {
    if (this.rotateCoefficient === 0) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y, radius: 5},
      }
    } else if (this.rotateCoefficient === 1) {
      return {
        pointLeft: {x: this.x, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x, y: this.y + this.height / 2, radius: 5},
      }
    }
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2, this.y - this.height / 2),
      new paper.Point(this.x + this.width / 2, this.y + this.height / 2)
    );

    path.fillColor = '#ffffff';
    path.strokeWidth = '3';
    path.strokeColor = '#000000';
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 1.5, this.y - this.height / 2 - 1.5),
      new paper.Point(this.x + this.width / 2 + 1.5, this.y + this.height / 2 + 1.5)
    );

    path.strokeWidth = '3';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    [this.height, this.width] = [this.width, this.height];
    this.rotateCoefficient =  (this.rotateCoefficient + 1) % 2;
  }

  linkHoverEffect(cursorX, cursorY) {
    if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointRight.x, 2) + Math.pow(cursorY - this.linkPoint.pointRight.y, 2)) < this.linkPoint.pointRight.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointRight.x, this.linkPoint.pointRight.y), this.linkPoint.pointRight.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointRight;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointLeft.x, 2) + Math.pow(cursorY - this.linkPoint.pointLeft.y, 2)) < this.linkPoint.pointLeft.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointLeft.x, this.linkPoint.pointLeft.y), this.linkPoint.pointLeft.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointLeft;
    }

    return false;
  }
}

export class DoubleWindow extends Building {
  constructor(x, y, height, width, treeName, rotateCoefficient) {
    super(x, y, height, width);
    this.treeName = treeName ? treeName : 'Двустворчатое окно';
    this.treeIcon = 'DoubleWindow';
    this.rotateCoefficient = rotateCoefficient ? +rotateCoefficient : 0;
  }

  get linkPoint() {
    if (this.rotateCoefficient === 0) {
      return {
        pointLeft: {x: this.x - this.width / 2, y: this.y, radius: 5},
        pointRight: {x: this.x + this.width / 2, y: this.y, radius: 5},
      }
    } else if (this.rotateCoefficient === 1) {
      return {
        pointLeft: {x: this.x, y: this.y - this.height / 2, radius: 5},
        pointRight: {x: this.x, y: this.y + this.height / 2, radius: 5},
      }
    }
  }

  isHover(cursorX, cursorY) {
    return this.x - this.width / 2 <= cursorX && this.y - this.height / 2 <= cursorY
      && this.x + this.width / 2 >= cursorX && this.y + this.height / 2 >= cursorY;
  }

  drawObject() {
    if (this.rotateCoefficient === 0) {
      let path = new paper.Path.Rectangle(
        new paper.Point(this.x + this.width / 2, this.y + this.height / 2),
        new paper.Point(this.x, this.y - this.height / 2)
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';

      path = new paper.Path.Rectangle(
        new paper.Point(this.x, this.y + this.height / 2),
        new paper.Point(this.x - this.width / 2, this.y - this.height / 2)
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';
    } else {
      let path = new paper.Path.Rectangle(
        new paper.Point(this.x + this.width / 2, this.y + this.height / 2),
        new paper.Point(this.x - this.width / 2, this.y)
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';

      path = new paper.Path.Rectangle(
        new paper.Point(this.x - this.width / 2, this.y - this.height / 2),
        new paper.Point(this.x + this.width / 2, this.y)
      );

      path.fillColor = '#ffffff';
      path.strokeWidth = '3';
      path.strokeColor = '#000000';
    }
  }

  hoverEffect() {
    let path = new paper.Path.Rectangle(
      new paper.Point(this.x - this.width / 2 - 1.5, this.y - this.height / 2 - 1.5),
      new paper.Point(this.x + this.width / 2 + 1.5, this.y + this.height / 2 + 1.5)
    );

    path.strokeWidth = '3';
    path.strokeColor = '#101165';
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.x += currentX - prevX;
    this.y += currentY - prevY;
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    [this.height, this.width] = [this.width, this.height];
    this.rotateCoefficient = (this.rotateCoefficient + 1) % 2;
  }

  linkHoverEffect(cursorX, cursorY) {
    if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointRight.x, 2) + Math.pow(cursorY - this.linkPoint.pointRight.y, 2)) < this.linkPoint.pointRight.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointRight.x, this.linkPoint.pointRight.y), this.linkPoint.pointRight.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointRight;
    } else if (Math.sqrt(Math.pow(cursorX - this.linkPoint.pointLeft.x, 2) + Math.pow(cursorY - this.linkPoint.pointLeft.y, 2)) < this.linkPoint.pointLeft.radius) {
      let circle = new paper.Path.Circle(new paper.Point(this.linkPoint.pointLeft.x, this.linkPoint.pointLeft.y), this.linkPoint.pointLeft.radius);
      circle.strokeWidth = 3;
      circle.strokeColor = '#101165';
      circle.fillColor = 'white';
      return this.linkPoint.pointLeft;
    }

    return false;
  }
}

export class Wall extends Building {
  constructor(path, width, treeName) {
    super();
    this.settings.pop();
    this.path = path;
    this.width = width;
    this.treeName = treeName ? treeName : 'Стена';
    this.treeIcon = 'Wall';
  }

  isHover(cursorX, cursorY) {
    let minX = this.path[0].x;
    let minY = this.path[0].y;
    let maxX = this.path[0].x;
    let maxY = this.path[0].y;

    this.path.forEach((point) => {
      if (point.x > maxX) {
        maxX = point.x;
      }

      if (point.x < minX) {
        minX = point.x;
      }

      if (point.y > maxY) {
        maxY = point.y;
      }

      if (point.y < minY) {
        minY = point.y;
      }
    })

    return minX <= cursorX && minY <= cursorY && maxX >= cursorX && maxY >= cursorY;
  }

  drawObject() {
    let path = new paper.Path();
    this.path.forEach((point) => path.add(new paper.Point(point.x, point.y)));

    path.strokeColor = 'black';
    path.strokeWidth = this.width;
  }

  hoverEffect() {
    let path = new paper.Path();
    this.path.forEach((point) => path.add(new paper.Point(point.x, point.y)));

    path.strokeColor = '#101165';
    path.strokeWidth = this.width + 5;
  }

  moveEffect(currentX, currentY, prevX, prevY) {
    this.path.forEach((point) => {
      point.x += currentX - prevX;
      point.y += currentY - prevY;
    })
  }

  activeEffect() {
    this.hoverEffect();
  }

  rotate() {
    //[this.height, this.width] = [this.width, this.height];
  }
}
