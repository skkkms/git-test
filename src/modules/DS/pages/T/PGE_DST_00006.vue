<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name"></sui-page-header>
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MDLE')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select ref="modules"
              :page-id="this.$options.name"
              :selected-md="searchBox.moduleCode"
              :selected-smd="searchBox.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TAB_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              v-model="searchBox.tablePhysicalName"
              @keyup="onSpecialcharCheck"
              @keyup.enter="onSearchTableData"
            ></sui-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TAB_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              v-model="searchBox.tableName"
              @keyup="onSpecialcharCheck"
              @keyup.enter="onSearchTableData"
            ></sui-text-field>
          </div>
        </div>
        <div class="btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_Reset"
              @click="resetSearch()"
            >{{ $t('MSG_BTN_RESET')}}</sui-button>
            <sui-button
              type="button"
              class="comm_btn_Scr"
              @click="onSearchTableData"
              v-permission:read="'PGE_DST_00006'" 
            >{{ $t('MSG_BTN_SEARCH')}}</sui-button>
          </div>
      </div>
      <div class="mrB30"></div>
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <div class="btn_wrapR">
            <ur-button
              v-permission:download="'PGE_DST_00006'" 
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
              small
              @click="onExcelDownload"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </ur-button>
          </div>
        </template>
      </sui-s-grid>
      <div class="mrB30"></div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select
            ref="modulesInput"
            :page-id="this.$options.name"
            :selectedMd="inputBox.moduleCd"
            :selectedSmd="inputBox.subModuleCd"
            :disabled="modSelDisabled"
            :defaultMdOption="'all'"
            :defaultSmdOption="'all'"
            @md-list-clicked="onMdListClick"
            @smd-list-clicked="onSmdListClick"
          />
        </div>
        <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TAB_PHSC_NM')" :vertical="false" :required="true" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              :disabled="modSelDisabled"
              v-model="inputBox.tablePhsyName"
              @keyup="resetDuplicatCheck"
            ></sui-text-field>
            <div class="comp_spacing"/>
            <sui-button
              v-if="!modSelDisabled"
              type="button"
              class="comm_btn_duplicate"
              @click="onDuplicateCheck"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TAB_NM')" :vertical="false" :required="true" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              v-model="inputBox.tablePlainName"
              @keyup="onSpecialcharCheck"
            ></sui-text-field>
          </div>        
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MGT_PRD')" :vertical="false" :required="true" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              v-model="inputBox.mgtPeriodMonth"
              @keyup="onInputVliadtion($event)"
              :disabled="false"
              :readonly="false"
              maxlength="3"
            ></sui-text-field>
          </div>
        </div>
        <div class="row">
           <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MGT_HIS_YN')" :vertical="false" :required="true" />
          </div>
          <div class="col-xs-5">
            <sui-radio value="Y" v-model="inputBox.historyTable" @input="onRadioChange">Yes</sui-radio>
            <sui-radio value="N" v-model="inputBox.historyTable" @input="onRadioChange">No</sui-radio>
          </div>
          <div class="col-xs-1">
            <sui-input-label 
            v-show="showColumnNameLabel"            
            :label="$t('MSG_TXT_COL_NM')" :vertical="false" :required="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-show="showColumnNameLabel"
              placeholder=""
              maxlength="100"
              v-model="inputBox.columnName"
              @keyup="onSpecialcharCheck"
              :disabled="false"
              :readonly="false"
            ></sui-text-field>
          </div>
          </div>
        <div class="row">
         <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TAB_EN_NM')" :vertical="false" :required="true" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              v-model="inputBox.tableEngName"
              @keyup="onSpecialcharCheck"
              :disabled="false"
              :readonly="false"
            ></sui-text-field>
          </div>
          <div class="col-xs-1"/>
          <div class="col-xs-5"/>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_DESC')" :vertical="false" />
        </div>
        <div class="col-xs-11">
          <textarea v-model="inputBox.tableDescription"></textarea>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button type="button" class="comm_btn_border" @click="onNewClick">{{ $t('MSG_BTN_NEW')}}</sui-button>
        <sui-button
          type="button"
          class="comm_btn_border"
          :disabled="delBtnDisabled"
          @click="onDeleteData"
          v-permission:delete="'PGE_DST_00006'" 
        >{{ $t('MSG_BTN_DEL')}}</sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSaveConfirm"
          v-permission:create="'PGE_DST_00006'" 
        >{{ $t('MSG_BTN_SAVE')}}</sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import { isNullOrUndefined } from "util";

export default {
  name: "PGE_DST_00006",
  data() {
    return {
      editFlag: true,
      showColumnNameLabel: false,
      modSelDisabled : false ,
      delBtnDisabled:true,
      duplicateCheck: false,
      inputBox: {
        tablePhsyName: "",
        tablePlainName: "",
        tableEngName: "",

        mgtPeriodMonth: "",
        //historyTable: "",
        historyTable: "",

        columnName: "",

        tableDescription: "",

        moduleCd: { key: "", label: "" },
        subModuleCd: { key: "", label: "" },
      },
      // Search Box
      searchBox: {
        moduleCode: { key: "", label: "" },
        subModuleCode: { key: "", label: "" },
        codeStructureTypeCode: { key: "", label: "" },
        codeUseYn: { key: "", label: "" },
        searchCondition: { key: "", label: "" },
        searchWord: { key: "", label: "" },
        langId: { key: "", label: "" }
      },

      localdata0: [],
      gridColumns0: [
        { text: this.$t('MSG_TXT_MDLE'), value: 'moduleNm', width: 100 },
        { text: this.$t('MSG_TXT_SMDLE'), value: 'subModuleNm' , width: 120 },
        { text: this.$t('MSG_TXT_TAB_PHSC_NM'), value: 'tablePhysicalName' },
        { text: this.$t('MSG_TXT_TAB_NM'), value: 'tableName' },
        {
          text: this.$t('MSG_TXT_MGT_PRD'),
          value: 'managementPeriodNumber',
          width: 100,
          align: 'right',
        },
        { text: this.$t('MSG_TXT_MGT_HIS_YN'), value: 'tableHistory', width: 100 },
        { text: this.$t('MSG_TXT_DESC'), value: 'tableContent' },
      ],
      dataset0: new urDataSet(),
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
      /**download excel file */
      onExcelDownload() {
      /*const queryParams = {};
      const fieldArray = {
        subModule: this.searchBox.subModuleCode.key,
        module:this.searchBox.moduleCode.key,
        tableName: this.searchBox.tableName,
        tablePhysicalName: this.searchBox.tablePhysicalName
      };
      for (let key in fieldArray) {
        if (fieldArray[key] && fieldArray[key] != "ALL") {
          queryParams[key] = fieldArray[key];
        }
      }
      http
        .request("PGE_DST_00006", "DTS_DST_00040", {
          path: {
            "page-id": "PGE_DST_00006"
          },
          query: queryParams,
          responseType: "arraybuffer"
        })
        .then(res => {
          let fileName = "table_data_mgt.xlsx";
          utils.downloadBlob(res, fileName);
        });*/
        utils.downloadGridToExcel(this.$options.name, this.gridColumns0, this.dataset0, "excel-export.xlsx");
    },
    /**Reset search results and input fields */
    resetSearch() {

      //this.$refs.modules.;

     this.searchBox.moduleCode.key='ALL';
     this.searchBox.subModuleCode.key='ALL';
      //this.$refs.modules.selectedSmd = "";
     // this.searchBox.moduleCode.label="";

      this.searchBox.tableName = "";
      this.searchBox.tablePhysicalName="";
      //this.dataset0.setRawData(null);
    },
    /**Reset duplicate flag on value change */
    resetDuplicatCheck() {
      if (utils.isExistSpecialChar(this.inputBox.tablePhsyName)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.inputBox.tablePhsyName = '';
      }
    },
     onKeyUpInput(event, name , value) {
      //const searchFieldNewText = this.frame0[name];
      
      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          if(name === 'applicantName')
      {
        this.applicantNameField=''
      }
      else this.standardLogicNameField='';
          //this.$refs[name].setFocus();
        });
      } 
    
      },
    /**Data search on based on input  */
    onSearchTableData() {
      const queryParams = {};
      const fieldArray = {
        subModule: this.searchBox.subModuleCode.key,
        module:this.searchBox.moduleCode.key,
        tableName: this.searchBox.tableName,
        tablePhysicalName: this.searchBox.tablePhysicalName
      };
      for (let key in fieldArray) {
        if (fieldArray[key] && fieldArray[key] != "ALL") {
          queryParams[key] = fieldArray[key];
        }
      }
      /*****************************************************/

      /*****************************************************/
      http
        .request(this.$options.name, "DTS_DST_00039", {
          query: queryParams
        })
        .then(res => {
          this.dataset0.setData(res.data);
        });
    },
    /**On row click get selected row data */
    onSelectRow(selectedRow) {
      this.duplicateCheck = true;
      this.modSelDisabled = true;
      this.delBtnDisabled = false;
      this.inputBox.tablePlainName = selectedRow.tableName;
      this.inputBox.tablePhsyName = selectedRow.tablePhysicalName;
      this.inputBox.tableEngName = selectedRow.tableEnglishName;
      this.inputBox.historyTable = selectedRow.tableHistory;
      this.inputBox.mgtPeriodMonth = selectedRow.managementPeriodNumber;
      this.inputBox.tableDescription = selectedRow.tableContent;
      this.onRadioChange();

      this.inputBox.columnName = selectedRow.columnName;
      this.$refs.modulesInput.selectMdSmd(selectedRow.moduleCd, selectedRow.subModuleCd);
    },
    /**Data deletion pop up confirmation  */
    onDeleteData() {
       utils.messageBox('confirm', this.$t('MSG_ALT_DEL'), null, this.onDeletion);
      
    },
    onMdListClick(value) {
      // this.frame0.data.moduleCode = value.key || '';
      //this.inputBox.tablePhsyName = `T_${value.key}_`;
      let modulekey = '';
      if (!utils.isEmpty(value)) {
        modulekey = value.key;
      } else {
        const [firstMd] = this.$refs.modulesInput.mdOptions;
        if (!utils.isEmpty(firstMd)) {
          modulekey = firstMd.key;
        } else {
          modulekey = 'CM';
        }
        this.$refs.modulesInput.selectMd(modulekey);
      }
      this.inputBox.tablePhsyName =  `T_${modulekey}_`;


    },
    onSmdListClick(value) {
      let subModulekey = '';
      if (!utils.isEmpty(value)) {
        subModulekey = value.key;
      } else {
        const mdkey = this.$refs.modulesInput.selectedMd.key;
        const smdList = this.$refs.modulesInput.smdOptions[''];
        if (!utils.isEmpty(smdList)) {
          const index = utils.findIndex(smdList, data => utils.startsWith(data.key, mdkey));
          subModulekey = smdList[index].key;
        } else {
          subModulekey = 'CMA';
        }
        this.$refs.modulesInput.selectSmd(subModulekey);
      }
      this.inputBox.tablePhsyName =  `T_${subModulekey}_`;
    },
    /**selected row data delete */
    onDeletion() {
      let queryParams = { "table-id": this.inputBox.tablePhsyName };
      http
        .request(this.$options.name, "DTS_DST_00045", {
          path: queryParams
        })
        .then(res => {

          utils.messageBox(
            "information",
            this.$t("MSG_TXT_REG_OK"),
            null,
            null
          );
          this.resetInputs();
          this.onSearchTableData();
        });
    },

    /** Perform Duplicate check  ***/
    onDuplicateCheck() {
      /********Module and submodule***********/

      /**************************************/
      let physicalName = /^T_[a-zA-Z]{3,}_[a-zA-Z]{3,}/gm;
      //let whiteSpace = /^\S+$/g;
      let matchValue = this.inputBox.tablePhsyName;
      //!whiteSpace.test(matchValue.toUpperCase()
      if (
        !physicalName.test(matchValue.toUpperCase())
        
      ) {
        utils.messageBox(
          "information",
          this.$t("MSG_ALT_TAB_NM_INVALID"),
          null,
          null
        );
        this.inputBox.tablePhsyName = "";
        return;
      } else {
        let regModule = this.inputBox.tablePhsyName.split("_")[1].split("");
        let modulename = regModule[0] + regModule[1];
        let subModuleName = regModule[0] + regModule[1] + regModule[2];
        let moduleExist = false;
        let submoduleFlag = false;
        this.duplicateCheck = true;
        /********************************************************/
        /*$.each(this.$refs.moduleTypeOptions.optionList, function(key, val) {
          if (modulename.toUpperCase() == val.key.toUpperCase()) {
            moduleExist = true;
          }
        });
        $.each(this.$refs.submoduleTypeOptions.optionList, function(key, val) {
          if (subModuleName.toUpperCase() == val.key.toUpperCase()) {
            submoduleFlag = true;
          }
        });*/
        /*if (!moduleExist) {
          utils.messageBox("information", "Invalid Module", null, null);
          this.tablePhsyName = "";
          return;
        }
        if (!submoduleFlag) {
          utils.messageBox("information", "Invalid SubModule", null, null);
          this.tablePhsyName = "";
          return;
        }*/
        /************************************************/
        let queryParams = { "table-id": this.inputBox.tablePhsyName.trim() };
        http
          .request(this.$options.name, "DTS_DST_00042", {
            query: queryParams
          })
          .then(res => {
            if (res.data.resultCode == 0) {
              const msg = utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_TAB_PHSC_NM'));
              utils.messageBox(

                "information",
                msg,
                null,
                null
              );

            } else if (res.data.resultCode == 1) {
              this.duplicateCheck = false;
              utils.messageBox(
                "information",
                this.$t("MSG_ALT_IMG_RGST_ID"),
                null,
                null
              );
            }
          });
      }
    },
    /***New Click initialized input fields  */

    onNewClick() {

      this.resetInputs();
      this.modSelDisabled = false ;
      this.duplicateCheck = false;
      this.$refs.grid.resetSelect();
    },
    resetInputs() {
      utils.forEach(this.inputBox, (value, key) => {
        if (utils.isEqual(key, 'historyTable')) {
          this.inputBox[key] = 'N';
        }
        else if(utils.isEqual(key, 'moduleCd') || utils.isEqual(key, 'subModuleCd'))
        {
          this.inputBox.moduleCd.key='ALL';
          this.inputBox.subModuleCd.key='ALL';
        }
        else
        {
          this.inputBox[key] = '';
        }
      });


    },
    /**save confirmation pop up*/

    onSaveConfirm() {
      let whiteSpace = /^\S+$/g;
      if (utils.isEmpty(this.inputBox.tablePhsyName.trim())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_TAB_PHSC_NM'));
        utils.messageBox( "warning", msg );

        return ;
      }

      if (utils.isEmpty(this.inputBox.tablePlainName.trim())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_TAB_NM'));
        utils.messageBox( "warning", msg );
        return ;
      }
      if (this.inputBox.moduleCd.key ==='ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT') , this.$t('MSG_TXT_MDLE'));
        utils.messageBox( "warning", msg );
        return ;
      }
      if (this.inputBox.subModuleCd.key ==='ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT') , this.$t('MSG_TXT_SMDLE'));
        utils.messageBox( "warning", msg );
        return ;
      }
      
      if (utils.isEmpty(this.inputBox.tableEngName.trim())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_TAB_EN_NM'));
        utils.messageBox( "warning", msg );

        return ;
      }

      if (utils.isEmpty(this.inputBox.mgtPeriodMonth)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_MGT_PRD'));
        utils.messageBox( "warning", msg );

        return ;
      }
      /*console.log (this.inputBox.mgtPeriodMonth);
      if (this.inputBox.mgtPeriodMonth <= 0) {
        const msg = (this.$t('MSG_ALT_PRD_MN_OVER_ZERO'));
        utils.messageBox( "warning", msg );

        return ;
      }
      */
      
      if (utils.isEmpty(this.inputBox.historyTable)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_MGT_HIS_YN'));
        utils.messageBox( "warning", msg );

        return ;
      }

      
      if (utils.isEqual(this.inputBox.historyTable,'Y') && !whiteSpace.test(this.inputBox.columnName.trim())) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPCE_CHK"));
        return;
      }

      if (utils.isEqual(this.inputBox.historyTable,'Y') && utils.isEmpty(this.inputBox.columnName.trim())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_COL_NM'));
        utils.messageBox("warning", msg);
        return;
      }
      if (this.duplicateCheck) {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, this.onSave);
      } else {
        utils.messageBox('information', this.$t('MSG_ALT_SELT_DPCT_CHK'), null, null);
      }

    },
    //********Input validation for Mgt period only number allowed */
    onInputVliadtion(evt) {
      let alpharegex=/[^0-9.]/g;
      if (utils.isExistSpecialChar(this.mgtPeriodMonth)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.mgtPeriodMonth = "";
        return;
      }
      if (alpharegex.test(this.inputBox.mgtPeriodMonth) ) {
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_NUMBER'), null);
        this.inputBox.mgtPeriodMonth = "";
        return;
      }

      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        this.mgtPeriodMonth = "";
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isNumber(){
      this.duplicateCheck = false;
      let alpharegex=/[^0-9.]/g;
        if (alpharegex.test(this.domainClassId) ) {
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_NUMBER'), null);}
        this.domainClassId = this.domainClassId.replace(/[^0-9.]/g,'');
    },
    /**Update/ modify table data**/
    onUpdate() {
      let queryParams = {

        module: this.$refs.modulesInput.selected.md.codeId || "",
        submodule: this.$refs.modulesInput.selected.smd.codeId || "",
        tableName: this.inputBox.tablePlainName.trim(),
        tablePhysicalName: this.inputBox.tablePhsyName.trim(),
        tableEnglishName: this.inputBox.tableEngName.trim(),
        managementPeriodNumber: this.inputBox.mgtPeriodMonth.trim(),
        tableContent: this.inputBox.tableDescription,
        tableHistory: this.inputBox.historyTable.trim(),
        columnName: this.inputBox.columnName.trim()
      };
      http.request(this.$options.name, "DTS_DST_00044", {
          query: queryParams
        })
        .then(res => {
          if (res.data.resultCode == 0) {
            utils.messageBox(
              "information",
              this.$t("MSG_ALT_USE_PSBL_ID"),
              null,
              null
            );
          } else if (res.data.resultCode == 1) {
            utils.messageBox(
              "information",
              this.$t("MSG_TXT_REG_OK"),
              null,
              null
            );
            this.onSearchTableData();
            this.resetInputs();
          }
        });
    },
    /**Special char validation on all input fields */
    onSpecialcharCheck() {
      if (utils.isExistSpecialChar(this.inputBox.tablePlainName)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.inputBox.tablePlainName = "";
        
      }
      if (utils.isExistSpecialChar(this.inputBox.mgtPeriodMonth)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.inputBox.mgtPeriodMonth = "";
      }
      if (utils.isExistSpecialChar(this.inputBox.tablePhsyName)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.inputBox.tablePhsyName = "";
      }
      if (utils.isExistSpecialChar(this.inputBox.tableEngName)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.inputBox.tableEngName = "";
      }
      if (utils.isExistSpecialChar(this.searchBox.tablePhysicalName)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.searchBox.tablePhysicalName = "";
      }

      if (utils.isExistSpecialChar(this.searchBox.tableName)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NO_SPECL_CHAR"), null);
        this.searchBox.tableName = "";
      }

    },
    /**save or register new data  */
    onSave() {
      let regModule = this.inputBox.tablePhsyName.split("_")[1].split("");
      let modulename = regModule[0] + regModule[1];
      let subModuleName = regModule[0] + regModule[1] + regModule[2];

      /******************/
      let queryParams = {

        moduleCd: modulename,
        subModuleCd: subModuleName,
        tableName: this.inputBox.tablePlainName.trim(),
        tablePhysicalName: this.inputBox.tablePhsyName.trim(),
        tableEnglishName: this.inputBox.tableEngName.trim(),
        managementPeriodNumber: this.inputBox.mgtPeriodMonth.trim(),
        tableContent: this.inputBox.tableDescription,
        tableHistory: this.inputBox.historyTable.trim(),
        columnName: this.inputBox.columnName.trim()
      };

      let query = { "table-id": this.inputBox.tablePhsyName };
      http.request(this.$options.name, "DTS_DST_00043", {
        query: queryParams
      })
      .then(res => {
        utils.messageBox(
          "information",
          this.$t("MSG_TXT_REG_OK"),
          null,
          null
        );
        this.onSearchTableData();
      });
    },
    onRadioChange(){
      this.showColumnNameLabel = this.inputBox.historyTable =='Y' ? true : false;
    }
  }
};
</script>
<style scoped>
</style>
