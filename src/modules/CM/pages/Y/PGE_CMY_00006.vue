<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
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
              @keyup="onKeyUpInput"
            />
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
              v-permission:read="'PGE_CMY_00006'"
              type="button"
              class="comm_btn_Scr"
              @click="onSearchClick"
            >
              {{ $t("MSG_BTN_SEARCH") }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="comm_shut_wrap">
        <div class="inbox">
          <!-- <div class="comm_gridTop_wrap">
            <ul>
              <li class="totalList">
                {{ $t("MSG_TXT_LST_CNT").replace('{0}', listGridCnt) }}
              </li>
            </ul>
          </div> -->
          <div class="mrB10" />
          <sui-s-grid
            ref="listGrid"
            :data-source="dsUsrPop"
            :headers="gridColumns0"
            :options="options0"
            :showRowsPerPageControl="false"
            @grid:selected="gridRowSelect('listGrid')"
          />
        </div>
        <div class="btnbox">
          <ul>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_right"
                :disabled="rightShiftEnable"
                @click="onClickRight"
              >
                {{ $t("MSG_BTN_RIGHT_SEND") }}
              </sui-button>
            </li>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_left"
                :disabled="leftShiftEnable"
                @click="onClickLeft"
              >
                {{ $t("MSG_BTN_LEFT_SEND") }}
              </sui-button>
            </li>
          </ul>
        </div>
        <div class="inbox">
          <!-- <div class="comm_gridTop_wrap">
            <ul>
              <li class="totalList">
                {{ $t("MSG_TXT_LST_CNT").replace('{0}', seltGridCnt) }}
              </li>
            </ul>
          </div> -->
          <div class="mrB10" />
          <sui-s-grid
            ref="seltGrid"
            :data-source="dsSeltPop"
            :options="options1"
            :headers="gridColumns1"
            :showRowsPerPageControl="false"
            @grid:selected="gridRowSelect('seltGrid')"
          />
        </div>
      </div>
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
import { urDataSet } from 'uidev-component';

export default {
  name: 'PGE_CMY_00006', // eslint-disable-line vue/name-property-casing
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
      localdata0: [],
      gridColumns0: [
        {
          text: this.$t('MSG_TXT_EPNO'),
          value: 'employeeIDNumber',
          align: 'center',
          // width: 100,
        }, {
          text: this.$t('MSG_TXT_EMPL_NM'),
          value: 'userName',
          align: 'center',
          // width: 120,
        }, {
          text: this.$t('MSG_TXT_CPNY_NM'),
          value: 'companyName',
          align: 'center',
          // width: 240,
        }, {
          text: this.$t('MSG_TXT_DEPT_NM'),
          value: 'departmentName',
          align: 'center',
          // width: 240,
        }, {
          text: this.$t('MSG_TXT_KNOX_ID'),
          value: 'knoxId',
          align: 'center',
          // width: 140,
        }, {
          text: this.$t('MSG_TXT_IRSD_STT_CD'),
          value: 'servedStateCode',
          align: 'center',
          hide: true,
        }, {
          text: '사용자 ID',
          value: 'userId',
          align: 'center',
          hide: true,
        }, {
          text: 'EP ID',
          value: 'epid',
          align: 'center',
          hide: true,
        }, {
          text: 'email',
          value: 'email',
          align: 'center',
          hide: true,
        },
      ],
      localdata1: [],
      gridColumns1: [
        {
          text: this.$t('MSG_TXT_EPNO'),
          value: 'employeeIDNumber',
          align: 'center',
          // width: 100,
        }, {
          text: this.$t('MSG_TXT_EMPL_NM'),
          value: 'userName',
          align: 'center',
          // width: 120,
        }, {
          text: this.$t('MSG_TXT_CPNY_NM'),
          value: 'companyName',
          align: 'center',
          // width: 240,
        }, {
          text: this.$t('MSG_TXT_DEPT_NM'),
          value: 'departmentName',
          align: 'center',
          // width: 240,
        }, {
          text: this.$t('MSG_TXT_KNOX_ID'),
          value: 'knoxId',
          align: 'center',
          // width: 140,
        }, {
          text: this.$t('MSG_TXT_IRSD_STT_CD'),
          value: 'servedStateCode',
          align: 'center',
          hide: true,
        }, {
          text: '사용자 ID',
          value: 'userId',
          align: 'center',
          hide: true,
        }, {
          text: 'EP ID',
          value: 'epid',
          align: 'center',
          hide: true,
        }, {
          text: 'email',
          value: 'email',
          align: 'center',
          hide: true,
        },
      ],
      frame0: {
        selectData: {
          COD_EMPL_SEARCH_COND: {
            label: '',
            key: '',
          },
        },
        searchCodEmplText: '',
        searchDeptNmText: '',
      },
      deptNmSearchOldText: '',
      codEmplSearchOldText: '',
      listGridCnt: '',
      seltGridCnt: '',
      userIdList: [],
      rightShiftEnable: true,
      leftShiftEnable: true,
      dsUsrPop: new urDataSet(),
      dsSeltPop: new urDataSet(),
      options0: {
        selectCheck: true,
        multiSelect: true,
        selectCheckOnly: true,
      },
      options1: {
        selectCheck: true,
        multiSelect: true,
        selectCheckOnly: true,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    // 부모창에서 파라미터 받아서 조회하기
    // if (this.pageInitialData.iptUserName !== '') {
    //   this.frame0.selectData.COD_EMPL_SEARCH_COND.key = '1';
    //   this.frame0.searchCodEmplText = this.pageInitialData.iptUserName;
    //   this.onSearchClick();
    // }
    this.loadData();

    if (this.pageInitialData !== null) {
      if (!utils.isEmpty(this.pageInitialData.userIdList)) {
        this.userIdList = this.pageInitialData.userIdList;
        this.addedUserListLoad(this.userIdList);
      }
      if (!utils.isEmpty(this.pageInitialData.searchName)) {
        this.frame0.searchCodEmplText = this.pageInitialData.searchName;
        this.frame0.selectData.COD_EMPL_SEARCH_COND.key = '1';
        this.onSearchClick();
      }
    }
  },
  methods: {
    getConfigValue(config) {
      return utils.getConfigurationValue(config);
    },
    loadData() {
      if (this.getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'Y') {
        this.showColumn(this.gridColumns0, 'employeeIDNumber', true);
        this.showColumn(this.gridColumns1, 'employeeIDNumber', true);
      } else {
        this.showColumn(this.gridColumns0, 'employeeIDNumber', false);
        this.showColumn(this.gridColumns1, 'employeeIDNumber', false);
      }
      this.gridColumns0.forEach(column => {
        const listGridColumn = column;
        if (this.getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'N' && column.value === 'employeeIDNumber') {
          listGridColumn.hide = true;
        }
      });

      this.gridColumns1.forEach(column => {
        const sletGridColumn = column;
        if (this.getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'N' && column.value === 'employeeIDNumber') {
          sletGridColumn.hide = true;
        }
      });
    },
    onResetClick() {
      this.frame0.searchCodEmplText = '';
      this.frame0.searchDeptNmText = '';
    },
    onSearchClick() {
      const codeValue = this.frame0.selectData;
      const queryParams = {
        searchEmplCond: utils.trim(codeValue.COD_EMPL_SEARCH_COND.key) || '',
        searchCodEmplText: utils.trim(this.frame0.searchCodEmplText) || '',
        searchDeptNmText: utils.trim(this.frame0.searchDeptNmText) || '',
      };

      if (queryParams.searchCodEmplText === '') {
        utils.messageBox('warning', this.$t('MSG_ALT_NCSR_SEARCH_COND'), this.positiveHandler);
        return;
      }

      if (queryParams.searchCodEmplText.length < 2) {
        utils.messageBox('warning', this.$t('MSG_ALT_SRCH_LENG'), this.positiveHandler);
        return;
      }

      // if (queryParams.searchDeptNmText !== '') {
      //   if (queryParams.searchDeptNmText.length < 2) {
      //     utils.messageBox('warning', this.$t('MSG_ALT_SRCH_LENG'), this.positiveHandler);
      //     return;
      //   }
      // }

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

        this.dsUsrPop.setData(this.localdata0);

        this.listGridCnt = this.dsUsrPop.data.length;
        this.seltGridCnt = '0';
      }).catch(error => {
        console.log(error);
      });
    },
    onSelectClick() {
      // const selectedData = this.dsSeltPop.getSelectedRows();
      const selectedData = utils.clone(this.dsSeltPop.data);
      this.closePagePopup(selectedData);
    },
    onCancelClick() {
      this.closePagePopup('');
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewCodEmpl = this.frame0.searchCodEmplText;
      const searchFieldNewdeptNm = this.frame0.searchDeptNmText;

      if (!utils.isExistSpecialChar(searchFieldNewCodEmpl)) {
        // utils.confirm('\'_\' 제외 특수문자는 입력할 수 없습니다.', 'YES', ()=>{
        //   this.frame0.searchCodEmplText = this.codEmplSearchOldText;
        // });
      } else {
        this.codEmplSearchOldText = searchFieldNewCodEmpl;

        this.pageInitialData.iptUserName = '';
      }

      if (!utils.isExistSpecialChar(searchFieldNewdeptNm)) {
        // utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
        //   this.frame0.searchDeptNmText = this.deptNmSearchOldText;
        // });
      } else {
        this.deptNmSearchOldText = searchFieldNewdeptNm;
      }
    },
    onClickRight() {
      const selectedRows = this.dsUsrPop.getSelected();
      this.dsUsrPop.removeRows(selectedRows);
      selectedRows.forEach(selectedRow => {
        if (utils.findIndex(this.dsSeltPop.data, { userId: selectedRow.userId }) === -1) {
          this.dsSeltPop.addRow(selectedRow);
        }
      });

      this.listGridCnt = this.dsUsrPop.data.length;
      this.seltGridCnt = this.dsSeltPop.data.length;
      this.callFunction();
    },
    onClickLeft() {
      const selectedRows = this.dsSeltPop.getSelected(); 
      this.dsSeltPop.removeRows(selectedRows);
      selectedRows.forEach(selectedRow => {
        if (utils.findIndex(this.dsUsrPop.data, { userId: selectedRow.userId }) === -1) {
          this.dsUsrPop.addRow(selectedRow);
        }
      });

      this.listGridCnt = this.dsUsrPop.data.length;
      this.seltGridCnt = this.dsSeltPop.data.length;
      this.callFunction();
    },
    callFunction() {
      this.$refs.listGrid.$nextTick(() => {
        this.dsSeltPop.setSelectAll();
        this.dsSeltPop.removeSelected();
        this.dsUsrPop.setSelectAll();
        this.dsUsrPop.removeSelected();
        this.gridRowSelect('listGrid');
        this.gridRowSelect('seltGrid');
      });
    },
    onSelectSearchCond() {
      this.frame0.searchCodEmplText = '';
    },
    addedUserListLoad(userIdList) {
      const query = {
        userId: utils.join(userIdList, ', '),
      };
      http.request(this.$options.name, 'DTS_CMY_00084', {
        query,
      }).then(res => {
        utils.forEach(res.data, item => {
          const items = item;
          items.myEp = item.companyCode === this.$store.getters.userInfo.companyCode ? 1 : 2;
          items.myDept = item.departmentId === this.$store.getters.userInfo.departmentId ? 1 : 2;
        });
        res.data = utils.orderBy(res.data, ['myEp', 'myDept', 'companyCode', 'departmentId', 'userName']);
        this.dsSeltPop.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    gridRowSelect(obj) {
      setTimeout(() => {
        const shiftBtnDisable = this.$refs[obj].dataSource.selected.length > 0 ? false : true;
        if (obj === 'listGrid') {
          this.rightShiftEnable = shiftBtnDisable;
        } else {
          this.leftShiftEnable = shiftBtnDisable;
        }
      }, 2);
    },
    showColumn(gridColumn, fieldValue, isHide) {
      const column = utils.find(this.dsSeltPop.data, { value: fieldValue });
      if (!column) return false;
      column.hide = isHide;
      return true;
    },
  },
};
</script>
<style scoped>
.comm_shut_wrap .btnbox { padding-top: 100px;}
</style>
