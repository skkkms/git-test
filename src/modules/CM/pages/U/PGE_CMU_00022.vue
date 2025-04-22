/* eslint-disable prefer-template */
/* eslint-disable prefer-template */
<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <sui-panel :title="$t('MSG_TXT_DETL_INFO')">
        <div class="comm_view_wrap">
          <div class="row">
            <div class="col-xs-1">
              <sui-input-label :label="$t('MSG_TXT_PAGE_ID')" />
            </div>
            <div class="col-xs-5">
              <div class="comm_label">
                {{ objPage_dev.pageId }}
              </div>
            </div>
            <div class="col-xs-1">
              <sui-input-label :label="$t('MSG_TXT_PAGE_NM')" />
            </div>
            <div class="col-xs-5">
              <div class="comm_label">
                {{ objPage_dev.pageName }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-1 ">
              <sui-input-label :label="$t('MSG_TXT_PAGE_UE_NM')" />
            </div>
            <div class="col-xs-5 ">
              <div class="comm_label">
                {{ objPage_dev.pageUseName }}
              </div>
            </div>
            <div class="col-xs-1 ">
              <sui-input-label :label="$t('MSG_TXT_MDLE')" />
            </div>
            <div class="col-xs-5 ">
              <div class="comm_label">
                {{ objPage_dev.moduleName +'/'+objPage_dev.subModuleName }}
              </div>
            </div>
          </div>
        </div>
        <div class="comm_btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_solid"
            @click="onClickModify"
          >
            {{ $t("MSG_BTN_MOD") }}
          </sui-button>
        </div>
      </sui-panel>
      <sui-popup
        v-model="showModPopup"
        :title="$t('MSG_TIT_MDFC_PGE')"
      >
        <p01
          :pageId="contextPageId"
          :isRegister="false"
          :dataRow="localPopupData"
          @exit="onPopupModifyDetailCancel"
          @modify="onPopupModifyDetailSave"
        />
      </sui-popup>
      <!-- <---Details Grid> -->
      <sui-panel :title="$t('MSG_TXT_DTSVC')">
        <div>
          <div class="comm_view_wrap">
            <sui-s-grid
              ref="gridDetails"
              :headers="columnDetail"
              :data-source="dsDetail"
              :showRowsPerPageControl="false"
              :msgTotal="false"
              :options="options"
            />
          </div>
        </div>
        <div class="comm_btn_wrap">
          <sui-button
            v-permission:create="this.$options.name"
            type="button"
            class="comm_btn_border"
            @click="onClickDsNew"
          >
            {{ $t("MSG_BTN_NEW") }}
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_solid"
            @click="onClickDsMapping"
          >
            {{ $t("MSG_BTN_MPPG") }}
          </sui-button>
        </div>
      </sui-panel>
      <sui-popup
        v-model="showDsNewPopup"
        :title="$t('MSG_TIT_CRT_DTSVC')"
      >
        <p02
          :dataServiceRegistered="dsDetail.data"
          :pageId="objPage_dev.pageId"
          @exit="onCreateDataServiceClosePopup"
        />
      </sui-popup>
      <sui-popup
        v-model="showDsMppngPopup"
        :title="$t('MSG_TIT_edit_DTSVC_MPPG')"
      >
        <p03
          :dataList="selectedDataServiceRow"
          :parentPageId="contextPageId"
          @exit="onModifyDataServiceClosePopup"
        />
      </sui-popup>
      <!-- Message Resources grid -->
      <sui-panel :title="$t('MSG_TXT_MSG_RESO')">
        <div>
          <div class="comm_view_wrap">
            <sui-s-grid
              ref="gridMsg"
              :headers="columnMessage"
              :data-source="dsMssg"
              :showRowsPerPageControl="false"
              :options="options"
            />
          </div>
          <div class="comm_btn_wrap">
            <sui-button
              v-permission:create="this.$options.name"
              type="button"
              class="comm_btn_border"
              @click="onClickMsgNew"
            >
              {{ $t("MSG_BTN_NEW") }}
            </sui-button>
            <sui-button
              type="button"
              class="comm_btn_solid"
              @click="onClickMsgMapping"
            >
              {{ $t("MSG_BTN_MPPG") }}
            </sui-button>
          </div>
        </div>
      </sui-panel>
      <sui-popup
        v-model="showMsgNewPopup"
        :title="$t('MSG_TIT_RGST_MSG_RESO')"
      >
        <p04
          :parentPageId="contextPageId"
          @exit="onExitMessageResourceClosePopup"
          @apply="onCreateMessageResourceClosePopup"
        />
      </sui-popup>
      <sui-popup
        v-model="showMsgMppngPopup"
        :title="$t('MSG_TIT_EDIT_MSG_RESO_MPPG')"
      >
        <p05
          :dataList="selectedMessageRow"
          :parentPageId="contextPageId"
          @exit="onModifyMessageResourceClosePopup"
        />
      </sui-popup>
      <!-- component  grid-->
      <sui-panel :title="$t('MSG_TXT_CMPNT')">
        <div>
          <div class="comm_view_wrap">
            <sui-s-grid
              ref="gridCmp"
              :headers="columnComponent"
              :data-source="dsCmpnt"
              :showRowsPerPageControl="false"
              :options="options"
            />
          </div>
          <div class="comm_btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_solid"
              @click="onClickCmpMapping"
            >
              {{ $t("MSG_BTN_MPPG") }}
            </sui-button>
          </div>
        </div>
      </sui-panel>
      <sui-popup
        v-model="showCmpMppngPopup"
        :title="$t('MSG_TIT_EDIT_CMPNT_MPPG')"
      >
        <p06
          :dataList="selectedComponentRow"
          :parentPageId="contextPageId"
          @exit="onModifyComponentClosePopup"
        />
      </sui-popup>
      <div style="float:left;">
        <div class="comm_btn_wrap">
          <sui-button
            v-permission:update="contextPageId"
            type="button"
            class="comm_btn_border"
            @click="onClickList"
          >
            {{ $t("MSG_BTN_LIST") }}
          </sui-button>
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import p01 from './components/PGE_CMU_00020_P01.vue';
import p02 from './components/PGE_CMU_00022_P02.vue';
import p03 from './components/PGE_CMU_00022_P03.vue';
import p04 from './components/PGE_CMU_00022_P04.vue';
import p05 from './components/PGE_CMU_00022_P05.vue';
import p06 from './components/PGE_CMU_00022_P06.vue';


export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_CMU_00022',
  components: {
    p01, p02, p03, p04, p05, p06,
  }, // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      selectedComponentRow: {},
      selectedMessageRow: {},
      selectedDataServiceRow: '',
      objPage_dev: {
        moduleName: '',
        subModuleName: '',
        pageUseName: '',
        pageId: '',
        pageName: '',
      },
      valData: {},
      localPopupData: {
        pageData: {
          selectedCodeValue: {
            moduleCode: {
              key: '',
              label: '',
            },
            subModuleCode: {
              key: '',
              label: '',
            },
            pageUseCode: {
              label: '',
              key: '',
            },
            pageTypeCode: {
              label: '',
              key: '',
            },
            pageStatusCode: {
              label: '',
              key: '',
            },
          },
          pageId: '',
          pageDestinationValue: '',
          pageName: '',
          pageNickName: '',
          pageTitleMessageResourceId: '',
          pageBlockContent: '',
          pageUsePriodStartDatetime: '',
          pageUsePriodFinishDatetime: '',
          pagePopupYn: 'N',
          pagePopupOptionValue: '',
          pageContent: '',
          firstRegistrationDTM: '',
          firstRegistrationUserId: '',
          firstRegistrationProgramId: '',
          finalModificationDTM: '',
          finalModificationUserId: '',
          finalModificationProgramId: '',
          pageUsePriodYn: 'N',
          pageUseYn: 'Y',
          linkPageId: '',
          linkPageName: '',
          periodDT: {
            from: utils.now('YYYY-MM-DD'),
            to: utils.now('YYYY-MM-DD'),
          },
          deviceApplyYn: 0,
          pageIdPrefix: 'PGE_',
          deviceTypeValue: 0,
          originalFinalModificationDTM: '',
        },
      },
      showModPopup: false,
      showDsNewPopup: false,
      showDsMppngPopup: false,
      showMsgNewPopup: false,
      showMsgMppngPopup: false,
      showCmpMppngPopup: false,
      // eslint-disable-next-line new-cap
      dsDetail: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsMssg: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsCmpnt: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  computed: {},
  created() {
    this.columnDetail = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '180px',
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '180px',
      },
      {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'dataServiceTypeName',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'dataServiceIdentification',
        width: '150px',
      },
      {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'dataServiceName',
        width: '350px',
      },
      {
        text: this.$t('MSG_TXT_DTSVC_URL'),
        value: 'dataServiceUniformresourcelocator',
      },
    ];

    this.columnMessage = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '120px',
      },
      {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'messageResourcesTypeName',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_MSG_RESO_ID'),
        value: 'messageResourcesId',
        width: '350px',
      },
      {
        text: this.$t('MSG_TXT_LANG'),
        value: 'langId',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_MSG_RESO_VAL'),
        value: 'multiLanguageContent',
      },
    ];

    this.columnComponent = [
      {
        text: this.$t('MSG_TXT_TYPE'),
        value: 'componentTypeName',
        width: '120px',
      },
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '180px',
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '180px',
      },
      {
        text: this.$t('MSG_TXT_CMPNT_ID'),
        value: 'componentId',
        width: '150px',
      },
      {
        text: this.$t('MSG_TXT_CMPNT_NM'),
        value: 'componentName',
        width: '400px',
      },
      {
        text: this.$t('MSG_TXT_CMPNT_TAG'),
        value: 'componentTag',
      },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    onLoad() {
      const pageId = utils.getParameter(this, 'pageId');
      if (!utils.isEmpty(pageId)) {
        http.request(this.contextPageId, 'DTS_CMU_00078', {
          path: {
            'page-id': pageId,
          },
        }).then(res => {
          this.valData = res.data;
          this.objPage_dev.pageId = res.data[0].pageId;
          
          this.objPage_dev.pageName = res.data[0].pageName;
          this.objPage_dev.moduleName = res.data[0].moduleName;
          this.objPage_dev.subModuleName = res.data[0].subModuleName;
          this.objPage_dev.pageUseName = res.data[0].pageUseName;
        });
        http.request(this.contextPageId, 'DTS_CMU_00003', {
          path: {
            'page-id': pageId,
          },
        }).then(res1 => {
          this.dsDetail.setData(res1.data);
        });
        http.request(this.contextPageId, 'DTS_CMU_00019', {
          path: {
            'page-id': pageId,
          },
        }).then(res2 => {
          this.dsMssg.setData(res2.data);
        });
        http.request(this.contextPageId, 'DTS_CMU_00045', {
          path: {
            'page-id': pageId,
          },
        }).then(res3 => {
          this.dsCmpnt.setData(res3.data);
        });
      }
    },
    fillDataForModifyPage(data) {
      this.localPopupData.pageData.selectedCodeValue.moduleCode.key = data[0].moduleCode;
      this.localPopupData.pageData.selectedCodeValue.subModuleCode.key = data[0].subModuleCode;
      this.localPopupData.pageData.selectedCodeValue.pageUseCode.key = data[0].pageUseCode;
      this.localPopupData.pageData.selectedCodeValue.pageTypeCode.key = data[0].pageTypeCode;
      this.localPopupData.pageData.selectedCodeValue.pageStatusCode.key = data[0].pageStatusCode;
      this.localPopupData.pageData.pageId = data[0].pageId;
      this.localPopupData.pageData.pageDestinationValue = data[0].pageDestinationValue;
      this.localPopupData.pageData.pageName = data[0].pageName;
      this.localPopupData.pageData.pageNickName = data[0].pageNickName;
      this.localPopupData.pageData.pageTitleMessageResourceId = data[0].pageTitleMessageResourceId;
      this.localPopupData.pageData.pageBlockContent = data[0].pageBlockContent;
      this.localPopupData.pageData.pageUsePriodStartDatetime = data[0].pageUsePriodStartDatetime;
      this.localPopupData.pageData.pageUsePriodFinishDatetime = data[0].pageUsePriodFinishDatetime;
      this.localPopupData.pageData.pagePopupYn = data[0].pagePopupYn;
      this.localPopupData.pageData.pagePopupOptionValue = data[0].pagePopupOptionValue;
      this.localPopupData.pageData.pageContent = data[0].pageContent;
      this.localPopupData.pageData.firstRegistrationDTM = data[0].firstRegistrationDTM;
      this.localPopupData.pageData.firstRegistrationUserId = data[0].firstRegistrationUserId;
      this.localPopupData.pageData.firstRegistrationProgramId = data[0].firstRegistrationProgramId;
      this.localPopupData.pageData.finalModificationDTM = data[0].finalModificationDTM;
      this.localPopupData.pageData.finalModificationUserId = data[0].finalModificationUserId;
      this.localPopupData.pageData.finalModificationProgramId = data[0].finalModificationProgramId;
      this.localPopupData.pageData.pageUsePriodYn = data[0].pageUsePriodYn;
      this.localPopupData.pageData.pageUseYn = data[0].pageUseYn;
      this.localPopupData.pageData.linkPageId = data[0].linkPageId;
      this.localPopupData.pageData.linkPageName = data[0].linkPageName;
      this.localPopupData.pageData.originalFinalModificationDTM = data[0].originalFinalModificationDTM;
      this.localPopupData.pageData.deviceTypeValue = data[0].deviceTypeValue;
      // eslint-disable-next-line quotes
      if (this.localPopupData.pageData.pageUsePriodYn === "Y") {
        this.localPopupData.pageData.periodDT.from = data[0].periodDT.from;
        this.localPopupData.pageData.periodDT.to = data[0].periodDT.to;
      }
    },
    onClickList() {
      utils.goPage('PGE_CMU_00020');
    },
    onClickModify() {
      this.fillDataForModifyPage(this.valData);
      this.showModPopup = true;
    },
    onPopupModifyDetailCancel() {
      this.showModPopup = false;
    },
    onPopupModifyDetailSave(pageData) {   
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        () => {
          http.request(this.contextPageId, 'DTS_CMU_00006', {
            path: {
              'page-id': this.objPage_dev.pageId,
            },
            data: pageData,
          }).then(() => {
            this.onLoad();
            this.showModPopup = false;
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
          });
        });
    },
    onClickDsNew() {
      this.showDsNewPopup = true;
    },
    onCreateDataServiceClosePopup() {
      this.showDsNewPopup = false;
      this.onLoad();
    },
    onClickDsMapping() {
      this.selectedDataServiceRow = this.objPage_dev.pageId;
      this.showDsMppngPopup = true;
    },
    onModifyDataServiceClosePopup() {
      this.showDsMppngPopup = false;
      this.onLoad();
    },
    onClickMsgNew() {
      this.showMsgNewPopup = true;
    },
    onExitMessageResourceClosePopup() {
      this.showMsgNewPopup = false;
    },
    onCreateMessageResourceClosePopup(dataValue) {
      this.showMsgNewPopup = false;
      if (this.dataValue === '') return;
      let val = false;
      utils.forEach(this.dsMssg.data, data => {
        if (data.messageResourcesId === dataValue) {
          val = true;
        }
      });
      if (utils.isEqual(val, true)) {
        return;
      }
      const dataParams = [];
      dataParams.push({
        pageId: this.objPage_dev.pageId,
        messageResourcesId: dataValue,
      });
      utils.forEach(this.dsMssg.data, data => {
        dataParams.push({
          pageId: this.objPage_dev.pageId,
          messageResourcesId: data.messageResourcesId,
        });
      });
      http.request(this.contextPageId, 'DTS_CMU_00020', {
        path: {
          'page-id': this.objPage_dev.pageId,
        },
        data: dataParams,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
        this.onLoad();
      }).catch(error => {
        console.log(error);
      });
    },
    onClickMsgMapping() {
      this.selectedMessageRow = this.objPage_dev.pageId;
      this.showMsgMppngPopup = true;
    },
    onModifyMessageResourceClosePopup() {
      this.showMsgMppngPopup = false;
      this.onLoad();
    },
    onClickCmpMapping() {
      this.selectedComponentRow = this.objPage_dev.pageId;
      this.showCmpMppngPopup = true;
    },
    onModifyComponentClosePopup() {
      this.showCmpMppngPopup = false;
      this.onLoad();
    },
  },
};
</script>
<style scoped>
</style>
