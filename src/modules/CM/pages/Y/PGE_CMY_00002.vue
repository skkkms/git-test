<template>
  <sui-page>
    <sui-page-header :title="pageTitle" />
    <sui-page-contents>
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
              v-model="frame0.codEmplSearchText"
              maxlength="100"
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
              v-model="frame0.deptNmSearchText"
              maxlength="100"
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
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
            v-permission:read="'PGE_CMY_00002'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-grid
        ref="listGrid"
        :dataset="'dsEmplPop'"
        :multiselect="selectionmode"
        :columns="gridColumns"
        :enabletooltips="true"
        :showDisplayCountControl="false"
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
/*  eslint max-len: ["error", { "code": 500 }] */
export default {
  name: 'PGE_CMY_00002', // eslint-disable-line vue/name-property-casing
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
      pageTitle: this.$t('MSG_TIT_EMPL_SELT'),
      isPageHeaderShow: false,
      isMyFavorites: false,
      pageName: 'PGE_CMY_00002',
      // 페이지 에서 사용하는 code 목록이 저장 될 field
      customCodeList: [{
        label: this.$t('MSG_TXT_ALL'),
        key: 'ALL',
      }],
      gridColumns: [
        {
          text: this.$t('MSG_TXT_EMPL_NM'),
          datafield: 'cn',
          width: 150,
          createwidget: (row, column, value, htmlElement) => {
            utils.getGridCellFactory().createCellButton(row, column, value, htmlElement, {
              handler: this.onGridButtonClicked,
              checkEditableFunction: this.checkEditableFunction,
              type: 'link',
            }, this.dsEmplPop, this.$refs.listGrid);
          },
          initwidget(row, column, value, htmlElement) {
            utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
          },
        }, {
          text: this.$t('MSG_TXT_KNOX_ID'),
          datafield: 'userid',
          width: 150,
        }, {
          text: this.$t('MSG_TXT_EMPL_NM_GLBL'),
          datafield: 'epencn',
          width: 200,
        }, {
          text: this.$t('MSG_TXT_CPNY_NM'),
          datafield: 'o',
          // width: 120,
        }, {
          text: this.$t('MSG_TXT_DEPT_NM'),
          datafield: 'department',
        }, {
          text: this.$t('MSG_TXT_CRLV'),
          datafield: 'title',
          width: 100,
        }, {
          text: this.$t('MSG_TXT_CPNY_TEL'),
          datafield: 'telephonenumber',
          hidden: true,
          // width: 100,
        }, {
          text: this.$t('MSG_TXT_CP'),
          datafield: 'mobile',
          width: 150,
        }, {
          text: this.$t('MSG_TXT_EP_ID'),
          datafield: 'epid',
          hidden: true,
        }, {
          text: '이메일',
          datafield: 'mail',
          hidden: true,
        }, {
          text: '회사코드',
          datafield: 'eporganizationnumber',
          hidden: true,
        }, {
          text: '부서ID',
          datafield: 'departmentnumber',
          hidden: true,
        }, {
          text: '사번',
          datafield: 'employeenumber',
          hidden: true,
        }, {
          text: '부서영어명',
          datafield: 'ependepartment',
          hidden: true,
        },
      ],
      frame0: {
        selectData: {
          COD_EMPL_SEARCH_COND: {
            label: this.$t('MSG_TXT_ALL'),
            key: '',
          },
        },
        codEmplSearchText: '',
        deptNmSearchText: '',
      },
      localdata0: [],
      codEmplSearchOldText: '',
      selectionmode: '',
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    if (this.pageInitialData !== null) {
      if (this.pageInitialData.knoxPopupMode === true) {
        // this.$refs.listGrid.selectionmode='checkbox';
        this.selectionmode = true;
      } else {
        this.selectionmode = false;
      }

      this.loadData();

      //  부모창에서 파라미터 받아서 조회하기
      if (this.pageInitialData.iptKnoxUserName !== '' && this.pageInitialData.iptKnoxUserName !== undefined) {
        this.frame0.selectData.COD_EMPL_SEARCH_COND.key = '1';
        this.frame0.codEmplSearchText = this.pageInitialData.iptKnoxUserName;
        this.onSearchClick();
        this.pageInitialData.iptKnoxUserName = '';
      }
    }
  },
  datasets: [{
    id: 'dsEmplPop',
    type: 'local',
    data: 'localdata0',
    datafields: [
      // {
      //   name: 'chk',
      //   type: 'bool',
      //   map: '0',
      // },
      {
        name: 'cn',
        type: 'string',
        map: 'cn',
      },
      {
        name: 'userid',
        type: 'string',
        map: 'userid',
      },
      {
        name: 'epencn',
        type: 'string',
        map: 'epencn',
      }, {
        name: 'o',
        type: 'string',
        map: 'o',
      }, {
        name: 'department',
        type: 'string',
        map: 'department',
      }, {
        name: 'title',
        type: 'string',
        map: 'title',
      }, {
        name: 'telephonenumber',
        type: 'string',
        map: 'telephonenumber',
      }, {
        name: 'mobile',
        type: 'string',
        map: 'mobile',
      }, {
        name: 'epid',
        type: 'string',
        map: 'epid',
      }, {
        name: 'mail',
        type: 'string',
        map: 'mail',
      }, {
        name: 'eporganizationnumber',
        type: 'string',
        map: 'eporganizationnumber',
      }, {
        name: 'departmentnumber',
        type: 'string',
        map: 'departmentnumber',
      }, {
        name: 'employeenumber',
        type: 'string',
        map: 'employeenumber',
      }, {
        name: 'ependepartment',
        type: 'string',
        map: 'ependepartment',
      },
    ],
  }],
  methods: {
    getConfigValue(config) {
      return utils.getConfigurationValue(config);
    },
    loadData() {
      if (this.getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'Y') {
        this.$refs.listGrid.showColumn('mobile', true);
      } else {
        this.$refs.listGrid.showColumn('mobile', false);
      }
      this.gridColumns.forEach(column => {
        const gridColumn = column;
        if (this.getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'N' && column.datafield === 'mobile') {
          gridColumn.hidden = true;
        }
      });
    },
    onResetClick() {
      // this.$refs.searchCondSelect.reset();
      this.frame0.codEmplSearchText = '';
      this.frame0.deptNmSearchText = '';
    },
    onSearchClick() {
      if (utils.isEmpty(utils.trim(this.frame0.codEmplSearchText)) === true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NCSR_SEARCH_COND'), this.positiveHandler);
        return;
      } else {
        if (utils.isEngNum_(this.frame0.codEmplSearchText)) {
          if (this.frame0.codEmplSearchText.length < 4) {
            utils.messageBox('warning', this.$t('MSG_ALT_SRCH_LENG_OVER'), this.positiveHandler);
            return;
          }
        }
        if (utils.isOnlyKor(this.frame0.codEmplSearchText) === true) {
          if (this.frame0.codEmplSearchText.length < 2) {
            utils.messageBox('warning', this.$t('MSG_ALT_SRCH_LENG'), this.positiveHandler);
            return;
          }
        }
      }

      // 부모창에서 파라미터 받아서 조회하기
      let queryParams = '';
      let urlArr = [];
      if (this.pageInitialData !== null) {
        if (this.pageInitialData.iptKnoxUserName !== '' && this.pageInitialData.iptKnoxUserName !== undefined) {
          const dataParams = {
            department: this.frame0.deptNmSearchText || '',
            userName: utils.trim(this.frame0.codEmplSearchText) || '',
          };

          // 이름으로 검색할 경우 특수문자 제한 처리
          if (utils.isExistSpecialChar(this.frame0.codEmplSearchText) === true) {
            // utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), this.positiveHandler);
            utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), this.$t('MSG_ALT_SPECL_CHAR_LIST'), () => {});
            return;
          }

          http.request(this.$options.name, 'DTS_CMY_00003', {
            query: dataParams,
          }).then(res => {
            this.localdata0 = res.data;
            // 정렬
            // console.log(this.$store.getters.userInfo);
            utils.forEach(this.localdata0, item => {
              const items = item;
              items.myEp = item.eporganizationnumber === this.$store.getters.userInfo.companyCode ? 1 : 2;
              items.myDept = item.departmentnumber === this.$store.getters.userInfo.departmentId ? 1 : 2;
            });
            this.localdata0 = utils.orderBy(this.localdata0, ['myEp', 'myDept', 'eporganizationnumber', 'departmentnumber', 'cn']);
            // console.table(utils.orderBy(this.localdata0, ['myEp', 'myDept', 'cn']), ['myEp', 'myDept', 'eporganizationnumber', 'departmentnumber', 'cn']);
            this.dsEmplPop.setRawData(this.localdata0);
          }).catch(error => {
            console.log(error);
          });
        }
      } else { // 팝업실행을 통한 검색
        const codeValue = this.frame0.selectData;
        queryParams = {
          searchEmplCond: utils.trim(codeValue.COD_EMPL_SEARCH_COND.key) || '',
          codEmplSearchText: utils.trim(this.frame0.codEmplSearchText) || '',
        };
        urlArr = [
          { id: 'DTS_CMY_00003', path: { 'user-name': queryParams.codEmplSearchText } },
          { id: 'DTS_CMY_00004', path: { 'knox-id': queryParams.codEmplSearchText } },
          { id: 'DTS_CMY_00005', path: { 'emp-no': queryParams.codEmplSearchText } },
        ];
        const dataParams = {
          department: this.frame0.deptNmSearchText || '',
          userName: utils.trim(this.frame0.codEmplSearchText) || '',
        };

        console.log('dataparams --> ');
        console.log(dataParams);
        // eslint-disable-next-line radix
        const idx = parseInt(queryParams.searchEmplCond) - 1;
        console.log(idx, urlArr[idx]);

        // 이름으로 검색할 경우 특수문자 제한 처리
        if (idx === 0 && utils.isExistSpecialChar(this.frame0.codEmplSearchText) === true) {
          utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), this.$t('MSG_ALT_SPECL_CHAR_LIST'), () => {});
          // utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), this.positiveHandler);
          return;
        }

        // knox id로 검색할 경우 .문자로 종료시 삭제처리.
        let knoxIdSearchTxt = this.frame0.codEmplSearchText;
        const regex = /(\.+)$/ig;
        if (idx === 1 && regex.test(knoxIdSearchTxt)  == true) {
          knoxIdSearchTxt = knoxIdSearchTxt.replace(regex,"");
          this.frame0.codEmplSearchText = knoxIdSearchTxt;
          return;
        }

        http.request(this.$options.name, urlArr[idx].id, {
          path: urlArr[idx].path,
          query: dataParams,
        }).then(res => {
          this.localdata0 = res.data;
          // 정렬
          // console.log(this.$store.getters.userInfo);
          utils.forEach(this.localdata0, item => {
            const items = item;
            items.myEp = item.eporganizationnumber === this.$store.getters.userInfo.companyCode ? 1 : 2;
            items.myDept = item.departmentnumber === this.$store.getters.userInfo.departmentId ? 1 : 2;
          });
          this.localdata0 = utils.orderBy(this.localdata0, ['myEp', 'myDept', 'eporganizationnumber', 'departmentnumber', 'cn']);
          // console.table(utils.orderBy(this.localdata0, ['myEp', 'myDept', 'cn']), ['myEp', 'myDept', 'eporganizationnumber', 'departmentnumber', 'cn']);
          this.dsEmplPop.setRawData(this.localdata0);
        }).catch(error => {
          console.log(error);
        });
      }
    },
    onSelectClick() {
      const selectedData = this.dsEmplPop.getSelectedRows();

      if (selectedData.length === 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_USER_SEL'));
        return;
      }
      this.closePagePopup(selectedData);
    },
    onCancelClick() {
      this.closePagePopup('');
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewCodEmpl = this.frame0.codEmplSearchText;

      if (!utils.isExistSpecialChar(searchFieldNewCodEmpl)) {
        // utils.confirm('\'_\' 제외 특수문자는 입력할 수 없습니다.', 'YES', ()=>{
        //   this.frame0.codEmplSearchText = this.codEmplSearchOldText;
        // });
      } else {
        this.codEmplSearchOldText = searchFieldNewCodEmpl;

        // 조회 후 파라미터 초기화
        this.pageInitialData.iptKnoxUserName = '';
      }
    },
    onSelectSearchCond() {
      // this.frame0.codEmplSearchText = '';
    },
    onGridButtonClicked(btn, dataRow) {
      console.log(btn, dataRow);
      if (this.selectionmode === false) {
        const selectedData = [];
        selectedData[0] = {
          cn: dataRow.cn,
          epid: dataRow.epid,
          employeenumber: dataRow.employeenumber,
          userid: dataRow.userid,
          mail: dataRow.mail,
          eporganizationnumber: dataRow.eporganizationnumber,
          o: dataRow.o,
          epenorganizationname: dataRow.epenorganizationname,
          departmentnumber: dataRow.departmentnumber,
          department: dataRow.department,
          ependepartment: dataRow.ependepartment,
          eptitlenumber: dataRow.eptitlenumber,
          title: dataRow.title,
          eptitlename: dataRow.eptitlename,
          mobile: dataRow.mobile,
          epuserclassify: dataRow.epuserclassify,
          usrRealUseYn: 'Y',
          employeetype: dataRow.employeetype,
          irsdSttCd: 'A',
          eppreferredlanguage: dataRow.eppreferredlanguage,
          extrSysUsrYn: '',
          extrCompId: '',
          description: dataRow.description,
          delYn: 'N',
          epencn: dataRow.epencn,
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
