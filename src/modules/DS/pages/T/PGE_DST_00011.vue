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
              :selected-md="selectData.moduleCode"
              :selected-smd="selectData.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="typeOptions"
              :selected="selectData.T_CMZ_CD_M"
              :pageId="this.$options.name"
              codeId="COD_CDST_TYPE"
              :disabled="false"
              :defaultOption="'all'"
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
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="searchCondOptions"
              codeId="COD_CD_MGT_SEARCH"
              :page-id="this.$options.name"
              :defaultOption="'all'"
              :selected="selectData.T_CMZ_CD_M"
              style="width:58%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="searchCondText"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
              maxlength="100"
              @keyup.enter="searchCompStatus"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="reset()"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="searchCompStatus()"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :initialRowsPerPage="10"
        width="100%"
        :showRowsPerPageControl="false"
        :options="gridOptions"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <div class="btn_wrapR">
            <ur-button
              v-permission:download="'PGE_DST_00011'"
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
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_CDVAL_NCOMP_DTL') }}</h4>
          </div>
          <sui-s-grid
            ref="grid1"
            :headers="gridColumns1"
            :data-source="dataset1"
            width="100%"
            :showRowsPerPageControl="false"
            :options="gridOptions"
            @grid:selected="onSelectUncompliant"
          />
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_CDVAL_DTL') }}</h4>
          </div>
          <sui-s-grid
            ref="grid2"
            :headers="gridColumns2"
            :data-source="dataset2"
            :showRowsPerPageControl="false"
            :options="gridOptions"
            width="100%"
          />
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_DST_00011',
  data() {
    return {
      // eslint-disable-next-line new-cap
      dataset0: new urDataSet(),
      // eslint-disable-next-line new-cap
      dataset1: new urDataSet(),
      // eslint-disable-next-line new-cap
      dataset2: new urDataSet(),
      gridOptions: {
        infinityScroll: true,
      },
      selectData: {
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
        T_CMZ_CD_M: { label: '', key: '' },
        COD_NCOMP_DIV_CD: { label: '', key: '' },
      },
      searchCondText: '',
      codeId: '',
      localdata0: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_CODE_ID'),
        value: 'codeId',
      }, {
        text: this.$t('MSG_TXT_CODE_NAME'),
        value: 'codeName',
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'codeStructureTypeCode',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_VALID_COMP'),
        value: 'noncomplianceYn',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_NCOMP_CNT'),
        value: 'codeValidValue',
        width: 150,
      }],
      localdata1: [],
      gridColumns1: [{
        text: this.$t('MSG_TXT_TAB_NM'),
        value: 'tableName',
      }, {
        text: this.$t('MSG_TXT_COL_NM'),
        value: 'columnPhysicalName',
      }, {
        text: this.$t('MSG_TXT_NON_COMP_VAL'),
        value: 'dataStandardNcompValue',
        width: 150,
      }],
      localdata2: [],
      gridColumns2: [{
        text: this.$t('MSG_TXT_CODE_ID'),
        value: 'codeId',
      }, {
        text: this.$t('MSG_TXT_CODE_NAME'),
        value: 'codeName',
      }, {
        text: this.$t('MSG_TXT_CD_DTL_NM'),
        value: 'codeDetailContent',
      }, {
        text: this.$t('MSG_TXT_VALID_VALUE'),
        value: 'codeValue',
      }],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    reset() {
      this.selectData.moduleCode.key = 'ALL';
      this.selectData.moduleCode.key = 'ALL';
      this.$refs.typeOptions.reset();
      this.$refs.searchCondOptions.reset();
      this.$refs.nCompOptions.reset();
      this.searchCondText = '';
    },
    searchCompStatus() {
      if (utils.isExistSpecialChar(this.searchCondText) === true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        return;
      }
      const queryParams = {
        subModuleCode: this.selectData.subModuleCode.key,
        moduleCode: this.selectData.moduleCode.key,
        codeStructureTypeCode: this.$refs.typeOptions.currentSelected.codeId || '',
        codeManagementCondition: this.$refs.searchCondOptions.currentSelected.codeId || '',
        codeManagementConditionText: this.searchCondText,
        noncomplianceYn: this.$refs.nCompOptions.currentSelected.codeId || '',
      };
      http.request('PGE_DST_00011', 'DTS_DST_00065', {
        query: queryParams,
      }).then(res => {
        this.dataset0.setData(res.data);
      });
    },
    excelDownload() {

      utils.downloadGridToExcel(this.$options.name, this.gridColumns0, this.dataset0, 'valid_code_compliance_table.xlsx');
    },
    onSelectRow(target) {
      // eslint-disable-next-line eqeqeq
      if (target == undefined) return;
      const stdObyInspDtTmp = target.stdObyInspDt;
      const queryParams = {
        stdObyInspDt: stdObyInspDtTmp,
      };
      const codeID = target.codeId;

      this.codeId = target.codeId;
      this.dataset2.setData();

      http.request('PGE_DST_00011', 'DTS_DST_00067', {
        path: {
          'code-id': codeID,
        },
        query: queryParams,
      }).then(res => {
        this.dataset1.setData(res.data);
      }).catch(error => {
        this.confirm(1, error);
      });
    },

    // eslint-disable-next-line no-unused-vars
    onSelectUncompliant(target) {
      http.request('PGE_DST_00011', 'DTS_DST_00068', {
        path: {
          'code-id': this.codeId,
        },
      }).then(res => {
        this.dataset2.setData(res.data);
      }).catch(error => {
        this.confirm(1, error);
      });
    },
  },
};
</script>
<style scoped>
</style>
