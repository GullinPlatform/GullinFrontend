import axios from 'axios'

import { API_ROOT } from '../config'

const apiCall = (method, url, form_data, params) => {
  return axios({
    method: method,
    url: url,
    data: form_data,
    params: params,
    baseURL: API_ROOT + '/wallet/',
    withCredentials: true,
  })
    .then(response => Promise.resolve(response.data))
    .catch((error) => {
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
  getWallet() {
    return apiCall('get', '')
  },
  syncBalance(form_data) {
    return apiCall('post', 'balance/', form_data)
  },
  syncTransaction(form_data) {
    return apiCall('post', 'transaction/', form_data)
  },
}
