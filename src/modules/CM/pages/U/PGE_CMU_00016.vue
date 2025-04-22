<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="selectModule"
              :pageId="contextPageId"
              :selectedMd="searchFrame.selectedCodeValue.moduleCode"
              :selectedSmd="searchFrame.selectedCodeValue.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
              class="dp_flex"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_Reset "
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
              {{ $t("MSG_BTN_SEARCH") }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="mrB30" />
    
      <sui-s-grid
        ref="mainGrid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :options="options"
        :showDisplayCountControl="true"
        :initial-pagesize="5"
        :showRowsPerPageControl="false"
        @grid:selected="onClickGridRow"
      />




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
          :pageId="contextPageId"
          :tableColumnList="tableColumnList"
          :objectId="objectId"
          @updatedInfo="updatedInfo"
          @clearGrid="clearGrid"
          @research="onClickSearch"
          @openPopup="openPopup"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
    <sui-popup
      v-model="isShownPopup"
      :title="$t('MSG_TIT_COL_SELT')"
    >
      <p01
        :pageId="contextPageId"
        :objectId="objectId"
        :tableColumnList="tableColumnList"
        @closePopup="closePopup"
        @paramReturn="paramReturn"
      />
    </sui-popup>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index.js';
import tab01 from './components/PGE_CMU_00016_T01.vue';
import tab02 from './components/PGE_CMU_00016_T02.vue';
import p01 from './components/PGE_CMU_00016_P01';
import BasePage from '~cm/components/BasePage';

const dateTypeFields = ['firstRegistrationDTM', 'finalModificationDTM'];

export default {
  name: 'PGE_CMU_00016', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    p01,
  },
  extends: BasePage,
  data() {
    return {
      searchFrame: {
        selectedCodeValue: {
          moduleCode: {
            key: '',
            label: '',
          },
          subModuleCode: {
            key: '',
            label: '',
          },
        },
      },
      objectId: '',
      isShownPopup: false,
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      dataset0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      savedId:'',
    };
  },
  computed: {},
  watch: {},
 
  created() {
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_MDLE'),
      value: 'moduleName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_SMDLE'),
      value: 'subModuleName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_OBJ_ID'),
      value: 'objectId',
      width: '200px',
    }, {
      text: this.$t('MSG_TXT_OBJ_NM'),
      value: 'objectName',
    },
    {
      text: this.$t('MSG_TXT_MDFC_USR'),
      value: 'finalModificationUserId',
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
    }, {
      text: this.$t('MSG_TXT_MDFC_DTM'),
      value: 'finalModificationDTM',
      width: '170px',
    }];
    this.tabItems = [
      {
        tabTitle: this.$t('MSG_TXT_OBJ_MGT'),
        tabComponent: tab01,
      },
      {
        tabTitle: this.$t('MSG_TXT_COL'),
        tabComponent: tab02,
      },
    ];
    this.tableColumnList = [];
    this.localdata0 = [];
  },
  mounted() {},

  methods: {
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    clearGrid() {
     // this.dataset0.clearSelection();
      this.objectId = '';
      this.$refs.mainGrid.resetSelect();
    },
    openPopup() {
      this.isShownPopup = true;
    },
    closePopup() {
      this.isShownPopup = false;
    },
    paramReturn(data, param) {
      this[param] = data;
    },
    onClickReset() {
      this.$refs.selectModule.selectMd('ALL');
    },
    onClickSearch() {
      this.objectId = utils.isEmpty(this.objectId) ? this.objectId : '';
      
      const queryParams = {
        moduleCode: this.searchFrame.selectedCodeValue.moduleCode.key || '',
        subModuleCode: this.searchFrame.selectedCodeValue.subModuleCode.key || '',
      };
      http.request(this.contextPageId, 'DTS_CMU_00069', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, dateTypeFields);
        this.dataset0.setData(res.data);

        if(!utils.isEmpty(this.savedId)){
          this.$refs.mainGrid.setSelect({objectId: this.savedId});
          this.savedId = '';
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onClickGridRow(dataRow) {
    if (!utils.isEmpty(dataRow)) {
        const { objectId } = dataRow;
        this.objectId = objectId;
      }
    },
    updatedInfo(savedId) {
      this.savedId = savedId;
      this.onClickSearch();
    },    
  },
};
</script>

<style scoped>
</style>
