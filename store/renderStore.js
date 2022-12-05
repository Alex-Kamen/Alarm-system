export const state = () => ({
  renderList: []
});

export const mutations = {
  add(state, renderItem) {
    state.renderList.push(renderItem);
  }
};

export const getters = {
  renderList: state => state.renderList
};
