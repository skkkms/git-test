<template>
  <div>
    <div v-show="showNavigator" class="-process-tab-item__controller">
      <button class="-process-tab-item__controller__left" @click="prev"> L </button>
      <button class="-process-tab-item__controller__right" @click="next"> R </button>
    </div>
    <slot>
    </slot>
  </div>  
</template>
<script>
export default {
  name: 'SuiTabNavigator',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    containerWidth: {
      type: Number,
      default: 0,
    },
    contentWidth: {
      type: Number,
      default: 0,
    },
    contentElement: {
      type: HTMLElement,
      default: null,
    },
    controllerWidth: {
      type: Number,
      default: 0,
    },
    refresh: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      bounds: [],
      initialized: false,
    };
  },
  computed: {
    showNavigator() {
      if (!(this.$slots && this.$slots.default) && (this.containerWidth < this.contentWidth)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    init() {
      this.initialized = true;
      this.calculateSizeInfo();
    },
    prev() {
      const baseLine = this.getBasePosL();
      let diff = 0;
      for (let i = this.bounds.length - 1; i >= 0; i -= 1) {
        const { left, right } = this.bounds[i];
        if ((left < baseLine && right > baseLine) || (right <= baseLine)) {
          diff = baseLine - left;
          break;
        }
      }
      if (diff) {
        this.$emit('input', this.value + diff);        
      }
    },
    next() {
      const baseLine = this.getBasePosR();
      let diff = 0;
      for (let i = 0; i < this.bounds.length; i += 1) {
        const { left, right } = this.bounds[i];
        if ((left < baseLine && right > baseLine) || (left >= baseLine)) {
          diff = baseLine - right;
          break;
        }
      }
      if (diff) {
        this.$emit('input', this.value + diff);
      }
    },
    reveal(index, containerWidth = this.containerWidth) { // containerWidget를 인자로 받는 이유는 부모에서 값을 변경해도 child에 즉시 반영되지 않음
      this.calculateSizeInfo();
      if (!this.bounds[index]) {
        return;
      }
      const { left, right } = this.bounds[index];
      const basePosL = -1 * this.value;
      const basePosR = containerWidth - this.value - this.controllerWidth;
      let diff = 0;
      if (left <= basePosL) {
        diff = basePosL - left;
      } else if (right >= basePosR) {
        diff = basePosR - right;
      }
      if (diff) {
        this.$emit('input', this.value + diff);
      }
    },
    getBasePosL() {
      return -this.value;
    },
    getBasePosR() {
      return this.containerWidth - this.value - this.controllerWidth;
    },
    calculateSizeInfo() {
      if (!this.contentElement) {
        return;
      }
      const { children } = this.contentElement;
      const bounds = [];
      for (let i = 0; i < children.length; i += 1) {
        const bound = {};
        const { width } = children[i].getBoundingClientRect();
        if (i === 0) {
          bound.left = 0;
          bound.width = width;
          bound.right = width;
        } else {
          bound.left = bounds[i - 1].right;
          bound.width = width;
          bound.right = bound.left + width;
        }
        bounds.push(bound);
      }
      this.bounds = bounds;
    },
  },
};
</script>

<style scoped>

</style>