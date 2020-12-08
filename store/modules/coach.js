export const state = () => ({
  coachs: [],
  coach: null,
  coachByCondition: [],
  rowCoach: null,
  nextMaintenance: [],
  totalIncome: null,

})
// getter
const getters = {
  getAllCoach: (state) => {
    let result = [];
    state.coachs.filter((item) => {
      result.push(item)
    })
    return result
  },
  getCoachById: (state) => {
    return state.driver
  },
  getTotalIncome: (state) => {
    return state.totalIncome;
  }
}
// mutation
const mutations = {
  setCoachs: (state, payload) => {
    state.coachs = payload
  },
  setCoachById: (state, payload) => {
    state.driver = payload
  },
  setCoachByCondition: (state, payload) => {
    state.coachByCondition = payload.data,
      state.rowCoach = payload.totalRow
  },
  setNextMaintenance: (state, payload) => {
    state.nextMaintenance = payload
  },
  setTotalIncome: (state, payload) => {
    state.totalIncome = payload
  }
}
// action
const actions = {

  async getCoachs({ commit }, payload) {
    const data = await this.$axios.$get('coach/getAll')
    if (data.code === 200) {
      commit('setCoachs', data.data)
    }
  },
  setCoachByIdAction: (context, payload) => {
    context.commit('setCoachById', payload)
  },
  setCoachByConditionAction: (context, payload) => {
    context.commit('setCoachByCondition', payload)
  },
  setNextMaintenanceAction: (context, payload) => {
    context.commit('setNextMaintenance', payload)
  },
  setTotalIncomeAction: (context, payload) => {
    context.commit('setTotalIncome', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}