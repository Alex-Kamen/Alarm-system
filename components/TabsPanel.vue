<template>
  <div class="tabsPanel">
    <burger-menu></burger-menu>
    <tab v-for="(tab, tabIndex) in tabList" :key="tabIndex" :tabName="`${tab}`" @rerender="rerender()"/>
    <div class="plusIcon" @click="newTab">
      <v-icon :size="15">
        $vuetify.icons.values.PlusIcon
      </v-icon>
    </div>
  </div>
</template>

<script>
import Tab from "./Tab";
import BurgerMenu from "./BurgerMenu";

export default {
  name: "TabsPanel",

  components: {Tab, BurgerMenu},

  computed: {
    tabList() {
      return this.$store.getters['tab/tabList'];
    }
  },

  methods: {
    newTab() {
      this.$store.commit('tab/newTab', [null, {sensors: [], building: []}]);
      this.rerender();
    },

    rerender() {
      this.$emit('rerender');
    }
  }
}
</script>

<style scoped>
.tabsPanel {
  background: #424547;
  height: 40px;
  display: flex;
  align-items: center;
}

.plusIcon {
  padding: 0 10px;
  height: 40px;
  display: flex;
  align-items: center;
  transition: background-color .3s;
  cursor: pointer;
}

.plusIcon:hover {
  background-color: #686C6F;
}
</style>
