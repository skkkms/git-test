<template>
  <sui-select-box
    v-model="currentSelected"
    :option-list="optionList"
    :disabled="disabled"
    @list-click="itemSelected"
  />
</template>

<script>
import _ from 'lodash';
import SuiSelectBase from '../SuiSelectBase/SuiSelectBase';
import selectUtil from '../SuiSelectBase/select-util';

export default {
  extends: SuiSelectBase,
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  watch: {
    value() {
      this.selected.key = this.value;
    },
    currentSelected() {
      if (this.currentSelected) {
        this.$emit('input', this.currentSelected.key);
      }
    },
  },
  data() {
    return {
      optionList: [],
      currentSelected: {
        label: '',
        key: null,
      },
    };
  },
  mounted() {
    if (this.initOptionList) {
      this.initOptionList();
    }
  },
};
</script>
<style scoped>
</style>
