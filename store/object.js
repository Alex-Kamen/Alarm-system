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
  }
};

export const actions = {};

export const getters = {
  activeObject: (state) => state.activeObject,
  objectList: (state) => state.objectList,
};
