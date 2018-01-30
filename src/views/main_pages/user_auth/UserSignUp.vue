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
            <div class="form-group">
              <input class="form-control" type="text" placeholder="First Name" name="firstname"
                     v-model="first_name" v-validate="'required|alpha'">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input class="form-control" type="text" placeholder="Last Name" name="lastname"
                     v-model="last_name" v-validate="'required|alpha'">
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-email"></i></span>
              <input class="form-control" type="email" name="email" v-model="email" v-validate="'required|email'" placeholder="Email">
            </div>
            <span class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            <span class="text-danger" v-show="email_msg">{{ email_msg }}</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-key"></i></span>
              <input class="form-control" type="password" name="password" v-model="password" v-validate="'required'" placeholder="Password">
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
            <button class="btn btn-primary btn-custom waves-effect waves-light w-md" @click="register()" :disabled="errors.any() || loading">
              Sign Up
            </button>
          </div>
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
        email_msg: '',
        loading: false,
      }
    },
    methods: {
      register() {
        this.loading = true
        this.email_msg = ''

        this.$validator.validateAll().then((result) => {
          // If Invalid
          // if (!result || !this.verified) {
          //    this.loading = false
          //    return
          // }
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
              if (error.response.data && error.response.data.hasOwnProperty('email')) {
                this.email_msg = error.response.data.email[0]
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
        this.email_msg = ''
        this.loading = false
      },
      // onVerify(response) {
      //   this.verified = response
      // },
      // onExpired() {
      //   this.$refs.recaptcha.reset()
      // },
    },
    created() {
      if (this.is_login) this.$router.push({ name: 'dashboard' })
    },
  }

</script>
