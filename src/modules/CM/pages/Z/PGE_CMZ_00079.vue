<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MDLE')" />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="selectModule"
              :pageId="this.$options.name"
              :selectedMd="queryData.moduleCode"
              :selectedSmd="queryData.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
              :disabledMd="mdDisabled"
              :disabledSmd="smdDisabled"
              class="dp_flex"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="searchCondSelect"
              class="width60"
              codeId="COD_CNFG_TYPE_SEARCH"
              defaultOption="all"
              :selected="queryData.configTypeSearchKey"
              @list-clicked="onSelectSearchCond"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="queryData.configTypeSearchText"
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
              v-permission:read="contextPageId"
              type="button"
              class="comm_btn_Scr"
              :disabled="searchDisabled"
              @click="onSearchClick"
            >
              {{ $t("MSG_BTN_SRCH") }}
            </sui-button>
          </div>
      </div>
      <div class="comm_shut_wrap">
        <div 
          class="inbox"
          style="flex:4"
        >
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_CNFG_TYPE_GRP') }}</h4>
          </div>
          <sui-s-grid
            ref="gridConfigGrp"
            :headers="columnConfigGrp"
            :data-source="dsConfigGrp"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="5"
            @grid:selected="onClickGrpRow"
          />
        </div>
        <div class="emptybox" />
        <div 
          class="inbox"
          style="flex:6"
        >
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_BTN_CNFG_TYPE') }}</h4>
          </div>
          <sui-s-grid
            ref="gridConfigMgt"
            :headers="columnConfigMgt"
            :data-source="dsConfigMgt"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="5"
            @grid:selected="onClickMgtRow"
          />
        </div>
      </div>
      <div class="mrB30" />
      <sui-page-tab-box-type
        ref="tab"
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="onSetCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          :pageId="contextPageId"
          :selectedGridRowData="selectedGridRowData"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"          
          @onSearchClick="onSearchClick"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMZ_00079_T01.vue';

/* eslint max-len: ["error", { "code": 200 }] */
export default {
  name: 'PGE_CMZ_00079', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  }, // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    psInitData: {
      type: Object,
      default() {
        return {};
      }
    },
  },  
  data() {
    return {
      mdDisabled: false,
      smdDisabled: false,
      searchDisabled: false,
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_CNFG'),
          component: tab01,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      searchFieldOldText: '',
      queryData: {
        configTypeSearchText: '',
        configTypeSearchKey: {
          label: '',
          key: '',
        },
        moduleCode: {
          key: '',
          label: '',
        },
        subModuleCode: {
          key: '',
          label: '',
        },
      },
      dsConfigGrp: new urDataSet(),
      dsConfigMgt: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGrpGridRowData: {},
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},      
      psInitModule: this.psInitData.module,
      psInitSubModule: this.psInitData.subModue,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.columnConfigGrp = [
      {
        text: this.$t('MSG_TXT_GRP_NM'),
        value: 'configurationName',
      },
      {
        text: this.$t('MSG_TXT_GRP_ID'),
        value: 'configurationId',
      },
    ];
    this.columnConfigMgt = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 80,
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 90,
      },      
      {
        text: this.$t('MSG_TXT_CNFG_NM'),
        value: 'configurationName',
      },
      {
        text: this.$t('MSG_TXT_CNFG_ID'),
        value: 'configurationId',
      },
      {
        text: this.$t('MSG_TXT_HRCY_LVL'),
        value: 'hierarchyLevel',
        hide: true,
      },
      {
        text: this.$t('MSG_TXT_PRTS_CNFG_ID'),
        value: 'parentsConfigurationId',
        hide: true,
      },
      {
        text: this.$t('MSG_TXT_APPY_SCP'),
        value: 'configurationApplyCode',
        hide: true,
      },
      {
        text: this.$t('MSG_TXT_CNFG_TYPE'),
        value: 'configurationTypeCode',
        hide: true,
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData();
      this.onLoad();
    });
  },

  methods: {
    loadData() {
      this.queryData.moduleCode.key = this.fromPsYn?this.psInitModule:utils.getParameter(this, 'module');
      this.queryData.subModuleCode.key = this.fromPsYn?this.psInitSubModule:utils.getParameter(this, 'subModule');
      this.mdDisabled = !utils.isEmpty(this.queryData.moduleCode.key);
      this.smdDisabled = !utils.isEmpty(this.queryData.subModuleCode.key);

      if (!this.mdDisabled && this.smdDisabled) {
        this.mdDisabled = true;
        this.smdDisabled = true;
        this.searchDisabled = true;
        return false;
      }
      return true;
    },
    onLoad() {
      const paramData = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramData)) {
        this.queryData = paramData;
        this.onSearchClick();
      }else if(this.fromPsYn){
        this.onSearchClick();
      }
      
    },
    onSearchClick() {
      const dataParams = {
        configurationTypeCode: this.queryData.configTypeSearchKey.key,
        configTypeSearchText: this.queryData.configTypeSearchText,
        moduleCode: this.queryData.moduleCode.key,
        subModuleCode: this.queryData.subModuleCode.key,
      };
      http.request(this.contextPageId, 'DTS_CMP_00079', {
        query: dataParams,
      }).then(res => {
        this.dsConfigGrp.setData(res.data);
      }).then(() => {
//      const firstRow = this.dsConfigGrp.data[0];
//      this.dsConfigGrp.setSelect(firstRow);
//      this.onClickGrpRow(firstRow);
      });
    },
    onResetClick() {
      if (!this.mdDisabled) {
        this.$refs.selectModule.selectMd('ALL');
      } else if (!this.smdDisabled) {
        this.$refs.selectModule.selectSmd('ALL');
      }
      this.queryData.configTypeSearchText = '';
      this.$refs.searchCondSelect.reset();
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMZ_00079';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      if (this.selectedGridRowData.configurationApplyCode === 'A') {
        if (idx === 1 || idx === 2) {
          this.$refs.tab.changeIdx(0);
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_APPY_SCP')));
          return;
        }
      } else if (this.selectedGridRowData.configurationApplyCode === 'M') {
        if (idx === 2) {
          this.$refs.tab.changeIdx(0);
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_APPY_SCP')));
          return;
        }
      } else if (this.selectedGridRowData.configurationApplyCode === 'S') {
        if (idx === 1) {
          this.$refs.tab.changeIdx(0);
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_APPY_SCP')));
          return;
        }
      }
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onExcelDownloadClick() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnConfigMgt;
      const objGridDataset = this.dsConfigMgt;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onClickGrpRow(row) {
      if (row) {
        this.selectedGrpGridRowData = row;
        const dataParams = {
          moduleCode: this.queryData.moduleCode.key,
          subModuleCode: this.queryData.subModuleCode.key,
          configurationTypeCode: this.queryData.configTypeSearchKey.key,
          configTypeSearchText: this.queryData.configTypeSearchText,
        };
        http.request(this.contextPageId, 'DTS_CMP_00078', {
          path: {
            'parent-config-id': this.dsConfigGrp.getSelected()[0].configurationId,
          },
          query: dataParams,
        }).then(res => {
          this.dsConfigGrp.setSelect(row);
          this.dsConfigMgt.setData(res.data);
          this.dsConfigGrp.setSelect(row);
        }).then(() => {
//        this.dsConfigMgt.setSelect(this.dsConfigMgt.data[0]);
//        this.onClickMgtRow(this.dsConfigMgt.data[0]);
        });
      } else if (this.selectedGrpGridRowData) {
        this.dsConfigGrp.setSelect(this.selectedGrpGridRowData);
      }
    },
    onClickMgtRow(row) {
      if (row) {
        this.selectedGridRowData = row;
        if (row.configurationApplyCode === 'A' || row.configurationApplyCode === 'M' || row.configurationApplyCode === 'S') {
          this.$refs.tab.changeIdx(0);
        }
      } else if (this.selectedGridRowData) {
        this.dsConfigMgt.setSelect(this.selectedGridRowData);
      }
    },
    onSelectSearchCond() {
      this.queryData.configTypeSearchText = '';
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.queryData.configTypeSearchText;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.queryData.configTypeSearchText = this.searchFieldOldText;
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
