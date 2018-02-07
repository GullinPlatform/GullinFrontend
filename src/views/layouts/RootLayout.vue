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
    beforeCreate() {
      if (!this.is_login) this.$router.push({ name: 'user_login' })
    },
    watch: {
      'is_login': function () {
        if (!this.is_login) this.$router.push({ name: 'user_login' })
      },
      'me': function () {
        if (this.is_login) {
          if (this.me.verification_level < 1) this.$router.push({ name: 'user_signup_followup' })
          else this.$router.push({ name: 'dashboard' })
        }
      },
      'me_wallet': function () {
        if (this.is_login) {
          if (this.me_wallet.eth_address === null) this.$router.push({ name: 'user_signup_followup' })
        }
      },
    },
  }
</script>


<style>
  @media (min-width: 992px) {
    .container-fluid {
      width: 75%;
    }
  }
</style>
