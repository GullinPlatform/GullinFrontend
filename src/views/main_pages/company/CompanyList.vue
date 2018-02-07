<template>
  <div class="wrapper">
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
                    Coming
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
        <div class="col-sm-4 col-lg-3 col-xs-12" v-for="company in company_list">

          <div class="card m-b-20">
            <!--<img :src="company.display_img">-->
            <img class="card-img-top img-fluid" :src="company.display_img" alt="Card image cap">
            <div class="card-body">
              <h4 class="m-0"> {{company.name}}</h4>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{{company.short_description}}</li>

              <li class="list-group-item"> {{company.token_detail.end_datetime}}</li>
            </ul>

            <div class="card-body text-center">
              <router-link :to="{name: 'token_sale_detail', params:{id:company.id}}" class="btn m-btn--pill btn-secondary m-btn m-btn--hover-brand m-btn--custom">
                See Detail
              </router-link>
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
    name: 'TokenSaleList',
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      loadCompanyList(type) {
        this.loading = true
        this.$store.dispatch('listCompanies', type)
          .then(() => {
            this.loading = false
          })
      },
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        company_list: 'company_list',
        me: 'me',
      }),
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
