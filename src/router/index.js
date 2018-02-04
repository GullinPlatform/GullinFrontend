import Vue from 'vue'
import Router from 'vue-router'

// Views
import UserLoginView from 'views/main_pages/user_auth/UserLogin'
import UserSignUpView from 'views/main_pages/user_auth/UserSignUp'
import UserSignUpFollowUpView from 'views/main_pages/user_auth/UserSignUpFollowUp'
import DashboardView from 'views/main_pages/dashboard/Dashboard'
import CompanyListView from 'views/main_pages/company/CompanyList'
import CompanyDetailView from 'views/main_pages/company/CompanyDetail'
import WalletView from 'views/main_pages/wallet/Wallet'
import SettingsView from 'views/main_pages/settings/Settings'

// Error Pages
import NotFoundView from 'views/error_pages/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Dashboard
    {
      path: '/login',
      component: UserLoginView,
      name: 'user_login',
    }, {
      path: '/signup',
      component: UserSignUpView,
      name: 'user_signup',
    }, {
      path: '/signup/followup',
      component: UserSignUpFollowUpView,
      name: 'user_signup_followup',
    }, {
      path: '/dashboard',
      component: DashboardView,
      name: 'dashboard',
    }, {
      path: '/company',
      component: CompanyListView,
      name: 'token_sale_list',
    }, {
      path: '/company/active',
      component: CompanyListView,
      name: 'token_sale_list_active',
    }, {
      path: '/company/coming',
      component: CompanyListView,
      name: 'token_sale_list_coming',
    }, {
      path: '/company/all',
      component: CompanyListView,
      name: 'token_sale_list_all',
    }, {
      path: '/company/:id',
      component: CompanyDetailView,
      name: 'token_sale_detail',
    }, {
      path: '/wallet',
      component: WalletView,
      name: 'wallet',
    }, {
      path: '/settings',
      component: SettingsView,
      name: 'settings',
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
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})
