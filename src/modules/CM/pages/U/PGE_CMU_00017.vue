<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_ID')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldWordId"
              v-model="queryData.wordId"
              maxlength="40"
              @keyup.enter="onClickSearch"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_NM')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldWordName"
              v-model="queryData.wordName"
              maxlength="40"
              @keyup.enter="onClickSearch"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_NATU_NM')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldWordNatureName"
              v-model="queryData.wordNatureName"
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
        ref="mainGrid"
        :headers="columnDictionary"
        :data-source="dsDictionary"
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
          @onClickSearch="onClickSearch"
          @updateInfo="handleUpdated"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMU_00017_T01.vue';


export default {
  name: 'PGE_CMU_00017', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  },
  extends: BasePage,
  data() {
    return {
      dsDictionary: new urDataSet(),
      options: {
        multiSelect: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_WRD'),
          component: tab01,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        wordId: '',
        wordName: '',
        wordNatureName: '',
      },
      savedId:'',
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnDictionary = [
      {
        value: 'wordId',
        text: this.$t('MSG_TXT_WRD_ID'),
      },
      {
        value: 'wordName',
        text: this.$t('MSG_TXT_WRD_NM'),
      },
      {
        value: 'wordNatureName',
        text: this.$t('MSG_TXT_WRD_NATU_NM'),
      },
      {
        value: 'finalModificationUserId',
        text: this.$t('MSG_TXT_MDFC_USR'),
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :pageId="'PGE_CMU_00017'"
              :displayType="'1'"
              :displayLanguageId="row.finalModificationDisplayLangId"
              :userId="row.finalModificationUserId"
              :userName="row.finalModificationUserName"
              :userGlobalName="row.finalModificationUserGlobalName"
              :departmentName="row.finalModificationDepartmentName"
              :departmentEnglishName="row.finalModificationDepartmentEnglishName"
              :type="'link'"
            />`,
        },
        width: '200px',
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_MDFC_DTM'),
        customValue(value, row) {
          return utils.dateformatToClient(value);
        },
        width: '170px',
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad('PGE_CMU_00017');
    });
  },

  methods: {
    onLoad(oPageId) {
      const paramDataCmu00017 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmu00017)) {
        this.queryData = paramDataCmu00017;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        wordId: this.queryData.wordId,
        wordName: this.queryData.wordName,
        wordNatureName: this.queryData.wordNatureName,
      };
      http.request(this.contextPageId, 'DTS_CMU_00124', {
        query: dataParams,
      }).then(res => {
        this.dsDictionary.setData(res.data);
        this.selectedGridRowData = {};
        if(!utils.isEmpty(this.savedId)){
          this.$refs.mainGrid.setSelect({wordId: this.savedId});
          this.savedId = '';  
        }
      });
    },
    onClickReset() {
      this.queryData.wordId = '';
      this.queryData.wordName = '';
      this.queryData.wordNatureName = '';
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMU_00017';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnDictionary;
      const objGridDataset = this.dsDictionary;
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
    handleUpdated(savedId) {
      this.savedId = savedId;
      this.onClickSearch();
    },    
  },
};
</script>

<style scoped>
</style>
