<template>
  <div class="wrapper">
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
          <div class="row">
            <div class="col-lg-12">
              <div class="widget-simple text-center card-box">
                <a data-toggle="modal" data-target="#deposit_modal" class="btn btn-success text-white waves-effect waves-light">Deposit</a>
                <a data-toggle="modal" data-target="#withdraw_modal" class="btn btn-success text-white waves-effect waves-light">Withdraw</a>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="card-box widget-icon">
                <h4 class="text-dark header-title m-t-0 m-b-30">My Balance</h4>

                <div class="widget-simple-chart" v-for="balance in balances">
                  <h3 class="text-primary counter m-t-10 pull-right">{{balance.balance}}</h3>
                  <h3 class="m-t-10 text-left">{{balance.token.token_code}}</h3>
                  <p class="text-muted text-nowrap m-b-10">{{balance.token.token_name}}</p>
                  <hr>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="card-box">
            <h4 class="text-dark header-title m-b-30">Transactions</h4>

            <table class="table">
              <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <withdraw-modal></withdraw-modal>
    <deposit-modal></deposit-modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import DepositModal from 'views/main_pages/wallet/DepositModal'
  import WithdrawModal from 'views/main_pages/wallet/WithdrawModal'
  import Spinner from 'components/Spinner'

  import { web3 } from '../../../utils'

  export default {
    name: 'Wallet',
    components: {
      Spinner,
      WithdrawModal,
      DepositModal,
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        me: 'me',
        me_wallet: 'me_wallet',
        balances: 'balances',
        is_login: 'is_login',
        verification_level: 'verification_level',
      }),
    },
    methods: {},
    created() {
      this.$store.dispatch('syncEthBalance')
      this.$store.dispatch('syncTransactions')
    },
  }
</script>

<style scoped>
  .m-widget5 .m-widget5__item {
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
