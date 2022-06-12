<template>
  <div class="contextMenu">
    <div class="menu__item" @click="deleteObjects">Удалить</div>
    <div class="menu__item" @click="groupObject">Сгруппировать</div>
    <div class="menu__item" @click="deleteGroupObject">Разгруппировать</div>
    <div class="menu__item" @click="rotateObject">Поворот</div>
    <div class="menu__item" @click="copy">Копировать</div>
    <div class="menu__item" @click="paste">Вставить</div>
    <div class="menu__item" @click="cut">Вырезать</div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",

  methods: {
    deleteObjects() {
      this.$store.commit('object/deleteObjects');
      this.$emit('rerender');
    },

    groupObject() {
      this.$store.commit('object/groupObject');
      this.$store.commit('object/deleteObjects');
      this.$emit('rerender');
    },

    deleteGroupObject() {
      this.$store.commit('object/deleteGroupObject');
      this.$emit('rerender');
    },

    rotateObject() {
      this.$store.commit('object/rotateObject');
      this.$emit('rerender');
    },

    copy() {
      this.$store.commit('object/copy');
      this.$emit('rerender');
    },

    paste() {
      this.$store.commit('object/paste');
      this.$emit('rerender');
    },

    cut() {
      this.$store.commit('object/cut');
      this.$emit('rerender');
    }
  },

  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Delete') this.deleteObjects();
      if (event.key.toLowerCase() === 'g') this.groupObject();
      if (event.key.toLowerCase() === 'r') this.deleteGroupObject();
    })
  }
}
</script>

<style scoped>
.contextMenu {
  position: fixed;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
}

.menu__item {
  color: white;
  font-size: 17px;
  font-weight: normal;
  font-family: Arial;
  padding: 3px 10px;
  cursor: pointer;
  transition: background-color .3s;
}

.menu__item:hover {
  background-color: black;
}
</style>
