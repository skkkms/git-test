<template>
  <sui-page>
    <sui-page-header :title="$t('MSG_TIT_APP_MGT')" :pageId="this.$options.name"> </sui-page-header>
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row" >
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_STD_TYP')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-code-select ref="standardTypeOptions"
              :selected="selectData.COD_DATA_STD_DIV"
              :pageId="this.$options.name"
              codeId="COD_DATA_STD_DIV"
              :disabled="false"
              :defaultOption="'all'"
              />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APPL_TYP')" :vertical="false" />
          </div>
          <div class="col-xs-5">
           <sui-code-select ref="appTypeOptions"
              :selected="selectData.COD_DATA_STD_APPL_DIV "
              :pageId="this.$options.name"
              codeId="COD_DATA_STD_APPL_DIV"
              :disabled="false"
              :defaultOption="'all'"
              />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_STD_LGC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field maxlength="100" placeholder="" default value :disabled="false" @keyup="onKeyUpInput($event,'logicName',standardLogicNameField)" :clearable="true" :readonly="false" v-model="standardLogicNameField" @keyup.enter="searchApplications"></sui-text-field>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_PRCS_STT')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-code-select ref="processingStateOptions"
              :selected="selectData.COD_DATA_STD_APRV_PRGS_STT "
              :pageId="this.$options.name"
              codeId="COD_DATA_STD_APRV_PRGS_STT"
              :disabled="false"
              :defaultOption="'all'"
              />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APPL_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
           <sui-text-field placeholder="" maxlength="100" default value :disabled="false" @keyup="onKeyUpInput($event,'applicantName',applicantNameField)" :clearable="true" :readonly="false" v-model="applicantNameField" @keyup.enter="searchApplications"></sui-text-field>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APPL_DT')" :required="true" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <ur-range-picker
              ref="dp"
              v-model="selectedRangeDate"
              value="selectedRangeDate"
              :hideInput="false"
              sticky
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat                 
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MDLE')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select ref="moduleOptions"
              :page-id="this.$options.name"
              :selected-md="selectData.moduleCode"
              :selected-smd="selectData.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_PENDING')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-code-select ref="pendencyOptions"
              :selected="selectData.COD_APRV_PDNG_DIV"
              :pageId="this.$options.name"
              codeId="COD_APRV_PDNG_DIV"
              :disabled="false"
              :defaultOption="'all'"
              />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset " @click="reset()">{{$t('MSG_BTN_RESET')}}</sui-button>
          <sui-button type="button" class="comm_btn_Scr" @click="searchApplications()" v-permission:read="this.$options.name" >{{$t('MSG_BTN_SEARCH')}}</sui-button>
        </div>
      </div>
      <div class="mrB30"></div>
      <div id="tableDisplay" v-if="showMetauserBtn">
              <sui-s-grid
                  ref="grdList"
                  :data-source="dsData"
                  :headers="gridColumns1"
                  :enabletooltips="true"
                  :showRowsPerPageControl="false"
                  :options="options12"
                  v-permission:download="this.$options.name"
                  @grid:selected="onSelectRow12">
                  <template #right-info>
            <sui-button
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
              @click="excelDownload"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </sui-button>
          </template>
        </sui-s-grid>
      </div>
      <div id="tableDisplay" v-if="!showMetauserBtn">
              <sui-s-grid ref="grdList"
                  :data-source="dsData"
                  v-permission:download="this.$options.name"
                  :headers="gridColumns1"
                  :enabletooltips="true"
                  :options="options12"
                  :showRowsPerPageControl="false"
                  :showDisplayCountControl="false"
                  @grid:selected="onSelectRow12">
                   <template #right-info>
            <sui-button
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
              @click="excelDownload"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </sui-button>
          </template>
          </sui-s-grid>
      </div>
      <div class="comm_btn_wrap" v-if="showIfKnoxAprvN" >
       <sui-button type="button" class="comm_btn_border_Prime" v-if="!showMetauserBtn" :disabled="revokeStatus" @click="cancelApplication()">{{$t('MSG_BTN_CANCEL')}}</sui-button>
       <sui-button type="button" class="comm_btn_border" v-if="showMetauserBtn" :disabled="approveStatus" @click="individualApprove()">{{$t('MSG_BTN_INDV_APRV')}}</sui-button>
       <sui-button type="button" class="comm_btn_border" v-if="showMetauserBtn" :disabled="batchApproveStatus" @click="batchApprove()">{{$t('MSG_BTN_BLK_APRV')}}</sui-button>
       <sui-button type="button" class="comm_btn_border_Prime" v-if="showMetauserBtn" :disabled="batchRejectStatus" @click="batchReturn()">{{$t('MSG_BTN_BLK_RJT')}}</sui-button>
      </div>
      <div class="mrB30"></div>
      <div class="comm_title_wrap">
        <h4>{{$t('MSG_TXT_REQ_HIST')}}</h4>
      </div>
      <div class="mrT10"></div>
      <sui-s-grid ref="historyGrid"
          :data-source="datasetInfo"
          :headers="columns"
          :showRowsPerPageControl="false"
          :enabletooltips="true"
          :showDisplayCountControl="false"
          />
      <sui-popup v-model="showWordPopup" :title="$t('MSG_TIT_RTV_STD_REQ')">
        <p02 @exit="onPopupCancelClicked" :biddingInformationParam = "biddingInformationParam" :parentPageId="this.$options.name"/>
      </sui-popup>
      <sui-popup v-model="showTermPopup" :title="$t('MSG_TIT_RTV_STD_REQ')">
        <p03 @exit="onPopupCancelClicked" :biddingInformationParam = "biddingInformationParam" :parentPageId="this.$options.name"/>
      </sui-popup>
      <sui-popup v-model="showTermPopupMeta" :title="$t('MSG_TIT_REQ_RSLT')">
        <p06 @exit="onPopupCancelClicked" :biddingInformationParam = "biddingInformationParam" :parentPageId="this.$options.name"/>
      </sui-popup>
      <sui-popup v-model="showPopup" :title="$t('MSG_TIT_RTV_STD_REQ')">
        <p01 @exit="onPopupCancelClicked" :biddingInformationParam = "biddingInformationParam" :parentPageId="this.$options.name"/>
      </sui-popup>
      <sui-popup v-model="showApplicationPopup" :title="$t('MSG_TIT_REQ_RSLT')">
        <p05 @exit="onPopupCancelClicked" :biddingInformationParam = "biddingInformationParam"  :parentPageId="this.$options.name"/>
      </sui-popup>
      <sui-popup v-model="showApprovalPopup" :title="$t('MSG_TIT_REQ_RSLT')">
        <p04 @exit="onPopupCancelClicked" :biddingInformationParam = "biddingInformationParam"   :parentPageId="this.$options.name"/>
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import p02 from './components/PGE_DST_00005_P02';
import p03 from './components/PGE_DST_00005_P03';
import p06 from './components/PGE_DST_00005_P06';
import p01 from './components/PGE_DST_00005_P01';
import p05 from './components/PGE_DST_00005_P05';
import p04 from './components/PGE_DST_00005_P04';
import { urDataSet } from 'uidev-component/index.js';
const dateTypeFields = ['applicationdate'];
export default {
  name: 'PGE_DST_00005',
  components: {
    p02,
    p03,
    p06,
    p01,
    p05,
    p04,
  },
  data() {
    return {
      selectedRangeDate: [],
      dsData: new urDataSet(),
      datasetInfo: new urDataSet(),
       options12: {
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      standardLogicNameField: '',
      applicantNameField: '',
      startDateField: '',
      revokeStatus: true,
      batchApproveStatus: true,
      batchRejectStatus: true,
      approveStatus: true,
      showWordPopup: false,
      showTermPopup: false,
      showMetauserBtn: false,
      showRevokeBtn: false,
      showTermPopupMeta: false,
      showPopup: false,
      showApprovalPopup: false,
      showApplicationPopup: false,
      showIfKnoxAprvN: false,
      approvalUID: '',
      biddingInformationParam: {},
      selectedAll: new Array(),
      appList: [],
      applicationUserId: this.$store.getters.userInfo.userId,
      selectData: {
        COD_DATA_STD_DIV: { label: '', key: '' },
        COD_DATA_STD_APPL_DIV: { label: '', key: '' },
        COD_DATA_STD_APRV_PRGS_STT: { label: '', key: '' },
        COD_MDLE: { label: '', key: '' },
        COD_APRV_PDNG_DIV: { label: '', key: '' },
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
      },
      localdata: [],
      localdata0: [],
      selectedData:[],
      localdata123: [],
      defaultGridData0: {
        dataSource: {
          localdata: [],
          datatype: 'json',
          editable: true,
          selectionmode: 'singlecell',
          editmode: 'click',
        },
        altrows: true,
        showcolumnlines: false,
        showcolumnheaderlines: false,
        columns: [{
          text: this.$t('MSG_TXT_STD_TYP'),
          datafield: 'dataStandardType',
        }, {
          text: this.$t('MSG_TXT_APPL_TYP'),
          datafield: 'applicationType',
        }, {
          text: this.$t('MSG_TXT_PRCS_STT'),
          datafield: 'processingStateName',
        }, {
          text: this.$t('MSG_TXT_STD_LGC_NM'),
          datafield: 'dataStandardName',
        }, {
          text: this.$t('MSG_TXT_DESC'),
          datafield: 'description',
        }, {
          text: this.$t('MSG_TXT_APPL_DT'),
          datafield: 'applicationdate',
        }, {
          text: this.$t('MSG_TXT_MDLE'),
          datafield: 'module',
        }, {
          text: this.$t('MSG_TXT_APPL_NM'),
          datafield: 'applicantName',
        }],
      },
      defaultGridData1: {
        dataSource: {
          localdata: [],
          datatype: 'json',
          editable: true,
          selectionmode: 'singlecell',
          editmode: 'click',
        },
        altrows: true,
        showcolumnlines: false,
        showcolumnheaderlines: false,
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
    };
    },
  created() {
    const that = this;
        this.columns = [{
          text: this.$t('MSG_TXT_STD_TYP'),
          value: 'dataStandardType',
          width: 100,
        }, {
          text: this.$t('MSG_TXT_APPL_TYP'),
          value: 'applicationType',
          width: 150,
        }, {
          text: this.$t('MSG_TXT_PRCS_STT'),
          value: 'processingState',
          width: 100,
        }, {
          text: this.$t('MSG_TXT_STD_LGC_NM'),
          value: 'dataStandardName',
          width: 250,
        }, {
          text: this.$t('MSG_TXT_DESC'),
          value: 'description',
        }, {
          text: this.$t('MSG_TXT_APPL_DTM'),
          value: 'applicationdate',
          cellsrenderer: (r, c, v, h, p) => utils.dateCellRenderer(r, c, v, h, p),
          width: 150,
        }, {
          text: this.$t('MSG_TXT_MDLE'),
          value: 'moduleName',
          width: 100,
        }, {
          text: this.$t('MSG_TXT_APPL_NM'),
          value: 'applicantName',
          width: 200,
          component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :displayType="'1'"
              :loginId="row.loginId"
              :knoxId="row.knoxId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,
        },
        }];

      this.gridColumns1 = [{
        text: this.$t('MSG_TXT_STD_TYP'),
        value: 'dataStandardTypeNm',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_APPL_TYP'),
        value: 'applicationTypeNm',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_PRCS_STT'),
        value: 'processingStateName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_STD_LGC_NM'),
        value: 'dataStandardName',
        component: {
          props: ['row', 'value'],
          template:
            `<ur-button
              :title="row.dataStandardName"
              type="button"
              class="link"
              shape="hyperlink"
              prim
              style="background-color: #0000"
              @click="onClickGrid12(value, row)"
            >
              {{row.dataStandardName}}
            </ur-button>`,
            methods: {
                 onClickGrid12(btn, dataRow) {
                   that.onClickGrid(btn, dataRow);
                },
             },
        },
        width: 250,
      }, {
        text: this.$t('MSG_TXT_DESC'),
        value: 'description',
      }, {
        text: this.$t('MSG_TXT_APPL_DTM'),
        value: 'applicationdate',
        cellsrenderer: (r, c, v, h, p) => utils.dateCellRenderer(r, c, v, h, p),
        width: 150,
      }, {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_APPL_NM'),
        value: 'applicantName',
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :displayType="'1'"
              :loginId="row.loginId"
              :knoxId="row.knoxId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,
        },
        width: 200,
      }];
  },
  computed: {},
  watch: {},
  mounted() {
    this.getSession();

    this.selectedRangeDate = [utils.dateformatToClient(utils.addDay(utils.now(),-30), 'S'),
      utils.dateformatToClient(utils.now())];
    this.startDateField = utils.dateformatToClient(this.selectedRangeDate[0],'S') + '000000';
    this.endDateField = utils.dateformatToClient(this.selectedRangeDate[1],'S') + '235959';
  },

  methods: {
    onClickGrid(btn, dataRow) {
      const {approvalUID} = dataRow;
      const pathParam = {
        'approval-id': approvalUID,
      };
      if (dataRow.dataStandardType === '0') {
        // Domain
        const queryParams = {
          dataStandardDivisionCode: 0,
          searchType: 'view',
          finalModificationUserId: this.applicationUserId,
          finalModificationProgramId: "PGE_DST_00005",
        };
        http.request('PGE_DST_00005', 'DTS_DST_00078', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          const response = res.data;
          this.biddingInformationParam = response;
          this.showPopup = true;
        });
      } else if (dataRow.dataStandardType === '1') {
        // Word
        const queryParams = {
          dataStandardDivisionCode: 1,
          searchType: 'view',
          finalModificationUserId: this.applicationUserId,
          finalModificationProgramId: "PGE_DST_00005",
        };
        http.request('PGE_DST_00005', 'DTS_DST_00078', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          const response = res.data;
          this.biddingInformationParam = response;
          this.showWordPopup = true;
        });
      } else if (dataRow.dataStandardType === '2') {
        // Term
        const queryParams = {
          dataStandardDivisionCode: 2,
          searchType: 'view',
          finalModificationUserId: this.applicationUserId,
          finalModificationProgramId: "PGE_DST_00005",
        };
        http.request('PGE_DST_00005', 'DTS_DST_00078', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          const response = res.data;
          this.biddingInformationParam = response;
          this.showTermPopup = true;
        });
      }
    },
    cancelApplication() {
      // utils.confirm(this.$t('MSG_ALT_PRGS_CANCEL'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO') , this.cancelDetail, () => {});
      utils.messageBox('confirm', this.$t('MSG_ALT_PRGS_CANCEL'), null, this.cancelDetail);
    },
    cancelDetail() {
      const queryParams = {
        approvalOpinionContent: this.$t('MSG_TXT_RJT_BY_APPL_USR'),
        approvalUID: this.approvalUID,
        finalModificationUserId: this.applicationUserId,
        finalModificationProgramId: "PGE_DST_00005",
      };
      http.request('PGE_DST_00005', 'DTS_DST_00031', {
        query: queryParams,
      }).then(res => {
        if (res.data.resultCode == '1') {
          utils.messageBox('information',this.$t('MSG_TXT_REG_OK'), null, null);
          this.searchApplications();
        }
      });
    },
    reset() {
      this.$refs.standardTypeOptions.reset();
      this.$refs.appTypeOptions.reset();
      this.$refs.processingStateOptions.reset();
      // this.$refs.moduleOptions.reset();
      this.selectData.moduleCode.key = 'ALL';
      this.selectData.subModuleCode.key = 'ALL';
      this.standardLogicNameField = '';
      this.applicantNameField = '';
      this.selectedRangeDate = [utils.toStringByFormat(utils.addDay(utils.now('YYYY-MM-DD'),-30), 'YYYY-MM-DD'),
        utils.now('YYYY-MM-DD')];
      this.startDateField = utils.dateformatToClient(this.selectedRangeDate[0],'S') + '000000' ;
      this.endDateField = utils.dateformatToClient(this.selectedRangeDate[1],'S') + '235959';
      this.$refs.pendencyOptions.reset();
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
    checkRequiredDateField() {
      // if(this.onClickValidate()) return false;
      const fromDt = `${utils.dateformatToClient(this.selectedRangeDate[0], 'S')}000000`;
      const toDt = `${utils.dateformatToClient(this.selectedRangeDate[1], 'S')}000000`;
      console.log(`${fromDt + toDt}`);

      utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_APPL_DT')), null);
      // if (!( fromDt && toDt) ){
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL') ,  this.$t('MSG_TXT_APPL_DT')) , null);
      //   return true;
      // }
      // return false;
    },
    searchApplications() {
      // disabling buttons on search
      // console.log ("test ");
      if (this.onClickValidate()) return false;
      // if (this.checkRequiredDateField()) return false ;

      this.dsData.setData([]);

      this.revokeStatus = true;
      this.approveStatus = true;
      this.batchApproveStatus = true;
      this.batchRejectStatus = true;
      const queryParams = {
        dataStandardDivisionCode: this.$refs.standardTypeOptions.currentSelected.codeId || '',
        dataStandardApplicationDivisionCode: this.$refs.appTypeOptions.currentSelected.codeId || '',
        dataStandardName: this.standardLogicNameField || '',
        module: this.$refs.moduleOptions.selected.md.codeId || '',
        approvalStatusCode: this.$refs.processingStateOptions.currentSelected.codeId || '',
        startDate: this.startDateField || '',
        endDate: this.endDateField || '',
        firstRegistUserId: this.applicantNameField || '',
        pendency: this.$refs.pendencyOptions.currentSelected.codeId || '',
      };
      http.request('PGE_DST_00005', 'DTS_DST_00028', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, dateTypeFields);
        // console.log(JSON.stringify(res.data)+"==================================== data set =========================");
        this.dsData.setData(res.data);
        // console.log(JSON.stringify(res.data)+"======== line number 559 ==========");
        this.appList = this.dsData.originalData;
        this.selectedAll = [];
      });
    },
    excelDownload() {
      utils.downloadGridToExcel(this.$options.name, this.gridColumns1, this.dsData, "excel-export.xlsx");
      /* const queryParams = {
          dataStandardDivisionCode : this.$refs.standardTypeOptions.currentSelected.codeId || '',
          dataStandardApplicationDivisionCode : this.$refs.appTypeOptions.currentSelected.codeId || '',
          dataStandardName : this.standardLogicNameField || '',
          module : this.$refs.moduleOptions.selected.md.codeId || '',
          approvalStatusCode : this.$refs.processingStateOptions.currentSelected.codeId || '',
          startDate : this.startDateField || '',
          endDate : this.endDateField || '',
          firstRegistUserId : this.applicantNameField || '',
          pendency : this.$refs.pendencyOptions.currentSelected.codeId || ''
        };
        http.request('PGE_DST_00005', 'DTS_DST_00029', {
          path: {
          'page-id': 'PGE_DST_00005',
        },
        query: queryParams,
          responseType: 'arraybuffer'
        }).then((res) => {
          let fileName = "ApplicationList.xlsx";
          utils.downloadBlob(res, fileName);
        }) */
    },
    getSession() {
      // this.sessionInfo = this.$store.getters.userInfo;

      // 환경설정 값 knox결재 여부가 N인 경우에만 화면에서 결재 처리 가능 하도록 조건 추가.
      // utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'),'N'))

      if ( utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'),'N')) {
        this.showIfKnoxAprvN = true ;
      }


      if ( utils.hasRoleNickName('DTA_STD_ADMIN') ) {
        // if(this.sessionInfo.roleList[0].roleNickName == ) {
        this.showMetauserBtn = true;
      }

      this.sessionInfo = this.$store.getters.userInfo;
      console.log(utils.hasRoleNickName('DTA_STD_ADMIN'));
      if (utils.hasRoleNickName('DTA_STD_ADMIN') && utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'),'N')) {
        this.showMetauserBtn = true;
      }
    },
    multiSelect() {
      const selectedIndexes = this.dsData.getSelected();
      if (selectedIndexes.length > 0) {
        const indexlength = selectedIndexes.length - 1;
        const lastIndex = selectedIndexes[indexlength];
        console.log(selectedIndexes);
        let findConflict = 0;
        utils.forEach(selectedIndexes, index => {
          if (this.dsData.data[index].applicantName != this.$store.getters.userInfo.epid) {
            this.revokeStatus = true;
          } else {
            this.revokeStatus = false;
          }
        });
        // disabling buttons if not request

        utils.forEach(selectedIndexes, index => {
          if (this.dsData.data[index].processingState != '0') {
            findConflict++;
          }
        });
        console.log(findConflict);
        if (findConflict > 0) {
          console.log('disabling buttons');
          this.revokeStatus = true;
          this.approveStatus = true;
          this.batchApproveStatus = true;
          this.batchRejectStatus = true;
        } else {
          this.approveStatus = false;
          this.batchApproveStatus = false;
          this.batchRejectStatus = false;
        }
        // disabling individual approval when more than 1 request
        if (selectedIndexes.length > 1 && findConflict === 0 ) {
          this.approveStatus = true;
        }
      }// disabling when unselecting
      else {
        this.approveStatus = true;
        this.batchApproveStatus = true;
        this.batchRejectStatus = true;
      }
    },
  unCommonArray(first, second){
   const res = [];
   for(let i = 0; i < first.length; i++){
      if(second.indexOf(first[i]) === -1){
         res.push(first[i]);
      }
   };
   for(let j = 0; j < second.length; j++){
      if(first.indexOf(second[j]) === -1){
         res.push(second[j]);
      };
   };
   return res;
},
    onSelectRow12(row,type) {
      this.options12.msgTotal=false;
      var isNotMulti=false;
      const { length } = this.dsData.getSelected();
      if (this.dsData.getSelected().length >= this.localdata123.length) {
        this.localdata123.push(this.dsData.getSelected()[length - 1]);
      } else {
        var dsDataId = [];
        for (let i = 0; i < this.dsData.getSelected().length; i++) {
          dsDataId.push(this.dsData.getSelected()[i].__idx);
        }
        var localdataPushedV=[];
        for (let i = 0; i < this.localdata123.length; i++) {
          localdataPushedV.push(this.localdata123[i].__idx);
        }
        var unSelectedV= this.unCommonArray(dsDataId, localdataPushedV);
        for(let k=0;k<this.localdata123.length;k++){
        if(this.localdata123[k].__idx==unSelectedV){
           this.onUnselectRow(this.localdata123[k]);
           this.localdata123.splice(k, 1);
           isNotMulti=true;
        }
        }
      }
      // console.log('checking index', this.dsData);
      if(!isNotMulti){
        setTimeout(() => { this.OnSelectRowCall12(this.dsData.getSelected()[length - 1]);}, 500);
        }
    },
    OnSelectRowCall12(target) {
      if (!target) {
        this.multiSelect();
        return false;
      }
      let findConflict = 0;

      if (target.applicantName !== this.$store.getters.userInfo.epid) {
        this.revokeStatus = true;
      } else { this.revokeStatus = false;}
      if (target.processingState !== '0') {
        this.revokeStatus = true;
        this.approveStatus = true;
        this.batchApproveStatus = true;
        this.batchRejectStatus = true;
      } else {
        this.approveStatus = false;
        this.batchApproveStatus = false;
        this.batchRejectStatus = false;
      }
      let datastdType;
      let appType;
      const dataStdType = target.dataStandardType;
      const apptype = target.applicationType;

      if (dataStdType === '0') {
        datastdType = 0;
      } else if (dataStdType === '1') {
        datastdType = 1;
      } else if (dataStdType === '2') {
        datastdType = 2;
      }
      if (apptype === '0') {
        appType = 0;
      } else if (apptype === '1') {
        appType = 1;
      } else if (apptype === '2') {
        appType = 2;
      }
      this.selectedAll.push({
        approvalUID: target.approvalUID,
        processingState: target.processingState,
        dataStandardType: datastdType,
        applicationType: appType,
        description: this.$t('MSG_TXT_DTA_PRGS_CNTN'),
        id: target.__idx,
        finalModificationUserId: this.applicationUserId,
        finalModificationProgramId: 'PGE_DST_00005',
      });

      if (this.selectedAll.length > 1) {
        for (let i = 0; i < this.selectedAll.length; i++) {
          this.approveStatus = true;
          // disabling if processing state is not request type
          if (this.selectedAll[i].processingState !== '0') {
            findConflict++;
          }
        }
      }
      if (findConflict > 0) {
        this.approveStatus = true;
        this.batchApproveStatus = true;
        this.batchRejectStatus = true;
      }

      this.approvalUID = target.approvalUID;
      http.request('PGE_DST_00005', 'DTS_DST_00038', {
        query: {
          'standardDivisionCode': dataStdType,
          'standardLogicName': target.dataStandardName,

        },
      }).then(res => {
        // console.log(JSON.stringify(this.datasetInfo)+"=============== Test ==============");
        utils.dateformatToClientInArray(res.data, dateTypeFields);
        this.localdata1 = res.data;
        this.defaultGridData1.dataSource.localdata = [];
        this.datasetInfo.setData(this.localdata1);
        // console.log(JSON.stringify(this.datasetInfo));
      }).catch(error => {
        this.confirm(1, error);
      });
      return true;
    },
    onUnselectRow(target) {
      const selectedIndexes = this.dsData.getSelected();
      let findConflict = 0;
      for (let i = 0; i < this.selectedAll.length; i++) {
        if (this.selectedAll[i].id === target.__idx) {
          this.selectedAll.splice(i, 1);
          break;
        }// disabling if processing state is not request type
      }
      // disabling if found conflict
      utils.forEach(this.selectedAll, element => {
        if (element.processingState != '0') {
          findConflict++;
        }
      });

      if (findConflict > 0 && this.selectedAll.length > 0) {
        this.approveStatus = true;
        this.batchApproveStatus = true;
        this.batchRejectStatus = true;
      } else {
        this.approveStatus = false;
        this.batchApproveStatus = false;
        this.batchRejectStatus = false;
      }
      console.log('after unselect');
      console.log(this.selectedAll.length);
      if (this.selectedAll.length == 1 && findConflict === 0 ) {
        console.log('in unselect');
        this.approveStatus = false;
      } else {
        this.approveStatus = true;
      }

      if (this.selectedAll.length < 1 ) {
        console.log('disabling batch');
        // this.approveStatus=true;
        this.batchApproveStatus = true;
        this.batchRejectStatus = true;
      }
      if (selectedIndexes.length < 1 ) {
        this.revokeStatus = true;
        this.approveStatus = true;
        this.batchApproveStatus = true;
        this.batchRejectStatus = true;
      }
    },
    onConfirm() {
      if (this.onClickValidate()) return false;

      this.startDateField = utils.dateformatToClient(this.selectedRangeDate[0],'S') + '000000';
      this.endDateField = utils.dateformatToClient(this.selectedRangeDate[1],'S') + '235959';
      console.log('start date after formatting-->',this.startDateField);
      console.log('end date after formatting-->',this.endDateField);
    },
    batchApprove() {
      let batchApproveStatus = false;
      for (let i = 0;i < this.selectedAll.length; i++) {
        if (this.selectedAll[i].processingState != '0') {
          batchApproveStatus = true;
        }
      }
      if (!batchApproveStatus) {
        // utils.confirm(this.$t('MSG_ALT_BAT_PRGS'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO')  , this.okBatchApprove, () => {});
        utils.messageBox('confirm', this.$t('MSG_ALT_BAT_PRGS'), null, this.okBatchApprove);
      } else utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_STT_IS_NOT_APPR') , null));
    },
    okBatchApprove() {
      http.request('PGE_DST_00005', 'DTS_DST_00034', {
        data: this.selectedAll,
      }).then(res => {
        if (res.data.resultCode == '1') {
          utils.messageBox('information',this.$t('MSG_TXT_DTA_PRGS_CNTN'), null, null);
          this.searchApplications();
        }
      });
    },
    batchReturn() {
      let rejectStatus = false;
      for (let i = 0;i < this.selectedAll.length; i++) {
        if (this.selectedAll[i].processingState != '0') {
          rejectStatus = true;
        }
      }
      if (!rejectStatus) {
        // utils.confirm(this.$t('MSG_ALT_BAT_PRGS'), 'YES', 'NO' , this.okBatchReturn, () => {});
        utils.messageBox('confirm', this.$t('MSG_ALT_BAT_PRGS'), null, this.okBatchReturn);
      } else utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_REQ_NOT_FOR_RJT') , null));
    },
    okBatchReturn() {
      http.request('PGE_DST_00005', 'DTS_DST_00035', {
        data: this.selectedAll,
      }).then(res => {
        if (res.data.resultCode == '1') {
          utils.messageBox('information',this.$t('MSG_TXT_DTA_PRGS_CNTN'), null, null);
          this.searchApplications();
        }
      });
    },
    individualApprove() {
      const dataStdType = this.selectedAll[0].dataStandardType;
      const {approvalUID} = this.selectedAll[0];
      const pathParam = {
        'approval-id': approvalUID,
      };
      if (dataStdType == 0) {
        const queryParams = {
          dataStandardDivisionCode: 0,
          searchType: 'view',
          finalModificationUserId: this.applicationUserId,
          finalModificationProgramId: "PGE_DST_00005",
        };
        http.request('PGE_DST_00005', 'DTS_DST_00078', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          const response = res.data;
          this.biddingInformationParam = response;
          this.showApprovalPopup = true;
        });
      } else if (dataStdType == 1) {
        const queryParams = {
          dataStandardDivisionCode: 1,
          searchType: 'view',
          finalModificationUserId: this.applicationUserId,
          finalModificationProgramId: "PGE_DST_00005",
        };
        http.request('PGE_DST_00005', 'DTS_DST_00078', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          const response = res.data;
          this.biddingInformationParam = response;
          this.showApplicationPopup = true;
        });
      } else if (dataStdType == 2) {
        const queryParams = {
          dataStandardDivisionCode: 2,
          searchType: 'view',
          finalModificationUserId: this.applicationUserId,
          finalModificationProgramId: "PGE_DST_00005",
        };
        http.request('PGE_DST_00005', 'DTS_DST_00078', {
          path: pathParam,
          query: queryParams,
        }).then(res => {
          const response = res.data;
          this.biddingInformationParam = response;
          this.showTermPopupMeta = true;
        });
      }
    },
    onKeyUpInput(event, name , value) {
      // const searchFieldNewText = this.frame0[name];

      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          if (name === 'applicantName') {
            this.applicantNameField = '';
          } else this.standardLogicNameField = '';
          // this.$refs[name].setFocus();
        });
      }
    },
    onPopupCancelClicked() {
      this.showTermPopupMeta = false;
      this.showPopup = false;
      this.showTermPopup = false;
      this.showWordPopup = false;
      this.showApplicationPopup = false;
      this.showApprovalPopup = false;
      // this.showTermPopupMeta = false;

      this.searchApplications();
    },
  },
};
</script>
<style scoped>
</style>
