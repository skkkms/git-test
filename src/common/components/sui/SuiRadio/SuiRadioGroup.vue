<template>
  <span>
    <sui-radio v-for="item in items" :key="item.key" v-model="currentValue" :value="item.key" :disabled="disabled" >
      {{item.label}}
    </sui-radio>
  </span>
</template>

<script>

export default {
  name: 'SuiRadioGroup',
  props: {
    value: {
      default: 'Y',
      type: [String, Boolean],
    },
    items: {
      type: Array,
      default() {
        return [{key: 'Y', label: 'Yes'}, {key: 'N', label: 'No'}];
      },
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dataUpdater: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    currentValue() {
      if (this.prevent) {
        this.prevent = false;
      } else {
        this.$emit('input', this.currentValue);
      }
    }
  },
  methods: {
    setValue(value) {
      if (this.currentValue !== value) {
        this.prevent = true;
        this.currentValue = value;
      }
    },
  }
}
</script>

<style>
</style>
