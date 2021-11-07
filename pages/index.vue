<template>
  <div>
    <tabs-panel/>
    <instrument-panel/>
    <working-area/>
  </div>
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
}
</style>
