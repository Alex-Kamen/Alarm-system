export const state = () => ({
  activeObject: {},
  objectList: {
    sensors: [],
    building: []
  },
});

export const mutations = {
  activateObject(state, object) {
    state.activeObject = object;
  },

  addObject(state, [type, object]) {
    state.objectList[type].push(object);
  },

  activateObjectOnList(state, [index, type, status]) {
    state.objectList[type][index].active = status;
  },

  changePosition(state, [index, type, currentX, currentY, prevX, prevY]) {
    state.objectList[type][index].moveEffect(currentX, currentY, prevX, prevY);

    let tmp = state.objectList[type][index];
    state.objectList[type][index] = state.objectList[type][state.objectList[type].length-1];
    state.objectList[type][state.objectList[type].length-1] = tmp;
  },

  changeName(state, [index, type, treeName]) {
    state.objectList[type][index].treeName = treeName;
  },

  changeSettings(state, [object, settings]) {
    for (const setting of object.settings) {
      object[setting.header] = settings[setting.header];
    }
  }
};

export const actions = {};

export const getters = {
  activeObject: (state) => state.activeObject,
  objectList: (state) => state.objectList,
  objectSettings: (state) => {
    let activeObjectList = [
      ...state.objectList.sensors.filter((object) => object.active),
      ...state.objectList.building.filter((object) => object.active)
    ];

    if (activeObjectList.length === 1) return activeObjectList[0];
  }
};
