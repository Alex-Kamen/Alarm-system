<template>
  <div class="object__item">
    <v-icon :size="35">
      $vuetify.icons.values.{{icon}}
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "ObjectItem",

  props: {
    icon: String
  },

  data() {
    return {
    }
  },
}
</script>

<style scoped>
.object__item {
  padding: 5px !important;
}
</style>
