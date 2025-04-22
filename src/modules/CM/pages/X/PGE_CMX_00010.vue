<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_VER_ID')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldVersionId"
              v-model="queryData.versionId"
              maxlength="25"
              :placeholder="placeholderText.versionId"
              @keyup.enter="onClickSearch"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_VER_NM')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldVersionName"
              v-model="queryData.versionName"
              maxlength="100"
              :placeholder="placeholderText.versionName"
              @keyup.enter="onClickSearch"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MBL_PORTL_STT_CD')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectMobilePortalStateCode"
              v-model="queryData.mobilePortalStateCode"
              codeId="COD_MBL_PORTL_STT_CD"
              :defaultOption="'all'"
            />
          </div>
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
        ref="gridMobilePortalManagement"
        :headers="columnMobilePortalManagement"
        :data-source="dsMobilePortalManagement"
        :showRowsPerPageControl="false"
        :options="options"
        @grid:row-click="onSelectRow"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="onClickExcelDownload"
          >
            {{ $t("MSG_BTN_EXCEL_DOWN") }}
          </sui-button>
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <sui-page-tab-box-type
        ref="tab"
        class="comm_tab_box"
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
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import moment from 'moment';
// eslint-disable-next-line import/no-unresolved
import store from '~system/vuex';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMX_00010_T01.vue';
import tab02 from './components/PGE_CMX_00010_T02.vue';
import tab03 from './components/PGE_CMX_00010_T03.vue';

export default {
  name: 'PGE_CMX_00010', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    tab03,
  },
  extends: BasePage,
  data() {
    return {
      // eslint-disable-next-line new-cap
      dsMobilePortalManagement: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: 'Mobile Portal',
          component: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_ROLE'),
          component: tab02,
        },
        {
          tabTitle: 'Revision History',
          component: tab03,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        versionId: '',
        versionName: '',
        mobilePortalStateCode: '',
        useYn: '',
      },
      placeholderText: {
        versionId: utils
          .strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_VER_ID'))
          .slice(0, -1),
        versionName: utils
          .strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_VER_NM'))
          .slice(0, -1),
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.columnMobilePortalManagement = [
      {
        value: 'versionId',
        text: this.$t('MSG_TXT_VER_ID'),
      },
      {
        value: 'versionName',
        text: this.$t('MSG_TXT_VER_NM'),
        width: '250px',
      },
      {
        value: 'mobilePortalforcedVersionYn',
        text: this.$t('MSG_TXT_MBL_PORTL_FRCD_VER_YN'),
      },
      {
        value: 'mobilePortalStateName',
        text: this.$t('MSG_TXT_MBL_PORTL_STT_CD'),
      },
      {
        value: 'useYn',
        text: this.$t('MSG_TXT_USE_YN'),
      },
      {
        value: 'finalModificationUserName',
        text: this.$t('MSG_TXT_MDFC_USR'),
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
        text: this.$t('MSG_TXT_MDFC_DTM'),
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad('PGE_CMX_00010');
    });
  },

  methods: {
    onLoad(oPageId) {
      const paramDataCmx00010 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmx00010)) {
        this.queryData = paramDataCmx00010;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        versionId: this.queryData.versionId,
        versionName: this.queryData.versionName,
        mobilePortalStateCode: this.queryData.mobilePortalStateCode,
        useYn: this.queryData.useYn,
      };
      http
        .request(this.contextPageId, 'DTS_CMX_00012', {
          query: dataParams,
        })
        .then(res => {
          this.formatDateInGrid(res.data);
          // To view corresponding values for codes
          this.dsMobilePortalManagement.setData(res.data);
          this.selectedGridRowData = {};
        });
    },
    onClickReset() {
      this.queryData.versionId = '';
      this.queryData.versionName = '';
      this.$refs.codeSelectMobilePortalStateCode.reset();
      this.$refs.ynSelectUseYn.reset();
    },
    onSetCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnMobilePortalManagement;
      const objGridDataset = this.dsMobilePortalManagement;
      const sToday = utils.now('YYYYMMDDHHmmss');
      // TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `excel_${sToday}.xlsx`;
      this.downloadGridToExcel(
        sPageId,
        objGridColumns,
        objGridDataset,
        sExcelName,
        {},
      );
    },
    onSelectRow(event) {
      if (this.dsMobilePortalManagement.getSelected().length === 0) {
        this.dsMobilePortalManagement.setSelect(event, false);
      }


      if (!utils.isEmpty(event)) {
        this.selectedGridRowData = event;
      } else {
        this.selectedGridRowData = {};
      }
    },
    onClearSelectionMainGrid() {
      this.$refs.gridMobilePortalManagement.resetSelect();
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
  },
};
</script>

<style scoped>
.comm_tab_box::v-deep .sui-tab-box-type__header-item {
  overflow: visible;
}
</style>
