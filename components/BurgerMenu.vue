<template>
  <div class="burgerMenu">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          style="padding: 5px; background-color: rgba(0, 0, 0, 0); border: none; cursor: pointer;"
        >
          <v-icon :size="30">
            $vuetify.icons.values.BurgerMenu
          </v-icon>
        </v-btn>
      </template>
      <v-list color="#686C6F">
        <v-list-item>
          <v-list-item-title class="burgerMenu__item" @click="save"> Сохранить </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="burgerMenu__item">
            <input
              id="file-input"
              type="file"
              name="file"
              multiple
              style="display: none"
              @change="load">
            <label for="file-input" style="cursor: pointer">Загрузить</label>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="burgerMenu__item" @click="logout"> Выйти </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "BurgerMenu",

  methods: {
    save() {
    },

    load() {
      let file = document.querySelector('#file-input').files[0];

      let reader = new FileReader();

      reader.readAsText(file);
      const store = this.$store;

      reader.onload = function() {
        store.commit('tab/newTab', [null, JSON.parse(reader.result)])
      };

      reader.onerror = function() {
        console.log(reader.error);
      };
    },

    logout() {
      console.log('close')
    }
  }
}
</script>

<style scoped>
.burgerMenu {
  transition: background-color .3s;
}

.burgerMenu:hover {
  background-color: #686C6F;
}

.burgerMenu__item {
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  font-family: Arial;
  color: white;
  padding: 5px 15px;
  transition: background-color .3s;
}

.burgerMenu__item:hover {
  background-color: #424547 !important;
}

.v-menu__content {
  left: 0 !important;
}
</style>
