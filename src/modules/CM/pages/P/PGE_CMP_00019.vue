<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EMAIL')"
              :required="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldEmail"
              v-model="queryData.email"
              maxlength="200"
              @keyup.enter="onClickSearch"
              @keyup="onKeyUpInputEmail"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EMPL_NM')"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldUserName"
              v-model="queryData.userName"
              maxlength="400"
              @keyup.enter="onClickSearch"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_IRSD_STT')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectServedStateCode"
              v-model="queryData.servedStateCode"
              codeId="COD_IRSD_STT"
              :defaultOption="'all'"
              :initialSelectedIndex="1"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_ACC_STATUS')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectAccountStateCode"
              v-model="queryData.userAccountStateCode"
              codeId="COD_USR_ACO_STT"
              :defaultOption="'all'"
              :initialSelectedIndex="1"
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
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <!-- <sui-grid
        ref="gridUserBasic"
        :multiselect="true"
        :columns="columnUserBasic"
        :dataset="'dsUserBasic'"
        :showDisplayCountControl="true"
        :initial-pagesize="10"
      >
        <div class="btn_wrapR">
          <sui-button
            v-permission:download="contextPageId"
            type="button"
            class="comm_btn_gridTop comm_ico_excel"
            @click="onExcelDownloadClick"
          >
            {{ $t('MSG_BTN_EXCEL_DOWN') }}
          </sui-button>
        </div>
      </sui-grid> -->
      <sui-s-grid
        ref="gridUserBasic"
        :headers="columnUserBasic"
        :data-source="dsUserBasic"
        :options="options"
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
        @grid:selected="onSelectRow"
        @grid:scroll-bottom="onMoreClick"
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
      <div
        class="btn_moreView"
      >
        <p>
          {{ showMoreCount }}
        </p>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:read="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="dtlPopupOpenOrClose"
        >
          {{ $t('MSG_BTN_USR_EXT_INFO') }}
        </sui-button>
        <sui-button
          v-permission:read="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onMenuSearchClick"
        >
          {{ $t('MSG_BTN_MENU_SRCH') }}
        </sui-button>
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onPasswordInitClick"
        >
          {{ $t('MSG_BTN_PW_INIT') }}
        </sui-button>
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onPasswordUnlockClick"
        >
          {{ $t('MSG_BTN_PW_UNLOCK') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="newPopupOpenOrClose"
        >
          {{ $t('MSG_BTN_USR_RGST') }}
        </sui-button>
      </div>
      <sui-popup
        v-model="isShownPopupNew"
        :title="$t('MSG_TIT_USR_BSIC_INFO')"
      >
        <p01
          :pageId="contextPageId"
          :userId="userId"
          :modFlag="false"
          @close="newPopupOpenOrClose"
          @research="research"
        />
      </sui-popup>
      <sui-popup
        v-model="isShownPopupMod"
        :title="$t('MSG_TIT_USR_BSIC_INFO')"
      >
        <p01
          :pageId="contextPageId"
          :userId="userId"
          :modFlag="true"
          :readOnlyEmail="true"
          @close="modPopupOpenOrClose"
          @research="research"
        />
      </sui-popup>
      <sui-popup
        v-model="isShownPopupDtl"
        :title="$t('MSG_TIT_USR_EXT_INFO')"
      >
        <p02
          :pageId="contextPageId"
          :userId="userId"
          @close="dtlPopupOpenOrClose"
          @research="research"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>

<script>
// 메시지 이관용
// MSG_ALT_PW_NOT_MATCH
// MSG_ALT_PW_NOT_MATCH_ERR
// MSG_ALT_CANNOT_UNLOCK
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import p01 from './components/PGE_CMP_00019_P01';
import p02 from './components/PGE_CMP_00019_P02';


export default {
  name: 'PGE_CMP_00019', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
    p02,
  },
  extends: BasePage,
  data() {
    return {
      // dsMobileAppMgt: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsUserBasic: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      selectedGridRowData: {},

      queryData: {
        email: '',
        userName: '',
        servedStateCode: '',
        userAccountStateCode: '',
      },
      isShownPopupNew: false,
      isShownPopupMod: false,
      isShownPopupDtl: false,
      userId: '',
      isPaging: false,
      paging: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },
      searchFieldOldText: '',
      searchFieldOldEmailText: '',
      savedId:'',
    };
  },
  computed: {
    showMoreCount() {
      return `${ utils.numberFormat(this.paging.count)} / ${utils.numberFormat(this.paging.totalCount)}`;
    },
  },
  watch: {},
  created() {
    const that = this;
    this.columnUserBasic = [
      {
        text: this.$t('MSG_TXT_EMPL_NM'),
        value: 'userName',
        // component: {
        //   props: ['row', 'value'],
        //   template:
        //     `<cmp-user-name-link
        //       :pageId="'${this.contextPageId}'"
        //       :displayType="'3'"
        //       :displayLanguageId="row.displayLangId"
        //       :userId="row.userId"
        //       :loginId="row.loginId"
        //       :userName="row.userName"
        //       :userGlobalName="row.userGlobalName"
        //       :cellphone="row.cellphone"
        //       :type="'link'"
        //     />`
        // },
        component: {
          props: ['row', 'value'],
          template:
            `<sui-button
              :title="row.userName"
              type="button"
              class="link"
              @click.stop="onDetailClick(value, row)"
            >
              {{row.userName}}
            </sui-button>`,
          methods: {
            onDetailClick(_value, dataRow) {
              const { userId } = dataRow;
              that.userId = userId;
              that.modPopupOpenOrClose();
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_EMAIL'),
        value: 'email',
      },
      {
        text: this.$t('MSG_TXT_CRLV'),
        value: 'careerLevelCode',
      },
      // {
      //   text: this.$t('MSG_TXT_CPNY'),
      //   value: 'companyName',
      // },
      {
        text: this.$t('MSG_TXT_DEPT'),
        value: 'departmentName',
      },
      {
        text: this.$t('MSG_TXT_CPNY_CONTA'),
        value: 'companyContactAddr',
        width: '200',
      },
      {
        text: this.$t('MSG_TXT_IRSD_STT'),
        value: 'servedStateName',
        width: '100',
      },
      {
        text: this.$t('MSG_TXT_ACC_STATUS'),
        value: 'userAccountStateName',
        width: '100',
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    onLoad() {
      const paramData = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramData)) {
        this.queryData = paramData;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      if (!this.validateSearchCond()) {
        return false;
      }
      const dataParams = {
        email: this.queryData.email,
        userName: this.queryData.userName,
        servedStateCode: this.queryData.servedStateCode,
        userAccountStateCode: this.queryData.userAccountStateCode,
      };

      this.dataParams = utils.clone(dataParams);
      this.paging.currentPage = 1;
      this.paging.totalCount = 0;
      this.paging.count = 0;
      //   this.dsUserBasic.setRawData([], { preventBackup: true });

      this.selectUserList();
      return true;
    },
    selectUserList() {
      utils.assign(this.dataParams, { currentPage: this.paging.currentPage, pagePerCount: this.paging.pagePerCount });
      http.request(this.contextPageId, 'DTS_CMP_00067', {
        query: this.dataParams,
      }).then(res => {
        if (res.data.length > 0) {
          this.paging.totalCount = res.data[0].totalCount;
        }
        // console.log(res);
        this.dsUserBasic.setData(res.data);
        // console.log(this.dsUserBasic);
        // res.data = utils.getFilteredDataFromDataset(res.data, this.dsUserBasic, true);
        const { data } = this.dsUserBasic;
        const newData = [];
        utils.forEach(data, row => newData.push(row));
        utils.forEach(res.data, row => newData.push(row));
        // this.dsUserBasic.setRawData(newData, { preventBackup: true });
        this.paging.count = res.data.length;
        // if (!utils.isUndefined(res.data) && this.paging.count < this.paging.totalCount) {
        if (res.data.length > 0 && this.paging.count < this.paging.totalCount) {
          this.isPaging = true;
        } else {
          this.isPaging = false;
        }
        if(!utils.isEmpty(this.savedId)){
          this.$refs.gridUserBasic.setSelect({userId: this.savedId});
          this.savedId = '';
        }        
      });
    },
    onResetClick() {
      // this.$refs.codeSelectCompanyCode.reset();
      this.queryData.email = '';
      this.queryData.userName = '';
      this.$refs.codeSelectServedStateCode.reset();
      this.$refs.codeSelectAccountStateCode.reset();
    },
    onExcelDownloadClick() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnUserBasic;
      const objGridDataset = this.dsUserBasic;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `User_Management_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    // onDetailClick(value, dataRow) {
    //   const { userId } = dataRow;
    //   this.userId = userId;
    //   this.modPopupOpenOrClose();
    // },
    onMoreClick() {
      if (this.isPaging) {
        this.paging.currentPage += 1;
        this.selectUserList();
      }
    },
    dtlPopupOpenOrClose() {
      const selectedRow = this.selectedGridRowData;
      if (!this.validateItemSelectOne(selectedRow)) return false;
      if (!this.validateItemSelectPlural(selectedRow)) return false;
      this.userId = this.selectedGridRowData[0].userId;
      this.isShownPopupDtl = !this.isShownPopupDtl;
      return true;
    },
    onMenuSearchClick() {
      const selectedData = this.selectedGridRowData;
      if (!this.validateItemSelectOne(selectedData)) return false;
      if (!this.validateItemSelectPlural(selectedData)) return false;
      utils.openLayerPopup('PGE_CMA_00016', this.onPagePopupCallback, {
        pageInitialData: {
          userId: selectedData[0].userId,
        },
        size: 'lg',
      });
      return true;
    },
    onPasswordInitClick() {
      const selectedRow = this.selectedGridRowData;
      const list = [];
      if (!this.validateItemSelectOne(selectedRow)) return false;
      utils.forEach(selectedRow, row => {
        list.push({
          userId: row.userId,
          userPasswordValue: '',
          userEmail: row.email,
          loginId: row.loginId,
        });
      });
      utils.messageBox('confirm', this.$t('MSG_ALT_PW_INIT'), null, () => {
        http.request(this.contextPageId, 'DTS_CMP_00071', {
          data: list,
        }).then((res) => {
          if(res.resultCode==="0"){ //메일 전송 메시지 출력
            utils.messageBox('success', this.$t('MSG_ALT_TEMP_PWD_REG_EMAIL_DONE'));
          }else{ //그 외 메시지 출력
            utils.messageBox('success', this.$t('MSG_ALT_TEMP_PWD_USER_EMAIL_DONE'));
          }
          this.onClickSearch();
        });
      });
      return true;
    },
    onPasswordUnlockClick() {
      const selectedRow = this.selectedGridRowData;
      const list = [];
      if (!this.validateItemSelectOne(selectedRow)) return false;
      utils.forEach(selectedRow, row => {
        list.push({
          userId: row.userId,
          userPasswordValue: '',
          userEmail: row.email,
          loginId: row.loginId,
        });
      });
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_UNLOCK'), null, () => {
        http.request(this.contextPageId, 'DTS_CMP_00148', {
          data: list,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_UNLOCKED'));
          this.onClickSearch();
        });
      });
      return true;
    },
    newPopupOpenOrClose() {
      this.userId = '';
      this.isShownPopupNew = !this.isShownPopupNew;
    },
    modPopupOpenOrClose() {
      this.isShownPopupMod = !this.isShownPopupMod;
    },
    validateSearchCond() {
      // if (utils.isEmpty(utils.trim(this.queryData.companyCode))) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CPNY')));
      //   return false;
      // }
      return true;
    },
    validateItemSelectOne(selectedRow) {
      if (utils.isEmpty(selectedRow)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      return true;
    },
    validateItemSelectPlural(selectedRow) {
      if (selectedRow.length > 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_ONE_ITEM'));
        return false;
      }
      return true;
    },
    research(savedId) {
      if (this.isShownPopupNew) {
        this.newPopupOpenOrClose();
      }
      if (this.isShownPopupMod) {
        this.modPopupOpenOrClose();
      }
      if (this.isShownPopupDtl) {
        this.userId = '';
        this.isShownPopupDtl = !this.isShownPopupDtl;
      }
      this.savedId=savedId;
      this.onClickSearch();
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnUserBasic;
      const objGridDataset = this.dsUserBasic;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(row) {
      if (row) {
        this.selectedGridRowData = row;
      }
    },
    onKeyUpInputEmail() {
      const searchFieldNewText = this.queryData.email;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialCharExceptSearchForEmail(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR_EMAIL'), null, () => {
            this.queryData.email = this.searchFieldOldEmailText;
            this.$refs.textFieldEmail.setFocus();
          });
        } else {
          this.searchFieldOldEmailText = searchFieldNewText;
        }
//    }
    },
    onKeyUpInput() {
      const searchFieldNewText = this.queryData.userName;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.queryData.userName = this.searchFieldOldText;
            this.$refs.textFieldUserName.setFocus();
          });
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
//    }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
  },
};
</script>

<style scoped>
</style>
