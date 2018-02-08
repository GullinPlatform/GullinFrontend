<template>
  <!--begin::Modal-->
  <div id="withdraw_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Withdraw</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="field-1" class="control-label">Amount</label>
                <input v-model="amount" type="text" class="form-control" id="field-1" placeholder="0.00">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="field-2" class="control-label">Unit</label>
                <select v-model="unit" class="form-control" id="field-2">
                  <option v-for="balance in balances">{{balance.token.token_code}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label class="control-label">Destination</label>
                <input v-model="to_address" type="text" class="form-control" placeholder="Destination">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label class="control-label">Your Wallet Address</label>
                <input type="text" class="form-control" :value="me_wallet.eth_address" disabled>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label class="control-label">Your Private Key</label>
                <input v-model="private_key" type="text" class="form-control" placeholder="Private Key">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary waves-effect" data-dismiss="modal">Withdraw</button>

        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
  <!--end::Modal-->
</template>

<script>
  import { mapGetters } from 'vuex'
  import { web3 } from '../../../utils'

  export default {
    name: 'WithdrawModal',
    data() {
      return {
        amount: '',
        unit: 'ETH',
        to_address: '',
        private_key: '',
        two_factor_code: '',
      }
    },
    computed: {
      ...mapGetters({
        me_wallet: 'me_wallet',
        balances: 'balances',
      }),
    },
    methods: {
      isAddress() {
        return web3.utils.isAddress(this.to_address)
      }
    }
  }
</script>
