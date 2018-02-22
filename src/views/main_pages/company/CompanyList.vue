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
          <div class="card m-b-20">
            <div class="card-body">
              <h4 class="card-title">{{company.name}}</h4>
              <h6 class="card-subtitle text-muted">{{timeCounter(company.token_detail.start_datetime, company.token_detail.end_datetime)}}</h6>
            </div>
            <router-link :to="{name: 'token_sale_detail', params:{id:company.name}}">
              <img class="card-img-top img-fluid" :src="company.display_img">
            </router-link>
            <div class="card-body">
              <p class="card-text">{{company.short_description}}</p>
              <router-link :to="{name: 'token_sale_detail', params:{id:company.name}}" class="btn btn-primary btn-block">See Detail</router-link>
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
      loadCompanyList(type) {
        this.loading = true
        this.$store.dispatch('listCompanies', type)
          .then(() => {
            this.loading = false
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
    },
    created() {
      if (this.$route.name === 'token_sale_list_active') {
        this.loadCompanyList('active')
      }
      if (this.$route.name === 'token_sale_list_coming') {
        this.loadCompanyList('coming')
      }
      if (this.$route.name === 'token_sale_list_all' || this.$route.name === 'token_sale_list') {
        this.loadCompanyList('all')
      }
    },
  }
</script>

<style>
  .breadcrumb-item.active {
    color: #3bafda;
  }
</style>
