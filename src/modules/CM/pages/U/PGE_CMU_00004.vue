<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents style="padding-bottom:15px">
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
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_UE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="pageUseSelect"
              :selected="frame0.selectData.COD_PAGE_UE"
              :pageId="this.$options.name"
              codeId="COD_PAGE_UE"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
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
              :pagedId="this.$options.name"
              codeId="COD_PAGE_SEARCH_COND"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
              style="width:70%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="frame0.codPageSearchText"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearchClick"
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
        ref="cmu00004grid"
        :headers="gridColumns"
        :data-source="dsPopupPage"
        :options="options"
        :showRowsPerPageControl="false"
      />
    </sui-page-contents>
    <sui-page-footer>
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
    </sui-page-footer>
  </sui-page>
</template>
<script>

// eslint-disable-next-line import/extensions
import {urDataSet} from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

/* global http */
export default {
  name: 'PGE_CMU_00004', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
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
      //localdata0: [],
      multiSelect: false,
      searchFieldOldText: '',
    };
  },
  created() {
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
        text: this.$t('MSG_TXT_TYPE'),
        value: 'pageTypeName',
        width: '100',
      },
    ];
  },
  mounted() {
    this.multiSelect = this.pageInitialData.multiSelect;
  },
  methods: {
    onResetClick() {
      this.frame0.codPageSearchText = '';
      // this.$refs.pageModuleSelect.reset();
      this.$refs.pageModuleSelect.selectMd('ALL');
      this.$refs.pageUseSelect.reset();
      this.$refs.pageSearchCondSelect.reset();
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

      http.request(this.$options.name, 'DTS_CMU_00002', {
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
        this.closePagePopup(selectedData);
      } else {
        // 선택 안했을 때
        //utils.messageBox('information', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onCancelClick() {
      this.closePagePopup('');
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.frame0.codPageSearchText;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.codPageSearchText = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
  },
};
</script>
<style scoped>
</style>
