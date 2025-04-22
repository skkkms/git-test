<template>
  <div>
    <div class="mrB20" />
  
     <sui-s-grid
        ref="tabGrid"
        :headers="gridColumnsTab"
        :data-source="ds0"
        :options="options"
        :initial-pagesize="10"
        :showRowsPerPageControl=false
       
      />
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CMU_00007_T05', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    componentId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      
      localdata4: [],
      ds0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        
        
      },
    };
  },
created()
{
  this.gridColumnsTab= [
    {
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
      }, {
        text: this.$t('MSG_TXT_PAGE_NM'),
        value: 'pageName',
      }, {
        text: this.$t('MSG_TXT_STT'),
        value: 'pageStatusName',
        width: 100,
      },
      ];
},


  watch: {
    componentId() {
      if (this.componentId) {
        this.selectComponentPages();
      } else {
        this.tabGridClear();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.componentId) {
        this.selectComponentPages();
      }
    });
  },
  datasets: [{
    id: 'ds0',
    type: 'local',
    data: 'localdata4',
    datafields: [
      { type: 'string', name: 'pageId', map: 'pageId' },
      { type: 'string', name: 'pageName', map: 'pageName' },
      { type: 'string', name: 'moduleCode', map: 'moduleCode' },
      { type: 'string', name: 'pageTypeCode', map: 'pageTypeCode' },
      { type: 'string', name: 'subModuleCode', map: 'subModuleCode' },
      { type: 'string', name: 'pageStatusCode', map: 'pageStatusCode' },
      { type: 'string', name: 'moduleName', map: 'moduleName' },
      { type: 'string', name: 'pageTypeName', map: 'pageTypeName' },
      { type: 'string', name: 'subModuleName', map: 'subModuleName' },
      { type: 'string', name: 'pageStatusName', map: 'pageStatusName' },
    ],
  }],
  methods: {
    selectComponentPages() {
      // 선택한 데이터서비스 등록페이지 목록 조회
      http.request(this.pageId, 'DTS_CMU_00036', {
        path: {
          'component-id': this.componentId,
        },
      }).then(res => {
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
