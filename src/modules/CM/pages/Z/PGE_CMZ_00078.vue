<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MDLE')" />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
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
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="searchCond"
              codeId="COD_CNFG_TYPE_SEARCH"
              defaultOption="all"
              class="width60"
              :selected="configTypeSearchKey"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="configTypeSearchText"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onClickSearchBtn"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickResetBtn"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearchBtn"
          >
            {{ $t("MSG_BTN_SRCH") }}
          </sui-button>
        </div>
      </div>
      <div class="comm_shut_wrap">
        <div 
          class="inbox"
          style="flex:4"
        >
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_CNFG_TYPE_GRP') }}</h4>
          </div>
          <sui-s-grid
            ref="gridConfigGroup"
            :initial-pagesize="5"
            :headers="columnConfigGroup"
            :data-source="dsConfigGroup"
            :options="options"
            :showRowsPerPageControl="false"
            @grid:selected="onRowSelectConfigGroup"
          >
            <template #left-info>
              <div class="comp_spacing" />
              <div
                class="btn_wrapL"
                style="margin-left: 10px;"
              >
                <sui-button
                  type="button"
                  class="comm_btn_gridTop"
                  @click="onClickConfigGroupArrage"
                >
                  {{ $t('MSG_TXT_RE_ORDER') }}
                </sui-button>
              </div>
            </template>
            <template #right-info>
              <div class="btn_wrapR">
                <button
                  type="button"
                  class="comm_btn_gridTop"
                  @click="onClickConfigGroupDel"
                >
                  {{ $t('MSG_TXT_GRP_DEL') }}
                </button>
                <button
                  type="button"
                  class="comm_btn_gridTop"
                  @click="onClickConfigGroupMod"
                >
                  {{ $t('MSG_TXT_GRP_MDFC') }}
                </button>
                <button
                  type="button"
                  class="comm_btn_gridTop"
                  @click="onClickConfigGroupNew"
                >
                  {{ $t('MSG_TXT_GRP_RGST') }}
                </button>
              </div>
            </template>
          </sui-s-grid>
        </div>
        <div class="emptybox" />
        <div 
          class="inbox"
          style="flex:6"
        >
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_BTN_CNFG_TYPE') }}</h4>
          </div>
          <sui-s-grid
            ref="gridConfigItem"
            :initial-pagesize="5"
            :headers="columnE"
            :data-source="dsConfigItem"
            :options="options"
            :showRowsPerPageControl="false"
            @grid:selected="onRowSelectConfigItem"
          >
            <template #left-info>
              <div class="comp_spacing" />
              <div
                class="btn_wrapL"
                style="margin-left: 10px;"
              >
                <sui-button
                  type="button"
                  class="comm_btn_gridTop"
                  @click="onClickConfigItemArrage"
                >
                  {{ $t('MSG_TXT_RE_ORDER') }}
                </sui-button>
              </div>
            </template>
          </sui-s-grid>
        </div>
      </div>
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
          :selectedGridRowDataGroup="selectedGridRowDataGroup"
          :selectedGridRowData="selectedGridRowDataE"
          @creating-configuration-item="onConfigurationCreate"
          @created-configuration-item="onClickSearchBtn"
          @deleted-configuration-item="onClickSearchBtn"
          @updated-configuration-item="onClickSearchBtn"
        />
      </sui-page-tab-box-type>
      <sui-popup
        v-if="showNewGroupPopup"
        v-model="showNewGroupPopup"
        :title="popupAction == 'new' ? $t('MSG_TXT_GRP_RGST'):$t('MSG_TXT_GRP_MDFC')"
      >
        <p01
          :contextPageId="contextPageId"
          :popupAction="popupAction"
          :targetMultiLanguageId="popupAction == 'new' ? '':selectedGridRowDataGroup.configurationMultiLanguageId"
          :selectedGridRowDataGroup="selectedGridRowDataGroup"
          @saved-config-group-popup="onSavedConfigGroup"
          @cancel-config-group-popup="onCancelConfigGroupPopup"
        />
      </sui-popup>
      <sui-popup
        v-model="showConfigArrangePopup"
        :title="arrangePopupTitle"
      >
        <p02
          :contextPageId="contextPageId"
          :arrangeTarget="arrangeTarget"
          :selectedGridRowDataGroup="selectedGridRowDataGroup"
          @cancel-config-arrange="onCancelConfigArrange"
          @saved-config-arrange="onSavedConfigArrange"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage'; // eslint-disable-line import/no-unresolved
import tab01 from './components/PGE_CMZ_00078_T01';
import p01 from './components/PGE_CMZ_00078_P01';
import p02 from './components/PGE_CMZ_00078_P02';


export default {
  name: 'PGE_CMZ_00078', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    p01,
    p02,
  },
  extends: BasePage,
  data() {
    return {
      // eslint-disable-next-line new-cap
      dsConfigGroup: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsConfigItem: new urDataSet(),
      arrangeTarget: 'CONFIG_GROUP', // 'CONFIG_GROUP' or 'CONFIG_ITEM'
      configTypeSearchText: '',
      searchFieldOldText: '',
      configTypeSearchKey: {
        label: '',
        key: '',
      },
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      popupAction: 'new',
      selectedGridRowDataGroup: {},
      selectedGridRowDataE: {},
      showNewGroupPopup: false,
      showConfigArrangePopup: false,
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_CNFG'),
          component: tab01,
        },
      ],
      targetMultiLanguageId: '',
      targetName: '',
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        showCountControl: true,
        showDisplayCountControl: false,
        showMoveControl: false,
      },
      queryData: {
        configurationId: '',
        moduleCode: {
          label: '',
          key: '',
        },
        subModuleCode: {
          label: '',
          key: '',
        },
      },
    };
  },
  computed: {
    arrangePopupTitle() {
      return this.arrangeTarget === 'CONFIG_GROUP'
        ? `${this.$t('MSG_TXT_CNFG_TYPE_GRP')} ${this.$t('MSG_TXT_RE_ORDER')}`
        : `${this.$t('MSG_TXT_CNFG_TYPE')} ${this.$t('MSG_TXT_RE_ORDER')}`;
    },
  },
  watch: {},
  created() {
    this.columnConfigGroup = [
      {
        text: this.$t('MSG_TXT_GRP_NM'),
        value: 'configurationName',
      },
      {
        text: this.$t('MSG_TXT_GRP_ID'),
        value: 'configurationId',
      },
    ];
    this.columnE = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 80,
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 90,
      },            
      {
        text: this.$t('MSG_TXT_CNFG_NM'),
        value: 'configurationName',
      },
      {
        text: this.$t('MSG_TXT_CNFG_ID'),
        value: 'configurationId',
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad();
    });
  },
  methods: {
    onCancelConfigGroupPopup() {
      this.showNewGroupPopup = false;
    },
    onCancelConfigArrange() {
      this.showConfigArrangePopup = false;
    },
    onClickConfigGroupDel() {
      if (utils.isEmpty(this.selectedGridRowDataGroup)
      || utils.isEmpty(this.selectedGridRowDataGroup.configurationId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else if (this.dsConfigItem.data.length > 0) {
        // '유형삭제 후 그룹 삭제가 가능합니다.'
        utils.messageBox('warning', this.$t('MSG_ALT_CANT_DEL_GRP_FOR_TYPE'));
      } else {
        // '삭제 하시겠습니까?'
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
          http.request(this.contextPageId, 'DTS_CMP_00087', {
            path: {
              'configuration-id': this.selectedGridRowDataGroup.configurationId,
            },
          }).then(() => {
            // '삭제 되었습니다.
            utils.messageBox('success', null, this.$t('MSG_ALT_DEL_DATA'), () => {
              this.onClickSearchBtn();
            });
          });
        });
      }
    },
    onClickConfigGroupMod() {
      if (this.dsConfigGroup.getSelected().length > 0) {
        this.popupAction = 'rename';
        this.targetMultiLanguageId = this.selectedGridRowDataGroup.configurationMultiLanguageId; // 다국어
        this.showNewGroupPopup = true;
      } else {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickConfigGroupNew() {
      this.popupAction = 'new';
      this.targetMultiLanguageId = ''; // 다국어
      this.showNewGroupPopup = true;
    },
    onConfigurationCreate() {
      //this.dsConfigItem.setSelectedIndexes([]);
      this.$refs.gridConfigItem.resetSelect();
      //this.$refs.gridConfigGroup.resetSelect();
      
    },
    onClickConfigGroupArrage() {
      this.arrangeTarget = 'CONFIG_GROUP';
      this.showConfigArrangePopup = true;
    },
    onClickConfigItemArrage() {
      if (utils.isEmpty(this.selectedGridRowDataGroup)) {
        // '유형을 추가 할 그룹을 선택하세요.'
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        this.arrangeTarget = 'CONFIG_ITEM';
        this.showConfigArrangePopup = true;
      }
    },
    onLoad() {
      const paramData = utils.getParameter(this, 'queryData');
      if (!utils.isEmpty(paramData)) {
        this.queryData = paramData;
        this.onClickSearchBtn();
      }
    },
    onSavedConfigGroup() {
      this.showNewGroupPopup = false;
      this.onClickSearchBtn();
    },
    onSavedConfigArrange() {
      this.showConfigArrangePopup = false;
      this.onClickSearchBtn();
    },
    onClickSearchBtn() {
      const dataParams = {
        moduleCode: this.queryData.moduleCode.key,
        subModuleCode: this.queryData.subModuleCode.key,
        configTypeSearchKey: this.configTypeSearchKey.key,
        configTypeSearchText: this.configTypeSearchText,
      };
      http.request(this.contextPageId, 'DTS_CMP_00075', {
        query: dataParams,
      }).then(res => {
        this.dsConfigGroup.setData(res.data);
        this.dsConfigItem.setData([]);
      });
    },
    onClickResetBtn() {
      this.resetSearchCondtn();
    },
    onSetCurrentTabComponent(component) {
      // eslint-disable-next-line no-unused-vars
      const page = 'PGE_CMZ_00078';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onRowSelectConfigGroup(event) {
      this.selectedGridRowDataGroup = event;
      if (event) {
        const dataParams = {
          moduleCode: this.queryData.moduleCode.key,
          subModuleCode: this.queryData.subModuleCode.key,
          configTypeSearchKey: this.configTypeSearchKey.key,
          configTypeSearchText: this.configTypeSearchText,
          parentsConfigurationId: event.configurationId,
        };
        http.request(this.contextPageId, 'DTS_CMP_00077', {
          query: dataParams,
        }).then(res => {
          this.dsConfigItem.setData(res.data);
        });
      }
    },
    onRowSelectConfigItem(event) {
      this.selectedGridRowDataE = event;
    },
    resetSearchCondtn() {
      this.configTypeSearchText = '';
      this.configTypeSearchKey.key = 'ALL';
      this.queryData.moduleCode.key = 'ALL';
      this.queryData.subModuleCode.key = 'ALL';
    },
    saveConfigGroup(multiLangList) {
      let configId = '';
      let SendType = '';
      let configContent = '';
      let firstProgramId = '';
      let finalProgramId = '';

      const groupName = multiLangList[0].multiLanguageContent;

      if (this.popupAction === 'new') {
        SendType = 'DTS_CMZ_00006';
        configContent = `${this.$t('MSG_TXT_CNFG')} (${groupName})`;
        firstProgramId = this.contextPageId;
        finalProgramId = this.contextPageId;
      } else {
        SendType = 'DTS_CMZ_00007';
        configId = this.clickedReadNode.id;
        finalProgramId = this.contextPageId;
      }

      const dataParams = {
        configurationId: configId,
        configurationName: groupName || '',
        moduleCode: 'CM',
        subModuleCode: 'CMZ',
        configurationApplyCode: '',
        configurationTypeCode: '',
        configurationDefaultValue: '',
        configurationContent: configContent,
        hierarchyLevel: 1,
        arrayalOrder: 1,
        parentsConfigurationId: '',
        folderYn: 'Y',
        firstRegistrationProgramId: firstProgramId,
        finalModificationProgramId: finalProgramId,
        multiLanguageList: multiLangList, // 다국어
      };

      http.request(this.contextPageId, SendType, {
        data: dataParams,
      }).then(res => {
        this.showNewFolderPopup = false;

        if (res.data.resultCode === '0') {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ALREADY_RGST'), this.$t('MSG_TXT_FLDR')), null);
        } else {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            this.searchData();
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.configTypeSearchText;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.configTypeSearchText = this.searchFieldOldText;
          this.$refs.searchText.setFocus();
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
  },
};
</script>

<style scoped>
</style>
