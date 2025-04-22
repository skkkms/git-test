<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_VER_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldVersionId"
            v-model="objMobilePortalManagement.versionId"
            maxlength="25"
            :readonly="true"
            :disabled="true"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_PORTL_TYP_CD')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobilePortalTypeCode"
            v-model="objMobilePortalManagement.mobilePortalTypeCode"
            maxlength="10"
            :readonly="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_VER_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldVersionName"
            v-model="objMobilePortalManagement.versionName"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_PORTL_FRCD_VER_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-checkbox
            v-model="forcedVersionBool" 
            :disabled="!(objMobilePortalManagement.mobilePortalStateCode=='02                  ' || objMobilePortalManagement.mobilePortalStateCode=='02')"
            @input="confirmMobilePortalForcedVersion"
          >
          </sui-checkbox>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_DLOAD_URL')"
            :required="true"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-text-field
            ref="textFieldDownloadUrl"
            v-model="objMobilePortalManagement.downloadUrl"
            maxlength="400"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_PORTL_STT_CD')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-code-select
            ref="codeSelectMobilePortalStateCode"
            v-model="objMobilePortalManagement.mobilePortalStateCode"
            codeId="COD_MBL_PORTL_STT_CD"
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
            v-model="objMobilePortalManagement.useYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objMobilePortalManagement.useYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_APK_FPATH')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <a 
            href="#"
            v-if="objMobilePortalManagement.apkfilePath!=''"
            class="apk-file-download-link"
            @click="downloadAPKFile()"
          >
              {{ objMobilePortalManagement.versionName }}
          </a>
          <sui-file-uploader
            ref="buttonFileUploader"
            :btnClass="'btn_innerTbl_border'"
            :btnLabel="$t('MSG_BTN_FILE_UPLOAD')"
            @change="uploadAPKFile"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="btn_innerTbl_border"
            @click="onClickApkDelete"
          >
            {{ $t("MSG_BTN_DEL") }}
          </sui-button>
        </div>
        <div class="col-xs-1 nodata" />
        <div class="col-xs-5 nodata" />
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_PORTL_CNTN')"
          />
        </div>
        <div class="col-xs-11 ">
          <textarea
            ref="textFieldMobilePortalContent"
            v-model="objMobilePortalManagement.mobilePortalContent"
            maxlength="1000"
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
            :displayLanguageId="objMobilePortalManagement.firstRegistrationDisplayLangId"
            :userId="objMobilePortalManagement.firstRegistrationUserId"
            :loginId="objMobilePortalManagement.firstRegistrationLoginId"
            :userName="objMobilePortalManagement.firstRegistrationUserName"
            :userGlobalName="objMobilePortalManagement.firstRegistrationUserGlobalName"
            :departmentName="objMobilePortalManagement.firstRegistrationDepartmentName"
            :departmentEnglishName="objMobilePortalManagement.firstRegistrationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <!-- <sui-text-field v-model="objMobilePortalManagement.firstRegistrationDTM" :readonly="true" /> -->
          {{ objMobilePortalManagement.firstRegistrationDTM }}
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
            :displayLanguageId="objMobilePortalManagement.finalModificationDisplayLangId"
            :userId="objMobilePortalManagement.finalModificationUserId"
            :loginId="objMobilePortalManagement.finalModificationLoginId"
            :userName="objMobilePortalManagement.finalModificationUserName"
            :userGlobalName="objMobilePortalManagement.finalModificationUserGlobalName"
            :departmentName="objMobilePortalManagement.finalModificationDepartmentName"
            :departmentEnglishName="objMobilePortalManagement.finalModificationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <!-- <sui-text-field v-model="objMobilePortalManagement.finalModificationDTM" :readonly="true" /> -->
          {{ objMobilePortalManagement.finalModificationDTM }}
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
import objectToNode from '../../../../../common/components/form/SuiFilterTreeview/utils/objectToNode';

export default {
  name: 'PGE_CMX_00010_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isNew: true,
      // isDuplicateCheck: false,
      forcedVersionBool: false,
      objMobilePortalManagement: {
        mobilePortalTypeCode: 'hybrid',
        versionId: '',
        versionName: '',
        downloadUrl: '',
        mobilePortalforcedVersionYn: 'N',
        mobilePortalStateCode: '00',
        useYn: 'N',
        deleteYn: '',
        apkfilePath: '',
        mobilePortalContent: '',
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
        this.loadMobilePortalManagement();
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
    loadMobilePortalManagement() {
      if(this.selectedGridRowData) {
        const versionId = this.selectedGridRowData.versionId;
        if(  !utils.isEmpty(versionId)) {
          http.request(this.contextPageId, 'DTS_CMX_00013', {  
            path: {
              'version-id': versionId,
            },
          }).then(res => {
            this.objMobilePortalManagement = res.data;
            this.isNew = false;
            this.objMobilePortalManagement.finalModificationDTM = this.formatDTM(this.objMobilePortalManagement.finalModificationDTM);
            this.objMobilePortalManagement.firstRegistrationDTM = this.formatDTM(this.objMobilePortalManagement.firstRegistrationDTM);
            this.forcedVersionBool = this.objMobilePortalManagement.mobilePortalforcedVersionYn == 'Y' ? true : false;

            // this.moduleData.moduleCode.key = this.objMobilePortalManagement.moduleCode;
            // this.moduleData.subModuleCode.key = this.objMobilePortalManagement.subModuleCode;

            if(this.objMobilePortalManagement.mobilePortalStateCode[1] == '0')
              this.objMobilePortalManagement.mobilePortalStateCode = '00';
            else if(this.objMobilePortalManagement.mobilePortalStateCode[1] == '1')
              this.objMobilePortalManagement.mobilePortalStateCode = '01';
            else if(this.objMobilePortalManagement.mobilePortalStateCode[1] == '2')
              this.objMobilePortalManagement.mobilePortalStateCode = '02';
            else if(this.objMobilePortalManagement.mobilePortalStateCode[1] == '3')
              this.objMobilePortalManagement.mobilePortalStateCode = '03';
            
          });
        }
      }
    },
    resetTab() {
      // this.$refs.codeSelectModuleCode.reset();     // Some error
      // this.$refs.codeSelectSubModuleCode.reset();       // Some error
      this.forcedVersionBool = false;
      // this.objMobilePortalManagement.moduleCode = 'CM';
      // this.objMobilePortalManagement.subModuleCode = 'CMX';
      this.objMobilePortalManagement.mobilePortalTypeCode = 'hybrid';
      this.objMobilePortalManagement.versionId = '';
      this.objMobilePortalManagement.versionName = '';
      this.objMobilePortalManagement.downloadUrl = '';
      this.objMobilePortalManagement.mobilePortalforcedVersionYn = 'N';
      // this.$refs.codeSelectMobilePortalStateCode.reset();      // some error
      this.objMobilePortalManagement.mobilePortalStateCode = '00';
      this.objMobilePortalManagement.useYn = 'N';
      this.objMobilePortalManagement.apkfilePath = '';
      this.objMobilePortalManagement.mobilePortalContent = '';    
      this.objMobilePortalManagement.firstRegistrationDTM = '';
      this.objMobilePortalManagement.firstRegistrationUserId = '';
      this.objMobilePortalManagement.firstRegistrationProgramId = '';
      this.objMobilePortalManagement.finalModificationDTM = '';
      this.objMobilePortalManagement.finalModificationUserId = '';
      this.objMobilePortalManagement.finalModificationProgramId = '';
      this.objMobilePortalManagement.deleteYn = '';
      
      // this.moduleData.moduleCode.key = 'CM';
      // this.moduleData.subModuleCode.key = 'CMX';

      this.isNew = true;
      // this.isDuplicateCheck = false;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onClickDelete() {
      
      const versionId = this.objMobilePortalManagement.versionId;    
      if(  !utils.isEmpty(versionId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMX_00016', {
            path: {
              'version-id': versionId,
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
      
      // this.objMobilePortalManagement.moduleCode = this.moduleData.moduleCode.key;
      // this.objMobilePortalManagement.subModuleCode = this.moduleData.subModuleCode.key;
      
      // if (utils.isEmpty(this.objMobilePortalManagement.moduleCode)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MDLE_CD')), null, () => {
      //   });
      //   return false;
      // }
      // if (utils.isEmpty(this.objMobilePortalManagement.subModuleCode)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SMDLE_CD')), null, () => {
      //   });
      //   return false;
      // }
      if (utils.isEmpty(this.objMobilePortalManagement.mobilePortalTypeCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_PORTL_TYP_CD')), null, () => {
          this.$refs.textFieldMobilePortalTypeCode.setFocus();
        });
        return false;
      }
      // if (utils.isEmpty(this.objMobilePortalManagement.versionId)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_VER_ID')), null, () => {
      //     this.$refs.textFieldVersionId.setFocus();
      //   });
      //   return false;
      // }
      if (utils.isEmpty(this.objMobilePortalManagement.versionName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_VER_NM')), null, () => {
          this.$refs.textFieldVersionName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobilePortalManagement.downloadUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DLOAD_URL')), null, () => {
          this.$refs.textFieldDownloadUrl.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobilePortalManagement.mobilePortalStateCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_PORTL_STT_CD')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobilePortalManagement.useYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USE_YN')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobilePortalManagement.apkfilePath)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APK_FPATH')), null, () => {
          // this.$refs.textFieldapkfilePath.setFocus();
        });
        return false;
      }
      // if(this.isNew && !this.isDuplicateCheck)
      // {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_SELT_DPCT_CH'), this.$t('MSG_TXT_APK_FPATH')), null, () => {
      //     this.$refs.textFieldVersionId.setFocus();
      //   });
      //   return false;
      // }

      if(this.forcedVersionBool && this.objMobilePortalManagement.mobilePortalStateCode[1]!='2') {
        utils.messageBox('warning', this.$t('MSG_ALT_USE_FRCD_VER'));
        this.objMobilePortalManagement.mobilePortalforcedVersionYn = 'N';
        this.forcedVersionBool = false;
        return false;
      }

      if(!this.forcedVersionBool) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          const dataServiceId = this.isNew ? 'DTS_CMX_00014' : 'DTS_CMX_00015';
            http.request(this.contextPageId, dataServiceId, {
            data: this.objMobilePortalManagement,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
            this.$emit('onClickSearch');
            this.onClickNew();
          });
        });
      }
      else {
        const versionName = this.objMobilePortalManagement.versionName;
        http.request(this.contextPageId, 'DTS_CMX_00019', {  
        }).then(res => {
          const resData = res.data;
          if(resData.count > 0) {
            utils.messageBox('warning', this.$t('MSG_ALT_IMG_FRCD_VER'), null, () => { });
          }
          else {
            utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
              const dataServiceId = this.isNew ? 'DTS_CMX_00014' : 'DTS_CMX_00015';
                http.request(this.contextPageId, dataServiceId, {
                data: this.objMobilePortalManagement,
              }).then(() => {
                utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
                this.$emit('onClickSearch');
                this.onClickNew();
              });
            });
          }
        });
      }
    },
    formatDTM(dtm) {
      const duplicateDtm = dtm;
      dtm = '';
      for(var i = 0; i < duplicateDtm.length; i++ )
      {
        if(dtm.length===4 || dtm.length===7) {
          dtm += '-';
        }
        else if(dtm.length===10) {
          dtm += ' ';
        }
        else if(dtm.length===13 || dtm.length===16) {
          dtm += ':';
        }
        dtm += duplicateDtm[i];
      }

      return dtm;
    },
    changeMobilePortalForcedVersion() {
      if(!this.forcedVersionBool) {
        this.objMobilePortalManagement.mobilePortalforcedVersionYn = 'N';
      }
      else {
        this.objMobilePortalManagement.mobilePortalforcedVersionYn = 'Y';
      }
    },
    confirmMobilePortalForcedVersion() {
      // console.log('Forced Version');
      // console.log(this.forcedVersionBool);
      if(this.forcedVersionBool) { 
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_MBL_PORTL_UPDTD_THIS_VER')), null, () => {        });
      }
      
      this.changeMobilePortalForcedVersion();
    },
    uploadAPKFile(file) {
      console.log('file');

      // validating if APK file
      const fileName = file[0].name
      const l = fileName.length;
      console.log(fileName[l-4]+fileName[l-3]+fileName[l-2]+fileName[l-1]);
      if((fileName[l-4]+fileName[l-3]+fileName[l-2]+fileName[l-1]) != '.apk') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_APK_FILE'), this.$t('MSG_TXT_VER_NM')), null, () => {});
        return false;
      }

      if (utils.isEmpty(file)) return;
      const formData = new FormData();
      formData.append('file', file[0]);
      http.request(this.contextPageId, 'DTS_CMZ_00040', {
        path: {
          'target-path': 'storage',
        },
        data: formData,
      }).then(res => {
        this.objMobilePortalManagement.apkfilePath = res.data.serverFileName;
      });
    },
    onClickApkDelete() {
      this.objMobilePortalManagement.apkfilePath = '';
    },
    downloadAPKFile() {
      http.request(this.contextPageId, 'DTS_CMZ_00068', {
        path: {
          'target-path': 'storage',
        },
        query: {
          serverFileName: this.objMobilePortalManagement.apkfilePath,
          originalFileName: '', // resD.originalFileName,
        },
        responseType: 'arraybuffer',
      }).then(res => {
        utils.downloadBlob(res, this.objMobilePortalManagement.versionName + '.apk');
      });
    },
  },
  
};
</script>

<style scoped>
  .apk-file-download-link {
    /* font-weight: bold; */
    color: #60A3EF;
    font-size: medium;
    width: 100%;
  }
</style>
