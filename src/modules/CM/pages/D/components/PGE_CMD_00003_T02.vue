<template>
  <div>
    <div class="mrB30" />
    <div class="comm_gridTop_wrap">
      <div class="btn_wrapL">
        <sui-button
          type="button"
          class="comm_btn_gridTop"
          @click="onSitePopup"
        >
          {{ $t('MSG_BTN_ROW_ADD') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_gridTop"
          @click="onClickDel"
        >
          {{ $t('MSG_BTN_ROW_DEL') }}
        </sui-button>
      </div>
    </div>
    <sui-grid
      ref="grid"
      :hideHeader="true"
      :multiselect="true"
      :columns="gridColumns0"
      :columnsautoresize="true"
      :dataset="'dsSite'"
      width="100%"
    />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickClose"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="moveTab(-1)"
      >
        {{ $t('MSG_BTN_PREV') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="moveTab(1)"
      >
        {{ $t('MSG_BTN_NEXT') }}
      </sui-button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMD_00003_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    tabData: {
      type: Object,
      default: null,
    },
    idx: {
      type: Number,
      default: 1,
    },
    attachGroupId: {
      type: String,
      default: null,
    },
    attachGroupDeterminYn: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      // Codes
      localdata0: [],
      localdata1: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_GNRZ_AREA'),
        datafield: 'generalizationAreaName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_SITE_ID'),
        datafield: 'siteId',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_SITE_NM'),
        datafield: 'siteName',
      }, {
        text: this.$t('MSG_TXT_SITE_ABBR'),
        datafield: 'siteAbbreviationName',
      }, {
        text: this.$t('MSG_TXT_SITE_ABBR_EN'),
        datafield: 'siteEnglishAbbreviationName',
      },

      ],
    };
  },
  computed: {},
  watch: {},
  datasets: [{
    id: 'dsSite',
    type: 'local',
    data: 'localdata0',
    datafields: [
      { type: 'string', name: 'rowType', map: 'rowType' },
      { type: 'string', name: 'siteId', map: 'siteId' },
      { type: 'string', name: 'siteName', map: 'siteName' },
      { type: 'string', name: 'siteAbbreviationName', map: 'siteAbbreviationName' },
      { type: 'string', name: 'siteEnglishAbbreviationName', map: 'siteEnglishAbbreviationName' },
      { type: 'string', name: 'generalizationAreaCode', map: 'generalizationAreaCode' },
      { type: 'string', name: 'generalizationAreaName', map: 'generalizationAreaName' },
    ],
  },
  {
    id: 'dsSiteDelete',
    type: 'local',
    data: 'localdata1',
    datafields: [
      { type: 'string', name: 'rowType', map: 'rowType' },
      { type: 'string', name: 'siteId', map: 'siteId' },
      { type: 'string', name: 'siteName', map: 'siteName' },
      { type: 'string', name: 'siteAbbreviationName', map: 'siteAbbreviationName' },
      { type: 'string', name: 'siteEnglishAbbreviationName', map: 'siteEnglishAbbreviationName' },
      { type: 'string', name: 'generalizationAreaCode', map: 'generalizationAreaCode' },
      { type: 'string', name: 'generalizationAreaName', map: 'generalizationAreaName' },
    ],
  }],
  mounted() {
    if (!utils.isEmpty(this.attachGroupId)) {
      this.gridDataset();
    }
  },
  deactivated() {
    // tab 이동 시 해당 tab의 data를 부모창(p01)에 저장.
    this.dataSet();
  },

  methods: {
    /**
     * 제외 사업장 목록 조회
     */
    gridDataset() {
      http.request(this.pageId, 'DTS_CMD_00017', {
        query: {
          attachGroupId: this.attachGroupId,
        },
      }).then(res => {
        this.dsSite.setRawData(res.data); // 데이터 셋에 데이터를 넣는 함수
      });
    },
    /**
     * 사업장 선택 공통 팝업
     */
    onSitePopup() {
      utils.openLayerPopup('PGE_CMY_00016', this.sitePopupCallback, {
        pageInitialData: {
          multiselect: true,
          siteName: '',
          siteAbbreviationName: '',
        },
        size: 'lg',
      });
    },
    sitePopupCallback(objSite) {
      if (objSite != null && !utils.isEmpty(objSite) && objSite.length > 0) {
        utils.remove(objSite, index => {
          const rowIndex = utils.findIndex(this.dsSite.data, o => utils.isEqual(o.siteId, index.siteId));

          return rowIndex > -1;
        });

        this.dsSite.addRows(objSite);
      }
    },
    /**
     * 행 삭제
     */
    onClickDel() {
      const deleteRows = [];
      const selectedIndexes = this.dsSite.getSelectedIndexes();

      if (this.dsSite.getSelectedIndexes().length <= 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')); // 선택 된 항목이 없습니다.
        return false;
      }

      utils.forEach(selectedIndexes, index => {
        const rowId = this.dsSite.data[index]['dataset-row-id'];
        const rowIndex = utils.findIndex(this.dsSite.originalData, o => utils.isEqual(o['dataset-row-id'], rowId));

        if (rowIndex > -1) {
          deleteRows.push(this.dsSite.data[index]);
        }
      });

      this.dsSite.deleteRows(this.dsSite.getSelectedIndexes());
      this.dsSiteDelete.addRows(deleteRows);

      this.dsSite.clearSelection();

      return null;
    },
    /**
     * 닫기
     */
    onClickClose() {
      this.$emit('onClickClose', false);
    },
    /**
     * 이전,다음
     * TAB 이동
     */
    moveTab(value) {
      const idx = this.idx + value;

      this.$emit('moveTab', idx);
    },
    /**
     * 부모화면에 현재 TAB의 DATA 저장.
     */
    dataSet() {
      const info = {
        siteItemList: this.dsSite.data,
        siteItemDeleteList: this.dsSiteDelete.data,
      };

      this.$emit('setTabInfo', info, 't02');
    },
  },
};
</script>

<style scoped>
</style>
