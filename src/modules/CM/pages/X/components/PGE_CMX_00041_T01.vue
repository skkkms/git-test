<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <!-- <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OPEN_SORC_LICS_UID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldOpenSourceLicenseUid"
            v-model="objOpenSourceLicense.openSourceLicenseUid"
            maxlength="0"
          />
        </div> -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationId"
            v-model="objOpenSourceLicense.mobileApplicationId"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_VER_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationVersionId"
            v-model="objOpenSourceLicense.mobileApplicationVersionId"
            maxlength="100"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OPEN_SORC_LICS_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldOpenSourceLicenseName"
            v-model="objOpenSourceLicense.openSourceLicenseName"
            maxlength="400"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_OPEN_SORC_LICS_URL')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldOpenSourceLicenseUrl"
            v-model="objOpenSourceLicense.openSourceLicenseUrl"
            maxlength="400"
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
            :displayLanguageId="objOpenSourceLicense.firstRegistrationDisplayLangId"
            :userId="objOpenSourceLicense.firstRegistrationUserId"
            :loginId="objOpenSourceLicense.firstRegistrationLoginId"
            :userName="objOpenSourceLicense.firstRegistrationUserName"
            :userGlobalName="objOpenSourceLicense.firstRegistrationUserGlobalName"
            :departmentName="objOpenSourceLicense.firstRegistrationDepartmentName"
            :departmentEnglishName="objOpenSourceLicense.firstRegistrationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <!-- <sui-text-field v-model="objOpenSourceLicense.firstRegistrationDTM" :readonly="true" /> -->
          {{ objOpenSourceLicense.firstRegistrationDTM }}
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
            :displayLanguageId="objOpenSourceLicense.finalModificationDisplayLangId"
            :userId="objOpenSourceLicense.finalModificationUserId"
            :loginId="objOpenSourceLicense.finalModificationLoginId"
            :userName="objOpenSourceLicense.finalModificationUserName"
            :userGlobalName="objOpenSourceLicense.finalModificationUserGlobalName"
            :departmentName="objOpenSourceLicense.finalModificationDepartmentName"
            :departmentEnglishName="objOpenSourceLicense.finalModificationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <!-- <sui-text-field v-model="objOpenSourceLicense.finalModificationDTM" :readonly="true" /> -->
          {{ objOpenSourceLicense.finalModificationDTM }}
        </div>
      </div>
      <!-- <div class="row">
        
        <div class="col-xs-1 nodata">
        </div>
        <div class="col-xs-5 nodata">
        </div>
      </div> -->
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
  name: 'PGE_CMX_00041_T01', // eslint-disable-line vue/name-property-casing
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
      objOpenSourceLicense: {
        openSourceLicenseUid: '',
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
        openSourceLicenseName: '',
        openSourceLicenseUrl: '',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
      },
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadOpenSourceLicense();
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
    loadOpenSourceLicense() {
      if(this.selectedGridRowData) {
        const openSourceLicenseUid = this.selectedGridRowData.openSourceLicenseUid;
        if(  !utils.isEmpty(openSourceLicenseUid)) {
          http.request(this.contextPageId, 'DTS_CMX_00065', {  
            path: {
              'open-source-license-uid': openSourceLicenseUid,
            },
          }).then(res => {
            this.objOpenSourceLicense = res.data;
            this.objOpenSourceLicense.firstRegistrationDTM = utils.dateformatToClient(this.objOpenSourceLicense.firstRegistrationDTM);
            this.objOpenSourceLicense.finalModificationDTM = utils.dateformatToClient(this.objOpenSourceLicense.finalModificationDTM);
            this.isNew = false;
          });
        }
      }
    },
    resetTab() {
      this.objOpenSourceLicense.openSourceLicenseUid = '';
      this.objOpenSourceLicense.mobileApplicationId = '';
      this.objOpenSourceLicense.mobileApplicationVersionId = '';
      this.objOpenSourceLicense.openSourceLicenseName = '';
      this.objOpenSourceLicense.openSourceLicenseUrl = '';
      this.objOpenSourceLicense.firstRegistrationDTM = '';
            this.objOpenSourceLicense.finalModificationDTM = '';

      this.isNew = true;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onClickDelete() {
      
      const openSourceLicenseUid = this.objOpenSourceLicense.openSourceLicenseUid;    
      if(  !utils.isEmpty(openSourceLicenseUid)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMX_00066', {
            path: {
              'open-source-license-uid': openSourceLicenseUid,
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
      
      // if (utils.isEmpty(this.objOpenSourceLicense.openSourceLicenseUid)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OPEN_SORC_LICS_UID')), null, () => {
      //   });
      //   return false;
      // }
      if (utils.isEmpty(this.objOpenSourceLicense.mobileApplicationId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_ID')), null, () => {
          this.$refs.textFieldMobileApplicationId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objOpenSourceLicense.mobileApplicationVersionId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_VER_ID')), null, () => {
          this.$refs.textFieldMobileApplicationVersionId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objOpenSourceLicense.openSourceLicenseName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OPEN_SORC_LICS_NM')), null, () => {
          this.$refs.textFieldOpenSourceLicenseName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objOpenSourceLicense.openSourceLicenseUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OPEN_SORC_LICS_URL')), null, () => {
          this.$refs.textFieldOpenSourceLicenseUrl.setFocus();
        });
        return false;
      }
      
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMX_00067' : 'DTS_CMX_00068';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objOpenSourceLicense,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(!this.selectedGridRowData){
              this.$emit('onClickSearch');
              this.onClickNew();
            }else{
              this.$emit('updateInfo', this.objOpenSourceLicense.openSourceLicenseUid);
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
