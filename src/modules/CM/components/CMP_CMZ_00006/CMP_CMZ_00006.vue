<template>
  <span class="receive_type">
    <sui-button
      v-for="(btn,index) in btnInfo"
      :key="index"
      type="button"
      class="btn_receive_typeA"
      :class="getStyleClass(btn)"
      :disabled="disabled"
      @click="onClickButton(btn)"
    >
      {{ btn.label }}
    </sui-button>
  </span>
</template>

<script>

export default {
  name: 'CmpExclusiveButtonGroup',
  model: {
    prop: 'selectedKey',
    event: 'click',
  },
  props: {
    // 이 컴포넌트를 사용하는 페이지ID, 데이터서비스 호출시 사용
    pageId: {
      type: String,
      required: true,
    },
    // 배치: 가로형/세로형
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 편집 가능 여부
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 버튼 key-label 배열
    btnInfo: {
      type: Array,
      required: true,
      default() {
        return [
          {
            key: '1',
            label: this.$t('MSG_TXT_RECP'),
            btnOnClass: 'emailRcpt_hBtn_on',
          },
          {
            key: '2',
            label: this.$t('MSG_TXT_REF'),
            btnOnClass: 'emailRcpt_hBtn_on',
          },
          {
            key: '3',
            label: this.$t('MSG_TXT_SCRT'),
            btnOnClass: 'emailRcpt_hBtn_on',
          },
        ];
      },
      // 선택된 key
      selectedKey: {
        type: String,
        required: false,
        default() {
          return '';
        },
      },
    },
    // style class
    styleClass: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      selectedLabel: '',
    };
  },
  watch: {
  },
  mounted() {
    this.reset();
  },
  methods: {
    /**
     * @function reset
     * @returns {None}
     */
    reset() {
    },
    /**
     *
     * @function getStyleClass
     * @returns {String}
     */
    getStyleClass(btn) {
      let _styleClass = this.styleClass;
      if (btn.key == this.$attrs.selectedKey) {
        _styleClass = `${_styleClass} ${utils.isEmpty(btn.btnOnClass) ? 'emailRcpt_hBtn_on' : btn.btnOnClass}`;
      }
      return _styleClass;
    },
    /**
     * 버튼 click event handler
     * @function onClickButton
     * @returns {None}
     */
    onClickButton(selectedButton) {
      // this.selectedKeyLocal = selectedButton.key;
      this.selectedLabel = utils.find(this.btnInfo, { key: selectedButton.key }).label;
      this.$emit('click', selectedButton.key);
    },
    /**
     * 선택된 버튼 정보를 반환
     * @function getSelectedButton
     * @returns {Object}
     */
    getSelectedButton() {
      return {
        key: this.selectedKeyLocal,
        label: this.selectedLabel,
      };
    },
  },
};
</script>

<style lang="css" scoped>
/*TODO: 공식 스타일 나오면 이 부분은 삭제 해야 함*/
.emailRcpt_hBtn_off { background-color: #fff !important}         /*A 기본*/
.emailRcpt_hBtn_on { background-color: #E4E9F4 !important}       /*A 선택*/
.emailRcpt_toBtn_on { background-color: #536dc2 !important;color:#fff}     /*B 수신*/
.emailRcpt_ccBtn_on { background-color: #60a3ef !important;color:#fff}     /*B 참조*/
.emailRcpt_bccBtn_on { background-color: #818181 !important;color:#fff}    /*B 비밀*/
.emailRcpt_bBtn_off { background-color: #fff !important}         /*B default*/
</style>
