<template>
  <sui-select-box
    ref="select"
    v-model="currentSelected"
    :option-list="options"
    :disabled="disabled"
    :use-popup="usePopup"
    :searchable="searchable"
    @list-click="itemSelected"
  />
</template>

<script>
import SuiSelectBase from '../SuiSelectBase/SuiSelectBase';
import selectUtil from '../../../js/select-util';

export default {
  extends: SuiSelectBase,
  props: {
    value: {
      type: String,
      required: false,
    },
    optionList: {
      type: Array,
      default() {
        return [];
      },
    },
    initialSelectedIndex: {
      type: Number,
      default: 0,
    },
    usePopup: {
      type: Boolean,
      default: true,
    },
    searchable: {
      type: Boolean,
      default() {
        const config = utils.getConfigurationValue('CFG_CMU_SELECT_BOX_SEARCH_YN');
        if (config) {
          return config === 'Y';
        }
        return true;
      },
    },
  },
  data() {
    return {
      options: [],
      currentSelected: {
        label: '',
        key: null,
      },
    };
  },
  watch: {
    optionList() {
      this.options = selectUtil.mergeDefaultOption(this.optionList, this.defaultOption);
      this.syncSelect();
    },
    value() {
      this.selected.key = this.value;
    },
    currentSelected() {
      if (this.currentSelected) {
        /**
        * Input event
        * @event input
        * @property {object} currentSelected
        */
        this.$emit('input', this.currentSelected.key);
      }
    },
  },
  mounted() {
    this.bindDataset();
    this.options = selectUtil.mergeDefaultOption(this.optionList, this.defaultOption);
    this.syncSelect();
  },
  beforeDestroy() {
    this.unbindDataset();
  },
  methods: {
    select(key) {
      let thekey;
      thekey = (typeof key === 'number') ? this.options[key].key : key;
      if (this.currentSelected.key === thekey) {
        return;
      }
      const target = _.find(this.options, item => item.key === thekey);
      if (target) {
        this.currentSelected = {...target};
        this._syncProp();
        /**
        * selection-changed event
        * @event selection-changed
        * @property {object} currentSelected
        */
        this.$emit('selection-changed', this.currentSelected);
      }
    },
    reset() {
      if (this.initialSelectedIndex > -1 && this.options[this.initialSelectedIndex]) {
        this.currentSelected = this.options[this.initialSelectedIndex]
      } else {
        this.currentSelected = {
          label: '',
          key: null,
        };
      }

      this._syncProp();
    },
    getOptionList() {
      return this.options;
    },
    syncSelect() {
      if (this.selected && this.selected.key) {
        this.select(this.selected.key);
      } else if (this.value != null) {
        this.selected.key = this.value;
        this.select(this.selected.key);
      } else if (this.initialSelectedIndex >= 0 && this.options.length > this.initialSelectedIndex) {
        this.select(this.options[this.initialSelectedIndex].key);
      } else {
        this.reset();
      }
    },
    activate() {
      if (this.$refs.select) {
        this.$refs.select.activate();
      }
    },
    deactivate() {
      if (this.$refs.select) {
        this.$refs.select.deactivate();
      }
    },
  }

};
</script>
<style scoped>
</style>
