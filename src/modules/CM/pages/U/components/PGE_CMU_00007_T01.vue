<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_TYPE')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="selectComponentType"
            codeId="COD_CMPNT_TYPE"
            dataset="dsMain.componentTypeCode"
            :page-id="this.$options.name"
            :selected="componentData.selectedCodeValue.componentTypeCode"
            :disabled="visible"
            :defaultOption="'select'"
            @list-clicked="onTypeSelect"
          />
          <div class="comp_spacing" />
          <sui-module-submodule-select
            ref="selectModuleCode"
            class="dp_flex"
            :pageId="pageId"
            :selectedMd="componentData.selectedCodeValue.moduleCode"
            :selectedSmd="componentData.selectedCodeValue.subModuleCode"
            mdDataset="dsMain.moduleCode"
            smdDataset="dsMain.subModuleCode"
            :disabled="moduleSelectFlag"
            :defaultMdOption="defaultOption"
            :defaultSmdOption="defaultOption"
            @module-selected="moduleSelected"
            @submodule-selected="subModuleSelected"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CMPNT_ID')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model.trim="componentData.componentId"
            :vertical="false"
            :readonly="true"
            :placeholder="prefix"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CMPNT_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="componentName"
            v-model.trim="componentData.componentName"
            maxlength="100"
            class="width100"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CMPNT_NNM')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="componentNickName"
            v-model.trim="componentNickName"
            dataset="dsMain.componentNickName"
            maxlength="25"
          />
          <div class="comp_spacing" />
          <sui-button
            v-permission:read="pageId"
            type="button"
            class="comm_btn_duplicate"
            :disabled="nickNameCheckFlag"
            @click="onNickNameCheck"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CMPNT_FILE')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model.trim="componentData.componentFilePath"
            class="width100"
            placeholder="//components/"
            :readonly="true"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CMPNT_TAG')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="componentTag"
            v-model.trim="componentTag"
            dataset="dsMain.componentTag"
            maxlength="25"
          />
          <div class="comp_spacing" />
          <sui-button
            v-permission:read="pageId"
            type="button"
            class="comm_btn_duplicate"
            :disabled="tagCheckFlag"
            @click="onTagValidCheck"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="componentData.componentUseYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="componentData.componentUseYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1 nodata" />
        <div class="col-xs-5 nodata" />
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
            v-model="componentData.componentContent"
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
            {{ componentData.firstRegistrationUserId }}
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
            {{ componentData.firstRegistrationDTM }}
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
            {{ componentData.finalModificationUserId }}
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
            {{ componentData.finalModificationDTM }}
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <!-- <sui-button
          v-permission:download="pageId"
          type="button"
          class="comm_btn_border"
          @click="onCtsDownloadClick"
        >
          {{ $t("MSG_BTN_CTS_DOWNLOAD") }}
        </sui-button> -->
        <!-- <sui-file-uploader
          :btnLabel="$t('MSG_BTN_CTS_UPLOAD')"
          btnClass="comm_btn_border"
          @change="onCtsUploadClick"
        /> -->
        <sui-button
          v-permission:create="pageId"
          type="button"
          class="comm_btn_border"
          @click="onNewClick"
        >
          {{ $t('MSG_BTN_NEW') }}
        </sui-button>
        <sui-button
          v-permission:delete="pageId"
          type="button"
          class="comm_btn_border"
          @click="onDelClick"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:update="pageId"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
// 페이지 에서 사용하는 code 목록 기술
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00007_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    componentId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      componentData: {
        selectedCodeValue: {
          componentTypeCode: {
            label: '',
            key: '',
          },
          moduleCode: {
            label: '',
            key: '',
          },
          subModuleCode: {
            label: '',
            key: '',
          },
        },
        componentId: '',
        componentTag: '',
        componentName: '',
        componentNickName: '',
        componentFilePath: '',
        componentContent: '',
        componentUseYn: 'Y',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
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
      prefix: '',
      componentIDNum: '',
      visible: false,
      tagCheckFlag: false,
      componentTag: '',
      originalTag: '',
      changedTag: '',
      nickNameCheckFlag: false,
      componentNickName: '',
      originalNickName: '',
      changedNickName: '',
      defaultOption: 'select',
      modMode: false,
    };
  },
  computed: {
    defaultKey() {
      return utils.isEqual(this.defaultOption, 'select') ? ' ' : 'picked';
    },
    moduleSelectFlag() {
      return !utils.isEqual(this.componentData.selectedCodeValue.componentTypeCode.key, 'MOD') || this.visible;
    },
  },
  watch: {
    componentId(data) {
      if (data) {
        this.modMode = true;
        const selected = this.parentDataset.getSelected()[0];

        utils.forEach(this.componentData, (value, key) => {
          if (utils.has(selected, key)) {
            this.componentData[key] = selected[key] || '';
          }
        });
      
        const { moduleCode, subModuleCode,moduleName,subModuleName,componentTypeName,componentTypeCode } = selected;
        this.componentData.selectedCodeValue.moduleCode.key = moduleCode;
        this.componentData.selectedCodeValue.moduleCode.label=moduleName;
        this.componentData.selectedCodeValue.subModuleCode.key = subModuleCode;
        this.componentData.selectedCodeValue.subModuleCode.label = subModuleName;
        this.componentData.selectedCodeValue.componentTypeCode.key = componentTypeCode;
        this.componentData.selectedCodeValue.componentTypeCode.label = componentTypeName;
        this.visible = true;
        this.tagCheckFlag = true;
        this.originalTag = this.componentTag;
        this.changedTag = this.componentTag;
        this.nickNameCheckFlag = true;
        this.originalNickName = this.componentNickName;
        this.changedNickName = this.componentNickName;

        this.saveSnapshot(this.makeSnapshot());
      } else {
        this.onNewClick();
      }
    },
    componentTag(data) {
      if (this.originalTag !== data) {
        this.tagCheckFlag = false;
      }
    },
    componentNickName(data) {
      if (this.originalNickName !== data) {
        this.nickNameCheckFlag = false;
      }
    },
    moduleSelectFlag() {
      if (this.componentData.selectedCodeValue.componentTypeCode.key !== 'MOD') {
        this.componentData.selectedCodeValue.moduleCode.key = ' ';
        this.componentData.selectedCodeValue.subModuleCode.key = ' ';
      }
    },
  },
  mounted() {
    this.$nextTick(() => { // 부모에 dataset이 설정되는 시점이 부모의 mounted이기 때문에, nextTick으로 이용하여 가지고 와야함
      this.parentDataset = utils.findDataset('dsMain', this);
      this.saveSnapshot(this.makeSnapshot(true));
    });
  },
  methods: {
    makeSnapshot(mounted) {
      const data = {
        inputComponentTag: this.componentTag,
        inputComponentNickName: this.componentNickName,
      };
      utils.forEach(this.componentData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          if (mounted) {
            data.componentTypeCode = ' ';
            data.moduleCode = ' ';
            data.subModuleCode = ' ';
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
    initData() {
      utils.forEach(this.componentData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          this.$refs.selectComponentType.reset();
          this.$refs.selectModuleCode.selectMd(' ');
          // this.$refs.selectComponentUseYn.reset();
        } else if (utils.isEqual(key, 'componentUseYn')) {
          this.componentData[key] = 'Y';
        } else {
          this.componentData[key] = '';
        }
      });
    },
    onNewClick() {
      this.initData();
      // this.onFrmMdListClick();
      this.visible = false;
      this.tagCheckFlag = false;
      this.componentTag = '';
      this.originalTag = '';
      this.changedTag = '';
      this.nickNameCheckFlag = false;
      this.componentNickName = '';
      this.originalNickName = '';
      this.changedNickName = '';
      this.prefix = '';
      this.modMode = false;
      this.saveSnapshot(this.makeSnapshot());
      this.$emit('onGridClear');
    },
    onTagValidCheck() {
      if (!utils.isSmallLetterDash(this.componentTag)) {
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_SMALL_DASH'));
      } else {
        this.onTagCheck(this.componentTag);
      }
    },
    onTagCheck(tag) {
      if (!utils.isEmpty(tag)) {
        if (this.tagCheckFlag || tag === this.originalTag) {
          utils.messageBox('success', this.$t('MSG_ALT_VALID_TAG'), null, () => {
            this.componentData.componentTag = tag;
            this.tagCheckFlag = true;
          });
        } else {
          const queryParams = {
            componentTag: tag,
          };
          http.request(this.pageId, 'DTS_CMU_00037', {
            query: queryParams,
          }).then(res => {
            if (!res.data) {
              utils.messageBox('success', this.$t('MSG_ALT_USABLE_TAG'), null, () => {
                this.componentData.componentTag = tag;
                this.tagCheckFlag = true;
              });
            } else {
              utils.messageBox('error', this.$t('MSG_ALT_DUPLICATE_TAG'), null, () => {
                this.tagCheckFlag = false;
              });
            }
          }).catch(error => {
            console.log(error);
          });
        }
      }
    },
    onNickNameCheck() {
      if (!utils.isEmpty(this.componentNickName)) {
        if (this.nickNameCheckFlag || this.componentNickName === this.originalNickName) {
          const msg = utils.strFormat(this.$t('MSG_ALT_USE_PSBL'), this.$t('MSG_TXT_CMPNT_NNM'));
          utils.messageBox('success', msg, null, () => {
            this.componentData.componentNickName = this.componentNickName;
            this.nickNameCheckFlag = true;
          });
        } else {
          const queryParams = {
            componentNickName: this.componentNickName,
          };
          http.request(this.pageId, 'DTS_CMU_00068', {
            query: queryParams,
          }).then(res => {
            if (!res.data) {
              const msg = utils.strFormat(this.$t('MSG_ALT_USE_PSBL'), this.$t('MSG_TXT_CMPNT_NNM'));
              utils.messageBox('success', msg, null, () => {
                this.componentData.componentNickName = this.componentNickName;
                this.nickNameCheckFlag = true;
              });
            } else {
              utils.messageBox('error', this.$t('MSG_ALT_DUPLICATE_EXISTS'), null, () => {
                this.nickNameCheckFlag = false;
              });
            }
          }).catch(error => {
            console.log(error);
          });
        }
      } else {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CMPNT_NNM'));
        utils.messageBox('warning', msg);
      }
    },
    getSelectedCodeValue() {
      const data = {};
      utils.forEach(this.componentData.selectedCodeValue, (value, key) => {
        data[key] = utils.trim(value.key);
      });
      return data;
    },
    onSaveClick() {
      const saveData = utils.assign(this.getSelectedCodeValue(), this.componentData);
      if (!this.tagCheckFlag) {
        saveData.componentTag = '';
      }
      if (!this.nickNameCheckFlag) {
        saveData.componentNickName = '';
      }
      const result = this.validation(saveData);
      if (result.valid) {
        this.saveAction(saveData);
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
      let isBasicType = false;
      utils.forEach(data, (value, key) => {
        if (key === 'componentTypeCode') {
          isBasicType = (value === 'MOD') ? isBasicType : true;
        }
        if (utils.isEmpty(value)) {
          switch (key) {
            case 'componentTypeCode':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_TYPE'));
              result.valid = false;
              return false;
            case 'moduleCode':
              if (!isBasicType) {
                result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE'));
                result.valid = false;
                return false;
              }
              return null;
            case 'subModuleCode':
              if (!isBasicType) {
                result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
                result.valid = false;
                return false;
              }
              return null;
            case 'componentTag':
              if (!utils.isEmpty(this.componentTag) && !this.tagCheckFlag) {
                result.message = this.$t('MSG_ALT_SELT_DPCT_CHK');
                result.focus = key;
                result.valid = false;
                return false;
              }
              return null;
            case 'componentName':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CMPNT_NM'));
              result.focus = key;
              result.valid = false;
              return false;
            case 'componentNickName':
              if (!utils.isEmpty(this.componentNickName) && !this.nickNameCheckFlag) {
                result.message = this.$t('MSG_ALT_SELT_DPCT_CHK');
                result.focus = key;
              } else {
                result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CMPNT_NNM'));
                result.focus = key;
              }
              result.valid = false;
              return false;
            default:
              result.valid = true;
              result.message = '';
          }
        }
        return null;
      });
      return result;
    },
    saveAction(saveData) {
      const saveFlag = utils.isEmpty(saveData.componentId);
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        if (saveFlag) {
          http.request(this.pageId, 'DTS_CMU_00028', {
            data: saveData,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        } else {
          http.request(this.pageId, 'DTS_CMU_00029', {
            path: {
              'component-id': this.componentId,
            },
            data: saveData,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        }
      });
    },
    onDelClick() {
      if (utils.isEmpty(this.componentId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
          http.request(this.pageId, 'DTS_CMU_00030', {
            path: {
              'component-id': this.componentId,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        });
      }
    },
    onTypeSelect(value) {
      if (!utils.isEqual(value.key, this.defaultKey)) {
        this.prefixSetting(value.key);
        if (!this.modMode && value.key !== 'MOD') {
          this.componentData.componentFilePath = '/common/components/';
        }
      } else {
        this.prefix = '';
        this.componentData.componentFilePath = '//components/';
      }
    },
    moduleSelected(value) {
      if (!utils.isEqual(value.key, this.defaultKey)) {
        this.prefixSetting(value.key);
        if (!this.modMode) {
          this.componentData.componentFilePath = `/${value.key}/components/`;
        }
      }
    },
    subModuleSelected(value) {
      if (!utils.isEqual(value.key, this.defaultKey)) {
        this.prefixSetting(value.key);
      }
    },
    prefixSetting(key) {
      if (key === 'FOM' || key === 'LYT' || key === 'CEL') {
        this.prefix = utils.isEmpty(key) ? '' : `SUI_${key}`;
      } else if (key === 'MOD') {
        this.prefix = utils.isEmpty(key) ? '' : 'CMP_';
      } else {
        this.prefix = utils.isEmpty(key) ? '' : `CMP_${key}`;
      }
    },
    research() {
      this.onNewClick();
      this.$emit('research');
    },
    // onCtsDownloadClick() {
    //   if (!this.componentId) {
    //     utils.messageBox('warning', this.$t('MSG_ALT_DOWN_NO_DATA'));
    //   } else {
    //     http.request(this.pageId, 'DTS_CMU_00044', {
    //       path: {
    //         'component-id': this.componentId,
    //       },
    //       responseType: 'arraybuffer',
    //     }).then(res => {
    //       const fileName = `${this.componentId}.cts`;
    //       utils.downloadBlob(res, fileName);
    //     });
    //   }
    // },
    // onCtsUploadClick(file) {
    //   if (file[0]) {
    //     utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
    //       (/* ok */) => {
    //         const formData = new FormData();
    //         formData.append('file', file[0]);

    //         http.request(this.pageId, 'DTS_CMU_00043', {
    //           data: formData,
    //         }).then(() => {
    //           utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
    //         });
    //       },
    //       (/* cancel */) => {});
    //   }
    // },
  },
};
</script>
<style scoped>
</style>
