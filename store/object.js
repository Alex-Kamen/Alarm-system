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
    state.objectList.sensors.forEach((object, objectIndex) => {
      if (index === objectIndex) object.active = status;
    })
  },

  hoverObjectOnList(state, [index, status]) {
    state.objectList.sensors.forEach((object, objectIndex) => {
      if (index === objectIndex) object.hover = status;
    })
  },

  changePosition(state, [index, x, y]) {
    state.objectList.sensors.forEach((object, objectIndex) => {
      if (index === objectIndex) {
        object.x = x;
        object.y = y;
      }
    })
  },
};

export const actions = {};

export const getters = {
  activeObject: (state) => state.activeObject,
  objectList: (state) => state.objectList
};
