<template>
  <div :class="['-fdp-validator', slotClass]">
    <slot />
    <input
      v-show="false"
      v-model="val"
      v-validate="rules"
      :data-vv-as="displayName"
      class="-fdp-validator__input--hidden"
      :name="name"
    >
    <div
      v-if="errors && errors.first(parseScope) && !hideError"
      class="-fdp-validator__error-wrapper"
    >
      <span class="-fdp-validator__error-message">{{ errors.first(parseScope) }}</span>
    </div>
  </div>
</template>

<script>
/**
 * 이름 : SuiValidator
 * 설명 : 입력값 검증 컴포넌트. vee-validator (open source)를 wrapping하여 개발
 * 최종 수정 일시 : 2020 - 03 - 20
 */
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import validateRules from './rules';
import validateI18nKo from './i18n/ko';

// TODO: AppInitializer 로 빼야 하나?
// TODO: session 에서 다국어 값을 읽어서 대응되도록 수정해야 함
if (VeeValidate) {
  Vue.use(VeeValidate, {
    locale: 'ko',
    dictionary: {
      ko: validateI18nKo,
    },
  });
  Object.keys(validateRules).forEach(rule => {
    VeeValidate.Validator.extend(rule, validateRules[rule]);
  });
}

export default {
  name: 'SuiValidator',
  // auto injecting parent's validator scope
  inject: ['$validator'],
  props: {
    value: {
      type: [String, Array],
      required: true,
    },
    rules: {
      type: [String, Object],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
    },
    block: {
      type: Boolean,
      default: false,
    },
    scope: {
      type: String,
      default: '__global__',
    },
    hideError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: '',
    };
  },
  computed: {
    slotClass() {
      return {
        '-fdp-validator--block': this.block,
        '-fdp-validator__slot--error': this.errors && this.errors.first(this.scope === '__global__' ? this.name : `${this.scope}.${this.name}`) && !this.hideError,
      };
    },
    parseScope() {
      if (this.scope === '__global__') {
        return this.name;
      }
      return `${this.scope}.${this.name}`;
    },
  },
  watch: {
    value() {
      this.val = this.value;
    },
  },
  mounted() {
    this.val = this.value;
  },
};
</script>

<style>

</style>
