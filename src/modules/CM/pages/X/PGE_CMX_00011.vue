<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_USE_YN')" />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="ynSelectUseYn"
              v-model="queryData.useYn"
              :defaultOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectSearchCondition"
              v-model="queryData.searchCondition"
              codeId="COD_MBL_APP_CATG_SEARCH_COND"
              :defaultOption="'all'"
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
        ref="gridMobileAppCategoryMgmt"
        :headers="columnMobileAppCategoryMgmt"
        :data-source="dsMobileAppCategoryMgmt"
        :showRowsPerPageControl="false"
        @grid:selected="onSelectRow"
      >
        <template class="comp_spacing" />
        <template
          #center-info
          class="btn_wrapL"
        >
          <sui-button
            class="comm_btn_gridTop"
            @click="onClickReordering"
          >
            {{ $t('MSG_TXT_RE_ORDER') }}
          </sui-button>
        </template>
        <template
          #right-info
          class="btn_wrapR"
        >
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
          @updateInfo="handleUpdated"
        />
      </sui-page-tab-box-type>
      <sui-popup
        v-model="showPopup"
        :title="popTitle"
      >
        <p01
          :pageId="contextPageId"
          @app-reorder-cancel="onPopupCancel"
          @app-reorder-save="onPopupSave"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import moment from 'moment';
// eslint-disable-next-line import/no-unresolved
import store from '~system/vuex';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMX_00011_T01.vue';
import tab02 from './components/PGE_CMX_00011_T02.vue';
import tab03 from './components/PGE_CMX_00011_T03.vue';
import p01 from './components/PGE_CMX_00011_P01.vue';

const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ROW_HEIGHT = 55;

export default {
  name: 'PGE_CMX_00011', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    tab03,
    p01,
  },
  extends: BasePage,
  data() {
    return {
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_APP_CATG'),
          component: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_APP'),
          component: tab02,
        },
        {
          tabTitle: this.$t('MSG_TXT_ROLE'),
          component: tab03,
        },

      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        useYn: '',
        deleteYn: '',
        searchCondition: '',
        searchText: '',
      },
      popTitle: this.$t('MSG_TXT_RE_ORDER'),
      showPopup: false,
      placeholderText: {
        searchText: utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CATG_ID'))
          .slice(0, -1).concat('/'.concat(this.$t('MSG_TXT_CATG_NM'))),
      },
      // eslint-disable-next-line new-cap
      dsMobileAppCategoryMgmt: new urDataSet(),
      savedId:'',
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnMobileAppCategoryMgmt = [
      {
        value: 'mobileApplicationCategoryId',
        text: this.$t('MSG_TXT_CATG_ID'),
      },
      {
        value: 'mobileApplicationCategoryName',
        text: this.$t('MSG_TXT_CATG_NM'),
      },
      {
        value: 'mobileApplicationCount',
        text: this.$t('MSG_TXT_APP_CNT'),
      },
      {
        value: 'useYn',
        text: this.$t('MSG_TXT_USE_YN'),
      },
      {
        value: 'finalModificationUserName',
        text: this.$t('MSG_TXT_FNL_MDFC_USR_ID'),
        component: {
          props: ['row'],
          template: `<cmp-user-name-link
            :pageId="this.$options.name"
            :displayType="'1'"
            :displayLanguageId="row.finalModificationDisplayLangId"
            :knoxId="row.finalModificationUserId"
            :userId="row.finalModificationUserId"
            :userName="row.finalModificationUserGlobalName"
            :userGlobalName="row.firstRegistrationUserGlobalName"
            :departmentName="row.finalModificationDepartmentName"
            :departmentEnglishName="row.finalModificationDepartmentEnglishName"
            :loginId="row.finalModificationLoginId"
            :type="'link'"
          />`,
        },
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_FNL_MDFC_DTM'),
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
      const paramDataCmx00011 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmx00011)) {
        this.queryData = paramDataCmx00011;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        useYn: this.queryData.useYn,
        deleteYn: 'N',
        searchCondition: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
      };
      http.request(this.contextPageId, 'DTS_CMX_00003', {
        query: dataParams,
      }).then(res => {
        this.formatDateInGrid(res.data);
        this.dsMobileAppCategoryMgmt.setData(res.data);
        this.selectedGridRowData = {};
        // this.$refs.gridMobileAppCategoryMgmt.resetSelect();
        if(!utils.isEmpty(this.savedId)){
          this.$refs.gridMobileAppCategoryMgmt.setSelect({mobileApplicationCategoryId: this.savedId});
          this.savedId = '';
        }        
      });
    },
    onClickReset() {
      this.$refs.ynSelectUseYn.reset();
      this.$refs.codeSelectSearchCondition.reset();
      this.queryData.searchText = '';
      this.$refs.codeSelectSearchCondition.reset();
    },
    onSetCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnMobileAppCategoryMgmt;
      const objGridDataset = this.dsMobileAppCategoryMgmt;
      const sToday = utils.now('YYYYMMDDHHmmss');
      // TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `Mobile_Application_Categories_${sToday}.xlsx`;
      this.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(event) {
      // if (this.dsMobileAppCategoryMgmt.getSelected().length === 0) {
      //   this.dsMobileAppCategoryMgmt.setSelect(event, false);
      // }
      if (!utils.isEmpty(event)) {
        this.selectedGridRowData = event;
      }
      
    },
    onClearSelectionMainGrid() {
      this.$refs.gridMobileAppCategoryMgmt.resetSelect();
    },
    onClickReordering() {
      this.showPopup = true;
    },
    onPopupCancel() {
      this.showPopup = false;
    },
    onPopupSave() {
      this.showPopup = false;
      this.onClickSearch();
    },
    formatDateInGrid(data) {
      data.forEach(obj => {
        // eslint-disable-next-line no-param-reassign
        obj.finalModificationDTM = moment(
          obj.finalModificationDTM,
          'YYYYMMDDHHmmss',
        ).format('DD/MM/YYYY HH:mm:ss');
      });
    },
    downloadGridToExcel(pageNm, columnObj, datasetObj, excelFileNm, metaObj) {
      let meta = {};

      if (metaObj) {
        meta = metaObj;
      }
      if (!meta.headerTitle) {
        meta.headerTitle = {};
        utils.forEach(columnObj, item => {
          if (item.datafield) {
            // jqx grid
            meta.headerTitle[item.datafield] = item.text;
          } else {
            // uidev gird
            meta.headerTitle[item.value] = item.text;
          }
        });
      }

      const data = datasetObj.getRawData();
      // dtmColumns not needed
      // const dtmColumns = [];
      const exportUserNameColumns = [];
      columnObj.forEach(column => {
        // if (column.datafield) {
        //   if (/(DTM|DT|DateTime)$/.test(column.datafield)) {
        //     dtmColumns.push(column.datafield);
        //   }
        // } else if (column.value) {
        //   if (/(DTM|DT|DateTime)$/.test(column.value)) {
        //     dtmColumns.push(column.value);
        //   }
        // }

        if (column.excelExportUserName) {
          // excelExportUserName에 Display값을 넣어 보냄. 1:Name, 2:Name/Department
          exportUserNameColumns.push({
            datafield: column.excelExportUserName.datafield,
            displayType: column.excelExportUserName.displayType,
          });
        }
      });
      data.forEach(item => {
        exportUserNameColumns.forEach(exportData => {
          const userName = `finalModificationUser${
            store.getters.userInfo.langId === 'en' ? 'Global' : ''
          }Name`;
          const departmentName = `finalModificationDepartment${
            store.getters.userInfo.langId === 'en' ? 'English' : ''
          }Name`;

          // eslint-disable-next-line no-param-reassign
          item[exportData.datafield] = (item[userName] !== null ? item[userName] : '')
            + (item[userName] !== null && exportData.displayType === 2
              ? ' / '
              : '')
            + (exportData.displayType === 2 ? item[departmentName] : '');
        });
      });

      const dataParams = {
        data,
        meta,
      };

      http
        .request(pageNm, 'DTS_CMZ_00042', {
          data: dataParams,
          responseType: 'arraybuffer',
        })
        .then(res => {
          utils.downloadBlob(res, excelFileNm);
        });
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
