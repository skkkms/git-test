<template>
  <sui-page>
    <sui-page-header
      :title="$t('MSG_TIT_TRM_MAIN')"
      :pageId="this.$options.name"
    />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="termName"
              v-model="frame0.termName"
              placeholder=""
              maxlength="100"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="onKeyUpInput($event,'termName')"
              @keyup.enter="searchTermsList"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_PHSC_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="termPhyName"
              v-model="frame0.termPhyName"
              placeholder=""
              maxlength="100"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="onKeyUpInput($event,'termPhyName')"
              @keyup.enter="searchTermsList"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_DSCR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="termDesc"
              v-model="frame0.termDesc"
              placeholder=""
              maxlength="100"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="onKeyUpInput($event,'termDesc')"
              @keyup.enter="searchTermsList"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="moduleTypeOptions"
              :page-id="this.$options.name"
              :selected-md="selectData.moduleCode"
              :selected-smd="selectData.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DOMAIN_NAME')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="domainName"
              v-model="frame0.domainName"
              placeholder=""
              maxlength="100"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="onKeyUpInput($event,'domainName')"
              @keyup.enter="searchTermsList"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_REV_DT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-range-date-picker
              ref="dp"
              v-model="selectedRangeDate"
              @confirm="onConfirm"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_REF_TRM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="sourceTermName"
              v-model="frame0.sourceTermName"
              placeholder=""
              maxlength="100"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="onKeyUpInput($event,'sourceTermName')"
              @keyup.enter="searchTermsList"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="resetFields"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="searchTermsList"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdList"
        :headers="gridColumns0"
        :data-source="dataset0"
        :initialRowsPerPage="5"
        :showRowsPerPageControl="false"
        @grid:selected="onSelectRow"
      >
        <template
          #right-info
          class="btn_wrapR"
        >
          <sui-button
            type="button"
            class="comm_btn_gridTop comm_ico_excel"
            @click="downloadExcel"
          >
            {{ $t('MSG_BTN_EXCEL_DOWN') }}
          </sui-button>
        </template>
      </sui-s-grid>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:update="this.$options.name"
          type="button"
          class="comm_btn_border"
          :disabled="selectedTermRow"
          @click="modifyTerm"
        >
          {{ $t('MSG_BTN_MDFC') }}
        </sui-button>
        <sui-button
          v-permission:delete="this.$options.name"
          type="button"
          class="comm_btn_border"
          :disabled="selectedTermRow"
          @click="deleteTerm"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:create="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="registerTerm"
        >
          {{ $t('MSG_BTN_RGST') }}
        </sui-button>
      </div>
      <sui-popup
        v-model="showRegPopup"
        :title="$t('MSG_TIT_NEW_TRM')"
      >
        <p01
          :parentPageId="this.$options.name"
          @exit="onPopupCancelClicked('new')"
        />
      </sui-popup>
      <sui-popup
        v-model="showRetrievePopup"
        :title="$t('MSG_TIT_DTL_TRM')"
      >
        <p02
          :parentPageId="this.$options.name"
          :biddingInformationParam="biddingInformationParam"
          @exit="onPopupCancelClicked('retrieve')"
        />
      </sui-popup>
      <sui-popup
        v-model="showModifyPopup"
        :title="$t('MSG_TIT_MDFC_TRM')"
      >
        <p03
          :biddingInformationParam="biddingInformationParam"
          :parentPageId="this.$options.name"
          @exit="onPopupCancelClicked('modify')"
        />
      </sui-popup>
      <sui-popup
        v-model="showDeletePopup"
        :title="$t('MSG_TIT_DEL_TRM')"
      >
        <p04
          :biddingInformationParam="biddingInformationParam"
          :parentPageId="this.$options.name"
          @exit="onPopupCancelClicked('delete')"
        />
      </sui-popup>
      <sui-popup v-model="pop05">
        <p05 />
      </sui-popup>
      <sui-page-tab-box-type
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          ref="tabPage"
          :pageId="this.$options.name"
          :selectedPageId="selectedPageID"
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
          @onSearchClick="onSearchClick"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import p01 from './components/PGE_DST_00004_P01';
import p02 from './components/PGE_DST_00004_P02';
import p03 from './components/PGE_DST_00004_P03';
import p04 from './components/PGE_DST_00004_P04';
import p05 from './components/PGE_DST_00004_P05';

import tab01 from './components/PGE_DST_00004_T01';
import tab02 from './components/PGE_DST_00004_T02';

const dateTypeFields = ['finalModificationDTM'];
export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_DST_00004',
  components: {
    p01,
    p02,
    p03,
    p04,
    p05,
    tab01,
    tab02,
  },
  data() {
    return {
      selectedTermId: '',
      selectedPageID: '',
      tabItems: [
        {
          tabTitle: this.$t('MSG_TIT_TAB_REL_TRM'),
          tabComponent: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_REQ_HIST'),
          tabComponent: tab02,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      showRegPopup: false,
      selectedRangeDate: {},
      startDateField: '',
      endDateField: '',
      showRetrievePopup: false,
      showModifyPopup: false,
      showDeletePopup: false,
      pop05: false,
      selectedTermRow: true,
      selectData: {
        T_CMZ_CD_M: { key: '', label: '' },
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
      },
      frame0: {
        selectData: {
          T_CMZ_CD_M: { key: '', label: '' },
        },
        termName: '',
        termPhyName: '',
        termDesc: '',
        domainName: '',
        rangeDate: { start: '', end: '' },
        sourceTermName: '',
      },
      biddingInformationParam: {},
      localdata0: [],
      localdata1: [],
      dataset0: new urDataSet(),
      termID: '',
    };
  },
  computed: {},
  watch: {},
  created() {
    const that = this;
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_TRM_NM'),
      value: 'termsName',
      width: 250,
    }, {
      text: this.$t('MSG_TXT_TRM_PHSC_NM'),
      value: 'termsId',
      component: {
        props: ['row', 'value'],
        template: `
          <ur-button
            type="button"
            class="link"
            shape="hyperlink"
            prim
            @click="onButtonClick">
            {{value}}
          </ur-button>`,
        methods: {
          onButtonClick() {
            that.onClickGrid(null, this.row);
          },
        },
      },
      width: 250,
    }, {
      text: this.$t('MSG_TXT_TRM_DSCR'),
      value: 'termsContent',
    }, {
      text: this.$t('MSG_TXT_DOMAIN_NAME'),
      value: 'domainName',
      width: 180,
    }, {
      text: this.$t('MSG_TXT_DT_TYP'),
      value: 'domainDataTypeName',
      width: 100,
    }, {
      text: this.$t('MSG_TXT_LEN'),
      value: 'domainLength',
      width: 70,
      align: 'right',
    }, {
      text: this.$t('MSG_TXT_DECM_LGHT'),
      value: 'domainDataDecimalLength',
      width: 100,
      align: 'right',
    }, {
      text: this.$t('MSG_TXT_REF_TRM'),
      value: 'sourceTerm',
      width: 100,
    }, {
      text: this.$t('MSG_TXT_MDLE'),
      value: 'moduleName',
      width: 100,
    },
    {
      text: this.$t('MSG_TXT_SMDLE'),
      value: 'subModuleName',
      width: 100,
    }, {
      text: this.$t('MSG_TXT_MDFC_DTM'),
      value: 'finalModificationDTM',
      width: 150,
    }];
    this.gridColumns1 = [{
      text: this.$t('MSG_TXT_MDLE'),
      value: 'modelName',
      width: 100,
    }, {
      text: this.$t('MSG_TXT_TRM_PHSC_NM'),
      value: 'entityName',
      width: 300,
    }, {
      text: this.$t('MSG_TXT_ENTY_NM'),
      value: 'tableId',
      width: 300,
    }, {
      text: this.$t('MSG_TXT_ATRB_NM'),
      value: 'attributeName',
    }, {
      text: this.$t('MSG_TXT_COL'),
      value: 'columnId',
      width: 300,
    }];
  },
  mounted() {},

  methods: {
    onSearchClick() {},
    onClearSelectionMainGrid() {
      this.selectedPageID = '';
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
      setTimeout(() => {
        this.$refs.tabPage.getData(this.termID);
      }, 500);
    },
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    resetFields() {
      this.selectedRangeDate = {};
      this.startDateField = '';
      this.endDateField = '';
      const emptyArray = [];
      this.dataset0.setData(emptyArray);
      utils.forEach(this.frame0, (value, key) => {
        switch (key) {
          case 'selectData':
            this.selectData.moduleCode.key = 'ALL';
            this.selectData.subModuleCode.key = 'ALL';
            break;
          default:
            this.frame0[key] = '';
            break;
        }
      });
      this.selectedTermRow = true;
    },
    onConfirm() {
      this.startDateField = utils.toStringByFormat(this.selectedRangeDate.from, 'YYYYMMDD') + '000000';
      this.endDateField = utils.toStringByFormat(this.selectedRangeDate.to, 'YYYYMMDD') + '235959';
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // if(this.onClickValidate()) return false;
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
    searchTermsList() {
      if (this.onClickValidate()) return false;
      const queryParams = {
        termsName: this.frame0.termName || '',
        termsId: this.frame0.termPhyName || '',
        termsContent: this.frame0.termDesc || '',
        moduleCode: this.$refs.moduleTypeOptions.selected.md.codeId || '',
        subModuleCode: this.$refs.moduleTypeOptions.selected.smd.codeId || '',
        domainName: this.frame0.domainName || '',
        sourceTerm: this.frame0.sourceTermName || '',
        finalModificationDTM: '',
        startDate: this.startDateField || '',
        endDate: this.endDateField || '',
      };
      http.request('PGE_DST_00004', 'DTS_DST_00017', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, dateTypeFields);
        this.dataset0.setData(res.data);
        this.selectedTermId = null;
        this.$refs.tabPage.getData(null);
      });
    },
    downloadExcel() {
      utils.downloadGridToExcel(this.$options.name, this.gridColumns0, this.dataset0, 'excel-export.xlsx');
    },
    registerTerm() {
      this.showRegPopup = true;
    },
    modifyTerm() {
      const { termID } = this;
      const pathParam = {
        'term-id': termID,
      };
      http.request('PGE_DST_00004', 'DTS_DST_00019', {
        path: pathParam,
      }).then(res => {
        const response = res.data;
        this.biddingInformationParam = response;
        this.showModifyPopup = true;
      });
    },
    deleteTerm() {
      const { termID } = this;
      const pathParam = {
        'term-id': termID,
      };
      http.request('PGE_DST_00004', 'DTS_DST_00019', {
        path: pathParam,
      }).then(res => {
        const response = res.data;
        this.biddingInformationParam = response;
        this.showDeletePopup = true;
      });
    },
    onKeyUpInput(event, name) {
      const searchFieldNewText = this.frame0[name];
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0[name] = this[name];
          this.$refs[name].setFocus();
        });
      } else {
        this[name] = searchFieldNewText;
      }
    },
    onPopupCancelClicked(option) {
      switch (option) {
        case 'retrieve':
          this.showRetrievePopup = false;
          break;
        case 'new':
          this.showRegPopup = false;
          break;
        case 'modify':
          this.showModifyPopup = false;
          break;
        case 'delete':
          this.showDeletePopup = false;
          break;
        default:
          break;
      }
    },
    onClickGrid(btn, dataRow) {
      const termID = dataRow.termsId;
      const pathParam = {
        'term-id': termID,
      };
      http.request('PGE_DST_00004', 'DTS_DST_00019', {
        path: pathParam,
      }).then(res => {
        const response = res.data;
        this.biddingInformationParam = response;
        this.showRetrievePopup = true;
      });
    },
    onSelectRow(target) {
      this.termID = target.termsId;
      this.selectedTermRow = false;
      this.$refs.tabPage.getData(this.termID);
    },
  },
};
</script>
