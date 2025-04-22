<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_OS_VER_CD')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldOSVersionName"
              v-model="queryData.oSVersionName"
              maxlength="100"
              :placeholder="placeholderText.oSVersionName"
              @keyup.enter="onClickSearch"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_OS_NM') + ' / ' + $t('MSG_TXT_OS_API_LVL')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldoSApiLevel"
              v-model="queryData.oSApiLevel"
              maxlength="100"
              :placeholder="placeholderText.oSApiLevel"
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
        ref="gridMasterDataMgmtForBAS"
        :initial-pagesize="5"
        :headers="columnMasterDataMgmtForBAS"
        :showRowsPerPageControl="false"
        :data-source="dsMasterDataMgmtForBAS"
        :options="options"
        @grid:selected="onSelectRow"
      >
      <template #right-info>
        <sui-button
          type="button"
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
import tab01 from './components/PGE_CMX_00019_T01.vue';

export default {
  name: 'PGE_CMX_00019', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  }, 
  extends: BasePage,
  data() {
    return {
      dsMasterDataMgmtForBAS: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_ANDROID_OS'), 
          component: tab01,
        },

      ],
      placeholderText: {
        oSVersionName: utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OS_VER_CD')).slice(0, -1),
        oSApiLevel: utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OS_NM')).slice(0, -1).concat('/'.concat(this.$t('MSG_TXT_OS_API_LVL'))),
      },
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        oSVersionName: '',
        oSApiLevel: '',
      },
      savedId:'',
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnMasterDataMgmtForBAS = [
      {
        value: 'osid',
        text: this.$t('MSG_TXT_OS_ID'),
      },
      {
        value: 'ostypeName',
        text: this.$t('MSG_TXT_OS_TYP'),
      },
      {
        value: 'osversionName',
        text: this.$t('MSG_TXT_OS_VER_CD'),
      },
      {
        value: 'osname',
        text: this.$t('MSG_TXT_OS_NM'),
      },
      {
        value: 'osapiLevel',
        text: this.$t('MSG_TXT_OS_API_LVL'),
      },
      {
        value: 'useYn',
        text: this.$t('MSG_TXT_USE_YN'),
      },
      {
        text: this.$t('MSG_TXT_FNL_MDFC_USR_ID'),
        value: 'finalModificationUserName',
        width: '300',
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
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
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_FNL_MDFC_DTM'),
        width: '170',
        customValue(value) {
          return utils.dateformatToClient(value);
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
      const paramDataCmx00019 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmx00019)) {
        this.queryData = paramDataCmx00019;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        oSVersionName: this.queryData.oSVersionName,
        oSApiLevel: this.queryData.oSApiLevel,
      };
      http.request(this.contextPageId, 'DTS_CMX_00021', {
        query: dataParams,
      }).then(res => {
        this.dsMasterDataMgmtForBAS.setData(res.data);
        if(!utils.isEmpty(this.savedId)){
          this.$refs.gridMasterDataMgmtForBAS.setSelect({osid: this.savedId});
          this.savedId = '';
        }        
      });
    },
    onClickReset() {
      this.queryData.oSVersionName = '';
      this.queryData.oSApiLevel = '';
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMX_00019';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnMasterDataMgmtForBAS;
      const objGridDataset = this.dsMasterDataMgmtForBAS;
      const sToday = utils.now('YYYYMMDDHHmmss');
      //TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(row) {
      if (!utils.isEmpty(row)) {
        this.selectedGridRowData = row;
      }
    },    
    onClearSelectionMainGrid() {
     // this.dsMasterDataMgmtForBAS.clearSelected();
      this.selectedGridRowData = {};
      this.$refs.gridMasterDataMgmtForBAS.resetSelect();
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
