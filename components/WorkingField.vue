<template>
  <div class="workingField">
    <canvas
      v-on:mouseup="mouseUp"
      @mousemove="rerender"
      @mousedown="mouseDown"
    ></canvas>
  </div>
</template>

<script>
import FootSensorIcon from '@/static/icons/sensor/13.png';
import ManualSensorIcon from '@/static/icons/sensor/12.png';
import ActiveSingleBlockSensorIcon from '@/static/icons/sensor/4.png';
import ActiveTwoBlockSensorIcon from '@/static/icons/sensor/5.png';
import InfraredLinearSensorBlock from '@/static/icons/sensor/8.png';
import InfraredSurfaceSensorIcon from '@/static/icons/sensor/7.png';
import InfraredVolumetricSensorIcon from '@/static/icons/sensor/6.png';
import SingleBlockSensorIcon from '@/static/icons/sensor/10.png';
import TwoBlockSensorIcon from '@/static/icons/sensor/11.png';
import AcousticSensorIcon from '@/static/icons/sensor/3.png';
import CombinedSensorIcon from '@/static/icons/sensor/9.png';
import ElectricalContactSensorIcon from '@/static/icons/sensor/14.png';
import ItinerarySensorIcon from '@/static/icons/sensor/1.png';
import PiezoelectricSensorIcon from '@/static/icons/sensor/2.png';
import MagneticContactSensorIcon from '@/static/icons/sensor/16.png';
import {CircleSensor, LineSensor, UPKSensor, Wire} from "../models/Sensor";
import {Column, DoubleDoor, SingleDoor, SingleWindow, DoubleWindow, Wall} from "../models/Building";
import UPK from "@/static/icons/sensor/15.png";
import Info from "../models/Info";

const paper = require('paper');

export default {
  name: "WorkingField",

  data: () => ({
    path: null,
    scope: null,
    objects: {
      FootSensorIcon: FootSensorIcon,
      ManualSensorIcon: ManualSensorIcon,
      ActiveSingleBlockSensorIcon: ActiveSingleBlockSensorIcon,
      ActiveTwoBlockSensorIcon: ActiveTwoBlockSensorIcon,
      InfraredLinearSensorBlock: InfraredLinearSensorBlock,
      InfraredSurfaceSensorIcon: InfraredSurfaceSensorIcon,
      InfraredVolumetricSensorIcon: InfraredVolumetricSensorIcon,
      SingleBlockSensorIcon: SingleBlockSensorIcon,
      TwoBlockSensorIcon: TwoBlockSensorIcon,
      AcousticSensorIcon: AcousticSensorIcon,
      CombinedSensorIcon: CombinedSensorIcon,
      ElectricalContactSensorIcon: ElectricalContactSensorIcon,
      ItinerarySensorIcon: ItinerarySensorIcon,
      PiezoelectricSensorIcon: PiezoelectricSensorIcon,
      MagneticContactSensorIcon: MagneticContactSensorIcon,
      UPK: UPK,
    },

    objectTitleList: {
      FootSensorIcon: 'Охранный ножной',
      ManualSensorIcon: 'Охранный ручной',
      ActiveSingleBlockSensorIcon: 'Оптико электронный активный одноблочный',
      ActiveTwoBlockSensorIcon: 'Оптико электронный активный двублочный',
      InfraredLinearSensorBlock: 'Оптико электронный инфракрасный пассивный линейный',
      InfraredSurfaceSensorIcon: 'Оптико электронный инфракрасный пассивный поверхностный',
      InfraredVolumetricSensorIcon: 'Оптико электронный инфракрасный пассивный объёмный',
      SingleBlockSensorIcon: 'Радиоволной одноблочный',
      TwoBlockSensorIcon: 'Радиоволной двублочный',
      AcousticSensorIcon: 'Акустический',
      CombinedSensorIcon: 'Комбинированный',
      ElectricalContactSensorIcon: 'Точечный электроконтактный',
      ItinerarySensorIcon: 'Путевой конечный',
      PiezoelectricSensorIcon: 'Пьезоэлектрический',
      MagneticContactSensorIcon: 'Магнитоконтактный',
      UPK: 'ПКП',
    },

    mouseEvents: {
      down: false,
      wheel: {
        status: false,
        x: null,
        y: null,
      }
    },

    keyboardEvent: {
      Control: false,
      Shift: false,
      Escape: false
    },

    createWall: {
      status: false,
      path: [],
      length: 0,
      lastPoint: {}
    },

    createWire: {
      status: false,
      path: [],
      length: 0,
      lastPoint: {}
    }
  }),

  computed: {
    buildingList() {
      return this.$store.getters['object/objectList'].building;
    },

    layerStatus() {
      return this.$store.getters['object/layerStatus'];
    },

    sensorList() {
      return this.$store.getters['object/objectList'].sensors;
    },

    pkp() {
      return this.$store.getters['object/objectList'].sensors.find((sensor) => sensor.type === 'pkp');
    },

    amperagePKP() {
      return this.pkp ? this.pkp.voltage / this.pkp.resistance : '-';
    },

    amperageSensor() {
      return this.sensorList
        .reduce((prevValue, currentValue) => currentValue.amperage ? prevValue + currentValue.amperage : 0, 0);
    },

    wireSection() {
      return Info.sectionByAmperage(this.amperagePKP ? this.amperagePKP + this.amperageSensor : this.amperageSensor);
    },

    fieldPosition() {
      return this.$store.getters['object/fieldPosition'];
    }
  },

  methods: {
    reset() {
      this.scope.project.activeLayer.removeChildren();
    },

    keyDown(event) {
      this.keyboardEvent[event.key] = true;

      if (this.keyboardEvent.Control && this.keyboardEvent.c) {
        this.$store.commit('object/copy')
      }

      if (this.keyboardEvent.Control && this.keyboardEvent.v) {
        this.$store.commit('object/paste')
      }

      if (this.keyboardEvent.Control && this.keyboardEvent.x) {
        this.$store.commit('object/cut')
      }

      if (this.keyboardEvent.Escape) {
        this.$store.commit('object/activateObject', {});
        this.mouseEvents.down = {};

        this.createWall = {
          status: false,
          path: [],
          length: 0,
          lastPoint: {}
        };

        this.createWire = {
          status: false,
          path: [],
          length: 0,
          lastPoint: {}
        }
      }

      this.rerender();
    },

    keyUp(event) {
      this.keyboardEvent[event.key] = false;
    },

    mouseUp(event) {
      if (event.which === 3 || event.which === 2) return;

      this.mouseEvents.wheel = {};

      if (event.which === 2) {
        console.log(1111)
        this.mouseEvents.wheel = {
          status: false,
          x: null,
          y: null,
        };
      }

      this.mouseEvents.down = {};

      if (this.keyboardEvent.Shift && this.sensorList.some((sensor) => sensor.isHover(event.offsetX, event.offsetY)) && !this.createWall.status && !this.createWire.status && !this.layerStatus) {
        this.createWire = {
          status: true,
          path: [this.sensorList.filter((sensor) => sensor.isHover(event.offsetX, event.offsetY))[0]],
          length: 1
        }

        this.mouseEvents.down = {
          status: true,
          x: event.offsetX,
          y: event.offsetY,
        }

        return;
      }

      if (this.createWall.status && this.layerStatus) {
        let buildingCoords = this.buildingList.filter((building) => building.linkHoverEffect(event.offsetX, event.offsetY))[0]

        if (buildingCoords) {
          buildingCoords = buildingCoords.linkHoverEffect(event.offsetX, event.offsetY);
          this.createWall.path.push(buildingCoords)
          this.$store.commit('object/addObject', [
            'building',
            new Wall(this.createWall.path, 10)
          ]);

          this.createWall.status = false;
          return;
        } else {
          this.mouseEvents.down = {
            status: true,
            x: event.offsetX,
            y: event.offsetY,
          };

          this.createWall.path.push(this.createWall.lastPoint);
          this.createWall.length++;
        }
      }

      if (this.createWire.status && !this.layerStatus) {
        let sensorCoords = this.sensorList.filter((sensor) => sensor.isHover(event.offsetX, event.offsetY))[0]

        if (sensorCoords) {
          this.createWire.path.push(sensorCoords)
          this.$store.commit('object/addObject', [
            'sensors',
            new Wire(this.createWire.path, 'black')
          ]);

          this.createWire.status = false;
          return;
        } else {
          this.mouseEvents.down = {
            status: true,
            x: event.offsetX,
            y: event.offsetY,
          };

          this.createWire.path.push(this.createWire.lastPoint);
          this.createWire.length++;
        }
      }

      let object = this.$store.getters['object/activeObject'];
      if (object.type === 'sensor') {
        this.$store.commit('object/addObject', [
          'sensors',
          new UPKSensor(event.offsetX, event.offsetY, this.objects[object.icon], object.icon, this.objectTitleList[object.icon], object.opacityColor, object.color)
        ]);
      } else if (object.type === 'circle') {
        this.$store.commit('object/addObject', [
          'sensors',
          new CircleSensor(event.offsetX, event.offsetY, this.objects[object.icon], object.icon, this.objectTitleList[object.icon], object.opacityColor, object.color)
        ]);
      } else if (object.type === 'linear') {
        this.$store.commit('object/addObject', [
          'sensors',
          new LineSensor(event.offsetX, event.offsetY, this.objects[object.icon], object.icon, this.objectTitleList[object.icon], object.opacityColor, object.color)
        ]);
      } else if (object.icon === 'DoubleDoor') {
        this.$store.commit('object/addObject', [
          'building',
          new DoubleDoor(event.offsetX, event.offsetY, 50, 100)
        ]);
      } else if (object.icon === 'Column') {
        this.$store.commit('object/addObject', [
          'building',
          new Column(event.offsetX, event.offsetY, 50, 50)
        ]);
      } else if (object.icon === 'SingleDoor') {
        this.$store.commit('object/addObject', [
          'building',
          new SingleDoor(event.offsetX, event.offsetY, 50, 50)
        ]);
      } else if (object.icon === 'SingleWindow') {
        this.$store.commit('object/addObject', [
          'building',
          new SingleWindow(event.offsetX, event.offsetY, 10, 50)
        ]);
      } else if (object.icon === 'DoubleWindow') {
        this.$store.commit('object/addObject', [
          'building',
          new DoubleWindow(event.offsetX, event.offsetY, 10, 100)
        ]);
      } else if (this.buildingList.filter((building) => building.linkHoverEffect(event.offsetX, event.offsetY))[0] && !this.createWall.status && !this.createWire.status) {
        this.createWall = {
          status: true,
          path: [this.buildingList.filter((building) => building.linkHoverEffect(event.offsetX, event.offsetY))[0].linkHoverEffect(event.offsetX, event.offsetY)],
          length: 1
        };

        this.mouseEvents.down = {
          status: true,
          x: event.offsetX,
          y: event.offsetY,
        };
      }

      this.$store.commit('object/activateObject', {});

      this.removeActiveStatusOnList(this.sensorList, 'sensors', event);
      this.removeActiveStatusOnList(this.buildingList, 'building', event);

      this.rerender(event);
    },

    mouseDown(event) {
      if (event.which === 3 || event.which === 2) return;

      if (event.which === 2) {
        console.log(222)
        this.mouseEvents.wheel = {
          status: true,
          x: event.offsetX,
          y: event.offsetY,
        }
      }

      this.mouseEvents.down = {
        status: true,
        x: event.offsetX,
        y: event.offsetY,
      };

      this.addActiveStatusOnList(this.sensorList, 'sensors', event);
      this.addActiveStatusOnList(this.buildingList, 'building', event);
    },

    rerender(event) {
      this.reset();
      this.$store.commit('object/saveObjectList');

      if (this.mouseEvents.wheel.status) {
        this.$store.commit(
          'object/changeFieldPosition',
          [event.offsetX, event.offsetY, this.mouseEvents.wheel.x, this.mouseEvents.wheel.y]
        );
        console.log(event.offsetX, event.offsetY)

        this.mouseEvents.wheel.x = event.offsetX;
        this.mouseEvents.wheel.y = event.offsetY;
      }

      if (this.createWall.status && this.layerStatus) {
        let path = new paper.Path();
        this.createWall.path.forEach((point) => path.add(new paper.Point(point.x, point.y)));
        const lastPoint = this.createWall.path[this.createWall.path.length - 1];

        if (Math.abs(this.mouseEvents.down.x - event.offsetX) >= Math.abs(this.mouseEvents.down.y - event.offsetY)) {
          path.add(new paper.Point(event.offsetX, lastPoint.y));
          this.createWall.lastPoint = {x: event.offsetX, y: lastPoint.y};
        } else {
          path.add(new paper.Point(lastPoint.x, event.offsetY));
          this.createWall.lastPoint = {x: lastPoint.x, y: event.offsetY};
        }

        path.strokeColor = 'black';
        path.strokeWidth = '10';
      }

      if (this.createWire.status && !this.layerStatus) {
        let path = new paper.Path();
        this.createWire.path.forEach((point) => path.add(new paper.Point(point.x, point.y)));
        const lastPoint = {
          x: this.createWire.path[this.createWire.path.length - 1].x,
          y: this.createWire.path[this.createWire.path.length - 1].y
        };

        if (Math.abs(this.mouseEvents.down.x - event.offsetX) >= Math.abs(this.mouseEvents.down.y - event.offsetY)) {
          path.add(new paper.Point(event.offsetX, lastPoint.y));
          this.createWire.lastPoint = {x: event.offsetX, y: lastPoint.y};
        } else {
          path.add(new paper.Point(lastPoint.x, event.offsetY));
          this.createWire.lastPoint = {x: lastPoint.x, y: event.offsetY};
        }

        path.strokeColor = 'black';
        path.strokeWidth = '5';
      }

      this.drawObjectList(this.sensorList, 'sensors', event);
      this.drawObjectList(this.buildingList, 'building', event);

      if (this.mouseEvents.down.status) {
        this.mouseEvents.down.x = event.offsetX;
        this.mouseEvents.down.y = event.offsetY;
      }
    },

    drawObjectList(objectList, type, event = {}) {
      objectList.forEach((object, index) => {
        if (object.linkHoverEffect) object.linkHoverEffect(event.offsetX, event.offsetY);

        if (object.isHover(event.offsetX, event.offsetY) && ((this.layerStatus && type === 'building') || (!this.layerStatus && type === 'sensors'))) {
          object.hoverEffect(event.offsetX, event.offsetY);
        }

        if (!this.createWall.status && !this.createWire.status  && ((this.layerStatus && type === 'building') || (!this.layerStatus && type === 'sensors'))) {
          if (this.mouseEvents.down.status && object.active && event.offsetX && event.offsetY) {
            this.$store.commit(
              'object/changePosition',
              [index, type, event.offsetX, event.offsetY, this.mouseEvents.down.x, this.mouseEvents.down.y]
            );
          }

          if (object.active) {
            object.activeEffect();
          }
        }

        object.drawObject({width: this.wireSection, fieldPosition: this.fieldPosition});
      })
    },

    removeActiveStatusOnList(objectList, type, event) {
      const isClickOnSensor = objectList.some((object) => object.isHover(event.offsetX, event.offsetY));

      objectList.forEach((object, index) => {
        if (!isClickOnSensor && !this.keyboardEvent.Shift) {
          this.$store.commit('object/activateObjectOnList', [object, false]);
        }
      })
    },

    addActiveStatusOnList(objectList, type, event) {
      objectList.forEach((object, index) => {
        if (object.isHover(event.offsetX, event.offsetY)  && ((this.layerStatus && type === 'building') || (!this.layerStatus && type === 'sensors'))) {
          this.$store.commit('object/activateObjectOnList', [object, true]);
        }
      })
    },
  },

  mounted() {
    this.scope = new paper.PaperScope();
    this.scope.setup(document.querySelector('canvas'));
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
  }
}
</script>

<style scoped>
.workingField {
  flex: 1;
  position: relative;
  overflow: hidden;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 2000px;
  height: 2000px;
  background-color: #E5E5E5;
}
</style>
