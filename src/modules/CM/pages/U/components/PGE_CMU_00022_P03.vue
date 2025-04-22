<template>
  <div>
    <div
      class="comm_popup_wrap_xlarge"
      style="overflow-y: hidden"
    >
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              :customMdList="codes.allOption"
              :customSmdList="codes.selOption"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="searchCond"
              :selected="frame0.selectData.dataServiceTypeCode"
              :pageId="pageId"
              codeId="COD_DTSVC_CMNC_TYPE"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DTSVC')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame0.selectData.searchText"
              :placeholder="$t('MSG_ALT_INP_DTSVC_ID_NM')"
              maxlength="100"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput"
            />
          </div>
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
            v-permission:read="'PGE_CMU_00022'"
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
            :showRowsPerPageControl="false"
            :multiselect="true"
            :headers="gridOrgColumns"
            :options="options"
            :data-source="dsOrgData"
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
            :showRowsPerPageControl="false"
            :multiselect="true"
            :headers="gridTarColumns"
            :options="options"
            :data-source="dsTarData"
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
        v-permission:create="'PGE_CMU_00022'"
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
import { urDataSet } from 'uidev-component/index.js'; // eslint-disable-line import/extensions
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';


export default {
  name: 'PGECMU00022P03',
  pname: 'PGE_CMU_00022',
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMU_00022',
    },
    dataList: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataPageId: '',
      codes: CommonConstants.selectOptions(),
      // eslint-disable-next-line new-cap
      dsOrgData: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsTarData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      frame0: {
        selectData: {
          searchText: '',
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          dataServiceTypeCode: {
            label: '',
            key: '',
          },
        },
      },
      searchFieldOldText: '',
      btnOrginStatus: true,
      btnTargetStatus: true,
    };
  },
  created() {
    this.gridOrgColumns = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '80px',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'dataServiceTypeName',
        width: '50px',
      }, {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'dataServiceIdentification',
        width: '120px',
      }, {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'dataServiceName',
      },
    ];
    this.gridTarColumns = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '80px',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'dataServiceTypeName',
        width: '80px',
      }, {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'dataServiceIdentification',
        width: '120px',
      }, {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'dataServiceName',
      },
    ];
  },
  mounted() {
    this.dataPageId = this.$props.dataList;
    this.onSearchMappedPage();
  },
  methods: {
    onSearchMappedPage() {
      http.request(this.pageId, 'DTS_CMU_00003', {
        path: {
          'page-id': this.dataPageId,
        },
      }).then(res => {
        if (res.data) {
          this.dsTarData.setData(res.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onReset() {
      console.log('temp');
      this.frame0.selectData.COD_MDLE.key = 'ALL';
      this.frame0.selectData.COD_SMDLE.key = 'ALL';
      this.$refs.searchCond.reset();
      this.frame0.selectData.searchText = '';
    },
    onSearch() {
      const queryParams = {
        moduleCode: utils.trim(this.frame0.selectData.COD_MDLE.key),
        subModuleCode: utils.trim(this.frame0.selectData.COD_SMDLE.key),
        dataServiceSearchCond: utils.trim(this.frame0.selectData.dataServiceTypeCode.key),
        dataServiceSearchWord: utils.trim(this.frame0.selectData.searchText),
      };

      http.request(this.pageId, 'DTS_CMU_00007', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          const orgData = [];
          utils.forEach(res.data, obj => {
            const objData = {
              dataServiceTypeName: utils.trim(obj.dataServiceTypeName),
              dataServiceIdentification: utils.trim(obj.dataServiceIdentification),
              dataServiceName: utils.trim(obj.dataServiceName),
              moduleName: utils.trim(obj.moduleName),
              subModuleName: utils.trim(obj.subModuleName),
            };
            orgData.push(objData);
          });
          this.dsOrgData.setData(orgData);
        }
      });
    },
    onLeftShift() {
      const selected = this.dsTarData.getSelected();
      utils.forEach(selected, item => {
        this.dsTarData.removeRow(item, false);
      });
      this.$refs.grdTartList.resetSelect();
    },
    onRightShift() {
      if (this.dsOrgData.data.length > 0) {
        const selectedData = this.dsOrgData.getSelected();
        utils.forEach(selectedData, item => {
          if (!this.isExistData(this.dsTarData.data, item)) {
            this.dsTarData.addRow({
              moduleName: item.moduleName,
              subModuleName: item.subModuleName,
              dataServiceTypeName: item.dataServiceTypeName,
              dataServiceIdentification: item.dataServiceIdentification,
              dataServiceName: item.dataServiceName,
            });
          }
        });
        this.$refs.grdOrgList.resetSelect();
        this.$refs.grdTartList.resetSelect();
      }
    },
    isExistData(dataList, selectedData) {
      const isExist = _.some(dataList, {
        dataServiceIdentification: selectedData.dataServiceIdentification,
      });
      return isExist;
    },
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.selectData.searchText;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.frame0.selectData.searchText = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    onCancel() {
      this.$emit('exit');
    },
    onSave() {
      const dtsvcList = this.dsTarData.data;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          const dataParams = [];
          utils.forEach(dtsvcList, data => {
            dataParams.push({
              pageId: this.dataPageId,
              dataServiceId: data.dataServiceIdentification,
            });
          });
          http.request(this.pageId, 'DTS_CMU_00015', { // dataservices reg.
            path: {
              'page-id': this.dataPageId,
            },
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
            this.$emit('exit');
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
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
