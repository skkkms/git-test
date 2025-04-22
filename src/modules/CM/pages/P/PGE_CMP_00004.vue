<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <!-- Search Box -->
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_PORTL')" />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              :selected="fromPsYn?psInitPortal:portal"
              :defaultOption="'all'"
              :option-list="portalList"
              :disabled="fromPsYn"
              @list-clicked="onPortalSelect"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DOC_TTL')"
            />          
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="searchTextField"
              v-model="searchText"
              maxlength="50"
              @keyup.enter="searchAction"
            />            
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="'PGE_CMP_00004'"
            type="button"
            class="comm_btn_Scr"
            @click="searchAction"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>        
      </div>
      
      <div class="mrB30" />
      <!--      <sui-grid
        ref="grid"
        :columns="gridColumns0"
        :columnsautoresize="true"
        :multiselect="false"
        :dataset="'ds0'"
        :initialPagesize="10"
        :showDisplayCountControl="false"
        :autoheight="false"
        :pageable="false"
      />
      -->
<!--Ashok code starte here for sui-s-grid changes-->
       <sui-s-grid
            ref="grid"
            :headers="gridColumns0"
            :data-source="ds0"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
           >
      </sui-s-grid>





<!--Ashok code end here for sui-s-grid chages -->

      <div class="comm_btn_wrap">
        <sui-button
          v-permission:create="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onNewAndCancelClick"
        >
          {{ $t('MSG_BTN_RGST') }}
        </sui-button>
      </div>
      <sui-popup
        v-model="isShownPopupNew"
        :title="popTitleNew"
      >
        <p01
          :pageId="this.$options.name"
          :updateFlag="false"
          :title="title"
          :policyTypeCode="policyTypeCode"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"            
          @onCloseClick="onNewAndCancelClick"
          @research="research"
        />
      </sui-popup>
      <sui-popup
        v-model="isShownPopupMod"
        :title="popTitleMod"
      >
        <p01
          :pageId="this.$options.name"
          :updateFlag="true"
          :title="title"
          :policyTypeCode="policyTypeCode"
          :persInfoProcPolicyUid="persInfoProcPolicyUid"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"          
          @onCloseClick="onModAndCancelClick"
          @research="research"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import p01 from './components/PGE_CMP_00004_P01';
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';
export default {
  name: 'PGE_CMP_00004', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  extends: BasePage,
  props: {
    psPolicyTypeCode: {
      type: String,
      default: '',
    },
    psInitData: {
      type: Object,
      default() {
        return {};
      }
    },    
  },  
  data() {
    return {
      policyTypeCode: this.psPolicyTypeCode? this.psPolicyTypeCode:'',
      popTitleNew: this.$t('MSG_TIT_PERS_INFO_PROC_POLI_RGST'),
      popTitleMod: this.$t('MSG_TIT_PERS_INFO_PROC_POLI_MDFC'),
      title: this.$t('MSG_TXT_PERS_INFO_PROC_POLI'),
      portal: {
        key: '',
        label: '',
      },
      portalList: [],
      localdata0: [],
      ds0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},
      isShownPopupNew: false,
      isShownPopupMod: false,
      persInfoProcPolicyUid: '',
      searchText: '',
    };
  },

  computed: {},
  watch: {},
  created() {
    this.portalList = [];
    const that = this;
    this.gridColumns0 =
       [{
        text: this.$t('MSG_TXT_PORTL_ID'),
        value: 'portalId',
        width: '100px',
        
      },
      {
        text: this.$t('MSG_TXT_PORTL_NM'),
        value: 'portalNm',
        width: '100px',
      },
      {
        text: this.$t('MSG_TXT_DOC_VER'),
        value: 'persInfoProcPolicyVer',
        width: '100px',
      },
      {
        text: this.$t('MSG_TXT_DOC_TTL'),
        value: 'policyDocumentTitle',
        
        component: {
          props: ['row', 'value'],
          template:
            `<sui-button
              :title="row.policyDocumentTitle"
              type="button"
              class="link"
              @click ="onGridSingleButtonClicked(value, row)"
            >
              {{row.policyDocumentTitle}}
            </sui-button>`,

            methods: {
              onGridSingleButtonClicked(value, dataRow) {
              const { persInfoProcPolicyUid } = dataRow;
              that.persInfoProcPolicyUid = persInfoProcPolicyUid;
              that.onModAndCancelClick();
              },
          },
          
        }

      },
      {
        text: this.$t('MSG_TXT_START_DATE'),
        value: 'displayStartDT',
          customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: '90px',
      },
      {
        text: this.$t('MSG_TXT_END_DATE'),
        value: 'displayFinishDT',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: '90px',
      },
      {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'm_userName',
         component: {
         props: ['row', 'value'],
          
          template:
            `<cmp-user-name-link
            
              :displayType="'1'"
              :displayLanguageId="row.m_dsplLngId"
              :userId="row.finalModificationUserId"
              :knoxId="row.m_knoxId"
              :loginId="row.m_loginId"
              :userName="row.m_userName"
              :userGlobalName="row.m_userGlobalName"
              :departmentName="row.m_departmentName"
              :departmentEnglishName="row.m_departmentEnglishName"
              :type="'link'"
            />`,
      },
        width: '200px',
      },
      {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: '170px',
      },
      ];
    
  },
  mounted() {
    this.$nextTick(() => {
      this.loadPortalList().then(() => {
        this.searchAction();
      });
    });
  },

  methods: {
    loadPortalList() {
      return new Promise((resolve, reject) => {
        if(utils.isEmpty(this.policyTypeCode)){
          this.policyTypeCode = utils.getParameter(this, 'policyTypeCode');
        }

        if (utils.isEmpty(this.policyTypeCode)) {
          this.policyTypeCode = 'P';
        } else if (this.policyTypeCode === 'T') {
          this.popTitleNew = this.$t('MSG_TIT_TERMS_SERV_RGST');
          this.popTitleMod = this.$t('MSG_TIT_TERMS_SERV_MDFC');
          this.title = this.$t('MSG_TXT_TERMS_SERV');
        } else {
          this.popTitleNew = this.$t('MSG_TIT_OPERATION_POLICY_RGST');
          this.popTitleMod = this.$t('MSG_TIT_OPERATION_POLICY_MDFC');
          this.title = this.$t('MSG_TXT_OPERATION_POLICY');
        }

        if(this.fromPsYn){
          this.portalList.push({
            key: this.psInitData.portalId,
            label: this.psInitData.portalId,
          })
          resolve();
        }else{
          http.request(this.contextPageId, 'DTS_CMP_00004')
            .then(res => {
              this.portalList = [];
              utils.forEach(res.data, obj => {
                this.portalList.push({
                  key: obj.portalId,
                  label: obj.portalName,
                });
              });
              this.portal = {
                key: '',
                label: '',
              };
              resolve();
            })
            .catch(error => {
              console.log(error);
              reject();
            });
        }
      });
    },
    getSearchData() {
      return {
        portalId: this.fromPsYn?this.psInitPortal.key:this.portal.key,
        policyTypeCode: this.policyTypeCode,
        searchText: this.searchText,
      };
    },
    onPortalSelect() {
      this.searchAction();
    },
    searchAction() {
      const searchData = this.getSearchData();
      http.request(this.$options.name, 'DTS_CMP_00013', {
        query: searchData,
      }).then(res => {
        this.ds0.setData(this.setUserInfoFormat(res.data));
      }).catch(error => {
        console.log(error);
      });
    },
    setUserInfoFormat(list) {
      utils.forEach(list, data => {
        utils.forEach(data.finalModificationUserInfo, (value, key) => {
          utils.set(data, `m_${key}`, value);
        });
      });
      return list;
    },
    onPopupClose() {},
    onNewAndCancelClick() {
      this.isShownPopupNew = !this.isShownPopupNew;
    },
    onModAndCancelClick() {
      this.persInfoProcPolicyUid = this.isShownPopupMod ? '' : this.persInfoProcPolicyUid;
      this.isShownPopupMod = !this.isShownPopupMod;
      if (!this.isShownPopupMod) {
        this.ds0.clearSelection();
      }
    },
    research() {
      if (this.isShownPopupNew) {
        this.onNewAndCancelClick();
      }
      if (this.isShownPopupMod) {
        this.onModAndCancelClick();
      }
      this.searchAction();
    },
    onReset() {
      this.searchText = '';
    },    
    // onExcelDownloadClick() {
    //   utils.downloadGridToExcel(this.$options.name, this.gridColumns0, this.ds0, 'persInfoProcPolicyList.xlsx');
    // },
  },
};
</script>
<style scoped>
</style>
