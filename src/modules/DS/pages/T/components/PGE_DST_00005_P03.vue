<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
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
      <sui-s-grid ref='grid1'
        :data-source="dsData"
        :headers="gridColumns0"
        :hideHeader="true"
        :options="options"
        :initialRowsPerPage=1.1
        :showDisplayCountControl="false"
        :showRowsPerPageControl="false"
        :pagesizeoptions="[1]"
        >
      </sui-s-grid>
      <div class="mrB30"></div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_REF_TRM')" :vertical="false" />
          </div>
          <div class="col-xs-3">
            <div class="comm_label">{{this.biddingInformationParam.referenceTermName}}</div>
          </div>
          <!-- <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_REF_TRM_YN')" :vertical="false" />
          </div>
          <div class="col-xs-3">
            <div class="comm_label">{{this.biddingInformationParam.referenceTermYn}}</div>
          </div> -->
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APPL_USR_ID')" :vertical="false" />
          </div>
          <div class="col-xs-7">
            <cmp-user-name-link
              :pageId="this.$options.name"
              :displayType="'1'"
              :displayLanguageId="displayLanguageId"
              :knoxId="knoxId"
              :loginId="loginId"
              :userName="userName"
              :userGlobalName="userGlobalName"
              :departmentName="departmentName"
              :departmentEnglishName="departmentEnglishName"
              :type="'link'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MDLE')" :vertical="false" />
          </div>
          <div class="col-xs-3">
            <div class="comm_label">{{this.moduleCode}}</div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_CODE_NAME')" :vertical="false" />
          </div>
          <div class="col-xs-7">
            <div class="comm_label">{{this.termCode}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TRM_DSCR')" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">{{this.dataStandardContent}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TRM_EN_DSCR')" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">{{this.dataStandardEnglishName}}</div>
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
import { urDataSet } from 'uidev-component/index.js';
 export default {
    name: 'PGE_DST_00005_P03',
    props: {
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
      approvalOpinionContent: '',
      referenceTermId: '',
      moduleCode: '',
      firstRegisterUserId: '',
      dataStandardContent: '',
      termCode: '',
      dataStandardEnglishName: '',
      applicationContent: '',
      displayLanguageId: '',
      knoxId: '',
      loginId: '',
      userName: '',
      userGlobalName: '',
      departmentName: '',
      departmentEnglishName: '',
      referenceCheckbox: false,
      applicationUserId: this.$store.getters.userInfo.knoxId,
      selectData: {
        COD_DATA_STD_DIV: { label: '', key: '' },
        COD_DATA_STD_APRV_PRGS_STT: { label: '', key: '' },
      },
      localdata: [],
      dsData: new urDataSet(),
      options: {
        msgTotal: false,
        multiselect: false,
      },
      gridColumns0: [{
        text: this.$t('MSG_TXT_TRM_NM'),
        value: 'dataStandardName',
      }, {
        text: this.$t('MSG_TXT_TRM_PHSC_NM'),
        value: 'dataStandardId',
      }, {
        text: this.$t('MSG_TXT_DOMAIN_NAME'),
        value: 'domainName',
      }, {
        text: this.$t('MSG_TXT_DOM_PHSC_NM'),
        value: 'domainId',
      }, {
        text: this.$t('MSG_TXT_DT_TYP'),
        value: 'domainDataTypeCode',
      }, {
        text: this.$t('MSG_TXT_LEN'),
        value: 'domainDataLength',
      }, {
        text: this.$t('MSG_TXT_DECM_LGHT'),
        value: 'domainDataDecimalLength',
      }],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    console.log(this.biddingInformationParam);
    this.selectData.COD_DATA_STD_DIV.key = this.biddingInformationParam.dataStandardDivisionCode;
    this.selectData.COD_DATA_STD_APRV_PRGS_STT.key = this.biddingInformationParam.approvalStatusCode;
    this.approvalOpinionContent = this.biddingInformationParam.approvalOpinionContent;
    this.referenceTermId = this.biddingInformationParam.referenceTermId;
    this.referenceTermYn = this.biddingInformationParam.referenceTermYn;
    if (this.referenceTermYn === 'Y') {
      this.referenceCheckbox = true;
    }
    this.moduleCode = this.biddingInformationParam.moduleCode + '  ' + this.biddingInformationParam.subModuleCode;

    if (this.biddingInformationParam.termCode === '' || this.biddingInformationParam.termCode === null) {
      this.termCode = '';
    } else {
      this.termCode = this.biddingInformationParam.termCode + '  ' + this.biddingInformationParam.termCodeName;
    }
    //sub --- ?> this.moduleCode = this.biddingInformationParam.moduleCode;
    this.firstRegisterUserId = this.biddingInformationParam.firstRegisterUserId;
    this.dataStandardContent = this.biddingInformationParam.dataStandardContent;
    this.dataStandardEnglishName = this.biddingInformationParam.dataStandardEnglishName;
    this.applicationContent = this.biddingInformationParam.applicationContent;
    this.displayLanguageId = this.biddingInformationParam.displayLanguageId;
    this.knoxId = this.biddingInformationParam.knoxId;
    this.loginId = this.biddingInformationParam.loginId;
    this.userName = this.biddingInformationParam.userName;
    this.userGlobalName = this.biddingInformationParam.userGlobalName;
    this.departmentName = this.biddingInformationParam.departmentName;
    this.departmentEnglishName = this.biddingInformationParam.departmentEnglishName;
    const data = [{
      'dataStandardName': this.biddingInformationParam.dataStandardName,
      'dataStandardId': this.biddingInformationParam.dataStandardId,
      'domainName': this.biddingInformationParam.domainName,
      'domainId': this.biddingInformationParam.domainId,
      'domainDataTypeCode': this.biddingInformationParam.domainDataTypeCode,
      'domainDataLength': this.biddingInformationParam.domainDataLength,
      'domainDataDecimalLength': this.biddingInformationParam.domainDataDecimalLength,
    }];
    this.dsData.setData(data);
  },
  methods: {
    onPopupCancelClicked() {
      this.$emit('exit', true);
    },
  },
};
</script>
<style scoped>
</style>
