<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="1"
        :options="options"
        @grid:row-click="rowClicked"
      />
      <div class="mrB30" />
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comp_label">
              {{ frame0.module }}
            </div>
            <div class="comp_label" />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_REF_TRM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comp_label">
              {{ frame0.sourceTermName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_NAME')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <div class="comp_label">
              {{ frame0.codeId }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_DSCR')"
              :required="false"
              :vertical="false"
              :disabled="true"
            />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">
              {{ frame0.termDesc }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_EN_DSCR')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">
              {{ frame0.termsEnglishName }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onCancel"
      >
        {{ $t('MSG_BTN_CLOSE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_DST_00004_P02',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    parentPageId: String,
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      frame0: {
        termName: '',
        termPhyName: '',
        termDesc: '',
        domainName: '',
        rangeDate: { start: '', end: '' },
        sourceTermName: '',
        domainDataTypeCode: '',
        firstRegisterUserId: '',
        module: '',
        codeId: '',
        applicantID: '',
        termsApplicationContent: '',
        termsEnglishName: '',
      },
      localdata0: [],
      // eslint-disable-next-line new-cap
      dataset0: new urDataSet(),
      options: {
        noInfo: true,
        rowHeight: 32,
      },
      gridColumns0: [{
        text: this.$t('MSG_TXT_WRD_NM'),
        value: 'termsName',
      }, {
        text: this.$t('MSG_TXT_TRM_PHSC_NM'),
        value: 'termsId',
      }, {
        text: this.$t('MSG_TXT_DOMAIN_NAME'),
        value: 'domainName',
      }, {
        text: this.$t('MSG_TXT_DOM_PHSC_NM'),
        value: 'domainPhysicalName',
      }, {
        text: this.$t('MSG_TXT_DT_TYP'),
        value: 'domainDataTypeName',
      }, {
        text: this.$t('MSG_TXT_LEN'),
        value: 'domainLength',
      }, {
        text: this.$t('MSG_TXT_DECM_LGHT'),
        value: 'domainDataDecimalLength',
      }, {
        text: this.$t('MSG_BTN_DPCT_CHK'),
        value: 'duplicationCheck',
      }],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.frame0.sourceTermName = this.biddingInformationParam.sourceTerm;
    this.frame0.domainDataTypeCode = this.biddingInformationParam.domainDataTypeCode;
    this.frame0.domainName = this.biddingInformationParam.domainName;
    this.frame0.firstRegisterUserId = this.biddingInformationParam.firstRegistrationUserId;

    if (this.biddingInformationParam.moduleName) {
      this.frame0.module = `${this.biddingInformationParam.moduleName}  ${this.biddingInformationParam.subModuleName}`;
    }
    this.frame0.termDesc = this.biddingInformationParam.termsContent;
    this.frame0.codeSturctureTypeCode = this.biddingInformationParam.codeValidValue;
    if (this.biddingInformationParam.codeId) {
      this.frame0.codeId = `${this.biddingInformationParam.codeId}  ${this.biddingInformationParam.codeValidValue}`;
    }
    this.frame0.applicantID = this.biddingInformationParam.applicantID;
    this.frame0.termsApplicationContent = this.biddingInformationParam.termsApplicationContent;
    this.frame0.termsEnglishName = this.biddingInformationParam.termsEnglishName;

    const {
      termsName, termsId, domainName, domainPhysicalName, domainDataTypeName,
      domainLength, domainDataDecimalLength, duplicationCheck,
    } = this.biddingInformationParam;

    const data = [{
      termsName,
      termsId,
      domainName,
      domainPhysicalName,
      domainDataTypeName,
      domainLength,
      domainDataDecimalLength,
      duplicationCheck,
    }];

    this.dataset0.setData(data);
  },
  methods: {
    onCancel() {
      this.$emit('exit', true);
    },
    rowClicked(data) {
      if (this.dataset0.getSelected().length === 0) {
        this.dataset0.setSelect(data, false);
      }
    },
  },
};
</script>
<style scoped>
</style>
