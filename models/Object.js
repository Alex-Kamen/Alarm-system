export class Element {
  hover = false;
  move = true;
  active = false;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isHover() {}

  drawObject() {}
  hoverEffect() {}
  activeEffect() {}
  moveEffect() {}
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
    ItinerarySensor: {
      title: 'Путевой конечный',
      color: "#E53434",
      opacityColor: "rgba(229,52,52,0.5)",
      icon: "ItinerarySensorIcon",
      type: 'sensor'
    },
    PiezoelectricSensor: {
      title: 'Пьезоэлектрический',
      color: "#349BE5",
      opacityColor: "rgba(52,155,229,0.5)",
      icon: 'PiezoelectricSensorIcon',
      type: 'sensor'
    },
    AcousticSensor: {
      title: "акустический",
      color: "#37E534",
      opacityColor: "rgba(55,229,52,0.5)",
      icon: 'AcousticSensorIcon',
      type: 'sensor'
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
          type: 'sensor'
        },
        {
          title: 'Активный двублочный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'ActiveTwoBlockSensorIcon',
          type: 'sensor'
        },
        {
          title: 'Инфракрасный пассивный объёмный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredVolumetricSensorIcon',
          type: 'sensor'
        },
        {
          title: 'инфракрасный пассивный поверхностный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredSurfaceSensorIcon',
          type: 'sensor'
        },
        {
          title: 'инфракрасный пассивный линейный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredLinearSensorBlock',
          type: 'sensor'
        },
      ]
    },
    CombinedSensor: {
      title: 'Комбинированный',
      color: '#E58934',
      opacityColor: "rgba(229,137,52,0.5)",
      icon: 'CombinedSensorIcon',
      type: 'sensor'
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
          type: 'sensor'
        },
        {
          title: 'Двублочный',
          color: '#34E59B',
          opacityColor: "rgba(52,229,155,0.5)",
          icon: 'TwoBlockSensorIcon',
          type: 'sensor'
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
          type: 'sensor'
        },
        {
          title: 'Ножной',
          color: '#6234E5',
          opacityColor: "rgba(98,52,229,0.5)",
          icon: 'FootSensorIcon',
          type: 'sensor'
        },
      ]
    },
    ElectricalContactSensor: {
      title: 'Точечный электроконтактный',
      color: "#E5349E",
      opacityColor: "rgba(229,52,158,0.5)",
      icon: 'ElectricalContactSensorIcon',
      type: 'sensor'
    }
  },

  buildingsList: {
    title: 'Объекты здания',
    icon: 'DoubleDoor',
    list: [
      {
        title: 'Стена',
        icon: 'Wall',
        type: 'building'
      },
      {
        title: 'Колонна',
        icon: 'Column',
        type: 'building'
      },
      {
        title: 'Двустворчатая дверь',
        icon: 'DoubleDoor',
        type: 'building'
      },
      {
        title: 'Двустворчатое окно',
        icon: 'DoubleWindow',
        type: 'building'
      },
      {
        title: 'Одностворчатая дверь',
        icon: 'SingleDoor',
        type: 'building'
      },
      {
        title: 'Одностворчатое окно',
        icon: 'SingleWindow',
        type: 'building'
      }
    ]
  }
}

