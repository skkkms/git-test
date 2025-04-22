<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <sui-s-grid
        ref="gridMobileApplicationHistory"
        :headers="gridColumns"
        :data-source="dsMobileApplicationHistory"
        :options="options"
        :showRowsPerPageControl="false"
      />
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';
import p02 from './PGE_CMX_00013_P02.vue';

export default {
  name: 'PGE_CMX_00013_T04', // eslint-disable-line vue/name-property-casing
  components: {
    p02,
  },
  extends: BasePage,
  props: {
    selectedGridRowMobileAppMgmtData: {
      type: Object,
      required: false,
    },
    selectedGridRowMobileAppVersionData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      mobileApplicationVersionRevisionDetails: '',
      showPopUp: false,
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: true,
      },
      dsMobileApplicationHistory: new urDataSet(),
      
    };
  },
  computed: {},
  watch: {
    selectedGridRowMobileAppVersionData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.revisionHistoryListLoad();
      } else {
        this.resetTab();
      }
    },
  },
  created() {
    const that = this;
    this.gridColumns = [
      {
        value: 'mobileApplicationId',
        text: this.$t('MSG_TXT_MBL_APP_ID'),
      },
      {
        value: 'mobileApplicationVersionId',
        text: this.$t('MSG_TXT_MBL_APP_VER_ID'),
      },
      {
        value: 'mobileApplicationVersionName',
        text: this.$t('MSG_TXT_MBL_APP_VER_NM'),
      },
      {
        value: 'userAction',
        text: this.$t('MSG_TXT_USR_ACTN'),
        component: {
          props: ['row', 'value'],
          template:
         `<a style="color:#60a3ef;"v-on:click="linkClicked"> {{value}}</a>`,
          methods: {
            linkClicked(row) {
              that.mobileApplicationVersionRevisionDetails = this.row;
              that.showPopUp = true;
              that.$emit('show-rev-hist-popup', that.mobileApplicationVersionRevisionDetails.revisionHistoryUid);
            },
          },
        },
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
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_FNL_MDFC_DTM'),
        customValue: function(value, row) {
          return utils.dateformatToClient(value)
        },
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        this.revisionHistoryListLoad();
      }
    });
  },

  methods: {
    resetTab() {
      this.tabGridClear();
    },
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
        mobileApplicationId: this.selectedGridRowMobileAppVersionData.mobileApplicationId,
        mobileApplicationVersionId: this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId,
      };
      http.request(this.contextPageId, 'DTS_CMX_00020', {
        query: dataParams,
      }).then(res => {
        
        for (var i=0; i<res.data.length; i++)  {
        //   res.data[i].finalModificationDTM = this.formatDTM(res.data[i].finalModificationDTM);
        }

        this.dsMobileApplicationHistory.setData(res.data);

      });
    },
    tabGridClear() {
      this.dsMobileApplicationHistory.setData([]);
    },
    changeShowPopUp(row) {
      if (row) {
        console.log('Pop-up');
        // this.mobileApplicationVersionRevisionDetails = row;
        this.showPopUp = true;
      }
    },
    closePopUp() {
      this.showPopUp = false;
    }
  },
};
</script>
<style scoped>
</style>
