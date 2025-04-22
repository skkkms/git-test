<template>
  <div>
    <div class="mrB20" />
    <!-- <ur-data-grid
      ref="gridLinkParam"
      :headers="columnLinkParam"
      :options="LinkParamOptions"
      :data-source="dsLinkParam"
    />
     -->
    <sui-s-grid
      :key="gridKey"
      ref="gridLinkParam"
      :headers="columnLinkParam"
      :data-source="dsLinkParam"
      :multiselect="true"
      :showRowsPerPageControl="false"
      :options="LinkParamOptions"
    >
      <template #left-info>
        <div class="comp_spacing" />
        <div class="btn_wrapL">
          <ur-button
            v-permission:create="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            small
            @click="addRow"
          >
            {{ $t('MSG_BTN_ROW_ADD') }}
          </ur-button>
          <ur-button
            v-permission:delete="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            style="margin-left:8px"
            small
            @click="deleteRows"
          >
            {{ $t('MSG_BTN_ROW_DEL') }}
          </ur-button>
        </div>
      </template>
    </sui-s-grid>
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_solid"
        :disabled="checkMetaSave"
        @click="onSaveClick"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {urDataSet} from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

const eventHub = new Vue();
const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ROW_HEIGHT = 55;

export default {
  name: 'PGE_CMP_00027_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      dsLinkParam: new urDataSet(),
      LinkParamOptions: {
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      checkMetaSave: utils.checkMetaSave(),
      gridKey: 0,
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (selectObj) {
        this.linkParamListLoad();
      } else {
        this.tapGridClear();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.linkParamListLoad();
    });
  },
  created() {
    const that = this;
    this.columnLinkParam = [{
      text: this.$t('MSG_TXT_PRMT_NM'),
      value: 'linkParameterName',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
          :ref="refName"
          :value="row.linkParameterName"
          @blur="onChange($event, row.__idx)"
        />`,
        created() {
        },
        mounted() {
          eventHub.$on('focusField1', data => {
            try {
              this.$refs[`paramName${data}`].setFocus();
            } catch (e) {
              // console.log(e);
            }
          });
        },
        destroyed() {
          eventHub.$off('focusField1');
        },
        computed: {
          refName() {
            return `paramName${this.row.__idx}`;
          },
        },
        methods: {
          onChange(event, id) {
            that.updateRowData('linkParameterName', { rowID: id, value: event.target.value });
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_PRMT_VAL'),
      value: 'linkParameterValue',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
          :ref="refName"
          :value="row.linkParameterValue"
          @blur="onChange($event, row.__idx)"
        />`,
        created() {
        },
        mounted() {
          eventHub.$on('focusField2', data => {
            try {
              this.$refs[`paramValue${data}`].setFocus();
            } catch (e) {
              // console.log(e);
            }
          });
        },
        destroyed() {
          eventHub.$off('focusField2');
        },
        computed: {
          refName() {
            return `paramValue${this.row.__idx}`;
          },
        },
        methods: {
          onChange(event, id) {
            that.updateRowData('linkParameterValue', { rowID: id, value: event.target.value });
          },
        },
      },
    }];
  },
  // created() {
  //   this.columnLinkParam = [
  //     {
  //       value: 'linkParameterName',
  //       text: this.$t('MSG_TXT_PRMT_NM'),
  //       key: true,
  //       rules: undefined,
  //     },
  //     {
  //       value: 'linkParameterValue',
  //       text: this.$t('MSG_TXT_PRMT_VAL'),  
  //       rules: undefined,
  //     },
  //   ];
  // },
  methods: {
    linkParamListLoad() {
      if (this.selectedGridRowData) {
        const linkId = this.selectedGridRowData.linkId;
        http.request(this.contextPageId, 'DTS_CMP_00114', {
          path: {
            'link-id': linkId,
          },
        }).then(res => {
          this.dsLinkParam.setData(res.data);
        }).catch(error => {
          console.log(error);
        });
      }
    },
    tapGridClear() {
      this.$refs.gridLinkParam.gridLinkParam();
    },
    rowInitData() {
      return {
        linkParameterName: '',
        linkParameterValue: '',
      };
    },    
    onSaveClick() {
      if (utils.isEmpty(this.selectedGridRowData.linkId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LINK')));
      } else {
        // save
        const saveData = this.dsLinkParam.getRawData();
        utils.forEach(saveData, item => {
          item.linkId = this.selectedGridRowData.linkId;
          item.linkParameterName = utils.trim(item.linkParameterName);
          item.linkParameterValue = utils.trim(item.linkParameterValue);
        });

        const validResult = this.validation(saveData);
        if (validResult.valid) {
          this.saveAction(saveData);
        } else {
          utils.messageBox('warning', validResult.msg, null, () => {});
        }
      }
    },
    validation(saveData) {
      const result = {
        valid: true,
        msg: '',
        row: 0,
        column: '',
      };
      const tempLinkParamNameList = [];

      utils.forEach(saveData, (data, index) => {
        if (utils.isEmpty(utils.trim(data.linkParameterName))) {
          result.valid = false;
          result.msg = utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), index + 1, this.$t('MSG_TXT_PRMT_NM'));
          result.row = index;
          result.column = 'linkParameterName';
          return false;
        }
        
        const dupYn = utils.find(tempLinkParamNameList, {name:utils.trim(data.linkParameterName)});
        if(dupYn){
          result.valid = false;
          result.msg = utils.strFormat(this.$t('MSG_ALT_DUP_NROW_NCELL'), index + 1, this.$t('MSG_TXT_PRMT_NM'));
          result.row = index;
          result.column = 'linkParameterName';
          return false;
        }else{
          tempLinkParamNameList.push({name : utils.trim(data.linkParameterName)});
        }

        if (utils.isEmpty(utils.trim(data.linkParameterValue))) {
          result.valid = false;
          result.msg = utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), index + 1, this.$t('MSG_TXT_PRMT_VAL'));
          result.row = index;
          result.column = 'linkParameterValue';
          return false;
        }
        return true;
      });
      return result;
    },
    saveAction(saveData) {
      const linkId = this.selectedGridRowData.linkId;
      http.request(this.contextPageId, 'DTS_CMP_00115', {
        path: {
          'link-id': linkId,
        },
        data: saveData,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
        this.dsLinkParam.setData('');
        this.linkParamListLoad();
      }).catch(error => {
        console.log(error);
      });
    },
    addRow() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LINK')));
      } else {
        // addRows
        //this.dsLinkParam.addRow(this.rowInitData());
        this.addRowtoDs().then(() => {
          const maxRownum = this.dsLinkParam.data.length+1;
          this.$refs.gridLinkParam.setScrollRow(maxRownum);
        });
      }
    },
    addRowtoDs(){
      return new Promise((resolve, reject) => {
        this.dsLinkParam.addRow(this.rowInitData());
        resolve();
      });
    },
    deleteRows() {
      const chkArr = this.dsLinkParam.getSelected();
      if (utils.isEmpty(this.selectedGridRowData)||chkArr.length<1) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LINK')));
      }else{
        // deleteRows
        const indexes = this.dsLinkParam.getSelected();
        this.dsLinkParam.removeRows(indexes);
        this.gridKey = !this.gridKey;
      }
    },    
    updateRowData(field, data) {
      const { rowID, value } = data;
      this.dsLinkParam.data[rowID][field] = value;
    },    
  },
};
</script>
<style scoped>
</style>
