<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectComponentType"
              codeId="COD_CMPNT_TYPE"
              :page-id="this.$options.name"
              :selected="searchFrame.selectedCodeValue.componentTypeCode"
              :defaultOption="'all'"
            />
            <div class="comp_spacing" />
            <sui-module-submodule-select
              ref="selectModule"
              :pageId="this.$options.name"
              :selectedMd="searchFrame.selectedCodeValue.moduleCode"
              :selectedSmd="searchFrame.selectedCodeValue.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
              :disabled="moduleSelectFlag"
              class="dp_flex"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USE_YN')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="selectComponentUseYn"
              :selected="searchFrame.selectedCodeValue.componentUseYn"
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
              ref="selectComponentSearchCond"
              :selected="searchFrame.selectedCodeValue.componentSearchCond"
              :pageId="this.$options.name"
              codeId="COD_CMPNT_SEARCH_COND"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
              style="width:70%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="searchFrame.componentSearchWord"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearchClick"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB40" />
      <sui-s-grid
        ref="listGrid"
        :data-source="ds0"
        :headers="gridColumns"
        :options="options"
        :showRowsPerPageControl="false"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ this.$t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:update="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onSelectClick"
        >
          {{ this.$t('MSG_BTN_SELT') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
// 페이지 에서 사용하는 code 목록 기술
const dataTypeFields = ['firstRegistrationDTM', 'finalModificationDTM'];

export default {
  name: 'PGE_CMU_00008', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
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
      searchFrame: {
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
          componentSearchCond: {
            label: '',
            key: '',
          },
          componentUseYn: {
            label: '',
            key: '',
          },
        },
        componentSearchWord: '',
      },
      // eslint-disable-next-line new-cap
      ds0: new urDataSet(),
      gridColumns: [{
        text: this.$t('MSG_TXT_TYPE'),
        value: 'componentTypeName',
        width: '80px',
      }, {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_CMPNT_ID'),
        value: 'componentId',
        width: '150px',
      }, {
        text: this.$t('MSG_TXT_CMPNT_NM'),
        value: 'componentName',
      }, {
        text: this.$t('MSG_TXT_TAG'),
        value: 'componentTag',
        width: '200px',
      }],
      localdata0: [],
      searchFieldOldText: '',
      multiSelect: false,
      options: {
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
    };
  },
  computed: {
    moduleSelectFlag() {
      if (this.searchFrame.selectedCodeValue.componentTypeCode !== 'MOD') {
        this.searchFrame.selectedCodeValue.moduleCode.key = 'ALL';
        this.searchFrame.selectedCodeValue.subModuleCode.key = 'ALL';
      }
      return !utils.isEqual(this.searchFrame.selectedCodeValue.componentTypeCode.key, 'MOD');
    },
  },
  mounted() {
    if (!utils.isEmpty(this.pageInitialData)) {
      this.multiSelect = this.pageInitialData.multiSelect;
    }
  },
  methods: {
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.searchFrame.componentSearchWord;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.searchFrame.componentSearchWord = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    onResetClick() {
      this.searchFrame.componentSearchWord = '';
      utils.forEach(this.$refs, (ref, key) => {
        if (utils.startsWith(key, 'select')) {
          ref.reset();
        }
        // this.$refs.selectModule.selectMd('all');
        this.searchFrame.selectedCodeValue.moduleCode.key = 'ALL';
        this.searchFrame.selectedCodeValue.subModuleCode.key = 'ALL';
      });
    },
    getSearchData() {
      const data = {};
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (codeValue, codekey) => {
            data[codekey] = codeValue.key;
          });
        } else {
          data[key] = value;
        }
      });
      return data;
    },
    onSearchClick() {
      const queryParams = this.getSearchData();
      http.request(this.$options.name, 'DTS_CMU_00026', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, dataTypeFields);
        this.ds0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    onSelectClick() {
      const selectedData = this.ds0.getSelected();
      if (selectedData.length !== 0) {
        this.closePagePopup(selectedData);
      } else {
        // 선택 안했을 때
        // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CMPNT')));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onCancelClick() {
      this.closePagePopup();
    },
  },
};
</script>
<style scoped>
</style>
