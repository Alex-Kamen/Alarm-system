<template>
  <v-app data-app>
    <tabs-panel/>
    <instrument-panel/>
    <working-area/>
  </v-app>
</template>

<script>
import TabsPanel from "../components/TabsPanel";
import InstrumentPanel from "../components/InstrumentPanel";
import WorkingArea from "../components/WorkingArea";

export default {
  components: {
    TabsPanel,
    InstrumentPanel,
    WorkingArea
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.v-menu__content {
  position: absolute;
}
</style>
