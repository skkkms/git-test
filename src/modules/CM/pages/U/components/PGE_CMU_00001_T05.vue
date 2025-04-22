<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      :key="gridKey"
      ref="grid1"
      :headers="gridColumns0"
      :data-source="ds0"
      :multiselect="true"
      :showRowsPerPageControl="false"
      :options="options"
    >
      <template #left-info>
        <div class="comp_spacing" />
        <div class="btn_wrapL">
          <ur-button
            v-permission:create="pageId"
            type="button"
            class="comm_btn_gridTop"
            small
            @click="addRow"
          >
            {{ $t('MSG_BTN_ROW_ADD') }}
          </ur-button>
          <ur-button
            v-permission:delete="pageId"
            type="button"
            class="comm_btn_gridTop"
            style="margin-left:8px"
            small
            @click="deleteRows"
          >
            {{ $t('MSG_BTN_DEL') }}
          </ur-button>
        </div>
      </template>
    </sui-s-grid>
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:update="pageId"
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
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

const eventHub = new Vue();

export default {
  name: 'PGE_CMU_00001_T05', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedPageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localdata0: [],
      // eslint-disable-next-line new-cap
      ds0: new urDataSet(),
      checkMetaSave: utils.checkMetaSave(),
      options: {
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      gridKey: 0,
    };
  },
  computed: {},
  watch: {
    selectedPageId(value) {
      if (utils.isEmpty(value)) {
        this.tapGridClear();
      } else {
        this.pageParamListLoad();
      }
    },
  },
  created() {
    const that = this;
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_PRMT_NM'),
      value: 'pageParameterName',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
          :ref="refName"
          :value="row.pageParameterName"
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
            that.updateRowData('pageParameterName', { rowID: id, value: event.target.value });
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_PRMT_VAL'),
      value: 'pageParameterValue',
      component: {
        props: ['row', 'value'],
        template: `
        <sui-text-field
          :ref="refName"
          :value="row.pageParameterValue"
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
            that.updateRowData('pageParameterValue', { rowID: id, value: event.target.value });
          },
        },
      },
    }];
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedPageId)) {
        this.pageParamListLoad();
      }
    });
  },

  methods: {
    pageParamListLoad() {
      http.request(this.pageId, 'DTS_CMU_00062', {
        path: {
          'page-id': this.selectedPageId,
        },
      }).then(res => {
        this.ds0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tapGridClear() {
      this.ds0.setData([]);
    },
    rowInitData() {
      return {
        pageId: this.selectedPageId,
        pageParameterName: '',
        pageParameterValue: '',
      };
    },
    addRow() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
      } else {
        // addRows
        this.ds0.addRow(this.rowInitData());
        const maxRownum = this.ds0.data.length-1;
        this.$refs.grid1.setFocus(maxRownum,'pageParameterName');
      }
    },
    deleteRows() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }       
      const chkArr = this.ds0.getSelected();
      if (utils.isEmpty(this.selectedPageId)||!chkArr.length) {
        //utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        // deleteRows
        const indexes = this.ds0.getSelected();
        this.ds0.removeRows(indexes);
        this.gridKey = !this.gridKey;
      }
    },
    onSaveClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      } 

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          // save
          const saveData = this.ds0.getRawData();
          utils.forEach(saveData, item => {
            item.pageParameterName = utils.trim(item.pageParameterName);
            item.pageParameterValue = utils.trim(item.pageParameterValue);
          });

          const validResult = this.validation(saveData);
          if (validResult.valid) {
            this.saveAction(saveData);
          } else {
            utils.messageBox('warning', validResult.msg, null, () => {
              if (validResult.column === 'pageParameterName') {
                eventHub.$emit('focusField1', validResult.row);
              } else
              if (validResult.column === 'pageParameterValue') {
                eventHub.$emit('focusField2', validResult.row);
              }
            });
          }
        },
        (/* cancel */) => {});
    },
    validation(saveData) {
      const result = {
        valid: true,
        msg: '',
        row: 0,
        column: '',
      };
      const tempPageParamNameList = [];

      utils.forEach(saveData, (data, index) => {
        if (utils.isEmpty(data.pageParameterName)) {
          result.valid = false;
          result.msg = utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), index + 1, this.$t('MSG_TXT_PRMT_NM'));
          result.row = index;
          result.column = 'pageParameterName';
          return false;
        }
        const dupYn = utils.find(tempPageParamNameList, {name:utils.trim(data.pageParameterName)});
        if(dupYn){
          result.valid = false;
          result.msg = utils.strFormat(this.$t('MSG_ALT_DUP_NROW_NCELL'), index + 1, this.$t('MSG_TXT_PRMT_NM'));
          result.row = index;
          result.column = 'pageParameterName';
          return false;
        }else{
          tempPageParamNameList.push({name : utils.trim(data.pageParameterName)});
        }

        if (utils.isEmpty(data.pageParameterValue)) {
          result.valid = false;
          result.msg = utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), index + 1, this.$t('MSG_TXT_PRMT_VAL'));
          result.row = index;
          result.column = 'pageParameterValue';
          return false;
        }
        return true;
      });
      return result;
    },
    saveAction(saveData) {
      http.request(this.pageId, 'DTS_CMU_00063', {
        path: {
          'page-id': this.selectedPageId,
        },
        data: saveData,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
      }).catch(error => {
        console.log(error);
      });
    },
    updateRowData(field, data) {
      const { rowID, value } = data;
      this.ds0.data[rowID][field] = value;
    },
  },
};
</script>
<style scoped>
</style>
