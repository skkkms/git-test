<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
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
              ref="smComboFrame0"
              :pageId="this.$options.name"
              :selectedMd="selectData.COD_MDLE"
              :selectedSmd="selectData.COD_SMDLE"
              :customMdList="codes.allOption"
              :customSmdList="codes.allOption"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-code-select
              ref="searchCond"
              :selected="selectData.COD_DTSVC_SEARCH_COND"
              codeId="COD_DTSVC_SEARCH_COND"
              :defaultOption="'all'"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="selectData.searchText"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput"
            />
          </div>
          <div class="btn_wrap">
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
      </div>
      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <sui-s-grid
            ref="grdOrgList"
            :headers="gridOrgColumns"
            :data-source="dsOrgData"
            :showRowsPerPageControl="false"
            :options="options"
            @grid:selected="onSelectOriginGrid"
          />
        </div>
        <div class="btnbox">
          <ul>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_right"
                :disabled="btnOrginStatus"
                @click="onRightShift"
              />
            </li>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_left"
                :disabled="btnTargetStatus"
                @click="onLeftShift"
              />
            </li>
          </ul>
        </div>
        <div class="inbox">
          <sui-s-grid
            ref="grdTartList"
            :headers="gridTarColumns"
            :data-source="dsTarData"
            :showRowsPerPageControl="false"
            :options="options"
            @grid:selected="onSelectTargetGrid"
          />
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onCancel"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        v-permission:create="'PGE_CMA_00001'"
        type="button"
        class="comm_btn_solid"
        @click="onSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMA_00001_P02', // eslint-disable-line vue/name-property-casing
  props: {
    parentPageId: {
      type: String,
      default: 'PGE_CMA_00001',
    },
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      roleId: '',
      codes: CommonConstants.selectOptions(),
      selectData: {
        COD_MDLE: {
          label: '',
          key: '',
        },
        COD_SMDLE: {
          label: '',
          key: '',
        },
        COD_DTSVC_SEARCH_COND: {
          label: '',
          key: '',
        },
        searchText: '',
      },
      localorgdata: [],
      localtardata: [],
      dsOrgData: new urDataSet(),
      dsTarData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
      },
      searchFieldOldText: '',
      btnOrginStatus: true,
      btnTargetStatus: true,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gridOrgColumns = [
      {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'roleObjectId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'roleObjectName',
      },
    ];
    this.gridTarColumns = [
      {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'roleObjectId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'roleObjectName',
      },
    ];
  },
  mounted() {
    if (this.dataList) {
      this.roleId = this.dataList[0].roleId;

      // if (this.dataList[1].data.length > 0) {
      //   utils.forEach(this.dataList[1].data, data => {
      //     const dataInfo = {
      //       roleId: this.roleId,
      //       roleUserId: data.userGroupId,
      //       deleteYn: 'Y',
      //     };
      //     this.deleteList.push(dataInfo);
      //   });

      //   this.dsTarData.setRawData(this.dataList[1].data);
      // }
      http.request(this.parentPageId, 'DTS_CMA_00042', {
        path: {
          'role-id': this.roleId,
        },
      }).then(res => {
        if (res.data) {
          this.dsTarData.setData(res.data);
        }
      });
    }

    // this.onSearch();
  },

  methods: {
    onReset() {
      // this.$refs.smComboFrame0.reset();
      this.selectData.COD_MDLE.key = 'ALL';
      this.selectData.COD_SMDLE.key = 'ALL';
      this.$refs.searchCond.reset();
      this.selectData.searchText = '';
    },
    onSearch() {
      const queryParams = {
        moduleCode: utils.trim(this.selectData.COD_MDLE.key),
        subModuleCode: utils.trim(this.selectData.COD_SMDLE.key),
        dataServiceTypeCode: '',
        dataServiceStateCode: '',
        dataServiceUseYn: '',
        dataServiceSearchCond: utils.trim(this.selectData.COD_DTSVC_SEARCH_COND.key),
        dataServiceSearchWord: utils.trim(this.selectData.searchText),
      };

      http.request(this.parentPageId, 'DTS_CMU_00007', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          const orgData = [];
          utils.forEach(res.data, obj => {
            // if (this.isExistData(this.dsTarData.data, obj.dataServiceIdentification) === false) {
            const objData = {
              roleId: this.roleId,
              roleObjectId: utils.trim(obj.dataServiceIdentification),
              roleObjectName: utils.trim(obj.dataServiceName),
              roleObjectTypeCode: 'D',
              permissionLevel: '0',
              moduleCode: utils.trim(obj.moduleCode),
              moduleName: utils.trim(obj.moduleName),
              subModuleCode: utils.trim(obj.subModuleCode),
              subModuleName: utils.trim(obj.subModuleName),
            };
            orgData.push(objData);
          //  }
          });

          this.dsOrgData.setData(orgData);
        }
      });
    },
    onRightShift() {
      if (this.dsOrgData.data.length > 0) {
        const selectedData = this.dsOrgData.getSelected();
        utils.forEach(selectedData, item => {
          if (!this.isExistData(this.dsTarData.data, item)) {
            this.dsTarData.addRow({
              roleId: item.roleId,
              roleObjectId: item.roleObjectId,
              roleObjectName: item.roleObjectName,
              roleObjectTypeCode: item.roleObjectTypeCode,
              permissionLevel: item.permissionLevel,
              moduleCode: item.moduleCode,
              moduleName: item.moduleName,
              subModuleCode: item.subModuleCode,
              subModuleName: item.subModuleName,
            });
          }
        });
        this.$refs.grdOrgList.resetSelect();
        this.$refs.grdTartList.resetSelect();
      }
    },
    onLeftShift() {
      const selected = this.dsTarData.getSelected();
      utils.forEach(selected, item => {
        this.dsTarData.removeRow(item, false);
      });
      this.$refs.grdTartList.resetSelect();
    },
    onCancel() {
      this.$emit('cancel', '');
    },
    onSave() {
      const dtsvcList = [];
      utils.forEach(this.dsTarData.data, data => {
        const dataInfo = {
          roleId: data.roleId,
          roleObjectId: data.roleObjectId,
          roleObjectTypeCode: data.roleObjectTypeCode,
          permissionLevel: data.permissionLevel,
          moduleCode: data.moduleCode,
          subModuleCode: data.subModuleCode,
        };
        dtsvcList.push(dataInfo);
      });

      // let delRoleId = '';
      // if (this.deleteList.length) {
      //   delRoleId = this.deleteList[0].roleId;
      // }

      const dataParams = {
        "delRoleId" : this.roleId,
        dtsvcList,
      };

      http.request(this.parentPageId, 'DTS_CMA_00043', {
        path: { 'role-id': this.roleId },
        data: dataParams,
      }).then(() => {
        this.$emit('save', 'saved');
      }).catch(error => {
        console.log(error);
      });
    },
    isExistData(dataList, selectedData) {
      const isExist = _.some(dataList, { 
        roleObjectId: selectedData.roleObjectId,  
      });
      return isExist;
    },
    onKeyUpInput() {
      const searchFieldNewText = this.selectData.searchText;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.selectData.searchText = this.searchFieldOldText;
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
    onSelectOriginGrid(row) {
      if (!utils.isEmpty(row)) {
        this.btnOrginStatus = false;
      } else {
        this.btnOrginStatus = true;
      }
    },
    onSelectTargetGrid(row) {
      if (!utils.isEmpty(row)) {
        this.btnTargetStatus = false;
      } else {
        this.btnTargetStatus = true;
      }
    },
  },
};
</script>

  <style scoped>
  </style>
