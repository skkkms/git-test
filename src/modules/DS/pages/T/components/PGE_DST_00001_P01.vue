<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="mrB10"/>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_NM')" :required="true" ></sui-input-label>
          </div>
          <div class="col-xs-5">
            <sui-text-field v-model="domainClassificationName"  :disabled="false" :clearable="true" :readonly="true"/>
            <sui-button type="button" class="comm_btn_InputScr" @click="onClickRetrivalCode" />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DT_TYP_NM')"  :required="true"></sui-input-label>
          </div>
          <div class="col-xs-5">
           <sui-code-select ref="dataTypeCombo"
                        :selected="selectData.COD_DOM_DATA_TYPE"
                        :pageId="this.pageId"
                        codeId="COD_DOM_DATA_TYPE"
                        :disabled="false"
                        :change="onTypeChange()"
                        />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LEN')" :required="true"></sui-input-label>
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" @keyup="isNumber()" maxlength="10" @input="getDomainName()" default v-model="length"  :disabled="lengthStatus" :clearable="true" :readonly="false"></sui-text-field>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DECM_LGHT')" :required="false"></sui-input-label>
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder=""  @keyup="isNumber()" maxlength="10" @input="getDomainName()" default v-model="decimalLength" value :disabled="decimalengthStatus"  :clearable="true" :readonly="false"></sui-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_PHSC_NM')" :required="true" ></sui-input-label>
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" default v-model="domainPhysName" value :clearable="true" :readonly="true"></sui-text-field>
            <div class="comp_spacing"></div>
            <sui-button type="button" class="comm_btn_duplicate" @click="onClickDuplicationCheck"></sui-button>
          </div>

         <div class="col-xs-1">
           <sui-input-label :label="$t('MSG_TXT_DOMAIN_NAME')" :required="true"></sui-input-label>
         </div>
         <div class="col-xs-5">
            <sui-text-field placeholder="" default v-model="domainName" value :disabled="false" :clearable="true" :readonly="true"></sui-text-field>
         </div>
        </div>
        <div class="row">
         <div class="col-xs-1">
           <sui-input-label :label="$t('MSG_TXT_DOM_CNTN')" :required="true" ></sui-input-label>
         </div>
         <div class="col-xs-11">
           <textarea v-model="domainContent" >TextArea</textarea>
         </div>
        </div>
        <div class="row">
         <div class="col-xs-1">
           <sui-input-label :label="$t('MSG_TXT_APPL_CNTN')" :required="true" ></sui-input-label>
         </div>
         <div class="col-xs-11">
           <textarea v-model="domainApplyContent">TextArea</textarea>
         </div>
        </div>
      </div>
     </div>
   <div class="comm_btn_wrap mrR30">
     <sui-button type="button" class="comm_btn_border" @click="onPopupCancelClicked">{{$t('MSG_BTN_CLOSE')}}</sui-button>
     <sui-button type="button" class="comm_btn_border" @click="resetFields" v-permission:read="'PGE_DST_00001'">{{$t('MSG_BTN_RESET')}}</sui-button>
     <sui-button type="button" class="comm_btn_solid" @click="submitRequest" v-permission:create="'PGE_DST_00001'">{{$t('MSG_BTN_APPL')}}</sui-button>
   </div>
   <sui-popup v-model="showRetrievePopup" :title="$t('MSG_TXT_RTV_STD_DOM')">
     <p05 @exit="onPopupCancelClick" :parentPageId="this.$options.name" @wordPopulate="wordPopulateMethod" />  </sui-popup>

</div>

</template>
<script>
import p05 from './PGE_DST_00001_P05';
export default {
  name: 'PGE_DST_00001_P01', // eslint-disable-line vue/name-property-casing
  components: {
      p05,
  },

  props: {
    parentPageId:{
      type: String,
      default: '',
    },
    pageId : String,
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      duplicateCheck : false,
      showRetrievePopup : false,
      lengthStatus:false,
      decimalengthStatus:false,
      applicantId : this.$store.getters.userInfo.knoxId,
      domainApplyContent : '',
      domainPhysName : '' ,
      domainContent : '' ,
      decimalLength : '',
      typedata:'',
      length : '',
      domainClassificationName: '',
      domainName : '',
      // Codes
      selectData: {
        COD_DOM_DATA_TYPE: { label: '', key: '' }
      }
    };
  },
  computed: {},
  watch: {
  },
  datasets: [],
  mounted() {
  },

  methods: {
      conFirm(type, value, subValue) {
        utils.messageBox(type, value, subValue, this.onClose);
      },
      onClose() {
        console.log('onConfirm');
      },
      resetFields(){
          this.applicantId = '';
          this.domainApplyContent = '';
          this.domainPhysName = '';
          this.domainContent = '' ;
          this.decimalLength= '';
          this.length = '';
          this.domainName = '';
          this.domainClassificationName = '';
          this.$refs.dataTypeCombo.reset()
      },
      onClickRetrivalCode(){
        this.showRetrievePopup = true;
      },
      wordPopulateMethod(value){
        this.domainClassificationName = value.domainClassificationName;
        this.domainClassificationID = value.domainClassId;
        this.wordId = value.wordId;
        console.log("test code  " + this.wordId)
        this.getDomainName()
        //this.domainPhysName = value.domainPhysName;
        //this.domainName = value.domainName;
      },
      onTypeChange()
      {
        this.validate();
        this.getDomainName();
      }
      ,
      validate()
      { let codeData=this.selectData.COD_DOM_DATA_TYPE.label;
        console.log(codeData);
        if(codeData === 'CHAR' || codeData === 'VARCHAR')
        { this.lengthStatus=false;
          this.decimalengthStatus=true;
          this.decimalLength='0';
        }
         if (codeData === 'NUMBER')
        {this.lengthStatus=false;
         this.decimalengthStatus=false;
         //this.decimalLength='';
         //this.length='';
         console.log("inside number");
        }
        else if(codeData==='DATE' || codeData==='CLOB'||codeData==='BLOB'||codeData==='TIMESTAMP'){
          console.log("inside ALL");
          this.lengthStatus=true;
         this.decimalengthStatus=true;
         this.decimalLength='0';
         this.length='0';

        }
      },
      getDomainName(){
        // && this.length && this.decimalLength){

          let dataType = this.selectData.COD_DOM_DATA_TYPE.label.slice(0,2);
          let decimalLengthValue = this.decimalLength;
          let domainLength=this.length;
          if(parseInt(this.decimalLength) > 0){
            decimalLengthValue = '_' + this.decimalLength;
          } else{
            decimalLengthValue = '';
          }
          if(parseInt(this.length) <= 0)
          {
            domainLength='';
          }
          if(this.domainClassificationName){
          this.domainName = this.domainClassificationName + dataType +domainLength + decimalLengthValue;
          console.log(this.domainName);
          this.domainPhysName = this.wordId + dataType +domainLength + decimalLengthValue;
          console.log(this.domainPhysName);
          this.duplicateCheck = false;
          }
      },
      onClickDuplicationCheck(){
        if(!utils.isEmpty(this.domainClassificationName)){
          this.duplicationCheckRequest();
        } else{
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DOM_CLSF_NM'), null));
        }
      },
    duplicationCheckRequest(){
        let queryParams = {
          "domain-id": this.domainPhysName
        }
          http.request('PGE_DST_00001', 'DTS_DST_00008', {
            query: queryParams,
          }).then(res => {
            console.log("CODE" +res.data.resultCode)
            if(res.data.resultCode == "0" ) {
              // this.duplicateCheck = true;
              // utils.messageBox('information',this.$t('MSG_ALT_DATA_NOT_FOUND'), null, null);
              const msg = utils.strFormat(this.$t('MSG_ALT_USE_PSBL'), this.$t('MSG_TXT_DOM_PHSC_NM'));
              utils.messageBox('success', msg, null, () => {
                this.duplicateCheck = true;
              });
            }else {
              utils.messageBox('warning',this.$t('MSG_ALT_DUPLICATE_EXISTS'));
            }
          });
    },
    submitRequest: function(event){
      //utils.isEmpty
      if(!this.domainClassificationName){
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DOM_CLSF_NM'), null));
      }
      else if(!this.decimalLength){
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DECM_LGHT') , null));
      }
      else if(!this.length){
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_LEN') , null));
      }
      //
      else if(!this.domainApplyContent.trim()){
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_APPL_CNTN') , null));
      }else if(!this.domainContent.trim()){
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DOM_DSCR') , null));
      }else if(!this.duplicateCheck){
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_DUP'), null));
      }else{
        //utils.confirm(this.$t('MSG_ALT_WANT_APPY'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO') , this.submitRequestApi, () => {});
        utils.messageBox('confirm',
         this.$t('MSG_ALT_WANT_APPY'), 
         null,
         this.confirmRouter);
      }
    },
    confirmRouter(){
      if(utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'),'Y')){
        //this.personInChargeList();
      }else {
        this.submitRequestApi();
      }
    },
    // Closing Retrival popup
    onPopupCancelClick() {
      this.showRetrievePopup = false
    },
    //closing main popup
    onPopupCancelClicked() {
      this.$emit('exit',true);
    },
    isNumber(){
      let alpharegex=/[^0-9.]/g;
        if (alpharegex.test(this.length) || alpharegex.test(this.decimalLength) ) {
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_NUMBER'), null);}
        this.length = this.length.replace(/[^0-9.]/g,'');
        this.decimalLength=this.decimalLength.replace(/[^0-9.]/g,'');
    },
    submitRequestApi(approvalData){
        const queryParams =  {
          //"applicationUserId": this.applicantId,
          "domainApplicationContent": this.domainApplyContent,
          "domainClassificationName": this.domainClassificationName,
          "domainContent": this.domainContent,
          "domainDataDecimalLength": this.decimalLength,
          "domainDataTypeCode": this.selectData.COD_DOM_DATA_TYPE.key,
          "domainId": this.domainPhysName,
          "domainLength": this.length,
          "domainName": this.domainName,
          "domainClassificationId": this.domainClassificationID,
          "approvalData": null,          
        };

        // 결재 상신 정보가 있으면 결재상신 정보 병합.
        if (!utils.isEmpty(approvalData)) {
          utils.assign(queryParams, { approvalData: approvalData });
        }

        http.request('PGE_DST_00001', 'DTS_DST_00004', {
          data : queryParams,
        }).then(res => {
          if(res.data.resultCode ==  '1'){
            this.conFirm('success', this.$t('MSG_ALT_PRGS_OK'), null);
          }else{
            this.conFirm('warning', this.$t('MSG_ALT_IS_EXISTS_APPL'), null);
          }
          this.onPopupCancelClicked();
        }).catch(error => {
          console.log(error);
        });
    },
    /**
     * 결재 담당자 조회 및 생성
     */ 
    // personInChargeList() {
    //   http.request('PGE_DST_00001', 'DTS_CMZ_00136', {
    //     path: {
    //       'pic-type-id': 'PIC_DST_DATA_STD_APRV',
    //     },
    //     query: {
    //     },
    //   }).then(res => {
    //     const personInChargeListP01 = [];
    //     utils.forEach(res.data, obj => {
    //       const userInfo = {
    //         userId: obj.userId,
    //         aprvCode: obj.rightApprovalCode,
    //       };
    //       personInChargeListP01.push(userInfo);
    //     });
    //     this.onAprvClick(personInChargeListP01);
    //   });
    // },
    
    // /*
    //  * 결재 상신 팝업
    //  */
    // onAprvClick(personInChargeList) {
    //   const objTemplate = {
    //     // templateId: 'TMP_DST_APRV_DOC_DOM',
    //     templateId: 'TMP_DST_APRV_DOC_DOM',
    //     siteId: this.$store.getters.userInfo.siteId,
    //     langId: this.$store.getters.userInfo.langId,
    //     datatStdDivNm: this.$t('MSG_TXT_DOM'),
    //     datatStdApplDivNm: this.$t('MSG_TXT_NEW'),
    //     applUserNm: this.$store.getters.userInfo.userName,
    //     dataStdApplCntn: this.domainApplyContent,
    //     domClsfNm: this.domainClassificationName,
    //     dataStdNm: this.domainPhysName,
    //     dataStdId: this.domainPhysName,
    //     domDataTypeNm: this.selectData.COD_DOM_DATA_TYPE.label,
    //     domDataLght: this.length,
    //     domDataDecmLght: this.decimalLength,
    //     dataStdCntn: this.domainContent,
    //     tcdmDqIfList: [],
    //   };

    //   utils.openLayerPopup('PGE_CMZ_00012', this.aprvPopupCallback, {
    //     pageInitialData: {
    //       // 필수: 업무코드, 업무결재Id
    //       taskId: 'TSK_CM006003',
    //       taskApprovalId: 'uid',

    //       // 결재 제목
    //       title: `${this.$t('MSG_TXT_DST_APRV_PRFX')} ${this.$t('MSG_TXT_DOM')} ${this.$t('MSG_TXT_NEW')} (${this.$t('MSG_TXT_STD_LGC_NM')} : ${this.domainPhysName})`,
    //       titleReadonly: true,

    //       // 결재 Route
    //       // 선택:담당자그룹Id로 결재자 조회시 사용
    //       // picGroupId: 'PIC_CMS_DATA_EXTC',
    //       aprvUsers: personInChargeList,
    //       popupRoutesModify: false,
    //       knoxRoutesModify: false,

    //       // 선택: 첨부파일 DocId
    //       // attachDocumentId: [],
    //       //* 결제에 첨부파일을 등록할경우 모듈 코드 값이 필수
    //       // moduleCode: 'CM',

    //       attachModify: false,
    //       // 결재본문
    //       objTemplate,
    //       contentsModify: false,

    //     },
    //     size: 'xlg',
    //   });
    // },
    
    // /*
    //  * 결재 상신 팝업 callback
    //  */
    // aprvPopupCallback(objAprv) {
    //   if (utils.isEmpty(objAprv) === false) {
    //     this.submitRequestApi(objAprv);
    //   }
    // },
  },
};
</script>

<style scoped>
</style>
