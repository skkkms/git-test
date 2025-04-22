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
            <sui-input-label :label="$t('MSG_TXT_APRV_CNTN')" :required="true" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <textarea v-model='approvalOpinionContent'></textarea>
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
            <div class="comm_label">{{this.biddingInformationParam.standardSourceContent}}</div>
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
      <sui-button type="button" class="comm_btn_border" @click="rejectApp()" v-permission:update="'PGE_DST_00005'">{{$t('MSG_BTN_RJT')}}</sui-button>
      <sui-button type="button" class="comm_btn_border_Prime" @click="approveApp()" v-permission:update="'PGE_DST_00005'">{{$t('MSG_BTN_APPR')}}</sui-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PGE_DST_00005_P05',
  props: {
    parentPageId: String,
    biddingInformationParam: {
      type: Object,
      default() {
        return {

        };
      },
    },
  },
  data() {
    return {
      dataStandardDivisionCode: '',
      approvalOpinionContent: '',
      dataStandardName: '',
      dataStandardId: '',
      dataStandardEnglishName: '',
      wordTypeDivisionCode: '',
      domainClassificationName: '',
      domainName: '',
      firstRegisterUserId: '',
      dataStandardContent: '',
      displayLanguageId: '',
      knoxId: '',
      loginId: '',
      userName: '',
      userGlobalName: '',
      departmentName: '',
      departmentEnglishName: '',
      applicationContent: '',
      standardWordChineseCharacter: '',
      standardSourceContent: '',
      applicationUserId: this.$store.getters.userInfo.userId,
      selectData: {
        COD_DATA_STD_DIV: { label: '', key: '' },
        COD_WRD_TYPE_DIV: { label: '', key: '' }
      },
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    debugger;
    //this.selectData.COD_DATA_STD_DIV.key = this.biddingInformationParam.dataStandardDivisionCode;
    console.log(this.biddingInformationParam.approvalOpinionContent);
    this.approvalOpinionContent = this.biddingInformationParam.approvalOpinionContent;
    this.dataStandardName = this.biddingInformationParam.dataStandardName;
    this.dataStandardId = this.biddingInformationParam.dataStandardId;
    this.dataStandardEnglishName = this.biddingInformationParam.dataStandardEnglishName;
    this.domainName = this.biddingInformationParam.domainName;
    // this.selectData.COD_DATA_STD_DIV.key=this.biddingInformationParam.wordTypeDivisionCode;
    this.firstRegisterUserId = this.biddingInformationParam.firstRegisterUserId;
    this.domainClassificationName = this.biddingInformationParam.domainClassificationName;
    this.standardWordChineseCharacter = this.biddingInformationParam.standardWordChineseCharacter;
    this.dataStandardContent = this.biddingInformationParam.dataStandardContent;
    this.applicationContent = this.biddingInformationParam.applicationContent;
    // this.selectData.COD_DOM_DATA_TYPE.key= this.biddingInformationParam.domainDataTypeCode;
    this.standardSourceContent = this.biddingInformationParam.standardSourceContent;
    this.displayLanguageId = this.biddingInformationParam.displayLanguageId;
    this.knoxId = this.biddingInformationParam.knoxId;
    this.loginId = this.biddingInformationParam.loginId;
    this.userName = this.biddingInformationParam.userName;
    this.userGlobalName = this.biddingInformationParam.userGlobalName;
    this.departmentName = this.biddingInformationParam.departmentName;
    this.departmentEnglishName = this.biddingInformationParam.departmentEnglishName;
  },

  methods: {
    approveApp() {
      const approvalUID = this.biddingInformationParam.approvalUID;
      const pathParam = {
        'approval-id': approvalUID,
      };
      const queryParams = {
        approvalOpinionContent: this.approvalOpinionContent,
        applicationDivisonCode: this.biddingInformationParam.dataStandardDivisionCode,
        standardType: this.biddingInformationParam.applicationType,
        finalModificationUserId: this.applicationUserId,
        finalModificationProgramId: "PGE_DST_00005",
      };
      if(!this.approvalOpinionContent.trim()){

        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL') ,  this.$t('MSG_TXT_APRV_CNTN')) , null);
      }
      else{
        http.request('PGE_DST_00005', 'DTS_DST_00036', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          if(res.data.resultCode == '1') {
            this.$emit('exit',true);
            utils.messageBox('information',this.$t('MSG_ALT_PRGS_OK'), null, null);
          }
        });
      }
    },
    rejectApp() {
      const approvalUID = this.biddingInformationParam.approvalUID;
      const pathParam = {
        'approval-id': approvalUID,
      };
      const queryParams = {
        approvalOpinionContent: this.approvalOpinionContent,
        applicationDivisonCode: 2,
        standardType: 'approval',
      };if(!this.approvalOpinionContent.trim()){

        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL') , this.$t('MSG_TXT_APRV_CNTN') ) , null);
      }
      else{
        http.request('PGE_DST_00005', 'DTS_DST_00037', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          if(res.data.resultCode == '1') {
            this.$emit('exit',true);
            utils.messageBox('information',this.$t('MSG_ALT_PRGS_OK'), null, null);
          }
        });
      }}
  },
};
</script>

  <style scoped>
  </style>
