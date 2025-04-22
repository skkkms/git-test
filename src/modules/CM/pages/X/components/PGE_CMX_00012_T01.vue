<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationId"
            v-model="objMobileAppStatus.mobileApplicationId"
            maxlength="100"
            readonly
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_VER_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldVersionId"
            v-model="objMobileAppStatus.mobileApplicationVersionId"
            maxlength="100"
            readonly
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_VER_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldVersionName"
            v-model="objMobileAppStatus.mobileApplicationVersionName"
            maxlength="100"
            readonly
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_SV_UDT_YN')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objMobileAppStatus.serverUpdateYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objMobileAppStatus.serverUpdateYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_SV_UDT_START_DTM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 align">
          <ur-date-time-picker
            v-model="startDatetime"
            :value="startDatetime"
            :input-type="CLIENT_DATE_TIME_FORMAT"
            :model-type="CLIENT_DATE_TIME_FORMAT"
            :min-date="selectedDate"
            second
            @input="UpdateStartDTM"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_SV_UDT_END_DTM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 align">
          <ur-date-time-picker
            v-model="endDatetime"
            :input-type="CLIENT_DATE_TIME_FORMAT"
            :model-type="CLIENT_DATE_TIME_FORMAT"
            :min-date="selectedDate"
            second
            @input="updateEndDTM"
          />
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
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

const CLIENT_DATE_FORMAT = 'YYYY-MM-DD';
export default {
  name: 'PGE_CMX_00012_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      CLIENT_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
      isNew : true,
      objMobileAppStatus: {
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
        mobileApplicationVersionName: '',
        versionTitle: '',
        versionMessage: '',
        dataChargeTitle: '',
        dataChargeMessage: '',
        serverUpdateTitle: '',
        serverUpdateMessage: '',
        serverUpdateStartDTM: '',
        serverUpdateEndDTM: '',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
      },
      startDatetime: `${moment().format(CLIENT_DATE_FORMAT)} ${moment().add(5, 'minute').format('HH:mm:ss')}`,
      endDatetime: `${moment().format(CLIENT_DATE_FORMAT)} ${moment().add(10, 'minute').format('HH:mm:ss')}`,
      startDate: moment().format(CLIENT_DATE_FORMAT),
      selectedDate: moment().format(CLIENT_DATE_FORMAT),
      startTime: this.endTime = moment().add(5, 'minute').format('HH:mm:ss'),
      endDate: moment().format(CLIENT_DATE_FORMAT),
      endTime: this.endTime = moment().add(10, 'minute').format('HH:mm:ss'),
      disabledDatePicker: `${moment().add(10, 'year').format('YYYY-12-31')}~${moment().add(0, 'year').format(CLIENT_DATE_FORMAT)}`,
    };
  },
  computed: {
    serverUpdateStartDTM() {
      return this.startDate + this.startTime.HH + this.startTime.mm + this.startTime.ss;
    },
    serverUpdateEndDTM() {
      return this.endDate + this.endTime.HH + this.endTime.mm + this.endTime.ss;
    },
  },
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadMobileAppStatus();
      } else {
        this.resetTab();
      }
    },
  },
  created() {
    this.customOptions = {};
  },
  mounted() {},

  methods: {
    UpdateStartDTM(){
      let splitedDTM = utils.dateformatToClient(this.startDatetime).split(' ');
      this.startDate = splitedDTM[0];
      this.startTime = splitedDTM[1];
    },
    UpdateEndDTM(){
      let splitedDTM = utils.dateformatToClient(this.endtDatetime).split(' ');
      this.endDate = splitedDTM[0];
      this.endTime = splitedDTM[1];
    },
    loadMobileAppStatus() {
      if(this.selectedGridRowData) {
        const mobileApplicationId = this.selectedGridRowData.mobileApplicationId;
        if(  !utils.isEmpty(mobileApplicationId)) {
          http.request(this.contextPageId, 'DTS_CMX_00023', {
            path: {
              'mobile-application-id': mobileApplicationId,
            },
          }).then(res => {
            this.objMobileAppStatus = res.data;
            let startDTM = utils.dateformatToClient(this.objMobileAppStatus.serverUpdateStartDTM).split(' ');
            this.startDate = startDTM[0].split('-').join();
            startDTM = startDTM[1].split(':');
            this.startTime = {
              HH: startDTM[0],
              mm: startDTM[1],
              ss: startDTM[2],
            }
            let endDTM = utils.dateformatToClient(this.objMobileAppStatus.serverUpdateEndDTM).split(' ');
            this.endDate = endDTM[0].split('-').join();
            endDTM = endDTM[1].split(':');
            this.endTime = {
              HH: endDTM[0],
              mm: endDTM[1],
              ss: endDTM[2],
            }
            this.isNew = false;
          });
        }
      }
    },
    resetTab() {
      this.objMobileAppStatus.mobileApplicationId = '';
      this.objMobileAppStatus.mobileApplicationVersionId = '';
      this.objMobileAppStatus.mobileApplicationVersionName = '';
      this.objMobileAppStatus.serverUpdateYn = '';
      this.startDate = moment().format(CLIENT_DATE_FORMAT);
      this.startTime = moment().add(5, 'minute').format('HH:mm:ss');
      this.endDate = moment().format(CLIENT_DATE_FORMAT);
      this.endTime = moment().add(10, 'minute').format('HH:mm:ss');
      this.startDatetime = `${moment().format(CLIENT_DATE_FORMAT)} ${moment().add(5, 'minute').format('HH:mm:ss')}`;
      this.endDatetime = `${moment().format(CLIENT_DATE_FORMAT)} ${moment().add(10, 'minute').format('HH:mm:ss')}`;
      this.isNew = true;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onClickDelete() {

      const mobileApplicationId = this.objMobileAppStatus.mobileApplicationId;
      if(  !utils.isEmpty(mobileApplicationId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMX_00026', {
            path: {
              'mobile-application-id': mobileApplicationId,
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

      if (utils.isEmpty(this.objMobileAppStatus.mobileApplicationId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      if (utils.isEmpty(this.objMobileAppStatus.serverUpdateYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SV_UDT_YN')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.serverUpdateStartDTM)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SV_UDT_START_DTM')), null, () => {
        });
        return false;
      }
      if (utils.isEmpty(this.serverUpdateEndDTM)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SV_UDT_END_DTM')), null, () => {
        });
        return false;
      }
      if(this.objMobileAppStatus.serverUpdateYn === 'Y') {
        if (+this.serverUpdateStartDTM <= +moment().format('YYYYMMDDHHmmss')) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_START_GRTR_PRES_DTM')), null, () => {
          });
          return false;
        }
        if (+this.serverUpdateEndDTM <= +this.serverUpdateStartDTM)  {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_END_GRTR_START_DTM')), null, () => {
          });
          return false;
        }
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        this.objMobileAppStatus.serverUpdateStartDTM = this.serverUpdateStartDTM;
        this.objMobileAppStatus.serverUpdateEndDTM = this.serverUpdateEndDTM;
        const dataServiceId = this.isNew ? 'DTS_CMX_00024' : 'DTS_CMX_00025';
          http.request(this.contextPageId, dataServiceId, {
          data: this.objMobileAppStatus,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.$emit('onClickSearch');
          this.onClickNew();
        });
      });
    },

  },
};
</script>

<style scoped>
.align {
  align-items: center;
}
</style>
