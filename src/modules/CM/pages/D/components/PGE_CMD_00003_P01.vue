<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="mrB20" />
      <sui-page-tab-step-type
        ref="tab"
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
      >
        <container
          :is="currentTabComponent"
          ref="tabContent"
          :pageId="pageId"
          :tabData="tabDataInfo"
          :attachGroupId="attachGroupId"
          :selectedGridRowData="selectedGridRowData"
          :attachGroupDeterminYn="selectedGridRowData.attachGroupDeterminYn"
          :popupOpenDefaultTab="popupOpenDefaultTab"
          @setFocus="setFocus"
          @onClickClose="onClickClose"
          @onClickSearch="onClickSearch"
          @moveTab="moveTab"
          @setTabInfo="setTabInfo"
        />
      </sui-page-tab-step-type>
    </div>
  </div>
</template>
<script>
import PGE_CMD_00003_T01 from './PGE_CMD_00003_T01';
// import PGE_CMD_00003_T02 from './PGE_CMD_00003_T02';
import PGE_CMD_00003_T03 from './PGE_CMD_00003_T03';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMD_00003_P01', // eslint-disable-line vue/name-property-casing
  components: {
    PGE_CMD_00003_T01,
    // PGE_CMD_00003_T02,
    PGE_CMD_00003_T03,
  },
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    attachGroupId: {
      type: String,
      default: null,
    },
    selectedGridRowData: {
      type: Object,
      default: null,
    },
    popupOpenDefaultTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      defaultTabIndex: 0,
      tabDataInfo: {
        t01: {},
        t02: {
          siteItemList: [],
          siteItemDeleteList: [],
        },
        t03: {},
      },
      tabItems: [
        {
          tabTitle: this.$t('MSG_TIT_ATTH_GRP_SET'),
          tabSubTitle: 'sub01',
          component: 'PGE_CMD_00003_T01', // pageID
        },
        /*
        {
          tabTitle: this.$t('MSG_TIT_EXID_SITE_EDIT'),
          tabSubTitle: 'sub02',
          component: 'PGE_CMD_00003_T02',
        },
        */
        {
          tabTitle: this.$t('MSG_TIT_ATTH_ITEM_EDIT'),
          tabSubTitle: 'sub03',
          component: 'PGE_CMD_00003_T03',
        },
      ],
      currentTabComponent: null,
      tabIndex: 0,
    };
  },

  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.$nextTick(() => {
      // this.setCurrentTabComponent(PGE_CMD_00003_T01);
    });
  },

  methods: {
    /**
     * tab foucs
     */
    setFocus(id) {
      switch (id) {
        case 'local':
          this.$refs.tabContent.$refs.mlngEditor.setFocusLocalTxtFld();
          break;
        case 'global':
          this.$refs.tabContent.$refs.mlngEditor.setFocusGlobalTxtFld();
          break;
        default:
          this.$refs.tabContent.$refs[id].setFocus();
          break;
      }
    },
    /**
     * tab event
     */
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    setTabInfo(tabInfo, idx) {
      this.tabDataInfo[idx] = tabInfo;
    },
    /**
     * tab 이동 event
     */
    moveTab(idx) {
      this.$refs.tab.changeIdx(idx);
    },
    /**
     * 닫기
     */
    onClickClose(key) {
      this.$emit('onClickClose', key);
    },
    onClickSearch() {
      this.$emit('onClickSearch');
    },
  },
};
</script>

<style scoped>
</style>
