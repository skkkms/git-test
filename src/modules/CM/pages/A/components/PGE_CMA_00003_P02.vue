<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="condType"
              :selected="selectedValues.COD_EMPL_SEARCH_COND"
              codeId="COD_EMPL_SEARCH_COND"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="searchText"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearch"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="deptName"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInputDept"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="'PGE_CMA_00003'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <div class="mrB10" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <sui-s-grid
            ref="grdLeft"
            :headers="gridColumnsLeft"
            :data-source="dsLeftData"
            :showRowsPerPageControl="false"
            :options="options"
            @grid:selected="onSelectOriginGrid"
          />
        </div>
        <div class="btnbox">
          <ul>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_right"
                :disabled="btnOrginStatus"
                @click="onClickRight"
              >
                Right
              </sui-button>
            </li>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_left"
                :disabled="btnTargetStatus"
                @click="onClickLeft"
              >
                Left
              </sui-button>
            </li>
          </ul>
        </div>
        <div class="inbox">
          <sui-s-grid
            ref="grdRight"
            :headers="gridColumnsRight"
            :data-source="dsRightData"
            :showRowsPerPageControl="false"
            :options="options"
            @grid:selected="onSelectTargetGrid"
          />
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickClose"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        v-permission:create="'PGE_CMA_00003'"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
import {urDataSet} from 'uidev-component/index.js';
export default {
  name: 'PGE_CMA_00003_P02', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: null,
      required: true,
    },
    userGroupId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userInfo: {},
      deptName: '',
      selectedValues: {
        COD_EMPL_SEARCH_COND: {
          label: '',
          key: '',
        },
      },
      // Search Box
      searchBox: {
        COD_PAGE_UE: {
          label: '',
          key: '',
        },
      },
      searchFieldOldText: '',
      searchFieldOldDeptText: '',
      localdataLeft: [],
      localdataRight: [],
      localdataTemp: [],
      selectedUser: [],
      searchText: '',
      dsLeftData: new urDataSet(),
      dsRightData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
      },
      btnOrginStatus: true,
      btnTargetStatus: true,
    };
  },
  computed: {},
  watch: {
    userGroupId(obj) {
      if (obj) {
        this.selectDataFormInput();
      }
    },
  },
  datasets: [{
    id: 'dsLeftData',
    type: 'local',
    data: 'localdataLeft',
    datafields: [
      { name: 'dataset-row-id', type: 'string', map: 'dataset-row-id' },
      // { name: 'knoxId', type: 'string', map: 'knoxId' },
      { name: 'loginId', type: 'string', map: 'loginId' },
      { name: 'companyCode', type: 'string', map: 'companyCode' },
      { name: 'departmentName', type: 'string', map: 'departmentName' },
      { name: 'userName', type: 'string', map: 'userName' },
      { name: 'userId', type: 'string', map: 'userId' },
      { name: 'validFinishDT', type: 'string', map: 'validFinishDT' },
    ],
  }, {
    id: 'dsRightData',
    type: 'local',
    data: 'localdataRight',
    datafields: [
      { name: 'dataset-row-id', type: 'string', map: 'dataset-row-id' },
      //{ name: 'knoxId', type: 'string', map: 'knoxId' },
      { name: 'loginId', type: 'string', map: 'loginId' },
      { name: 'companyCode', type: 'string', map: 'companyCode' },
      { name: 'departmentName', type: 'string', map: 'departmentName' },
      { name: 'userName', type: 'string', map: 'userName' },
      { name: 'userId', type: 'string', map: 'userId' },
      { name: 'validFinishDT', type: 'string', map: 'validFinishDT' },
    ],
  }, {
    id: 'dsTempData',
    type: 'local',
    data: 'localdataTemp',
    datafields: [
      { name: 'dataset-row-id', type: 'string', map: 'dataset-row-id' },
      //{ name: 'knoxId', type: 'string', map: 'knoxId' },
      { name: 'loginId', type: 'string', map: 'loginId' },
      { name: 'companyCode', type: 'string', map: 'companyCode' },
      { name: 'departmentName', type: 'string', map: 'departmentName' },
      { name: 'userName', type: 'string', map: 'userName' },
      { name: 'userId', type: 'string', map: 'userId' },
      { name: 'validFinishDT', type: 'string', map: 'validFinishDT' },
    ],
  },
  ],
  created() {
    this.gridColumnsLeft = [
      // {
      //   text: this.$t('MSG_TXT_KNOX_ID'),
      //   value: 'knoxId',
      // },
      {
        text: this.$t('MSG_TXT_LOGIN_ID'),
        value: 'loginId',
      },
      {
        text: this.$t('MSG_TXT_EMPL_NM'),
        value: 'userName',
      },
      {
        text: this.$t('MSG_TXT_DEPT_NM'),
        value: 'departmentName',
      },
    ];
    this.gridColumnsRight = [
      // {
      //   text: this.$t('MSG_TXT_KNOX_ID'),
      //   value: 'knoxId',
      // },
      {
        text: this.$t('MSG_TXT_LOGIN_ID'),
        value: 'loginId',
      },
      {
        text: this.$t('MSG_TXT_EMPL_NM'),
        value: 'userName',
      },
      {
        text: this.$t('MSG_TXT_DEPT_NM'),
        value: 'departmentName',
      },
    ];
  },
  mounted() {
    this.userInfo = this.$store.getters.userInfo;
    this.selectDataFormInput();
  },

  methods: {
    onSelectedUser() {},
    onReset() {
      this.$refs.condType.reset();
      this.searchText = '';
      this.deptName = '';
    },
    onClickSave() {
      const dataParams = {
        userGroupUserList: this.dsRightData.data,
        userGroupUserDeleteList: this.dsTempData.data,
      };

      http.request(this.pageId, 'DTS_CMA_00017', {
        data: dataParams,
        path: {
          'user-group-id': this.userGroupId,
        },
      }).then(() => {
        this.$emit('onRowReSelect');
        this.onClickClose();
      }).catch(error => {
        console.log(error);
      });
    },
    onConfirmCancel() {},
    onClickClose() {
      this.$emit('onClickCancel', 'isShownPopupUser');
    },
    onSearch() {
      if (utils.isEmpty(this.searchText) === true) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.selectedValues.COD_EMPL_SEARCH_COND.label);
        utils.messageBox('error', msg);
        return;
      }

      const condId = this.selectedValues.COD_EMPL_SEARCH_COND.key;
      // let queryParams = '';
      // let urlArr = [];

      const dataParams = {
        searchEmplCond: condId,
        searchCodEmplText: this.searchText,
        searchDeptNmText: this.deptName,
      };
      http.request(this.pageId, 'DTS_CMY_00002', {
        query: dataParams,
      }).then(res => {
        this.dsLeftData.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    onClickRight() {
      if (this.dsLeftData.data.length > 0) {
        const selectedData = this.dsLeftData.getSelected();
        utils.forEach(selectedData, item => {
          if (!this.isExistData(this.dsRightData.data, item)) {
            this.dsRightData.addRow({
              //knoxId : item.knoxId,
              loginId : item.loginId,
              companyCode : item.companyCode,
              departmentName : item.departmentName,
              userName : item.userName,
              userId : item.userId,
            });
          }
        });
        this.$refs.grdLeft.resetSelect();
        this.$refs.grdRight.resetSelect();
      }
    },
    onClickLeft() {
      const selected = this.dsRightData.getSelected();
      utils.forEach(selected, item => {
        this.dsRightData.removeRow(item, false);
      });
      this.$refs.grdRight.resetSelect();
    },
    onKeyUpInput() {
      const searchFieldNewText = this.searchText;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isEqual(this.selectedValues.COD_EMPL_SEARCH_COND.key, '1')) {
          if (utils.isExistSpecialChar(searchFieldNewText) === true) {
            this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
            this.searchText = this.searchFieldOldText;
          } else {
            this.searchFieldOldText = searchFieldNewText;
          }
        } else if (utils.isEmailFormat(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.searchText = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    onKeyUpInputDept() {
      const searchFieldNewText = this.deptName;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.deptName = this.searchFieldOldDeptText;
        } else {
          this.searchFieldOldDeptText = searchFieldNewText;
        }
      }
    },
    onClose() {
      console.log('onConfirm');
    },
    selectDataFormInput() {
      http.request(this.pageId, 'DTS_CMA_00010', {
        path: {
          'user-group-id': this.userGroupId,
        },
        query: {
          'pagePerCount' : -1,
        },
      }).then(res => {
        if (res.data) {
          if (res.data.length > 0) {
            const items = [];
            utils.forEach(res.data, item => {

              // let deptName = '';
              // if (true === utils.isEqual(this.userInfo.langId, item.dsplLangId)) {
              //    deptName = item.deptName;
              // }
              // else {
              //    deptName = item.deptGlobalName;
              // }

              items.push({
                //knoxId: item.knoxId,
                loginId: item.loginId,
                companyCode: '',
                departmentName: item.deptName,
                userName: item.userName,
                userId: item.userId,
                validFinishDT: item.validFinishDT,
              });
            });

            this.dsRightData.setData(items);
          } else {
            this.dsRightData.setData([]);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    isExistData(dataList, selectedData) {
      const isExist = _.some(dataList, { 
        userId: selectedData.userId,
      });
      return isExist;
    },
    onSelectOriginGrid(row) {
      if (!utils.isEmpty(row)) {
        this.btnOrginStatus = false;
      } else {
        this.btnOrginStatus = true;
      }
    },
    onSelectTargetGrid(row) {
      if (!utils.isEmpty(row)) {
        this.btnTargetStatus = false;
      } else {
        this.btnTargetStatus = true;
      }
    },
  },
};
</script>
<style scoped>
</style>
