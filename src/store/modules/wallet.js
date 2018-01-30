import walletApi from '../../api/wallet-api'
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
  syncEthBalance({ state, commit, dispatch }) {
    if (state.wallet.eth_address) {
      web3.eth.getBalance(state.wallet.eth_address)
        .then((eth_balance) => {
          const form_data = {
            ETH: eth_balance,
          }
          walletApi.syncBalance(form_data)
            .then(() => {
              commit(types.SYNC_BALANCE)
              dispatch('getWallet')
            })
        })
    }
  },
  sendEth({ commit }, form_data) {
    web3.eth.accounts.signTransaction({
      to: form_data.to_address,
      value: web3.utils.toWei(form_data.value, 'ether'),
      gas: 2000000,
    }, form_data.private_key)
      .then((signed_transaction) => {
        web3.eth.sendSignedTransaction('0x' + signed_transaction.rawTransaction)
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
  sendToken({ commit }, form_data) {
    const contract = web3.eth.Contract(erc20_contract_abi).at(form_data.contract_address)
    const encoded_abi_data = contract.methods.transfer(form_data.to_address, form_data.value).encodeABI()
    web3.eth.accounts.signTransaction({
      to: form_data.contract_address,
      data: encoded_abi_data,
      gas: 2000000,
    }, form_data.private_key)
      .then((signed_transaction) => {
        web3.eth.sendSignedTransaction('0x' + signed_transaction.rawTransaction)
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
