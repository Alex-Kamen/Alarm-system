<template>
  <div class="instumentPanel" data-app>
    <object-item :settings="sensorsList.ItinerarySensor"></object-item>
    <object-item :settings="sensorsList.PiezoelectricSensor"></object-item>
    <object-item :settings="sensorsList.AcousticSensor"></object-item>
    <multiple-object-item
      :icon="sensorsList.opticalElectronic.icon"
      :title="sensorsList.opticalElectronic.title"
      :items="sensorsList.opticalElectronic.list"
    ></multiple-object-item>
    <object-item :settings="sensorsList.CombinedSensor"></object-item>
    <multiple-object-item
      :icon="sensorsList.RadioWave.icon"
      :title="sensorsList.RadioWave.title"
      :items="sensorsList.RadioWave.list"
    ></multiple-object-item>
    <multiple-object-item
      :icon="sensorsList.Guard.icon"
      :title="sensorsList.Guard.title"
      :items="sensorsList.Guard.list"
    ></multiple-object-item>
    <object-item :settings="sensorsList.ElectricalContactSensor"></object-item>
  </div>
</template>

<script>
import ObjectItem from "./objectItems/ObjectItem";
import MultipleObjectItem from "./objectItems/MultipleObjectItem";
import Object from "../models/Object";

export default {
  name: "InstrumentPanel",

  components: {
    MultipleObjectItem,
    ObjectItem
  },

  data() {
    return {
      sensorsList: Object.sensorsList
    }
  }
}
</script>

<style>
.instumentPanel {
  background: #686C6F;
  height: 50px;
  display: flex;
  align-items: center;
}

img {
  height: 35px;
  width: 35px;
}
</style>
