import Vue from 'vue'
import Router from 'vue-router'
import VueHead from 'vue-head'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'

import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

import RootLayout from './views/layouts/RootLayout'
import { VeeValidateConfig } from './config'

Vue.use(Router)
Vue.use(VueHead)
Vue.use(VueSweetalert2)
Vue.use(VeeValidate, VeeValidateConfig)

sync(store, router)

// Move page to top after every url change
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

// The root vue app
export const app = new Vue({
  el: '#app',
  data: {},
  router: router,
  store: store,
  render(createElement) {
    return createElement(RootLayout);
  },
  beforeCreate() {
    store.dispatch('refresh')
  },
})
