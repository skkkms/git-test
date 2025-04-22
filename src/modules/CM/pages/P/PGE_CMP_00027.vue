<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LINK_TYPE')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectLinkTypeCode"
              v-model="queryData.linkTypeCode"
              codeId="COD_LINK_TYPE"
              :defaultOption="'all'"
            />
          </div>
          <!-- <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LINK_STT')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectLinkStateCode"
              v-model="queryData.linkStateCode"
              codeId="COD_LINK_STT"
              :defaultOption="'all'"
            />
          </div>           -->
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_USE_YN')" />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="ynSelectLinkUseYn"
              v-model="queryData.linkUseYn"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LINK_CATG')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectLinkCategoryCode"
              v-model="queryData.linkCategoryCode"
              codeId="COD_LINK_CATG"
              :defaultOption="'all'"
            />
          </div>          
          <!-- <div
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
          </div> -->
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectSearchCondition"
              v-model="queryData.searchCondition"
              codeId="COD_LINK_SEARCH_COND"
              :defaultOption="'all'"
              style="width:58%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchWord"
              v-model="queryData.searchWord"
              maxlength="50"
              @keyup.enter="onClickSearch"
              @keyup="onKeyUpInput"
            />
          </div>
          <div
            v-if="!deviceApplyYn"
            class="col-xs-1 nodata"
          />
          <div
            v-if="!deviceApplyYn"
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
        ref="gridLink"
        :headers="columnLink"
        :showCountControl="true"
        :showRowsPerPageControl="false"
        :data-source="dsLink"
        @grid:selected="onSelectRow"
      >
        <!-- <template #left-info>
          <ur-dropdown
            v-model="rowsPerPage"
            class="ur-data-grid__info__per-page"
            :items="perPageItems"
            @input="onChangePageSize"
          />
        </template> -->
        <template #right-info>
          <sui-button
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
          @onClickNew="onClickNew"
          @updateLinkInfo="handleUpdatedLink"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import {urDataSet} from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMP_00027_T01.vue';
import tab02 from './components/PGE_CMP_00027_T02.vue';
import tab03 from './components/PGE_CMP_00027_T03.vue';

const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ROW_HEIGHT = 48;


export default {
  name: 'PGE_CMP_00027', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    tab03,
  }, 
  extends: BasePage,
  data() {
    return {
      deviceApplyYn: utils.getConfigurationValue('CFG_CMZ_DVC_TYPE_APPY_YN') === 'Y',
      dsLink: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        // height: DEFAULT_ROWS_PER_PAGE * DEFAULT_ROW_HEIGHT+40,
      },
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t("MSG_TXT_LINK"),
          component: tab01,
        },
        {
          tabTitle: this.$t("MSG_TXT_PRMT"),
          component: tab02,
        },
        // {
        //   tabTitle: this.$t("MSG_TXT_ROLE"),
        //   component: tab03,
        // },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        linkName: '',
        linkStateCode: '',
        linkTypeCode: '',
        linkCategoryCode: '',
        linkUseYn: '',
        deviceTypeBit: '',
        searchCondition: '',
        searchWord: '',
      },
      deviceSelectValue: [],
      placeholder: this.$t('MSG_TXT_ALL'),
      savedLinkId:'',
      searchFieldOldText: '',
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.deviceTypeList = [];
    this.perPageItems = [
      { value: 5, text: '5 per page' },
      { value: 10, text: '10 per page' },
      { value: 15, text: '15 per page' },
    ];
    this.columnLink = [
      {
        value: 'linkId',
        text: this.$t('MSG_TXT_LINK_ID'),
        width: 150,
      },
      {
        value: 'linkName',
        text: this.$t('MSG_TXT_LINK_NM'),
        width: 250,
      },
      {
        value: 'linkUrl',
        text: this.$t('MSG_TXT_LINK_URL'),
      },
      {
        value: 'linkTypeName',
        text: this.$t('MSG_TXT_LINK_TYPE'),
        width: 150,
      },
      {
        value: 'linkCategoryName',
        text: this.$t('MSG_TXT_LINK_CATG'),
        width: 150,
      },        
      {
        value: 'linkUseYn',
        text: this.$t('MSG_TXT_USE_YN'),
        width: 80,
      },
      {
        value: 'finalModificationUserId',
        text: this.$t('MSG_TXT_MDFC_USR'),
        width: 200,
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_MDFC_DTM'),
        width: 150,
        customValue(value, row) {
          return utils.dateformatToClient(value);
        },
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad('PGE_CMP_00027');
      this.loadDeviceCode();
    });
  },

  methods: {
    onLoad() {
      const paramData = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramData)) {
        this.queryData = paramData;
        this.onClickSearch();
      }
    },
    loadDeviceCode() {
      http.getCodeList(this.pageId, ['COD_DVC_TYPE'], '').then(res => {
        utils.forEach(res['COD_DVC_TYPE'], (value, key) => {
          this.deviceTypeList.push(
            // { value: value.key, text: value.codeName }
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
        this.queryData.deviceTypeBit = this.calculateDeviceTypeBit();
      }

      const dataParams = {
        linkUseYn: this.queryData.linkUseYn,
        linkTypeCode: this.queryData.linkTypeCode,
        linkCategoryCode: this.queryData.linkCategoryCode,
        searchCondition: this.queryData.searchCondition,
        searchWord: this.queryData.searchWord,
      };
      http.request(this.contextPageId, 'DTS_CMP_00109', {
        query: dataParams,
      }).then(res => {
        this.setUserInfoFormat(res.data);
        this.dsLink.setData(res.data);
        this.selectedGridRowData = {};

        if(!utils.isEmpty(this.savedLinkId)){
          this.$refs.gridLink.setSelect({linkId: this.savedLinkId});
          this.savedLinkId = '';
        }
      });
    },
    onClickReset() {
      this.queryData.searchWord = '';
      this.$refs.codeSelectLinkTypeCode.reset();
      this.$refs.codeSelectLinkCategoryCode.reset();
      this.$refs.ynSelectLinkUseYn.reset();
      this.$refs.codeSelectSearchCondition.reset();
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMP_00027';
      this.currentTabComponent = component;
    },
    onClickNew(row){
      this.$refs.gridLink.resetSelect();
      this.selectedGridRowData = {};
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnLink;
      const objGridDataset = this.dsLink;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `link_management_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(row) {
      if (row) {
        this.selectedGridRowData = row;
      }
    },
    // onChangePageSize(v) {
    //   this.$refs.gridLink.mx_pager.rowsPerPage = v;
    //   this.options.height = v * DEFAULT_ROW_HEIGHT+40;
    //   this.$nextTick(() => {
    //     this.$refs.gridLink.mx_buildViewData();
    //   });
    // },
    calculateDeviceTypeBit() {
      let ret = 0;
      // const deviceSelectedList = this.$refs.deviceMultiDropdown.selected;
      // utils.forEach(deviceSelectedList, (item, key) => {
      // ret += Number(item.value);
      utils.forEach(this.deviceSelectValue, (item, key) => {
        ret += Number(item.key);
      });
      return ret;
    },
    setUserInfoFormat(list) {
      utils.forEach(list, data => {
        utils.forEach(data.firstRegistrationUserInfo, (value, key) => {
          utils.set(data, `r_${key}`, value);
        });
        utils.forEach(data.finalModificationUserInfo, (value, key) => {
          utils.set(data, `m_${key}`, value);
        });
      });
      return list;
    },
    handleUpdatedLink(updatedLinkId){
      this.savedLinkId = updatedLinkId;
      this.onClickSearch();
    },
    onKeyUpInput() {
      const searchFieldNewText = this.queryData.searchWord;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.queryData.searchWord = this.searchFieldOldText;
            this.$refs.searchWord.setFocus();
          });
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
//    }
    },
  },
};
</script>

<style scoped>
</style>
