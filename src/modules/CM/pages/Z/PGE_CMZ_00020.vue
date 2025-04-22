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
          <div class="col-xs-3">
            <sui-module-submodule-select
              ref="smComboSelect"
              class="dp_flex"
              :selectedMd="selectedCodeValue.selectedModuleValue"
              :selectedSmd="selectedCodeValue.selectedSubModuleVale"
              :customMdList="selCodes.allOption"
              :customSmdList="selCodes.allOption"
              :initialSelectedIndex="0"
              disabledMd="false"
            />
          </div>
          <!-- <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APPY_SCP')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-code-select
              :selected="selectedCodeValue.COD_CNFG_APPY"
              :customOpitonList="selCodes.selOption"
              codeId="COD_CNFG_APPY"
              @loaded="onLoadedCnfgApply"
            />
          </div> -->
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-7">
            <sui-code-select
              ref="cnfgTypeSearch"
              :selected="selectedCodeValue.COD_CNFG_TYPE_SEARCH"
              codeId="COD_CNFG_TYPE_SEARCH"
              :customOpitonList="selCodes.allOption"
              class="width60"
              @loaded="onLoadedCnfgTypeSearch"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="codCnfgSearchText"
              maxlength="50"
              @keyup.enter="onSearch"
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
            v-permission:read="'PGE_CMZ_00020'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_gridTop_wrap">
            <div class="btn_wrapL">
               <sui-button v-if="isTreeCollapseAll" type="button" class="comm_btn_treeOpen" @click="treeGridExpand"></sui-button>
               <sui-button v-else type="button" class="comm_btn_treeClose" @click="treeGridCollapse"></sui-button>
            </div>
           </div>
          <sui-tree-grid
            ref="treeGrid"
            width="100%"
            :columns="treeGridColumns"
            :height="358"
            :dataset="'dsTreeData'"
            :selectionMode="'singleRow'"
            :enableHover="false"
          />
        </div>
        <div class="btnbox" />
        <div class="inbox">
          <div class="comm_gridTop_wrap" style="line-height:24px;height:24px"/>
          <div class="comm_view_wrap">
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_MDLE')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ mdleName }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_SMDLE')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ smdleName }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_CNFG_NM')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ envSetName }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_CNFG_ID')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ envSetId }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_APPY_SCP')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ envApplyName }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_EXPL')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ contents }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_CNFG_DEFAULT_VAL')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ defaultValueName }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_CNFG_VAL')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <!-- Apply code is All -->
                <div
                  v-if="'A' === isApplyCode"
                  class="width100"
                >
                  <sui-text-field
                    v-show="'T' === isConfTypeCode"
                    v-model="dataValue"
                    maxlength="1000"
                  />
                  <sui-radio
                    v-show="'F' === isConfTypeCode"
                    v-model="ynValue"
                    value="Y"
                  >
                    Yes
                  </sui-radio>
                  <sui-radio
                    v-show="'F' === isConfTypeCode"
                    v-model="ynValue"
                    value="N"
                  >
                    No
                  </sui-radio>
                  <sui-custom-select
                    v-show="'C' === isConfTypeCode"
                    :selected="selectModuleData"
                    :option-list="moduleData"
                  />
                </div>
                <!-- Apply code is not All -->
                <div
                  v-else
                  class="width100"
                >
                  <div class="mrB10" />
                  <div class="comm_gridTop_wrap">
                    <ul>
                      <li class="btn_wrapL">
                        <sui-button
                          v-permission:create="'PGE_CMZ_00020'"
                          type="button"
                          class="comm_btn_gridTop"
                          @click="onRowAdd"
                        >
                          {{ $t('MSG_BTN_ROW_ADD') }}
                        </sui-button>
                        <sui-button
                          v-permission:delete="'PGE_CMZ_00020'"
                          type="button"
                          class="comm_btn_gridTop"
                          @click="onRowDel"
                        >
                          {{ $t('MSG_BTN_ROW_DEL') }}
                        </sui-button>
                      </li>
                    </ul>
                  </div>
                  <sui-grid
                    v-show="'S' === isApplyCode"
                    ref="grdSiteList"
                    :hideHeader="true"
                    :sortable="false"
                    :filterable="false"
                    :columns="gridSiteColumns"
                    :multiselect="true"
                    :columnsresize="true"
                    :columnsautoresize="true"
                    width="100%"
                    :dataset="'dsSiteData'"
                  />
                  <sui-grid
                    v-show="'M' === isApplyCode"
                    ref="grdMdList"
                    :hideHeader="true"
                    :sortable="false"
                    :filterable="false"
                    :columns="gridMdColumns"
                    :multiselect="true"
                    :columnsresize="true"
                    :columnsautoresize="true"
                    width="100%"
                    :dataset="'dsMdData'"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_MDFC_USR')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <cmp-user-name-link
                  :pageId="contextPageId"
                  :displayType="'1'"
                  :displayLanguageId="displayLangId"
                  :knoxId="displayKnoxId"
                  :userName="displayUserName"
                  :userGlobalName="displayUserGlobalName"
                  :departmentName="displayDeptName"
                  :departmentEnglishName="displayDeptEngName"
                  :type="'link'"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_MDFC_DTM')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <div class="comm_label">
                  <p>{{ regDTM }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="true === btnEnable"
        class="comm_btn_wrap"
      >
        <sui-button
          v-permission:update="'PGE_CMZ_00020'"
          type="button"
          class="comm_btn_solid"
          @click="onSave"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
      <div
        v-else
        class="comm_btn_wrap"
      >
        <sui-button
          v-permission:update="'PGE_CMZ_00020'"
          type="button"
          class="comm_btn_solid"
          disabled
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00020', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      paramModuleCode: '',
      displayLangId: '',
      displayKnoxId: '',
      displayUserName: '',
      displayUserGlobalName: '',
      displayDeptName: '',
      displayDeptEngName: '',
      ynValue: 'N',
      selCodes: CommonConstants.selectOptions(),
      selectedCodeValue: {
        selectedModuleValue: { label: '', key: '' },
        selectedSubModuleVale: { label: '', key: '' },
        // COD_CNFG_APPY: { label: '', key: '' },
        COD_CNFG_TYPE_SEARCH: { label: '', key: '' },
      },
      columnDatas: [{
        boundindex: -1, moduleCode: '', smoduleCode: '', changed: 0, data: null,
      }],
      subModuleList: [
        { label: '', key: '' },
      ],
      selectModuleData: { label: '', key: '' },
      moduleData: [{ label: '', key: '' }],
      smoduleData: CommonConstants.selectOptions().allOption,
      moduleValueData: [{ label: '', key: '' }],
      applyCode: 'A',
      confTypeCode: 'T',
      mdleCode: '',
      mdleName: '',
      smdleCode: '',
      smdleName: '',
      envSetName: '',
      envSetId: '',
      envApplyCodeId: '',
      envApplyCode: '',
      envApplyName: '',
      envTypeCode: '',
      contents: '',
      defaultValue: '',
      defaultValueName: '',
      dataValue: '',
      regDTM: '',
      btnEnable: false,
      isTreeCollapseAll: false,
      // oldApplyKey: '',
      oldCondKey: '',
      codCnfgSearchText: '',
      localsitedata: [],
      localmddata: [],
      gridSiteColumns: [{
        text: this.$t('MSG_TXT_SITE'),
        width: 200,
        datafield: 'siteName',
      },
      {
        text: this.$t('MSG_TXT_CNFG_VAL'),
        datafield: 'siteValue',
        createwidget: (row, column, value, htmlElement) => {
          if (utils.trim(row.bounddata.typeCode) === 'F') {
            utils.getGridCellFactory().createCellSegmentBox(row, column, value, htmlElement, {
            }, this.dsSiteData, this.$refs.grdSiteList);
          } else if (utils.trim(row.bounddata.typeCode) === 'C') {
            utils.getGridCellFactory().createCellSelect(row, column, value, htmlElement, {
              optionList: this.moduleData,
            }, this.dsSiteData, this.$refs.grdSiteList);
          } else {
            utils.getGridCellFactory().createCellTextField(row, column, value, htmlElement, {
              trim: true,
            }, this.dsSiteData, this.$refs.grdSiteList);
          }
        },
        initwidget(row, column, value, htmlElement) {
          utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
        },
      }],

      gridMdColumns: [
/*
      {
        text: this.$t('MSG_TXT_MDLE'),
        width: 150,
        datafield: 'moduleName',
        createwidget: (row, column, value, htmlElement) => {
          utils.getGridCellFactory().createCellSelect(row, column, value, htmlElement, {
            optionList: this.moduleData,
          }, this.dsMdData, this.$refs.grdMdList);
        },
        initwidget(row, column, value, htmlElement) {
          utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
        },
      },
*/
      {
        text: this.$t('MSG_TXT_SMDLE'),
        width: 150,
        datafield: 'submoduleName',
        createwidget: (row, column, value, htmlElement) => {
          const editorInstance = utils.getGridCellFactory().createCellSelect(row, column, value, htmlElement, {
            optionList: this.smoduleData,
          }, this.dsMdData, this.$refs.grdMdList);
        },
        initwidget(rowIdx, column, value, htmlElement) {
          utils.getGridCellFactory().refreshCell(rowIdx, column, value, htmlElement);
        },
      },
      {
        text: this.$t('MSG_TXT_CNFG_VAL'),
        datafield: 'moduleValue',
        createwidget: (row, column, value, htmlElement) => {
          if (utils.trim(row.bounddata.typeCode) === 'F') {
            utils.getGridCellFactory().createCellSegmentBox(row, column, value, htmlElement, {
            }, this.dsMdData, this.$refs.grdMdList);
          } else if (utils.trim(row.bounddata.typeCode) === 'C') {
            utils.getGridCellFactory().createCellSelect(row, column, value, htmlElement, {
              optionList: this.moduleValueData,
            }, this.dsMdData, this.$refs.grdMdList);
          } else {
            utils.getGridCellFactory().createCellTextField(row, column, value, htmlElement, {
              trim: true,
            }, this.dsMdData, this.$refs.grdMdList);
          }
        },
        initwidget(row, column, value, htmlElement) {
          utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
        },
      }],
      stateData: [],
      treeGridColumns: [
        {
          text: this.$t('MSG_TXT_ITEM_NM'),
          datafield: 'value',
          width: 381,
        },
        {
          text: this.$t('MSG_TXT_ITEM_ID'),
          datafield: 'id',
          width: 381,
        },
      ],
    };
  },
  computed: {
    isApplyCode() {
      return this.applyCode;
    },
    isConfTypeCode() {
      return this.confTypeCode;
    },
  },
  watch: {},
  datasets: [
    {
      id: 'dsTreeData',
      componentType: 'tree-grid',
      data: 'stateData',
      hierarchy: {
        keyDataField: {
          name: 'id',
        },
        parentDataField: {
          name: 'parentId',
        },
      },
      datafields: [
        { name: 'id', type: 'string', map: 'id' },
        { name: 'parentId', type: 'string', map: 'parentId' },
        { name: 'level', type: 'string', map: 'level' },
        { name: 'value', type: 'string', map: 'value' },
        { name: 'dataset-row-id', type: 'string', map: 'dataset-row-id' },
      ],
    },
    {
      id: 'dsSiteData',
      type: 'local',
      data: 'localsitedata',
      datafields: [
        { name: 'siteId', type: 'string', map: 'siteId' },
        { name: 'siteName', type: 'string', map: 'siteName' },
        { name: 'siteValue', type: 'string', map: 'siteValue' },
        { name: 'typeCode', type: 'string', map: 'typeCode' },
      ],
    },
    {
      id: 'dsMdData',
      type: 'local',
      data: 'localmddata',
      datafields: [
        { name: 'moduleCode', type: 'string', map: 'moduleCode' },
        { name: 'moduleName', type: 'string', map: 'moduleName' },
        { name: 'submoduleCode', type: 'string', map: 'submoduleCode' },
        { name: 'submoduleName', type: 'string', map: 'submoduleName' },
        { name: 'moduleValue', type: 'string', map: 'moduleValue' },
        { name: 'typeCode', type: 'string', map: 'typeCode' },
      ],
    },
  ],
  mounted() {
    this.paramModuleCode = utils.getParameter(this, 'module');
    this.selectedCodeValue.selectedModuleValue.key = this.paramModuleCode;
    this.dsTreeData.$on(this.dsTreeData.EVENTS.SELECTION_CHANGED, this.onItem);
    this.load();
    this.loadCode();
    this.onSearch();
  },
  beforeDestroy() {
    this.dsTreeData.$off(this.dsTreeData.EVENTS.SELECTION_CHANGED, this.onItem);
  },
  methods: {
    makeSnapshot() {
      const snapshotData = utils.assign({}, {
        ynValue: this.ynValue,
        selectModuleData: this.selectModuleData,
        dataValue: this.dataValue || '',
      });
      return snapshotData;
    },
    loadCode() {
      http.getSubModuleCode(this.contextPageId, this.paramModuleCode).then(res => {
        utils.forEach(res.data, obj => {
          this.smoduleData.push(
            { key: obj.codeId, label: obj.codeName },
          );
        });
      });
    },
    // onLoadedCnfgApply(optionsList) {
    //   this.selectedCodeValue.COD_CNFG_APPY.key = optionsList[0].key;
    //   this.oldApplyKey = optionsList[0].key;
    // },
    onLoadedCnfgTypeSearch(optionsList) {
      this.selectedCodeValue.COD_CNFG_TYPE_SEARCH.key = optionsList[0].key;
      this.oldCondKey = optionsList[0].key;
    },
    onReset() {
      if(utils.isEmpty(this.paramModuleCode)) {
        this.$refs.smComboSelect.selectMd('ALL');
      }
      this.$refs.smComboSelect.selectSmd('ALL');
      // this.selectedCodeValue.COD_CNFG_APPY = { label: '', key: '' };
      this.selectedCodeValue.COD_CNFG_TYPE_SEARCH = { label: '', key: '' };
      // this.selectedCodeValue.COD_CNFG_APPY.key = this.oldApplyKey;
      this.selectedCodeValue.COD_CNFG_TYPE_SEARCH.key = this.oldCondKey;
      this.codCnfgSearchText = '';
    },
    onSearch() {
      const codeValue = this.selectedCodeValue;
      let codeMdle = '';
      let codeSmdle = '';
      // let applyCode = '';
      let searchType = '';
      let searchText = '';

      codeMdle = codeValue.selectedModuleValue.key === 'ALL' ? '' : codeValue.selectedModuleValue.key;
      codeSmdle = codeValue.selectedSubModuleVale.key === 'ALL' ? '' : codeValue.selectedSubModuleVale.key;
      // applyCode = codeValue.COD_CNFG_APPY.key === ' ' ? '' : codeValue.COD_CNFG_APPY.key;
      searchType = codeValue.COD_CNFG_TYPE_SEARCH.key === 'ALL' ? '' : codeValue.COD_CNFG_TYPE_SEARCH.key;
      searchText = utils.trim(this.codCnfgSearchText);

      const queryParams = {
        moduleCode: codeMdle || '',
        subModuleCode: codeSmdle || '',
        // applyCode: applyCode || '',
        searchCondId: searchType || '',
        searchCondText: searchText || '',
      };
      http.request(this.contextPageId, 'DTS_CMZ_00081', {
        query: queryParams,
      }).then(res => {
        const tempData = [];
        const rootNode = {
          id: 'ROOT',
          parentId: '',
          level: 0,
          value: this.$t('MSG_TXT_CNFG'),
        };

        tempData.push(rootNode);

        if (res.data) {
          utils.forEach(res.data, item => {
            tempData.push({
              id: item.configurationId,
              parentId: utils.isEmpty(item.parentsConfigurationId) ? 'ROOT' : item.parentsConfigurationId,
              level: item.hierarchyLevel,
              // value: item.configurationName,
              value: item.configurationMultiLanguageName || '',
            });
          });
        }
        this.dsTreeData.setRawData(tempData);
        this.treeGridExpand();
      }).catch(error => {
        console.log(error);
      });
    },
    treeGridExpand() {
      this.isTreeCollapseAll = false;
      this.$refs.treeGrid.getJqxTreeGrid().expandAll();
      this.onItem({ newSelectedIds: ['ROOT'] });
    },
    treeGridCollapse() {
      this.isTreeCollapseAll = true;
      this.$refs.treeGrid.getJqxTreeGrid().collapseAll();
      this.onItem({ newSelectedIds: ['ROOT'] });
    },
    onItem(node) {
      let selectedId = '';
      if (utils.isEmpty(node.newSelectedIds) === false) {
        [selectedId] = node.newSelectedIds;
      }

      if (utils.isEmpty(selectedId) === true) {
        return;
      }

      const clickedReadNode = utils.find(this.dsTreeData.data, { id: selectedId });
      this.btnEnable = false;
      this.cleanData();
      if (clickedReadNode.level > 1) {
        this.btnEnable = true;
        this.searchDataById(clickedReadNode.id);
      } else {
        this.applyCode = 'A';
        // this.confTypeCode = 'T';
        this.confTypeCode = ''; // 폴더일 경우 text-field hidden
      }
    },
    onClose() {
      // console.log('onClose');
    },
    onSave() {
      let dataParams = {};
      let dataServiceId = 'DTS_CMZ_00073'; // 환경설정 상세 저장
      if (utils.isEqual('A', this.envApplyCode) === true) {
        let confValue = '';

        if (utils.isEqual('F', this.envTypeCode) === true) {
          confValue = this.ynValue;
        } else if (utils.isEqual('C', this.envTypeCode) === true) {
          confValue = this.selectModuleData.key;
        } else {
          confValue = this.dataValue;
        }

        dataParams = {
          configurationId: this.envSetId || '',
          configurationApplyCode: this.envApplyCode || '',
          configurationApplyModuleCode: '',
          configurationApplySubModuleCode: '',
          configurationApplySiteId: '',
          configurationValue: confValue || '',
        };
      } else if (utils.isEqual('M', this.envApplyCode) === true) {
        // 모듈
        dataServiceId = 'DTS_CMZ_00122'; // 모듈 환경설정 상세저장
        const oldData = utils.clone(this.dsMdData.data);

        let isBlankCheck = false;
        utils.forEach(oldData, item => {
          if ((utils.isEmpty(item.moduleName) === true)
             || (utils.isEmpty(item.submoduleName) === true)
             || (utils.isEmpty(item.moduleValue) === true)) {
            isBlankCheck = true;
          }
        });

        if (isBlankCheck === true) {
          const msg = utils.strFormat(this.$t('MSG_ALT_SET_VAL'), this.$t('MSG_TXT_CNFG_VAL'));
          this.conFirm('error', msg, null);
          return;
        }

        let isDuplication = 0;

        utils.forEach(oldData, item => {
          utils.forEach(this.dsMdData.data, targetItem => {
            if ((utils.isEqual(item.moduleName, targetItem.moduleName) === true)
                && (utils.isEqual(item.submoduleName, targetItem.submoduleName) === true)) {
              isDuplication += 1;
            }
          });
        });

        if (this.dsMdData.data.length < isDuplication) {
          this.conFirm('error', this.$t('MSG_ALT_DUPLICATE_EXISTS'), null);
          return;
        }

        const allCheck = [];
        utils.forEach(oldData, item => {
          if (utils.isEqual(this.selCodes.allOption[0].key, item.submoduleName) === true) {
            allCheck.push({ md: item.moduleName });
          }
        });

        isDuplication = 0;
        utils.forEach(allCheck, item => {
          utils.forEach(this.dsMdData.data, targetItem => {
            if (utils.isEqual(item.md, targetItem.moduleName) === true) {
              isDuplication += 1;
            }
          });
        });

        if (isDuplication > 1) {
          const msg = utils.strFormat(this.$t('MSG_ALT_MDLE_NOT_SET'), this.selCodes.allOption[0].label);
          this.conFirm('error', msg, null);
          return;
        }

        const valueList = [];

        utils.forEach(this.dsMdData.data, item => {
          valueList.push({
            moduleCode: item.moduleName,
            smoduleCode: item.submoduleName,
            siteId: '',
            configurationValue: item.moduleValue,
          });
        });

        dataParams = {
          configurationId: this.envSetId || '',
          configurationApplyCode: this.envApplyCode || '',
          configurationApplyModuleCode: this.paramModuleCode,
          configurationApplySubModuleCode: '',
          configurationApplySiteId: '',
          configurationValue: '',
          valueList,
        };
      } else {
        // 사이트
        const oldData = utils.clone(this.dsSiteData.data);

        let isBlankCheck = false;
        utils.forEach(oldData, item => {
          if ((utils.isEmpty(item.siteId) === true)
             || (utils.isEmpty(item.siteValue) === true)) {
            isBlankCheck = true;
          }
        });

        if (isBlankCheck === true) {
          this.conFirm('error', utils.strFormat(this.$t('MSG_TXT_CNFG_VAL'), this.$t('MSG_ALT_SET_VAL')), null);
          return;
        }

        let isDuplication = 0;

        utils.forEach(oldData, item => {
          utils.forEach(this.dsSiteData.data, targetItem => {
            if (utils.isEqual(item.siteId, targetItem.siteId) === true) {
              isDuplication += 1;
            }
          });
        });

        if (this.dsSiteData.data.length < isDuplication) {
          this.conFirm('error', this.$t('MSG_ALT_DUPLICATE_EXISTS'), null);
          return;
        }

        const valueList = [];

        utils.forEach(this.dsSiteData.data, item => {
          valueList.push({
            moduleCode: '',
            smoduleCode: '',
            siteId: item.siteId,
            configurationValue: item.siteValue,
          });
        });

        dataParams = {
          configurationId: this.envSetId || '',
          configurationApplyCode: this.envApplyCode || '',
          configurationApplyModuleCode: '',
          configurationApplySubModuleCode: '',
          configurationApplySiteId: '',
          configurationValue: '',
          valueList,
        };
      }



      http.request(this.contextPageId, dataServiceId, {
        data: dataParams,
      }).then(() => {
        this.conFirm('success', this.$t('MSG_ALT_SAVE_DATA'), null);
      }).catch(error => {
        console.log(error);
      });
    },
    onRowAdd() {
      const dsData = [];
      if (utils.isEqual('S', this.envApplyCode) === true) {
        utils.openLayerPopup('PGE_CMY_00016', this.onSitePopupClose, {
          pageInitialData: {
            multiselect: false,
            siteName: '',
            siteAbbreviationName: '',
          },
          size: 'lg',
        });
      } else {
        if (utils.isEqual('F', this.confTypeCode) === true) {
          dsData.push({
            moduleCode: '',
            moduleName: this.paramModuleCode,
            submoduleCode: '',
            submoduleName: this.smdleCode === '' ? 'ALL' : this.smdleCode,
            moduleValue: 'N',
            typeCode: this.confTypeCode,
          });
        } else if (utils.isEqual('C', this.confTypeCode) === true) {
          dsData.push({
            moduleCode: '',
            moduleName: this.paramModuleCode,
            submoduleCode: '',
            submoduleName: this.smdleCode === '' ? 'ALL' : this.smdleCode,
            moduleValue: this.defaultValue === '' ? 'ALL' : this.defaultValue,
            typeCode: this.confTypeCode,
          });
        } else {
          dsData.push({
            moduleCode: '',
            moduleName: this.paramModuleCode,
            submoduleCode: '',
            submoduleName: this.smdleCode === '' ? 'ALL' : this.smdleCode,
            moduleValue: '',
            typeCode: this.confTypeCode,
          });
        }

        this.dsMdData.addRows(dsData);
      }
    },
    onRowDel() {
      if (utils.isEqual('S', this.envApplyCode) === true) {
        if (this.dsSiteData.data.length > 0) {
          const selectedIndexes = this.dsSiteData.getSelectedIndexes();
          this.dsSiteData.deleteRows(selectedIndexes);
        }
      } else if (this.dsMdData.data.length > 0) {
        const selectedIndexes = this.dsMdData.getSelectedIndexes();
        this.dsMdData.deleteRows(selectedIndexes);
      }
    },
    onSitePopupClose(objSite) {
      if (objSite != null && utils.isEmpty(objSite) === false && objSite.length > 0) {
        const { siteId, siteName } = objSite[0];

        const dsData = [];
        if (utils.isEqual('F', this.confTypeCode) === true) {
          dsData.push({
            siteId,
            siteName,
            siteValue: this.defaultValueName,
            typeCode: this.confTypeCode,
          });
        } else if (utils.isEqual('C', this.confTypeCode) === true) {
          dsData.push({
            siteId,
            siteName,
            siteValue: 'CMZ',
            typeCode: this.confTypeCode,
          });
        } else {
          dsData.push({
            siteId,
            siteName,
            siteValue: '',
            typeCode: this.confTypeCode,
          });
        }
        this.dsSiteData.addRows(dsData);
      }
    },
    load() {
      this.applyCode = 'A';
      this.confTypeCode = 'T';
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    cleanData() {
      this.mdleCode = '';
      this.mdleName = '';
      this.smdleCode = '';
      this.smdleName = '';
      this.envSetName = '';
      this.envSetId = '';
      this.envApplyCode = '';
      this.envApplyCodeId = '';
      this.envApplyName = '';
      this.envTypeCode = '';
      this.contents = '';
      this.defaultValue = '';
      this.defaultValueName = '';
      this.dataValue = '';
      this.regDTM = '';
      this.btnEnable = false;
      this.applyCode = 'A';
      this.columnDatas = [];
      this.displayLangId = '';
      this.displayKnoxId = '';
      this.displayUserName = '';
      this.displayUserGlobalName = '';
      this.displayDeptName = '';
      this.displayDeptEngName = '';

      setTimeout(() => {
        this.saveSnapshot(this.makeSnapshot());
      }, 1000);
    },
    searchDataById(id) {
      http.request(this.contextPageId, 'DTS_CMZ_00071', {
        path: { 'configuration-id': id },
        query: {
          applyModuleCode: this.paramModuleCode,
        }
      }).then(res => {
        if (res.data) {
          this.moduleData = [];
          this.defaultValueName = '';

          this.mdleCode = utils.trim(res.data.moduleCode);
          this.mdleName = res.data.moduleName;
          this.smdleCode = utils.trim(res.data.subModuleCode);
          this.smdleName = res.data.subModuleName;
          this.envSetName = res.data.configurationName;
          this.envSetId = utils.trim(res.data.configurationId);
          this.envApplyCode = utils.toUpper(utils.trim(res.data.configurationApplyCode));
          this.envApplyCodeId = utils.trim(res.data.configurationApplyCodeId);
          this.envApplyName = res.data.configurationApplyCodeName;
          this.envTypeCode = res.data.configurationTypeCode;
          this.contents = res.data.configurationContent;
          this.defaultValue = res.data.configurationDefaultValue;

          this.displayLangId = res.data.dsplLangId;
          this.displayKnoxId = res.data.knoxId;
          this.displayUserName = res.data.userName;
          this.displayUserGlobalName = res.data.userGlobalName;
          this.displayDeptName = res.data.deptName;
          this.displayDeptEngName = res.data.deptGlobalName;

          this.regDTM = utils.dateformatToClient(res.data.finalModificationDTM);

          this.applyCode = this.envApplyCode;

          this.confTypeCode = utils.toUpper(this.envTypeCode);

          this.subModuleList = [];

          if (utils.isEqual('F', this.confTypeCode) === true) {
            if (utils.isEqual('Y', this.defaultValue) === true) {
              if (utils.isEqual('A', this.envApplyCode) === true) {
                this.defaultValueName = this.$t('MSG_TXT_YES');
              } else {
                this.defaultValueName = 'Y';
              }
            } else if (utils.isEqual('A', this.envApplyCode) === true) {
              this.defaultValueName = this.$t('MSG_TXT_NO');
            } else {
              this.defaultValueName = 'N';
            }
          } else if (utils.isEqual('C', this.confTypeCode) === true) {
            if (utils.isEqual('M', this.envApplyCode) === true) {
              this.defaultValueName = res.data.configurationDefaultValueName;
            } else {
              utils.forEach(res.data.modules, md => {
                if (utils.isEqual(this.defaultValue, md.configurationApplyModuleCode) === true) {
                  this.defaultValueName = md.configurationApplyModuleName;
                }
              });
            }
          } else {
            this.defaultValueName = this.defaultValue;
          }

          if (utils.isEqual('A', this.envApplyCode) === true) {
            const subValue = res.data.dataValue;

            if (utils.isEqual('F', this.confTypeCode) === true) {
              if (utils.isEmpty(subValue) === false) {
                this.ynValue = subValue;
              } else {
                this.ynValue = 'Y';
              }
            } else if (utils.isEqual('C', this.confTypeCode) === true) {
              if (utils.isEmpty(subValue) === false) {
                this.selectModuleData.key = subValue;
              }

              utils.forEach(res.data.modules, md => {
                this.moduleData.push({ label: md.configurationApplyModuleName, key: md.configurationApplyModuleCode });
              });
            } else {
              this.defaultValueName = this.defaultValue;
              this.dataValue = subValue;
            }
          } else if (utils.isEqual('S', this.envApplyCode) === true) {
            // Site
            this.moduleData = [];
            if (utils.isEqual('C', this.confTypeCode) === true) {
              utils.forEach(res.data.modules, md => {
                this.moduleData.push({ label: md.configurationApplyModuleName, key: md.configurationApplyModuleCode });
              });
            }

            const dsData = [];
            utils.forEach(res.data.sites, site => {
              dsData.push({
                siteId: site.configurationApplySiteId,
                siteName: site.configurationApplySiteName,
                siteValue: site.configurationValue,
                typeCode: this.confTypeCode,
              });
            });

            this.dsSiteData.setRawData(dsData);
          } else {
            // Module
            this.moduleData = [];
            utils.forEach(res.data.modules, md => {
              this.moduleData.push({ label: md.configurationApplyModuleName, key: md.configurationApplyModuleCode });
            });

            utils.forEach(res.data.smodules, smdList => {
              const smds = [];
              utils.forEach(smdList, smd => {
                smds.push({ label: smd.configurationApplyModuleName, key: smd.configurationApplyModuleCode });
              });
              smds.push({ label: this.selCodes.allOption[0].label, key: this.selCodes.allOption[0].key });
              this.subModuleList.push(smds);
            });

            this.moduleValueData = [];
            utils.forEach(res.data.valueList, valueData => {
              this.moduleValueData.push({ label: valueData.codeName, key: valueData.codeValidityValue });
            });

            const dsData = [];
            utils.forEach(res.data.moduleInfos, md => {
              dsData.push({
                moduleCode: '',
                moduleName: md.configurationApplyModuleCode,
                submoduleCode: '',
                submoduleName: md.configurationApplySubModuleCode,
                moduleValue: md.configurationValue,
                typeCode: this.confTypeCode,
              });
            });

            this.dsMdData.setRawData(dsData);
          }
          setTimeout(() => {
            this.saveSnapshot(this.makeSnapshot());
          }, 1000);
        } else {
          this.cleanData();
        }
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>
