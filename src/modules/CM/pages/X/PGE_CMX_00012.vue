<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MBL_APP_ID')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldMobileApplicationId"
              v-model="queryData.mobileApplicationId"
              maxlength="100"
              @keyup.enter="onClickSearch"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SV_UDT_YN')" />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="ynSelectServerUpdateYn"
              v-model="queryData.serverUpdateYn"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SRCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="gridMobileAppStatus"
        :headers="columnMobileAppStatus"
        :data-source="dsMobileAppStatus"
        :showRowsPerPageControl="false"
        :options="options"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="onClickExcelDownload"
          >
            {{ $t('MSG_BTN_EXCEL_DOWN') }}
          </sui-button>          
        </template>
      </sui-s-grid>
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
          :selectedGridRowData="selectedGridRowData"
          @onClickSearch="onClickSearch"
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';
import tab01 from './components/PGE_CMX_00012_T01.vue';

export default {
  name: 'PGE_CMX_00012', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  }, 
  extends: BasePage,
  data() {
    return {
      dsMobileAppStatus: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_STS'),
          component: tab01,
        },

      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        mobileApplicationId: '',
        serverUpdateYn: '',        
      },
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnMobileAppStatus = [
      {
        value: 'mobileApplicationId',
        text: this.$t('MSG_TXT_MBL_APP_ID'),
      },
      {
        value: 'mobileApplicationVersionId',
        text: this.$t('MSG_TXT_VER_ID'),
      },
      {
        value: 'mobileApplicationVersionName',
        text: this.$t('MSG_TXT_VER_NM'),
      },
      {
        value: 'versionTitle',
        text: this.$t('MSG_TXT_VER_TTL'),
      },
      {
        value: 'versionMessage',
        text: this.$t('MSG_TXT_VER_MSG'),
      },
      {
        value: 'dataChargeTitle',
        text: this.$t('MSG_TXT_DATA_CHRG_TTL'),
      },
      {
        value: 'dataChargeMessage',
        text: this.$t('MSG_TXT_DATA_CHRG_MSG'),
      },
      {
        value: 'serverUpdateTitle',
        text: this.$t('MSG_TXT_SV_UDT_TTL'),
      },
      {
        value: 'serverUpdateMessage',
        text: this.$t('MSG_TXT_SV_UDT_MSG'),
      },
      {
        value: 'serverUpdateYn',
        text: this.$t('MSG_TXT_SV_UDT_YN'),
      },
      {
        value: 'serverUpdateStartDTM',
        text: this.$t('MSG_TXT_SV_UDT_START_DTM'),
        customValue: function(value, row) {
          return utils.dateformatToClient(value)
        },
      },
      {
        value: 'serverUpdateEndDTM',
        text: this.$t('MSG_TXT_SV_UDT_END_DTM'),
        customValue: function(value, row) {
          return utils.dateformatToClient(value)
        },
      },      
    ];    
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    onLoad() {
      const paramDataCmx00012 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmx00012)) {
        this.queryData = paramDataCmx00012;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        mobileApplicationId: this.queryData.mobileApplicationId,
        serverUpdateYn: this.queryData.serverUpdateYn,
      };
      http.request(this.contextPageId, 'DTS_CMX_00022', {
        query: dataParams,
      }).then(res => {
        this.$refs.gridMobileAppStatus.resetSelect();
        this.dsMobileAppStatus.setData(res.data);
      });
    },
    onClickReset() {
      this.queryData.mobileApplicationId = '';
      this.$refs.ynSelectServerUpdateYn.reset();
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMX_00012';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnMobileAppStatus;
      const objGridDataset = this.dsMobileAppStatus;
      const sToday = utils.now('YYYYMMDDHHmmss');
      //TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(row) {
      if(row) {
        this.selectedGridRowData = row;
      }
    },
    onClearSelectionMainGrid() {
      this.$refs.gridMobileAppStatus.resetSelect();
    }, 
     
  },
};
</script>

<style scoped>
</style>
