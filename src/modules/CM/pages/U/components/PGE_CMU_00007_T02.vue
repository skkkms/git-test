<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="tabGrid"
      :data-source="ds0"
      :headers="gridColumnsTab"
      :options="options"
      :showRowsPerPageControl="false"
    >
      <template #left-info>
        <div class="comp_spacing" />
        <div class="btn_wrapL">
          <ur-button
            v-permission:create="pageId"
            type="button"
            class="comm_btn_gridTop"
            small
            @click="onNewClick"
          >
            {{ $t('MSG_BTN_ADD') }}
          </ur-button>
          <ur-button
            v-permission:delete="pageId"
            type="button"
            class="comm_btn_gridTop"
            style="margin-left:8px"
            small
            @click="onDelClick"
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
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CMU_00007_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    componentId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
       localdata1: [],
      selectMessage: utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CMPNT')),
      checkMetaSave: utils.checkMetaSave(),
      gridColumnsTab: [],
      ds0: new urDataSet(),
       options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
        multiSelect: true,
        selectCheck: true,
      },
    }
  },
   created() {
     this.gridColumnsTab=[{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'dataServiceTypeName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'dataServiceIdentification',
      }, {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'dataServiceName',
      }, {
        text: this.$t('MSG_TXT_DTSVC_URL'),
        value: 'dataServiceUniformresourcelocator',
      }];
  },
  watch: {
    componentId() {
      if (this.componentId) {
        this.selectComponentDataServices();
      } else {
        this.tabGridClear();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.componentId) {
        this.selectComponentDataServices();
      }
    });
  },
  methods: {
    selectComponentDataServices() {
      // 선택한 데이터서비스 등록페이지 목록 조회
      http.request(this.pageId, 'DTS_CMU_00032', {
        path: {
          'component-id': this.componentId,
        },
      }).then(res => {
        this.ds0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tabGridClear() {
      this.ds0.setData([]);
    },
    onNewClick() {
      if (!this.componentId) {
        utils.messageBox('warning', this.selectMessage);
      } else {
        utils.openLayerPopup('PGE_CMU_00005', this.onPopupClose, {
          pageInitialData: { multiSelect: true },
          size: 'lg',
        });
      }
    },
    onPopupClose(nodeData) {
      if (!utils.isEmpty(nodeData)) {
        this.addRows(nodeData);
      }
    },
    addRows(list) {
      const addNewRows = [];
      const dataserviceList = this.ds0.getRawData();
      utils.forEach(list, data => {
        const { dataServiceIdentification } = data;
        if (utils.findIndex(dataserviceList, { dataServiceIdentification }) === -1) {
          addNewRows.push(data);
        }
      });
       const addNewRowsList = [];
      for(var i=0;i<addNewRows.length;i++){
       const newAddedRow = {
        moduleName: addNewRows[i].moduleName,
         subModuleName: addNewRows[i].subModuleName,
         dataServiceTypeName: addNewRows[i].dataServiceTypeName,
         dataServiceIdentification: addNewRows[i].dataServiceIdentification,
         dataServiceName: addNewRows[i].dataServiceName,
         dataServiceUniformresourcelocator: addNewRows[i].dataServiceUniformresourcelocator,
       };
         addNewRowsList.push(newAddedRow);
      }
      if (addNewRows.length > 0) {
        for(var k=0;k<addNewRows.length;k++){
        this.ds0.addRow(addNewRowsList[k]);
        }
      }
    },
    onDelClick() {
      if (!this.componentId) {
        utils.messageBox('warning', this.selectMessage);
      } else if (this.ds0.getSelected().length === 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'));
      } else {
        const selected = this.ds0.getSelected();
        // this.ds0.deleteRow(indexes);
         this.ds0.removeRows(selected);
      }
    },
    onSaveClick() {
      if (!this.componentId) {
        utils.messageBox('warning', this.selectMessage);
      } else {
        if (this.$refs.tabGrid.isChanged()==0) {
          utils.messageBox('warning', this.$t('MSG_ALT_NO_CHG_CNTN'));
          return false;
        }
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          const dataParams = [];
          const dataServiceList = this.ds0.getRawData();
          if (dataServiceList.length !== 0) {
            dataServiceList.forEach(dataService => {
              dataParams.push({
                componentId: this.componentId,
                dataServiceId: dataService.dataServiceIdentification,
              });
            });
          } else {
            dataParams.push({
              componentId: this.componentId,
            });
          }
          http.request(this.pageId, 'DTS_CMU_00033', {
            path: {
              'component-id': this.componentId,
            },
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
              // this.ds0.save();
            });
          }).catch(error => {
            console.log(error);
          });
        });
      }
    },
  },
};
</script>
<style scoped>
</style>
