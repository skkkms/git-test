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
              ref="modules"
              :page-id="this.$options.name"
              :selected-md="searchBox.moduleCode"
              :selected-smd="searchBox.subModuleCode"
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
              @keyup.enter="searchComplianceList"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_NCOMP_DIV')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="nCompOptions"
              :selected="searchBox.COD_NCOMP_DIV_CD"
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
            class="comm_btn_Reset "
            @click="resetSearch"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_Scr"
            @click="searchComplianceList"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        width="100%"
        :headers="gridInspectionStatus"
        :data-source="datasetCompliance"
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <div class="btn_wrapR">
            <ur-button
              v-permission:download="'PGE_DST_00010'"
              type="button"
              class="comm_btn_gridTop  comm_ico_excel"
              small
              @click="excelDownload()"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </ur-button>
          </div>
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TIT_TRM_NCOMP_STT') }}</h4>
      </div>
      <div class="mrB10" />
      <sui-s-grid
        ref="grid1"
        width="100%"
        :headers="gridMismatchStatus"
        :initialRowsPerPage="5"
        :showRowsPerPageControl="false"
        :data-source="datasetMismatch"
      />
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line no-unused-vars
import { log } from 'util';

export default {
  name: 'PGE_DST_00010', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // eslint-disable-next-line new-cap
      datasetCompliance: new urDataSet(),
      // eslint-disable-next-line new-cap
      datasetMismatch: new urDataSet(),
      tableName: '',
      // Search Box
      searchBox: {
        // 선택된 select box 값
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
        codeStructureTypeCode: { key: '', label: '' },
        COD_NCOMP_DIV_CD: { key: '', label: '' },
      },
      // compliance table binding start
      localdata0: [],
      gridInspectionStatus: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleCode',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleCode',
        width: 120,
      }, {
        text: this.$t('MSG_TXT_TAB_NM'),
        value: 'tableName',
      }, {
        text: this.$t('MSG_TXT_TRM_COMP_DIV'),
        value: 'standardTermObeyYn',
        width: 120,
      }, {
        text: this.$t('MSG_TXT_TRM_CNT'),
        value: 'standardTermColumnNumber',
        width: 100,
        cellsalign: 'right',
      }, {
        text: this.$t('MSG_TXT_NCOMP_TRM_CNT'),
        value: 'standardTermNoncomplianceCount',
        width: 150,
        cellsalign: 'right',
      }],

      // mismtach table binding start
      localdata1: [],
      gridMismatchStatus: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleCode',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleCode',
        width: 120,
      }, {
        text: this.$t('MSG_TXT_TAB_NM'),
        value: 'tableName',
      }, {
        text: this.$t('MSG_TXT_COL_NM'),
        value: 'columnName',
      }, {
        text: this.$t('MSG_TXT_DOMAIN_NAME'),
        value: 'domainName',
        width: 200,
      }, {
        text: this.$t('MSG_TXT_DT_TYP'),
        value: 'domainDataTypeCode',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_LEN'),
        value: 'domainDataTypeLength',
        width: 100,
        cellsalign: 'right',
      }, {
        text: this.$t('MSG_TXT_RSN'),
        value: 'nonComplianceContent',
      }],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    resetSearch() {
      this.searchBox.moduleCode.key = 'ALL';
      this.searchBox.subModuleCode.key = 'ALL';
      this.$refs.nCompOptions.reset();
      this.tableName = '';
    },
    // search Table
    searchComplianceList() {
      const queryParams = {
        subModuleCode: this.searchBox.subModuleCode.key,
        moduleCode: this.searchBox.moduleCode.key,
        standardTermObeyYn: this.searchBox.COD_NCOMP_DIV_CD.key,
        tableName: this.tableName,
      };
      http.request('PGE_DST_00010', 'DTS_DST_00062', {
        query: queryParams,
      }).then(res => {
        this.datasetCompliance.setData(res.data);
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
      const objGridColumns = this.gridInspectionStatus;
      const objGridDataset = this.datasetCompliance;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `term_inspection_table_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, metaObj);
    },
    // on row select
    onSelectRow(target = {}) {
      const tableNameTmp = target.tableName;
      const queryParams = {
        stdObyInspDt: target.stdObyInspDt,
      };
      http.request('PGE_DST_00010', 'DTS_DST_00064', {
        path: {
          'table-physical-name': tableNameTmp,
        },
        query: queryParams,
      }).then(res => {
        this.datasetMismatch.setData(res.data);
      }).catch(error => {
        this.console(error);
      });
    },
    specialChar(value) {
      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.tableName = '';
        });
      }
    },
  },
};
</script>
<style scoped>
</style>
