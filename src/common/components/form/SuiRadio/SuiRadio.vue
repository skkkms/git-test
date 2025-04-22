<template>
  <div class="sui-radio" :class="{ 'sui-radio--disabled' : disabled}" @click="onClick">
    <div class="sui-radio__icons" :class="{ 'sui-radio--checked' : this.clicked, 'sui-radio--unchecked': !this.clicked }"/>
    <div class="sui-radio__label"><slot></slot></div>
  </div>
</template>

<script>

import DatasetBase from '~common/components/form/SuiDatasetBase/SuiDatasetBase';
export default {
  extends: DatasetBase,
  name: 'SuiRadio',
  model: {
    prop: 'checked'
  },
  props: {
    checked: {
      type: [Number, Boolean, String, Array, Object],
      default: false
    },
    value: {
      type: [Number, Boolean, String, Array, Object],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    clicked () {
      return (typeof (this.value) === 'boolean') ? this.checked : (this.checked === this.value)
    }
  },
  mounted() {
    this.bindDataset();
  },
  beforeDestroy() {
    this.unbindDataset();
  },
  methods: {
    onClick: function () {
      this.$emit('input', (typeof (this.value) === 'boolean') ? !this.checked : this.value)
    },
    onDatasetSelectionChanged(selectedValue, selectedRow) {
      this.$emit('input', selectedValue);
    },
    setValue(value) {
      this.checked = value;      
    },
  }
}
</script>

<style>
</style>
