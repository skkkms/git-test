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
            <sui-code-select
              ref="smComboFrame0"
              :pageId="pageId"
              :selected="frame0.selectData.COD_MDLE"
              codeId="COD_MDLE"
              :defaultOption="'all'"
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
              codeId=" COD_MSG_RESO_TYPE"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CMPNT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame0.selectData.searchText"
              :placeholder="$t('MSG_ALT_INP_MSG_ID_VAL')"
              maxlength="100"
              @keyup.enter="onSearch"
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
      },
      {
        text: this.$t('MSG_TXT_MSG_RESO_ID'),
        value: 'messageResourcesId',
        width: '190px',
      },
      {
        text: this.$t('MSG_TXT_MSG_RESO_VAL'),
        value: 'multiLanguageContent',
      },
      {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'messageResourcesTypeName',
        width: '70px',
      },
    ];
    this.gridTarColumns = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_MSG_RESO_ID'),
        value: 'messageResourcesId',
        width: '190px',
      },
      {
        text: this.$t('MSG_TXT_MSG_RESO_VAL'),
        value: 'multiLanguageContent',
      },
      {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'messageResourcesTypeName',
        width: '70px',
      },
    ];
  },
  mounted() {
    this.dataPageId = this.$props.dataList;
    this.onSearchMappedPage();
  },
  methods: {
    onSearchMappedPage() {
      http.request(this.pageId, 'DTS_CMU_00019', {
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
      this.frame0.selectData.COD_MDLE.key = 'ALL';
      this.$refs.searchCond.reset();
      this.frame0.selectData.searchText = '';
    },
    onSearch() {
      // search problem
      const queryParams = {
        messageResourcesTypeCode: utils.trim(this.frame0.selectData.dataServiceTypeCode.key),
        searchMsgResoCond: 'ALL',
        searchMsgResoText: utils.trim(this.frame0.selectData.searchText),
        lngId: this.$store.getters.userInfo.langId,
        moduleCode: utils.trim(this.frame0.selectData.COD_MDLE.key),
      };

      http.request(this.pageId, 'DTS_CMU_00012', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          const orgData = [];
          utils.forEach(res.data, obj => {
            const objData = {
              messageResourcesId: utils.trim(obj.messageResourcesId),
              moduleName: utils.trim(obj.moduleName),
              multiLanguageContent: utils.trim(obj.multiLanguageContent),
              messageResourcesTypeName: utils.trim(obj.messageResourcesTypeName),
              lngId: this.$store.getters.userInfo.langId,
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
              lngId: this.$store.getters.userInfo.langId,
              moduleName: item.moduleName,
              messageResourcesTypeName: item.messageResourcesTypeName,
              multiLanguageContent: item.multiLanguageContent,
              messageResourcesId: item.messageResourcesId,
            });
          }
        });
        this.$refs.grdOrgList.resetSelect();
        this.$refs.grdTartList.resetSelect();
      }
    },
    isExistData(dataList, selectedData) {
      const isExist = _.some(dataList, {
        messageResourcesId: selectedData.messageResourcesId,
      });
      return isExist;
    },
    onSave() {
      const dtsvcList = this.dsTarData.data;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          const dataParams = [];
          utils.forEach(dtsvcList, data => {
            dataParams.push({
              pageId: this.dataPageId,
              messageResourcesId: data.messageResourcesId,
            });
          });
          http.request(this.pageId, 'DTS_CMU_00020', { // dataservices reg.
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
    onCancel() {
      this.$emit('exit');
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
