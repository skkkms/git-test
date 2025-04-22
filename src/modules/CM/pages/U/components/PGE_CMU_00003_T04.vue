<template>
  <div>
    <div class="mrB10" />
    <sui-s-grid
      ref="grid"
      :data-source="dsMessageResourceComponent"
      :headers="defaultGridData0.columns"
      :showRowsPerPageControl="false"
      @grid:row-click="onRowClick"
    />
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00003_T04', // eslint-disable-line vue/name-property-casing
  pname: 'PGE_CMU_00003',
  extends: BasePage,
  props: {
    messageResourcesId: {
      type: String,
      default: null,
    },
    pageId: {
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
      // eslint-disable-next-line new-cap
      dsMessageResourceComponent: new urDataSet(),
      defaultGridData0: {
        dataSource: {
          datafields: [],
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
          text: this.$t('MSG_TXT_CMPNT_ID'),
          value: 'componentId',
        }, {
          text: this.$t('MSG_TXT_CMPNT_NM'),
          value: 'componentName',
        }, {
          text: this.$t('MSG_TXT_CMPNT_TAG'),
          value: 'componentTag',
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
          this.dsMessageResourceComponent.setData([]);
        }
      }
    },
  },
  activated() {
    if (this.messageResourcesId) {
      this.selectDataFormInput();
    } else {
      this.dsMessageResourceComponent.setData([]);
    }
  },
  mounted() { // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    if (this.messageResourcesId) {
      this.selectDataFormInput();
    } else {
      this.dsMessageResourceComponent.setData([]);
    }
  },
  methods: {
    selectDataFormInput() {
      http.request(this.pageId, 'DTS_CMU_00061', {
        query: {
          messageResourcesId: this.messageResourcesId,
        },
      }).then(res => {
        if (res.data.length > 0) {
          this.dsMessageResourceComponent.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
        } else {
          this.dsMessageResourceComponent.setData([]); // 데이터 셋에 데이터를 넣는 함수
        }
      });
    },
    onRowClick(row) {
      if (this.dsMessageResourceComponent.getSelected().length === 0) {
        this.dsMessageResourceComponent.setSelect(row, false);
      }
    },
  },
};
</script>
<style scoped>
</style>
