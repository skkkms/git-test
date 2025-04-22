<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
        :headers="gridColumns2"
        :data-source="dsMPRevisionHistoryList"
        :options="options"
        @grid:selected="onSelectRevisionHistory"
        @link-clicked="onSelectRevisionHistory"
      >
    </sui-s-grid>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMP_00026_T03', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedGridRowData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: true,
      },
      dsMPRevisionHistoryList: new urDataSet(),
      localdata2: [],
      gridColumns2: [
        {
          value: 'versionId',
          text: this.$t('MSG_TXT_VER_ID'),
        },
        {
          value: 'versionName',
          text: this.$t('MSG_TXT_VER_NM'),
        },
        {
          value: 'mobilePortalforcedVersionYn',
          text: this.$t('MSG_TXT_MBL_PORTL_FRCD_VER_YN'),
        },
        {
          value: 'mobilePortalStateCode',
          text: this.$t('MSG_TXT_MBL_PORTL_STT_CD'),
        },
        {
          value: 'useYn',
          text: this.$t('MSG_TXT_USE_YN'),
        },
        {
          value: 'download',
          text: this.$t('MSG_TXT_APK_FPATH'),
          component: {
        props: ['row', 'value'],
        template:
          `
            <div>
              <a 
              href="#" 
              class="download-apk-from-revision-history-mobile-portal-management-hyperlink"
              @click="linkClicked"
             >
                {{ row.versionName }}
              </a>
            </div>
          `,
        methods: {
          linkClicked(row) {
            console.log('downloading');
            // that.apkfilePath = this.row.apkfilePath;
            this.$emit('link-clicked');
          } 
       },
      },
        },
        {
          value: 'finalModificationDTM',
          text: this.$t('MSG_TXT_FNL_MDFC_DTM'),
        },
        {
          value: 'finalModificationUserId',
          text: this.$t('MSG_TXT_FNL_MDFC_USR_ID'),
          component: {
            props: ['row', 'value'],
            template:
              `<cmp-user-name-link
                :pageId="'PGE_CMX_00011'"
                :displayType="'1'"
                :displayLanguageId="row.finalModificationDisplayLangId"
                :userId="row.finalModificationUserId"
                :userName="row.finalModificationUserName"
                :userGlobalName="row.finalModificationUserGlobalName"
                :departmentName="row.finalModificationDepartmentName"
                :departmentEnglishName="row.finalModificationDepartmentEnglishName"
                :type="'link'"
              />`
          },
        },
      ],
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(dataObj) {
      if (utils.isEmpty(dataObj)) {
        this.tabGridClear();
      } else {
        this.revisionHistoryListLoad();
      }
    },
  },
  created() {
    const that = this;
    that.apkfilePath = '';
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedGridRowData)) {
        this.revisionHistoryListLoad();
      }
    });
  },

  methods: {
    formatDTM(dtm) {
      const duplicateDtm = dtm;
      dtm = '';
      for(var i = 0; i < duplicateDtm.length; i++ )
      {
        if(dtm.length===4 || dtm.length===7) {
          dtm += '-';
        }
        else if(dtm.length===10) {
          dtm += ' ';
        }
        else if(dtm.length===13 || dtm.length===16) {
          dtm += ':';
        }
        dtm += duplicateDtm[i];
      }

      return dtm;
    },
    revisionHistoryListLoad() {
      const dataParams = {
        versionId: this.selectedGridRowData.versionId,
      };
      http.request(this.contextPageId, 'DTS_CMX_00020', {
        query: dataParams,
      }).then(res => {
        
        for(var i=0; i<res.data.length; i++)
        {
          res.data[i].finalModificationDTM = this.formatDTM(res.data[i].finalModificationDTM);
          res.data[i].download = 'click to download';
          var code = res.data[i].mobilePortalStateCode;
          if(code[1] == '0')
            res.data[i].mobilePortalStateCode = 'In development';
          if(code[1] == '1')
            res.data[i].mobilePortalStateCode = 'test';
          if(code[1] == '2')
            res.data[i].mobilePortalStateCode = 'In use';
          if(code[1] == '3')
            res.data[i].mobilePortalStateCode = 'On stop';
          
        }

        this.dsMPRevisionHistoryList.setData(res.data);

      });
    },
    tabGridClear() {
      this.dsMPRevisionHistoryList.setData([]);
    },
    downloadAPKFile(row) {
      http.request(this.contextPageId, 'DTS_CMZ_00068', {
        path: {
          'target-path': 'storage',
        },
        query: {
          serverFileName: row.apkfilePath,
          originalFileName: '', // resD.originalFileName,
        },
        responseType: 'arraybuffer',
      }).then(res => {
        utils.downloadBlob(res, row.versionName + '.apk');
      });
    },
    onSelectRevisionHistory(row) {
      if(row) {
        this.downloadAPKFile(row);
      }
    },
    
  },
};
</script>
<style>
  .download-apk-from-revision-history-mobile-portal-management-hyperlink {
    color: blue;
  }
</style>
