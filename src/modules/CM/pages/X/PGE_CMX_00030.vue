<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_PRD')" />
          </div>
          <div class="col-xs-5">
            <ur-range-picker
              ref="datePicker"
              v-model="rangeDate"
              one-input-mode
              init="week-1"
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MBL_APP')" />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="mblAppCondType"
              :selected="mobileApplication"
              :optionList="appList"
              :initialSelectedIndex="0"
              :defaultOption="'all'"
              @list-clicked="loadVersionList"
            />
            <div class="comp_spacing" />
            <sui-custom-select
              ref="mblVersionCondType"
              :selected="queryData.mobileApplicationVersionId"
              :optionList="versionList"
              :initialSelectedIndex="0"
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
        ref="gridMobilePortalUsageStatus"
        :headers="columnMobileApplicationUsageStatus"
        :data-source="dsMobileApplicationUsageStatus"
        :showRowsPerPageControl="false"
        :options="options"
        :initialRowsPerPage="10"
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
    </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00030', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      appList: [],
      versionList: [],
      // appId,
      // eslint-disable-next-line new-cap
      dsMobileApplicationUsageStatus: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsMobileAppList: new urDataSet(),
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      rangeDate: [],
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      queryData: {
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
      },
      mobileApplication:{
        key: '',
        label: '',
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.columnMobileApplicationUsageStatus = [
      {
        value: 'mobileApplicationName',
        text: this.$t('MSG_TXT_MBL_APP_NM'),
      },
      {
        value: 'mobileApplicationVersionName',
        text: this.$t('MSG_TXT_MBL_APP_VER_NM'),
      },
      {
        value: 'totalInstallation',
        text: this.$t('MSG_TXT_TOT_ISTL'),
      },
      {
        value: 'totalRun',
        text: this.$t('MSG_TXT_TOT_APP_RUN'),
      },
    ];
  },
  mounted() {
    this.loadAppList();
  },

  methods: {
    loadAppList() {
      http.request(this.contextPageId, 'DTS_CMX_00027', {
        query: {},
      }).then(res => {
        const result = res.data.map(item => ({
          key: item.mobileApplicationId,
          label: item.mobileApplicationName,
        }));
        this.appList = result;

        this.dsMobileAppList.setData(res.data);
      });
    },
    loadVersionList() {
      const mobileApplicationId = this.mobileApplication.key;
      http.request(this.contextPageId, 'DTS_CMX_00034', {        
        path: {
          'mobile-application-id': mobileApplicationId,
        },
      }).then(res => {
        const result = res.data.map(item => ({
          key: item.mobileApplicationVersionId,
          label: item.mobileApplicationVersionName,
        }));
        this.versionList = result;
      });
    },
    onClickSearch() {
      const dataParams = {
        startDate: utils.dateformatToServer(this.rangeDate[0]).substr(0, 8),
        endDate: utils.dateformatToServer(this.rangeDate[1]).substr(0, 8),
        mobileApplicationId: this.mobileApplicationId,
        mobileApplicationVersionId: this.queryData.mobileApplicationVersionId,
      };
      http.request(this.contextPageId, 'DTS_CMX_00047', {
        query: dataParams,
      }).then(res => {
        this.dsMobileApplicationUsageStatus.setData(res.data);
      });
    },
    onClickReset() {
      this.$refs.mblAppCondType.reset();
      this.$refs.mblVersionCondType.reset();
      const dToday = utils.now('YYYY-MM-DD');
      this.rangeDate = [utils.dateformatToClient(utils.addDay(dToday, -6), 'S'),utils.dateformatToClient(dToday)];      
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnMobileApplicationUsageStatus;
      const objGridDataset = this.dsMobileApplicationUsageStatus;
      const sToday = utils.now('YYYYMMDDHHmmss');
      // TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },

  },
};
</script>

<style scoped>
</style>
