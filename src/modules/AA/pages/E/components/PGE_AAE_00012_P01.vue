<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-module-submodule-select
              ref="moduleSubmoduleSelect"
              :page-id="pageId"
              :selected-md="masterData.moduleCode"
              :selected-smd="masterData.subModuleCode"
              @loaded="loaded"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_ID')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div
            v-show="!isModification"
            class="col-xs-10"
          >
            <sui-input-label
              class="comm_label_1"
              label="COD_"
              :vertical="false"
            />
            <sui-text-field
              v-model="masterData.codeId"
              maxlength="96"
              @keyup="onKeyUpInput($event, masterData, 'codeId')"
            />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              @click="checkCodeId"
            />
          </div>
          <div
            v-show="isModification"
            class="col-xs-10"
          >
            <sui-label
              :label="`COD_${ masterData.codeId }`"
              class="comm_label"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_NAME')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <mlng-editor
              ref="mlngEditor"
              :pageId="pageId"
              :vertical="false"
              :editable="true"
              :multiLanguageId="masterData.codeMasterMultiLanguageId"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_PHSC_NAME')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="masterData.codePhysicalName"
              clearable
              maxlength="100"
              @keyup="onKeyUpInput($event, masterData, 'codePhysicalName')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_CONTENT')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea
              v-model="masterData.codeContents"
              class="width100"
              maxlength="1000"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_STRT_TYPE')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-code-select
              codeId="COD_CDST_TYPE"
              :page-id="pageId"
              :selected="masterData.codeStructureTypeCode"
              :defaultOption="'select'"
              @list-clicked="onSelectTypeCode"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_UP_CODE_ID')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              ref="upperCodeId"
              v-model="masterData.upperCodeId.key"
              maxlength="100"
              :disabled="masterData.codeStructureTypeCode.key === '0'"
            />
            <sui-button
              type="button"
              class="comm_btn_InputScr"
              @click="onClickBtnPop"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_USE')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-radio
              v-model="masterData.codeUseYn"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="masterData.codeUseYn"
              value="N"
            >
              No
            </sui-radio>
          </div>
        </div>
        <div
          v-if="isModification"
          class="row"
        >
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_USR')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <!--
            <cmp-user-name-link
              :pageId="pageId"
              :displayType="'1'"
              :displayLanguageId="masterData.modificationDisplayLanguageId"
              :loginId="masterData.modificationLoginId"
              :knoxId="masterData.modificationKnoxId"
              :userId="masterData.finalModificationUserId"
              :userName="masterData.modificationUserName"
              :userGlobalName="masterData.modificationUserGlobalName"
              :departmentName="masterData.modificationDepartmentName"
              :departmentEnglishName="masterData.modificationDepartmentGlobalName"
              :type="'link'"
            />
            -->
            {{masterData.finalModificationUserId}}
          </div>
        </div>
        <div
          v-if="isModification"
          class="row"
        >
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_DTM')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            {{ masterData.finalModificationDTM }}
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickBtnCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          v-permission:update="pageId"
          type="button"
          class="comm_btn_solid"
          :disabled="delYN==='Yes'"
          @click="onClickBtnSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
import BasePage from '~cm/components/BasePage'; // eslint-disable-line import/no-unresolved
import MlngEditor from '../PGE_AAE_00013';

export default {
  name: 'PGE_AAE_00012_P01', // eslint-disable-line vue/name-property-casing
  components: {
    MlngEditor
  },
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_AAE_00012',
    },
    codeId: {
      type: String,
      default: null,
    },
    delYN: {
      type: String,
      default: 'N',
    },
  },
  data() {
    return {
      isIdDuplicationCheck: false,
      isModification: false,

      searchFieldOldText: {},

      masterData: {
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
        codeId: '',
        codeStructureTypeCode: { key: '', label: '' },
        upperCodeId: { key: '', label: '' },
        codeUseYn: 'Y',
        codePhysicalName: '',
        codeContents: '',

        codeMasterMultiLanguageId: '',

        finalModificationUserId: '',
        finalModificationDTM: '',

        modificationDisplayLanguageId: '',
        modificationLoginId: '',
        modificationKnoxId: '',
        modificationUserName: '',
        modificationUserGlobalName: '',
        modificationDepartmentName: '',
        modificationDepartmentGlobalName: '',

      },
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    count() {
      console.log('count increased');
    },
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    // this.loadCode().then(() => {
    this.masterData.moduleCode.key = 'AM';
    this.masterData.codeStructureTypeCode.key = ' ';
    this.loadData();
    // });
  },
  methods: {
    onClickBtnPop() {
      utils.openLayerPopup('PGE_CMZ_00003', this.onPagePopupClose, {
        pageInitialData: {},
        size: 'lg',
      });
    },
    onClickBtnCancel() {
      this.$emit('close');
    },
    loadCode() {
    },
    // get contents data, grid etc..
    loadData() {
      if (utils.isEmpty(this.codeId) === false) {
        this.selectMaster(this.codeId);
      }
    },
    onPagePopupClose(objMaster) {
      if (objMaster) {
        this.masterData.upperCodeId.key = objMaster[0].codeId;
      }
    },
    selectMaster() {
      this.isModification = true;
      this.masterData.codeId = utils.replace(this.codeId, 'COD_', '');

      // 수정화면 (코드 조회)
      http.request(this.pageId, 'DTS_AAI_00011', {
        path: {
          'code-id': `COD_${this.masterData.codeId}`,
        },
      }).then(res => {
        this.masterData.moduleCode.key = res.data.mdleCode;
        this.masterData.subModuleCode.key = res.data.smdleCode;
        this.masterData.codeStructureTypeCode.key = res.data.cdstTypeCode;
        this.masterData.codePhysicalName = res.data.codePhyName;
        this.searchFieldOldText.codePhysicalName = res.data.codePhyName;
        this.masterData.codeContents = res.data.codeContents;
        this.masterData.upperCodeId.key = res.data.upCodeId;

        this.masterData.codeUseYn = res.data.codeUseYn;

        this.masterData.codeMasterMultiLanguageId = res.data.codeMasterMultiLanguageId;

        this.masterData.finalModificationUserId = res.data.finalModificationUserId;
        this.masterData.finalModificationDTM = utils.dateformatToClient(res.data.finalModificationDTM);
        this.masterData.modificationDisplayLanguageId = res.data.modificationDisplayLanguageId;
        this.masterData.modificationLoginId = res.data.modificationLoginId;
        this.masterData.modificationKnoxId = res.data.modificationKnoxId;
        this.masterData.modificationUserName = res.data.modificationUserName;
        this.masterData.modificationUserGlobalName = res.data.modificationUserGlobalName;
        this.masterData.modificationDepartmentName = res.data.modificationDepartmentName;
        this.masterData.modificationDepartmentGlobalName = res.data.modificationDepartmentGlobalName;
      }).catch(error => {
        console.log(error);
      });
    },
    checkCodeId() {
      if (utils.isEmpty(this.masterData.codeId)) {
        let message = '';
        message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CODE_ID'));
        utils.messageBox('warning', message);
        return;
      }
      this.isIdDuplicationCheck = false;

      http.request(this.pageId, 'DTS_AAI_00008', {
        query: {
          codeId: `COD_${this.masterData.codeId}`,
        },
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.isIdDuplicationCheck = true;
          utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID'));
        } else {
          this.isIdDuplicationCheck = false;
          utils.messageBox('warning', this.$t('MSG_ALT_IMG_RGST_ID'));
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onClickBtnSave() {
      // 변수범위가 다름 다른방법 확인중
      let runService = 'DTS_AAI_00009'; // 등록
      if (this.isModification) {
        runService = 'DTS_AAI_00010'; // 수정
      }

      const dataParams = {
        mdleCode: this.masterData.moduleCode.key || '',
        smdleCode: this.masterData.subModuleCode.key || '',
        codeId: `COD_${this.masterData.codeId}`,
        codePhyName: this.masterData.codePhysicalName || '',
        codeContents: this.masterData.codeContents || '',
        cdstTypeCode: this.masterData.codeStructureTypeCode.key || '',
        upCodeId: this.masterData.upperCodeId.key || '',
        codeUseYn: this.masterData.codeUseYn || '',
        delYN: 'N',
        newCodeMasterMultiLanguageId: `COD_${this.masterData.codeId}`,
      };

      // 코드명 다국어 처리
      let objMultiLanguageList = {};

      if (this.isModification) {
        objMultiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      } else {
        const sMultiLanguageId = `COD_${this.masterData.codeId}`;
        // this.masterData.codeMasterMultiLanguageId = sMultiLanguageId;
        objMultiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal(sMultiLanguageId);
      }

      utils.assign(dataParams, { codeNameMultiLanguageList: objMultiLanguageList });

      // form validation
      if (!this.formValidate(this.masterData)) {
        return false;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.pageId, runService, {
          path: {},
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          if(this.isModification){
            this.$emit('updated', dataParams.codeId);
          }else{
            this.$emit('save');
          }
        });
      });

      return true;
    },
    cancelClicked() {
      this.$emit('cancel');
    },
    formValidate(formData) {
      if (utils.isEmpty(formData.moduleCode.key)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE')));
        return false;
      }
      if (utils.isEmpty(formData.subModuleCode.key)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE')));
        return false;
      }
      if (utils.isEmpty(formData.codeId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CODE_ID')));
        return false;
      }
      // eslint-disable-next-line max-len
      if (this.isModification === false && this.isIdDuplicationCheck === false) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_DUPLICATE_CHECK'), this.$t('MSG_TXT_CODE_ID')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value)) === true) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CODE_NAME')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_ALT_GLOBAL_ENM')));
        return false;
      }
      /*
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.chineseChsTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('중국어(간체)')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.chineseChtTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('중국어(번체)')));
        return false;
      }
      */
      if (utils.isEmpty(formData.codePhysicalName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CODE_PHSC_NAME')));
        return false;
      }
      if (utils.isEmpty(utils.trim(formData.codeStructureTypeCode.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CODE_STRT_TYPE')));
        return false;
      }
      if (this.masterData.codeStructureTypeCode.key === '1' || this.masterData.codeStructureTypeCode.key === '2') {
        if (utils.isEmpty(utils.trim(formData.upperCodeId.key))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_UP_CODE_ID')));
          return false;
        }
      }

      if (utils.isEmpty(formData.codeUseYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE')));
        return false;
      }

      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG')));
        return false;
      }

      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG')));
        return false;
      }

      return true;
    },

    onKeyUpInput(event, obj, sCol) {
      if (utils.isEqual(sCol, 'codeId')) {
        this.isIdDuplicationCheck = false;
      }
      if (event.key !== 13) {
        const searchFieldNewText = event.target.value;
        if (searchFieldNewText.length > 0 && utils.isEngNum_(searchFieldNewText) === false) {
          utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
            const has = Object.prototype.hasOwnProperty;
            if (has.call(obj[sCol], 'key')) {
              // eslint-disable-next-line no-param-reassign
              obj[sCol].key = this.searchFieldOldText[sCol];
            } else {
              obj[sCol] = this.searchFieldOldText[sCol]; // eslint-disable-line
            }
          });
        } else {
          obj[sCol] = utils.toUpper(searchFieldNewText);
          this.searchFieldOldText[sCol] = utils.toUpper(searchFieldNewText);
        }
      }
    },

    onSelectTypeCode() {
      if (this.masterData.codeStructureTypeCode.key === '0') {
        this.masterData.upperCodeId.key = '';
      }
    },

    loaded(v) {
      let mdOptionsTemp = [];
      console.log(v);
      
      for (let i=0; i<this.$refs.moduleSubmoduleSelect.mdOptions.length; i++) {
        
        if (this.$refs.moduleSubmoduleSelect.mdOptions[i].codeId == 'AM') {
          mdOptionsTemp.push(this.$refs.moduleSubmoduleSelect.mdOptions[i]);
        }
        /*
        if (this.$refs.moduleSubmoduleSelect.mdOptions[i].codeId == 'AA') {
          mdOptionsTemp.push(this.$refs.moduleSubmoduleSelect.mdOptions[i]);
        }
        */
      }

      this.$refs.moduleSubmoduleSelect.mdOptions = mdOptionsTemp;
      
    },
  },
};
</script>
<style scoped>
.comm_label_1 {
    width: 50px;
  }
</style>
