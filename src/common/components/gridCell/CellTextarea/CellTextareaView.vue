<template>
  <div v-show="visibility" class='-grid-cell-component'>
    <div class="-grid-cell-text-area__edit__root">
      <button v-show="editable" class="-grid-cell-text-area__button" @click="onButtonEditClick">{{ buttonText }}</button>
    </div>
    <div v-show="!editable" class="-grid-cell-text-area" style="width: 100%">
      <span class="-grid-cell-text-area__label-container">
        {{ inputValue }}
      </span>
      <button :disabled="disabled" class="-grid-cell-text-area__button" @click="onButtonMoreClick">More</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CellTextarea',
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
    value: { type: String, default: 'aaa' },
    title: { type: String, default: ''},    
    readonly: { type: Boolean, default: false },
    maxlength: { type: Number, default: 500, },
    positiveButtonText: { type: String, default: null },
    negativeButtonText: { type: String, default: null },
  },
  data() {
    return {
      buttonText: utils.getMessageById('MSG_BTN_INPT_BIG_SCRN'),
      editable: true,
      disabled: false,
      visibility: true,
      inputValue: this.value,
    };
  },
  mounted() {
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
    setValue(value) {
      this.inputValue = value;
    },
    refresh() {
    
    },
    onClosePopup(value) {
      if (value && value !== this.inputValue) {
        this.$emit('input', value);
      }
    },
    onButtonMoreClick() {
      utils.openTextAreaEditor(this.onClosePopup, { title: this.title, pageInitialData: {value: this.inputValue, readonly: true, positiveButtonText: this.positiveButtonText, negativeButtonText: this.negativeButtonText, maxlength: this.maxlength}});
    },
    onButtonEditClick() {
      utils.openTextAreaEditor(this.onClosePopup, { title: this.title, pageInitialData: {value: this.inputValue, readonly: false, positiveButtonText: this.positiveButtonText, negativeButtonText: this.negativeButtonText, maxlength: this.maxlength}});
    },
  },
  beforeDestroy() {
    this.handleBeforeDestroy();
  },
};
</script>

<style scoped>
</style>
