<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_TENANT_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <div class="comm_label">
            TNT_
          </div>
          <div class="comp_spacing" />
          <sui-text-field
            ref="textFieldTenantId"
            v-model="tenantIdPostfix"
            maxlength="6"
            :disabled="!isNew"
            @keyup="onKeyUpInput(tenantIdPostfix)"
            @blur="onKeyUpInput(tenantIdPostfix)"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="!isNew"
            @click="onClickCheckDuplication"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_TENANT_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldTenantName"
            v-model="objTenant.tenantName"
            maxlength="400"
            :trim="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_ADMIN_LOGIN_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            v-if="isNew"
            ref="textFieldTenantAdminLoginId"
            v-model="objTenant.tenantAdminLoginId"
            maxlength="100"
            :trim="true"
          />
          <sui-label
            v-else
            :label="objTenant.tenantAdminLoginId"
            class="comm_label"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_ADMIN_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            v-if="isNew"
            ref="textFieldTenantAdminName"
            v-model="objTenant.tenantAdminName"
            maxlength="100"
            :trim="true"
          />
          <sui-label
            v-else
            :label="objTenant.tenantAdminName"
            class="comm_label"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_USE_SEL')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objTenant.useYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objTenant.useYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_APPLY_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ objTenant.applyDTM }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_EXPL')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-11">
          <sui-text-field
            v-model="objTenant.tenantContent"
            maxlength="1000"
            :trim="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objTenant.firstRegistrationDisplayLangId"
            :userId="objTenant.firstRegistrationUserId"
            :loginId="objTenant.firstRegistrationLoginId"
            :knoxId="objTenant.firstRegistrationKnoxId"
            :userName="objTenant.firstRegistrationUserName"
            :userGlobalName="objTenant.firstRegistrationUserGlobalName"
            :departmentName="objTenant.firstRegistrationDepartmentName"
            :departmentEnglishName="objTenant.firstRegistrationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ objTenant.firstRegistrationDTM }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="objTenant.finalModificationDisplayLangId"
            :userId="objTenant.finalModificationUserId"
            :loginId="objTenant.finalModificationLoginId"
            :knoxId="objTenant.finalModificationKnoxId"
            :userName="objTenant.finalModificationUserName"
            :userGlobalName="objTenant.finalModificationUserGlobalName"
            :departmentName="objTenant.finalModificationDepartmentName"
            :departmentEnglishName="objTenant.finalModificationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ objTenant.finalModificationDTM }}
          </div>
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickTenantCreate"
      >
        {{ $t("MSG_BTN_TENANT_APPLY") }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <!-- 운영에서 '삭제' 버튼 권한 부여 예정 -->
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
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00084_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isNew: true,
      isCheckDuplication: false,
      tenantIdPostfix: '',
      objTenant: {
        tenantId: '',
        tenantName: '',
        tenantContent: '',
        useYn: 'Y',
        moduleList: [],
        applyDTM: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        // 등록자 정보
        firstRegistrationLoginId: '',
        firstRegistrationKnoxId: '',
        firstRegistrationUserName: '',
        firstRegistrationUserGlobalName: '',
        firstRegistrationDepartmentName: '',
        firstRegistrationDepartmentEnglishName: '',
        firstRegistrationDisplayLangId: '',
        // 수정자 정보
        finalModificationLoginId: '',
        finalModificationKnoxId: '',
        finalModificationUserName: '',
        finalModificationUserGlobalName: '',
        finalModificationDepartmentName: '',
        finalModificationDepartmentEnglishName: '',
        finalModificationDisplayLangId: '',
      },
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadTenant();
        this.isNew = false;
      } else {
        this.resetTab();
        // this.onClickNew();
        this.isNew = true;
      }
    },
    tenantIdPostfix(data) {
      if (this.objTenant.tenantIdPostfix !== data) {
        this.isCheckDuplication = false;
      }
    },
  },
  created() {},
  mounted() {},

  methods: {
    loadTenant() {
      if (this.selectedGridRowData) {
        const loadTenantId = this.selectedGridRowData.tenantId;
        http.request(this.contextPageId, 'DTS_CMZ_00164', {
          path: {
            'tenant-id': loadTenantId,
          },
        }).then(res => {
          this.objTenant = res.data;
          this.objTenant.firstRegistrationDTM = utils.dateformatToClient(this.objTenant.firstRegistrationDTM);
          this.objTenant.finalModificationDTM = utils.dateformatToClient(this.objTenant.finalModificationDTM);
          this.objTenant.applyDTM = utils.dateformatToClient(this.objTenant.applyDTM);

          this.isNew = false;
          this.tenantIdPostfix = this.objTenant.tenantId.substring(4);
        });
      }
    },
    resetTab() {
      utils.forEach(this.objTenant, (value, key) => {
        this.objTenant[key] = '';
      });
      this.isNew = true;
      this.objTenant.useYn = 'Y';
      this.isCheckDuplication = false;
      this.tenantIdPostfix = '';
    },
    onClickNew() {
      this.resetTab();
      this.$emit('clearGridSelection');
    },
    onClickDelete() {
      const strTenantId = this.objTenant.tenantId;
      if (!utils.isEmpty(strTenantId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_DEL_ALL_TNT_DATA_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMZ_00165', {
            path: {
              'tenant-id': strTenantId,
            },
          }).then(() => {
            // this.selectedGridRowData = {};
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'), null, this.research);
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickSave() {
      if (!this.validateData()) {
        return;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        this.objTenant.tenantId = this.isNew ? `TNT_${this.tenantIdPostfix}` : this.objTenant.tenantId;
        this.objTenant.moduleList = [];
        const dataServiceId = this.isNew ? 'DTS_CMZ_00166' : 'DTS_CMZ_00167';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objTenant,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(this.isNew){
              this.research();
            }else{
              this.$emit('updateInfo', this.objTenant.tenantId);
            }
          });           
        });
      });
    },
    validateData() {
      if (this.isNew && utils.isEmpty(this.tenantIdPostfix)) {
        // eslint-disable-next-line max-len
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TENANT_ID')), null, () => {
          this.$refs.textFieldTenantId.setFocus();
        });
        return false;
      }
      if (this.isNew && !this.isCheckDuplication) {
        utils.messageBox('error', this.$t('MSG_ALT_CHK_DUP'), null);
        return false;
      }
      if (utils.isEmpty(this.objTenant.tenantName)) {
        // eslint-disable-next-line max-len
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TENANT_NM')), null, () => {
          this.$refs.textFieldTenantName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objTenant.tenantAdminLoginId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('관리자ID')), null, () => {
          this.$refs.textFieldTenantAdminLoginId.setFocus();
        });
        return false;
      }
      const regexpEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (!regexpEmail.test(this.objTenant.tenantAdminLoginId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_EMAIL'), null, () => {
          this.$refs.textFieldTenantAdminLoginId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objTenant.tenantAdminName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('관리자명')), null, () => {
          this.$refs.textFieldTenantAdminName.setFocus();
        });
        return false;
      }

      return true;
    },
    onClickCheckDuplication() {
      if (utils.isEmpty(this.tenantIdPostfix)) {
        // eslint-disable-next-line max-len
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TENANT_ID')), null, () => {
          this.$refs.textFieldTenantId.setFocus();
        });
        return false;
      }
      const bannedList = utils.getConfigurationValue('YML_TENANT_ID_BANNED_LIST').split(',');
      const isBanned = _.some(bannedList, el => el === `TNT_${utils.toUpper(this.tenantIdPostfix)}`);
      if (isBanned) {
        // eslint-disable-next-line max-len
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_USE_IMPSBL'), this.$t('MSG_TXT_TENANT_ID')), null, () => {
          this.$refs.textFieldTenantId.setFocus();
        });
        return false;
      }
      http.request(this.contextPageId, 'DTS_CMZ_00168', {
        query: {
          'tenant-id': `TNT_${this.tenantIdPostfix}`,
        },
      }).then(res => {
        if (res.data.resultCode === '0') {
          utils.messageBox('error', utils.strFormat(this.$t('MSG_ALT_DUPLICATE_EXISTS')));
        } else {
          utils.messageBox('success', utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_TENANT_ID')));
          this.isCheckDuplication = true;
        }
      });
      return true;
    },
    research() {
      this.onClickNew();
      this.$emit('research');
    },
    onKeyUpInput(value) {
      if (value) {
        this.tenantIdPostfix = utils.toUpper(this.tenantIdPostfix.replace(/[^a-z0-9_]/gi, ''));
      }
    },
    onClickTenantCreate() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      this.$emit('openModulePopup', this.selectedGridRowData);
      return true;
    },
  },
};
</script>

<style scoped>
</style>
