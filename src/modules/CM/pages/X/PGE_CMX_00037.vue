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
              init="week-1"
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
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
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_VER')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="condType"
              :selected="selectedValues.COD_PLAC_SEARCH_COND"
              codeId="COD_PLAC_SEARCH_COND"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="textFieldVersionId"
              v-model="queryData.versionUid"
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
      <div class="mrB30">
        <sui-s-grid
          ref="gridMobilePortalUsageStatus"
          :headers="columnMobilePortalUsageStatus"
          :data-source="dsMobilePortalUsageStatus"
          :showRowsPerPageControl="false"
          :options="options"
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
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMX_00037', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      dsMobilePortalUsageStatus: new urDataSet(),
      selectedValues: {
        COD_PLAC_SEARCH_COND: {
          label: '',
          key: '',
        },
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      rangeDate: [],
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      queryData: {
        startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'), 
        mobilePortalStateCode: '',
        codeId: '',
        versionUid: '',
      },
    };
  },

  computed: {},

  watch: {},

  created() {
    this.columnMobilePortalUsageStatus = [
      {
        value: 'mobilePortalVersionId',
        text: this.$t('MSG_TXT_VER_ID'),
      },
      {
        value: 'mobilePortalVersionName',
        text: this.$t('MSG_TXT_MBL_APP_VER_NM'),
      },
      {
        value: 'mobilePortalStateName',
        text: this.$t('MSG_TXT_MBL_PORTL_STT_CD'),
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
  },
  methods: {
    onClickSearch() {

      this.queryData.codeId = this.selectedValues.COD_PLAC_SEARCH_COND.key;
      
      const dataParams = {
        startDate: utils.dateformatToServer(this.rangeDate[0]).substr(0, 8),
        endDate: utils.dateformatToServer(this.rangeDate[1]).substr(0, 8),
        mobilePortalStateCode: this.queryData.mobilePortalStateCode,
        searchCondition: this.queryData.codeId,
        searchString: this.queryData.versionUid,
      }
      http.request(this.contextPageId, 'DTS_CMX_00053', {
        query: dataParams,
      }).then(res => {
          
        for(var i=0; i<res.data.length; i++) {
          
          const stateCode = res.data[i].mobilePortalStateCode;
          if(stateCode[1] == '0') {
            res.data[i].mobilePortalStateName = 'In Development';
          } else if(stateCode[1] == '1') {
            res.data[i].mobilePortalStateName = 'Test';
          } else if(stateCode[1] == '2') {
            res.data[i].mobilePortalStateName = 'In Use';
          } else {
            res.data[i].mobilePortalStateName = 'On Stop';
          }
        }
        this.dsMobilePortalUsageStatus.setData(res.data);
      });
    },
    onClickReset() {
      const dToday = utils.now('YYYY-MM-DD');
      this.rangeDate = [utils.dateformatToClient(utils.addDay(dToday, -6), 'S'),utils.dateformatToClient(dToday)];
      this.$refs.condType.reset();
      this.queryData.versionUid = '';
      this.$refs.codeSelectMobilePortalStateCode.reset();
    },

    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnMobilePortalUsageStatus;
      const objGridDataset = this.dsMobilePortalUsageStatus;
      const sToday = utils.now('YYYYMMDDHHmmss');
      //TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    
  },
};
</script>

<style scoped>
</style>
