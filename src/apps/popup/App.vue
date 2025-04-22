<template>
  <div id="app">
    <frame :hideMenus="true" />
    <sui-confirm v-model="confirm.show" :message="confirm.message" :title="confirm.title" :type="confirm.type"
             :negative-button-label="confirm.nagativeBtnText" :positive-button-label="confirm.positiveBtnText"
             @on-positive="onPositive" @on-negative="onNegative" prevent-outside-close></sui-confirm>
    <div ref="messagebox-container">
      <sui-message-box ref="messagebox" />
    </div>
    <sui-prompt ref="prompt"/>
    <sui-component-portal />
    <sui-loading-indicator />
    <sui-notice-controller :enable-app-notice="false" />
  </div>
</template>

<script>
import Frame from '~common/components/layout/SuiFrame/SuiFrame';

export default {
  name: 'Popup',
  components: {
    frame: Frame,
  }, 
  data() {
    return {
      portalData: {
        data: '',
      },
      keepPages: [],
      confirm: {
        title: '',
        show: false,
        message: '',
        positiveBtnText: '',
        nagativeBtnText: '',
        buttons: [],
      },
      prompt: {
        title: '',
        show: false,
        text: '',
        positiveBtnText: '확인',
        nagativeBtnText: '취소',
      },
      toastMessage: '',
    };
  },
  mounted() {
    window.utils.install('alert', this.openOKConfirm);
    window.utils.install('confirm', this.openConfirm);
    window.utils.install('success', this.openSuccessConfirm);
    window.utils.install('warning', this.openWarningConfirm);
    window.utils.install('error', this.openErrorConfirm);
    window.utils.install('information', this.openInformationConfirm);
    window.utils.install('messageBox', this.messageBox);
    window.utils.install('prompt', this.openPrompt);

    // FIXME: 이름 수정되면 삭제 예정. windows.utils 로 대체되면 삭제 예정.
    window.util.openConfirm = this.openConfirm;
    window.util.openOKConfirm = this.openOKConfirm;
    
    this.bindEvents();  
  },  
  beforeDestroy() {
    this.unbindEvents();
  },
  methods: {    
    bindEvents() {
      window.addEventListener('resize', this.onResize);
      window.addEventListener('keydown', this.onDocumentKeydown);
    },
    unbindEvents() {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('keydown', this.onDocumentKeydown);
    },
    onDocumentKeydown(event) {
      if (event.keyCode === 8) {
        let doPrevent = true;
        const types = ["text", "password", "file", "search", "email", "number", "date", "color", "datetime", "datetime-local", "month", "range", "search", "tel", "time", "url", "week"];
        const d = $(event.srcElement || event.target);
        const disabled = d.prop("readonly") || d.prop("disabled");
        if (!disabled) {
          if (d[0].isContentEditable) {
            doPrevent = false;
          } else if (d.is("input")) {
            let type = d.attr("type");
            if (type) {
              type = type.toLowerCase();
            } else {
              type = "text";
            }
            if (types.indexOf(type) > -1) {
              doPrevent = false;
            }
          } else if (d.is("textarea")) {
            doPrevent = false;
          }
        }
        if (doPrevent) {
          event.preventDefault();
          return false;
        }
      }
    },
    fireResizeEvent() {
      let event = null;
      if (window.navigator.userAgent.indexOf('Chrome') >= 0) {
        event = new Event('resize');
      } else {
        event = window.document.createEvent('UIEvents');
        event.initUIEvent('resize', true, false, window, 0);
      }
      window.dispatchEvent(event);
    },
    onPositive() {
      if (this.confirmHandlers.positive) {
        this.confirmHandlers.positive();
      }
    },
    onNegative() {
      if (this.confirmHandlers.negative) {
        this.confirmHandlers.negative();
      }
    },
    openConfirm(message, positiveBtnText = "확인", nagativeBtnText = "취소", handlerPositive = null, handlerNegative = null, title = '확인', type = 'confirm') {
      this.confirmHandlers = {
        positive: handlerPositive,
        negative: handlerNegative
      };
      this.confirm.type = type;
      this.confirm.title = title;
      this.confirm.message = message;
      this.confirm.positiveBtnText = positiveBtnText;
      this.confirm.nagativeBtnText = nagativeBtnText;
      this.confirm.buttons = [];
      this.confirm.show = true;
    },
    openOKConfirm(message, positiveBtnText ="OK", handlerPositive) {
      this.openConfirm(message, positiveBtnText, null, handlerPositive, null, '');
    },
    openSuccessConfirm(message, handler) {
      this.openConfirm(message, undefined, null, handler, null, '완료', 'success');
    },
    openWarningConfirm(message, handler) {
      this.openConfirm(message, undefined, null, handler, null, '주의', 'warning');
    },
    openErrorConfirm(message, handler) {
      this.openConfirm(message, undefined, null, handler, null, '오류', 'error');
    },
    openInformationConfirm(message, handler) {
      this.openConfirm(message, undefined, null, handler, null, '정보', 'information');
    },
    openPrompt(title, text, handlerPositive, handlerNegative) {
      this.$refs.prompt.show(title, text, handlerPositive, handlerNegative);
    },
    messageBox(type, message, subMessage, handlerPositive, handlerNegative, customButtons)  {
      let messagebox = this.$refs.messagebox;
      if (messagebox.isActivate()) { // messagebox 내부에서 messagebox를 오픈하는 경우
        const propsData = { selfDestroy: true };
        const componentInstance = utils.createComponent('sui-message-box', propsData, this.$refs['messagebox-container']);
        messagebox = componentInstance;
      }
      if (messagebox) {
        messagebox.show(type, message, subMessage, handlerPositive, handlerNegative, customButtons);
      }
    },
  }
};
</script>
