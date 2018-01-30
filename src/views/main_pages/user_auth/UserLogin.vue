<template>
  <div class="wrapper-page">
    <div class="page-title-box d-xl-none"></div>
    <div class="text-center">
      <p class="logo-lg"><span> Login to Gullin</span></p>
    </div>
    <div class="card-box">
      <div class="form-horizontal m-t-20">
        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-email"></i></span>
              <input class="form-control" type="email" name="email" v-model="email" v-validate="'required|email'" placeholder="Your Email">
            </div>
            <span class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-key"></i></span>
              <input class="form-control" type="password" name="password" v-model="password" v-validate="'required'" placeholder="Your Password"
                     @keyup.enter="login($event)">
            </div>
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom waves-effect waves-light w-md" @click="login($event)" :disabled="errors.any()">
              Login
            </button>
          </div>
          <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
        </div>

        <div class="form-group row m-t-30">
          <div class="col-sm-7">
            <a href="pages-recoverpw.html" class="text-muted"><i class="fa fa-lock m-r-5"></i> Forgot
              password?</a>
          </div>
          <div class="col-sm-5 text-right">
            <router-link class="text-muted" :to="{name:'user_signup'}">
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { SHA256 } from './../../../utils'

  export default {
    name: 'UserLogin',
    data() {
      return {
        email: '',
        password: '',
        error_message: '',
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
      }),
    },
    methods: {
      login(e) {
        e.preventDefault()
        if (this.errors.any()) return

        const form_data = {
          email: this.email,
          password: SHA256(this.password),
        }

        this.$store.dispatch('login', form_data)
          .then(() => {
            this.resetState()
          })
          .catch(() => {
            this.error_message = 'Unable to login using provided email and password'
            this.password = ''
          })
      },
      resetState() {
        this.email = ''
        this.password = ''
        this.error_message = ''
      },
    },
    created() {
      if (this.is_login) this.$router.push({ name: 'dashboard' })
    },
  }
</script>
