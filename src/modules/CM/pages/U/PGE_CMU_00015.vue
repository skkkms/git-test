<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents style="padding-bottom:20px">
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
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
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
            :headers="gridColumns0"
            :data-source="ds0"
            :options="options"
            :showRowsPerPageControl="false"
            :multiselect="true"
            @grid:selected="onSelectOriginGrid"
          />
        </div>
        <div class="btnbox">
          <ul>
            <li>
              <sui-button
                v-permission:update="this.$options.name"
                type="button"
                class="comm_btn_shut_right"
                :disabled="btnOrginStatus"
                @click="onAddClick"
              />
            </li>
            <li>
              <sui-button
                v-permission:update="this.$options.name"
                type="button"
                class="comm_btn_shut_left"
                :disabled="btnTargetStatus"
                @click="onDeleteClick"
              />
            </li>
          </ul>
        </div>
        <div class="inbox">
          <sui-s-grid
            ref="grid1"
            :headers="gridColumns1"
            :data-source="ds1"
            :options="options"
            :showRowsPerPageControl="false"
            :multiselect="true"
            @grid:selected="onSelectTargetGrid"
          />
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
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00015', // eslint-disable-line vue/name-property-casing
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
      ds0: new urDataSet(),
      ds1: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      searchFrame: {
        searchCond: {
          key: '',
          label: '',
        },
        searchWord: '',
        roleCategoryCode : { key:'', label: ''}
      },
      roleObjectId: '',
      roleObjectTypeCode: '',
      roleCategoryKey: '',
      searchFieldOldText: '',
      btnOrginStatus: true,
      btnTargetStatus: true,
    };
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created()  {
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_ROLE_ID'),
      value: 'roleId',
      width: 150,
    }, {
      text: this.$t('MSG_TXT_ROLE_NAME'),
      value: 'roleName',
    }, {
      text: this.$t('MSG_TXT_ROLE_ALIAS'),
      value: 'roleNickName',
    }, {
      value: 'roleCategoryName',
      text: this.$t('MSG_TXT_ROLE_CATG'),
    },];
    this.gridColumns1 = [{
      text: this.$t('MSG_TXT_ROLE_ID'),
      value: 'roleId',
      width: 150,
    }, {
      text: this.$t('MSG_TXT_ROLE_NAME'),
      value: 'roleName',
    }, {
      text: this.$t('MSG_TXT_ROLE_ALIAS'),
      value: 'roleNickName',
    }];
  },
  mounted() {
    this.$nextTick(() => {
      this.roleObjectId = this.pageInitialData.roleObjectId;
      this.roleObjectTypeCode = this.pageInitialData.roleObjectTypeCode;
      if (!utils.isEmpty(this.roleObjectId) && !utils.isEmpty(this.roleObjectTypeCode)) {
        this.roleObjectListLoad();
      }
    });
  },

  methods: {
    roleObjectListLoad() {
      http.request(this.$options.name, 'DTS_CMA_00040', {
        query: {
          roleObjectId: this.roleObjectId,
          roleObjectTypeCode: this.roleObjectTypeCode,
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
    onRoleCategoryLoaded(optionsList) {
      this.roleCategoryKey = optionsList[0].key;
      this.selectedValues.roleCategoryCode.key = optionsList[0].key;
    },     
    onResetClick() {
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'searchCond')) {
          this.$refs.searchCond.reset();
        } else if(utils.isEqual(key, 'roleCategoryCode')) {
          this.$refs.roleCategory.reset();
        } else {
          this.searchFrame[key] = '';
        }
      });
    },
    getSearchData() {
      const data = {};
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'searchWord')) {
          data[key] = value;
        } else {
          data[key] = value.key;
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
      const selected = this.ds0.getSelected();
      const added = this.ds1.getRawData();
      const newList = [];
      utils.forEach(selected, data => {
        if (utils.findIndex(added, { roleId: data.roleId }) === -1) {
          newList.push(data);
        }
      });
      this.$refs.grid0.resetSelect();
      this.ds1.appendData(newList);
    },
    onDeleteClick() {
      const selectedItems = this.ds1.getSelected();
        utils.forEach(selectedItems, item => {
          this.ds1.removeRow(item, false);
        });
        this.$refs.grid1.resetSelect();
    },
    getSaveData(datasetList) {
      const list = [];
      if (datasetList.length > 0) {
        utils.forEach(datasetList, data => {
          list.push({
            roleId: data.roleId,
            roleObjectId: this.roleObjectId,
            roleObjectTypeCode: this.roleObjectTypeCode,
          });
        });
      } else {
        list.push({
          roleId: '',
          roleObjectId: this.roleObjectId,
          roleObjectTypeCode: this.roleObjectTypeCode,
        });
      }
      return list;
    },
    onSaveClick() {
      const saveData = this.getSaveData(this.ds1.getRawData());
      http.request(this.$options.name, 'DTS_CMA_00041', {
        path: {
          'role-object-id': this.roleObjectId,
        },
        data: saveData,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
          this.closePagePopup(true);
        });
      }).catch(error => {
        console.log(error);
      });
    },
    onKeyUpInput() {
      const searchFieldNewText = this.searchFrame.searchWord;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.searchFrame.searchWord = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
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
