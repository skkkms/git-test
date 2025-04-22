<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_scr_wrap">
            <div class="row">
              <div class="col-xs-3">
                <sui-input-label :label="$t('MSG_TXT_MBL_APP_TYPE_NM')" />
              </div>
              <div class="col-xs-5">
                <sui-code-select
                  ref="codeSelectMobileApplicationTypeCode"
                  v-model="queryMobileAppMgmtData.mobileApplicationTypeCode"
                  codeId="COD_MBL_APP_TYPE"
                  :defaultOption="'all'"
                />
              </div>
              <div class="col-xs-2">
                <sui-input-label :label="$t('MSG_TXT_USE')" />
              </div>
              <div class="col-xs-3">
                <sui-yn-select
                  ref="ynSelectUseYn"
                  v-model="queryMobileAppMgmtData.useYn"
                  :defaultOption="'all'"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3">
                <sui-input-label :label="$t('MSG_TXT_MBL_APP_CATG')" />
              </div>
              <div class="col-xs-5">
                <sui-custom-select
                  ref="customSelectMobileApplicationCategoryId"
                  v-model="queryMobileAppMgmtData.mobileApplicationCategoryId"
                  :optionList="mobileApplicationCategoryList"
                  :disabled="false"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3">
                <sui-input-label :label="$t('MSG_TXT_APP')" />
              </div>
              <div class="col-xs-9">
                <sui-code-select
                  ref="codeSelectSearchCondition"
                  v-model="queryMobileAppMgmtData.searchCondition"
                  codeId="COD_MBL_APP_SEARCH_COND"
                  :defaultOption="'all'"
                />
                <div class="comp_spacing" /> <div class="comp_spacing" /> <div class="comp_spacing" /> <div class="comp_spacing" />
                <div class="comp_spacing" />
                <sui-text-field
                  ref="textFieldSearchText"
                  v-model="queryMobileAppMgmtData.searchText"
                  maxlength="100"
                  @keyup.enter="onClickMobileAppMgmtSearch"
                />
              </div>
            </div>
            <div class="btn_wrap">
              <sui-button
                type="button"
                class="comm_btn_Reset"
                @click="onClickMobileAppMgmtReset"
              >
                {{ $t("MSG_BTN_RESET") }}
              </sui-button>
              <sui-button
                v-permission:read="contextPageId"
                type="button"
                class="comm_btn_Scr"
                @click="onClickMobileAppMgmtSearch"
              >
                {{ $t("MSG_BTN_SRCH") }}
              </sui-button>
            </div>
          </div>
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_scr_wrap">
            <div class="row">
              <div class="col-xs-3">
                <sui-input-label :label="$t('MSG_TXT_MBL_APP_STG_STS')" />
              </div>
              <div class="col-xs-9">
                <sui-code-select
                  ref="codeSelectMobileApplicationStageCode"
                  v-model="queryMobileAppVersionData.mobileApplicationStageCode"
                  codeId="COD_MBL_APP_STG"
                  :defaultOption="'all'"
                />
                <div class="comp_spacing" />
                <sui-code-select
                  ref="codeSelectMobileApplicationstatusCode"
                  v-model="queryMobileAppVersionData.mobileApplicationStateCode"
                  codeId="COD_MBL_APP_STT"
                  :defaultOption="'all'"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3">
                <sui-input-label :label="$t('MSG_TXT_MBL_APP_VER_ID')" />
              </div>
              <div class="col-xs-9">
                <sui-text-field
                  ref="textFieldMobileApplicationVersionId"
                  v-model="queryMobileAppVersionData.mobileApplicationVersionId"
                  maxlength="100"
                  :placeholder="placeholderText.mobileApplicationVersionId"
                  @keyup.enter="onClickMobileAppVersionSearch"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3">
                <sui-input-label :label="$t('MSG_TXT_MBL_APP_VER_NM')" />
              </div>
              <div class="col-xs-9">
                <sui-text-field
                  ref="textFieldMobileApplicationVersionName"
                  v-model="queryMobileAppVersionData.mobileApplicationVersionName"
                  maxlength="400"
                  :placeholder="placeholderText.mobileApplicationVersionName"
                  @keyup.enter="onClickMobileAppVersionSearch"
                />
              </div>
            </div>
            <div class="btn_wrap">
              <sui-button
                type="button"
                class="comm_btn_Reset"
                @click="onClickMobileAppVersionReset"
              >
                {{ $t("MSG_BTN_RESET") }}
              </sui-button>
              <sui-button
                v-permission:read="contextPageId"
                type="button"
                class="comm_btn_Scr"
                @click="onClickMobileAppVersionSearch"
              >
                {{ $t("MSG_BTN_SRCH") }}
              </sui-button>
            </div>
          </div>
        </div>
      </div>
      <div class="mrB30" />

      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_MBL_APP_LIST') }}</h4>
          </div>
          <sui-s-grid
            ref="gridMobileAppMgmt"
            :headers="columnMobileAppMgmt"
            :data-source="dsMobileAppMgmt"
            :options="gridOptions"
            :showRowsPerPageControl="false"
            @grid:selected="onSelectMobileAppMgmtRow"
           
          >
            <template #right-info>
              <button
                v-if="flags.isPortalManager || flags.isApplicationManager "
                type="button"
                class="comm_btn_gridTop"
                
                @click="onClickBtnMobileAppMgmtNew"
              >
                {{ $t('MSG_BTN_RGST') }}
              </button>
              <button
                v-if="flags.isPortalManager || flags.isApplicationManager "
                type="button"
                class="comm_btn_gridTop"
                @click="onClickBtnMobileAppMgmtDel"
              >
                {{ $t('MSG_BTN_DEL') }}
              </button>
            </template>
          </sui-s-grid>
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_MBL_APP_VER_LIST') }}</h4>
          </div>
          <sui-s-grid
            ref="gridMobileAppVersion"
            :headers="columnMobileAppVersion"
            :data-source="dsMobileAppVersion"
            :options="gridOptions"
            :showRowsPerPageControl="false"
            @grid:selected="onSelectMobileAppVersionRow"
          >
            <div class="comp_spacing" />
          </sui-s-grid>
        </div>
      </div>
      <div class="mrB30" />
      <sui-page-tab-box-type
        ref="tab"
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="onSetCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          :selectedGridRowMobileAppVersionData="selectedGridRowMobileAppVersionData"
          :selectedGridRowMobileAppMgmtData="selectedGridRowMobileAppMgmtData"
          :flags="flags"
          :mobileApplicationCategoryList="mobileApplicationCategoryList"
          @show-revision-details-popup="openRevisionDetailsPopUp"
          @on-click-search="onClickMobileAppVersionSearch"
          @onClearSelectionMobileAppVersionGrid="onClearSelectionMobileAppVersionGrid"
          @on-click-delete="onClickBtnMobileAppVersionDel"
          @on-click-publish="onClickBtnMobileAppVersionPub"
          @on-click-approve="onClickBtnMobileAppVersionApprove"
          @on-click-reject="onClickBtnMobileAppVersionReject"
          @on-click-request="onClickBtnMobileAppVersionRequest"
          @onclickreset="onclickreset"
          @show-rev-hist-popup="onShowPopup"
          @onVersionUpdated="onVersionUpdated"
        />
      </sui-page-tab-box-type>
      <sui-popup
        v-model="showPopUp"
        :title="'Revision Details'"
      >
        <p02
          :pageId="contextPageId"
          :revisionHistoryUid="revisionHistoryUid"
          @close-pop-up="closePopUp"
        />
      </sui-popup>
      <sui-popup
        v-model="isShowRevisionDetailsPopUp"
        :mobileApplicationVersionRevisionDetails="mobileApplicationVersionRevisionDetails"
        :title="$t('MST_TIT_REV_DTLS')"
      >
        <p02
          :pageId="contextPageId"
          @close-pop-up="closePopUp"
          :mobileApplicationVersionRevisionDetails="mobileApplicationVersionRevisionDetails"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>

<script>

import {urDataSet} from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMX_00013_T01.vue';
import tab02 from './components/PGE_CMX_00013_T02.vue';
import tab03 from './components/PGE_CMX_00013_T03.vue';
import tab04 from './components/PGE_CMX_00013_T04.vue';
import tab05 from './components/PGE_CMX_00013_T05.vue';
import p01 from './components/PGE_CMX_00013_P01';
import p02 from './components/PGE_CMX_00013_P02';

const DEFAULT_ROW_HEIGHT = 43;
export default {
  name: 'PGE_CMX_00013', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    tab03,
    tab04,
    tab05,
    p01,
    p02,
  },
  extends: BasePage,
  data() {
    return {
      dsMobileAppMgmt: new urDataSet(),
      dsMobileAppVersion: new urDataSet(),
      gridOptions: {
        showMoveControl: false,
        rowHeight: DEFAULT_ROW_HEIGHT,
      },
      flags: {
        isPublished: false,
        isApproved: false,
        isRejected: false,
        isUnpublished: false,
        isDeprecated: false,
        isDevelop: false,
        isReview: false,
        isPortalManager: false,
        isApplicationManager: false,
        showApproveBtn: false,
      },
      isShownMobileAppRegisterPopup: false,
      isShowRevisionDetailsPopUp: false,
      mobileApplicationVersionRevisionDetails: {},
      paramMobileApplicationId: '',
      selectedGridRowMobileAppVersionData: {},
      selectedGridRowMobileAppMgmtData: {},
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_APP_VER'),
          component: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_STORE'),
          component: tab02,
        },
        {
          tabTitle: this.$t('MSG_TXT_SUPP_OS'),
          component: tab03,
        },
        {
          tabTitle: this.$t('MSG_TXT_REVS_HIST'),
          component: tab04,
        },
        {
          tabTitle: this.$t('MSG_TXT_ROLE'),
          component: tab05,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      showPopUp: false,
      revisionHistoryUid: '',
      queryMobileAppVersionData: {
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
        mobileApplicationVersionName: '',
        mobileApplicationStageCode: '',
        mobileApplicationStateCode: '',
      },
      queryMobileAppMgmtData: {
        mobileApplicationCategoryId: '',
        mobileApplicationTypeCode: '',
        useYn: '',
        searchCondition: '',
        searchText: '',
      },
      placeholderText: {
        mobileApplicationVersionId: utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_VER_ID')).slice(0, -1),
        mobileApplicationVersionName: utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_VER_NM')).slice(0, -1),
      },
      mobileApplicationCategoryList: [],
      objMobileAppVersion: {
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
        mobileApplicationVersionName: '',
        mobileApplicationStageCode: '',
        mobileApplicationStage: '',
        mobileApplicationStateCode: '',
        mobileApplicationState: '',
        apkexternalUrl: '',
        apkfilepath: '',
        mobileApplicationVersionContent: '',
        deviceTypeBit: 2,
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
      },
      savedVersion:'',
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
    const that = this;
    this.flags.followApprovalPath = utils.getConfigurationValue('CFG_CMX_CHG_APRV_LINE') === '0';
    this.columnMobileAppMgmt = [
      {
        value: 'imageFilePath',
        text: this.$t('MSG_TXT_ICON'),
        width: '60',
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-image-viewer
              :pageId="'${this.contextPageId}'"
              :filePath="row.imageFilePath"
              :restrictThumbnailSize="true"
              :dimensions="{maxWidth: '40px', maxHeight: '40px'}"
            />`,
        },
      },
      {
        value: 'mobileApplicationId',
        text: this.$t('MSG_TXT_MBL_APP_ID'),
        width: '130',
      },
      {
        value: 'mobileApplicationName',
        text: this.$t('MSG_TXT_MBL_APP_NM'),
        width: '180',
        component: {
          props: ['row', 'value'],
          methods: {
            onClosePopup(saved) {
              if (saved) {
                that.onClickMobileAppMgmtSearch();
              }
            },
            onClickFunction() {
              utils.openLayerPopup('PGE_CMX_00024', this.onClosePopup, {
                pageInitialData: {
                  mobileApplicationId: this.row.mobileApplicationId,
                },
                size: 'lg',
              });
            }
          },
          template:
            `<sui-button
              :title="value"
              type="button"
              class="link"
              @click.stop="onClickFunction(value, row)"
            >
              {{value}}
            </sui-button>`,
   
        },
      },
      {
        value: 'mobileApplicationCategoryName',
        text: this.$t('MSG_TXT_MBL_APP_CATG'),
      },
      {
        value: 'mobileApplicationTypeName',
        text: this.$t('MSG_TXT_MBL_APP_TYPE_NM'),
      },
      {
        value: 'bundleId',
        text: this.$t('MSG_TXT_MBL_APP_BNDL_ID'),
      },
      {
        value: 'useYn',
        text: this.$t('MSG_TXT_USE'),
      },
    ];
    this.columnMobileAppVersion = [
      {
        value: 'mobileApplicationVersionId',
        text: this.$t('MSG_TXT_MBL_APP_VER_ID'),
      },
      {
        value: 'mobileApplicationVersionName',
        text: this.$t('MSG_TXT_MBL_APP_VER_NM'),
      },
      {
        value: 'mobileApplicationStage',
        text: this.$t('MSG_TXT_MBL_APP_STG'),
      },
      {
        value: 'mobileApplicationState',
        text: this.$t('MSG_TXT_MBL_APP_STS'),
      },
    ];
  },
  mounted() {
    this.getSession();
    this.loadMobileAppCategoryList();
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    openRevisionDetailsPopUp(revisionDetails) {
      this.mobileApplicationVersionRevisionDetails = revisionDetails;
      this.isShowRevisionDetailsPopUp = true;
    },
    closePopUp() {
      this.isShowRevisionDetailsPopUp = false;
      this.showPopUp = false;
    },
    getSession() {
      this.sessionInfo = this.$store.getters.userInfo;
      const roleListArray = this.sessionInfo.roleList;
      console.log(roleListArray);
      let ifRoleExist = roleListArray.some(el => el.roleNickName === 'MBL_PORTL_ADMIN' || el.roleNickName === 'SYS_ADMIN');
      if (ifRoleExist) {
        this.flags.isPortalManager = true;
      } else {
        ifRoleExist = roleListArray.some(el => el.roleNickName === 'MBL_APP_ADMIN');
        if (ifRoleExist) this.flags.isApplicationManager = true;
      }
    },
    onLoad() {
      const paramData = utils.getParameter(this, 'queryMobileAppVersionData');
      if (!utils.isEmpty(paramData)) {
        this.queryMobileAppMgmtData = paramData;
        this.onClickMobileAppMgmtSearch();
      }
    },
    onShowPopup(revisionHistoryUid) {
      this.revisionHistoryUid = revisionHistoryUid;
      this.showPopUp = true;
    },
    loadMobileAppCategoryList() {
      http.request(this.contextPageId, 'DTS_CMX_00003', {
        query: {},
      }).then(res => {
        const result = res.data.map(item => {
          return {
            key: item.mobileApplicationCategoryId,
            label: item.mobileApplicationCategoryName,
          };
        });
        this.mobileApplicationCategoryList = [{
          key: '',
          label: 'All',
        }].concat(result);
      });
    },
    onClickMobileAppMgmtSearch() {
      const dataParams = {
        mobileApplicationCategoryId: this.queryMobileAppMgmtData.mobileApplicationCategoryId,
        mobileApplicationTypeCode: this.queryMobileAppMgmtData.mobileApplicationTypeCode,
        useYn: this.queryMobileAppMgmtData.useYn,
        searchCondition: this.queryMobileAppMgmtData.searchCondition,
        searchText: this.queryMobileAppMgmtData.searchText,
      };

      http.request(this.contextPageId, 'DTS_CMX_00027', {
        query: dataParams,
      }).then(res => {
        this.dsMobileAppMgmt.setData(res.data);
        this.dsMobileAppVersion.setData([]);
        this.selectedGridRowMobileAppMgmtData = {};
      });
    },
    onClickMobileAppVersionSearch()
     {
      const { mobileApplicationId } = this.selectedGridRowMobileAppMgmtData;
      if (utils.isEmpty(mobileApplicationId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        const dataParams = {
          mobileApplicationVersionId: this.queryMobileAppVersionData.mobileApplicationVersionId,
          mobileApplicationVersionName: this.queryMobileAppVersionData.mobileApplicationVersionName,
          mobileApplicationStageCode: this.queryMobileAppVersionData.mobileApplicationStageCode,
          mobileApplicationStateCode: this.queryMobileAppVersionData.mobileApplicationStateCode,
        };
        http.request(this.contextPageId, 'DTS_CMX_00034', {
          path: {
            'mobile-application-id': mobileApplicationId,
          },
          query: dataParams,
        }).then(res => {
          this.$refs.gridMobileAppVersion.resetSelect();
          this.dsMobileAppVersion.setData(res.data);
          if(!utils.isEmpty(this.savedVersion)){
            this.$refs.gridMobileAppVersion.setSelect({mobileApplicationVersionId: this.savedVersion});
            this.savedVersion = '';
          }
        });
      }
    },
    onVersionUpdated(savedVersion){
      this.savedVersion = savedVersion;
      this.onClickMobileAppVersionSearch();
    },
    onClickMobileAppMgmtReset() {
      this.$refs.codeSelectMobileApplicationTypeCode.reset();
      this.$refs.ynSelectUseYn.reset();
      this.queryMobileAppMgmtData.mobileApplicationCategoryId = '';
      this.$refs.codeSelectSearchCondition.reset();
      this.queryMobileAppMgmtData.searchText = '';
    },
    onClickMobileAppVersionReset() {
      this.queryMobileAppVersionData.mobileApplicationId = '';
      this.queryMobileAppVersionData.mobileApplicationVersionId = '';
      this.queryMobileAppVersionData.mobileApplicationVersionName = '';
      this.$refs.codeSelectMobileApplicationStageCode.reset();
      this.$refs.codeSelectMobileApplicationstatusCode.reset();
    
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMX_00013';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onSelectMobileAppVersionRow(row) {
      this.selectedGridRowMobileAppVersionData = row;
      this.setFlags();
    },
    onSelectMobileAppMgmtRow(row) {
      this.selectedGridRowMobileAppMgmtData = row;
      this.selectedGridRowMobileAppVersionData = {};
      if (!utils.isEmpty(this.selectedGridRowMobileAppMgmtData.mobileApplicationId)) {
        http.request(this.contextPageId, 'DTS_CMX_00034', {
          path: {
            'mobile-application-id': this.selectedGridRowMobileAppMgmtData.mobileApplicationId,
          },
        }).then(res => {
          this.dsMobileAppVersion.setData(res.data);
        });
      }
      this.setFlags();
    },
    onClearSelectionMobileAppVersionGrid() 
    {
      
      this.$refs.gridMobileAppVersion.resetSelect();
    },
    mobileAppRegisterPopupOpenOrClose() {
      this.isShownMobileAppRegisterPopup = !this.isShownMobileAppRegisterPopup;
    },
    onPopupClose(saved) {
      if (saved) {
        this.onClickMobileAppMgmtSearch();
      }
    },
    onClickBtnMobileAppMgmtNew() {
      utils.openLayerPopup('PGE_CMX_00024', this.onPopupClose, {
        pageInitialData: {
          mobileApplicationId: '',
        },
        size: 'lg',
      });
    },
    onClickBtnMobileAppMgmtDel() {
      if (utils.isEmpty(this.selectedGridRowMobileAppMgmtData) || utils.isEmpty(this.selectedGridRowMobileAppMgmtData.mobileApplicationId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        // '삭제 하시겠습니까?'
        const dataParams = {
          mobileApplicationId: this.selectedGridRowMobileAppMgmtData.mobileApplicationId,
        };
        http.request(this.contextPageId, 'DTS_CMX_00032', {
          query: dataParams,
        }).then(res => {
          if (res.data > 0) {
            utils.messageBox('error', this.$t('MSG_ALT_CANT_DEL_MBL_APP'));
          } else {
            utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
              http.request(this.contextPageId, 'DTS_CMX_00031', {
                path: {
                  'mobile-application-id': this.selectedGridRowMobileAppMgmtData.mobileApplicationId,
                },
              }).then(() => {
                // '삭제 되었습니다.
                utils.messageBox('success', null, this.$t('MSG_ALT_DEL_DATA'), () => {
                  this.onClickMobileAppMgmtSearch();
                });
              });
            });
          }
        });
      }
    },
    onClickBtnMobileAppVersionDel() {
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData) || utils.isEmpty(this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else if (this.selectedGridRowMobileAppVersionData.mobileApplicationStateCode !== '00' && this.selectedGridRowMobileAppVersionData.mobileApplicationStateCode !== '22') {
        utils.messageBox('error', this.$t('MSG_ALT_CANT_DEL_MBL_APP'));
      } else {
        const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
        const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
        if (!utils.isEmpty(mobileApplicationId) || !utils.isEmpty(mobileApplicationVersionId)) {
          utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
            http.request(this.contextPageId, 'DTS_CMX_00038', {
              path: {
                'mobile-application-id' : mobileApplicationId,
                'mobile-application-version-id': mobileApplicationVersionId,
              },
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_DELETED'));
              // this.$emit('onClickSearch');
              // this.onClickNew();
              this.onClickMobileAppVersionSearch();
            });
          });
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        }
      }
    },
    onGridMobileAppMgmtClicked(e) {
      console.log(e);
      // this.paramMobileApplicationId = row.mobileApplicationId;
      // this.mobileAppRegisterPopupOpenOrClose();
    },
    mobileAppMgmtSave() {
      this.mobileAppRegisterPopupOpenOrClose();
      this.onClickMobileAppMgmtSearch();
    },
    setFlags() {
      this.flags.isPublished = false;
      this.flags.isApproved = false;
      this.flags.isRejected = false;
      this.flags.isUnpublished = false;
      this.flags.isDeprecated = false;
      this.flags.isDevelop = false;
      this.flags.isReview = false;

      if (!utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        const state = this.selectedGridRowMobileAppVersionData.mobileApplicationStateCode;
        if (state === '00') {
          this.flags.isDevelop = true;
        } else if (state === '10') {
          this.flags.isReview = true;
        } else if (state === '11') {
          this.flags.isRejected = true;
        } else if (state === '12') {
          this.flags.isApproved = true;
        } else if (state === '20') {
          this.flags.isPublished = true;
        } else if (state === '21') {
          this.flags.isUnpublished = true;
        } else {
          this.flags.isDeprecated = true;
        }
      }
    },
    onClickBtnMobileAppVersionRequest() {
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData) || utils.isEmpty(this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
        const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
        http.request(this.contextPageId, 'DTS_CMX_00046', {
          query: {
            mobileApplicationId,
            mobileApplicationVersionId,
          },
        }).then(res => {
          if (res.data <= 0) {
            utils.messageBox('alert', null, this.$t('MSG_ALT_STORE_DTLS_EMPTY'));
          } else {
            utils.messageBox('confirm', this.$t('MSG_TXT_MBL_APP_RAISE_REQ'), null, () => {
              http.request(this.contextPageId, 'DTS_CMX_00039', {
                data: this.selectedGridRowMobileAppVersionData,
              }).then(() => {
                utils.messageBox('success', this.$t('MSG_TXT_MBL_APP_REQ_SCCS'));
                this.onClickMobileAppVersionSearch();
              });
            });
          }
        });
      }
      return true;
    },
    onClickBtnMobileAppVersionPub() {
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData) || utils.isEmpty(this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
        const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
        if (!utils.isEmpty(mobileApplicationId) || !utils.isEmpty(mobileApplicationVersionId)) {
          http.request(this.contextPageId, 'DTS_CMX_00046', {  
            query: {
              mobileApplicationId,
              mobileApplicationVersionId,
            },
          }).then(res => {
            if (res.data <= 0) {
              utils.messageBox('alert', null, this.$t('MSG_ALT_STORE_DTLS_EMPTY'));
            } else {
              utils.messageBox('confirm', this.$t('MSG_TXT_WANT_PBLS'), null, () => {
                const dataParams = {
                  mobileApplicationId: this.selectedGridRowMobileAppMgmtData.mobileApplicationId,
                };
                http.request(this.contextPageId, 'DTS_CMX_00052', {
                  query: dataParams,
                }).then(res1 => {
                  if (res1.data > 0) {
                    utils.messageBox('alert', null, this.$t('MSG_ALT_PBLS_CHECK'));
                  } else {
                    http.request(this.contextPageId, 'DTS_CMX_00042', {
                      data: this.selectedGridRowMobileAppVersionData,
                    }).then(() => {
                      utils.messageBox('success', this.$t('MSG_TXT_PBLS_SCCS'));
                      this.onClickMobileAppVersionSearch();
                      // this.$emit('onClickSearch');
                      // this.onClickNew();
                    });
                  }
                });
              });
            }
          }
          )
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        }
      }
      return true;
    },
    onClickBtnMobileAppVersionApprove() {
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData) || utils.isEmpty(this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
        const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
        if (!utils.isEmpty(mobileApplicationId) || !utils.isEmpty(mobileApplicationVersionId)) {
          utils.messageBox('confirm', this.$t('MSG_ALT_WANT_APPRV'), null, () => {
            http.request(this.contextPageId, 'DTS_CMX_00040', {
              data: this.selectedGridRowMobileAppVersionData,
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_APPROVED'));
              this.onClickMobileAppVersionSearch();
              // this.$emit('onClickSearch');
              // this.onClickNew();
            });
          });
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        }
      }
      return true;
    },
    onClickBtnMobileAppVersionReject() {
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData) || utils.isEmpty(this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
        const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
        if (!utils.isEmpty(mobileApplicationId) || !utils.isEmpty(mobileApplicationVersionId)) {
          utils.messageBox('confirm', this.$t('MSG_ALT_WANT_REJECT'), null, () => {
            http.request(this.contextPageId, 'DTS_CMX_00041', {
              data: this.selectedGridRowMobileAppVersionData,
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_REJECT_SCCS'));
              this.onClickMobileAppVersionSearch();
            });
          });
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        }
      }
      return true;
    },
    onclickreset()
    {
     
      //this.$refs.gridMobileAppMgmt.resetSelect();
      this.$refs.gridMobileAppVersion.resetSelect();
    },


  },
};
</script>

<style scoped>
</style>
