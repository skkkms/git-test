<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USE_YN')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select 
              ref="comboUseYn"
              :selected="queryData.useYnValue"
              :defaultOption="'all'"
              :initialSelectedIndex="0" 
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="comboSearchCond"
              :selected="queryData.COD_PORTL_SEARCH_COND"
              :pagedId="this.$options.name"
              codeId="COD_PORTL_SEARCH_COND"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
              style="width:58%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="queryData.portalSearchText"
              maxlength="50"
              @keyup.enter="onClickSearch"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DEL_YN')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="deleteYn"
              :selected="queryData.deleteYnValue"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>

          <div
            v-if="deviceApplyYn"
            class="col-xs-1"
          >
            <sui-input-label
              :label="$t('MSG_TXT_DVC_TYPE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div
            v-if="deviceApplyYn"
            class="col-xs-5"
          >
            <sui-multi-select
              ref="deviceMultiDropdown"
              v-model="deviceSelectValue"
              :placeholder="placeholder"
              :options="deviceTypeList"
              :multiple="true"
              :closeOnSelect="false"
              :useAllOption="true"
            />
          </div>
        </div>
        <div
          v-if="superTenantYn"
          class="row"
        >
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TENANT_ID')" />
          </div>
          <div 
            v-if="superTenantYn"
            class="col-xs-5"
          >
            <sui-custom-select
              ref="comboTenants"
              :selected="queryData.tenantId"
              :option-list="selectTenantList"
              @list-clicked="onSelectionChangedTenant"
              @selection-changed="onSelectionChangedTenant"
            />
          </div>
          <div
            v-if="!deviceApplyYn || !superTenantYn"
            class="col-xs-1 nodata"
          />
          <div
            v-if="!deviceApplyYn || !superTenantYn"
            class="col-xs-5 nodata"
          />
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SRCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="gridPortal"
        :headers="columnPortal"
        :showCountControl="true"
        :showRowsPerPageControl="false"
        :showDisplayCountControl="false"
        :data-source="dsPortal"
        @grid:selected="onSelectGrid"
      >
        <template #right-info>
            <sui-button
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
              @click="onClickExcelDownload"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </sui-button>
          
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <sui-page-tab-box-type
        ref="tab"
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="onSetCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          :selectedGridRowData="selectedGridRowData"
          :deviceApplyYn="deviceApplyYn"
          @onClickSearch="onClickSearch"
          @onGridClear="onGridClear"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMP_00025_T01.vue';

const dateTypeFields = ['firstRegistrationDTM', 'finalModificationDTM'];

export default {
  name: 'PGE_CMP_00025', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  },
  extends: BasePage,
  data() {
    return {
      superTenantYn: this.$store.getters.userInfo.tenantId == utils.getConfigurationValue('YML_TENANT_ID_SUPER'),
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_PORTL'),
          component: tab01,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        deleteYnValue: {},
        tenantId: {
          label: '',
          key: null,
        },
        portalSearchText: '',
        COD_PORTL_SEARCH_COND: {
          label: this.$t('MSG_TXT_ALL'),
          key: 'ALL',
        },
        deviceTypeValue: 0,
        useYnValue:{
          label: this.$t('MSG_TXT_ALL'),
          key: 'ALL',
        },
      },
      selectTenantList: [{ key: utils.getConfigurationValue('YML_TENANT_ID_SUPER'), label: 'Super Tenant' }],
      deviceApplyYn: utils.getConfigurationValue('CFG_CMZ_DVC_TYPE_APPY_YN') === 'Y',
      deviceSelectValue: [],
      placeholder: this.$t('MSG_TXT_ALL'),
      searchFieldOldText: '',
      columnPortal: [],
      dsPortal: new urDataSet(),
    };
  },
  computed: {},
  watch: {},
  created() {
    this.columnPortal = [
      {
        text: this.$t('MSG_TXT_PORTL_ID'),
        value: 'portalId',
      },
      {
        text: this.$t('MSG_TXT_PORTL_NM'),
        value: 'portalName',
      },
      {
        text: this.$t('MSG_TXT_DVC_TYPE'),
        value: 'deviceTypeCodeName',
        width: '200px',
        hide: !this.deviceApplyYn,
      },
      {
        text: this.$t('MSG_TXT_USE_YN'),
        value: 'useYn',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_DEL_YN'),
        value: 'deleteYn',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'finalModificationUserName',
        component: {
          props: ['row'],

          template: `
            <cmp-user-name-link
              :displayType="'1'"
              :displayLanguageId="row.finalModificationDisplayLanguageId"
              :userId="row.finalModificationUserId"
              :loginId="row.finalModificationLoginId"
              :knoxId="row.finalModificationKnoxId"
              :userName="row.finalModificationUserName"
              :userGlobalName="row.finalModificationUserGlobalName"
              :departmentName="row.finalModificationDepartmentName"
              :departmentEnglishName="row.finalModificationDepartmentEnglishName"
              :type="'link'"
            />`,
        },
        width: '200px',
      },
      {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        width: '170px',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
      },
    ];
    this.deviceTypeList = [];
  },
  mounted() {
    // Tenant list
    http.request(this.$options.name, 'DTS_CMZ_00163')
      .then(res => {
        utils.forEach(res.data, obj => {
          this.selectTenantList.push({
            key: obj.tenantId,
            label: obj.tenantName,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.loadDeviceCode();
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    onLoad(oPageId) {
      const paramDataCmp00025 = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramDataCmp00025)) {
        this.queryData = paramDataCmp00025;
        this.onClickSearch();
      }
    },
    loadDeviceCode() {
      http.getCodeList(this.pageId, ['COD_DVC_TYPE'], '').then(res => {
        utils.forEach(res['COD_DVC_TYPE'], (value, key) => {
          this.deviceTypeList.push(
            { key: value.key, label: value.codeName },
          );
          this.deviceSelectValue.push(
            { key: value.key, label: value.codeName },
          );
        });
      }).catch(err => {
        console.log(err);
      });
    },
    onClickSearch() {
      if (this.deviceApplyYn) {
        this.queryData.deviceTypeValue = this.calculateDeviceTypeValue();
      }
      const dataParams = {
        tenantId: utils.isEmpty(this.queryData.tenantId.key) ? this.$store.getters.userInfo.tenantId : this.queryData.tenantId.key,
        deviceTypeValue: this.queryData.deviceTypeValue ? this.queryData.deviceTypeValue : 0,
        useYn: this.queryData.useYnValue.key,
        delelteYn: utils.trim(this.queryData.deleteYnValue.key) || '',
        portalSearchText: this.queryData.portalSearchText,
        portalSearchCond: this.queryData.COD_PORTL_SEARCH_COND.key,
      };
      http.request(this.contextPageId, 'DTS_CMP_00108', {
        query: dataParams,
      }).then(res => {
        this.dsPortal.setData(res.data);
      });
    },
    onClickReset() {
      this.queryData.portalSearchText = '';
      if (this.deviceApplyYn) {
        this.deviceSelectValue = [];
      }
      this.queryData.deviceTypeValue = 0;
      this.$refs.comboUseYn.reset();
      this.$refs.deleteYn.reset();
      this.$refs.comboSearchCond.reset();
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMP_00025';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnPortal;
      const objGridDataset = this.dsPortal;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `portal_management_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectGrid(row) {
      if (!utils.isEmpty(row)) {
        this.selectedGridRowData = row;
      } else {
        this.selectedGridRowData = {};
      }
    },
    onRowClick(event) {
      if (utils.isEmpty(this.selectedGridRowData)) {
        this.selectedGridRowData = event.args.row.bounddata;
      } else if (event.args.row.bounddata.uniqueid !== this.selectedGridRowData.uniqueid) {
        this.selectedGridRowData = event.args.row.bounddata;
      } else {
        this.selectedGridRowData = {};
        setTimeout(() => {
          this.$refs.gridPortal.$refs.grid.unselectrow(event.args.row.boundindex);
        }, 1);
      }
    },
    onSelectionChangedTenant() {
      this.onClickSearch();
    },
    onGridClear() 
    {
      this.$refs.gridPortal.resetSelect();
    },
    calculateDeviceTypeValue() {
      let ret = 0;
      utils.forEach(this.deviceSelectValue, (item, key) => {
        ret += Number(item.key);
      });
      return ret;
    },
    onKeyUpInput() {
      const searchFieldNewText = this.queryData.portalSearchText;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.queryData.portalSearchText = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
  },
};
</script>

<style scoped>
</style>
