<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OS_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldosid"
            v-model="objMasterDataMgmtForBAS.osid"
            maxlength="100"
            :readonly="true"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OS_TYP')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-code-select
            ref="codeSelectOSTypeCode"
            v-model="objMasterDataMgmtForBAS.ostypeCode"
            codeId="COD_OS_TYP"
            :disabled="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OS_VER_CD')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldOSVersionName"
            v-model="objMasterDataMgmtForBAS.osversionName"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objMasterDataMgmtForBAS.useYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objMasterDataMgmtForBAS.useYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OS_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldOSName"
            v-model="objMasterDataMgmtForBAS.osname"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OS_API_LVL')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldosapiLevel"
            v-model="objMasterDataMgmtForBAS.osapiLevel"
            maxlength="100"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            v-if="!isNew"
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objMasterDataMgmtForBAS.firstRegistrationDisplayLangId"
            :userId="objMasterDataMgmtForBAS.firstRegistrationUserId"
            :loginId="objMasterDataMgmtForBAS.firstRegistrationLoginId"
            :userName="objMasterDataMgmtForBAS.firstRegistrationUserName"
            :userGlobalName="objMasterDataMgmtForBAS.firstRegistrationUserGlobalName"
            :departmentName="objMasterDataMgmtForBAS.firstRegistrationDepartmentName"
            :departmentEnglishName="objMasterDataMgmtForBAS.firstRegistrationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <!-- <sui-text-field v-model="objMasterDataMgmtForBAS.firstRegistrationDTM" :readonly="true" /> -->
          {{ objMasterDataMgmtForBAS.firstRegistrationDTM }}
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            v-if="!isNew"
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objMasterDataMgmtForBAS.finalModificationDisplayLangId"
            :userId="objMasterDataMgmtForBAS.finalModificationUserId"
            :loginId="objMasterDataMgmtForBAS.finalModificationLoginId"
            :userName="objMasterDataMgmtForBAS.finalModificationUserName"
            :userGlobalName="objMasterDataMgmtForBAS.finalModificationUserGlobalName"
            :departmentName="objMasterDataMgmtForBAS.finalModificationDepartmentName"
            :departmentEnglishName="objMasterDataMgmtForBAS.finalModificationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <!-- <sui-text-field v-model="objMasterDataMgmtForBAS.finalModificationDTM" :readonly="true" /> -->
          {{ objMasterDataMgmtForBAS.finalModificationDTM }}
        </div>
      </div>
    </div>    
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
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
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00019_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isNew : true,
      objMasterDataMgmtForBAS: {
        osid: '',
        ostypeCode: '00',
        ostypeName: '',
        osversionName: '',
        useYn: 'Y',
        osname: '',
        osapiLevel: '',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
      },
      readonlyFlag: false,
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadMasterDataMgmtForBAS();
      } else {
        this.resetTab();
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },  
  mounted() {},

  methods: {
    loadMasterDataMgmtForBAS() {
      if(this.selectedGridRowData) {
        const osid = this.selectedGridRowData.osid;
        if(  !utils.isEmpty(osid)) {
          http.request(this.contextPageId, 'DTS_CMX_00061', {  
            path: {
              'o-sid': osid,
            },
          }).then(res => {
            this.objMasterDataMgmtForBAS = res.data;
            this.objMasterDataMgmtForBAS .firstRegistrationDTM = utils.dateformatToClient(this.objMasterDataMgmtForBAS .firstRegistrationDTM);
            this.objMasterDataMgmtForBAS .finalModificationDTM = utils.dateformatToClient(this.objMasterDataMgmtForBAS .finalModificationDTM);
            this.isNew = false;
            this.readonlyFlag = true;
          });
        }
      }
    },
    resetTab() {
      this.objMasterDataMgmtForBAS.osid = '';
     // this.$refs.codeSelectostypeCode.reset();
      this.objMasterDataMgmtForBAS.ostypeName = '';
      this.objMasterDataMgmtForBAS.osversionName = '';
      this.objMasterDataMgmtForBAS.useYn = 'Y';
      this.objMasterDataMgmtForBAS.osname = '';
      this.objMasterDataMgmtForBAS.osapiLevel = '';
      this.objMasterDataMgmtForBAS.ostypeCode = '00';
      this.objMasterDataMgmtForBAS.firstRegistrationDTM = ''; 
      this.objMasterDataMgmtForBAS.finalModificationDTM = '';    

      this.isNew = true;
      this.readonlyFlag = false;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onClickDelete() {
      
      const osid = this.objMasterDataMgmtForBAS.osid;    
      if(  !utils.isEmpty(osid)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMX_00062', {
            path: {
              'o-sid': osid,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'));
            this.$emit('onClickSearch');
            this.onClickNew();
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickSave() {
      
     /* if (utils.isEmpty(this.objMasterDataMgmtForBAS.osid)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OS_ID')), null, () => {
        });
        return false;
      } */
      if (utils.isEmpty(this.objMasterDataMgmtForBAS.ostypeCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OS_TYP')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMasterDataMgmtForBAS.osversionName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OS_VER_CD')), null, () => {
          this.$refs.textFieldOSVersionName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMasterDataMgmtForBAS.useYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USE_YN')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMasterDataMgmtForBAS.osname)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OS_NM')), null, () => {
          this.$refs.textFieldOSName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMasterDataMgmtForBAS.osapiLevel)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OS_API_LVL')), null, () => {
          this.$refs.textFieldosapiLevel.setFocus();
        });
        return false;
      }
      // for(var i=0; i<this.objMasterDataMgmtForBAS.osapiLevel.length; i++) {
      //   if(!(this.objMasterDataMgmtForBAS.osapiLevel[i] >= '0' && this.objMasterDataMgmtForBAS.osapiLevel <= '9')) {
      //     utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_API_LVL_CNTNS_DIGITS_ONLY')), null, () => {
      //       this.$refs.textFieldosapiLevel.setFocus();
      //     });
      //     return false;
      //   }
      // }
      
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMX_00063' : 'DTS_CMX_00064';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objMasterDataMgmtForBAS,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(!this.selectedGridRowData){
              this.$emit('onClickSearch');
              this.onClickNew();
            }else{
              this.$emit('updateInfo', this.objMasterDataMgmtForBAS.osid);
            }
          });         
        });
      });
    },
    
  },
};
</script>

<style scoped>
</style>
