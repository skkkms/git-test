<template>
  <sui-modal
    v-model="isModalShow"
    :prevent-outside-close="preventOutsideClose"
  >
    <div
      class="sui-confirm"
      :class="typeClass"
    >
      <div class="sui-confirm__icon-area" />
      <div class="sui-confirm__title-area">
        {{ title }}
      </div>
      <div
        class="sui-confirm__message-wrapper"
        :class="classes"
      >
        <div
          class="sui-confirm__message"
        >
          {{ message }}
        </div>
      </div>
      <div
        class="sui-confirm__message-wrapper-custom"
        :class="classes"
      >
        <div class="sui-confirm__message-custom">
          <p
            v-for="message in messages"
            :key="message"
          >
            {{ message }}
          </p>
        </div>
      </div>
      <slot />
      <div
        v-if="customButtons.length"
        class="sui-confirm__button-area"
      >
        <button
          v-for="button in customButtons"
          :key="button.label"
          type="button"
          class="customButtonClass(button)"
          @click="onCustomButtonClick(button)"
        >
          {{ button.label }}
        </button>
      </div>
      <div
        v-else
        class="sui-confirm__button-area"
      >
        <button
          v-if="!!negativeButtonLabel"
          type="button"
          class="sui-confirm__button--negative"
          @click="onNegativeBtn"
        >
          {{ negativeButtonLabel }}
        </button>
        <button
          v-if="!!positiveButtonLabel"
          type="button"
          class="sui-confirm__button--positive"
          @click="onPositiveBtn"
        >
          {{ positiveButtonLabel }}
        </button>
      </div>
    </div>
  </sui-modal>
</template>

<script>
/**
 * 이름 : suiConfirm
 * 설명 : suiModal을 기반으로 만든 확인창 컴포넌트
 * 최종 수정 일시 : 2019 - 01 - 03
 */
export default {
  name: 'SuiConfirm',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'confirm',
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    customMessages: {
      type: [String, Array],
      default: '',
    },
    // [{label: 'btn', type: 'positive' handler: () => {}}, {label: 'btn2', type: 'negative' handler: () => {}}]
    customButtons: {
      type: Array,
      default() {
        return [];
      },
    },
    positiveButtonLabel: {
      type: String,
      default: null,
    },
    negativeButtonLabel: {
      type: String,
      default: null,
    },
    preventOutsideClose: {
      type: Boolean,
      default: false,
    },
    custom: {
      type: Boolean,
      default: false,
    },
    textAlign: {
      type: String,
      default: 'center',
    },
  },
  data() {
    return {
      isModalShow: this.value,
      messages: typeof this.customMessages === 'string' ? [this.customMessages] : this.customMessages,
    };
  },
  computed: {
    classes() {
      if (this.textAlign === 'left') return { 'sui-confirm__message--left': true };
      if (this.textAlign === 'right') return { 'sui-confirm__message--right': true };
      return { 'sui-confirm__message--center': true };
    },
    typeClass() {
      return `sui-confirm__${this.type}`;
    },
  },
  watch: {
    customMessages() {
      if (typeof this.customMessages === 'string') {
        this.messages = [this.customMessages];
      } else {
        this.messages = this.customMessages;
      }
    },
    isModalShow(newValue) {
      this.$emit('input', newValue);
    },
    value() {
      this.isModalShow = this.value;
    },
  },
  methods: {
    onNegativeBtn() {
      /**
      * input event
      * @event input
      * @property {boolean}
      */
      this.$emit('input', false);
      /**
      * on-negative event
      * @event on-negative
      * @property {String}
      */
      this.$emit('on-negative');
    },
    onPositiveBtn() {
      this.$emit('input', false);
      /**
      * on-positive event
      * @event on-positive
      * @property {String}
      */
      this.$emit('on-positive');
    },
    customButtonClass(button) {
      if (button.type === 'positive') {
        return 'sui-confirm__button--positive';
      }
      return 'sui-confirm__button--negative';
    },
    onCustomButtonClick(button) {
      if (button.handler) {
        button.handler(button);
      }
    },
  },
};
</script>

<style>
</style>
