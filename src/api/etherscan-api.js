import axios from 'axios'

import { EHTERSCAN_API_KEY } from '../config'

const apiCall = (method, url, form_data, params) => {
  return axios({
    method: method,
    url: url,
    data: form_data,
    params: params,
    baseURL: 'https://api.etherscan.io/',
    withCredentials: false,
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
      topic1: wallet_address.replace('0x', '0x000000000000000000000000'),
      topic1_2_opr: 'or',
      topic2: wallet_address.replace('0x', '0x000000000000000000000000'),
      sort: 'desc',
      apikey: EHTERSCAN_API_KEY,
    }

    return apiCall('get', 'api', null, params)
  },
}

