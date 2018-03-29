<template>
  <div class="wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">Settings</h4>
          </div>
        </div>
      </div>
      <div class="card-box">
        <ul class="nav nav-tabs tabs-bordered">
          <li class="nav-item">
            <router-link :to="{name: 'settings'}" class="nav-link">
              Profile
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'settings_verification'}" class="nav-link">
              Verification
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'settings_security'}" class="nav-link">
              Security
            </router-link>
          </li>
        </ul>
        <div class="tab-content px-3">
          <h4 class="text-dark header-title my-3"><b>Logs</b></h4>
          <table class="table" v-if="loaded" >
            <thead>
            <tr>
              <th>Time</th>
              <th>Action</th>
              <th>IP</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="log in logs">
              <td>{{log.datetime}}</td>
              <td>{{log.action}}</td>
              <td>{{log.ip}}</td>
            </tr>
            </tbody>
          </table>
          <div class="text-center" v-if="!logs.length">No Logs</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Settings',
    data() {
      return {
        loaded: false,
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        me: 'me',
        logs: 'logs',
      }),
    },
    methods: {
      loadLog() {
        this.$store.dispatch('getLog').then(() => {
          this.loaded = true
        })
      }
    },
    created() {
      this.loadLog()
    },
  }
</script>

<style scoped>
  .tabs-bordered li a.router-link-exact-active {
    border-bottom: 2px solid #2B2E58 !important;
  }

</style>
