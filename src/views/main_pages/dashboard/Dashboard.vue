<template>
  <div class="wrapper" v-if="me_wallet&&transactions">
    <div class="container-fluid">

      <!-- Page-Title -->
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">

            <h4 class="page-title">Dashboard</h4>
          </div>
        </div>
      </div>
      <!-- end page title end breadcrumb -->
      <div class="row" v-if="verification_level<=2">
        <div class="col-sm-12">
          <div class="alert alert-warning alert-dismissable">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            You need to verify your identity before participating in Token Sales.
            <router-link :to="{name:'settings_verification'}"><b>Verify Now</b></router-link>
          </div>
        </div>
      </div>
      <div class="row" v-if="verification_level===3">
        <div class="col-sm-12">
          <div class="alert alert-success alert-dismissable">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            You have successfully submitted your identity verification application, please wait up to 24 hours to process it
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8">
          <div class="card-box">
            <h4 class="text-dark  header-title m-t-0 m-b-30">ETH Price</h4>
            <div class="widget-chart text-center">
              <div style="min-width: 200px; min-height: 200px;">
                <canvas id="eth-chart" width="200px"></canvas>
              </div>
              <ul class="list-inline mt-2 mb-0">
                <li>
                  <h5 class="text-muted m-t-20">Current</h5>
                  <h4 class="m-b-0">${{eth_market_data.now}}</h4>
                </li>
                <li>
                  <h5 class="text-muted m-t-20">24h Change</h5>
                  <h4 class="m-b-0"
                      :class="{'text-danger':eth_market_data.change_24h<0,
                          'text-success':eth_market_data.change_24h>0}">
                    {{eth_market_data.change_24h}}%
                  </h4>
                </li>
                <li>
                  <h5 class="text-muted m-t-20">1h Change</h5>
                  <h4 class="m-b-0"
                      :class="{'text-danger':eth_market_data.change_1h<0,
                          'text-success':eth_market_data.change_1h>0}">
                    {{eth_market_data.change_1h}}%
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card-box">
            <h4 class="text-dark header-title m-t-0 m-b-30">My Wallet
              <div class="pull-right">
                <router-link :to="{name:'wallet'}" class="text-primary">See All</router-link>
              </div>
            </h4>
            <div class="widget-simple-chart" v-for="(balance, index) in balances" v-if="index<=3">
              <h3 class="text-primary counter m-t-10 pull-right">{{Number(balance.balance).toFixed(3)}}</h3>
              <h3 class="m-t-10 text-left">{{balance.token.token_code}}</h3>
              <p class="text-muted text-nowrap mb-0">{{balance.token.token_name}}</p>
              <hr v-if="index!==3" class="my-2">
            </div>
          </div>

        </div>
      </div>
      <!-- end row -->


      <div class="row">
        <div class="col-lg-8">
          <div class="card-box">
            <h4 class="text-dark header-title m-b-30">
              <div class="pull-right">
                <router-link :to="{name:'wallet'}" class="text-primary">See All</router-link>
              </div>
              Latest Transactions
            </h4>
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
              <tr v-for="(tx, index) in transactions" v-if="index<5">
                <th v-if="tx.type==='SEND'"><span class="badge badge-danger">{{tx.type}}</span></th>
                <th v-else><span class="badge badge-success">{{tx.type}}</span></th>
                <td>{{Number(tx.value).toFixed(3) + ' ' + tx.value_unit}}</td>
                <td v-if="tx.from_address_note">{{tx.from_address_note}}</td>
                <td v-else><a :href="'https://etherscan.io/address/'+tx.from_address" target="_blank">{{tx.from_address.substring(0,7)+'...'}}</a></td>
                <td v-if="tx.to_address_note">{{tx.to_address_note}}</td>
                <td v-else><a :href="'https://etherscan.io/address/'+tx.to_address" target="_blank">{{tx.to_address.substring(0,7)+'...'}}</a></td>
                <td v-html="timeFromNow(tx.datetime)"></td>
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
        <!-- end col -8 -->
        <div class="col-lg-4">
          <div class="card-box">
            <h4 class="text-dark header-title">Press Releases</h4>
            <div class="inbox-widget">
              <a :href="release.url" target="_blank" v-for="(release, index) in press_releases" v-if="index<=4">
                <div class="inbox-item">
                  <p class="inbox-item-author">{{release.title}}</p>
                  <p class="inbox-item-text">{{release.brief}} <span class="pull-right">{{timeFromNow(release.created)}}</span></p>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
      <!-- end row -->

    </div>
    <!-- end container -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    data() {
      return {
        eth_market_data: {},
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        me: 'me',
        me_wallet: 'me_wallet',
        balances: 'balances',
        transactions: 'transactions',
        press_releases: 'press_releases',
        verification_level: 'verification_level',
      }),
    },
    methods: {
      timeFromNow(time) {
        return moment(time).fromNow()
      },
      generateLabels() {
        const list_hours = []
        const d = new Date()
        let hour = d.getHours()
        for (let i = 0; i < 24; i += 1) {
          list_hours.unshift(hour + ':00')
          hour -= 1
          if (hour === -1) hour += 24
        }
        return list_hours
      },
      drawEthMarketData() {
        this.$store.dispatch('getEthMarketData')
          .then((response) => {
            this.eth_market_data = response
            new Chart('eth-chart', {
              type: 'line',
              data: {
                labels: this.generateLabels(),
                datasets: [{
                  backgroundColor: Color('#00b19d').alpha(0.5).rgbString(),
                  borderColor: '#00b19d',
                  data: this.eth_market_data.line_chart_data,
                  fill: 'start',
                }],
              },
              options: {
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                    gridLines: { display: false },
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 6,
                      maxRotation: 0,
                      minRotation: 0,
                    },
                  }],
                  yAxes: [{
                    gridLines: { display: false },
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 5,
                      maxRotation: 0,
                      minRotation: 0,
                    },
                  }],
                },
                elements: { point: { radius: 1 } },
                legend: { display: false },
                tooltips: {
                  callbacks: {
                    label: (tooltipItem) => tooltipItem.yLabel,
                  },
                },
              },
            })
          })
      },
    },
    created() {
      this.$store.dispatch('listPressReleases')
    },
    mounted() {
      this.drawEthMarketData()
    },
  }
</script>
<style scoped>
  .card-box-no-outline {
    padding: 20px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #ffffff;
  }
</style>
