<template>
  <div class="instumentPanel">
    <object-item :icon="'ItinerarySensorIcon'"></object-item>
    <object-item :icon="'PiezoelectricSensorIcon'"></object-item>
    <object-item :icon="'AcousticSensorIcon'"></object-item>
    <multiple-object-item
      :icon="'ActiveSingleBlockSensorIcon'"
      :items="[
        'ActiveSingleBlockSensorIcon',
        'ActiveTwoBlockSensorIcon',
        'InfraredVolumetricSensorIcon',
        'InfraredSurfaceSensorIcon',
        'InfraredLinearSensorBlock',
      ]"
    ></multiple-object-item>
    <object-item :icon="'CombinedSensorIcon'"></object-item>
    <multiple-object-item
      :icon="'SingleBlockSensorIcon'"
      :items="[
        'SingleBlockSensorIcon',
        'TwoBlockSensorIcon',
      ]"
    ></multiple-object-item>
    <multiple-object-item
      :icon="'ManualSensorIcon'"
      :items="[
        'ManualSensorIcon',
        'FootSensorIcon',
      ]"
    ></multiple-object-item>
    <object-item :icon="'ElectricalContactSensorIcon'"></object-item>
  </div>
</template>

<script>
import ObjectItem from "./objectItems/ObjectItem";
import MultipleObjectItem from "./objectItems/MultipleObjectItem";

export default {
  name: "InstrumentPanel",

  components: {
    MultipleObjectItem,
    ObjectItem
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
