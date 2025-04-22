<template>
  <div v-show="visibility" class='-grid-cell-component -grid-cell-state-button'>
    <button v-if="text" :disabled="disabled" :title="text" class="-button__item" @click="onButtonClicked" :class="buttonClasses()">
        {{text}}
    </button>
    <div class="-button__icon-container" :disabled="disabled" :style="buttonContainerStyle">
      <span class="-button__icon -button__icon-attach" v-show="showattach"></span>
      <span class="-button__icon -button__icon-new" v-show="shownew"></span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CellButton',
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
      type: Object,
      default() {
        return {
          text: '',
          showattach: false,
          shownew: false,
        };
      },
    },
    type: {
      type: String,
      default: 'positive',
    },
    useSurfixIcon: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
      text: this.value.text,
      showattach: this.value.showattach,
      shownew: this.value.shownew,
    }
  },
  computed: {
    buttonContainerStyle() {
      if (this.useSurfixIcon) {
        return 'order: 1';
      }
      return '';
    },
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
      if (this.type) {
        return `-button__item-${this.type}`;
      }
      return '';
    },
    onButtonClicked() {
      this.$emit('clicked', this.label);
    },
    setValue(value) {
      if (value) {
        this.text = value.text;
        this.showattach = value.showattach;
        this.shownew = value.shownew;
      } else {
        this.text = '';
        this.showattach = '';
        this.shownew = '';
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
