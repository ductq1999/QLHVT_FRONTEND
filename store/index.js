import Vue from 'vue'
import Vuex from 'vuex'
import driver from './modules/driver'
import coach from './modules/coach'
import buses from './modules/buses'
import trip from './modules/trip'
import driverTrip from './modules/driverTrip'

Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    modules: {
      driver,
      coach,
      buses,
      trip,
      driverTrip
    }
  })
}
export default createStore
