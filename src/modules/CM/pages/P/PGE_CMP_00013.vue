<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :required="true"
              :label="$t('MSG_TXT_SRCH_DT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-date-picker
              ref="datePicker"
              v-model="singleDatetime"
              :disabled="false"
              init="today"
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat                 
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="portalId"
              :selected="searchBox.portalId"
              :option-list="selectPortalList"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MENU_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="searchBox.menuName"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearch('button')"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-select
              ref="userSelect"
              :selectedUser="selectedUser"
              @selected="onSelectedUser"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset "
            @click="onReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
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
        :headers="gridColumns0"
        :data-source="dsSystemUseLog"
        :options="options"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="15"
        @grid:scroll-bottom="onAddList"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="onDownloadExcel"
          >
            {{ $t('MSG_BTN_EXCEL_DOWN') }}
          </sui-button>
        </template>
      </sui-s-grid>
      <div class="btn_moreView">
        <p>
          {{ showMoreCount }}
        </p>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMP_00013', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      dsSystemUseLog: new urDataSet(),
      options: {
        infinityScroll: true,
        resizableColumn: true,
      },
      isPageing: false,
      pageing: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },
      // userDateFormat: this.$store.getters.userInfo.dateFormat,
      // searchBox datePicker
      singleDatetime: utils.now(this.$store.getters.userInfo.dateFormat),
      userDateFormat: this.$store.getters.userInfo.dateFormat,

      // searchBox userInfo
      selectedUser: {
        userName: '',
        epid: '',
      },

      // searchBox portalOptionList
      selectPortalList: [],

      // 더보기 SearchBox
      showMoreSearchBox: {},

      // Search Box
      searchBox: {
        menuLogDTM: '',
        pageId: '',
        pageName: '',
        menuName: '',
        menuLogUserId: '',
        portalId: {
          key: '',
          label: '',
        },
      },
      searchFieldOldText: '',
      localdata0: [],
    };
  },
  computed: {
    showMoreCount() {
      return `${ utils.numberFormat(this.pageing.count)} / ${utils.numberFormat(this.pageing.totalCount)}`;
    },
  },
  watch: {},
  created() {
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_PORTL'),
      value: 'portalId',
      width: 120,
    }, {
      text: this.$t('MSG_TXT_TYPE'),
      value: 'menuLogTypeName',
      width: 120,
    }, {
      text: this.$t('MSG_TXT_MENU_NM'),
      value: 'menuName',
    }, {
      text: this.$t('MSG_TXT_USR'),
      value: 'userName',
      width: 300,
      component: {
        props: ['row', 'value'],

        template:
            `<cmp-user-name-link
            
              :displayType="'1'"
              :displayLanguageId="row.displayLanguageId"
              :userId="row.finalModificationUserId"
              :knoxId="row.knoxId"
              :loginId="row.loginId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,
      },
    }, {
      text: this.$t('MSG_TXT_APPLICATION_NM'),
      value: 'applicationName',
      width: 200,
    }, {
      text: this.$t('MSG_TXT_MENU_RESO_ID'),
      value: 'menuResoId',
      width: 180,
    }, {
      text: this.$t('MSG_TXT_OCCUR_DTM'),
      value: 'firstRegistrationDTM',
      width: 170,
      customValue(value) {
        return utils.dateformatToClient(value);
      },
    }];
  },
  mounted() {
    // portal list
    this.selectPortalList = [];
    http.request(this.$options.name, 'DTS_CMP_00004')
      .then(res => {
        utils.forEach(res.data, obj => {
          this.selectPortalList.push({
            key: obj.portalId,
            label: obj.portalName,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    /** ***************************************************************************
        이벤트 영역
      ***************************************************************************** */
    onReset() {
      this.resetSearchBox();
    },
    onSearch() {
      if (this.validationCheck()) return false;
      this.pageing.currentPage = 1;
      this.pageing.totalCount = 0;
      this.pageing.count = 0;

      this.dsSystemUseLog.setData([]);

      this.setShowMoreSearchBox();
      this.searchSystemUseLogList();

      return true;
    },
    onSelectedUser(selectedData) {
      if (selectedData) {
        this.selectedUser.epid = selectedData.epId;
        this.selectedUser.userName = selectedData.userName;
      } else {
        this.selectedUser.epid = '';
        this.selectedUser.userName = '';
      }
    },
    onDownloadExcel() {
      if (this.dsSystemUseLog.data.length > 10000) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CNT_NOT_EXCEL_DOWN'), 10000));
        return;
      }
      const sPageId = this.$options.name;
      const objGridColumns = this.gridColumns0;
      const objGridDataset = this.dsSystemUseLog;

      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `menuLog_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName);
    },
    onAddList() {
      // 더보기
      if (this.isPageing) {
        this.pageing.currentPage += 1;
        this.searchSystemUseLogList();
      }
    },
    /** ***************************************************************************
        함수 영역
      ***************************************************************************** */
    setDatePickerToSearchBox() {
      if (this.singleDatetime !== null && this.singleDatetime !== '') {
        const sMenuLogDTM = utils.dateformatToServer(this.singleDatetime);
        this.searchBox.menuLogDTM = sMenuLogDTM.substr(0, 8);
      }
    },
    setShowMoreSearchBox() {
      // datePicker 설정 값
      this.setDatePickerToSearchBox();

      // 사용자
      this.searchBox.menuLogUserId = this.selectedUser.epid;

      // searchBox -> paramsObj변환 { key : value, key : value }
      const queryParams = utils.reduce(this.searchBox, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});

      this.showMoreSearchBox = queryParams;
    },

    resetSearchBox() {
      const has = Object.prototype.hasOwnProperty;
      utils.forEach(this.searchBox, (values, key) => {
        if (has.call(this.searchBox[key], 'key')) {
          this.searchBox[key] = { key: '', label: '' };
        } else {
          this.searchBox[key] = '';
        }
      });

      this.searchBox.portalId.key = this.selectPortalList[0].key;
      // datePicker 초기화
      this.singleDatetime = moment().format('YYYY-MM-DD');

      // 사용자 정보 리셋
      this.selectedUser.userName = '';
      this.selectedUser.epid = '';
      this.$refs.userSelect.reset();
    },
    searchSystemUseLogList() {
      const queryParamsCmp00013 = utils.cloneDeep(this.showMoreSearchBox);
      let union = {};
      let data = {};

      // pageing
      utils.assign(queryParamsCmp00013, { pagePerCount: this.pageing.pagePerCount });
      utils.assign(queryParamsCmp00013, { currentPage: this.pageing.currentPage });

      http.request(this.$options.name, 'DTS_CMP_00037', {
        query: queryParamsCmp00013,
      }).then(res => {
        if (utils.isUndefined(res.data) === false && res.data.length === this.pageing.pagePerCount) {
          this.isPageing = true;
        } else {
          this.isPageing = false;
        }
        if (res.data.length > 0) {
          this.pageing.totalCount = res.data[0].totalCount;
        }

        union = utils.mergeArray(this.dsSystemUseLog.data, res.data);
      }).then(() => {
        // main
        this.dsSystemUseLog.setData(union);
      }).then(() => {
        this.pageing.count = this.dsSystemUseLog.data.length;
      }).catch(error => {
        console.log(error);
      });
      return true;
    },
    validationCheck() {
      if (!this.$refs.datePicker.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      if (utils.isEmpty(this.$refs.datePicker.value)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SRCH_DT')));
        return true;
      }
      return false;
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.searchBox.menuName;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.searchBox.menuName = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
  },
};
</script>
<style scoped>
</style>
