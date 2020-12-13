export const state = () => ({
  coachs: [],
  coach: null,
  coachByCondition: [],
  rowCoach: null,
  nextMaintenance: [],
  totalIncome: null,
  coachOverDue: []
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
    return state.coach
  },
  getTotalIncome: (state) => {
    return state.totalIncome;
  },
  getCoachOverDue: (state) => {
    let result = [];
    state.coachOverDue.filter((item) => {
      result.push(item)
    })
    return result
  }
}
// mutation
const mutations = {
  setCoachs: (state, payload) => {
    state.coachs = payload
  },
  setCoachById: (state, payload) => {
    state.coach = payload
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
  },
  setCoachOverDue: (state, payload) => {
    state.coachOverDue = payload
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
  },
  async getCoachOverDue({ commit }, payload) {
    const data = await this.$axios.$get('coach/getCoachOverDue')
    if (data.code === 200) {
      commit('setCoachOverDue', data.data)
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