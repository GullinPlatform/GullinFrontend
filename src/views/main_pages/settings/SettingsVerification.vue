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
        <!--<div class="tab-content px-3" v-if="me_wallet.balances[0].balance<0.1">-->
        <!--<div class="form-group row justify-content-md-center mt-4">-->
        <!--<div class="col-xl-6 col-lg-6">-->
        <!--<div class="alert alert-warning text-center">-->
        <!--You must have at least 0.1 ETH in your wallet to perform the verification.<br>-->
        <!--<router-link :to="{name:'wallet'}"><b>Deposit Now</b></router-link>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
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
                  <span v-if="step===1">Complete Personal Details</span>
                  <span v-else-if="step===2">Update Address</span>
                  <span v-else-if="step===3">Upload ID</span>
                </p>
              </div>
            </div>
          </div>
          <div v-show="step===1">
            <div class="text-center">
              <h4 class="text-dark header-title mb-3 mt-4"><b>Personal Details</b></h4>
            </div>
            <div class="form-horizontal">
              <div class="form-group row justify-content-md-center">
                <div class="col-xl-3 col-md-5">
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
                <div class="col-xl-3 col-md-5">
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
              <div class="form-group row justify-content-md-center">
                <div class="col-xl-3 col-md-5">
                  <label class="col-form-label">Nationality</label>
                  <select class="form-control" v-model="nationality" :disabled="verification_level>2">
                    <option value="">Choose Nationality</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Caribbean Netherlands">Caribbean Netherlands</option>
                    <option value="Bosnia">Bosnia</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="British Virgin Islands">British Virgin Islands</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Macau">Macau</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo - Brazzaville">Congo - Brazzaville</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Curaçao">Curaçao</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czechia">Czechia</option>
                    <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                    <option value="North Korea">North Korea</option>
                    <option value="Congo - Kinshasa">Congo - Kinshasa</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard & McDonald Islands">Heard & McDonald Islands</option>
                    <option value="Vatican City">Vatican City</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn Islands">Pitcairn Islands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Réunion">Réunion</option>
                    <option value="St. Barthélemy">St. Barthélemy</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Kitts & Nevis">St. Kitts & Nevis</option>
                    <option value="St. Lucia">St. Lucia</option>
                    <option value="St. Martin">St. Martin</option>
                    <option value="St. Pierre & Miquelon">St. Pierre & Miquelon</option>
                    <option value="St. Vincent & Grenadines">St. Vincent & Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="São Tomé & Príncipe">São Tomé & Príncipe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Sint Maarten">Sint Maarten</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia & South Sandwich Islands">South Georgia & South Sandwich Islands</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard & Jan Mayen">Svalbard & Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Macedonia">Macedonia</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks & Caicos Islands">Turks & Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
                    <option value="United States">United States</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Wallis & Futuna">Wallis & Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                    <option value="Åland Islands">Åland Islands</option>
                  </select>
                </div>
                <div class="col-xl-3 col-md-5"></div>
              </div>
            </div>
            <div class="form-group row justify-content-md-center mt-4">
              <div class="col-xl-4 col-lg-6">
                <button class="btn btn-primary btn-block" @click="update_personal_detail()">Next Step</button>
                <p class="text-danger">{{error_message}}</p>
              </div>
            </div>
          </div>
          <div v-show="step===2">
            <div class="text-center">
              <h4 class="text-dark header-title mb-3 mt-4"><b>Address</b></h4>
            </div>
            <div class="form-horizontal">
              <div class="form-group row justify-content-md-center" :class="{'has-danger': errors.has('address1')}">
                <div class="col-xl-6 col-md-10">
                  <label class="col-form-label">Street Address 1</label>
                  <input type="text" class="form-control" name="address1" placeholder="Street Address 1" v-model="address1"
                         v-validate="'required'">
                </div>
              </div>
              <div class="form-group row justify-content-md-center">
                <div class="col-xl-6 col-md-10">
                  <label class="col-form-label">Street Address 2 (Optional)</label>
                  <input type="text" class="form-control" name="address2" placeholder="Street Address 2 (Optional)" v-model="address2">
                </div>
              </div>
              <div class="form-group row justify-content-md-center" :class="{'has-danger': errors.has('city')}">
                <div class="col-xl-6 col-md-10">
                  <label class="col-form-label">City</label>
                  <input type="text" class="form-control" name="city" placeholder="City" v-model="city" v-validate="'required'">
                </div>
              </div>
              <div class="form-group row justify-content-md-center" :class="{'has-danger': errors.has('state')}">
                <div class="col-xl-3 col-md-5">
                  <label class="col-form-label">State / Province</label>
                  <input type="text" class="form-control" name="state" placeholder="State / Province" v-model="state" v-validate="'required'">
                </div>
                <div class="col-xl-3 col-md-5">
                  <label class="col-form-label">Zip Code / Postcode</label>
                  <input type="text" class="form-control" name="zipcode" placeholder="Zip Code / Postcode" v-model="zipcode" v-validate="'required|numeric'">
                </div>
              </div>
              <div class="form-group row justify-content-md-center" :class="{'has-danger': errors.has('country')}">
                <div class="col-xl-3 col-md-5">
                  <label class="col-form-label">Country</label>
                  <select class="form-control" name="country" v-model="country" v-validate="'required'">
                    <option value="">Choose Country</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Caribbean Netherlands">Caribbean Netherlands</option>
                    <option value="Bosnia">Bosnia</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="British Virgin Islands">British Virgin Islands</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Macau">Macau</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo - Brazzaville">Congo - Brazzaville</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Curaçao">Curaçao</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czechia">Czechia</option>
                    <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                    <option value="North Korea">North Korea</option>
                    <option value="Congo - Kinshasa">Congo - Kinshasa</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard & McDonald Islands">Heard & McDonald Islands</option>
                    <option value="Vatican City">Vatican City</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn Islands">Pitcairn Islands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Réunion">Réunion</option>
                    <option value="St. Barthélemy">St. Barthélemy</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Kitts & Nevis">St. Kitts & Nevis</option>
                    <option value="St. Lucia">St. Lucia</option>
                    <option value="St. Martin">St. Martin</option>
                    <option value="St. Pierre & Miquelon">St. Pierre & Miquelon</option>
                    <option value="St. Vincent & Grenadines">St. Vincent & Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="São Tomé & Príncipe">São Tomé & Príncipe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Sint Maarten">Sint Maarten</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia & South Sandwich Islands">South Georgia & South Sandwich Islands</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard & Jan Mayen">Svalbard & Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Macedonia">Macedonia</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks & Caicos Islands">Turks & Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
                    <option value="United States">United States</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Wallis & Futuna">Wallis & Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                    <option value="Åland Islands">Åland Islands</option>
                  </select>
                </div>
                <div class="col-xl-3 col-md-5"></div>
              </div>
              <div class="form-group row justify-content-md-center mt-4">
                <div class="col-xl-2 col-lg-3">
                  <button class="btn btn-primary btn-block" @click="step-=1">Prev Step</button>
                </div>
                <div class="col-xl-2 col-lg-3">
                  <button class="btn btn-primary btn-block" @click="update_address()">Next Step</button>
                </div>
                <p class="text-danger">{{error_message}}</p>
              </div>
            </div>
          </div>
          <div v-show="step===3">
            <div class="row justify-content-md-center">
              <div class="alert alert-danger col-xl-5 col-md-9 text-center">The ID you upload must match the nationality you filled in step 1</div>
            </div>
            <div class="form-group row justify-content-md-center">
              <div class="col-xl-6 col-md-10">
                <label class="col-form-label">ID Type</label>
                <select class="form-control" v-model="id_type">
                  <option value="">-- Please Choose --</option>
                  <option value="ID">Photo ID</option>
                  <option value="PP">Passport</option>
                  <option value="DL">Driver License</option>
                </select>
              </div>
              <div class="m-1 d-md-none"></div>
            </div>
            <div v-if="id_type">
              <div class="form-group row justify-content-md-center">
                <div class="col-xl-6 col-md-10">
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
                <div class="col-xl-6 col-md-10">
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
                <div class="col-xl-6 col-md-10">
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
            <p class="text-center" v-show="uploading">
              <spinner></spinner>
            </p>
            <div class="text-center">
              <p class="text-danger my-0">{{error_message}}</p>
            </div>
            <div class="form-group row justify-content-md-center mt-4">
              <div class="col-xl-2 col-lg-3">
                <button class="btn btn-primary btn-block" @click="step-=1">Prev Step</button>
              </div>
              <div class="col-xl-2 col-lg-3">
                <button class="btn btn-primary btn-block" :disabled="!id_type||!id_holding||!id_front" @click="upload_id()">Upload<span v-show="uploading">ing</span></button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content px-3 text-center" v-else-if="verification_level===3 ||step===4">
          <div class="form-group row justify-content-md-center mt-4">
            <div class=" col-lg-6">
              <div class="alert alert-success">
                You have successfully submitted your identity verification application, please wait us up to 24 hours to process it.
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content px-3" v-else-if="verification_level===4">
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
        <div class="tab-content px-3" v-else-if="verification_level===5">
          <div class="form-group row justify-content-md-center mt-4">
            <div class="col-xl-4 col-lg-6">
              <div class="alert alert-success text-center">
                We have received your Accredited Investor verification request, you will shortly receive an email about how to proceed.
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content px-3" v-else-if="verification_level===6">
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
  import Spinner from '../../components/Spinner'

  export default {
    name: 'Settings',
    components: {
      Spinner
    },
    data() {
      return {
        first_name: '',
        last_name: '',

        birthday_month: '',
        birthday_day: '',
        birthday_year: '',

        nationality: '',

        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',

        id_type: '',
        id_front: '',
        id_front_file_name: '',
        id_back: '',
        id_back_file_name: '',
        id_holding: '',
        id_holding_file_name: '',

        step: 1,
        uploading: false,
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
      update_personal_detail() {
        if (!(this.birthday_year && this.birthday_month && this.birthday_day)) {
          this.error_message = 'Birthday is required'
          return
        }
        const form_data = {
          update: 'name_birthday',
          birthday: this.birthday_year + '-' + this.birthday_month + '-' + this.birthday_day,
          first_name: this.first_name,
          last_name: this.last_name,
          nationality: this.nationality,
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
            country: this.country,
          }
          this.$store.dispatch('updateMe', form_data)
            .then(() => {
              this.step += 1
              this.error_message = ''
            })
            .catch((error) => {
              this.error_message = error.data.error
            })
        })
      },
      upload_id() {
        if (!this.id_type || !this.id_holding || !this.id_front) {
          this.error_message = 'All fields are required'
          return
        }
        this.error_message = ''
        this.uploading = true
        const form_data = {
          'official_id_type': this.id_type,
          'official_id_front_base64': this.id_front,
          'official_id_back_base64': this.id_back,
          'user_holding_official_id_base64': this.id_holding,
          'investor_user': this.me.id
        }

        this.$store.dispatch('uploadID', form_data)
          .then(() => {
            this.step += 1
            this.error_message = ''
            this.uploading = false
            this.$store.dispatch('refresh')
          })
          .catch((error) => {
            this.error_message = error.data
            this.uploading = false
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
        } else if (file.size <= 100000) {
          this.error_message = 'The image size is smaller than the 100KB.'
          return
        } else {
          this.error_message = ''
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
      this.nationality = this.me.nationality


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
        this.country = this.me.address[0].country
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
