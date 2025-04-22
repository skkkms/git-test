<template>
  <div>
    <div class="mrB20" />
    <div style="overflow-y: hidden;">
      <sui-s-grid
        ref="mainGrid"
        :data-source="datasetInfo"
        :headers="defaultGridData0.columns"
        :initialRowsPerPage="5"
        :showRowsPerPageControl="false"
      />
    </div>
  </div>
</template>
<script>

import { urDataSet } from 'uidev-component/index.js';
export default {
  name: "PGE_DST_00004_T01", // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: ""
    },
    selectedPageId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      localdata: [],
      datasetInfo: new urDataSet(),
    };
  },
  
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.localdata = [];
    this.defaultGridData0 = {
      columns: [
        {
          text: this.$t("MSG_TXT_ENTY_NM"),
          value: "tableId",
          width: 300
        },
        {
          text: this.$t("MSG_TXT_TRM_PHSC_NM"),
          value: "entityName",
          width: 300
        },
        {
          text: this.$t("MSG_TXT_ATRB_NM"),
          value: "attributeName"
        },
      ]
    }
  },
  methods: {
    getData(termID) {
      if (termID === null) {
        this.datasetInfo.setData([]);
      } else if(termID != '') {
        http
          .request("PGE_DST_00004", "DTS_DST_00023", {
            path: {
              "term-id": termID
            }
          })
          .then(res => {
            this.datasetInfo.setData(res.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
.line-textarea {
  padding: 0px 8px;
  line-height: 28px;
}
</style>
