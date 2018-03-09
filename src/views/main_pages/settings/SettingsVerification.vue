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
        <div class="tab-content px-3" v-if="verification_level<3">
          <div class="row justify-content-md-center">
            <div class="col-md-6">
              <div class="text-center">
                <div class="stepwizard">
                  <div class="stepwizard-row">
                    <div class="stepwizard-step">
                      <button type="button" class="btn btn-circle"
                              :class="{'btn-secondary':step>1,'btn-primary':step===1}">1
                      </button>
                    </div>
                    <div class="stepwizard-step">
                      <button type="button" class="btn btn-circle"
                              :class="{'btn-default':step<2, 'btn-secondary':step>2, 'btn-primary':step===2}">2
                      </button>
                    </div>
                    <div class="stepwizard-step">
                      <button type="button" class="btn btn-default btn-circle"
                              :class="{'btn-default':step<3, 'btn-secondary':step>3, 'btn-primary':step===3}">3
                      </button>
                    </div>
                  </div>

                </div>
                <p class="logo-lg m-0">
                  <span v-if="step===1">Complete Personal Info</span>
                  <span v-else-if="step===2">Upload ID</span>
                  <span v-else-if="step===3">Finish</span>
                </p>
              </div>
            </div>
          </div>
          <div v-show="step===1">
            <div class="text-center">
              <h4 class="text-dark header-title mb-3 mt-4"><b>Personal Details</b></h4>
            </div>
            <div class="form-horizontal ">
              <div class="form-group row justify-content-md-center">
                <div class="col-xl-3 col-md-4">
                  <label class="col-form-label">First Name</label>
                  <input type="text" class="form-control" placeholder="First Name" v-model="first_name" :disabled="verification_level>2">
                </div>
                <div class="m-1 d-md-none"></div>
                <div class="col-xl-3 col-md-5">
                  <label class="col-form-label">Last Name</label>
                  <input type="text" class="form-control" placeholder="Last Name" v-model="last_name" :disabled="verification_level>2">
                </div>
              </div>
              <div class="form-group row justify-content-md-center">
                <div class="col-xl-3 col-md-4">
                  <label class="col-form-label">Birthday</label>
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
                  <label class="col-form-label">&nbsp;</label>

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
                  <label class="col-form-label">&nbsp;</label>

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
            </div>
            <div class="form-group row justify-content-md-center mt-4">
              <div class="col-xl-4 col-lg-6">
                <button class="btn btn-primary btn-block" @click="update_name_birthday()">Next Step</button>
                <p class="text-danger">{{error_message}}</p>

              </div>
            </div>
          </div>
          <div v-show="step===2">
            <div class="form-group row justify-content-md-center">
              <div class="col-md-4">
                <label class="col-form-label">ID Type</label>
                <select class="form-control" v-model="id_type">
                  <option value="">ID Type</option>
                  <option value="ID">Photo ID</option>
                  <option value="PP">Passport</option>
                  <option value="DL">Driver License</option>
                </select>
              </div>
              <div class="m-1 d-md-none"></div>
            </div>
            <div v-if="id_type">
              <div class="form-group row justify-content-md-center">
                <div class="col-md-4">
                  <label class="col-form-label">Front of your ID</label>
                  <div class="dropzone-area" v-if="!id_front">
                    <div class="dropzone-text ">
                      <i class="fa fa-cloud-upload"> </i>
                      <span>Drop file here or click to select</span>
                    </div>
                    <input type="file" accept="image/*" @change="onFileChange(type='id_front', $event)">
                  </div>
                  <div v-else>
                    <button type="button" class="mb-1 btn btn-outline-secondary">{{id_front_file_name}}</button>
                    <button type="button" class="mb-1 btn btn-outline-secondary" @click="removeFile(type='id_front')"><span><i class="fa fa-times"></i></span></button>
                  </div>
                  <img id="id_front" :src="id_front" class="canvas">
                </div>
              </div>
              <div class="form-group row justify-content-md-center" v-if="id_type!=='PP'">
                <div class="col-md-4">
                  <label class="col-form-label">Back of your ID</label>
                  <div class="dropzone-area" v-if="!id_back">
                    <div class="dropzone-text ">
                      <i class="fa fa-cloud-upload"> </i>
                      <span>Drop file here or click to select</span>
                    </div>
                    <input type="file" accept="image/*" @change="onFileChange(type='id_back', $event)">
                  </div>
                  <div v-else>
                    <button type="button" class="mb-1 btn btn-outline-secondary">{{id_back_file_name}}</button>
                    <button type="button" class="mb-1 btn btn-outline-secondary" @click="removeFile(type='id_back')"><span><i class="fa fa-times"></i></span></button>
                  </div>
                  <img id="id_back" :src="id_back" class="canvas">
                </div>
              </div>
              <div class="form-group row justify-content-md-center">
                <div class="col-md-4">
                  <label class="col-form-label">You holding your ID</label>
                  <div class="dropzone-area" v-if="!id_holding">
                    <div class="dropzone-text ">
                      <i class="fa fa-cloud-upload"> </i>
                      <span>Drop file here or click to select</span>
                    </div>
                    <input type="file" accept="image/*" @change="onFileChange(type='id_holding', $event)">
                  </div>
                  <div v-else>
                    <button type="button" class="mb-1 btn btn-outline-secondary">{{id_holding_file_name}}</button>
                    <button type="button" class="mb-1 btn btn-outline-secondary" @click="removeFile(type='id_holding')"><span><i class="fa fa-times"></i></span></button>
                  </div>
                  <img id="id_holding" :src="id_holding" class="canvas">
                </div>
              </div>
            </div>
            <div class="form-group row justify-content-md-center mt-4">
              <div class="col-xl-4 col-lg-6">
                <button class="btn btn-primary btn-block" :disabled="!id_type&&!id_holding" @click="upload_id()">Next Step</button>
                <p class="text-danger">{{error_message}}</p>
              </div>
            </div>
          </div>
          <div v-show="step===3">
            <div class="form-group row justify-content-md-center mt-4">
              <div class=" col-lg-6">
                <div class="alert alert-success">
                  You have successfully submitted your identity verification application, please wait us up to 24 hours to process it.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content px-3 text-center" v-if="verification_level===3">
          <div class="form-group row justify-content-md-center mt-4">
            <div class=" col-lg-6">
              <div class="alert alert-success">
                You have successfully submitted your identity verification application, please wait us up to 24 hours to process it.
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content px-3" v-if="verification_level===4">
          <div class="form-group row justify-content-md-center mt-4">
            <div class="col-xl-4 col-lg-6">
              <div class="alert alert-success text-center">
                Your identity has been verified.
              </div>
              <div class="text-center">
                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#aiv_modal" v-if="me.verification_level===4&&me.nationality==='United States'">Apply for Accredited Investor</a>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content px-3" v-if="verification_level===5">
          <div class="form-group row justify-content-md-center mt-4">
            <div class="col-xl-4 col-lg-6">
              <div class="alert alert-success text-center">
                We have received your Accredited Investor verification request, you will shortly receive an email about how to proceed.
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content px-3" v-if="verification_level===6">
          <div class="form-group row justify-content-md-center mt-4">
            <div class="col-xl-4 col-lg-6">
              <div class="alert alert-success text-center">
                Your identity has been verified.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <p>That’s very helpful. It’ll help you understand our workflow. Unfortunately, because of the new laws applicable to fundraising, your status as an accredited investor must now be verified
              for certain types of securities offerings.</p>
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

        id_type: '',
        id_front: '',
        id_front_file_name: '',
        id_back: '',
        id_back_file_name: '',
        id_holding: '',
        id_holding_file_name: '',

        step: 1,

        error_message: '',
        success_message: '',
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
      update_name_birthday() {
        const form_data = {
          update: 'name_birthday',
          birthday: this.birthday_year + '-' + this.birthday_month + '-' + this.birthday_day,
          first_name: this.first_name,
          last_name: this.last_name,
        }
        this.$store.dispatch('updateMe', form_data)
          .then(() => {
            this.step += 1
            this.error_message = ''
          })
          .catch((error) => {
            this.error_message = error.data.error
          })
      },
      upload_id() {
        if (!this.id_type && !this.id_holding) return
        this.error_message = ''

        const form_data = new FormData()
        form_data.append('official_id_type', this.id_type)
        form_data.append('official_id_front', this.id_front)
        form_data.append('official_id_back', this.id_back)
        form_data.append('user_holding_official_id', this.id_holding)
        form_data.append('investor_user', this.me.id)

        this.$store.dispatch('uploadID', form_data)
          .then(() => {
            this.step += 1
          })
          .catch((error) => {
            this.error_message = error.data
          })
      },

      onFileChange(type, e) {
        // get file list by event listener
        let files = e.target.files || e.dataTransfer.files
        // if no files then return
        if (!e.target.files && !e.dataTransfer.files) return
        // else file is the first element in file list
        const file = files[0]

        // if file size is larger than 4mb, return and show error message
        if (file.size >= 4000000) {
          this.error_message = 'The image size is larger than the 4MB.'
          return
        } else if (file.size <= 400000) {
          this.error_message = 'The image size is smaller than the 400KB.'
          return
        }
        // init file reader for convert base64 data
        const reader = new FileReader()
        if (type === 'id_front') {
          // convert image to base64 and save to id_front field
          const self = this
          reader.addEventListener('load', function () {
            self.id_front = reader.result
          }, false)
          reader.readAsDataURL(file)
          // file name
          this.id_front_file_name = file.name
        }
        else if (type === 'id_back') {
          // convert image to base64 and save to id_back field
          const self = this
          reader.addEventListener('load', function () {
            self.id_back = reader.result
          }, false)
          reader.readAsDataURL(file)
          // file name
          this.id_back_file_name = file.name
        }
        else if (type === 'id_holding') {
          // convert image to base64 and save to id_holding field
          const self = this
          reader.addEventListener('load', function () {
            self.id_holding = reader.result
          }, false)
          reader.readAsDataURL(file)
          // file name
          this.id_holding_file_name = file.name
        }
      },
      removeFile(type) {
        if (type === 'id_front') this.id_front = null
        else if (type === 'id_back') this.id_back = null
        else if (type === 'id_holding') this.id_holding = null
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
      if (this.me.address) {
        this.address1 = this.me.address.address1
        this.address2 = this.me.address.address2
        this.city = this.me.address.city
        this.state = this.me.address.state
        this.zipcode = this.me.address.zipcode
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

  .dropzone-area {
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    height: 100px;
    border: 1px dashed #464a4c;
    border-radius: 5px;
  }

  .dropzone-area input {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .dropzone-text {
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    width: 100%;
  }

  .dropzone-text span {
    display: block;
    line-height: 1.9;
  }

  .canvas {
    width: 100%;
  }
</style>
