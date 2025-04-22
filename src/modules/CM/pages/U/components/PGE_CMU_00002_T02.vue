<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="tabGrid"
      :data-source="ds0"
      :headers="gridColumnsTab"
      :showRowsPerPageControl="false"
    />

  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index';
export default {
  name: 'PGE_CMU_00002_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    dataServiceIdentification: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ds0: new urDataSet(),
      gridColumnsTab: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'pageTypeName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_PAGE_ID'),
        value: 'pageId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_PAGE_NM'),
        value: 'pageName',
      }, {
        text: this.$t('MSG_TXT_STT'),
        value: 'pageStatusName',
        width: 80,
      }],
      localdata1: [],
    };
  },
  watch: {
    dataServiceIdentification() {
      if (this.dataServiceIdentification) {
        this.selectRegistraionPages();
      } else {
        this.tabGridClear();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.dataServiceIdentification) {
        this.selectRegistraionPages();
      }
    });
  },
  methods: {
    selectRegistraionPages() {
      // 선택한 데이터서비스 등록페이지 목록 조회
      http.request(this.pageId, 'DTS_CMU_00008', {
        path: {
          'data-service-id': this.dataServiceIdentification,
        },
      }).then(res => {
        // util.printDatasetFieldsFromObject(res.data[0]);
        this.ds0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tabGridClear() {
      this.ds0.setData([]);
    },
  },
};
</script>
<style scoped>
</style>
