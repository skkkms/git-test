<template>
  <div
    v-show="visibility"
    class="sui-badge"
  >
    <div
      class="sui-badge__icon"
      :class="typeClass"
      style="border-style:none"
    />
    <label
      class="sui-badge__label"
      :class="labelClass"
      :title="currentOption.label"
      @click="onLabelClick"
    >
      {{ currentOption.label }}
    </label>
  </div>
</template>

<script>

export default {
  name: 'cell-badge',
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
    label: {
      type: String,
      default: '',
    },
    initialSelected: {
      type: [String, Object],
      default: null,
    },
    optionList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
      currentOption: {
        label: '',
        type: null,
        clickable: false,
      },
    }
  },
  created() {
    this.updateBadge(this.initialSelected);
  },
  computed : {
    typeClass() {
      return [
        this.currentOption.type? `sui-badge__icon-${this.currentOption.type}`: '',
      ];
    },
    labelClass() {
      return [
        this.currentOption.clickable? 'sui-badge__clickable' : '',
      ];
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
    updateBadge(target) {
      const matchedItem = _.find(this.optionList, item => {
        return item.key === target;
      });
      if (matchedItem) {
        this.currentOption = matchedItem;
      } else {
        this.currentOption = {
          label: '',
          type: null,
          clickable: false,
        };
      }
    },
    select(key) {
      this.updateBadge(key);
    },
    setValue(key) {
      this.select(key);
    },
    getValue() {
      return this.currentOption? this.currentOption.key : null;
    },
    onLabelClick() {
      if (this.currentOption.clickable) {
        this.$emit('clicked', this.currentOption);
      }
    },
  },
  beforeDestroy() {
    this.handleBeforeDestroy();
  },
}
</script>

<style scoped>

</style>
