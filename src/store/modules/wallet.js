import Tx from 'ethereumjs-tx'

import walletApi from '../../api/wallet-api'
import etherscanApi from '../../api/etherscan-api'
import cryptocompareApi from '../../api/cryptocompare-api'
import * as types from '../mutation-types'

import { web3, erc20_contract_abi } from '../../utils'

const state = {
  wallet: {},
  eth_price: 0,
}

const getters = {
  me_wallet: state => state.wallet,
  balances: state => {
    if (state.wallet) return state.wallet.balances
    return null
  },
  transactions: state => {
    if (state.wallet) return state.wallet.transactions
    return null
  },
  eth_price: state => state.eth_price,
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

  // Market Data
  getEthMarketData({ commit }) {
    return cryptocompareApi.getEthMarketData()
      .then((response) => {
        const eth_market_data = {
          line_chart_data: [],
          change_24h: 0,
          change_1h: 0,
          now: 0,
        }
        const raw_data_list = response.Data
        for (const [index, raw_data] of raw_data_list.entries()) {
          eth_market_data.line_chart_data.push((raw_data.high + raw_data.low) / 2)
          if (index === raw_data_list.length - 1) {
            eth_market_data.now = raw_data.close
            eth_market_data.change_24h = (((eth_market_data.now - eth_market_data.line_chart_data[0]) / (eth_market_data.now)) * 100).toFixed(2)
            eth_market_data.change_1h = (((eth_market_data.now - eth_market_data.line_chart_data[index - 1]) / (eth_market_data.now)) * 100).toFixed(2)
          }
        }
        commit(types.SYNC_ETH_PRICE, eth_market_data.now)
        return Promise.resolve(eth_market_data)
      })
      .catch((error) => Promise.reject(error))
  },

  // Sync Transaction
  syncETHTransactions({ dispatch, state, commit }) {
    const wallet_address = state.wallet.eth_address
    return etherscanApi.getETHTransactionsByAddress(wallet_address)
      .then((response) => {
        commit(types.SYNC_ETH_TRANSACTIONS)
        // Clean the transaction data and construct a tx data array
        const raw_txs = response.result
        const txs = []
        for (const tx of raw_txs) {
          if (tx.from.toUpperCase() === wallet_address.toUpperCase()) {
            txs.push({
              wallet: state.wallet.id,
              type: 'SEND',
              datetime: moment.unix(tx.timeStamp).format('YYYY-MM-DD HH:mm:ss'),
              from_address: wallet_address,
              from_address_type: 'MY_WALLET',
              from_address_note: 'My Wallet',
              to_address: tx.to ? web3.utils.toChecksumAddress(tx.to) : web3.utils.toChecksumAddress(tx.contractAddress),
              value: web3.utils.fromWei(tx.value.toString()),
              value_unit: 'ETH',
              tx_hash: tx.hash,
              tx_fee: web3.utils.fromWei((tx.gasUsed * tx.gasPrice).toString()),
            })
          } else {
            txs.push({
              wallet: state.wallet.id,
              type: 'RECEIVE',
              datetime: moment.unix(tx.timeStamp).format('YYYY-MM-DD HH:mm:ss'),
              from_address: web3.utils.toChecksumAddress(tx.from),
              to_address: wallet_address,
              to_address_type: 'MY_WALLET',
              to_address_note: 'My Wallet',
              value: web3.utils.fromWei(tx.value.toString()),
              value_unit: 'ETH',
              tx_hash: tx.hash,
              tx_fee: web3.utils.fromWei((tx.gasUsed * tx.gasPrice).toString()),
            })
          }
        }
        // After clean the transaction data, send transaction data to backend and sync, and sync frontend data
        if (txs.length) {
          return walletApi.syncTransaction({ transactions: txs })
            .then(() => {
              dispatch('getWallet')
            })
            .catch((error) => Promise.reject(error))
        }
        return Promise.resolve()
      })
      .catch((error) => Promise.reject(error))
  },
  syncTokenTransactions({ dispatch, state, commit }) {
    const wallet_address = state.wallet.eth_address
    for (const balance of state.wallet.balances) {
      const token = balance.token
      if (token.token_address) {
        etherscanApi.getTokenTransactionsByAddress(wallet_address, token.token_address)
          .then((response) => {
            commit(types.SYNC_TOKEN_TRANSACTIONS)
            // Clean the transaction data and construct a tx data array
            const raw_txs = response.result
            const txs = []
            for (const tx of raw_txs) {
              // If it's ERC20 Token transaction
              if (tx.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
                if (tx.topics[1].replace('0x000000000000000000000000', '0x').toUpperCase() === wallet_address.toUpperCase()) {
                  txs.push({
                    wallet: state.wallet.id,
                    type: 'SEND',
                    datetime: moment.unix(web3.utils.hexToNumberString(tx.timeStamp)).format('YYYY-MM-DD HH:mm:ss'),
                    from_address: wallet_address,
                    from_address_type: 'MY_WALLET',
                    from_address_note: 'My Wallet',
                    to_address: web3.utils.toChecksumAddress(tx.topics[2].replace('0x000000000000000000000000', '0x')),
                    value: web3.utils.hexToNumberString(tx.data) / (10 ** token.decimals),
                    value_unit: token.token_code,
                    tx_hash: tx.transactionHash,
                    tx_fee: web3.utils.fromWei((web3.utils.hexToNumber(tx.gasUsed) * web3.utils.hexToNumber(tx.gasPrice)).toString()),
                  })
                } else {
                  txs.push({
                    wallet: state.wallet.id,
                    type: 'RECEIVE',
                    datetime: moment.unix(web3.utils.hexToNumberString(tx.timeStamp)).format('YYYY-MM-DD HH:mm:ss'),
                    from_address: web3.utils.toChecksumAddress(tx.topics[1].replace('0x000000000000000000000000', '0x')),
                    to_address: wallet_address,
                    to_address_type: 'MY_WALLET',
                    to_address_note: 'My Wallet',
                    value: web3.utils.hexToNumberString(tx.data) / (10 ** token.decimals),
                    value_unit: token.token_code,
                    tx_hash: tx.transactionHash,
                    tx_fee: web3.utils.fromWei((web3.utils.hexToNumber(tx.gasUsed) * web3.utils.hexToNumber(tx.gasPrice)).toString()),
                  })
                }
              }
            }
            // After clean the transaction data, send transaction data to backend and sync, and sync frontend data
            if (txs.length) {
              return walletApi.syncTransaction({ transactions: txs })
                .then(() => {
                  dispatch('getWallet')
                })
                .catch((error) => Promise.reject(error))
            }
            return Promise.resolve()
          })
          .catch((error) => Promise.reject(error))
      }
    }
  },

  // Get balance
  syncEthBalance({ state, commit, dispatch }) {
    etherscanApi.getETHBalanceByAddress(state.wallet.eth_address)
      .then((response) => {
        if (response.status !== '1') return Promise.reject(response)
        const form_data = {
          ETH: response.result / (10 ** 18),
        }
        walletApi.syncBalance(form_data)
          .then(() => {
            commit(types.SYNC_ETH_BALANCE)
            dispatch('getWallet')
          })
      })
  },
  syncTokenBalance({ state, commit, dispatch }) {
    const wallet_address = state.wallet.eth_address
    // For every token balance in wallet record
    for (const balance of state.wallet.balances) {
      const token = balance.token
      // If the token balance has token_address (aka is not ETH)
      if (token.token_address) {
        // Get balance from etherscan api
        etherscanApi.getTokenBalanceByAddress(wallet_address, token.token_address)
          .then((response) => {
            if (response.status !== '1') return Promise.reject(response)
            const form_data = {}
            form_data[token.token_code] = response.result / (10 ** token.decimals)
            return walletApi.syncBalance(form_data)
              .then(() => {
                commit(types.SYNC_TOKEN_BALANCE)
                dispatch('getWallet')
              })
          })
      }
    }
  },

  // Send tokens
  sendEth({ state, commit }, data) {
    return web3.eth.getTransactionCount(state.wallet.eth_address)
      .then(nonce => {
        const transaction_data = {
          to: data.to_address,
          value: web3.utils.toHex(web3.utils.toWei(data.value, 'ether')),
          gasLimit: web3.utils.toHex('21000'),
          gasPrice: web3.utils.toHex('1000000000'),
          data: '0x',
          nonce: nonce,
        }
        const raw_transaction = new Tx(transaction_data)
        const private_key = new Buffer(data.private_key.substring(2), 'hex')
        raw_transaction.sign(private_key)
        const signed_transaction = '0x' + raw_transaction.serialize().toString('hex')

        return web3.eth.sendSignedTransaction(signed_transaction)
          .then((receipt) => {
            return Promise.resolve(receipt)
          })
          .catch((error) => {
            return Promise.reject(error)
          })
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  sendToken({ commit }, data) {
    const contract = web3.eth.Contract(erc20_contract_abi).at(data.contract_address)
    const abi_data = contract.methods.transfer(data.contract_address, web3.utils.toWei(data.value, 'ether'), { from: data.from_address }).encodeABI()

    return web3.eth.getTransactionCount(state.wallet.eth_address)
      .then(nonce => {
        const transaction_data = {
          to: data.contract_address,
          value: '0x00',
          gasLimit: web3.utils.toHex('21000'),
          gasPrice: web3.utils.toHex('1000000000'),
          data: abi_data,
          nonce: nonce,
        }
        const raw_transaction = new Tx(transaction_data)
        const private_key = new Buffer(data.private_key.substring(2), 'hex')
        raw_transaction.sign(private_key)
        const signed_transaction = '0x' + raw_transaction.serialize().toString('hex')

        return web3.eth.sendSignedTransaction(signed_transaction)
          .then((receipt) => {
            return Promise.resolve(receipt)
          })
          .catch((error) => {
            return Promise.reject(error)
          })
      })
  },

}

const mutations = {
  [types.LOAD_WALLET](state, response) {
    state.wallet = response
  },
  [types.SYNC_ETH_BALANCE]() {
  },
  [types.SYNC_TOKEN_BALANCE]() {
  },
  [types.SYNC_ETH_TRANSACTIONS]() {
  },
  [types.SYNC_TOKEN_TRANSACTIONS]() {
  },
  [types.SYNC_ETH_PRICE](state, price) {
    state.eth_price = price
  },

}

export default {
  state,
  getters,
  actions,
  mutations,
}
