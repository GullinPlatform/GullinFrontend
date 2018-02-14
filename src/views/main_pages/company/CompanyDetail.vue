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
              <h5 class="mt-0 m-b-5 font-16"> {{current_company.name}}</h5>
              <p class="text-muted m-b-5 font-13">{{current_company.short_description}}</p>
              <small><b> {{timeCounter(current_company.token_detail.start_datetime,current_company.token_detail.end_datetime)}}</b></small>
            </div>
          </div>
          <div class="col-md-3 col-sm-12">
            <a class="btn btn-primary btn-block text-white mt-3" data-toggle="modal" data-target="#invest_modal">Invest Now</a>
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
        </ul>
        <div class="tab-content px-3">
          <div class="tab-pane fade show active" id="tab1">
            <div v-html="current_company.description"></div>
            <div class="text-center">
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
                    <td> {{current_token_detail.price}} ETH</td>
                  </tr>
                  <tr>
                    <td>Total Supply</td>
                    <td> {{current_token_detail.total_token_supply}} {{current_token_detail.token_code}}</td>
                  </tr>
                  <tr>
                    <td>Soft Market Cap</td>
                    <td> {{current_token_detail.soft_market_cap}} {{current_token_detail.market_cap_unit}}</td>
                  </tr>
                  <tr>
                    <td>Hard Market Cap</td>
                    <td> {{current_token_detail.hard_market_cap}} {{current_token_detail.market_cap_unit}}</td>
                  </tr>
                  <tr>
                    <td>Token Distribution</td>
                    <td v-html="current_token_detail.token_distribution"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-6 col-md-12">
                <h4 class="header-title ml-2 mb-3"><b>Investment Info</b></h4>
                <table class="table">
                  <tbody>
                  <tr>
                    <td>Threshold (Min Investment Value)</td>
                    <td> {{current_token_detail.threshold}} ETH</td>
                  </tr>
                  <tr>
                    <td>Investor Restrictions</td>
                    <td> {{current_token_detail.restrictions}}</td>
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
                      <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook"></i></a>
                      </li>
                      <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-linkedin"></i></a>
                      </li>
                      <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-globe"></i></a>
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
                      <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook"></i></a>
                      </li>
                      <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-linkedin"></i></a>
                      </li>
                      <li class="list-inline-item">
                        <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-globe"></i></a>
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
        </div>
      </div>
      <!--begin::Modal-->
      <div id="invest_modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Invest</h4>
            </div>
            <div class="modal-body row">
              <div class="col-md-6 border-right">
                <div class="row form-group">
                  <div class="col-10">
                    <label class="control-label">Amount</label>
                    <input v-model="amount" type="text" class="form-control" placeholder="0.00" :disabled="isRestricted()">
                  </div>
                  <label class="col-2 col-form-label mt-4">ETH</label>
                </div>
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="control-label">ICO Destination</label>
                    <input type="text" class="form-control" :value="current_token_detail.crowd_sale_contract_address" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="control-label">Your Wallet Address</label>
                    <input type="text" class="form-control" :value="me_wallet.eth_address" disabled>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="control-label">Your Private Key</label>
                    <input v-model="private_key" type="text" class="form-control" placeholder="Private Key" :disabled="isRestricted()">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="alert alert-primary" v-if="!isRestricted()">
                  You are investing in <b>{{current_company.name}}</b>, please make sure you are on the right page!
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
                    <td>Price</td>
                    <td> {{current_token_detail.price}} ETH / {{current_token_detail.token_code}}</td>
                  </tr>
                  <tr>
                    <td>Threshold</td>
                    <td> {{current_token_detail.threshold}} ETH</td>
                  </tr>
                  <tr>
                    <td>Restrictions</td>
                    <td> {{current_token_detail.restrictions}}</td>
                  </tr>
                  <tr>
                    <td> Bonus</td>
                    <td v-html="current_token_detail.bonus"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" @click="sendEth()" :class="{'btn-secondary':isRestricted(), 'btn-primary':!isRestricted()}">Invest</button>
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

  export default {
    name: 'TokenSaleDetail',
    data() {
      return {
        loading: true,

        amount: '',
        private_key: null,
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        current_company: 'current_company',
        current_token_detail: 'current_token_detail',
        me_wallet: 'me_wallet',
        me: 'me',
        verification_level: 'verification_level',
      }),
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
          return 'Start in ' + rest
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
          return 'End in ' + rest
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
        // User if verified?
        if (this.verification_level < 4) return 1
        // Check restricted country
        const restricted_country_list = JSON.parse(this.current_token_detail.restricted_country_list)
        if (restricted_country_list.indexOf(this.me.nationality) >= 0) return 2
        // Check balance
        const eth_balance = this.me_wallet.balances[0].balance
        if (eth_balance <= this.current_token_detail.threshold) return 3
      },
      sendEth() {
        // Check List before send ETH
        // Check restricted
        if (this.isRestricted()) return
        // Check threshold
        if (this.amount && this.amount < this.current_token_detail.threshold) return
        // Check private key
        if (!this.private_key) return

        const form_data = {
          to: this.current_token_detail.crowd_sale_contract_address,
          value: this.amount,
          private_key: this.private_key,
        }
        this.$store.dispatch('sendEth', form_data)
      },
    },
    created() {
      if (this.$route.params.id) {
        this.getCompany(this.$route.params.id)
      }
    },
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
</style>
