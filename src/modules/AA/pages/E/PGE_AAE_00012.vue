<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="moduleSubmoduleSelect"
              v-model="modules"
              :page-id="this.$options.name"
              :selected-md="searchBox.moduleCode"
              :selected-smd="searchBox.subModuleCode"
              :defaultmdOption="'all'"
              :defaultSmdOption="'all'"
              @loaded="loaded"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TYPE')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              codeId="COD_CDST_TYPE"
              :page-id="this.$options.name"
              :selected="searchBox.codeStructureTypeCode"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_USE_YN')" />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              :selected="searchBox.codeUseYn"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DEL_YN')" />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              :selected="searchBox.delYN"
              :defaultOption="'all'"
              :initialSelectedIndex="2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              codeId="COD_CD_MGT_SEARCH"
              :page-id="this.$options.name"
              :selected="searchBox.searchCondition"
              :defaultOption="'all'"
              style="width:58%;"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model.trim="searchBox.searchWord.key"
              maxlength="50"
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearchClick"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LANG')" />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              :selected="searchBox.langId"
              :pageId="this.$options.name"
              :disabled="!condCodeId"
            />
          </div>
        </div>
          
          
        <div class="btn_wrap mt10">
          <div class="right_box">
          <ur-button @click="onResetClick" style="margin-right:10px">
            {{$t('MSG_BTN_INTL')}}
          </ur-button>
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </ur-button>
        </div>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t("MSG_TXT_CD_BSIC_INFO") }}</h4>
          </div>
          <sui-s-grid
            ref="grid1"
            :headers="defaultGridData1.columns"
            :data-source="dsMaster"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            @grid:row-click="selectMasterGrid"
            style="min-width:99%; width:700px; overflow-x:scroll; overflow-y:hidden; margin-right:10px" 
          />
          <div class="comm_btn_wrap">
            <ur-button
              v-permission:update="this.$options.name"
              type="button"
              class=""
              :disabled="isMasterDeleted"
              @click="onClickBtnMasterRestore"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_RESTORE") }}
            </ur-button>
            <ur-button
              v-show="!isMasterDeleted"
              v-permission:delete="this.$options.name"
              type="button"
              class=""
              @click="onClickBtnMasterDiscard"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_DSCD") }}
            </ur-button>
            <ur-button
              v-show="!isMasterDeleted"
              v-permission:delete="this.$options.name"
              type="button"
              class=""
              :disabled="checkMetaSave"
              @click="onClickBtnMasterDelete"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_DEL") }}
            </ur-button>
            <ur-button
              v-permission:update="this.$options.name"
              type="button"
              class=""
              :disabled="checkMetaSave"
              @click="onClickBtnMasterEdit"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_MOD") }} 
            </ur-button>
            <ur-button
              v-permission:create="this.$options.name"
              type="button"
              class=""
              color="violet"
              :disabled="checkMetaSave"
              @click="onClickBtnMasterNew"

            >
              {{ $t("MSG_BTN_RGST") }}
            </ur-button>
          </div>
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t("MSG_TXT_CD_VAL_INFO") }}</h4>
          </div>
          <sui-s-grid
            ref="grid2"
            :headers="defaultGridData2.columns"
            :data-source="dsDetail"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            @grid:row-click="selectDetailGrid"  
            style="min-width:99%; width:690px; overflow-x:scroll; overflow-y:hidden;"          
          >
            <template #right-info>
            <!--
                <sui-button
                  class="comm_btn_gridTop comm_ico_excel"
                  @click="onDownloadExcel"
                >
                -->
                <ur-button @click="onDownloadExcel" style="margin-bottom: 5px">
                  <ur-icon
                    icon="download"
                    icon-type="line"
                  />
                  {{ $t("MSG_BTN_EXCEL_DOWNLOAD") }}
                </ur-button>
            </template>

          </sui-s-grid>

          <div class="comm_btn_wrap">
            <ur-button
              v-permission:update="this.$options.name"
              type="button"
              class=""
              :disabled="isDetailDeleted"
              @click="onClickBtnDetailRestore"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_RESTORE") }}
            </ur-button>
            <ur-button
              v-show="!isDetailDeleted"
              v-permission:delete="this.$options.name"
              type="button"
              class=""
              @click="onClickBtnDetailDiscard"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_DSCD") }}
            </ur-button>
            <ur-button
              v-show="!isDetailDeleted"
              v-permission:delete="this.$options.name"
              type="button"
              class=""
              :disabled="checkMetaSave"
              @click="onClickBtnDetailDelete"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_DEL") }}
            </ur-button>
            <ur-button
              v-permission:update="this.$options.name"
              type="button"
              class=""
              :disabled="checkMetaSave"
              @click="onClickBtnDetailEdit"
              style="margin-right:10px"
            >
              {{ $t("MSG_BTN_MOD") }}
            </ur-button>
            <ur-button
              v-permission:create="this.$options.name"
              type="button"
              color="violet"
              :disabled="checkMetaSave"
              @click="onClickBtnDetailNew"
            >
              {{ $t("MSG_BTN_RGST") }}
            </ur-button>
          </div>
        </div>
      </div>

      <sui-popup
        v-model="isShownPopupMaster"
        :title="$t('MSG_TXT_CD_BSIC_INFO')"
      >
        <p01
          :pageId="this.$options.name"
          :codeId="paramCodeId"
          :delYN="paramDelYN"
          @updated="masterUpdated"
          @save="masterSave"
          @close="masterPopOpenOrClose"
        />
      </sui-popup>
      <sui-popup
        v-model="isShownPopupDetail"
        :title="$t('MSG_TXT_CD_DTL_INFO')"
      >
        <p02
          :tempCodeId="frame0.selectedCodeValue.tempCodeId"
          :tempCdstType="frame0.selectedCodeValue.tempCdstType"
          :tempCdstTypeName="frame0.selectedCodeValue.tempCdstTypeName"
          :tempCdDCdId="frame0.selectedCodeValue.tempCdDCdId"
          :tempCdVldVal="frame0.selectedCodeValue.tempCdVldVal"
          :tempDeleteYn="frame0.selectedCodeValue.tempDeleteYn"
          @updated="detailUpdated"
          @cancel="popup2CancelClicked"
          @save="popup2SaveClicked"
        />
      </sui-popup>
      <sui-popup
        v-model="isShownPopupSubDetail"
        :title="$t('MSG_TXT_SUB_CODE_SELECT')"
      >
        <p03
          :pageId="this.$options.name"
          :selectedRowData="frame0.selectedCodeValue"
          @save="popup3SaveClicked"
          @cancel="popup3CancelClicked"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage'; // eslint-disable-line import/no-unresolved

import p01 from './components/PGE_AAE_00012_P01';
import p02 from './components/PGE_AAE_00012_P02';
import p03 from './components/PGE_AAE_00012_P03';


export default {
  name: 'PGE_AAE_00012', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
    p02,
    p03,
  },
  extends: BasePage,
  data() {
    return {

      // Search Box
      searchBox: {
        // 선택된 select box 값
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
        codeStructureTypeCode: { key: '', label: '' },
        codeUseYn: { key: '', label: '' },
        delYN: { key: '', label: '' },
        searchCondition: { key: '', label: '' },
        searchWord: { key: '', label: '', searchFieldOldText: '' },
        langId: { key: '', label: '' },
      },

      localdata1: [],
      localdata2: [],

      frame0: {
        selectedCodeValue: {
          tempCodeId: {},
          tempCdstType: {},
          tempCdstTypeName: {},
          tempCdDCdId: {},
          tempCdVldVal: {},
          tempDeleteYn: {},
        },
      },

      isMasterDeleted: false,
      isDetailDeleted: false,

      defaultGridData1: {},
      defaultGridData2: {},
      isShownPopupMaster: false,
      isShownPopupDetail: false,
      isShownPopupSubDetail: false,

      paramCodeId: '',
      paramDelYN: '',
      checkMetaSave: utils.checkMetaSave(),
      count: 0,
      // excel
      localdataExcel: [],

      excelGridColumns: [{
        text: this.$t('MSG_TXT_MDLE'),
        datafield: 'moduleCodeName',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        datafield: 'subModuleCodeName',
      }, {
        text: this.$t('MSG_TXT_CODE_ID'),
        datafield: 'codeId',
      }, {
        text: this.$t('MSG_TXT_CODE_NAME'),
        datafield: 'codeMasterName',
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        datafield: 'codeStructureTypeName',
      }, {
        text: this.$t('MSG_TXT_USE'),
        datafield: 'codeMasterUseYn',
      }, {
        text: this.$t('MSG_TXT_CD_VAL_NAME'),
        datafield: 'codeName',
      }, {
        text: this.$t('MSG_TXT_CD_VAL_ENAME'),
        datafield: 'codeEngName',
      }, {
        text: this.$t('MSG_TXT_CD_VAL'),
        datafield: 'codeValidityValue',
      }, {
        text: this.$t('MSG_TXT_LEVEL'),
        datafield: 'hierarchyLevel',
      }, {
        text: this.$t('MSG_TXT_ORDER'),
        datafield: 'arrayalOrder',
      }, {
        text: this.$t('MSG_TXT_PARENT_CODE'),
        datafield: 'parentCode',
      }, {
        text: this.$t('MSG_TXT_DEFAULT'),
        datafield: 'defaultYn',
      }, {
        text: this.$t('MSG_TXT_USE'),
        datafield: 'codeUseYn',
      }],

      dsMaster: new urDataSet(),
      dsDetail: new urDataSet(),
      dsExcel: new urDataSet(),
      savedMasterId: '',
      savedDetailId: '',
      modules: '',

      opts: { // 토탈o
        width:100,
      }
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
    condCodeId() {
      if (this.searchBox.searchCondition.key === 'CODE_NM') {
        return true;
      }
      return false;
    },
  },
  watch: {
  },
  mounted() {
    // this.loadCode().then(() => {
    
    this.loadData();

    const that = this;
    // });
    this.defaultGridData1 = {
      columns: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleCodeName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleCodeName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_CODE_ID'),
        value: 'codeId',
        component: {
          props: ['row', 'value'],
          template:
          `<sui-button
            type="button"
            :title="null"
            class="link"
            @click="parentMethodCall"
          >
            {{row.codeId}}
          </sui-button>`,
          methods: {
            parentMethodCall() {
              that.onGridMasterButtonClicked(this.row);
            },
          },
        },
      }, {
        text: this.$t('MSG_TXT_CODE_NAME'),
        value: 'codeName',
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'codeStructureTypeName',
        width: '100px',
      },
      {
        text: this.$t('MSG_TXT_USE_YN'),
        value: 'codeUseYn',
        width: '80px',
        //customValue:(v,r) => v==='Yes'?'Y':'N',
      },
      {
        text: this.$t('MSG_TXT_DEL'),
        value: 'delYN',
        width: '80px',
        //customValue:(v,r) => v==='Yes'?'Y':'N',
      }],
    };

    this.defaultGridData2 = {
      columns: [{
        text: this.$t('MSG_TXT_CD_VAL_NAME'),
        value: 'codeName',
      }, {
        text: this.$t('MSG_TXT_CD_VAL_ENAME'),
        value: 'codeEngName',
      }, {
        text: this.$t('MSG_TXT_CD_VAL'),
        value: 'codeValidityValue',
        width: 80,
        component: {
          props: ['row', 'value'],
          template:
          `<sui-button
            :title="row.codeValidityValue"
            type="button"
            class="link"
            @click.stop="parentMethodCall(row, value)"
          >
            {{row.codeValidityValue}}
          </sui-button>`,
          methods: {
            parentMethodCall(row, value) {
              that.onGridDetailButtonClicked(value, row);
            },
          },
        },
      }, {
        text: this.$t('MSG_TXT_LEVEL'),
        value: 'hierarchyLevel',
        width: 60,
      }, {
        text: this.$t('MSG_TXT_ORDER'),
        value: 'arrayalOrder',
        width: 60,
      }, {
        text: this.$t('MSG_TXT_PARENT_CODE'),
        value: 'parentCode',
      },// {
        //text: this.$t('MSG_TXT_DEFAULT'),
        //value: 'defaultYn',
        //width: 60,
        //customValue:(v,r) => v==='Yes'?'Y':'N',
      //},
      {
        text: this.$t('MSG_TXT_USE_YN'),
        value: 'codeUseYn',
        width: 80,
        //customValue:(v,r) => v==='Yes'?'Y':'N',
      },  {
        text: this.$t('MSG_TXT_DEL'),
        value: 'deleteYn',
        width: 60,
        //customValue:(v,r) => v==='Yes'?'Y':'N',
      }],
    };

    //document.getElementsByClassName("ur-data-grid__header__wrapper")[0].style.width = "99%";
    //console.dir(this.$refs.grid2.mergedOptions);
  },
  methods: {
    loadCode() {
    },
    // get contents data, grid etc..
    loadData() {
      // get contents data, grid etc..
      // init
      this.resetSearchBox();
    },
    /** ***************************************************************************
      이벤트 영역
      ***************************************************************************** */
    onClickBtnDetailNew() {
      const selectedMasterRawsData = this.dsMaster.getSelected();

      if (selectedMasterRawsData.length > 0) {
        const { codeId } = selectedMasterRawsData[0];
        const { cdstTypeCode } = selectedMasterRawsData[0];
        const { codeStructureTypeName } = selectedMasterRawsData[0];

        if (utils.isEmpty(codeId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEFAULT_INFO')));
          return false;
        }

        if (cdstTypeCode === '2') {
          utils.messageBox('warning', this.$t('MSG_ALT_SUB_ONLY_EDIT'));
          return false;
        }

        this.frame0.selectedCodeValue.tempCodeId = codeId;
        this.frame0.selectedCodeValue.tempCdstType = cdstTypeCode;
        this.frame0.selectedCodeValue.tempCdstTypeName = codeStructureTypeName;

        this.frame0.selectedCodeValue.tempDeleteYn = '';
        this.frame0.selectedCodeValue.tempCdDCdId = '';
        this.frame0.selectedCodeValue.tempCdVldVal = '';

        // 유형코드가 2가 아닐경우
        if (cdstTypeCode === '2') {
          this.isShownPopupSubDetail = true;
        } else {
          this.isShownPopupDetail = true;
        }
      } else {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }

      return true;
    },
    onClickBtnDetailEdit() {
      const selectedMasterRawsData = this.dsMaster.getSelected();

      if (selectedMasterRawsData.length > 0) {
        const { codeId } = selectedMasterRawsData[0];
        const { cdstTypeCode } = selectedMasterRawsData[0];
        const { codeStructureTypeName } = selectedMasterRawsData[0];

        this.frame0.selectedCodeValue.tempCodeId = codeId;
        this.frame0.selectedCodeValue.tempCdstType = cdstTypeCode;
        this.frame0.selectedCodeValue.tempCdstTypeName = codeStructureTypeName;

        if (utils.isEmpty(codeId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEFAULT_INFO')));
          return false;
        }

        if (cdstTypeCode !== '2') {
          const selectedRawsData = this.dsDetail.getSelected();
          if (selectedRawsData.length !== 1) {
          // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_CD_VAL_INFO')));
            utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
            return false;
          }

          const cdDCdId = selectedRawsData[0].codeId;
          const cdVldVal = selectedRawsData[0].codeValidityValue;
          const { deleteYn } = selectedRawsData[0];

          this.frame0.selectedCodeValue.tempCdDCdId = cdDCdId;
          this.frame0.selectedCodeValue.tempCdVldVal = cdVldVal;
          this.frame0.selectedCodeValue.tempDeleteYn = deleteYn;

          if (cdDCdId == null || cdVldVal == null) {
            utils.messageBox('warning',
              utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CD_VAL_INFO')));
            return false;
          }
        }

        // 유형코드가 2가 아닐경우
        if (cdstTypeCode === '2') {
          this.isShownPopupSubDetail = true;
        } else {
          this.isShownPopupDetail = true;
        }
      } else {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }

      return true;
    },
    onKeyUpInput() {
      const searchFieldNewText = this.searchBox.searchWord.key;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.searchBox.searchWord.key = this.searchBox.searchWord.searchFieldOldText;
        } else {
          this.searchBox.searchWord.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    onResetClick() {
      this.resetSearchBox();
    },
    onSearchClick() {
      if(this.$refs.moduleSubmoduleSelect.selected.md.key === '') {
         utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_MODULE_SELECT')));
         return;
      }
      this.searchMaster();
    },
    onGridMasterButtonClicked(btn) {
      this.paramCodeId = btn.codeId;
      this.paramDelYN = btn.delYN;
      this.masterPopOpenOrClose();
    },
    onGridDetailButtonClicked(btn, dataRow) {
      const selectedMasterRawsData = this.dsMaster.getSelected();

      if (selectedMasterRawsData.length > 0) {
        const { codeId } = selectedMasterRawsData[0];
        const { cdstTypeCode } = selectedMasterRawsData[0];
        const { codeStructureTypeName } = selectedMasterRawsData[0];
        console.log(codeId, cdstTypeCode, codeStructureTypeName);

        this.frame0.selectedCodeValue.tempCodeId = codeId;
        this.frame0.selectedCodeValue.tempCdstType = cdstTypeCode;
        this.frame0.selectedCodeValue.tempCdstTypeName = codeStructureTypeName;

        if (utils.isEmpty(codeId)) {
          console.log('codeId not there', codeId);
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEFAULT_INFO')));
          return false;
        }

        if (cdstTypeCode !== '2') {
          const cdDCdId = dataRow.codeId;
          const cdVldVal = dataRow.codeValidityValue;
          const { deleteYn } = dataRow;

          this.frame0.selectedCodeValue.tempCdDCdId = cdDCdId;
          this.frame0.selectedCodeValue.tempCdVldVal = cdVldVal;
          this.frame0.selectedCodeValue.tempDeleteYn = deleteYn;

          if (cdDCdId == null || cdVldVal == null) {
            console.log('cdDCdId', cdDCdId, cdVldVal, deleteYn);
            utils.messageBox('warning',
              utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CD_VAL_INFO')));
            return false;
          }
        }

        if (cdstTypeCode === '2') {
          this.isShownPopupSubDetail = true;
        } else {
          this.isShownPopupDetail = true;
        }
      }

      return true;
    },
    onDownloadExcel() {
      this.searchExcelAndDownload();
    },
    /** ***************************************************************************
      함수 영역
      ***************************************************************************** */
    searchExcelAndDownload() {
      // searchBox -> paramsObj변환 { key : value, key : value }
      const queryParams = utils.reduce(this.searchBox, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});

      queryParams.searchWord = encodeURI(queryParams.searchWord);

      http.request(this.$options.name, 'DTS_AAI_00024', {
        query: queryParams,
      }).then(res => {
        this.dsExcel.setData(res.data); // 데이터 셋에 데이터를 넣는 함수

        const metaObj = {
          headerFontSize: 11,
          headerFontColor: 1,
          headerForegroundColor: 22,
          defaultFontSize: 10,
        };

        const sPageId = this.$options.name;
        const objGridColumns = this.excelGridColumns;
        const objGridDataset = this.dsExcel;

        const sToday = utils.now('YYYYMMDDHHmmss');
        const meta = this.$store.getters.getPageMeta(this.$options.name);
        const pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId;
        const sExcelName = `${pageTitle}_${sToday}.xlsx`;

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, metaObj);
      }).catch(error => {
        console.log(error);
      });
    },
    resetSearchBox() {
      
      utils.forEach(this.searchBox, (values, key) => {
        this.searchBox[key] = { key: '', label: '' };
      });

      this.searchBox.moduleCode.key = 'ALL';
      this.searchBox.subModuleCode.key = 'ALL';
      this.searchBox.codeStructureTypeCode.key = 'ALL';
      this.searchBox.codeUseYn.key = 'ALL';
      this.searchBox.delYN.key = 'N';
      this.searchBox.searchCondition.key = 'ALL';

      const { langId } = this.$store.getters.userInfo;
      this.searchBox.langId.key = utils.isEmpty(langId) || utils.isUndefined(langId)
        ? 'en'
        : langId;
    },
    searchMaster() {
      // searchBox -> paramsObj변환 { key : value, key : value }
      const queryParams = utils.reduce(this.searchBox, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});

      queryParams.searchWord = encodeURI(queryParams.searchWord);

      http.request(this.$options.name, 'DTS_AAI_00006', {
        query: queryParams,
      }).then(res => {
        this.dsMaster.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
      }).then(() => {
        if (this.dsMaster.data.length > 0) {
          if(!utils.isEmpty(this.savedMasterId)){
            this.$refs.grid1.setSelect({codeId: this.savedMasterId});
          }else{
            const firstRow = this.dsMaster.data[0];
            this.dsMaster.setSelect(firstRow, false);
            this.selectMasterGrid(firstRow);
          }
        } else {
          this.dsDetail.setData();
        }
      }).catch(error => {
        console.log(error);
      });
    },

    searchDetail(codeId, codeValue) {
      http.request(this.$options.name, 'DTS_AAI_00007', {
        query: {
          codeId,
          codeValueValidityDTMUseYn: 'N',
          deleteYn: 'ALL',
        },
      }).then(res => {
        this.dsDetail.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
          if(!utils.isEmpty(codeValue)){
            this.$refs.grid2.setSelect({codeId: codeId, codeValidityValue:codeValue});
          }        
      }).catch(error => {
        console.log(error);
      });
    },

    selectMasterGrid(target) {      
      const index = target.__idx;
      if (this.dsMaster.getSelected().length === 0) {
        this.dsMaster.setSelect(target, false);
      }

      if (index === -1) {
        return false;
      }

      const selectedRowData = this.dsMaster.data[index];
      if (selectedRowData.delYN === 'Yes') {
        this.isMasterDeleted = true;
      } else {
        this.isMasterDeleted = false;
      }
      this.searchDetail(selectedRowData.codeId);
      return true;
    },
    masterUpdated(savedMasterId) {
      this.savedMasterId = savedMasterId;
      this.masterPopOpenOrClose();
      this.searchMaster();
    },
    masterSave() {
      this.masterPopOpenOrClose();
      this.searchMaster();
    },
    masterPopOpenOrClose() {
      this.isShownPopupMaster = !this.isShownPopupMaster;
    },
    detailUpdated(savedMasterId, savedDetailId) {
      this.searchDetail(savedMasterId, savedDetailId);
      this.isShownPopupDetail = false;
    },
    popup2SaveClicked() {
      const selectedMasterRawsData = this.dsMaster.getSelected();

      if (selectedMasterRawsData.length > 0) {
        const { codeId } = selectedMasterRawsData[0];
        this.searchDetail(codeId);
      }

      this.isShownPopupDetail = false;
    },
    popup2CancelClicked() {
      this.isShownPopupDetail = false;
    },
    popup3SaveClicked() {
      const selectedMasterRawsData = this.dsMaster.getSelected();

      if (selectedMasterRawsData.length > 0) {
        const { codeId } = selectedMasterRawsData[0];
        this.searchDetail(codeId);
      }

      this.isShownPopupSubDetail = false;
    },
    popup3CancelClicked() {
      this.isShownPopupSubDetail = false;
    },
    // 기준정보 등록
    onClickBtnMasterNew() {
      this.paramCodeId = '';
      this.paramDelYN = '';
      this.masterPopOpenOrClose();
    },
    // 기준정보 수정
    onClickBtnMasterEdit() {
      const selectedRawsData = this.dsMaster.getSelected();

      if (selectedRawsData.length !== 1) {
      // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_DEFAULT_INFO')));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }

      this.paramCodeId = selectedRawsData[0].codeId;
      this.paramDelYN = selectedRawsData[0].delYN;

      this.masterPopOpenOrClose();
      return true;
    },
    onClickBtnMasterDelete() {
      const selectedRawsData = this.dsMaster.getSelected();
      if (selectedRawsData.length !== 1) {
      // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_DEFAULT_INFO')));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }

      if(selectedRawsData[0].delYN === 'Y') {
        utils.messageBox('warning', this.$t('MSG_ALT_ALREADY_DEL'));
        return;
      }

      const { codeId } = selectedRawsData[0];
      console.log(codeId);

      if (utils.isEmpty(codeId)) {
      // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEFAULT_INFO')));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.deleteMaster);
      return true;
    },
    deleteMaster() {
      const selectedRawsData = this.dsMaster.getSelected();
      if (selectedRawsData.length === 0) return;

      const dataParams = [];
      utils.forEach(selectedRawsData, item => {
        dataParams.push({
          codeId: item.codeId,
        });
      });

      http.request(this.$options.name, 'DTS_AAI_00015', {
        path: {},
        data: dataParams,
      }).then(() => {
        this.searchMaster();
        utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'));
      }).catch(error => {
        if (error.data.code === 0) {
          utils.messageBox('error', this.$t('MSG_ALT_DELETE_LOW_ITEM'));
        }
      });
    },
    onClickBtnDetailDelete() {
      
      const selectedMasterRawsData = this.dsMaster.getSelected();
      if (selectedMasterRawsData.length > 0) {
        const { cdstTypeCode } = selectedMasterRawsData[0];

        if (cdstTypeCode === '2') {
          utils.messageBox('warning', this.$t('MSG_ALT_SUB_ONLY_EDIT'));
          return false;
        }

        const selectedRawsData = this.dsDetail.getSelected();
        
        if(selectedRawsData[0].deleteYn === 'Y') {
          utils.messageBox('warning', this.$t('MSG_ALT_ALREADY_DEL'));
          return;
        }

        if (selectedRawsData.length === 0 && cdstTypeCode !== '2') {
        // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CD_VAL_INFO')));
          utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
          return false;
        }
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.deleteDetail);
      } else {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      return true;
    },
    deleteDetail() {
      const selectedRawsData = this.dsDetail.getSelected();

      if (selectedRawsData.length === 0) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CD_VAL_INFO')));
        return false;
      }

      const dataParams = [];
      utils.forEach(selectedRawsData, item => {
        dataParams.push({
          codeId: item.codeId,
          codeValidityValue: item.codeValidityValue,
        });
      });

      http.request(this.$options.name, 'DTS_AAI_00016', {
        path: {},
        data: dataParams,
      }).then(() => {
        const selectedMaterRawsData = this.dsMaster.getSelected();
        if (selectedRawsData.length === 1) {
          const { codeId } = selectedMaterRawsData[0];
          this.searchDetail(codeId);
        }

        utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, () => {});
      });

      return true;
    },
    onCtsDownloadClick() {
      const selectedMasterRawsData = this.dsMaster.getSelected();

      if (selectedMasterRawsData.length > 0) {
        const { codeId } = selectedMasterRawsData[0];
        this.searchDetail(codeId);

        if (!codeId) {
          utils.messageBox('warning', this.$t('MSG_ALT_DOWN_NO_DATA'), null, () => {});
        } else {
          http.request(this.$options.name, 'DTS_CMU_00042', {
            path: {
              'code-id': codeId,
            },
            responseType: 'arraybuffer',
          }).then(res => {
            const fileName = `${codeId}.cts`;
            utils.downloadBlob(res, fileName);
          });
        }
      }
    },
    onCtsUploadClick(file) {
      if (file[0]) {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
          (/* ok */) => {
            const formData = new FormData();
            formData.append('file', file[0]);

            http.request(this.$options.name, 'DTS_CMU_00041', {
              data: formData,
            }).then(() => {
              utils.messageBox('warning', this.$t('MSG_ALT_SAVE_DATA'), null, () => {});
            });
          },
          (/* cancel */) => {});
      }
    },
    onClickBtnMasterRestore() {
      const selectedRawsData = this.dsMaster.getSelected();

      if(selectedRawsData[0].delYN === 'N') {
        utils.messageBox('warning', this.$t('MSG_ALT_ALREADY_RESTORE'));
        return;
      }

      if (selectedRawsData.length !== 1) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_DEFAULT_INFO')));
        return false;
      }

      const { codeId } = selectedRawsData[0];

      if (utils.isEmpty(codeId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEFAULT_INFO')));
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_RESTORE_DATA'), null, this.restoreMaster);
      return true;
    },
    onClickBtnDetailRestore() {
      const selectedRawsData = this.dsDetail.getSelected();
      
       if (selectedRawsData.length !== 1) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_RESTORE_NOT')));
        return false;
      }

      if(selectedRawsData[0].deleteYn === 'N') {
        utils.messageBox('warning', this.$t('MSG_ALT_ALREADY_RESTORE'));
        return;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_RESTORE_DATA'), null, this.restoreDetail);
      return true;
    },
    onClickBtnMasterDiscard() {
      const selectedRawsData = this.dsMaster.getSelected();
      if (selectedRawsData.length !== 1) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_DEFAULT_INFO')));
        return false;
      }

      const { codeId } = selectedRawsData[0];

      if (utils.isEmpty(codeId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEFAULT_INFO')));
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DSCD_DATA'), null, this.discardMaster);
      return true;
    },
    onClickBtnDetailDiscard() { // detail 폐기
      const selectedRawsData = this.dsDetail.getSelected();
      if (selectedRawsData.length !== 1) {
        //utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_DEFAULT_INFO')));
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DSCD_DATA'), null, this.discardDetail);
      return true;
    },
    restoreMaster() {
      const selectedRawsData = this.dsMaster.getSelected();
      if (selectedRawsData.length === 0) return;

      const dataParams = {
        codeId: '',
      };
      dataParams.codeId = selectedRawsData[0].codeId;
      dataParams.codeMasterMultiLanguageId = selectedRawsData[0].codeId;

      http.request(this.$options.name, 'DTS_AAI_00020', {
        data: dataParams,
        path: {
          'code-id': dataParams.codeId,
        },
      }).then(() => {
        this.searchMaster();
        utils.messageBox('success', this.$t('MSG_ALT_RESTORE_DATA'));
      }).catch(error => {
        console.log(error);
      });
    },
    restoreDetail() {
      const selectedRawsData = this.dsDetail.getSelected();
      if (selectedRawsData.length === 0) return;

      const dataParams = {
        codeId: '',
      };
      dataParams.codeId = selectedRawsData[0].codeId;
      dataParams.codeValidityValue = selectedRawsData[0].codeValidityValue;
      dataParams.codeDetailMultiLanguageId = `${selectedRawsData[0].codeId}_${selectedRawsData[0].codeValidityValue}`;

      http.request(this.$options.name, 'DTS_AAI_00022', {
        data: dataParams,
        path: {
          'code-id': dataParams.codeId,
          'code-val': dataParams.codeValidityValue,
        },
      }).then(() => {
        this.searchDetail(dataParams.codeId);
        utils.messageBox('success', this.$t('MSG_ALT_RESTORE_DATA'));
      }).catch(error => {
        console.log(error);
      });
    },
    discardMaster() {
      const selectedRawsData = this.dsMaster.getSelected();
      if (selectedRawsData.length === 0) return;

      const dataParams = {
        codeId: '',
      };
      dataParams.codeId = selectedRawsData[0].codeId;

      http.request(this.$options.name, 'DTS_AAI_00021', {
        data: dataParams,
        path: {
          'code-id': dataParams.codeId,
        },
      }).then(() => {
        this.searchMaster();
        utils.messageBox('success', this.$t('MSG_ALT_DSCD_DATA'));
        this.onSearchClick();
      }).catch(error => {
        console.log(error);
      });


    },
    discardDetail() {
      const selectedRawsData = this.dsDetail.getSelected();

      const dataParams = {
        codeId: '',
        codeValidityValue: '',
      };
      dataParams.codeId = selectedRawsData[0].codeId;
      dataParams.codeValidityValue = selectedRawsData[0].codeValidityValue;

      http.request(this.$options.name, 'DTS_AAI_00023', {
        data: dataParams,
        path: {
          'code-id': dataParams.codeId,
          'code-val': dataParams.codeValidityValue,
        },
      }).then(() => {
        this.searchDetail(dataParams.codeId);
        utils.messageBox('success', this.$t('MSG_ALT_DSCD_DATA'));
      }).catch(error => {
        console.log(error);
      });
    },
    selectDetailGrid(target, event) {
      const index = target.__idx;
      if (index === -1) {
        return false;
      }

      if (this.dsDetail.getSelected().length === 0) {
        this.dsDetail.setSelect(target, false);
      }

      const selectedRowData = this.dsDetail.data[index];
      if (selectedRowData.deleteYn === 'Yes') {
        this.isDetailDeleted = true;
      } else {
        this.isDetailDeleted = false;
      }
      return true;
    },

    loaded(v) {
      let mdOptionsTemp = [];
      console.log(v);
      //mdOptionsTemp

      for (let i=0; i<this.$refs.moduleSubmoduleSelect.mdOptions.length; i++) {

        if (this.$refs.moduleSubmoduleSelect.mdOptions[i].codeId == 'AM') {
          mdOptionsTemp.push(this.$refs.moduleSubmoduleSelect.mdOptions[i]);
        }
        /*

        if (this.$refs.moduleSubmoduleSelect.mdOptions[i].codeId == 'AA') {
          mdOptionsTemp.push(this.$refs.moduleSubmoduleSelect.mdOptions[i]);
        }
        */
      }

      this.$refs.moduleSubmoduleSelect.mdOptions = mdOptionsTemp;
      this.searchBox.moduleCode.key = 'AM';
    },
  },
};

</script>

<style scoped>
</style>
