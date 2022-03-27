<template>
  <div class="tab" :title="tabName" :class="{active: activeTab == tabName}">
    <div class="tabName" @click="activateTab(tabName)">
      {{tabName}}
    </div>
    <div @click="removeTab" class="tabIcon">
      <v-icon :size="10">
        $vuetify.icons.values.CrossIcon
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",

  props: {
    tabName: String
  },

  methods: {
    removeTab() {
      const tabList = this.$store.getters['tab/tabList'];

      if (tabList.length > 1) {
        this.$store.commit('tab/remove', this.tabName);
        this.$emit('rerender');
        this.$store.commit('tab/active', tabList[tabList.length-2]);
        this.$emit('rerender');
      }
    },

    activateTab(tabName) {
      this.$store.commit('tab/active', tabName);
      this.$emit('rerender');
      this.$store.commit('tab/active', tabName);
      this.$emit('rerender');
    }
  },

  computed: {
    activeTab() {
      return this.$store.getters['tab/activeTab'];
    }
  }
}
</script>

<style scoped>
.tab {
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 100%;
  transition: background-color .3s;
}

.tab:hover,
.active {
  background-color: #686C6F;
}

.tabName {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  color: white;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tabIcon {
  padding-right: 10px;
  display: flex;
  align-items: center;
}
</style>
