<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectSearchCondition"
              v-model="queryData.searchCondition"
              codeId="COD_APP_SEARCH_COND"
              :defaultOption="'all'"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="queryData.searchText"
              maxlength="100"
              @keyup.enter="onClickSearch"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <ur-data-grid
        ref="gridApplication"
        :headers="columnApplication"
        :data-source="dsApplication"
        :options="options"
        @grid:row-click="onSelectRow"
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
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ROW_HEIGHT = 55;

export default {
  name: 'PGE_CMP_00028', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      dsApplication: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        height: DEFAULT_ROWS_PER_PAGE * DEFAULT_ROW_HEIGHT,
      },
      selectedGridRowData: {},
      queryData: {
        searchCondition: '',
        searchText: '',
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.columnApplication = [
      {
        value: 'portalId',
        text: this.$t('MSG_TXT_PORTL'),
      },
      {
        value: 'applicationId',
        text: this.$t('MSG_TXT_APPLICATION_ID'),
      },
      {
        value: 'applicationName',
        text: this.$t('MSG_TXT_APPLICATION_NM'),
      },
      {
        value: 'deviceTypeName',
        text: this.$t('MSG_TXT_DVC_TYPE'),
      },
    ];
  },
  mounted() {},
  
  methods: {
    clearSelected() {
      this.selectedGridRowData = {};
    },
    onClickReset() {
      this.$refs.codeSelectSearchCondition.reset();
      this.queryData.searchText = '';
    },
    onClickSearch() {
      this.clearSelected();
      const dataParams = {
        searchCond: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
        deviceTypeValue: 6, // 110 (태블릿, 모바일)
      };
      http.request(this.contextPageId, 'DTS_CMP_00005', {
        query: dataParams,
      }).then(res => {
        this.dsApplication.setData(res.data);
      });
    },
    onSelectRow(row) {
      if(row) {
        this.selectedGridRowData = row;
      } else {
        utils.messageBox('information', this.$t('MSG_ALT_NOT_SEL_ITEM'));          
      }
    },
    onClickSelect() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('information', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        this.closePagePopup(this.selectedGridRowData);
      }
    },
    onClickCancel() {
      this.closePagePopup({});
    },
  },
};
</script>
<style scoped>
</style>
