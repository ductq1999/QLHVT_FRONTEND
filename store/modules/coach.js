export const state = () => ({
  coachs: [],
  coach: null,
  coachByCondition: [],
  rowCoach: null

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
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}