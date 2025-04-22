<template>
  <div
    v-show="visibility"
    class="-grid-cell-component"
  >
    <cell-label
      v-show="!editable"
      :grid="grid"
      :value="label"
    />
    <div
      v-show="editable"
      class="-button"
    >
      <button
        :disabled="disabled"
        :readonly="readonly"
        :title="label"
        :class="buttonClasses()"
        class="-button__item"
        @click="onButtonClicked"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>

<script>
import CellLabel from '../CellLabel/CellLabelView';

export default {
  name: 'CellButton',
  components: {
    'cell-label': CellLabel,
  },
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
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'positive',
    },
    handler: {
      type: Function,
      default: null,
    },
    grid: {
      type: Object,
      default: null,
    },
    styleBoldFieldName: {
      type: String,
      default: '',
    },
    isTextStyleBold: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      label: this.value,
      editable: true,
      disabled: false,
      visibility: true,
      textStyle: `${this.type}${this.isTextStyleBold ? 'B' : ''}`,
    };
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
    buttonClasses() {
      if (this.textStyle) {
        return `-button__item-${this.textStyle}`;
      }
      return '';
    },
    onButtonClicked() {
      this.$emit('clicked', this.label);
    },
    setValue(value, currentDataRow, styleBoldFieldName = {}) {
      if (currentDataRow === undefined) {
        this.label = value;
      } else {
        if (currentDataRow[styleBoldFieldName]
          && (currentDataRow[styleBoldFieldName] === 'Y' || currentDataRow[styleBoldFieldName] === true)) {
          this.textStyle = `${this.type}B`;
        } else {
          this.textStyle = `${this.type}`;
        }
        this.label = value;
      }
    }
  },
  beforeDestroy() {
    this.handleBeforeDestroy();
  },
}
</script>

<style scoped>
</style>
