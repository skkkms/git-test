<template>
  <div
    class="sui-checkbox"
    :class="{ 'sui-checkbox--disabled' : disabled}"
    @click="onClick"
  >
    <div
      class="sui-checkbox__check-image"
      :class="{ 'sui-checkbox--check-on' : this.clicked, 'sui-checkbox--check-off' : !this.clicked }"
    />
    <div
      v-if="!!Object.keys($slots).length"
      class="sui-checkbox__label"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import DatasetBase from '~common/components/form/SuiDatasetBase/SuiDatasetBase';

export default {
  /* eslint max-len: ["error", { "code": 200 }] */
  name: 'SuiCheckbox',
  extends: DatasetBase,
  model: { // v-model로 받은 값을 value가 아닌 'checked' props로 전달 받기 위한 선언
    prop: 'checked',
  },
  props: {
    /**
    * v-model : checked
    */
    checked: {
      type: [Number, Boolean, String, Array],
      default: false,
    },
    value: {
      type: [Number, String, Boolean, Array, Object],
      default: false,
    },
    /**
    * disabled : true/false
    */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      strTypeClicked: false,
    };
  },
  computed: {
    clicked() {
      if (typeof (this.value) === 'boolean') {
        if (typeof (this.checked) === 'boolean') {
          return this.checked;
        }
        return this.checked === 'Y';
      }
      if ((typeof (this.value) === 'number' || typeof (this.value) === 'string') && typeof (this.checked) !== 'object') {
        return this.checked;
      }
      if (typeof (this.checked) === 'object') {
        return (this.checked.indexOf(this.value) >= 0);
      }
      return this.strTypeClicked;
    },
  },
  mounted() {
    this.bindDataset();
  },
  beforeDestroy() {
    this.unbindDataset();
  },
  methods: {
    onClick(event) {
      if (this.disabled) {
        event.stopPropagation();
      } else if (typeof (this.value) === 'boolean') {
        if (typeof (this.checked) === 'boolean') {
          /**
          * Input event
          * @event input
          * @property {boolean} value
          * @property {boolean} checked
          * @property {object} checked
          */
          this.$emit('input', !this.checked);
        } else {
          this.$emit('input', this.checked === 'Y' ? 'N' : 'Y');
        }
      } else if (typeof (this.checked) === 'object') {
        if (this.checked.indexOf(this.value) >= 0) {
          this.$emit('input', this.checked.filter(item => item !== this.value));
        } else {
          this.$emit('input', this.checked.concat(this.value));
        }
      } else {
        this.$emit('input', this.strTypeClicked ? '' : this.value);
        this.strTypeClicked = !this.strTypeClicked;
      }
    },
    onDatasetSelectionChanged(selectedValue, selectedRow) {
      this.$emit('input', selectedValue);
    },
  },
};
</script>

<style>
</style>
