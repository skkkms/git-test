<template>
  <div>
    <div class="mrB20" />
    <div style="height: 100%;overflow: hidden;">
      <sui-s-grid
        ref="mainGrid"
        :data-source="datasetInfo"
        :headers="defaultGridData0"
        :options="options"
        :showRowsPerPageControl="false"
      />
    </div>
  </div>
</template>
<script>

// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_DST_00002_T01', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedPageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localdata: [],
      // eslint-disable-next-line new-cap
      datasetInfo: new urDataSet(),
      options: {
        // infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },

    };
  },
  computed: {},
  watch: {},
  created() {
    this.defaultGridData0 = [
      {
        text: this.$t('MSG_TXT_TRM_NM'),
        value: 'termName',
      },
      {
        text: this.$t('MSG_TXT_TRM_PHSC_NM'),
        value: 'termId',
        width: 250,
      },
      {
        text: this.$t('MSG_TXT_TRM_DSCR'),
        value: 'termContent',
      },
      {
        text: this.$t('MSG_TXT_DOMAIN_NAME'),
        value: 'domainName',
        width: 200,
      },
      {
        text: this.$t('MSG_TXT_DT_TYP'),
        value: 'domainDataTypeName',
        width: 100,
      },
      {
        text: this.$t('MSG_TXT_LEN'),
        value: 'domainLength',
        width: 80,
      },
      {
        text: this.$t('MSG_TXT_DECM_LGHT'),
        value: 'domainDataDecimalLength',
        width: 100,
      },
    ];
  },
  mounted() {},
  methods: {
    getData(id) {
      if (id === null) {
        this.datasetInfo.setData([]);
      } else {
        http
          .request('PGE_DST_00002', 'DTS_DST_00077', {
            path: {
              'word-id': id,
            },
          })
          .then(res => {
            this.datasetInfo.setData(res.data);
          })
          .catch(error => {
            console.log('On Row Select Error');
          });
      }
    },
  },
};
</script>
<style scoped>
.line-textarea {
  padding: 0px 8px;
  line-height: 28px;
}
</style>
