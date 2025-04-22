<template>
  <div>
    <div class="mrT25" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_PORTL')" :vertical="false" required />
        </div>
        <div class="col-xs-5">
          <sui-custom-select ref="selPortals"
                             :selected="fromPsYn?psInitPortal:frame1.frm.portalId"
                             :option-list="frame1.selectPortalList"
                             :defaultOption="'select'"
                             :disabled="fromPsYn"
                             @selection-changed="onLoadPortalSelect"
                             @list-clicked="onPortalSelectClick"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_APPLICATION')" :vertical="false" required />
        </div>
        <div class="col-xs-5">
          <sui-custom-select ref="selApps"
                             :selected="frame1.frm.applicationId"
                             :option-list="frame1.selectAppList"
                             :initialSelectedIndex="0"
                             :defaultOption="'select'"
                             :disabled="disableSelectApps"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_QLINK_NM')" :vertical="false" required />
        </div>
        <div class="col-xs-5">
          <sui-text-field v-model="frame1.frm.quickLinkName" placeholder="" maxlength="250" />
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_QLINK_MARK_NM')" :vertical="false" required />
        </div>
        <div class="col-xs-5">
          <!--<sui-text-field placeholder="" default value :disabled="false" :clearable="true"></sui-text-field>
               <div class="comp_spacing" />
               <sui-text-field placeholder="" default value :disabled="false" :clearable="true"></sui-text-field>
               <div class="comp_spacing" />
               <sui-button type="button" class="comm_btn_lang">다국어버튼</sui-button>-->
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="pageId"
            :multiLanguageId="frame1.frm.quickLinkMultiLanguageId"
            :disabled="false"
            :readonly="false"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_URL')" :vertical="false" required />
        </div>
        <div class="col-xs-5">
          <sui-text-field v-model="frame1.frm.quickLinkUrl" placeholder="" maxlength="250" />
        </div>

        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_EN_URL')" :vertical="false" required />
        </div>
        <div class="col-xs-5">
          <sui-text-field v-model="frame1.frm.quickLinkEnglishUrl" placeholder="" maxlength="250" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_RGST_USR')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            <cmp-user-name-link
              :pageId="pageId"
              :displayType="'1'"
              :displayLanguageId="frame1.frm.r_dsplLngId"
              :userId="frame1.frm.r_userId"
              :knoxId="frame1.frm.r_knoxId"
              :userName="frame1.frm.r_userName"
              :userGlobalName="frame1.frm.r_userGlobalName"
              :departmentName="frame1.frm.r_departmentName"
              :departmentEnglishName="frame1.frm.r_departmentEnglishName"
              :loginId="frame1.frm.r_loginId"
              type="link"
            />
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_RGST_DTM')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ frame1.frm.firstRegistrationDTM | dateFormat }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDFC_USR')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            <cmp-user-name-link
              :pageId="pageId"
              :displayType="'1'"
              :displayLanguageId="frame1.frm.m_dsplLngId"
              :userId="frame1.frm.m_userId"
              :knoxId="frame1.frm.m_knoxId"
              :userName="frame1.frm.m_userName"
              :userGlobalName="frame1.frm.m_userGlobalName"
              :departmentName="frame1.frm.m_departmentName"
              :departmentEnglishName="frame1.frm.m_departmentEnglishName"
              :loginId="frame1.frm.m_loginId"
              type="link"
            />
          </div>
        </div>

        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDFC_DTM')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ frame1.frm.finalModificationDTM | dateFormat }}
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
import BasePage from '~cm/components/BasePage'; // eslint-disable-line import/no-unresolved

export default {
  name: 'PGE_CMP_00015_T01', // eslint-disable-line vue/name-property-casing
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },
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
      frmStatus: 'C',
      disableSelectApps: this.fromPsYn?false:true,
      frame1: {
        frm: {
          portalId: {},
          portalName: '',
          applicationId: {},
          applicationName: '',
          arrayalOrder: '',
          quickLinkEnglishUrl: '',
          quickLinkMultiLanguageId: '',
          quickLinkMultiLanguageName: '',
          quickLinkName: '',
          quickLinkUid: '',
          quickLinkUrl: '',

          finalModificationDTM: '',
          finalModificationUserId: '',
          firstRegistrationDTM: '',
          firstRegistrationUserId: '',

          r_dsplLngId: '',
          r_knoxId: '',
          r_userName: '',
          r_userGlobalName: '',
          r_departmentName: '',
          r_departmentEnglishName: '',
          m_dsplLngId: '',
          m_knoxId: '',
          m_userName: '',
          m_userGlobalName: '',
          m_departmentName: '',
          m_departmentEnglishName: '',
        },
        selectPortalList: [],
        selectAppList: [],
      },
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(obj) {
      if (obj) {
        this.frmStatus = 'U';
        const fm = this.frame1.frm;

        fm.portalId = { key: obj.portalId };
        fm.portalName = obj.portalName || '';
        fm.applicationId = { key: obj.applicationId };
        fm.applicationName = obj.applicationName || '';
        fm.arrayalOrder = obj.arrayalOrder;
        fm.quickLinkEnglishUrl = obj.quickLinkEnglishUrl;
        fm.quickLinkMultiLanguageId = obj.quickLinkMultiLanguageId;
        fm.quickLinkMultiLanguageName = obj.quickLinkMultiLanguageName;
        fm.quickLinkName = obj.quickLinkName || '';
        fm.quickLinkUid = obj.quickLinkUid;
        fm.quickLinkUrl = obj.quickLinkUrl || '';

        fm.finalModificationDTM = obj.finalModificationDTM || '';
        fm.finalModificationUserId = obj.finalModificationUserId || '';
        fm.firstRegistrationDTM = obj.firstRegistrationDTM || '';
        fm.firstRegistrationUserId = obj.firstRegistrationUserId || '';
        // 사용자 표시
        fm.r_dsplLngId = obj.r_dsplLngId;
        fm.r_userId = obj.r_userId;
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

        setTimeout(() => {
          this.saveSnapshot(this.makeSnapshot());
        }, 1000);
      }
    },
  },
  mounted() {
    this.getPortalList();
    if(this.fromPsYn){
      this.getApplicationList(this.psInitPortal);
    }
  },

  methods: {
    makeSnapshot() {
      return utils.assign({}, utils.cloneDeep(this.frame1.frm));
    },
    getPortalList() {
      http.request(this.pageId, 'DTS_CMP_00004')
        .then(res => {
          utils.forEach(res.data, obj => {
            this.frame1.selectPortalList.push({
              key: obj.portalId,
              label: obj.portalName,
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getApplicationList(vPortal) {
      // Application list
      http.request(this.pageId, 'DTS_CMP_00005', {
        query: {
          portalId: utils.trim(vPortal.key),
        },
      })
        .then(res => {
          this.frame1.selectAppList = [];
          utils.forEach(res.data, obj => {
            this.frame1.selectAppList.push({
              key: obj.applicationId,
              label: obj.applicationName,
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    onNewClick() {
      this.frmStatus = 'C';
      // this.frame1.frm = {
      //   portalId: { key: '', label: '' },
      //   portalName: '',
      //   applicationId: { key: '', label: '' },
      //   applicationName: '',
      //   arrayalOrder: '',
      //   quickLinkEnglishUrl: '',
      //   quickLinkMultiLanguageId: '',
      //   quickLinkMultiLanguageName: '',
      //   quickLinkName: '',
      //   quickLinkUid: '',
      //   quickLinkUrl: '',
      //   finalModificationDTM: '',
      //   finalModificationUserId: '',
      //   firstRegistrationDTM: '',
      //   firstRegistrationUserId: '',
      // };

      utils.assign(this.frame1.frm, {
        portalId: { key: '', label: '' },
        portalName: '',
        applicationId: { key: '', label: '' },
        applicationName: '',
        arrayalOrder: '',
        quickLinkEnglishUrl: '',
        quickLinkMultiLanguageId: '',
        quickLinkMultiLanguageName: '',
        quickLinkName: '',
        quickLinkUid: '',
        quickLinkUrl: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
      });
      if(!this.fromPsYn){
        this.$refs.selPortals.reset();
        this.disableSelectApps = true;
      }
      this.$refs.selApps.reset();
      this.$refs.mlngEditor.reset();
      // this.frame1.frm.quickLinkMultiLanguageId = '';

      setTimeout(() => {
        this.saveSnapshot(this.makeSnapshot());
      }, 1000);

      this.$emit('onClearSelectionMainGrid');
    },
    onDeleteClick() {
      if (!this.frame1.frm.quickLinkUid) {
        utils.messageBox('information', this.$t('MSG_ALT_DEL_DATA_SELT'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null,
          (/* ok */) => {
            http.request(this.pageId, 'DTS_CMP_00050', {
              path: {
                'quick-link-uid': this.frame1.frm.quickLinkUid,
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
      }
    },
    onSaveClick() {
      const multiLangList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      const { frm } = this.frame1;
      const tmpPortalId = this.fromPsYn?this.psInitPortal.key:utils.trim(frm.portalId.key);
      const tmpAppId = utils.trim(frm.applicationId.key);
      const tmpMultiLangId = this.frmStatus === 'U' ? frm.quickLinkMultiLanguageId : '';
      const dataParams = {
        portalId: tmpPortalId,
        applicationId: tmpAppId,
        quickLinkUid: frm.quickLinkUid,
        arrayalOrder: frm.arrayOrder || 0,
        quickLinkMultiLanguageId: tmpMultiLangId,
        quickLinkName: utils.trim(frm.quickLinkName),
        quickLinkUrl: utils.trim(frm.quickLinkUrl),
        quickLinkEnglishUrl: utils.trim(frm.quickLinkEnglishUrl),
        multiLanguageList: multiLangList,
      };

      // dataParams = this.makeSnapshot();

      // form validataion
      if (!this.formValidate(dataParams)) return false;

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
        (/* ok */) => {
          let url;
          let opt;
          if (this.frmStatus === 'C') { // create
            url = 'DTS_CMP_00047';
            opt = {
              data: dataParams,
            };
          } else if (this.frmStatus === 'U') { // update
            url = 'DTS_CMP_00048';
            opt = {
              path: { 'quick-link-id': this.frame1.frm.quickLinkUid },
              data: dataParams,
            };
          }

          http.request(this.pageId, url, opt)
            .then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
                if(this.frmStatus === 'U'){
                  this.onSearchClick(this.frame1.frm.quickLinkUid);
                }else{
                  this.onSearchClick();
                  this.onNewClick();
                }
              });
            }).catch(error => {
              console.log(error);
            });
        },
        (/* cancel */) => {});
    },
    formValidate(formData) {
      if (!utils.trim(formData.portalId) || formData.portalId === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PORTL'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.applicationId) || formData.applicationId === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_APPLICATION'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.quickLinkName)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_QLINK_NM'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        // global 언어를 입력해주세요
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.quickLinkUrl)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_URL'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.quickLinkEnglishUrl)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EN_URL'));
        utils.messageBox('warning', msg);

        return false;
      }
      return true;
    },
    onSearchClick(savedQuickLinkUid) {
      this.$emit('onSearchClick',savedQuickLinkUid);
    },
    onPortalSelectClick() {
      this.getApplicationList(this.frame1.frm.portalId);
      this.disableSelectApps = utils.trim(this.frame1.frm.portalId.key) === '';
    },
    onLoadPortalSelect() {
      if(!this.fromPsYn){
        this.getApplicationList(this.frame1.frm.portalId);
      }
    },
  },
};
</script>
<style scoped>
</style>
