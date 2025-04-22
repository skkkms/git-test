<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_PORTL')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <!--<sui-code-select :selected="selectedCode" codeId="" />-->
            <sui-custom-select ref="comboPortals"
                               :selected="fromPsYn?psInitPortal:frame0.selectData.portals"
                               :option-list="frame0.selectPortalList"
                               :defaultOption="'all'"
                               @selection-changed="onLoadPortalSelect"
                               @list-clicked="onPortalSelectClick"
                               :disabled="fromPsYn"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_APPLICATION')" :vertical="false" :required="true"/>
          </div>
          <div class="col-xs-5">
            <sui-custom-select ref="comboApps"
                               :selected="frame0.selectData.apps"
                               :option-list="frame0.selectAppList"
                               :initialSelectedIndex="0"
                               :defaultOption="'select'"
                               :disabled="fromPsYn?false:disableSelectApps"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_QLINK_MARK_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field ref="searchText"
                            v-model="frame0.selectData.searchText"
                            maxlength="50"
                            placeholder=""
                            @keyup.enter="onSearchClick"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
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
      
      <!-- <div class="comp_spacing" />
        <div class="btn_wrapL">
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_gridTop"
            @click="onReOrderClick"
          >
            {{ $t('MSG_TXT_RE_ORDER') }}
          </sui-button>
        </div> -->
      <sui-s-grid
        ref="mainGrid"
        :headers="gridColumns0"
        :data-source="dsQLinkList"
        :options="options"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="5"
        @grid:selected="onSelectGrid"
      >
        <template #left-info>
          <sui-button
            type="button"
            class="comm_btn_gridTop"
            @click="onReOrderClick"
          >
            {{ $t("MSG_TXT_RE_ORDER") }}
          </sui-button>
        </template>
      </sui-s-grid>
      <!-- <sui-grid
        ref="mainGrid"
        :columns="gridColumns0"
        :dataset="'dsQLinkList'"
        :showCountControl="true"
        :showDisplayCountControl="false"
        @rowselect="onRowSelect"
      >
        <div class="comp_spacing" />
        <div class="btn_wrapL">
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_gridTop"
            @click="onReOrderClick"
          >
            {{ $t('MSG_TXT_RE_ORDER') }}
          </sui-button>
        </div>
      </sui-grid> -->
      <div class="mrB30" />
      <sui-page-tab-box-type
        ref="tab"
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          ref="tabPage"
          :selectedGridRowData="selectedGridRowData"
          :pageId="$options.name"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"          
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
          @onSearchClick="onSearchClick"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
        />
      </sui-page-tab-box-type>

      <sui-popup
        v-model="showPopup"
        :title="popTitle"
      >
        <p01
          :pageId="$options.name"
          :portalId="frame0.selectData.apps.key"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"
          :selectedApp="frame0.selectData.apps"
          :selectPortalList="frame0.selectPortalList"
          :selectAppList="frame0.selectAppList"
          @reorder-cancel="onPopupCancel"
          @reorder-save="onPopupSave"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage'; // eslint-disable-line import/no-unresolved
import tab01 from './components/PGE_CMP_00015_T01';
import p01 from './components/PGE_CMP_00015_P01';

const userDataFields = ['userId', 'loginId', 'dsplLngId', 'knoxId', 'userName',
  'userGlobalName', 'departmentName', 'departmentEnglishName'];

export default {
  name: 'PGE_CMP_00015', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    p01,
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
      disableSelectApps: true,
      selectedGridRowData: {},
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_QLINK'), // '퀵링크'
          tabComponent: tab01,
        },
      ],
      showPopup: false,
      popTitle: this.$t('MSG_TXT_RE_ORDER'),
      frame0: {
        selectData: {
          portals: {},
          apps: {},
          COD_APP_SEARCH_COND: {
            label: this.$t('MSG_TXT_ALL'),
            key: 'ALL',
          },
          searchText: '',
        },
        selectPortalList: [],
        selectAppList: [],
      },
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},
      localdata0: [],
      // gridColumns0: [{
      //   text: this.$t('MSG_TXT_PORTL'),
      //   datafield: 'portalName',
      //   width: '100',
      // }, {
      //   text: this.$t('MSG_TXT_APPLICATION_NM'),
      //   datafield: 'applicationName',
      //   width: '200',
      // }, {
      //   text: this.$t('MSG_TXT_QLINK_NM'),
      //   datafield: 'quickLinkName',
      // }, {
      //   text: this.$t('MSG_TXT_MDFC_USR'),
      //   datafield: 'finalModificationUserId',
      //   width: '200',
      //   createwidget: (row, column, value, htmlElement) => {
      //     utils.getGridCellFactory().createCellUserName(row, column, value, htmlElement, {
      //       displayType: '1',
      //       type: 'link',
      //       datafieldMap: {
      //         displayLanguageId: 'm_dsplLngId',
      //         userId: 'm_userId',
      //         knoxId: 'm_knoxId',
      //         userName: 'm_userName',
      //         userGlobalName: 'm_userGlobalName',
      //         departmentName: 'm_departmentName',
      //         departmentEnglishName: 'm_departmentEnglishName',
      //         loginId: 'm_loginId',
      //       },
      //     }, this.dsQLinkList, this.$refs.mainGrid);
      //   },
      //   initwidget(row, column, value, htmlElement) {
      //     utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
      //   },
      // }, {
      //   text: this.$t('MSG_TXT_MDFC_DTM'),
      //   datafield: 'finalModificationDTM',
      //   width: '150',
      //    eslint-disable-next-line max-len
      //   createwidget: (r, c, v, h) => utils.getGridCellFactory().createCellDateLabel(r, c, v, h, this.dsQLinkList, this.$refs.mainGrid),
      //   initwidget: (r, c, v, h) => utils.getGridCellFactory().refreshCell(r, c, v, h),
      // }],
      // localdata0: [],
      // eslint-disable-next-line new-cap
      dsQLinkList: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },

  created(){
    this.localdata0 = [];
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_PORTL'),
        value: 'portalName',
        width: '100',
      }, {
        text: this.$t('MSG_TXT_APPLICATION_NM'),
        value: 'applicationName',
        width: '200',
      }, {
        text: this.$t('MSG_TXT_QLINK_NM'),
        value: 'quickLinkName',
      }, {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'finalModificationUserId',
        width: '200',
        component: {
          props: ['row'],
          template:  `
            <cmp-user-name-link
              :displayType = "'1'"
              :displayLanguageId = "row.m_dsplLngId"
              :userId = "row.m_userId"
              :knoxId = "row.m_knoxI"
              :userName = "row.m_userName"
              :userGlobalName = "row.m_userGlobalName"
              :departmentName ="row.m_departmentName"
              :departmentEnglishName = "row.m_departmentEnglishName"
              :loginId = "row.m_loginId"
              :type = "'link'"
            />`
        }
      }, {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        width: '170',
        customValue(value){
          return utils.dateformatToClient(value);
        }
        // createwidget: (r, c, v, h) => utils.getGridCellFactory().createCellDateLabel(r, c, v, h, this.dsQLinkList, this.$refs.mainGrid),
        // initwidget: (r, c, v, h) => utils.getGridCellFactory().refreshCell(r, c, v, h),
      },
    ];

  },
  // datasets: [{
  //   id: 'dsQLinkList',
  //   type: 'local',
  //   data: 'localdata0',
  //   datafields: [
  //     { name: 'portalId', type: 'string', map: 'portalId' },
  //     { name: 'portalName', type: 'string', map: 'portalName' },
  //     { name: 'applicationName', type: 'string', map: 'applicationName' },
  //     { name: 'applicationId', type: 'string', map: 'applicationId' },
  //     { name: 'quickLinkUid', type: 'string', map: 'quickLinkUid' },
  //     { name: 'quickLinkName', type: 'string', map: 'quickLinkName' },
  //     { name: 'quickLinkMultiLanguageId', type: 'string', map: 'quickLinkMultiLanguageId' },
  //     { name: 'quickLinkMultiLanguageName', type: 'string', map: 'quickLinkMultiLanguageName' },
  //     { name: 'quickLinkUrl', type: 'string', map: 'quickLinkUrl' },
  //     { name: 'quickLinkEnglishUrl', type: 'string', map: 'quickLinkEnglishUrl' },
  //     { name: 'arrayalOrder', type: 'string', map: 'arrayalOrder' },
  //     { name: 'firstRegistrationUserId', type: 'string', map: 'firstRegistrationUserId' },
  //     { name: 'firstRegistrationDTM', type: 'string', map: 'firstRegistrationDTM' },
  //     { name: 'finalModificationUserId', type: 'string', map: 'finalModificationUserId' },
  //     { name: 'finalModificationDTM', type: 'string', map: 'finalModificationDTM' },
  //     { type: 'string', name: 'r_dsplLngId', map: 'r_dsplLngId' },
  //     { type: 'string', name: 'r_userId', map: 'r_userId' },
  //     { type: 'string', name: 'r_loginId', map: 'r_loginId' },
  //     { type: 'string', name: 'r_knoxId', map: 'r_knoxId' },
  //     { type: 'string', name: 'r_userName', map: 'r_userName' },
  //     { type: 'string', name: 'r_userGlobalName', map: 'r_userGlobalName' },
  //     { type: 'string', name: 'r_departmentName', map: 'r_departmentName' },
  //     { type: 'string', name: 'r_departmentEnglishName', map: 'r_departmentEnglishName' },
  //     { type: 'string', name: 'm_dsplLngId', map: 'm_dsplLngId' },
  //     { type: 'string', name: 'm_userId', map: 'm_userId' },
  //     { type: 'string', name: 'm_loginId', map: 'm_loginId' },
  //     { type: 'string', name: 'm_knoxId', map: 'm_knoxId' },
  //     { type: 'string', name: 'm_userName', map: 'm_userName' },
  //     { type: 'string', name: 'm_userGlobalName', map: 'm_userGlobalName' },
  //     { type: 'string', name: 'm_departmentName', map: 'm_departmentName' },
  //     { type: 'string', name: 'm_departmentEnglishName', map: 'm_departmentEnglishName' },
  //   ],
  // }],
  mounted() {
    // this.dsQLinkList.$on(this.dsQLinkList.EVENTS.SELECTION_CHANGED, this.onRowSelect);
    this.getPortalList().then(() => {

      //this.onSearchClick();
    });
  },
  // beforeDestroy() {
  //   this.dsQLinkList.$off(this.dsQLinkList.EVENTS.SELECTION_CHANGED, this.onRowSelect);
  // },
  methods: {
    getPortalList() {
      return new Promise((resolve, reject) => {
        http.request(this.$options.name, 'DTS_CMP_00004')
          .then(res => {
            utils.forEach(res.data, obj => {
              this.frame0.selectPortalList.push({
                key: obj.portalId,
                label: obj.portalName,
              });
            });
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          });
      });
    },
    getApplicationList(vPortal) {
      // Application list
      http.request(this.$options.name, 'DTS_CMP_00005', {
        query: {
          portalId: utils.trim(vPortal.key),
          deviceTypeValue: this.$store.getters.userInfo.deviceTypeBit,
        },
      })
        .then(res => {
          this.frame0.selectAppList.splice(0);
          utils.forEach(res.data, obj => {
            this.frame0.selectAppList.push({
              key: obj.applicationId,
              label: obj.applicationName,
            });
          });
          this.frame0.selectData.apps = {};
        })
        .catch(error => {
          console.log(error);
        });
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onSelectGrid(row) {
      if (!utils.isEmpty(row)) {
        this.selectedGridRowData = row;
      } else {
        this.selectedGridRowData = {};
      }
    },
    // onRowSelect(row) {
    //   this.selectedGridRowData = utils.getSelectedRow(this.dsQLinkList);
    // },
    onClearSelectionMainGrid() {
      // this.$refs.mainGrid.clearselection();
      this.dsQLinkList.clearSelection();
    },
    onPortalSelectClick() {
      if(this.fromPsYn){
        this.getApplicationList(this.psInitPortal);
      }else{
        this.getApplicationList(this.frame0.selectData.portals);
        this.disableSelectApps = this.frame0.selectData.portals.key === 'ALL';
      }
    },
    onLoadPortalSelect() {
      if(this.fromPsYn){
        this.getApplicationList(this.psInitPortal);
      }else{
        this.getApplicationList(this.frame0.selectData.portals);
      }      

    },
    onResetClick() {
      // this.selectedGridRowData = {};
      this.frame0.selectData.searchText = '';
      if(!this.fromPsYn){
        this.$refs.comboPortals.reset();
      }
      this.$refs.comboApps.reset();
      this.disableSelectApps = true; // 비활성화
    },
    onSearchClick(savedQuickLinkUid) {
      const searchValue = this.frame0.selectData;

      if(utils.isEmpty(utils.trim(searchValue.apps.key))){
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_APPLICATION'));
        utils.messageBox('warning', msg);
        
        return false;
      }

      const queryParams = {
        portalId: utils.trim(searchValue.portals.key) || '',
        applicationId: utils.trim(searchValue.apps.key) || '',
        searchText: utils.trim(searchValue.searchText) || '',
      };
      if(this.fromPsYn){
        queryParams.portalId = this.psInitPortal.key;
      }      
      http.request(this.$options.name, 'DTS_CMP_00045', {
        query: queryParams,
      }).then(res => {
        this.localdata0 = res.data;

        this.dsQLinkList.setData(this.setUserInfoFormat(res.data));
        
        this.onSelectGrid();
        if (typeof savedQuickLinkUid === 'string') {
          this.$refs.mainGrid.setSelect({quickLinkUid: savedQuickLinkUid});
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
  },
};
</script>
<style scoped>
</style>
