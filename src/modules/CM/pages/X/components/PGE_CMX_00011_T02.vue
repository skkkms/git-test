<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="grid2"
      :headers="gridColumns2"
      :data-source="dsAppList"
      :options="options"
    />    
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00011_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {    
    selectedGridRowData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dsAppList: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(dataObj) {
      if (utils.isEmpty(dataObj)) {
        this.tabGridClear();
      } else {
        this.appListLoad();
      }
    },
  },
  created() {
    this.gridColumns2 = [{
      text: this.$t('MSG_TXT_MBL_APP_ID'),
      value: 'mobileApplicationId',
    }, {
      text: this.$t('MSG_TXT_MBL_APP_NM'),
      value: 'mobileApplicationName',
    }];
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedGridRowData)) {
        this.appListLoad();
      }
    });
  },

  methods: {
    appListLoad() {
      const mobileApplicationCategoryId = this.selectedGridRowData.mobileApplicationCategoryId;

      http.request(this.contextPageId, 'DTS_CMX_00009', {
        path: {
          'mobile-application-category-id': this.selectedGridRowData.mobileApplicationCategoryId
        },
      }).then(res => {
        this.dsAppList.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tabGridClear() {
      this.dsAppList.setData([]);
    },
  },
};
</script>
<style scoped>
</style>
