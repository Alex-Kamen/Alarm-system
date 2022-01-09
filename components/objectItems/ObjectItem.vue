<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        style="padding: 5px; background-color: rgba(0, 0, 0, 0); border: none;"
        @click="activateObject"
        :title="settings.title"
      >
        <v-icon :size="35">
          $vuetify.icons.values.{{settings.icon}}
        </v-icon>
      </v-btn>
    </template>
  </v-menu>
</template>

<script>
import objectUtils from "../../models/Object";

export default {
  name: "ObjectItem",

  props: {
    settings: Object,
  },

  methods: {
    activateObject() {
      const object = Object.assign({}, objectUtils.defaultSensorData);
      object.icon = this.settings.icon;
      object.color = this.settings.color;
      object.opacityColor = this.settings.opacityColor;
      object.type = this.settings.type;
      this.$store.commit('object/activateObject', object);
    }
  }
}
</script>

<style scoped>
.v-btn {
  background-color: #686C6F !important;
  transition: background-color .3s;
}

.v-btn:hover {
  background-color: #424547 !important;
  cursor: pointer;
  height: 100% !important;
}
</style>
