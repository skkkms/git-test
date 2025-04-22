<template>
  <div
    :class="wrap_class"
  >
    <div
      ref="parentTextInput"
    >
      <!-- <sui-text-field ref="textInput"
                       v-model="fdpTextValue"
                       @keyup='fdpTextKeyup'
                       @input='fdpTextInput'
                       @blur='fdpTextBlur'
                       @focus="fdpTextFocus"/> -->
    </div>
    <div
      v-show="visibility"
    >
      <sui-button
        v-show="editable"
        type="button"
        :class="buttonStyle"
        :disabled="disabled"
        @click="onClickButton"
      >
        {{ buttonProps.name }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import CellTextField from '~common/components/gridCell/CellTextField/CellTextFieldView';

export default {
  name: 'SuiTextFieldWithButton',
  props: {
    buttonProps: {
      type: Object,
      default: null,
    },
    textFieldProps: {
      type: Object,
      default: null,
    },
    fdpTextValue: {
      type: String,
      default: '',
    },
    grid: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
      textFieldVisibility: true,
      textFieldEditable: true,
    };
  },
  computed: {
    buttonStyle() {
      if (!utils.isUndefined(this.buttonProps.style) && !(this.buttonProps.style === null)) {
        return this.buttonProps.style;
      }
      return 'btn_innerTbl_border';
    },
    wrap_class() {
      if (!this.textFieldVisibility && this.visibility) {
        return '';
      }
      if (!this.textFieldEditable && this.editable) {
        return '';
      }
      return 'comm_scrInput_wrap';
    },
  },
  watch: {
  },
  created() {
    this.propDisabledSet();
  },
  mounted() {
    this.createdTextField();
  },
  beforeDestroy() {
    if (this.textField) {
      const el = this.textField.$el;
      this.textField.$off('keyup', this.fdpTextKeyup);
      this.textField.$off('input', this.fdpTextInput);
      this.textField.$off('blur', this.fdpTextBlur);
      this.textField.$off('focus', this.fdpTextFocus);
      this.textField.$destroy();
      if (el && el.parentElement) {
        el.parentElement.removeChild(el);
      }
    }
  },
  methods: {
    onClickButton() {
      this.$emit('clickButton');
    },
    fdpTextKeyup() {
      this.$emit('keyup');
    },
    fdpTextInput() {
      this.$emit('input', this.textField.realText);
    },
    fdpTextBlur() {
      this.$emit('blur');
    },
    fdpTextFocus() {
      this.$emit('focus');
    },
    setEditable(rowData, columnName, dataset, grid) {
      if (!utils.isUndefined(this.buttonProps.checkEditableFunction)
        && !(this.buttonProps.checkEditableFunction === null)) {
        this.editable = this.buttonProps.checkEditableFunction(rowData, columnName, dataset, grid);
      } else {
        this.editable = true;
      }
      if (!utils.isUndefined(this.textFieldProps.checkEditableFunction)
        && !(this.textFieldProps.checkEditableFunction === null)) {
        this.textFieldEditable = this.textFieldProps.checkEditableFunction(rowData, columnName, dataset, grid);
      }
      if (this.textField) {
        this.textField.setEditable(rowData, columnName, dataset, grid);
      }
    },
    setDisabled(rowData, columnName, dataset, grid) {
      if (!utils.isUndefined(this.buttonProps.checkDisabledFunction)
        && !(this.buttonProps.checkDisabledFunction === null)) {
        this.disabled = this.buttonProps.checkDisabledFunction(rowData, columnName, dataset, grid);
      }
      if (this.textField) {
        this.textField.setDisabled(rowData, columnName, dataset, grid);
      }
    },
    setVisibility(rowData, columnName, dataset, grid) {
      if (!utils.isUndefined(this.buttonProps.checkVisibilityFunction)
        && !(this.buttonProps.checkVisibilityFunction === null)) {
        this.visibility = this.buttonProps.checkVisibilityFunction(rowData, columnName, dataset, grid);
      }
      if (!utils.isUndefined(this.textFieldProps.checkVisibilityFunction)
        && !(this.textFieldProps.checkVisibilityFunction === null)) {
        this.textFieldVisibility = this.textFieldProps.checkVisibilityFunction(rowData, columnName, dataset, grid);
      }
      if (this.textField) {
        this.textField.setVisibility(rowData, columnName, dataset, grid);
      }
    },
    propDisabledSet() {
      if (!utils.isUndefined(this.buttonProps.disabled)) {
        this.disabled = this.buttonProps.disabled;
      }
    },
    createdTextField() {
      const ComponentClass = Vue.extend(CellTextField);
      const { textFieldProps } = this;

      textFieldProps.value = this.fdpTextValue;
      textFieldProps.grid = this.grid;

      this.textField = new ComponentClass({
        propsData: textFieldProps,
      });

      this.textField.$mount();
      this.$refs.parentTextInput.appendChild(this.textField.$el);

      // event연결
      this.textField.$on('keyup', this.fdpTextKeyup);
      this.textField.$on('input', this.fdpTextInput);
      this.textField.$on('blur', this.fdpTextBlur);
      this.textField.$on('focus', this.fdpTextFocus);

      this.$emit('initialized');
    },
    setValue(value) {
      if (this.textField) {
        this.textField.setValue(value);
      }
    },
    setFocus() {
      this.textField.setFocus();
    },
  },
};
</script>

<style scoped>
.-grid-cell-textField-button {
  padding:0 !important;
}
</style>
