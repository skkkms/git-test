<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_ITEM_NM')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <cmp-mlng-editor
              ref="mlngEditor"
              pageId="${that.pageId}"
              :multiLanguageId="dataRow.attachItemMultiLanguageId"
              @getdata="onChangeMlng"
            />
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_HDQT_CNTL_YN')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <sui-radio
              v-model="dataRow.headquarterControlYn"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="dataRow.headquarterControlYn"
              value="N"
            >
              No
            </sui-radio>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_NCSR_YN')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <sui-select-box
              :value="selectedOption"
              :option-list="optionList"
              @input="onChangeSelectBox"
            />
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_EXTS')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <sui-code-select
              :initialSelectedKey="dataRow.attachPossibilityExtensionCode"
              codeId="COD_ATTH_EXTS"
              @input="onChangeCodeSelect"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_EXLD_PSBL_YN')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <sui-radio
              v-model="dataRow.attachExcludePossibilityYn"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="dataRow.attachExcludePossibilityYn"
              value="N"
            >
              No
            </sui-radio>
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_STDD_FORM')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <sui-txt-with-btn
              ref="suiTxt"
              :fdpTextValue="componentProps.fieldValue"
              :textFieldProps="componentProps.textFieldProps"
              :buttonProps="componentProps.buttonProps"
              @clickButton="onClickStandardForm"
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
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMD_00003_P02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    isRegister: {
      type: Boolean,
      default() {
        return true;
      },
    },
    dataRow: {
      type: Object,
      default() {
        return {
          rowType: 'I',
          standardFormId: '',
          standardFormName: '',
          attachItemId: '',
          attachItemName: '',
          arrayalOrder: '',
          attachExcludePossibilityYn: 'N',
          headquarterControlYn: 'N',
          headquarterEssentialYn: 'Y',
          attachPossibilityExtensionCode: '',
          attachItemMultiLanguageId: '',
        };
      },
    },
  },
  data() {
    return {
      optionList: [{
        key: 'Y',
        label: this.$t('MSG_TXT_NCSR'),
      }, {
        key: 'N',
        label: this.$t('MSG_TXT_SEL'),
      }],
      componentProps: {
        fieldValue: '',
        textFieldProps: {
          readonly: false,
          disabled: false,
        },
        buttonProps: {
          disabled: false,
          style: 'comm_btn_InputScr',
        },
        Yn: '',
        selectedCodeValue: {
          rqmtCode: 'IMG',
        },
      },
      isemptyItem: false,
      isEmptydata: false,
      isemptyOrder: false,
    };
  },
  computed: {
    selectedOption() {
      return utils.find(this.optionList, { key: this.dataRow.headquarterEssentialYn });
    },
  },
  mounted() {
    this.$refs.suiTxt.setValue(this.dataRow.standardFormName);
    
    setTimeout(() => {
      this.$refs.mlngEditor.mlngPopupConfirmed(this.dataRow.mlngData);
    }, 100);
  },
  created() {
    this.localdata0 = [];
  },
  methods: {
    onChangeCodeSelect(v) {
      this.dataRow.attachPossibilityExtensionCode = v;
    },
    onChangeSelectBox(v) {
      this.dataRow.headquarterEssentialYn = v.key;
      this.dataRow.headquarterEssentialName = v.label;
    },
    onChangeMlng(v) {
      this.dataRow.multiLanguageList = v;
    },
    onClickStandardForm() {
      utils.openLayerPopup('PGE_CMD_00005', data => {
        if (!utils.isEmpty(data)) {
          this.dataRow.standardFormName = data[0].documentName;
          this.dataRow.standardFormId = data[0].documentId;
        }
        this.$refs.suiTxt.setValue(this.dataRow.standardFormName);
      }, {
        pageInitialData: {},
        size: 'lg',
      });
    },
    onApply() {
      if (this.isRegister) this.$emit('apply', this.dataRow);
      else this.$emit('modify', this.dataRow);
    },
    onPopupCancelClicked() {
      if (this.isRegister) {
        this.$emit('exit', 'cancelRegister');
      }
      else {
        this.$emit('exit', 'cancelModify');
      }
    },
  },
};
</script>
<style scoped>
</style>
