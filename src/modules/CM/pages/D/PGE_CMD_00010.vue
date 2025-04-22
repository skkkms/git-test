<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />
    <!-- Page Contents -->
    <sui-page-contents>
      <!-- Search Box -->
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_ATTH_GROUP_INFO') }}</h4>
      </div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectedCode.COD_MDLE"
              :selectedSmd="frame0.selectedCode.COD_SMDLE"
              :disabled="true"
              class="dp_flex"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_GRP_ID')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame0.attachGroupId"
              :readonly="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_GRP_NM')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame0.attachGroupName"
              :readonly="true"
            />
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5" />
        </div>
      </div>
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_ATTH_ITEM_SELT') }}</h4>
      </div>
      <sui-grid
        ref="grid"
        :hideHeader="true"
        :multiselect="true"
        :columns="gridColumns0"
        :dataset="'dsAttachItem'"
        width="100%"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickSelect"
        >
          {{ $t('MSG_BTN_SELT') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMD_00010', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      optionList: {
        COD_NCSR_YN: [{
          key: 'Y',
          label: this.$t('MSG_TXT_NCSR'),
        }, {
          key: 'N',
          label: this.$t('MSG_TXT_SEL'),
        }],
      },
      frame0: {
        selectedCode: {
          COD_MDLE: { key: '', label: '' },
          COD_SMDLE: { key: '', label: '' },
        },
        attachGroupId: '',
        attachGroupName: '',
      },
      localdata0: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_ITEM_NM'),
        datafield: 'attachItemName',
      }, {
        text: this.$t('MSG_TXT_NCSR_YN'),
        datafield: 'headquarterEssentialYn',
        width: '100px',
        createwidget: (row, column, value, htmlElement) => {
          utils.getGridCellFactory().createCellSelect(row, column, value, htmlElement,
            {
              optionList: this.optionList.COD_NCSR_YN,
              checkEditableFunction: this.checkEditableFunction,
            }, this.dsAttachItem, this.$refs.grid);
        },
        initwidget(row, column, value, htmlElement) {
          utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
        },
      }, {
        text: this.$t('MSG_TXT_EXTS'),
        datafield: 'attachPossibilityExtensionCode',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_ATTH_EXLD_PSBL_YN'),
        datafield: 'attachExcludePossibilityName',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_STDD_FORM'),
        datafield: 'buttonName',
        width: '80px',
        createwidget: (row, column, value, htmlElement) => {
          utils.getGridCellFactory().createCellButton(row, column, value, htmlElement, {
            handler: this.onGridSingleButtonClicked,
            type: 'link',
          }, this.dsAttachItem, this.$refs.grid);
        },
        initwidget(row, column, value, htmlElement) {
          utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
        },
      },
      ],
    };
  },
  computed: {},
  watch: {},
  datasets: [{
    id: 'dsAttachItem',
    type: 'local',
    data: 'localdata0',
    datafields: [
      { type: 'string', name: 'standardFormId', map: 'standardFormId' },
      { type: 'string', name: 'standardFormName', map: 'standardFormName' },
      { type: 'string', name: 'attachItemId', map: 'attachItemId' },
      { type: 'string', name: 'attachItemName', map: 'attachItemName' },
      { type: 'string', name: 'arrayalOrder', map: 'arrayalOrder' },
      { type: 'string', name: 'attachExcludePossibilityYn', map: 'attachExcludePossibilityYn' },
      { type: 'string', name: 'attachExcludePossibilityName', map: 'attachExcludePossibilityName' },
      { type: 'string', name: 'headquarterControlYn', map: 'headquarterControlYn' },
      { type: 'string', name: 'headquarterEssentialYn', map: 'headquarterEssentialYn' },
      { type: 'string', name: 'attachPossibilityExtensionCode', map: 'attachPossibilityExtensionCode' },
      { type: 'string', name: 'attachItemManagementYn', map: 'attachItemManagementYn' },
      { type: 'string', name: 'attachItemMultiLanguageId', map: 'attachItemMultiLanguageId' },
      { type: 'array', name: 'multiLanguageList', map: 'multiLanguageList' },
      { type: 'array', name: 'buttonName', map: 'buttonName' },
    ],
  }],
  mounted() {
    if (utils.isUndefined(this.pageInitialData.attachGroupId) || utils.isEmpty(this.pageInitialData.attachGroupId)) {
      utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ATTH_GRP_ID')));
    } else {
      this.setAttachItemList();
      this.setAttachGroupInfo();
    }
  },

  methods: {
    onGridSingleButtonClicked(value, dataRow) {
      utils.openLayerPopup('PGE_CMD_00008', () => {}, {
        pageInitialData: {
          standardFormId: dataRow.standardFormId,
        },
        size: 'md',
      });
    },
    setAttachGroupInfo() {
      const queryParams = {
        attachGroupId: this.pageInitialData.attachGroupId,
        searchCondition: 'ID',
      };

      http.request(this.$options.name, 'DTS_CMD_00007', {
        query: queryParams,
      }).then(res => {
        console.log(res.data[0]);
        utils.forEach(this.frame0, (value, key) => {
          if (utils.isEqual(key, 'selectedCode')) {
            this.frame0[key].COD_MDLE.key = res.data[0].moduleCode;
            this.frame0[key].COD_SMDLE.key = res.data[0].subModuleCode;
          } else {
            this.frame0[key] = res.data[0][key];
          }
        });
      });
    },
    setAttachItemList() {
      http.request(this.$options.name, 'DTS_CMD_00008', {
        path: {
          'attach-group-id': this.pageInitialData.attachGroupId,
        },
      }).then(res => {
        const itemList = utils.clone(res.data);

        utils.forEach(res.data, (value, key) => {
          itemList[key].buttonName = this.$t('MSG_TXT_SRCH');
        });

        this.dsAttachItem.setRawData(itemList); // 데이터 셋에 데이터를 넣는 함수
      });
    },
    checkEditableFunction() {
      return false;
    },
    onClickSelect() {
      const selectedData = this.dsAttachItem.getSelectedRows();
      if (selectedData.length !== 0) {
        this.closePagePopup(selectedData);
        console.log(selectedData);
      } else {
        // 선택 안했을 때
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));// 선택 된 항목이 없습니다.
      }
    },
    onClickCancel() {
      this.closePagePopup('');
    },
  },
};
</script>

<style scoped>
</style>
