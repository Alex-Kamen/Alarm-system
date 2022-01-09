<template>
  <div>
    <div class="treeItem"  @dblclick="isChangeName = true" @click="isOpened = !isOpened">
      <div class="listIcon" :class="{opened: isOpened}"></div>
      <v-icon :size="25" class="treeItem__icon">
        $vuetify.icons.values.{{objectList.groupIcon}}
      </v-icon>
      <p class="treeItem__text" v-if="!isChangeName">
        {{objectList.treeName}}
      </p>
      <input v-model="treeGroupName" v-if="isChangeName" class="treeItem__input"/>
      <p v-if="isChangeName" @click="changeName" class="treeItem__text btn">ОК</p>
    </div>
    <div v-if="isOpened">
      <TreeItem
        style="padding-left: 35px"
        v-for="(object, index) in objectList.objectList"
        :object="object"
        :index="index"
        :type="objectList.type"
        :key="index"
        @rerender="rerender()"
      />
    </div>
  </div>

</template>

<script>
import TreeItem from "./TreeItem";
export default {
  name: "TreeGroupItem",
  components: {TreeItem},
  props: {
    objectList: Object,
  },

  data() {
    return {
      isOpened: false,
      isChangeName: false,
      treeGroupName: this.objectList.treeName,
    }
  },

  methods: {
    changeName() {
      this.isChangeName = false;
    },

    activateObject() {
      this.$store.commit('object/activateObjectOnList', [this.index, this.objectList.type, !this.object.active]);
      this.$emit('rerender');
    },

    rerender() {
      this.$emit('rerender');
    }
  }
}
</script>

<style scoped>
.listIcon {
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-left: 7px solid #686C6F;
  border-bottom: 7px solid transparent;
  margin-right: 10px;
  transition: transform .3s;
}

.opened {
  transform: rotate(90deg);
}
</style>
