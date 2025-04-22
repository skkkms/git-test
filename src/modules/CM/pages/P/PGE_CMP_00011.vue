<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />
    <!-- Page Contents -->
    <sui-page-contents>
      <!-- Search Box -->
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="comboPortals"
              :selected="fromPsYn?psInitPortal:frame0.selectData.portals"
              :option-list="frame0.selectPortalList"
              :disabled="fromPsYn"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MENU_UE_YN')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="comboUseYn"
              :selected="frame0.selectData.useYnValue"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
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
              :selected="frame0.selectData.deleteYnValue"
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
              :selected="frame0.selectData.COD_APP_SEARCH_COND"
              :pageId="this.$options.name"
              codeId="COD_APP_SEARCH_COND"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="frame0.selectData.searchText"
              maxlength="50"
              placeholder=""
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <!-- <div
          v-if="deviceApplyYn"
          class="row"
        >
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DVC_TYPE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
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
        </div> -->
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onResetSearchClick"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB10" />
      <sui-s-grid
        ref="mainGrid"
        :headers="gridColumns0"
        :showCountControl="true"
        :showRowsPerPageControl="false"
        :showDisplayCountControl="false"
        :data-source="dsAppList"
        :showMoveControl="true"
        @grid:selected="onRowSelect"
      >
        <template #center-info>
          <div class="comm_gridTop_wrap">
            <ur-button class="sort_save" sm @click="onClickReordering">
              {{ $t('MSG_BTN_ORDER_SAV') }}
            </ur-button>
          </div>
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <!--<div class="comm_title_wrap">
        <h4>어플리케이션</h4>
      </div>-->
      <!-- tab -->
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
          :selectedGridRowData="selectedGridRowData"
          :deviceApplyYn="deviceApplyYn"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
          @onSearchClick="onSearchClick"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
        />
      </sui-page-tab-box-type>
      <!-- /tab -->
      <sui-popup
        v-model="showPopup"
        :title="popTitle"
      >
        <p01
          :pageId="$options.name"
          :portalId="frame0.selectData.portals.key"
          @app-reorder-cancel="onPopupCancel"
          @app-reorder-save="onPopupSave"
        />
      </sui-popup>
      <sui-popup
        v-model="showMenuPopup"
        :title="popMenuTitle"
      >
        <p02
          :portalId="menuPopupData.portalId"
          :applicationId="menuPopupData.applicationId"
          :deviceType="menuPopupData.deviceType"
          @app-menu-cancel="onMenuPopupCancel"
          @app-menu-save="onMenuPopupSave"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMP_00011_T01';
import tab02 from './components/PGE_CMP_00011_T02';
import p01 from './components/PGE_CMP_00011_P01';
import p02 from './components/PGE_CMP_00011_P02';

const userDataFields = ['userId', 'loginId', 'dsplLngId', 'knoxId', 'userName',
  'userGlobalName', 'departmentName', 'departmentEnglishName'];

export default {
  name: 'PGE_CMP_00011', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    p01,
    p02,
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
      dsAppList: new urDataSet(), // eslint-disable-line new-cap
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      deviceApplyYn: utils.getConfigurationValue('CFG_CMZ_DVC_TYPE_APPY_YN') === 'Y',
      // Codes
      codes: CommonConstants.selectOptions(),
      selectedGridRowData: {},
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_APPLICATION'),
          tabComponent: tab01,
        },
        // {
        //   tabTitle: this.$t('MSG_TXT_ROLE'), // '권한'
        //   tabComponent: tab02,
        // },
      ],
      menuPopupData: {
        portalId: '',
        applicationId: '',
        deviceType: '',
      },
      frame0: {
        selectData: {
          portals: {},
          useYnValue: {},
          deleteYnValue: {},
          COD_APP_SEARCH_COND: {
            label: this.$t('MSG_TXT_ALL'),
            key: 'ALL',
          },
          searchText: '',
          deviceTypeValue: 0,
        },
        selectPortalList: [],
      },
      // localdata0: [],
      showPopup: false,
      popTitle: this.$t('MSG_TXT_RE_ORDER'),
      showMenuPopup: false,
      popMenuTitle: this.$t('MSG_TXT_MENU_MGT'),
      deviceSelectValue: [],
      deviceValueList:[],
      placeholder: this.$t('MSG_TXT_ALL'),
      searchFieldOldText: '',
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},
    };
  },
  computed: {
  },
  watch: {},
  created() {
    const that = this;
    this.deviceTypeList = [];
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_PORTL_ID'),
        value: 'portalId',
      }, {
        text: this.$t('MSG_TXT_PORTL_NM'),
        value: 'portalNm',
      }, {
        text: this.$t('MSG_TXT_APPLICATION_ID'),
        value: 'applicationId',
      }, {
        text: this.$t('MSG_TXT_APPLICATION_NM'),
        value: 'applicationName',
      }, {
        text: this.$t('MSG_TXT_MENU_UE_YN'),
        value: 'applicationMenuUseYn',
        width: '100',
      },
      {
        text: this.$t('MSG_TXT_DFLT_PAGE'),
        value: 'applicationBasicsPageId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_DEL_YN'),
        value: 'deleteYn',
        width: '80',
      },
      {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'finalModificationUserId',
        width: '200',
      },
      {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        width: '170',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
      },
      // 20220920. 메뉴관리버튼 제거
      // {
      //   text: this.$t('MSG_BTN_MENU_MGT'),
      //   value: 'menuButton',
      //   component: {
      //     props: ['row', 'value'],
      //     template:
      //       // `<ur-button sm
      //       //   @click.stop="onGridButtonClicked(row)">{{row.menuButton[0].label}}
      //       // </ur-button>`,
      //       `<sui-button
      //         :title="'{{row.menuButton[0].label}}'"
      //         type="button"
      //         class="border"
      //         @click="onGridButtonClicked(row)"
      //       >
      //         {{row.menuButton[0].label}}
      //       </sui-button>`,
      //     methods: {
      //       onGridButtonClicked(row) {
      //         that.onGridButtonClicked(row);
      //       },
      //     },
      //   },
      //   width: 100,
      // },
    ];
  },
  mounted() {
    // portal list
    this.$nextTick(() => {
      this.loadPortalList();
      this.loadDeviceCode();
      if(this.fromPsYn){
        this.onSearchClick();
      }
    });    
  },
  beforeDestroy() {},
  methods: {
    loadPortalList(){
      http.request(this.$options.name, 'DTS_CMP_00004').then(res => {
        utils.forEach(res.data, obj => {
          this.frame0.selectPortalList.push({
            key: obj.portalId,
            label: obj.portalName,
          });
        });
      }).catch(error => {
        console.log(error);
      });
    },
    loadDeviceCode() {
      http.getCodeList(this.pageId, ['COD_DVC_TYPE'], '').then(res => {
        utils.forEach(res.COD_DVC_TYPE, value => {
          this.deviceTypeList.push(
            { key: value.key, label: value.codeName },
            // { value: value.key, text: value.codeName },
          );
          this.deviceSelectValue.push(
            { key: value.key, label: value.codeName },
          );
          this.deviceValueList.push(
            { key: value.key, label: value.codeName },
          );          
        });
      }).catch(err => {
        console.log(err);
      });
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onSearchClick(appId) {
      const searchValue = this.frame0.selectData;
      if (this.deviceApplyYn) {
        searchValue.deviceTypeValue = this.calculateDeviceTypeValue();
      }
      if(this.fromPsYn){
          searchValue.portals.key = this.psInitPortal.key;
      }
      const queryParams = {
        portalId: utils.trim(searchValue.portals.key) || '',
        searchCond: utils.trim(searchValue.COD_APP_SEARCH_COND.key) || '',
        searchText: utils.trim(searchValue.searchText) || '',
        applicationMenuUseYn: utils.trim(searchValue.useYnValue.key) || '',
        deleteYn: utils.trim(searchValue.deleteYnValue.key) || '',
        deviceTypeValue: searchValue.deviceTypeValue ? searchValue.deviceTypeValue : 0,
      };
      http.request(this.$options.name, 'DTS_CMP_00005', {
        query: queryParams,
      }).then(res => {
        const localdata0 = res.data;
        utils.forEach(localdata0, item => {
          // item.firstRegister = item.firstRegistrationUserName || item.firstRegistrationUserId;
          // item.finalModifier = item.finalModificationUserName || item.finalModificationUserId;
          if (item.applicationBasicsDashboardId && item.applicationBasicsDashboardId.startsWith('DSB')) {
            item.applicationBasicsPageId = item.applicationBasicsDashboardId;
          } else {
            item.applicationBasicsDashboardId = item.applicationBasicsPageId;
          }

          item.menuButton = [{
            key: 'menuBtn1',
            label: this.$t('MSG_BTN_MENU_MGT'),
            type: 'negative',
          }];
        });
        this.dsAppList.setData(this.setUserInfoFormat(localdata0));
        this.onRowSelect(); // 검색후 선택항목에 대한 상세탭 정보 초기화
        // list select
        if (typeof appId === 'string') {
          // const idx = utils.findIndex(this.dsAppList.data, { applicationId: appId });
          // if (idx > -1) {
          //   // this.$refs.mainGrid.getJqxGrid().selectrow(idx);
          //   this.$refs.mainGrid.getSelected(idx);
          // }
          this.$refs.mainGrid.setSelect({applicationId: appId});
        }
      }).catch(error => {
        console.log(error);
      });
    },
    setUserInfoFormat(list) {
      utils.forEach(list, data => {
        const result = {};
        utils.forEach(data.firstRegistrationUserInfo, (value, key) => {
          if (utils.indexOf(userDataFields, key) !== -1) {
            result[`r_${key}`] = value;
          }
        });
        utils.forEach(data.finalModificationUserInfo, (value, key) => {
          if (utils.indexOf(userDataFields, key) !== -1) {
            result[`m_${key}`] = value;
          }
        });
        if (!utils.isEmpty(result)) {
          utils.assign(data, result);
        }
      });
      return list;
    },
    onResetSearchClick() {
      if(!this.fromPsYn){
        this.$refs.comboPortals.reset();
      }
      this.$refs.comboSearchCond.reset();
      this.$refs.comboUseYn.reset();
      this.$refs.deleteYn.reset();
      this.frame0.selectData.searchText = '';
      if (this.deviceApplyYn) {
        this.deviceSelectValue = this.deviceValueList;
      }
    },
    onGridButtonClicked(dataRow) {
      // menu button click
      // utils.messageBox('information', '메뉴관리가 클릭되었습니다.', `label: ${btn.label}`, null);
      this.menuPopupData = {
        portalId: dataRow.portalId,
        applicationId: dataRow.applicationId,
        deviceType: dataRow.deviceTypeValue,
      };
      this.showMenuPopup = true;
    },

    onRowSelect(row) {
      // const selectIdx = target.args.rowindex;
      // if (selectIdx > -1) {
      //   this.selectedGridRowData = this.localdata0[selectIdx];
      // }
      if (row) {
        this.selectedGridRowData = row;
      } else {
        this.selectedGridRowData = {};
      }
    },
    onClearSelectionMainGrid() {
      // this.$refs.mainGrid.clearselection();
      this.$refs.mainGrid.resetSelect();
      //this.dsAppList.clearData();
    },
    onReOrderClick() {
      this.showPopup = true;
    },
    onPopupCancel() {
      this.showPopup = false;
    },
    onPopupSave() {
      this.showPopup = false;
      this.onSearchClick();
    },
    onMenuPopupCancel() {
      this.showMenuPopup = false;
    },
    onMenuPopupSave() {
      this.showMenuPopup = false;
      // this.onSearchClick();
    },
    calculateDeviceTypeValue() {
      let ret = 0;
      // const deviceSelectedList = this.$refs.deviceMultiDropdown.selected;
      // utils.forEach(deviceSelectedList, (item, key) => {
      // ret += Number(item.value);
      utils.forEach(this.deviceSelectValue, item => {
        ret += Number(item.key);
      });
      return ret;
    },
    onClickReordering() {
      const requestParam = this.dsAppList.getRawData().map((dataset, index) => {
        return {
          portalId: dataset.portalId,
          applicationId: dataset.applicationId,
          arrayOrder: index,
        };
      });
      utils.messageBox('confirm', this.$t('MSG_ALT_CFRM_CHG_ORD'), null,
        (/* ok */) => {
          http.request(this.$options.name, 'DTS_CMP_00011', {
            data: requestParam,
          }).then(() => {
            this.onSearchClick();
          });
        },
        (/* cancel */) => {});
    },
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.selectData.searchText;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.frame0.selectData.searchText = this.searchFieldOldText;
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
