<template>
  <div
    class="treeItem"
    @click="activateObject"
    :class="{active: object.active}"
    :title="object.treeName"
    @dblclick="isChangeName = true"
  >
    <v-icon :size="25" class="treeItem__icon">
      $vuetify.icons.values.{{object.treeIcon}}
    </v-icon>
    <p class="treeItem__text" v-if="!isChangeName">
      {{ object.treeName }}
    </p>
    <input v-model="treeName" v-if="isChangeName" class="treeItem__input"/>
    <p v-if="isChangeName" @click="changeName" class="treeItem__text btn">ОК</p>
  </div>
</template>

<script>
export default {
  name: "TreeItem",

  props: {
    object: Object,
    index: Number,
    type: String
  },

  data() {
    return {
      isChangeName: false,
      treeName: this.object.treeName
    }
  },

  methods: {
    activateObject() {
      this.$store.commit('object/activateObjectOnList', [this.index, this.type, !this.object.active]);
      this.$emit('rerender')
    },

    changeName() {
      this.$store.commit('object/changeName', [this.index, this.type, this.treeName]);
      this.isChangeName = false;
    }
  }
}
</script>

<style>
.treeItem {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: background-color .3s;
  padding: 0 10px;
}

.treeItem:hover,
.active {
  background-color: #E5E5E5;
}

.treeItem__icon img {
  width: 25px !important;
  height: 25px !important;
}

.treeItem__text {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.treeItem__input {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  margin-left: 10px;
  width: 100px;
  border: none;
  outline: none;
}

.btn:hover {
  text-decoration: underline;
}
</style>
