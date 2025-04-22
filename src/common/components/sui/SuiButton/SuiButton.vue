<template>
  <button
    :disabled="disabled"
    :title="title"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
import utils from '../util';

export default {
  name: 'SuiButton',
  props: {
    /**
    * disabled : true/false
    */
    disabled: {
      type: Boolean,
      default: false,
    },
    /*
    * enable double click : true/false
    */
    enableDbClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: '',
      lastClickTime: '',
    };
  },
  mounted() {
    if (this.$vnode.isRemove) {
      if (this.$el.parentElement) {
        this.$el.parentElement.removeChild(this.$el);
      }
      this.$destroy();
      return;
    }
    if (this.$slots.default && this.$slots.default[0]) {
      this.title = utils.trim(this.$slots.default[0].text);
      this.title = this.$slots.default[0].text;
    }
  },
  created() {
    //const preventClickSec = parseInt(utils.getConfigurationValue('CFG_CMU_BTN_DCLICK_LIMIT_SEC'), 10);
    const preventClickSec = 10;
    this.preventClickSec = 2000;
    if (preventClickSec) {
      this.preventClickSec = preventClickSec;
    }
  },
  methods: {
    /**
     * @public
     * @ignore
     * Click
     */
    onClick(e) {
      if (this.isClickable()) {
        /**
         * click event
         * @property {object} defaults
         */
        this.$emit('click', e);
      }
    },
    /**
     * @public
     * Double Click Protection
     */
    isClickable() {
      const date = new Date();
      if (this.enableDbClick || !this.lastClickTime || (this.lastClickTime + this.preventClickSec < date.getTime())) {
        this.lastClickTime = date.getTime();
        return true;
      }
      return false;
    },
  },
};
</script>
