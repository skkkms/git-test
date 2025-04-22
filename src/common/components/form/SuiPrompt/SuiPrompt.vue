<template>
  <sui-modal v-model="isModalShow" :prevent-outside-close="preventOutsideClose">
    <div class="sui-confirm" :class="typeClass">        
      <div class="sui-messagebox__message-area">
        {{ message }}
      </div>
      <sui-text-field v-model="text" />
      <slot></slot>
      <div class="sui-messagebox__button-area">
        <button v-if="type==='confirm'" type="button" @click="onNegativeBtn"
                class="sui-messagebox__button--negative">{{ negativeButtonLabel }}</button>
        <button ref="posbtn" type="button" @click="onPositiveBtn"
                class="sui-messagebox__button--positive">{{ positiveButtonLabel }}</button>
      </div>
    </div>
  </sui-modal>
</template>

<script>

import _ from 'lodash';

export default {
  name: 'SuiPrompt',
  data () {
    return {
      isModalShow: false,
      preventOutsideClose: false,
      type: 'confirm', // 'confirm', 'info', 'success', 'warning', 'error',
      message: utils.getMessageById('MSG_ALT_DEL'),
      positiveButtonLabel: utils.getMessageById('MSG_BTN_CFRM'),
      negativeButtonLabel: utils.getMessageById('MSG_BTN_CANCEL'),
      positiveButtonHandler: null,
      negativeButtonHandler: null,
      text: '',
    }
  },
  computed: {
    classes () {
      if (this.textAlign === 'left') return {'sui-messagebox__message--left': true}
      else if (this.textAlign === 'right') return {'sui-messagebox__message--right': true}
      else return {'sui-messagebox__message--center': true}
    },
    typeClass () {
      return `sui-messagebox__${this.type}`;
    },
  },
  methods: {
    onNegativeBtn () {
      this.isModalShow = false;
      if (this.negativeButtonHandler) {
        this.negativeButtonHandler();
      }
      this.clearData();
    },
    onPositiveBtn () {
      this.isModalShow = false;
      if (this.positiveButtonHandler) {
        this.positiveButtonHandler(this.text);
      }
      this.clearData();
    },    
    clearData() {
      this.message = '';
      this.subMessage = '';
      this.link = {};
      this.logs = [];      
    },
    initData(message, text) {      
      this.message = message;
      this.text = text;
      this.positiveButtonHandler = null;
      this.negativeButtonHandler = null;
    },
    show(message, text, positiveButtonHandler, negativeButtonHandler) {
      this.initData(message, text);
      this.positiveButtonHandler = positiveButtonHandler;
      this.negativeButtonHandler = negativeButtonHandler;
      this.isModalShow = true;
      this.$nextTick(() => {
        this.$refs.posbtn.focus();
      });
    },    
  }
}
</script>

<style scoped>
</style>
