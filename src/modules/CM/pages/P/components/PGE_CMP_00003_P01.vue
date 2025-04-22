<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_info_wrap1st">
        <!-- 영문자와 숫자, 특수문자(!@#$%&*^)를 모두 혼용하여 8~12자로 작성해 주세요. -->
        <p>{{$t('MSG_TXT_PW_POLICY')}}</p>
        <!-- 아이디가 포함되지 않도록 합니다. -->
        <p>- {{$t('MSG_TXT_NOT_INCLUDE_ID')}}</p>
        <!-- 개인정보(전화번호 등)를 이용한 비밀번호는 사용할 수 없습니다. 
        <p>- {{$t('MSG_TXT_PERS_INFO_PW_UNABLE')}}</p>-->
        <!-- 같은 문자를 3번 이상 반복할 수 없습니다. -->
        <p>- {{$t('MSG_TXT_CANNOT_PW_SAME_CHAR')}}</p>
        <!-- 연속되는 숫자를 3자리 이상 사용할 수 없습니다. -->
        <p>- {{$t('MSG_TXT_CATNOT_PW_CONTINUOUS_NUM')}}</p>
      </div> 
      <div class="mrB10"/>  
      <div class="comm_view_wrap">

        <div class="row">
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_CURRENT_PW')"
            />
          </div>
          <div class="col-xs-10 ">
            <sui-text-field
              ref="currentPassword"
              v-model="objUserBasic.currentPassword"
              maxlength="30"
              :password="true"
              @keyup="passwordLenghLimit('currentPassword')"
            />
          </div>          
        </div>
        <div class="row">
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_NEW_PW')"
            />
          </div>
          <div class="col-xs-10 ">
            <sui-text-field
              ref="newPassword"
              v-model="objUserBasic.newPassword"
              maxlength="30"
              :password="true"
              @keyup="passwordLenghLimit('newPassword')"
            />
          </div>          
        </div>
        <div class="row">
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_NEW_PW_CHECK')"
            />
          </div>
          <div class="col-xs-10 ">
            <sui-text-field
              ref="newPasswordCheck"
              v-model="objUserBasic.newPasswordCheck"
              maxlength="30"
              :password="true"
              @keyup="passwordLenghLimit('newPasswordCheck')"
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
  name: 'PGE_CMP_00003_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
  },
  data() {
    return {
      queryData: {},
      customOptions: {
      },
      objUserBasic: {
        userId: '',
        currentPassword: '',
        newPassword: '',
        newPasswordCheck: '',
        userPasswordValue: '',
      },
      PasswordCheckFlag: false,
    };
  },
  computed: {
    session() {
      return this.$store.getters.userInfo;
    },
  },
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
    onLoad() {
    },
    async onSaveClick() {
      let isValid = false;

      //서버에서 패쓰워드 확인..
      //isValid = await this.validateSavedData();
      //if (!isValid) return false;

      //서버에서 패쓰워드 확인..
      await this.validateSavedDataServer();
      //저장
      this.objUserBasic.userId = this.session.userId;
      this.objUserBasic.userNewPasswordValue = this.objUserBasic.newPassword;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, 'DTS_CMP_00134', {
          data: this.objUserBasic,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.onCancelClick);
        });
      });
      return true;
    },
    onCancelClick() {
      this.$emit('close');
    },
    async validateSavedDataScript() {
      const pw = this.objUserBasic.newPassword;
      const pwc = this.objUserBasic.newPasswordCheck;
      let isValid = false;
      
      isValid = await this.checkCurrentPassword();
      if (!isValid) return false;

      if (pw != pwc) {
        utils.messageBox('warning', this.$t('MSG_ALT_PW_NOT_MATCH'));
        return false;
      }

      if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%&*^])(?=.*[0-9]).{8,12}$/.test(pw)) {
        utils.messageBox('warning', this.$t('MSG_ALT_PW_POLICY'));
        return false;
      }
      if (this.objUserBasic.newPassword.search(this.session.userId) > -1) {
        utils.messageBox('warning', this.$t('MSG_ALT_PW_CONTAIN_ID'));
        return false;
      }

      // const checkUseUserInfo = false;
      // const cellphone = this.session.cellphone == '' ? null : this.session.cellphone.split('-');
      // const email = this.session.email == '' ? null : this.session.email.split('@');
      // if (cellphone != null) {
      //   for (let cp of cellphone) {
      //     if (i < 1) continue;
      //     else if (this.objUserBasic.newPassword.search(cp) > -1) {
      //       checkUseUserInfo = true;
      //       break;
      //     }
      //   }
      // }
      // if (email != null) {
      //   if (this.objUserBasic.newPassword.search(email[0]) > -1) {
      //     checkUseUserInfo = true;
      //   }
      // }
      // if (checkUseUserInfo) {
      //   utils.messageBox('warning', '개인정보(전화번호 등)를 이용한 비밀번호는 사용할 수 없습니다.');
      // }

      if (/(\w)\1\1/.test(this.objUserBasic.newPassword)) {
        utils.messageBox('warning', this.$t('MSG_ALT_PW_SAME_CHAR'));
        return false;
      }
      if (/(012)|(123)|(234)|(345)|(456)|(567)|(678)|(789)|(890)|(098)|(987)|(876)|(765)|(654)|(543)|(432)|(321)|(210)/.test(this.objUserBasic.newPassword)) {
        utils.messageBox('warning', this.$t('MSG_TXT_CATNOT_PW_CONTINUOUS_NUM'));
        return false;
      }

      return true;
    },
    validateSavedDataServer() {
      return new Promise((resolve, reject) => {
        this.objUserBasic.userId = this.session.userId;
        this.objUserBasic.userPasswordValue = this.objUserBasic.currentPassword;
        this.objUserBasic.userNewPasswordValue = this.objUserBasic.newPassword;
        this.objUserBasic.userNewPasswordCheckValue = this.objUserBasic.newPasswordCheck;
        http.request(this.contextPageId, 'DTS_CMP_00133', {
          data: this.objUserBasic,
        }).then(res => {
          if (res.data === true) {
            resolve(true);
          } else {
            reject();
          }
        }).catch(e => {
          console.log(e);
        });
      });
    },
    checkCurrentPassword() {
      return new Promise(resolve => {
        const dataParams = {
          userPasswordValue: this.objUserBasic.currentPassword,
        };
        http.request(this.contextPageId, 'DTS_CMP_00076', {
          path: {
            'user-id': this.session.userId,
          },
          data: dataParams,
        }).then(res => {
          if (res.data <= 0) {
            utils.messageBox('error', this.$t('MSG_ALT_PW_INCORRECT'));
            resolve(false);
          } else {
            resolve(true);
          }
        });
        // .catch(error => {
        //   console.log(error);
        //   reject(error);
        // });
      });
    },
    passwordLenghLimit(obj) {
      if (this.$refs[obj].value.length > 12) {
        utils.messageBox('error', this.$t('MSG_ALT_PW_LEN_LMIT'));
        this.$refs[obj].setValue('');
      }
    },
  },
};
</script>

<style scoped>
</style>
