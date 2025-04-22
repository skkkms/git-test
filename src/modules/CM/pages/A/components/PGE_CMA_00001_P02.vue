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
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              :customMdList="codes.allOption"
              :customSmdList="codes.selOption"
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
              :selected="frame0.selectData.COD_PAGE_SEARCH_COND"
              codeId="COD_PAGE_SEARCH_COND"
              :defaultOption="'all'"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="frame0.selectData.searchText"
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
            :showRowsPerPageControl="false"
            :multiselect="true"
            :headers="gridOrgColumns"
            :options="options"
            :data-source="dsOrgData"
          />
        </div>
        <div class="btnbox">
          <ul>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_right"
                :disabled="rightShiftEnable"
                @click="onRightShift"
              />
            </li>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_left"
                :disabled="leftShiftEnable"
                @click="onLeftShift"
              />
            </li>
          </ul>
        </div>
        <div class="inbox">
          <sui-s-grid
            ref="grdTartList"
            :showRowsPerPageControl="false"
            :multiselect="true"
            :headers="gridTarColumns"
            :options="options"
            :data-source="dsTarData"
          />
          <div class="btn_wrap">
            <div class="info">
              {{ $t('MSG_TXT_PRMSN_LVL_DESC') }}
            </div>
          </div>
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

import Vue from 'vue';
import { urDataSet } from 'uidev-component/index';

const EventBus = new Vue();

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
      // eslint-disable-next-line new-cap
      dsOrgData: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsTarData: new urDataSet(),
      CheckBoxVal: 'N',
      multirefs: [],
      options: {
        infinityScroll: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_PAGE_SEARCH_COND: {
            label: '',
            key: '',
          },
          searchText: '',
        },
      },
      localorgdata: [],
      localtardata: [],
      searchFieldOldText: '',
      rightShiftEnable: false,
      leftShiftEnable: false,
      pmsDisableFlag: false,
      disabledYn: 'N',
    };
  },
  computed: {},
  watch: {},
  created() {
    const that = this;
    this.gridOrgColumns = [{
      text: this.$t('MSG_TXT_PAGE_ID'),
      value: 'pageId',
      width: 150,
    },
    {
      text: this.$t('MSG_TXT_PAGE_NM'),
      value: 'pageName',
    }];
    this.gridTarColumns = [{
      text: this.$t('MSG_TXT_PAGE_ID'),
      value: 'pageId',
      width: 150,
    }, {
      text: this.$t('MSG_TXT_PAGE_NM'),
      value: 'pageName',
    }, {
      text: this.$t('MSG_TXT_ALL'),
      value: 'permissionAll',
      width: '40px',

      component: {
        props: ['row', 'value'],
        template:
          `<cmp-cell-checkbox
              ref="cellPermission1"
              :value = "value"
              @input="update"
          />`,
        methods: {
          update() {
            EventBus.$emit('uppdate', this.row.__idx);
            that.UpdatePermissionLevel(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_PRMSN_LVL'),
      value: 'permissionLevel',

      component: {
        props: ['row', 'value'],
        template:
        `<cmp-cell-permission-check
          ref="cellPermission"
          :value="this.row.permissionLevel"
          :disabled = "this.row.permissionAll === 'Y'"
          @changePermission="update"
        />`,
        created() {
        // Sets up the Event Bus listener using
        // the custom event name and assosciates
        // it with a component method.
          EventBus.$on('uppdate', data => {
            if (this.row.__idx === data) {
              if (this.row.permissionAll === 'N') {
                this.$refs.cellPermission.setValue(63);
                this.$refs.cellPermission.disable = false;
                this.row.permissionLevel = 63;
                this.row.permissionAll = 'Y';
              } else {
                this.$refs.cellPermission.setValue(0);
                this.$refs.cellPermission.disable = true;
                this.row.permissionLevel = 0;
                this.row.permissionAll = 'N';
              }
            }
          });
        },
        destroyed() {
          // Removes Event Bus listener upon removal
          // of template from DOM.
          EventBus.$off('uppdate');
        },
        methods: {
          // eslint-disable-next-line camelcase
          update(emited_val) {
            // eslint-disable-next-line camelcase
            this.row.permissionLevel = emited_val;
            that.UpdatePermissionLevel(this.row);
          },
        },
      },
    }];
  },
  mounted() {
    if (this.dataList) {
      this.roleId = this.dataList[0].roleId;
      this.onSearchMappedPage();
    }
  },
  methods: {
    UpdatePermissionLevel(row) {
      this.dsTarData.data[row.__idx] = row;
    },
    UpdatePermissionAll(row) {
      this.dsTarData.data[row.__idx].permissionAll = row.permissionAll;
    },
    onReset() {
      this.frame0.selectData.COD_MDLE.key = 'ALL';
      this.frame0.selectData.COD_SMDLE.key = 'ALL';
      this.$refs.searchCond.reset();
      this.frame0.selectData.searchText = '';
    },
    onSearch() {
      const queryParams = {
        moduleCode: utils.trim(this.frame0.selectData.COD_MDLE.key),
        subModuleCode: utils.trim(this.frame0.selectData.COD_SMDLE.key),
        searchPageCond: utils.trim(this.frame0.selectData.COD_PAGE_SEARCH_COND.key),
        searchPageText: utils.trim(this.frame0.selectData.searchText),
      };

      http.request(this.parentPageId, 'DTS_CMU_00002', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          this.dsOrgData.setData(res.data);
        }
      });
    },
    onSearchMappedPage() {
      http.request(this.parentPageId, 'DTS_CMA_00034', {
        path: { 'role-id': this.roleId },
      }).then(res => {
        if (res.data) {
          utils.forEach(res.data, row => {
            // eslint-disable-next-line no-param-reassign
            row.permissionAll = 'N';
          });
          this.dsTarData.setData(res.data);
        }
      });
    },
    onRightShift() {
      const selectedRows = this.dsOrgData.getSelected();
      selectedRows.forEach(selectedRow => {
        // eslint-disable-next-line max-len
        if (utils.findIndex(this.dsTarData.data, { pageId: selectedRow.pageId, pageName: selectedRow.pageName }) === -1) {
          // eslint-disable-next-line no-param-reassign
          selectedRow.permissionLevel = 0;
          // eslint-disable-next-line no-param-reassign
          selectedRow.permissionAll = 'N';
          this.dsTarData.addRow(selectedRow);
        }
      });

      this.$refs.grdOrgList.$nextTick(() => {
        this.dsTarData.setSelectAll();
        this.dsTarData.removeSelected();
        this.dsOrgData.setSelectAll();
        this.dsOrgData.removeSelected();
      });
    },
    onLeftShift() {
      const selected = this.dsTarData.getSelected();
      this.dsTarData.removeRows(selected);
    },
    permissionDisableState(rowData) {
      // eslint-disable-next-line no-nested-ternary
      return this.pmsDisableFlag ? true : utils.isEmpty(rowData) ? false : utils.isEqual(rowData.permissionAll, 'Y');
    },
    onCancel() {
      this.$emit('cancel', '');
    },

    onSave() {
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, () => {
        const saveList = [];
        utils.forEach(this.dsTarData.data, data => {
          const dataInfo = {
            roleId: this.roleId,
            roleObjectId: data.pageId,
            roleObjectTypeCode: 'P',
            permissionLevel: data.permissionLevel,
          };
          saveList.push(dataInfo);
        });

        const dataParams = {
          rolePageList: saveList,
        };

        http.request(this.parentPageId, 'DTS_CMA_00035', {
          path: { 'role-id': this.roleId },
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.$emit('save', 'saved');
        });
      });
    },
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.selectData.searchText;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.frame0.selectData.searchText = this.searchFieldOldText;
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
    gridRowSelect(obj) {
      setTimeout(() => {
        const shiftBtnDisable = this.$refs[obj].ds.selectedRowIds.length > 0 ? false : true;
        if (obj === 'grdOrgList') {
          this.rightShiftEnable = shiftBtnDisable;
        } else {
          this.leftShiftEnable = shiftBtnDisable;
        }
      }, 2);
    },
  },
};
</script>
<style scoped>
</style>
