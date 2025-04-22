<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="inbox">
        <sui-page-tab-box-type
          ref="tab"
          :tabItems="tabItems"
          :defaultTabIndex="defaultTabIndex"
          :setCurrentTabComponent="onSetCurrentTabComponent"
          @change-tab-idx="onChangeTabIdx"
        >
          <container
            :is="currentTabComponent"
            :pageId="this.$options.name"
            :pageInitialData="pageInitialData"
            @getPageInfo="getPageInfo"
            @getDashboardInfo="getDashboardInfo"
            @close="close"
          />
        </sui-page-tab-box-type>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>

// eslint-disable-next-line import/extensions
import {urDataSet} from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMU_00018_T01.vue';
import tab02 from './components/PGE_CMU_00018_T02.vue';

/* global http */
export default {
  name: 'PGE_CMU_00018', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
  },
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dsPopupPage: new urDataSet(),
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_PAGE'),
          component: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_DASHBOARD'),
          component: tab02,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMU_00018';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    getPageInfo(selectedData) {
      console.log(selectedData);
      this.closePagePopup(selectedData);
    },
    getDashboardInfo(selectedData) {
      console.log(selectedData);
      this.closePagePopup(selectedData);
    },
    close() {
      this.closePagePopup();
    },
  },
};
</script>
<style scoped>
</style>
