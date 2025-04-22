<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="customCodeSelectPortal"
              :selected="fromPsYn?psInitPortal:selectedPortal"
              :option-list="portalList"
              :defaultOption="'all'"
              :disabled="fromPsYn"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR_GRP_CATG')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="userGroupCategory"
              :selected="selectedValues.COD_USR_GRP_CATG"
              codeId="COD_USR_GRP_CATG"
              :defaultOption="'all'"
              @loaded="onUserGroupCategoryLoaded"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_BASIC_AUTH')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="basicAuthYn"
              :selected="selectedValues.COD_BSIC_AUTH_YN"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
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
              ref="condType"
              :selected="selectedValues.COD_USER_GRP_SRCH_COND"
              codeId="COD_USER_GRP_SRCH_COND"
              :initialSelectedIndex="0"
              :defaultOption="'all'"
              @loaded="onCondTypeLoaded"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="condContent"
              default
              value
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="'PGE_CMA_00003'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <div class="mrB10" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <sui-s-grid
            ref="grdList"
            :headers="gridColumns"
            :data-source="dsData"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            @grid:selected="onSelectGrid"
          />
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="mrB45" />
          <sui-page-tab-box-type
            :tabItems="tabItems"
            :defaultTabIndex="defaultTabIndex"
            :setCurrentTabComponent="onSetCurrentTabComponent"
            @change-tab-idx="onChangeTabIdx"
          >
            <container
              :is="currentTabComponent"
              ref="tabPage"
              :pageId="this.$options.name"
              :selectedGridRowData="selectedGridRowData"
              :selectedPageId="selectedPageId"
              :isDataNull="isNullData"
              :psInitPortal="psInitPortal"
              :fromPsYn="fromPsYn"                    
              @onClearSelectionMainGrid="onClearSelectionMainGrid"
              @onSearchClick="onSearch"
              @onPopupCall="onPopupCall"
              @page-deactivate="handleChildDeactivated" 
              @page-activate="handleChildActivated"
            />
          </sui-page-tab-box-type>
        </div>
      </div>

      <sui-popup
        v-model="isShownPopupRole"
        :title="$t('MSG_TIT_ROLE_USER_GROUP_REG')"
      >
        <p01
          :pageId="$options.name"
          :userGroupId="userGroupId"
          @onClickCancel="onClickCancel"
          @onRowReSelect="onRowReSelect"
        />
      </sui-popup>

      <sui-popup
        v-model="isShownPopupUser"
        :title="$t('MSG_TIT_USR_USR_GROUP_REG')"
      >
        <p02
          :pageId="$options.name"
          :userGroupId="userGroupId"
          @onClickCancel="onClickCancel"
          @onRowReSelect="onRowReSelect"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMA_00003_T01';
import tab02 from './components/PGE_CMA_00003_T02';
import tab03 from './components/PGE_CMA_00003_T03';
import p01 from './components/PGE_CMA_00003_P01';
import p02 from './components/PGE_CMA_00003_P02';
import {urDataSet} from 'uidev-component/index.js';

// import - libraries (node modules)
// import - local files (js, vue, ...)
export default {
  name: 'PGE_CMA_00003', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    tab03,
    p01,
    p02,
  },
  props: {
    psInitData: {
      type: Object,
      default() {
        return {};
      }
    },
  },    
  extends: BasePage,
  data() {
    return {
      defaultTabIndex: 0,
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_USER_GROUP'),
          component: 'tab01', // pageID
        },
        {
          tabTitle: this.$t('MSG_TXT_USR'),
          component: 'tab02',
        },
        {
          tabTitle: this.$t('MSG_TXT_ROLE'),
          component: 'tab03',
        },
      ],
      isNullData: false,
      oldRowIndex: -1,
      searchFieldOldText: '',
      condTypeKey: '',
      currentTabComponent: null,
      tabIndex: 0,
      pageTitle: this.$t('MSG_TIT_USER_GRP_MGT'), // eslint-disable-line vue/name-property-casing,
      pageLocations: ['Common', 'CMA', this.$t('MSG_TIT_USER_GRP_MGT')],
      isPageHeaderShow: true,
      isMyFavorites: false,
      showCheckIdModal: false,
      selectedPageId: '',
      condContent: '',
      userGroupId: '',
      selectedGridRowData: {},
      isShownPopupRole: false,
      isShownPopupUser: false,
      selected3rdBizCode: '',
      selectedBizCode: [],
      selectedValues: {
        COD_USER_GRP_SRCH_COND: { key: '', label: '' },
        COD_BSIC_AUTH_YN: { key: '', label: '' },
        COD_USR_GRP_CATG: { key: '', label: '' },
      },
      selectedPortal: {},
      localdata: [],
      dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },      
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},   
      userGroupCategoryKey: '',   
    };
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.portalList = [];
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_USER_GRP_ID'),
        value: 'userGroupId',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_USER_GRP_NAME'),
        value: 'userGroupName',
      },
      {
        text: this.$t('MSG_TXT_USR_GRP_CATG'),
        value: 'userGroupCategoryName',
        width: 300,
      },
    ];
  },
  mounted() {
    this.loadPortalList().then(() => {
      this.onSearch();
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
          //this.selectedPortalId = '';
          resolve();
          }
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onClose() {
      console.log('onConfirm');
    },
    onClearSelectionMainGrid() {
      this.$refs.grdList.resetSelect();
      this.selectedGridRowData = {};
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMA_00003';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    changeTabIndex() {
      const idx = this.tabIndex + 1;
      this.$refs.tab.changeIdx(idx % 3);
    },
    onCondTypeLoaded(optionsList) {
      this.condTypeKey = optionsList[0].key;
    },
    onReset() {
      this.$refs.condType.reset();
      this.$refs.userGroupCategory.reset();
      this.$refs.basicAuthYn.reset();

      if(!this.fromPsYn){
        this.$refs.customCodeSelectPortal.reset();
      }      
      // this.selectedValues.COD_USER_GRP_SRCH_COND.key = this.condTypeKey;
      this.condContent = '';
    },
    onSearch() {
      const userGroupCategoryCode = utils.trim(this.selectedValues.COD_USR_GRP_CATG.key);
      const condTypeCode = this.selectedValues.COD_USER_GRP_SRCH_COND.key;
      const basicAuthYn = this.selectedValues.COD_BSIC_AUTH_YN.key === 'ALL' ? '' : this.selectedValues.COD_BSIC_AUTH_YN.key;
      if(this.fromPsYn){
        this.selectedPortal = this.psInitPortal;
      }
      const portalId = this.selectedPortal.key === 'ALL' ? '' : this.selectedPortal.key;
      const queryParams = {
        userGroupCategoryCode: userGroupCategoryCode || '',
        portalId: portalId,
        basicAuthYn: basicAuthYn,
        searchCond: condTypeCode || '',
        searchWord: utils.trim(this.condContent) || '',
      };

      http.request(this.$options.name, 'DTS_CMA_00008', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          if (res.data.length > 0) {
            this.$refs.grdList.resetSelect();
            this.dsData.setData(res.data);
            this.oldRowIndex = 0;
            this.isNullData = false;
          } else {
            this.$refs.grdList.resetSelect();
            this.dsData.setData([]);
            this.selectedGridRowData = {};
            this.selectedPageId = '';
            this.userGroupId = '';
            this.isNullData = true;
            this.$refs.tabPage.initData();
            this.oldRowIndex = -1;
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onKeyUpInput() {
      const searchFieldNewText = this.condContent;
      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.condContent = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    onSelectGrid(row) {
      if (row) {
        this.selectedGridRowData = row;
        this.selectedPageId = this.selectedGridRowData.pageId;
        this.userGroupId = this.selectedGridRowData.userGroupId;
      } else {
        this.selectedGridRowData = {};
        this.selectedPageId = '';
        this.userGroupId = '';
      }
    },
    onClickCancel(event) {
      this[event] = false;
    },
    onPopupCall(event) {
      this[event] = true;
    },
    onChangeBizCodes(optList) {
      this.selectedBizCode = optList;
    },
    onUserGroupCategoryLoaded(optionsList) {
      this.userGroupCategoryKey = optionsList[0].key;
      this.selectedValues.COD_USR_GRP_CATG.key = optionsList[0].key;
    }, 
    onRowReSelect() {
      this.selectedGridRowData = this.dsData.getSelected()[0];
      this.selectedPageId = this.selectedGridRowData ? this.selectedGridRowData.pageId : '';
      this.userGroupId = this.selectedGridRowData ? this.selectedGridRowData.userGroupId : '';
    },
  },
};
</script>
<style scoped>
</style>
