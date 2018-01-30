import Vue from 'vue'
import Vuex from 'vuex'
// import PersistedState from 'vuex-persistedstate'

import user from './modules/user'
import company from './modules/company'
import wallet from './modules/wallet'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [PersistedState()],
  modules: {
    user,
    company,
    wallet,
  },
})
export default store
