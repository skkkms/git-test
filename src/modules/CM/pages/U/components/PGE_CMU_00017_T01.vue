<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_WRD_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldWordId"
            v-model="objDictionary.wordId"
            maxlength="40"
            :readonly="readonlyFlag"
          />
          <div class="comp_spacing" />
          <sui-button
            v-if="!readonlyFlag"
            type="button"
            class="comm_btn_duplicate"
            @click="onClickDuplicationCheck"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_WRD_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldWordName"
            v-model="objDictionary.wordName"
            maxlength="40"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_WRD_NATU_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldWordNatureName"
            v-model="objDictionary.wordNatureName"
            maxlength="100"
          />
        </div>
        
        <div class="col-xs-1 nodata">
        </div>       
        <div class="col-xs-5 nodata">
        </div>
        
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objDictionary.r_dsplLngId"
            :loginId="objDictionary.r_loginId"
            :knoxId="objDictionary.r_knoxId"
            :userId="objDictionary.firstRegistrationUserId"
            :userName="objDictionary.r_userName"
            :userGlobalName="objDictionary.r_userGlobalName"
            :departmentName="objDictionary.r_departmentName"
            :departmentEnglishName="objDictionary.r_departmentEnglishName"
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
          <div class="comm_label">
            {{ objDictionary.firstRegistrationDTM | dateFormat }}
          </div>
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
            :displayLanguageId="objDictionary.m_dsplLngId"
            :loginId="objDictionary.m_loginId"
            :knoxId="objDictionary.m_knoxId"
            :userId="objDictionary.finalModificationUserId"
            :userName="objDictionary.m_userName"
            :userGlobalName="objDictionary.m_userGlobalName"
            :departmentName="objDictionary.m_departmentName"
            :departmentEnglishName="objDictionary.m_departmentEnglishName"
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
          <div class="comm_label">
            {{ objDictionary.finalModificationDTM | dateFormat }}
          </div>
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
  name: 'PGE_CMU_00017_T01', // eslint-disable-line vue/name-property-casing
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
      objDictionary: {
        wordId: '',
        wordName: '',
        wordNatureName: '',
        finalModificationUserId: '',
        finalModificationDTM: '',
        r_dsplLngId: '',
        r_loginId: '',
        r_knoxId: '',
        r_userName: '',
        r_userGlobalName: '',
        r_departmentName: '',
        r_departmentEnglishName: '',
        m_dsplLngId: '',
        m_loginId: '',
        m_knoxId: '',
        m_userName: '',
        m_userGlobalName: '',
        m_departmentName: '',
        m_departmentEnglishName: '',        
      },
    };
  },
  computed: {
    readonlyFlag() {
      return !this.isNew;
    },
  },
  watch: {
    selectedGridRowData() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        this.onClickNew();
      } else {
        this.loadDictionary();
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },  
  mounted() {},
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },
  methods: {
    loadDictionary() {
      if(this.selectedGridRowData) {
        const wordId = this.selectedGridRowData.wordId;
        if(  !utils.isEmpty(wordId)) {
          http.request(this.contextPageId, 'DTS_CMU_00080', {  
            path: {
              'word-id': wordId,
            },
          }).then(res => {
            this.objDictionary = this.setUserInfoFormat(res.data);
            this.isNew = false;
          });
        }
      }
    },  
    onClickNew() {
      // this.objDictionary.wordId = '';
      // this.objDictionary.wordName = '';
      // this.objDictionary.wordNatureName = '';    

      utils.forEach(this.objDictionary, (value, key) => {
        this.objDictionary[key] = '';
      });

      this.isNew = true;
    },
    onClickDelete() {
      
      const wordId = this.objDictionary.wordId;    
      if(  !utils.isEmpty(wordId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMU_00081', {
            path: {
              'word-id': wordId,
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
      
      if (utils.isEmpty(this.objDictionary.wordId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_WRD_ID')), null, () => {
          this.$refs.textFieldWordId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objDictionary.wordName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_WRD_NM')), null, () => {
          this.$refs.textFieldWordName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objDictionary.wordNatureName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_WRD_NATU_NM')), null, () => {
          this.$refs.textFieldWordNatureName.setFocus();
        });
        return false;
      }
      
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        //const dataServiceId = this.isNew ? 'DTS_XXX_XXXXX' : 'DTS_XXX_XXXXX';
        http.request(this.contextPageId, this.isNew ? 'DTS_CMU_00083': 'DTS_CMU_00082', {
          data: this.objDictionary,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(this.isNew){
              this.onClickNew();
              this.onSearchClick();
            }else{
              this.$emit('updateInfo', this.objDictionary.wordId);
            }
          });          
        });
      });
    },
    onClickDuplicationCheck() {
      const wordId = this.objDictionary.wordId;

      if (utils.isEmpty(this.objDictionary.wordId)) {
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO_ID')),
          null,
          () => {
            this.$refs.textFieldWordId.setFocus();
          });
        return false;
      }
      http.request(this.contextPageId, 'DTS_CMU_00080', {  
        path: {
          'word-id': wordId,
        },
      }).then(res => {
        if (res.data > 0) {
          this.isIdDuplicationCheck = false;
          utils.messageBox('error', this.$t('MSG_ALT_IMG_RGST_ID'), null, () => { // 이미 등록된 ID입니다.
            this.$refs.textFieldWordId.setFocus();
          });
        } else {
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
        }
      });
      return null;
    },
    setUserInfoFormat(list) {
      utils.forEach(list.firstRegistrationUserInfo, (value, key) => {
        utils.set(list, `r_${key}`, value);
      });
      utils.forEach(list.finalModificationUserInfo, (value, key) => {
        utils.set(list, `m_${key}`, value);
      });
      return list;
    },    
  },
};
</script>

<style scoped>
</style>
