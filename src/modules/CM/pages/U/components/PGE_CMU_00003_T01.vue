<template>
  <div>
    <div class="comm_title_wrap" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="moduleSelect"
            dataset="dataset0.moduleCode"
            codeId="COD_MDLE"
            defaultOption="select"
            :selected="frame0.selectedCodeValue.COD_MDLE"
            :pageId="pageId"
            :initialSelectedIndex="0"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MSG_RESO_TYPE')"
            :required="true"
            :vertical="false"
            style="letter-spacing: -1px;"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="typeCodeSelect"
            dataset="dataset0.messageResourcesTypeCode"
            defaultOption="select"
            codeId="COD_MSG_RESO_TYPE"
            :selected="frame0.selectedCodeValue.COD_MSG_RESO_TYPE"
            :pageId="pageId"
            :disabled="readonlyFlag"
            :initialSelectedIndex="0"
            @list-clicked="onClickTypeCode"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MSG_RESO_ID')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">{{preMessageResourcesId}}</div>
          <div class="comp_spacing"></div>
          <sui-text-field
            v-if="!readonlyFlag"
            ref="msgResoID"
            v-model="frame0.selectedMsgResoID"
            :readonly="readonlyFlag"
            maxlength="92"
            @input="onKeyUpInput"
            @blur="onBlurInput"
          />
          <div class="comp_spacing" />
          <sui-button
            v-if="!readonlyFlag"
            type="button"
            class="comm_btn_duplicate"
            @click="onClickDuplicationCheck"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MSG_RESO_VAL')"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="pageId"
            :vertical="false"
            :multiLanguageId="frame0.messageResourcesMultiLanguageId"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_META_BSIC_YN')"
            :required="true"
            :vertical="false"
            style="letter-spacing: -1px;"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame0.selectedCodeValue.PAGE_META_BSIC_YN.key"
            dataset="dataset0.pageBasicsYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="frame0.selectedCodeValue.PAGE_META_BSIC_YN.key"
            dataset="dataset0.pageBasicsYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div
          v-if="multiTenancy"
          class="col-xs-1"
        >
          <sui-input-label
            :label="$t('MSG_TXT_MSG_RESO_DEF_VAL')"
            :vertical="false"
          />
        </div>
        <div
          v-if="multiTenancy"
          class="col-xs-5"
        >
          <cmp-mlng-editor
            ref="defaultMlngEditor"
            :pageId="pageId"
            :vertical="false"
            :readonly="true"
            :multiTenancy="multiTenancy"
            :multiLanguageId="frame0.defaultMessageResourcesMultiLanguageId"
          />
        </div>
        <div
          v-if="!multiTenancy"
          class="col-xs-1 nodata"
        />
        <div
          v-if="!multiTenancy"
          class="col-xs-5 nodata"
        />
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ frame0.firstRegistrationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ frame0.firstRegistrationDTM }}
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
          <div class="comm_label">
            {{ frame0.finalModificationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ frame0.finalModificationDTM }}
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:create="pageId"
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button><!-- 신규 -->
      <sui-button
        v-permission:delete="pageId"
        type="button"
        class="comm_btn_border"
        :disabled="!isSuperOrBase || checkMetaSave"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button><!-- 삭제 -->
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickValueSearch"
      >
        {{ $t("MSG_TXT_VAL_SRCH") }}
      </sui-button><!-- 값 조회 -->
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        :disabled="checkMetaSave"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button><!-- 저장 -->
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00003_T01', // eslint-disable-line vue/name-property-casing
  pname: 'PGE_CMU_00003',
  extends: BasePage,
  props: {
    messageResourcesId: {
      type: String,
      default: null,
    },
    langId: {
      type: String,
      default: null,
    },
    pageId: {
      type: String,
      default: null,
    },
    selectedData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isSuperOrBase: _.some(utils.getConfigurationValue('YML_TENANT_ID_BANNED_LIST').split(','), el => el === this.$store.getters.userInfo.tenantId),
      multiTenancy: utils.getConfigurationValue('YML_MULTI_TENANCY_YN') === 'Y',
      pageTitle: this.$t('MSG_TXT_MSG_RESO'),
      pageName: this.$t('MSG_TIT_MSG_RESO_MGT'),
      alertFlag: true,
      defaultGridData0: {
        columns: [{
          text: this.$t('MSG_TXT_LNG_ID'),
          datafield: 'langId',
        }, {
          text: this.$t('MSG_TXT_MSG_RESO_VAL'),
          datafield: 'multiLanguageContent',
        }],
      },
      frame0: {
        selectedCodeValue: {
          COD_MDLE: {
            label: '',
            key: ' ',
          },
          COD_MSG_RESO_TYPE: {
            label: '',
            key: ' ',
          },
          PAGE_META_BSIC_YN: {
            label: '',
            key: 'N',
          },
        },
        messageResourcesId: '',
        selectedMsgResoID: '',
        messageResourcesMultiLanguageId: '',
        defaultMessageResourcesMultiLanguageId: '',
        loginId: '',
        knoxId: '',
        userName: '',
        userGlobalName: '',
        departmentName: '',
        departmentEnglishName: '',
        displayLanguageId: '',
        loginIdRegistration: '',
        knoxIdRegistration: '',
        userNameRegistration: '',
        userGlobalNameRegistration: '',
        departmentNameRegistration: '',
        departmentEnglishNameRegistration: '',
        displayLanguageIdRegistration: '',
        finalModificationDTM: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        finalModificationUserId: '',

      },
      multiLanguageId: '',
      readonlyFlag: false,
      checkMetaSave: utils.checkMetaSave(),
      isIdDuplicationCheck: false,
      inputMessageResourceId: '',
      cacheMessageResourceId: '',
    };
  },
  computed: {
    preMessageResourcesId() {
      if (this.frame0.messageResourcesId) {
        return this.frame0.messageResourcesId;
      }
      if (utils.trim(this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key)) {
        return `MSG_${this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key}_`;
      }
      return 'MSG_';
    },
    messageReourcesIdChanged() {
      return !utils.isEqual(this.frame0.selectedMsgResoID, this.cacheMessageResourceId);
    },
  },
  watch: { // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    messageResourcesId(obj) {
      if (!utils.isEmpty(obj) && !this._inactive) {
        this.selectDataFormInput();
      }
    },
  },
  activated() {
    if (this.messageResourcesId) {
      this.selectDataFormInput();
    }
  },
  mounted() { // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    if (this.messageResourcesId) {
      this.$nextTick(() => {
        this.selectDataFormInput();
      });
    } else {
      this.$nextTick(() => {
        // 초기 데이터 생성
        this.saveSnapshot(this.makeSnapshot());
      });
    }
  },
  methods: {
    /**
     * 저장되지 않은 데이터 확인
     */
    makeSnapshot() {
      const snapshotData = utils.assign({},
        this.frame0,
        {
          moduleCode: this.frame0.selectedCodeValue.COD_MDLE.key,
          pageBasicsYn: this.frame0.selectedCodeValue.PAGE_META_BSIC_YN.key,
          messageResourcesTypeCode: this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key,
        });

      return snapshotData;
    },
    /**
     * 메시지자원 기본정보 SET
     */
    selectDataFormInput() {
      utils.forEach(this.frame0, (value, key) => {
        if (utils.isEqual(key, 'selectedMsgResoID')) {
          this.frame0[key] = this.messageResourcesId.substr(8, this.messageResourcesId.length); // 메시지자원 ID
        } else if (utils.isEqual(key, 'selectedCodeValue')) {
          this.frame0[key].COD_MDLE.key = this.selectedData.moduleCode;
          this.frame0[key].COD_MSG_RESO_TYPE.key = this.selectedData.messageResourcesTypeCode;
          this.frame0[key].PAGE_META_BSIC_YN.key = this.selectedData.pageBasicsYn;
        } else {
          this.frame0[key] = this.selectedData[key] || '';
        }
      });
      this.readonlyFlag = true;

      // 초기 데이터 생성
      this.saveSnapshot(this.makeSnapshot());
    },
    /**
     * 신규
     */
    onClickNew() {
     // tab1 데이터 리셋
      this.$refs.typeCodeSelect.reset();
      this.$refs.moduleSelect.reset();
      this.$refs.mlngEditor.reset();
      if (this.multiTenancy) {
        this.$refs.defaultMlngEditor.reset();
      }
      this.frame0.messageResourcesMultiLanguageId = '';
      this.frame0.selectedCodeValue.PAGE_META_BSIC_YN.key = 'N';

      utils.forEach(this.frame0, (value, key) => {
        if (!utils.isEqual(key, 'selectedCodeValue')) {
          this.frame0[key] = '';
        }
      });

      this.searchFieldOldText = '';
      this.readonlyFlag = false;
      this.isIdDuplicationCheck = false;
      this.inputMessageResourceId = '';
      this.cacheMessageResourceId = '';

      // 초기 데이터 생성
      this.saveSnapshot(this.makeSnapshot());

      this.$emit('onClickNew');
    },
    /**
     * 저장
     */
    onClickSave() {
      const multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      let msgResoNewId = `MSG_${this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key}`;
      msgResoNewId += `_${this.frame0.selectedMsgResoID}`;
      const messageResourcesId = utils.isEmpty(this.frame0.messageResourcesId)
        ? msgResoNewId
        : this.frame0.messageResourcesId;
      const dataParams = {
        pageId: this.pageId,
        multiLanguageId: messageResourcesId,
        messageResourcesId,
        moduleCode: this.frame0.selectedCodeValue.COD_MDLE.key,
        pageBasicsYn: this.frame0.selectedCodeValue.PAGE_META_BSIC_YN.key,
        deleteYn: 'N',
        messageResourcesMultiLanguageList: multiLanguageList,
        messageResourcesTypeCode: this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key || '',
      };
      // const dataParams = this.makeSnapShot();

      if (!this.fn_validCheck()) return false; // null 값 체크

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        this.saveMessageResource(dataParams);
      });

      return null;
    },
    /**
     * 저장 서비스
     */
    saveMessageResource(dataParams) {
      const dataServiceId = utils.isEmpty(this.frame0.messageResourcesId)
        ? 'DTS_CMU_00016'
        : 'DTS_CMU_00017';

      http.request(this.pageId, dataServiceId, {
        data: dataParams,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));

        // 초기 데이터 생성
        this.saveSnapshot(this.makeSnapshot());
        // 수정 시 그리드 재 조회
        if (!utils.isEmpty(this.frame0.messageResourcesId)) {
          this.$emit('saved-message-resource', {
            messageResourcesId: this.selectedData.messageResourcesId,
            langId: this.selectedData.langId,
          });
        }else{
          // TAB 초기화
          this.onClickNew();
        }
      });
    },
    /**
     * 삭제
     */
    onClickDelete() {
      if (!this.frame0.messageResourcesId) {
        //utils.messageBox('warning', this.$t('MSG_ALT_DEL_NO_DATA'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => {
        this.deleteMessageResource(this.frame0.messageResourcesId); // 데이터 삭제
      });

      return null;
    },
    /**
     * 삭제 서비스
     */
    deleteMessageResource(msgResoNewId) {
      http.request(this.pageId, 'DTS_CMU_00018', {
        path: {
          'message-resource-id': msgResoNewId,
        },
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'));
        this.$emit('deleted-message-resource');
        this.onClickNew();
      });
    },
    /**
     * 값 조회
     */
    onClickValueSearch() {
      const multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfo();
      const messageResourcesValue = multiLanguageList[0].multiLanguageContent.replace(/[\t\s]/g, '');
      const dataParams = {
        messageResourcesValue,
      };
      let altMessage = '';

      if (utils.isEmpty(messageResourcesValue)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO_VAL')),
          null,
          () => {
            this.$refs.mlngEditor.setFocusLocalTxtFld();
          });
        return false;
      }

      http.request(this.pageId, 'DTS_CMU_00047', {
        query: dataParams,
      }).then(res => {
        if (res.data.length > 0) {
          utils.forEach(res.data, obj => {
            altMessage += `ID : ${obj.messageResourcesId} value : ${obj.multiLanguageContent}\n`;
          });
          utils.messageBox('information', this.$t('MSG_ALT_MSG_VAL_SIMILAR'), altMessage);
        } else {
          utils.messageBox('information', this.$t('MSG_ALT_MSG_VAL_NO_SIMILAR'));
        }
      });

      return null;
    },
    /**
     * ID 입력 제한
     */
    onKeyUpInput(value) { // 영문 / 숫자 입력제한
      const searchFieldNewText = value;

      if (utils.isEngNum_(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText;
      } else if (this.alertFlag) {
        this.alertFlag = false;
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true;
          this.$refs.msgResoID.txtField = this.searchFieldOldText;
          this.$refs.msgResoID.setFocus();
        });
      }
    },
    onBlurInput() {
      // 메시지자원 ID 변경 시 중복체크 여부 초기화
      if (!utils.isEqual(this.cacheMessageResourceId, this.frame0.selectedMsgResoID)) {
        this.cacheMessageResourceId = '';
      }
    },
    onClickTypeCode() {
      // 메시지자원 유형 변경 시 중복체크 여부 초기화
      this.cacheMessageResourceId = '';
    },
    /**
     * 중복체크
     */
    onClickDuplicationCheck() {
      let msgResoNewId = this.preMessageResourcesId;// "MSG_"+this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key;
      msgResoNewId += this.frame0.selectedMsgResoID;
      this.inputMessageResourceId = msgResoNewId;
      const dataParams = {
        messageResourcesId: msgResoNewId,
      };

      if (utils.isEmpty(this.frame0.selectedMsgResoID)) {
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO_ID')),
          null,
          () => {
            this.$refs.msgResoID.setFocus();
          });
        return false;
      }

      http.request(this.pageId, 'DTS_CMU_00021', {
        query: dataParams,
      }).then(res => {
        if (res.data > 0) {
          this.isIdDuplicationCheck = false;
          utils.messageBox('error', this.$t('MSG_ALT_IMG_RGST_ID'), null, () => { // 이미 등록된 ID입니다.
            this.$refs.msgResoID.setFocus();
          });
        } else {
          this.cacheMessageResourceId = utils.clone(this.frame0.selectedMsgResoID);
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
        }
      });

      return null;
    },
    /**
     * 입력 체크
     */
    fn_validCheck() {
      if (utils.isEmpty(utils.trim(this.frame0.selectedCodeValue.COD_MDLE.key))) {
        // 모듈를 선택하세요
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key))) {
        // 메시지자원 유형을 선택하세요
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MSG_RESO_TYPE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.selectedMsgResoID))) {
        // 메시지자원ID 를 입력해주세요
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO_ID')),
          null,
          () => {
            this.$refs.msgResoID.setFocus();
          });
        return false;
      }

      if (this.messageReourcesIdChanged && utils.isEmpty(this.frame0.messageResourcesId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_DPCT_CHK'));
        return false;
      }

      if (utils.isEmpty(utils.trim(this.frame0.selectedCodeValue.PAGE_META_BSIC_YN.key))) {
        // 메타기본여부를 선택하세요
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_META_BSIC_YN')));
        return false;
      }

      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        // local 언어를 입력해주세요
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG')),
          null,
          () => {
            this.$refs.mlngEditor.setFocusLocalTxtFld();
          });

        return false;
      }

      /*
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.getGlobalLangValue()))) {
        // global 언어를 입력해주세요
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG')),
          null,
          () => {
            this.$refs.mlngEditor.setFocusGlobalTxtFld();
          });

        return false;
      }
      */

      return true;
    },
  },
};
</script>
<style scoped>
.comm_label_1 {
    width: 150px;
  }
</style>
