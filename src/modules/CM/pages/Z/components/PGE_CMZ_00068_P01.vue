<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEND_TMPLT_ID')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ emailData.sendTemplateId }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="this.$t('MSG_TXT_EMAIL_TTL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ emailData.emailTitle }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="this.$t('MSG_TXT_SEND_STT_CD')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ emailData.emailSendStatusName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_DTM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ emailData.firstRegistrationDTM }}
            </div>
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4>{{ this.$t('MSG_TXT_EMAIL_RECP_USR_LIST') }}</h4>
      </div>
      <sui-s-grid
        :data-source="ds0"
        :headers="gridColumns0"
        :options="options"
        :showRowsPerPageControl="false"
      />
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        v-permission:read="pageId"
        type="button"
        class="comm_btn_border"
        @click="onCloseClick"
      >
        {{ $t('MSG_BTN_CLOSE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from "uidev-component/index.js";

export default {
  name: 'PGE_CMZ_00068_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    emailUid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      emailData: {},
      localdata0: [],
      ds0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  created() {
    this.dataList = [];
    this.gridColumns0 = [{
        text: this.$t('MSG_TXT_RECP_EMAIL'),
        value: 'receiptUserEmail',
      }, {
        text: this.$t('MSG_TXT_ORDER'),
        value: 'emailReceiptUserOrder',
      }, {
        text: this.$t('MSG_TXT_RECP_TYPE'),
        value: 'emailReceiptUserTypeName',
      }, {
        text: this.$t('MSG_TXT_RECP_STT'),
        value: 'emailReceiptStatusName',
      }];
  },
  computed: {},
  watch: {},
  mounted() {
    if (!utils.isEmpty(this.emailUid)) {
      this.emailDataLoad();
    }
  },

  methods: {
    emailDataLoad() {
      http.request(this.pageId, 'DTS_MLM_00017', {
        path: {
          'email-uid': this.emailUid,
        },
      }).then(res => {
        this.emailData = res.data[0];
        this.emailData.firstRegistrationDTM = utils.dateformatToClient(this.emailData.firstRegistrationDTM);
        this.ds0.setData(res.data[0].emailReceiptUsers);
      });
    },
    onCloseClick() {
      this.$emit('onDetailAndCancelClick');
    },
  },
};
</script>
<style scoped>
</style>
