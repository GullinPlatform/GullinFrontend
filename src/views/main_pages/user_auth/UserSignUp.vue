<template>
  <div class="wrapper-page">
    <div class="page-title-box d-xl-none"></div>
    <div class="text-center">
      <p class="logo-lg"><span> Sign Up to Gullin</span></p>
    </div>
    <div class="card-box">
      <div class="form-horizontal m-t-20">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group" :class="{'has-danger': errors.has('first_name')}">
              <input class="form-control" type="text" name="first_name" placeholder="First Name" v-model="first_name" v-validate="'required|alpha'">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" :class="{'has-danger': errors.has('last_name')}">
              <input class="form-control" type="text" name="last_name" placeholder="Last Name" v-model="last_name" v-validate="'required|alpha'">
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <div class="input-group" :class="{'has-danger': errors.has('email')}">
              <span class="input-group-addon"><i class="mdi mdi-email"></i></span>
              <input class="form-control" type="email" name="email" v-model="email" v-validate="'required|email'" placeholder="Email">
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12">
            <div class="input-group" :class="{'has-danger': errors.has('password')}">
              <span class="input-group-addon"><i class="mdi mdi-key"></i></span>
              <input class="form-control" type="password" name="password" v-model="password" v-validate="'required'" placeholder="Password"
                     @keyup.enter="register()">
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12">
            <div class="checkbox checkbox-primary">
              <input id="checkbox-signup" type="checkbox" v-model="check" v-validate="'required'">
              <label for="checkbox-signup">
                I accept <a href="#">Terms and Conditions</a>
              </label>
            </div>
          </div>
        </div>

        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom w-md" @click="register()" :disabled="errors.any() || loading">
              Sign Up
            </button>
          </div>
          <span class="text-danger" v-show="error_message">{{ error_message }}</span>

        </div>
        <div class="form-group row m-t-30">
          <div class="col-12 text-center">
            <router-link class="text-muted" :to="{name:'user_login'}">
              Already have account?
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from 'components/Spinner'
  import { SHA256 } from './../../../utils'

  export default {
    name: 'SignUp',
    components: { Spinner },
    data() {
      return {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        check: true,

        verified: '',
        error_message: '',
        loading: false,
      }
    },
    methods: {
      register() {
        this.loading = true
        this.error_message = ''

        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.loading = false
            return
          }
          // Valid
          const form_data = {
            email: this.email,
            password: SHA256(this.password),
            first_name: this.first_name,
            last_name: this.last_name,
            verified: this.verified,
          }

          this.$store.dispatch('signup', form_data)
            .then(() => {
              // Clean up
              this.resetState()
            })
            .catch(error => {
              this.loading = false
              if (error.data.email) {
                this.error_message = error.data.email[0]
              }
            })
        })
      },
      resetState() {
        this.first_name = ''
        this.last_name = ''
        this.email = ''
        this.password = ''
        this.check = false
        this.error_message = ''
        this.loading = false
      },
      // onVerify(response) {
      //   this.verified = response
      // },
      // onExpired() {
      //   this.$refs.recaptcha.reset()
      // },
    },
  }

</script>
