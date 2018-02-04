import walletApi from '../../api/wallet-api'
import etherscanApi from '../../api/etherscan-api'
import * as types from '../mutation-types'

import { web3, erc20_contract_abi } from '../../utils'

const state = {
  wallet: {},
  transactions: [],
}

const getters = {
  me_wallet: state => state.wallet,
  balances: state => {
    if (state.wallet) return state.wallet.balances
    return null
  },
  transactions: state => state.transactions,
}

const actions = {
  getWallet({ commit }) {
    return walletApi.getWallet()
      .then((response) => {
        commit(types.LOAD_WALLET, response)
        return Promise.resolve(response)
      })
      .catch((error) => Promise.reject(error))
  },
  getTransactions({ commit }) {
    return walletApi.getWallet()
      .then((response) => {
        commit(types.LOAD_TRANSACTIONS, response)
        return Promise.resolve(response)
      })
      .catch((error) => Promise.reject(error))
  },
  addTransaction({ commit }, form_data) {
    return walletApi.addTransaction(form_data)
      .then((response) => {
        commit(types.LOAD_TRANSACTIONS, response)
        return Promise.resolve(response)
      })
      .catch((error) => Promise.reject(error))
  },

  // Get balance
  syncEthBalance({ state, commit, dispatch }) {
    etherscanApi.getETHBalanceByAddress(state.wallet.eth_address)
      .then((response) => {
        const form_data = {
          ETH: response.result,
        }
        walletApi.syncBalance(form_data)
          .then(() => {
            commit(types.SYNC_BALANCE)
            dispatch('getWallet')
          })
      })
  },
  syncTokenBalance({ state, commit, dispatch }) {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    // For every token balance in wallet record
    for (const token_balance of state.wallet.balances) {
      // If the token balance has token_address (aka is not ETH)
      if (token_balance.token_address) {
        // Get balance from etherscan api
        etherscanApi.getTokenBalanceByAddress(state.wallet.eth_address, token_balance.token_address)
          .then((response) => {
            const form_data = {}
            form_data[token_balance.token_code] = response.result
            walletApi.syncBalance(form_data)
              .then(() => {
                commit(types.SYNC_BALANCE)
                dispatch('getWallet')
              })
          })
      }
      // Sleep to avoid exceed max call/sec
      sleep(500)
    }
  },

  // Send tokens
  sendEth({ state, commit }, data) {
    const raw_transaction = {
      from: state.wallet.eth_address,
      to: data.to_address,
      value: data.value,
      gas: 2000000,
    }
    web3.eth.accounts.signTransaction(raw_transaction, data.private_key)
      .then((signed_transaction) => {
        web3.eth.sendSignedTransaction(signed_transaction.rawTransaction)
          .on('transactionHash', hash => {
            console.log(hash)
          })
          .on('receipt', receipt => {
            console.log(receipt)
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            console.log(confirmationNumber, receipt)
          })
          .on('error', console.error);
      })
  },
  sendToken({ commit }, data) {
    const contract = web3.eth.Contract(erc20_contract_abi).at(data.contract_address)
    const abi_data = contract.methods.transfer(data.contract_address, data.value, { from: data.from_address }).encodeABI()
    const raw_transaction = {
      from: state.wallet.eth_address,
      to: data.contract_address,
      data: abi_data,
      gas: 2000000,
    }

    web3.eth.accounts.signTransaction(raw_transaction, data.private_key)
      .then((signed_transaction) => {
        web3.eth.sendSignedTransaction(signed_transaction.rawTransaction)
          .on('transactionHash', hash => {
            console.log(hash)
          })
          .on('receipt', receipt => {
            console.log(receipt)
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            console.log(confirmationNumber, receipt)
          })
          .on('error', console.error);
      })
  },

  // Get Transactions
  syncEthTransactions({ state, commit, dispatch }) {
    etherscanApi.getETHTransactionsByAddress(state.wallet.eth_address)
      .then((response) => {
        const form_data = {
          ETH: response.result,
        }
        walletApi.syncBalance(form_data)
          .then(() => {
            commit(types.SYNC_BALANCE)
            dispatch('getWallet')
          })
      })
  },
  syncTokenTransactions({ state, commit, dispatch }) {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    // For every token balance in wallet record
    for (const token_balance of state.wallet.balances) {
      // If the token balance has token_address (aka is not ETH)
      if (token_balance.token_address) {
        // Get balance from etherscan api
        etherscanApi.getTokenTransactionsByAddress(state.wallet.eth_address, token_balance.token_address)
          .then((response) => {
            const form_data = {}
            form_data[token_balance.token_code] = response.result
            walletApi.syncBalance(form_data)
              .then(() => {
                commit(types.SYNC_BALANCE)
                dispatch('getWallet')
              })
          })
      }
      // Sleep to avoid exceed max call/sec
      sleep(500)
    }
  },
}

const mutations = {
  [types.LOAD_WALLET](state, response) {
    state.wallet = response
  },
  [types.LOAD_TRANSACTIONS](state, response) {
    state.transactions = response
  },
  [types.SYNC_BALANCE]() {
  },
  [types.SYNC_TRANSACTIONS]() {
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
