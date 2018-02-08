<template>
  <div class="wrapper">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-auto">
          <div class="message-box text-center">
            <h1 class="m-b-0">404</h1>
            <h4>Page not found</h4>
            <div class="buttons-con">
              <div class="action-link-wrap">
                <a onclick="history.back(-1)" href="" class="btn btn-custom btn-primary waves-effect waves-light m-t-20">Go Back</a>
                <router-link :to="{name:'dashboard'}" class="btn btn-custom btn-primary waves-effect waves-light m-t-20" v-show="is_login">Go to Dashboard</router-link>
                <router-link :to="{name:'user_login'}" class="btn btn-custom btn-primary waves-effect waves-light m-t-20" v-show="!is_login">Go to Login Page</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Page404',
    computed: {
      ...mapGetters({
        is_login: 'is_login',
      }),
    },

  }
</script>
