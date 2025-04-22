/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-destructuring */
<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_PORTL_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-input-label
            v-if="!isNew"
            ref="labelPortalId"
            :class="!isNew ? 'comm_label' : 'comm_label_1'"
            :label="objPortal.portalId"
            :vertical="false"
          />
          <sui-text-field
            v-if="isNew"
            ref="textFieldPortalId"
            v-model="objPortal.portalId"
            maxlength="100"
            pattern="[A-Z0-9]"
            @keyup="inputValid"
            @blur="inputValid"
          />
          <div class="comp_spacing" />
          <sui-button
            v-if="isNew"
            type="button"
            class="comm_btn_duplicate"
            @click="onClickDuplicationCheck"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_PORTL_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldPortalName"
            v-model="objPortal.portalName"
            maxlength="100"
            :trim="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objPortal.useYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objPortal.useYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <div
          v-if="deviceApplyYn"
          class="col-xs-1 "
        >
          <sui-input-label
            :label="$t('MSG_TXT_DVC_TYPE')"
          />
        </div>
        <div
          v-if="deviceApplyYn"
          class="col-xs-5 "
        >
          <sui-device-checkbox
            ref="deviceCheck"
            :value="objPortal.deviceTypeValue"
          />
        </div>
        <div
          v-if="!deviceApplyYn"
          class="col-xs-1 nodata"
        />
        <div
          v-if="!deviceApplyYn"
          class="col-xs-5 nodata"
        />
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_PORTL_CNTN')"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-text-field
            ref="textFieldPortalContent"
            v-model="objPortal.portalContent"
            maxlength="1000"
            :trim="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_BLCK')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objPortal.blockYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objPortal.blockYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_BLCK_DTM')"
          />
        </div>
        <div class="col-xs-5 ">
          <ur-date-time-range-picker
            ref="DatePickerBlockStart"
            v-model="dateValue"
            init="today"
            one-input-mode
            :disabled="this.objPortal.blockYn==='N'"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_BLCK_TTL')"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-text-field
            ref="textFieldBlockTitle"
            v-model="objPortal.blockTitle"
            maxlength="100"
            :trim="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_BLCK_CNTN')"
          />
        </div>
        <div class="col-xs-11 ">
          <textarea
            ref="textFieldBlockContent"
            v-model="objPortal.blockContent"
            style="width:100%"
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
            v-if="!isNew"
            :pageId="this.contextPageId"
            :displayType="'1'"
            :displayLanguageId="objPortal.firstRegistrationDisplayLanguageId"
            :userId="objPortal.firstRegistrationUserId"
            :loginId="objPortal.firstRegistrationLoginId"
            :knoxId="objPortal.firstRegistrationKnoxId"
            :userName="objPortal.firstRegistrationUserName"
            :userGlobalName="objPortal.firstRegistrationUserGlobalName"
            :departmentName="objPortal.firstRegistrationDepartmentName"
            :departmentEnglishName="objPortal.firstRegistrationDepartmentEnglishName"
            :type="'link'"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div
            v-if="!isNew"
            class="comm_label"
          >
            {{ objPortal.firstRegistrationDTM | dateFormat }}
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
            v-if="!isNew"
            :pageId="this.contextPageId"
            :displayType="'1'"
            :displayLanguageId="objPortal.finalModificationDisplayLanguageId"
            :userId="objPortal.finalModificationUserId"
            :loginId="objPortal.finalModificationLoginId"
            :knoxId="objPortal.finalModificationKnoxId"
            :userName="objPortal.finalModificationUserName"
            :userGlobalName="objPortal.finalModificationUserGlobalName"
            :departmentName="objPortal.finalModificationDepartmentName"
            :departmentEnglishName="objPortal.finalModificationDepartmentEnglishName"
            :type="'link'"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div
            v-if="!isNew"
            class="comm_label"
          >
            {{ objPortal.finalModificationDTM | dateFormat }}
          </div>
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:create="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onRestoreClick"
      >
        {{ $t('MSG_BTN_RESTORE') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-show="!isDeleted"
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        v-show="isDeleted"
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickDiscard"
      >
        {{ $t("MSG_BTN_DSCD") }}
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
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_CMP_00025_T01',
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  }, // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    selectedGridRowData: {
      type: Object,
      required: false,
    },
    deviceApplyYn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isNew: true,
      isDeleted: false,
      isIdDuplicationCheck: false,
      cachePortalId: '',
      selectedCodeValue: {
        COD_DVC_TYPE: {
          key: '',
          label: '',
        },
      },
      blockStartDate: utils.now('YYYY-MM-DD'),
      blockStartTime: { HH: '12', mm: '00' },
      blockFinishDate: utils.now('YYYY-MM-DD'),
      blockFinishTime: { HH: '12', mm: '00' },
      startTimevalue: '',
      finishTimevalue: '',
      objPortal: {
        tenantId: this.$store.getters.userInfo.tenantId,
        portalId: '',
        portalName: '',
        portalContent: '',
        deviceTypeValue: 0,
        useYn: 'Y',
        blockYn: 'N',
        blockStartDTM: '',
        blockFinishDTM: '',
        blockTitle: '',
        blockContent: '',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        firstRegistrationLoginId: '',
        firstRegistrationKnoxId: '',
        firstRegistrationUserName: '',
        firstRegistrationUserGlobalName: '',
        firstRegistrationDepartmentName: '',
        firstRegistrationDepartmentEnglishName: '',
        firstRegistrationDisplayLanguageId: '',
        finalModificationLoginId: '',
        finalModificationKnoxId: '',
        finalModificationUserName: '',
        finalModificationUserGlobalName: '',
        finalModificationDepartmentName: '',
        finalModificationDepartmentEnglishName: '',
        finalModificationDisplayLanguageId: '',
      },
      // eslint-disable-next-line max-len
      disabledDatePicker: `${moment().add(10, 'year').format('YYYY-12-31')}~${moment().add(0, 'year').format('YYYY-MM-DD')}`,
      dateValue: ['', ''],
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadPortal();
      } else {
        this.resetTab();
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },
  mounted() {
  },

  methods: {
    loadPortal() {
      // eslint-disable-next-line keyword-spacing
      if(this.selectedGridRowData) {
        // eslint-disable-next-line prefer-destructuring
        const portalId = this.selectedGridRowData.portalId;
        // eslint-disable-next-line prefer-destructuring
        const tenantId = this.selectedGridRowData.tenantId;
        const dataParams = {
          // eslint-disable-next-line object-shorthand
          tenantId: tenantId,
        };
        if (!utils.isEmpty(portalId)) {
          http.request(this.contextPageId, 'DTS_CMP_00103', {
            path: {
              'portal-id': portalId,
            },
            query: dataParams,
          }).then(res => {
            this.objPortal = res.data;

            if (this.objPortal.blockStartDTM) {
              const sBlockStartDate = this.objPortal.blockStartDTM.substr(0, 8);
              this.blockStartDate = utils.dateformatToClient(sBlockStartDate);

              const sBlockStartTime = this.objPortal.blockStartDTM.substr(8, 8);
              this.blockStartTime = { HH: sBlockStartTime.substr(0, 2), mm: sBlockStartTime.substr(2, 2) };
            } else {
              this.blockStartDate = utils.now('YYYY-MM-DD');
              this.blockStartTime = { HH: '12', mm: '00' };
            }
            if (this.objPortal.blockFinishDTM) {
              const sBlockFinishDate = this.objPortal.blockFinishDTM.substr(0, 8);
              this.blockFinishDate = utils.dateformatToClient(sBlockFinishDate);

              const sBlockFinishTime = this.objPortal.blockFinishDTM.substr(8, 8);
              this.blockFinishTime = { HH: sBlockFinishTime.substr(0, 2), mm: sBlockFinishTime.substr(2, 2) };
            } else {
              this.blockFinishDate = utils.now('YYYY-MM-DD');


              this.blockFinishTime = { HH: '12', mm: '00' };
            }

            this.isNew = false;
            this.isDeleted = this.objPortal.deleteYn === 'Y';
            this.isIdDuplicationCheck = true;
            if (this.deviceApplyYn) {
              this.$refs.deviceCheck.setValue(this.objPortal.deviceTypeValue);
            }
            this.dateValue = [`${`${this.blockStartDate} ${`${this.blockStartTime.HH}:${this.blockStartTime.mm}`}`}`,
              `${`${this.blockFinishDate} ${`${this.blockFinishTime.HH}:${this.blockFinishTime.mm}`}`}`];
          });
        }
      }
    },
    onRestoreClick() {
      if (!this.objPortal.portalId) {
        // utils.messageBox('information', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else if (this.objPortal.deleteYn === 'N') {
        utils.messageBox('information', this.$t('MSG_ALT_IMPOSSIBLE_RESTORE')); // 삭제하지 않는 데이터는 복원할 수 없습니다.
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_RESTORE_DATA'), null,
          (/* ok */) => {
            // eslint-disable-next-line prefer-destructuring
            const tenantId = this.selectedGridRowData.tenantId;
            const dataParams = {
              // eslint-disable-next-line object-shorthand
              tenantId: tenantId,
            };
            http.request(this.contextPageId, 'DTS_CMP_00132', {
              path: {
                'portal-id': this.objPortal.portalId,
              },
              query: dataParams,
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_RESTORE_DATA'), null, () => {
                this.onClickNew();
                this.$emit('onClickSearch');
              });
            }).catch(error => {
              console.log(error);
            });
          },
          (/* cancel */) => {});
      }
    },
    resetTab() {
      this.objPortal.tenantId = this.objPortal.tenantId;
      this.objPortal.portalId = '';
      this.objPortal.portalName = '';
      this.objPortal.portalContent = '';
      this.objPortal.useYn = 'Y';
      this.objPortal.deviceTypeValue = 0;
      this.objPortal.blockYn = 'N';
      this.objPortal.blockTitle = '';
      this.objPortal.blockContent = '';
      this.blockStartDate = utils.now('YYYY-MM-DD');
      this.blockStartTime = {HH: '12',mm: '00',};   
      this.blockFinishDate = utils.now('YYYY-MM-DD');
      this.blockFinishTime = {HH: '12',mm: '00',};       

      if (this.deviceApplyYn) {
        this.$refs.deviceCheck.setValue(0);
      }

      this.isNew = true;
      this.isDeleted = false;
      this.isIdDuplicationCheck = false;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onGridClear');
    },
    onClickDelete() {
      // eslint-disable-next-line prefer-destructuring
      const portalId = this.objPortal.portalId;
      const dataParams = {
        tenantId: this.objPortal.tenantId,
      };
      if (!utils.isEmpty(portalId) && this.objPortal.deleteYn === 'N') {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMP_00106', {
            path: {
              'portal-id': portalId,
            },
            query: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'));
            this.$emit('onClickSearch');
            this.onClickNew();
          });
        });
      } else if (!utils.isEmpty(portalId) && this.objPortal.deleteYn === 'Y') {
        utils.messageBox('warning', this.$t('MSG_ALT_ALREADY_DELETE')); // 이미 삭제된 데이터입니다.
      } else {
        // utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickDiscard() {
      // eslint-disable-next-line prefer-destructuring
      const portalId = this.objPortal.portalId;
      const dataParams = {
        tenantId: this.objPortal.tenantId,
      };
      if (!utils.isEmpty(portalId) && this.objPortal.deleteYn === 'Y') {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DSCD_DATA'), null, () => {
          http.request(this.contextPageId, 'DTS_CMP_00138', {
            path: {
              'portal-id': portalId,
            },
            query: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DSCD_DATA'));
            this.$emit('onClickSearch');
            this.onClickNew();
          });
        });
      } else {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    // eslint-disable-next-line consistent-return
    onClickSave() {
      const [startValue, finishValue] = this.dateValue;
      let [tempDate, tempTime] = startValue.split(' ');
      this.blockStartDate = tempDate;
      [this.blockStartTime.HH, this.blockStartTime.mm] = tempTime.split(':');
      [tempDate, tempTime] = finishValue.split(' ');
      this.blockFinishDate = tempDate;
      [this.blockFinishTime.HH, this.blockFinishTime.mm] = tempTime.split(':');
      if (utils.isEmpty(this.objPortal.portalId)) {
        // eslint-disable-next-line max-len
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_ID')), null, () => {
          this.$refs.textFieldPortalId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objPortal.portalName)) {
        // eslint-disable-next-line max-len
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_NM')), null, () => {
          this.$refs.textFieldPortalName.setFocus();
        });
        return false;
      }

      if (!this.isIdDuplicationCheck || (this.isNew && this.objPortal.portalId !== this.cachePortalId)) { // 중복 체크
        this.isIdDuplicationCheck = false;
        const msg = this.$t('MSG_ALT_SELT_DPCT_CHK');
        utils.messageBox('warning', msg);
        return false;
      }

      if (this.deviceApplyYn) {
        this.objPortal.deviceTypeValue = this.$refs.deviceCheck.getValue();
      }

      // this.blockDateValid();

      if (this.blockStartDate !== null && this.blockStartTime !== '') {
        const paramBlockStartDate = utils.dateformatToServer(this.blockStartDate).substr(0, 8);
        const paramBlockStartTime = `${this.blockStartTime.HH}${this.blockStartTime.mm}00`;
        this.objPortal.blockStartDTM = `${paramBlockStartDate}${paramBlockStartTime}`;
      }

      if (this.blockFinishDate !== null && this.blockFinishTime !== '') {
        const paramBlockFinishDate = utils.dateformatToServer(this.blockFinishDate).substr(0, 8);
        const paramBlockFinishTime = `${this.blockFinishTime.HH}${this.blockFinishTime.mm}00`;
        this.objPortal.blockFinishDTM = `${paramBlockFinishDate}${paramBlockFinishTime}`;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMP_00104' : 'DTS_CMP_00105';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objPortal,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.onClickNew();
          this.$emit('onClickSearch');
        });
      });
    },

    onClickDuplicationCheck() {
      const portalNewId = this.objPortal.portalId;// "MSG_"+this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key;
      const dataParams = {
        // eslint-disable-next-line object-shorthand
        portalNewId: portalNewId,
      };

      if (utils.isEmpty(this.objPortal.portalId)) {
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_ID')),
          null,
          () => {
            this.$refs.textFieldPortalId.setFocus();
          });
        return false;
      }
      http.request(this.contextPageId, 'DTS_CMP_00107', {
        query: dataParams,
      }).then(res => {
        if (res.data > 0) {
          this.isIdDuplicationCheck = false;
          utils.messageBox('error', this.$t('MSG_ALT_IMG_RGST_ID'), null, () => { // 이미 등록된 ID입니다.
            this.$refs.textFieldPortalId.setFocus();
          });
        } else {
          this.isIdDuplicationCheck = true;
          this.cachePortalId = utils.clone(this.objPortal.portalId);
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
        }
      });

      return null;
    },
    inputValid() {
      if (this.objPortal.portalId) {
        this.objPortal.portalId = utils.toUpper(this.objPortal.portalId.replace(/[^a-z0-9_]/gi, ''));
      }
    },
    blockDateValid() {
      // date picker validation
      if (!this.$refs.DatePickerBlockFinish.isValid()
        || !this.$refs.DatePickerBlockStart.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
</style>
