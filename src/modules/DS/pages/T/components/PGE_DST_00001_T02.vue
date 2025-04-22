<template>
  <div>
    <div class="mrB20" />
    <!-- <sui-grid ref="girdHistory"
          :dataset="'datasetHistory'"
          :columns="defaultGridData0.columns"
          :enabletooltips="true"
          :initialPagesize="5"
          :showDisplayCountControl="false"
          /> -->

          <sui-s-grid ref="girdHistory"
          :data-source="datasetHistory"
          :headers="defaultGridData0.columns"
          :enabletooltips="true"
          :initialRowsPerPage="5"
          :showDisplayCountControl="false"
          />
  </div>
</template>
<script>
const dateTypeFields = ['firstRegistrationDTM'];
import { urDataSet } from 'uidev-component/index';
export default {
  name: 'PGE_DST_00001_T02', // eslint-disable-line vue/name-property-casing
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
      datasetHistory: new urDataSet(),
      localdata: [],
      defaultGridData0: {
        columns: [
          {
            text: this.$t('MSG_TXT_UPDOM_CLSF_NM'),
            value: 'upperDomainClassificationName',
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_DOM_CLSF_NM'),
            value: 'domainClassificationName',
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_DOMAIN_NAME'),
            value: 'dataStandardName',
            width: 200,
          },
          {
            text: this.$t('MSG_TXT_DOM_PHSC_NM'),
            value: 'dataStdId',
            width: 120,
          },
          {
            text: this.$t('MSG_TXT_DOM_DSCR'),
            value: 'dataStandardContent',
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
              :displayLanguageId= "row.displayLanguageId"
              :loginId="row.loginId"
              :knoxId="row.knoxId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,
        },
            // createwidget: (row, column, value, htmlElement) => {
            //   utils.getGridCellFactory().createCellUserName(
            //     row,
            //     column,
            //     value,
            //     htmlElement,
            //     {
            //       displayType: '1',
            //       type: 'link',
            //       datafieldMap: {
            //         displayLanguageId: 'displayLanguageId',
            //         loginId: 'loginId',
            //         knoxId: 'knoxId',
            //         userName: 'userName',
            //         userGlobalName: 'userGlobalName',
            //         departmentName: 'departmentName',
            //         departmentEnglishName: 'departmentEnglishName',
            //       },
            //     },
            //     this.datasetHistory,
            //     this.$refs.girdHistory,
            //   );
            // },
            // initwidget(row, column, value, htmlElement) {
            //   utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
            // },
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
      },
    }
  },
  datasets: [
    {
      id: 'datasetHistory',
      type: 'local',
      data: 'localdata',
      datafields: [
        { name: 'upperDomainClassificationName', type: 'string', map: 'upperDomainClassificationName' },
        { name: 'domainClassificationName', type: 'string', map: 'domainClassificationName' },
        { name: 'dataStandardName', type: 'string', map: 'dataStandardName' },
        { name: 'dataStdId', type: 'string', map: 'dataStdId' },
        { name: 'dataStandardContent', type: 'string', map: 'dataStandardContent' },
        { name: 'domainDataTypeName', type: 'string', map: 'domainDataTypeName' },
        { name: 'domainLength', type: 'string', map: 'domainLength' },
        { name: 'domainDataDecimalLength', type: 'string', map: 'domainDataDecimalLength' },
        { name: 'firstRegistrationDTM', type: 'string', map: 'firstRegistrationDTM' },
        { name: 'applicantName', type: 'string', map: 'applicantName' },
        { name: 'applicationType', type: 'string', map: 'applicationType' },
        { name: 'processingState', type: 'string', map: 'processingState' },
        {
          name: 'displayLanguageId',
          type: 'string',
          map: 'displayLanguageId',
        },
        {
          name: 'knoxId',
          type: 'string',
          map: 'knoxId',
        },
        {
          name: 'loginId',
          type: 'string',
          map: 'loginId',
        },
        {
          name: 'userName',
          type: 'string',
          map: 'userName',
        },
        {
          name: 'userName_2',
          type: 'string',
          map: 'userName_2',
        },
        {
          name: 'userGlobalName',
          type: 'string',
          map: 'userGlobalName',
        },
        {
          name: 'departmentName',
          type: 'string',
          map: 'departmentName',
        },
        {
          name: 'departmentEnglishName',
          type: 'string',
          map: 'departmentEnglishName',
        },
      ],
    },
  ],
  methods: {
    getDataByDomainId(id){
      if (id === null) {
        this.datasetHistory.setData([]);
      }else{
          http.request('PGE_DST_00001', 'DTS_DST_00091', {
          path: {
             'data-std-id':  id,
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
