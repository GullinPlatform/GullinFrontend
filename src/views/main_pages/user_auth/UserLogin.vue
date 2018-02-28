<template>
  <div class="wrapper-page">
    <div class="page-title-box d-xl-none"></div>
    <div class="text-center">
      <p class="logo-lg"><span> Login to Gullin</span></p>
    </div>
    <div class="card-box" v-if="!login_success">
      <div class="form-horizontal m-t-20">
        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-email"></i></span>
              <input class="form-control" type="email" name="email" v-model="email" placeholder="Your Email">
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-key"></i></span>
              <input class="form-control" type="password" name="password" v-model="password" placeholder="Your Password"
                     @keyup.enter="login($event)">
            </div>
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom w-md" @click="login($event)" :disabled="!email||!password">
              Login
            </button>
          </div>
          <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
        </div>

        <div class="form-group row m-t-30">
          <div class="col-sm-7">
            <router-link :to="{name:'user_forget_password'}" class="text-muted"><i class="fa fa-lock m-r-5"></i>
              Forget password?
            </router-link>
          </div>
          <div class="col-sm-5 text-right">
            <router-link class="text-muted" :to="{name:'user_signup'}">
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card-box" v-else>
      <div class="alert alert-success">
        {{response}}
      </div>
      <div class="form-horizontal m-t-20">
        <div class="form-group row">

          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-cellphone-iphone"></i></span>
              <input class="form-control" v-model="code" placeholder="2 Factor Code">
            </div>
            <span class="text-danger">{{ error_message }}</span>
          </div>
        </div>

        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom w-md" @click="login2factor($event)" :disabled="!code">
              Verify
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
  import { SHA256 } from './../../../utils'

  export default {
    name: 'UserLogin',
    data() {
      return {
        email: '',
        password: '',

        login_success: false,
        response: '',
        code: '',

        error_message: '',
      }
    },
    methods: {
      login(e) {
        e.preventDefault()
        if (!this.email || !this.password) return

        const form_data = {
          email: this.email,
          password: SHA256(this.password),
        }

        this.$store.dispatch('login', form_data)
          .then((response) => {
            if (response.data !== 'success') {
              this.login_success = true
              this.response = response.data
              this.resetState()
            }
          })
          .catch(() => {
            this.error_message = 'Unable to login using provided email and password'
            this.password = ''
          })
      },
      login2factor(e) {
        e.preventDefault()
        if (!this.code) return

        const form_data = {
          verification_code: this.code,
        }

        this.$store.dispatch('login2factor', form_data)
          .then(() => {
            this.resetState()
          })
          .catch((error) => {
            this.error_message = error.data.error
            this.password = ''
          })
      },
      resetState() {
        this.email = ''
        this.password = ''
        this.error_message = ''
      },
    },
  }
</script>
