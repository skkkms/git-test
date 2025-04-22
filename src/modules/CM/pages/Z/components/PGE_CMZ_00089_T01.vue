<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_ATHN_SYS_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldAuthSystemName"
            v-model="objApiAuthMgt.authSystemName"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_ATHN_SYS_UID')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldAuthSystemUid"
            v-model="objApiAuthMgt.authSystemUid"
            :disabled="true"
          />
          <div class="comp_spacing" />
          <button
            type="button"
            class="-portalStudio-url-copy"
            :disabled="isEmptyAuthSystemUid"
            @click="onClickCopyToClip(objApiAuthMgt.authSystemUid)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_ACS_TOKN_VLD_TM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldAcsToknVldTm"
            v-model="objApiAuthMgt.accessTokenValidity"
            maxlength="100000000"
            @keyup="inputValid"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_ATHN_SYS_KEY')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldAuthSystemKey"
            v-model="authSystemKey"
            :disabled="true"
          />
          <div class="comp_spacing" />
          <button
            type="button"
            class="-portalStudio-url-copy"
            :disabled="isEmptyClientSecret"
            @click="onClickCopyToClip(authSystemKey)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_SYS_IP_RSTR_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objApiAuthMgt.systemIpRestrictionYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objApiAuthMgt.systemIpRestrictionYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_API_RSTR_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objApiAuthMgt.apiRestrictionYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objApiAuthMgt.apiRestrictionYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_SYS_IP_RSTR_VAL')"
          />
        </div>
        <div class="col-xs-5 ">
          <textarea
            ref="textFieldSystemIpRestrictionValue"
            v-model="objApiAuthMgt.systemIpRestrictionValue"
            style="width:100%"
            maxlength="1000"
            :placeholder="$t('MSG_TXT_SEPARATOR_COMMA')"
            :disabled="this.objApiAuthMgt.systemIpRestrictionYn==='N'"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_API_RSTR_VAL')"
          />
        </div>
        <div class="col-xs-5 ">
          <textarea
            ref="textFieldApiRestrictionValue"
            v-model="objApiAuthMgt.apiRestrictionValue"
            style="width:100%"
            maxlength="1000"
            :placeholder="$t('MSG_TXT_SEPARATOR_COMMA')"
            :disabled="this.objApiAuthMgt.apiRestrictionYn==='N'"
          />          
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objApiAuthMgt.useYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objApiAuthMgt.useYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_EXPL')"
          />
        </div>
        <div class="col-xs-11 ">
          <textarea
            ref="textFieldApiAuthContent"
            v-model="objApiAuthMgt.apiAuthContent"
            style="width:100%"
            maxlength="1000"
          />          
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objApiAuthMgt.r_dsplLngId"
            :userId="objApiAuthMgt.r_userId"
            :loginId="objApiAuthMgt.r_loginId"
            :knoxId="objApiAuthMgt.r_knoxId"
            :userName="objApiAuthMgt.r_userName"
            :userGlobalName="objApiAuthMgt.r_userGlobalName"
            :departmentName="objApiAuthMgt.r_departmentName"
            :departmentEnglishName="objApiAuthMgt.r_departmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ objApiAuthMgt.firstRegistrationDTM }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objApiAuthMgt.m_dsplLngId"
            :userId="objApiAuthMgt.m_userId"
            :loginId="objApiAuthMgt.m_loginId"
            :knoxId="objApiAuthMgt.m_knoxId"
            :userName="objApiAuthMgt.m_userName"
            :userGlobalName="objApiAuthMgt.m_userGlobalName"
            :departmentName="objApiAuthMgt.m_departmentName"
            :departmentEnglishName="objApiAuthMgt.m_departmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ objApiAuthMgt.finalModificationDTM }}
          </div>
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        v-permission:create="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>  
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00089_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isNew : true,
      objApiAuthMgt: {
        authSystemUid: '',
        authSystemName: '',
        systemIpRestrictionYn: 'N',
        systemIpRestrictionValue: '',
        apiRestrictionYn: 'N',
        apiRestrictionValue: '',
        apiAuthContent: '',
        useYn: 'Y',
        delYn: 'N',

        clientId: '',
        resourceIds: '',
        clientSecret: '',
        scope: 'read',
        authorizedGrantTypes: 'client_credentials',
        webServerRedirectUri: '',
        authorities: '',
        accessTokenValidity: '36000',
        refreshTokenValidity: '2592000',
        additionalInformation: '',
        autoapprove: '',

        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        r_dsplLngId: '',
        r_knoxId: '',
        r_loginId: '',
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
      authSystemKey: '',
    };
  },
  computed: {
    isEmptyAuthSystemUid() {
      return utils.isEmpty(this.objApiAuthMgt.authSystemUid);
    },
    isEmptyClientSecret() {
      return utils.isEmpty(this.objApiAuthMgt.clientSecret);
    },
  },
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadApiAuth();
      } else {
        this.resetTab();
      }
    },
    'objApiAuthMgt.clientSecret': {
      handler(value) {
        if (this.objApiAuthMgt.clientSecret == null || this.objApiAuthMgt.clientSecret == '') {
          this.authSystemKey = this.objApiAuthMgt.clientSecret
        } else {
          this.authSystemKey = (this.objApiAuthMgt.clientSecret).substring(6)
        }
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },  
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    loadApiAuth() {
      if(this.selectedGridRowData) {
        const authSystemUid = this.selectedGridRowData.authSystemUid;
        if(!utils.isEmpty(authSystemUid)) {
          http.request(this.contextPageId, 'DTS_CMZ_00193', {  
            path: {
              'auth-system-uid': authSystemUid,
            },
          }).then(res => {
            this.setUserInfoFormat(res.data);
            utils.dateformatToClientInArray(res, ['firstRegistrationDTM', 'finalModificationDTM']);
            this.objApiAuthMgt = res.data;
            this.isNew = false;
          });
        }
      }
    },
    resetTab() {
      this.objApiAuthMgt.authSystemUid = '';
      this.objApiAuthMgt.authSystemName = '';
      this.objApiAuthMgt.systemIpRestrictionYn = 'N';
      this.objApiAuthMgt.systemIpRestrictionValue = '';
      this.objApiAuthMgt.apiRestrictionYn = 'N';
      this.objApiAuthMgt.apiRestrictionValue = '';
      this.objApiAuthMgt.apiAuthContent = '';
      this.objApiAuthMgt.useYn = 'Y';
      this.objApiAuthMgt.delYn = 'N';

      this.objApiAuthMgt.clientId = '';
      this.objApiAuthMgt.resourceIds = '';
      this.objApiAuthMgt.clientSecret = '';
      this.objApiAuthMgt.scope = 'read';
      this.objApiAuthMgt.authorizedGrantTypes = 'client_credentials';
      this.objApiAuthMgt.webServerRedirectUri = '';
      this.objApiAuthMgt.authorities = '';
      this.objApiAuthMgt.accessTokenValidity = '36000',
      this.objApiAuthMgt.refreshTokenValidity = '2592000',
      this.objApiAuthMgt.additionalInformation = '';
      this.objApiAuthMgt.autoapprove = '';

      this.objApiAuthMgt.firstRegistrationDTM = '';
      this.objApiAuthMgt.firstRegistrationUserId = '';
      this.objApiAuthMgt.firstRegistrationProgramId = '';
      this.objApiAuthMgt.finalModificationDTM = '';
      this.objApiAuthMgt.finalModificationUserId = '';
      this.objApiAuthMgt.finalModificationProgramId = '';
      this.objApiAuthMgt.r_dsplLngId = '';
      this.objApiAuthMgt.r_knoxId = '';
      this.objApiAuthMgt.r_loginId = '';
      this.objApiAuthMgt.r_userName = '';
      this.objApiAuthMgt.r_userGlobalName = '';
      this.objApiAuthMgt.r_departmentName = '';
      this.objApiAuthMgt.r_departmentEnglishName = '';
      this.objApiAuthMgt.m_dsplLngId = '';
      this.objApiAuthMgt.m_knoxId = '';
      this.objApiAuthMgt.m_loginId = '';
      this.objApiAuthMgt.m_userName = '';
      this.objApiAuthMgt.m_userGlobalName = '';
      this.objApiAuthMgt.m_departmentName = '';
      this.objApiAuthMgt.m_departmentEnglishName = '';

      this.isNew = true;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onClickDelete() {
      
      const authSystemUid = this.objApiAuthMgt.authSystemUid;    
      if(!utils.isEmpty(authSystemUid)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMZ_00196', {
            path: {
              'auth-system-uid': authSystemUid,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'));
            this.$emit('onClickSearch');
            this.onClickNew();
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickSave() {
      
      if (utils.isEmpty(this.objApiAuthMgt.authSystemName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ATHN_SYS_NM')), null, () => {
          this.$refs.textFieldAuthSystemName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objApiAuthMgt.accessTokenValidity)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ACS_TOKN_VLD_TM')), null, () => {
          this.$refs.textFieldAcsToknVldTm.setFocus();
        });
        return false;
      }
      if (this.isNew === false && utils.isEmpty(this.objApiAuthMgt.clientSecret)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_USE_IMPSBL'), this.$t('MSG_TXT_ATHN_SYS_KEY')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objApiAuthMgt.systemIpRestrictionYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SYS_IP_RSTR_YN')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objApiAuthMgt.apiRestrictionYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_API_RSTR_YN')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.objApiAuthMgt.useYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USE_YN')), null, () => {
        });
        return false;
      }
      
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMZ_00194' : 'DTS_CMZ_00195';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objApiAuthMgt,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(!this.selectedGridRowData){
              this.$emit('onClickSearch');
              this.onClickNew();
            }else{
              this.$emit('updateApiAuthMgtInfo', this.objApiAuthMgt.authSystemUid);
            }
          });          
        });
      });
    },
    inputValid() {
      let alpharegex = /[^0-9.]/g;
      if (alpharegex.test(this.objApiAuthMgt.accessTokenValidity)) {
          utils.messageBox('warning', this.$t('MSG_ALT_ONLY_NUMBER'), null, () => {
      	  this.objApiAuthMgt.accessTokenValidity = this.objApiAuthMgt.accessTokenValidity.replace(/[^0-9.]/g, '');
    	  this.$refs.textFieldAcsToknVldTm.txtField = this.objApiAuthMgt.accessTokenValidity;
          this.$refs.textFieldAcsToknVldTm.setFocus();
        });
      }
    },
    setUserInfoFormat(data) {
      utils.forEach(data.firstRegistrationUserInfo, (value, key) => {
        utils.set(data, `r_${key}`, value);
      });
      utils.forEach(data.finalModificationUserInfo, (value, key) => {
        utils.set(data, `m_${key}`, value);
      });
      return data;
    },
    onClickCopyToClip(value){
      utils.copyToClipboard(value);
      utils.toast(this.$t('MSG_ALT_COPY_TO_CLIPBOARD'));
    },
  },
};
</script>

<style scoped>
</style>
