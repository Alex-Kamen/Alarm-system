export class Element {
  hover = false;
  move = true;
  active = false;

  constructor(x, y) {
    this._x = x;
    this._y = y;
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

  isHover() {}

  drawObject() {}
  hoverEffect() {}
  activeEffect() {}
  moveEffect() {}
  rotate() {}
  linkHoverEffect() {}
}

export default {
  defaultSensorData: {
    radius: 10,
    x: null,
    y: null,
    area: 100,
    icon: null,
    hover: false,
    active: false,
    move: true,
    color: null,
    opacityColor: null
  },

  sensorsList: {
    UPK: {
      title: 'ПКП',
      color: "#ff6b00",
      opacityColor: "rgba(255,107,0,0.5)",
      icon: "UPK",
      type: 'sensor'
    },
    ItinerarySensor: {
      title: 'Путевой конечный',
      color: "#E53434",
      opacityColor: "rgba(229,52,52,0.5)",
      icon: "ItinerarySensorIcon",
      type: 'circle'
    },
    PiezoelectricSensor: {
      title: 'Пьезоэлектрический',
      color: "#349BE5",
      opacityColor: "rgba(52,155,229,0.5)",
      icon: 'PiezoelectricSensorIcon',
      type: 'circle'
    },
    AcousticSensor: {
      title: "акустический",
      color: "#37E534",
      opacityColor: "rgba(55,229,52,0.5)",
      icon: 'AcousticSensorIcon',
      type: 'circle'
    },
    opticalElectronic: {
      title: 'Оптико электронные',
      icon: 'ActiveSingleBlockSensorIcon',
      list: [
        {
          title: 'активный одноблочный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'ActiveSingleBlockSensorIcon',
          type: 'circle'
        },
        {
          title: 'Активный двублочный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'ActiveTwoBlockSensorIcon',
          type: 'circle'
        },
        {
          title: 'Инфракрасный пассивный объёмный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredVolumetricSensorIcon',
          type: 'circle'
        },
        {
          title: 'инфракрасный пассивный поверхностный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredSurfaceSensorIcon',
          type: 'circle'
        },
        {
          title: 'инфракрасный пассивный линейный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredLinearSensorBlock',
          type: 'circle'
        },
      ]
    },
    CombinedSensor: {
      title: 'Комбинированный',
      color: '#E58934',
      opacityColor: "rgba(229,137,52,0.5)",
      icon: 'CombinedSensorIcon',
      type: 'circle'
    },
    RadioWave: {
      title: 'Радиоволновые',
      icon: 'SingleBlockSensorIcon',
      list: [
        {
          title: 'Одноблочный',
          color: '#34E59B',
          opacityColor: "rgba(52,229,155,0.5)",
          icon: 'SingleBlockSensorIcon',
          type: 'circle'
        },
        {
          title: 'Двублочный',
          color: '#34E59B',
          opacityColor: "rgba(52,229,155,0.5)",
          icon: 'TwoBlockSensorIcon',
          type: 'circle'
        }
      ]
    },
    Guard: {
      title: 'Охранные',
      icon: 'ManualSensorIcon',
      list: [
        {
          title: 'Ручной',
          color: '#6234E5',
          opacityColor: "rgba(98,52,229,0.5)",
          icon: 'ManualSensorIcon',
          type: 'circle'
        },
        {
          title: 'Ножной',
          color: '#6234E5',
          opacityColor: "rgba(98,52,229,0.5)",
          icon: 'FootSensorIcon',
          type: 'circle'
        },
      ]
    },
    ElectricalContactSensor: {
      title: 'Точечный электроконтактный',
      color: "#E5349E",
      opacityColor: "rgba(229,52,158,0.5)",
      icon: 'ElectricalContactSensorIcon',
      type: 'linear'
    },
    MagneticContactSensor: {
      title: 'Магнитоконтактный',
      color: "#00b2ff",
      opacityColor: "rgba(0,178,255,0.5)",
      icon: 'MagneticContactSensorIcon',
      type: 'linear'
    }
  },

  buildingsList: {
    Column: {
      title: 'Колонна',
      icon: 'Column',
      type: 'building'
    },
    DoubleDoor: {
      title: 'Двустворчатая дверь',
      icon: 'DoubleDoor',
      type: 'building'
    },
    DoubleWindow: {
      title: 'Двустворчатое окно',
      icon: 'DoubleWindow',
      type: 'building'
    },
    SingleDoor: {
      title: 'Одностворчатая дверь',
      icon: 'SingleDoor',
      type: 'building'
    },
    SingleWindow: {
      title: 'Одностворчатое окно',
      icon: 'SingleWindow',
      type: 'building'
    }
  }
}

