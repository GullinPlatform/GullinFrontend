import axios from 'axios'

import { EHTERSCAN_API_KEY } from '../config'

const apiCall = (method, url, form_data, params) => {
  return axios({
    method: method,
    url: url,
    data: form_data,
    params: params,
    baseURL: 'http://api.etherscan.io/',
    withCredentials: false,
  })
    .then(response => Promise.resolve(response.data))
    .catch((error) => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
      return Promise.reject(error)
    })
}

export default {
  getETHBalanceByAddress(wallet_address) {
    const params = {
      module: 'account',
      action: 'balance',
      address: wallet_address,
      tag: 'latest',
      apikey: EHTERSCAN_API_KEY,
    }
    return apiCall('get', 'api', null, params)
  },
  getETHTransactionsByAddress(wallet_address) {
    const params = {
      module: 'account',
      action: 'txlist',
      address: wallet_address,
      startblock: 0,
      endblock: 'lastest',
      sort: 'desc',
      apikey: EHTERSCAN_API_KEY,
    }
    return apiCall('get', 'api', null, params)
  },
  getOutTokenTransactionsByAddress(wallet_address, contract_address) {
    const params = {
      module: 'logs',
      action: 'getLogs',
      address: contract_address,
      fromBlock: 0,
      toBlock: 'lastest',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: 'wallet_address',
      sort: 'desc',
      apikey: EHTERSCAN_API_KEY,
    }
    return apiCall('get', 'api', null, params)
  },
  getInTokenTransactionsByAddress(wallet_address, contract_address) {
    const params = {
      module: 'logs',
      action: 'getLogs',
      address: contract_address,
      fromBlock: 0,
      toBlock: 'lastest',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic2: 'wallet_address',
      sort: 'desc',
      apikey: EHTERSCAN_API_KEY,
    }
    return apiCall('get', 'api', null, params)
  },
  getTokenBalanceByAddress(wallet_address, contract_address) {
    const params = {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contract_address,
      address: wallet_address,
      tag: 'latest',
      apikey: EHTERSCAN_API_KEY,
    }
    return apiCall('get', 'api', null, params)
  },
}
