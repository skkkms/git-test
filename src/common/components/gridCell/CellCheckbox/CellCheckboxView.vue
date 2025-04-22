<template>
  <div
    v-show="visibility && showCheckbox"
    class="sui-checkbox"
    :class="{ 'sui-checkbox--disabled' : disabled}"
    @click="onClick"
  >
    <div
      class="sui-checkbox__check-image"
      :class="{ 'sui-checkbox--check-on' : this.clicked, 'sui-checkbox--check-off' : this.clicked === false, }"
    />
    <div
      v-if="!!Object.keys($slots).length"
      class="sui-checkbox__label"
    >
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'CellCheckbox',
  props: {
    checkEditableFunction: {
      type: Function,
      default: null,
    },
    checkDisabledFunction: {
      type: Function,
      default: null,
    },
    checkVisibilityFunction: {
      type: Function,
      default: null,
    },
    value: {
      type: [Number, Boolean, String, Array],
      default: false,
    },
  },
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
      checked: this.value,
    }
  },
  computed: {
    clicked () {
      if (typeof this.checked === 'boolean') {
        return this.checked;
      } else if (typeof this.checked === 'string') {
        return this.checked === 'Y' ? true : this.checked === 'N' ? false : undefined;
      }
    },
    showCheckbox() {
      if (typeof this.checked === 'string') {
        if (this.checked !== 'Y' && this.checked !== 'N') {
          return false;
        }
      }
      return true;
    }
  },
  beforeDestroy() {
    this.handleBeforeDestroy();
  },
  methods: {
    setEditable(rowData, columnName, dataset, grid) {
      if (this.checkEditableFunction) {
        this.editable = this.checkEditableFunction(rowData, columnName, dataset, grid);
      }
    },
    setDisabled(rowData, columnName, dataset, grid) {
      if (this.checkDisabledFunction) {
        this.disabled = this.checkDisabledFunction(rowData, columnName, dataset, grid);
      }
    },
    setVisibility(rowData, columnName, dataset, grid) {
      if (this.checkVisibilityFunction) {
        this.visibility = this.checkVisibilityFunction(rowData, columnName, dataset, grid);
      }
    },
    handleBeforeDestroy() {
      (this.$el && this.$el.parentNode)? this.$el.parentNode.removeChild(this.$el):'';
    },
    onClick (event) {
      if (this.disabled) {
        event.stopPropagation();
        return;
      }
      if (typeof this.checked === 'string') {
        if (this.checked === 'Y') {
          this.checked = 'N';
        } else {
          this.checked = 'Y';
        }
      } else {
        this.checked = !this.checked;
      }
      this.$emit('input', this.checked);
    },
    setValue(value) {
      if (this.checked !== value) {
        this.checked = value;
      }
    }
  },
}
</script>

<style>
</style>
