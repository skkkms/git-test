<template>
    <div>
        <div class="mrT25"></div>
        <div class="comm_view_wrap">
            <div class="row">
                <div class="col-xs-1">
                    <sui-input-label :label="$t('MSG_TXT_APPLICATION_ID')" :required="true" :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5" v-show="status === 'C'">
                    <div class="comm_label">APP_</div>
                    <div class="comp_spacing"></div>
                    <sui-text-field
                        ref="txtAppId"
                        class="ime-mode-en"
                        v-model="frame1.frm.inputAppId"
                        placeholder=""
                        maxlength="96"
                        @keyup="inputValid"
                        @blur="inputValid"
                        default value
                        :disabled="false"
                        :readonly="false"
                        pattern="[A-Z0-9]"
                    ></sui-text-field>
                    <div class="comp_spacing"></div>
                    <sui-button
                        v-permission:read="pageId"
                        type="button"
                        class="comm_btn_duplicate"
                        @click="onCheckDuplicateIdClick">
                    </sui-button>
                </div>
                <div class="col-xs-5" v-show="status === 'U'">
                    <div class="comm_label">{{ frame1.frm.appId }}</div>
                </div>
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_APPLICATION_NM')"
                        :required="true"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <cmp-mlng-editor
                        :pageId="pageId"
                        :multiLanguageId="multiLanguageId"
                        :disabled="false"
                        :readonly="false"
                        ref="mlngEditor"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-1">
                    <sui-input-label :label="$t('MSG_TXT_PORTL')" :required="true" :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <sui-custom-select ref="selPortals"
                                   :selected="fromPsYn?psInitPortal:frame1.frm.portalId"
                                   :option-list="frame1.portalList"
                                   :defaultOption="'select'"
                                   :disabled="fromPsYn"
                    />
                </div>
           
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_MENU_UE_YN')"
                        :required="true"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <sui-radio
                        v-model="frame1.frm.menuUseYnValue"
                        value="Y"
                    >
                        Yes
                    </sui-radio>
                    <sui-radio
                        v-model="frame1.frm.menuUseYnValue"
                        value="N"
                    >
                        No
                    </sui-radio>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_MENU_FOLD_YN')"
                        :required="true"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <sui-radio :disabled="frame1.frm.menuUseYnValue === 'N'"
                               v-model="frame1.frm.appMenuFoldYn"
                               value="Y"
                    >
                        Yes
                    </sui-radio>
                    <sui-radio :disabled="frame1.frm.menuUseYnValue === 'N'"
                               v-model="frame1.frm.appMenuFoldYn"
                               value="N"
                    >
                        No
                    </sui-radio>
                </div>
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_FLDR_FOLD_YN')"
                        :required="true"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <sui-radio :disabled="frame1.frm.menuUseYnValue === 'N'"
                               v-model="frame1.frm.appFolderFoldYn"
                               value="Y"
                    >
                        Yes
                    </sui-radio>
                    <sui-radio :disabled="frame1.frm.menuUseYnValue === 'N'"
                               v-model="frame1.frm.appFolderFoldYn"
                               value="N"
                    >
                        No
                    </sui-radio>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_DFLT_PAGE_ID')"
                        :required="false"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <div class="comm_scrInput_wrap">
                        <div>
                            <sui-text-field
                                v-model="frame1.frm.appBasicsPageId"
                                maxlength="50"
                                style="width:100%;"
                                fixedIcon
                                :readonly="true"
                            />
                        </div>
                        <sui-button
                            v-permission:read="pageId"
                            type="button"
                            class="comm_btn_InputScr"
                            @click="onBasicPageClick"
                        />
                    </div>
                </div>
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_USE_YN')"
                        :required="false"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <sui-radio
                        v-model="frame1.frm.useYnValue"
                        value="Y"
                    >
                        Yes
                    </sui-radio>
                    <sui-radio
                        v-model="frame1.frm.useYnValue"
                        value="N"
                    >
                        No
                    </sui-radio>
                </div>
            </div>
            <div class="row">
              <div class="col-xs-1">
                  <sui-input-label
                      :label="$t('MSG_TXT_EXTR_YN')"
                      :required="false"
                      :vertical="false"></sui-input-label>
              </div>
              <div class="col-xs-5">
                  <sui-radio
                      v-model="frame1.frm.externalYnValue"
                      value="Y"
                  >
                      Yes
                  </sui-radio>
                  <sui-radio
                      v-model="frame1.frm.externalYnValue"
                      value="N"
                  >
                      No
                  </sui-radio>
              </div>
              <div class="col-xs-1">
                <sui-input-label
                    :label="$t('MSG_TXT_EXTR_URL')"
                    :required="false"
                    :vertical="false"></sui-input-label>
              </div>
              <div class="col-xs-5">
                <sui-text-field
                  ref="textFieldExternalUrl"
                  :disabled="externalFlag"
                  v-model="frame1.frm.externalUrl"
                  maxlength="100"
                />
              </div>
            </div>
            <div class="row"
              v-if="deviceApplyYn">
              <div class="col-xs-1 "
                v-if="deviceApplyYn">
                <sui-input-label
                  :label="$t('MSG_TXT_DVC_TYPE')"
                  :required="true"
                />
              </div>
              <div class="col-xs-11 "
                v-if="deviceApplyYn">
                <sui-device-checkbox
                  ref="deviceCheck"
                  :value="frame1.frm.deviceTypeValue"
                />
              </div>              
            </div>
            <div class="row">
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_RGST_USR')"
                        :required="false"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <div class="comm_label">{{ frame1.frm.firstRegistrationUserId }}</div>
                </div>
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_RGST_DTM')"
                        :required="false"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <div class="comm_label">{{ frame1.frm.firstRegistrationDTM | dateFormat }}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_MDFC_USR')"
                        :required="false"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <div class="comm_label">{{ frame1.frm.finalModificationUserId }}</div>
                </div>
                <div class="col-xs-1">
                    <sui-input-label
                        :label="$t('MSG_TXT_MDFC_DTM')"
                        :required="false"
                        :vertical="false"></sui-input-label>
                </div>
                <div class="col-xs-5">
                    <div class="comm_label">{{ frame1.frm.finalModificationDTM | dateFormat }}</div>
                </div>
            </div>
        </div>
        <div class="comm_btn_wrap">
            <sui-button
                v-permission:create="pageId"
                type="button"
                class="comm_btn_border"
                @click="onRestoreClick">{{ $t('MSG_BTN_RESTORE') }}</sui-button>
            <sui-button
                v-permission:create="pageId"
                type="button"
                class="comm_btn_border"
                @click="onNewClick">{{ $t('MSG_BTN_NEW') }}</sui-button>
            <sui-button
                v-permission:delete="pageId"
                type="button"
                class="comm_btn_border"
                @click="onDeleteClick">
                {{ this.frame1.frm.deleteYnValue=="Y"?$t('MSG_BTN_DSCD'):$t('MSG_BTN_DEL') }}
            </sui-button>
            <sui-button
                v-permission:update="pageId"
                type="button"
                class="comm_btn_solid"
                @click="onSaveClick">{{ $t('MSG_BTN_SAVE') }}</sui-button>
        </div>
    </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00011_T01',
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      required: false,
    },
    selectedGridRowData: {
      type: Object,
      required: false,
    },
    deviceApplyYn: {
      type: Boolean,
      default: false,
    },
    psInitPortal: {
      type: Object,
      default() {
        return {};
      }
    },
    fromPsYn: {
      type: Boolean,
      default: false,      
    }
  },
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },
  data() {
    return {
      status: 'C', // new: C, modify: U
      isNotDupKey: false,
      multiLanguageId: '',
      frame1: {
        frm: {
          portalId: {},
          inputAppId: '', // status C
          tmpAppId: '',
          appId: '',
          appLocalName: '',
          appGlobalName: '',
          arrayOrder: '',
          appIdChkFlag: false,
          menuUseYnValue: 'Y',
          useYnValue: 'Y', // { label: '', key: '' },
          externalYnValue: 'N',
          externalUrl: '',
          appMenuFoldYn: 'N', // { label: '', key: '' },
          appFolderFoldYn: 'N',
          appBasicsPageId: '',
          deviceTypeValue: 1,
          deleteYnValue:'',
          firstRegister: '',
          finalModifier: '',
          firstRegistrationUserId: '',
          firstRegistrationDTM: '',
          finalModificationUserId: '',
          finalModificationDTM: '',
          r_dsplLngId: '',
          r_loginId: '',
          r_knoxId: '',
          r_userName: '',
          r_userGlobalName: '',
          r_departmentName: '',
          r_departmentEnglishName: '',
          m_dsplLngId: '',
          m_loginId: '',
          m_knoxId: '',
          m_userName: '',
          m_userGlobalName: '',
          m_departmentName: '',
          m_departmentEnglishName: '',
        },
        portalList: [],
      },
      saveAppId: '',
      tmpAppId: '',
    };
  },
  computed: {
    externalFlag() {
      return utils.isEqual(this.frame1.frm.externalYnValue, 'N');
    },    
  },
  watch: {
    selectedGridRowData(obj) {
      if (!utils.isEmpty(obj)) {
        this.status = 'U';
        this.isNotDupKey = true;
        const fm = this.frame1.frm;

        let  defaultName = '';
        if (obj.applicationBasicsDashboardId) {
          defaultName = obj.applicationBasicsDashboardId.startsWith('DSB') === true ? utils.trim(obj.applicationBasicsDashboardId) : utils.trim(obj.applicationBasicsPageId) || '';
        }
        fm.portalId = { key: obj.portalId };
        fm.appId = obj.applicationId;

        fm.arrayOrder = obj.arrayOrder;
        // 어플리케이션명
        // this.$refs.mlngEditor.searchMlngDataById(obj.applicationMultiLanguageId);
        this.multiLanguageId = obj.applicationMultiLanguageId;
        // 메뉴사용여부
        // fm.menuUseYnValue = { key: (obj.applicationMenuUseYn || ' ') };
        fm.menuUseYnValue = obj.applicationMenuUseYn || 'Y';
        // 메뉴접기여부
        // fm.appMenuFoldYn = { key: (obj.applicationMenuFoldYn || ' ') };
        fm.appMenuFoldYn = obj.applicationMenuFoldYn || 'N';
        // 폴더접기여부
        // fm.appFolderFoldYn = { key: (obj.applicationFolderFoldYn || ' ') };
        fm.appFolderFoldYn = obj.applicationFolderFoldYn || 'N';
        // 기본페이지ID
        fm.appBasicsPageId = defaultName;
        // 사용여부
        // fm.useYnValue = { key: (obj.applicationUseYn || ' ') };
        fm.useYnValue = obj.applicationUseYn || 'Y';
        // 외부여부
        fm.externalYnValue = obj.externalYn || 'Y';
        // 외부여부
        fm.externalUrl = obj.externalUrl;
        // 삭제여부
        fm.deleteYnValue = obj.deleteYn;
        // 등록자
        fm.firstRegistrationUserId = obj.firstRegistrationUserId;
        // 등록일시
        fm.firstRegistrationDTM = obj.firstRegistrationDTM;
        // 수정자
        fm.finalModificationUserId = obj.finalModificationUserId;
        // 수정일시
        fm.finalModificationDTM = obj.finalModificationDTM;

        fm.r_userId = obj.r_userId;
        fm.r_dsplLngId = obj.r_dsplLngId;
        fm.r_loginId = obj.r_loginId;
        fm.r_knoxId = obj.r_knoxId;
        fm.r_userName = obj.r_userName;
        fm.r_userGlobalName = obj.r_userGlobalName;
        fm.r_departmentName = obj.r_departmentName;
        fm.r_departmentEnglishName = obj.r_departmentEnglishName;

        fm.m_dsplLngId = obj.m_dsplLngId;
        fm.m_userId = obj.m_userId;
        fm.m_loginId = obj.m_loginId;
        fm.m_knoxId = obj.m_knoxId;
        fm.m_userName = obj.m_userName;
        fm.m_userGlobalName = obj.m_userGlobalName;
        fm.m_departmentName = obj.m_departmentName;
        fm.m_departmentEnglishName = obj.m_departmentEnglishName;

        fm.firstRegister = obj.firstRegister;
        fm.finalModifier = obj.finalModifier;

        fm.deviceTypeValue = obj.deviceTypeValue;
        if(this.deviceApplyYn) {
          this.$refs.deviceCheck.setValue(fm.deviceTypeValue);
        }

        setTimeout(() => {
          this.saveSnapshot(this.makeSnapshot());
        }, 1000);
      } else {
        this.resetTab();
      }
    },
  },
  mounted() {
    http.request(this.pageId, 'DTS_CMP_00004')
      .then(res => {
        utils.forEach(res.data, obj => {
          this.frame1.portalList.push({
            key: obj.portalId,
            label: obj.portalName,
          });
        });
        // this.saveSnapshot(this.makeSnapshot()); // snapshot
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    makeSnapshot() {
      const snapshotData = utils.assign({}, this.frame1.frm);
      return snapshotData;
    },
    onSearchClick(appId) {
      this.$emit('onSearchClick', appId);
    },
    resetTab() {
      this.status = 'C';
      // data init
      this.isNotDupKey = false;
      this.frame1.frm = {
        appId: '',
        arrayOrder: '',
        appIdChkFlag: false,
        portalId: { label: '', key: ' ' },
        menuUseYnValue: 'Y', // { label: '', key: ' ' },
        useYnValue: 'Y', // { label: '', key: ' ' },
        externalYnValue: 'N', // { label: '', key: ' ' },
        externalUrl: '',
        appMenuFoldYn: 'N', // { label: '', key: ' ' },
        appFolderFoldYn: 'N', // { label: '', key: ' ' },
        appBasicsPageId: '',
        appBasicsDashboardId: '',
        deviceTypeValue: 1,
        deleteYnValue:'N',
        firstRegistrationUserId: '',
        firstRegistrationDTM: '',
        finalModificationUserId: '',
        finalModificationDTM: '',
      };
      if(!this.fromPsYn){
        this.$refs.selPortals.reset();
      }

      if(this.deviceApplyYn) {
        this.$refs.deviceCheck.setValue(1);
      }

      this.multiLanguageId = '';
      this.$refs.mlngEditor.reset();

      setTimeout(() => {
        this.saveSnapshot(this.makeSnapshot());
      }, 1000);
    },
    onNewClick() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onSaveClick() {
      const multiLangList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      const { frm } = this.frame1;
      const tmpPortalId = this.fromPsYn?this.psInitPortal.key:utils.trim(frm.portalId.key);
      const tmpAppId = (this.status === 'C' ? `APP_${utils.trim(frm.inputAppId)}` : utils.trim(frm.appId));
      const tmpMultiLangId = `${tmpAppId}_${tmpPortalId}`;
      if (utils.trim(frm.appBasicsDashboardId)) {
        frm.appBasicsPageId = '';
      }
      const dataParams = {
        applicationId: tmpAppId,
        arrayOrder: frm.arrayOrder || 0, // utils.size(this.appList),
        applicationMultiLanguageId: tmpMultiLangId,
        portalId: tmpPortalId,
        applicationMenuUseYn: utils.trim(frm.menuUseYnValue),
        applicationMenuFoldYn: utils.trim(frm.appMenuFoldYn),
        applicationFolderFoldYn: utils.trim(frm.appFolderFoldYn),
        applicationBasicsPageId: utils.trim(frm.appBasicsPageId),
        applicationBasicsDashboardId: utils.trim(frm.appBasicsDashboardId),
        deviceTypeValue: this.deviceApplyYn ? this.$refs.deviceCheck.getValue() : frm.deviceTypeValue,
        applicationUseYn: utils.trim(frm.useYnValue),
        externalYn: utils.trim(frm.externalYnValue),
        externalUrl: utils.trim(frm.externalUrl),
        multiLanguageList: multiLangList,
      };

      this.saveAppId = tmpAppId;

      // form validataion
      if (!this.formValidate(dataParams)) return false;

      const confirmMessage = this.$t('MSG_ALT_IS_SAV_DATA');

      utils.messageBox('confirm', confirmMessage, null,
        (/* ok */) => {
          let url;
          let opt;
          if (this.status === 'C') { // create
            url = 'DTS_CMP_00007';
            opt = {
              data: dataParams,
            };
          } else if (this.status === 'U') { // update
            url = 'DTS_CMP_00008';
            opt = {
              path: { 'application-id': this.frame1.frm.appId },
              data: dataParams,
            };
          }

          http.request(this.pageId, url, opt)
            .then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
                // this.onNewClick();
                if(this.status === 'U'){
                  this.frame1.frm.appId = this.saveAppId;
                  this.onSearchClick(this.saveAppId);
                }else{
                  this.onNewClick();
                }
              });
            }).catch(error => {
              console.log(error);
            });
        },
        (/* cancel */) => {
        });

      // utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
      //   (/* ok */) => {
      //     let url;
      //     let opt;
      //     if (this.status === 'C') { // create
      //       url = 'DTS_CMP_00007';
      //       opt = {
      //         data: dataParams,
      //       };
      //     } else if (this.status === 'U') { // update
      //       url = 'DTS_CMP_00008';
      //       opt = {
      //         path: { 'application-id': this.frame1.frm.appId },
      //         data: dataParams,
      //       };
      //     }

      //     http.request(this.pageId, url, opt)
      //       .then(() => {
      //         utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
      //           // this.onNewClick();
      //           this.frame1.frm.appId = this.saveAppId;
      //           this.status = 'U';
      //           this.onSearchClick(this.saveAppId);
      //           this.onNewClick();
      //         });
      //       }).catch(error => {
      //         console.log(error);
      //       });
      //   },
      //   (/* cancel */) => {});
    },
    onDeleteClick() {
      if (!this.frame1.frm.appId) {
        // utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        // utils.messageBox('information', this.$t('MSG_ALT_DEL_NO_DATA'));
      } else if (this.frame1.frm.deleteYnValue === 'N') {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null,
          (/* ok */) => {
            http.request(this.pageId, 'DTS_CMP_00010', {
              path: {
                'application-id': this.frame1.frm.appId,
              },
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, () => {
                this.onNewClick();
                this.onSearchClick();
              });
            }).catch(error => {
              console.log(error);
            });
          },
          (/* cancel */) => {});
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DSCD_DATA'), null,
          (/* ok */) => {
            http.request(this.pageId, 'DTS_CMP_00101', {
              path: {
                'application-id': this.frame1.frm.appId,
              },
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_DSCD_DATA'), null, () => {
                this.onNewClick();
                this.onSearchClick();
              });
            }).catch(error => {
              console.log(error);
            });
          },
          (/* cancel */) => {});
      }
    },
    onRestoreClick() {
      if (!this.frame1.frm.appId) {
        // utils.messageBox('information', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else if (this.frame1.frm.deleteYnValue === 'N') {
        utils.messageBox('information', this.$t('MSG_ALT_IMPOSSIBLE_RESTORE')); // 삭제하지 않는 데이터는 복원할 수 없습니다.
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_RESTORE_DATA'), null,
          (/* ok */) => {
            http.request(this.pageId, 'DTS_CMP_00100', {
              path: {
                'application-id': this.frame1.frm.appId,
              },
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_RESTORE_DATA'), null, () => {
                this.onNewClick();
                this.onSearchClick();
              });
            }).catch(error => {
              console.log(error);
            });
          },
          (/* cancel */) => {});
      }
    },
    onBasicPageClick() {
      // 대시보드 추가 된 팝업으로 변경
      // select application bagic pageId
      //  As is => utils.openLayerPopup('PGE_CMU_00004', rowData => {
      utils.openLayerPopup('PGE_CMU_00018', rowData => {
        // callback
        if (rowData && rowData[0]) {
          if (rowData[0].dashboardId) {
            this.frame1.frm.appBasicsPageId = rowData[0].dashboardId;
            this.frame1.frm.appBasicsDashboardId = rowData[0].dashboardId;
          } else {
            this.frame1.frm.appBasicsPageId = rowData[0].pageId;
          }
        }
      }, {
        pageInitialData: {
          selectionmode: 'singlerow',
        },
        size: 'lg',
      });
    },
    onCheckDuplicateIdClick() {
      if (utils.isEmpty(this.frame1.frm.inputAppId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_APPLICATION_ID'));
        utils.messageBox('warning', msg);
        return false;
      }

      const queryParams = {
        checkId: `APP_${this.frame1.frm.inputAppId}`,
      };
      http.request(this.pageId, 'DTS_CMP_00009', {
        query: queryParams,
      }).then(res => {
        if (res.data.resultCode === '0') {
          utils.messageBox('error', this.$t('MSG_ALT_IMG_RGST_ID'), null, () => { // 이미 등록된 ID입니다.
            this.isNotDupKey = false;
            this.$refs.txtAppId.setFocus();
          });
        } else {
          this.isNotDupKey = true;
          this.tmpAppId = this.frame1.frm.inputAppId;
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
        }
      }).catch(error => {
        console.log(error);
      });
    },
    inputValid() {
      if (this.frame1.frm.inputAppId) {
        this.frame1.frm.inputAppId = utils.toUpper(this.frame1.frm.inputAppId.replace(/[^a-z0-9_]/gi, ''));
      }
    },
    formValidate(formData) {
      if (utils.trim(formData.applicationId) === 'APP_') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APPLICATION_ID'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (this.status === 'C' && (!this.isNotDupKey || this.frame1.frm.inputAppId !== this.tmpAppId)) { // 중복 체크
        this.isNotDupKey = false;
        const msg = this.$t('MSG_ALT_SELT_DPCT_CHK');
        utils.messageBox('warning', msg);

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APPLICATION_NM'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        // global 언어를 입력해주세요
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.portalId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PORTL'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.applicationMenuUseYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MENU_UE_YN'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.applicationMenuFoldYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MENU_FOLD_YN'));
        utils.messageBox('warning', msg);

        return false;
      }
      // if (!utils.trim(formData.applicationBasicsPageId)) {
      //   const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DFLT_PAGE_ID'));
      //   utils.messageBox('warning', msg);
      //
      //   return false;
      // }
      if (!utils.trim(formData.applicationUseYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MENU_FOLD_YN'));
        utils.messageBox('warning', msg);

        return false;
      }
      if(this.deviceApplyYn && this.$refs.deviceCheck.getValue()<1) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DVC_TYPE'));
        utils.messageBox('warning', msg);
        
        return false;
      }      

      return true;
    },
  },
};
</script>

<style scoped>
.ime-mode-en {
    -ms-ime-mode: disabled;
}
</style>