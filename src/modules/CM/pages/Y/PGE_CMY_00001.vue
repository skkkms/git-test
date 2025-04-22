<template>
  <sui-page>
    <sui-page-header :title="pageTitle" />
    <sui-page-contents style="padding-bottom:15px">
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="searchCondSelect"
              class="width50"
              :pageId="this.$options.name"
              :selected="frame0.selectData.COD_EMPL_SEARCH_COND"
              codeId="COD_EMPL_SEARCH_COND"
              :initialSelectedIndex="0"
              @list-clicked="onSelectSearchCond"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="frame0.searchCodEmplText"
              maxlength="50"
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame0.searchDeptNmText"
              maxlength="50"
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInputDept"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="'PGE_CMY_00001'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="listGrid"
        :headers="gridColumns"
        :data-source="dsUsrPop"
        :multiselect="selectionmode"
        :enabletooltips="true"
        :showDisplayCountControl="false"
        :showRowsPerPageControl="false"
        :initialPagesize="5"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ this.$t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelectClick"
        >
          {{ this.$t('MSG_BTN_SELT') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
// 페이지 에서 사용하는 code 목록 기술
// const CODE_KEYS = ['COD_CDST_TYPE', 'COD_CD_MGT_SEARCH'];

// eslint-disable-next-line import/extensions
import {urDataSet} from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

/*  eslint max-len: ["error", { "code": 500 }] */
export default {
  name: 'PGE_CMY_00001', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default: null,
    },
    pageInitialData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dsUsrPop: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: false,
      },
      pageTitle: this.$t('MSG_TIT_USR_SELT'),
      isPageHeaderShow: true,
      pageName: 'PGE_CMY_00001',
      // 페이지 에서 사용하는 code 목록이 저장 될 field
      codes: {
        // allOption: [{ key: ' ', label: this.$t('MSG_TXT_ALL')}],
        // emptyOption: [{ key: '', label: '' }],
      },
      frame0: {
        selectData: {
          COD_EMPL_SEARCH_COND: {
            label: this.$t('MSG_TXT_ALL'),
            key: '',
          },
        },
        searchCodEmplText: '',
        searchDeptNmText: '',
      },
      localdata0: [],
      codEmplSearchOldText: '',
      searchFieldOldText: '',
      selectionmode: false,
      cHide: true,
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    const that = this;
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_LOGIN_ID'),
        value: 'loginId',
      }, {
        text: this.$t('MSG_TXT_EMPL_NM'),
        value: 'userName',
        width: 120,
      }, {
        text: this.$t('MSG_TXT_GLOBAL_ENM'),
        value: 'userGlobalName',
        width: 120,
      }, {
        text: this.$t('MSG_TXT_DEPT_NM'),
        value: 'departmentName',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_CRLV'),
        value: 'careerLevelName',
        width: 100,
      }
    ];
    this.setViewColumns();
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    if (this.pageInitialData !== null) {
      if (this.pageInitialData.userPopupMode === true) {
        // this.$refs.listGrid.selectionmode='checkbox';
        this.selectionmode = true;
      } else {
        this.selectionmode = false;
      }

      // 부모창에서 파라미터 받아서 조회하기
      if (this.pageInitialData.iptUserName !== '' && this.pageInitialData.iptUserName !== undefined) {
        const searchPageInitialData = this.pageInitialData.iptUserName;

        if (utils.isExistSpecialChar(searchPageInitialData)) {
          utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.frame0.searchCodEmplText = this.codEmplSearchOldText;
          });
        } else {
          this.codEmplSearchOldText = searchPageInitialData;

          // this.pageInitialData.iptUserName = '';
        }
        this.frame0.selectData.COD_EMPL_SEARCH_COND.key = '1';
        this.frame0.searchCodEmplText = this.pageInitialData.iptUserName;
        this.onSearchClick();
      }
    }
  },
  methods: {
    getConfigValue(config) {
      return utils.getConfigurationValue(config);
    },
    setViewColumns() {
      if (this.getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'Y') {
        //this.$refs.listGrid.showColumn('employeeIDNumber', true);
        this.gridColumns[0].hide = false;
      } else {
        //this.$refs.listGrid.showColumn('employeeIDNumber', false);
        this.gridColumns[0].hide = true;
      }
      this.gridColumns.forEach(column => {
        const gridColumn = column;
        if (this.getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'N' && column.datafield === 'employeeIDNumber') {
          //gridColumn.hidden = true;
          gridColumn.hide = true;
        }
      });
    },
    onResetClick() {
      this.frame0.searchCodEmplText = '';
      this.frame0.searchDeptNmText = '';
    },
    onSearchClick() {
      if (utils.isEmpty(utils.trim(this.frame0.searchCodEmplText)) === true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NCSR_SEARCH_COND'), this.positiveHandler);
        return;
      }

      if (utils.isEmpty(utils.trim(this.frame0.searchCodEmplText)) === false) {
        if (this.frame0.searchCodEmplText.length < 2) {
          utils.messageBox('warning', this.$t('MSG_ALT_SRCH_LENG'), this.positiveHandler);
          return;
        }
      }

      if (!utils.isEmpty(this.frame0.searchDeptNmText)) {
        if (this.frame0.searchDeptNmText.length < 2) {
          utils.messageBox('warning', this.$t('MSG_ALT_SRCH_LENG'), this.positiveHandler);
          return;
        }
      }

      const codeValue = this.frame0.selectData;
      const queryParams = {
        searchEmplCond: utils.trim(codeValue.COD_EMPL_SEARCH_COND.key) || '',
        searchCodEmplText: utils.trim(this.frame0.searchCodEmplText) || '',
        searchDeptNmText: utils.trim(this.frame0.searchDeptNmText) || '',
      };

      http.request(this.$options.name, 'DTS_CMY_00002', {
        query: queryParams,
      }).then(res => {
        this.localdata0 = res.data;

        // 정렬
        // console.log(this.$store.getters.userInfo);
        utils.forEach(this.localdata0, item => {
          const items = item;
          items.myEp = item.companyCode === this.$store.getters.userInfo.companyCode ? 1 : 2;
          items.myDept = item.departmentId === this.$store.getters.userInfo.departmentId ? 1 : 2;
        });
        this.localdata0 = utils.orderBy(this.localdata0, ['myEp', 'myDept', 'companyCode', 'departmentId', 'userName']);
        // console.table(utils.orderBy(this.localdata0, ['myEp', 'myDept', 'userName']), ['myEp', 'myDept', 'companyCode', 'departmentId', 'userName']);

        this.dsUsrPop.setData(this.localdata0);
      }).catch(error => {
        console.log(error);
      });
    },
    onSelectClick() {
      //const selectedData = this.dsUsrPop.getSelectedRows();
      const selectedData = this.dsUsrPop.getSelected();
      if (selectedData.length < 1) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      } else {
        this.closePagePopup(selectedData);
      }
    },
    onCancelClick() {
      this.closePagePopup('');
    },
    isExistSpecialChar(msg) {
      if (msg.match('[(~!@#$%^&*()-+=|\'",)]')) {
        return true;
      }
      return false;
    },
    onKeyUpInput() {
      const searchFieldNewCodEmpl = this.frame0.searchCodEmplText;
      // eslint-disable-next-line no-unused-vars
      let specialCharChk = '';
      // eslint-disable-next-line no-unused-vars
      let speckalCharMsg = '';
      if (this.frame0.selectData.COD_EMPL_SEARCH_COND.key === '1') {
        specialCharChk = utils.isExistSpecialChar(searchFieldNewCodEmpl);
        speckalCharMsg = this.$t('MSG_ALT_NO_SPECL_CHAR');
      } else if (this.frame0.selectData.COD_EMPL_SEARCH_COND.key === '2') {
        specialCharChk = utils.isExistSpecialCharExceptSearchForEmail(searchFieldNewCodEmpl);
        speckalCharMsg = this.$t('MSG_ALT_NO_SPECL_CHAR_EMAIL');
      }

      if (specialCharChk) {
        utils.messageBox('warning', speckalCharMsg, null, () => {
          this.frame0.searchCodEmplText = this.codEmplSearchOldText;
        });
      } else {
        this.codEmplSearchOldText = searchFieldNewCodEmpl;

        this.pageInitialData.iptUserName = '';
      }
    },
    onKeyUpInputDept() {
      const searchFieldNewText = this.frame0.searchDeptNmText;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.searchDeptNmText = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;

        this.pageInitialData.iptUserName = '';
      }
    },
    onSelectSearchCond() {
      this.frame0.searchCodEmplText = '';
    },
    onGridButtonClicked(btn, dataRow) {
      if (this.selectionmode === false) {
        const selectedData = [];
        selectedData[0] = {
          userName: dataRow.userName,
          userGlobalName: dataRow.userGlobalName,
          epid: dataRow.epId,
          siteName: dataRow.siteName,
          employeeIDNumber: dataRow.employeeIDNumber,
          companyName: dataRow.companyName,
          companyEnglishName: dataRow.companyEnglishName,
          departmentName: dataRow.departmentName,
          departmentEnglishName: dataRow.departmentEnglishName,
          departmentId: dataRow.departmentId,
          careerLevelCode: dataRow.careerLevelCode,
          careerLevelName: dataRow.careerLevelName,
          careerLevelEnName: dataRow.careerLevelEnName,
          knoxId: dataRow.knoxId,
          servedStateCode: dataRow.servedStateCode,
          userId: dataRow.userId,
          loginId: dataRow.loginId,
          email: dataRow.email,
          dsplLngId: dataRow.dsplLngId,
        };
        this.closePagePopup(selectedData);
      }
    },
    checkEditableFunction() {
      if (this.selectionmode === false) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
</style>
