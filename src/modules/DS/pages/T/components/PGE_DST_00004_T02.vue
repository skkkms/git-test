<template>
  <div>
    <div class="mrB20" />
    <div style="overflow-y: hidden;">
      <sui-s-grid
        ref="girdHistory"
        :data-source="datasetHistory"
        :headers="defaultGridData0.columns"
        :initialRowsPeerPage="5"
        :showRowsPerPageControl="false"
      />
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
const dateTypeFields = ['firstRegistrationDTM'];
export default {
  name: 'PGE_DST_00004_T02', // eslint-disable-line vue/name-property-casing
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
      datasetHistory: new urDataSet(),
    };
  },
  created() {
    this.localdata = [];
    this.defaultGridData0 = {
      columns: [
        {
          text: this.$t('MSG_TXT_TRM_NM'),
          value: 'dataStandardName',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_TRM_PHSC_NM'),
          value: 'dataStdId',
          width: 200,
        },
        {
          text: this.$t('MSG_TXT_TRM_DSCR'),
          value: 'description',
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_TRM_EN_DSCR'),
          value: 'wordEnglishName',
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_DOMAIN_NAME'),
          value: 'referenceDomainName',
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_SRC_TRM_NM'),
          value: 'referenceTermId',
          width: 200,
        },
        {
          text: this.$t('MSG_TXT_MDLE'),
          value: 'moduleName',
          width: 110,
        },
        {
          text: this.$t('MSG_TXT_SMDLE'),
          value: 'trmSubModuleName',
          width: 130,
        },
        {
          text: this.$t('MSG_TXT_APPL_DATE'),
          value: 'firstRegistrationDTM',
          customValue(value) {
            var array = utils.dateformatToClient(value).split(" ").map(String);
            var dat = array[0].split("-").map(String);
            var value1 = dat[2]+"/"+dat[1]+"/"+dat[0]+" "+array[1];
            return value1;
          },
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_APPL_USER'),
          value: 'applicantName',
          width: 150,
          component: {
            props: ["row", "value"],
            template: `<cmp-user-name-link
                :pageId="'${this.$options.name}'"
                :displayType="'1'"
                :userName="row.userName"
                :userId="row.applicantName"
                :userGlobalName="row.userGlobalName"
                :departmentName="row.departmentName"
                :departmentEnglishName="row.departmentEnglishName"
                :displayLanguageId="row.displayLanguageId"
                :type="'link'"
              />
            `,
          },
        }, {
          text: this.$t('MSG_TXT_APPL_TYP'),
          value: 'applicationType',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_STT'),
          value: 'processingState',
          width: 150,
        },
      ],
    };
  },
  methods: {
    getData(id) {
      if (id === null || id=== '') {
        this.datasetHistory.setData([]);
      } else {
        http
          .request('PGE_DST_00004', 'DTS_DST_00091', {
            path: {
              'data-std-id': id,
            },
          })
          .then(res => {
            utils.dateformatToClientInArray(res.data, dateTypeFields);
            this.datasetHistory.setData(res.data);
          })
          .catch(error => {
            console.log(error);
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
