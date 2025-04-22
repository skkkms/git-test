<template>
  <div
    v-show="visibility"
    class="-button-list"
  >
    <button
      v-for="item in buttonList"
      :key="item.id"
      :disabled="item.disabled === true? true: false"
      :title="item.label"
      :class="buttonClasses(item)"
      class="-button-list__item"
      @click="onButtonClicked(item)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'CellButtonList',
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
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    handler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
      buttonList: this.items,
    }
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
    buttonClasses(button) {
      if (button.type) {
        return `-button-list__item-${button.type}`;
      }
      return '';
    },
    setButtonList(buttonList) {
      this.setValue(buttonList);
    },
    onButtonClicked(button) {
      this.$emit('clicked', button);      
    },
    setValue(value) {
      this.buttonList = value;
    },
    getValue() {
      return this.buttonList;
    },
  },
  beforeDestroy() {
    this.handleBeforeDestroy();
  },
}
</script>

<style scoped>
</style>
