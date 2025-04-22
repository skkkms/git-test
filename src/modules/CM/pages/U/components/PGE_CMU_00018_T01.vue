<template>
  <div>
    <div class="mrB20" />
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select
            ref="pageModuleSelect"
            class="dp_flex"
            :pageId="pageId"
            :selectedMd="frame0.selectData.COD_MDLE"
            :selectedSmd="frame0.selectData.COD_SMDLE"
            :defaultMdOption="'all'"
            :defaultSmdOption="'all'"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DVC_TYPE')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-multi-select
            ref="deviceMultiDropdown"
            v-model="deviceSelectValue"
            :placeholder="placeholder"
            :options="deviceTypeList"
            :multiple="true"
            :closeOnSelect="false"
            :useAllOption="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SEARCH_COND')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="pageSearchCondSelect"
            :selected="frame0.selectData.COD_PAGE_SEARCH_COND"
            :pagedId="pageId"
            codeId="COD_PAGE_SEARCH_COND"
            :defaultOption="'all'"
            :initialSelectedIndex="0"
            style="width:70%"
          />
          <div class="comp_spacing" />
          <sui-text-field
            v-model="frame0.codPageSearchText"
            maxlength="50"
            @keyup.enter="onSearchClick"
            @keyup="onKeyUpInput"
          />
        </div>
      </div>

      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_Reset"
          @click="onResetClick"
        >
          {{ $t("MSG_BTN_RESET") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_Scr"
          @click="onSearchClick"
        >
          {{ $t("MSG_BTN_SEARCH") }}
        </sui-button>
      </div>
    </div>
    <div class="mrB30" />
    <sui-s-grid
      ref="cmu00018t01grid"
      :headers="gridColumns"
      :data-source="dsPopupPage"
      :multiselect="multiSelect"
      :showCountControl="true"
      :showDisplayCountControl="false"
    />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onCancelClick"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onSelectClick"
      >
        {{ $t('MSG_BTN_SELT') }}
      </sui-button>
    </div>
  </div>
</template>
<script>

// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

/* global http */
export default {
  name: 'PGE_CMU_00018_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      required: false,
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dsPopupPage: new urDataSet(),
      multiSelect: false,
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: false,
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
          COD_PAGE_UE: {
            label: this.$t('MSG_TXT_ALL'),
            key: '',
          },
          COD_PAGE_SEARCH_COND: {
            label: '',
            key: '',
          },
        },
        codPageSearchText: '',
      },
      deviceSelectValue: [],
      placeholder: this.$t('MSG_TXT_ALL'),
      searchFieldOldText: '',
    };
  },
  created() {
    this.deviceTypeList = [];
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '100',
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100',
      },
      {
        text: this.$t('MSG_TXT_PAGE_ID'),
        value: 'pageId',
        width: '150',
      },
      {
        text: this.$t('MSG_TXT_PAGE_NM'),
        value: 'pageName',
      },
      {
        text: this.$t('MSG_TXT_DVC_TYPE'),
        value: 'deviceTypeName',
        width: '150',
      },
    ];
  },
  mounted() {
    this.multiSelect = this.pageInitialData.multiSelect;
    this.loadDeviceCode();
  },
  methods: {
    loadDeviceCode() {
      http.getCodeList(this.pageId, ['COD_DVC_TYPE'], '').then(res => {
        utils.forEach(res['COD_DVC_TYPE'], (value, key) => {
          this.deviceTypeList.push(
            { key: value.key, label: value.codeName },
            // { value: value.key, text: value.codeName },
          );
          this.deviceSelectValue.push(
            { key: value.key, label: value.codeName },
          );
        });
      }).catch(err => {
        console.log(err);
      });
    },
    calculateDeviceTypeValue() {
      let ret = 0;
      utils.forEach(this.deviceSelectValue, (item, key) => {
        ret += Number(item.key);
      });
      return ret;
    },
    onResetClick() {
      this.frame0.codPageSearchText = '';
      // this.$refs.pageModuleSelect.reset();
      this.$refs.pageModuleSelect.selectMd('ALL');
      // this.$refs.pageUseSelect.reset();
      this.$refs.pageSearchCondSelect.reset();
      this.deviceSelectValue = [];
    },
    onSearchClick() {
      const codeValue = this.frame0.selectData;
      const queryParams = {
        moduleCode: utils.trim(codeValue.COD_MDLE.key) || '',
        subModuleCode: utils.trim(codeValue.COD_SMDLE.key) || '',
        pageUseCode: utils.trim(codeValue.COD_PAGE_UE.key) || '',
        searchPageCond: utils.trim(codeValue.COD_PAGE_SEARCH_COND.key) || '',
        searchPageText: utils.toUpper(utils.trim(this.frame0.codPageSearchText)) || '',
      };

      http.request(this.pageId, 'DTS_CMU_00002', {
        query: queryParams,
      }).then(res => {
        this.dsPopupPage.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    onSelectClick() {
      const selectedData = this.dsPopupPage.getSelected();
      if (selectedData.length > 0) {
        // this.closePagePopup(selectedData);
        this.$emit('getPageInfo', selectedData);
      } else {
        // 선택 안했을 때
        utils.messageBox('information', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onCancelClick() {
      this.$emit('close');
    },
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.codPageSearchText;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.frame0.codPageSearchText = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
  },
};
</script>
<style scoped>
</style>
