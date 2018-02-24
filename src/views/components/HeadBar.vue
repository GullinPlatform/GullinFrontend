<template>
  <!-- Navigation Bar-->
  <header id="topnav">
    <div class="topbar-main">
      <div class="container-fluid">

        <!-- Logo container-->
        <div class="logo">
          <!-- Text Logo -->
          <!--<router-link :to="{name:'dashboard'}" class="logo">-->
            <!--<span class="logo-small" style="padding-top: 5px;">Gullin.io</span>-->
            <!--<span class="logo-large" style="padding-top: 5px;">Gullin.io</span>-->
          <!--</router-link>-->
          <!-- Image Logo -->
          <router-link :to="{name:'dashboard'}" class="logo">
              <img src="/static/images/gullin_logo.png" alt="" height="24" class="logo-large">
              <img src="/static/images/gullin_logo.png" alt="" height="24" class="logo-small">
          </router-link>
        </div>
        <!-- End Logo container-->
        <div class="menu-extras topbar-custom" v-show="is_login">
          <ul class="list-inline float-right mb-0">
            <li class="menu-item list-inline-item">
              <!-- Mobile menu toggle-->
              <a class="navbar-toggle nav-link" v-show="$route.name!=='user_signup_followup'">
                <div class="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
              <!-- End mobile menu toggle-->
            </li>
            <li class="list-inline-item dropdown notification-list">
              <a class="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="">
                <img src="/static/images/users/default.jpg" alt="user" class="rounded-circle">
                <span class="m-l-5"> {{me_name}}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right profile-dropdown " aria-labelledby="Preview">
                <!-- item-->
                <router-link :to="{name:'settings'}" class="dropdown-item notify-item" v-show="$route.name!=='user_signup_followup'">
                  <i class="mdi mdi-account-star-variant"></i>
                  <span>My Profile</span>
                </router-link>
                <!-- item-->
                <router-link :to="{name:'settings_verification'}" class="dropdown-item notify-item" v-show="$route.name!=='user_signup_followup'">
                  <i class="mdi mdi-verified"></i>
                  <span>Verification</span>
                </router-link>
                <a href="http://help.gullin.io" target="_blank" class="dropdown-item notify-item">
                  <i class="mdi mdi-comment-question-outline"></i>
                  <span>FAQ</span>
                </a>
                <!-- item-->
                <hr class="m-0">
                <!-- item-->
                <a href="javascript:void(0);" @click="logout()" class="dropdown-item notify-item">
                  <i class="mdi mdi-logout"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="menu-extras topbar-custom" v-if="!is_login">
          <ul class="list-inline float-right mb-0">
            <li class="list-inline-item dropdown notification-list">
              <router-link class="nav-link nav-user" :to="{name:'user_login'}" role="button">
                <span class="text-white">Login</span>
              </router-link>
            </li>
            <li class="list-inline-item dropdown notification-list">
              <router-link class="nav-link nav-user" :to="{name:'user_signup'}" role="button">
                <span class="text-white">Sign Up</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- end menu-extras -->
        <div class="clearfix"></div>
      </div>
      <!-- end container -->
    </div>
    <!-- end topbar-main -->
    <div class="navbar-custom" v-if="is_login&&$route.name!=='user_signup_followup'">
      <div class="container-fluid">
        <div id="navigation">
          <!-- Navigation Menu-->
          <ul class="navigation-menu">
            <li class="has-submenu" :class="{active: $route.name === 'dashboard'}">
              <router-link :to="{name:'dashboard'}">
                <i class="ti-home"></i>Dashboard
              </router-link>
            </li>
            <li class="has-submenu" :class="{active: $route.name === 'token_sale_list' || $route.name === 'token_sale_detail'}">
              <router-link :to="{name:'token_sale_list'}">
                <i class="ti-star"></i>Buy Tokens
              </router-link>
            </li>

            <li class="has-submenu" :class="{active: $route.name === 'wallet'}">
              <router-link :to="{name:'wallet'}">
                <i class="ti-wallet"></i>My Wallet
              </router-link>
            </li>

            <li class="has-submenu" :class="{active: $route.name === 'settings'}">
              <router-link :to="{name:'settings'}">
                <i class="ti-settings"></i>Settings
              </router-link>
            </li>
          </ul>
          <!-- End navigation menu -->
        </div>
        <!-- end #navigation -->
      </div>
      <!-- end container -->
    </div>
    <!-- end navbar-custom -->
  </header>
  <!-- End Navigation Bar-->
</template>

<script>
  /* global $:true */

  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      initNavbar() {
        $('.navbar-toggle').on('click', function () {
          $(this).toggleClass('open')
          $('#navigation').slideToggle(400)
        });

        $('.navigation-menu>li').slice(-2).addClass('last-elements')

        $('.navigation-menu li.has-submenu a[href="#"]').on('click', function (e) {
          if ($(window).width() < 992) {
            e.preventDefault();
            $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open')
          }
        })
      },
    },
    computed: {
      ...mapGetters({
        me: 'me',
        me_name: 'me_name',
        is_login: 'is_login',
      }),
    },
    mounted() {
      this.initNavbar()
    },
  }

</script>
