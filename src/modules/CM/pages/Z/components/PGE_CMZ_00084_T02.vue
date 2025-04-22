<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_NAT')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-code-select
            ref="codeSelectTenantNatCd"
            v-model="objTenantDetail.tenantNatCd"
            codeId="COD_NAT"
            :defaultOption="'select'"
          />
          <!-- :initialSelectedIndex="0" -->
        </div>

        <!-- 전화번호 -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_TEL')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldtTnantTel"
            v-model="objTenantDetail.tenantTel"
            maxlength="40"
            @input="onKeyUpInput"
          />
        </div>
      </div>
      <div class="row">
        <!-- 주소 -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_ADDR')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldTenantAddr"
            v-model="objTenantDetail.tenantAddr"
            maxlength="400"
          />
        </div>
        <!-- 대표자명 -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_RPRS_NAME')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldTenantRprsNm"
            v-model="objTenantDetail.tenantRprsNm"
            maxlength="200"
          />
        </div>
      </div>
      <div class="row">
        <!-- 시스템 관리자 -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_SYS_MNGR_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldTenantSysMngrVal"
            v-model="objTenantDetail.tenantSysMngrVal"
            maxlength="100"
          />
        </div>
        <!-- 이메일 -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_EMAIL')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldEmail"
            v-model="objTenantDetail.email"
            maxlength="100"
          />
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:create="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00084_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selectedGridRowData: {
      type: Object,
      required: false,
    },
    pageId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isNew: true,
      objTenantDetail: {
        tenantId: '',
        tenantNatCd: '',
        tenantTel: '',
        tenantAddr: '',
        tenantSysMngrVal: '',
        tenantRprsNm: '',
        email: '',
      },
      oldTelNumber: '',
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (selectObj.tenantId) {
        this.loadTenantDetail();
      } else {
        this.onClickNew();
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.selectedGridRowData) {
        this.loadTenantDetail();
      }
    });
  },

  methods: {
    loadTenantDetail() {
      if (this.selectedGridRowData) {
        const strTenantId = this.selectedGridRowData.tenantId;
        if (!utils.isEmpty(strTenantId)) {
          http.request(this.contextPageId, 'DTS_CMZ_00176', {
            path: {
              'tenant-id': strTenantId,
            },
          }).then(res => {
            if (utils.isEmpty(res.data.tenantId)) {
              this.objTenantDetail.tenantId = strTenantId;
              this.isNew = true;
              this.onClickNew();
            } else {
              this.objTenantDetail = res.data;
              this.oldTelNumber = this.objTenantDetail.tenantTel;
              this.isNew = false;
            }
          });
        }
      } else {
        this.onClickNew();
      }
    },
    onClickNew() {
      this.objTenantDetail.tenantNatCd = ' ';
      this.objTenantDetail.tenantTel = '';
      this.objTenantDetail.tenantAddr = '';
      this.objTenantDetail.tenantSysMngrVal = '';
      this.objTenantDetail.tenantRprsNm = '';
      this.objTenantDetail.email = '';
      this.isNew = true;
    },
    research() {
      this.onClickNew();
      this.$emit('research');
      this.$emit('clearGridSelection');
    },
    onClickSave() {
      if (!this.fnValidCheck()) return false;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMZ_00177' : 'DTS_CMZ_00178';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objTenantDetail,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
          this.isNew = true;
        });
      });
      return null;
    },

    /**
     * ID 입력 제한
     */
    onKeyUpInput(value) { // 숫자 입력제한
      const telNumber = value;
      if (utils.isNumDash(telNumber) || utils.isEmpty(telNumber)) {
        this.oldTelNumber = telNumber;
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_NUMBER'), null, () => {
          this.objTenantDetail.tenantTel = this.oldTelNumber;
          this.$refs.textFieldtTnantTel.setFocus();
        });
      }
    },

    /**
     * 입력 체크
     */
    fnValidCheck() {
    // eslint-disable-next-line no-unused-vars
      const strTenantNatCd = this.objTenantDetail.tenantNatCd;

      // console.log(utils.isEmpty(strTenantNatCd), utils.trim(strTenantNatCd));
      // Tenant
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      // 국가
      if (utils.isEmpty(strTenantNatCd) || !utils.trim(strTenantNatCd)) {
        utils.messageBox('warning', utils.strFormat(
          this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_NAT'),
        ), null, () => {
          // this.$refs.codeSelectTenantNatCd.setFocus();
          // this.$refs.codeSelectTenantNatCd
        });
        return false;
      }

      // 전화번호
      if (utils.isEmpty(this.objTenantDetail.tenantTel) || !utils.trim(this.objTenantDetail.tenantTel)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TEL')), null, () => {
          this.$refs.textFieldtTnantTel.setFocus();
        });
        return false;
      }

      // 주소
      if (utils.isEmpty(this.objTenantDetail.tenantAddr) || !utils.trim(this.objTenantDetail.tenantAddr)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ADDR')), null, () => {
          this.$refs.textFieldTenantAddr.setFocus();
        });
        return false;
      }
      // 시스템관리자
      if (utils.isEmpty(this.objTenantDetail.tenantSysMngrVal) || !utils.trim(this.objTenantDetail.tenantSysMngrVal)) {
        utils.messageBox('warning', utils.strFormat(
          this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SYS_MNGR_NM'),
        ), null, () => {
          this.$refs.textFieldTenantSysMngrVal.setFocus();
        });
        return false;
      }
      // 대표자
      if (utils.isEmpty(this.objTenantDetail.tenantRprsNm) || !utils.trim(this.objTenantDetail.tenantRprsNm)) {
        utils.messageBox('warning', utils.strFormat(
          this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_RPRS_NAME'),
        ), null, () => {
          this.$refs.textFieldTenantRprsNm.setFocus();
        });
        return false;
      }


      // 이메일
      if (!utils.isEmpty(this.objTenantDetail.email) && !utils.isEmailFormat(this.objTenantDetail.email)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_EMAIL')), null, () => {
          this.$refs.textFieldEmail.setFocus();
        });
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
</style>
