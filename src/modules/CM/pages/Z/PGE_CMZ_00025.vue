<template>
  <sui-page>
   <sui-page-header ref="pageHeader" :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-code-select
              codeId="COD_CTS_TYPE"
              :page-id="this.$options.name"
              :selected="ctsType"
            />
          </div>
          <div class="btn_wrap">
            <sui-button type="button" class="comm_btn_Scr" @click="onAddClick">{{$t('MSG_BTN_ADD')}}</sui-button>
          </div>
        </div>
      </div>
      <div class="mrB30"></div>
      <div class="comm_title_wrap">
          <h4>{{$t('MSG_TXT_EXTC_OBJ_LIST')}}</h4>
      </div>
      <sui-s-grid
        ref="mainGrid"
        :headers="gridColumns"
        :data-source="dataset0"
        :options="options0"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
      >
        <template #left-info>
          <div class="comp_spacing" />
          <div class="btn_wrapL">
            <ur-button
              type="button"
              small
              class="comm_btn_gridTop"
              @click="onDeleteClick">
              {{$t('MSG_BTN_DEL')}}
            </ur-button>
          </div>
        </template>
      </sui-s-grid>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:download="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onExportClick">{{$t('MSG_BTN_EXPORT')}}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
  </template>
  <script>
import { urDataSet } from 'uidev-component/index';

  export default {
    name: 'PGE_CMZ_00025', // eslint-disable-line vue/name-property-casing
    data() {
      return {
        ctsType: {key:'',label:''},
        localdata0: [],
        gridColumns: [
          { text: this.$t('MSG_TXT_TYPE'), value: 'ctsType' },
          { text: this.$t('MSG_TXT_MDLE'), value: 'module' },
          { text: this.$t('MSG_TXT_SMDLE'), value: 'subModule' },
          { text: this.$t('MSG_TXT_ITEM_ID'), value: 'id' },
          { text: this.$t('MSG_TXT_ITEM_NM'), value: 'name' },
        ],
        dataset0: new urDataSet(),
        options0: {
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        },
        selectdRows: [],
      };
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {
      onAddClick() {
        if(this.ctsType.key === 'PAGE') {
          utils.openLayerPopup('PGE_CMU_00004', this.onPagePopupCallback, {
            pageInitialData: { multiSelect: true },
            size: 'lg'
          });
        }
        else if(this.ctsType.key === 'CMPNT') {
          utils.openLayerPopup('PGE_CMU_00008', this.onComponentPopupCallback, {
            pageInitialData: {
              multiSelect: true,
            },
            size: 'lg'
          });
        }
        else if(this.ctsType.key === 'CODE') {
          utils.openLayerPopup('PGE_CMZ_00003', this.onCodePopupCallback, {
            pageInitialData: {
              multiSelect: true,
            },
            size: 'lg'
          });
        }
        else if(this.ctsType.key === 'RULE') {
          utils.openLayerPopup('PGE_RWR_00009', this.onRulePopupCallback, {
            pageInitialData: {
              multiselect: true,
            },
            size: 'lg'
          });
        }
        else if(this.ctsType.key === 'WORKFLOW') {
          utils.openLayerPopup('PGE_RWR_00010', this.onWorkflowPopupCallback, {
            pageInitialData: {
              multiselect: true,
            },
            size: 'lg'
          });
        }

      },
      onPagePopupCallback(nodeData) {
        if (nodeData) {
          const addNewRows = [];
          nodeData.forEach(node => {
            if (utils.findIndex(this.dataset0.data, { 'id': node.pageId }) === -1) {
              addNewRows.push({'ctsType': 'PAGE', 'module': node.moduleCode, 'subModule': node.subModuleCode, 'id': node.pageId, 'name': node.pageName});
            }
          });
          if (addNewRows.length > 0) {
            this.addRows(addNewRows);
          }
        }
      },
      onComponentPopupCallback(nodeData) {
        if (nodeData) {
          const addNewRows = [];
          nodeData.forEach(node => {
            if (utils.findIndex(this.dataset0.data, { 'id': node.componentId }) === -1) {
              addNewRows.push({'ctsType': 'CMPNT', 'module': node.moduleCode, 'subModule': node.subModuleCode, 'id': node.componentId, 'name': node.componentName});
            }
          });
          if (addNewRows.length > 0) {
            this.addRows(addNewRows);
          }
        }
      },
      onCodePopupCallback(nodeData) {
        if (nodeData) {
          const addNewRows = [];
          nodeData.forEach(node => {
            if (utils.findIndex(this.dataset0.data, { 'id': node.codeId }) === -1) {
              addNewRows.push({'ctsType': 'CODE', 'module': node.mdleCode, 'subModule': node.smdleCode, 'id': node.codeId, 'name': node.codeName});
            }
          });
          if (addNewRows.length > 0) {
            this.addRows(addNewRows);
          }
        }
      },
      onRulePopupCallback(nodeData) {
        if (nodeData) {
          const addNewRows = [];
          nodeData.forEach(node => {
            if (utils.findIndex(this.dataset0.data, { 'id': node.ruleUid }) === -1) {
              addNewRows.push({'ctsType': 'RULE', 'module': node.moduleCode, 'subModule': node.subModuleCode, 'id': node.ruleUid, 'name': node.ruleName});
            }
          });
          if (addNewRows.length > 0) {
            this.addRows(addNewRows);
          }
        }
      },
      onWorkflowPopupCallback(nodeData) {
        if (nodeData) {
          const addNewRows = [];
          nodeData.forEach(node => {
            if (utils.findIndex(this.dataset0.data, { 'id': node.workflowId }) === -1) {
              addNewRows.push({'ctsType': 'WORKFLOW', 'module': node.moduleCode, 'subModule': node.subModuleCode, 'id': node.workflowId, 'name': node.workflowName});
            }
          });
          if (addNewRows.length > 0) {
            this.addRows(addNewRows);
          }
        }
      },
    onDeleteClick() {
      const selected = this.dataset0.getSelected();

      if (selected.length === 0) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => {
          this.dataset0.removeRows(selected);
          this.dataset0.removeSelected();
        }, () => this.dataset0.removeSelected());
      }
    },
      onExportClick() {
        if(this.dataset0.data.length > 0) {
          const pageList = [];
          const componentList = [];
          const codeList = [];
          const ruleList = [];
          const workflowList = [];

          this.dataset0.data.forEach(item => {
            if(item.ctsType === 'PAGE') {
              pageList.push({'pageId' : item.id});
            }
            else if(item.ctsType === 'CMPNT') {
              componentList.push({'componentId' : item.id});
            }
            else if(item.ctsType === 'CODE') {
              codeList.push({'codeId' : item.id});
            }
            else if(item.ctsType === 'RULE') {
              ruleList.push({'ruleUid' : item.id});
            }
            else if(item.ctsType === 'WORKFLOW') {
              workflowList.push({'workflowId' : item.id});
            }
          })

          const dataParams = {
            'pageList' : pageList,
            'componentList' : componentList,
            'codeList' : codeList,
            'ruleList' : ruleList,
            'workflowList' : workflowList,
          };
          http.request(this.$options.name, 'DTS_CMU_00052', {
            data: dataParams,
            responseType: 'arraybuffer',
          }).then(res => {
            const fileName = 'EXP_'+utils.now('YYYYMMDDHHmmss')+".cts";
            utils.downloadBlob(res, fileName);
          });
        } else {
          utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        }
      },
      addRows(rows) {
        rows.forEach(row => {
          this.dataset0.addRow(row);
        });
      },
    }
  };
  </script>
  <style scoped>
  </style>
