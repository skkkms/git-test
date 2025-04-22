<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
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
            @keyup="inputValid"
            @blur="inputValid"
            pattern="[A-Z0-9]"
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
            :required="true"
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
            :label="$t('MSG_TXT_PORTL_BASE_URL')"
            :required="true"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-text-field
            ref="textFieldPortalBaseUrl"
            v-model="objPortal.portalBaseUrl"
            maxlength="1000"
            :trim="true"
          />
        </div>
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
          <!-- <sui-date-picker
            ref="DatePickerBlockStart"
            v-model="blockStartDate"
            :disabled="this.objPortal.blockYn==='N'"
          />
          <div class="comp_spacing" />          
          <sui-time-picker
            ref="TimePickerBlockStart"
            v-model="blockStartTime"
            format="HH:mm"
            :disabled="this.objPortal.blockYn==='N'"
          />
          <div class="comp_spacing" />
          ~
          <div class="comp_spacing" />
          <sui-date-picker
            ref="DatePickerBlockFinish"
            v-model="blockFinishDate"
            :disabled="this.objPortal.blockYn==='N'"
          />
          <div class="comp_spacing" />
          <sui-time-picker
            ref="TimePickerBlockFinish"
            v-model="blockFinishTime"
            format="HH:mm"
            :disabled="this.objPortal.blockYn==='N'"
          />           -->
          <ur-date-time-range-picker
            ref="DatePickerBlockPeriod"
            v-model="dateValue"
            init="today"
            one-input-mode
            :inputType=this.userDateFormat
            :modelType=this.userDateFormat            
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
    </div>
      <div class="mrB30" />
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
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
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00010_P02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    deviceApplyYn: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },  
  data() {
    return {
      isNew: true,
      isIdDuplicationCheck: false,
      cachePortalId: '',
      selectedCodeValue: {
        COD_DVC_TYPE: {
          key: '',
          label: '',
        },
      },      
      blockStartDate: utils.now('YYYY-MM-DD'),
      blockStartTime: {HH: '12',mm: '00',},      
      blockFinishDate: utils.now('YYYY-MM-DD'),
      blockFinishTime: {HH: '12',mm: '00',},
      objPortal: {
        tenantId: this.$store.getters.userInfo.tenantId,
        portalId: '',
        portalName: '',
        portalBaseUrl: window.location.origin,
        portalContent: '',
        deviceTypeValue: 1,
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
      dateValue:['',''],
      userDateFormat: this.$store.getters.userInfo.dateFormat+" HH:mm",
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.resetTab();
    });
  },

  methods: {
    onClickSave() {
      if (utils.isEmpty(this.objPortal.portalId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_ID')), null, () => {
          this.$refs.textFieldPortalId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objPortal.portalName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_NM')), null, () => {
          this.$refs.textFieldPortalName.setFocus();
        });
        return false;
      }

      if (!this.isIdDuplicationCheck || (this.isNew&&this.objPortal.portalId !== this.cachePortalId)) { // 중복 체크
        this.isIdDuplicationCheck = false;
        const msg = this.$t('MSG_ALT_SELT_DPCT_CHK');
        utils.messageBox('warning', msg);

        return false;
      }
      if (utils.isEmpty(this.objPortal.portalBaseUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_BASE_URL')), null, () => {
          this.$refs.textFieldPortalBaseUrl.setFocus();
        });
        return false;
      }

      if(this.deviceApplyYn) {
        if (this.$refs.deviceCheck.getValue()<1) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DVC_TYPE')), null, null);
          return false;
        }else{
          this.objPortal.deviceTypeValue = this.$refs.deviceCheck.getValue();
        }        
      }

      if(this.objPortal.blockYn==="Y"){
        this.blockDateValid();
        try{
          const [startValue, finishValue] = this.dateValue;
          let [tempDate, tempTime] = startValue.split(' ');
          this.blockStartDate = tempDate;
          [this.blockStartTime.HH, this.blockStartTime.mm] = tempTime.split(':');
          [tempDate, tempTime] = finishValue.split(' ');
          this.blockFinishDate = tempDate;
          [this.blockFinishTime.HH, this.blockFinishTime.mm] = tempTime.split(':');
        } catch (e) {
          utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
          return false;
        }
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
      }else{
        this.objPortal.blockStartDTM = 20200101000000;
        this.objPortal.blockFinishDTM = 99991231235959;
      }
      
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMP_00104' : 'DTS_CMP_00105';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objPortal,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.onClickNew();
          this.onClickCancel();
          this.research();
        });
      });
    },
    research() {
      this.$emit('research');
    },
    onClickCancel() {
      this.$emit('close');
    },
    onClickNew() {
      this.resetTab();
    },
    resetTab() {
      this.objPortal.tenantId = this.objPortal.tenantId;
      this.objPortal.portalId = '';
      this.objPortal.portalName = '';
      this.objPortal.portalContent = '';
      this.objPortal.useYn = 'Y';
      this.objPortal.deviceTypeValue = 1;

      if (this.deviceApplyYn) {
        this.$refs.deviceCheck.setValue(1);
      }

      this.isNew = true;
      this.isDeleted = false;
      this.isIdDuplicationCheck = false;
    },    
    onClickDuplicationCheck() {
      let portalNewId = this.objPortal.portalId;// "MSG_"+this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key;
      const dataParams = {
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
      if (!this.$refs.DatePickerBlockPeriod.isValid()) {
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
