<script>
import DatasetBase from '../SuiDatasetBase/SuiDatasetBase';
//import uiUtil from '~system/util/uiUtil';

export default {
  extends: DatasetBase,
  props: {
    selected: {
      type: Object,
      required: false,
      default: () => (
        { key: '', label: '' }
      ),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    defaultOption: {
      type: String,
      default: '',
    },
  },
  watch: {
    selected: {
      deep: true,
      handler() {
        if (this.selected) {
          if (this.selected.key !== null) {
            this.select(this.selected.key);
          } else {
            this.reset();
          }
        }
      },
    },
  },
  mounted() {
    // this.pageId = uiUtil.findPageId(this);
  },
  methods: {
    _syncProp() {
      if (this.selected && this.currentSelected && this.currentSelected.key !== this.selected.key) {
        this.selected.label = this.currentSelected.label;
        this.selected.key = this.currentSelected.key;
      }
    },
    select(key, force) {
      let thekey = key;
      if (typeof key === 'number') {
        if (this.optionList[key]) {
          thekey = this.optionList[key].key;
        } else {
          return;
        }
      }
      if (!force && this.currentSelected.key === thekey) {
        return true;
      }
      const target = _.find(this.optionList, item => item.key === thekey);
      if (target) {
        this.currentSelected = { ...target };
        this._syncProp();
        return true;
      }
    },
    reset() {
      if (this.initialSelectedIndex > -1) {
        this.currentSelected = this.optionList[this.initialSelectedIndex];
      } else {
        this.currentSelected = {
          label: '',
          key: null,
        };
      }

      this._syncProp();
      this.$emit('input', this.currentSelected.key);
    },
    getOptionByKey(key) {
      const target = _.find(this.optionList, item => item.key === key);
      return target;
    },
    getOptionList() {
      return this.optionList;
    },
    itemSelected(event) {
      if (this.selected.key === event.key) {
        return;
      }
      const prevSelected = this.getOptionByKey(this.selected.key);
      this._syncProp();
      /**
      * list-clicked event
      * @event list-clicked
      * @property {object} event
      */
      this.$emit('list-clicked', event, prevSelected);
    },
    onDatasetSelectionChanged(selectedValue, selectedRow) {
      this.select(selectedValue);
    },
  },
};
</script>
<style scoped>
</style>
