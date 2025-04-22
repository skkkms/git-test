<template>
  <sui-page>
    <sui-page-header
      :title="$t('MSG_TIT_TBCD_INSP_MAIN')"
      :pageId="this.$options.name"
    />
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
              ref="modules"
              :page-id="this.$options.name"
              :selected-md="selectData.moduleCode"
              :selected-smd="selectData.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TAB_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="tableName"
              placeholder=""
              maxlength="100"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @input="specialChar(tableName)"
              @keyup.enter="searchCodeList"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_NCOMP_DIV')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="nCompOptions"
              :selected="selectData.COD_NCOMP_DIV_CD"
              :pageId="this.$options.name"
              codeId="COD_NCOMP_DIV_CD"
              :disabled="false"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="resetSearch()"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="searchCodeList()"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <!-- <div>Code Validity Compliance Status</div> -->
      <sui-s-grid
        ref="gridCodeList"
        :headers="gridColumnsCode"
        :data-source="datasetCode"
        :showRowsPerPageControl="false"
        :options="options"
        @grid:selected="onSelectRow()"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="excelDownload"
          >
            {{ $t("MSG_BTN_EXCEL_DOWN") }}
          </sui-button>
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_CDVAL_NCOMP_DTL') }}</h4>
          </div>
          <sui-s-grid
            ref="gridUncomplaint"
            :headers="gridColUncomplaint"
            :data-source="datasetUncomplaint"
            :showRowsPerPageControl="false"
            :options="options"
            @grid:selected="onSelectCodeId()"
          />
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_CD_DTL_INFO') }}</h4>
          </div>
          <sui-s-grid
            ref="gridCodeValidate"
            :headers="gridColCodeValidate"
            :data-source="datasetCodeValidate"
            :showRowsPerPageControl="false"
            :options="options"
          />
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import {urDataSet} from 'uidev-component/index';
export default {
  name: 'PGE_DST_00013', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      tableName: '',
      // common select code
      selectData: {
        T_CMZ_CD_M: { label: '', key: '' },
        COD_NCOMP_DIV_CD: { label: '', key: '' },
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
      },
      defaultTabIndex: 0,
      currentTabComponent: null,
      datasetCode: new urDataSet(),
      datasetUncomplaint: new urDataSet(),
      datasetCodeValidate: new urDataSet(),
      options: {
        infinityScroll: true,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    // code table binding start
      this.gridColumnsCode = [
        {
          text: this.$t('MSG_TXT_MDLE'),
          value: 'moduleCode',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_SMDLE'),
          value: 'submoduelCode',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_TAB_NM'),
          value: 'tableName',
        },
        {
          text: this.$t('MSG_TXT_COMP_FLAG'),
          value: 'codeValidValueObeyYn',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_NCOMP_CNT'),
          value: 'discrepancy',
          width: 150,
          cellsalign: 'right',
        },
      ];

      this.gridColUncomplaint = [
        {
          text: this.$t('MSG_TXT_TAB_NM'),
          value: 'tableName',
        },
        {
          text: this.$t('MSG_TXT_COL_NM'),
          value: 'columnName',
        },
        {
          text: this.$t('MSG_TXT_CODE_ID'),
          value: 'codeId',
        },
        {
          text: this.$t('MSG_TXT_NON_COMP_VAL'),
          value: 'unCompileTvalue',
          width: 100,
        },
      ];
      
      this.gridColCodeValidate = [
        {
          text: this.$t('MSG_TXT_CODE_ID'),
          value: 'codeId',
        },
        {
          text: this.$t('MSG_TXT_CODE_NAME'),
          value: 'codeName',
        },
        {
          text: this.$t('MSG_TXT_CD_DTL_NM'),
          value: 'codeDetail',
        },
        {
          text: this.$t('MSG_TXT_VAL'),
          value: 'value',
          width: 100,
        },
      ];
      // code table code validation end
  },
  mounted() {},
  methods: {
    resetSearch() {
      // this.$refs.modules.reset();
      this.selectData.moduleCode.key = 'ALL';
      this.selectData.subModuleCode.key = 'ALL';
      this.$refs.nCompOptions.reset();
      this.tableName = '';
    },
    // search Table
    searchCodeList() {
      this.datasetUncomplaint.data = [];
      this.datasetCodeValidate.data = [];
      const queryParams = {};
      const fieldArray = {
        subModuleCode: this.selectData.subModuleCode.key,
        moduleCode: this.selectData.moduleCode.key,
        codeValidValueObeyYn: this.selectData.COD_NCOMP_DIV_CD.key,
        tableName: this.tableName,
      };
      for (let key in fieldArray) {
        if (fieldArray[key] && fieldArray[key] != 'ALL') {
          queryParams[key] = fieldArray[key];
        }
      }
      http
        .request('PGE_DST_00013', 'DTS_DST_00072', {
          query: queryParams,
        })
        .then(res => {
          this.datasetCode.setData(res.data);
        });
    },
    // Excel download
    excelDownload() {
      const metaObj = {
        headerFontSize: 16,
        headerFontColor: 1,
        headerForegroundColor: 22,
      };

      const sPageId = this.$options.name;
      const objGridColumns = this.gridColumnsCode;
      const objGridDataset = this.datasetCode;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `valid_code_compliance_table_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, metaObj);
    },
    // on row select
    onSelectRow() {
      // eslint-disable-next-line prefer-destructuring
      const row = this.datasetCode.getSelected();
      const tableName = row[0].tableName;
      console.log(tableName);
      const queryParams = { stdObyInspDt: row[0].stdObyInspDt };
      http
        .request('PGE_DST_00013', 'DTS_DST_00074', {
          path: {
            'table-name': tableName,
          },
          query: queryParams,
        })
        .then(res => {
          this.datasetUncomplaint.setData(res.data);
        })
        .catch(error => {
          this.console(error);
        });
      this.datasetCodeValidate.setData(null);
    },
    onSelectCodeId() {
      const row = this.datasetUncomplaint.getSelected();
      const queryParams = { codeId: row[0].codeId };
      http
        .request('PGE_DST_00013', 'DTS_DST_00075', {
          path: {
            'table-name': row[0].tableName,
          },
          query: queryParams,
        })
        .then(res => {
          this.datasetCodeValidate.setData(res.data);
        })
        .catch(error => {
          this.console(error);
        });
    },
    specialChar(value) {
      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        this.tableName = '';
      }
    },
  },
};
</script>
<style scoped>
</style>
