<template>
  <div>
    <div class="mrT25" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PORTL')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-custom-select
            ref="portalSelect"
            :selected="fromPsYn?psInitPortal:frame1.frm.portal"
            :defaultOption="'select'"
            :option-list="portalList"
            :disabled="fromPsYn"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select
            ref="moduleSelect"
            :pageId="pageId"
            :selectedMd="frame1.frm.COD_MDLE"
            :selectedSmd="frame1.frm.COD_SMDLE"
            :defaultMdOption="'select'"
            :defaultSmdOption="'select'"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_HCARD_ID')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="frame1.frm.homeCardId"
            max-length="100"
            :readonly="true"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_ID')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <div style="width:100%;">
            <sui-text-field
              v-model="frame1.frm.selPageId"
              max-length="100"
              :readonly="true"
            />
          </div>
          <sui-button
            type="button"
            class="comm_btn_InputScr"
            @click="onBasicPageClick"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_TYPE')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="homeCardSelect"
            :selected="frame1.frm.COD_HCARD_TYPE"
            :pagedId="pageId"
            codeId="COD_HCARD_TYPE"
            :defaultOption="'select'"
            :initialSelectedIndex="0"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_HCARD_NM')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="pageId"
            :multiLanguageId="frame1.frm.multiLanguageId"
            :disabled="false"
            :readonly="false"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_TTL_USE_YN')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame1.frm.homeCardTitleUseYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <div class="comp_spacing" />
          <sui-radio
            v-model="frame1.frm.homeCardTitleUseYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame1.frm.homeCardUseYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <div class="comp_spacing" />
          <sui-radio
            v-model="frame1.frm.homeCardUseYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CNTN')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-11">
          <sui-text-field
            v-model="frame1.frm.homeCardContent"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="pageId"
            :displayType="'1'"
            :displayLanguageId="frame1.frm.r_dsplLngId"
            :loginId="frame1.frm.r_loginId"
            :knoxId="frame1.frm.r_knoxId"
            :userName="frame1.frm.r_userName"
            :userGlobalName="frame1.frm.r_userGlobalName"
            :departmentName="frame1.frm.r_departmentName"
            :departmentEnglishName="frame1.frm.r_departmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ frame1.frm.firstRegistrationDTM }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="pageId"
            :displayType="'1'"
            :displayLanguageId="frame1.frm.m_dsplLngId"
            :knoxId="frame1.frm.m_knoxId"
            :loginId="frame1.frm.m_loginId"
            :userName="frame1.frm.m_userName"
            :userGlobalName="frame1.frm.m_userGlobalName"
            :departmentName="frame1.frm.m_departmentName"
            :departmentEnglishName="frame1.frm.m_departmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ frame1.frm.finalModificationDTM }}
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:create="pageId"
        type="button"
        class="comm_btn_border"
        @click="onNewClick"
      >
        {{ $t('MSG_BTN_NEW') }}
      </sui-button>
      <sui-button
        v-permission:delete="pageId"
        type="button"
        class="comm_btn_border"
        @click="onDeleteClick"
      >
        {{ $t('MSG_BTN_DEL') }}
      </sui-button>
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        @click="onSaveClick"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00008_T01',
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
  data() {
    return {
      frame1: {
        frm: {
          portal: {
            label: '',
            key: '',
          },
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_HCARD_TYPE: {
            label: '',
            key: '',
          },
          COD_HCARD_SIZE_TYPE: {
            label: '',
            key: '',
          },
          homeCardId: '',
          homeCardUseYn: 'Y',
          homeCardTitleUseYn: 'Y',
          multiLanguageId: '',
          selPageId: '',
          homeCardContent: '',
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
          m_knoxId: '',
          m_loginId: '',
          m_userName: '',
          m_userGlobalName: '',
          m_departmentName: '',
          m_departmentEnglishName: '',
        },
      },
      portalList: [],
    };
  },
  watch: {
    selectedGridRowData(selObj) {
      // //this.loadPortalList().then(() => {
      //   if(selObj){
      //     this.setFormData(selObj);
      //   }
      // //});
      if (!utils.isEmpty(this.selectedGridRowData)) {
        this.setFormData(selObj);
      }else{
        this.onClickNew();
      }
    },
  },
  mounted() {
    this.loadPortalList();
  },
  methods: {
    loadPortalList() {
      return new Promise((resolve, reject) => {
        http.request(this.contextPageId, 'DTS_CMP_00004', {
        }).then(res => {
          this.portalList = [];
          if (res.data.length > 0) {
            utils.forEach(res.data, obj => {
              const portalInfo = {
                key: obj.portalId,
                label: obj.portalName,
              };
              this.portalList.push(portalInfo);
            });
          }
          // if (utils.isEmpty(this.selectedGridRowData)) {
          //   this.frame1.frm.portal = {
          //     key: 'select',
          //     label: '',
          //   };
          // }
          resolve();
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    }, 
    makeSnapshot() {
      const { frm } = this.frame1;
      const snapshotData = utils.assign({}, {
        COD_MDLE: utils.cloneDeep(frm.COD_MDLE),
        COD_SMDLE: utils.cloneDeep(frm.COD_SMDLE),
        COD_HCARD_TYPE: utils.cloneDeep(frm.COD_HCARD_TYPE),
        selPageId: frm.selPageId,
        homeCardId: frm.homeCardId,
        homeCardUseYn: frm.homeCardUseYn,
        homeCardContent: frm.homeCardContent,
        homeCardTitleUseYn: frm.homeCardTitleUseYn,
      });
      return snapshotData;
    },
    setFormData(obj) {
      const { frm } = this.frame1;

      frm.portal = { key: (obj.portalId || '') };
      frm.COD_MDLE = { key: (obj.moduleCode || '') };
      this.$nextTick(() => {
        frm.COD_SMDLE = { key: (obj.subModuleCode || '') };
      });
      frm.COD_HCARD_TYPE = { key: (obj.homeCardTypeCode || '') };

      frm.selPageId = utils.trim(obj.pageId);
      frm.homeCardId = obj.homeCardId;
      frm.homeCardUseYn = obj.homeCardUseYn;
      frm.homeCardContent = obj.homeCardContent;
      frm.multiLanguageId = obj.homeCardMultiLanguageId;
      frm.homeCardTitleUseYn = obj.homeCardTitleUseYn;

      frm.firstRegistrationUserId = obj.firstRegistrationUserId;
      frm.firstRegistrationDTM = utils.dateformatToClient(obj.firstRegistrationDTM);
      frm.finalModificationUserId = obj.finalModificationUserId;
      frm.finalModificationDTM = utils.dateformatToClient(obj.finalModificationDTM);

      frm.r_dsplLngId = obj.firstRegistrationUserInfo.dsplLngId;
      frm.r_loginId = obj.firstRegistrationUserInfo.loginId;
      frm.r_knoxId = obj.firstRegistrationUserInfo.knoxId;
      frm.r_userName = obj.firstRegistrationUserInfo.userName;
      frm.r_userGlobalName = obj.firstRegistrationUserInfo.userGlobalName;
      frm.r_departmentName = obj.firstRegistrationUserInfo.departmentName;
      frm.r_departmentEnglishName = obj.firstRegistrationUserInfo.departmentEnglishName;
      frm.m_dsplLngId = obj.finalModificationUserInfo.dsplLngId;
      frm.m_loginId = obj.finalModificationUserInfo.loginId;
      frm.m_knoxId = obj.finalModificationUserInfo.knoxId;
      frm.m_userName = obj.finalModificationUserInfo.userName;
      frm.m_userGlobalName = obj.finalModificationUserInfo.userGlobalName;
      frm.m_departmentName = obj.finalModificationUserInfo.departmentName;
      frm.m_departmentEnglishName = obj.finalModificationUserInfo.departmentEnglishName;

      setTimeout(() => {
        this.saveSnapshot(this.makeSnapshot());
      }, 1000);
    },
    onBasicPageClick() {
      utils.openLayerPopup('PGE_CMU_00004', rowData => {
        if (rowData && rowData[0]) {
          this.frame1.frm.selPageId = rowData[0].pageId;
        }
      }, {
        pageInitialData: {
          selectionmode: 'singlerow',
        },
        size: 'lg',
      });
    },
    onNewClick() {
      const { frm } = this.frame1;
      if(!this.fromPsYn){
        this.$refs.portalSelect.reset();
      }
      this.$refs.homeCardSelect.reset();
      this.$refs.moduleSelect.selectMd(' ');
      this.$refs.moduleSelect.selectSmd(' ');
      frm.homeCardId = '';
      frm.selPageId = '';
      frm.multiLanguageId = '';
      this.frame1.frm.multiLanguageId = '';
      this.$refs.mlngEditor.reset();

      frm.homeCardUseYn = 'Y';
      frm.homeCardContent = '';
      frm.homeCardTitleUseYn = 'Y';

      frm.firstRegistrationDTM = '';
      frm.firstRegistrationUserId = '';
      frm.finalModificationDTM = '';
      frm.finalModificationUserId = '';

      frm.r_dsplLngId = '';
      frm.r_knoxId = '';
      frm.r_userName = '';
      frm.r_userGlobalName = '';
      frm.r_departmentName = '';
      frm.r_departmentEnglishName = '';
      frm.m_dsplLngId = '';
      frm.m_knoxId = '';
      frm.m_userName = '';
      frm.m_userGlobalName = '';
      frm.m_departmentName = '';
      frm.m_departmentEnglishName = '';

      setTimeout(() => {
        this.saveSnapshot(this.makeSnapshot());
      }, 1000);

      this.$emit('onClearSelectionMainGrid');
    },
    onDeleteClick() {
      if (!this.frame1.frm.homeCardId) {
        utils.messageBox('information', this.$t('MSG_ALT_DEL_DATA_SELT'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null,
          (/* ok */) => {
            http.request(this.pageId, 'DTS_CMP_00033', {
              path: {
                'homecard-id': this.frame1.frm.homeCardId,
              },
            }).then(() => {
              this.onNewClick();
              this.onSearchClick();
            });
          },
          (/* cancel */) => {});
      }
    },
    onSaveClick() {
      const { frm } = this.frame1;
      const multiLangList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      const dataParams = {
        portalId: this.fromPsYn?this.psInitPortal.key:frm.portal.key,
        homeCardId: utils.trim(frm.homeCardId),
        homeCardTypeCode: utils.trim(frm.COD_HCARD_TYPE.key),
        homeCardMultiLanguageId: utils.trim(frm.multiLanguageId),
        pageId: utils.trim(frm.selPageId),
        moduleCode: utils.trim(frm.COD_MDLE.key),
        subModuleCode: utils.trim(frm.COD_SMDLE.key),
        homeCardContent: frm.homeCardContent,
        homeCardUseYn: utils.trim(frm.homeCardUseYn),
        arrayalOrder: '0',
        multiLanguageList: multiLangList,
        homeCardTitleUseYn: frm.homeCardTitleUseYn,
      };

      if (!this.formValidate(dataParams)) return false;

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          let url = '';
          let params = {};

          if (frm.homeCardId) { // update
            url = 'DTS_CMP_00031';
            params = {
              path: {
                'homecard-id': frm.homeCardId,
              },
              data: dataParams,
            };
          } else { // create
            url = 'DTS_CMP_00032';
            params = {
              data: dataParams,
            };
          }

          http.request(this.pageId, url, params)
            .then(() => {
              if (frm.homeCardId) {
                this.onSearchClick(frm.homeCardId);
              }else{
                this.onSearchClick();
                this.onNewClick();
              }
            });
        },
        (/* cancel */) => {});
    },
    onSearchClick(homeCardId) {
      this.$emit('onSearchClick',homeCardId);
    },
    formValidate(formData) {
      if (!utils.trim(formData.portalId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PORTL'));
        utils.messageBox('warning', msg);

        return false;
      }      
      if (!utils.trim(formData.moduleCode) || formData.moduleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.subModuleCode) || formData.subModuleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.pageId) || formData.pageId === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE_ID'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.homeCardTypeCode) || formData.homeCardTypeCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_TYPE'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG'));
        utils.messageBox('warning', msg,
          null,
          () => {
            this.$refs.mlngEditor.setFocusLocalTxtFld();
          });

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG'));
        utils.messageBox('warning', msg,
          null,
          () => {
            this.$refs.mlngEditor.setFocusGlobalTxtFld();
          });

        return false;
      }
      if (!utils.trim(formData.homeCardUseYn) || formData.homeCardUseYn === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN'));
        utils.messageBox('warning', msg);

        return false;
      }

      return true;
    },
  },
};
</script>
<style scoped>
</style>
