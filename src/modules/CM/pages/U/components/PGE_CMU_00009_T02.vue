<template>
  <div class=" width100">
    <div class="mrB15" />
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SEARCH_PRD')"
            :vertical="false"
            :required="true"
          />
        </div>
        <div class="col-xs-11">
          <ur-range-picker
            ref="dp"
            v-model="newFormatRangeDate"
            one-input-mode
            style="width: 20% !important;"
            init="today"
            :inputType=this.userDateFormat
            :modelType=this.userDateFormat              
          />
          <div class="comm_line_div" />
          <div class="info">
            *{{ $t("MSG_TXT_SEARCH_UNDER_7") }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DEPT')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-s-grid
            ref="grid"
            class="width100"
            :initialRowsPerPage="3"
            :headers="gridColumns0"
            :data-source="dsDept"
            :showRowsPerPageControl="false"
            :options="options0"
          >
            <template #left-info>
              <div class="comp_spacing" />
              <div
                class="btn_wrap"
              >
                <ur-button
                  type="button"
                  class="comm_btn_gridTop"
                  small
                  @click="onClickBtnDeptPop"
                >
                  {{ $t("MSG_BTN_ADD") }}
                </ur-button>
                <ur-button
                  type="button"
                  class="comm_btn_gridTop"
                  style="margin-left: 8px"
                  small
                  @click="onClickBtnDeptDelete"
                >
                  {{ $t("MSG_BTN_DEL") }}
                </ur-button>
              </div>
            </template>
          </sui-s-grid>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-s-grid
            ref="grid1"
            class="width100"
            :initialRowsPerPage="3"
            :headers="gridColumns1"
            :data-source="dsPage"
            :showRowsPerPageControl="false"
            :options="options1"
          >
            <template #left-info>
              <div class="comp_spacing" />
              <div
                class="btn_wrap"
              >
                <ur-button
                  type="button"
                  class="comm_btn_gridTop"
                  small
                  @click="onClickBtnPagePop"
                >
                  {{ $t("MSG_BTN_ADD") }}
                </ur-button>
                <ur-button
                  type="button"
                  class="comm_btn_gridTop"
                  style="margin-left: 8px"
                  small
                  @click="onClickBtnPageDelete"
                >
                  {{ $t("MSG_BTN_DEL") }}
                </ur-button>
              </div>
            </template>
          </sui-s-grid>
        </div>
      </div>
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_Reset"
          @click="onClickBtnReset"
        >
          {{ $t("MSG_BTN_RESET") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_Scr"
          @click="onClickBtnSearch"
        >
          {{ $t("MSG_BTN_SEARCH") }}
        </sui-button>
      </div>
    </div>
    <div class="mrB30" />
    <sui-s-grid
      ref="grid2"
      :headers="gridColumns2"
      :data-source="dsPageStats"
      :showRowsPerPageControl="false"
      @grid:scroll-bottom="onAddList"
    >
      <template #right-info>
        <sui-button
          v-permission:download="pageId"
          type="button"
          class="comm_btn_gridTop comm_ico_excel"
          @click="onDownloadExcel"
        >
          {{ $t("MSG_BTN_EXCEL_DOWN") }}
        </sui-button>
      </template>
    </sui-s-grid>
    <div class="btn_moreView" >
      <p>
        {{ showMoreCount }}
      </p>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00009_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      required: true,
      default: 'PGE_CMU_00009',
    },
  },
  data() {
    return {
      isPageing: false,
      pageing: {
        pagePerCount: 1000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },

      userDateFormat: this.$store.getters.userInfo.dateFormat,

      /*  eslint max-len: ["error", { "code": 200 }] */
      msgResultUnder: `*${this.$t('MSG_TXT_SRCH_RSLT')} ${utils.strFormat(this.$t('MSG_TXT_DISPLAY_RSULT_UNDER'), 1000)}`,

      rangeDate: {
        from: utils.now(this.$store.getters.userInfo.dateFormat),
        to: utils.now(this.$store.getters.userInfo.dateFormat),
      },
      newFormatRangeDate: [utils.now(this.$store.getters.userInfo.dateFormat), utils.now(this.$store.getters.userInfo.dateFormat)],

      // 더보기
      showMoreSearchBox: {},

      localdata0: [],
      localdata1: [],
      localdata2: [],

      options0: {
        selectCheck: true,
        selectCheckOnly: true,
        multiSelect: true,
      },
      options1: {
        selectCheck: true,
        selectCheckOnly: true,
        multiSelect: true,
      },
      gridColumns0: [{
        text: this.$t('MSG_TXT_CPNY'),
        value: 'companyName',
      }, {
        text: this.$t('MSG_TXT_DEPT_NM'),
        value: 'departmentName',
      }, {
        text: this.$t('MSG_TXT_DEPT_CD'),
        value: 'departmentId',
      }],

      gridColumns1: [{
        text: this.$t('MSG_TXT_PAGE_ID'),
        value: 'pageId',
      }, {
        text: this.$t('MSG_TXT_PAGE_NM'),
        value: 'pageName',
      }, {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleCode',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleCode',
      }],

      gridColumns2: [{
        text: this.$t('MSG_TXT_USR_ID'),
        value: 'userId',
        width: 200,
      }, {
        text: this.$t('MSG_TXT_EMAIL'),
        value: 'email',
        width: 200,
      }, {
        text: this.$t('MSG_TXT_USR_NM'),
        value: 'userName',
      }, {
        text: this.$t('MSG_TXT_DEPT_NM'),
        value: 'departmentName',
      }, {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleCodeName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleCodeName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_PAGE_ID'),
        value: 'pageId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_PAGE_NM'),
        value: 'pageName',
      }, {
        text: this.$t('MSG_TXT_ITCN_DTM'),
        value: 'firstRegistrationDTM',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: 170,
      }],

      dsDept: new urDataSet(),
      dsPage: new urDataSet(),
      dsPageStats: new urDataSet(),
    };
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    showMoreCount() {
      return `${ utils.numberFormat(this.pageing.count)} / ${utils.numberFormat(this.pageing.totalCount)}`;
    },
  },
  watch: {
    newFormatRangeDate(newValue) {
      this.rangeDate = {
        from: newValue[0],
        to: newValue[1],
      };
    },
  },
  mounted() {},

  methods: {
    /** ***************************************************************************
    이벤트 영역
    ***************************************************************************** */
    onClickBtnDeptPop() {
      utils.openLayerPopup('PGE_CMY_00005', this.onDeptPopupClose, {
        pageInitialData: {},
        size: 'lg',
      });
    },
    onDeptPopupClose(objDeptList) {
      utils.forEach(objDeptList, item => {
        const objDept = {
          companyCode: item.companyCode,
          companyName: item.companyName,
          departmentName: item.value,
          departmentId: item.id,
        };
        this.dsDept.addRow(objDept);
      });
    },
    onClickBtnDeptDelete() {
      this.dsDept.removeRows(this.dsDept.getSelected());
    },
    onClickBtnPagePop() {
      utils.openLayerPopup('PGE_CMU_00004', this.onPagePopupClose, {
        pageInitialData: {
          multiSelect: true,
        },
        size: 'lg',
      });
    },
    onPagePopupClose(objPageList) {
      utils.forEach(objPageList, item => {
        const objPage = {
          pageId: item.pageId,
          pageName: item.pageName,
          moduleCode: item.moduleCode,
          subModuleCode: item.subModuleCode,
        };
        this.dsPage.addRow(objPage);
      });
    },
    onClickBtnPageDelete() {
      this.dsPage.removeRows(this.dsPage.getSelected());
    },
    onClickBtnSearch() {
      // date picker validation
      if (this.onClickValidate()) return false;
      // 일자
      const sStartDate = this.rangeDate.from !== null && this.rangeDate.from !== '' ? utils.dateformatToServer(this.rangeDate.from) : '';
      const sEndDate = this.rangeDate.to !== null && this.rangeDate.to !== '' ? utils.dateformatToServer(this.rangeDate.to) : '';

      if (utils.isEmpty(sStartDate) || utils.isEmpty(sEndDate)) {
        utils.messageBox('warning', this.$t('MSG_TXT_SEARCH_UNDER_7'));
        return false;
      }

      // 7일 이내로 검색
      if ((utils.isEmpty(sStartDate) === false && utils.isEmpty(sEndDate))
        || (utils.isEmpty(sEndDate) === false && utils.isEmpty(sStartDate))
        || utils.getDayOffset(utils.dateformatToServer(this.rangeDate.to).slice(0,8), utils.dateformatToServer(this.rangeDate.from).slice(0,8)) > 6) {
        utils.messageBox('warning', this.$t('MSG_TXT_SEARCH_UNDER_7'));
        return false;
      }

      this.pageing.currentPage = 1;
      this.pageing.totalCount = 0;
      this.pageing.count = 0;

      this.dsPageStats.setData([]);

      this.setShowMoreSearchBox(sStartDate, sEndDate);
      this.searchPageStats();

      return true;
    },
    onClickBtnReset() {
      this.resetSearchBox();
    },
    onDownloadExcel() {
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `pageLog_dept_${sToday}.xlsx`;

      utils.downloadGridToExcel(this.pageid, this.gridColumns2, this.dsPageStats, sExcelName);
    },
    onAddList() {
      // 더보기
      if (this.isPageing) {
        this.pageing.currentPage += 1;
        this.searchPageStats();
      }
    },
    /** ***************************************************************************
    함수 영역
    ***************************************************************************** */
    setShowMoreSearchBox(sStartDate, sEndDate) {
      // companyCode|deptId List
      const departmentList = [];
      utils.forEach(this.dsDept.data, item => {
        departmentList.push(`${item.companyCode}|${item.departmentId}`);
      });
      // pageIdList
      const pageIdList = [];
      utils.forEach(this.dsPage.data, item => {
        pageIdList.push(item.pageId);
      });

      const queryParams = {
        departmentList: departmentList.join(','),
        pageIdList: pageIdList.join(','),
        startDate: sStartDate.substr(0, 8),
        endDate: `${sEndDate.substr(0, 8)}235959`,
      };

      this.showMoreSearchBox = queryParams;
      return false;
    },
    resetSearchBox() {
      this.dsDept.setData([]);
      this.dsPage.setData([]);

      // this.rangeDate = { from: utils.now('YYYY-MM-DD'), to: utils.now('YYYY-MM-DD') };
      //this.newFormatRangeDate = [utils.now(this.userDateFormat), utils.now(this.userDateFormat)];
      const dToday = utils.now('YYYY-MM-DD');
      this.newFormatRangeDate = [utils.dateformatToClient(dToday),utils.dateformatToClient(dToday)];      
    },
    searchPageStats() {
      // // date picker validation
      // if (this.onClickValidate()) return false;
      // // 일자
      // const sStartDate = this.rangeDate.from !== null && this.rangeDate.from !== '' ? utils.dateformatToServer(this.rangeDate.from) : '';
      // const sEndDate = this.rangeDate.to !== null && this.rangeDate.to !== '' ? utils.dateformatToServer(this.rangeDate.to) : '';

      // if (utils.isEmpty(sStartDate) || utils.isEmpty(sEndDate)) {
      //   utils.messageBox('warning', this.$t('MSG_TXT_SEARCH_UNDER_7'));
      //   return false;
      // }

      // // 7일 이내로 검색
      // if ((utils.isEmpty(sStartDate) === false && utils.isEmpty(sEndDate))
      //   || (utils.isEmpty(sEndDate) === false && utils.isEmpty(sStartDate))
      //   || utils.getDayOffset(this.rangeDate.to, this.rangeDate.from) > 6) {
      //   utils.messageBox('warning', this.$t('MSG_TXT_SEARCH_UNDER_7'));
      //   return false;
      // }

      // // companyCode|deptId List
      // const departmentList = [];
      // utils.forEach(this.dsDept.data, item => {
      //   departmentList.push(`${item.companyCode}|${item.departmentId}`);
      // });
      // // pageIdList
      // const pageIdList = [];
      // utils.forEach(this.dsPage.data, item => {
      //   pageIdList.push(item.pageId);
      // });

      // const queryParams = {
      //   departmentList: departmentList.join(','),
      //   pageIdList: pageIdList.join(','),
      //   startDate: sStartDate.substr(0, 8),
      //   endDate: sEndDate.substr(0, 8),
      // };

      const queryParamsCmp00009 = utils.cloneDeep(this.showMoreSearchBox);

      // pageing
      utils.assign(queryParamsCmp00009, { pagePerCount: this.pageing.pagePerCount });
      utils.assign(queryParamsCmp00009, { currentPage: this.pageing.currentPage });

      http.request(this.pageId, 'DTS_CMU_00054', {
        query: queryParamsCmp00009,
      }).then(res => {
        if (res.data.length > 0) {
          this.pageing.totalCount = res.data[0].totalCount;
        }
        // 실제 사용하는 데이터만 필터링
        const { data } = this.dsPageStats;
        // 기본 가이드
        const newData = [];
        utils.forEach(data, row => newData.push(row));
        utils.forEach(res.data, row => newData.push(row));
        this.dsPageStats.setData(newData, { preventBackup: true });
      }).then(() => {
        this.pageing.count = this.dsPageStats.data.length;
        if (this.dsPageStats.data.length !== 0 && this.pageing.count < this.pageing.totalCount) {
          this.isPageing = true;
        } else {
          this.isPageing = false;
        }
      }).catch(error => {
        console.log(error);
      });
      return true;
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // date picker validation
      // if (this.onClickValidate()) return false;
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
</style>
