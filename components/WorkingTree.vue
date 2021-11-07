<template>
  <div class="workingTree">
    <h1 class="workingTree__title">Дерево объектов</h1>
  </div>
</template>

<script>
export default {
  name: "WorkingTree"
}
</script>

<style scoped>
.workingTree {
  background-color: white;
  width: 250px;
  height: calc(100vh - 90px);
}

.workingTree__title {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  border-bottom: 1px solid black;
  padding: 15px 0 15px 20px;
  margin: 0;
}
</style>
