<template>
  <div class="wrapper-page">
    <div class="page-title-box d-xl-none"></div>
    <div class="text-center">
      <p class="logo-lg"><span> Password Recovery</span></p>
    </div>
    <div class="card-box" v-if="step===1">
      <div class="alert alert-success">
        Please input your phone number or email.
      </div>
      <div class="form-horizontal m-t-20">
        <div class="form-group row">

          <div class="col-12">
            <div class="input-group">
              <span class="input-group-addon"><i class="mdi mdi-cellphone-iphone"></i> / <i class="mdi mdi-email"></i></span>
              <input class="form-control" v-model="email_or_phone" placeholder="Phone / Email">
            </div>
          </div>
        </div>

        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom w-md" @click="sendCode()" :disabled="!email_or_phone">
              Send Code
            </button>
          </div>
          <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
        </div>

        <div class="form-group row m-t-30">
          <div class="col-sm-7">
            <router-link class="text-muted" :to="{name:'user_login'}">
              Login
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
    <div class="card-box" v-if="step===2">
      <div class="alert alert-success">
        Please input the verification code you received.
      </div>
      <div class="form-horizontal m-t-20">
        <div class="form-group m-b-5">
          <div class="input-group">
            <input class="form-control" placeholder="Enter Code" required="" v-model="code" @keyup.enter="verifyCode()">
            <span class="input-group-btn">
              <button type="submit" class="btn btn-email btn-primary" @click="verifyCode()">Verify</button>
            </span>
          </div>
          <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>

        </div>
      </div>
    </div>
    <div class="card-box" v-if="step===3">
      <div class="alert alert-success">
        Please Create Your New Password
      </div>
      <div class="form-horizontal m-t-20">
        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <input class="form-control" type="password" name="password" v-model="new_password1" placeholder="Password">
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12">
            <div class="input-group">
              <input class="form-control" type="password" name="password" v-model="new_password2" placeholder="Repeat Password">
            </div>
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom w-md" @click="updatePassword()" :disabled="!new_password1||!new_password2">
              Submit
            </button>
          </div>
          <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
        </div>
      </div>
    </div>
    <div class="card-box" v-if="step===4">
      <div class="alert alert-success">
        You have successfully updated your password.
      </div>
      <div class="form-group text-center m-t-20">
        <div class="col-xs-12">
          <router-link :to="{name:'user_login'}" class="btn btn-primary btn-custom w-md">
            Login
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { SHA256 } from './../../../utils'

  export default {
    name: 'ForgetPassword',
    data() {
      return {
        step: 1,
        email_or_phone: '',

        code: '',

        new_password1: '',
        new_password2: '',

        error_message: '',
      }
    },
    methods: {
      sendCode() {
        if (!this.email_or_phone) return

        const params = {
          u: this.email_or_phone,
        }

        this.$store.dispatch('forgotPasswordSendCode', params)
          .then(() => {
            this.step = 2
            this.error_message = ''
          })
          .catch((error) => {
            this.error_message = error.data.error
            this.email_or_phone = ''
          })
      },
      verifyCode() {
        if (!this.code) return

        const form_data = {
          verification_code: this.code,
        }

        this.$store.dispatch('forgotPasswordVerifyCode', form_data)
          .then(() => {
            this.step = 3
            this.error_message = ''
          })
          .catch((error) => {
            this.error_message = error.data.error
            this.code = ''
          })
      },
      updatePassword() {
        if (!this.new_password1 || !this.new_password2) return
        if (this.new_password1 !== this.new_password2) {
          this.error_message = 'Passwords are different'
          return
        }

        const form_data = {
          password: SHA256(this.new_password1),
        }

        this.$store.dispatch('forgotPasswordUpdate', form_data)
          .then(() => {
            this.step = 4
            this.error_message = ''
          })
          .catch((error) => {
            this.error_message = error.data.error
            this.code = ''
          })
      },
    },
  }
</script>
