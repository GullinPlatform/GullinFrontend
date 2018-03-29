import Router from 'vue-router'
import store from '../store/index'

// Views
import UserLoginView from '../views/main_pages/user_auth/UserLogin'
import UserSignUpView from '../views/main_pages/user_auth/UserSignUp'
import UserSignUpFollowUpView from '../views/main_pages/user_auth/UserSignUpFollowUp'
import UserForgetPasswordView from '../views/main_pages/user_auth/ForgetPassword'
import DashboardView from '../views/main_pages/dashboard/Dashboard'
import CompanyListView from '../views/main_pages/company/CompanyList'
import CompanyDetailView from '../views/main_pages/company/CompanyDetail'
import WalletView from '../views/main_pages/wallet/Wallet'
import SettingsView from '../views/main_pages/settings/Settings'
import SettingsVerificationView from '../views/main_pages/settings/SettingsVerification'
import SettingsSecurityView from '../views/main_pages/settings/SettingsSecurity'

// Error Pages
import NotFoundView from '../views/error_pages/404'

// Permissions
const allowAny = (to, from, next) => {
  // If already login
  if (store.getters.is_login) {
    // Check if verification_level < 2 (wallet not created)
    if (store.getters.verification_level < 2) return next({ name: 'user_signup_followup' })
    // If verification_level >= 2 (wallet created), then load wallet and go to the destination
    return store.dispatch('getWallet').then(() => next())
  }
  // Else Refresh token
  store.dispatch('refresh')
    .then(() => {
      // If logged in, then check if verification_level < 2 (wallet not created)
      if (store.getters.verification_level < 2) return next({ name: 'user_signup_followup' })
      // If verification_level >= 2 (wallet created), then load wallet and go to the destination
      return store.dispatch('getWallet').then(() => next())
    })
    // After refresh, if still logged out, go to login page
    .catch(() => next())
}

const isNotAuthenticated = (to, from, next) => {
  // If already login
  if (store.getters.is_login) {
    // Check if verification_level < 2 (wallet not created)
    if (store.getters.verification_level < 2) return next({ name: 'user_signup_followup' })
    // If verification_level > 2 (wallet created), then load wallet and go to dashboard
    return store.dispatch('getWallet').then(() => next({ name: 'dashboard' }))
  }
  // Else Refresh token
  store.dispatch('refresh')
    .then(() => {
      // If logged in, then check if verification_level < 2 (wallet not created)
      if (store.getters.verification_level < 2) return next({ name: 'user_signup_followup' })
      // If verification_level > 2 (wallet created), then load wallet and go to dashboard
      return store.dispatch('getWallet').then(() => next({ name: 'dashboard' }))
    })
    // After refresh, if still logged out, go to login page
    .catch(() => next())
}

const isAuthenticatedAndVerified = (to, from, next) => {
  // If already login
  if (store.getters.is_login) {
    // Check if verification_level < 2 (wallet not created)
    if (store.getters.verification_level < 2) return next({ name: 'user_signup_followup' })
    // If verification_level >= 2 (wallet created), then load wallet and go to the destination
    return store.dispatch('getWallet').then(() => next())
  }

  // Else Refresh token
  store.dispatch('refresh')
    .then(() => {
      // If logged in, then check if verification_level < 2 (wallet not created)
      if (store.getters.verification_level < 2) return next({ name: 'user_signup_followup' })
      // If verification_level >= 2 (wallet created), then load wallet and go to the destination
      return store.dispatch('getWallet').then(() => next())
    })
    // After refresh, if still logged out, go to login page
    .catch(() => next({ name: 'user_login' }))
}

const isAuthenticatedAndNotVerified = (to, from, next) => {
  // If already login
  if (store.getters.is_login) {
    // If verification_level >= 2 (wallet created), then load wallet and go to dashboard
    if (store.getters.verification_level >= 2) return store.dispatch('getWallet').then(() => next({ name: 'dashboard' }))
    // Else if verification_level < 2 (wallet not created), then go to destination
    return next()
  }

  // Else Refresh token
  store.dispatch('refresh')
    .then(() => {
      // If verification_level >= 2 (wallet created), then load wallet and go to dashboard
      if (store.getters.verification_level >= 2) return store.dispatch('getWallet').then(() => next({ name: 'dashboard' }))
      // Else if verification_level < 2 (wallet not created), then go to destination
      return next()
    })
    // After refresh, if still logged out, go to login page
    .catch(() => next({ name: 'user_login' }))
}


export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    component: UserLoginView,
    name: 'user_login',
    beforeEnter: isNotAuthenticated,
  }, {
    path: '/signup',
    component: UserSignUpView,
    name: 'user_signup',
    beforeEnter: isNotAuthenticated,
  }, {
    path: '/com',
    component: UserSignUpView,
    name: 'url_for_luke',
    beforeEnter: isNotAuthenticated,
  }, {
    path: '/signup/followup',
    component: UserSignUpFollowUpView,
    name: 'user_signup_followup',
    beforeEnter: isAuthenticatedAndNotVerified,
  }, {
    path: '/forget_password',
    component: UserForgetPasswordView,
    name: 'user_forget_password',
    beforeEnter: isNotAuthenticated,
  }, {
    path: '/',
    component: DashboardView,
    name: 'dashboard',
    beforeEnter: isAuthenticatedAndVerified,
  }, {
    path: '/company',
    component: CompanyListView,
    name: 'token_sale_list',
    beforeEnter: allowAny,
  }, {
    path: '/company/active',
    component: CompanyListView,
    name: 'token_sale_list_active',
    beforeEnter: allowAny,
  }, {
    path: '/company/coming',
    component: CompanyListView,
    name: 'token_sale_list_coming',
    beforeEnter: allowAny,
  }, {
    path: '/company/all',
    component: CompanyListView,
    name: 'token_sale_list_all',
    beforeEnter: allowAny,
  }, {
    path: '/company/:id',
    component: CompanyDetailView,
    name: 'token_sale_detail',
    beforeEnter: allowAny,
  }, {
    path: '/wallet',
    component: WalletView,
    name: 'wallet',
    beforeEnter: isAuthenticatedAndVerified,
  }, {
    path: '/settings',
    component: SettingsView,
    name: 'settings',
    beforeEnter: isAuthenticatedAndVerified,
  }, {
    path: '/settings/verification',
    component: SettingsVerificationView,
    name: 'settings_verification',
    beforeEnter: isAuthenticatedAndVerified,
  }, {
    path: '/settings/security',
    component: SettingsSecurityView,
    name: 'settings_security',
    beforeEnter: isAuthenticatedAndVerified,
  }, {
    // not found handler
    path: '/404',
    component: NotFoundView,
    name: '404',
  }, {
    path: '*',
    redirect: { name: '404' },
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  },
})
