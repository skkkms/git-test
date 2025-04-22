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
              :selected="searchFrame.roleCategoryCode"
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
              ref="searchCond"
              :selected="searchFrame.searchCond"
              codeId="COD_ROLE_SRCH_COND"
              defaultOption="all"
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="searchFrame.searchWord"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearchClick"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Reset "
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
      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div class="inbox">

          <sui-s-grid
            ref="grid0"
            :showRowsPerPageControl="false"
            :multiselect="true"
            :headers="gridColumns0"
            :options="options"
            :data-source="ds0"
          />
        </div>
        <div class="btnbox">
          <ul>
            <li>
              <sui-button
                v-permission:update="this.$options.name"
                type="button"
                class="comm_btn_shut_right"
                :disabled="rightShiftEnable"
                @click="onAddClick"
              />
            </li>
            <li>
              <sui-button
                v-permission:update="this.$options.name"
                type="button"
                class="comm_btn_shut_left"
                :disabled="leftShiftEnable"
                @click="onDeleteClick"
              />
            </li>
          </ul>
        </div>
        <div class="inbox">
          <sui-s-grid
            ref="grid1"
            :showRowsPerPageControl="false"
            :multiselect="true"
            :headers="gridColumns1"
            :options="options"
            :data-source="ds1"
          />
          <div class="btn_wrap">
            <div class="info">
              {{ $t('MSG_TXT_PRMSN_LVL_DESC') }}
            </div>
          </div>
        </div>
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="closePagePopup(false)"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:update="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import Vue from 'vue';
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index';

const EventBus = new Vue();

export default {
  name: 'PGE_CMU_00014', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
    closePagePopup: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      searchFrame: {
        searchCond: {
          key: '',
          label: '',
        },
        roleCategoryCode: {
          key: '',
          label: '',
        },
        searchWord: '',
        searchFieldOldText: '',
      },
      options: {
        infinityScroll: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      ds0: new urDataSet(),
      ds1: new urDataSet(),
      localdata0: [],
      localdata1: [],
      selectedPageId: '',
      selectPermissionLevel: 1,
      pmsDisableFlag: false,
      disabledYn: 'N',
      rightShiftEnable: false,
      leftShiftEnable: false,
      roleCategoryKey: '',
    };
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created(){

    const that = this;
    this.gridColumns0 = [{
        text: this.$t('MSG_TXT_ROLE_ID'),
        value: 'roleId',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_ROLE_NAME'),
        value: 'roleName',
      }, {
        text: this.$t('MSG_TXT_ROLE_ALIAS'),
        value: 'roleNickName',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_ROLE_CATG'),
        value: 'roleCategoryName',
        width: 150,
      }]

      this.gridColumns1 = [{
        text: this.$t('MSG_TXT_ROLE_ID'),
        value: 'roleId',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_ROLE_NAME'),
        value: 'roleName',
      }, {
        text: this.$t('MSG_TXT_ROLE_ALIAS'),
        value: 'roleNickName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_ALL'),
        value: 'permissionAll',

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
        width: 150,
        filterable: false,
        sortable: false,
        menu: false,
      }];
  },
  mounted() {
    this.$nextTick(() => {
      this.selectedPageId = this.pageInitialData.selectedPageId;
      this.selectPermissionLevel = this.pageInitialData.selectPermissionLevel;
      this.pmsDisableFlag = this.pageInitialData.pmsDisableFlag;
      this.disabledYn = this.pageInitialData.disabledYn;
      if (!this.pmsDisableFlag) {
        this.pmsDisableFlag = false;
      }
      if (utils.isEmpty(this.selectPermissionLevel)) {
        this.selectPermissionLevel = 1;
      }
      if (utils.isEmpty(this.disabledYn)) {
        this.disabledYn = 'N';
      }
      if (!utils.isEmpty(this.selectedPageId)) {
        this.rolePageListLoad();
      }
    });
  },

  methods: {
    rolePageListLoad() {
      http.request(this.$options.name, 'DTS_CMA_00040', {
        query: {
          roleObjectId: this.selectedPageId,
          roleObjectTypeCode: 'P',
        },
      }).then(res => {
        utils.forEach(res.data, data => {
          const { roleName, roleNickName } = data.roleInfo;
          utils.assign(data, {
            roleName,
            roleNickName,
          });
        });
        this.ds1.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    UpdatePermissionLevel(row) {
      this.ds1.data[row.__idx] = row;
    },
    onRoleCategoryLoaded(optionsList) {
      this.roleCategoryKey = optionsList[0].key;
      this.selectedValues.roleCategoryCode.key = optionsList[0].key;
    },     
    onResetClick() {
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'searchCond')) {
          this.$refs.searchCond.reset();
        } else if(utils.isEqual(key, 'roleCategoryCode')){
          this.$refs.roleCategory.reset();
        } else {
          this.searchFrame[key] = '';
        }
      });
    },
    getSearchData() {
      const data = {};
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'searchCond')) {
          data[key] = value.key;
        } else if(utils.isEqual(key, 'roleCategoryCode')){
          data[key] = value.key;
        } else{
          data[key] = value;
        }
      });
      return data;
    },
    onSearchClick() {
      const searchData = this.getSearchData();
      http.request(this.$options.name, 'DTS_CMA_00001', {
        query: searchData,
      }).then(res => {
        this.ds0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    onAddClick() {
      const selectedRows = this.ds0.getSelected();
      selectedRows.forEach(selectedRow => {
        // eslint-disable-next-line max-len
        if (utils.findIndex(this.ds1.data, { roleId: selectedRow.roleId, roleName: selectedRow.roleName }) === -1) {
          // eslint-disable-next-line no-param-reassign
          selectedRow.permissionLevel = 0;
          // eslint-disable-next-line no-param-reassign
          selectedRow.permissionAll = 'N';
          this.ds1.addRow(selectedRow);
        }
      });

      this.$refs.grid0.$nextTick(() => {
        this.ds1.setSelectAll();
        this.ds1.removeSelected();
        this.ds0.setSelectAll();
        this.ds0.removeSelected();
      });

    },
    onDeleteClick() {
      const selected = this.ds1.getSelected();
      this.ds1.removeRows(selected);
    },
    getSaveData(datasetList) {
      const list = [];
      if (datasetList.length > 0) {
        utils.forEach(datasetList, data => {
          list.push({
            roleId: data.roleId,
            roleObjectId: this.selectedPageId,
            roleObjectTypeCode: 'P',
            permissionLevel: data.permissionLevel,
          });
        });
      } else {
        list.push({
          roleId: '',
          roleObjectId: this.selectedPageId,
          roleObjectTypeCode: 'P',
        });
      }
      return list;
    },
    onSaveClick() {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
      (/* ok */) => {
        const saveData = this.getSaveData(this.ds1.data);
        http.request(this.$options.name, 'DTS_CMA_00041', {
          path: {
            'role-object-id': this.selectedPageId,
          },
          data: saveData,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            this.closePagePopup(true);
          });
        }).catch(error => {
          console.log(error);
        });
      },(/* cancel */) => {});
    },
    permissionDisableState(rowData) {
      return this.pmsDisableFlag ? true :  utils.isEmpty(rowData) ? false : utils.isEqual(rowData.permissionAll, 'Y' );
    },
    /**
     * 검색조건 특수문자 입력 제한
     */
    onKeyUpInput() {
      const searchFieldNewText = this.searchFrame.searchWord;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.searchFrame.searchWord = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    gridRowSelect(obj) {
      setTimeout(() => {
        const shiftBtnDisable = this.$refs[obj].ds.selectedRowIds.length > 0 ? false : true;
        if (obj === 'grid0') {
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
