<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
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
              ref="selectModule"
              :pageId="this.$options.name"
              :selectedMd="searchFrame.selectedCodeValue.moduleCode"
              :selectedSmd="searchFrame.selectedCodeValue.subModuleCode"
              :defaultSmdOption="'all'"
              class="dp_flex"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectDataServiceTypeCode"
              :selected="searchFrame.selectedCodeValue.dataServiceTypeCode"
              :pageId="this.$options.name"
              codeId="COD_DTSVC_TYPE"
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
              ref="selectDataServiceSearchCond"
              :selected="searchFrame.selectedCodeValue.dataServiceSearchCond"
              :pageId="this.$options.name"
              codeId="COD_DTSVC_SEARCH_COND"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
              style="width:71.5%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="searchFrame.dataServiceSearchWord"
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
      <div class="mrB30" />
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
          {{ this.$t('MSG_TXT_SEL') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
// 페이지 에서 사용하는 code 목록 기술
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00005', // eslint-disable-line vue/name-property-casing
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
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
        multiSelect: true,
        selectCheck: true,
      },
      ds0: new urDataSet(),
      searchFrame: {
        selectedCodeValue: {
          moduleCode: {
            label: '',
            key: '',
          },
          subModuleCode: {
            label: '',
            key: '',
          },
          dataServiceTypeCode: {
            label: '',
            key: '',
          },
          dataServiceSearchCond: {
            label: '',
            key: '',
          },
        },
        dataServiceSearchWord: '',
      },
      localdata0: [],
      searchFieldOldText: '',
      multiSelect: false,
    };
  },
  mounted() {
    this.multiSelect = this.pageInitialData.multiSelect;
  },
  created() {
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'dataServiceIdentification',
        width: '150px',
      }, {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'dataServiceName',
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'dataServiceTypeName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_DTSVC_URL'),
        value: 'dataServiceUniformresourcelocator',
      }, {
        text: this.$t('MSG_TXT_PRMSN'),
        value: 'dataServicePermissionName',
        width: '100px',
      }];
  },
  methods: {
    // _ 제외 특수문자 입력제한
    onKeyUpInput() {
      const searchFieldNewText = this.searchFrame.dataServiceSearchWord;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.searchFrame.dataServiceSearchWord = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    onResetClick() {
      this.searchFrame.dataServiceSearchWord = '';
      utils.forEach(this.$refs, (ref, key) => {
        if (utils.startsWith(key, 'select')) {
          if (utils.isEqual(key, 'selectModule')) {
            ref.selectMd('CM');
          } else {
            ref.reset();
          }
        }
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
      http.request(this.$options.name, 'DTS_CMU_00007', {
        query: queryParams,
      }).then(res => {
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
        //utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DTSVC')));
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
