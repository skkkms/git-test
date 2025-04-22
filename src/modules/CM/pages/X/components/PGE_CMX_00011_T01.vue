<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_CATG_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-input-label
            ref="categoryLabel"
            :class="readonlyFlag ? 'comm_label' : 'comm_label_1'"
            :label="preCategoryId"
            :vertical="false"
          />
          <sui-text-field
            v-if="!readonlyFlag"
            ref="textFieldMobileApplicationCategoryId"
            v-model="objMobileAppCategoryMgmt.mobileApplicationCategoryId"
            :readonly="readonlyFlag"
            @keyup="inputValid"
            maxlength="92"
          />
          <div class="comp_spacing" />
          <sui-button
            v-if="!readonlyFlag"
            type="button"
            class="comm_btn_duplicate"
            @click="onClickDuplicationCheck('ID')"
          />
        </div>        
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_APP_CNT')"
          />
        </div>
        <div class="col-xs-5 ">
          {{ objMobileAppCategoryMgmt.mobileApplicationCount }}
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_CATG_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationCategoryName"
            v-model="objMobileAppCategoryMgmt.mobileApplicationCategoryName"            
            maxlength="400"
            :trim="true"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="!isNewNameChanged"
            @click="onClickDuplicationCheck('NAME')"
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
            v-model="objMobileAppCategoryMgmt.useYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objMobileAppCategoryMgmt.useYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_APP_CNTN')"
          />
        </div>
        <div class="col-xs-11 ">
          <textarea
            ref="textFieldMobileApplicationContent"
            v-model="objMobileAppCategoryMgmt.mobileApplicationContent"
            class="text_area"
            maxlength="1000"
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
            :displayLanguageId="objMobileAppCategoryMgmt.firstRegistrationDisplayLangId"
            :userId="objMobileAppCategoryMgmt.firstRegistrationUserId"
            :loginId="objMobileAppCategoryMgmt.firstRegistrationLoginId"
            :userName="objMobileAppCategoryMgmt.firstRegistrationUserName"
            :userGlobalName="objMobileAppCategoryMgmt.firstRegistrationUserGlobalName"
            :departmentName="objMobileAppCategoryMgmt.firstRegistrationDepartmentName"
            :departmentEnglishName="objMobileAppCategoryMgmt.firstRegistrationDepartmentEnglishName"
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
          {{ objMobileAppCategoryMgmt.firstRegistrationDTM }}
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
            :displayLanguageId="objMobileAppCategoryMgmt.finalModificationDisplayLangId"
            :userId="objMobileAppCategoryMgmt.finalModificationUserId"
            :loginId="objMobileAppCategoryMgmt.finalModificationLoginId"
            :userName="objMobileAppCategoryMgmt.finalModificationUserName"
            :userGlobalName="objMobileAppCategoryMgmt.finalModificationUserGlobalName"
            :departmentName="objMobileAppCategoryMgmt.finalModificationDepartmentName"
            :departmentEnglishName="objMobileAppCategoryMgmt.finalModificationDepartmentEnglishName"
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
          {{ objMobileAppCategoryMgmt.finalModificationDTM }}          
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
  name: 'PGE_CMX_00011_T01', // eslint-disable-line vue/name-property-casing
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
      isDeleted: false,
      objMobileAppCategoryMgmt: {
        mobileApplicationCategoryId: '',
        mobileApplicationCategoryName: '',
        mobileApplicationCount: '0',
        arrayalOrder: '',
        mobileApplicationContent: '',
        useYn: 'Y',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        searchCondition: '',
        searchText: '',
      },
      readonlyFlag: false,
      isIdDuplicationCheck: false,
      isNameDuplicationCheck: false,
    };
  },
  computed: {
    preCategoryId() {      
      return this.readonlyFlag ? this.objMobileAppCategoryMgmt.mobileApplicationCategoryId : "MAC_";
    } ,
    isNewNameChanged () {
      return this.objMobileAppCategoryMgmt.mobileApplicationCategoryName !== this.selectedGridRowData.mobileApplicationCategoryName;
    }
  },
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadMobileAppCategoryMgmt();
      } else {
        this.resetTab();
      }
    },
    'objMobileAppCategoryMgmt.mobileApplicationCategoryName'() {
      this.isNameDuplicationCheck = false;
    },
    'objMobileAppCategoryMgmt.mobileApplicationCategoryId'() {
      this.isIdDuplicationCheck = false;
    }
  },
  created() {
    this.customOptions = {
    };
  },  
  mounted() {},

  methods: {
    loadMobileAppCategoryMgmt() {
      if(this.selectedGridRowData) {
        const mobileApplicationCategoryId = this.selectedGridRowData.mobileApplicationCategoryId;
        if(  !utils.isEmpty(mobileApplicationCategoryId)) {
          http.request(this.contextPageId, 'DTS_CMX_00004', {  
            path: {
              'mobile-application-category-id': mobileApplicationCategoryId,
            },
          }).then(res => {
            this.objMobileAppCategoryMgmt = res.data;
            this.objMobileAppCategoryMgmt.firstRegistrationDTM = utils.dateformatToClient(this.objMobileAppCategoryMgmt.firstRegistrationDTM);
            this.objMobileAppCategoryMgmt.finalModificationDTM = utils.dateformatToClient(this.objMobileAppCategoryMgmt.finalModificationDTM);
            this.isNew = false;
            this.isDeleted = this.objMobileAppCategoryMgmt.deleteYn === 'Y';
            this.readonlyFlag = true;
            this.isIdDuplicationCheck = true;
          });
        }
      }
    },
    resetTab() {
      utils.forEach(this.objMobileAppCategoryMgmt, (value, key) => {
        this.objMobileAppCategoryMgmt[key] = '';
      });
      this.objMobileAppCategoryMgmt.mobileApplicationCount = '0';
      this.objMobileAppCategoryMgmt.useYn = 'Y';
      this.readonlyFlag = false;
      this.isNew = true;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
      this.isIdDuplicationCheck = false;
      this.isNameDuplicationCheck = false;
    },
    onClickDelete() {
      if(this.objMobileAppCategoryMgmt.mobileApplicationCount > 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_CANT_DEL_CATG'));
        return false;
      }
      
      // console.log('isNew');
      // console.log(this.isNew);
      // console.log('readonlyFlag');
      // console.log(this.readonlyFlag);

      if(this.isNew) {
        // utils.messageBox('warning', this.$t('MSG_ALT_CANT_DEL_CATG'));
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }

      const mobileApplicationCategoryId = this.objMobileAppCategoryMgmt.mobileApplicationCategoryId;
      if(  !utils.isEmpty(mobileApplicationCategoryId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_DEL_APP_CATG'), this.$t('MSG_ALT_DEL_CATG_SUB'), () => {          
          http.request(this.contextPageId, 'DTS_CMX_00007', {
            path: {
              'mobile-application-category-id': mobileApplicationCategoryId,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'), this.$t('MSG_ALT_APP_CATG_DEL_DONE'));
            this.$emit('onClickSearch');
            this.onClickNew();
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickSave() {
      
      if (utils.isEmpty(this.objMobileAppCategoryMgmt.mobileApplicationCategoryId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CATG_ID')), null, () => {
          this.$refs.textFieldMobileApplicationCategoryId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppCategoryMgmt.mobileApplicationCategoryName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CATG_NM')), null, () => {
          this.$refs.textFieldMobileApplicationCategoryName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppCategoryMgmt.useYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USE_YN')), null, () => {
        });
        return false;
      }
      if ((this.isNew && (!this.isIdDuplicationCheck || !this.isNameDuplicationCheck)) || (this.isNewNameChanged && !this.isNameDuplicationCheck)) {
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_DPCT_CHK'));
        return false;
      }


      let dataParams = {};
      Object.assign(dataParams, this.objMobileAppCategoryMgmt)
      dataParams.mobileApplicationCategoryId = this.isNew ? this.preCategoryId + dataParams.mobileApplicationCategoryId : dataParams.mobileApplicationCategoryId;
      
      utils.messageBox('confirm', this.$t('MSG_ALT_SAVE_APP_CATG'), this.$t('MSG_ALT_SAVE_CATG_SUB'), () => {
        const dataServiceId = this.isNew ? 'DTS_CMX_00005' : 'DTS_CMX_00006';
          http.request(this.contextPageId, dataServiceId, {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(!this.selectedGridRowData){
              this.$emit('onClickSearch');
            }else{
              this.$emit('updateInfo', dataParams.mobileApplicationCategoryId);
            }
          });          
        });
      });
    },
    onClickDuplicationCheck(duplicateType) {
      let isID = duplicateType === 'ID';
      let newCatgID = this.preCategoryId + this.objMobileAppCategoryMgmt.mobileApplicationCategoryId;
      let searchText = isID ? newCatgID : this.objMobileAppCategoryMgmt.mobileApplicationCategoryName;
      let searchCondition = isID ? 'MBL_APP_CATG_ID' : 'MBL_APP_CATG_NM';
      if (utils.isEmpty(isID ? this.objMobileAppCategoryMgmt.mobileApplicationCategoryId : this.objMobileAppCategoryMgmt.mobileApplicationCategoryName)) {
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t(isID ? 'MSG_TXT_CATG_ID' : 'MSG_TXT_CATG_NM')),
          null,
          () => {
            isID ? this.$refs.textFieldMobileApplicationCategoryId.setFocus(): this.$refs.textFieldMobileApplicationCategoryName.setFocus();
          });
        return false;
      }
      
      const dataParams = {
          searchCondition: searchCondition,
          searchText: searchText,
        };

          http.request(this.contextPageId, 'DTS_CMX_00008', {  
        query: dataParams,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox('error', this.$t(isID ? 'MSG_ALT_IMG_RGST_ID' : 'MSG_ALT_IMG_RGST_NM'), null, () => {
            isID ? this.$refs.textFieldMobileApplicationCategoryId.setFocus(): this.$refs.textFieldMobileApplicationCategoryName.setFocus();
          });
        } else {          
          utils.messageBox('success', this.$t(isID ? 'MSG_ALT_USE_PSBL_ID' : 'MSG_ALT_USE_PSBL_NM'));
          isID ? this.isIdDuplicationCheck = true : this.isNameDuplicationCheck = true;
        }    
      });

      return null;
    },
    inputValid() {
      if (this.objMobileAppCategoryMgmt.mobileApplicationCategoryId) {
        this.objMobileAppCategoryMgmt.mobileApplicationCategoryId = utils.toUpper(this.objMobileAppCategoryMgmt.mobileApplicationCategoryId.replace(/[^a-z0-9_]/gi, ''));
      }
    },
  },
};
</script>

<style scoped>
.comm_label_1 {
    width: 200px;
    text-align: center;
  }
</style>
