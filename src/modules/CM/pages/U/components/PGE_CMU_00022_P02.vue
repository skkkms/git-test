<template>
  <div class="comm_popup_wrap_large">
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
          <sui-button
            type="button"
            shape="borderless"
            class="-page-header-title-location__shortcut-copy"

            @click="onClickShortcutCopyDSId"
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

      <div class="row">
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
            :label="$t('MSG_TXT_PRMSN')"
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


      <div
        v-show="isCommunicationTypeNormal"
        class="row"
      >
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DTSVC_URL')"
            :required="true"
          />
        </div>
        <div class="col-xs-11">
          <sui-text-field
            ref="dataServiceUniformresourcelocator"
            v-model.trim="dataServiceData.dataServiceUniformresourcelocator"
            :readonly="!isCommunicationTypeNormal"
            style="width: 100%;"
            placeholder=" /api/v1/"
            maxlength="250"
          />
        </div>
      </div>

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
          class="col-xs-1"
        >
          <sui-input-label
            :label="$t('MSG_TXT_EXTR_API_URL')"
          />
        </div>
        <div
          v-show="isCommunicationTypeExternal"
          class="col-xs-5"
        >
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
          class="col-xs-1"
        >
          <sui-input-label
            :label="$t('MSG_TXT_RFC_NM')"
          />
        </div>
        <div
          v-show="!isCommunicationTypeExternal"
          class="col-xs-5"
        >
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
            :label="$t('MSG_TXT_DESC')"
            :vertical="false"
          />
        </div>


        <div class="col-xs-11">
          <textarea
            v-model.trim="dataServiceData.dataServiceCntn"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button

          type="button"
          class="comm_btn_border"
          @click="onClickClose"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button

          type="button"
          class="comm_btn_border"
          @click="onNewClick"
        >
          {{ $t("MSG_BTN_NEW") }}
        </sui-button>

        <sui-button

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
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_CMU_00022',
  extends: BasePage,
  props: {
    dataServiceRegistered: {
      type: Array,
      default: () => {},
    },
    pageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      savetype: true,
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
      dataServiceID: '',
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
    dataServiceID(data) {
      if (data) {
        this.modMode = true;
        const selected = this.parentDataset.getSelected()[0];
        utils.forEach(this.dataServiceData, (value, key) => {
          if (utils.has(selected, key)) {
            this.dataServiceData[key] = selected[key] || '';
          }
        });
        this.saveSnapshot(this.makeSnapshot());
      } else {
        this.resetTab();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.parentDataset = utils.findDataset('dsDetail', this);
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
    },
    onClickClose() {
      this.$emit('exit');
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
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PRMSN'));
              return false;


            default:
              result.valid = true;
              result.message = '';
          }
        } else if (utils.isEqual(key, 'dataServiceUniformresourcelocator')) {
          if (utils.isEqual(value, this.originalURL) && utils.isEqual('N', data.dataServiceCommunicationTypeCode)) {
            result.valid = false;
            result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_URL'));
            result.focus = key;
            return false;
          }
        }
        return null;
      });
      return result;
    },

    saveAction(saveData) {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        if (this.savetype === true) {
          http.request(this.$options.name, 'DTS_CMU_00084', {
            data: saveData,
          }).then(res => {
            // eslint-disable-next-line prefer-destructuring
            this.dataServiceID = res.data[0];
            const dataParams = [];
            const dtsvcList = this.$props.dataServiceRegistered;
            const pageMappingId = this.$props.pageId;
            utils.forEach(dtsvcList, data => {
              dataParams.push({
                pageId: pageMappingId,
                dataServiceId: data.dataServiceIdentification,
              });
            });
            dataParams.push({
              pageId: pageMappingId,
              dataServiceId: this.dataServiceID,
            });

            http.request(this.$options.name, 'DTS_CMU_00015', {
              path: {
                'page-id': pageMappingId,
              },
              data: dataParams,
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
            }).catch(error => {
              console.log(error);
            });
          }).catch(error => {
            console.log(error);
          });
          this.savetype = false;
        } else {
          http.request(this.$options.name, 'DTS_CMU_00010', {
            path: {
              'data-service-id': this.dataServiceID,
            },
            data: saveData,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
          }).catch(error => {
            console.log(error);
          });
          this.onNewClick();
        }
      });
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
    onClickShortcutCopyDSId() {
      utils.copyToClipboard(this.dataServiceID);
      utils.toast(this.$t('MSG_ALT_COPY_TO_CLIPBOARD'));
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
