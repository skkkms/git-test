<template>
  <sui-select-box
    v-model="currentSelected"
    :option-list="optionList"
    :disabled="isDisabled"
    @list-click="itemSelected"    
  />
</template>

<script>
import _ from 'lodash';
import DatasetBase from '../SuiDatasetBase/SuiDatasetBase';
//import uiUtil from '~system/util/uiUtil';
import selectUtil from '../SuiSelectBase/select-util.js';

export default {
  extends: DatasetBase,
  props: {
    selected: {
      type: Object,
      required: true,
    }, // 선택된 language가 저장될 곳
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    initialSelectedIndex: {
      type: Number,
      default: 0,
    },
    customOpitonList: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultOption: {
      type: String,
      default: '',
    },
  },
  watch: {
    selected() {
      if (this.selected) {
         if (this.selected.key !== null) {
           this.select(this.selected.key)
         } else {
           this.reset();
         }
      }
    },
  },
  data() {
    return {
      optionList: [
        { key: 'ko', label: 'Korean' },
        { key: 'en', label: 'English' },
      ],
      currentSelected: {
        label: '',
        key: null,
      },
      codeLoaded: false,
    };
  },
  computed: {
    isDisabled() {
      if (this.disabled || !this.codeLoaded) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    //this.pageId = uiUtil.findPageId(this);
    this.pageId = 'PGE_ZZZ_00001';
    this._load();
  },
  methods: {
    _load() {
      // http.request(this.pageId, 'DTS_CMY_00001').then(res => {
      //   _.forEach(res.data, lang => {
      //     lang.label = lang.langName;
      //     lang.key = lang.langId;
      //   });
      //   this.optionList = selectUtil.mergeOptionList(res.data, selectUtil.mergeDefaultOption(this.customOpitonList, this.defaultOption));
      //   if (this.selected.key) {
      //     this.select(this.selected.key);
      //   } else if (this.initialSelectedIndex >= 0 && this.optionList.length > this.initialSelectedIndex) {
      //     this.select(this.optionList[this.initialSelectedIndex].key);
      //   }
      //   this.codeLoaded = true;
      //   this.$emit('loaded', this.optionList);
      // }).catch(err => {
      //   console.log(err);
      // });
    },
    _syncProp() {
      if (this.currentSelected.key !== this.selected.key) {
        this.selected.label = this.currentSelected.label;
        this.selected.key = this.currentSelected.key;
      }
    },
    select(key) {
      if (this.currentSelected.key === key) {
        return;
      }
      const target = _.find(this.optionList, item => item.key === key);
      if (target) {
        this.currentSelected = {...target};
        this._syncProp();
      }
    },
    reset() {
      this.currentSelected = {
        label: '',
        key: null,
      };
      this._syncProp();
    },
    getOptionList() {
      return this.optionList;
    },
    itemSelected(event) {
      if (this.selected.key === event.key) {
        return;
      }
      this._syncProp();
      this.$emit('list-clicked', event);
    },
    onDatasetSelectionChanged(selectedValue, selectedRow) {
      this.select(selectedValue);
    },
  },
};
</script>
<style scoped>
</style>
