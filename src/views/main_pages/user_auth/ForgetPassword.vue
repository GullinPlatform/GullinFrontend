<template>
  <template>
    <div class="m-grid m-grid--hor m-grid--root m-page">
      <div class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2" id="m_login" style="background-image: url(../../../assets/app/media/img//bg/bg-3.jpg);">
        <div class="m-grid__item m-grid__item--fluid	m-login__wrapper">
          <div class="m-login__container">
            <div class="m-login__logo">
              <a href="#">
                <img src="/static/media/img/logos/logo-1.png">
              </a>
            </div>
            <div class="m-login__forget-password">
              <div class="m-login__head">
                <h3 class="m-login__title">
                  Forgotten Password ?
                </h3>
                <div class="m-login__desc">
                  Enter your email to reset your password:
                </div>
              </div>
              <form class="m-login__form m-form" action="">
                <div class="form-group m-form__group">
                  <input class="form-control m-input" type="text" placeholder="Email" name="email" id="m_email" autocomplete="off">
                </div>
                <div class="m-login__form-action">
                  <button id="m_login_forget_password_submit" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primaryr">
                    Request
                  </button>
                  &nbsp;&nbsp;
                  <button id="m_login_forget_password_cancel" class="btn btn-outline-focus m-btn m-btn--pill m-btn--custom m-login__btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

</template>
<script>
  export default {
    name: 'ForgetPassword',
    head: {
      title: {
        inner: 'ICOToday',
        complement: 'Forget Password',
      }
    },
    data () {
      return {
        email: '',
        sent: false,
        error_message: '',
      }
    },
    methods: {
      forgetPasswordSendEmail () {
        if (!this.email) {
          this.error_message = 'Please provide email'
          return
        }
        this.$store.dispatch('forgetPasswordSendEmail', this.email)
          .then(() => {
            this.sent = true
          })
          .catch(() => {
            this.loaded = true
            this.error_message = 'We are unable to find the account with this email provided, are you sure you put the right email address?'
          })
      }
    },
    computed: {
      is_login () {
        return this.$store.getters.is_login
      },
    },
    beforeCreate () {
      // redirect login user
      if (this.$store.getters.is_login) {
        this.$router.push({name: 'landing'})
      }
    }
  }
</script>
