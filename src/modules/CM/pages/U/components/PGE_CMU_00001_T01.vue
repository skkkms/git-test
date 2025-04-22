<template>
  <div>
    <div class="mrT25" />
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
            ref="smCombotab1"
            class="dp_flex"
            mdDataset="dsMain.moduleCode"
            smdDataset="dsMain.subModuleCode"
            :pageId="pageId"
            :selectedMd="pageData.selectedCodeValue.moduleCode"
            :selectedSmd="pageData.selectedCodeValue.subModuleCode"
            :disabled="modSelDisabled"
            :defaultMdOption="'select'"
            :defaultSmdOption="'select'"
            @md-list-clicked="onFrmMdListClick"
            @smd-list-clicked="onFrmSmdListClick"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_ID')"
            :required="true"
            :vertical="false"
            :readonly="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="pageData.pageId"
            :placeholder="pageIdPrefix"
            :readonly="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_NM')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="pageName"
            v-model="pageData.pageName"
            maxlength="100"
            :trim="true"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_NNM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model.trim="inputNickName"
            maxlength="100"
          />
          <div class="comp_spacing" />
          <sui-button
            v-permission:read="pageId"
            type="button"
            class="comm_btn_duplicate"
            :disabled="!nickNameChange"
            @click="onNickNameValidCheck"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_UE_NM')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="codPageUe"
            dataset="dsMain.pageUseCode"
            :selected="pageData.selectedCodeValue.pageUseCode"
            :pageId="pageId"
            codeId="COD_PAGE_UE"
            :initialSelectedIndex="0"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_TYPE')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="codPageType"
            dataset="dsMain.pageTypeCode"
            :selected="pageData.selectedCodeValue.pageTypeCode"
            :pageId="pageId"
            codeId="COD_PAGE_TYPE"
            :initialSelectedIndex="0"
            class="width40"
            @list-clicked="onTypeSelect"
          />
          <div class="comp_spacing" />
          <sui-text-field
            v-model="pageData.linkPageName"
            maxlength="100"
            :readonly="true"
            :disabled="true"
            class="width60"
          />
          <sui-button
            v-permission:read="pageId"
            type="button"
            class="comm_btn_InputScr"
            :disabled="pageTypeFlag"
            @click="onPageSelectClick"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MSG_RESO')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="pageTitleMessageResourceId"
            v-model="pageData.pageTitleMessageResourceId"
            maxlength="100"
            :trim="true"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_FILE')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ (pageData.linkPageId && pageData.linkPageId.trim() != '') ? `/${pageData.linkPageId.substr(4, 2)}/pages/${pageData.linkPageId.charAt(6)}/${pageData.linkPageId}`: pageData.pageDestinationValue }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PRD_YN')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="pageData.pageUsePriodYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="pageData.pageUsePriodYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_USE_PRD')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <ur-range-picker
            ref="rangePicker"
            v-model="pageData.periodDTR"
            :disabled="pageUsePriodFlag"
            oneInputMode
            init="today"
            :inputType=this.userDateFormat
            :modelType=this.userDateFormat
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_STT')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="codPageStt"
            dataset="dsMain.pageStatusCode"
            :selected="pageData.selectedCodeValue.pageStatusCode"
            :pageId="pageId"
            codeId="COD_PAGE_STT"
            :initialSelectedIndex="1"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_BLCK_MSG')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <textarea
            v-model="pageData.pageBlockContent"
            rows="1"
            class="line-textarea"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_POPU_YN')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="pageData.pagePopupYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="pageData.pagePopupYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_POPU_OPTN')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="pageData.pagePopupOptionValue"
            style="width: 100%;"
            maxlength="100"
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
            v-model="pageData.pageUseYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="pageData.pageUseYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div
          v-if="deviceApplyYn"
          class="col-xs-1"
        >
          <sui-input-label :label="$t('MSG_TXT_DVC_TYPE')" :required="true" :vertical="false"></sui-input-label>
        </div>
        <div
          v-if="deviceApplyYn"
          class="col-xs-5"
        >
          <sui-device-checkbox
            ref="deviceCheck"
            :value="pageData.deviceTypeValue"
          />          
        </div>
        <div v-if="!deviceApplyYn" class="col-xs-1 nodata" />
        <div v-if="!deviceApplyYn" class="col-xs-5 nodata" />
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
            v-model="pageData.pageContent"
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
          <div class="comm_label">
            {{ pageData.firstRegistrationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ pageData.firstRegistrationDTM | dateFormat }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ pageData.finalModificationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ pageData.finalModificationDTM | dateFormat }}
          </div>
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
        :disabled="checkMetaSave"
        @click="onDeleteClick"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        :disabled="checkMetaSave"
        @click="onSaveClick"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00001_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedPageId: {
      type: String,
      default: '',
    },
    deviceApplyYn: {
      type: Boolean,
      default: false,
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
      file: '',
      modSelDisabled: false,
      frmInit: {
        moduleCode: '',
        subModuleCode: '',
        pageId: '',
        pageDestinationValue: '',
        pageName: '',
        pageTitleMessageResourceId: '',
        pageTypeCode: '',
        pageUseCode: '',
        pageBlockContent: '',
        pageUsePriodStartDatetime: '',
        pageUsePriodFinishDatetime: '',
        pagePopupYn: '',
        pagePopupOptionValue: '',
        pageContent: '',
        firstRegistrationDTM: '',
        firstRegistUserId: '',
        firstRegistProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        pageUsePriodYn: 'N',
        pageUseYn: 'Y',
      },

      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_PAGE_TYPE: {
            label: '',
            key: '',
          },
          COD_PAGE_UE: {
            label: '',
            key: '',
          },
          COD_PAGE_STT: {
            label: '',
            key: '',
          },
          COD_DVC_TYPE: {
            label: '',
            key: '',
          },
          COD_PAGE_SEARCH_COND: {
            label: '',
            key: '',
          },
        },
        data: {}, // 선택 시 데이터
        pageIdPrefix: '',
        pageIdNum: '',
      },
      pageData: {
        selectedCodeValue: {
          moduleCode: {
            key: '',
            label: '',
          },
          subModuleCode: {
            key: '',
            label: '',
          },
          pageUseCode: {
            key: '',
            label: '',
          },
          pageTypeCode: {
            key: '',
            label: '',
          },
          pageStatusCode: {
            key: '',
            label: '',
          },
        },
        pageId: '',
        pageDestinationValue: '',
        pageName: '',
        pageNickName: '',
        pageTitleMessageResourceId: '',
        pageBlockContent: '',
        pageUsePriodStartDatetime: '',
        pageUsePriodFinishDatetime: '',
        pagePopupYn: 'N',
        pagePopupOptionValue: '',
        pageContent: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        pageUsePriodYn: 'N',
        pageUseYn: 'Y',
        linkPageId: '',
        linkPageName: '',
        r_dsplLngId: '',
        r_knoxId: '',
        r_loginId: '',
        r_userName: '',
        r_userGlobalName: '',
        r_departmentName: '',
        r_departmentEnglishName: '',
        m_dsplLngId: '',
        m_knoxId: '',
        m_loginId: '',
        m_userName: '',
        m_userGlobalName: '',
        m_departmentName: '',
        m_departmentEnglishName: '',
        periodDT: {
          from: utils.now(),
          to: utils.now(),
        },
        periodDTR: [],
        deviceTypeValue: 1,
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      pageIdPrefix: '',
      duplicate: false,
      checkMetaSave: utils.checkMetaSave(),
      originalNickName: '',
      inputNickName: '',
    };
  },
  computed: {
    pageUsePriodFlag() {
      // 사용 안할 시 true
      return utils.isEqual(this.pageData.pageUsePriodYn, 'N');
    },
    pageNickNameInput() {
      // 입력시 true
      return !utils.isEmpty(this.inputNickName);
    },
    nickNameChange() {
      // 변경 시 true
      return !utils.isEqual(this.inputNickName, this.originalNickName);
    },
    pageTypeFlag() {
      return utils.isEqual(this.pageData.selectedCodeValue.pageTypeCode.key, 'N');
    },
    saveParam() {
      const dataParams = {};
      utils.forEach(this.pageData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (code, codekey) => {
            dataParams[codekey] = code.key;
          });
        } else if (utils.isEqual(key, 'periodDTR')) {
          const pageUsePriodStartDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[0]);
          const pageUsePriodFinishDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[1]);
          utils.assign(dataParams, { pageUsePriodStartDatetime, pageUsePriodFinishDatetime });
        } else {
          dataParams[key] = value;
        }
      });
      return dataParams;
    },

  },
  watch: {
    selectedPageId(data) {
      if (data) {
        const selected= this.parentDataset.getSelected()[0];
        const { moduleCode, subModuleCode,moduleName,subModuleName } = selected;
        const { pageStatusCode, pageStatusName, pageTypeCode, pageTypeName, pageUseCode, pageUseName} = selected;
        const { pageUsePriodStartDatetime, pageUsePriodFinishDatetime,} = selected;
        utils.forEach(this.pageData, (value, key) => {
          if (utils.has(selected, key)) {
            this.pageData[key] = selected[key];
            this.pageData.selectedCodeValue.moduleCode.key = moduleCode;
            this.pageData.selectedCodeValue.moduleCode.label = moduleName;
            this.pageData.selectedCodeValue.subModuleCode.key = subModuleCode;
            this.pageData.selectedCodeValue.subModuleCode.label = subModuleName;
            this.pageData.selectedCodeValue.pageUseCode.key = pageUseCode;
            this.pageData.selectedCodeValue.pageUseCode.label = pageUseName;
            this.pageData.selectedCodeValue.pageTypeCode.key = pageTypeCode;
            this.pageData.selectedCodeValue.pageTypeCode.label = pageTypeName;
            this.pageData.selectedCodeValue.pageStatusCode.key = pageStatusCode;
            this.pageData.selectedCodeValue.pageStatusCode.label = pageStatusName;
            
          }
        });
        
        this.modSelDisabled = true;
        if (!this.pageUsePriodFlag) {
          const startDate = pageUsePriodStartDatetime.substring(0, 8);
          const endDate = pageUsePriodFinishDatetime.substring(0, 8);
          this.pageData.periodDTR = [utils.dateformatToClient(startDate,'S'),utils.dateformatToClient(endDate,'S')];
        }else{
          this.pageData.periodDTR = [utils.dateformatToClient(utils.now()),utils.dateformatToClient(utils.now())];
        }
        if(this.deviceApplyYn) {
          this.$refs.deviceCheck.setValue(this.pageData.deviceTypeValue);
        }        
        this.originalNickName = selected.pageNickName;
        this.inputNickName = selected.pageNickName;
        setTimeout(() => {
          this.saveSnapshot(this.makeSnapshot());
        }, 500);
      }
      else {
        this.resetTab();
      }
    },
    inputNickName(data) {
      if (utils.isEmpty(data)) {
        this.pageData.pageNickName = '';
      } else if (utils.isEqual(data, this.pageData.pageNickName)) {
        this.duplicate = true;
      } else {
        this.duplicate = false;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.parentDataset = utils.findDataset('dsMain', this);
    });
  },
  methods: {
    convertRangeFormat() {
      this.pageData.periodDT = {
        from: this.pageData.periodDTR[0],
        to: this.pageData.periodDTR[1],
      };
    },
    makeSnapshot() {
      const dataParams = {};
      utils.forEach(this.pageData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (code, codekey) => {
            dataParams[codekey] = code.key;
          });
        } else if (utils.isEqual(key, 'periodDTR')) {
          const pageUsePriodStartDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[0]);
          const pageUsePriodFinishDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[1]).substr(0, 8).concat('235959');
          utils.assign(dataParams, { pageUsePriodStartDatetime, pageUsePriodFinishDatetime });
        } else {
          dataParams[key] = value;
        }
      });
      return dataParams;
    },
    onSaveClick() {
      this.convertRangeFormat();
      const dataParams = this.makeSnapshot();

      // 동시성 체크
      dataParams['originalFinalModificationDTM'] = utils.dateformatToServer(dataParams.finalModificationDTM);
      if (!this.formValidate(dataParams)) return false;
      if (this.onClickValidate()) return false;

      if(this.deviceApplyYn) {
        dataParams.deviceTypeValue = this.$refs.deviceCheck.getValue();
        if (dataParams.deviceTypeValue < 1) {
          const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DVC_TYPE'));
          utils.messageBox('warning', msg);
          return false;
        }        
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          const url = utils.isEmpty(this.selectedPageId) ? 'DTS_CMU_00004' : 'DTS_CMU_00006'; /* create : update */
          http.request(this.pageId, url, {
            path: {
              'page-id': this.selectedPageId,
            },
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
              if(utils.isEmpty(this.selectedPageId)){
                this.onNewClick();
                this.onSearchClick();
              }else{
                this.$emit('updatePageInfo', this.selectedPageId);
              }
            });
          });
        },
        (/* cancel */) => {});
      return null;
    },
    onPageSelectClick() {
      utils.openLayerPopup('PGE_CMU_00004', this.closePagePopup, {
        pageInitialData: { multiSelect: false },
        size: 'lg',
      });
    },
    closePagePopup(selected) {
      if (!utils.isEmpty(selected)) {
        const [page] = selected;
        this.pageData.linkPageId = page.pageId;
        this.pageData.linkPageName = page.pageName;
        this.makePageFile(page);
      }
    },
    onTypeSelect() {
      this.pageData.linkPageId = '';
      this.pageData.linkPageName = '';
      this.makePageFile();
    },
    resetTab() {
      this.modSelDisabled = false;
      utils.forEach(this.pageData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          this.$refs.smCombotab1.selectMd(' ');
          this.$refs.smCombotab1.selectSmd(' ');
          this.$refs.codPageType.reset();
          this.$refs.codPageUe.reset();
          this.$refs.codPageStt.reset();
        } else if (utils.isEqual(key, 'pageUseYn')) {
          this.pageData[key] = 'Y';
        } else if (utils.isEqual(key, 'pageUsePriodYn') || utils.isEqual(key, 'pagePopupYn')) {
          this.pageData[key] = 'N';
        } else if (utils.isEqual(key, 'periodDTR')) {
          this.pageData[key] = [utils.dateformatToClient(utils.now()),utils.dateformatToClient(utils.now())];
        } else {
          this.pageData[key] = '';
        }
      });

      this.pageData.deviceTypeValue = 1;
      if(this.deviceApplyYn) {
        this.$refs.deviceCheck.setValue(1);
      }

      this.pageIdPrefix = '';
      this.originalNickName = '';
      this.inputNickName = '';
      this.duplicate = false;
      this.saveSnapshot(this.makeSnapshot());
    },
    onNewClick() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onDeleteClick() {
      if (!this.selectedPageId) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null,
          (/* ok */) => {
            http.request(this.pageId, 'DTS_CMU_00005', {
              path: {
                'page-id': this.selectedPageId,
              },
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, () => {
                this.onNewClick();
                this.onSearchClick();
              });
            });
          },
          (/* cancel */) => {});
      }
    },
    onSearchClick() {
      this.$emit('onSearchClick');
    },
    onFrmMdListClick(value) {
      this.pageIdPrefix = `PGE_${value.key}_`;
    },
    onFrmSmdListClick(value) {
      this.pageIdPrefix = `PGE_${value.key}_`;
      this.makePageFile();
    },
    makePageFile(pageObj) {
      if (pageObj) { // 팝업 선택
        const { moduleCode, subModuleCode, pageId } = pageObj;
        this.pageData.pageDestinationValue = `/${moduleCode}/pages/${subModuleCode.charAt(2)}/${pageId}`;
      } else if (this.pageData.selectedCodeValue.pageTypeCode.key === 'L') { // 링크
        this.pageData.pageDestinationValue = '';
      } else { // 일반
        const mcode = this.pageData.selectedCodeValue.moduleCode.key;
        const smcode = this.pageData.selectedCodeValue.subModuleCode.key.substr(2);
        const { pageId } = this.pageData;
        this.pageData.pageDestinationValue = `/${mcode}/pages/${smcode}/${pageId}`;
      }
    },
    formValidate(formData) {
      if (!(this.formValidate01(formData)
         && this.formValidate02(formData))) {
        return false
      }
      return true
    },
    formValidate01(formData) {
      if (!utils.trim(formData.moduleCode) || formData.moduleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.subModuleCode) || formData.subModuleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (formData.pageTypeCode === 'L' && !utils.trim(formData.linkPageId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LINK_PAGE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!formData.pageUseCode) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE_UE_NM'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!formData.pageName) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PAGE_NM'));
        utils.messageBox('warning', msg, null, () => {
          this.$refs.pageName.setFocus();
        });
        return false;
      }
      if (!formData.pageTitleMessageResourceId) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO'));
        utils.messageBox('warning', msg, null, () => {
          this.$refs.pageTitleMessageResourceId.setFocus();
        });
        return false;
      }
      if (!formData.pageUsePriodYn) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PRD_YN'));
        utils.messageBox('warning', msg);
        return false;
      }
      return true
    },
    formValidate02(formData) {
      if (!formData.pageStatusCode) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_STT'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.pageUsePriodFlag && (!formData.pageUsePriodStartDatetime || !formData.pageUsePriodFinishDatetime)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_PRD'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!formData.pagePopupYn) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_POPU_YN'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!formData.pageUseYn) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (this.pageNickNameInput && this.nickNameChange && !this.duplicate) {
        const msg = utils.strFormat(this.$t('MSG_ALT_DUPLICATE_CHECK'), this.$t('MSG_TXT_PAGE_NNM'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (formData.pageTypeCode === 'L' && formData.pageStatusCode === 'B') {
        utils.messageBox('warning', this.$t('MSG_ALT_LNK_PAGE_BLCK_NO'));
        return false;
      }
      if (formData.pageStatusCode === 'B' && utils.isEmpty(utils.trim(formData.pageBlockContent))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_BLCK_MSG'));
        utils.messageBox('warning', msg);
        return false;
      }
      return true
    },
    onConfirmRangePicker(dateObj) {
      this.priodDate = dateObj;
    },
    onNickNameValidCheck() {
      if (!this.pageNickNameInput) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PAGE_NNM')));
      } else {
        this.nickNameDupliateCheck(this.inputNickName);
      }
    },
    nickNameDupliateCheck(pageNickName) {
      http.request(this.pageId, 'DTS_CMU_00066', {
        query: { pageNickName },
      }).then(res => {
        if (res.data) {
          utils.messageBox('warning', this.$t('MSG_ALT_DUPLICATE_EXISTS'), null, () => {
            this.duplicate = false;
          });
        } else {
          const msg = utils.strFormat(this.$t('MSG_ALT_USE_PSBL'), this.$t('MSG_TXT_PAGE_NNM'));
          utils.messageBox('success', msg, null, () => {
            this.duplicate = true;
            this.pageData.pageNickName = pageNickName;
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onCtsDownloadClick() {
      if (!this.selectedPageId) {
        utils.messageBox('information', this.$t('MSG_ALT_DOWN_NO_DATA'));
      } else {
        http.request(this.pageId, 'DTS_CMU_00040', {
          path: {
            'page-id': this.selectedPageId,
          },
          responseType: 'arraybuffer',
        }).then(res => {
          const fileName = `${this.selectedPageId}.cts`;
          utils.downloadBlob(res, fileName);
        });
      }
    },
    onCtsUploadClick(file) {
      if (file[0]) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
          (/* ok */) => {
            const formData = new FormData();
            formData.append('file', file[0]);

            http.request(this.pageId, 'DTS_CMU_00039', {
              data: formData,
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
            });
          },
          (/* cancel */) => {});
      }
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      if (!this.$refs.rangePicker.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
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
