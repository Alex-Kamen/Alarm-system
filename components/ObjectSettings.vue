<template>
  <div class="objectSettings">
    <h1 class="objectSettings__title">Настройки</h1>
  </div>
</template>

<script>
export default {
  name: "ObjectSettings"
}
</script>

<style scoped>
.objectSettings {
  background-color: white;
  width: 250px;
  height: calc(100vh - 90px);
}

.objectSettings__title {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  border-bottom: 1px solid black;
  padding: 15px 0 15px 20px;
  margin: 0;
}
</style>
