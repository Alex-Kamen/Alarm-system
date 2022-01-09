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
import {CircleSensor} from "../models/Sensor";
import {Column, DoubleDoor, SingleDoor, SingleWindow, DoubleWindow, Wall} from "../models/Building";

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
    },

    mouseEvents: {
      down: false,
    },

    keyboardEvent: {
      Control: false
    },

    createWall: {
      status: false,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    }
  }),
  methods: {
    reset() {
      this.scope.project.activeLayer.removeChildren();
    },

    keyDown(event) {
      this.keyboardEvent[event.key] = true;
    },

    keyUp(event) {
      this.keyboardEvent[event.key] = false;
    },

    mouseUp(event) {
      if (this.createWall.status) {
        let x = Math.min(this.createWall.startX, this.createWall.endX);
        let y = Math.min(this.createWall.startY, this.createWall.endY);
        let width = Math.abs(this.createWall.startY - this.createWall.endY);
        let height = Math.abs(this.createWall.startX - this.createWall.endX);

        if (width === 0) width = 10;
        if (height === 0) height = 10;

        this.$store.commit('object/addObject', [
          'sensors',
          new Wall(x, y, width, height)
        ]);
        this.createWall.status = false;
      }

      this.mouseEvents.down = {};
      let object = this.$store.getters['object/activeObject'];
      if (object.type === 'sensor') {
        this.$store.commit('object/addObject', [
          'sensors',
          new CircleSensor(event.offsetX, event.offsetY, this.objects[object.icon], object.opacityColor, object.color)
        ]);
      } else if (object.icon === 'DoubleDoor') {
        this.$store.commit('object/addObject', [
          'sensors',
          new DoubleDoor(event.offsetX, event.offsetY, 50, 100)
        ]);
      } else if (object.icon === 'Column') {
        this.$store.commit('object/addObject', [
          'sensors',
          new Column(event.offsetX, event.offsetY, 50, 50)
        ]);
      } else if (object.icon === 'SingleDoor') {
        this.$store.commit('object/addObject', [
          'sensors',
          new SingleDoor(event.offsetX, event.offsetY, 50, 50)
        ]);
      } else if (object.icon === 'SingleWindow') {
        this.$store.commit('object/addObject', [
          'sensors',
          new SingleWindow(event.offsetX, event.offsetY, 10, 50)
        ]);
      } else if (object.icon === 'DoubleWindow') {
        this.$store.commit('object/addObject', [
          'sensors',
          new DoubleWindow(event.offsetX, event.offsetY, 10, 100)
        ]);
      } else if (object.icon === 'Wall') {
        this.createWall = {
          status: true,
          startX: event.offsetX,
          startY: event.offsetY,
          endX: null,
          endY: null
        };

        this.mouseEvents.down = {
          status: true,
          x: event.offsetX,
          y: event.offsetY,
        };
      }

      this.$store.commit('object/activateObject', {});

      let objectList = this.$store.getters['object/objectList'];

      objectList.sensors.forEach((object, index) => {
        if (!object.isHover(event.offsetX, event.offsetY) && !this.keyboardEvent.Control) {
          this.$store.commit('object/activateObjectOnList', [index, false]);
        }
      })

      this.rerender(event);
    },

    mouseDown(event) {
      this.mouseEvents.down = {
        status: true,
        x: event.offsetX,
        y: event.offsetY,
      };

      let objectList = this.$store.getters['object/objectList'];

      objectList.sensors.forEach((object, index) => {
        if (object.isHover(event.offsetX, event.offsetY)) {
          this.$store.commit('object/activateObjectOnList', [index, true]);
        }
      })
    },

    rerender(event) {
      this.reset();

      if (this.createWall.status) {
        let path = new paper.Path();

        if (Math.abs(this.mouseEvents.down.x - event.offsetX) >= Math.abs(this.mouseEvents.down.y - event.offsetY)) {
          path.add(new paper.Point(this.createWall.startX, this.createWall.startY));
          path.add(new paper.Point(event.offsetX, this.createWall.startY));
          this.createWall.endX = event.offsetX;
          this.createWall.endY = this.createWall.startY;
        } else {
          path.add(new paper.Point(this.createWall.startX, this.createWall.startY));
          path.add(new paper.Point(this.createWall.startX, event.offsetY));
          this.createWall.endX = this.createWall.startX;
          this.createWall.endY = event.offsetY;
        }

        path.strokeColor = 'black';
        path.strokeWidth = '10';
      }

      let objectList = this.$store.getters['object/objectList'];

      objectList.sensors.forEach((object, index) => {
        if (!this.createWall.status) {
          if (object.isHover(event.offsetX, event.offsetY)) {
            object.hoverEffect(event.offsetX, event.offsetY);
          }

          if (this.mouseEvents.down.status && object.active) {
            this.$store.commit(
              'object/changePosition',
              [index, event.offsetX, event.offsetY, this.mouseEvents.down.x, this.mouseEvents.down.y]
            );

            this.mouseEvents.down.x = event.offsetX;
            this.mouseEvents.down.y = event.offsetY;
          }

          if (object.active) {
            object.activeEffect();
          }
        }

        object.drawObject();
      })
    }
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
}

canvas {
  width: 100%;
  height: 100%;
  background-color: #E5E5E5;
}
</style>
