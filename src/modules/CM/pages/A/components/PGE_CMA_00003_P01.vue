<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
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
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="condContent"
              maxlength="50"
              @keyup="onKeyUpInput"
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
            ref="grdLeft"
            :headers="gridColumnsLeft"
            :data-source="dsDataLeft"
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
                @click="onClickRight"
              />
            </li>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_left"
                :disabled="btnTargetStatus"
                @click="onClickLeft"
              />
            </li>
          </ul>
        </div>
        <div class="inbox">
          <sui-s-grid
            ref="grdRight"
            :headers="gridColumnsRight"
            :data-source="dsDataRight"
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
        @click="onClickClose"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        v-permission:create="'PGE_CMA_00003'"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
import {urDataSet} from 'uidev-component/index.js';
export default {
  name: 'PGE_CMA_00003_P01', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: null,
    },
    userGroupId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedValues: {
        COD_ROLE_SRCH_COND: {
          label: '',
          key: '',
        },
        COD_ROLE_CATG : { 
          label: '',
          key:'', 
        },
      },
      // Search Box
      searchBox: {
        COD_PAGE_UE: {
          label: '',
          key: '',
        },
      },
      searchFieldOldText: '',
      selected3rdBizCode: '',
      selectedBizCode: [],
      localdata0: [],
      localdata1: [],
      condContent: '',
      roleCategoryKey: '',
      dsDataLeft: new urDataSet(),
      dsDataRight: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
      },
      btnOrginStatus: true,
      btnTargetStatus: true,
    };
  },
  computed: {},
  watch: {
    userGroupId(obj) {
      if (obj) {
        this.selectDataFormInput();
      }
    },
  },
  created() {
    this.gridColumnsLeft = [
      {
        text: this.$t('MSG_TXT_ROLE_CATG'),
        value: 'roleCategoryName',
      },
      {
        text: this.$t('MSG_TXT_ROLE_ID'),
        value: 'roleId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_ROLE_NAME'),
        value: 'roleName',
      },
    ];
    this.gridColumnsRight = [
      {
        text: this.$t('MSG_TXT_ROLE_CATG'),
        value: 'roleCategoryName',
      },
      {
        text: this.$t('MSG_TXT_ROLE_ID'),
        value: 'roleId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_ROLE_NAME'),
        value: 'roleName',
      },
    ];
  },
  mounted() {
    this.selectDataFormInput();
  },

  methods: {
    onReset() {
      this.$refs.condType.reset();
      this.$refs.roleCategory.reset();
      this.condContent = '';
    },
    onClickClose() {
      this.$emit('onClickCancel', 'isShownPopupRole');
    },
    onClickSave() {
      this.onSave();
    },
    onSave() {
      const dataParams = {
        userGroupRoleList: this.dsDataRight.data,
        // userGroupRoleDeleteList: this.dsDataTemp.data,
      };

      http.request(this.pageId, 'DTS_CMA_00016', {
        data: dataParams,
        path: {
          'user-group-id': this.userGroupId,
        },
      }).then(() => {
        this.$emit('onRowReSelect');
        this.onClickClose();
      }).catch(error => {
        console.log(error);
      });
    },
    onConfirmCancel() {
    },
    onChangeBizCodes(optList) {
      this.selectedBizCode = optList;
    },
    onRoleCategoryLoaded(optionsList) {
      this.roleCategoryKey = optionsList[0].key;
      this.selectedValues.COD_ROLE_CATG.key = optionsList[0].key;
    },     
    onSearch() {
      const roleCategoryCode = utils.trim(this.selectedValues.COD_ROLE_CATG.key);
      const condTypeCode = this.selectedValues.COD_ROLE_SRCH_COND.key;
      const queryParams = {
        roleCategoryCode: roleCategoryCode || '',
        searchCond: condTypeCode || '',
        searchWord: this.condContent || '',
      };

      http.request(this.pageId, 'DTS_CMA_00001', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          this.dsDataLeft.setData(res.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onClickRight() {

      if (this.dsDataLeft.data.length > 0) {
        const selectedData = this.dsDataLeft.getSelected();
        utils.forEach(selectedData, item => {
          if (!this.isExistData(this.dsDataRight.data, item)) {
            this.dsDataRight.addRow({
              roleId: utils.trim(item.roleId),
              roleName: utils.trim(item.roleName),
              roleCategoryCode: utils.trim(item.roleCategoryCode),
              roleCategoryName: utils.trim(item.roleCategoryName),
            });
          }
        });
        this.$refs.grdLeft.resetSelect();
        this.$refs.grdRight.resetSelect();
      }
    },
    onClickLeft() {
      const selected = this.dsDataRight.getSelected();
      utils.forEach(selected, item => {
        this.dsDataRight.removeRow(item, false);
      });
      this.$refs.grdRight.resetSelect();
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
    onClose() {
      console.log('close');
    },
    selectDataFormInput() {
      http.request(this.pageId, 'DTS_CMA_00011', {
        path: {
          'user-group-id': this.userGroupId,
        },
      }).then(res => {
        if (res.data) {
          if (res.data.length > 0) {
            this.dsDataRight.setData(res.data);
          } else {
            this.dsDataRight.setData([]);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    isExistData(dataList, selectedData) {
      const isExist = _.some(dataList, { 
        roleId: selectedData.roleId,
      });
      return isExist;
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
