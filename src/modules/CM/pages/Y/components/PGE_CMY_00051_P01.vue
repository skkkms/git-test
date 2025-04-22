<template>
  <div>
    <div class="comm_popup_wrap_medium">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT_ID')"
              required
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              ref="msgDeptId"
              v-model="frame0.departmentId"
              :readonly="false"
              maxlength="15"
              @keyup.enter="onClickDupCheck"
              @input="onKeyUpInput"
            />
            <div class="comp_spacing" />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              :disabled="departmentIdCheckFlag"
              @click="onClickDupCheck"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT_NM')"
              required
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="frame0.departmentName"
              maxlength="100"
              :trim="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT_EN_NM')"
              required
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="frame0.departmentEnglishName"
              maxlength="100"
              :trim="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_USE_YN')"
            />
          </div>
          <div class="col-xs-10">
            <sui-radio
              v-model="frame0.infoUseYn"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="frame0.infoUseYn"
              value="N"
            >
              No
            </sui-radio>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_ARRAY_ORDER')"
              required
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="frame0.departmentOrder"
              :disabled="false"
              :readonly="false"
              maxlength="4"
              mask="number"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_HOTD_USR_ID')"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="frame0.headOfDepartmentUserId"
              maxlength="20"
              :trim="true"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClose"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        v-permission:create="'PGE_CMY_00051'"
        type="button"
        class="comm_btn_solid"
        @click="onSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMY_00051_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMY_00051',
    },
    companyCode: {
      type: String,
      default: null,
    },
    departmentId: {
      type: String,
      default: null,
    },
    departmentLevel: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      frame0: {
        departmentId: '',
        departmentName: '',
        departmentEnglishName: '',
        upCompanyCode: '',
        upDepartmentId: '',
        departmentLevel: '',
        departmentOrder: '',
        headOfDepartmentUserId: '',
        infoUseYn: 'Y',
      },
      departmentIdCheckFlag: false,
      alertFlag: true, // messagebox 연속 두번 뜨는 것 방지 flag
      orgDeptId:'',
    };
  },

  watch: {
    'frame0.departmentId'() {
      this.departmentIdCheckFlag = false;
    },
  },

  mounted() {
    this.frame0.upCompanyCode = this.companyCode;
    this.frame0.upDepartmentId = this.departmentId;
    this.frame0.departmentLevel = this.departmentLevel ? Number(this.departmentLevel) + 1 : 1;
  },

  methods: {
    onClickDupCheck() {
      if (utils.isEmpty(utils.trim(this.frame0.departmentId))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DEPT_ID')));
        return;
      }
      this.orgDeptId = this.frame0.departmentId;

      const queryParams = {
        departmentId: this.frame0.departmentId,
      };
      http.request(this.pageId, 'DTS_CMY_00092', {
        query: queryParams,
      }).then(res => {
        if (!res.data) {
          utils.messageBox('information', this.$t('MSG_ALT_USABLE_DEPT_ID'), null, () => {
            this.departmentIdCheckFlag = true;
          });
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_DUPLICATE_DEPT_ID'), null, () => {
            this.frame0.departmentId = '';
            this.$refs.msgDeptId.setFocus();
            this.departmentIdCheckFlag = false;
          });
        }
      }).catch(() => {
        utils.messageBox('warning', this.$t('MSG_ALT_ERR_CONTACT_ADMIN'));
      });
    },
    onClose() {
      this.$emit('close');
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue);
    },
    onSave() {
      const dataParams = {
        departmentId: this.frame0.departmentId.replace(/\s/gi, ''),
        departmentName: this.frame0.departmentName,
        departmentEnglishName: this.frame0.departmentEnglishName,
        upCompanyCode: this.frame0.upCompanyCode,
        upDepartmentId: this.frame0.upDepartmentId,
        departmentLevel: utils.toCharNum(this.frame0.departmentLevel),
        departmentOrder: this.frame0.departmentOrder,
        headOfDepartmentUserId: this.frame0.headOfDepartmentUserId,
        infoUseYn: this.frame0.infoUseYn,
      };

      if (utils.isEmpty(utils.trim(dataParams.departmentId)) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_DEPT_ID')), null);
        return;
      }

      if (utils.isEmpty(utils.trim(dataParams.departmentName)) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_DEPT_NM')), null);
        return;
      }

      if (utils.isEmpty(utils.trim(dataParams.departmentEnglishName)) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_DEPT_EN_NM')), null);
        return;
      }

      if (utils.isEmpty(utils.trim(dataParams.infoUseYn)) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN')), null);
        return;
      }

      if (utils.isEmpty(dataParams.departmentOrder) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_ARRAY_ORDER')), null);
        return;
      }

      if (this.departmentIdCheckFlag) {
        http.request(this.pageId, 'DTS_CMY_00095', {
          query: dataParams,
        }).then(res => {
          if (!res.data) {
            utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
              this.deptSave(dataParams);
            });
          } else {
            utils.messageBox('confirm', this.$t('MSG_ALT_DUP_NM_ITEM_SAVE'), null, () => {
            // utils.messageBox('confirm', '중복된 부서명이 있습니다. 저장하시겠습니까?', null, () => {
              this.deptSave(dataParams);
            });
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_DPCT_CHK'));
      }
      /*
      if (this.departmentIdCheckFlag) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          http.request(this.pageId, 'DTS_CMY_00093', {
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
            this.$emit('close', dataParams.departmentId);
          }).catch(error => {
            console.log(error);
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_DPCT_CHK'));
      }
      */
    },
    deptSave(dataParams) {
      if (this.departmentIdCheckFlag) {
        http.request(this.pageId, 'DTS_CMY_00093', {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
          this.$emit('close', dataParams.departmentId);
        }).catch(error => {
          console.log(error);
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_DPCT_CHK'));
      }
    },
    onKeyUpInput(inputValue) {
      if (this.orgDeptId !== this.frame0.departmentId) {
        this.departmentIdCheckFlag = false;
      }
      if (utils.isEngNum(inputValue) || utils.isEmpty(inputValue)) {
        if (this.$refs.msgDeptId) {
          this.$refs.msgDeptId.originValue = inputValue;
        }
      } else if (this.alertFlag) {
        this.alertFlag = false;
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true;
          if (this.$refs.msgDeptId) {
            this.frame0.departmentId = this.$refs.msgDeptId.originValue;
            this.$refs.msgDeptId.setFocus();
          }
        });
      }      
    },    
  },
};
</script>
<style scoped>
</style>
