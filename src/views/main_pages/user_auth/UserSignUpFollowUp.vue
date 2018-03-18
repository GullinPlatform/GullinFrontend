<template>
  <div class="wrapper-page">
    <div class="page-title-box d-xl-none"></div>
    <div class="text-center">
      <div class="stepwizard">
        <div class="stepwizard-row">
          <div class="stepwizard-step">
            <button type="button" class="btn btn-circle"
                    :class="{'btn-secondary':level>1,'btn-primary':level===1}">1
            </button>
          </div>
          <div class="stepwizard-step">
            <button type="button" class="btn btn-circle"
                    :class="{'btn-default':level<2, 'btn-secondary':level>2, 'btn-primary':level===2}">2
            </button>
          </div>
          <div class="stepwizard-step">
            <button type="button" class="btn btn-default btn-circle"
                    :class="{'btn-default':level<3, 'btn-secondary':level>3, 'btn-primary':level===3}">3
            </button>
          </div>
        </div>
      </div>
      <p class="logo-lg">
        <span v-if="level===1">Verify Your Email</span>
        <span v-else-if="level===2">Add Your Phone</span>
        <span v-else-if="level===3">Generate Your Wallet</span>
      </p>
    </div>
    <div class="card-box" v-if="level===1">
      <div class="text-center mt-4">
        <div class="alert alert-success">
          Please verify your email using the <b>verification code</b> we sent to your email ({{me.user.email}}).
        </div>
        <div class="form-group m-b-5">
          <div class="input-group">
            <input class="form-control" placeholder="Enter Code" required="" v-model="email_code" @keyup.enter="confirmEmail()">
            <span class="input-group-btn">
              <button type="submit" class="btn btn-email btn-primary" @click="confirmEmail()">Verify</button>
            </span>
          </div>
        </div>
        <span class="text-muted"> Didn't receive code? Send Again.</span>
        <br>
        <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
      </div>
    </div>
    <div class="card-box" v-else-if="level===2">
      <div v-if="!phone_code_sent">
        <div class="input-group">
          <button class="input-group-addon dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{phone_country_code}}</button>
          <div class="dropdown-menu" style="z-index:10000;">
            <button class="dropdown-item" type="button" @click="phone_country_code='+93'; phone_country='Afghanistan'">Afghanistan +93</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+355'; phone_country='Albania'">Albania +355</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+213'; phone_country='Algeria'">Algeria +213</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-684'; phone_country='American Samoa'">American Samoa +1-684</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+376'; phone_country='Andorra'">Andorra +376</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+244'; phone_country='Angola'">Angola +244</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-264'; phone_country='Anguilla'">Anguilla +1-264</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+672'; phone_country='Antarctica'">Antarctica +672</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-268'; phone_country='Antigua & Barbuda'">Antigua & Barbuda +1-268</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+54'; phone_country='Argentina'">Argentina +54</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+374'; phone_country='Armenia'">Armenia +374</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+297'; phone_country='Aruba'">Aruba +297</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+61'; phone_country='Australia'">Australia +61</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+43'; phone_country='Austria'">Austria +43</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+994'; phone_country='Azerbaijan'">Azerbaijan +994</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-242'; phone_country='Bahamas'">Bahamas +1-242</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+973'; phone_country='Bahrain'">Bahrain +973</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+880'; phone_country='Bangladesh'">Bangladesh +880</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-246'; phone_country='Barbados'">Barbados +1-246</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+375'; phone_country='Belarus'">Belarus +375</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+32'; phone_country='Belgium'">Belgium +32</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+501'; phone_country='Belize'">Belize +501</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+229'; phone_country='Benin'">Benin +229</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-441'; phone_country='Bermuda'">Bermuda +1-441</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+975'; phone_country='Bhutan'">Bhutan +975</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+591'; phone_country='Bolivia'">Bolivia +591</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+387'; phone_country='Bosnia'">Bosnia +387</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+267'; phone_country='Botswana'">Botswana +267</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+47'; phone_country='Bouvet Island'">Bouvet Island +47</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+55'; phone_country='Brazil'">Brazil +55</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+246'; phone_country='British Indian Ocean Territory'">British Indian Ocean Territory +246</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-284'; phone_country='British Virgin Islands'">British Virgin Islands +1-284</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+673'; phone_country='Brunei'">Brunei +673</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+359'; phone_country='Bulgaria'">Bulgaria +359</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+226'; phone_country='Burkina Faso'">Burkina Faso +226</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+257'; phone_country='Burundi'">Burundi +257</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+855'; phone_country='Cambodia'">Cambodia +855</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+237'; phone_country='Cameroon'">Cameroon +237</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Canada'">Canada +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+238'; phone_country='Cape Verde'">Cape Verde +238</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+599'; phone_country='Caribbean Netherlands'">Caribbean Netherlands +599</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-345'; phone_country='Cayman Islands'">Cayman Islands +1-345</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+236'; phone_country='Central African Republic'">Central African Republic +236</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+235'; phone_country='Chad'">Chad +235</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+56'; phone_country='Chile'">Chile +56</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+86'; phone_country='China'">China +86</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+61'; phone_country='Christmas Island'">Christmas Island +61</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+61'; phone_country='Cocos (Keeling) Islands'">Cocos (Keeling) Islands +61</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+57'; phone_country='Colombia'">Colombia +57</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+269'; phone_country='Comoros'">Comoros +269</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+242'; phone_country='Congo - Brazzaville'">Congo - Brazzaville +242</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+243'; phone_country='Congo - Kinshasa'">Congo - Kinshasa +243</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+682'; phone_country='Cook Islands'">Cook Islands +682</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+506'; phone_country='Costa Rica'">Costa Rica +506</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+385'; phone_country='Croatia'">Croatia +385</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+53'; phone_country='Cuba'">Cuba +53</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+599'; phone_country='Curaçao'">Curaçao +599</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+357'; phone_country='Cyprus'">Cyprus +357</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+420'; phone_country='Czechia'">Czechia +420</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+225'; phone_country='Côte d’Ivoire'">Côte d’Ivoire +225</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+45'; phone_country='Denmark'">Denmark +45</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+253'; phone_country='Djibouti'">Djibouti +253</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-767'; phone_country='Dominica'">Dominica +1-767</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Dominican Republic'">Dominican Republic +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+593'; phone_country='Ecuador'">Ecuador +593</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+20'; phone_country='Egypt'">Egypt +20</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+503'; phone_country='El Salvador'">El Salvador +503</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+240'; phone_country='Equatorial Guinea'">Equatorial Guinea +240</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+291'; phone_country='Eritrea'">Eritrea +291</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+372'; phone_country='Estonia'">Estonia +372</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+251'; phone_country='Ethiopia'">Ethiopia +251</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+500'; phone_country='Falkland Islands'">Falkland Islands +500</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+298'; phone_country='Faroe Islands'">Faroe Islands +298</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+679'; phone_country='Fiji'">Fiji +679</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+358'; phone_country='Finland'">Finland +358</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+33'; phone_country='France'">France +33</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+594'; phone_country='French Guiana'">French Guiana +594</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+689'; phone_country='French Polynesia'">French Polynesia +689</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+262'; phone_country='French Southern Territories'">French Southern Territories +262</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+241'; phone_country='Gabon'">Gabon +241</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+220'; phone_country='Gambia'">Gambia +220</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+995'; phone_country='Georgia'">Georgia +995</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+49'; phone_country='Germany'">Germany +49</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+233'; phone_country='Ghana'">Ghana +233</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+350'; phone_country='Gibraltar'">Gibraltar +350</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+30'; phone_country='Greece'">Greece +30</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+299'; phone_country='Greenland'">Greenland +299</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-473'; phone_country='Grenada'">Grenada +1-473</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+590'; phone_country='Guadeloupe'">Guadeloupe +590</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-671'; phone_country='Guam'">Guam +1-671</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+502'; phone_country='Guatemala'">Guatemala +502</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+44'; phone_country='Guernsey'">Guernsey +44</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+224'; phone_country='Guinea'">Guinea +224</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+245'; phone_country='Guinea-Bissau'">Guinea-Bissau +245</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+592'; phone_country='Guyana'">Guyana +592</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+509'; phone_country='Haiti'">Haiti +509</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+672'; phone_country='Heard & McDonald Islands'">Heard & McDonald Islands +672</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+504'; phone_country='Honduras'">Honduras +504</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+852'; phone_country='Hong Kong'">Hong Kong +852</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+36'; phone_country='Hungary'">Hungary +36</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+354'; phone_country='Iceland'">Iceland +354</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+91'; phone_country='India'">India +91</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+62'; phone_country='Indonesia'">Indonesia +62</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+98'; phone_country='Iran'">Iran +98</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+964'; phone_country='Iraq'">Iraq +964</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+353'; phone_country='Ireland'">Ireland +353</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+44'; phone_country='Isle of Man'">Isle of Man +44</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+972'; phone_country='Israel'">Israel +972</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+39'; phone_country='Italy'">Italy +39</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-876'; phone_country='Jamaica'">Jamaica +1-876</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+81'; phone_country='Japan'">Japan +81</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+44'; phone_country='Jersey'">Jersey +44</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+962'; phone_country='Jordan'">Jordan +962</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+7'; phone_country='Kazakhstan'">Kazakhstan +7</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+254'; phone_country='Kenya'">Kenya +254</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+686'; phone_country='Kiribati'">Kiribati +686</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+965'; phone_country='Kuwait'">Kuwait +965</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+996'; phone_country='Kyrgyzstan'">Kyrgyzstan +996</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+856'; phone_country='Laos'">Laos +856</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+371'; phone_country='Latvia'">Latvia +371</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+961'; phone_country='Lebanon'">Lebanon +961</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+266'; phone_country='Lesotho'">Lesotho +266</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+231'; phone_country='Liberia'">Liberia +231</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+218'; phone_country='Libya'">Libya +218</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+423'; phone_country='Liechtenstein'">Liechtenstein +423</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+370'; phone_country='Lithuania'">Lithuania +370</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+352'; phone_country='Luxembourg'">Luxembourg +352</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+853'; phone_country='Macau'">Macau +853</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+389'; phone_country='Macedonia'">Macedonia +389</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+261'; phone_country='Madagascar'">Madagascar +261</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+265'; phone_country='Malawi'">Malawi +265</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+60'; phone_country='Malaysia'">Malaysia +60</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+960'; phone_country='Maldives'">Maldives +960</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+223'; phone_country='Mali'">Mali +223</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+356'; phone_country='Malta'">Malta +356</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+692'; phone_country='Marshall Islands'">Marshall Islands +692</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+596'; phone_country='Martinique'">Martinique +596</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+222'; phone_country='Mauritania'">Mauritania +222</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+230'; phone_country='Mauritius'">Mauritius +230</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+262'; phone_country='Mayotte'">Mayotte +262</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+52'; phone_country='Mexico'">Mexico +52</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+691'; phone_country='Micronesia'">Micronesia +691</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+373'; phone_country='Moldova'">Moldova +373</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+377'; phone_country='Monaco'">Monaco +377</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+976'; phone_country='Mongolia'">Mongolia +976</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+382'; phone_country='Montenegro'">Montenegro +382</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-664'; phone_country='Montserrat'">Montserrat +1-664</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+212'; phone_country='Morocco'">Morocco +212</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+258'; phone_country='Mozambique'">Mozambique +258</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+95'; phone_country='Myanmar'">Myanmar +95</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+264'; phone_country='Namibia'">Namibia +264</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+674'; phone_country='Nauru'">Nauru +674</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+977'; phone_country='Nepal'">Nepal +977</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+31'; phone_country='Netherlands'">Netherlands +31</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+687'; phone_country='New Caledonia'">New Caledonia +687</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+64'; phone_country='New Zealand'">New Zealand +64</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+505'; phone_country='Nicaragua'">Nicaragua +505</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+227'; phone_country='Niger'">Niger +227</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+234'; phone_country='Nigeria'">Nigeria +234</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+683'; phone_country='Niue'">Niue +683</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+672'; phone_country='Norfolk Island'">Norfolk Island +672</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+850'; phone_country='North Korea'">North Korea +850</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-670'; phone_country='Northern Mariana Islands'">Northern Mariana Islands +1-670</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+47'; phone_country='Norway'">Norway +47</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+968'; phone_country='Oman'">Oman +968</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+92'; phone_country='Pakistan'">Pakistan +92</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+680'; phone_country='Palau'">Palau +680</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+970'; phone_country='Palestine'">Palestine +970</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+507'; phone_country='Panama'">Panama +507</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+675'; phone_country='Papua New Guinea'">Papua New Guinea +675</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+595'; phone_country='Paraguay'">Paraguay +595</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+51'; phone_country='Peru'">Peru +51</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+63'; phone_country='Philippines'">Philippines +63</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+870'; phone_country='Pitcairn Islands'">Pitcairn Islands +870</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+48'; phone_country='Poland'">Poland +48</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+351'; phone_country='Portugal'">Portugal +351</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Puerto Rico'">Puerto Rico +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+974'; phone_country='Qatar'">Qatar +974</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+40'; phone_country='Romania'">Romania +40</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+7'; phone_country='Russia'">Russia +7</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+250'; phone_country='Rwanda'">Rwanda +250</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+262'; phone_country='Réunion'">Réunion +262</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+685'; phone_country='Samoa'">Samoa +685</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+378'; phone_country='San Marino'">San Marino +378</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+966'; phone_country='Saudi Arabia'">Saudi Arabia +966</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+221'; phone_country='Senegal'">Senegal +221</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+381'; phone_country='Serbia'">Serbia +381</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+248'; phone_country='Seychelles'">Seychelles +248</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+232'; phone_country='Sierra Leone'">Sierra Leone +232</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+65'; phone_country='Singapore'">Singapore +65</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-721'; phone_country='Sint Maarten'">Sint Maarten +1-721</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+421'; phone_country='Slovakia'">Slovakia +421</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+386'; phone_country='Slovenia'">Slovenia +386</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+677'; phone_country='Solomon Islands'">Solomon Islands +677</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+252'; phone_country='Somalia'">Somalia +252</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+27'; phone_country='South Africa'">South Africa +27</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+500'; phone_country='South Georgia & South Sandwich Islands'">South Georgia & South Sandwich Islands +500</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+82'; phone_country='South Korea'">South Korea +82</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+211'; phone_country='South Sudan'">South Sudan +211</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+34'; phone_country='Spain'">Spain +34</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+94'; phone_country='Sri Lanka'">Sri Lanka +94</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+590'; phone_country='St. Barthélemy'">St. Barthélemy +590</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+290'; phone_country='St. Helena'">St. Helena +290</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-869'; phone_country='St. Kitts & Nevis'">St. Kitts & Nevis +1-869</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-758'; phone_country='St. Lucia'">St. Lucia +1-758</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+590'; phone_country='St. Martin'">St. Martin +590</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+508'; phone_country='St. Pierre & Miquelon'">St. Pierre & Miquelon +508</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-784'; phone_country='St. Vincent & Grenadines'">St. Vincent & Grenadines +1-784</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+249'; phone_country='Sudan'">Sudan +249</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+597'; phone_country='Suriname'">Suriname +597</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+47'; phone_country='Svalbard & Jan Mayen'">Svalbard & Jan Mayen +47</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+268'; phone_country='Swaziland'">Swaziland +268</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+46'; phone_country='Sweden'">Sweden +46</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+41'; phone_country='Switzerland'">Switzerland +41</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+963'; phone_country='Syria'">Syria +963</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+239'; phone_country='São Tomé & Príncipe'">São Tomé & Príncipe +239</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+886'; phone_country='Taiwan'">Taiwan +886</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+992'; phone_country='Tajikistan'">Tajikistan +992</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+255'; phone_country='Tanzania'">Tanzania +255</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+66'; phone_country='Thailand'">Thailand +66</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+670'; phone_country='Timor-Leste'">Timor-Leste +670</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+228'; phone_country='Togo'">Togo +228</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+690'; phone_country='Tokelau'">Tokelau +690</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+676'; phone_country='Tonga'">Tonga +676</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-868'; phone_country='Trinidad & Tobago'">Trinidad & Tobago +1-868</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+216'; phone_country='Tunisia'">Tunisia +216</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+90'; phone_country='Turkey'">Turkey +90</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+993'; phone_country='Turkmenistan'">Turkmenistan +993</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-649'; phone_country='Turks & Caicos Islands'">Turks & Caicos Islands +1-649</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+688'; phone_country='Tuvalu'">Tuvalu +688</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1-340'; phone_country='U.S. Virgin Islands'">U.S. Virgin Islands +1-340</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+44'; phone_country='United Kingdom'">United Kingdom +44</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='United States'">United States +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+256'; phone_country='Uganda'">Uganda +256</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+380'; phone_country='Ukraine'">Ukraine +380</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+971'; phone_country='United Arab Emirates'">United Arab Emirates +971</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+598'; phone_country='Uruguay'">Uruguay +598</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+998'; phone_country='Uzbekistan'">Uzbekistan +998</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+678'; phone_country='Vanuatu'">Vanuatu +678</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+39-06'; phone_country='Vatican City'">Vatican City +39-06</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+58'; phone_country='Venezuela'">Venezuela +58</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+84'; phone_country='Vietnam'">Vietnam +84</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+681'; phone_country='Wallis & Futuna'">Wallis & Futuna +681</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+212'; phone_country='Western Sahara'">Western Sahara +212</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+967'; phone_country='Yemen'">Yemen +967</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+260'; phone_country='Zambia'">Zambia +260</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+263'; phone_country='Zimbabwe'">Zimbabwe +263</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+358'; phone_country='Åland Islands'">Åland Islands +358</button>
          </div>
          <input type="text" class="form-control" placeholder="Phone Number" v-model="phone_number" @keyup.enter="sendPhoneCode()">
        </div>
        <div class="form-group text-center mt-4">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom w-md" @click="sendPhoneCode()">
              Send Code
            </button>
          </div>
          <a target="_blank" href="https://gullin.zendesk.com/hc/en-us/articles/360001369174-Why-do-we-need-your-phone-number-">
            <span class="text-muted"> Why we need your phone?</span>
          </a>
          <br>
          <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
        </div>
      </div>
      <div v-else>
        <div>
          <div class="text-center alert alert-success">
            Please verify your phone using the <b>verification code</b> we sent to your phone number ({{phone_country_code+phone_number}})..
          </div>
          <div class="form-group m-b-0">
            <div class="input-group">
              <input class="form-control" placeholder="Enter Code" v-model="phone_code">
              <span class="input-group-btn">
              <button type="submit" class="btn btn-email btn-primary" @click="confirmPhone()">Verify</button>
            </span>
            </div>
            <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
          </div>
        </div>
        <div class="form-group text-center mt-4">
          <div class="col-xs-6">
            <button class="btn btn-primary" @click="phone_code_sent = false">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-box" v-else-if="level===3">
      <div class="alert alert-danger">
        Notice: This is the <b>ONLY</b> time you can see your private key. Please save it to your local device safely.
      </div>
      <div class="form-group text-center mt-4" v-if="!wallet_generated">
        <div class="col-xs-12">
          <button class="btn btn-primary" @click="generateWallet()">Generate Wallet</button>
        </div>
        <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
      </div>
      <div class="modal-body" v-else>
        <h3>Your Wallet Info</h3>
        <br>
        <h4>Address</h4>
        <p style="word-break:break-all;">{{new_wallet_address}}</p>
        <h4>Private Key</h4>
        <p style="word-break:break-all;">{{new_wallet_private_key}}</p>
        <hr>
        <div class="form-group text-center mt-4">
          <div class="col-xs-12" v-if="!pdf_saved">
            <button class="btn btn-primary" @click="saveKeyAsPDF()">Save as PDF</button>
          </div>
          <div class="col-xs-12" v-else>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#confirm_modal">Continue</button>
          </div>
        </div>
      </div>
    </div>
    <div style="display: none">
      <qrcode :value="new_wallet_address" :options="{ size: 150 }" id="qr_public"/>
      <qrcode :value="new_wallet_private_key" :options="{ size: 150 }" id="qr_private"/>
    </div>

    <!--begin::Modal-->
    <div id="confirm_modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
      <div class="modal-dialog h-100 d-flex flex-column justify-content-center my-0">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="col-12 modal-title text-center">Attention!</h4>
          </div>
          <div class="modal-body">
            <h4>
              Please confirm that you saved your private key safely on your local device.</h4>
            <h4>
              We don't store your private key on our server, which means your wallet is 100% owned by you.</h4>
            <h4>
              <b> But it also means you have <span class="text-danger">absolutely no other way to retrieve your private key</span> if you lost it!</b>
            </h4>
          </div>
          <div class="modal-footer">
            <div class="col-6 text-center">
              <button class="btn btn-primary" data-dismiss="modal">Let me double check</button>
            </div>
            <div class="col-6 text-center">
              <router-link target="_blank" :to="{name:'dashboard'}" class="btn btn-danger">I confirm that I saved it safely</router-link>
            </div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
    <!--end::Modal-->
  </div>
</template>

<script>
  import jsPDF from 'jspdf'
  import { mapGetters } from 'vuex'
  import { web3 } from '../../../utils'
  import qrcode from '@xkeshi/vue-qrcode'

  export default {
    name: 'SignUpFollowUp',
    components: {
      qrcode,
    },
    data() {
      return {
        email_code: '',
        phone_code: '',

        phone_number: '',
        phone_country_code: '+1',
        phone_country: 'United States',

        wallet_generated: false,
        wallet_saved: false,

        pdf_saved: false,
        new_wallet_address: '',
        new_wallet_private_key: '',

        phone_code_sent: false,
        error_message: '',
      }
    },
    computed: {
      ...mapGetters({
        me: 'me',
        me_wallet: 'me_wallet',
        is_login: 'is_login',
        verification_level: 'verification_level',
      }),
      level() {
        return this.verification_level + 2
      },
    },
    methods: {
      confirmEmail() {
        const form_data = {
          verification_code: this.email_code,
        }
        this.$store.dispatch('confirmEmail', form_data)
          .then(() => {
            this.error_message = ''
          })
          .catch((error) => {
            this.error_message = error.data.error
          })
      },
      sendPhoneCode() {
        if (!this.phone_number) {
          this.error_message = 'Phone number cannot be empty.'
          return
        }

        const form_data = {
          phone: this.phone_number,
          country_name: this.phone_country,
        }
        this.$store.dispatch('addPhone', form_data)
          .then(() => {
            this.phone_code_sent = true
            this.error_message = ''
          })
          .catch((error) => {
            this.error_message = error.data.error
          })
      },
      confirmPhone() {
        const form_data = {
          verification_code: this.phone_code,
        }
        this.$store.dispatch('confirmPhone', form_data)
          .then(() => {
            this.error_message = ''
          })
          .catch((error) => {
            this.error_message = error.data.error
          })
      },
      generateWallet() {
        if (this.new_wallet_address === '' && this.new_wallet_private_key === '') {
          const new_wallet = web3.eth.accounts.create()
          this.new_wallet_address = new_wallet.address
          this.new_wallet_private_key = new_wallet.privateKey
        }
        this.wallet_generated = true
      },
      saveKeyAsPDF() {

        const doc = new jsPDF({
          unit: 'pt',
          format: 'letter', // [612,   792]
        })
        const date = new Date()
        const centeredText = (text, y) => {
          const textWidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) / doc.internal.scaleFactor
          const textOffset = (doc.internal.pageSize.width - textWidth) / 2
          doc.text(textOffset, y, text)
        }
        // Backgrounds
        let imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAC7CAYAAACTr2yHAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAO7FJREFUeAHtXQeYFFXWveScc85DjhKMiBhRDIiu66qrsKiYNuiquK6/ObC6rru6ZhHDGkExi4CIIkiQnHPOOQ1B4L/njdVTXV3VXd3TM9Ndfe73zXR3hRfOC+eF++4tclxFKESACBABIkAEiEBaI1A0rVPPxBMBIkAEiAARIAIGARI6KwIRIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEgobMOEAEiQASIABEIAAIk9AAUIrNABIgAESACRICEzjpABIgAESACRCAACJDQA1CIzAIRIAJEgAgQARI66wARIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEgobMOEAEiQASIABEIAAIk9AAUIrNABIgAESACRICEzjpABIgAESACRCAACJDQA1CIzAIRIAJEgAgQARI66wARIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEgobMOEAEiQASIABEIAAIk9AAUIrNABIgAESACRICEzjpABIgAESACRCAACJDQA1CIzAIRIAJEgAgQARI66wARIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEgobMOEAEiQASIABEIAAIk9AAUIrNABIgAESACRICEzjpABIgAESACRCAACJDQA1CIzAIRIAJEgAgQARI66wARIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEgobMOEAEiQASIABEIAAIk9AAUIrNABIgAESACRICEzjpABIgAESACRCAACJDQA1CIzAIRIAJEgAgQARI66wARIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEgobMOEAEiQASIABEIAAIk9AAUIrNABIgAESACRICEzjpABIgAESACRCAACJDQA1CIzAIRIAJEgAgQARI66wARIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEgobMOEAEiQASIABEIAAIk9AAUIrNABIgAESACRICEzjpABIgAESACRCAACJDQA1CIzAIRIAJEgAgQARI66wARIAJEgAgQgQAgQEIPQCEyC0SACBABIkAESOisA0SACBABIkAEAoAACT0AhcgsEAEiQASIABEonq4Q7NmzX44dPy4VK5STokWLpGs2fKXbyqszl8f17YoVymr+M3dc9sJLI2TDhm1SrFgkBr/8clQu63+mdOqYFRPngwcPy7/+/Y5kHzwkRYuEIw2ccW3AdRdJwwa1Yoa1cdN22b8/OyIcvIg6W6lSOalRvUrMcPgAESACRCAeBNKK0Lds3SlffvmjjP12qmzbtsvks3z5MtK9Wzu57NLe0rRpvXjynnLPHjt2XFasWCcLF62SxUtXy7Jl62TL1h2SnX1IlAdc5LiUKV1KSpUqKdWrV5Zq1SpJvbo1pG6dGlKrZlWpXKWCEkdlqVy5gsu7wbj0hdaHefOXS4kSkVX50OEj0qVLK1+EfuTIL/LByHGyZ/e+iAEisC9WrJj0veA0X4T+1NNvy/c/zJBSJUtEgIw09e/XW4bcdW3EPV4gAkSACOQFgcheMC+h5eO747+bLkOfetOQHGak1qz8uPa2M2cvkY9HjZebbuwvV191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dcZnisnBM0AFs29znE0rNUgUhFoQghk23EyuVte2u/fsMwZAYOULqw4YUMDULTxnYYBBIQKZjgBWU2DEZvXqDWrAZoP5DqXTmrXgDrqqmkatKjX0L2fgHVuXB/0B9t5hs2Ltuk1m8A8yu+D8U9MOajAQlM1+nrnQ4LJbj+tiArdf+z8MWLHtB/0m67Oc2uNA31LzV9xweihZAkdA8+Yvk9lqywNOdtDPIR1ly5bSQWU5nThVkLr1ahplyXr6CZO+bgP3ZKUn3nBI6PEixueJABEgAkSACKQgAgUznUvBjDNJRIAIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChAAJPUilybwQASJABIhAxiJAQs/YomfGiQARIAJEIEgIkNCDVJrMCxEgAkSACGQsAiT0jC16ZpwIEAEiQASChMD/A9qcl7Sh8BiRAAAAAElFTkSuQmCC'
        doc.addImage(imgData, 'PNG', 106, 5, 400, 144)
        imgData = 'data:image/png;base64,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'
        doc.addImage(imgData, 'PNG', 32, 145, 550, 39)
        imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAh0AAAEQCAMAAAAjyDaWAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTO/v7+7u7vf399TU1AAAAP///+Dg4MvLy56enu3t7fDw8PHx8fb29vPz88nJyezs7PX19fr6+lxel7cAAAAKdFJOUwD////bN//1mlaBxvEUAAADjElEQVR42u3d0W6bMBiAURfTQAJ2sN//YUeaRNta0tF1nbT5nMteok/GVbD/EF4cx/4MV/34HL47DsNTLjFBirFMy9Af73GMQz3UlOFFifWQhvEex6WNGW5yXvu45nFc4yjzPMHdnMuax+Xl0qc1jvUvT3C15jGXWocQnodDzLM2eNVHuiwe41LFwZs85ly7MfRdzF4rbCweuQ/nVCwdbC0e5RzOdh1s1xHXOpI62KwjqQN1oA7UgTpQB+pAHagDdaAOdaAO1IE6UAfqQB2oA3WgDlAH6kAdqAN1oA7UgTpQB+oAdaAO1IE6UAfq4N+to6MtH6ijO9GYN308qqPrTl1OkXak/KaPh3Us9UBr4rKrju4UPasG1VO3qw5Pqknd6dd1dKfsQTUp/7R4PKojeVBNSrvqsO1odF+qDtTBp/+nfVDHog51qAN1oA7UgTpQB+pAHagDdahDHepAHagDdaAO1IE6UAfq4L+vw1fHqIMvq8NZuDbtOwvnHG2b9pyjfTp1HlSTdt7Q4HIX24537v6xL21PXbq994ad3BvW2L1h3d57w6590Nilg+4r5Q/cVwrqQB2oA3WgDtSBOlAH6kAdoA7UgTr4m3X4Sdsv+CaOYuIoJo7yqU/STRzlnY/STRzlMRNH+dxJSaesW2XiKHuPSqoDdfA7/9O6Nwx1oA7UgTpQB+pAHagDdahDHepAHagDdaAO1IE6UAfqQB3qaLYOXx2jDr6sDmfh2mTiKI+ZOMpjJo6yc9th4ig/MHEUE0cxcRQTR3ETNupAHagDdaAOdaAO1IE6UAfqQB2oA3WgDtShDtSBOlAH6kAdqAN1oA7UgTrUgTpQB+pAHagDdaAO1IE6UIc6UAfqQB2oA3WgDtSBOlAHqAN1oA7UgTpQB+pAHagDdYA6UAfqQB2oA3WgDtSBOlAHqAN1oA7UgTpQB+pAHagDdYA6UAfqQB2oA3WgDtSBOlAHqAN1oA7UgTpQB+pAHagDdYA6UAfqQB2oA3WgDtSBOlAHqAN1oA7UgTpQB+pAHagDdYA6+GAdUR1s1hHXOoo62KqjlHPoc5onefAqjinHqQ/jVC0ebLxY6jKG43CweLCx6zgMzyEMtZZZH/z4WpnmUksfwmXxqJedKdzNaxyH4RhCCOOaR8x5hpuc1jjGEK55lLWPkuHF2ka9xxHCsR+WqcQEKcWSu+H6Wrl5HvszXPXjrY1vPMfKttJYXgcAAAAASUVORK5CYII='
        doc.addImage(imgData, 'PNG', 44, 210, 526, 272)

        // Subtitle & wallet info & footer
        doc.setTextColor(43, 46, 88)
        doc.setFontSize(12)
        doc.setFontType('normal')
        centeredText('Generated for ' + this.me.user.email + ' on ' + date.toLocaleDateString(), 120)
        centeredText('2018 © Gullin LLC', 760)

        doc.text(68, 255, 'Public Address')
        doc.text(70, 282, this.new_wallet_address)
        doc.text(68, 312, 'Private Key')
        doc.text(70, 339, this.new_wallet_private_key)
        doc.text(68, 367, 'Public Address in QR Code')
        doc.text(325, 367, 'Private Key in QR Code')

        // Wallet title and notice title
        doc.setFontSize(16)
        doc.setFontType('bold')
        centeredText('MY WALLET DETAIL', 235)
        centeredText('IMPORTANT NOTICE', 530)

        // Wallet QR code
        doc.addImage($('#qr_public')[0].toDataURL(), 'PNG', 70, 375, 100, 100)
        doc.addImage($('#qr_private')[0].toDataURL(), 'PNG', 327, 375, 100, 100)

        // Notice
        doc.setFontSize(13)
        doc.text(46, 560, 'Anyone has this file will have FULL access to your wallet, so please make sure:')
        doc.text(46, 590, '1. Never give your private key to anyone.')
        doc.text(46, 620, '2. Only give out your public address for transactions.')
        doc.text(46, 650, '3. Print out this file (highly recommended) or store this document in a safe \n\n    external drive (less recommended).')

        doc.save('My_Gullin_Wallet.' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '.pdf');

        const form_data = {
          eth_address: this.new_wallet_address,
        }
        this.$store.dispatch('addWalletAddress', form_data)
          .then(() => {
            this.wallet_saved = true
          })
          .catch(() => {
            this.error_message = 'Error generating wallet, please try again.'
          })

        this.pdf_saved = true
      },
    },
  }

</script>
<style scoped>

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
