import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Views
import UserLoginView from '../views/main_pages/user_auth/UserLogin'
import UserSignUpView from '../views/main_pages/user_auth/UserSignUp'
import UserSignUpFollowUpView from '../views/main_pages/user_auth/UserSignUpFollowUp'
import DashboardView from '../views/main_pages/dashboard/Dashboard'
import CompanyListView from '../views/main_pages/company/CompanyList'
import CompanyDetailView from '../views/main_pages/company/CompanyDetail'
import WalletView from '../views/main_pages/wallet/Wallet'
import SettingsView from '../views/main_pages/settings/Settings'
import SettingsVerificationView from '../views/main_pages/settings/SettingsVerification'
import SettingsSecurityView from '../views/main_pages/settings/SettingsSecurity'

// Error Pages
import NotFoundView from '../views/error_pages/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Dashboard
    {
      path: '/login',
      component: UserLoginView,
      name: 'user_login',
      beforeEnter: (to, from, next) => {
        if (store.getters.is_login) {
          if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
          else next({ name: 'dashboard' })
        } else next()
      },
    }, {
      path: '/signup',
      component: UserSignUpView,
      name: 'user_signup',
      beforeEnter: (to, from, next) => {
        if (store.getters.is_login) {
          if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
          else next({ name: 'dashboard' })
        } else next()
      },
    }, {
      path: '/signup/followup',
      component: UserSignUpFollowUpView,
      name: 'user_signup_followup',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level > 2) next({ name: 'dashboard' })
        else next()
      },
    }, {
      path: '/dashboard',
      component: DashboardView,
      name: 'dashboard',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/company',
      component: CompanyListView,
      name: 'token_sale_list',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/company/active',
      component: CompanyListView,
      name: 'token_sale_list_active',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/company/coming',
      component: CompanyListView,
      name: 'token_sale_list_coming',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/company/all',
      component: CompanyListView,
      name: 'token_sale_list_all',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/company/:id',
      component: CompanyDetailView,
      name: 'token_sale_detail',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/wallet',
      component: WalletView,
      name: 'wallet',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/settings',
      component: SettingsView,
      name: 'settings',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/settings/verification',
      component: SettingsVerificationView,
      name: 'settings_verification',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      path: '/settings/security',
      component: SettingsSecurityView,
      name: 'settings_security',
      beforeEnter: (to, from, next) => {
        if (!store.getters.is_login) next({ name: 'user_login' })
        else if (store.getters.verification_level < 2) next({ name: 'user_signup_followup' })
        else next()
      },
    }, {
      // not found handler
      path: '/404',
      component: NotFoundView,
      name: '404',
    }, {
      path: '*',
      redirect: { name: '404' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  },
})
