<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_PORTL')" />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="portalSelect"
              v-model="queryData.portalId"
              :selected="fromPsYn?psInitPortal:{key:queryData.portalId}"
              :defaultOption="'all'"
              :option-list="portalList"
              :disabled="fromPsYn"
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
              ref="homeCardSelect"
              v-model="queryData.homeCardTypeCode"
              :pagedId="this.$options.name"
              codeId="COD_HCARD_TYPE"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              class="dp_flex"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
              :pageId="contextPageId"
              :selectedMd="queryData.moduleCode"
              :selectedSmd="queryData.subModuleCode"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="comboSearchCond"
              v-model="queryData.searchCond"
              :pagedId="contextPageId"
              codeId="COD_HCARD_SEARCH_COND"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="queryData.searchText"
              placeholder=""
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearchClick"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdList"
        :headers="gridColumns0"
        :dataSource="dsHomeCardList"
        :options="options"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="5"
        @grid:selected="onSelectGrid"
      />
      <div class="mrB30" />
      <sui-page-tab-box-type
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          ref="tabPage"
          :pageId="contextPageId"
          :selectedGridRowData="selectedGridRowData"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"          
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
          @onSearchClick="onSearchClick"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMP_00008_T01';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMP_00008', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
  },
  extends: BasePage,
  props: {
    psInitData: {
      type: Object,
      default() {
        return {};
      }
    },
  },  
  data() {
    return {
      codes: CommonConstants.selectOptions(),
      selectedGridRowData: {},
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_HCARD_DTL_INFO'),
          tabComponent: tab01,
        },
      ],
      queryData: {
        portalId: 'ALL',
        homeCardTypeCode: '',
        moduleCode: {
          label: '',
          key: '',
        },
        subModuleCode: {
          label: '',
          key: '',
        },
        searchCond: '',
        searchText: '',
      },
      localdata0: [],
      dsHomeCardList: new urDataSet(),
      options: {
        InfinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.localdata0 = [];
    this.gridColumns0 = [
      {
        value: 'portalName',
        text: this.$t('MSG_TXT_PORTL'),
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'homeCardTypeName',
      },
      {
        text: this.$t('MSG_TXT_HCARD_ID'),
        value: 'homeCardId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_HCARD_NM'),
        value: 'homeCardName',
      },
      {
        text: this.$t('MSG_TXT_PAGE_ID'),
        value: 'pageId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_TTL_USE_YN'),
        value: 'homeCardTitleUseYn',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_USE_YN'),
        value: 'homeCardUseYn',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        width: 170,
      },
    ];
  },
  mounted() {
    this.loadPortalList().then(() => {
      this.onSearchClick();
    });
  },

  methods: {
    loadPortalList() {
      return new Promise((resolve, reject) => {
        http.request(this.contextPageId, 'DTS_CMP_00004', {
        }).then(res => {
          this.portalList = [];
          if (res.data.length > 0) {
            utils.forEach(res.data, obj => {
              const portalInfo = {
                key: obj.portalId,
                label: obj.portalName,
              };
              this.portalList.push(portalInfo);
            });
            console.log(this.queryData.portalId);
            this.queryData.portalId = '';
            resolve();
          }
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onSearchClick(homeCardId) {
      if(this.fromPsYn){
        this.queryData.portalId = this.psInitPortal.key;
      }
      const queryParams = {
        portalId: this.queryData.portalId,
        homeCardTypeCode: this.queryData.homeCardTypeCode || '',
        moduleCode: this.queryData.moduleCode.key || '',
        subModuleCode: this.queryData.subModuleCode.key || '',
        searchCond: this.queryData.searchCond || '',
        searchText: utils.trim(this.queryData.searchText),
      };
      http.request(this.contextPageId, 'DTS_CMP_00028', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, 'finalModificationDTM');
        this.localdata0 = res.data;
        this.dsHomeCardList.setData(this.localdata0);
        this.onSelectGrid();
        if (typeof homeCardId === 'string') {
          this.$refs.grdList.setSelect({homeCardId: homeCardId});
        }        
      }).catch(error => {
        console.log(error);
      });
    },
    onClickReset() {
      if(!this.fromPsYn){
        this.$refs.portalSelect.reset();
      }
      this.$refs.homeCardSelect.reset();
      this.$refs.smComboFrame0.selectMd('ALL');
      this.$refs.comboSearchCond.reset();
      this.queryData.searchText = '';
    },
    onClearSelectionMainGrid() {
     // this.dsHomeCardList.clearSelection();
     this.$refs.grdList.resetSelect();
    },
    onSelectGrid(row) {
      if (row) {
        this.selectedGridRowData = row;
      } else {
        this.selectedGridRowData = {};
      }
    },

  },
};
</script>
<style scoped>
</style>
