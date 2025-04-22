<template>
  <div style="height: 100%; overflow: hidden;">
    <div class="mrB20" />
    <sui-s-grid
      ref="girdHistory"
      :data-source="datasetHistory"
      :headers="defaultGridData0.columns"
      :initialRowsPerPage="5"
      :showRowsPerPageControl="false"
    />
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';

const dateTypeFields = ['firstRegistrationDTM'];
export default {
  name: 'PGE_DST_00002_T02', // eslint-disable-line vue/name-property-casing
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
      defaultGridData0: {
        columns: [
          {
            text: this.$t('MSG_TXT_WRD_NM'),
            value: 'dataStandardName',
          },
          {
            text: this.$t('MSG_TXT_WRD_PHSC_NM'),
            value: 'dataStdId',
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_WRD_EN_NM'),
            value: 'wordEnglishName',
          },
          {
            text: this.$t('MSG_TXT_WRD_DSCR'),
            value: 'dataStandardContent',
          },
          {
            text: this.$t('MSG_TXT_WRD_TYP_NM'),
            value: 'wordTypeName',
            width: 100,
          },
          {
            text: this.$t('MSG_TXT_DOM_CLSF_NM'),
            value: 'wordClsfName',
            width: 100,
          },
          {
            text: this.$t('MSG_TXT_UPDOM_CLSF_NM'),
            value: 'wordUpClsfName',
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_CHIN'),
            value: 'wordChineseCharacters',
            width: 100,
          },
          {
            text: this.$t('MSG_TXT_WRD_SRC'),
            value: 'wordSource',
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_APPL_DATE'),
            value: 'firstRegistrationDTM',
            cellsrenderer: (r, c, v, h, p) => utils.dateCellRenderer(r, c, v, h, p),
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_APPL_USER'),
            value: 'applicantName',
            component: {
              props: ['row', 'value'],
              template:
                `<cmp-user-name-link
                :displayType="'1'"
                :displayLanguageId="row.displayLanguageId"
                :userId="row.finalModificationUserId"
                :knoxId="row.knoxId"
                :loginId="row.loginId"
                :userName="row.registrantName"
                :userGlobalName="row.userGlobalName"
                :departmentName="row.departmentName"
                :departmentEnglishName="row.departmentEnglishName"
                :type="'link'"
              />`,
            },
          },
          {
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
      },
    };
  },
  methods: {
    getData(id) {
      if (id === null) {
        this.datasetHistory.setData([]);
      } else {
        http.request('PGE_DST_00002', 'DTS_DST_00091', {
          path: {
            'data-std-id': id,
          },
        }).then(res => {
          utils.dateformatToClientInArray(res.data, dateTypeFields);
          this.datasetHistory.setData(res.data);
        }).catch(error => {
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
