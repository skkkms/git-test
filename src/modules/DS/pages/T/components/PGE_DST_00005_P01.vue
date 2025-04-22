<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_STD_TYP')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.biddingInformationParam.dataStandardDivisionCodeNm}}</div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_PRGS_STT')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.biddingInformationParam.approvalStatusCode}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APRV_CNTN')" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">{{this.biddingInformationParam.approvalOpinionContent}}</div>
          </div>
        </div>
      </div>
      <div class="mrB30"></div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.domainClassificationName}}</div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DT_TYP')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.biddingInformationParam.domainDataTypeCode}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LEN')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.domainDataLength}}</div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DECM_LGHT')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.domainDataDecimalLength}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOMAIN_NAME')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.domainName}}</div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.dataStandardId}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CNTN')" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">{{this.dataStandardContent}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APPL_CNTN')" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">{{this.applicationContent}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button type="button" class="comm_btn_border" @click="onPopupCancelClicked">{{$t('MSG_BTN_CLOSE')}}</sui-button>
    </div>
  </div>
</template>
<script>
 export default {
  name: 'PGE_DST_00005_P01',
  props: {
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // Codes
      approvalOpinionContent: '',
      dataStandardName: '',
      dataStandardId: '',
      dataStandardEnglishName: '',
      wordTypeDivisionCode: '',
      //domainClassificationName: '',
      firstRegisterUserId: '',
      domainName: '',
      dataStandardContent: '',
      applicationContent: '',
      dataStandardDivisionCode:'',
      approvalStatusCode:'',
      domainDataTypeCode:'',
      domainDataLength:'',
      domainDataDecimalLength:'',
      domainClassificationName:'',
      selectData: {
        COD_DATA_STD_DIV: { label: '', key: '' },
        COD_DATA_STD_APRV_PRGS_STT: { label: '', key: '' },
        COD_WRD_TYPE_DIV: { label: '', key: '' },
        COD_DOM_DATA_TYPE: { label: '', key: '' },
        COD_PAGE_UE: { label: '', key: '' }
      },

    };
  },

  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.selectData.COD_DATA_STD_DIV.key = this.biddingInformationParam.dataStandardDivisionCode;
    this.selectData.COD_DATA_STD_APRV_PRGS_STT.key = this.biddingInformationParam.approvalStatusCode;
    this.approvalOpinionContent = this.biddingInformationParam.approvalOpinionContent;
    this.dataStandardName = this.biddingInformationParam.dataStandardName;
    this.dataStandardId = this.biddingInformationParam.dataStandardId;
    this.domainDataLength= this.biddingInformationParam.domainDataLength;
    this.domainDataDecimalLength= this.biddingInformationParam.domainDataDecimalLength;
    this.domainClassificationName = this.biddingInformationParam.domainClassificationName;
    this.domainName = this.biddingInformationParam.domainName;
    this.dataStandardContent = this.biddingInformationParam.dataStandardContent;
    this.applicationContent = this.biddingInformationParam.applicationContent;
    this.selectData.COD_DOM_DATA_TYPE.key= this.biddingInformationParam.domainDataTypeCode;
  },

  methods: {
    onPopupCancelClicked() {
        this.$emit('exit', true);
    },
  },
};
</script>
