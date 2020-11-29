export const state = () => ({
    drivers: [],
    driver: null,
    driverByCondition: [],
    rowDriver: null
})
// getter
const getters = {
    getAllDriver: (state) => {
        let result = [];
        state.drivers.filter((item) => {
            result.push(item)
        })
        return result
    },
    getDriverById: (state) => {
        return state.driver
    }
}
// mutation
const mutations = {
    setDrivers: (state, payload) => {
        state.drivers = payload
    },
    setDriverById: (state, payload) => {
        state.driver = payload
    },
    setDriverByCondition: (state, payload) => {
        state.driverByCondition = payload.data,
        state.rowDriver = payload.totalRow
    },
}
// action
const actions = {
    async getDrivers({ commit }, payload) {
        const data = await this.$axios.$get('driver/getAll')
        if (data.code === 200) {
            commit('setDrivers', data.data)
        }
    },
    setDriverByIdAction: (context, payload) => {
        context.commit('setDriverById', payload)
    },
    setDriverByConditionAction: (context, payload) => {
        context.commit('setDriverByCondition', payload)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}