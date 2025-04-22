<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
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
              ref="selectModuleCode"
              :pageId="this.$options.name"
              :selectedMd="searchFrame.selectedCodeValue.moduleCode"
              :selectedSmd="searchFrame.selectedCodeValue.subModuleCode"
              :defaultSmdOption="'all'"
              class="dp_flex"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_METHOD')"
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
              :label="$t('MSG_TXT_DTSVC_STT')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectDataServiceStateCode"
              :selected="searchFrame.selectedCodeValue.dataServiceStateCode"
              :pageId="this.$options.name"
              codeId="COD_DTSVC_STT"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
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
              ref="selectDataServiceCommunicationTypeCode"
              :selected="searchFrame.selectedCodeValue.dataServiceCommunicationTypeCode"
              :pageId="this.$options.name"
              codeId="COD_DTSVC_CMNC_TYPE"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
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
              ref="selectDataServiceUseYn"
              :selected="searchFrame.selectedCodeValue.dataServiceUseYn"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
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
              style="width:58%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model.trim="searchFrame.dataServiceSearchWord"
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
      <!-- <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_DTSVC_LIST") }}</h4>
      </div> -->
      <sui-s-grid
        ref="mainGrid"
        :data-source="dsMain"
        :headers="gridColumns"
        :options="options"
        :showRowsPerPageControl="false" 
        @grid:selected="onGridSelected"
      >
        <template #right-info>
          <sui-button
            type="button"
            class="comm_btn_gridTop comm_ico_excel"
            @click="onExcelDnLoad"
          >
            {{ $t('MSG_BTN_EXCEL_DOWN') }}
          </sui-button>
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <!-- <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_DTSVC_DTL_INFO") }}</h4>
      </div> -->
      <sui-page-tab-box-type
        ref="tabs"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        :tabItems="tabItems"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          :dataServiceIdentification="dataServiceIdentification"
          :pageId="this.$options.name"
          @updateInfo="handleUpdated"
          @onClearSelectionMainGrid="onGridClear"
          @research="onSearchClick"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
import tab01 from './components/PGE_CMU_00002_T01';
import tab02 from './components/PGE_CMU_00002_T02';
import tab03 from './components/PGE_CMU_00002_T03';
import BasePage from '~cm/components/BasePage';

const dateTypeFields = ['firstRegistrationDTM', 'finalModificationDTM'];
export default {
  name: 'PGE_CMU_00002', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    tab03,
  },
  extends: BasePage,
  data() {
    return {
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
          dataServiceCommunicationTypeCode: {
            label: '',
            key: '',
          },
          dataServiceTypeCode: {
            label: '',
            key: '',
          },
          dataServiceStateCode: {
            label: '',
            key: '',
          },
          dataServiceSearchCond: {
            label: '',
            key: '',
          },
          dataServiceUseYn: {
            label: '',
            key: '',
          },
        },
        dataServiceSearchWord: '',
      },
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_DTSVC'),
          tabComponent: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_PAGE'),
          tabComponent: tab02,
          ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_DATASERVICE_YN') === 'false'? false : true,
        },
        // {
        //   tabTitle: this.$t('MSG_TXT_ROLE'), // '권한 상세'
        //   tabComponent: tab03,
        // },
      ],
      currentTabComponent: tab01,
      defaultTabIndex: 0,
      searchFieldOldText: '',
      dataServiceIdentification: '',
      localdata0: [],
      // eslint-disable-next-line new-cap
      dsMain: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      updatedId:'',
    };
  },
  created() {
    this.gridColumns = [{
      text: this.$t('MSG_TXT_TYPE'),
      value: 'dataServiceCommunicationTypeName',
      width: '100px',
    }, {
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
      text: this.$t('MSG_TXT_DTSVC_URL'),
      value: 'dataServiceUniformresourcelocator',
    }, {
      text: this.$t('MSG_TXT_METHOD'),
      value: 'dataServiceTypeName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_STT'),
      value: 'dataServiceStateName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_USE_YN'),
      value: 'dataServiceUseYn',
      width: '80px',
    }, {
      text: this.$t('MSG_TXT_MDFC_USR'),
      value: 'finalModificationUserId',
      width: '200px',
    }, {
      text: this.$t('MSG_TXT_MDFC_DTM'),
      value: 'finalModificationDTM',
      width: '170px',
      customValue(value) {
        return utils.dateformatToClient(value);
      },
    }];
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    onResetClick() {
      this.searchFrame.dataServiceSearchWord = '';
      utils.forEach(this.$refs, (ref, key) => {
        if (utils.startsWith(key, 'select')) {
          ref.reset();
        }
      });
      this.$refs.selectModuleCode.selectMd('CM');
    },
    getSearchData() {
      const data = {};
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'dataServiceSearchWord')) {
          data[key] = value;
        } else {
          utils.forEach(this.searchFrame.selectedCodeValue, (codeValue, codekey) => {
            data[codekey] = codeValue.key;
          });
        }
      });
      return data;
    },
    onSearchClick() {
      if (!utils.isEmpty(this.dataServiceIdentification)) {
        this.dataServiceIdentification = '';
      }
      const queryParams = this.getSearchData();
      http.request(this.$options.name, 'DTS_CMU_00007', {
        query: queryParams,
      }).then(res => {
        // utils.dateformatToClientInArray(res.data, dateTypeFields);
        this.dsMain.setData(this.setUserInfoFormat(res.data));
        if(!utils.isEmpty(this.updatedId)){
          this.$refs.mainGrid.setSelect({dataServiceIdentification: this.updatedId});
          this.updatedId = '';
        }        
      }).catch(error => {
        console.log(error);
      });
    },
    // 그리드 데이터 엑셀로 다운로드
    onExcelDnLoad() {
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `dataservice_management_${sToday}.xlsx`;
      const columns = [
        { text: this.$t('MSG_TXT_TYPE'), value: 'dataServiceCommunicationTypeName' },
        { text: this.$t('MSG_TXT_MDLE'), value: 'moduleName' },
        { text: this.$t('MSG_TXT_SMDLE'), value: 'subModuleName' },
        { text: this.$t('MSG_TXT_DTSVC_ID'), value: 'dataServiceIdentification' },
        { text: this.$t('MSG_TXT_DTSVC_NM'), value: 'dataServiceName' },
        { text: this.$t('MSG_TXT_DTSVC_URL'), value: 'dataServiceUniformresourcelocator' },
        { text: this.$t('MSG_TXT_METHOD'), value: 'dataServiceTypeName' },
        { text: this.$t('MSG_TXT_STT'), value: 'dataServiceStateName' },
        { text: this.$t('MSG_TXT_USE_YN'), value: 'dataServiceUseYn' },

        { text: this.$t('MSG_TXT_MDFC_USR'), value: 'finalModificationUserName' },
        { text: this.$t('MSG_TXT_MDFC_DTM'), value: 'finalModificationDTM' },
      ];
      // utils.downloadGridToExcel(this.$options.name, this.defaultGridData.columns, this.dsMain, sExcelName);
      utils.downloadGridToExcel(this.$options.name, columns, this.dsMain, sExcelName);
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
      this.dsMain.removeSelected();
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.searchFrame.dataServiceSearchWord;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.searchFrame.dataServiceSearchWord = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    onGridSelected(dataRow) {
      if (!utils.isEmpty(dataRow)) {
        const { dataServiceIdentification } = dataRow;
        this.dataServiceIdentification = dataServiceIdentification;
      }
    },
    handleUpdatedPage(savedId) {
      this.updatedId = savedId;
      this.onSearchClick();
    },    
  },
};
</script>
<style scoped>
</style>
