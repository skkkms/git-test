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
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              v-model="queryData.searchCondition"
              :optionList="searchConditionsList"
              :disabled="false"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="textFieldSearchText"
              v-model="queryData.searchText"
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
        ref="gridOpenSourceLicense"
        :headers="columnOpenSourceLicense"
        :data-source="dsOpenSourceLicense"
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
          @updateInfo="handleUpdated"
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
import tab01 from './components/PGE_CMX_00041_T01.vue';

export default {
  name: 'PGE_CMX_00041', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  }, 
  extends: BasePage,
  data() {
    return {
      dsOpenSourceLicense: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_OPEN_SRC_LIC'),
          component: tab01,
        },

      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
        searchCondition: '',
        searchText: '',
      },
      searchConditionsList: [
            { key: 'ALL', label: 'All' },
            { key: 'NAME', label: 'Open Source License Name' },
            { key: 'URL', label: 'Open Source License URL' },
      ],
      savedId:'',
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.queryData.searchCondition = 'ALL';
    this.columnOpenSourceLicense = [
      {
        value: 'mobileApplicationId',
        text: this.$t('MSG_TXT_MBL_APP_ID'),
      },
      {
        value: 'mobileApplicationVersionId',
        text: this.$t('MSG_TXT_MBL_APP_VER_ID'),
      },
      {
        value: 'openSourceLicenseName',
        text: this.$t('MSG_TXT_OPEN_SORC_LICS_NM'),
      },
      {
        value: 'openSourceLicenseUrl',
        text: this.$t('MSG_TXT_OPEN_SORC_LICS_URL'),
      },
      // {
      //   value: 'firstRegistrationDTM',
      //   text: this.$t('MSG_TXT_FST_RGST_DTM'),
      //   customValue: function(value, row) {
      //     return utils.dateformatToClient(value)
      //   },
      // },
      // {
      //   value: 'firstRegistrationUserId',
      //   text: this.$t('MSG_TXT_FST_RGST_USR_ID'),
      // },
      {
        text: this.$t("MSG_TXT_FNL_MDFC_USR_ID"),
        value: "finalModificationUserName",
        component: {
          props: ["row", "value"],
          template: `<cmp-user-name-link
              :pageId="'PGE_CMX_00041'"
              :displayType="'1'"
              :displayLanguageId="row.finalModificationDisplayLangId"
              :userId="row.finalModificationUserId"
              :userName="row.finalModificationUserName"
              :userGlobalName="row.finalModificationUserGlobalName"
              :departmentName="row.finalModificationDepartmentName"
              :departmentEnglishName="row.finalModificationDepartmentEnglishName"
              :type="'link'"
            />`
        },
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_FNL_MDFC_DTM'),
        customValue: function(value, row) {
          return utils.dateformatToClient(value)
        },
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad('PGE_CMX_00041');
    });
  },

  methods: {
    onLoad() {
      const paramDataCmx00041 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmx00041)) {
        this.queryData = paramDataCmx00041;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        mobileApplicationId: this.queryData.mobileApplicationId,
        mobileApplicationVersionId: this.queryData.mobileApplicationVersionId,
        searchCondition: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
      };
      http.request(this.contextPageId, 'DTS_CMX_00055', {
        query: dataParams,
      }).then(res => {
        this.$refs.gridOpenSourceLicense.resetSelect();
        this.dsOpenSourceLicense.setData(res.data);
        if(!utils.isEmpty(this.savedId)){
          this.$refs.gridOpenSourceLicense.setSelect({openSourceLicenseUid: this.savedId});
          this.savedId = '';
        }         
      });
    },
    onClickReset() {
      this.queryData.mobileApplicationId = '';
      this.queryData.mobileApplicationVersionId = '';
      this.queryData.searchCondition = 'ALL';
      this.queryData.searchText = '';
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMX_00041';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnOpenSourceLicense;
      const objGridDataset = this.dsOpenSourceLicense;
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
      this.$refs.gridOpenSourceLicense.resetSelect();
    }, 
    handleUpdated(updatedId){
      this.savedId = updatedId;
      this.onClickSearch();
    }   
  },
};
</script>

<style scoped>
</style>
