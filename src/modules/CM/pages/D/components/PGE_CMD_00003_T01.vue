<template>
  <div>
    <div class="comm_title_wrap">
      <h4>{{ $t('MSG_TXT_ATTH_GRP_BSC_INFO') }}</h4>
    </div>
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
          <sui-module-submodule-select
            ref="smComboFrame0"
            :pageId="pageId"
            :selectedMd="frame0.selectData.COD_MDLE"
            :selectedSmd="frame0.selectData.COD_SMDLE"
            :disabled="disabled"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ATTH_GRP_ID')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            :value="preAttachGroupId"
            :disabled="true"
            :readonly="true"
          />
          <div class="comp_spacing" />
          <sui-text-field
            ref="inputAttachGroupId"
            v-model="frame0.inputAttachGroupId"
            maxlength="92"
            :disabled="disabled"
            @keyup="onKeyUpInput"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            @click="onClickDuplicationCheck"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ATTH_GRP_NM')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-11">
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="pageId"
            :vertical="false"
            :editable="true"
            :multiLanguageId="multiLanguageId"
          />
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
          <textarea
            v-model.trim="frame0.attachGroupContent"
            maxlength="1000"
          />
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_title_wrap">
      <h4>{{ $t('MSG_TXT_ATTH_GRP_SET_INFO') }}</h4>
    </div>
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ATTH_ITEM_MGT_YN')"
            :vertical="false"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame0.attachItemManagementYn"
            value="Y"
            :disabled="disabled"
            @input="attachItemManagementChange"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="frame0.attachItemManagementYn"
            value="N"
            :disabled="disabled"
            @input="attachItemManagementChange"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_IMG_PRVW_APPY_YN')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame0.imagePreviewApplyYn"
            value="Y"
            :disabled="imagePreviewDisabled"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="frame0.imagePreviewApplyYn"
            value="N"
            :disabled="imagePreviewDisabled"
          >
            No
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RSLT_CAPA')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            ref="attachRestrictionSize"
            v-model="frame0.attachRestrictionSize"
            mask="number"
            maxlength="4"
            :trim="true"
          />
        </div>
      
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DLOAD_HIS_MGT_YN')"
            :vertical="false"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame0.downloadHistoryManagementYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="frame0.downloadHistoryManagementYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DLOAD_RSN_INP_YN')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame0.downloadReasonInputYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="frame0.downloadReasonInputYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_FILE_ENCR_YN')"
            :vertical="false"
            :required="true"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="frame0.fileEncryptionYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="frame0.fileEncryptionYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border_Prime"
        @click="onClickClose"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="moveTab(1)"
      >
        {{ $t('MSG_BTN_NEXT') }}
      </sui-button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMD_00003_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    tabData: {
      type: Object,
      default: null,
    },
    idx: {
      type: Number,
      default: 0,
    },
    attachGroupDeterminYn: {
      type: String,
      default: null,
    },
    attachGroupId: {
      type: String,
      default: null,
    },
    selectedGridRowData: {
      type: Object,
      default() {
        return {};
      },
    },
    popupOpenDefaultTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
        },
        fileEncryptionYn: '',
        attachItemManagementYn: '',
        imagePreviewApplyYn: '',
        downloadHistoryManagementYn: '',
        downloadReasonInputYn: '',
        multiLanguageId: '',
        attachGroupContent: '',
        inputAttachGroupId: '',
        attachRestrictionSize: '',
      },
      multiLanguageList: [],
      multiLanguageId: '',
      disabled: false,
    };
  },
  computed: {
    preAttachGroupId() {
      return `ATG_${this.frame0.selectData.COD_SMDLE.key}_`;
    },
    imagePreviewDisabled() {
      if (utils.isEqual(this.frame0.attachItemManagementYn, 'Y')) {
        return true;
      }

      return this.disabled;
    },
  },
  watch: {
  },
  deactivated() {
    // tab 이동 시 해당 tab의 data를 부모창(p01)에 저장.
    this.dataSet();
  },
  datasets: [],
  mounted() {
    if (!utils.isEmpty(this.attachGroupId)) {
      this.setAttachGroupInfo();
    } else {
      this.disabled = false;
    }
  },

  methods: {
    /**
     * 첨부그룹 정보 SET
     */
    setAttachGroupInfo() {
      const { attachGroupId } = this;

      this.frame0.selectData.COD_MDLE.key = this.selectedGridRowData.moduleCode;
      this.frame0.selectData.COD_SMDLE.key = this.selectedGridRowData.subModuleCode;
      this.frame0.attachItemManagementYn = this.selectedGridRowData.attachItemManagementYn;
      this.frame0.imagePreviewApplyYn = this.selectedGridRowData.imagePreviewApplyYn;
      this.frame0.downloadHistoryManagementYn = this.selectedGridRowData.downloadHistoryManagementYn;
      this.frame0.downloadReasonInputYn = this.selectedGridRowData.downloadReasonInputYn;
      this.frame0.attachGroupContent = this.selectedGridRowData.attachGroupContent;
      this.frame0.inputAttachGroupId = attachGroupId.substr(8, attachGroupId.length);
      this.frame0.attachRestrictionSize = this.selectedGridRowData.attachRestrictionSize.toString();
      this.frame0.fileEncryptionYn = this.selectedGridRowData.fileEncryptionYn;

      this.multiLanguageId = this.selectedGridRowData.attachGroupMultiLanguageId;

      // 메시지자원값 다국어 조회
      // this.$refs.mlngEditor.searchMlngDataById(this.selectedGridRowData.attachGroupMultiLanguageId);

      this.disabled = true;

      // mounted 직후 바로 탭 이동 시 다국어컴포넌트가 값을 로드 되기 전에 탭을 이동하는 현상 발생
      // 최초 multiLanguageList 값 조회 후 탭 이동
      if (!utils.isEqual(this.popupOpenDefaultTab, 0)) {
        this.$refs.mlngEditor.getMlngDataById(this.multiLanguageId).then(resolve => {
          this.multiLanguageList = resolve.data;
          this.moveTab(this.popupOpenDefaultTab);
        });
      }
    },
    /**
     * 입력 체크
     */
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.inputAttachGroupId;

      if (!utils.isEngNum_(searchFieldNewText) && !utils.isEmpty(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.inputAttachGroupId = this.searchFieldOldText;
          this.$refs.inputAttachGroupId.setFocus();
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    /**
     * 중복체크
     */
    onClickDuplicationCheck() {
      const queryParams = {
        attachGroupId: this.preAttachGroupId + this.frame0.inputAttachGroupId,
      };

      if (utils.isEmpty(this.frame0.inputAttachGroupId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ATTH_GRP_ID')),
          null, () => {
            this.$refs.inputAttachGroupId.setFocus();
          });
        return false;
      }

      http.request(this.pageId, 'DTS_CMD_00011', {
        query: queryParams,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox('error', this.$t('MSG_ALT_IMG_RGST_ID')); // 이미 등록된 ID입니다.
        } else {
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
        }
      });

      return null;
    },
    /**
     * 닫기
     */
    onClickClose() {
      this.$emit('onClickClose', false);
    },
    /**
     * 다음
     * TAB 이동
     */
    moveTab(value) {
      const idx = this.idx + value;

      this.$emit('moveTab', idx);
    },
    /**
     * 부모화면에 현재 TAB의 DATA 저장.
     */
    dataSet() {
      const attachGroupId = this.preAttachGroupId + this.frame0.inputAttachGroupId;
      let multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      let localMultiLanguage = this.$refs.mlngEditor.$refs.localTxtFld.value;
      let globalMultiLanguage = this.$refs.mlngEditor.$refs.globalTxtFld.value;

      // 최초 1회만 multiLanguageList 초기 값 전달.
      if (!utils.isEqual(this.popupOpenDefaultTab, 0) && !utils.isEmpty(this.multiLanguageList)) {
        const findLocal = utils.find(this.multiLanguageList,
          { langId: this.$store.getters.userInfo.langId });
        const findGlobal = utils.find(this.multiLanguageList,
          { langId: this.$store.getters.userInfo.globalLangId });

        multiLanguageList = utils.clone(this.multiLanguageList);
        localMultiLanguage = findLocal.multiLanguageContent;
        globalMultiLanguage = findGlobal.multiLanguageContent;

        this.multiLanguageList = [];
      }

      const info = {
        moduleCode: this.frame0.selectData.COD_MDLE.key,
        subModuleCode: this.frame0.selectData.COD_SMDLE.key,
        attachGroupContent: this.frame0.attachGroupContent,
        attachItemManagementYn: this.frame0.attachItemManagementYn,
        imagePreviewApplyYn: this.frame0.imagePreviewApplyYn,
        attachRestrictionSize: this.frame0.attachRestrictionSize,
        downloadHistoryManagementYn: this.frame0.downloadHistoryManagementYn,
        downloadReasonInputYn: this.frame0.downloadReasonInputYn,
        fileEncryptionYn: this.frame0.fileEncryptionYn,
        attachGroupId,
        localMultiLanguage,
        globalMultiLanguage,
        multiLanguageList,
      };

      this.$emit('setTabInfo', info, 't01');
    },
    /**
     * 첨부항목 관리 여부 radio box Event
     * 이미지 미리보기 적용여부 Y인 경우 이미지 미리보기 적용여부 N 고정
     */
    attachItemManagementChange(newValue) {
      if (utils.isEqual(newValue, 'Y')) {
        this.frame0.imagePreviewApplyYn = 'N';
      }
    },
  },
};
</script>

<style scoped>
</style>
