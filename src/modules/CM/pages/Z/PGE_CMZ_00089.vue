<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_ATHN_SYS')" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="searchText"
              v-model="queryData.searchText"
              maxlength="100"
              :placeholder="$t('MSG_TXT_ENTR_ID_OR_NM')"
              @keyup.enter="onClickSearch"
              @keyup="onKeyUpInput"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_USE_YN')" />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="ynSelectUseYn"
              v-model="queryData.useYn"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="row">
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
        ref="gridApiAuth"
        :headers="columnApiAuth"
        :showCountControl="false"
        :showRowsPerPageControl="false"
        :data-source="dsApiAuth"
        :options="options"
        @grid:selected="onSelectRow"
      >
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
          @onClickSearch="onClickSearch"
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
          @updateApiAuthMgtInfo="handleUpdatedInfo"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';
import tab01 from './components/PGE_CMZ_00089_T01.vue';

export default {
  name: 'PGE_CMZ_00089', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  }, 
  extends: BasePage,
  data() {
    return {
      dsApiAuth: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedGridRowData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_API_ATHN'),
          component: tab01,
        },

      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      queryData: {
        useYn: '',
        delYn: 'N',
        searchText: '',
      },
      searchFieldOldText: '',
      savedAuthSystemUid:'',
    };
  },
  computed: {
  },
  watch: {},
  created() {
    this.columnApiAuth = [
      {
        value: 'authSystemUid',
        text: this.$t('MSG_TXT_ATHN_SYS_UID'),
      },
      {
        value: 'authSystemName',
        text: this.$t('MSG_TXT_ATHN_SYS_NM'),
      },
      {
        value: 'useYn',
        text: this.$t('MSG_TXT_USE_YN'),
        width: 200,
      },
      {
        value: 'm_userName',
        text: this.$t('MSG_TXT_MDFC_USR'),
        width: 200,
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :pageId="'PGE_CMZ_00089'"
              :displayType="'1'"
              :displayLanguageId="row.m_dsplLngId"
              :userId="row.m_userId"
              :knoxId="row.m_knoxId"
              :loginId="row.m_loginId"
              :userName="row.m_userName"
              :userGlobalName="row.m_userGlobalName"
              :departmentName="row.m_departmentName"
              :departmentEnglishName="row.m_departmentEnglishName"
              :type="'link'"
            />`,
        },
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_MDFC_DTM'),
        width: 170,
        customValue(value, row) {
          return utils.dateformatToClient(value);
        },
      },
    ];    
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad('PGE_CMZ_00089');
    });
  },
  /*
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  */
  methods: {
    onLoad(oPageId) {
      const paramData = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramData)) {
        this.queryData = paramData;
        this.onClickSearch();
      }
    },
    onClickSearch() {
      const dataParams = {
        useYn: this.queryData.useYn,
        delYn: this.queryData.delYn,
        searchText: utils.trim(this.queryData.searchText) || '',
      };
      http.request(this.contextPageId, 'DTS_CMZ_00192', {
        query: dataParams,
      }).then(res => {
        this.setUserInfoFormat(res.data);
        this.$refs.gridApiAuth.resetSelect();
        this.dsApiAuth.setData(res.data);
        this.selectedGridRowData = {};

        if(!utils.isEmpty(this.savedAuthSystemUid)){
          this.$refs.gridApiAuth.setSelect({authSystemUid: this.savedAuthSystemUid});
          this.savedAuthSystemUid = '';
        }
      });
    },
    onClickReset() {
      this.queryData.searchText = '';
      this.$refs.ynSelectUseYn.reset();
    },
    onSetCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onClickExcelDownload() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.columnApiAuth;
      const objGridDataset = this.dsApiAuth;
      const sToday = utils.now('YYYYMMDDHHmmss');
      //TODO: Change sExcelName prefix 'excel' to your proper objectName
      const sExcelName = `Api_Auth_Management_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
    },
    onSelectRow(row) {
      if(row) {
        this.selectedGridRowData = row;
      } else {
        this.selectedGridRowData = {};
      }
    },
    onClearSelectionMainGrid() {
      this.$refs.gridApiAuth.resetSelect();
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
    onKeyUpInput() {
      const searchFieldNewText = this.queryData.searchText;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.queryData.searchText = this.searchFieldOldText;
            this.$refs.searchText.setFocus();
          });
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
//    }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    handleUpdatedInfo(updatedAuthSystemUid){
      this.savedAuthSystemUid = updatedAuthSystemUid;
      this.onClickSearch();
    }
  },
};
</script>

<style scoped>
</style>
