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
              :label="$t('MSG_TXT_OS_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codOsType"
              :selected="selectedCode.COD_MBL_OS_TYPE"
              :pageId="this.$options.name"
              :initialSelectedIndex="0"
              :customOpitonList="selCodes.allOption"
              codeId="COD_MBL_OS_TYPE"
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
              :max-date="maxDate"
              sticky
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
          <!-- <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_NTWK_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeExcpLogDiv"
              :selected="selectedCode.COD_MBL_NTWK_TYPE"
              :pageId="this.$options.name"
              :initialSelectedIndex="0"
              :customOpitonList="selCodes.allOption"
              codeId="COD_MBL_NTWK_TYPE"
            />
          </div> -->
        </div>
        <!-- <div class="row">
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
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5" />
        </div> -->
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="'PGE_CMZ_00088'"
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
        :initialRowsPerPage="5"
        :data-source="dsData"
        :headers="gridColumns"
        :columnsresize="true"
        :options="options"
        :columnsautoresize="true"
        :enabletooltips="true"
        :showRowsPerPageControl="false"
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
              :label="$t('MSG_TXT_OS_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.osTypeName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXCP_ID')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.mblAppExcpLogId }}
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
              :label="$t('MSG_TXT_NTWK_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.networkTypeCode }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APP_VERSION')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.appVersion }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_OS_VERSION')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.osVersion }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DVC_ID')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.deviceId }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDL_NM')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.modelName }}
            </div>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_LOGIN_IP')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.excpLoginIp }}
            </div>
          </div> -->
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
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5" />
        </div>
        <!-- <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_NTWK_TYPE')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ detailLog.networkType }}
            </div>
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5" />
        </div> -->
        <!-- <div class="row">
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
        </div> -->
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
import { urDataSet } from 'uidev-component/index';

export default {
  name: 'PGE_CMZ_00088', // eslint-disable-line vue/name-property-casing
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },
  data() {
    return {
      maxDate: new Date(Date.now()).toISOString().substr(0, 10),
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
      datePicker: utils.now('YYYY-MM-DD'),
      disabledDatesTo: { from: utils.now('YYYY-MM-DD'), to: null },
      dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
      },
      selectedCode: {
        COD_MBL_OS_TYPE: { label: '', key: '' },
        COD_MBL_NTWK_TYPE: { label: '', key: '' },
        COD_EXCP_SRCH_COND: { label: '', key: '' },
        SELECTED_USER: { userName: '', epId: '' },
      },
      gridColumns: [
        { text: this.$t('MSG_TXT_OS_TYPE'), value: 'osTypeName', width: '100px' },
        { text: this.$t('MSG_TXT_EXCP_ID'), value: 'mblAppExcpLogId' },
        { text: this.$t('MSG_TXT_OS_VERSION'), value: 'osVersion', width: '100px' },
        { text: this.$t('MSG_TXT_APP_VERSION'), value: 'appVersion', width: '100px' },
        { text: this.$t('MSG_TXT_DVC_ID'), value: 'deviceId' },
        { text: this.$t('MSG_TXT_MDL_NM'), value: 'modelName' },
        { text: this.$t('MSG_TXT_NTWK_TYPE'), value: 'networkTypeCode', width: '100px' },
        {
          text: this.$t('MSG_TXT_USR'),
          value: 'userName',
          component: {
            props: ['row'],
            template: `               
              <cmp-user-name-link
                :displayType="'1'"
                :displayLanguageId="row.dsplLangId"
                :userId="row.userId"
                :loginId="row.loginId"
                :knoxId="row.knoxId"
                :userName="row.userName"
                :userGlobalName="row.userGlobalName"
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
          width: '150px',
          customValue(value) {
            return utils.dateformatToClient(value);
          },
        },
      ],
      localdata0: [],
      searchFieldOldText: '',
      searchFieldOldExcpId: '',
    };
  },
  computed: {},
  watch: {},
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    onSelectedUser(selectedData) {
      if (null != selectedData) {
        this.selectedCode.SELECTED_USER.userName = selectedData.userName;
        this.selectedCode.SELECTED_USER.epId = selectedData.epId;
      }
    },
    onEmptyDataChange() {
      this.detailLog = {
        mblAppExcpLogId: '',
        osTypeName: '',
        osVersion: '',
        appVersion: '',
        deviceId: '',
        modelName: '',
        networkTypeCode: '',
        excpMsgCntn: '',
        excpDtlCntn: '',
        excpLoginIp: '',
        pageId: '',
        dtsvcId: '',
        DTM: '',
        userId: '',
        userName: '',
        userGlobalName: '',
        deptName: '',
        deptGlobalName: '',
        programId: '',
        knoxId: '',
        loginId: '',
        dsplLangId: '',
      };
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
    },
    onDataSetChange(row) {
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
      if (!utils.isEmpty(row)) {
        this.detailLog = row;
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
    },
    onReset() {
      this.$refs.codOsType.reset();
      this.$refs.userSelect.reset();
      this.selectedCode.COD_MBL_OS_TYPE.key = this.selCodes.allOption.key;
      this.excpLogId = '';
      this.datePicker = utils.now('YYYY-MM-DD');
      this.$refs.codeExcpLogDiv.reset();
      this.selectedCode.COD_MBL_NTWK_TYPE.key = this.selCodes.allOption.key;
      this.$refs.codeExcpSrchCond.reset();
      this.condIndex = 0;
      this.condWord = '';
      this.selectedCode.SELECTED_USER.userName = '';
    },
    onSearch() {
      if (this.onClickValidate()) return false;

      const osTypeCode = (this.selectedCode.COD_MBL_OS_TYPE.key === 'ALL' ? ''
        : utils.trim(this.selectedCode.COD_MBL_OS_TYPE.key));
      const networkTypeCode = (this.selectedCode.COD_MBL_NTWK_TYPE.key === 'ALL' ? ''
        : utils.trim(this.selectedCode.COD_MBL_NTWK_TYPE.key));
      const excpId = utils.trim(this.excpLogId);
      const occurDate = utils.toStringByFormat(this.datePicker, 'YYYYMMDD');
      const searchCond = utils.trim(this.selectedCode.COD_EXCP_SRCH_COND.key);
      const searchWord = utils.trim(this.condWord);
      const userId = utils.trim(this.selectedCode.SELECTED_USER.epId);

      const queryParams = {
        osTypeCode: osTypeCode || '',
        networkTypeCode: networkTypeCode || '',
        excpId: excpId || '',
        occurDate: occurDate || '',
        excpUserId: userId || '',
        excpSearchCond: searchCond || '',
        excpSearchWord: searchWord || '',
      };

      // 로그 등록 테스트
      // const excpDtlCntn = '504 Gateway Timeout: [{"StatusCode":504,"ErrorCode":null,"Errors":{"ModelValidationErrors":["GraphCubeService is not reachable."],"FieldValidationErrors":{}}}] '
      //                 + 'at org.springframework.web.client.HttpServerErrorException.create(HttpServerErrorException.java:116) '
      //                 + 'at org.springframework.web.client.DefaultResponseErrorHandler.handleError(DefaultResponseErrorHandler.java:188) '
      //                 + 'at org.springframework.web.client.DefaultResponseErrorHandler.handleError(DefaultResponseErrorHandler.java:125) ';

      // const regParams = {
      //   token: 'uiuza4y0wzps1bqd0bugbmbz',
      //   osTypeCode: 'A', // "A: Android, I: iOS"
      //   appVersion: '3.0',
      //   osVersion: '20',
      //   deviceId: 'AAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCC', // iOS 는 uuid
      //   modelName: '갤럭시폴드3',
      //   networkTypeCode: '5G', // "WF: WIFI, LT: LTE, 5G: 5G"
      //   excpMsgCntn: '504 Gateway Timeout: [{"StatusCode":504,"ErrorCode":null,"Errors":{"ModelValidationErrors":["GraphCubeService is not reachable."],"FieldValidationErrors":{}}}]	"org.springframework.web.client.HttpServerErrorException$GatewayTimeout: ',
      //   excpDtlCntn,
      // };

      // utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
      //   http.request(this.$options.name, 'DTS_CMZ_00182', {
      //     data: regParams,
      //   }).then(() => {
      //     utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
      //   }).catch(error => {
      //     console.log(error);
      //   });
      // });

      http.request(this.$options.name, 'DTS_CMZ_00181', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          const resData = [];
          if (res.data.totalNumbert > 0) {
            utils.forEach(res.data.exceptionMobileLogs, item => {
              // const date = utils.toStringByFormat(item.finalModificationDTM, 'YYYY.MM.DD HH:mm:ss');
              const { userInfo } = this.$store.getters;
              let userName = '';
              if (utils.isEqual(userInfo.langId, item.dsplLangId) === true) {
                userName = item.userName;
              } else {
                userName = item.userGlobalName;
              }
              resData.push({
                mblAppExcpLogId: item.mblAppExcpLogId,
                osTypeName: item.osTypeName,
                osVersion: item.osVersion,
                appVersion: item.appVersion,
                deviceId: item.deviceId,
                modelName: item.modelName,
                networkTypeCode: item.networkTypeCode,
                excpMsgCntn: item.excpMsgCntn,
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
          this.onEmptyDataChange();
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
