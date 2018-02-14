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
      <div class="text-center m-t-20">
        <div class="alert alert-success">
          Please verify your email using the <b>verification code</b> we sent to your email.
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
            <button class="dropdown-item" type="button" @click="phone_country_code='+358'; phone_country='Aland Islands'">Aland Islands +358</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+355'; phone_country='Albania'">Albania +355</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+213'; phone_country='Algeria'">Algeria +213</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='American Samoa'">American Samoa +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+376'; phone_country='Andorra'">Andorra +376</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+244'; phone_country='Angola'">Angola +244</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Anguilla'">Anguilla +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Antigua and Barbuda'">Antigua and Barbuda +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+54'; phone_country='Argentina'">Argentina +54</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+374'; phone_country='Armenia'">Armenia +374</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+297'; phone_country='Aruba'">Aruba +297</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+61'; phone_country='Australia'">Australia +61</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+43'; phone_country='Austria'">Austria +43</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+994'; phone_country='Azerbaijan'">Azerbaijan +994</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Bahamas'">Bahamas +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+973'; phone_country='Bahrain'">Bahrain +973</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+880'; phone_country='Bangladesh'">Bangladesh +880</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Barbados'">Barbados +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+375'; phone_country='Belarus'">Belarus +375</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+32'; phone_country='Belgium'">Belgium +32</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+501'; phone_country='Belize'">Belize +501</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+229'; phone_country='Benin'">Benin +229</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Bermuda'">Bermuda +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+975'; phone_country='Bhutan'">Bhutan +975</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+591'; phone_country='Bolivia'">Bolivia +591</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+599'; phone_country='Bonaire, Saint Eustatius and Saba '">Bonaire, Saint Eustatius and Saba +599</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+387'; phone_country='Bosnia and Herzegovina'">Bosnia and Herzegovina +387</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+267'; phone_country='Botswana'">Botswana +267</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+55'; phone_country='Bouvet Island'">Bouvet Island +55</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+55'; phone_country='Brazil'">Brazil +55</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+246'; phone_country='British Indian Ocean Territory'">British Indian Ocean Territory +246</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='British Virgin Islands'">British Virgin Islands +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+673'; phone_country='Brunei'">Brunei +673</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+359'; phone_country='Bulgaria'">Bulgaria +359</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+226'; phone_country='Burkina Faso'">Burkina Faso +226</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+257'; phone_country='Burundi'">Burundi +257</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+855'; phone_country='Cambodia'">Cambodia +855</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+237'; phone_country='Cameroon'">Cameroon +237</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Canada'">Canada +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+238'; phone_country='Cape Verde'">Cape Verde +238</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Cayman Islands'">Cayman Islands +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+236'; phone_country='Central African Republic'">Central African Republic +236</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+235'; phone_country='Chad'">Chad +235</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+56'; phone_country='Chile'">Chile +56</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+86'; phone_country='China'">China +86</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+61'; phone_country='Christmas Island'">Christmas Island +61</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+61'; phone_country='Cocos Islands'">Cocos Islands +61</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+57'; phone_country='Colombia'">Colombia +57</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+269'; phone_country='Comoros'">Comoros +269</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+682'; phone_country='Cook Islands'">Cook Islands +682</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+506'; phone_country='Costa Rica'">Costa Rica +506</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+385'; phone_country='Croatia'">Croatia +385</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+53'; phone_country='Cuba'">Cuba +53</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+599'; phone_country='Curacao'">Curacao +599</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+357'; phone_country='Cyprus'">Cyprus +357</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+420'; phone_country='Czech Republic'">Czech Republic +420</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+243'; phone_country='Democratic Republic of the Congo'">Democratic Republic of the Congo +243</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+45'; phone_country='Denmark'">Denmark +45</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+253'; phone_country='Djibouti'">Djibouti +253</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Dominica'">Dominica +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Dominican Republic'">Dominican Republic +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+670'; phone_country='East Timor'">East Timor +670</button>
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
            <button class="dropdown-item" type="button" @click="phone_country_code='+241'; phone_country='Gabon'">Gabon +241</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+220'; phone_country='Gambia'">Gambia +220</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+995'; phone_country='Georgia'">Georgia +995</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+49'; phone_country='Germany'">Germany +49</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+233'; phone_country='Ghana'">Ghana +233</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+350'; phone_country='Gibraltar'">Gibraltar +350</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+30'; phone_country='Greece'">Greece +30</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+299'; phone_country='Greenland'">Greenland +299</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Grenada'">Grenada +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+590'; phone_country='Guadeloupe'">Guadeloupe +590</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Guam'">Guam +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+502'; phone_country='Guatemala'">Guatemala +502</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+44-'; phone_country='Guernsey'">Guernsey +44-</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+224'; phone_country='Guinea'">Guinea +224</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+245'; phone_country='Guinea-Bissau'">Guinea-Bissau +245</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+592'; phone_country='Guyana'">Guyana +592</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+509'; phone_country='Haiti'">Haiti +509</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+ '; phone_country='Heard Island and McDonald Islands'">Heard Island and McDonald Islands +</button>
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
            <button class="dropdown-item" type="button" @click="phone_country_code='+225'; phone_country='Ivory Coast'">Ivory Coast +225</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Jamaica'">Jamaica +1</button>
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
            <button class="dropdown-item" type="button" @click="phone_country_code='+853'; phone_country='Macao'">Macao +853</button>
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
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Montserrat'">Montserrat +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+212'; phone_country='Morocco'">Morocco +212</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+258'; phone_country='Mozambique'">Mozambique +258</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+95'; phone_country='Myanmar'">Myanmar +95</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+264 '; phone_country='Namibia'">Namibia +264</button>
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
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Northern Mariana Islands'">Northern Mariana Islands +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+47'; phone_country='Norway'">Norway +47</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+968'; phone_country='Oman'">Oman +968</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+92'; phone_country='Pakistan'">Pakistan +92</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+680'; phone_country='Palau'">Palau +680</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+970'; phone_country='Palestinian Territory'">Palestinian Territory +970</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+507'; phone_country='Panama'">Panama +507</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+675'; phone_country='Papua New Guinea'">Papua New Guinea +675</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+595'; phone_country='Paraguay'">Paraguay +595</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+51'; phone_country='Peru'">Peru +51</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+63'; phone_country='Philippines'">Philippines +63</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+870'; phone_country='Pitcairn'">Pitcairn +870</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+48'; phone_country='Poland'">Poland +48</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+351'; phone_country='Portugal'">Portugal +351</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+974'; phone_country='Qatar'">Qatar +974</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+242'; phone_country='Republic of the Congo'">Republic of the Congo +242</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+262'; phone_country='Reunion'">Reunion +262</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+40'; phone_country='Romania'">Romania +40</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+7'; phone_country='Russia'">Russia +7</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+250'; phone_country='Rwanda'">Rwanda +250</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+590'; phone_country='Saint Barthelemy'">Saint Barthelemy +590</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+290'; phone_country='Saint Helena'">Saint Helena +290</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Saint Kitts and Nevis'">Saint Kitts and Nevis +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Saint Lucia'">Saint Lucia +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+590'; phone_country='Saint Martin'">Saint Martin +590</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+508'; phone_country='Saint Pierre and Miquelon'">Saint Pierre and Miquelon +508</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Saint Vincent and the Grenadines'">Saint Vincent and the Grenadines +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+685'; phone_country='Samoa'">Samoa +685</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+378'; phone_country='San Marino'">San Marino +378</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+239'; phone_country='Sao Tome and Principe'">Sao Tome and Principe +239</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+966'; phone_country='Saudi Arabia'">Saudi Arabia +966</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+221'; phone_country='Senegal'">Senegal +221</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+381'; phone_country='Serbia'">Serbia +381</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+248'; phone_country='Seychelles'">Seychelles +248</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+232'; phone_country='Sierra Leone'">Sierra Leone +232</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+65'; phone_country='Singapore'">Singapore +65</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+599'; phone_country='Sint Maarten'">Sint Maarten +599</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+421'; phone_country='Slovakia'">Slovakia +421</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+386'; phone_country='Slovenia'">Slovenia +386</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+677'; phone_country='Solomon Islands'">Solomon Islands +677</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+252'; phone_country='Somalia'">Somalia +252</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+27'; phone_country='South Africa'">South Africa +27</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+82'; phone_country='South Korea'">South Korea +82</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+211'; phone_country='South Sudan'">South Sudan +211</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+34'; phone_country='Spain'">Spain +34</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+94'; phone_country='Sri Lanka'">Sri Lanka +94</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+249'; phone_country='Sudan'">Sudan +249</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+597'; phone_country='Suriname'">Suriname +597</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+47'; phone_country='Svalbard and Jan Mayen'">Svalbard and Jan Mayen +47</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+268'; phone_country='Swaziland'">Swaziland +268</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+46'; phone_country='Sweden'">Sweden +46</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+41'; phone_country='Switzerland'">Switzerland +41</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+963'; phone_country='Syria'">Syria +963</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+886'; phone_country='Taiwan'">Taiwan +886</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+992'; phone_country='Tajikistan'">Tajikistan +992</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+255'; phone_country='Tanzania'">Tanzania +255</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+66'; phone_country='Thailand'">Thailand +66</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+228'; phone_country='Togo'">Togo +228</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+690'; phone_country='Tokelau'">Tokelau +690</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+676'; phone_country='Tonga'">Tonga +676</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Trinidad and Tobago'">Trinidad and Tobago +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+216'; phone_country='Tunisia'">Tunisia +216</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+90'; phone_country='Turkey'">Turkey +90</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+993'; phone_country='Turkmenistan'">Turkmenistan +993</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='Turks and Caicos Islands'">Turks and Caicos Islands +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+688'; phone_country='Tuvalu'">Tuvalu +688</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+256'; phone_country='Uganda'">Uganda +256</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+380'; phone_country='Ukraine'">Ukraine +380</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+971'; phone_country='United Arab Emirates'">United Arab Emirates +971</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+44'; phone_country='United Kingdom'">United Kingdom +44</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='United States'">United States +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+1'; phone_country='United States Minor Outlying Islands'">United States Minor Outlying Islands +1</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+598'; phone_country='Uruguay'">Uruguay +598</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+998'; phone_country='Uzbekistan'">Uzbekistan +998</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+678'; phone_country='Vanuatu'">Vanuatu +678</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+379'; phone_country='Vatican'">Vatican +379</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+58'; phone_country='Venezuela'">Venezuela +58</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+84'; phone_country='Vietnam'">Vietnam +84</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+681'; phone_country='Wallis and Futuna'">Wallis and Futuna +681</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+212'; phone_country='Western Sahara'">Western Sahara +212</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+967'; phone_country='Yemen'">Yemen +967</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+260'; phone_country='Zambia'">Zambia +260</button>
            <button class="dropdown-item" type="button" @click="phone_country_code='+263'; phone_country='Zimbabwe'">Zimbabwe +263</button>
          </div>
          <input type="text" class="form-control" placeholder="Phone Number" v-model="phone_number" @keyup.enter="addPhone()">
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-custom w-md" @click="addPhone()">
              Send Code
            </button>
          </div>
          <span class="text-muted"> Why we need your phone?</span>
          <br>
          <span v-show="error_message" class="text-danger"><i class="fa fa-warning"></i> {{ error_message }}</span>
        </div>
      </div>
      <div v-if="phone_code_sent">
        <div class="text-center m-t-20">
          <div class="alert alert-success alert-dismissable">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            Please verify your phone using the <b>verification code</b> we sent to your phone number.
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
        <div class="form-group text-center m-t-20">
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
      <div class="form-group text-center m-t-20" v-if="!wallet_generated">
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
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12" v-if="!pdf_saved">
            <button class="btn btn-primary" @click="saveKeyAsPDF()">Save as PDF</button>
          </div>
          <div class="col-xs-12" v-else>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#confirm_modal">Continue</button>
          </div>
        </div>
      </div>
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

  export default {
    name: 'SignUpFollowUp',
    data() {
      return {
        email_code: '',
        phone_code: '',

        phone_number: '',
        phone_country_code: '+1',
        phone_country: 'United States',

        wallet_generated: false,
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
      addPhone() {
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
        const form_data = {
          eth_address: this.new_wallet_address,
        }
        this.$store.dispatch('addWalletAddress', form_data)
          .then(() => {
            this.wallet_generated = true
          })
          .catch(() => {
            this.error_message = 'Error generating wallet, please try again.'
          })
      },
      saveKeyAsPDF() {
        const doc = new jsPDF()

        const centeredText = (text, y) => {
          const textWidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
          const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
          doc.text(textOffset, y, text);
        }

        doc.setFontSize(22)
        doc.setFontType('bold');
        centeredText('My Gullin Wallet', 20)

        doc.setFontSize(16)
        doc.setFontType('normal')
        centeredText('Please Print Out', 30)

        doc.setFontSize(16)
        doc.setFontType('bold');
        centeredText('Email', 50)

        doc.setFontSize(12)
        doc.setFontType('normal')
        centeredText(this.me.user.email, 60)

        doc.setFontSize(16)
        doc.setFontType('bold');
        centeredText('Wallet Address', 80)

        doc.setFontSize(12)
        doc.setFontType('normal')
        centeredText(this.new_wallet_address, 90)

        doc.setFontSize(16)
        doc.setFontType('bold')
        centeredText('Private Key', 110)

        doc.setFontSize(12)
        doc.setFontType('normal')
        centeredText(this.new_wallet_private_key, 120)
        const date = new Date()
        doc.save('My_Gullin_Wallet.' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '.pdf');

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
