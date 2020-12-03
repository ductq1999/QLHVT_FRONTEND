export const state = () => ({
  driverTripByDriverId: [],
  salaryMonth: null
})
// getter
const getters = {
  getDriverTripByDriverId: (state) => {
    let result = [];
    state.driverTripByDriverId.filter((item) => {
      result.push(item)
    })
    return result
  },
  getSalaryMonth: (state) => {
    return state.salaryMonth
  }
}
// mutation
const mutations = {
  setDriverTripByDriverId: (state, payload) => {
    state.driverTripByDriverId = payload
  },
  setSalaryMonth: (state, payload) => {
    state.salaryMonth = payload
  }
}
// action
const actions = {
  setDriverTripByDriverIdAction: (context, payload) => {
    context.commit('setDriverTripByDriverId', payload)
  },
  setSalaryMonthAction: (context, payload) => {
    context.commit('setSalaryMonth', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}