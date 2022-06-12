<template>
  <div class="objectSettings">
    <h1 class="objectSettings__title">Настройки</h1>
    <div v-if="objectSettings">
      <div v-for="(setting, key) in objectSettings.settings" :key="key">
        <div v-if="setting.type === 'select'">
          <label :for="key" class="input__label">{{setting.name}}</label>
          <select v-model="object[setting.header]" @input="rerender" class="settings__input">
            <option value="circle">Радиальный</option>
            <option value="line">Линейный</option>
          </select>
        </div>
        <div v-else>
          <label :for="key" class="input__label">{{setting.name}}</label>
          <input :id="key" :type="setting.type" v-model="object[setting.header]" :placeholder="setting.name" @input="rerender" class="settings__input"/>
        </div>
      </div>
    </div>
    <div v-else class="setting__text">
      Выделите один объект
    </div>
  </div>
</template>

<script>
export default {
  name: "ObjectSettings",

  computed: {
    objectSettings() {
      return this.$store.getters['object/objectSettings'];
    },

    object() {
      return {
        x: this.getSetting('x'),
        y: this.getSetting('y'),
        treeName: this.getSetting('treeName'),
        height: this.getSetting('height'),
        width: this.getSetting('width'),
        color: this.getSetting('color'),
        area: this.getSetting('area'),
        capacity: this.getSetting('capacity'),
        angle: this.getSetting('angle'),
        type: this.getSetting('type'),
        amperage: this.getSetting('amperage'),
        resistance: this.getSetting('resistance'),
        voltage: this.getSetting('voltage')
      };
    }
  },

  methods: {
    getSetting(setting) {
      return this.objectSettings ? this.objectSettings[setting] : '';
    },

    rerender() {
      this.$store.commit('object/changeSettings', [this.objectSettings, this.object]);
      this.$emit('rerender');
    }
  }
}
</script>

<style scoped>
.objectSettings {
  background-color: white;
  width: 250px;
  height: calc(100vh - 90px);
  z-index: 1000;
}

.objectSettings__title {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  border-bottom: 1px solid black;
  padding: 15px 0 15px 20px;
  margin: 0;
}

.input__label,
.settings__input {
  display: block;
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
}

.input__label {
  padding: 15px 15px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.settings__input {
  margin: 0 15px;
  padding: 5px;
  outline: none;
  opacity: .5;
  transition: opacity .3s;
}

.settings__input:hover,
.settings__input:focus {
  opacity: 1;
}

.setting__text {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial;
  padding: 15px 15px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
