<template>
  <div class="dp_flex">
    <sui-select-box
      ref="clsf"
      v-model="selected.clsf"
      :option-list="clsfOptions"
      :disabled="clsfDisabled"
      @list-click="clsfListClick"
    />
    <div class="comp_spacing" />
    <sui-select-box
      ref="dclsf"
      v-model="selected.dclsf"
      :option-list="currentDclsfOptions"
      :disabled="dclsfDisabled"
      @list-click="dclsfListClick"
    />
  </div>
</template>
<script>
import selectUtil from '../../../../common/js/select-util';

export default {
  name: 'CmpTodoClsfSelect',
  props: {
    pageId: {
      type: String,
      required: true,
    },
    selectedClsf: {
      type: Object,
      required: true,
    },
    selectedDclsf: {
      type: Object,
      required: true,
    },
    defaultClsfOption: {
      type: String,
      default: null,
    },
    defaultDclsfOption: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledClsf: {
      type: Boolean,
      default: false,
    },
    disabledDclsf: {
      type: Boolean,
      default: false,
    },
    initialSelectedClsfIndex: {
      type: Number,
      default: 0,
    },
    initialSelectedDclsfIndex: {
      type: Number,
      default: 0,
    },
    initialSelectedClsfKey: {
      type: String,
      default: null,
    },
    initialSelectedDclsfKey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      codeId: 'COD_TODO_CLSF',
      selected: {
        clsf: {
          key: '',
          label: '',
        },
        dclsf: {
          key: '',
          label: '',
        },
      },
      clsfOptions: [],
      dclsfOptions: {},
      currentDclsfOptions: [],
      loaded: false,
    };
  },
  computed: {
    clsfDisabled() {
      return this.disabled || this.disabledClsf || this.disabledDclsf;
    },
    dclsfDisabled() {
      return this.disabled || this.disabledDclsf;
    },
    initialClsfKey() {
      return this.initialSelectedClsfKey || this.initialSelectedClsfIndex;
    },
    initialDclsfKey() {
      return this.initialSelectedDclsfKey || this.initialSelectedDclsfIndex;
    },
    defautClsfKey() {
      if (!utils.isEmpty(this.defaultClsfOption)) {
        return utils.isEqual(this.defaultClsfOption, 'all') ? 'ALL' : ' ';
      }
      return '';
    },
  },
  watch: {
    selectedClsf: {
      deep: true,
      handler() {
        if (!utils.isEmpty(this.selectedClsf)) {
          const { key } = this.selectedClsf;
          if (!utils.isEmpty(key)) {
            if (!utils.isEqual(this.selected.clsf.key, key) && this.loaded) {
              this.selectClsf(key);
            }
          } else {
            this.reset();
          }
        }
      },
    },
    selectedDclsf: {
      deep: true,
      handler() {
        if (!utils.isEmpty(this.selectedDclsf)) {
          const { key } = this.selectedDclsf;
          if (!utils.isEmpty(key)) {
            if (!utils.isEqual(this.selected.dclsf.key, key) && this.loaded) {
              this.selectDclsf(key);
            }
          } else {
            this.reset();
          }
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._load();
    });
  },
  beforeDestroy() {
  },
  methods: {
    _load() {
      http.getCodeList(this.pageId, [this.codeId]).then(res => {
        this.clsfOptions = selectUtil.mergeDefaultOption(res[this.codeId], this.defaultClsfOption);
        this._loaded();
      });
    },
    _loaded() {
      const load = true;
      this._selectClsf(this.initialClsfKey).then(() => {
        this.loaded = true;
        this.selectDclsf(this.initialDclsfKey, load);

        const clsfkey = this.selectedClsf.key;
        const dclsfkey = this.selectedDclsf.key || 0;
        if (!utils.isEmpty(clsfkey)) {
          this.selectClsfDclsf(clsfkey, dclsfkey);
        }
        this.$emit('loaded');
      });
    },
    detailCodeLoad(classificationCode) {
      return new Promise((resolve, reject) => {
        if (utils.isEqual(classificationCode, this.defautClsfKey)) {
          resolve([]);
        } else {
          http.request(this.pageId, 'DTS_CMZ_00155', {
            path: {
              'todo-classification-code': classificationCode,
            },
          }).then(res => {
            utils.forEach(res.data, data => {
              utils.assign(data, { key: data.codeId, label: data.codeName });
            });
            resolve(res.data);
          }).catch(error => {
            reject(error);
          });
        }
      });
    },
    selectClsf(key) {
      this._selectClsf(key).then(() => {
        this.selectDclsf(0);
      });
    },
    _selectClsf(key) {
      return new Promise(resolve => {
        const realkey = typeof key === 'string' ? key : this.clsfOptions[key].key;
        const target = utils.find(this.clsfOptions, { key: realkey });
        this.selected.clsf = target;
        this.$emit('clsf-selected', target);

        if (utils.isEmpty(this.dclsfOptions[realkey])) {
          this.detailCodeLoad(realkey).then(list => {
            utils.set(this.dclsfOptions, realkey, selectUtil.mergeDefaultOption(list, this.defaultDclsfOption));
            this.currentDclsfOptions = utils.cloneDeep(this.dclsfOptions[realkey]);
            resolve();
          });
        } else {
          this.currentDclsfOptions = utils.cloneDeep(this.dclsfOptions[realkey]);
          resolve();
        }
      });
    },
    selectDclsf(key, load = false) {
      const realkey = typeof key === 'string' ? key : this.currentDclsfOptions[key].key;
      if (utils.isEqual(this.currentDclsfOptions, this.dclsfOptions[this.selected.clsf.key])) {
        const target = utils.find(this.currentDclsfOptions, { key: realkey });
        this.selected.dclsf = target;
        this.$emit('dclsf-selected', target);
        if (!load) {
          this._syncProps();
        }
      }
    },
    clsfListClick(event) {
      const { key } = event;
      if (!utils.isEqual(this.selectedClsf.key, key)) {
        this._selectClsf(key).then(() => {
          this.selectDclsf(0);

          this.$emit('clsf-list-clicked', event);
        });
      }
    },
    dclsfListClick(event) {
      const { key } = event;
      if (!utils.isEqual(this.selectedDclsf.key, key)) {
        this.selectDclsf(key);

        this.$emit('dclsf-list-clicked', event);
      }
    },
    _syncProps() {
      this._syncPropClsf();
      this._syncPropDclsf();
    },
    _syncPropClsf() {
      if (!utils.isEqual(this.selected.clsf.key, this.selectedClsf.key)) {
        this.selectedClsf.key = this.selected.clsf.key;
        this.selectedClsf.label = this.selected.clsf.label;
      }
    },
    _syncPropDclsf() {
      if (!utils.isEqual(this.selected.dclsf.key, this.selectedDclsf.key)) {
        this.selectedDclsf.key = this.selected.dclsf.key;
        this.selectedDclsf.label = this.selected.dclsf.label;
      }
    },
    reset() {
      const clsfkey = this.initialClsfKey || '';
      const dclsfkey = this.initialDclsfKey || '';
      this._selectClsf(clsfkey).then(() => {
        this.selectDclsf(dclsfkey);
      });
    },
    selectClsfDclsf(clsf, dclsf) {
      if (this.loaded) {
        this._selectClsf(clsf).then(() => {
          this.selectDclsf(dclsf);
        });
      } else {
        this.selectedClsf.key = clsf;
        this.selectedDclsf.key = dclsf;
      }
    },
    setFocus(type) {
      if (this.$refs[type]) {
        this.$refs[type].activate();
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>
