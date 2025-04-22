<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_shut_wrap">
      <div class="inbox">
        <div class="comm_title_wrap">
          <h4>{{$t('MSG_TIT_WRD_QRY_LIST')}} </h4>
        </div>
        <div class="mrB10"></div>
        <sui-s-grid 
            ref="grid" 
            :headers="gridColumns0" 
            :data-source="dataset0"
            :showRowsPerPageControl="false"
            :options="options"
          />
      </div>
      <div class="emptybox"></div>
      <div class="inbox">
        <div class="comm_title_wrap">
          <h4>{{$t('MSG_TIT_DOM_LIST')}}</h4>
        </div>
        <div class="mrB10"></div>
        <sui-s-grid 
            ref="grid1" 
            :headers="gridColumns1" 
            :data-source="dataset1"
            :showRowsPerPageControl="false"
            :options="options"
          >
            <template #right-info>
              <sui-button type="button" class="comm_btn_gridTop" :disabled="true" @click="combinationTerm()"> {{$t('MSG_TXT_CMBNT_TRM')}}</sui-button>
            </template>
        </sui-s-grid>
      </div>
    </div>
    <div class="comm_title_wrap">
      <h4> {{$t('MSG_TIT_APPL_TRM')}}</h4>
    </div>
    <sui-s-grid 
        ref="grid2" 
        :headers="gridColumns2" 
        :data-source="dataset2"
        :showRowsPerPageControl="false"
        :options="options"
    />
    <div class="mrB30"></div>
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDLE')" :required="true"  :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select ref="moduleTypeOptions"
              :page-id="this.$options.name"
              :selected-md="selectData.moduleCode"
              :selected-smd="selectData.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'select'"
            />
        </div>    
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_REF_TRM')" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field placeholder="" v-model="sourceTerm" default value :disabled="true" @click="sourceTermClick()" :clearable="true" :readonly="false" fixed-icon></sui-text-field>
          <div class="comp_spacing"></div>
          <sui-button type="button" class="btn_innerTbl_border" @click="exclude">{{$t('MSG_BTN_EXLD')}}</sui-button>
        </div>
      </div>
      <div class="row">  
         <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_CODE_NAME')" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field placeholder="" default value v-model="codeTerm" :disabled="true" :clearable="true" :readonly="false"></sui-text-field>
          <div class="comp_spacing"></div>
          <sui-text-field placeholder="" @click="codeIdFunction()" default value v-model="codeName" :disabled="true" :clearable="true" :readonly="false" fixed-icon></sui-text-field>
          <div class="comp_spacing"></div>
          <sui-button type="button" class="comm_btn_Reset" @click="onClickCodeRegist()">{{$t('MSG_BTN_CODE_RGST')}}</sui-button>
        </div>
        
        <div class="col-xs-6">
           <div class="comp_spacing"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_TRM_DSCR')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-11">
          <textarea v-model="frame0.termDesc"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_TRM_EN_DSCR')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-11">
           <textarea v-model="frame0.termsContentEn"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_APPL_CNTN')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-11">
          <textarea v-model="frame0.termApplyContent"></textarea>
        </div>
      </div>
    </div>
  </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button type="button" class="comm_btn_border" @click="onPopupCancelClicked">{{$t('MSG_BTN_CLOSE')}}</sui-button>
      <sui-button type="button" class="comm_btn_border" @click="onCancel" v-permission:read="'PGE_DST_00004'">{{$t('MSG_BTN_RESET')}}</sui-button>
      <sui-button type="button" class="comm_btn_solid" @click="applyFunction" v-permission:create="'PGE_DST_00004'">{{$t('MSG_BTN_APPL')}}</sui-button>
    </div>
    <sui-popup
        v-model="showSourcePopup"
        :title="$t('MSG_TIT_REF_TRM_LIST')"
      >
        <p05 @exit="onChildPopClicked()" @sourceTermPopulate="sourceTermPopulateMethod" />
      </sui-popup>
  </div>
</template>
<script>
import p05 from './PGE_DST_00004_P05';
import {urDataSet} from 'uidev-component/index';
  export default {
    name: 'PGE_DST_00004_P03',
    components: {
      p05
    },
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
        termsContentEn:'',
        firstRegisterUserId: '',
        module:'',
        termsApplicationContent:'',
        applicantID:'',
        termApplyContent:'',
      },
      dataset0: new urDataSet(),
      dataset1: new urDataSet(),
      dataset2: new urDataSet(),

      options: {
        infinityScroll: true,
        noBaseInfo: false,
      },

      selectData: {
           moduleCode: { key: '', label: '' },
          subModuleCode: { key: '', label: '' }
        },
      codeTerm:'',
      codeName:'',
      codeValidValue:'',
      sourceTerm: '',
      domainList:[],
      showSourcePopup: false,
      showMetauserBtn : false,
      };
    },
    computed: {},
    watch: {},
    created() {
        this.gridColumns0 =  [{
          text: this.$t('MSG_TXT_WRD_NM'),
          value: 'wordName'
        }, {
          text: this.$t('MSG_TXT_WRD_PHSC_NM'),
          value: 'wordId'
        }, {
          text: this.$t('MSG_TXT_WRD_TYP_NM'),
          value: 'wordTypeName'
        }, {
          text: this.$t('MSG_TXT_STT'),
          value: 'wordStatus'
        }];
        
        this.gridColumns1 = [{
          text: this.$t('MSG_TXT_DOMAIN_NAME'),
          value: 'domainName'
        }, {
          text: this.$t('MSG_TXT_DT_TYP'),
          value: 'dataType'
        }, {
          text: this.$t('MSG_TXT_DOM_CNTN'),
          value: 'domainContent'
        }];
        
        this.gridColumns2 = [{
        text: this.$t('MSG_TXT_TRM_NM'),
        value: 'termsName',
      }, {
        text: this.$t('MSG_TXT_TRM_PHSC_NM'),
        value: 'termsId',
      }, {
        text: this.$t('MSG_TXT_DOMAIN_NAME'),
        value: 'domainName',
      }, {
        text: this.$t('MSG_TXT_DT_TYP'),
        value: 'domainDataTypeName',
      }, {
        text: this.$t('MSG_TXT_LEN'),
        value: 'domainLength',
      }, {
        text: this.$t('MSG_TXT_DECM_LGHT'),
        value: 'domainDataDecimalLength',
      }];
    },
    mounted() {
    this.getSession();
    this.frame0.sourceTermName = this.biddingInformationParam.sourceTerm;
    this.frame0.domainDataTypeCode = this.biddingInformationParam.domainDataTypeCode;
    this.frame0.domainName = this.biddingInformationParam.domainName;
    this.frame0.firstRegisterUserId = this.$store.getters.userInfo.knoxId;
    this.selectData.moduleCode.key = this.biddingInformationParam.moduleCode || '';
    this.selectData.subModuleCode.key = this.biddingInformationParam.subModuleCode || '';
    this.frame0.termDesc = this.biddingInformationParam.termsContent;
    this.sourceTerm= this.biddingInformationParam.sourceTerm;
    this.frame0.termsApplicationContent = this.biddingInformationParam.termsApplicationContent;
    this.frame0.applicantID = this.biddingInformationParam.applicantID;
    this.codeTerm = this.biddingInformationParam.codeId;
   if(this.biddingInformationParam.codeId)
   {
   this.codeName = this.biddingInformationParam.codeValidValue;
   }
   let termsName =  this.biddingInformationParam.termsName;
    let termsId = this.biddingInformationParam.termsId;
    this.frame0.termsContentEn =  this.biddingInformationParam.termsEnglishName;
    let domainName = this.biddingInformationParam.domainName;
    let domainPhysicalName = this.biddingInformationParam.domainPhysicalName;
    let domainDataTypeName = this.biddingInformationParam.domainDataTypeName;
    let domainLength = this.biddingInformationParam.domainLength;
    let domainDataDecimalLength = this.biddingInformationParam.domainDataDecimalLength;
    let duplicationCheck = this.biddingInformationParam.duplicationCheck;
    let domainDecription = this.biddingInformationParam.domainDecription;

    this.retrieveWordList(termsId);   //populates word query list
    const dataDomain = [{
          'domainName' : domainName,
          'dataType' : domainDataTypeName,
          'domainContent' : domainDecription
        }];
        
        this.dataset1.setData(dataDomain);
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
        this.dataset2.setData(data);
    },
    methods: {
      sourceTermClick(){
        this.showSourcePopup = true;
      },
      onCancel() {
        this.frame0.termDesc = '';
        this.frame0.termsApplicationContent = '';
        this.frame0.termApplyContent = '';
        this.codeTerm= '';
        this.codeName = '';
        this.frame0.termsContentEn='';
        	
        this.sourceTerm = '';	
      	
        this.selectData.moduleCode.key='ALL';	
        this.selectData.subModuleCode.key='ALL';
      },
      retrieveWordList(termsId) {
        http.request('PGE_DST_00004', 'DTS_DST_00024', {
        path: {
          'term-id': termsId
        }
      }).then(res => {
          this.dataset0.setData(res.data);
      });
      },
      showSourceTerm() {
        this.showSourcePopup = true;
      },
      getSession() {
        this.sessionInfo = this.$store.getters.userInfo;
        
      },
      applyFunction(){
        console.log("test");
        
        console.log(this.selectData.subModuleCode.key)
        if(!this.frame0.termDesc.trim() ){
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_TRM_DSCR') , null));  
        }else if(!this.frame0.termApplyContent.trim()){
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_APPL_CNTN') , null));  
        } else if(this.selectData.moduleCode.key ==='ALL'){
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_MDLE'), null)); 
        }
        else if(this.selectData.subModuleCode.key ==='ALL' || utils.isEmpty (utils.trim (this.selectData.subModuleCode.key)) ){
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_SMDLE'), null)); 
        }else{
         // utils.confirm(this.$t('MSG_ALT_WANT_APPY'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'), this.applyModification, () => {});
          utils.messageBox('confirm', this.$t('MSG_ALT_WANT_APPY'), null, this.confirmRouter); 
        }
      },
      confirmRouter(){
        if(utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'),'Y')){
          this.personInChargeList();
        }else {
          this.applyModification();
          // this.personInChargeList();
        }
      },
      onChildPopClicked(){
        this.showSourcePopup = false;
      },
      applyModification(approvalData) {
        let queryParams = {  
            "applicantID": this.frame0.applicantID,
            "codeId": this.codeTerm,
            "codeSturctureTypeCode": this.codeSturctureTypeCode,
            "codeValidValue": this.codeValidValue,
            "domainDataDecimalLength": this.biddingInformationParam.domainDataDecimalLength,
            "domainDataTypeCode": this.frame0.domainDataTypeCode,
            "domainDecription": this.biddingInformationParam.domainDecription,
            "domainLength":  this.biddingInformationParam.domainLength,
            "domainName": this.biddingInformationParam.domainName,
            "domainPhysicalName": this.biddingInformationParam.domainPhysicalName,
            "finalModificationProgramId": "PGE_DST_00004",
            "finalModificationUserId": this.$store.getters.userInfo.userId,
            "firstRegistrationProgramId": "PGE_DST_00004",
            "firstRegistrationUserId": this.$store.getters.userInfo.userId, 
            "moduleCode":this.selectData.moduleCode.key,
            "parentCodeId": "",
            "parentCodeValidValue": "",
            "sourceTerm": this.sourceTerm,
            "sourceTermID": this.biddingInformationParam.sourceTermID,
            "termsContentEn":this.frame0.termsContentEn,
            "subModuleCode": this.selectData.subModuleCode.key,
            "termsApplicationContent": this.frame0.termApplyContent,
            "termsContent":  this.frame0.termDesc,
            "termsId": this.biddingInformationParam.termsId,
            "termsName": this.biddingInformationParam.termsName,
            "approvalData": null
      };

      // 결재 상신 정보가 있으면 결재상신 정보 병합.
        if (!utils.isEmpty(approvalData)) {
          utils.assign(queryParams, { approvalData: approvalData });
        }

      let termID = this.biddingInformationParam.termsId;
      http.request('PGE_DST_00004', 'DTS_DST_00021', {
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
      // domain row selection
      // onSelectDomainRow(target){
      //     this.domainList = target;
      // },
      onPopupCancelClicked() {
         this.$emit('exit',true);
      },
      sourceTermPopulateMethod(value) {
        let sourceTermName = value.termName;
        let combinationTermList = [{
          "termsName" : this.biddingInformationParam.termsName,
          "termsId" : this.biddingInformationParam.termsId,
          "domainName": value.domainName,
          "domainDataTypeName": value.domainDataTypeName,
          "domainLength": value.domainLength,
          "domainDataDecimalLength": value.domainDataDecimalLength,
          "duplicatecheck" : 'Duplicate Check'
        }];
        this.biddingInformationParam.domainName=combinationTermList[0].domainName;
        this.biddingInformationParam.domainDataTypeName=combinationTermList[0].domainDataTypeName;
        this.biddingInformationParam.domainLength=combinationTermList[0].domainLength;
        this.biddingInformationParam.domainDataDecimalLength=combinationTermList[0].domainDataDecimalLength;
        this.dataset2.setData(combinationTermList);
        this.sourceTerm = sourceTermName;        
      },
      //code Id Function
      codeIdFunction(){
        utils.openLayerPopup('PGE_CMZ_00003',this.onPagePopupCallback,{
          pageInitialData: { content: this.$options.name, value:true , wordName: this.wordName},
          size: 'lg'
        })
      },
      onClickCodeRegist(){
        let url = '';
        let pageId = 'PGE_CMZ_00001';
        url = `${window.location.origin}${window.location.pathname}#/${pageId}`;
        // console.log(url);
        const win = window.open();
        win.location = url;
      },      
      onPagePopupCallback(value){
        if(value){
          this.codeTerm = value[0].codeId;
          this.codeValidValue = value[0].codePhyName;
          this.codeName= value[0].codeName;
          console.log(this.codeName)
        }
        //this.onPopupCancelClicked();
      },
      exclude() {
        this.sourceTerm='';
      },
      onClose() {
        this.$emit('onCloseClick');
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
        const personInChargeListP03 = [];
        utils.forEach(res.data, obj => {
          const userInfo = {
            userId: obj.userId,
            aprvCode: obj.rightApprovalCode,
          };
          personInChargeListP03.push(userInfo);
        });
        this.onAprvClick(personInChargeListP03);
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
        datatStdApplDivNm: this.$t('MSG_TXT_MOD'),
        applUserNm: this.$store.getters.userInfo.userName,
        dataStdApplCntn: utils.isEmpty(this.frame0.termApplyContent) ? '' : this.frame0.termApplyContent,
        dataStdNm: utils.isEmpty(this.biddingInformationParam.termsName) ? '' : this.biddingInformationParam.termsName,
        dataStdId: utils.isEmpty(this.biddingInformationParam.termsId) ? '' : this.biddingInformationParam.termsId,
        domNm: utils.isEmpty(this.biddingInformationParam.domainName) ? '' : this.biddingInformationParam.domainName,
        domDataTypeNm: utils.isEmpty(this.biddingInformationParam.domainDataTypeName) ? '' : this.biddingInformationParam.domainDataTypeName,
        domDataLght: utils.isEmpty(this.biddingInformationParam.domainLength) ? '' : this.biddingInformationParam.domainLength,
        domDataDecmLght: utils.isEmpty(this.biddingInformationParam.domainDataDecimalLength) ? '' : this.biddingInformationParam.domainDataDecimalLength,
        mdleNm: utils.isEmpty(this.$refs.moduleTypeOptions.selected.md.label) ? '' : this.$refs.moduleTypeOptions.selected.md.label,
        smdleNm: utils.isEmpty(this.$refs.moduleTypeOptions.selected.smd.label) ? '' : this.$refs.moduleTypeOptions.selected.smd.label,
        refTrmNm: utils.isEmpty(this.sourceTerm) ? '' : this.sourceTerm,
        cdNm: utils.isEmpty(this.codeName) ? '' : this.codeName,
        dataStdCntn: utils.isEmpty(this.frame0.termDesc) ? '' : this.frame0.termDesc,
        dataStdEnNm: utils.isEmpty(this.frame0.termsContentEn) ? '' : this.frame0.termsContentEn,
        tcdmDqIfList: [],
      };

      utils.openLayerPopup('PGE_CMZ_00012', this.aprvPopupCallback, {
        pageInitialData: {
          // 필수: 업무코드, 업무결재Id
          taskId: 'TSK_CM006003',
          taskApprovalId: 'uid',

          // 결재 제목
          title: `${this.$t('MSG_TXT_DST_APRV_PRFX')} ${this.$t('MSG_TXT_TRM')} ${this.$t('MSG_TXT_MOD')} (${this.$t('MSG_TXT_STD_LGC_NM')} : ${this.biddingInformationParam.termsName})`,
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
        this.applyModification(objAprv);
      }
    },    
    },
    
  };
</script>
<style scoped>
</style>
