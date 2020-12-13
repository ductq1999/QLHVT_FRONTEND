import { geoMercatorRaw } from "d3";

export const state = () => ({
  tripByCondition: [],
  rowTrip: null,
  trip: null
})
// getter
const getters = {
  getTripByCondition: (state) => {
    let result = [];
    state.tripByCondition.filter((item) => {
      result.push(item)
    })
    return result
  },
  getTripById: (state) => {
    return state.trip
  }
}
// mutation
const mutations = {
  setTripByCondition: (state, payload) => {
    state.tripByCondition = payload.data,
      state.rowTrip = payload.totalRow
  },
  setTripById: (state, payload) => {
    state.trip = payload
  },
}
// action
const actions = {
  setTripByConditionAction: (context, payload) => {
    context.commit('setTripByCondition', payload)
  },
  setTripByIdAction: (context, payload) => {
    context.commit('setTripById', payload)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}