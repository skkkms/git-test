<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ROLE_CATG')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="roleCategory"
              :selected="selectedValues.COD_ROLE_CATG"
              codeId="COD_ROLE_CATG"
              :defaultOption="'all'"
              @loaded="onRoleCategoryLoaded"
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
              :selected="selectedValues.COD_ROLE_SRCH_COND"
              codeId="COD_ROLE_SRCH_COND"
              :defaultOption="'all'"
              @loaded="onCondTypeLoaded"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="condContent"
              v-model="condContent"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <!-- <sui-button type="button" class="comm_btn_scr" @click="onPopup">ROLE 선택 POPUP TEST</sui-button> -->
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="'PGE_CMA_00001'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <sui-s-grid
            ref="grdList"
            :headers="columnRole"
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
              @onClearSelectionMainGrid="onClearSelectionMainGrid"
              @onSearchClick="onTabSearch"
              @onCallUserPopup="onCallUserPopup"
              @onCallPagePopup="onCallPagePopup"
              @onCallDtsvcPopup="onCallDtsvcPopup"
              @page-deactivate="handleChildDeactivated" 
              @page-activate="handleChildActivated"
              @updateInfo="handleUpdated"
            />
          </sui-page-tab-box-type>
        </div>
      </div>
      <sui-popup
        v-model="showUserPopup"
        :title="$t('MSG_TIT_ROLE_USER_GROUP_REG')"
      >
        <p01
          :parentPageId="this.$options.name"
          :dataList="dataList"
          @save="onUserPopupSaveClicked"
          @cancel="onUserPopupCancelClicked"
        />
      </sui-popup>
      <sui-popup
        v-model="showPagePopup"
        :title="$t('MSG_TIT_ROLE_PAGE_REG')"
      >
        <p02
          :parentPageId="this.$options.name"
          :dataList="dataList"
          @save="onPagePopupSaveClicked"
          @cancel="onPagePopupCancelClicked"
        />
      </sui-popup>
      <sui-popup
        v-model="showDtsvcPopup"
        :title="$t('MSG_TIT_ROLE_DTSVC_REG')"
      >
        <p03
          :parentPageId="this.$options.name"
          :dataList="dataList"
          @save="onDtsvcPopupSaveClicked"
          @cancel="onDtsvcPopupCancelClicked"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import p01 from './components/PGE_CMA_00001_P01';
import p02 from './components/PGE_CMA_00001_P02';
import p03 from './components/PGE_CMA_00001_P03';
import tab01 from './components/PGE_CMA_00001_T01';
import tab02 from './components/PGE_CMA_00001_T02';
import tab03 from './components/PGE_CMA_00001_T03';
import tab04 from './components/PGE_CMA_00001_T04';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMA_00001', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  components: {
    p01,
    p02,
    p03,
    tab01,
    tab02,
    tab03,
    tab04,
  },
  data() {
    return {
      tabItems: [
        {
          tabId: 'tab01',
          tabTitle: this.$t('MSG_TIT_ROLE_MGT'),
          component: tab01, // pageID
        },
        {
          tabId: 'tab02',
          tabTitle: this.$t('MSG_TXT_USER_GROUP'),
          component: tab02,
        },
        {
          tabId: 'tab03',
          tabTitle: this.$t('MSG_TXT_PAGE'),
          component: tab03,
        },
        {
          tabId: 'tab04',
          tabTitle: this.$t('MSG_TXT_DTSVC'),
          component: tab04,
        },
      ],
      isNullData: false,
      showUserPopup: false,
      showPagePopup: false,
      showDtsvcPopup: false,
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      tabIndex: 0,
      condContent: '',
      selectedPageId: '',
      selectedGridRowData: {},
      selectedValues: {
        // form input 값등이 저장될 변수
        COD_ROLE_SRCH_COND: { key: '', label: '' },
        COD_ROLE_CATG : { key:'', label: ''}
      },
      oldRowIndex: -1,
      roleCategoryKey: '',
      condTypeKey: '',
      searchFieldOldText: '',
      localdata: [],
      dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      hasSystemAdminRole: utils.hasRoleNickName('SYS_ADMIN'),
      savedId:'',
    };
  },
  created() {
    this.dataList = [];
    this.columnRole = [
      {
        value: 'roleId',
        text: this.$t('MSG_TXT_ROLE_ID'),
        width: 150,
      },
      {
        value: 'roleCategoryName',
        text: this.$t('MSG_TXT_ROLE_CATG'),
      },
      {
        value: 'roleName',
        text: this.$t('MSG_TXT_ROLE_NAME'),
      },
      {
        value: 'roleNickName',
        text: this.$t('MSG_TXT_ROLE_ALIAS'),
      },
    ];
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
    if (!this.hasSystemAdminRole) {
      // utils.remove(this.tabItems, tabItm => tabItm.tabId == 'tab03');
      utils.remove(this.tabItems, tabItm => tabItm.tabId == 'tab04');
    }
  },
  methods: {
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onClose() {
      console.log('onConfirm');
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMA_00001';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onChange() {
      console.log('ok');
    },
    onReset() {
      this.$refs.condType.reset();
      this.selectedValues.COD_ROLE_SRCH_COND.key = this.condTypeKey;
      this.condContent = '';
      this.$refs.roleCategory.reset();
      this.selectedValues.COD_ROLE_CATG.key = this.roleCategoryKey;
    },
    onSearch() {
      const condTypeCode = utils.trim(this.selectedValues.COD_ROLE_SRCH_COND.key);
      const roleCategoryCode = utils.trim(this.selectedValues.COD_ROLE_CATG.key);

      const queryParams = {
        roleCategoryCode: roleCategoryCode || '',
        searchCond: condTypeCode || '',
        searchWord: utils.trim(this.condContent) || '',
      };

      http.request(this.$options.name, 'DTS_CMA_00001', {
        query: queryParams,
      }).then(res => {
        //if (res.data != null) {
        if (res.data) {
            if (res.data.length > 0) {
              this.$refs.grdList.resetSelect();
              this.dsData.setData(res.data);
              this.oldRowIndex = 0;
              this.isNullData = false;
              //this.$refs.tabPage.initData();
              if(!utils.isEmpty(this.savedId)){
                this.$refs.grdList.setSelect({roleId: this.savedId});
                this.savedId = '';
              }              
            } else {
              this.oldRowIndex = -1;
              this.isNullData = true;
              this.selectedGridRowData = {};
              this.selectedPageId = '';
              //this.$refs.tabPage.initData();
              this.dsData.setData([]);
            }
          } else {
            this.dsData.setData([]);
            this.isNullData = true;
            this.selectedGridRowData = {};
            this.selectedPageId = '';
            //this.$refs.tabPage.initData();
          }
        // }
      }).catch(error => {
        console.log(error);
      });
    },
    onClearSelectionMainGrid() {
      // this.dsData.clearSelection();
      this.$refs.grdList.resetSelect();
      this.selectedGridRowData = {};
    },
    onTabSearch() {
      this.onSearch();
    },
    changeTabIndex() {
      this.tabIndex = this.tabIndex + 1;
      this.$refs.tab.changeIdx(this.tabIndex % 2);
    },
    onSelectGrid(row) {
      if (!utils.isEmpty(row)) {
        this.selectedGridRowData = row;
        this.selectedPageId = this.selectedGridRowData ? this.selectedGridRowData.pageId : '';
      } else {
        this.selectedGridRowData = {};
        this.selectedPageId = '';
      }
    },
    onRoleCategoryLoaded(optionsList) {
      this.roleCategoryKey = optionsList[0].key;
      this.selectedValues.COD_ROLE_CATG.key = optionsList[0].key;
    },    
    onCondTypeLoaded(optionsList) {
      this.condTypeKey = optionsList[0].key;
      this.selectedValues.COD_ROLE_SRCH_COND.key = optionsList[0].key;
    },
    onKeyUpInput() {
      const searchFieldNewText = this.condContent;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.condContent = this.searchFieldOldText;
            this.$refs.condContent.setFocus();
          });
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
//    }
    },
    onPopup() {
      utils.openLayerPopup('PGE_CMA_00002', this.onPagePopupClose, {
        pageInitialData: {},
        size: 'md',
      });
    },
    onPagePopupClose(data) {
      console.log(data);
    },
    onUserPopupSaveClicked(dataInfo) {
      console.log(dataInfo);

      this.showUserPopup = false;

      this.selectedGridRowData = this.dsData.getSelected()[0];
      //      this.selectedPageId = this.selectedGridRowData ? this.selectedGridRowData.pageId : '';
    },
    onUserPopupCancelClicked(dataInfo) {
      console.log(dataInfo);
      this.showUserPopup = false;
    },
    onPagePopupSaveClicked(dataInfo) {
      console.log(dataInfo);

      this.showPagePopup = false;

      this.selectedGridRowData = this.dsData.getSelected()[0];
      // this.selectedPageId = this.selectedGridRowData ? this.selectedGridRowData.pageId : '';
    },
    onPagePopupCancelClicked(data) {
      console.log(data);
      this.showPagePopup = false;
    },
    onDtsvcPopupSaveClicked(dataInfo) {
      console.log(dataInfo);
      this.showDtsvcPopup = false;
      this.selectedGridRowData = this.dsData.getSelected()[0];
    },
    onDtsvcPopupCancelClicked(data) {
      console.log(data);
      this.showDtsvcPopup = false;
    },
    onCallUserPopup(data) {
      if (data.length > 0) {
        this.dataList = data;
      }
      this.showUserPopup = true;
    },
    onCallPagePopup(data) {
      if (data.length > 0) {
        this.dataList = data;
      }
      this.showPagePopup = true;
    },
    onCallDtsvcPopup(data) {
      if (data.length > 0) {
        this.dataList = data;
      }
      this.showDtsvcPopup = true;
    },
    handleUpdated(savedId) {
      this.savedId = savedId;
      this.onSearch();
    },    
  },
};
</script>
<style scoped>
</style>
