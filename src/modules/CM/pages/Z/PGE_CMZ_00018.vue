<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="comm_ListTB">
          <table
            width="100%"
            border="0"
          >
            <colgroup>
              <col width="120px">
              <col width>
              <col width="70px">
              <col width="120px">
            </colgroup>
            <tbody>
              <tr>
                <th>{{ this.$t('MSG_TXT_LANG') }}</th>
                <th colspan="2">
                  {{ this.$t('MSG_TXT_MLNG_CNTN') }}
                </th>
                <th>{{ this.$t('MSG_TIT_BK_APPLY') }}</th>
              </tr>
              <tr
                v-for="(itm,index) in mlngList"
                :key="index"
              >
                <td>{{ itm.langName }}</td>
                <td>
                  <sui-text-field
                    v-model="itm.multiLanguageContent"
                    width="100px"
                    :disabled="pageInitialData.disabled"
                    :readonly="pageInitialData.readonly"
                    :trim="true"
                    maxlength="1000"
                  />
                </td>
                <td>
                  <sui-button
                    type="button"
                    class="btn_innerTbl_border"
                    @click="onButtonMoreClick1(itm)"
                  >
                    {{ getButtonLabel() }}
                  </sui-button>
                </td>
                <td>
                  <sui-button
                    v-if="itm.langId==globalLangId && pageInitialData.readonly === false && pageInitialData.disabled === false"
                    type="button"
                    class="btn_innerTbl_border"
                    @click="onClickBkApplyBtn"
                  >
                    {{ $t('MSG_TIT_BK_APPLY') }}
                  </sui-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-if="pageInitialData.disabled === false && pageInitialData.readonly === false"
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onConfirm"
        >
          {{ $t("MSG_BTN_CFRM") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_CMZ_00018', // eslint-disable-line vue/name-property-casing

  props: {
    closePagePopup: {
      type: Function,
      default: null,
    },
    pageInitialData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      // 로컬 언어 ID
      localLangId: {
        type: String,
        required: true,
        default() {
          return 'ko';
        },
      },
      // 글로벌 언어 ID
      globalLangId: {
        type: String,
        required: true,
        default() {
          return 'en';
        },
      },
      // 조회 모드( 편집 안됨)
      disabled: false,
      readonly: false,
      // 다국어 object array
      mlngList: [],
    }; // return
  }, // data

  mounted() {
    // 로컬 언어 ID
    this.localLangId = this.pageInitialData.localLangId;
    // 글로벌 언어 ID
    this.globalLangId = this.pageInitialData.globalLangId;
    // 조회 모드( 편집 안됨)
    this.disabled = this.pageInitialData.disabled;
    this.readonly = this.pageInitialData.readonly;
    // data.mlngList 다시 셋팅하고 그리드 재바인딩
    this.mlngList = utils.cloneDeep(this.pageInitialData.mlngMsg);

    // global 언어를 최상단으로
    for (let i = 0; i < this.mlngList.length; i++) {
      if (this.mlngList[i].langId == this.globalLangId) {
        const _tmpObj = this.mlngList[i];
        this.mlngList.splice(i, 1);
        this.mlngList.splice(0, 0, _tmpObj);
      }
    }

    // local 언어를 최상단으로
    for (let i = 0; i < this.mlngList.length; i++) {
      if (this.mlngList[i].langId == this.localLangId) {
        const _tmpObj = this.mlngList[i];
        this.mlngList.splice(i, 1);
        this.mlngList.splice(0, 0, _tmpObj);
      }
    }
  },
  methods: {
    getButtonLabel() {
      let _label = this.$t('MSG_BTN_EDIT');
      if (this.pageInitialData.disabled || this.pageInitialData.readonly) {
        _label = this.$t('MSG_BTN_VIEW');
      }
      return _label;
    },
    /**
     * 다국어 값 변경 팝업
     */
    onButtonMoreClick1(itm) {
      const _disabled = this.pageInitialData.disabled || this.pageInitialData.readonly;
      utils.openTextAreaEditor(chgVal => {
        if (chgVal != null) {
          itm.multiLanguageContent = chgVal;
        }
      },
      {
        title: `${itm.langName}-${this.$t('MSG_TXT_MLNG_CNTN')}`,
        size: 'sm',
        pageInitialData: {
          value: itm.multiLanguageContent,
          maxlength: 1000,
          readonly: _disabled,
          positiveButtonText: this.$t('MSG_BTN_CFRM'),
          negativeButtonText: this.$t('MSG_BTN_CANCEL'),
        },
      });
    },
    /**
     * 다국어 약어 변경 팝업
     */
    onButtonMoreClick2(itm) {
      const _disabled = this.pageInitialData.disabled || this.pageInitialData.readonly;
      utils.openTextAreaEditor(chgVal => {
        if (chgVal != null) {
          itm.multiLanguageAbbreviationContent = chgVal;
        }
      },
      {
        title: `${itm.langName}-${this.$t('MSG_TXT_MLNG_ABB_CNTN')}`,
        size: 'sm',
        pageInitialData: {
          value: itm.multiLanguageAbbreviationContent,
          maxlength: 1000,
          readonly: _disabled,
          positiveButtonText: this.$t('MSG_BTN_CFRM'),
          negativeButtonText: this.$t('MSG_BTN_CANCEL'),
        },
      });
    },
    /**
     * 일괄적용버튼 click event handler
     * 다국어 값들 중 비어있는 값과 약어에 현재 Global 언어로 셋팅된 값을 일괄 복사
     * local 언어로 설정된 값은 복사대상이 아님
     * @function onClickBkApplyBtn
     * @returns {Array} : 다국어 Object Array
     */
    onClickBkApplyBtn() {
      // Global 언어 가져오기
      const globalLang = utils.find(this.mlngList, { langId: this.globalLangId });
      utils.forEach(this.mlngList, itm => {
        // 다국어 값이 비어있을 경우 global 약어 값으로 채움
        if (utils.isEmpty(itm.multiLanguageContent)) {
          itm.multiLanguageContent = globalLang.multiLanguageContent;
        }
        // 다국어 약어 값이 비어있을 경우 global 언어 약어 값으로 채움
        if(utils.isEmpty(itm.multiLanguageAbbreviationContent)) {
          itm.multiLanguageAbbreviationContent = globalLang.multiLanguageAbbreviationContent;
        }
      });
    },
    onClose() {
      // 입력한 내용을 삭제하고 작업을 종료합니다. 계속하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_CFRM_CNTN_DEL'),
        () => {
          this.closePagePopup('');
        });
    },
    /**
     * 확인 버튼 click event handler
     * @function onConfirm
     * @returns {Array} : 다국어 Object Array
     */
    onConfirm() {
      // 언어값이 비어있을 경우 global 언어값으로 자동 채움
      this.onClickBkApplyBtn();

      const tmpmlngList = utils.cloneDeep(this.mlngList);

      tmpmlngList.forEach(itm => {
        delete itm.buttonList;
      });

      this.closePagePopup(tmpmlngList);
    },
    onCancel() {
      this.onClose();
    },
  },
};

</script>

<style>
</style>
