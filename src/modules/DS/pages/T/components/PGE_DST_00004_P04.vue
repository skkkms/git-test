<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="mrT10"></div>
        <h4><sui-input-label :label="$t('MSG_TIT_APPL_TRM')" :vertical="false" /></h4>
      <div class="mrT10"></div>
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :options="options"
        :initialRowsPerPage="1"
        :showRowsPerPageControl="false"
      />
      <!-- <sui-grid
        ref="grid"
        :columns="gridColumns0"
        :dataset="'dataset0'"
        :hideHeader="false"
        :autoheight="false"
        :multiselect="false"
        :pageable="false"
        :showCountControl="false"
        :showDisplayCountControl="false"
        :initial-pagesize="1"
        :pagesizeoptions="[1]"
      /> -->
      <div class="mrB30"></div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comp_label">{{this.frame0.module}}</div>
            <div class="comp_label"></div><!--submodule-->
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_REF_TRM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comp_label">{{this.frame0.sourceTermName}}</div>
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
            <div class="comp_label">{{this.frame0.codeSturctureTypeCode}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_DSCR')"
              :disabled="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            {{this.frame0.termDesc}}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_EN_DSCR')"
              :disabled="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            {{this.frame0.termContentEn}}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APPL_CNTN')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <textarea v-model="frame0.applyContent"/>
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onCancel"
      >
        {{$t('MSG_BTN_CANCEL')}}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onApplyDelete"
        v-permission:create="'PGE_DST_00004'"
      >
        {{$t('MSG_BTN_APPL')}}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
export default {
  name: 'PGE_DST_00004_P04',
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
      frame0: {
        termName: '',
        termPhyName: '',
        termDesc: '',
        domainName: '',
        rangeDate: { start: '', end: '' },
        sourceTermName: '',
        domainDataTypeCode: '',
        firstRegisterUserId: '',
        module:'',
        termContentEn:'',
        codeId:'',
        applicantID:'',
        termsApplicationContent:'',
        applyContent:''
      },
      dataset0: new urDataSet(),
      options: {
        rowHeight: 30,
      }
    };

  },
  computed: {},
  watch: {},
  created() {
    this.gridColumns0 = [{
        text: this.$t('MSG_TXT_TRM_NM'),
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
        text: this.$t('MSG_TXT_DECM_LGHT'),
        value: 'duplicationCheck',
      }];
  },
  mounted() {
    console.log(this.biddingInformationParam);
    this.frame0.sourceTermName = this.biddingInformationParam.sourceTerm;
    this.frame0.domainDataTypeCode = this.biddingInformationParam.domainDataTypeCode;
    this.frame0.domainName = this.biddingInformationParam.domainName;
    this.frame0.firstRegisterUserId = this.$store.getters.userInfo.userId;
    this.frame0.module = this.biddingInformationParam.moduleName + ' ' +this.biddingInformationParam.subModuleName;
    this.frame0.termDesc = this.biddingInformationParam.termsContent;
    if(this.biddingInformationParam.codeId)
    {
    this.frame0.codeSturctureTypeCode = this.biddingInformationParam.codeId + ' ' + this.biddingInformationParam.codeValidValue ;
    }
    this.frame0.codeId = this.biddingInformationParam.codeId;
    this.frame0.applicantID = this.biddingInformationParam.applicantID;
    this.frame0.termsApplicationContent = this.biddingInformationParam.termsApplicationContent;
    this.frame0.termContentEn = this.biddingInformationParam.termsEnglishName;
    let termsName =  this.biddingInformationParam.termsName;
    let termsId = this.biddingInformationParam.termsId;
    let domainName = this.biddingInformationParam.domainName;
    let domainPhysicalName = this.biddingInformationParam.domainPhysicalName;
    let domainDataTypeName = this.biddingInformationParam.domainDataTypeName;
    let domainLength = this.biddingInformationParam.domainLength;
    let domainDataDecimalLength = this.biddingInformationParam.domainDataDecimalLength;
    let duplicationCheck = this.biddingInformationParam.duplicationCheck;

    const data = [{
          'termsName' : termsName,
          'termsId' : termsId,
          'domainName' : domainName,
          'domainPhysicalName' : domainPhysicalName,
          'domainDataTypeName' : domainDataTypeName,
          'domainLength' : domainLength,
          'domainDataDecimalLength': domainDataDecimalLength,
          'duplicationCheck': duplicationCheck
        }];
        this.dataset0.setData(data);
  },

  methods: {
    onCancel() {
      this.$emit('exit', true);
    },
    onApplyDelete() {
      if(!this.frame0.applyContent.trim()){
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL') , this.$t('MSG_TXT_APPL_CNTN')));
      }
      else{
        //utils.confirm(this.$t('MSG_ALT_WANT_APPY'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'), this.onDeleteConfirm, () => {});
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_APPY'), null, this.confirmRouter); 
      }
    },
      confirmRouter(){
        if(utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'),'Y')){
          this.personInChargeList();
        }else {
          this.onDeleteConfirm();
          // this.personInChargeList();
        }
      },
    onDeleteConfirm(approvalData) {
      let queryParams = {
            "applicantID": this.frame0.applicantID,
            "codeId": this.frame0.codeId,
            "codeValidValue": '',
            "domainDataDecimalLength": this.biddingInformationParam.domainDataDecimalLength,
            "domainDataTypeCode": this.frame0.domainDataTypeCode,
            "domainDecription": '',
            "domainLength":  this.biddingInformationParam.domainLength,
            "domainName": this.biddingInformationParam.domainName,
            "domainPhysicalName": this.biddingInformationParam.domainPhysicalName,
            "finalModificationProgramId": "PGE_DST_00004",
            "finalModificationUserId": this.$store.getters.userInfo.userId,
            "firstRegistrationProgramId": "PGE_DST_00004",
            "firstRegistrationUserId": this.$store.getters.userInfo.userId,
            "moduleCode":this.biddingInformationParam.moduleCode,
            "sourceTerm": "",
            "subModuleCode": '',
            "termsApplicationContent": this.frame0.applyContent,
            "termsContent":  this.frame0.termsApplicationContent,
            "termsId": this.biddingInformationParam.termsId,
            "termsName": this.biddingInformationParam.termsName,
            "approvalData":null
      };

        // 결재 상신 정보가 있으면 결재상신 정보 병합.
        if (!utils.isEmpty(approvalData)) {
          utils.assign(queryParams, { approvalData: approvalData });
        }

      let termID = this.biddingInformationParam.termsId;
      console.log(termID)
      http.request('PGE_DST_00004', 'DTS_DST_00022', {
          path: {
            'term-id': termID
          },
          data: queryParams
      }).then(res => {
          if(res.data.resultCode ==  '1'){
              utils.messageBox('success', utils.strFormat(this.$t('MSG_ALT_PRGS_OK') , null));
              this.onPopupCancelClicked();
            }
            else{
              utils.messageBox('warning', this.$t('MSG_ALT_IS_EXISTS_APPL') , null);
            }

      });
    },
    onPopupCancelClicked() {
         this.$emit('exit',true);
      },
      
    /**
     * 결재 담당자 조회 및 생성
     */ 
    personInChargeList() {
      http.request('PGE_DST_00004', 'DTS_CMZ_00136', {
        path: {
          'pic-type-id': 'PIC_DST_DATA_STD_APRV',
        },
        query: {
        },
      }).then(res => {
        const personInChargeListP04 = [];
        utils.forEach(res.data, obj => {
          const userInfo = {
            userId: obj.userId,
            aprvCode: obj.rightApprovalCode,
          };
          personInChargeListP04.push(userInfo);
        });
        this.onAprvClick(personInChargeListP04);
      });
    },
    /*
     * 결재 상신 팝업
     */
    onAprvClick(personInChargeList) {
      const objTemplate = {
        templateId: 'TMP_DST_APRV_DOC_TRM',
        siteId: this.$store.getters.userInfo.siteId,
        langId: this.$store.getters.userInfo.langId,
        datatStdDivNm: this.$t('MSG_TXT_TRM'),
        datatStdApplDivNm: this.$t('MSG_TXT_DEL'),
        applUserNm: this.$store.getters.userInfo.userName,
        dataStdApplCntn: utils.isEmpty(this.biddingInformationParam.applyContent) ? '' : this.biddingInformationParam.applyContent,
        dataStdNm: utils.isEmpty(this.biddingInformationParam.termsName) ? '' : this.biddingInformationParam.termsName,
        dataStdId: utils.isEmpty(this.biddingInformationParam.termsId) ? '' : this.biddingInformationParam.termsId,
        domNm: utils.isEmpty(this.biddingInformationParam.domainName) ? '' : this.biddingInformationParam.domainName,
        domDataTypeNm: utils.isEmpty(this.biddingInformationParam.domainDataTypeName) ? '' : this.biddingInformationParam.domainDataTypeName,
        domDataLght: utils.isEmpty(this.biddingInformationParam.domainLength) ? '' : this.biddingInformationParam.domainLength,
        domDataDecmLght: utils.isEmpty(this.biddingInformationParam.domainDataDecimalLength) ? '' : this.biddingInformationParam.domainDataDecimalLength,
        mdleNm: utils.isEmpty(this.biddingInformationParam.moduleName) ? '' : this.biddingInformationParam.moduleName,
        smdleNm: utils.isEmpty(this.biddingInformationParam.subModuleName) ? '' : this.biddingInformationParam.subModuleName,
        refTrmNm: utils.isEmpty(this.biddingInformationParam.sourceTerm) ? '' : this.biddingInformationParam.sourceTerm,
        cdNm: utils.isEmpty(this.biddingInformationParam.codeValidValue) ? '' : this.biddingInformationParam.codeValidValue,
        dataStdCntn: utils.isEmpty(this.biddingInformationParam.termsContent) ? '' : this.biddingInformationParam.termsContent,
        dataStdEnNm: utils.isEmpty(this.biddingInformationParam.termsEnglishName) ? '' : this.biddingInformationParam.termsEnglishName,
        tcdmDqIfList: [],
      };
      
      utils.openLayerPopup('PGE_CMZ_00012', this.aprvPopupCallback, {
        pageInitialData: {
          // 필수: 업무코드, 업무결재Id
          taskId: 'TSK_CM006003',
          taskApprovalId: 'uid',

          // 결재 제목
          title: `${this.$t('MSG_TXT_DST_APRV_PRFX')} ${this.$t('MSG_TXT_TRM')} ${this.$t('MSG_TXT_DEL')} (${this.$t('MSG_TXT_STD_LGC_NM')} : ${this.biddingInformationParam.termsName})`,
          titleReadonly: true,

          // 결재 Route
          // 선택:담당자그룹Id로 결재자 조회시 사용
          // picGroupId: 'PIC_CMS_DATA_EXTC',
          aprvUsers: personInChargeList,
          popupRoutesModify: false,
          knoxRoutesModify: false,

          // 선택: 첨부파일 DocId
          // attachDocumentId: [],
          //* 결제에 첨부파일을 등록할경우 모듈 코드 값이 필수
          // moduleCode: 'CM',

          attachModify: false,
          // 결재본문
          objTemplate,
          contentsModify: false,

        },
        size: 'xlg',
      });
    },
    
    /*
     * 결재 상신 팝업 callback
     */
    aprvPopupCallback(objAprv) {
      if (utils.isEmpty(objAprv) === false) {
        this.onDeleteConfirm(objAprv);
      }
    },    
  },
};
</script>
<style scoped>
</style>