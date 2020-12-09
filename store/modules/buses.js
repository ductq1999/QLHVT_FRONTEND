export const state = () => ({
  busess: [],
  buses: null,
})
// getter
const getters = {
  getAllBuses: (state) => {
    let result = [];
    state.busess.filter((item) => {
      result.push(item)
    })
    return result
  },
}
// mutation
const mutations = {
  setBusess: (state, payload) => {
    state.busess = payload
  },
}
// action
const actions = {
  async getBusess({ commit }, payload) {
    const data = await this.$axios.$get('buses/getAll')
    if (data.code === 200) {
      commit('setBusess', data.data)
    }
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}