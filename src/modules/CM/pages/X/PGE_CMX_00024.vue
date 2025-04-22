<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="codeSelectModuleCode"
              class="dp_flex"
              :defaultMdOption="'select'"
              :defaultSmdOption="'select'"
              :disabledMd="true"
              :disabledSmd="true"
              :selectedMd="moduleData.moduleCode"
              :selectedSmd="moduleData.subModuleCode"
            />
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_BNDL_ID')"
              :required="objMobileAppMgmt.mobileApplicationTypeCode == '0'"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldMobileBundleId"
              v-model="objMobileAppMgmt.bundleId"
              maxlength="100"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_ID')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-input-label
              ref="prefixLabel"
              :class="isModification ? 'comm_label' : 'comm_label_1'"
              style="padding-right:10px;"
              :label="preMobileApplicationId"
              :vertical="false"
            />
            <sui-text-field
              v-if="!isModification"
              ref="textFieldMobileApplicationId"
              v-model="objMobileAppMgmt.mobileApplicationId"
              maxlength="92"
              :disabled="isModification"
              @keyup="inputValid"
              @blur="inputValid"
            />
            <div class="comp_spacing" />
            <sui-button
              v-if="!isModification"
              type="button"
              class="comm_btn_duplicate"
              :disabled="isModification"
              @click="onClickDuplicationCheck"
            />
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_USE')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-radio
              v-model="objMobileAppMgmt.useYn"
              value="Y"
            >
              {{ 'Yes' }}
            </sui-radio>
            <sui-radio
              v-model="objMobileAppMgmt.useYn"
              value="N"
            >
              {{ 'No' }}
            </sui-radio>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_NM')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldMobileApplicationName"
              v-model="objMobileAppMgmt.mobileApplicationName"
              maxlength="400"
            />
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_TYPE_NM')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-code-select
              ref="codeSelectMobileApplicationTypeCode"
              v-model="objMobileAppMgmt.mobileApplicationTypeCode"
              codeId="COD_MBL_APP_TYPE"
              :disabled="isModification"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_EN_NM')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldMobileApplicationEnglishName"
              v-model="objMobileAppMgmt.mobileApplicationEnglishName"
              maxlength="100"
            />
          </div><div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_CATG')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-custom-select
              v-model="objMobileAppMgmt.mobileApplicationCategoryId"
              :optionList="mobileApplicationCategoryList"
              :disabled="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_LOGO')"
              :required="true"
            />
          </div>
          <div class="col-xs-11 ">
            <cmp-image-viewer
              ref="imageViewer"
              :pageId="contextPageId"
              :filePath="objMobileAppMgmt.imageFilePath"
              :restrictThumbnailSize="true"
            />
            <sui-file-uploader
              :btnClass="'btn_innerTbl_border'"
              :btnLabel="$t('MSG_BTN_UPLOAD')"
              :acceptExt="'image/*'"
              @change="uploadImage"
            />
            <sui-button
              type="button"
              style="min-width:80px;"
              class="btn_innerTbl_border"
              @click="onClickImageDelete"
            >
              {{ $t("MSG_BTN_DEL") }}
            </sui-button>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_DESC')"
            />
          </div>
          <div class="col-xs-11">
            <textarea
              ref="textFieldMobileApplicationDescription"
              v-model="objMobileAppMgmt.mobileApplicationDescription"
              class="text_area"
              maxlength="1000"
            />
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
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
    </sui-page-contents>
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00024', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      mobileApplicationId: '',
      isIdDuplicationCheck: false,
      isModification: false,
      cacheMobileApplicationId: '',
      queryData: {},
      moduleData: {
        moduleCode: {
          label: '',
          key: 'CM',
        },
        subModuleCode: {
          label: '',
          key: 'CMX',
        },
      },
      mobileApplicationCategoryList: [],
      objMobileAppMgmt: {
        moduleCode: 'CM',
        subModuleCode: 'CMX',
        mobileApplicationId: '',
        mobileApplicationName: '',
        mobileApplicationEnglishName: '',
        mobileApplicationCategoryId: '',
        mobileApplicationCategoryName: '',
        mobileApplicationTypeCode: '',
        bundleId: '',
        mobileApplicationTypeName: '',
        useYn: 'Y',
        imageFilePath: '',
        mobileApplicationDescription: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
      },
    };
  },
  computed: {
    preMobileApplicationId() {
      return this.isModification ? this.objMobileAppMgmt.mobileApplicationId : 'MAP_';
    },
  },
  watch: {},
  created() {
    this.customOptions = {
    };
  },
  mounted() {
    this.mobileApplicationId = this.pageInitialData.mobileApplicationId;
    console.log(this.mobileApplicationId);
    this.loadData();
    this.loadMobileAppCategoryList();
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    loadMobileAppCategoryList() {
      const dataParams = {
        useYn: 'Y',
        deleteYn: 'N',
      };
      http.request(this.contextPageId, 'DTS_CMX_00003', {
        query: dataParams,
      }).then(res => {
        const result = res.data.map(item => {
          return {
            key: item.mobileApplicationCategoryId,
            label: item.mobileApplicationCategoryName,
          }
        });
        this.mobileApplicationCategoryList = result;
      });
    },
    onClickImageDelete() {
      this.objMobileAppMgmt.imageFilePath = '';
    },
    uploadImage(file) {
      if (utils.isEmpty(file)) return;
      if (file[0].type !== 'image/jpeg' && file[0].type !== 'image/png') {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_IMG_FILE'), null, () => {
        });
        return;
      }
      let size = parseInt(utils.getConfigurationValue('CFG_CMX_IMG_SZ_LMT'), 10); //It will return value in MB
      if (utils.isEmpty(size)) {
        size = 50;
      }
      size = size * 1024 * 1024;
      if (file[0].size > size) {
        utils.messageBox('warning', this.$t('MSG_ALT_FILE_SZ_LMT'), null, () => {
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', file[0]);
      http.request(this.contextPageId, 'DTS_CMZ_00040', {
        path: {
          'target-path': 'storage',
        },
        data: formData,
      }).then(res => {
        this.objMobileAppMgmt.imageFilePath = res.data.serverFileName;
      });
    },
    loadData() {
      if (utils.isEmpty(this.mobileApplicationId) === false) {
        this.selectMobileAppMgmt(this.mobileApplicationId);
      }
    },
    onLoad() {
      this.queryData = utils.getParameter(this, 'queryData');

    },
    onClickCancel() {
      this.$emit('close');
      this.closePagePopup(false);
    },
    onClickSave() {
      Promise.all([
      ]).then(() => {
        this.onSave();
      });  
    },
    selectMobileAppMgmt() {
      this.isModification = true;
      this.objMobileAppMgmt.mobileApplicationId = this.mobileApplicationId;
      http.request(this.contextPageId, 'DTS_CMX_00028', {
        path: {
          'mobile-application-id': this.objMobileAppMgmt.mobileApplicationId,
        },
      }).then(res => {
        this.objMobileAppMgmt = res.data;

      });
    },
    onSave() {
      // objMobileAppMgmt.bundleId
      if(utils.isEmpty(this.objMobileAppMgmt.bundleId) && this.objMobileAppMgmt.mobileApplicationTypeCode=='0') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_BNDL_ID')), null, () => {
        });
        return false;
      }

      let runService = 'DTS_CMX_00029';
      if (this.isModification) {
        runService = 'DTS_CMX_00030';
      }
      this.objMobileAppMgmt.moduleCode = this.moduleData.moduleCode.key;
      this.objMobileAppMgmt.subModuleCode = this.moduleData.subModuleCode.key;
      if (utils.isEmpty(this.objMobileAppMgmt.moduleCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MDLE_CD')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.subModuleCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SMDLE_CD')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.mobileApplicationId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_ID')), null, () => {
          this.$refs.textFieldMobileApplicationId.setFocus();
        });
        return false;
      }
      if (!this.isModification && (!this.isIdDuplicationCheck || (this.objMobileAppMgmt.mobileApplicationId !== this.cacheMobileApplicationId))) { // 중복 체크
        this.isIdDuplicationCheck = false;
        const msg = this.$t('MSG_ALT_SELT_DPCT_CHK');
        utils.messageBox('warning', msg);
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.mobileApplicationName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_NM')), null, () => {
          this.$refs.textFieldMobileApplicationName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.mobileApplicationEnglishName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_EN_NM')), null, () => {
          this.$refs.textFieldMobileApplicationEnglishName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.mobileApplicationCategoryId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_CATG')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.mobileApplicationTypeCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_TYPE_CD')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.useYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USE')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.imageFilePath)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_LOGO')), null, () => {
        });
        return false;
      }
      const dataParams = {};
      Object.assign(dataParams, this.objMobileAppMgmt);
      dataParams.mobileApplicationId = !this.isModification ? this.preMobileApplicationId + dataParams.mobileApplicationId : dataParams.mobileApplicationId;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, runService, {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.$emit('save');
          this.closePagePopup(true);
        });
      });
      return true;
    },
    onClickDuplicationCheck() {
      const mobileApplicationNewId = this.preMobileApplicationId + this.objMobileAppMgmt.mobileApplicationId;
      const dataParams = {
        mobileApplicationId: mobileApplicationNewId,
      };

      if (utils.isEmpty(this.objMobileAppMgmt.mobileApplicationId)) {
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_ID')),
          null,
          () => {
            this.$refs.textFieldMobileApplicationId.setFocus();
          });
        return false;
      }
      http.request(this.contextPageId, 'DTS_CMX_00033', {
        query: dataParams,
      }).then(res => {
        if (res.data > 0) {
          this.isIdDuplicationCheck = false;
          utils.messageBox('error', this.$t('MSG_ALT_IMG_RGST_ID'), null, () => { // 이미 등록된 ID입니다.
            this.$refs.textFieldMobileApplicationId.setFocus();
          });
        } else {
          this.isIdDuplicationCheck = true;
          this.cacheMobileApplicationId = utils.clone(this.objMobileAppMgmt.mobileApplicationId);
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
        }
      });

      return null;
    },
    inputValid() {
      if (this.objMobileAppMgmt.mobileApplicationId) {
        this.objMobileAppMgmt.mobileApplicationId = utils.toUpper(this.objMobileAppMgmt.mobileApplicationId.replace(/[^a-z0-9_]/gi, ''));
      }
    },
  },
};
</script>

<style scoped>
</style>
