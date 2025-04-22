<template>
  <div>
    <div class="mrB10" />
    <sui-s-grid
      ref="grid0"
      :data-source="dsMessageResourcePage"
      :headers="defaultGridData0.columns"
      :showRowsPerPageControl="false"
    />
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00003_T02', // eslint-disable-line vue/name-property-casing
  pname: 'PGE_CMU_00003',
  extends: BasePage,
  props: {
    messageResourcesId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      pageName: this.$t('MSG_TXT_MSG_RESO_RGST_PAGE'),
      frame0: {
        data: {},
      },
      localdata: [],
      dsMessageResourcePage: new urDataSet(),
      defaultGridData0: {
        dataSource: {
          value: [],
          datatype: 'array',
        },
        columns: [{
          text: this.$t('MSG_TXT_MDLE'),
          value: 'moduleName',
          width: '100px',
        }, {
          text: this.$t('MSG_TXT_SMDLE'),
          value: 'subModuleName',
          width: '100px',
        }, {
          text: this.$t('MSG_TXT_TYPE'),
          value: 'pageTypeName',
          width: '100px',
        }, {
          text: this.$t('MSG_TXT_PAGE_ID'),
          value: 'pageId',
          width: '150px',
        }, {
          text: this.$t('MSG_TXT_PAGE_NM'),
          value: 'pageName',
        }, {
          text: this.$t('MSG_TXT_STT'),
          value: 'pageStatusName',
          width: '100px',
        }],
      },
    };
  },
  computed: { // 계산된 속성, property로 사용가능
  },
  watch: { // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    messageResourcesId(obj) {
      if (!this._inactive) {
        if (!utils.isEmpty(obj)) {
          this.selectDataFormInput();
        } else {
          this.localdata = [];
        }
      }
    },
  },
  activated() {
    if (this.messageResourcesId) {
      this.selectDataFormInput();
    } else {
      this.localdata = [];
    }
  },
  mounted() { // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    if (this.messageResourcesId) {
      this.selectDataFormInput();
    } else {
      this.localdata = [];
    }
  },
  methods: {
    loadCode() {
    },
    loadData() { // get contents data, grid etc..
    },
    selectDataFormInput() {
      http.request(this.$options.pname, 'DTS_CMU_00014', {
        path: {
          'message-resource-id': this.messageResourcesId,
        },
      }).then(res => {
        if (res.data.length > 0) {
          this.dsMessageResourcePage.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
        } else {
          this.dsMessageResourcePage.setData([]); // 데이터 셋에 데이터를 넣는 함수
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
