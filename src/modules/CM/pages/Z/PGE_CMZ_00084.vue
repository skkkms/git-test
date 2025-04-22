<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USE_SEL')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="comboUseYn"
              :selected="queryData.useYnValue"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectSearchCondition"
              v-model="queryData.searchCondition"
              codeId="COD_TENANT_SEARCH_COND"
              :defaultOption="'all'"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="queryData.searchText"
              maxlength="100"
              @keyup="onKeyUpInput"
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
        ref="gridTenant"
        :headers="columnTenant"
        :data-source="dsTenant"
        :options="options"
        :showRowsPerPageControl="false"
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
import tab01 from './components/PGE_CMZ_00084_T01.vue';
import tab02 from './components/PGE_CMZ_00084_T02.vue';
import p01 from './components/PGE_CMZ_00084_P01';

export default {
  name: 'PGE_CMZ_00084', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    p01,
  },
  extends: BasePage,
  data() {
    return {
      // eslint-disable-next-line new-cap
      dsTenant: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_TENANT'),
          component: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_DTL_INFO'),
          component: tab02,
        },

      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        searchCondition: '',
        searchText: '',
        useYnValue: {},
      },
      isShownMenuPopup: false,
      searchFieldOldText: '',
      savedId: '',
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnTenant = [
      {
        text: this.$t('MSG_TXT_TENANT_ID'),
        value: 'tenantId',
      },
      {
        text: this.$t('MSG_TXT_TENANT_NM'),
        value: 'tenantName',
      },
      {
        text: this.$t('MSG_TXT_USE_SEL'),
        value: 'useYn',
        width: 100,
      },
      {
        value: 'finalModificationUserName',
        text: this.$t('MSG_TXT_MDFC_USR'),
        excelExportUserName: { datafield: 'finalModificationUserName', displayType: 1 }, // excelExportUserName에 dataField, Display값을 넣어 보냄. 1:Name, 2:Name/Department
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :pageId="'${this.contextPageId}'"
              :displayType="'1'"
              :displayLanguageId="row.finalModificationDisplayLangId"
              :loginId='row.finalModificationLoginId'
              :knoxId="row.finalModificationKnoxId"
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
        text: this.$t('MSG_TXT_MDFC_DTM'),
        customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: 170,
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
      const paramDataCmz00084 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmz00084)) {
        this.queryData = paramDataCmz00084;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        searchCondition: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
        searchUseYn: this.queryData.useYnValue.key,
      };
      http.request(this.contextPageId, 'DTS_CMZ_00163', {
        query: dataParams,
      }).then(res => {
        this.dsTenant.setData(res.data);
        this.clearGridSelection();
        if(!utils.isEmpty(this.savedId)){
          this.$refs.gridTenant.setSelect({tenantId: this.savedId});
          this.savedId = '';
        }          
      });
    },
    onClickReset() {
      this.$refs.codeSelectSearchCondition.reset();
      this.$refs.comboUseYn.reset();
      this.queryData.searchText = '';
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMZ_00084';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnTenant;
      const objGridDataset = this.dsTenant;
      const sToday = utils.now('YYYYMMDDHHmmss');
      // TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `${this.$t('MSG_TIT_TENANT')}_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(row) {
      if (row) {
        this.selectedGridRowData = row;
      }
    },
    clearGridSelection() {
      this.$refs.gridTenant.resetSelect();
      this.selectedGridRowData = {};
    },
    menuPopupOpenOrClose() {
      this.isShownMenuPopup = !this.isShownMenuPopup;
    },
    setTenantModule(data) {
      this.selectedGridRowData = data;
      this.menuPopupOpenOrClose();
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.queryData.searchText;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.queryData.searchText = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
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
