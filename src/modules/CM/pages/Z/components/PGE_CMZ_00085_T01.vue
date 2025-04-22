<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <!-- 대시보드ID -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_DSBD_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <div class="comm_label">
            DSB_
          </div>
          <div class="comp_spacing" />
          <sui-text-field
            ref="textFieldDashboardId"
            v-model="objDsbd.dashboardIdPostfix"
            maxlength="6"
            :disabled="!isNew"
            @keyup="onKeyUpInput(objDsbd.dashboardIdPostfix)"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="!isNew"
            @click="onClickCheckDuplication"
          />
        </div>
        <!-- 대시보드 별명 -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_DSBD_NNM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldTenantId"
            v-model="tenantIdPostfix"
            maxlength="6"
            :disabled="!isNew"
            @keyup="onKeyUpInput(tenantIdPostfix)"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="!isNew"
            @click="onClickCheckDuplication"
          />
        </div>
      </div>
      <div class="row">
        <!-- 대시보드 명 -->
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_DSBD_NM')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldDashboardName"
            v-model="objDsbd.dsbdName"
            maxlength="400"
          />
        </div>
        <!-- 디바이스 유형 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DVC_TYPE')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-device-checkbox
            ref="deviceCheck"
            :value="objDsbd.deviceTypeValue"
          />
        </div>
      </div>
      <div class="row">
        <!-- 대시보드 제목 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DSBD_TITLE')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5 ">
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="contextPageId"
            :vertical="false"
            :editable="true"
            :multiLanguageId="objDsbd.dsbdTitle"
          />
        </div>
        <!-- 사용여부 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objDsbd.useYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objDsbd.useYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <!-- 기간여부 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PRD_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objDsbd.prdYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objDsbd.prdYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <!-- 사용기간 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_USE_PRD')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <ur-range-picker
            ref="dp"
            v-model="dateValue1"
            :disabled="usePrdDisabled"
            strict-range
            one-input-mode
          />
        </div>
      </div>
      <div class="row">
        <!-- 상태 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_STT')"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="codeSelectStatusCd"
            v-model="objDsbd.statusCd"
            codeId="COD_NAT"
            :defaultOption="'select'"
          />
        </div>
        <!-- 차단 메시지 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_BLCK_MSG')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="objDsbd.dsbdBlckMsg"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DESC')"
          />
        </div>
        <div class="col-xs-11">
          <textarea
            v-model="objDsbd.roleContent"
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
        class="comm_btn_solid"
        @click="onClickTenantCreate"
      >
        {{ $t("MSG_BTN_TENANT_CREATE") }}
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
      dateValue1: ['', ''],
      isNew: true,
      isCheckDuplication: false,
      tenantIdPostfix: '',
      objDsbd: {
        tenantId: '',
        tenantName: '',
        tenantContent: '',
        useYn: 'Y',
        prdYn: 'Y',
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
      copyedGridRowData: {}
    };
  },
  computed: {
    usePrdDisabled() {
      if (!utils.isEqual(this.objDsbd.prdYn, 'Y')) {
        // this.objDsbd.usePrd = '';
        return true;
      }
      return false;
    },

  },
  watch: {
    selectedGridRowData(selectObj) {
      this.copyedGridRowData = selectObj
    },
    copyedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadTenant();
        this.isNew = false;
      } else {
        this.onClickNew();
        this.isNew = true;
      }
    },
    tenantIdPostfix(data) {
      if (this.objDsbd.tenantIdPostfix !== data) {
        this.isCheckDuplication = false;
      }
    },
  },
  created() {},
  mounted() {},

  methods: {
    loadTenant() {
      if (this.copyedGridRowData) {
        const loadTenantId = this.copyedGridRowData.tenantId;
        http.request(this.contextPageId, 'DTS_CMZ_00164', {
          path: {
            'tenant-id': loadTenantId,
          },
        }).then(res => {
          this.objDsbd = res.data;
          this.objDsbd.firstRegistrationDTM = utils.dateformatToClient(this.objDsbd.firstRegistrationDTM);
          this.objDsbd.finalModificationDTM = utils.dateformatToClient(this.objDsbd.finalModificationDTM);
          this.objDsbd.applyDTM = utils.dateformatToClient(this.objDsbd.applyDTM);

          this.isNew = false;
          this.tenantIdPostfix = this.objDsbd.tenantId.substring(4);
        });
      }
    },
    onClickNew() {
      utils.forEach(this.objDsbd, (value, key) => {
        this.objDsbd[key] = '';
      });
      this.objDsbd.useYn = 'Y';
      this.objDsbd.prdYn = 'Y';

      this.isNew = true;
      this.isCheckDuplication = false;
      this.tenantIdPostfix = '';
      if (Object.keys(this.copyedGridRowData).length !== 0) {
        this.$emit('clearGridSelection');
      }
    },
    onClickDelete() {
      const strTenantId = this.objDsbd.tenantId;
      if (!utils.isEmpty(strTenantId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_DEL_ALL_TNT_DATA_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMZ_00165', {
            path: {
              'tenant-id': strTenantId,
            },
          }).then(() => {
            this.copyedGridRowData = {};
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'), null, this.research);
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },

    // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼기간설정 관련 메소드▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
    /*
    changeDate(start, finish) {
      const from = utils.toStringByFormat(utils.toDate(start), 'YYYY-MM-DD');
      const to = utils.toStringByFormat(utils.toDate(finish), 'YYYY-MM-DD');
      this.noticeRangeDate = `${from} ~ ${to}`;
      return { from, to };
    },
    onRangeConfirm(value) {
      utils.assign(this.noticeData.rangeDate, value);
      this.noticeData.noticeStartDTM = utils.isEmpty(value) ? '' : utils.dateformatToServer(value.from);
      const finish = utils.isEmpty(value) ? '' : utils.dateformatToServer(value.to, 'S');
      this.noticeData.noticeFinishDTM = finish.concat('235959');
    },
*/
    onRangeConfirm() {
      const convertDate = timeStr => {
        const [year, month, day] = timeStr.split('-');
        return `${year}${month}${day}`;
      };
      const temp1 = convertDate(this.dateValue1[0]);
      const temp2 = convertDate(this.dateValue1[1]);
      this.temp = {
        from: temp1,
        to: temp2,
      };
      const value = this.temp;
      const { from, to } = value;
      if (utils.getDayOffset(to, from) > 6) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_SEARCH_UNDER_DY'), '7'));
        return true;
      }
      this.objDsbd.usePrd = value;
      return false;
    },
    onClickSave() {
      if (this.onRangeConfirm()) {
        return;
      }
      if (!this.validateData()) {
        return;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        this.objDsbd.tenantId = this.isNew ? `TNT_${this.tenantIdPostfix}` : this.objDsbd.tenantId;
        this.objDsbd.moduleList = [];
        const dataServiceId = this.isNew ? 'DTS_CMZ_00166' : 'DTS_CMZ_00167';
        http.request(this.contextPageId, dataServiceId, {
          data: this.objDsbd,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
        });
      });
    },
    validateData() {
      // date picker validation
      // console.log(":::::::::::::", this.$refs.dp.isValid());
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return false;
      }


      /*
      if (utils.isEmpty(this.objDsbd.tenantName)) {
        // eslint-disable-next-line max-len
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TENANT_NM')), null, () => {
          this.$refs.textFieldTenantName.setFocus();
        });
        return false;
      }
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
      */
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
      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_SPECL_CHAR'), null, () => {
          this.tenantIdPostfix = this.tenantIdPostfix.replace(
            /[^A-Za-z0-9_.]/g, '',
          );
        });
      }
    },
    onClickTenantCreate() {
      if (utils.isEmpty(this.copyedGridRowData)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_TENANT')));
        return false;
      }
      this.$emit('openModulePopup', this.copyedGridRowData);
      return true;
    },
  },
};
</script>

<style scoped>
</style>
