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
              ref="selectMdSmd"
              :pageId="this.$options.name"
              :selectedMd="searchFrame.selectedCodeValue.moduleCode"
              :selectedSmd="searchFrame.selectedCodeValue.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
              :disabled="moduleSelectFlag"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :required="false"
              :vertical="false"
              class="ls"
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
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model.trim="searchFrame.componentSearchWord"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearchClick"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USE_YN')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <!-- YnSelect customlist 추가 -->
            <sui-yn-select
              ref="selectComponentUseYn"
              :selected="searchFrame.selectedCodeValue.componentUseYn"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
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
        ref="mainGrid"
        :headers="gridColumns"
        :data-source="dsMain"
        :options="options"
        :showDisplayCountControl="true"
        :initial-pagesize="5"
        :showRowsPerPageControl="false"
        @grid:selected="onGridSelected"
      />


      <div class="mrB30" />
      <sui-page-tab-box-type
        ref="tabs"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        :tabItems="tabItems"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          :pageId="this.$options.name"
          :componentId="componentId"
          @onGridClear="onGridClear"
          @research="onSearchClick"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import tab01 from './components/PGE_CMU_00007_T01';
import tab02 from './components/PGE_CMU_00007_T02';
import tab03 from './components/PGE_CMU_00007_T03';
import tab04 from './components/PGE_CMU_00007_T04';
import tab05 from './components/PGE_CMU_00007_T05';
import BasePage from '~cm/components/BasePage';

const dateTypeFields = ['firstRegistrationDTM', 'finalModificationDTM'];

export default {
  name: 'PGE_CMU_00007', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    tab03,
    tab04,
    tab05,
  },
  extends: BasePage,
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
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_CMPNT'),
          tabComponent: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_DTSVC'),
          tabComponent: tab02,
          ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_DATASERVICE_YN') === 'false'? false : true,
        },
        {
          tabTitle: this.$t('MSG_TXT_MSG_RESO'),
          tabComponent: tab03,
          ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_MESSAGE_RESOURCE_YN') === 'false'? false : true,
        },
        {
          tabTitle: this.$t('MSG_TXT_SCMPNT'),
          tabComponent: tab04,
        },
        {
          tabTitle: this.$t('MSG_TXT_PAGE'),
          tabComponent: tab05,
          ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_DATASERVICE_YN') === 'false'? (utils.getConfigurationValue('YML_UIFRAMEWORK_MESSAGE_RESOURCE_YN') === 'false'? false : true) : true,
        },
      ],
      currentTabComponent: tab01,
      defaultTabIndex: 0,
     
      searchFieldOldText: '',
      componentId: '',
      localdata0: [],
      dsMain: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },

created()
{
  this.gridColumns = [{
        text: this.$t('MSG_TXT_TYPE'),
        value: 'componentTypeName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_CMPNT_ID'),
        value: 'componentId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_CMPNT_NM'),
        value: 'componentName',
      }, {
        text: this.$t('MSG_TXT_CMPNT_TAG'),
        value: 'componentTag',
      }, {
        text: this.$t('MSG_TXT_USE_YN'),
        value: 'componentUseYn',
        width: 80,
      }, {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'finalModificationUserId',
      width: 200,
      }, {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        width: 170,
      },
      ];
},





  computed: {
    moduleSelectFlag() {
      return !utils.isEqual(this.searchFrame.selectedCodeValue.componentTypeCode.key, 'MOD');
    },
  },
  watch: {
    moduleSelectFlag() {
      if (this.searchFrame.selectedCodeValue.componentTypeCode.key !== 'MOD') {
        this.searchFrame.selectedCodeValue.moduleCode.key = 'ALL';
        this.searchFrame.selectedCodeValue.subModuleCode.key = 'ALL';
      }
    },
  },
  mounted() {
    // this.dsMain.$on(this.dsMain.EVENTS.SELECTION_CHANGED, this.onDatasetSelectionChanged);
  },
  beforeDestroy() {
    // this.dsMain.$off(this.dsMain.EVENTS.SELECTION_CHANGED, this.onDatasetSelectionChanged);
  },
  
  methods: {
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    onResetClick() {
      this.searchFrame.componentSearchWord = '';
      utils.forEach(this.$refs, (ref, key) => {
        if (utils.startsWith(key, 'select')) {
          ref.reset();
        }
      });
      this.$refs.selectMdSmd.selectMd('ALL');
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
      if (!utils.isEmpty(this.componentId)) {
        this.componentId = '';
      }
      const queryParams = this.getSearchData();
      http.request(this.$options.name, 'DTS_CMU_00026', {
        query: queryParams,
      }).then(res => {
        // util.printDatasetFieldsFromObject(res.data[0]);
        utils.dateformatToClientInArray(res.data, dateTypeFields);
        this.dsMain.setData(this.setUserInfoFormat(res.data));
      }).catch(error => {
        console.log(error);
      });
    },
    setUserInfoFormat(list) {
      utils.forEach(list, data => {
        utils.forEach(data.firstRegistrationUserInfo, (value, key) => {
          utils.set(data, `r_${key}`, value);
        });
        utils.forEach(data.finalModificationUserInfo, (value, key) => {
          utils.set(data, `m_${key}`, value);
        });
      });
      return list;
    },
    onGridClear() {
      this.componentId = '';
      this.$refs.mainGrid.resetSelect();
     //this.dsMain.clearSelection();
    },
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
    onGridSelected(dataRow) {
     if (!utils.isEmpty(dataRow)) {
        const { componentId } = dataRow;
        this.componentId = componentId;
      }
    },
  },
};
</script>
<style scoped>   
</style>

