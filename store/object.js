import {BuildingGroup, SensorGroup} from "../models/Group";
import {SensorMapper} from "../mapper/SensorMapper";
import {BuildingMapper} from '../mapper/BuildingMapper';
import _ from "lodash";

export const state = () => ({
  activeObject: {},
  objectList: {
    sensors: [],
    building: []
  },
  clipboard: {
    sensors: [],
    building: []
  },
  layerStatus: false, // false - sensor, true - building
  fieldPosition: {
    x: 0,
    y: 0,
    zoom: 1
  }
});

export const mutations = {
  setObjectList(state, objectList) {
    console.log(objectList)
    state.objectList.sensors = objectList.sensors.map((sensor) => new SensorMapper().toObject(sensor));
    state.objectList.building = objectList.building.map((building) => new BuildingMapper().toObject(building));
  },

  layerStatus(state, status) {
    state.layerStatus = status;
  },

  saveObjectList(state) {
    this.dispatch('tab/save', {objectList: state.objectList})
  },

  activateObject(state, object) {
    state.activeObject = object;
  },

  addObject(state, [type, object]) {
    if (object.path && type === 'sensors') {
      state.objectList[type].unshift(object);
    } else {
      state.objectList[type].push(object);
    }
  },

  activateObjectOnList(state, [object, status]) {
    object.active = status;
  },

  changePosition(state, [index, type, currentX, currentY, prevX, prevY]) {
    state.objectList[type][index].moveEffect(currentX, currentY, prevX, prevY);

    let tmp = state.objectList[type][index];
    state.objectList[type][index] = state.objectList[type][state.objectList[type].length-1];
    state.objectList[type][state.objectList[type].length-1] = tmp;
  },

  changeFieldPosition(state, [currentX, currentY, prevX, prevY]) {
    state.fieldPosition.x = currentX;
    state.fieldPosition.y = currentY;
  },

  changeName(state, [object, treeName]) {
    object.treeName = treeName;
  },

  changeSettings(state, [object, settings]) {
    for (const setting of object.settings) {
      object[setting.header] = settings[setting.header];
    }
  },

  deleteObjects(state) {
    state.objectList.sensors = state.objectList.sensors.filter((sensor) => !sensor.active);
    state.objectList.building = state.objectList.building.filter((sensor) => !sensor.active);
  },

  groupObject(state) {
    let group = state.objectList.building.filter((building) => building.active);
    if (group.length) this.commit('object/addObject', ['building', new BuildingGroup('group', group)])

    group = state.objectList.sensors.filter((sensor) => sensor.active);
    group.forEach((sensor, index) => {
      sensor.x = group[0].x + 50 * index;
      sensor.y = group[0].y;
    })
    if (group.length) this.commit('object/addObject', ['sensors', new SensorGroup('group', group)])
  },

  deleteGroupObject(state) {
    let groupList = state.objectList.building.filter((building) => building.active && building.list);
    state.objectList.building = state.objectList.building.filter((building) => !building.active);
    groupList.map((group) => {
      group.list.forEach((object) => {
        this.commit('object/addObject', ['building', object])
      })
    });

    groupList = state.objectList.sensors.filter((sensor) => sensor.active && sensor.list);
    state.objectList.sensors = state.objectList.sensors.filter((sensor) => !sensor.active);
    groupList.map((group) => {
      group.list.forEach((object) => {
        this.commit('object/addObject', ['sensors', object])
      })
    });
  },

  rotateObject(state) {
    state.objectList.sensors.forEach((sensor) => {
      if (sensor.active) sensor.rotate();
    })

    state.objectList.building.forEach((building) => {
      if (building.active) building.rotate();
    })
  },

  copy(state) {
    state.clipboard.sensors = _.cloneDeep(state.objectList.sensors
      .filter((sensor) => sensor.active)
      .map((sensor) => {
        const obj = _.cloneDeep(sensor);
        sensor.active = false;
        return obj;
      }));

    state.clipboard.building = _.cloneDeep(state.objectList.building
      .filter((building) => building.active)
      .map((building) => {
        const obj = _.cloneDeep(building);
        building.active = false;
        return obj;
      }));
  },

  paste(state) {
    state.clipboard.sensors.forEach((sensor) => this.commit('object/addObject', ['sensors', _.cloneDeep(sensor)]));
    state.clipboard.building.forEach((building) => this.commit('object/addObject', ['building', _.cloneDeep(building)]));
    console.log(state.objectList)
  },

  cut(state) {
    state.clipboard.sensors = _.cloneDeep(state.objectList.sensors
      .filter((sensor) => sensor.active)
      .map((sensor) => {
        return _.cloneDeep(sensor);
      }));

    state.clipboard.building = _.cloneDeep(state.objectList.building
      .filter((building) => building.active)
      .map((building) => {
        return _.cloneDeep(building);
      }));

    state.objectList.sensors = state.objectList.sensors.filter((sensor) => !sensor.active);
    state.objectList.building = state.objectList.building.filter((building) => !building.active);
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
  },
  layerStatus: (state) => state.layerStatus,
  fieldPosition: (state) => state.fieldPosition
};
