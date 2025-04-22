<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_USR_ID')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldUserId"
              v-model="queryData.userId"
              maxlength="100"
              @keyup.enter="onClickSearch"
            />
          </div>
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
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MBL_APP_BNDL_ID')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldMobileApplicationModuleId"
              v-model="queryData.mobileApplicationModuleId"
              maxlength="100"
              @keyup.enter="onClickSearch"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MBL_APP_VER_ID')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldMobileApplicationVersionId"
              v-model="queryData.mobileApplicationVersionId"
              maxlength="100"
              @keyup.enter="onClickSearch"
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
        ref="gridMobileAppHomeScreenMgmt"
        :headers="columnMobileAppHomeScreenMgmt"
        :data-source="dsMobileAppHomeScreenMgmt"
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
import tab01 from './components/PGE_CMX_00014_T01.vue';

export default {
  name: 'PGE_CMX_00014', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  }, 
  extends: BasePage,
  data() {
    return {
      dsMobileAppHomeScreenMgmt: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: 'SUBTITLE',
          component: tab01,
        },

      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        userId: '',
        mobileApplicationId: '',
        mobileApplicationModuleId: '',
        mobileApplicationVersionId: '',
      },
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnMobileAppHomeScreenMgmt = [
      {
        value: 'userId',
        text: this.$t('MSG_TXT_USR_ID'),
      },
      {
        value: 'mobileApplicationId',
        text: this.$t('MSG_TXT_MBL_APP_ID'),
      },
      {
        value: 'mobileApplicationName',
        text: this.$t('MSG_TXT_MBL_APP_NM'),
      },
      {
        value: 'imageFilePath',
        text: this.$t('MSG_TXT_MBL_APP_LOGO'),
      },
      {
        value: 'mobileApplicationModuleId',
        text: this.$t('MSG_TXT_MBL_APP_BNDL_ID'),
      },
      {
        value: 'mobileApplicationVersionId',
        text: this.$t('MSG_TXT_MBL_APP_VER_ID'),
      },
      {
        value: 'mobileApplicationDestinationUrl',
        text: this.$t('MSG_TXT_MBL_APP_DSTN_URL'),
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
      const paramDataCmx00014 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmx00014)) {
        this.queryData = paramDataCmx00014;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        userId: this.queryData.userId,
        mobileApplicationId: this.queryData.mobileApplicationId,
        mobileApplicationModuleId: this.queryData.mobileApplicationModuleId,
        mobileApplicationVersionId: this.queryData.mobileApplicationVersionId,
      };
      http.request(this.contextPageId, 'DTS_CMX_00017', {
        query: dataParams,
      }).then(res => {
        this.$refs.gridMobileAppHomeScreenMgmt.resetSelect();
        this.dsMobileAppHomeScreenMgmt.setData(res.data);
      });
    },
    onClickReset() {
      this.queryData.userId = '';
      this.queryData.mobileApplicationId = '';
      this.queryData.mobileApplicationModuleId = '';
      this.queryData.mobileApplicationVersionId = '';
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMX_00014';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnMobileAppHomeScreenMgmt;
      const objGridDataset = this.dsMobileAppHomeScreenMgmt;
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
      this.$refs.gridMobileAppHomeScreenMgmt.resetSelect();
    }, 
     
  },
};
</script>

<style scoped>
</style>
