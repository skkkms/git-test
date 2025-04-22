<template>
  <div>
    <div class="comm_popup_wrap_xlarge" style="height:450px">
      <div class="mrB15" />
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
              :selected="selectedValues.PORTAL"
              :option-list="selectPortalList"
            />
          </div>          
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR_GRP_CATG')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">           
            <sui-code-select
              ref="userGroupCategory"
              :selected="selectedValues.COD_USR_GRP_CATG"
              codeId="COD_USR_GRP_CATG"
              :defaultOption="'all'"
              @loaded="onUserGroupCategoryLoaded"
            />            
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="condType"
              :selected="selectedValues.COD_USER_GRP_SRCH_COND"
              codeId="COD_USER_GRP_SRCH_COND"
              :initialSelectedIndex="0"
              class="width60"
              @loaded="onCondTypeLoaded"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="condContent"
              v-model="condContent"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput"
            />
          </div>
          <div class="col-xs-1 nodata"/>
          <div class="col-xs-5 nodata"/>
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
// import - libraries (node modules)
// import - local files (js, vue, ...)
import {urDataSet} from 'uidev-component/index.js';
export default {
  name: 'PGE_CMA_00001_P01', // eslint-disable-line vue/name-property-casing
  props: {
    parentPageId: {
      type: String,
      required: true,
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
      searchFieldOldText: '',
      roleId: '',
      condContent: '',
      selectedBizCode: [],
      selectedValues: {
        COD_USER_GRP_SRCH_COND: { key: '', label: '' },
        PORTAL: { key: '', label: '' },
        COD_USR_GRP_CATG : { key:'', label: ''}
      },
      condTypeKey: '',
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
      btnOrginStatus: true,
      btnTargetStatus: true,
      selectPortalList: [],
      userGroupCategoryKey: '',
    };
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.gridOrgColumns = [
      {
        text: this.$t('MSG_TXT_PORTL_ID'),
        value: 'portalId',
        width: 100,
      },      
      {
        text: this.$t('MSG_TXT_USR_GRP_CATG'),
        value: 'userGroupCategoryName',
      },
      {
        text: this.$t('MSG_TXT_USER_GRP_ID'),
        value: 'userGroupId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_USER_GRP_NAME'),
        value: 'userGroupName',
      },
    ];
    this.gridTarColumns = [
      {
        text: this.$t('MSG_TXT_PORTL_ID'),
        value: 'portalId',
        width: 100,
      },      
      {
        text: this.$t('MSG_TXT_USR_GRP_CATG'),
        value: 'userGroupCategoryName',
      },
      {
        text: this.$t('MSG_TXT_USER_GRP_ID'),
        value: 'userGroupId',
        width: 150,
      }, 
      {
        text: this.$t('MSG_TXT_USER_GRP_NAME'),
        value: 'userGroupName',
      },
    ];
  },
  mounted() {
    if (this.dataList) {
      this.roleId = this.dataList[0].roleId;

      http.request(this.parentPageId, 'DTS_CMA_00007', {
        path: {
          'role-id': this.roleId,
        },
      }).then(res => {
        if (res.data) {
          //res.data = utils.getFilteredDataFromDataset(res.data, this.dsTarData, true);
          this.dsTarData.setData(res.data);
        }
      }).catch(error => {
        console.log(error);
      });


    }
    this.loadPortalList();
    // this.dataSearch(0);
  },
  methods: {
    loadPortalList(){
      http.request(this.parentPageId, 'DTS_CMP_00004').then(res => {
        utils.forEach(res.data, obj => {
          this.selectPortalList.push({
            key: obj.portalId,
            label: obj.portalName,
          });
        });
      }).catch(error => {
        console.log(error);
      });
    },    
    onKeyUpInput() {
      const searchFieldNewText = this.condContent;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.condContent = this.searchFieldOldText;
            this.$refs.condContent.setFocus();
          });
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
//    }
    },
    onChangeBizCodes(optList) {
      this.selectedBizCode = optList;
    },
    onUserGroupCategoryLoaded(optionsList) {
      this.userGroupCategoryKey = optionsList[0].key;
      this.selectedValues.COD_ROLE_CATG.key = optionsList[0].key;
    },     
    onCondTypeLoaded(optList) {
      this.condTypeKey = optList[0].key;
    },
    onReset() {
      this.$refs.condType.reset();
      this.selectedValues.COD_USER_GRP_SRCH_COND.key = this.condTypeKey;
      this.condContent = '';
      this.$refs.userGroupCategory.reset();
      this.selectedBizCode = [];
    },
    onSearch() {
      this.dataSearch(1);
    },
    onSave() {
      const saveList = [];
      utils.forEach(this.dsTarData.data, data => {
        const dataInfo = {
          roleId: this.roleId,
          roleUserId: data.userGroupId,
          roleUserTypeCode: 'G',
          deleteYn: 'N',
        };
        saveList.push(dataInfo);
      });

      // let delRoleId = '';
      // if (this.deleteList.length) {
      //   delRoleId = this.deleteList[0].roleId;
      // }

      const dataParams = {
        "delRoleId" : this.roleId,
        saveList,
      };

      http.request(this.parentPageId, 'DTS_CMA_00018', {
        path: this.roleId,
        data: dataParams,
      }).then(() => {
        this.$emit('save', 'saved');
      }).catch(error => {
        console.log(error);
      });
    
    },
    onCancel() {
      this.$emit('cancel', '');
    },
    onRightShift() {
      if (this.dsOrgData.data.length > 0) {
        const selectedData = this.dsOrgData.getSelected();
        utils.forEach(selectedData, item => {
          if (!this.isExistData(this.dsTarData.data, item)) {
            this.dsTarData.addRow({
              portalId: item.portalId,
              userGroupCategoryName: item.userGroupCategoryName,
              userGroupId: item.userGroupId,
              userGroupName: item.userGroupName,
            });
          }
        });
        this.$refs.grdOrgList.resetSelect();
        this.$refs.grdTartList.resetSelect();
      }
    },
    onLeftShift() {
      // const selected = this.dsTarData.getSelectedIndexes();
      // this.dsTarData.deleteRows(selected);
      
      const selected = this.dsTarData.getSelected();
      utils.forEach(selected, item => {
        this.dsTarData.removeRow(item, false);
      });
      this.$refs.grdTartList.resetSelect();      
    },
    isExistData(dataList, selectedData) {
      const isExist = _.some(dataList, { 
        userGroupId: selectedData.userGroupId,  
      });
      return isExist;
    },
    onClose() {
      console.log('onClose');
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    dataSearch(flag) {
      let condTypeCode = '';
      let condContents = '';
      let portalId  = '';
      let userGroupCategoryCode = '';

      if (flag !== 0) {
        userGroupCategoryCode = utils.trim(this.selectedValues.COD_USR_GRP_CATG.key);
        condTypeCode = this.selectedValues.COD_USER_GRP_SRCH_COND.key;
        condContents = this.condContent;
        portalId = this.selectedValues.PORTAL.key;
      }

      const queryParams = {
        userGroupCategoryCode: userGroupCategoryCode || '',
        searchCond: condTypeCode || '',
        searchWord: condContents || '',
        portalId: portalId || '',
      };

      http.request(this.parentPageId, 'DTS_CMA_00008', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          this.dsOrgData.setData(res.data);
        } else {
          this.dsOrgData.setData([]);
        }
      }).catch(error => {
        console.log(error);
      });
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
