export const state = () => ({
  busess: [],
  buses: null,
  busesByCondition: [],
  rowBuses: null,
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
  getBusesById: (state) => {
    return state.buses
  },
}
// mutation
const mutations = {
  setBuses: (state, payload) => {
    state.busess = payload
  },
  setBusesById: (state, payload) => {
    state.buses = payload
  },
  setBusesByCondition: (state, payload) => {
    state.busesByCondition = payload.data,
      state.rowBuses = payload.totalRow
  },
}
// action
const actions = {
  async getBuses({ commit }, payload) {
    const data = await this.$axios.$get('buses/getAll')
    if (data.code === 200) {
      commit('setBuses', data.data)
    }
  },
  setBusesByIdAction: (context, payload) => {
    context.commit('setBusesById', payload)
  },
  setBusesByConditionAction: (context, payload) => {
    context.commit('setBusesByCondition', payload)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}