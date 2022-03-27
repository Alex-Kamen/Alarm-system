export const state = () => ({
  tabList: [],
  activeTab: null
});

export const mutations = {
  remove(state, tabName) {
    if (state.tabList.length > 1) {
      state.tabList = state.tabList.filter((tab) => tab != tabName);
      this.commit('tab/active', state.tabList[state.tabList.length-1]);
      localStorage.removeItem(tabName);
    }
  },

  newTab(state, [name, objectList]) {
    const tabName = name ? name : Date.now();
    state.tabList.push(tabName);

    if (!objectList) {
      localStorage.setItem(tabName, JSON.stringify({sensors: [], building: []}));
    }

    state.activeTab = tabName;
    this.commit('object/setObjectList', objectList ? objectList : JSON.parse(localStorage.getItem(tabName)))
  },

  active(state, tab) {
    this.commit('object/setObjectList', JSON.parse(localStorage.getItem(tab)))
    state.activeTab = tab;
  }
};

export const actions = {
  save({commit, state}, {tabName, objectList}) {
    localStorage.setItem(tabName || state.activeTab, JSON.stringify(objectList));
  }
};

export const getters = {
  tabList: (state) => state.tabList,
  activeTab: (state) => state.activeTab
};
