<template>
  <sui-select-box
    ref="select"
    v-model="currentSelected"
    :option-list="optionList"
    :disabled="isDisabled"
    @list-click="itemSelected"
  />
</template>

<script>
import SuiSelectBase from '../SuiSelectBase/SuiSelectBase';
import selectUtil from '../../../js/select-util';

/* eslint max-len: ["error", { "code": 200 }] */
export default {
  extends: SuiSelectBase,
  props: {
    value: {
      type: String,
      required: false,
    },
    customOpitonList: {
      type: [String, Array],
      default() {
        return [];
      },
    }, // 사용자 추가 옵션 목록
    filteredOptionList: {
      type: [String, Array],
      default() {
        return [];
      },
    },
    codeId: {
      type: String,
      default: '',
    },
    siteId: {
      type: String,
      default: null,
    },
    pageId: {
      type: String,
      default: null,
    },
    initialSelectedKey: {
      type: String,
      default: '',
    },
    initialSelectedIndex: {
      type: Number,
      default: 0,
    },
    initialLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      optionList: [],
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
    },
  },
  watch: {
    siteId() {
      if (this.codeLoaded) {
        this.reload();
      }
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
    if (this.initialLoad) {
      this.$nextTick(() => {
        this._load();
      });
    }
  },
  methods: {
    _load() {
      http.getCodeList(this.pageId, [this.codeId], this.siteId).then(res => {
        this.optionList = selectUtil.mergeOptionList(res[this.codeId], selectUtil.mergeDefaultOption(this.customOpitonList, this.defaultOption));
        if (this.filteredOptionList && this.filteredOptionList.length > 0) {
          this.optionList = this.optionList.filter(item => {
            let isFiltered = false;
            this.filteredOptionList.forEach(fitem => {
              if (fitem.key === item.key) {
                isFiltered = true;
              }
            });
            return isFiltered;
          });
        }
        if (this.selected.key) {
          this.select(this.selected.key);
        } else if (this.value && this.value !== '') {
          this.select(this.value);
        } else if (this.initialSelectedKey !== '') {
          this.select(this.initialSelectedKey);
        } else if (this.initialSelectedIndex >= 0 && this.optionList.length > this.initialSelectedIndex) {
          this.select(this.optionList[this.initialSelectedIndex].key);
        }
        this.codeLoaded = true;
        /**
        * loaded event
        * @event loaded
        * @property {object} optionList
        */
        this.$emit('loaded', this.optionList);
      }).catch(err => {
        console.log(err);
      });
    },
    reload() {
      http.getCodeList(this.pageId, [this.codeId], this.siteId).then(res => {
        this.optionList = selectUtil.mergeOptionList(res[this.codeId], selectUtil.mergeDefaultOption(this.customOpitonList, this.defaultOption));
        if (this.filteredOptionList && this.filteredOptionList.length > 0) {
          this.optionList = this.optionList.filter(item => {
            let isFiltered = false;
            this.filteredOptionList.forEach(fitem => {
              if (fitem.key === item.key) {
                isFiltered = true;
              }
            });
            return isFiltered;
          });
        }
        if (this.selected.key) {
          if (!this.select(this.selected.key, true)) {
            if (this.initialSelectedIndex >= 0 && this.optionList.length > this.initialSelectedIndex) {
              this.select(this.optionList[this.initialSelectedIndex].key);
            } else if (this.optionList.length) {
              this.select(0);
            } else {
              this.reset();
            }
          }
        } else if (this.initialSelectedKey !== '') {
          this.select(this.initialSelectedKey);
        } else if (this.initialSelectedIndex >= 0 && this.optionList.length > this.initialSelectedIndex) {
          this.select(this.optionList[this.initialSelectedIndex].key);
        }
        /**
        * reloaded event
        * @event reloaded
        * @property {object} optionList
        */
        this.$emit('reloaded', this.optionList);
      }).catch(err => {
        console.log(err);
      });
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
  },
};
</script>
<style scoped>
</style>
