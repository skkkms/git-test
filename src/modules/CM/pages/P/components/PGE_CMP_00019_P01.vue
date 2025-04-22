<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <!-- <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_CPNY')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-code-select
              ref="codeSelectCompanyCode"
              v-model="objUserBasic.companyCode"
              codeId="COD_ITGR_CPNY"
              :defaultOption="'select'"
            />
          </div>
          <div
            v-show="modFlag"
            class="col-xs-5"
          >
            {{ objUserBasic.loginId }}
          </div> -->
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_EMAIL')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldEmail"
              v-model="email"
              maxlength="100"
              :readonly="readOnlyEmail"
            />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              :disabled="emailCheckFlag"
              @click="onEmailDuplicateCheckClick"
            />
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldDepartmentName"
              v-model="objUserBasic.departmentName"
              maxlength="400"
              @keyup.enter="onDeptSearchClick"
            />
            <sui-button
              type="button"
              class="comm_btn_InputScr"
              @click="onDeptSearchClick"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_NAME')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldUserName"
              v-model="objUserBasic.userName"
              :trim="true"
              maxlength="100"
              @keyup="onKeyUpInput('LOCAL_NAME')"
            />
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_ENG_NAME')"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldUserGlobalName"
              v-model="objUserBasic.userGlobalName"
              maxlength="100"
              @keyup="onKeyUpInput('GLOBAL_NAME')"
            />
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_LOGIN_ID')"
              :required="true"
            />
          </div>
          <div
            v-show="!modFlag"
            class="col-xs-5 "
          >
            <sui-text-field
              ref="textFieldLoginId"
              v-model="loginId"
              maxlength="100"
            />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              :disabled="loginIdCheckFlag"
              @click="onLoginIdDuplicateCheckClick"
            />
          </div>
          <div
            v-show="modFlag"
            class="col-xs-5"
          >
            {{ objUserBasic.loginId }}
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_EMAIL')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldEmail"
              v-model="email"
              maxlength="100"
            />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              :disabled="emailCheckFlag"
              @click="onEmailDuplicateCheckClick"
            />
          </div>
        </div> -->
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_EPNO')"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldEmployeeIDNumber"
              v-model="objUserBasic.employeeIDNumber"
              maxlength="30"
            />
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_CRLV')"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-code-select
              ref="codeSelectcareerLevelCode"
              v-model="objUserBasic.careerLevelCode"
              codeId="COD_CRLV"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_CP')"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldCellphone"
              v-model="objUserBasic.cellphone"
              maxlength="40"
              @keyup="onKeyUpInput('CELLPHONE')"
            />
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_CPNY_CONTA')"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
              ref="textFieldCompanyContactAddr"
              v-model="objUserBasic.companyContactAddr"
              maxlength="40"
              @keyup="onKeyUpInput('COMPANY_PHONE')"
            />
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          v-if="modFlag"
          type="button"
          class="comm_btn_border"
          @click="onDeleteClick"
        >
          {{ $t("MSG_BTN_DEL") }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00019_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    userId: {
      type: String,
      default: '',
    },
    modFlag: {
      type: Boolean,
      default: true,
    },
    readOnlyEmail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      queryData: {},
      customOptions: {
      },
      objUserBasic: {
        companyCode: 'C60',
        companyEnglishName: '',
        departmentId: '',
        departmentName: '',
        departmentEnglishName: '',
        careerLevelCode: '',
        careerLevelName: '',
        careerLevelEnglishName: '',
        cellphone: '',
        companyContactAddr: '',
        publicIdYn: '',
        userId: '',
        loginId: '',
        epid: '',
        employeeIDNumber: '',
        knoxId: '',
        userName: '',
        userGlobalName: '',
        email: '',
        empInfoFinalChangeDT: '',
        userRealityUseYn: '',
        userTypeCode: '',
        userBelongingTypeCode: '',
        servedStateCode: '',
        displayLangId: '',
      },
      loginId: '',
      email: '',
      originLoginId: '',
      originEmail: '',
      loginIdCheckFlag: true,//false,
      emailCheckFlag: false,
    };
  },
  computed: {},
  watch: {
    loginId(data) {
      if (this.originLoginId !== data) {
        this.loginIdCheckFlag = false;
      }
    },
    email(data) {
      if (this.originEmail !== data) {
        this.emailCheckFlag = false;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.userId)) {
        this.onLoad();
      }
    });
  },

  methods: {
    onKeyUpInput(type) {
      switch (type) {
        case 'LOCAL_NAME':
          this.objUserBasic.userName = utils.replace(this.objUserBasic.userName, /\s+/g, ' ');
          break;
        case 'GLOBAL_NAME':
          this.objUserBasic.userGlobalName = utils.replace(this.objUserBasic.userGlobalName, /\s+/g, ' ');
          break;
        case 'CELLPHONE':
          this.objUserBasic.cellphone = utils.replace(this.objUserBasic.cellphone, /\D+/g, ' ');
          break;
        case 'COMPANY_PHONE':
          this.objUserBasic.companyContactAddr = utils.replace(this.objUserBasic.companyContactAddr, /\D+/g, ' ');
          break;
        default:
          break;
      }
    },
    onLoad() {
      http.request(this.contextPageId, 'DTS_CMP_00072', {
        path: {
          'user-id': this.userId,
        },
      }).then(res => {
        this.objUserBasic = utils.clone(res.data);
        this.loginId = this.objUserBasic.loginId;
        this.email = this.objUserBasic.email;
        this.originLoginId = this.loginId;
        this.originEmail = this.email;
        this.loginIdCheckFlag = true;
        this.emailCheckFlag = true;
      }).catch(error => {
        console.log(error);
      });
    },
    onSaveClick() {
      if (!this.validateSavedData()) {
        return false;
      }
      const dataServiceId = utils.isEmpty(this.userId) ? 'DTS_CMP_00069' : 'DTS_CMP_00070';
      this.objUserBasic.empInfoFinalChangeDT = utils.now('YYYYMMDD');
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, dataServiceId, {
          data: this.objUserBasic,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
        });
      });
      return true;
    },
    research() {
      this.$emit('research');
    },
    onCancelClick() {
      this.$emit('close');
    },
    onDeleteClick() {
      utils.messageBox('confirm', this.$t('MSG_ALT_DEL'), null, () => {
        http.request(this.contextPageId, 'DTS_CMP_00097', {
          path: {
            'user-id': this.userId,
          },
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_DELETED'), null, this.research);
        });
      });
    },
    onDeptSearchClick() {
      const iptDeptName = this.objUserBasic.departmentName;
      utils.openLayerPopup('PGE_CMY_00004', this.onDeptPopupCallback, {
        pageInitialData: { iptDeptName },
        size: 'lg',
      });
    },
    onDeptPopupCallback(data) {
      if (data) {
        this.objUserBasic.departmentName = data.value;
        this.objUserBasic.departmentEnglishName = data.enValue;
        this.objUserBasic.departmentId = data.id;
      }
    },
    onLoginIdDuplicateCheckClick() {
      if (utils.isEmpty(utils.trim(this.loginId))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOGIN_ID')));
        return false;
      }
      this.objUserBasic.loginId = this.loginId;
      http.request(this.contextPageId, 'DTS_CMP_00073', {
        query: {
          loginId: this.objUserBasic.loginId,
        },
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox('error', this.$t('MSG_ALT_DUPLICATE_EXISTS'));
          this.loginIdCheckFlag = false;
        } else {
          utils.messageBox('success', utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_LOGIN_ID')));
          this.loginIdCheckFlag = true;
        }
      }).catch(error => {
        console.log(error);
      });
      return true;
    },
    onEmailDuplicateCheckClick() {
      if (utils.isEmpty(utils.trim(this.email))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EMAIL')));
        return false;
      }
      if (!this.validateEmail(this.email)) {
        utils.messageBox('warning', this.$t('MSG_ALT_EMAIL'));
        // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOGIN_ID')));
        return false;
      }
      this.objUserBasic.email = this.email;
      http.request(this.contextPageId, 'DTS_CMP_00073', {
        query: {
          loginId: this.objUserBasic.email,
        },
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox('error', this.$t('MSG_ALT_DUPLICATE_EXISTS'));
          this.emailCheckFlag = false;
        } else {
          utils.messageBox('success', utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_EMAIL')));
          this.emailCheckFlag = true;
        }
      }).catch(error => {
        console.log(error);
      });
      return true;
    },
    validateSavedData() {
      // if (utils.isEmpty(utils.trim(this.objUserBasic.companyCode))) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CPNY')));
      //   return false;
      // }
      if (utils.isEmpty(this.email)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EMAIL')), null, () => {
          this.$refs.textFieldEmail.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(utils.trim(this.objUserBasic.departmentId))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEPT')));
        return false;
      }
      if (utils.isEmpty(this.objUserBasic.userName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_NAME')), null, () => {
          this.$refs.textFieldUserName.setFocus();
        });
        return false;
      }
      // if (utils.isEmpty(this.loginId)) {
      //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOGIN_ID')), null, () => {
      //     this.$refs.textFieldLoginId.setFocus();
      //   });
      //   return false;
      // }
      if (!this.loginIdCheckFlag || !this.emailCheckFlag) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DUP'), null, () => {
        });
        return false;
      }
      return true;
    },
    validateEmail(email) {
      const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
</style>
