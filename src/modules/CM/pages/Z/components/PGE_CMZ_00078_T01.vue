<template>
  <div>
    <div class="mrB20" />
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
            ref="tabConfigurationMdlSmdlSelect"
            class="dp_flex"
            :defaultMdOption="'select'"
            :defaultSmdOption="'select'"
            :disabled="disabled"
            :selectedMd="moduleCode"
            :selectedSmd="subModuleCode"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CNFG_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <cmp-mlng-editor
            ref="mlngEditor"
            :disabled="disabled"
            :pageId="contextPageId"
            :multiLanguageId="configurationMultiLanguageId"
            :readonly="false"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <!-- 환경설정ID -->
          <sui-input-label
            :label="$t('MSG_TXT_CNFG_ID')"
            required
          />
        </div>
        <div
          v-if="isNew"
          class="col-xs-5"
        >                    
          <div class="comm_label">{{ configurationIdPrefix }}</div>
          <div class="comp_spacing"></div>
          <sui-text-field
            ref="configurationIdTextField"
            v-model="configurationId"
            class="ime-mode-en"
            maxlength="92"
            :disabled="disabled"
            @blur="onBlurConfigIdInput"
            @input="onKeyUpConfigIdInput"
            @keyup.enter="onClickDuplicationCheck"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="disabled"
            @click="onClickDuplicationCheck"
          />
        </div>
        <div
          v-else
          class="col-xs-5"
        >
          <div class="comm_label">
            <p>{{ configurationId }}</p>
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PORTL_APPL_YN')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="portalApplyYn"
            value="Y"
          >
            {{ $t('MSG_TXT_YES') }}
          </sui-radio>
          <sui-radio
            v-model="portalApplyYn"
            value="N"
          >
            {{ $t('MSG_TXT_NO') }}
          </sui-radio>          
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_APPY_SCP')"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="tabConfigurationApplyScopeSelect"
            v-model="configurationApplyCode"
            codeId="COD_CNFG_APPY"
            defaultOption="select"
            :disabled="disabled"
          />
        </div> -->
        <div class="col-xs-1">
          <!-- 환경설정 유형 -->
          <sui-input-label
            :label="$t('MSG_TXT_CNFG_TYPE')"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="tabConfigurationTypeSelect"
            v-model="configurationTypeCode"
            codeId="COD_CNFG_TYPE"
            defaultOption="select"
            :disabled="disabled"
            @list-clicked="onConfigTypeSelectChange"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DEFAULT_VAL')"
            required
          />
        </div>
        <div class="col-xs-5">
          <!-- exclusive visibility unit 1 -->
          <sui-text-field
            v-show="configurationTypeCode == 'T'"
            ref="configurationTypeCodeTextField"
            v-model="configurationDefaultValue"
            maxlength="1000"
            :disabled="disabled"
          />
          <!-- exclusive visibility group 2 -->
          <div
            v-show="configurationTypeCode == 'C'"
            class="dp_flex"
          >
            <sui-text-field
              :value="`${configurationApplyCodeName}${configurationApplyCodeId === '' ? '':'(' + configurationApplyCodeId + ')'}`"
              readonly
            />
            <sui-button
              type="button"
              class="comm_btn_InputScr"
              @click="onClickCodeId"
            />
          </div>
          <sui-custom-select
            v-show="configurationTypeCode == 'C'"
            ref="tabConfigurationDefaultValueSelect"
            v-model="configurationDefaultValue"
            :option-list="configTypeCustomOptions"
          />
          <!-- exclusive visibility group 2 -->
          <sui-radio
            v-if="configurationTypeCode == 'F'"
            v-model="configurationDefaultValue"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-if="configurationTypeCode == 'F'"
            v-model="configurationDefaultValue"
            value="N"
          >
            No
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_EXPL')" />
        </div>
        <div class="col-xs-11">
          <textarea
            v-model="configurationContent"
            class="width100"
            style="border: 1px solid #d6d6d6;"
            maxlength="250"
            :disabled="disabled"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_FST_RGST_USR')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ selectedGridRowData.firstRegistrationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_RGST_DTM')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ dateformatToClient(selectedGridRowData.firstRegistrationDTM) }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDFC_USR')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ selectedGridRowData.finalModificationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDFC_DTM')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ dateformatToClient(selectedGridRowData.finalModificationDTM) }}
          </div>
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickConfigItemNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickConfigItemDel"
      >
        {{ $t('MSG_BTN_DEL') }}
      </sui-button>
      <sui-button
        v-permission:create="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickConfigItemSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00078_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowDataGroup: {
      type: Object,
      required: false,
      default() {
        return {
        };
      },
    },
    selectedGridRowData: {
      type: Object,
      required: false,
      default() {
        return {
        };
      },
    },
  },
  data() {
    return {
      alertFlag: true, // messagebox 연속 두번 뜨는 것 방지 flag
      configurationApplyCode: 'A',
      configurationApplyCodeId: '',
      configurationApplyCodeName: '',
      configurationContent: '',
      configurationDefaultValue: '',
      configurationId: '',
      configurationIdPassed: '',
      configurationMultiLanguageId: '',
      configurationTypeCode: '',
      configTypeCustomOptions: [],
      portalApplyYn: 'N',
      isNew: false,
      moduleCode: {
        key: ' ',
        label: '',
      },
      subModuleCode: {
        key: ' ',
        label: '',
      },
    };
  },
  computed: {
    disabled() {
      // return !this.isNew && utils.isEmpty(this.selectedGridRowData);
      return false
    },
    configurationIdPrefix() {
      return `CFG_${utils.isEmpty(utils.trim(this.subModuleCode.key)) ? utils.trim(this.moduleCode.key) : utils.trim(this.subModuleCode.key)}_`;
    },
  },
  watch: {
    selectedGridRowDataGroup: {
      deep: true,
      handler() {
        this.resetData();
      },
    },
    selectedGridRowData: {
      deep: true,
      immediate: true,
      handler() {
        this.loadDetail();
      },
    },
  },
  created() {
  },
  mounted() {},

  methods: {
    dateformatToClient(YYYYMMDDHHmmss) {
      return utils.dateformatToClient(YYYYMMDDHHmmss);
    },
    loadDetail() {
      if (!utils.isEmpty(this.selectedGridRowData)) {
        this.configurationApplyCode = this.selectedGridRowData.configurationApplyCode;
        this.configurationApplyCodeId = this.selectedGridRowData.configurationApplyCodeId;
        this.configurationApplyCodeName = this.selectedGridRowData.configurationApplyCodeName;
        this.configurationDefaultValue = this.selectedGridRowData.configurationDefaultValue;
        this.configurationId = this.selectedGridRowData.configurationId;
        this.configurationMultiLanguageId = this.selectedGridRowData.configurationMultiLanguageId;
        this.parentsConfigurationId = this.selectedGridRowData.parentsConfigurationId;
        this.configurationTypeCode = this.selectedGridRowData.configurationTypeCode;
        this.portalApplyYn = this.selectedGridRowData.portalApplyYn;
        this.isNew = false;
        this.moduleCode.key = this.selectedGridRowData.moduleCode;
        this.$nextTick(() => {
          this.subModuleCode.key = this.selectedGridRowData.subModuleCode;
        });
        this.configurationContent = this.selectedGridRowData.configurationContent;
        // this.$refs.tabConfigurationMdlSmdlSelect.selectMdSmd(this.selectedGridRowData.moduleCode.key, this.selectedGridRowData.subModuleCode.key);

        // 환경설정유형 코드값이 'C'이면 코드 조회를 해서 select 에 뿌려줘야 함
        if (this.configurationTypeCode === 'C' && this.configurationApplyCodeId !== '' && this.configurationDefaultValue !== '') {
          http.request(this.contextPageId, 'DTS_CMZ_00003', {
            query: {
              codeId: this.configurationApplyCodeId,
            },
          }).then(res => {
            const items = [];
            utils.forEach(res.data, obj => {
              items.push({ label: obj.codeName, key: obj.codeValidityValue });
            });
            this.configTypeCustomOptions = items;
          }).catch(error => {
            console.log(error);
          });
        }
      }
    },
    onBlurConfigIdInput() {
      // 환경유형 ID 변경 시 중복체크 여부 초기화
      if (!utils.isEqual(this.configurationId, this.configurationIdPassed)) {
        this.configurationIdPassed = '';
      }
    },
    /**
     * 중복체크
     */
    onClickDuplicationCheck() {
      this.configurationIdPassed = '';

      if (utils.isEmpty(utils.trim(this.moduleCode.key))) {
        // 모듈을 선택 해주세요.
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_MDLE'));
      } else if (utils.isEmpty(utils.trim(this.subModuleCode.key))) {
        // 서브모듈을 선택 해주세요.
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_SMDLE'));
      } else if (utils.isEmpty(this.configurationId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_INP_CNFG_ID'), null, () => {
          this.$refs.configurationIdTextField.setFocus();
        });
      } else {
        http.request(this.contextPageId, 'DTS_CMP_00089', {
          path: {
            'config-id': this.configurationIdPrefix + this.configurationId,
          },
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
          this.configurationIdPassed = this.configurationId;
        });
      }
    },
    onClickCodeId() {
      utils.openLayerPopup('PGE_CMZ_00003', this.onPagePopupClose, {
        pageInitialData: {},
        size: 'lg',
      });
    },
    onConfigTypeSelectChange(event) {
      this.configurationDefaultValue = '';
      switch (event.key) {
        case 'T':
          break;
        case 'F':
          this.configurationDefaultValue = 'N';
          break;
        case 'C':
          this.configurationApplyCodeName = '';
          this.configurationApplyCodeId = '';
          this.configTypeCustomOptions = [];
          this.$refs.tabConfigurationDefaultValueSelect.reset();
          break;
        default:
          break;
      }
    },
    /**
     * 환경유형 ID 입력 제한
     */
    onKeyUpConfigIdInput(inputValue) { // 영문 / 숫자 입력제한
      if (utils.isEngNum_(inputValue) || utils.isEmpty(inputValue)) {
        if (this.$refs.configurationIdTextField) {
          this.$refs.configurationIdTextField.originValue = inputValue;
        }
      } else if (this.alertFlag) {
        this.alertFlag = false;
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true;
          if (this.$refs.configurationIdTextField) {
            this.configurationId = this.$refs.configurationIdTextField.originValue;
            this.$refs.configurationIdTextField.setFocus();
          }
        });
      }
    },
    onPagePopupClose(objMaster) {
      if (objMaster !== 'undefined') {
        if (objMaster) {
          if (utils.isEqual(objMaster[0].codeId, 'COD_MDLE') === false) {
            // this.codeId = objMaster[0].codeId;
            // this.codeDisplayValue = `${objMaster[0].codeName} (${objMaster[0].codeId})`;
            this.configurationApplyCodeName = objMaster[0].codeName;
            this.configurationApplyCodeId = objMaster[0].codeId;

            http.request(this.contextPageId, 'DTS_CMZ_00003', {
              query: {
                codeId: this.configurationApplyCodeId,
              },
            })
              .then(res => {
                const items = [];
                utils.forEach(res.data, obj => {
                  items.push({ label: obj.codeName, key: obj.codeValidityValue });
                });

                if (items.length > 0) {
                  this.configurationDefaultValue = items[0].key;
                }

                this.configTypeCustomOptions = items;
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
            utils.messageBox('warning', msg, null);
          }
        }
      }
    },
    onClickConfigItemDel() {
      if (!this.isNew && !utils.isEmpty(this.configurationId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMP_00092', {
            path: {
              'configuration-id': this.configurationId,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'));
            this.$emit('deleted-configuration-item');
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickConfigItemNew() {
      if (utils.isEmpty(this.selectedGridRowDataGroup)) {
        // '유형을 추가 할 그룹을 선택하세요.'
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_GRP_ADD_CFGN'));
      } else {
        this.$emit('creating-configuration-item');
        this.isNew = true;
        this.configurationApplyCode = 'A';
        this.configurationApplyCodeId = '';
        this.configurationApplyCodeName = '';
        this.configurationDefaultValue = '';
        this.configurationId = '';
        this.configurationMultiLanguageId = '';
        this.$refs.mlngEditor.reset();
        this.configurationContent = '';
        this.configurationTypeCode = '';
        // this.hierarchyLevel = 2;
        // this.arrayalOrder = '';
        this.parentsConfigurationId = this.selectedGridRowDataGroup.parentsConfigurationId;
        this.folderYn = 'N';
        this.configurationScreenApplyYn = '';
        //this.$refs.tabConfigurationApplyScopeSelect.reset();
        this.$refs.tabConfigurationTypeSelect.reset();
        this.$refs.tabConfigurationMdlSmdlSelect.reset();
        this.$refs.tabConfigurationDefaultValueSelect.reset();
        // configurationIdPrefix = 'CFG_';
        // configTypeCustomOptions = [];
        this.moduleCode = {
          key: ' ',
          label: '',
        };
        this.subModuleCode = {
          key: ' ',
          label: '',
        };
      }
    },
    onClickConfigItemSave() {
      if (utils.isEmpty(utils.trim(this.moduleCode.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.subModuleCode.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SMDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.getLocalLangValue()))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CNFG_NM')), null, () => {
          this.$refs.mlngEditor.setFocusLocalTxtFld();
        });
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.getGlobalLangValue()))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CNFG_NM')), null, () => {
          this.$refs.mlngEditor.setFocusGlobalTxtFld();
        });
        return false;
      }
      if (this.isNew && utils.isEmpty(this.configurationId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CNFG_ID')), null, () => {
          this.$refs.configurationIdTextField.setFocus();
        });
        return false;
      }
      if (this.isNew && utils.isEmpty(this.configurationIdPassed)) {
        // 환경 설정 ID 중복 체크를 하지 않으셨습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_DPCT_CHK'), null, () => {
          this.$refs.configurationIdTextField.setFocus();
        });
        return false;
      }
      // if (utils.isEmpty(utils.trim(this.configurationApplyCode))) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APPY_SCP')));
      //   return false;
      // }
      if (utils.isEmpty(utils.trim(this.configurationTypeCode))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CNFG_TYPE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.configurationDefaultValue))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CNFG_DEFAULT_VAL'), null, () => {
          if (this.configurationTypeCode === 'T') {
            this.$refs.configurationTypeCodeTextField.setFocus();
          }
        }));
        return false;
      }
      const paramData = this.isNew ? {
        data: {
          configurationApplyCode: this.configurationApplyCode,
          configurationApplyCodeId: this.configurationApplyCodeId,
          configurationContent: this.configurationContent,
          configurationDefaultValue: this.configurationDefaultValue,
          configurationId: `${this.configurationIdPrefix}${this.configurationId}`,
          configurationMultiLanguageId: `${this.configurationIdPrefix}${this.configurationId}`,
          configurationName: this.$refs.mlngEditor.getLocalLangValue(),
          configurationTypeCode: this.configurationTypeCode,
          portalApplyYn: this.portalApplyYn,
          firstRegistrationProgramId: this.contextPageId,
          finalModificationProgramId: this.contextPageId,
          folderYn: 'N',
          hierarchyLevel: 2,
          moduleCode: this.moduleCode.key,
          multiLanguageList: this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal(), // 다국어
          parentsConfigurationId: this.selectedGridRowDataGroup.configurationId,
          subModuleCode: this.subModuleCode.key,
        },
      } : {
        data: {
          configurationApplyCode: this.configurationApplyCode,
          configurationApplyCodeId: this.configurationApplyCodeId,
          configurationContent: this.configurationContent,
          configurationDefaultValue: this.configurationDefaultValue,
          configurationId: this.configurationId,
          configurationMultiLanguageId: this.configurationMultiLanguageId,
          configurationName: this.$refs.mlngEditor.getLocalLangValue(),
          configurationTypeCode: this.configurationTypeCode,
          portalApplyYn: this.portalApplyYn,
          finalModificationProgramId: this.contextPageId,
          folderYn: this.folderYn,
          hierarchyLevel: 2,
          moduleCode: this.moduleCode.key,
          multiLanguageList: this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal(), // 다국어
          parentsConfigurationId: this.parentsConfigurationId,
          subModuleCode: this.subModuleCode.key,
        },
      };
      const dataServiceId = this.isNew ? 'DTS_CMP_00090' : 'DTS_CMP_00091';

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, dataServiceId, paramData).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if (this.isNew) {
              this.$emit('created-configuration-item');
            } else {
              this.$emit('updated-configuration-item');
            }
          });
        });
      });
    },
    resetData() {
      //this.$refs.tabConfigurationApplyScopeSelect.reset();
      this.$refs.tabConfigurationTypeSelect.reset();
      this.$refs.tabConfigurationMdlSmdlSelect.reset();
      this.$refs.tabConfigurationDefaultValueSelect.reset();
      this.configurationApplyCode = 'A';
      this.configurationApplyCodeId = '';
      this.configurationApplyCodeName = '';
      this.configurationDefaultValue = '';
      this.configurationId = '';
      this.configurationIdDupChecked = '';
      this.configurationMultiLanguageId = '';
      this.configurationContent = '';
      this.configurationTypeCode = '';
      this.parentsConfigurationId = '';
      this.folderYn = 'N';
      this.configurationScreenApplyYn = '';
      this.portalApplyYn = 'N';
      this.isNew = false;
      this.moduleCode = {
        key: ' ',
        label: '',
      };
      this.subModuleCode = {
        key: ' ',
        label: '',
      };
    },
  },
};
</script>

<style scoped>
</style>
