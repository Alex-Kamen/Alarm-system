<template>
  <v-app data-app>
    <tabs-panel @rerender="rerender()"/>
    <instrument-panel/>
    <working-area ref="canvas"/>
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
  },

  methods: {
    rerender() {
      this.$refs.canvas.rerender();
    }
  },

  mounted() {
    document.addEventListener('resize', () => {
      console.log(1111)
    })

    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const tabName = localStorage.key(i);
        const objectList = JSON.parse(localStorage.getItem(tabName));
        this.$store.commit('tab/newTab', [tabName, objectList]);
      }

      this.$store.commit('tab/active', localStorage.key(localStorage.length-1));
      this.$refs.canvas.rerender();
      this.$store.commit('tab/active', localStorage.key(localStorage.length-1));
      this.$refs.canvas.rerender();
    } else {
      this.$store.commit('tab/newTab', [null, {sensors: [], building: []}]);
    }
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
