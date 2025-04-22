<template>
  <sui-page>
    <sui-page-header
      :title="$t('MSG_TIT_DTM_COMP_STT')"
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
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup.enter="searchTableList()"
              @keyup="onKeyUpInput($event,'termName')"
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
            @click="searchTableList()"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :enabletooltips="true"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
        :data-source="dataset0"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <div class="btn_wrapR">
            <ur-button
              v-permission:download="'PGE_DST_00012'"
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
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
        <h4>{{ $t('MSG_TXT_CDVAL_NCOMP_DTL') }}</h4>
      </div>
      <sui-s-grid
        ref="grid1"
        :headers="gridColumns1"
        :enabletooltips="true"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="5"
        :data-source="dataset1"
      />
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';

export default {
  name: 'PGE_DST_00012', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // eslint-disable-next-line new-cap
      dataset0: new urDataSet(),
      // eslint-disable-next-line new-cap
      dataset1: new urDataSet(),
      tableName: '',
      // @Description: Search Box
      selectData: {
        // 선택된 select box 값
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
        COD_NCOMP_DIV_CD: { key: '', label: '' },
      },
      localdata0: [],
      localdata1: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'module',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModule',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_TAB_NM'),
        value: 'tableName',
      }, {
        text: this.$t('MSG_TXT_COMP_FLAG'),
        value: 'standardDateTimeObeyYn',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_NCOMP_CNT'),
        value: 'standardDateTimeNoncomplianceCount',
        width: 100,
        cellsalign: 'right',
      }],
      gridColumns1: [{
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
        text: this.$t('MSG_TXT_DOM_DSCR'),
        value: 'nonComplianceDescription',
      }, {
        text: this.$t('MSG_TXT_NON_COMP_VAL'),
        value: 'nonComplianceValue',
        width: 200,
      }],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    resetSearch() {
      this.selectData.moduleCode.key = 'ALL';
      this.selectData.subModuleCode.key = 'ALL';
      this.$refs.nCompOptions.reset();
      this.tableName = '';
    },
    /* @Description: Search Table Function */
    searchTableList() {
      const queryParams = {};
      const fieldArray = {
        subModuleCode: this.selectData.subModuleCode.key,
        moduleCode: this.selectData.moduleCode.key,
        standardDateTimeObeyYn: this.selectData.COD_NCOMP_DIV_CD.key,
        tableName: this.tableName,
      };
      // eslint-disable-next-line no-restricted-syntax
      for (const key in fieldArray) {
        // eslint-disable-next-line eqeqeq
        if (fieldArray[key] && fieldArray[key] != 'ALL') {
          queryParams[key] = fieldArray[key];
        }
      }
      http.request('PGE_DST_00012', 'DTS_DST_00069', {
        query: queryParams,
      }).then(res => {

        this.dataset0.setData(res.data);
      });
    },
    /* @Description: Row selection function */
    onSelectRow(target = {}) {
      const queryParams = {
        stdObyInspDt: target.stdObyInspDt,
      };

      if (target.tableName) {
        http.request('PGE_DST_00012', 'DTS_DST_00071', {
          path: {
            'table-name': target.tableName,
          },
          query: queryParams,
        }).then(res => {
          this.dataset1.setData(res.data);
        }).catch(error => {
          this.console(error);
        });
      }
    },
    /* @Description: Excel download function */
    excelDownload() {
      const metaObj = {
        headerFontSize: 16,
        headerFontColor: 1,
        headerForegroundColor: 22,
      };

      const sPageId = this.$options.name;
      const objGridColumns = this.gridColumns0;
      const objGridDataset = this.dataset0;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `valid_date_compliance_table_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, metaObj);
    },
    /* @Description: special Charcter function */
    onKeyUpInput(event, name) {
      const searchFieldNewText = this.tableName;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.tableName = this[name];
        });
      } else {
        this[name] = searchFieldNewText;
      }
    },
  },
};
</script>
<style scoped>
</style>
