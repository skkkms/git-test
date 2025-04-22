<template>
  <div>
    <div class="comm_popup_wrap_large">
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
              :label="$t('MSG_TXT_PORTL')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldMobilePortalId"
              v-model="objMobileAppMgmt.mobilePortalId"
              maxlength="100"
              :disabled="true"
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
            <sui-text-field
              ref="textFieldMobileApplicationId"
              v-model="objMobileAppMgmt.mobileApplicationId"
              maxlength="100"
              :disabled="isModification"
              @keyup="inputValid"
              @blur="inputValid"
            />
            <div class="comp_spacing" />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              :disabled="isModification"
              @click="onClickDuplicationCheck"
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
              :acceptExt="'.jpg, .png'"
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
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00013_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMX_00013',
    },
    mobileApplicationId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
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
        mobilePortalId: 'Mobile Portal',
        mobileApplicationId: '',
        mobileApplicationName: '',
        mobileApplicationEnglishName: '',
        mobileApplicationCategoryId: '',
        mobileApplicationCategoryName: '',
        mobileApplicationTypeCode: '',
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
  computed: {},
  watch: {},
  created() {
    this.customOptions = {
    };
  },
  mounted() {
    this.loadData();
    this.loadMobileAppCategoryList();
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    loadMobileAppCategoryList() {
      const dataParams = {
        useYn: this.queryData.useYn,
        deleteYn: 'N',
        searchCondition: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
      };
      http.request(this.contextPageId,'DTS_CMX_00003', {
        query: dataParams,
      }).then(res => {
        console.log('res.data');
        console.log(res.data);
        const result = res.data.map((item)=>{
          return {
            key:item.mobileApplicationCategoryId,
            label:item.mobileApplicationCategoryName
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
      }
      if (file[0].size > 50000000) {
        utils.messageBox('warning', this.$t('MSG_ALT_FILE_SZ_LMT'), null, () => {
        });
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
      http.request(this.pageId, 'DTS_CMX_00028', {
        path: {
          'mobile-application-id': this.objMobileAppMgmt.mobileApplicationId,
        },
      }).then(res => {
        this.objMobileAppMgmt = res.data;

      });
    },
    onSave() {
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
      if (utils.isEmpty(this.objMobileAppMgmt.mobilePortalId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL')), null, () => {
          this.$refs.textFieldMobilePortalId.setFocus();
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
          //this.$refs.textFieldMobileApplicationCategoryId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.mobileApplicationTypeCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_TYPE_CD')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.useYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USE_YN')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppMgmt.imageFilePath)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_LOGO')), null, () => {
        });
        return false;
      }
      // if (utils.isEmpty(this.objMobileAppMgmt.firstRegistrationDTM)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_FST_RGST_DTM')), null, () => {
      //   });
      //   return false;
      // }
      // if (utils.isEmpty(this.objMobileAppMgmt.firstRegistrationUserId)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_FST_RGST_USR_ID')), null, () => {
      //   });
      //   return false;
      // }
      // if (utils.isEmpty(this.objMobileAppMgmt.firstRegistrationProgramId)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_FST_RGST_PRG_ID')), null, () => {
      //     this.$refs.textFieldFirstRegistrationProgramId.setFocus();
      //   });
      //   return false;
      // }
      // if (utils.isEmpty(this.objMobileAppMgmt.finalModificationDTM)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_FNL_MDFC_DTM')), null, () => {
      //   });
      //   return false;
      // }
      // if (utils.isEmpty(this.objMobileAppMgmt.finalModificationUserId)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_FNL_MDFC_USR_ID')), null, () => {
      //   });
      //   return false;
      // }
      
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, runService, {
          data: this.objMobileAppMgmt,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.$emit('save');
        });
      });
      return true;
    },
    onClickDuplicationCheck() {
      const mobileApplicationNewId = this.objMobileAppMgmt.mobileApplicationId;// "MSG_"+this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key;
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
