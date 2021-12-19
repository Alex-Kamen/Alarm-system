<template>
  <div class="workingArea">
    <working-tree/>
    <working-field :canvas-id="'canvas-one'"/>
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
  }
}
</script>

<style scoped>
.workingArea {
  display: flex;
}
</style>
