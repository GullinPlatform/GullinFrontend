<template>
  <div class="wrapper">
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

      <div class="row">
        <div class="col-lg-12">
          <div class="card-group m-b-20">
            <div class="card">
              <div class="card-box-no-outline">
                <h4 class="text-dark  header-title m-t-0 m-b-30">ETH Price</h4>

                <div class="widget-chart text-center">
                  <div id="sparkline1"></div>
                  <ul class="list-inline m-t-15 mb-0">
                    <li>
                      <h5 class="text-muted m-t-20">Target</h5>
                      <h4 class="m-b-0">$56,214</h4>
                    </li>
                    <li>
                      <h5 class="text-muted m-t-20">Last week</h5>
                      <h4 class="m-b-0">$98,251</h4>
                    </li>
                    <li>
                      <h5 class="text-muted m-t-20">Last Month</h5>
                      <h4 class="m-b-0">$10,025</h4>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-box-no-outline">
                <h4 class="text-dark header-title m-t-0 m-b-30">My Portfolio</h4>

                <div class="widget-chart text-center">
                  <div id="sparkline3"></div>
                  <ul class="list-inline m-t-15 mb-0">
                    <li>
                      <h5 class="text-muted m-t-20">Target</h5>
                      <h4 class="m-b-0">$1,84,125</h4>
                    </li>
                    <li>
                      <h5 class="text-muted m-t-20">Last week</h5>
                      <h4 class="m-b-0">$50,230</h4>
                    </li>
                    <li>
                      <h5 class="text-muted m-t-20">Last Month</h5>
                      <h4 class="m-b-0">$87,451</h4>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-box-no-outline">
                <h4 class="text-dark  header-title m-t-0 m-b-30">My Wallet</h4>

                <div class="widget-simple-chart">
                  <h3 class="text-primary counter m-t-10 pull-right">5685</h3>
                  <h3 class="m-t-10 text-left">ETH</h3>
                  <p class="text-muted text-nowrap m-b-10">Ether</p>
                </div>
                <hr>
                <div class="widget-simple-chart">
                  <h3 class="text-primary counter m-t-10 pull-right">5685</h3>
                  <h3 class="m-t-10 text-left">ETH</h3>
                  <p class="text-muted text-nowrap m-b-10">Ether</p>
                </div>
                <hr>
                <div class="widget-simple-chart">
                  <h3 class="text-primary counter m-t-10 pull-right">5685</h3>
                  <h3 class="m-t-10 text-left">ETH</h3>
                  <p class="text-muted text-nowrap m-b-10">Ether</p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- end row -->


      <div class="row">
        <div class="col-lg-8">
          <div class="card-box">
            <h4 class="text-dark  header-title m-t-0 m-b-30">Latest Transactions</h4>
            <table class="table mb-0 table-responsive">
              <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Assign</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>Minton Admin v1</td>
                <td>01/01/2017</td>
                <td>26/04/2017</td>
                <td>
                  <span class="badge badge-info">Released</span>
                </td>
                <td>Coderthemes</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Minton Frontend v1</td>
                <td>01/01/2017</td>
                <td>26/04/2017</td>
                <td>
                  <span class="badge badge-success">Released</span>
                </td>
                <td>Minton admin</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Minton Admin v1.1</td>
                <td>01/05/2017</td>
                <td>10/05/2017</td>
                <td>
                  <span class="badge badge-pink">Pending</span>
                </td>
                <td>Coderthemes</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Minton Frontend v1.1</td>
                <td>01/01/2017</td>
                <td>31/05/2017</td>
                <td>
                  <span class="badge badge-purple">Work in Progress</span>
                </td>
                <td>Minton admin</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Minton Admin v1.3</td>
                <td>01/01/2017</td>
                <td>31/05/2017</td>
                <td>
                  <span class="badge badge-warning">Coming soon</span>
                </td>
                <td>Coderthemes</td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
        <!-- end col -8 -->

        <div class="col-lg-4">
          <div class="card-box">
            <h4 class="text-dark  header-title m-t-0 m-b-30">Updates</h4>
            <div class="inbox-widget">
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img src="" alt="">
                  </div>
                  <p class="inbox-item-author">Chadengle</p>
                  <p class="inbox-item-text">Hey! there I'm available...</p>
                  <p class="inbox-item-date">13:40 PM</p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img src="" alt="">
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">13:34 PM</p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img src="" alt="">
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">13:17 PM</p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img src="" alt="">
                  </div>
                  <p class="inbox-item-author">Kurafire</p>
                  <p class="inbox-item-text">Nice to meet you</p>
                  <p class="inbox-item-date">12:20 PM</p>
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
      return {}
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        me: 'me',
        me_wallet: 'me_wallet',
      }),
    },
    methods: {},
    created() {
      if (!this.is_login) this.$router.push({ name: 'user_login' })
      if (this.me.verification_level <= 1 && this.me_wallet.eth_address === '') this.$router.push({ name: 'user_signup_followup' })
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
