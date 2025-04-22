<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="columnsGrid"
      :headers="gridColumns1"
      :data-source="dsColumn"
      :showRowsPerPageControl="false"
      :initialRowsPerPage="10"
      :options="options"
      showMoveControl="true"
    >
      <template #left-info>
        <div class="btn_wrapL">
          <ur-button
            type="button"
            class="comm_btn_gridTop"
            small
            @click="addRow"
          >
            {{ $t('MSG_BTN_ROW_ADD') }}
          </ur-button>
          <ur-button
            type="button"
            class="comm_btn_gridTop"
            small
            style="margin-left: 4px;"
            @click="deleteRows"
          >
            {{ $t('MSG_BTN_ROW_DEL') }}
          </ur-button>
        </div>
      </template>
      <template #right-info>
        <div class="btn_wrapR">
          <ur-button
            type="button"
            class="comm_btn_gridTop"
            small
            @click="onClickAdd"
          >
            {{ $t('MSG_BTN_ADD') }}
          </ur-button>
        </div>
      </template>
    </sui-s-grid>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

// const EventBus = new Vue();
const CODE_KEYS = ['COD_COL_TYPE'];

export default {
  name: 'PGE_CMU_00016_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    objectId: {
      type: String,
      default: '',
    },
    tableColumnList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      options: {
        showMoveControl: true,
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      optionList: {
        COD_COL_TYPE: [],
      },
      // eslint-disable-next-line new-cap
      dsColumn: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsColumnDelete: new urDataSet(),
    };
  },
  computed: {},
  watch: {
    objectId(data) {
      if (data) {
        this.loadColumnList();
      } else {
        this.clearTabGrid();
      }
    },
    tableColumnList: {
      deep: true,
      handler() {
        this.addRowByTable();
      },
    },
  },
  created() {
    http.loadCodeList(this.contextPageId, CODE_KEYS, this.optionList).then(() => {
    }).catch(e => { console.log('error :>> ', e); });
    const that = this;
    this.gridColumns1 = [{
      text: this.$t('MSG_TXT_TAB_NM'),
      value: 'tablePhysicalName',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
        v-model="row.tablePhysicalName"
        @input="onChange"
        />
        `,
        methods: {
          onChange(value) {
            this.row.tablePhysicalName = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_COL_NM'),
      value: 'columnName',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
        v-model="row.columnName"
        @input="onChange"
        />
        `,
        methods: {
          onChange(value) {
            this.row.columnName = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_MLNG_ID'),
      value: 'objectColumnMultilanguageId',
      component: {
        props: ['row', 'value'],
        template: `
          <sui-txt-with-btn
            ref="suiTxt"
            :fdpTextValue="fieldValue"
            :textFieldProps="textFieldProps"
            :buttonProps="buttonProps"
            @clickButton="onClickButton"
            @input="onChange"
          />
          `,
        data() {
          return {
            fieldValue: this.row.objectColumnMultilanguageId,
            textFieldProps: {
              readonly: false,
              disabled: false,
            },
            buttonProps: {
              disabled: false,
              style: 'comm_btn_InputScr',
            },

          };
        },
        methods: {
          onChange(value) {
            this.row.objectColumnMultilanguageId = value;
            that.updateData(this.row);
          },
          onClickButton() {
            that.findMsgResoVal(this.row);
          },
        },
      },
    },
    {
      text: this.$t('MSG_TXT_MSG_RESO_VAL'),
      value: 'messageResourceValue',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
        v-model="row.messageResourceValue"
        @input="onChange"
        :readonly="true"
        />
        `,
        methods: {
          onChange(value) {
            this.row.messageResourceValue = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_TYPE'),
      value: 'columnTypeCode',
      component: {
        props: ['row', 'value'],
        template: `
            <sui-code-select
            ref="select"
            :initialSelectedKey="row.columnTypeCode"
            codeId="COD_COL_TYPE" 
            @input="onChange"             
          /> `,
        methods: {
          onChange(value) {
            this.row.columnTypeCode = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_COLUMN_SIZE'),
      value: 'columnSizeValue',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
        v-model="row.columnSizeValue"
        @input="onChange"
        :readonly="true"
        />
        `,
        methods: {
          onChange(value) {
            this.row.columnSizeValue = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_INPUT_SIZE'),
      value: 'inputSizeValue',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
        v-model="row.inputSizeValue"
        @input="onChange"
        />
        `,
        methods: {
          onChange(value) {
            this.row.inputSizeValue = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_PK_YN'),
      value: 'primaryKeyYn',
      component: {
        props: ['row', 'value'],
        template: `
          <sui-segment-box
            :value="getprimaryKeyYn"
            :items="optList"
            @input="onChange"
          />
          `,
        data() { return { optList: [{ key: 'Y', label: 'Y' }, { key: 'N', label: 'N' }] }; },

        computed: {
          getprimaryKeyYn() {
            // eslint-disable-next-line eqeqeq, max-len
            if (this.row.primaryKeyYn == 'N') { return { key: 'N', label: 'NO' }; } return { key: 'Y', label: 'Yes' };
          },
        },
        methods: {
          onChange(value) {
            this.row.primaryKeyYn = value.key;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_NN_YN'),
      value: 'notNullYn',
      component: {
        props: ['row', 'value'],
        template: `
          <sui-segment-box
            ref="NotNullYnSelect"
            :value="getNotNullYn"
            :items="optList"
            @input="onChange"
          />
          `,
        data() { return { optList: [{ key: 'Y', label: 'Y' }, { key: 'N', label: 'N' }] }; },

        computed: {
          getNotNullYn() {
            // eslint-disable-next-line eqeqeq, max-len
            if (this.row.notNullYn == 'N') { return { key: 'N', label: 'NO' }; } return { key: 'Y', label: 'Yes' };
          },
        },
        methods: {
          onChange(value) {
            this.row.notNullYn = value.key;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_SRCH_ITEM_YN'),
      value: 'searchItemYn',
      component: {
        props: ['row', 'value'],
        template: `
          <sui-segment-box
            ref="SearchYnSelect"
            :value="getSearchItemYn"
            :items="optList"
            @input="onChange"
          />
          `,
        data() {
          return { optList: [{ key: 'Y', label: 'Y' }, { key: 'N', label: 'N' }] };
        },

        computed: {
          getSearchItemYn() {
            // eslint-disable-next-line eqeqeq, max-len
            if (this.row.searchItemYn == 'N') { return { key: 'N', label: 'NO' }; } return { key: 'Y', label: 'Yes' };
          },
        },
        methods: {
          onChange(value) {
            this.row.searchItemYn = value.key;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_LIST_ITEM_YN'),
      value: 'listItemYn',
      component: {
        props: ['row', 'value'],
        template: `
          <sui-segment-box
            ref="ListYnSelect"
            :value="getlistItemYn"
            :items="optList"
            @input="onChange"
          />
          `,
        data() {
          return { optList: [{ key: 'Y', label: 'Y' }, { key: 'N', label: 'N' }] };
        },

        computed: {
          getlistItemYn() {
            // eslint-disable-next-line eqeqeq, max-len
            if (this.row.listItemYn == 'N') { return { key: 'N', label: 'NO' }; } return { key: 'Y', label: 'Yes' };
          },
        },
        methods: {
          onChange(value) {
            this.row.listItemYn = value.key;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_CODE_ID'),
      value: 'codeId',
      component: {
        props: ['row', 'value'],
        template: `
          <sui-text-field
            v-model="row.codeId"
            @input="onChange"
          />
        `,
        methods: {
          onChange(value) {
            this.row.codeId = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_ADD_INFO'),
      value: 'addInformationValue',
      component: {
        props: ['row', 'value'],
        template: `
          <sui-text-field
            v-model="row.addInformationValue"
            @input="onChange"
          />
        `,
        methods: {
          onChange(value) {
            this.row.addInformationValue = value;
            that.updateData(this.row);
          },
        },
      },
    }];
    this.localdata1 = [];
    this.localdata2 = [];
  },
  mounted() {
    this.$nextTick(() => {
      if (this.objectId) {
        this.loadCode();
      }
    });
  },
  methods: {
    updateData(row) {
      this.dsColumn.data[row.__idx] = utils.cloneDeep(row);
    },
    loadCode() {
      return http.mergeCodeList(this.contextPageId, CODE_KEYS, this.optionList).then(() => {
        if (this.objectId) {
          this.loadColumnList();
        }
      }).catch(() => {});
    },
    loadColumnList() {
      http.request(this.contextPageId, 'DTS_CMU_00074', {
        path: {
          'object-id': this.objectId,
        },
      }).then(res => {
        const columnList = utils.clone(res.data);
        utils.forEach(columnList, (obj, key) => {
          columnList[key].columnSizeValue = obj.columnSizeValue.toString();
          if (columnList[key].columnSizeValue === '0') {
            columnList[key].columnSizeValue = '';
          }
          columnList[key].inputSizeValue = obj.inputSizeValue.toString();
        });
        this.dsColumn.setData(columnList);
      }).catch(error => {
        console.log(error);
      });
    },
    clearTabGrid() {
      this.dsColumn.setData([]);
    },
    createRowInitData() {
      return {
        objectColumnUid: '',
        objectId: this.objectId,
        tablePhysicalName: '',
        columnName: '',
        columnTypeCode: '',
        columnSizeValue: '',
        inputSizeValue: '0',
        primaryKeyYn: 'N',
        notNullYn: 'N',
        searchItemYn: 'N',
        listItemYn: 'Y',
        codeId: '',
        arrayalOrder: '',
        objectColumnMultilanguageId: '',
        messageResourceValue: '',
        addInformationValue: '',
      };
    },
    validateObjColData(saveData) {
      const result = {
        valid: true,
        msg: '',
        index: 0,
        dataField: '',
      };
      utils.forEach(saveData, (data, index) => {
        if (utils.isEmpty(data.columnName)) {
          result.valid = false;
          result.msg = utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), index + 1, this.$t('MSG_TXT_COL_NM'));
          result.row = index;
          result.dataField = 'columnName';
          return false;
        }
        return true;
      });
      return result;
    },
    findMsgResoVal(dataRow) {
      if (utils.isEmpty(dataRow.objectColumnMultilanguageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MLNG_ID')));
        return false;
      }
      http.request(this.contextPageId, 'DTS_CMU_00077', {
        path: {
          'message-id': dataRow.objectColumnMultilanguageId,
        },
      }).then(res => {
        if (!utils.isEmpty(res.data)) {
          this.dsColumn.setRowValue(dataRow.__id, 'messageResourceValue', res.data.multiLanguageContent);
        }
      }).catch(error => {
        console.log(error);
      });
      return true;
    },
    setArrayalOrder() {
      utils.forEach(this.dsColumn.data, (value, key) => {
        // eslint-disable-next-line no-param-reassign
        value.arrayalOrder = key;
      });
    },
    addRow() {
      if (utils.isEmpty(this.objectId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_OBJECT')));
      } else {
        // const array = [];
        // array.push(this.createRowInitData());
        // array.forEach(item => {
        //   this.dsColumn.addRow(item);
        // });
        this.addRowtoDs().then(() => {
          const maxRownum = this.dsColumn.data.length+1;
          this.$refs.columnsGrid.setScrollRow(maxRownum);
        });        
      }
    },
    addRowtoDs(){
      return new Promise((resolve, reject) => {
        this.dsColumn.addRow(this.createRowInitData());
        resolve();
      });
    },    
    deleteRows() {
      if (utils.isEmpty(this.objectId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_OBJECT')));
        return false;
      }
      const selectedIndexes = this.dsColumn.getSelected();
      if (selectedIndexes.length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      const removed = new Map();
      selectedIndexes.forEach(item => {
        removed.set(item.__idx, item);
      });
      function checkDelete(item) {
        if (removed.has(item.__idx)) {
          return false;
        }
        return true;
      }
      const removedList = this.dsColumn.data.filter(checkDelete);
      this.dsColumn.setData([]);
      this.$nextTick(() => {
        this.dsColumn.setData(removedList);
      });
      selectedIndexes.forEach(item => {
        this.dsColumnDelete.addRow(item);
      });
      this.dsColumn.removeSelected();
      return null;
    },
    onClickAdd() {
      if (utils.isEmpty(this.objectId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_OBJECT')));
      } else {
        this.$emit('openPopup');
      }
    },
    addRowByTable() {
      // result not used further
      // const result = [];
      const sortedList = _.sortBy(this.tableColumnList, itm => Number(itm.arrayalOrder));
      utils.forEach(sortedList, value => {
        const index = utils.findIndex(this.dsColumn.data, o => utils.isEqual(o.objectColumnUid, value.objectColumnUid));
        if (index < 0) {
          const item = this.createRowInitData();
          item.tablePhysicalName = value.tablePhysicalName;
          item.columnName = value.columnName;
          item.columnTypeCode = value.columnTypeCode;
          item.columnSizeValue = value.columnSizeValue.toString();
          item.primaryKeyYn = value.primaryKeyYn;
          item.notNullYn = value.notNullYn;
          item.objectColumnMultilanguageId = `MSG_TXT_${value.columnName}`;
          item.messageResourceValue = value.messageResourceValue || value.defaultMessageResourceValue;
          // result.push(item);
          this.dsColumn.addRow(item);
        }
      });
    },
    onClickSave() {
      const saveData = this.dsColumn.data;
      const validResult = this.validateObjColData(saveData);
      this.setArrayalOrder();
      if (validResult.valid) {
        const dataParams = {
          columnList: this.dsColumn.data,
          columnDeleteList: this.dsColumnDelete.rawData,
        };
        http.request(this.contextPageId, 'DTS_CMU_00075', {
          path: {
            'object-id': this.objectId || '',
          },
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.$emit('research');
          this.dsColumn.setData();
        }).catch(error => {
          console.log(error);
        });
      } else {
        utils.messageBox('warning', validResult.msg, null, () => {
          // this.$refs.columnsGrid.setFocus(validResult.row, validResult.dataField);
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
