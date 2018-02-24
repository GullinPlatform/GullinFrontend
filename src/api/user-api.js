import axios from 'axios'

import { API_ROOT } from '../config'

const apiCall = (method, url, form_data, params) => {
  return axios({
    method: method,
    url: url,
    data: form_data,
    params: params,
    baseURL: API_ROOT + '/user/',
    withCredentials: true,
  })
    .then(response => Promise.resolve(response.data))
    .catch(error => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.headers)
        console.log(error.response.data)
        console.log(error.response.status)
        return Promise.reject(error.response)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
        return Promise.reject(error.request)
      }
    })
}

export default {
  // Login Signup and Stay Login
  login(form_data) {
    return apiCall('post', 'auth/login/', form_data)
  },
  login_2factor(form_data) {
    return apiCall('patch', 'auth/login/', form_data)
  },
  logout() {
    return apiCall('post', 'auth/logout/')
  },
  signup(form_data) {
    return apiCall('post', 'auth/signup/', form_data)
  },
  refresh() {
    return apiCall('post', 'auth/refresh/')
  },

  // Account Detail
  getMe() {
    return apiCall('get', 'me/')
  },
  updateMe(form_data) {
    return apiCall('patch', 'me/', form_data)
  },
  getLog() {
    return apiCall('get', 'me/log/')
  },

  // Sign Up Follow Up
  confirmEmail(form_data) {
    return apiCall('patch', 'followup/email/', form_data)
  },
  addPhone(form_data) {
    return apiCall('post', 'followup/phone/', form_data)
  },
  confirmPhone(form_data) {
    return apiCall('patch', 'followup/phone/', form_data)
  },
  addWalletAddress(form_data) {
    return apiCall('post', 'followup/wallet_address/', form_data)
  },
  uploadID(form_data) {
    return apiCall('post', 'verify/upload_id/', form_data)
  },


  // resendConfirmEmail(form_data) {
  //   return apiCall('post', 'email_verify/', form_data)
  // },

  // Change Password
  changePassword() {
    return apiCall('get', 'change_pass/')
  },

  // Forget Password
  forgetPasswordSendEmail(email) {
    return apiCall('post', 'forget/', { email: email })
  },
  forgetPasswordVerifyCode(code) {
    return apiCall('get', 'forget/' + code + '/')
  },
  forgetPasswordResetPassword(form_data) {
    return apiCall('put', 'forget/' + form_data.token + '/', form_data)
  },

  // 2 Factor Authentication
  sendTwoFactorCode() {
    return apiCall('post', '2factor/')
  },
  verifyTwoFactorCode(code) {
    return apiCall('get', '2factor/', code)
  },
}
