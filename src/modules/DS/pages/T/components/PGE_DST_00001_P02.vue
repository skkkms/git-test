<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="mrB10"/>
     <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_NM')"></sui-input-label>
        </div>
        <div class="col-xs-5">
          <div class="comm_label">{{this.domainClassificationName}}</div>
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_DOMAIN_NAME')"></sui-input-label>
        </div>
        <div class="col-xs-5">
          <div class="comm_label">{{this.domainName}}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_DOM_PHSC_NM')"></sui-input-label>
        </div>
        <div class="col-xs-5">
          <div class="comm_label">{{this.domainPhysName}}</div>
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_DT_TYP_NM')"></sui-input-label>
        </div>
        <div class="col-xs-5">
          <div class="comm_label">{{this.domainDataTypeName }}</div>
        </div>
      </div>
      <div class="row">
         <div class="col-xs-1">
           <sui-input-label :label="$t('MSG_TXT_LEN')"></sui-input-label>
         </div>
         <div class="col-xs-5">
           <div class="comm_label">{{this.length}}</div>
         </div>
         <div class="col-xs-1">
           <sui-input-label :label="$t('MSG_TXT_DECM_LGHT')"></sui-input-label>
         </div>
         <div class="col-xs-5">
           <div class="comm_label">{{this.decimalLength}}</div>
         </div>
       </div>

       <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_DOM_DSCR')"></sui-input-label>
        </div>
        <div class="col-xs-11">
          <textarea default v-model="domainContent" value :disabled="true">TextArea</textarea>
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
  name: 'PGE_DST_00001_P02',
  props: {
    pageId : {
      type: String,
      default: 'PGE_DST_00001'
    },
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      domainClassificationName : '',
      domainName : '',
      domainPhysName : '',
      length : '',
      decimalLength : '',
      domainContent : '',
      biddingAnnouncementInfo :'',
      applicantId : '',
      domainDataTypeName:'',
      // Codes
      selectData: {
        COD_DOM_DATA_TYPE: { label: '', key: '' }
      }
    }
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.domainClassificationName = this.biddingInformationParam.domainClassificationName;
    this.domainDataTypeName = this.biddingInformationParam.domainDataTypeName;
    this.domainName = this.biddingInformationParam.domainName;
    this.domainPhysName = this.biddingInformationParam.domainId;
    //this.selectData.COD_DOM_DATA_TYPE.key = this.biddingInformationParam.domainDataTypeCode;
    this.length = String(this.biddingInformationParam.domainLength);
    this.decimalLength = String(this.biddingInformationParam.domainDataDecimalLength);
    this.domainContent = this.biddingInformationParam.domainContent;
    this.applicantId = this.$store.getters.userInfo.knoxId

  },

  methods: {
    onPopupCancelClicked() {
      this.$emit('exit',true);
    },
    // onClick(){
    //   this.onPopupCancelClicked();
    // }
  },
};
</script>

<style scoped>
</style>
