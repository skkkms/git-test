<template>
  <div>
    <div class="mrB20" />
    <div class="comm_title_wrap">
      <h4>{{ $t('MSG_TXT_APP_DTLS') }}</h4>
    </div>
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_ID')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-label
            ref="textFieldMobileApplicationId"
            :label="objMobileAppMgmt.mobileApplicationId"
            :disabled="true"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_NM')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-label
            :label="objMobileAppMgmt.mobileApplicationName"
          />
        </div>
      </div>   
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_CATG')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-label
            ref="codeSelectMobileApplicationCategory"
            :label="objMobileAppMgmt.mobileApplicationCategoryName"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_TYPE_CD')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-label
            ref="codeSelectMobileApplicationType"
            :label="objMobileAppMgmt.mobileApplicationTypeName"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_BNDL_ID')"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-label
            :label="objMobileAppMgmt.bundleId"
          />
        </div>
      </div>
    </div>
    <div class="mrB20" />
    <div class="comm_title_wrap">
      <h4>{{ $t('MSG_TXT_APP_VER') }}</h4>
    </div>
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_VER_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationVersionId"
            v-model="objMobileAppVersion.mobileApplicationVersionId"
            maxlength="100"
            :disabled="true"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_STG_STS')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-code-select
            ref="codeSelectMobileApplicationStageCode"
            v-model="objMobileAppVersion.mobileApplicationStageCode"
            codeId="COD_MBL_APP_STG"
            :disabled="true"
          />
          <div class="comp_spacing"></div>
          <sui-custom-select
            ref="codeSelectMobileApplicationStateCode"
            v-model="objMobileAppVersion.mobileApplicationStateCode"
            :optionList="customStateOptionList"
            :disabled="!((flags.isUnpublished || flags.isPublished) && !isNew)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_VER_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-text-field
            ref="textFieldMobileApplicationVersionName"
            v-model="objMobileAppVersion.mobileApplicationVersionName"
            :disabled="!isNew && (flags.isReview || flags.isPublished || flags.isUnpublished || flags.isDeprecated)"
            maxlength="400"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_FRCD_VER')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-checkbox
            ref="forcedVersion"
            v-model="forcedVersion"
            :disabled="isNew || !flags.isPublished"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_DVC_TYPE')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-device-checkbox
            ref="deviceCheck"
            :value="objMobileAppVersion.deviceTypeBit"
            :disabled="!isNew && (flags.isReview || flags.isPublished || flags.isUnpublished ||flags.isDeprecated)"
          />
        </div>
      </div>
      <div class="row">
        <div v-if="!isAPK" class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_URL')"
            :required="true"
          />
        </div>
        <div  v-if="isAPK" class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_APK_FPATH')"
            :required="true"
          />
        </div>
        <div
          v-if="!isAPK"
          class="col-xs-11">
          <sui-text-field
            ref="textFieldapkExternalUrl"
            v-model="objMobileAppVersion.apkExternalUrl"
            maxlength="400"
            :disabled="!(flags.isDevelop || flags.isRejected || isNew)"
          />
        </div>
        <div v-if="isAPK" class="col-xs-5 ">
          <cmp-upload-dwnld-attach
            ref="fileAttacherAttachDocumentId"
            :pageId="contextPageId"
            :attachDocumentId="attachDocumentId"
            :showAddDeleteBtn="true"
            :attachGroupId="'ATG_CMX_APK_FILE'"
            :disabled="!(flags.isDevelop || flags.isRejected || isNew)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_VER_CNTN')"
          />
        </div>
        <div class="col-xs-11 ">
          <textarea
            ref="textFieldMobileApplicationVersionContent"
            v-model="objMobileAppVersion.mobileApplicationVersionContent"
            class="text_area"
            maxlength="2000"
            :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || isNew)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objMobileAppVersion.firstRegistrationDisplayLanguageId"
            :userId="objMobileAppVersion.firstRegistrationUserId"
            :loginId="objMobileAppVersion.firstRegistrationLoginId"
            :userName="objMobileAppVersion.firstRegistrationUserName"
            :userGlobalName="objMobileAppVersion.firstRegistrationUserGlobalName"
            :departmentName="objMobileAppVersion.firstRegistrationDepartmentName"
            :departmentEnglishName="objMobileAppVersion.firstRegistrationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          {{ objMobileAppVersion.firstRegistrationDTM }}
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objMobileAppVersion.finalModificationDisplayLanguageId"
            :userId="objMobileAppVersion.finalModificationUserId"
            :loginId="objMobileAppVersion.finalModificationLoginId"
            :userName="objMobileAppVersion.finalModificationUserName"
            :userGlobalName="objMobileAppVersion.finalModificationUserGlobalName"
            :departmentName="objMobileAppVersion.finalModificationDepartmentName"
            :departmentEnglishName="objMobileAppVersion.finalModificationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          {{ objMobileAppVersion.finalModificationDTM }}
        </div>
      </div>
    </div>    
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-if="(flags.isPortalManager || flags.isApplicationManager) && flags.followApprovalPath"
        type="button"
        class="comm_btn_border"
        :disabled="!(flags.isDevelop)"
        @click="onClickRequest"
      >
        {{ $t("MSG_BTN_RQS") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager && flags.followApprovalPath"
        type="button"
        class="comm_btn_border"
        :disabled="!(flags.isReview)"
        @click="onClickApprove"
      >
        {{ $t("MSG_TXT_APPR") }}
      </sui-button>
      <sui-button
        v-if="flags.followApprovalPath && flags.isPortalManager"
        type="button"
        class="comm_btn_border"
        :disabled="!(flags.isReview)"
        @click="onClickReject"
      >
        {{ $t("MSG_BTN_RJT") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
        type="button"
        class="comm_btn_border"
        :disabled="!((flags.isApproved && flags.followApprovalPath) || (!flags.followApprovalPath && flags.isDevelop))"
        @click="onClickPublish"
      >
        {{ $t("MSG_BTN_PBLS") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
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
const CODE_KEYS = ['COD_MBL_APP_STT'];
export default {
  name: 'PGE_CMX_00013_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowMobileAppMgmtData: {
      type: Object,
      required: false,
    },
    selectedGridRowMobileAppVersionData: {
      type: Object,
      required: false,
    },
    flags: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isNew : true,
      isAPK: true,
      attachDocumentId: '',
      optionList: {
        COD_MBL_APP_STT: [],
      },
      forcedVersion: false,
      objMobileAppMgmt: {
        moduleCode: '',
        subModuleCode: '',
        mobileApplicationId: '',
        mobileApplicationName: '',
        mobileApplicationEnglishName: '',
        mobileApplicationCategoryId: '',
        mobileApplicationCategoryName: '',
        mobileApplicationTypeCode: '',
        mobileApplicationTypeName: '',
        useYn: '',
        bundleId: '',
        imageFilePath: '',
        mobileApplicationDescription: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        firstRegistrationLoginId: '',
        firstRegistrationKnoxId: '',
        firstRegistrationUserName: '',
        firstRegistrationUserGlobalName: '',
        firstRegistrationDepartmentName: '',
        firstRegistrationDepartmentEnglishName: '',
        firstRegistrationDisplayLanguageId: '',
        finalModificationLoginId: '',
        finalModificationKnoxId: '',
        finalModificationUserName: '',
        finalModificationUserGlobalName: '',
        finalModificationDepartmentName: '',
        finalModificationDepartmentEnglishName: '',
        finalModificationDisplayLanguageId: '',
        searchCondition: '',
        searchText: '',
      },
      objMobileAppVersion: {
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
        mobileApplicationVersionName: '',
        mobileApplicationStageCode: '',
        mobileApplicationStage: '',
        mobileApplicationStateCode: '',
        mobileApplicationState: '',
        apkExternalUrl: '',
        apkFilePath: '',
        forcedVersionYn: 'N',
        mobileApplicationVersionContent: '',
        deviceTypeBit: '2',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        firstRegistrationLoginId: '',
        firstRegistrationKnoxId: '',
        firstRegistrationUserName: '',
        firstRegistrationUserGlobalName: '',
        firstRegistrationDepartmentName: '',
        firstRegistrationDepartmentEnglishName: '',
        firstRegistrationDisplayLanguageId: '',
        finalModificationLoginId: '',
        finalModificationKnoxId: '',
        finalModificationUserName: '',
        finalModificationUserGlobalName: '',
        finalModificationDepartmentName: '',
        finalModificationDepartmentEnglishName: '',
        finalModificationDisplayLanguageId: '',
      },
    };
  },
  computed: {
    customStateOptionList() {
      return this.optionList.COD_MBL_APP_STT.filter(item => {
        if (item.key.charAt(0) === this.objMobileAppVersion.mobileApplicationStageCode.charAt(0)) {
          return true;
        } 
        return false;
      });
    },
  },
  watch: {
    selectedGridRowMobileAppMgmtData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadMobileAppMgmt();
      } else {
        this.resetMobileAppMgmtTab();
      }
      //this.resetTab();
    },
    selectedGridRowMobileAppVersionData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadMobileAppVersion();
      } else {
        this.resetTab();
      }
    },
  },
  created() {
    this.loadCode();
  },  
  mounted() {},

  methods: {
    loadCode() {
      http.mergeCodeList(this.contextPageId, CODE_KEYS, this.optionList).then(() => {
      }).catch(() => {});
    },
    getVersionID() {
      if (!utils.isEmpty(this.selectedGridRowMobileAppMgmtData)) {
        const mobileApplicationId = this.selectedGridRowMobileAppMgmtData.mobileApplicationId;
        http.request(this.contextPageId, 'DTS_CMX_00048', {  
          path: {
            'mobile-application-id': mobileApplicationId,
          },
        }).then(res => {
          this.objMobileAppVersion.mobileApplicationVersionId = res.data.toString();
        });
      } else this.objMobileAppVersion.mobileApplicationId = '';
    },
    loadMobileAppMgmt() {
      if(this.selectedGridRowMobileAppMgmtData) {
        const mobileApplicationId = this.selectedGridRowMobileAppMgmtData.mobileApplicationId;
        if( !utils.isEmpty(mobileApplicationId)) {
          http.request(this.contextPageId, 'DTS_CMX_00028', {
            path: {
              'mobile-application-id': mobileApplicationId,
            },
          }).then(res => {
            this.objMobileAppMgmt = res.data;
            this.objMobileAppVersion.mobileApplicationId = this.objMobileAppMgmt.mobileApplicationId;
            if (this.objMobileAppMgmt.mobileApplicationTypeCode === '0') {
              this.isAPK = true;
            } else {
              this.isAPK = false;
            }
          })
        }
        this.resetTab();
      }
    },
    loadMobileAppVersion() {
      if(this.selectedGridRowMobileAppVersionData) {
        const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
        const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
        if(  !utils.isEmpty(mobileApplicationVersionId)) {
          http.request(this.contextPageId, 'DTS_CMX_00035', {  
            path: {
              'mobile-application-id': mobileApplicationId,
              'mobile-application-version-id': mobileApplicationVersionId,
            },
          }).then(res => {
            this.objMobileAppVersion = res.data;
            this.objMobileAppVersion.firstRegistrationDTM = utils.dateformatToClient(this.objMobileAppVersion.firstRegistrationDTM);
            this.objMobileAppVersion.finalModificationDTM = utils.dateformatToClient(this.objMobileAppVersion.finalModificationDTM);
            this.$refs.deviceCheck.setValue(this.objMobileAppVersion.deviceTypeBit);
            this.attachDocumentId = this.objMobileAppVersion.apkFilePath;
            this.forcedVersion = this.objMobileAppVersion.forcedVersionYn === 'Y';
            this.isNew = false;
          });
        }
      }
    },
    resetMobileAppMgmtTab() {
      this.objMobileAppMgmt.mobileApplicationId = '';
      this.objMobileAppMgmt.mobileApplicationName = '';
      this.objMobileAppMgmt.mobileApplicationEnglishName = '';
      this.objMobileAppMgmt.mobileApplicationCategoryId = '';
      this.objMobileAppMgmt.mobileApplicationCategoryName = '';
      this.objMobileAppMgmt.mobileApplicationTypeCode = '';
      this.objMobileAppMgmt.mobileApplicationTypeName = '';
      this.objMobileAppMgmt.bundleId = '';
      this.objMobileAppVersion.mobileApplicationVersionId = '';
      this.objMobileAppVersion.mobileApplicationVersionName = '';
      this.$refs.codeSelectMobileApplicationStageCode.reset();
      this.$refs.codeSelectMobileApplicationStateCode.reset();
      this.objMobileAppVersion.apkExternalUrl = '';
      this.objMobileAppVersion.apkFilePath = '';
      this.attachDocumentId = '';
      this.objMobileAppVersion.mobileApplicationVersionContent = '';
      //this.objMobileAppVersion.deviceTypeBit = 2;    
      this.$refs.deviceCheck.setValue(2);
      this.isNew = true;
    },
    mobileApplicationStateCodeOption() {
    },
    resetTab() {
      this.getVersionID();
      this.objMobileAppVersion.mobileApplicationVersionName = '';
      this.$refs.codeSelectMobileApplicationStageCode.reset();
      this.objMobileAppVersion.mobileApplicationStateCode = '00';
      this.objMobileAppVersion.mobileApplicationStage = '';
      this.objMobileAppVersion.mobileApplicationState = '';
      this.objMobileAppVersion.apkExternalUrl = '';
      this.objMobileAppVersion.apkFilePath = '';
      this.objMobileAppVersion.mobileApplicationVersionContent = '';
      this.objMobileAppVersion.deviceTypeBit = 2;
      this.objMobileAppVersion.firstRegistrationDTM = '';
      this.objMobileAppVersion.firstRegistrationUserId = '';
      this.objMobileAppVersion.finalModificationDTM  = '';
      this.objMobileAppVersion.finalModificationUserId = '';
      this.attachDocumentId = '';
      this.forcedVersion = false;
      this.objMobileAppVersion.forcedVersionYn = 'N';
      this.$refs.deviceCheck.setValue(2);
      this.$refs.fileAttacherAttachDocumentId.reset();
      this.$emit('on-click-search');
      this.isNew = true;
    },
    onClickNew() {
      this.$emit('onclickreset');
     this.resetTab();
    },
    onClickDelete() {
      this.$emit('on-click-delete');
    },
    onClickRequest() {
      this.$emit('on-click-request');
    },
    onClickApprove() {
      this.$emit('on-click-approve');
    },
    onClickReject() {
      this.$emit('on-click-reject');
    },
    onClickPublish() {
      this.$emit('on-click-publish');
    },
    saveAll() {
      if (this.forcedVersion) {
        this.objMobileAppVersion.forcedVersionYn = 'Y';
      } else {
        this.objMobileAppVersion.forcedVersionYn = 'N';
      }
      if (utils.isEmpty(this.objMobileAppVersion.mobileApplicationId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_ID')), null, () => {
          //this.$refs.textFieldMobileApplicationId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppVersion.mobileApplicationVersionId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_VER_ID')), null, () => {
          this.$refs.textFieldMobileApplicationVersionId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppVersion.mobileApplicationVersionName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_VER_NM')), null, () => {
          this.$refs.textFieldMobileApplicationVersionName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppVersion.mobileApplicationStageCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_STG_STS')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppVersion.mobileApplicationStateCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_STS')), null, () => {
        });
        return false;
      }
      this.objMobileAppVersion.deviceTypeBit = this.$refs.deviceCheck.getValue();
      if (utils.isEmpty(this.objMobileAppVersion.deviceTypeBit)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DVC_TYPE')), null, () => {
        });
        return false;
      }
      if (!this.isAPK && utils.isEmpty(this.objMobileAppVersion.apkExternalUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_URL')), null, () => {
          this.$refs.textFieldapkExternalUrl.setFocus();
        });
        return false;
      }
      
      if (this.isAPK && utils.isEmpty(this.$refs.fileAttacherAttachDocumentId.getAttachFileListInfo())) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APK_FPATH')), null, () => {
        });
        return false;
      }
      this.objMobileAppMgmt.deviceTypeBit = this.$refs.deviceCheck.getValue();

      if (this.flags.isRejected) {
        this.objMobileAppVersion.mobileApplicationStateCode = '00';
        this.objMobileAppVersion.mobileApplicationStageCode = '0';
      }
      if (this.flags.isUnpublished && this.objMobileAppVersion.mobileApplicationStateCode === '20') {
        this.$emit('on-click-publish');
        return true;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMX_00036' : 'DTS_CMX_00037';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objMobileAppVersion,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          if(this.isNew){
            this.$emit('onClickMobileAppVersionSearch');
            this.onClickNew();
          }else{
            this.$emit('onVersionUpdated',this.objMobileAppVersion.mobileApplicationVersionId);
          }
        });
      });
      return true;
    },
    onClickSave() {
      if (this.isAPK) {
        http.request(this.contextPageId, 'DTS_CMZ_00175', { 
          data: {
            attachDocumentId: this.attachDocumentId,
            attachGroupId: 'ATG_CMX_APK_FILE',
            attachItemId: 'ATG_CMX_APK_FILE_00001',
            attachDocumentTypeCode: 'N',
            moduleCode: 'CM',
            attachFileList: this.$refs.fileAttacherAttachDocumentId.getAttachFileListInfo(),
          },
        }).then(res => {
          this.objMobileAppVersion.apkFilePath = res.data.attachDocumentId;
          this.saveAll();
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      }
      else {
        this.saveAll();
      }
      
    },
    
  },
};
</script>

<style scoped>
</style>
