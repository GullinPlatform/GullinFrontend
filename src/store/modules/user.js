import userApi from '../../api/user-api'
import * as types from '../mutation-types'
import router from '../../router/index'

// initial state
const state = {
  // me
  me: {},
  // other
  is_login: false,
}

// getters
const getters = {
  is_login: state => state.is_login,
  verification_level: state => {
    if (!state.me || !state.is_login) return false
    return state.me.verification_level
  },
  me: state => {
    if (state.is_login && state.me) return state.me
    return {}
  },
  me_name: state => {
    if (state.is_login) return state.me.first_name + ' ' + state.me.last_name
    return ''
  },
}

// actions
const actions = {
  // Auth
  signup({ commit, dispatch }, form_data) {
    return userApi.signup(form_data)
      .then(() => {
        commit(types.REGISTER_SUCCESS)
        dispatch('getMe')
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },
  login({ commit, dispatch }, form_data) {
    return userApi.login(form_data)
      .then(() => {
        commit(types.LOGIN_SUCCESS)
        dispatch('getMe')
        dispatch('getWallet')
        return Promise.resolve()
      })
      .catch(error => {
        commit(types.LOGIN_FAILED)
        return Promise.reject(error)
      })
  },
  logout({ commit }) {
    userApi.logout()
      .then(() => {
        commit(types.LOGOUT)
      })
  },
  refresh({ commit, dispatch }) {
    userApi.refresh()
      .then(() => {
        commit(types.REFRESH_SUCCESS)
        dispatch('getMe')
        dispatch('getWallet')
        return Promise.resolve()
      })
      .catch((error) => {
        commit(types.REFRESH_FAILED)
        return Promise.reject(error)
      })
  },
  keepLogin({ commit }) {
    userApi.refresh()
      .then(() => {
        commit(types.REFRESH_SUCCESS)
        return Promise.resolve()
      })
      .catch((error) => {
        commit(types.REFRESH_FAILED)
        return Promise.reject(error)
      })
  },

  // Load Data
  getMe({ commit }) {
    return userApi.getMe()
      .then((response) => {
        commit(types.LOAD_ME, response)
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },
  updateMe({ commit }, form_data) {
    return userApi.updateMe(form_data)
      .then(() => {
        commit(types.UPDATE_ME)
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },

  // Sign Up Follow Up
  confirmEmail({ dispatch, commit }, form_data) {
    return userApi.confirmEmail(form_data)
      .then(() => {
        dispatch('getMe')
        commit(types.CONFIRM_EMAIL_SUCCESS)
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },
  addPhone({ dispatch, commit }, form_data) {
    return userApi.addPhone(form_data)
      .then(() => {
        commit(types.SEND_PHONE_CODE_SUCCESS)
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },
  confirmPhone({ dispatch, commit }, form_data) {
    return userApi.confirmPhone(form_data)
      .then(() => {
        dispatch('getMe')
        commit(types.CONFIRM_PHONE_SUCCESS)
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },
  addWalletAddress({ dispatch, commit }, form_data) {
    return userApi.addWalletAddress(form_data)
      .then(() => {
        commit(types.ADD_WALLET_ADDRESS_SUCCESS)
        return Promise.resolve()
      })
      .catch(error => Promise.reject(error))
  },

  changePassword({}, form_data) {
    return userApi.changePassword(form_data)
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  forgetPasswordSendEmail({}, email) {
    return userApi.forgetPasswordSendEmail(email)
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  forgetPasswordVerifyCode({}, token) {
    return userApi.forgetPasswordVerifyCode(token)
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  forgetPasswordResetPassword({}, form_data) {
    return userApi.forgetPasswordResetPassword(form_data)
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  sendTwoFactorCode({}) {
    return userApi.sendTwoFactorCode()
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
  verifyTwoFactorCode({}, token) {
    return userApi.verifyTwoFactorCode(token)
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error))
  },
}

// mutations
const mutations = {
  // auth
  [types.LOGIN_SUCCESS](state) {
    state.is_login = true
  },
  [types.LOGIN_FAILED](state) {
    state.is_login = false
    state.me = {}
  },
  [types.LOGOUT](state) {
    state.is_login = false
    state.me = {}
    // TODO: redirect to landing page
    router.push({ name: 'landing' })
  },
  [types.REFRESH_SUCCESS](state) {
    state.is_login = true
  },
  [types.REFRESH_FAILED](state) {
    state.is_login = false
    state.me = {}
  },
  [types.REGISTER_SUCCESS](state) {
    state.is_login = true
  },
  [types.REGISTER_FAILED](state) {
    state.is_login = false
    state.me = {}
  },
  // load data
  [types.LOAD_ME](state, response) {
    state.me = response
  },
  [types.UPDATE_ME]() {
  },
  // Sign Up Follow Up
  [types.CONFIRM_EMAIL_SUCCESS]() {
  },
  [types.SEND_PHONE_CODE_SUCCESS]() {
  },
  [types.CONFIRM_PHONE_SUCCESS]() {
  },
  [types.ADD_WALLET_ADDRESS_SUCCESS]() {
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
