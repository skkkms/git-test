<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />
    <!-- Page Contents -->
    <sui-page-contents>
      <!-- Search Box -->
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXCP_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codExcpType"
              :selected="selectedCode.COD_EXCP_TYPE"
              :pageId="this.$options.name"
              :initialSelectedIndex="0"
              :customOpitonList="selCodes.allOption"
              codeId="COD_EXCP_TYPE"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXCP_ID')"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="excpLogId"
              max-length="100"
              @keyup="onKeyUpExcpId"
              @keyup.enter="onSearch"
            />
          </div>
          </div>
          <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_OCCUR_DATE')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <ur-date-picker
              ref="dp"
              v-model="datePicker"
              :maxDate="disabledDatesTo.from"
              autoConfirm
              sticky
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
              init="today"
            />
          </div>
       
       
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DIV')"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeExcpLogDiv"
              :selected="selectedCode.COD_EXCP_LOG_DIV"
              :pageId="this.$options.name"
              :initialSelectedIndex="0"
              :customOpitonList="selCodes.allOption"
              codeId="COD_EXCP_LOG_DIV"
            />
          </div>
      </div>
      <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_OBJECT')"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeExcpSrchCond"
              :selected="selectedCode.COD_EXCP_SRCH_COND"
              :pageId="this.$options.name"
              :initialSelectedIndex="condIndex"
              codeId="COD_EXCP_SRCH_COND"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="condWord"
              max-length="400"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearch"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR')"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-select
              ref="userSelect"
              :selectedUser="selectedCode.SELECTED_USER"
              :readonly="false"
              :checkboxMode="false"
              @selected="onSelectedUser"
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
            v-permission:read="'PGE_CMZ_00027'"
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
        ref="grdList"
        :data-source="dsData"
        :showRowsPerPageControl="false"
        :headers="gridColumns"
        width="100%"
        @grid:selected="onDataSetChange"
      />
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_EXCP_LOG_DTL') }}</h4>
      </div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXCP_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.excpTypeNm }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXCP_ID')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.sysExcpLogId }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_LOGIN_IP')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.excpLoginIp }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              <cmp-user-name-link
                :pageId="this.$options.name"
                :displayType="'1'"
                :displayLanguageId="displayLangId"
                :userId="displayUserId"
                :knoxId="displayKnoxId"
                :loginId="displayLoginId"
                :userName="displayUserName"
                :userGlobalName="displayUserGlobalName"
                :departmentName="displayDeptName"
                :departmentEnglishName="displayDeptEngName"
                :type="'link'"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_OCCUR_DTM')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.DTM | dateFormat }}
            </div>
          </div>
       
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DIV')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.excpLogDivNm }}
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PAGE_ID')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.pageId }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DTSVC_ID')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.dtsvcId }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SERVER')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.svNm }}
            </div>
          </div>
          <div class="col-xs-1 nodata">
          </div>
          <div class="col-xs-5">
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXCP_CLASS')"
            />
          </div>
          <div class="col-xs-11">
            <textarea
              v-model="excpClasNm"
              name="name"
              readonly
              rows="2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXCP_CNTN')"
            />
          </div>
          <div class="col-xs-11">
            <textarea
              v-model="excpMsgCntn"
              name="name"
              readonly
              rows="4"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DTL_CNTN')"
            />
          </div>
          <div class="col-xs-11">
            <textarea
              v-model="excpDtlCntn"
              name="name"
              readonly
              rows="4"
            />
          </div>
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CMZ_00027', // eslint-disable-line vue/name-property-casing
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },
  data() {
    return {
      displayLangId: '',
      displayUserId: '',
      displayKnoxId: '',
      displayLoginId: '',
      displayUserName: '',
      displayUserGlobalName: '',
      displayDeptName: '',
      displayDeptEngName: '',
      excpClasNm: '',
      excpMsgCntn: '',
      condWord: '',
      excpDtlCntn: '',
      detailLog: {},
      condIndex: 0,
      selCodes: CommonConstants.selectOptions(),
      excpLogId: '',
      datePicker: '',
      disabledDatesTo: { from: utils.now('YYYY-MM-DD'), to: null },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      selectedCode: {
        COD_EXCP_TYPE: { label: '', key: '' },
        COD_EXCP_LOG_DIV: { label: '', key: '' },
        COD_EXCP_SRCH_COND: { label: '', key: '' },
        SELECTED_USER: { userName: '', epId: '' },
      },
      gridColumns: [
        { text: this.$t('MSG_TXT_EXCP_TYPE'), value: 'excpTypeNm', width: '100px' },
        { text: this.$t('MSG_TXT_DIV'), value: 'excpLogDivNm', width: '100px' },
        { text: this.$t('MSG_TXT_EXCP_ID'), value: 'sysExcpLogId' },
        { text: this.$t('MSG_TXT_SERVER'), value: 'svNm' },
        { text: this.$t('MSG_TXT_PAGE_ID'), value: 'pageId', width: '150px' },
        { text: this.$t('MSG_TXT_DTSVC_ID'), value: 'dtsvcId', width: '150px' },
        {
          text: this.$t('MSG_TXT_USR'),
          value: 'userName',
          component: {
            props: ['row'],

            template:
              `<cmp-user-name-link
            
              :displayType="'1'"
              :displayLanguageId="row.displLangId"
              :userId="row.userId"
              :knoxId="row.knoxId"
              :loginId="row.loginId"
              :userName="row.userName"
              :userGlobalName="row.userName"
              :departmentName="row.deptName"
              :departmentEnglishName="row.deptGlobalName"
              :type="'link'"
            />`,
          },
          width: '120px',
        },
        {
          text: this.$t('MSG_TXT_OCCUR_DTM'),
          value: 'DTM',
          width: '170px',
          customValue(value) {
            return utils.dateformatToClient(value);
          },
        },
      ],
      localdata0: [],
      searchFieldOldText: '',
      searchFieldOldExcpId: '',
      dsData: new urDataSet(),
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSelectedUser(selectedData) {
      if (null != selectedData) {
        this.selectedCode.SELECTED_USER.userName = selectedData.userName;
        this.selectedCode.SELECTED_USER.epId = selectedData.epId;
      }
    },
    onDataSetChange(selections) {
      if (selections === undefined || selections === null) {
        return false;
      }

      this.excpClasNm = '';
      this.excpMsgCntn = '';
      this.excpDtlCntn = '';
      this.displayLangId = '';
      this.displayUserId = '';
      this.displayKnoxId = '';
      this.displayLoginId = '';
      this.displayUserName = '';
      this.displayUserGlobalName = '';
      this.displayDeptName = '';
      this.displayDeptEngName = '';
      this.detailLog = {};
      const data = selections;
      if (!utils.isEmpty(data)) {
        this.detailLog = data;
        this.displayLangId = this.detailLog.dsplLangId;
        this.excpClasNm = this.detailLog.excpClasNm;
        this.excpMsgCntn = this.detailLog.excpMsgCntn;
        this.excpDtlCntn = this.detailLog.excpDtlCntn;
        this.displayUserId = this.detailLog.userId;
        this.displayKnoxId = this.detailLog.knoxId;
        this.displayLoginId = this.detailLog.loginId;
        this.displayUserName = this.detailLog.userName;
        this.displayUserGlobalName = this.detailLog.userGlobalName;
        this.displayDeptName = this.detailLog.deptName;
        this.displayDeptEngName = this.detailLog.deptGlobalName;
      }
      return true;
    },
    onReset() {
      this.$refs.codExcpType.reset();
      this.$refs.userSelect.reset();
      this.selectedCode.COD_EXCP_TYPE.key = this.selCodes.allOption.key;
      this.excpLogId = '';
      this.$refs.dp.initializeWithInit('today');
      this.$refs.codeExcpLogDiv.reset();
      this.selectedCode.COD_EXCP_LOG_DIV.key = this.selCodes.allOption.key;
      this.$refs.codeExcpSrchCond.reset();
      this.condIndex = 0;
      this.condWord = '';
      this.selectedCode.SELECTED_USER.userName = '';
    },
    onSearch() {
      if (this.onClickValidate()) return false;
      const excpTypeCode = (this.selectedCode.COD_EXCP_TYPE.key === 'ALL' ? ''
        : utils.trim(this.selectedCode.COD_EXCP_TYPE.key));
      const excpId = utils.trim(this.excpLogId);
      const occurDate = utils.dateformatToServer(this.datePicker).slice(0,8);
      const excpDiv = (this.selectedCode.COD_EXCP_LOG_DIV.key === 'ALL' ? ''
        : utils.trim(this.selectedCode.COD_EXCP_LOG_DIV.key));
      const searchCond = utils.trim(this.selectedCode.COD_EXCP_SRCH_COND.key);
      const searchWord = utils.trim(this.condWord);
      const userId = utils.trim(this.selectedCode.SELECTED_USER.epId);

      const queryParams = {
        excpTypeCode: excpTypeCode || '',
        excpDivCode: excpDiv || '',
        excpId: excpId || '',
        occurDate: occurDate || '',
        excpUserId: userId || '',
        excpSearchCond: searchCond || '',
        excpSearchWord: searchWord || '',
      };

      http.request(this.$options.name, 'DTS_CMZ_00096', {
        query: queryParams,
      }).then(res => {
        this.excpClasNm = '';
        this.excpMsgCntn = '';
        this.excpDtlCntn = '';
        this.displayLangId = '';
        this.displayUserId = '';
        this.displayKnoxId = '';
        this.displayLoginId = '';
        this.displayUserName = '';
        this.displayUserGlobalName = '';
        this.displayDeptName = '';
        this.displayDeptEngName = '';
        this.detailLog = {};
        if (res.data) {
          const resData = [];
          if (res.data.totalNumbert > 0) {
            utils.forEach(res.data.exceptionLogs, item => {
              // const date = utils.toStringByFormat(item.finalModificationDTM, 'YYYY.MM.DD HH:mm:ss');
              const { userInfo } = this.$store.getters;
              let userName = '';
              if (utils.isEqual(userInfo.langId, item.dsplLangId) === true) {
                userName = item.userName;
              } else {
                userName = item.userGlobalName;
              }
              resData.push({
                sysExcpLogId: item.sysExcpLogId,
                svNm: item.svNm,
                excpClasNm: item.excpClasNm,
                excpMsgCntn: item.excpMsgCntn,
                excpTypeCd: item.excpTypeCd,
                excpTypeNm: item.excpTypeNm,
                excpLogDivCd: item.excpLogDivCd,
                excpLogDivNm: item.excpLogDivNm,
                excpDtlCntn: item.excpDtlCntn,
                excpLoginIp: item.excpLoginIp,
                pageId: item.pageId,
                dtsvcId: item.dtsvcId,
                DTM: item.finalModificationDTM,
                // DTM: date,
                userId: item.finalModificationUserId,
                userName,
                userGlobalName: item.userGlobalName,
                deptName: item.deptName,
                deptGlobalName: item.deptGlobalName,
                programId: item.finalModificationProgramId,
                knoxId: item.knoxId,
                loginId: item.loginId,
                dsplLangId: item.dsplLangId,
              });
            });
          }

          this.dsData.setData(resData);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // if (this.onClickValidate()) return false;
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      if (utils.isEmpty(this.$refs.dp.value)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_OCCUR_DATE')));
        return true;
      }
      return false;
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.condWord;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.condWord = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    onKeyUpExcpId() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewExcpId = this.excpLogId;
      if (utils.isExistSpecialChar(searchFieldNewExcpId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.excpLogId = this.searchFieldOldExcpId;
        });
      } else {
        this.searchFieldOldExcpId = searchFieldNewExcpId;
      }
    },
  },
};
</script>
<style scoped>
</style>
