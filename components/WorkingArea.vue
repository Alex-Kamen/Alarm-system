<template>
  <div class="workingArea" @contextmenu="showContextMenu">
    <working-tree @rerender="rerender()"/>
    <working-field :canvas-id="'canvas-one'" ref="canvas"/>
    <object-settings @rerender="rerender()"/>
    <ContextMenu
      :class="{
        visible: isVisible,
        hidden: !isVisible
      }"
      :style="{
        top: contextMenuY + 'px',
        left: contextMenuX + 'px'
      }"
      @rerender="rerender()"
    />
    <schematic-info/>
  </div>
</template>

<script>
import WorkingTree from "../components/WorkingTree";
import ObjectSettings from "../components/ObjectSettings";
import WorkingField from "../components/WorkingField";
import ContextMenu from "./ContextMenu";
import SchematicInfo from "./SchematicInfo";

export default {
  name: "WorkingArea",

  components: {
    ContextMenu,
    WorkingTree,
    ObjectSettings,
    WorkingField,
    SchematicInfo
  },

  data() {
    return {
      isVisible: false,
      contextMenuX: null,
      contextMenuY: null
    }
  },

  methods: {
    rerender() {
      this.$refs.canvas.rerender();
    },

    showContextMenu(event) {
      this.contextMenuX = event.clientX;
      this.contextMenuY = event.clientY;
      this.isVisible = true;
      event.preventDefault();
    }
  },

  mounted() {
    document.addEventListener('click', () => this.isVisible = false);
  }
}
</script>

<style scoped>
.workingArea {
  display: flex;
  position: relative;
}

.visible {
  display: block;
}

.hidden {
  display: none;
}
</style>
