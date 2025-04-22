<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="grid1"
      :headers="gridColumns0"
      :data-source="ds0"
      :options="options"
      :showRowsPerPageControl="false"
    >
      <template #left-info>
        <div class="btn_wrapL">
          <div class="comp_spacing" />
          <ur-button
            v-permission:create="pageId"
            type="button"
            class="comm_btn_gridTop"
            small
            @click="onAddClick"
          >
            {{ $t('MSG_BTN_ADD') }}
          </ur-button>
          <ur-button
            v-permission:delete="pageId"
            type="button"
            class="comm_btn_gridTop"
            style="margin-left:8px;"
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
        @click="onSaveClick"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00001_T06', // eslint-disable-line vue/name-property-casing
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
      options: {
        infinityScroll: true,
        resizableColumn: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      ds0: new urDataSet(),
      localdata0: [],
      selectMessage: utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')),
    };
  },
  computed: {},
  watch: {
    selectedPageId(value) {
      if (utils.isEmpty(value)) {
        this.tabGridClear();
      } else {
        this.pageManualListLoad();
      }
    },
  },
  created() {
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_MANU_ID'),
        value: 'documentId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_MANU_NM'),
        datafield: 'documentName',
      }, {
        text: this.$t('MSG_TXT_MANU_VER'),
        value: 'documentVersion',
      }, {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'finalModificationUserId',
        width: '200px',
      }, {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: '150px',
      }];
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedPageId)) {
        this.pageManualListLoad();
      }
    });
  },

  methods: {
    pageManualListLoad() {
      http.request(this.pageId, 'DTS_CMU_00064', {
        path: {
          'page-id': this.selectedPageId,
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
    onAddClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
      } else {
        utils.openLayerPopup('PGE_CMU_00012', this.onPopupClose, {
          pageInitialData: { multiSelect: true },
          size: 'lg',
        });
      }
    },
    onPopupClose(selected) {
      if (!utils.isEmpty(selected)) {
        this.addRow(selected);
      }
    },
    addRow(list) {
      utils.forEach(list, data => {
        const { documentId } = data;
        if (utils.findIndex(this.ds0.data, { documentId }) === -1) {
          data.__selected = false;
          data.finalModificationDTM = utils.dateformatToServer(data.finalModificationDTM);
          this.ds0.addRow(data);
        }
      });
    },
    onDeleteClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }       
      const chkArr = this.ds0.getSelected();
      if (utils.isEmpty(this.selectedPageId)||!chkArr.length) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        const indexes = this.ds0.getSelected();
        this.ds0.removeRows(indexes);
      }
    },
    getSaveData() {
      const list = [];
      const dataList = this.ds0.data;
      utils.forEach(dataList, data => {
        list.push({
          documentId: data.documentId,
          pageId: this.selectedPageId,
        });
      });
      return list;
    },
    onSaveClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          const saveData = this.getSaveData();
          http.request(this.pageId, 'DTS_CMU_00065', {
            path: {
              'page-id': this.selectedPageId,
            },
            data: saveData,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
            this.ds0.submit();
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
    },
  },
};
</script>
<style scoped>
</style>
