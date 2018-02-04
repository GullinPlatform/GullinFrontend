import axios from 'axios'

import { EHTERSCAN_API_KEY } from '../config'
import { web3 } from '../utils'

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
  // Balances
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
  getTokenBalanceByAddress(wallet_address, token_address) {
    const params = {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: token_address,
      address: wallet_address,
      tag: 'latest',
      apikey: EHTERSCAN_API_KEY,
    }
    return apiCall('get', 'api', null, params)
  },

  // Transactions
  getETHTransactionsByAddress(wallet_address) {
    const params = {
      module: 'account',
      action: 'txlist',
      address: wallet_address,
      startblock: 5006059,
      endblock: 'lastest',
      sort: 'desc',
      apikey: EHTERSCAN_API_KEY,
    }
    return apiCall('get', 'api', null, params)
  },
  getTokenTransactionsByAddress(wallet_address, contract_address) {
    const params = {
      module: 'logs',
      action: 'getLogs',
      address: contract_address,
      fromBlock: 5006059,
      toBlock: 'lastest',
      topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      topic1: web3.utils.padLeft(wallet_address, 30),
      topic0_1_opr: 'or',
      topic2: web3.utils.padLeft(wallet_address, 30),
      sort: 'desc',
      apikey: EHTERSCAN_API_KEY,
    }

    return apiCall('get', 'api', null, params)
  },
}

