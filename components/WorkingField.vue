<template>
  <div class="workingField">
    <canvas v-on:mouseup="mouseUp" @mousemove="rerender" @mousedown="mouseEvents.down=true"></canvas>
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
    }
  }),
  methods: {
    reset() {
      this.scope.project.activeLayer.removeChildren();
    },

    mouseUp(event) {
      this.mouseEvents.down = false;
      let object = Object.assign({}, this.$store.getters['object/activeObject']);
      if (object.icon) {
        object.x = event.offsetX;
        object.y = event.offsetY;
        this.$store.commit('object/addObject', ['sensors', object])
        this.$store.commit('object/activateObject', {})
      }

      let objectList = this.$store.getters['object/objectList'];

      objectList.sensors.forEach((object, index) => {
        let r = Math.sqrt(Math.pow(event.offsetX - object.x, 2) + Math.pow(event.offsetY - object.y,  2));
        if (r <= 20) {
          this.$store.commit('object/activateObjectOnList', [index, !object.active]);
        } else {
          this.$store.commit('object/activateObjectOnList', [index, false]);
        }
      })

      this.rerender(event);
    },

    drowObject(object) {
      if (object.hover) {
        let circle = new paper.Path.Circle(new paper.Point(object.x, object.y), 21);
        circle.strokeWidth = 3;
        circle.strokeColor = '#101165';
        circle.fillColor = '#101165';
      }

      if (object.active) {
        let circle = new paper.Path.Circle(new paper.Point(object.x, object.y), object.area);
        circle.strokeWidth = 3;
        circle.strokeColor = object.color;
        circle.fillColor = object.opacityColor;
      }

      let image = new Image(1, 1);
      image.src = this.objects[object.icon]
      let raster = new paper.Raster(image, new paper.Point(100, 100));
      raster.scale(0.4);
      raster.position.x += object.x;
      raster.position.y += object.y;
    },

    rerender(event) {
      this.reset();
      let objectList = this.$store.getters['object/objectList'];

      objectList.sensors.forEach((object, index) => {
        let r = Math.sqrt(Math.pow(event.offsetX - object.x, 2) + Math.pow(event.offsetY - object.y, 2));
        if (r <= 20) {
          if (this.mouseEvents.down) this.$store.commit('object/changePosition', [index, event.offsetX, event.offsetY]);
          this.$store.commit('object/hoverObjectOnList', [index, true]);
        } else {
          this.$store.commit('object/hoverObjectOnList', [index, false]);
        }
        this.drowObject(object);
      })
    }
  },
  mounted() {
    this.scope = new paper.PaperScope();
    this.scope.setup(document.querySelector('canvas'));
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
