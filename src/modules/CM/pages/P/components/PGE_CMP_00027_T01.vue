<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldLinkId"
            v-model="objLink.linkId"
            maxlength="13"
            placeholder="LNK_CMP_"
            :required="true"
            :vertical="false"
            :readonly="true"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldLinkName"
            v-model="objLink.linkName"
            maxlength="100"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_TYPE')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-code-select
            ref="codeSelectLinkTypeCode"
            v-model="objLink.linkTypeCode"
            codeId="COD_LINK_TYPE"
            :initialSelectedIndex="0"
            @list-clicked="itemSelected"
          />
        </div>        
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_URL')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldLinkUrl"
            v-model="objLink.linkUrl"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_POPU_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objLink.linkUsePopupYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objLink.linkUsePopupYn"
            value="N"
            :disabled="linkTypeExternalFlag"
          >
            {{ 'No' }}
          </sui-radio>
        </div>        
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_POPU_OPTN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldLinkPopupOptionValue"
            v-model="objLink.linkPopupOptionValue"
            maxlength="200"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_CATG')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-code-select
            ref="codeSelectLinkCategoryCode"
            v-model="objLink.linkCategoryCode"
            codeId="COD_LINK_CATG"
            :initialSelectedIndex="0"
          />
        </div>        
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_NNM')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldLinkNickName"
            v-model="objLink.linkNickName"
            maxlength="100"
            @input="onKeyUpInput"
            @blur="onBlurInput"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="!nickNameChange"
            @click="onClickDuplicationCheck"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_PRD_YN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-radio
            v-model="objLink.linkUsePeriodYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objLink.linkUsePeriodYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_USE_PRD')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <ur-range-picker
            ref="rangePicker"
            v-model="dateValue1"
            :disabled="linkUseperiodFlag"
            strict-range
            one-input-mode
            init="today"
            :inputType=this.userDateFormat
            :modelType=this.userDateFormat
          />
        </div>
      </div>  
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_STT')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-code-select
            ref="codeSelectLinkStateCode"
            v-model="objLink.linkStateCode"
            codeId="COD_LINK_STT"
            :initialSelectedIndex="1"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_LINK_BLCK_CNTN')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldLinkBlockContent"
            v-model="objLink.linkBlockContent"
            maxlength="1000"
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
            v-model="objLink.linkUseYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="objLink.linkUseYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <div
          v-if="deviceApplyYn"
          class="col-xs-1"
        >
          <sui-input-label
            :label="$t('MSG_TXT_DVC_TYPE')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div
          v-if="deviceApplyYn"
          class="col-xs-5"
        >
          <sui-device-checkbox
            ref="deviceCheck"
            :value="objLink.deviceTypeBit"
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
            :label="$t('MSG_TXT_EXPL')"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-text-field
            ref="textFieldLinkContent"
            v-model="objLink.linkContent"
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
          <div class="comm_label">
            {{ objLink.firstRegistrationUserId }}
          </div>
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
            {{ objLink.firstRegistrationDTM }}
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
          <div class="comm_label">
            {{ objLink.finalModificationUserId }}
          </div>
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
            {{ objLink.finalModificationDTM }}
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

/* eslint max-len: ["error", { "code": 200 }] */
export default {
  name: 'PGE_CMP_00027_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
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
      periodDate: { from: utils.now(), to: utils.now() },
      dateValue1: [],
      isNew: true,
      objLink: {
        linkId: '',
        linkName: '',
        linkNickName: '',
        linkUrl: '',
        linkStateCode: '',
        linkTypeCode: '',
        linkCategoryCode: '',
        linkUsePopupYn: 'Y',
        linkBlockContent: '',
        linkUseYn: 'Y',
        linkUsePeriodYn: 'N',
        linkUseStartDTM: '',
        linkUseFinishDTM: '',
        linkPopupOptionValue: '',
        deviceTypeBit: 1,
        linkContent: '',
        deleteYn: '',
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
        periodDate: { from: utils.now(), to: utils.now() },
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      searchFieldOldText: '',
      alertFlag: true,
      cacheNickName: '',
      // isIdDuplicationCheck: false,
      originalNickName: '',
      duplicate: false,
    };
  },
  computed: {
    linkUseperiodFlag() {
      // 사용 안할 시 true
      return utils.isEqual(this.objLink.linkUsePeriodYn, 'N');
    },
    nickNameChange() {
      // 변경 시 true
      return !utils.isEqual(this.objLink.linkNickName, this.originalNickName);
    },
    pageNickNameInput() {
      // 입력시 true
      return !utils.isEmpty(this.objLink.linkNickName);
    },
    linkTypeExternalFlag() {
      return utils.isEqual(this.objLink.linkTypeCode, 'E');
    }
  },
  watch: {
    selectedGridRowData(selectObj) {
      if (utils.isEmpty(selectObj)) {
        this.onLoadReset();
      } else {
        this.originalNickName = selectObj.linkNickName;
        this.loadLink();
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },
  mounted() {},

  methods: {
    loadLink() {
      if (this.selectedGridRowData) {
        const linkId = this.selectedGridRowData.linkId;
        const deviceApplyYn = this.deviceApplyYn;

        if ( !utils.isEmpty(linkId)) {
          http.request(this.contextPageId, 'DTS_CMP_00110', {  
            path: {
              'link-id': linkId,
            },
          }).then(res => {
            this.setUserInfoFormat(res.data);
            utils.dateformatToClientInArray(res, ['firstRegistrationDTM', 'finalModificationDTM']);
            this.objLink = res.data;
            if (deviceApplyYn) {
              this.$refs.deviceCheck.setValue(res.data.deviceTypeBit);
            }
            if (utils.isEqual(res.data.linkUsePeriodYn, 'Y')) {
              this.objLink.periodDate = {
                from: res.data.linkUseStartDTM,
                to: res.data.linkUseFinishDTM,
              };
              this.dateValue1 = [utils.dateformatToClient(res.data.linkUseStartDTM,'S'),utils.dateformatToClient(res.data.linkUseFinishDTM,'S')];
            }else{
              this.dateValue1 = [utils.dateformatToClient(utils.now()),utils.dateformatToClient(utils.now())];
            }
            this.isNew = false;
          });
        }
      }
    },
    onLoadReset() {
      this.objLink.linkId = '';
      this.objLink.linkName = '';
      this.objLink.linkNickName = '';
      this.objLink.linkUrl = '';
      this.$refs.codeSelectLinkStateCode.reset();
      this.$refs.codeSelectLinkTypeCode.reset();
      this.$refs.codeSelectLinkCategoryCode.reset();
      this.objLink.linkBlockContent = '';
      this.objLink.linkUseYn = 'Y';
      this.objLink.linkUsePeriodYn = 'N';
      this.objLink.linkUsePopupYn = 'Y';
      this.objLink.periodDate = { from: utils.now(), to: utils.now() };
      this.dateValue1 = [utils.dateformatToClient(utils.now()),utils.dateformatToClient(utils.now())];
      this.objLink.linkUseStartDTM = '';
      this.objLink.linkUseFinishDTM = '';
      this.objLink.linkPopupOptionValue = '';
      this.objLink.deviceTypeBit = 1;
      this.objLink.linkContent = '';
      this.objLink.firstRegistrationDTM = '';
      this.objLink.firstRegistrationUserId = '';
      this.objLink.firstRegistrationProgramId = '';
      this.objLink.finalModificationDTM = '';
      this.objLink.finalModificationUserId = '';
      this.objLink.finalModificationProgramId = '';
      this.objLink.r_dsplLngId = '';
      this.objLink.r_knoxId = '';
      this.objLink.r_loginId = '';
      this.objLink.r_userName = '';
      this.objLink.r_userGlobalName = '';
      this.objLink.r_departmentName = '';
      this.objLink.r_departmentEnglishName = '';
      this.objLink.m_dsplLngId = '';
      this.objLink.m_knoxId = '';
      this.objLink.m_loginId = '';
      this.objLink.m_userName = '';
      this.objLink.m_userGlobalName = '';
      this.objLink.m_departmentName = '';
      this.objLink.m_departmentEnglishName = '';
      this.isNew = true;
      this.searchFieldOldText = '';
      this.cacheNickName = '';
      this.duplicate = false;

      if (this.deviceApplyYn) {
        this.$refs.deviceCheck.setValue(1);
      }
    },
    onClickNew() {
      this.onLoadReset();
      this.$emit('onClickNew');
    },
    onClickDelete() {
      const linkId = this.objLink.linkId;    
      if (!utils.isEmpty(linkId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMP_00113', {
            path: {
              'link-id': linkId,
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
    makeSnapshot() {
      const dataParams = {};
      utils.forEach(this.objLink, (value, key) => {
        if (utils.isEqual(key, 'periodDate')) {
          
          const linkUseStartDTM = this.linkUseperiodFlag ? '' : utils.dateformatToServer(value.from);
          const linkUseFinishDTM = this.linkUseperiodFlag ? '' : utils.dateformatToServer(value.to).substr(0, 8).concat('235959');
          utils.assign(dataParams, { linkUseStartDTM, linkUseFinishDTM });
        } else {
          dataParams[key] = value;
        }
      });
      return dataParams;
    },
    convertRaangeFormat() {
      this.objLink.periodDate = {
        from: this.dateValue1[0],
        to: this.dateValue1[1],
      };
      this.periodDate = {
        from: this.dateValue1[0],
        to: this.dateValue1[1],
      };
    },
    onClickSave() {
      this.convertRaangeFormat();
      const dataParams = this.makeSnapshot();

      // 동시성 체크
      dataParams['originalFinalModificationDTM'] = utils.dateformatToServer(dataParams.finalModificationDTM);

      if (this.deviceApplyYn) {
        dataParams.deviceTypeBit = this.$refs.deviceCheck.getValue();
      }

      if (utils.isEmpty(this.objLink.linkName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LINK_NM')), null, () => {
          this.$refs.textFieldLinkName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objLink.linkUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LINK_URL')), null, () => {
          this.$refs.textFieldLinkUrl.setFocus();
        });
        return false;
      }

      if (this.pageNickNameInput && this.nickNameChange && !this.duplicate) {
        const msg = utils.strFormat(this.$t('MSG_ALT_DUPLICATE_CHECK'), this.$t('MSG_TXT_LINK_NNM'));
        utils.messageBox('warning', msg);        
        return false;
      }

      if (this.objLink.linkStateCode === 'B' && utils.isEmpty(this.objLink.linkBlockContent)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LINK_BLCK_CNTN')), null, () => {
          this.$refs.textFieldLinkBlockContent.setFocus();
        });
        return false;
      }       

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMP_00111' : 'DTS_CMP_00112';
        http.request(this.contextPageId, dataServiceId, {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(!this.selectedGridRowData){
              this.$emit('onClickSearch');
              this.onClickNew();
            }else{
              this.$emit('updateLinkInfo', this.objLink.linkId);
            }
          });          
        });
      });
    },
    onConfirmRangePicker(dateObj) {
      this.periodDate = dateObj;
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
    // 링크별명 입력제한
    onKeyUpInput(value) { // 영문-숫자 만 입력 가능
      const searchFieldNewText = value;

      if (utils.isEngNum(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText;
      } else if (this.alertFlag) {
        this.alertFlag = false;
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true;
          this.$refs.textFieldLinkNickName.txtField = this.searchFieldOldText;
          this.$refs.textFieldLinkNickName.setFocus();
        });
      }
    },
    onBlurInput() {
      // 메시지자원 ID 변경 시 중복체크 여부 초기화
      if (!utils.isEqual(this.cacheNickName, this.objLink.linkNickName)) {
        this.cacheNickName = '';
      }
    },
    // 중복체크
    onClickDuplicationCheck() {
      // let msgResoNewId = this.preMessageResourcesId;// "MSG_"+this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key;
      // msgResoNewId += this.objLink.linkNickName;
      // this.inputMessageResourceId = msgResoNewId;
      const dataParams = {
        linkNickName: this.objLink.linkNickName,
      };

      if (utils.isEmpty(this.objLink.linkNickName)) {
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LINK_NNM')),
          null,
          () => {
            this.$refs.textFieldLinkNickName.setFocus();
          });
        return false;
      }

      http.request(this.contextPageId, 'DTS_CMP_00126', {
        query: dataParams,
      }).then(res => {
        if (res.data.resultCode === '0') {
          // this.isIdDuplicationCheck = false;
          this.duplicate = false;
          utils.messageBox('error', utils.strFormat(this.$t('MSG_ALT_ALREADY_RGST'), this.$t('MSG_TXT_LINK_NNM')), null, () => { // 이미 등록된 링크별명 입니다.
            this.$refs.textFieldLinkNickName.setFocus();
          });
        } else {
          this.duplicate = true;
          this.cacheNickName = utils.clone(this.objLink.linkNickName);
          utils.messageBox('success', utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_LINK_NNM'))); // 사용 가능한 ID입니다.
        }
      });

      return null;
    },
    itemSelected(value) {
      if (utils.isEqual(value.codeId, 'E')) {
        this.objLink.linkUsePopupYn = 'Y';
      }
    }
  },
};
</script>

<style scoped>
</style>
