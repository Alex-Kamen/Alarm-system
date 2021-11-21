<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        style="padding: 5px; background-color: rgba(0, 0, 0, 0); border: none;"
      >
        <v-icon :size="35">
          $vuetify.icons.values.{{icon}}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
      >
        <v-list-item-title>
          <object-item :icon="item"></object-item>
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
    items: Array
  }
}
</script>

<style scoped>
.object__item {
  padding: 5px !important;
}
</style>
