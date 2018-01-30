<template>
  <!--begin::Modal-->
  <div id="deposit_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Deposit</h4>
        </div>
        <div class="modal-body text-center">
          <div class="alert alert-warning">
            You can send <b>ETH</b> and <b>ETH tokens</b> to this address, but DO NOT send other tokens (ex: Ethereum Classic (ETC), Bitcoin (BTC), Ripple (XRP))!
          </div>
          <hr>
          <h4>Your ETH Wallet Address</h4>
          <p>{{me_wallet.eth_address}}</p>
          <hr>
          <h4>Your ETH Wallet in QR Code</h4>
          <qrcode :value="me_wallet.eth_address" :options="{ size: 150 }"></qrcode>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
  <!--end::Modal-->
</template>

<script>
  import { mapGetters } from 'vuex'

  import qrcode from '@xkeshi/vue-qrcode'

  export default {
    name: 'DepositModal',
    components: {
      qrcode,
    },
    computed: {
      ...mapGetters({
        me_wallet: 'me_wallet',
      }),
    },
  }
</script>
