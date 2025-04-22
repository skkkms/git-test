<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />
    <!-- Page Contents -->
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              class="dp_flex"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PAGE_UE_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="comboPageUe"
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
              :label="$t('MSG_TXT_PAGE_STT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="comboPageStt"
              :selected="frame0.selectData.COD_PAGE_STT"
              :pageId="this.$options.name"
              codeId="COD_PAGE_STT"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
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
              ref="comboUseYn"
              :selected="frame0.selectData.useYnValue"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <!-- <div
            v-if="deviceApplyYn"
            class="col-xs-1"
          >
            <sui-input-label :label="$t('MSG_TXT_DVC_TYPE')" :required="false" :vertical="false"></sui-input-label>
          </div>
          <div
            v-if="deviceApplyYn"
            class="col-xs-5"
          >
            <sui-multi-select
              ref="deviceMultiDropdown"
              v-model="deviceSelectValue"
              :placeholder="placeholder"
              :options="deviceTypeList"
              :multiple="true"
              :closeOnSelect="false"
              :useAllOption="true"
            />
          </div> -->
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="comboSearchCond"
              :selected="frame0.selectData.COD_PAGE_SEARCH_COND"
              :pagedId="this.$options.name"
              codeId="COD_PAGE_SEARCH_COND"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
              style="width:58%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="frame0.codPageSearchText"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearchClick"
            />
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5 nodata" />
        </div>
        <div class="btn_wrap">
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Reset"
            @click="onResetSearch"
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
        :headers="defaultGridData.columns"
        :data-source="dsMain"
        :options="options"
        :initialRowsPerPage="5"
        :showRowsPerPageControl="false"
        @grid:row-click="onSelectGrid"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="onExcelDnLoad"
          >
            {{ $t('MSG_BTN_EXCEL_DOWN') }}
          </sui-button>          
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <sui-page-tab-box-type
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          ref="tabPage"
          :pageId="this.$options.name"
          :selectedPageId="selectedPageID"
          :deviceApplyYn="deviceApplyYn"          
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
          @onSearchClick="onSearchClick"
          @page-deactivate="handleChildDeactivated" 
          @page-activate="handleChildActivated"
          @updatePageInfo="handleUpdatedPage"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMU_00001_T01';
import tab02 from './components/PGE_CMU_00001_T02';
import tab03 from './components/PGE_CMU_00001_T03';
import tab04 from './components/PGE_CMU_00001_T04';
import tab05 from './components/PGE_CMU_00001_T05';
import tab06 from './components/PGE_CMU_00001_T06';
import tab07 from './components/PGE_CMU_00001_T07';
import { urDataSet } from 'uidev-component/index.js';
const dateTypeFields = ['firstRegistrationDTM', 'finalModificationDTM',
  'pageUsePriodStartDatetime', 'pageUsePriodFinishDatetime'];

/* global http */
export default {
  name: 'PGE_CMU_00001', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  components: {
    tab01,
    tab02,
    tab03,
    tab04,
    tab05,
    tab06,
    tab07,
  },
  data() {
    return {
      deviceApplyYn: utils.getConfigurationValue('CFG_CMZ_DVC_TYPE_APPY_YN') === 'Y',
      selectedPageID: '',
      updatedPageID: '',
      codes: CommonConstants.selectOptions(),
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_PAGE'),
          tabComponent: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_DTSVC'), // '데이터서비스',
          tabComponent: tab02,
          ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_DATASERVICE_YN') === 'false'? false : true,
        },
        {
          tabTitle: this.$t('MSG_TXT_MSG_RESO'), // '메시지자원',
          tabComponent: tab03,
          ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_MESSAGE_RESOURCE_YN') === 'false'? false : true,
        },
        {
          tabTitle: this.$t('MSG_TXT_CMPNT'), // '컴포넌트'
          tabComponent: tab04,
          ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_DATASERVICE_YN') === 'false'? (utils.getConfigurationValue('YML_UIFRAMEWORK_MESSAGE_RESOURCE_YN') === 'false'? false : true) : true,
        },
        {
          tabTitle: this.$t('MSG_TXT_PRMT'), // '파라미터'
          tabComponent: tab05,
        },
        {
          tabTitle: this.$t('MSG_TXT_MANU'), // '메뉴얼'
          tabComponent: tab06,
        },
        // {
        //   tabTitle: this.$t('MSG_TXT_ROLE'), // '권한 상세'
        //   tabComponent: tab07,
        // },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
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
            label: '',
            key: '',
          },
          COD_PAGE_STT: {
            label: this.$t('MSG_TXT_ALL'),
            key: 'ALL',
          },
          COD_PAGE_SEARCH_COND: {
            label: this.$t('MSG_TXT_ALL'),
            key: 'ALL',
          },
          deviceTypeValue: 0,
          useYnValue: {},
        },
        codPageSearchText: '',
      },

      gridList: [],
      selectedGridRowData: {},

      localdata0: [],
      dsMain: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },

      defaultSelectedTab: 0,
      defaultGridData: {
        dataSource: {
          localdata: [],
          datatype: 'json',
          editable: true,
          selectionmode: 'singlecell',
          editmode: 'click',
        },
        altrows: true,
        showcolumnlines: false,
        showcolumnheaderlines: false,
      },
      deviceSelectValue: [],
      deviceValueList:[],
      placeholder: this.$t('MSG_TXT_ALL'),
      searchFieldOldText: '',
    };
  },
  
  created() {
    this.deviceTypeList = [];
    this.defaultGridData.columns = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_PAGE_UE_NM'),
        value: 'pageUseName',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_PAGE_ID'),
        value: 'pageId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_PAGE_NM'),
        value: 'pageName',
      },
      {
        text: this.$t('MSG_TXT_DVC_TYPE'),
        value: 'deviceTypeName',
        width: 120,
        hidden: !this.deviceApplyYn,
      },
      {
        text: this.$t('MSG_TXT_PAGE_STT'),
        value: 'pageStatusName',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_USE_YN'),
        value: 'pageUseYn',
        width: 80,
      },
      {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'firstRegistrationUserId',
        width: 200,
      },
      {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        width: 170,
        customValue(value){
          return utils.dateformatToClient(value);
        }
      },
    ];
  },
  mounted() {
    this.loadDeviceCode();
  },
  methods: {
    loadDeviceCode() {
      http.getCodeList(this.pageId, ['COD_DVC_TYPE'], '').then(res => {
        utils.forEach(res['COD_DVC_TYPE'], (value, key) => {
          this.deviceTypeList.push(
            { key: value.key, label: value.codeName },
          );
          this.deviceSelectValue.push(
            { key: value.key, label: value.codeName },
          );
          this.deviceValueList.push(
            { key: value.key, label: value.codeName },
          );
        });
      }).catch(err => {
        console.log(err);
      });
    },    
    // 그리드 데이터 엑셀로 다운로드
    onExcelDnLoad() {
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `page_management_${sToday}.xlsx`;
      const columns = [
        { text: this.$t('MSG_TXT_MDLE'), datafield: 'moduleName' },
        { text: this.$t('MSG_TXT_SMDLE'), datafield: 'subModuleName' },
        { text: this.$t('MSG_TXT_UE'), datafield: 'pageUseName' },
        { text: this.$t('MSG_TXT_PAGE_ID'), datafield: 'pageId' },
        { text: this.$t('MSG_TXT_PAGE_NM'), datafield: 'pageName' },
        { text: this.$t('MSG_TXT_DVC_TYPE'), datafield: 'deviceTypeName' },
        { text: this.$t('MSG_TXT_PAGE_STT'), datafield: 'pageStatusName' },
        { text: this.$t('MSG_TXT_USE_YN'), datafield: 'pageUseYn' },
        { text: this.$t('MSG_TXT_MDFC_USR'), datafield: 'finalModificationUserName' },
        { text: this.$t('MSG_TXT_MDFC_DTM'), datafield: 'finalModificationDTM' },
      ];
      // utils.downloadGridToExcel(this.$options.name, this.defaultGridData.columns, this.dsMain, sExcelName);
      utils.downloadGridToExcel(this.$options.name, columns, this.dsMain, sExcelName);
    },

    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onSearchClick() {
      const codeValue = this.frame0.selectData;
      if(this.deviceApplyYn) {
        codeValue.deviceTypeValue = this.calculateDeviceTypeValue();
      }

      const queryParams = {
        moduleCode: utils.trim(codeValue.COD_MDLE.key) || '',
        subModuleCode: utils.trim(codeValue.COD_SMDLE.key) || '',
        pageUseCode: utils.trim(codeValue.COD_PAGE_UE.key) || '',
        pageUseYn: utils.trim(codeValue.useYnValue.key) || '',
        pageStatusCode: utils.trim(codeValue.COD_PAGE_STT.key) || '',
        deviceTypeValue: codeValue.deviceTypeValue ? codeValue.deviceTypeValue : 0,
        searchPageCond: utils.trim(codeValue.COD_PAGE_SEARCH_COND.key) || '',
        searchPageText: utils.toUpper(utils.trim(this.frame0.codPageSearchText)) || '',
      };
      http.request(this.$options.name, 'DTS_CMU_00002', {
        query: queryParams,
      }).then(res => {
        this.defaultGridData.dataSource.localdata = [];
        this.setUserInfoFormat(res.data);
        this.gridList = utils.cloneDeep(res.data);
        this.localdata0 = res.data;
        this.dsMain.setData(this.localdata0);

        if(!utils.isEmpty(this.updatedPageID)){
          this.$refs.mainGrid.setSelect({pageId: this.updatedPageID});
          this.updatedPageID = '';
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onSelectGrid(row) {
      if (this.dsMain.getSelected().length === 0) {
        this.dsMain.setSelect(row, false);
      }
      if (row) {
        this.selectedGridRowData = row;
        this.selectedPageID = this.selectedGridRowData.pageId;
      }
      else {
        this.selectedPageID = '';
      }
    },
    onResetSearch() {
      this.$refs.comboPageUe.reset();
      this.$refs.comboPageStt.reset();
      this.$refs.comboUseYn.reset();
      this.$refs.comboSearchCond.reset();

      if (this.deviceApplyYn) {
        this.deviceSelectValue = this.deviceValueList;
      }
      this.frame0.selectData.deviceTypeValue = 0;
      this.frame0.codPageSearchText = '';
      this.$refs.smComboFrame0.selectMd('CM');
    },
    onClearSelectionMainGrid() {
      this.$refs.mainGrid.resetSelect();
      this.selectedPageID = '';
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
    calculateDeviceTypeValue() {
      let ret = 0;
      utils.forEach(this.deviceSelectValue, (item, key) => {
        ret += Number(item.key);
      });
      return ret;
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
    handleUpdatedPage(savedPageId) {
      this.updatedPageID = savedPageId;
      this.onSearchClick();
    },
  },
};
</script>
<style scoped>
</style>
