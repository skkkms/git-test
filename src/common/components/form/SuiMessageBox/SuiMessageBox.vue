<template>
  <sui-modal ref="fdp-model" v-model="isModalShow" :prevent-outside-close="preventOutsideClose">
    <div class="sui-confirm" :class="typeClass">
      <div class="sui-messagebox__icon-area" />
      <div class="sui-messagebox__message-area">
        {{ message }}
      </div>
      <div v-if="subMessage !== ''" class="sui-messagebox__sub-message-wrapper" :class="classes">
        <div class="sui-messagebox__sub-message">
          {{ subMessage }}
        </div>
      </div>
      <div v-if="link.url" class="sui-messagebox__link-message-wrapper" :class="classes">
        <a class="sui-messagebox__link-message" :href="link.url">{{ link.text }}</a>
      </div>
      <div v-if="content !==''" class="sui-messagebox__custom-message-wrapper" :class="classes">
        <p class="sui-messagebox__custom-message">
          {{ content }}
        </p>
      </div>
      <div v-if="logs.length" class="sui-messagebox__custom-message-wrapper" :class="classes">
        <p v-for="(log, logIndex) in logs"
           :key="logIndex"
           class="sui-messagebox__custom-message"
        >
          {{ log }}
        </p>
      </div>
      <slot />
      <div class="sui-messagebox__button-area">
        <button v-for="(button, buttonIndex) in customButtons"
                :key="buttonIndex"
                type="button" class="sui-messagebox__button--negative"
                @click="onCustomButtonClick(button)"
        >
          {{ button.label }}
        </button>
        <button v-if="type==='confirm'" type="button" class="sui-messagebox__button--negative"
                @click="onNegativeBtn"
        >
          {{ negativeButtonLabel }}
        </button>
        <button ref="posbtn" type="button" class="sui-messagebox__button--positive"
                @click="onPositiveBtn"
        >
          {{ positiveButtonLabel }}
        </button>
      </div>
    </div>
  </sui-modal>
</template>

<script>
export default {
  name: 'SuiMessageBox',
  props: {
    selfDestroy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalShow: false,
      preventOutsideClose: false,
      type: 'confirm', // 'confirm', 'info', 'success', 'warning', 'error',
      message: utils.getMessageById('MSG_ALT_DO_DELETE'), // 삭제 하시겠습니까?
      subMessage: '총괄 메세지는 기본 메세지 입니다',
      link: { text: 'www.samsung.com', url: 'http:///www.naver.com' },
      logs: [
        '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류', '대상정보 일괄 등록 오류'],
      customButtons: {
        type: Array,
        default() {
          return []; // [{label: 'btn',handler: () => {}}, {label: 'btn2', handler: () => {}}]
        },
      },
      positiveButtonLabel: utils.getMessageById('MSG_BTN_CFRM'), // 확인
      negativeButtonLabel: utils.getMessageById('MSG_BTN_CANCEL'), // 취소
      positiveButtonHandler: null,
      negativeButtonHandler: null,
      content: '',
    };
  },
  computed: {
    classes() {
      if (this.textAlign === 'left') {
        return { 'sui-messagebox__message--left': true };
      }
      if (this.textAlign === 'right') {
        return { 'sui-messagebox__message--right': true };
      }
      return { 'sui-messagebox__message--center': true };
    },
    typeClass() {
      return `sui-messagebox__${this.type}`;
    },
  },
  watch: {
    isModalShow() {
      if (this.selfDestroy && !this.isModalShow) {
        this.$destroy();
      }
    },
  },
  beforeDestroy() {
    this.$root.$el.parentNode.removeChild(this.$root.$el);
  },
  methods: {
    onNegativeBtn() {
      if (this.negativeButtonHandler) {
        this.negativeButtonHandler();
      }
      this.clearData();
      this.isModalShow = false;
    },
    onPositiveBtn() {
      if (this.positiveButtonHandler) {
        this.positiveButtonHandler();
      }
      this.clearData();
      this.isModalShow = false;
    },
    onCustomButtonClick(button) {
      if (button.handler) {
        button.handler(button);
      }
      this.clearData();
      this.isModalShow = false;
    },
    customButtonClass(button) {
      if (button.type === 'positive') {
        return 'sui-confirm__button--positive';
      }
      return 'sui-confirm__button--negative';
    },
    clearData() {
      this.message = '';
      this.subMessage = '';
      this.content = '';
      this.link = {};
      this.logs = [];
      this.customButtons = [];
    },
    initData(type, message, subMessage) {
      this.type = type;
      this.message = message;
      this.subMessage = '';
      this.content = '';
      this.link = {};
      this.logs = [];

      this.positiveButtonLabel = utils.getMessageById('MSG_BTN_CFRM'); // 확인
      this.negativeButtonLabel = utils.getMessageById('MSG_BTN_CANCEL'); // 취소

      if (type === 'confirm') {
        this.positiveButtonLabel = utils.getMessageById('MSG_TXT_YES'); // 예
        this.negativeButtonLabel = utils.getMessageById('MSG_TXT_NO'); // 아니오
      }

      if (subMessage) {
        if (subMessage.constructor.name === 'String') {
          this.subMessage = subMessage;
        } else if (subMessage.constructor.name === 'Array') {
          this.logs = [...subMessage];
        } else if (subMessage.constructor.name === 'Object') {
          if (subMessage.hasOwnProperty('text') && subMessage.hasOwnProperty('url')) {
            this.link = { ...subMessage };
          } else if (subMessage.hasOwnProperty('title') && subMessage.hasOwnProperty('content')) {
            this.subMessage = subMessage.title;
            if (subMessage.content) {
              this.content = subMessage.content;
            }
          }
        }
      }

      const cfgCmpSystemTitle = utils.getConfigurationValue('CFG_CMP_SYSTEM_TITLE');
      if (!message && !subMessage) {
        this.message = cfgCmpSystemTitle;
      } else if (!message) {
        this.message = cfgCmpSystemTitle;
        this.subMessage = subMessage;
      } else if (!subMessage) {
        this.message = cfgCmpSystemTitle;
        this.subMessage = message;
      }

      // if (subMessage.constructor.name === 'string') {
      //   this.subMessage = subMessage;
      // } else if (subMessage !== null && typeof subMessage === 'object') {
      //   if (subMessage.length) {
      //     this.logs = [...subMessage];
      //   } else if(subMessage.hasOwnProperty('text') && subMessage.hasOwnProperty('url')) {
      //     this.link = {...subMessage};
      //   }
      // }
      this.positiveButtonHandler = null;
      this.negativeButtonHandler = null;
      this.customButtons = [];
    },
    show(type, message, subMessage, positiveButtonHandler, negativeButtonHandler, customButtons = []) {
      this.initData(type, message, subMessage);
      this.positiveButtonHandler = positiveButtonHandler;
      this.negativeButtonHandler = negativeButtonHandler;
      this.customButtons = customButtons;
      this.isModalShow = true;
      this.$nextTick(() => {
        this.$refs.posbtn.focus();
      });
    },
    isActivate() {
      return this.isModalShow;
    },
  },
};
</script>

<style>

</style>
