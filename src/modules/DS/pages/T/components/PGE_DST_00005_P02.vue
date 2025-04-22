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
            <sui-input-label :label="$t('MSG_TXT_WRD_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.dataStandardName}}</div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.dataStandardId}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_EN_NM')" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">{{this.dataStandardEnglishName}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_TYP_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.biddingInformationParam.wordTypeDivisionCode}}</div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CTGR_CON')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.domainClassificationName}}</div>
            <div class="comm_label">{{this.domainName}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APPL_USR_ID')" :vertical="false" />
          </div>
          <div class="col-xs-5">
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
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_CHIN')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">{{this.standardWordChineseCharacter}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_SRC')" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">{{this.standardSourceContent}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_DSCR')" :vertical="false" />
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
  name: 'PGE_DST_00005_P02',
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
      dataStandardName: '',
      dataStandardId: '',
      dataStandardEnglishName: '',
      wordTypeDivisionCode: '',
      firstRegisterUserId: '',
      domainClassificationName: '',
      domainName: '',
      standardWordChineseCharacter: '',
      standardSourceContent: '',
      dataStandardContent: '',
      displayLanguageId: '',
      loginId: '',
      knoxId: '',
      userName: '',
      userGlobalName: '',
      departmentName: '',
      departmentEnglishName: '',
      applicationContent: '',
      // Codes
      selectData: {
        COD_DATA_STD_DIV: { label: '', key: '' },
        COD_DATA_STD_APRV_PRGS_STT: { label: '', key: '' },
        COD_WRD_TYPE_DIV: { label: '', key: '' }
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
    this.firstRegisterUserId = this.biddingInformationParam.firstRegisterUserId;
    this.dataStandardEnglishName = this.biddingInformationParam.dataStandardEnglishName;
    this.selectData.COD_WRD_TYPE_DIV.key = this.biddingInformationParam.wordTypeDivisionCode;
    this.domainClassificationName = this.biddingInformationParam.domainClassificationName;
    this.domainName = this.biddingInformationParam.domainName;
    this.firstRegisterUserId = this.biddingInformationParam.firstRegisterUserId;
    this.standardWordChineseCharacter = this.biddingInformationParam.standardWordChineseCharacter;
    this.standardSourceContent = this.biddingInformationParam.standardSourceContent;
    this.dataStandardContent = this.biddingInformationParam.dataStandardContent;
    this.applicationContent = this.biddingInformationParam.applicationContent;
    this.displayLanguageId = this.biddingInformationParam.displayLanguageId;
    this.loginId = this.biddingInformationParam.loginId;
    this.knoxId = this.biddingInformationParam.knoxId;
    this.userName = this.biddingInformationParam.userName;
    this.userGlobalName = this.biddingInformationParam.userGlobalName;
    this.departmentName = this.biddingInformationParam.departmentName;
    this.departmentEnglishName = this.biddingInformationParam.departmentEnglishName;
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
