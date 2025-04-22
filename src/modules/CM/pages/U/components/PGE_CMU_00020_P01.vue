<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_scr_wrap">
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
              ref="selectModule"
              :pageId="this.$options.name"
              :selectedMd="pageData.selectedCodeValue.moduleCode"
              :selectedSmd="pageData.selectedCodeValue.subModuleCode"
              :defaultMdOption="defaultOption"
              :defaultSmdOption="defaultOption"
              :disabled="!isRegister"
              class="dp_flex"
              @module-selected="moduleSelected"
              @submodule-selected="subModuleSelected"
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
              :placeholder="pageData.pageIdPrefix"
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
              v-model="pageData.pageName"
              maxlength="100"
              :trim="true"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MSG_RESO')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="pageData.pageTitleMessageResourceId"
              style="width: 100% !important"
              maxlength="100"
              class="width60"
            />
            <sui-button
              type="button"
              class="comm_btn_InputScr"
              @click="onClickStandardForm"
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
              :selected="pageData.selectedCodeValue.pageUseCode"
              :pageId="this.$options.name"
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
              :selected="pageData.selectedCodeValue.pageTypeCode"
              :pageId="this.$options.name"
              codeId="COD_PAGE_TYPE"
              class="width40"
              @list-clicked="pageTypeSelected"
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
              v-permission:read="this.$props.pageId"
              type="button"
              class="comm_btn_InputScr"
              :disabled="buttonFlag"
              @click="onPageSelectClick"
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
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DVC_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <sui-device-checkbox
              ref="deviceCheck"
              :value="pageData.deviceTypeValue"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_NMME')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="pageData.pageNickName"
              maxlength="100"
              :trim="true"
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
              v-model.trim="pageData.pageContent"
              maxlength="1000"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrB30 mrR30">
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onPopupCancelClicked"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onApply"
        >
          {{ $t('MSG_BTN_APPLY') }}
        </sui-button>
      </div>
    </div>
    <sui-popup
      v-model="showRegisterMessageResourcePopup"
      :title="$t('MSG_TIT_RGST_MSG_RESO')"
    >
      <p01
        :parentPageId="this.$props.pageId"
        @exit="returnCall"
        @apply="returnData"
      />
    </sui-popup>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import p01 from './PGE_CMU_00022_P04.vue';


export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_CMU_00020_P01',
  components: {
    p01,
  }, // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMU_00020',
    },
    isRegister: {
      type: Boolean,
      default() {
        return true;
      },
    },
    dataRow: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
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
            label: '',
            key: '',
          },
          pageTypeCode: {
            label: '',
            key: '',
          },
          pageStatusCode: {
            label: '',
            key: '',
          },
        },
        moduleCode: '',
        subModuleCode: '',
        pageUseCode: '',
        pageTypeCode: '',
        pageStatusCode: '',
        pageBlockContent: '',
        pageUsePriodStartDatetime: '',
        pageUsePriodFinishDatetime: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        periodDT: {
          from: utils.now('YYYY-MM-DD'),
          to: utils.now('YYYY-MM-DD'),
        },
        originalFinalModificationDTM: '',
        pageNickName: '',
        pageContent: '',
        pageId: '',
        pageDestinationValue: '',
        pageName: '',
        linkPageId: '',
        linkPageName: '',
        pageIdPrefix: 'PGE_',
        pageTitleMessageResourceId: '',
        pagePopupYn: 'N',
        pagePopupOptionValue: '',
        pageUsePriodYn: 'N',
        pageUseYn: 'Y',
        deviceApplyYn: true,
        deviceTypeValue: 1,
      },
      pageData1: {
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
            label: '',
            key: '',
          },
          pageTypeCode: {
            label: '',
            key: '',
          },
          pageStatusCode: {
            label: '',
            key: '',
          },
        },
        moduleCode: '',
        subModuleCode: '',
        pageUseCode: '',
        pageTypeCode: '',
        pageStatusCode: '',
        pageBlockContent: '',
        pageUsePriodStartDatetime: '',
        pageUsePriodFinishDatetime: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        periodDT: {
          from: utils.now('YYYY-MM-DD'),
          to: utils.now('YYYY-MM-DD'),
        },
        originalFinalModificationDTM: '',
        pageNickName: '',
        pageContent: '',
        pageId: '',
        pageDestinationValue: '',
        pageName: '',
        linkPageId: '',
        linkPageName: '',
        pageIdPrefix: 'PGE_',
        pageTitleMessageResourceId: '',
        pagePopupYn: 'N',
        pagePopupOptionValue: '',
        pageUsePriodYn: 'N',
        pageUseYn: 'Y',
        deviceApplyYn: true,
        deviceTypeValue: 1,
      },
      buttonFlag: true,
      showRegisterMessageResourcePopup: false,
      modMode: false,
      defaultOption: 'select',
    };
  },
  computed: {
    defaultKey() {
      return utils.isEqual(this.defaultOption, 'all') ? 'ALL' : ' ';
    },
  },
  mounted() {
    this.pageData = this.pageData1;
    if (this.$props.isRegister === false) {
      this.pageData = this.$props.dataRow.pageData;
    }
    // eslint-disable-next-line quotes
    if (this.pageData.pageId !== "") {
      this.pageData.pageIdPrefix = this.pageData.pageId;
    }
    // eslint-disable-next-line quotes
    if (this.pageData.selectedCodeValue.pageTypeCode.key === "N") {
      this.buttonFlag = true;
    }
    if (this.pageData.deviceApplyYn) {
      this.$refs.deviceCheck.setValue(this.pageData.deviceTypeValue);
    }
  },
  methods: {
    onPopupCancelClicked() {
      this.$emit('exit');
    },
    pageTypeSelected(val) {
      // eslint-disable-next-line quotes
      if (val.key === "N") {
        this.buttonFlag = true;
        this.pageData.linkPageName = '';
      } else {
        this.buttonFlag = false;
      }
    },
    getSelectedCodeValue() {
      this.pageData.moduleCode = this.pageData.selectedCodeValue.moduleCode.key;
      this.pageData.subModuleCode = this.pageData.selectedCodeValue.subModuleCode.key;
      this.pageData.pageUseCode = this.pageData.selectedCodeValue.pageUseCode.key;
      this.pageData.pageTypeCode = this.pageData.selectedCodeValue.pageTypeCode.key;
      this.pageData.pageStatusCode = this.pageData.selectedCodeValue.pageStatusCode.key;
      const data = {};
      utils.forEach(this.pageData.selectedCodeValue, (value, key) => {
        data[key] = utils.trim(value.key);
      });
      return data;
    },
    onApply() {
      if (this.pageData.deviceApplyYn) {
        this.pageData.deviceTypeValue = this.$refs.deviceCheck.getValue();
      }
      utils.assign(this.getSelectedCodeValue(), this.pageData);
      if (!this.validation()) return false;
      if (this.isRegister) this.$emit('apply', this.pageData);
      else this.$emit('modify', this.pageData);
      return true;
    },
    validation() {
      if (!utils.trim(this.pageData.moduleCode) || this.pageData.moduleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(this.pageData.subModuleCode) || this.pageData.subModuleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.pageData.pageName) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PAGE_NM'));
        utils.messageBox('warning', msg, null, () => {
          // this.$refs.pageName.setFocus();
        });
        return false;
      }
      if (this.pageData.pageTypeCode.key === 'L' && !utils.trim(this.pageData.linkPageId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE_TYPE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.pageData.pageTitleMessageResourceId) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO'));
        utils.messageBox('warning', msg, null);
        return false;
      }
      this.pageData.deviceTypeValue = this.$refs.deviceCheck.getValue();
      if (this.pageData.deviceTypeValue === 0) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DVC_TYPE'));
        utils.messageBox('warning', msg, null);
        return false;
      }
      return true;
    },
    moduleSelected(value) {
      if (!utils.isEqual(value.key, this.defaultKey)) {
        this.prefixSetting(value.key);
      }
    },
    subModuleSelected(value) {
      if (!utils.isEqual(value.key, this.defaultKey)) {
        this.prefixSetting(value.key);
      }
    },
    prefixSetting(key) {
      if (this.pageData.pageId === '') {
        this.pageData.pageIdPrefix = utils.isEmpty(key) ? '' : `PGE_${key}`;
      }
    },
    returnCall() {
      this.showRegisterMessageResourcePopup = false;
    },
    returnData(dataValue) {
      this.pageData.pageTitleMessageResourceId = dataValue;
      this.showRegisterMessageResourcePopup = false;
    },
    onClickStandardForm() {
      this.showRegisterMessageResourcePopup = true;
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
  },
};
</script>
  <style scoped>

  </style>
