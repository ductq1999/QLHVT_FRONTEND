export const state = () => ({
  driverTripByDriverId: [],
  salaryMonth: null , 
  driverTrip : null
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
  },
  getDriverTripById: (state) => {
    return state.driverTrip
  }
}
// mutation
const mutations = {
  setDriverTripByDriverId: (state, payload) => {
    state.driverTripByDriverId = payload
  },
  setSalaryMonth: (state, payload) => {
    state.salaryMonth = payload
  },
  setDriverTripById: (state, payload) => {
    state.driverTrip = payload
  },
}
// action
const actions = {
  setDriverTripByDriverIdAction: (context, payload) => {
    context.commit('setDriverTripByDriverId', payload)
  },
  setSalaryMonthAction: (context, payload) => {
    context.commit('setSalaryMonth', payload)
  },
  setDriverTripByIdAction: (context, payload) => {
    context.commit('setDriverTripById', payload)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}