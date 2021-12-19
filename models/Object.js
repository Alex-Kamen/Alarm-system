export default {
  defaultSensorData: {
    radius: 10,
    x: null,
    y: null,
    type: 'circle',
    area: 100,
    icon: null,
    hover: false,
    active: false,
    color: null,
    opacityColor: null
  },

  sensorsList: {
    ItinerarySensor: {
      title: 'Путевой конечный',
      color: "#E53434",
      opacityColor: "rgba(229,52,52,0.5)",
      icon: "ItinerarySensorIcon"
    },
    PiezoelectricSensor: {
      title: 'Пьезоэлектрический',
      color: "#349BE5",
      opacityColor: "rgba(52,155,229,0.5)",
      icon: 'PiezoelectricSensorIcon'
    },
    AcousticSensor: {
      title: "акустический",
      color: "#37E534",
      opacityColor: "rgba(55,229,52,0.5)",
      icon: 'AcousticSensorIcon'
    },
    opticalElectronic: {
      title: 'Оптико электронные',
      icon: 'ActiveSingleBlockSensorIcon',
      list: [
        {
          title: 'активный одноблочный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'ActiveSingleBlockSensorIcon'
        },
        {
          title: 'Активный двублочный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'ActiveTwoBlockSensorIcon'
        },
        {
          title: 'Инфракрасный пассивный объёмный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredVolumetricSensorIcon'
        },
        {
          title: 'инфракрасный пассивный поверхностный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredSurfaceSensorIcon'
        },
        {
          title: 'инфракрасный пассивный линейный',
          color: '#AD34E5',
          opacityColor: 'rgba(173,52,229,0.5)',
          icon: 'InfraredLinearSensorBlock'
        },
      ]
    },
    CombinedSensor: {
      title: 'Комбинирванный',
      color: '#E58934',
      opacityColor: "rgba(229,137,52,0.5)",
      icon: 'ElectricalContactSensorIcon'
    },
    RadioWave: {
      title: 'Радиоволновые',
      icon: 'SingleBlockSensorIcon',
      list: [
        {
          title: 'Одноблочный',
          color: '#34E59B',
          opacityColor: "rgba(52,229,155,0.5)",
          icon: 'SingleBlockSensorIcon'
        },
        {
          title: 'Двублочный',
          color: '#34E59B',
          opacityColor: "rgba(52,229,155,0.5)",
          icon: 'TwoBlockSensorIcon'
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
          icon: 'ManualSensorIcon'
        },
        {
          title: 'Ножной',
          color: '#6234E5',
          opacityColor: "rgba(98,52,229,0.5)",
          icon: 'FootSensorIcon'
        },
      ]
    },
    ElectricalContactSensor: {
      title: 'Точечный электроконтакный',
      color: "#E5349E",
      opacityColor: "rgba(229,52,158,0.5)",
      icon: 'ElectricalContactSensorIcon'
    }
  }
}
