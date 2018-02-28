<template>
  <!-- begin:: Page -->
  <div>
    <!-- begin::Header -->
    <head-bar></head-bar>
    <!-- end::Header -->
    <!-- begin::Body -->
    <router-view></router-view>
    <!-- end::Body -->
    <!-- begin::Footer -->
    <foot-bar></foot-bar>
    <!-- end::Footer -->
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  import HeadBar from 'components/HeadBar'
  import FootBar from 'components/FootBar'

  export default {
    name: 'RootLayout',
    components: {
      HeadBar,
      FootBar,
    },
    computed: {
      ...mapGetters({
        me: 'me',
        me_name: 'me_name',
        is_login: 'is_login',
        verification_level: 'verification_level',
        me_wallet: 'me_wallet',
      }),
    },
    watch: {
      // 'is_login'() {
      //   if (!this.is_login) {
      //     if (this.$route.name && this.$route.name.indexOf('token_sale') === -1)
      //       this.$router.push({ name: 'user_login' })
      //     if (!this.$route.name)
      //       this.$router.push({ name: 'user_login' })
      //   }
      //   else {
      //     this.$router.push({ name: 'dashboard' })
      //   }
      // },
    },
  }
</script>


<style>
  @media (min-width: 1448px) {
    .container-fluid {
      width: 75%;
    }
  }

  @media (max-width: 992px) {
    .container-fluid {
      width: 95%;
    }
  }

  @media (max-width: 768px) {
    .container-fluid {
      width: 100%;
    }
  }

  .btn-primary.disabled, .btn-primary:disabled {
    background-color: #868e96;
    border-color: #868e96;
  }

  .has-danger .form-control {
    border-color: #ef5350;
    box-shadow: none !important;
  }
</style>
