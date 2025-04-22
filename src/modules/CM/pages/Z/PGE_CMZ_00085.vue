<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <!-- 카테고리 -->
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_CATG')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectCategory"
              v-model="queryData.category"
              codeId="COD_MDLE"
              :defaultOption="'all'"
            />
          </div>
          <!-- 사용 여부 -->
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_USE_YN')" />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="useYn"
              :selected="queryData.useYn"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <!-- 검색조건 -->
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectSearchCondition"
              v-model="queryData.searchCondition"
              codeId="COD_DSBD_SEARCH_COND"
              :defaultOption="'all'"
            />
            <div class="comp_spacing" />
            <sui-text-field
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
      <!-- <mui-table
        ref="gridDictionary"
        :columns="columns"
        :data="data"
        :scrollable="true"
        scrollHeight="300px"
        frozenWidth="150px"
      /> -->
      <mui-grid
        :columns="columns"
        :data="data"
        :scrollable="true"
        sortMode="single"
        scrollHeight="280px"
        frozenWidth="250px"
      />
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
          @clearGridSelection="clearGridSelection"
          @research="onClickSearch"
          @openModulePopup="setTenantModule"
        />
      </sui-page-tab-box-type>
      <sui-popup
        v-model="isShownMenuPopup"
        :title="$t('MSG_TIT_TENANT_MDLE')"
      >
        <p01
          :parentPageId="contextPageId"
          :selectedGridRowData="selectedGridRowData"
          @closePopup="menuPopupOpenOrClose"
          @research="onClickSearch"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>

<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMZ_00085_T01.vue';
import tab02 from './components/PGE_CMZ_00084_T02.vue';
// import p01 from './components/PGE_CMZ_00084_P01';

export default {
  name: 'PGE_CMZ_00085', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    // tab02,
    // p01,
  },
  extends: BasePage,
  data() {
    return {
      // eslint-disable-next-line new-cap
      dsDashboard: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        { tabTitle: (this.$t('MSG_TXT_DASHBOARD')), component: tab01 },
        { tabTitle: (this.$t('MSG_TXT_ROLE')), component: tab02 },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        searchCondition: '',
        searchText: '',
      },
      isShownMenuPopup: false,
      selected: null,
      data: [
        {
          id: 'P01',
          group: 'Smart',
          productName: 'Galaxy-A10',
          thisYear: 319,
          lastYear: 365,
          diff: -46,
        },
        {
          id: 'P02',
          group: 'Smart',
          productName: 'Galaxy-A20',
          thisYear: 438,
          lastYear: 462,
          diff: -24,
        },
        {
          id: 'P03',
          group: 'Smart',
          productName: 'Galaxy-S10',
          thisYear: 380,
          lastYear: 503,
          diff: -123,
        },
        {
          id: 'P04',
          group: 'Smart',
          productName: 'Galaxy-S20',
          thisYear: 337,
          lastYear: 455,
          diff: -118,
        },
        {
          id: 'P05',
          group: 'Smart',
          productName: 'Galaxy-A30',
          thisYear: 414,
          lastYear: 470,
          diff: -56,
        },
        {
          id: 'P06',
          group: 'Smart',
          productName: 'Galaxy-A50',
          thisYear: 499,
          lastYear: 372,
          diff: 127,
        },
        {
          id: 'N01',
          group: 'Note',
          productName: 'Galaxy Note 7',
          thisYear: 445,
          lastYear: 402,
          diff: 43,
        },
        {
          id: 'N02',
          group: 'Note',
          productName: 'Galaxy Note 8',
          thisYear: 499,
          lastYear: 488,
          diff: 11,
        },
        {
          id: 'N03',
          group: 'Note',
          productName: 'Galaxy Note 9',
          thisYear: 368,
          lastYear: 458,
          diff: -90,
        },
        {
          id: 'N04',
          group: 'Note',
          productName: 'Galaxy Note 10 Galaxy Note 10',
          thisYear: 346,
          lastYear: 422,
          diff: -76,
        },
        {
          id: 'T01',
          group: 'Tablet',
          productName: 'Galaxy Tab A 8.0',
          thisYear: 472,
          lastYear: 445,
          diff: 27,
        },
        {
          id: 'T02',
          group: 'Tablet',
          productName: 'Galaxy Tab A 10.1',
          thisYear: 467,
          lastYear: 324,
          diff: 143,
        },
        {
          id: 'T03',
          group: 'Tablet',
          productName: 'Galaxy Tab S6',
          thisYear: 474,
          lastYear: 430,
          diff: 44,
        },
        {
          id: 'T04',
          group: 'Tablet',
          productName: 'Galaxy Tab S7',
          thisYear: 361,
          lastYear: 453,
          diff: -92,
        },
      ],
      columns: [
        {
          field: 'group',
          header: '그룹',
          sortable: true,
          frozen: true,
          _custom: {
            width: '80',
          },
        },
        {
          field: 'productName',
          header: '상품명',
          frozen: true,
          _custom: {
            width: '150',
          },
        },
        {
          field: 'id',
          header: 'ID',
          _custom: {
            width: '560',
            align: 'center',
          },
        },
        {
          field: 'thisYear',
          header: '2020년',
          sortable: true,
          _custom: {
            width: '100',
            numberYn: 'Y',
          },
        },
        {
          field: 'lastYear',
          header: '2019년',
          sortable: true,
          _custom: {
            width: '100',
            numberYn: 'Y',
          },
        },
        {
          field: 'diff',
          header: '차이',
          sortable: true,
          _custom: {
            width: '100',
            numberYn: 'Y',
          },
        },
      ],
      columns2: [
        {
          field: 'productName',
          header: '상품명',
          frozen: true,
          _custom: {
            width: '150',
          },
        },
        {
          field: 'id',
          header: 'ID',
          _custom: {
            width: '60',
            align: 'center',
          },
        },
        {
          field: 'thisYear',
          header: '2020년',
          sortable: true,
          _custom: {
            width: '100',
            numberYn: 'Y',
          },
        },
        {
          field: 'lastYear',
          header: '2019년',
          sortable: true,
          _custom: {
            width: '100',
            numberYn: 'Y',
          },
        },
        {
          field: 'diff',
          header: '차이',
          _custom: {
            width: '100',
            numberYn: 'Y',
          },
        },
      ],

      // columnOptions: {
      //   // frozenCount: 2,
      //   // frozenBorderWidth: 2,
      //   resizable: true,
      // },
      // treeColumnOptions: {
      //   name: 'c1',
      // },
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnDashboard = [
      {
        text: this.$t('MSG_TXT_CATG'), // 카테고리
        value: 'categoryName',
      },
      {
        text: this.$t('MSG_TXT_DSBD_ID'), // 대시보드 ID
        value: 'dashboardId',
      },
      {
        text: this.$t('MSG_TXT_DSBD_NM'), // 대시보드 명
        value: 'dashboardName',
      },
      {
        text: this.$t('MSG_TXT_USE_YN'), // 사용여부
        value: 'useYn',
      },
      {
        value: 'finalModificationUserId',
        text: this.$t('MSG_TXT_FNL_MDFC_USR_ID'),
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :pageId="'${this.contextPageId}'"
              :displayType="'1'"
              :displayLanguageId="row.finalModificationDisplayLangId"
              :loginId='row.finalModificationLoginId'
              :userId="row.finalModificationUserId"
              :userName="row.finalModificationUserName"
              :userGlobalName="row.finalModificationUserGlobalName"
              :departmentName="row.finalModificationDepartmentName"
              :departmentEnglishName="row.finalModificationDepartmentEnglishName"
              :type="'link'"
            />`,
        },
        width: 200,
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_FNL_MDFC_DTM'),
        customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: 150,
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
      const paramDataCmz00085 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmz00085)) {
        this.queryData = paramDataCmz00085;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        searchCondition: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
      };
      http.request(this.contextPageId, 'DTS_CMZ_00163', {
        query: dataParams,
      }).then(res => {
        this.dsDashboard.setData(res.data);
        this.clearGridSelection();
      });
    },
    onClickReset() {
      this.$refs.codeSelectSearchCondition.reset();
      this.queryData.searchText = '';
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMZ_00085';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnDashboard;
      const objGridDataset = this.dsDashboard;
      const sToday = utils.now('YYYYMMDDHHmmss');
      // TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(row) {
      if (row) {
        this.selectedGridRowData = row;
      }
    },
    clearGridSelection() {
      // this.$refs.gridTenant.resetSelect();
      this.selectedGridRowData = {};
    },
    menuPopupOpenOrClose() {
      this.isShownMenuPopup = !this.isShownMenuPopup;
    },
    setTenantModule(data) {
      this.selectedGridRowData = data;
      this.menuPopupOpenOrClose();
    },
  },
};
</script>

<style scoped>
</style>
