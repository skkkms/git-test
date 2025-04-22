<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4 class="comm_tit02">
          {{ $t('MSG_TXT_APRV_HIS') }}
        </h4>
      </div>
      <sui-grid
        ref="grid1"
        :dataset="'ds0'"
        :columns="gridColumns1"
        :columnsresize="true"
        :sortable="false"
        :filterable="false"
        :showDisplayCountControl="false"
        :initial-pagesize="3"
        :pagesizeoptions="[3, 15, 30]"
      />
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4 class="comm_tit02">
          {{ $t('MSG_TXT_APRV_PRGS_STT') }}
        </h4>
      </div>
      <div class="authTB">
        <table>
          <thead>
            <tr>
              <th>{{ this.$t('MSG_TXT_SN') }}</th>
              <th>{{ this.$t('MSG_TXT_DIV') }}</th>
              <th>{{ this.$t('MSG_TXT_EMPL_NM') }}</th>
              <th>{{ this.$t('MSG_TXT_DEPT') }}</th>
              <th>{{ this.$t('MSG_TXT_APRV_STT') }}</th>
              <th>{{ this.$t('MSG_TXT_ARVL_DTM') }}</th>
              <th>{{ this.$t('MSG_TXT_PROC_DTM') }}</th>
              <th>{{ this.$t('MSG_TXT_OPINI') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in approvalUsers"
              :key="user.approvalUserUid"
            >
              <td>{{ user.approvalOrder }}</td>
              <td>{{ user.rightApprovalTypeName }}</td>
              <td>{{ user.approvalUserName }}</td>
              <td>{{ user.departmentName }}</td>
              <td>{{ user.rightApprovalTypeStateName }}</td>
              <td>{{ user.approvalArrivalDTM }}</td>
              <td>{{ user.approvalDTM }}</td>
              <td>{{ user.approvalOpinionContent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <sui-grid
        ref="grid2"
        dataset="ds1"
        :columns="gridColumns2"
        :columnsresize="true"
        :sortable="false"
        :filterable="false"
        :showDisplayCountControl="false"
      /> -->
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="closePagePopup"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00013', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      selectedApprovalId: '',
      localdata1: [],
      gridColumns1: [{
        text: this.$t('MSG_TXT_VER'),
        datafield: 'approvalVersion',
      }, {
        text: this.$t('MSG_TXT_TITLE'),
        datafield: 'approvalTitle',
      }, {
        text: this.$t('MSG_TXT_SUBM_USR'),
        datafield: 'approvalSubmissionUserId',
        createwidget: (row, column, value, htmlElement) => {
          utils.getGridCellFactory().createCellUserName(row, column, value, htmlElement, {
            displayType: '1',
            type: 'link',
            datafieldMap: {
              displayLanguageId: 'submissionDisplayLanguageId',
              knoxId: 'submissionKnoxId',
              userName: 'submissionUserName',
              userGlobalName: 'submissionUserGlobalName',
              departmentName: 'submissionDepartmentName',
              departmentEnglishName: 'submissionDepartmentEnglishName',
            },
          }, this.ds0, this.$refs.grid1);
        },
        initwidget(row, column, value, htmlElement) {
          utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
        },
        width: '200px',
      }, {
        text: this.$t('MSG_TXT_STT'),
        datafield: 'approvalProgressStateName',
        cellClassName: (r, c, v, h) => this.approvalProgressStateClass(r, c, v, h),
      }, {
        text: this.$t('MSG_TXT_CPLT_DTM'),
        datafield: 'approvalCompletionDTM',
        createwidget: (r, c, v, h) => utils.getGridCellFactory().createCellDateLabel(r, c, v, h, this.ds0, this.$refs.grid1),
        initwidget: (r, c, v, h) => utils.getGridCellFactory().refreshCell(r, c, v, h),        
      }],
      // localdata2: [],
      // gridColumns2: [{
      //   text: this.$t('MSG_TXT_SN'),
      //   datafield: 'approvalOrder',
      // }, {
      //   text: this.$t('MSG_TXT_DIV'),
      //   datafield: 'rightApprovalTypeName',
      // }, {
      //   text: this.$t('MSG_TXT_EMPL_NM'),
      //   datafield: 'approvalUserName',
      // }, {
      //   text: this.$t('MSG_TXT_CRLV'),
      //   datafield: 'careerLevelCode',
      // }, {
      //   text: this.$t('MSG_TXT_DEPT'),
      //   datafield: 'departmentName',
      // }, {
      //   text: this.$t('MSG_TXT_APRV_STT'),
      //   datafield: 'rightApprovalTypeStateName',
      // }, {
      //   text: this.$t('MSG_TXT_ARVL_DTM'),
      //   datafield: 'approvalArrivalDTM',
      //   cellsrenderer: (r, c, v, h, p) => utils.dateCellRenderer(r, c, v, h, p),
      // }, {
      //   text: this.$t('MSG_TXT_PROC_DTM'),
      //   datafield: 'approvalDTM',
      //   cellsrenderer: (r, c, v, h, p) => utils.dateCellRenderer(r, c, v, h, p),
      // }, {
      //   text: this.$t('MSG_TXT_OPINI'),
      //   datafield: 'approvalOpinionContent',
      //   createwidget: (row, column, value, htmlElement) => {
      //     utils.getGridCellFactory().createCellTextarea(row, column, value, htmlElement, {
      //       checkEditableFunction: this.checkEditableOpinion,
      //     }, this.ds1, this.$refs.grid2);
      //   },
      //   initwidget(row, column, value, htmlElement) {
      //     utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
      //   },
      // }],
      approvalUsers: [],
    };
  },
  watch: {
    selectedApprovalId(data) {
      this.selectApprovalUserList(data);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.ds0.$on(this.ds0.EVENTS.SELECTION_CHANGED, this.onDatasetSelectionChanged);

      const param = this.pageInitialData.taskApprovalId;
      const taskApprovalId = typeof param === 'string' ? param : utils.join(param, ', ');
      if (utils.isEmpty(taskApprovalId)) {
        utils.messageBox('error', this.$t('MSG_ALT_NO_SELT_TASK_APRV_ID'), null, this.closePagePopup);
      } else {
        this.selectApprovalListByTaskApprovalId(taskApprovalId);
      }
    });
  },
  beforeDestroy() {
    this.ds0.$off(this.ds0.EVENTS.SELECTION_CHANGED, this.onDatasetSelectionChanged);
  },
  datasets: [{
    id: 'ds0',
    type: 'local',
    data: 'localdata1',
    datafields: [
      { type: 'string', name: 'approvalId', map: 'approvalId' },
      { type: 'string', name: 'connectionApprovalId', map: 'connectionApprovalId' },
      { type: 'string', name: 'approvalTypeCode', map: 'approvalTypeCode' },
      { type: 'string', name: 'approvalProgressStateCode', map: 'approvalProgressStateCode' },
      { type: 'string', name: 'approvalProgressStateName', map: 'approvalProgressStateName' },
      { type: 'string', name: 'approvalTitle', map: 'approvalTitle' },
      { type: 'string', name: 'approvalContent', map: 'approvalContent' },
      { type: 'string', name: 'knoxBaseDivisionCode', map: 'knoxBaseDivisionCode' },
      { type: 'string', name: 'approvalAfterProcessName', map: 'approvalAfterProcessName' },
      { type: 'string', name: 'approvalAfterProcessSuccessYn', map: 'approvalAfterProcessSuccessYn' },
      { type: 'string', name: 'approvalCompletionDTM', map: 'approvalCompletionDTM' },
      { type: 'string', name: 'approvalSubmissionUserId', map: 'approvalSubmissionUserId' },
      { type: 'string', name: 'pICGroupId', map: 'pICGroupId' },
      { type: 'string', name: 'knoxApprovalVersion', map: 'knoxApprovalVersion' },
      { type: 'string', name: 'attachDocumentId', map: 'attachDocumentId' },
      { type: 'string', name: 'approvalUserList', map: 'approvalUserList' },
      { type: 'string', name: 'approvalVersion', map: 'approvalVersion' },
      { type: 'string', name: 'taskApprovalId', map: 'taskApprovalId' },
      { type: 'string', name: 'taskCode', map: 'taskCode' },
      { type: 'string', name: 'submissionDisplayLanguageId', map: 'submissionDisplayLanguageId' },
      { type: 'string', name: 'submissionKnoxId', map: 'submissionKnoxId' },
      { type: 'string', name: 'submissionUserName', map: 'submissionUserName' },
      { type: 'string', name: 'submissionUserGlobalName', map: 'submissionUserGlobalName' },
      { type: 'string', name: 'submissionDepartmentName', map: 'submissionDepartmentName' },
      { type: 'string', name: 'submissionDepartmentEnglishName', map: 'submissionDepartmentEnglishName' },
    ],
  },
    //  {
    //   id: 'ds1',
    //   type: 'local',
    //   data: 'localdata2',
    //   datafields: [
    //     { type: 'string', name: 'approvalId', map: 'approvalId' },
    //     { type: 'string', name: 'approvalUserId', map: 'approvalUserId' },
    //     { type: 'string', name: 'connectionApprovalId', map: 'connectionApprovalId' },
    //     { type: 'string', name: 'rightApprovalTypeCode', map: 'rightApprovalTypeCode' },
    //     { type: 'string', name: 'approvalOrder', map: 'approvalOrder' },
    //     { type: 'string', name: 'approvalUserEmail', map: 'approvalUserEmail' },
    //     { type: 'string', name: 'rightApprovalTypeStateCode', map: 'rightApprovalTypeStateCode' },
    //     { type: 'string', name: 'approvalDTM', map: 'approvalDTM' },
    //     { type: 'string', name: 'approvalArrivalDTM', map: 'approvalArrivalDTM' },
    //     { type: 'string', name: 'approvalOpinionContent', map: 'approvalOpinionContent' },
    //     { type: 'string', name: 'approvalUserName', map: 'approvalUserName' },
    //     { type: 'string', name: 'substituteApprovalYn', map: 'substituteApprovalYn' },
    //     { type: 'string', name: 'substituteApprovalUserId', map: 'substituteApprovalUserId' },
    //     { type: 'string', name: 'substituteApprovalUserName', map: 'substituteApprovalUserName' },
    //     { type: 'string', name: 'smsSendYn', map: 'smsSendYn' },
    //     { type: 'string', name: 'rightApprovalOpinionContent', map: 'rightApprovalOpinionContent' },
    //     { type: 'string', name: 'rightApprovalTypeName', map: 'rightApprovalTypeName' },
    //     { type: 'string', name: 'rightApprovalTypeStateName', map: 'rightApprovalTypeStateName' },
    //     { type: 'string', name: 'careerLevelCode', map: 'careerLevelCode' },
    //     { type: 'string', name: 'departmentName', map: 'departmentName' },

  //   ],
  // }
  ],
  methods: {
    selectApprovalListByTaskApprovalId(taskApprovalId) {
      http.request(this.$options.name, 'DTS_CMZ_00047', {
        query: { taskApprovalId },
      }).then(res => {
        const result = [];
        utils.forEach(res.data, data => {
          const approval = utils.assign(data, {
            taskApprovalId: data.approvalTask.taskApprovalId,
            approvalVersion: data.approvalTask.approvalVersion,
          });
          result.push(approval);
        });
        this.ds0.setRawData(result);
        this.ds0.setSelectedIndexes([0]);
      }).catch(error => {
        console.log(error);
      });
    },
    selectApprovalUserList(approvalId) {
      http.request(this.$options.name, 'DTS_CMZ_00046', {
        path: {
          'approval-id': approvalId,
        },
      }).then(res => {
        utils.dateformatToClientInArray(res.data, ['approvalArrivalDTM', 'approvalDTM']);
        this.approvalUsers = res.data;
      }).catch(error => {
        console.log(error);
      });
    },
    onDatasetSelectionChanged() {
      this.selectedApprovalId = this.ds0.getSelectedRow().approvalId;
    },
    // onCancelClick() {
    //   this.closePagePopup();
    // },
    checkEditableOpinion() {
      return false;
    },
    approvalProgressStateClass(row, column, value, htmlElement) {
      if (utils.isEqual(htmlElement.approvalProgressStateCode, '3')) {
        return 'RE_error';
      }
      return '';
    },
  },
};
</script>
<style scoped>
.authTB{width:100%; border-top: 1px solid #ccc; max-height: 220px; overflow: auto;}
.authTB table{width: 100%;}
.authTB tbody{}
.authTB th {position: relative;background: #F6F7F9;height:38px;text-align:left;padding-left:8px;color:#333;}
.authTB th:before{content: ""; position: absolute; left: 0; top:50%; transform: translateY(-50%);width: 1px; height: 12px; background: #ccc;}
.authTB th:first-child:before{width: 0px;}
.authTB td {
	font-size:13px;
	height:36px;
	border-top: 1px solid #eaeaea;
	margin: 0;
	color:#5a5a5a;
	padding: 0 8px
}
.authTB tr:last-child{border-bottom: 1px solid #ccc}
.authTB td:first-child, .authTB th:first-child {border-left-width: 0}
.authTB th:nth-of-type(1), .authTB td:nth-of-type(1){width: 6%;}
.authTB th:nth-of-type(2), .authTB td:nth-of-type(2){width: 7%;}
.authTB th:nth-of-type(3), .authTB td:nth-of-type(3){width: 10%;}
.authTB th:nth-of-type(4), .authTB td:nth-of-type(4){width: 14%;}
.authTB th:nth-of-type(5), .authTB td:nth-of-type(5){width: 8%;}
.authTB th:nth-of-type(6), .authTB td:nth-of-type(6){width: 15%;}
.authTB th:nth-of-type(7), .authTB td:nth-of-type(7){width: 15%;}
.authTB th:nth-of-type(8), .authTB td:nth-of-type(8){width: 25%; white-space: pre-wrap;}

</style>
