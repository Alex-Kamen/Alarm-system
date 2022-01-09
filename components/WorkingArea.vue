<template>
  <div class="workingArea">
    <working-tree @rerender="rerender()"/>
    <working-field :canvas-id="'canvas-one'" ref="canvas"/>
    <object-settings/>
  </div>
</template>

<script>
import WorkingTree from "../components/WorkingTree";
import ObjectSettings from "../components/ObjectSettings";
import WorkingField from "../components/WorkingField";

export default {
  name: "WorkingArea",

  components: {
    WorkingTree,
    ObjectSettings,
    WorkingField
  },

  methods: {
    rerender() {
      this.$refs.canvas.rerender();
    }
  }
}
</script>

<style scoped>
.workingArea {
  display: flex;
}
</style>
