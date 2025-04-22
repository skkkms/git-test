<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select
            ref="selectModuleCode"
            class="dp_flex"
            :pageId="pageId"
            :selectedMd="dataServiceData.selectedCodeValue.moduleCode"
            :selectedSmd="dataServiceData.selectedCodeValue.subModuleCode"
            :disabled="visible"
            :defaultMdOption="defaultOption"
            :defaultSmdOption="defaultOption"
            @module-selected="moduleSelected"
            @submodule-selected="subModuleSelected"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DTSVC_ID')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model.trim="dataServiceID"
            :vertical="false"
            :readonly="true"
            :placeholder="prefix"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DTSVC_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="dataServiceName"
            v-model.trim="dataServiceData.dataServiceName"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_TYPE')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="dataServiceCommunicationTypeCode"
            :selected="dataServiceData.selectedCodeValue.dataServiceCommunicationTypeCode"
            :pageId="pageId"
            codeId="COD_DTSVC_CMNC_TYPE"
            :initialSelectedIndex="0"
          />
        </div>
      </div>
      <!-- 유형 일반 -->
      <div
        v-show="isCommunicationTypeNormal"
        class="row"
      >
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_METHOD')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="dataServiceTypeCode"
            :selected="dataServiceData.selectedCodeValue.dataServiceTypeCode"
            :pageId="pageId"
            codeId="COD_DTSVC_TYPE"
            :initialSelectedIndex="0"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DTSVC_URL')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="dataServiceUniformresourcelocator"
            v-model.trim="dataServiceData.dataServiceUniformresourcelocator"
            :readonly="!isCommunicationTypeNormal"
            style="width: 100%;"
            placeholder="/api/v1/"
            maxlength="250"
          />
        </div>
      </div>
      <!-- 유형 External, RFC Direct -->
      <div
        v-show="!isCommunicationTypeNormal"
        class="row"
      >
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SYS')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="dataServiceSystemCode"
            :selected="dataServiceData.selectedCodeValue.dataServiceSystemCode"
            :pageId="pageId"
            codeId="COD_DTSVC_SYS"
            :initialSelectedIndex="0"
          />
        </div>
        <div 
          v-show="isCommunicationTypeExternal"
          class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_EXTR_API_URL')"
          />
        </div>
        <div 
          v-show="isCommunicationTypeExternal"
          class="col-xs-5">
          <sui-code-select
            ref="dataServiceTypeCodeForExternal"
            :selected="dataServiceData.selectedCodeValue.dataServiceTypeCode"
            :pageId="pageId"
            codeId="COD_DTSVC_TYPE"
            :initialSelectedIndex="0"
            style="width:40%"
          />
          <div class="comp_spacing" />          
          <textarea
            v-model.trim="dataServiceData.dataServiceExternalUrl"
            rows="1"
            class="line-textarea"
            maxlength="250"
          />
        </div>        
        <div 
          v-show="!isCommunicationTypeExternal"
          class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RFC_NM')"
          />
        </div>
        <div 
          v-show="!isCommunicationTypeExternal"
          class="col-xs-5">
          <textarea
            v-model.trim="dataServiceData.dataServiceRfcName"
            rows="1"
            class="line-textarea"
            maxlength="100"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PRMSN_YN')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="dataServicePermissionCode"
            :selected="dataServiceData.selectedCodeValue.dataServicePermissionCode"
            :pageId="pageId"
            codeId="COD_DTSVC_PRMSN"
            :initialSelectedIndex="0"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SVC_ID')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <textarea
            v-model.trim="dataServiceData.dataServiceServiceId"
            rows="1"
            class="line-textarea"
            maxlength="100"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_STT')"
            :required="true"
            :vertical="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="dataServiceStateCode"
            :selected="dataServiceData.selectedCodeValue.dataServiceStateCode"
            :pageId="pageId"
            codeId="COD_DTSVC_STT"
            :initialSelectedIndex="0"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_BLCK_MSG')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <textarea
            v-model.trim="dataServiceData.dataServiceBlockCntn"
            rows="1"
            class="line-textarea"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_META_BSIC_YN')"
            :required="true"
            :vertical="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="dataServiceData.pageMetaBasicYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="dataServiceData.pageMetaBasicYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="dataServiceData.dataServiceUseYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="dataServiceData.dataServiceUseYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_EXPL')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-11">
          <sui-text-field
            v-model.trim="dataServiceData.dataServiceCntn"
            maxlength="1000"
          />
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
         <div class="comm_label">
            {{ dataServiceData.firstRegistrationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ dataServiceData.firstRegistrationDTM | dateFormat }}
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
         <div class="comm_label">
            {{ dataServiceData.finalModificationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ dataServiceData.finalModificationDTM | dateFormat }}
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:create="pageId"
          type="button"
          class="comm_btn_border"
          @click="onNewClick"
        >
          {{ $t("MSG_BTN_NEW") }}
        </sui-button>
        <sui-button
          v-permission:delete="pageId"
          type="button"
          class="comm_btn_border"
          @click="onDeleteClick"
        >
          {{ $t("MSG_BTN_DEL") }}
        </sui-button>
        <sui-button
          v-permission:update="pageId"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
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
  name: 'PGE_CMU_00002_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    dataServiceIdentification: {
      type: String,
      default: '',
    },
  },
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },
  data() {
    return {
      dataServiceData: {
        selectedCodeValue: {
          moduleCode: {
            label: '',
            key: '',
          },
          subModuleCode: {
            label: '',
            key: '',
          },
          dataServiceCommunicationTypeCode: {
            label: '',
            key: '',
          },
          dataServiceTypeCode: {
            label: '',
            key: '',
          },
          dataServiceSystemCode: {
            label: '',
            key: '',
          },
          dataServiceStateCode: {
            label: '',
            key: '',
          },
          dataServicePermissionCode: {
            label: '',
            key: '',
          },
        },
        dataServiceIdentification: '',
        dataServiceName: '',
        dataServiceUniformresourcelocator: '',
        dataServiceRfcName: '',
        dataServiceExternalUrl: '',
        dataServiceServiceId: '',
        dataServiceBlockCntn: '',
        dataServiceCntn: '',
        dataServiceUseYn: 'Y',
        pageMetaBasicYn: 'N',
        firstRegistrationDTM: '',
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
        finalModificationUserId: '',
        firstRegistrationUserId: '',
      },
      prefix: 'DTS_',
      dataServiceID: this.dataServiceIdentification,
      visible: false,
      originalURL: '',
      parentDataset: {},
      defaultOption: 'select',
      modMode: false,
    };
  },
  computed: {
    defaultKey() {
      return utils.isEqual(this.defaultOption, 'all') ? 'ALL' : ' ';
    },
    isCommunicationTypeNormal() {
      return utils.isEqual('N', this.dataServiceData.selectedCodeValue.dataServiceCommunicationTypeCode.key);
    },
    isCommunicationTypeExternal() {
      return utils.isEqual('E', this.dataServiceData.selectedCodeValue.dataServiceCommunicationTypeCode.key);
    },    
  },
  watch: {
    dataServiceIdentification(data) {
      if (data) {
        this.modMode = true;
        const selected = this.parentDataset.getSelected()[0];
        utils.forEach(this.dataServiceData, (value, key) => {
          if (utils.has(selected, key)) {
            this.dataServiceData[key] = selected[key] || '';
          }
        });
        this.dataServiceID = data;
        this.visible = true;
        const {
          moduleCode, subModuleCode, dataServiceCommunicationTypeCode, dataServiceTypeCode, dataServiceStateCode, dataServicePermissionCode, dataServiceSystemCode
        } = selected;
        this.dataServiceData.selectedCodeValue.moduleCode.key = moduleCode;
        this.dataServiceData.selectedCodeValue.subModuleCode.key = subModuleCode;
        this.dataServiceData.selectedCodeValue.dataServiceCommunicationTypeCode.key = dataServiceCommunicationTypeCode;
        this.dataServiceData.selectedCodeValue.dataServiceTypeCode.key = dataServiceTypeCode;
        this.dataServiceData.selectedCodeValue.dataServiceStateCode.key = dataServiceStateCode;
        this.dataServiceData.selectedCodeValue.dataServicePermissionCode.key = dataServicePermissionCode;
        this.dataServiceData.selectedCodeValue.dataServiceSystemCode.key = dataServiceSystemCode;

        this.saveSnapshot(this.makeSnapshot());
        this.$refs.selectModuleCode.selectMdSmd(moduleCode, subModuleCode);
      } else {
        this.resetTab();
      }
    },
    // isCommunicationTypeNormal(data) {
    //   // RFC 유형의 경우 메소드 -> POST, 데이터서비스URL -> /api/v1/common/rfc-direct로 고정한다.
    //   this.dataServiceData.dataServiceUniformresourcelocator = data ? '/api/v1/common/rfc-direct' : '';
    //   this.dataServiceData.selectedCodeValue.dataServiceTypeCode.key = data ? 'P' : 'G';
      
    //   if (!data) {
    //     this.dataServiceData.dataServiceRfcName = '';
    //   }
    // },
  },
  mounted() {
    this.$nextTick(() => { // 부모에 dataset이 설정되는 시점이 부모의 mounted이기 때문에, nextTick으로 이용하여 가지고 와야함
      this.parentDataset = utils.findDataset('dsMain', this);

      // this.saveSnapshot(this.makeSnapshot(true));
    });
  },
  methods: {
    makeSnapshot(mounted) {
      const data = {};
      utils.forEach(this.dataServiceData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          if (mounted) {
            data.moduleCode = ' ';
            data.subModuleCode = ' ';
            data.dataServiceTypeCode = 'G';
            data.dataServiceStateCode = 'N';
            data.dataServicePermissionCode = 'C';
            data.dataServiceSystemCode = 'LET';
          } else {
            utils.forEach(value, (codeValue, codekey) => {
              data[codekey] = codeValue.key;
            });
          }
        } else if (!utils.startsWith(key, 'r_') && !utils.startsWith(key, 'm_')) {
          data[key] = value;
        }
      });
      return data;
    },
    resetTab() {
      utils.forEach(this.dataServiceData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (codeValue, codekey) => {
            if (utils.startsWith(codekey, 'dataService')) {
              this.$refs[codekey].reset();
            } else {
              this.$refs.selectModuleCode.selectMd(' ');
            }
          });
        } else if (utils.isEqual(key, 'dataServiceUseYn')) {
          this.dataServiceData[key] = 'Y';
        } else if (utils.isEqual(key, 'pageMetaBasicYn')) {
          this.dataServiceData[key] = 'N';
        } else {
          this.dataServiceData[key] = '';
        }
      });
      this.visible = false;
      this.dataServiceID = '';
      this.prefix = 'DTS_';
      this.modMode = false;
      this.saveSnapshot(this.makeSnapshot());
    },
    onNewClick() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    getSelectedCodeValue() {
      const data = {};
      utils.forEach(this.dataServiceData.selectedCodeValue, (value, key) => {
        data[key] = utils.trim(value.key);
      });
      return data;
    },
    onSaveClick() {
      const saveData = utils.assign(this.getSelectedCodeValue(), this.dataServiceData);
      const result = this.validation(saveData);
      if (result.valid) {
        if (!utils.isUrlFormat(saveData.dataServiceUniformresourcelocator)) {
          utils.messageBox('warning', this.$t('MSG_ALT_CORRECT_URL'), this.$t('MSG_ALT_URL_RULE'), () => {
            this.$refs.dataServiceUniformresourcelocator.setFocus();
          });
        } else {
          this.saveAction(saveData);
        }
      } else {
        utils.messageBox('warning', result.message, null, () => {
          if (!utils.isEmpty(result.focus)) {
            this.$refs[result.focus].setFocus();
          }
        });
      }
    },
    validation(data) {
      const result = {
        valid: true,
        focus: '',
        message: '',
      };
      utils.forEach(data, (value, key) => {
        if (utils.isEmpty(value)) {
          result.valid = false;
          switch (key) {
            case 'moduleCode':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE'));
              return false;
            case 'subModuleCode':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
              return false;
            case 'dataServiceTypeCode':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_METHOD'));
              return false;
            case 'dataServiceName':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DTSVC_NM'));
              result.focus = key;
              return false;
            case 'dataServiceStateCode':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_STT'));
              return false;
            case 'dataServicePermissionCode':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PRMSN_YN'));
              return false;
            case 'pageMetaBasicYn':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_META_BSIC_YN'));
              return false;
            case 'dataServiceUseYn':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN'));
              return false;
            default:
              result.valid = true;
              result.message = '';
          }
        } else if (utils.isEqual(key, 'dataServiceUniformresourcelocator')) {
          if (utils.isEqual(value, this.originalURL)&&utils.isEqual('N',data.dataServiceCommunicationTypeCode)) {
            result.valid = false;
            result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_URL'));
            result.focus = key;
            return false;
          }
        } else if (data.dataServiceStateCode === 'B' && utils.isEmpty(utils.trim(data.dataServiceBlockCntn))) {
          result.valid = false;
          result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_BLCK_MSG'));
          return false;
        } 
        return null;
      });
      return result;
    },
    saveAction(saveData) {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        if (utils.isEmpty(saveData.dataServiceIdentification)) {
          http.request(this.pageId, 'DTS_CMU_00009', {
            data: saveData,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        } else {
          http.request(this.pageId, 'DTS_CMU_00010', {
            path: {
              'data-service-id': this.dataServiceIdentification,
            },
            data: saveData,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
              if(utils.isEmpty(saveData.dataServiceIdentification)){
                this.research();
              }else{
                this.$emit('updateInfo', saveData.dataServiceIdentification);
              }
            });            
          }).catch(error => {
            console.log(error);
          });
        }
      });
    },
    onDeleteClick() {
      if (utils.isEmpty(this.dataServiceIdentification)) {
        //utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
          http.request(this.pageId, 'DTS_CMU_00011', {
            path: {
              'data-service-id': this.dataServiceIdentification,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        });
      }
    },
    urlSetting(key) {
      switch (key) {
        case 'CM':
          this.originalURL = '/api/v1/common/';
          break;
        case 'CL':
          this.originalURL = '/api/v1/collaboration/';
          break;
        default:
          this.originalURL = '';
      }
      this.dataServiceData.dataServiceUniformresourcelocator = this.originalURL;
    },
    moduleSelected(value) {
      if (!utils.isEqual(value.key, this.defaultKey)) {
        this.prefixSetting(value.key);
        if (!this.modMode) {
          this.urlSetting(value.key);
        }
      }
    },
    subModuleSelected(value) {
      if (!utils.isEqual(value.key, this.defaultKey)) {
        this.prefixSetting(value.key);
      }
    },
    prefixSetting(key) {
      this.prefix = utils.isEmpty(key) ? '' : `DTS_${key}`;
    },
    research() {
      this.onNewClick();
      this.$emit('research');
    },
  },
};
</script>
<style scoped>
.line-textarea {
  padding: 0px 8px;
  line-height: 28px;
}
</style>
