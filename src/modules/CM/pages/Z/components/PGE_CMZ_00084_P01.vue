<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <ur-tree-grid
        ref="grid"
        :headers="columnModule"
        :options="options"
        :data-source="dataSet"
        @grid:selected="rowSelected"
      />
      <!-- <sui-tree-grid
        ref="treeGridModule"
        :columns="columnModule"
        :checkboxes="true"
        :hierarchicalCheckboxes="true"
        :dataset="'dsModule'"
        @rowUncheck="rowUncheck"
      /> -->
      <!--div
        v-if="!objTenant.isApplied"
        class="comm_title_wrap"
      >
        <h4>{{ $t('MSG_TXT_PORTL_INFO') }}</h4>
      </div>
      <div
        v-if="!objTenant.isApplied"
        class="comm_view_wrap"
      >
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL_ID')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldPortalId"
              v-model="objTenant.portalId"
              maxlength="100"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL_NM')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="textFieldPortalName"
              v-model="objTenant.portalName"
              maxlength="100"
            />
          </div>
        </div>
      </div-->
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickCancel"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
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
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00084_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    parentPageId: {
      type: String,
      default: '',
    },
    selectedGridRowData: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      rowSelectedCheck: [],
      columnModule: [
        { text: this.$t('MSG_TXT_MDLE'), value: 'value' },
      ],
      objTenant: {
        tenantId: '',
        tenantName: '',
        useYn: '',
        moduleList: [],
        portalId: '',
        portalName: '',
        isApplied: '',
      },
      dataSet: new this.$ur.grid.DataSet(),
      options: {
        height: 480,
        rowHeight: 42,
        infinityScroll: true,
        multiSelect: true,
        selectCheck: true,
        hierarchicalCheck: true,
      },
    };
  },
  computed: {},
  watch: {
    selectedGridRowData() {
      this.objTenant.tenantId = this.selectedGridRowData.tenantId;
      this.objTenant.tenantName = this.selectedGridRowData.tenantName;
      this.objTenant.useYn = this.selectedGridRowData.useYn;
      this.objTenant.isApplied = !utils.isEmpty(this.selectedGridRowData.applyDTM);
      this.onLoad();
    },
  },
  mounted() {
    if (!utils.isEmpty(this.selectedGridRowData.tenantId)) {
      this.objTenant.tenantId = this.selectedGridRowData.tenantId;
      this.objTenant.tenantName = this.selectedGridRowData.tenantName;
      this.objTenant.useYn = this.selectedGridRowData.useYn;
      this.objTenant.isApplied = !utils.isEmpty(this.selectedGridRowData.applyDTM);
      this.onLoad();
    }
  },
  datasets: [{
    id: 'dsModule',
    componentType: 'tree-grid',
    data: 'treeGridData',
    hierarchy: {
      keyDataField: {
        name: 'id',
      },
      parentDataField: {
        name: 'parentId',
      },
    },
    datafields: [
      {
        name: 'id',
        type: 'string',
        map: 'id',
      },
      {
        name: 'parentId',
        type: 'string',
        map: 'parentId',
      },
      {
        name: 'level',
        type: 'string',
        map: 'level',
      },
      {
        name: 'value',
        type: 'string',
        map: 'value',
      },
      {
        name: 'moduleCode',
        type: 'string',
        map: 'moduleCode',
      },
      {
        name: 'subModuleCode',
        type: 'string',
        map: 'subModuleCode',
      },
      {
        name: 'tenantId',
        type: 'string',
        map: 'tenantId',
      },
      {
        name: 'applyYn',
        type: 'string',
        map: 'applyYn',
      },
      {
        name: 'dataset-row-id',
        type: 'string',
        map: 'dataset-row-id',
      },
    ],
  }],
  created() {
    this.treeGridData = [];
  },
  methods: {
    rowSelected(sels) {
      this.rowSelectedCheck = sels;
    },
    onLoad() {
      this.load().then(() => {
        this.renderTreeGrid();
      });
    },
    load() {
      return new Promise((resolve, reject) => {
        http.request(this.contextPageId, 'DTS_CMZ_00173', {
          query: {
            tenantId: this.objTenant.tenantId,
          },
        }).then(res => {
          const treeData = [];
          utils.forEach(res.data, item => {
            treeData.push({
              id: item.codeDetailMultiLanguageId,
              parentId: utils.isEmpty(item.parentsCodeId) ? '' : `${item.parentsCodeId}_${item.parentsCodeValidityValue}`,
              level: item.hierarchyLevel,
              value: item.codeName,
              moduleCode: item.parentsCodeValidityValue,
              subModuleCode: item.codeValidityValue,
              tenantId: item.tenantId,
              applyYn: item.applyYn,
            });
          });
          this.dsModule.setRawData(treeData);         
          this.$refs.grid.setData(treeData, {dataType:'json',id :  "id", parentField: "parentId"});
          resolve();
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    renderTreeGrid() {
      utils.forEach(this.dsModule.data, item => {
        if (utils.isEmpty(item.parentId)) {
          this.$refs.treeGridModule.getJqxTreeGrid().expandRow(item['dataset-row-id']);
        }
        if (!utils.isEmpty(item.applyYn)) {
          this.$refs.treeGridModule.getJqxTreeGrid().checkRow(item['dataset-row-id']);
        }
        if (item.applyYn === 'Y') {
          this.$refs.treeGridModule.getJqxTreeGrid().lockRow(item['dataset-row-id']);
        }
      });
    },
    onClickCancel() {
      this.$emit('closePopup');
    },
    onClickSave() {
      if (!this.validateData()) {
        return;
      }
      const checkedRows = this.rowSelectedCheck;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_CREATE_TENANT'), null, () => {
        this.objTenant.moduleList = [];
        utils.forEach(checkedRows, item => {
          if (!utils.isEmpty(item.moduleCode)) {
            this.objTenant.moduleList.push({
              tenantId: this.objTenant.tenantId,
              moduleCode: item.moduleCode,
              subModuleCode: item.subModuleCode,
              applyYn: item.applyYn,
            });
          }
        });
        http.request(this.contextPageId, 'DTS_CMZ_00174', {
          path: {
            'tenant-id': this.objTenant.tenantId,
          },
          data: this.objTenant,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_TENANT_CREATED'), null, this.research);
        }).catch(error => {
          console.log(error);
        });
      });
    },
    // rowUncheck(event) {
    //   const row = event.args.row;
    //   if (row.applyYn === 'Y') {
    //     this.$refs.treeGridModule.getJqxTreeGrid().checkRow(row['dataset-row-id']);
    //   }
    // },
    validateData() {
      // if (utils.isEmpty(this.objTenant.portalId) && !this.objTenant.isApplied) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_ID')), null, () => {
      //     this.$refs.textFieldPortalId.setFocus();
      //   });
      //   return false;
      // }
      // if (utils.isEmpty(this.objTenant.portalName) && !this.objTenant.isApplied) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_NM')), null, () => {
      //     this.$refs.textFieldPortalName.setFocus();
      //   });
      //   return false;
      // }
      return true;
    },
    research() {
      this.$emit('closePopup');
      this.$emit('research');
    },
  },
};
</script>

<style scoped>
</style>
