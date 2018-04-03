<template>
  <div class="wrapper" v-if="me_wallet&&balances&&transactions">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">My Wallet</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <div class="card-box">
            <ul class="nav nav-tabs nav-justified tabs-bordered">
              <li class="nav-item">
                <a href="#deposit" data-toggle="tab" aria-expanded="false" class="nav-link active">
                  Deposit
                </a>
              </li>
              <li class="nav-item">
                <a href="#withdraw" data-toggle="tab" aria-expanded="true" class="nav-link">
                  Withdraw
                </a>
              </li>

            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active text-center" id="deposit">
                <!--<div class="alert alert-warning">-->
                <!--You can send <b>ETH</b> and <b>ETH tokens</b> to this address, but DO NOT send other tokens (ex: Ethereum Classic (ETC), Bitcoin (BTC), Ripple (XRP))!-->
                <!--</div>-->
                <!--<hr>-->
                <h4>Your ETH Wallet Address</h4>
                <p style="word-wrap: break-word;" class="mt-3">{{me_wallet.eth_address}}</p>
                <hr>
                <h4>Your ETH Wallet in QR Code</h4>
                <qrcode :value="me_wallet.eth_address" :options="{ size: 150 }"/>
                <hr>
                <!--<a-->
                <!--:href="'https://buy.coinbase.com?code=95f65a41-4643-58a4-8eb2-fda57ada4392&address=' + me_wallet.eth_address +'&prefill_email='+me.user.email+ '&redirect_uri=https://app.gullin.io/wallet'"-->
                <!--target="_blank">-->
                <!--Buy with Coinbase-->
                <!--</a>-->
                <!--<hr>-->
                <div class="text-center">
                  <a :href="'https://etherscan.io/address/' + me_wallet.eth_address" target="_blank" class="btn btn-primary text-white">See On Etherscan</a>
                </div>
              </div>
              <div class="tab-pane fade" id="withdraw">
                <div class="form-group row">
                  <div class="col-md-6">
                    <label for="field-1" class="control-label">Amount</label>
                    <a href="#" class="pull-right" @click="maxWithdrawAmount()">MAX</a>
                    <input v-model="amount" type="text" class="form-control" id="field-1" placeholder="0.00">
                  </div>
                  <div class="col-md-6">
                    <label for="field-2" class="control-label">Unit</label>
                    <select v-model="unit" class="form-control" id="field-2">
                      <option v-for="balance in balances">{{balance.token.token_code}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label class="control-label">Destination</label>
                    <input v-model="to_address" type="text" class="form-control" placeholder="Destination">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label class="control-label">Your Wallet Address</label>
                    <input type="text" class="form-control" :value="me_wallet.eth_address" disabled>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label class="control-label">Your Private Key</label>
                    <a href="#" class="pull-right">Where is it?</a>
                    <input v-model="private_key" type="text" class="form-control" placeholder="Private Key">
                  </div>
                </div>
                <span class="text-danger" v-show="transaction_failed">{{ error_message }}</span>
                <span class="text-success" v-show="transaction_success">Transaction Success!</span>
                <div class="text-center">
                  <button type="button" class="btn" :class="{'btn-secondary':tx_loading, 'btn-primary':!tx_loading}" @click="sendEthOrToken()">
                    <span v-show="tx_loading">Withdrawing</span>
                    <span v-show="!tx_loading">Withdraw</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="card-box widget-icon">
            <h4 class="text-dark header-title m-t-0 m-b-30">My Balance</h4>
            <table class="table">
              <thead>
              <tr>
                <th>Token Name</th>
                <th>Token Code</th>
                <th>Amount</th>
                <th>Est. Value</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="balance in balances">
                <td>{{balance.token.token_name}}</td>
                <td>{{balance.token.token_code}}</td>
                <td>{{Number(balance.balance).toFixed(4)}}</td>
                <td>${{Number(eth_price*balance.balance*balance.token.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}}</td>
                <td>
                  <router-link v-if="balance.token.token_code !== 'ETH'" :to="{name:'token_sale_detail', params:{id:balance.token.token_code}}">Detail</router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="card-box">
            <h4 class="text-dark header-title m-b-30">Transactions</h4>
            <table class="table">
              <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
                <th>From</th>
                <th>To</th>
                <th>Time</th>
                <th>Tx Fee (ETH)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="tx in transactions">
                <th v-if="tx.type==='SEND'"><span class="badge badge-danger">{{tx.type}}</span></th>
                <th v-else><span class="badge badge-success">{{tx.type}}</span></th>
                <td>{{Number(tx.value).toFixed(3) + ' ' + tx.value_unit}}</td>
                <td v-if="tx.from_address_type==='TOKEN_SALE'">
                  <router-link :to="{name:'token_sale_detail', params:{id:tx.from_address_note}}">
                    {{tx.from_address_note}}
                  </router-link>
                </td>
                <td v-else-if="tx.from_address_type==='MY_WALLET'">
                  My Wallet
                </td>
                <td v-else>
                  <a :href="'https://etherscan.io/address/'+tx.from_address" target="_blank">{{tx.from_address.substring(0,7)+'...'}}</a>
                </td>

                <td v-if="tx.to_address_type==='TOKEN_SALE'">
                  <router-link :to="{name:'token_sale_detail', params:{id:tx.to_address_note}}">
                    {{tx.to_address_note}}
                  </router-link>
                </td>
                <td v-else-if="tx.to_address_type==='MY_WALLET'">
                  My Wallet
                </td>
                <td v-else>
                  <a :href="'https://etherscan.io/address/'+tx.to_address" target="_blank">{{tx.to_address.substring(0,7)+'...'}}</a>
                </td>

                <td v-html="formatTime(tx.datetime)"></td>
                <td>
                  <small>{{tx.tx_fee}}</small>
                </td>
              </tr>
              </tbody>
            </table>
            <div v-if="!transactions.length" class="text-center">
              <p>You have no transactions.</p>
              <router-link :to="{name:'token_sale_list'}" class="btn btn-primary">Explore</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import qrcode from '@xkeshi/vue-qrcode'

  import { web3 } from '../../../utils'

  export default {
    name: 'Wallet',
    components: {
      qrcode,
    },
    data() {
      return {
        amount: '',
        unit: 'ETH',
        to_address: '',
        private_key: '',

        transaction_success: '',
        transaction_failed: '',
        tx_loading: '',

        error_message: '',
      }
    },
    computed: {
      ...mapGetters({
        me: 'me',
        me_wallet: 'me_wallet',
        balances: 'balances',
        transactions: 'transactions',
        is_login: 'is_login',
        verification_level: 'verification_level',
        eth_price: 'eth_price',
      }),
      eth_balance() {
        for (const balance of this.balances) {
          if (balance.token.token_code === 'ETH')
            return balance.balance
        }
      }
    },
    methods: {
      formatTime(time) {
        return moment(time).fromNow()
      },
      isAddress() {
        return web3.utils.isAddress(this.to_address)
      },
      sendEthOrToken() {
        this.error_message = ''

        if (this.tx_loading) return
        this.tx_loading = true

        if (!this.isAddress()) {
          this.error_message = 'You are sending your ' + this.unit + ' to an invalid address!'
          this.transaction_failed = true
          this.tx_loading = false
          return
        }

        if (this.unit === 'ETH') {
          const form_data = {
            to_address: this.to_address,
            value: this.amount.toString(),
            private_key: this.private_key,
          }
          this.$store.dispatch('sendEth', form_data)
            .then(() => {
              this.transaction_success = true
              this.tx_loading = false
            })
            .catch((error) => {
              console.log(error)
              this.error_message = error.toString().split('\n')[0]
              this.transaction_failed = true
              this.tx_loading = false
            })
        }
        else {
          this.error_message = 'Token withdraw are still in testing.'
          this.transaction_failed = true
          this.tx_loading = false
        }
      },
      maxWithdrawAmount() {
        // First check eth balance
        if (this.eth_balance < 0.000021) {
          this.transaction_failed = true
          this.error_message = 'Your Balance is lower than 0.000021, the minimal transaction fee for ETH.'
        }
        if (this.unit === 'ETH') {
          this.amount = this.eth_balance - 0.000021
        }
      }
    },
    created() {
      this.$store.dispatch('syncEthBalance')
      this.$store.dispatch('syncTokenBalance')
      this.$store.dispatch('syncETHTransactions')
      this.$store.dispatch('syncTokenTransactions')
      this.$store.dispatch('getEthMarketData')
    },
  }
</script>

<style scoped>
  .m-widget5 .m-widget5__item {
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
