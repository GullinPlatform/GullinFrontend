<template>
  <div :class="{'wrapper-sm': !is_login, 'wrapper':is_login}">
    <div class="container-fluid">
      <!-- Page-Title -->
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <div class="btn-group pull-right">
              <ol class="breadcrumb hide-phone p-0 m-0">
                <li class="breadcrumb-item">
                  <router-link
                    :class="{active:$route.name==='token_sale_list_active'||$route.name==='token_sale_list'}"
                    :to="{name:'token_sale_list_active'}">
                    Active
                  </router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link
                    :class="{active:$route.name==='token_sale_list_coming'}"
                    :to="{name:'token_sale_list_coming'}">
                    Upcoming
                  </router-link>
                </li>
                <li class="breadcrumb-item active">
                  <router-link
                    :class="{active:$route.name==='token_sale_list_all'}"
                    :to="{name:'token_sale_list_all'}">
                    All
                  </router-link>
                </li>
              </ol>
            </div>
            <h4 class="page-title">Token Sales</h4>
          </div>
        </div>
      </div>
      <!-- end page title end breadcrumb -->

      <div class="row">
        <div class="col-sm-6 col-lg-3 col-xs-12" v-for="company in company_list">
          <div class="card company-card m-b-20">
            <div class="card-body">
              <h4 class="card-title">
                <router-link :to="{name: 'token_sale_detail', params:{id:company.name}}" class="text-primary">{{company.name}}</router-link>
                <span class="badge badge-info pull-right ml-1" v-if="timeCounter(company.token_detail.start_datetime, company.token_detail.end_datetime).includes('Starts')">Upcoming</span>
                <span class="badge badge-success pull-right ml-1" v-else-if="timeCounter(company.token_detail.start_datetime, company.token_detail.end_datetime).includes('Ends')">Active</span>
                <span class="badge badge-danger pull-right ml-1" v-else="timeCounter(company.token_detail.start_datetime, company.token_detail.end_datetime).includes('Ended')">Ended</span>

                <span class="badge badge-primary pull-right" v-if="company.token_detail.ico_stage_type === 0">Pre-Sale</span>
                <span class="badge badge-primary pull-right" v-else>Crowd-Sale</span>
              </h4>
              <h6 class="card-subtitle text-muted">{{timeCounter(company.token_detail.start_datetime, company.token_detail.end_datetime)}}</h6>
            </div>
            <router-link :to="{name: 'token_sale_detail', params:{id:company.name}}">
              <img class="card-img-top img-fluid" :src="company.display_img">
            </router-link>
            <div class="card-body">
              <div class="card-text company-text mb-2">{{company.short_description}}</div>
              <router-link :to="{name: 'token_sale_detail', params:{id:company.name}, query:{p:true}}" class="btn btn-primary btn-block">Participate</router-link>
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
  /* eslint-disable brace-style */

  import { mapGetters } from 'vuex'

  export default {
    name: 'TokenSaleList',
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        company_list: 'company_list',
        me: 'me',
      }),
    },
    methods: {
      loadCompanyList() {
        this.loading = true

        if (this.$route.name === 'token_sale_list') {
          this.$store.dispatch('listCompanies', '')
            .then(() => {
              this.loading = false
            })
        }
        if (this.$route.name === 'token_sale_list_active') {
          this.$store.dispatch('listCompanies', 'active')
            .then(() => {
              this.loading = false
            })
        }
        if (this.$route.name === 'token_sale_list_coming') {
          this.$store.dispatch('listCompanies', 'coming')
            .then(() => {
              this.loading = false
            })
        }
        if (this.$route.name === 'token_sale_list_all') {
          this.$store.dispatch('listCompanies', 'all')
            .then(() => {
              this.loading = false
            })
        }
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
    },
    created() {
      this.loadCompanyList()
    },
    watch: {
      '$route': function () {
        this.loadCompanyList()
      }
    }
  }
</script>

<style>
  .breadcrumb-item.active {
    color: #3bafda;
  }

  .company-card {
    height: 28em;
  }

  .company-text {
    height: 6em;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1448px) {
    .company-card {
      height: 27em !important;
    }

    .company-text {
      height: 4em !important;
    }
  }

  @media (max-width: 990px) {
    .company-card {
      height: 32em !important;
    }

    .company-text {
      height: 4em !important;
    }
  }
</style>
