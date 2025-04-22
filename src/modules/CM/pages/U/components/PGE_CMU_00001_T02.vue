<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="grid1"
      :headers="gridData1.columns"
      :data-source="ds0"
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
            @click="onDeleteClick"
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
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00001_T02', // eslint-disable-line vue/name-property-casing
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
      gridDataServiceRegList: [],
      gridData1: {
        dataSource: {
          localdata: [],
          datatype: 'array',
          selectionmode: 'singlecell',
        },
        columns: [{
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
          width: 150,
        }, {
          text: this.$t('MSG_TXT_DTSVC_NM'),
          value: 'dataServiceName',
        }, {
          text: this.$t('MSG_TXT_DTSVC_URL'),
          value: 'dataServiceUniformresourcelocator',
        }],
      },
      localdata0: [],
      checkMetaSave: utils.checkMetaSave(),
      ds0: new urDataSet(),
      options: {
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
    };
  },

  watch: {
    selectedPageId(pageId) {
      if (!utils.isEmpty(pageId)) {
        this.getDataserviceRegList(pageId);
      } else {
        this.resetTab();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getDataserviceRegList(this.$props.selectedPageId);
    });
  },
  methods: {
    onNewClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }      
      utils.openLayerPopup('PGE_CMU_00005', this.onPagePopupCallback, {
        pageInitialData: { multiSelect: true },
        size: 'xlg',
      });
    },
    onPagePopupCallback(nodeData) {
      if (nodeData) {
        nodeData.forEach(node => {
          const { dataServiceIdentification } = node;
          if (utils.findIndex(this.ds0.data, { dataServiceIdentification }) === -1) {
            node.__selected = false;
            this.ds0.addRow(node);
          }
        });
      }
    },

    onDeleteClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }       
      const chkArr = this.ds0.getSelected();
      if (chkArr.length) {
        this.ds0.removeRows(chkArr);
      } else {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onSaveClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }
      const datasvcList = this.ds0.data;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          const dataParams = [];
          utils.forEach(datasvcList, data => {
            dataParams.push({
              pageId: this.$props.selectedPageId,
              dataServiceId: data.dataServiceIdentification,
            });
          });
          http.request(this.pageId, 'DTS_CMU_00015', { // dataservices reg.
            path: {
              'page-id': this.$props.selectedPageId,
            },
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
            this.ds0.submit();
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
    },
    getDataserviceRegList(pageId) {
      if (!pageId) return;
      http.request(this.pageId, 'DTS_CMU_00003', { // dataservices list in page
        path: {
          'page-id': pageId,
        },
      }).then(res => {
        this.gridData1.dataSource.localdata = [];
        this.gridDataServiceRegList = utils.cloneDeep(res.data);
        this.localdata0 = res.data;
        this.ds0.setData(this.localdata0);
      }).catch(error => {
        console.log(error);
      });
    },
    resetTab() {
      this.ds0.setData([]);
    },
  },
};
</script>
<style scoped>
</style>
