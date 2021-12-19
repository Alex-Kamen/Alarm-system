<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        style="padding: 5px; background-color: rgba(0, 0, 0, 0); border: none;"
        :title="title"
      >
        <v-icon :size="35">
          $vuetify.icons.values.{{icon}}
        </v-icon>
      </v-btn>
    </template>
    <v-list color="#686C6F">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
      >
        <v-list-item-title>
          <object-item :settings="item"></object-item>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import ObjectItem from "./ObjectItem";
export default {
  name: "MultipleObjectItem",

  components: {ObjectItem},

  props: {
    icon: String,
    items: Array,
    title: String
  },

  methods: {
    activateObject() {
      this.$store.commit('object/activateObject', {abc: 1123});
      console.log(this.$store.getters['object/activeObject'])
    }
  }
}
</script>

<style scoped>
.object__item {
  padding: 5px !important;
}

.v-list-item:hover {
  background-color: #424547 !important;
  cursor: pointer;
}

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
