<template>
  <div v-click-outside="reset">
    <v-dialog v-model="showModal" scrollable>
      <v-card>
        <div class="info__title">Параметры схемы</div>
        <v-card-text>
          <div class="info__item">
            <p class="info__header">Сопротивление ШС</p>
            <p class="info__value">{{ pkp ? pkp.resistance : '-' }} Ом</p>
          </div>

          <div class="info__item">
            <p class="info__header">Напряжение питания, потребляемое ПКП</p>
            <p class="info__value">{{ pkp ? pkp.voltage : '-' }} В</p>
          </div>

          <div class="info__item">
            <p class="info__header">Ток шлейфа</p>
            <p class="info__value">{{ amperagePKP }} А</p>
          </div>

          <div v-for="sensor in sensorList" class="info__item">
            <p class="info__header">Максимальный ток, потребляемый извещателем</p>
            <p class="info__value">{{sensor.amperage}} А</p>
          </div>

          <div class="info__item">
            <p class="info__header">Общий ток</p>
            <p class="info__value">{{amperagePKP ? amperagePKP + amperageSensor : amperageSensor}} А</p>
          </div>

          <div class="info__item">
            <p class="info__header">Длина кабеля</p>
            <p class="info__value">{{wireLength}} м</p>
          </div>

          <div class="info__item">
            <p class="info__header">Площадь поперечного сечения кабеля </p>
            <p class="info__value">{{wireSection ? wireSection : 'Ток слишком велик'}} мм<sup>2</sup></p>
          </div>

          <div class="info__item">
            <p class="info__header">Максимальное сопротивление, прикладываемое к ШС</p>
            <p class="info__value">{{wireResistance ? wireResistance : '-'}} Ом</p>
          </div>

          <div class="info__item">
            <p class="info__header">Падение напряжение на конце ШС</p>
            <p class="info__value">{{endWireVoltage}} В</p>
          </div>

          <div class="info__item">
            <p class="info__header">Конечное напряжение на последнем извещателе в ШС</p>
            <p class="info__value">{{lastSensorVoltage}} В</p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <slot name="toggleElement">
      <v-btn
        class="toggleElement"
        style="padding: 5px; background-color: rgba(0, 0, 0, 0); border: none;"
        @click="show"
        :title="'Сводка по схеме'"
      >
        <v-icon :size="35">
          $vuetify.icons.values.InfoIcon
        </v-icon>
      </v-btn>
    </slot>
  </div>
</template>

<script>
import Info from "../models/Info";

export default {
  name: "SchematicInfo",

  data() {
    return {
      showModal: false
    }
  },

  methods: {
    reset(event) {
      this.showModal = false;
    },

    show() {
      this.showModal = true;
    }
  },

  computed: {
    pkp() {
      return this.$store.getters['object/objectList'].sensors.find((sensor) => sensor.type === 'pkp');
    },

    amperagePKP() {
      return this.pkp ?  this.pkp.voltage / this.pkp.resistance : '-';
    },

    sensorList() {
      return this.$store.getters['object/objectList'].sensors
        .filter((sensor) => sensor.amperage);
    },

    amperageSensor() {
      return this.sensorList
        .reduce((prevValue, currentValue) => currentValue.amperage ? prevValue + currentValue.amperage : 0, 0);
    },

    wireLength() {
      let sum = 0;

      this.$store.getters['object/objectList'].sensors
        .forEach((sensors) => {
          if (sensors.type === 'wire') sum += sensors.length;
        });

      return sum.toFixed(2);
    },

    wireSection() {
      return Info.sectionByAmperage(this.amperagePKP ? this.amperagePKP + this.amperageSensor : this.amperageSensor);
    },

    wireResistance() {
      return this.wireSection ? (2 * Info.RESISTIVITY * this.wireLength / this.wireSection).toFixed(2) : 0;
    },

    endWireVoltage() {
      const mainAmperage = this.amperagePKP ? this.amperagePKP + this.amperageSensor : this.amperageSensor;
      return (mainAmperage * this.wireResistance).toFixed(2);
    },

    lastSensorVoltage() {
      return (this.pkp ? this.pkp.voltage - this.endWireVoltage : 0).toFixed(2);
    }
  }
}
</script>

<style>
.toggleElement {
  position: absolute;
  right: 275px;
  top: 0;
  cursor: pointer;
  z-index: 100;
}

.v-dialog__content {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
  max-height: 70%;
  overflow-y: auto;
  overflow-x: hidden;
  outline: none;
}

.info__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  border-bottom: 1px solid #686C6F;
  padding: 0 20px;
  font-family: Arial;
  font-size: 15px;
  font-weight: 400;
}

.info__header {
  width: 300px;
  color: #686C6F;
}

.info__title {
  font-weight: 400;
  font-family: Arial;
  font-size: 25px;
  padding: 20px 0 0 20px;
}
</style>
