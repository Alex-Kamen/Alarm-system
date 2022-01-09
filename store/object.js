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

  activateObjectOnList(state, [index, status]) {
    state.objectList.sensors[index].active = status;
  },

  changePosition(state, [index, currentX, currentY, prevX, prevY]) {
    state.objectList.sensors[index].moveEffect(currentX, currentY, prevX, prevY);

    let tmp = state.objectList.sensors[index];
    state.objectList.sensors[index] = state.objectList.sensors[state.objectList.sensors.length-1];
    state.objectList.sensors[state.objectList.sensors.length-1] = tmp;
  },
};

export const actions = {};

export const getters = {
  activeObject: (state) => state.activeObject,
  objectList: (state) => state.objectList,
};
