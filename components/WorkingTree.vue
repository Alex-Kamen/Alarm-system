<template>
  <div class="workingTree">
    <h1 class="workingTree__title">Дерево объектов</h1>
    <p class="workingTree__header">Объекты здания</p>
    <div>
      <div v-for="(object, index) in buildingList" :key="index">
        <TreeGroupItem
          v-if="object.list"
          :objectList="object"
          :objectIndex="index"
          :type="'building'"
          @rerender="rerender()"
        />
        <TreeItem
          v-else
          :object="object"
          :index="index"
          :type="'building'"
          @rerender="rerender()"
        />
      </div>
    </div>
    <p class="workingTree__header">Датчики</p>
    <div>
      <div v-for="(object, index) in sensorList" :key="index">
        <TreeGroupItem
          v-if="object.list"
          :objectList="object"
          :objectIndex="index"
          :type="'sensors'"
          @rerender="rerender()"
        />
        <TreeItem
          v-else
          :object="object"
          :index="index"
          :type="'sensors'"
          @rerender="rerender()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TreeItem from "./TreeItem";
import TreeGroupItem from "./TreeGroupItem";
import {Group} from '../models/Group';

export default {
  name: "WorkingTree",

  components: {
    TreeGroupItem,
    TreeItem
  },

  computed: {
    buildingList() {
      return this.$store.getters['object/objectList'].building;
    },

    sensorList() {
      return this.$store.getters['object/objectList'].sensors;
    },
  },

  methods: {
    rerender() {
      this.$emit('rerender');
    }
  }
}
</script>

<style scoped>
.workingTree {
  background-color: white;
  overflow-y: auto;
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

.workingTree__header {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin: 10px 0;
}
</style>
