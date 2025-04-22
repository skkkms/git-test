<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :required="true"
              :label="$t('MSG_TXT_LOGIN_DATE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-date-picker
              ref="datePicker"
              v-model="singleDatetime"
              init="today"
              :disabled="false"
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
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5" />
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
            :data-source="dsLoginUserLog"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            @grid:scroll-bottom="onAddList"
           >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
           @click="onDownloadExcel"
          >
            {{ $t("MSG_BTN_EXCEL_DOWN") }}
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
  name: 'PGE_CMP_00035', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      isPageing: false,
      pageing: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },

      // searchBox datePicker
      singleDatetime: '',

      // searchBox userInfo
      selectedUser: {
        userName: '',
        epid: '',
      },

      userDateFormat: this.$store.getters.userInfo.dateFormat,

      // searchBox portalOptionList
      selectPortalList: [],

      // 더보기 SearchBox
      showMoreSearchBox: {},

      // Search Box
      searchBox: {
        loginLogDTM: '',
        pageId: '',
        pageName: '',
        // menuName: '',
        loginLogUserId: '',
        portalId: {
          key: '',
          label: '',
        },
      },
      searchFieldOldText: '',

      localdata0: [],
      dsLoginUserLog: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      
     
     };
  },

created() {
    this.dataList = [];
    this. gridColumns0 = [
      {
        value: 'portalName',
        text: this.$t('MSG_TXT_PORTL'),
        width: 100,
      },
     {
        text: this.$t('MSG_TXT_USR'),
        value: 'userName',

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
      },
      {
        value: 'userGlobalName',
        text: this.$t('MSG_TXT_USR_GLBL_NM'),
        width: 200,
      },
      {
        value: 'loginIp',
        text: this.$t('MSG_TXT_LOGIN_IP'),
        width: 200,
      },
      {

        text: this.$t('MSG_TXT_LOGIN_DTM'),
        value: 'loginDateTime',
        width: 200,
         customValue(value) {
          return utils.dateformatToClient(value);
        },
      },
      {

       text: this.$t('MSG_TXT_LOGOUT_DTM'),
        value: 'logoutDateTime',
        width: 200,
       customValue(value) {
          return utils.dateformatToClient(value);
        },
      },
    ];
  },
  computed: {
    showMoreCount() {
      return `${ utils.numberFormat(this.pageing.count)} / ${utils.numberFormat(this.pageing.totalCount)}`;
    },
  },
  watch: {},
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

      this.dsLoginUserLog.setData([]);

      this.setShowMoreSearchBox();
      this.searchLoginUserLogList();

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
      if (this.dsLoginUserLog.data.length > 5000) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CNT_NOT_EXCEL_DOWN'), 5000));
        return;
      }
      const sPageId = this.$options.name;
      const objGridColumns = this.gridColumns0;
      const objGridDataset = this.dsLoginUserLog;

      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `UserLoginLog_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName);
    },
    onAddList() {
      // 더보기
      if (this.isPageing) {
        this.pageing.currentPage += 1;
        this.searchLoginUserLogList();
      }
    },
    /** ***************************************************************************
        함수 영역
      ***************************************************************************** */
    setDatePickerToSearchBox() {
      if (this.singleDatetime !== null && this.singleDatetime !== '') {
        const sLoginLogDTM = utils.dateformatToServer(this.singleDatetime);
        this.searchBox.loginLogDTM = sLoginLogDTM.substr(0, 8);
      }
    },
    setShowMoreSearchBox() {
      // datePicker 설정 값
      this.setDatePickerToSearchBox();

      // 사용자
      this.searchBox.loginLogUserId = this.selectedUser.epid;

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
      this.$refs.datePicker.initializeWithInit('today');

      // 사용자 정보 리셋
      this.selectedUser.userName = '';
      this.selectedUser.epid = '';
      this.$refs.userSelect.reset();
    },
    searchLoginUserLogList() {
      const queryParamsCmp00035 = utils.cloneDeep(this.showMoreSearchBox);
      let union = {};
      let data = {};

      // pageing
      utils.assign(queryParamsCmp00035, { pagePerCount: this.pageing.pagePerCount });
      utils.assign(queryParamsCmp00035, { currentPage: this.pageing.currentPage });

      http.request(this.$options.name, 'DTS_CMP_00141', {
        query: queryParamsCmp00035,
      }).then(res => {
        if (utils.isUndefined(res.data) === false && res.data.length === this.pageing.pagePerCount) {
          this.isPageing = true;
        } else {
          this.isPageing = false;
        }
        if (res.data.length > 0) {
          this.pageing.totalCount = res.data[0].totalCount;
        }
          union = utils.mergeArray(this.dsLoginUserLog.data, res.data);
      }).then(() => {
        this.dsLoginUserLog.setData(union);
      }).then(() => {        
        this.pageing.count = this.dsLoginUserLog.data.length;
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
    // /* 달력의 오류를 확인할 수 있는 validate 함수 */
    // onClickValidate() {
    //   // if (this.onClickValidate()) return false;
    //   if (!this.$refs.datePicker.isValid()) {
    //     utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
    //     return true;
    //   }
    //   return false;
    // },
    // onKeyUpInput() {
    //   // _ 제외 특수문자 입력제한
    //   const searchFieldNewText = this.searchBox.menuName;
    //   if (utils.isExistSpecialChar(searchFieldNewText)) {
    //     utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
    //       this.searchBox.menuName = this.searchFieldOldText;
    //     });
    //   } else {
    //     this.searchFieldOldText = searchFieldNewText;
    //   }
    // },
  },
};
</script>
<style scoped>
</style>
