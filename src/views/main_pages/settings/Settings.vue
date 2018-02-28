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
          <h4 class="text-dark header-title my-3"><b>My Account</b></h4>
          <div class="form-horizontal">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Email</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" disabled :value="me.user.email">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Phone</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" disabled :value="me_phone">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Password</label>
              <div class="col-xl-6 col-lg-8">
                <button class="btn btn-outline-secondary">Change</button>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">ETH Address</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" disabled :value="me_wallet.eth_address">
                <a :href="'https://etherscan.io/address/' + me_wallet.eth_address" target="_blank"> <i class="fa fa-external-link"></i> View on EtherScan</a>
              </div>
            </div>
          </div>
          <hr class="my-4">
          <h4 class="text-dark header-title mb-3 mt-4"><b>Personal Details</b></h4>
          <div class="form-horizontal">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Verification Status</label>
              <div class="col-sm-6">
                <p class="m-0 col-form-label"
                   :class="{'text-danger':me.verification_level===2,
                            'text-warning':me.verification_level===3,
                            'text-success':me.verification_level>=4}">
                  <b v-if="me.verification_level===2">Not Verified</b>
                  <b v-else-if="me.verification_level===3">Verifying</b>
                  <span v-else-if="me.verification_level===4"><b>ID Verified</b>
                    <a href="#" data-toggle="modal" data-target="#aiv_modal" v-if="me.nationality==='United States'"><br>Apply for Accredited Investor</a>
                  </span>
                  <b v-else-if="me.verification_level===5">Accredited Investor Processing</b>
                  <b v-else-if="me.verification_level===6">Accredited Investor Verified</b>
                </p>
                <!--begin::Modal-->
                <div id="aiv_modal" v-if="is_login" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">Accredited Investor Verification</h4>
                      </div>
                      <div class="modal-body">
                        <h4>What is Accredited Investor?</h4>
                        <p>An “accredited investor” is a type of investor. Generally, sales of securities must be registered with the SEC unless an exemption is found. Some of the exemptions require
                          sales to be made to accredited investors. Our application lists out the various categories of accredited investor. The Securities and Exchange Commission also has a helpful
                          page on accredited investors here:
                          <a target="_blank" href="https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-accredited-investors">https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-accredited-investors</a>
                        </p>
                        <h4>How do I know I qualify?</h4>
                        <p>You may qualify you have a income of $200K ($300K with spouse) in each of the last 2 years or have a net worth over $1M</p>
                        <h4>What if am already verified?</h4>
                        <p>That’s very helpful. It’ll help you understand our workflow. Unfortunately, because of the new laws applicable to fundraising, your status as an accredited investor must now
                          be verified for certain types of securities offerings.</p>
                        <hr>
                        <div class="text-center">
                          <button type="button" class="btn btn-primary mr-3" @click="accreditedInvestorVerification()">Apply</button>
                          <button type="button" data-trigal class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal-dialog -->
                </div>
                <!--end::Modal-->
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Legal Name</label>
              <div class="col-xl-3 col-md-4">
                <input type="text" class="form-control" placeholder="First Name" v-model="first_name" :disabled="verification_level>2">
              </div>
              <div class="m-1 d-md-none"></div>
              <div class="col-xl-3 col-md-5">
                <input type="text" class="form-control" placeholder="Last Name" v-model="last_name" :disabled="verification_level>2">
              </div>
            </div>
            <div class="form-group row my-0">
              <label class="col-sm-3 col-xs-12 col-form-label">Birthday</label>
              <div class="col-xl-3 col-md-4">
                <select class="form-control" v-model="birthday_month" :disabled="verification_level>2">
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="m-1 d-md-none"></div>

              <div class="col-xl-1 col-md-2">
                <select class="form-control" v-model="birthday_day" :disabled="verification_level>2">
                  <option value="">Day</option>
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </div>
              <div class="m-1 d-md-none"></div>

              <div class="col-xl-2 col-md-3">
                <select class="form-control" v-model="birthday_year" :disabled="verification_level>2">
                  <option value="">Year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>
                  <option value="1949">1949</option>
                  <option value="1948">1948</option>
                  <option value="1947">1947</option>
                  <option value="1946">1946</option>
                  <option value="1945">1945</option>
                  <option value="1944">1944</option>
                  <option value="1943">1943</option>
                  <option value="1942">1942</option>
                  <option value="1941">1941</option>
                  <option value="1940">1940</option>
                  <option value="1939">1939</option>
                  <option value="1938">1938</option>
                  <option value="1937">1937</option>
                  <option value="1936">1936</option>
                  <option value="1935">1935</option>
                  <option value="1934">1934</option>
                  <option value="1933">1933</option>
                  <option value="1932">1932</option>
                  <option value="1931">1931</option>
                  <option value="1930">1930</option>
                </select>
              </div>
            </div>
            <div class="form-group row mt-2">
              <label class="col-sm-3"></label>
              <div class="col-xl-6 col-lg-8 ">
                <button class="btn btn-primary" @click="update_personal_detail()" :disabled="verification_level>=3">Save</button>
                <p class="text-success m-0">{{personal_detail_success_message}}</p>
                <p class="text-danger m-0">{{personal_detail_error_message}}</p>
                <p class="text-primary m-0" v-if="verification_level===3"><i class="fa fa-info-circle"></i> You cannot change your personal details because your identity is currently being verified.
                </p>
                <p class="text-primary m-0" v-else-if="verification_level>3"><i class="fa fa-info-circle"></i> You cannot change your personal details because your identity has been verified.
                </p>
              </div>
            </div>

          </div>
          <hr class="my-4">
          <h4 class="text-dark header-title mb-3 mt-4"><b>Address</b></h4>
          <div class="form-horizontal">
            <div class="form-group row" :class="{'has-danger': errors.has('address1')}">
              <label class="col-sm-3 col-xs-12 col-form-label">Street Address 1</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" name="address1" placeholder="Street Address 1" v-model="address1"
                       v-validate="'required'">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 col-sm-5 col-xs-12 col-form-label">Street Address 2 (Optional)</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" name="address2" placeholder="Street Address 2 (Optional)" v-model="address2">
              </div>
            </div>
            <div class="form-group row" :class="{'has-danger': errors.has('city')}">
              <label class="col-sm-3 col-xs-12 col-form-label">City</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" name="city" placeholder="City" v-model="city" v-validate="'required'">
              </div>
            </div>
            <div class="form-group row" :class="{'has-danger': errors.has('state')}">
              <label class="col-sm-3 col-xs-12 col-form-label">State / Province</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" name="state" placeholder="State / Province" v-model="state" v-validate="'required'">
              </div>
            </div>
            <div class="form-group row" :class="{'has-danger': errors.has('zipcode')}">
              <label class="col-sm-3 col-xs-12 col-form-label">Zip Code / Postcode</label>
              <div class="col-xl-6 col-lg-8">
                <input type="text" class="form-control" name="zipcode" placeholder="Zip Code / Postcode" v-model="zipcode" v-validate="'required|numeric'">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-xs-12 col-form-label">Country</label>
              <div class="col-xl-3 col-lg-6">
                <input type="text" class="form-control" disabled :value="me.nationality">
                <router-link :to="{name:'settings_verification'}"><i class="fa fa-external-link"></i> Change Country</router-link>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3"></label>
              <div class="col-xl-6 col-lg-8">
                <button class="btn btn-primary" @click="update_address()">Save</button>
                <p class="text-success m-0">{{address_success_message}}</p>
                <p class="text-danger m-0">{{address_error_message}}</p>
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
    name: 'Settings',
    data() {
      return {
        first_name: '',
        last_name: '',

        birthday_month: '',
        birthday_day: '',
        birthday_year: '',

        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',

        address_success_message: '',
        address_error_message: '',

        personal_detail_success_message: '',
        personal_detail_error_message: '',
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        verification_level: 'verification_level',
        me: 'me',
        me_wallet: 'me_wallet',
        me_phone: 'me_phone',
      }),
    },
    methods: {
      update_personal_detail() {
        if (this.verification_level >= 3) return
        const form_data = {
          update: 'name_birthday',
          birthday: this.birthday_year + '-' + this.birthday_month + '-' + this.birthday_day,
          first_name: this.first_name,
          last_name: this.last_name,
        }
        this.$store.dispatch('updateMe', form_data)
          .then(() => {
            this.personal_detail_success_message = "Updated"
          })
          .catch((error) => {
            this.personal_detail_error_message = error.data.error
          })
      },
      update_address() {
        this.$validator.validateAll().then((result) => {
          if (!result) return

          const form_data = {
            update: 'address',
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            state: this.state,
            zipcode: this.zipcode,
          }
          this.$store.dispatch('updateMe', form_data)
            .then(() => {
              this.address_success_message = "Updated"
            })
            .catch((error) => {
              this.address_error_message = error.data.error
            })
        })
      },
      accreditedInvestorVerification() {
        this.$store.dispatch('accreditedInvestorVerification')
          .then(() => {
            this.$store.dispatch('getMe')
            $('#aiv_modal').modal('hide')
          })
      }
    },
    created() {
      this.first_name = this.me.first_name
      this.last_name = this.me.last_name
      this.country = this.me.nationality

      if (this.me.birthday) {
        const b_array = this.me.birthday.split('-')
        this.birthday_year = b_array[0]
        this.birthday_month = b_array[1]
        this.birthday_day = b_array[2]
      }
      if (this.me.address[0]) {
        this.address1 = this.me.address[0].address1
        this.address2 = this.me.address[0].address2
        this.city = this.me.address[0].city
        this.state = this.me.address[0].state
        this.zipcode = this.me.address[0].zipcode
      }
    },
  }
</script>

<style scoped>
  .tabs-bordered li a.router-link-exact-active {
    border-bottom: 2px solid #2B2E58 !important;
  }

  .stepwizard-step p {
    margin-top: 10px;
  }

  .stepwizard-row {
    display: table-row;
  }

  .stepwizard {
    display: table;
    width: 100%;
    position: relative;
  }

  .stepwizard-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
  }

  .stepwizard-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;

  }

  .stepwizard-step {
    display: table-cell;
    text-align: center;
    position: relative;
  }

  .btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
  }
</style>
