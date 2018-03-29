<template>
  <div :class="{'wrapper-sm': !is_login, 'wrapper':is_login}" v-if="!loading">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">Token Sale Detail</h4>
          </div>
        </div>
      </div>
      <div class="card-box widget-user">
        <div class="row">
          <div class="col-md-9 col-sm-12">
            <img :src="current_company.logo">
            <div class="wid-u-info">
              <h5 class="mt-0 m-b-5 font-16"> {{current_company.name}}
                <span class="badge badge-primary ml-1" v-if="current_company.token_detail.ico_stage_type === 0">Pre-Sale</span>
                <span class="badge badge-primary" v-else>Crowd-Sale</span>

                <span class="badge badge-info" v-if="timeCounter(current_company.token_detail.start_datetime, current_company.token_detail.end_datetime).includes('Starts')">Upcoming</span>
                <span class="badge badge-success" v-else-if="timeCounter(current_company.token_detail.start_datetime, current_company.token_detail.end_datetime).includes('Ends')">Active</span>
                <span class="badge badge-danger" v-else="timeCounter(current_company.token_detail.start_datetime, current_company.token_detail.end_datetime).includes('Ended')">Ended</span>
              </h5>
              <p class="text-muted m-b-5 font-13">{{current_company.short_description}}</p>
              <small><b> {{timeCounter(current_company.token_detail.start_datetime,current_company.token_detail.end_datetime)}}</b></small>
            </div>
          </div>
          <div class="col-md-3 col-sm-12">
            <a v-if="is_login" class="btn btn-primary btn-block text-white mt-3" data-toggle="modal" data-target="#invest_modal">Participate</a>
            <router-link class="btn btn-primary btn-block text-white mt-3" v-else :to="{name:'user_signup'}">Sign Up to Participate</router-link>
          </div>
        </div>
      </div>
      <div class="card-box">
        <ul class="nav nav-tabs tabs-bordered">
          <li class="nav-item">
            <a href="#tab1" data-toggle="tab" aria-expanded="false" class="nav-link active">
              Description
            </a>
          </li>
          <li class="nav-item">
            <a href="#tab2" data-toggle="tab" aria-expanded="true" class="nav-link">
              Tokenomics
            </a>
          </li>
          <li class="nav-item">
            <a href="#tab3" data-toggle="tab" aria-expanded="false" class="nav-link">
              Team
            </a>
          </li>

          <li class="nav-item">
            <a href="#tab4" data-toggle="tab" aria-expanded="false" class="nav-link">
              Documents
            </a>
          </li>
          <li class="nav-item">
            <a href="#tab5" data-toggle="tab" aria-expanded="false" class="nav-link">
              Press Releases
            </a>
          </li>
          <li class="nav-item" v-if="current_company.ama">
            <a href="#tab6" data-toggle="tab" aria-expanded="false" class="nav-link">
              AMA with Gullin
            </a>
          </li>
        </ul>
        <div class="tab-content px-3">
          <div class="tab-pane fade show active" id="tab1">
            <div class="row mb-3" v-if="current_company.youtube">
              <div class="col-lg-12">
                <div class="embed-responsive embed-responsive-21by9">
                  <iframe :src="current_company.youtube" class="embed-responsive-item" allowfullscreen></iframe>
                </div>
              </div>
            </div>

            <div v-html="current_company.description"></div>
            <div class="text-center mt-3">
              <a class="btn btn-primary text-white" :href="current_company.website" target="_blank">See More</a>
            </div>
          </div>
          <div class="tab-pane fade" id="tab2">
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <h4 class="header-title ml-2 mb-3"><b>Token Detail</b></h4>
                <table class="table">
                  <tbody>
                  <tr>
                    <td>Token</td>
                    <td> {{current_token_detail.token_code}}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td> {{current_token_detail.price}} {{current_token_detail.price_unit}}</td>
                  </tr>
                  <tr>
                    <td>Total Supply</td>
                    <td> {{current_token_detail.total_token_supply.toLocaleString()}} {{current_token_detail.token_code}}</td>
                  </tr>
                  <tr>
                    <td>Soft Market Cap</td>
                    <td v-if="current_token_detail.soft_market_cap"> {{current_token_detail.soft_market_cap.toLocaleString()}} {{current_token_detail.market_cap_unit}}</td>
                    <td v-else>None</td>
                  </tr>
                  <tr>
                    <td>Hard Market Cap</td>
                    <td v-if="current_token_detail.hard_market_cap"> {{current_token_detail.hard_market_cap.toLocaleString()}} {{current_token_detail.market_cap_unit}}</td>
                    <td v-else>None</td>
                  </tr>
                  <tr>
                    <td>Token Distribution</td>
                    <td v-html="current_token_detail.token_distribution"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-6 col-md-12">
                <h4 class="header-title ml-2 mb-3"><b>Token Info</b></h4>
                <table class="table">
                  <tbody>
                  <tr>
                    <td>Threshold (Min Investment Value)</td>
                    <td v-if="current_token_detail.threshold"> {{current_token_detail.threshold}} ETH</td>
                    <td v-else> 0 ETH</td>
                  </tr>
                  <tr>
                    <td>Investor Restrictions</td>
                    <td v-html="current_token_detail.restrictions"></td>
                  </tr>
                  <tr>
                    <td> Bonus</td>
                    <td v-html="current_token_detail.bonus"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab3">
            <h4 class="header-title mb-3"><b>Team Members</b></h4>
            <div class="row">
              <div class="col-sm-4 col-lg-3 col-xs-12" v-for="member in current_company.members" v-if="member.member_type === 1">
                <div class="text-center card-box">
                  <div class="member-card">
                    <div class="thumb-lg member-thumb mb-3 center-page">
                      <img :src="member.avatar" class="rounded-circle img-thumbnail" alt="profile-image">
                    </div>

                    <div>
                      <h4 class="m-b-5 mt-2">{{member.full_name}}</h4>
                      <p class="text-muted m-0">{{member.title}}</p>
                      <p class="text-muted">{{member.description}}</p>
                    </div>
                    <ul class="social-links list-inline mb-0">
                      <li class="list-inline-item" v-if="member.facebook">
                        <a :href="member.facebook" target="_blank"><i class="fa fa-facebook"></i></a>
                      </li>
                      <li class="list-inline-item" v-if="member.linkedin">
                        <a :href="member.linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>
                      </li>
                      <li class="list-inline-item" v-if="member.website">
                        <a :href="member.website" target="_blank"><i class="fa fa-globe"></i></a>
                      </li>
                    </ul>

                  </div>

                </div>
              </div>
            </div>
            <h4 class="header-title mb-3"><b>Advisors</b></h4>
            <div class="row">
              <div class="col-sm-4 col-lg-3 col-xs-12" v-for="member in current_company.members" v-if="member.member_type === 0">
                <div class="text-center card-box">
                  <div class="member-card">
                    <div class="thumb-lg member-thumb mb-3 center-page">
                      <img :src="member.avatar" class="rounded-circle img-thumbnail" alt="profile-image">
                    </div>

                    <div>
                      <h4 class="m-b-5 mt-2">{{member.full_name}}</h4>
                      <p class="text-muted m-0">{{member.title}}</p>
                      <p class="text-muted">{{member.description}}</p>
                    </div>
                    <ul class="social-links list-inline mb-0">
                      <li class="list-inline-item" v-if="member.facebook">
                        <a :href="member.facebook" target="_blank"><i class="fa fa-facebook"></i></a>
                      </li>
                      <li class="list-inline-item" v-if="member.linkedin">
                        <a :href="member.linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>
                      </li>
                      <li class="list-inline-item" v-if="member.website">
                        <a :href="member.website" target="_blank"><i class="fa fa-globe"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab4">
            <div class="row">
              <div class="col-md-12 col-lg-6" v-for="doc in current_company.documents">
                <a class="document-container card-box text-dark" :href="doc.url" target="_blank">
                  <div class="document-box">
                    <i class="fa fa-file-text-o fa-3x"></i>
                    <h4 class="u-flex1 pl-3 mb-0">
                      {{doc.title}}
                    </h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab5">
            <div class="inbox-widget">
              <a :href="press_release.url" class="document-container card-box" target="_blank" v-for="press_release in current_company.press_releases">
                <div class="inbox-item">
                  <div class="inbox-item-img text-dark">
                    <i class="fa fa-file-text-o fa-3x"></i>
                  </div>
                  <h4 class="inbox-item-author mb-1">{{press_release.title}}</h4>
                  <p class="inbox-item-text">{{press_release.brief}} <span class="pull-right">{{timeFromNow(press_release.created)}}</span></p>
                </div>
              </a>
            </div>
          </div>
          <div class="tab-pane fade" id="tab6" v-if="current_company.ama">
            <div class="row mb-3">
              <div class="col-lg-12">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe :src="current_company.ama" class="embed-responsive-item" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--begin::Modal-->
      <div id="invest_modal" v-if="is_login" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Participate</h4>
            </div>
            <div class="modal-body row" v-if="!show_invest_summary">
              <div class="col-md-6 border-right">
                <div class="row form-group">
                  <div class="col-10">
                    <label class="control-label">Amount</label>
                    <a href="#" class="pull-right" @click="maxInvestAmount()">MAX</a>
                    <input v-model="amount" type="text" class="form-control" placeholder="0.00" :disabled="isRestricted()">
                  </div>
                  <label class="col-2 col-form-label mt-4">ETH</label>
                </div>
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="control-label">Token Sale Destination</label>
                    <input type="text" class="form-control" :value="current_token_detail.crowd_sale_contract_address" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="control-label">My Wallet Address</label>
                    <input type="text" class="form-control" :value="me_wallet.eth_address" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="control-label">My Private Key</label>
                    <a href="https://gullin.zendesk.com/hc/en-us/articles/360001358553-Where-is-my-private-key-" target="_blank" class="pull-right">Where is it?</a>
                    <input v-model="private_key" type="text" class="form-control" placeholder="Private Key" :disabled="isRestricted()">
                  </div>
                </div>
                <div class="text-center">
                  <button v-if="!show_invest_summary" type="button" class="btn" @click="investPreCheck()"
                          :class="{'btn-secondary':isRestricted(), 'btn-primary':!isRestricted()}">Participate
                  </button>
                </div>
              </div>
              <div class="col-md-6">
                <div class="alert alert-primary" v-if="!isRestricted()">
                  You are participating in <b>{{current_company.name}}</b>, please make sure you are on the right page!
                </div>
                <div class="alert alert-danger" v-else-if="isRestricted()===4">
                  This Token Sale is ended.<br>
                </div>
                <div class="alert alert-danger" v-else-if="isRestricted()===1">
                  You must be verified through KYC in settings before you are able to participate in this Token Sale.<br>
                  <b>
                    <router-link router-link :to="{name:'settings_verification'}" data-dismiss="modal">Verify Now</router-link>
                  </b>
                </div>
                <div class="alert alert-danger" v-else-if="isRestricted()===2">
                  We are sorry, your region is restricted by this Token Sale.
                </div>
                <div class="alert alert-danger" v-else-if="isRestricted()===3">
                  You don't have enough ETH balance in your wallet to participate in this Token Sale.<br>
                  <b>
                    <router-link router-link :to="{name:'wallet'}" data-dismiss="modal">Deposit Now</router-link>
                  </b>
                </div>
                <table class="table">
                  <tbody>
                  <tr>
                    <td>My Balance</td>
                    <td><b>{{eth_balance}}</b> ETH</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td> {{current_token_detail.price}} {{current_token_detail.price_unit}} / {{current_token_detail.token_code}}</td>
                  </tr>
                  <tr>
                    <td>Threshold</td>
                    <td v-if="current_token_detail.threshold"> {{current_token_detail.threshold}} ETH</td>
                    <td v-else> None</td>
                  </tr>
                  <tr>
                    <td>Restrictions</td>
                    <td v-html="current_token_detail.restrictions" v-if="current_token_detail.restrictions"></td>
                    <td v-else> None</td>
                  </tr>
                  <tr>
                    <td> Bonus</td>
                    <td v-html="current_token_detail.bonus" v-if="current_token_detail.bonus"></td>
                    <td v-else> None</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-body row justify-content-center" v-else>
              <div class="col-md-10">
                <h4 class="text-center md-2"><b>Confirm Transaction</b></h4>
                <div class="alert alert-primary text-center">
                  Please make sure everything is correct!
                </div>
                <table class="table">
                  <tbody>
                  <tr>
                    <td>Token Sale Name</td>
                    <td><b>{{current_company.name}}</b></td>
                  </tr>
                  <tr>
                    <td>Amount Sending</td>
                    <td><b>{{amount}} ETH</b></td>
                  </tr>
                  <tr>
                    <td>Estimated Transaction Fee</td>
                    <td><b>0.00021 ETH</b></td>
                  </tr>
                  <tr>
                    <td>Total amount</td>
                    <td><b>{{(Number(amount) + Number('0.00021')).toFixed(7)}} ETH</b></td>
                  </tr>
                  </tbody>
                </table>
                <p class="text-center" v-show="tx_loading">
                  <spinner></spinner>
                  Sending transaction, it may take 1-5 minutes to get the confirmation message. (Closing browser will not interrupt the transaction)
                </p>
                <p class="text-center text-success" v-show="transaction_success">Transaction Success!</p>
                <p class="text-center text-danger" v-show="transaction_failed">{{error_message}}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button v-if="show_invest_summary&&!transaction_success" type="button" class="btn btn-secondary" @click="show_invest_summary=false">Back</button>
              <button v-if="show_invest_summary&&!transaction_success" type="button" class="btn" :class="{'btn-secondary':tx_loading, 'btn-primary':!tx_loading}" @click="sendEth()">
                <span v-show="tx_loading">Sending Transaction</span>
                <span v-show="!tx_loading">Confirm</span>
              </button>

              <router-link v-if="transaction_success" class="btn btn-primary" :to="{name:'wallet'}" data-dismiss="modal">
                View Transaction
              </router-link>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div>
      <!--end::Modal-->
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import Spinner from '../../components/Spinner'

  export default {
    name: 'TokenSaleDetail',
    components: {
      Spinner
    },
    data() {
      return {
        loading: true,

        amount: '',
        private_key: null,

        show_invest_summary: false,
        transaction_success: '',
        transaction_failed: '',
        tx_loading: false,

        error_message: '',
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        current_company: 'current_company',
        current_token_detail: 'current_token_detail',
        me_wallet: 'me_wallet',
        balances: 'balances',
        me: 'me',
        verification_level: 'verification_level',
      }),
      eth_balance() {
        for (const balance of this.balances) {
          if (balance.token.token_code === 'ETH')
            return balance.balance
        }
      }
    },
    methods: {
      getCompany(id) {
        this.loading = true
        this.$store.dispatch('getCompany', id)
          .then(() => {
            this.loading = false
          })
          .catch(() => {
            this.$router.push({ name: '404' })
          })
      },
      timeCounter(start, end) {
        /* global moment:true */
        // Haven't start
        if (moment().diff(start, 'minutes') < 0) {
          let rest = -moment().diff(start, 'days') + ' days '
          if (rest === '0 days ') {
            rest = -moment().diff(start, 'hours') + ' hours '
          }
          if (rest === '0 hours ') {
            rest = -moment().diff(start, 'minutes') + ' minutes '
          }
          return 'Starts in ' + rest
        }
        // Started
        else if (moment().diff(end, 'minutes') < 0) {
          let rest = -moment().diff(end, 'days') + ' days '
          if (rest === '0 days ') {
            rest = -moment().diff(end, 'hours') + ' hours '
          }
          if (rest === '0 hours ') {
            rest = -moment().diff(end, 'minutes') + ' minutes '
          }
          return 'Ends in ' + rest
        }
        // Ended
        else {
          let rest = moment().diff(end, 'days') + ' days '
          if (rest === '0 days ') {
            rest = moment().diff(end, 'hours') + ' hours '
          }
          if (rest === '0 hours ') {
            rest = moment().diff(end, 'minutes') + ' minutes '
          }
          return 'Ended ' + rest + 'ago'
        }
      },
      timeFromNow(time) {
        return moment(time).fromNow()
      },
      isRestricted() {
        if (!this.is_login) return true
        // User if verified?
        if (this.verification_level < 4) return 1
        // Check date
        if (this.timeCounter(this.current_company.token_detail.start_datetime, this.current_company.token_detail.end_datetime).includes('Ended')) return 4
        // Check restricted country
        const restricted_country_list = JSON.parse(this.current_token_detail.restricted_country_list)
        if (restricted_country_list.indexOf(this.me.nationality) >= 0) return 2
        // Check balance
        const eth_balance = this.me_wallet.balances[0].balance
        if (eth_balance <= this.current_token_detail.threshold) return 3
      },
      investPreCheck() {
        // Check List before send ETH
        // Check restricted
        if (this.isRestricted()) return
        // Check threshold
        if (this.amount && this.amount < this.current_token_detail.threshold) return
        // Check private key
        if (!this.private_key) return

        this.show_invest_summary = true
      },

      sendEth() {
        this.error_message = ''
        if (this.tx_loading) return

        this.tx_loading = true

        const form_data = {
          to_address: this.current_token_detail.crowd_sale_contract_address,
          value: this.amount.toString(),
          private_key: this.private_key,
        }
        this.$store.dispatch('sendEth', form_data)
          .then(() => {
            this.transaction_success = true
            this.tx_loading = false
          })
          .catch((error) => {
            this.error_message = error.toString().split('\n')[0]
            this.transaction_failed = true
            this.tx_loading = false
          })
      },
      maxInvestAmount() {
        if (this.isRestricted()) return
        if (this.eth_balance < 0.000021) {
          this.transaction_failed = true
          this.error_message = 'Your Balance is lower than 0.000021, which is the Minimal transaction fee for ETH.'
        }
        else {
          this.amount = this.eth_balance - 0.000021
        }
      }
    },
    created() {
      if (this.$route.params.id) {
        this.getCompany(this.$route.params.id)
      }
    },
    // watch: {
    //   'loading': function () {
    //     if (!this.loading && this.$route.query.p) {
    //       setTimeout(function () {
    //         $('#invest_modal').modal('toggle')
    //       }, 500)
    //     }
    //   }
    // }
  }

</script>

<style scoped>
  .m-widget5 .m-widget5__item {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .document-container {
    display: inline-block;
    width: 100%;
  }

  .document-box {
    align-items: center;
    display: flex;
  }

  .u-flex1 {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .inbox-widget .inbox-item {
    border-bottom: 0;
  }

  .border-right {
    border-right: 1px solid rgba(54, 64, 74, 0.08);
  }

  .embed-responsive::before {
    display: block;
    content: ""
  }

  .embed-responsive .embed-responsive-item, .embed-responsive iframe, .embed-responsive embed, .embed-responsive object, .embed-responsive video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0
  }

  .embed-responsive-21by9::before {
    padding-top: 42.857143%
  }

  .embed-responsive-16by9::before {
    padding-top: 56.25%
  }
</style>
