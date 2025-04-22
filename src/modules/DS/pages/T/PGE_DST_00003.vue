<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_NM')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <sui-text-field
              v-model="templateData.wordName"
              placeholder=""
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="inputValidation(templateData.wordName,'wordName')"
            />
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_PHSC_NM')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <sui-text-field
              v-model="templateData.wordPhysicalName"
              placeholder=""
              maxlength="5"
              :disabled="false"
              :clearable="true"
              :readonly="false"
              @keyup="inputValidation(templateData.wordPhysicalName,'wordPhysicalName')"
              @blur="makeProperWordId(templateData.wordPhysicalName)"
            />
            <div class="comp_spacing" />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              @click="duplicateCheckRequest"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_EN_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="templateData.wordNameEn"
              placeholder=""
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_TYP_NM')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <sui-code-select
              ref="wordTypeCombo"
              :selected="selectData.COD_WRD_TYPE_DIV"
              :pageId="this.$options.name"
              codeId="COD_WRD_TYPE_DIV"
              :disabled="false"
              @list-clicked="onChangeWordType(selectData.COD_WRD_TYPE_DIV)"
            />
          </div>
          <div
            v-show="showClsfDomLabel"
            class="col-xs-2"
          >
            <sui-input-label
              :label="$t('MSG_TXT_DOM_CTGR_CON')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div
            v-show="showClsfDomLabel"
            class="col-xs-4"
          >
            <sui-text-field
              v-model="templateData.domainClassificationName"
              placeholder=""
              default
              value
              :disabled="true"
              :clearable="true"
              :readonly="false"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="templateData.domainName"
              :disabled="true"
              :clearable="true"
              fixed-icon
              @click="showRetrieveCall(selectData.COD_WRD_TYPE_DIV.key)"
            />
          </div>
          <div
            v-show="!showClsfDomLabel"
            class="col-xs-2"
            nodata
          />
          <div
            v-show="!showClsfDomLabel"
            class="col-xs-4"
          />
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CHIN')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="templateData.chineseCharacterWord"
              placeholder=""
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_SRC')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea v-model="templateData.wordSource" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_DSCR')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea v-model="templateData.wordsContent" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_APPL_CNTN')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea v-model="templateData.wordApplicationContent" />
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TIT_SYNO_LIST') }}</h4>
      </div>
      <sui-s-grid
        ref="gridListRelatedTerms"
        :data-source="dataset0"
        :headers="gridColumns0"
        :initialRowsPerPage="5"
        :showRowsPerPageControl="false"
        width="100%"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCloseClick"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="resetFunction"
        >
          {{ $t('MSG_BTN_RESET') }}
        </sui-button>
        <sui-button
          v-permission:create="'PGE_DST_00003'"
          type="button"
          class="comm_btn_solid"
          @click="validateFields"
        >
          {{ $t('MSG_BTN_APPL') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import p05 from './PGE_DST_00014';

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_DST_00003',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    p05,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    closePagePopup: {
      type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    pageInitialData: {
      type: Object,
    },
  },
  data() {
    return {
      pageId: 'PGE_DST_00002',
      duplicateCheckValue: '',
      showRetrievePopup: false,
      showClsfDomLabel: false,
      templateData: {
        domainClassificationId: '',
        domainName: '',
        wordsContent: '',
        applicationUserId: this.$store.getters.userInfo.knoxId,
        chineseCharacterWord: '',
        wordApplicationContent: '',
        wordNameEn: '',
        wordPhysicalName: '',
        wordName: '',
        wordSource: '',
        domainClassificationName: '',
        domainId: '',
      },
      gridColumns0: [],
      dataset0: new urDataSet(),
      selectData: {
        COD_WRD_TYPE_DIV: { label: '', key: '' },
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_WRD_NM'),
        value: 'similarityWordName',
      },
      {
        text: this.$t('MSG_TXT_WRD_DSCR'),
        value: 'similarityWordContent',
      },
    ];
  },
  mounted() {
    if (this.pageInitialData && this.pageInitialData.value) {
      this.templateData.wordName = this.pageInitialData.wordName;
    }
    if (this.pageInitialData && this.pageInitialData.value) {
      this.pageId = this.pageInitialData.content;
    } else {
      this.pageId = 'PGE_DST_00002';
    }
  },
  methods: {
    showRetrieveCall(value) {
      if (value === '1') {
        utils.openLayerPopup('PGE_DST_00014', this.onPagePopupCallback, {
          size: 'lg',
        });
        this.showRetrievePopup = true;
      }
    },
    onChangeWordType(value) {
      if (value.key === '0') {
        this.templateData.domainClassificationId = '';
        this.templateData.domainClassificationName = '';
        this.templateData.domainName = '';
        this.templateData.domainId = '';
        this.showClsfDomLabel = false;
      } else {
        this.showClsfDomLabel = true;
      }
    },
    resetFunction() {
      for (const key in this.templateData) {
        this.templateData[key] = '';
      }
      this.$refs.wordTypeCombo.reset();
      this.dataset0.data = [];
    },

    makeProperWordId(value) {
      this.templateData.wordPhysicalName = utils.toUpper(value);
      const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;

      if (regex.test(value)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null));
        this.templateData.wordPhysicalName = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
      }
    },
    specialChar(value, inputName) {
      // function need to be change
      this.duplicateCheckValue = false;
      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SPC_LTTR'), null));
        if (inputName === 'wordName') { this.templateData.wordName = ''; }
        if (inputName === 'wordPhysicalName') { this.templateData.wordPhysicalName = ''; }
      }
    },
    wordDuplicateCheck(value) {
      const wordPhysicalNameValue = this.templateData.wordPhysicalName;
      if (!this.templateData.wordName.trim()) { // MSG_ALT_INPUT_CELL
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_WRD_NM')));
        return true;
      }
      if (!this.templateData.wordPhysicalName.trim()) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_WRD_PHSC_NM')));
        return true;
      }
      if (String(this.templateData.wordPhysicalName).length > 5) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_WRD_LEN_LMIT'), null));
        return true;
      // eslint-disable-next-line radix
      } 
      if (this.templateData.wordPhysicalName.length > 0 && parseInt(wordPhysicalNameValue.charAt(0))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_WRD_PHSC_FNU'), null));
        return true;
      }
      if (value) { this.sumbitFunction(); }
      return false;
    },
    // prohibited word
    isProhibitedWords() {
      const queryParams = { 'word-name': this.templateData.wordName };
      http.request('PGE_DST_00003', 'DTS_DST_00087', {
        query: queryParams,
      })
        // eslint-disable-next-line consistent-return
        .then(res => {
          if (res.data.resultCode === '1') {
            utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_IS_PRHB_WRD'), null));
            return false;
          } this.isSynonymWord();
        });
    },
    // similar word list
    isSynonymWord() {
      const queryParams = { 'word-name': this.templateData.wordName };
      http.request('PGE_DST_00003', 'DTS_DST_00088', {
        query: queryParams,
      })
        // eslint-disable-next-line consistent-return
        .then(res => {
          if (res.data.resultCode === '1') {
            utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_IS_SML_WRD'), null));
            return false;
          } this.wordDuplicateCheck(true);
        });
    },
    inputValidation(value, word) {
      this.specialChar(value, word);
      this.synonymList(value);
    },
    // display similar word list
    synonymList(word) {
      const queryParams = { 'word-name': word };
      http.request('PGE_DST_00003', 'DTS_DST_00089', {
        query: queryParams,
      })
        .then(res => {
          this.dataset0.setData(res.data);
        })
        .catch(error => {
          console.log('error occured during search click');
        });
    },
    duplicateCheckRequest() {
      // this.synonymList(this.templateData.wordName);
      if (this.wordDuplicateCheck(false)) {
        return false;
      }
      http.request(this.pageId, 'DTS_DST_00016', {
        query: {
          'word-id': this.templateData.wordPhysicalName,
          'word-name': this.templateData.wordName,
        },
      }).then(res => {
        if (res.data.resultCode <= 0) {
          this.duplicateCheckValue = true;
          // utils.messageBox('information',this.$t('MSG_ALT_DATA_NOT_FOUND'), null, null);
          const msg = utils.strFormat(this.$t('MSG_ALT_USE_PSBL'), this.$t('MSG_TXT_WRD_PHSC_NM'));
          utils.messageBox('success', msg, null, () => {
            this.duplicateCheck = true;
          });
        } else if (res.data.resultCode > 0) {
          const itmNm = (res.data.resultCode === 1 ? this.$t('MSG_TXT_WRD_NM') : this.$t('MSG_TXT_WRD_PHSC_NM'));
          const msg = utils.strFormat(this.$t('MSG_ALT_DUP_NCELL'), itmNm);

          utils.messageBox('warning', msg);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    validateFields() {
      if (this.templateData.wordName) {
        this.isProhibitedWords();
      } else if (this.wordDuplicateCheck(true)) { return false; }
    },
    sumbitFunction(value) {
      if (!this.duplicateCheckValue) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_DUP'), null));
      } else if (this.selectData.COD_WRD_TYPE_DIV.key === '1' && !this.templateData.domainClassificationId) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_IS_CLSF'), null));
      } else if (!this.templateData.wordsContent.trim()) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_WRD_DESC'), null));
      } else if (!this.templateData.wordApplicationContent.trim()) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_APPL_CNTN'), null));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_APPY'), null, this.confirmRouter);
      }
    },
    confirmRouter() {
      if (utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'), 'Y')) {
        this.personInChargeList();
      } else {
        this.submitRequestApi();
      }
    },
    submitRequestApi(approvalData) {
      const queryParams = {
        domainClassificationID: this.templateData.domainClassificationId,
        domainClassificationName: this.templateData.domainClassificationName,
        domainName: this.templateData.domainName,
        domainId: this.templateData.domainId,
        wordChineseCharacters: this.templateData.chineseCharacterWord,
        wordApplicationContent: this.templateData.wordApplicationContent,
        wordEnglishName: this.templateData.wordNameEn,
        wordId: this.templateData.wordPhysicalName,
        wordName: this.templateData.wordName,
        wordSource: this.templateData.wordSource,
        wordTypeCode: this.selectData.COD_WRD_TYPE_DIV.key,

        wordContent: this.templateData.wordsContent,
        approvalData: null,
      };

      // 결재 상신 정보가 있으면 결재상신 정보 병합.
      if (!utils.isEmpty(approvalData)) {
        utils.assign(queryParams, { approvalData });
      }

      http.request(this.pageId, 'DTS_DST_00011', {

        data: queryParams,
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.conFirm('success', this.$t('MSG_ALT_PRGS_OK'), null);
        } else {
          this.conFirm('warning', this.$t('MSG_ALT_IS_EXISTS_APPL'), null);
        }
        this.closePagePopup();
      }).catch(error => {
        console.log(error);
      });
    },
    onPopupCancelClicked() {
      this.$emit('exit', true);
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onPagePopupCallback(value) {
      if (value) {
        this.templateData.domainClassificationId = value.domainClassificationID;
        this.templateData.domainClassificationName = value.domainClassificationName;
        this.templateData.domainName = value.domainName;
        this.templateData.domainId = value.domainId;
      }
      this.onPopupCancelClicked();
    },
    onCloseClick() {
      this.closePagePopup('');
    },
    /**
     * 결재 담당자 조회 및 생성
     */
    personInChargeList() {
      http.request('PGE_DST_00003', 'DTS_CMZ_00136', {
        path: {
          'pic-type-id': 'PIC_DST_DATA_STD_APRV',
        },
        query: {
        },
      }).then(res => {
        const personInChargeList = [];
        utils.forEach(res.data, obj => {
          const userInfo = {
            userId: obj.userId,
            aprvCode: obj.rightApprovalCode,
          };
          personInChargeList.push(userInfo);
        });
        this.onAprvClick(personInChargeList);
      });
    },

    /*
     * 결재 상신 팝업
     */
    onAprvClick(personInChargeList) {
      const objTemplate = {
        templateId: 'TMP_DST_APRV_DOC_WRD',
        siteId: this.$store.getters.userInfo.siteId,
        langId: this.$store.getters.userInfo.langId,
        datatStdDivNm: this.$t('MSG_TXT_WRD'),
        datatStdApplDivNm: this.$t('MSG_TXT_NEW'),
        applUserNm: this.$store.getters.userInfo.userName,
        dataStdApplCntn: this.templateData.wordApplicationContent,
        dataStdNm: this.templateData.wordName,
        dataStdId: this.templateData.wordPhysicalName,
        dataStdEnNm: this.templateData.wordNameEn,
        wrdTypeDivNm: this.selectData.COD_WRD_TYPE_DIV.label,
        domClsfNm: this.templateData.domainClassificationName,
        domNm: this.templateData.domainName,
        stdWrdChinCntn: this.templateData.chineseCharacterWord,
        stdSrcCntn: this.templateData.wordSource,
        dataStdCntn: this.templateData.wordsContent,
        tcdmDqIfList: [],
      };

      utils.openLayerPopup('PGE_CMZ_00012', this.aprvPopupCallback, {
        pageInitialData: {
          // 필수: 업무코드, 업무결재Id
          taskId: 'TSK_CM006003',
          taskApprovalId: 'uid',

          // 결재 제목
          // eslint-disable-next-line max-len
          title: `${this.$t('MSG_TXT_DST_APRV_PRFX')} ${this.$t('MSG_TXT_WRD')} ${this.$t('MSG_TXT_NEW')} (${this.$t('MSG_TXT_STD_LGC_NM')} : ${this.templateData.wordName})`,
          titleReadonly: true,

          // 결재 Route
          // 선택:담당자그룹Id로 결재자 조회시 사용
          aprvUsers: personInChargeList,
          popupRoutesModify: false,
          knoxRoutesModify: false,

          // 선택: 첨부파일 DocId
          // attachDocumentId: [],
          //* 결제에 첨부파일을 등록할경우 모듈 코드 값이 필수
          // moduleCode: 'CM',

          attachModify: false,
          // 결재본문
          objTemplate,
          contentsModify: false,

        },
        size: 'xlg',
      });
    },

    /*
     * 결재 상신 팝업 callback
     */
    aprvPopupCallback(objAprv) {
      if (utils.isEmpty(objAprv) === false) {
        this.submitRequestApi(objAprv);
      }
    },
  },
};

</script>
<style scoped>
</style>
