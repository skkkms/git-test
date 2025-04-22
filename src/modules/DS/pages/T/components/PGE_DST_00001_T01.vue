<template ref="tab1Grid">
  <div>
    <div class="mrB20" />
   
<sui-s-grid
        ref="mainGrid"
        :headers="defaultGridData0"
        :data-source="datasetInfo"
        :options="options"
        :showDisplayCountControl="true"
        :initial-pagesize="5"
      >
      </sui-s-grid>




  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: "PGE_DST_00001_T01", // eslint-disable-line vue/name-property-casing
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
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      
    };
  },
 
  computed: {},
  watch: {},
  mounted() {},
created()
{
 this.defaultGridData0 = [
          {
            text: this.$t("MSG_TXT_TRM_NM"),
            value: "termsName",
          },
          {
            text: this.$t("MSG_TXT_TRM_PHSC_NM"),
            value: "termsId",
            width: 200,
          },
          {
            text: this.$t("MSG_TXT_TRM_CNTN"),
            value: "termsContent",
          },
          {
            text: this.$t("MSG_TXT_DOMAIN_NAME"),
            value: "domainName",
            width: 200,
          },
          {
            text: this.$t("MSG_TXT_DT_TYP_NM"),
            value: "domainDataTypeName",
            width: 100,
          },
          {
            text: this.$t("MSG_TXT_LEN"),
            value: "domainLength",
            width: 80,
            cellsalign: 'right',
          },
          {
            text: this.$t("MSG_TXT_DECM_LGHT"),
            value: "domainDataDecimalLength",
            width: 100,
            cellsalign: 'right',
          },
        ];
      
},




  methods: {
    getDataByDomainId(domainId) {
      if (domainId === null) {
        this.datasetInfo.setData([]);
      } else {
        http
          .request("PGE_DST_00001", "DTS_DST_00007", {
            path: {
              "domain-id": domainId
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
