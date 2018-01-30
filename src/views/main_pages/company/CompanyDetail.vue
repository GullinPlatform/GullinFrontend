<template>
  <div class="wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">Token Sale Detail</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="card-box widget-user">
            <div>
              <img :src="current_company.logo">
              <div class="wid-u-info">
                <h5 class="mt-0 m-b-5 font-16"> {{current_company.name}}</h5>
                <p class="text-muted m-b-5 font-13">{{current_company.short_description}}</p>
                <small><b> {{current_company.token_detail.end_datetime}}</b></small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="card-box">
            <ul class="nav nav-tabs tabs-bordered">
              <li class="nav-item">
                <a href="#home-b1" data-toggle="tab" aria-expanded="false" class="nav-link">
                  Description
                </a>
              </li>
              <li class="nav-item">
                <a href="#profile-b1" data-toggle="tab" aria-expanded="true" class="nav-link active">
                  Tokenomics
                </a>
              </li>
              <li class="nav-item">
                <a href="#messages-b1" data-toggle="tab" aria-expanded="false" class="nav-link">
                  Team
                </a>
              </li>
              <li class="nav-item">
                <a href="#settings-b1" data-toggle="tab" aria-expanded="false" class="nav-link">
                  Documents
                </a>
              </li>
              <li class="nav-item">
                <a href="#settings-b1" data-toggle="tab" aria-expanded="false" class="nav-link">
                  Updates
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade" id="home-b1">
                {{current_company}}
              </div>
              <div class="tab-pane fade show active" id="profile-b1">
                <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                  Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
              </div>
              <div class="tab-pane fade" id="messages-b1">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                  Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
              </div>
              <div class="tab-pane fade" id="settings-b1">
                <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                  Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'TokenSaleDetail',
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      getCompany(id) {
        this.loading = true
        this.$store.dispatch('getCompany', id)
          .then(() => {
            this.loading = false
          })
          .catch(() => {
            this.$router.push({ name: '404' })
          })
      },
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        current_company: 'current_company',
        me: 'me',
      }),
    },
    created() {
      if (this.$route.params.id) {
        this.getCompany(this.$route.params.id)
      }
    },
  }

</script>

<style scoped>
  .m-widget5 .m-widget5__item {
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
