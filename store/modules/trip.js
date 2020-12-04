import { geoMercatorRaw } from "d3";

export const state = () => ({
  tripByCondition: [],
  rowTrip: null
})
// getter
const getters = {
  getTripByCondition: (state) => {
    let result = [];
    state.tripByCondition.filter((item) => {
      result.push(item)
    })
    return result
  }
}
// mutation
const mutations = {
  setTripByCondition: (state, payload) => {
    state.tripByCondition = payload.data,
      state.rowTrip = payload.totalRow
  },
}
// action
const actions = {
  setTripByConditionAction: (context, payload) => {
    context.commit('setTripByCondition', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}