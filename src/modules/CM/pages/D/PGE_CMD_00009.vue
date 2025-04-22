<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              defaultMdOption="select"
              defaultSmdOption="all"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_DOC_ID')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="attachDocumentId"
              v-model.trim="frame0.attachDocumentId"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput($event,'attachDocumentId')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXTS')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="fileExtensionName"
              v-model.trim="frame0.fileExtensionName"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearch"
            />
          </div>

          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_GROUP')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="atthGrpCond"
              :selected="frame0.selectData.COD_ATTH_GRP_SEARCH_COND"
              codeId="COD_ATTH_GRP_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="groupSearchText"
              v-model.trim="frame0.groupSearchText"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput($event,'groupSearchText')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_ITEM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="atthItemCond"
              :selected="frame0.selectData.COD_ATTH_ITEM_SEARCH_COND"
              codeId="COD_ATTH_ITEM_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="itemSearchText"
              v-model.trim="frame0.itemSearchText"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput($event,'itemSearchText')"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PRD')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <ur-range-picker
              ref="rangeDate"
              v-model="dateValue1"
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="dloadHisCond"
              :selected="frame0.selectData.COD_DLOAD_HIS_SEARCH_COND"
              codeId="COD_DLOAD_HIS_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <!-- </div>
          <div class="col-xs-4"> -->
            <sui-text-field
              ref="histSearchText"
              v-model.trim="frame0.histSearchText"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput($event,'histSearchText')"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :multiselect="false"
        :data-source="dsDownloadHist"
        :showDisplayCountControl="false"
        :headers="gridColumns0"
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
        @grid:scroll-bottom="onAddList"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="onClickExcelDown"
          >
            {{ $t("MSG_BTN_EXCEL_DOWN") }}
          </sui-button>
        </template>
      </sui-s-grid>
      <div
        class="btn_moreView"
      >
        <p>
          {{ showMoreCount }}
        </p>
      </div>
    </sui-page-contents>

    <sui-popup
      v-model="isShownPopup"
      :title="$t('MSG_TIT_DLOAD_RSN')"
    >
      <p01
        :pageId="this.$options.name"
        :fileDownloadReasonContent="fileDownloadReasonContent"
        @onClickClose="onClickClose('isShownPopup')"
      />
    </sui-popup>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import p01 from './components/PGE_CMD_00009_P01';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

const dateFields = [
  'firstRegistrationDTM',
  'finalModificationDTM',
  'pageUsePriodStartDatetime',
  'pageUsePriodFinishDatetime',
  'fileDownloadDTM',
];
const nowDateFormat = 'YYYY-MM-DD';
export default {
  name: 'PGE_CMD_00009', // eslint-disable-line vue/name-property-casing
  components: { p01 },
  extends: BasePage,
  data() {
    return {
      ispaging: false,
      dateValue1: [],
      // eslint-disable-next-line new-cap
      dsDownloadHist: new urDataSet(),
      paging: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },
      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_ATTH_GRP_SEARCH_COND: {
            label: '',
            key: '',
          },
          COD_ATTH_ITEM_SEARCH_COND: {
            label: '',
            key: '',
          },
          COD_DLOAD_HIS_SEARCH_COND: {
            label: '',
            key: '',
          },
          COD_EXTS: {
            label: '',
            key: '',
          },
        },
        rangeDate: { to: utils.now(nowDateFormat), from: utils.now('YYYY-MM-01') },
        range: { to: utils.now(nowDateFormat), from: utils.now('YYYY-MM-01') },
        attachDocumentId: '',
        groupSearchText: '',
        itemSearchText: '',
        histSearchText: '',
        fileExtensionName: '',
      },
      isShownPopup: false,
      fileDownloadReasonContent: '',
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      localdata0: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_ATTH_DOC_ID'),
        value: 'attachDocumentId',
      }, {
        text: this.$t('MSG_TXT_ATTH_GRP_ID'),
        value: 'attachGroupId',
      }, {
        text: this.$t('MSG_TXT_ATTH_GRP_NM'),
        value: 'attachGroupName',
      }, {
        text: this.$t('MSG_TXT_ATTH_ITEM_NM'),
        value: 'attachItemName',
      }, {
        text: this.$t('MSG_TXT_FILE_NM'),
        value: 'fileName',
      }, {
        text: this.$t('MSG_TXT_DOWN_USER'),
        value: 'fileDownloadUserId',
        width: '200px',

        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :displayType="'1'"
              :displayLanguageId="row.displayLanguageId"
              :loginId="row.loginId"
              :knoxId="row.knoxId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,

        },
      }, {
        text: this.$t('MSG_TXT_DOWN_DTM'),
        value: 'fileDownloadDTM',
        width: '170px',
      }],
    };
  },
  computed: {
    showMoreCount() {
      return `${ utils.numberFormat(this.paging.count)} / ${utils.numberFormat(this.paging.totalCount)}`;
    },
  },
  watch: {},
  mounted() {
    const dToday = utils.now('YYYY-MM-DD');
    this.dateValue1 = [utils.dateformatToClient(utils.addDay(dToday, -12), 'S'),utils.dateformatToClient(dToday)];
  },
  methods: {
    /**
     * 다운로드 이력 목록 조회
     */
    onSearch() {
      this.dsDownloadHist.setData([]);
      if (this.onClickValidate()) return false;
      // if (!this.validCheck()) return false;
      const toDate = `${utils.dateformatToServer(this.dateValue1[1]).substr(0, 8)}235959`;
      const fromDate = utils.dateformatToServer(this.dateValue1[0]);
      const queryParams = {
        searchAttachGroupCondition: this.frame0.selectData.COD_ATTH_GRP_SEARCH_COND.key,
        searchAttachItemCondition: this.frame0.selectData.COD_ATTH_ITEM_SEARCH_COND.key,
        searchCondition: this.frame0.selectData.COD_DLOAD_HIS_SEARCH_COND.key,
        moduleCode: this.frame0.selectData.COD_MDLE.key,
        subModuleCode: this.frame0.selectData.COD_SMDLE.key,
        attachDocumentId: this.frame0.attachDocumentId,
        attachGroupId: this.frame0.groupSearchText,
        attachGroupName: this.frame0.groupSearchText,
        attachItemId: this.frame0.itemSearchText,
        attachItemName: this.frame0.itemSearchText,
        fileName: this.frame0.histSearchText,
        fileDownloadUserId: this.frame0.histSearchText,
        fileDownloadToDTM: toDate,
        fileDownloadFromDTM: fromDate,
        fileExtensionName: this.frame0.fileExtensionName,
      };

      this.queryParams = utils.clone(queryParams);

      this.paging.currentPage = 1;
      this.paging.totalCount = 0;
      this.paging.count = 0;
      this.selectDownHist();
      return true;
    },

    selectDownHist() {
      utils.assign(this.queryParams, { currentPage: this.paging.currentPage });
      http.request(this.$options.name, 'DTS_CMD_00018', {
        query: this.queryParams,
      }).then(res => {
        if (utils.isUndefined(res.data) === false && res.data.length === this.paging.pagePerCount) {
          this.ispaging = true;
        } else {
          this.ispaging = false;
        }

        if (res.data.length > 0) {
          this.paging.totalCount = res.data[0].totalCount;
        }

        utils.dateformatToClientInArray(res.data, dateFields);

        utils.forEach(res.data, (obj, key) => {
          // row 이력 조회 버튼 정보 생성
          res.data[key].buttonList = [{
            label: this.$t('MSG_BTN_SRCH'),
            key: obj.fileDownloadReasonContent,
            type: 'positive',
          }];
          // 엑셀다운로드용 수정자 컬럼 생성
          const userName = utils.isEqual(this.$store.getters.userInfo.langId, 'ko') ? obj.userName : obj.userGlobalName;
          res.data[key].excelFileDownUserName = `${userName}/${obj.knoxId}`;
        });

        // this.dsDownloadHist.setRawData(res.data); // 데이터 셋에 데이터를 넣는 함수
        const { data } = this.dsDownloadHist;
        const newData = [];
        utils.forEach(data, row => newData.push(row));
        utils.forEach(res.data, row => newData.push(row));
        // this.dsDownloadHist.setRawData(newData, { preventBackup: true });
        this.dsDownloadHist.setData(newData);

        this.paging.count = this.dsDownloadHist.data.length;
      });
    },
    /**
     * 더보기
     */
    onAddList() {
      if (this.ispaging) {
        this.paging.currentPage += 1;
        this.selectDownHist();
      }
    },
    /**
     * 리셋
     */
    onReset() {
      utils.forEach(this.frame0, (value, key) => {
        switch (key) {
          case 'rangeDate':
            // eslint-disable-next-line max-len
            //this.dateValue1 = [utils.toStringByFormat(utils.addDay(utils.now(nowDateFormat), -12), nowDateFormat), utils.now(nowDateFormat)];
            const dToday = utils.now('YYYY-MM-DD');
            this.dateValue1 = [utils.dateformatToClient(utils.addDay(dToday, -12), 'S'),utils.dateformatToClient(dToday)];            
            break;
          case 'range':
            this.frame0[key] = { to: utils.now(nowDateFormat), from: utils.now('YYYY-MM-01') };
            break;
          case 'selectData':
            // this.$refs.smComboFrame0.reset();
            this.frame0.selectData.COD_MDLE.key = ' ';
            this.frame0.selectData.COD_SMDLE.key = 'ALL';
            this.$refs.dloadHisCond.reset();
            this.$refs.atthItemCond.reset();
            this.$refs.atthGrpCond.reset();
            break;
          default:
            this.frame0[key] = '';
            break;
        }
      });
    },

    /**
     *  엑셀 다운로드
     */
    onClickExcelDown() {
      if (this.dsDownloadHist.data.length > 10000) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CNT_NOT_EXCEL_DOWN'), 10000));
        return;
      }
      const columns = [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
      }, {
        text: this.$t('MSG_TXT_ATTH_DOC_ID'),
        value: 'attachDocumentId',
      }, {
        text: this.$t('MSG_TXT_ATTH_GRP_ID'),
        value: 'attachGroupId',
      }, {
        text: this.$t('MSG_TXT_ATTH_GRP_NM'),
        value: 'attachGroupName',
      }, {
        text: this.$t('MSG_TXT_ATTH_ITEM_NM'),
        value: 'attachItemName',
      }, {
        text: this.$t('MSG_TXT_FILE_NM'),
        value: 'fileName',
      }, {
        text: this.$t('MSG_TXT_DOWN_USER'),
        value: 'excelFileDownUserName',
      }, {
        text: this.$t('MSG_TXT_DOWN_DTM'),
        value: 'fileDownloadDTM',
      }, {
        text: this.$t('MSG_TXT_RSN'),
        value: 'fileDownloadReasonContent',
      }];

      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `downloadHistory_${sToday}.xlsx`;
      utils.downloadGridToExcel(this.$options.name, columns, this.dsDownloadHist, sExcelName);
    },
    /**
     * 다운로드 사유 조회
     */
    onGridButtonClicked(event) {
      this.fileDownloadReasonContent = event.key;
      this.isShownPopup = true;
    },
    onClickClose(key) {
      this[key] = false;
    },
    /**
     * rangeDate Picker 유효성 체크
     */
    validCheck() {
      const toIsNull = utils.isUndefined(this.$refs.rangeDate.range.to);
      const fromIsNull = utils.isUndefined(this.$refs.rangeDate.range.from);

      if (!utils.isEqual(toIsNull, fromIsNull)) {
        utils.messageBox('warning', this.$t('MSG_ALT_DATE_NOT_VAL'));
        return false;
      }

      return true;
    },
    /**
     * 검색조건 특수문자 입력제한
     */
    onKeyUpInput(event, name) {
      const searchFieldNewText = this.frame0[name];

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), this.$t('MSG_ALT_SPECL_CHAR_LIST'), () => {
          this.frame0[name] = this[name];
          this.$refs[name].setFocus();
        });
      } else {
        this[name] = searchFieldNewText;
      }
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // if (this.onClickValidate()) return false;
      if (utils.isEmpty(utils.trim(this.frame0.selectData.COD_MDLE.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_IS_SELCT'), this.$t('MSG_TXT_MDLE')), null, null);
        return true;
      }
      if (utils.isEmpty(this.frame0.range.to) || utils.isEmpty(this.frame0.range.from)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PRD')), null, null);
        return true;
      }
      if (!this.$refs.rangeDate.isValid()) {
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
