<template>
  <div class="dp_flex">
    <sui-select-box
      v-model="selected.md"
      :option-list="mdOptions"
      :disabled="mdDisabled"
      @list-click="mdItemSelected"
    />
    <div class="comp_spacing"></div>
    <sui-select-box
      v-model="selected.smd"
      :option-list="currentSmdOptions"
      :disabled="smdDisabled"
      @list-click="smdItemSelected"
    />
  </div>
</template>

<script>
const KEY_CODE_MODULE = 'COD_MDLE';

import _ from 'lodash';
//import uiUtil from '~system/util/uiUtil';
import selectUtil from '../SuiSelectBase/select-util';
import utils from '../util';

export default {
  props: {
    selectedMd: {
      type: Object,
      required: true,
    }, // 선택된 module이 저장될 곳
    selectedSmd: {
      type: Object,
      required: true,
    }, // 선택된 submodule이 저장될 곳
    customMdList: {
      type: Array,
      default() {
        return [];
      }
    }, // 화면에서 사용자가 추가할 module 목록. module 목록 앞에 머지됨
    customSmdList: {
      type: Array,
      default() {
        return [];
      } // 화면에서 사용자가 추가할 submodule 목록. submodule 목록 앞에 머지됨
    },
    defaultMdOption: {
      type: String,
      default: null,
    },
    defaultSmdOption: {
      type: String,
      default: null,
    },
    mdDataset: { // 모듈 데이터셋
      type: String,
      default: null,
    },
    smdDataset: { // 서브모듈 데이터셋
      type: String,
      default: null,
    },
    disabled: { // 선택가능 여부
      type: Boolean,
      default: false
    },
    disabledMd: { // 선택가능 여부
      type: Boolean,
      default: false
    },
    disabledSmd: { // 선택가능 여부
      type: Boolean,
      default: false
    },
    initialSelectedMdIndex: { // 초기에 선택될 moduel index
      type: Number,
      default: 0,
    },
    initialSelectedSmdIndex: { // 초기에 선택될 sub module index
      type: Number,
      default: 0,
    },
  },
  watch: {
    selectedMd: {
      deep: true,
      handler() {
        if (this.selectedMd) {
          const selected = this.selectedMd;
          if (selected.key !== '') {
            if (this.selected.md.key !== selected.key) {
              this.selectMd(selected.key)
            }
          } else {
            this.reset();
          }
        }
      }
    },
    selectedSmd: {
      deep: true,
      handler() {
        if (this.selectedSmd) {
          const selected = this.selectedSmd;
          if (selected.key !== '') {
            if (this.selected.smd.key !== selected.key) {
              this.selectSmd(selected.key)
            }
          } else {
            this.selected.smd = { ...selected };
            this.syncPropSmdData();
          }
        }
      },
    },
  },
  data() {
    return {
      mdOptions: [],
      smdOptions: [],
      currentSmdOptions: [],
      selected: {
        md: {
          label: '',
          key: '',
        },
        smd: {
          label: '',
          key: '',
        },
      },
      loaded: false,
      requestQueue: [],
      isRequestProcessing: false,
    };
  },
  computed: {
    mdDisabled() {
      return  this.disabled || this.disabledMd || (this.mdOptions.length === 0);
    },
    smdDisabled() {
      return  this.disabled || this.disabledSmd || (this.selected.md.key === null);
    },
  },
  mounted() {
    //this.pageId = uiUtil.findPageId(this);
    this.pageId = 'PGE_ZZZ_00001';
    http.getCodeList(this.pageId, [KEY_CODE_MODULE]).then(res => {
      this.mdOptions = selectUtil.mergeOptionList(res[KEY_CODE_MODULE], selectUtil.mergeDefaultOption(this.customMdList, this.defaultMdOption));
      this.handleCodeLoaded();
      this.$emit('loaded', this.mdOptions);
    }).catch(err => {
      console.log(err);
    });
    this.$nextTick(() => { this.bindDataset(); });
  },
  beforeDestroy() {
    this.unbindDataset();
  },
  methods: {
    syncPropMdData() {
      const selected = this.selectedMd;
      if (selected.key !== this.selected.md.key) {
        selected.key = this.selected.md.key;
        selected.label = this.selected.md.label;
      }
    },
    syncPropSmdData() {
      const selected = this.selectedSmd;
      if (selected.key !== this.selected.smd.key) {
        selected.key = this.selected.smd.key;
        selected.label = this.selected.smd.label;
      }
    },
    selectMdSmd(mdKey, smdKey) {
      this.selectMd(mdKey, true);
      this.selectSmd(smdKey);      
    },
    reqSelectMd(key) {      
      return new Promise((resolve, reject) => {
        const target = _.find(this.mdOptions, item => item.key === key);
        if (target) {
          if (this.selected.md.key !== key) {          
            this.selected.md = {...target};
          }
          this.syncPropMdData();
          this.$emit('module-selected', target);
        }
        
        // console.log(key);
        if (this.smdOptions[key]) {          
          this.currentSmdOptions = this.smdOptions[key];
          if (this.initialSelectedSmdIndex >= 0 && this.currentSmdOptions[this.initialSelectedSmdIndex]) {
            this.reqSelectSmd(this.currentSmdOptions[this.initialSelectedSmdIndex].key);
          } else {
            this.clearSubModule();
          }
          resolve(this.currentSmdOptions);
        } else if (key.trim() === '') { // 선택인 경우
          this.smdOptions[key] = selectUtil.mergeOptionList([], selectUtil.mergeDefaultOption(this.customSmdList, this.defaultSmdOption));
          this.currentSmdOptions = this.smdOptions[key];
          if (this.initialSelectedSmdIndex >= 0 && this.currentSmdOptions[this.initialSelectedSmdIndex]) {
            this.reqSelectSmd(this.currentSmdOptions[this.initialSelectedSmdIndex].key);
          } else {
            this.clearSubModule();
          }
          resolve(this.currentSmdOptions);
        } else {
          http.getSubModuleCode(this.pageId, key).then(res => {
            this.smdOptions[key] = selectUtil.mergeOptionList(res.data, selectUtil.mergeDefaultOption(this.customSmdList, this.defaultSmdOption));
            this.currentSmdOptions = this.smdOptions[key];
            if (this.initialSelectedSmdIndex >= 0 && this.currentSmdOptions[this.initialSelectedSmdIndex]) {
              this.reqSelectSmd(this.currentSmdOptions[this.initialSelectedSmdIndex].key);
            } else {
              this.clearSubModule();
            }
            resolve(this.currentSmdOptions);
          }).catch(error => {
            this.clearSubModule();
            this.currentSmdOptions = [];
            reject(null);
          });
        }
      });
    },
    reqSelectSmd(key) {
      const mdKey = this.selected.md.key;
      const target = _.find(this.smdOptions[mdKey], item => item.key === key);
      if (target) {
        if (this.selected.smd.key !== key) {
          this.selected.smd = {...target};          
        }
        this.syncPropSmdData();
        this.$emit('submodule-selected', target);
      }
      // console.log(`${this.selectedMd.key}, ${this.selectedSmd.key}`);
    },
    processRequest() {
      if (!this.loaded) {
        return;
      }
      const req = this.requestQueue.shift();
      if (req) {
        this.isRequestProcessing = true;
        if (req.type === 'md') {
          this.reqSelectMd(req.key).then((options)=>{            
            this.processRequest();
          }).catch(() => {
            this.processRequest();
          });
        } else if (req.type === 'smd') {
          this.reqSelectSmd(req.key);
          this.processRequest();
        }
      } else {
        this.isRequestProcessing = false;
      }
    },
    request(reqInfo) {
      if (reqInfo.type === 'md') {
        this.requestQueue.splice(0, this.requestQueue.length);
      }
      this.requestQueue.push(reqInfo);
      if (!this.isRequestProcessing) {
        this.processRequest();
      }
    },
    selectMd(key) {
      this.request({
        type: 'md',
        key,
      });
    },
    selectSmd(key) {
      this.request({
        type: 'smd',
        key,
      });
    },
    reset() {
      this.selected.md = {
        label: '',
        key: '',
      };
      this.selected.smd = {
        label: '',
        key: '',
      };
      this.syncPropMdData();
      this.syncPropSmdData();
    },
    clearSubModule() {
      this.selected.smd = {
        label: '',
        key: '',
      };
      this.syncPropSmdData();
    },
    handleCodeLoaded() {
      this.loaded = true;      
      let mdReq = null;
      let smdReq = null;
      if (this.requestQueue.length) {
        this.processRequest();
      } else {
        if (this.selectedMd.key) {
          this.selectMd(this.selectedMd.key);
        } else if (this.initialSelectedMdIndex >= 0 && this.mdOptions.length > this.initialSelectedMdIndex) {
          this.selectMd(this.mdOptions[this.initialSelectedMdIndex].key);
        }
        if (this.selectedSmd.key) {
          this.selectSmd(this.selectedSmd.key);
        }
      }      
    },    
    mdItemSelected(event) {
      const mdKey = event.key;
      if (this.selectedMd.key === mdKey) {
        return;
      }
      this.selectMd(mdKey);
      this.$emit('md-list-clicked', event);
    },
    smdItemSelected(event) {
      this.reqSelectSmd(event.key);
      this.$emit('smd-list-clicked', event);
    },
    bindDataset() {
      if (this.mdDataset && this.mdDataset.split('.').length === 2) {
        const splittedStr = this.mdDataset.split('.');
        const datasetId = splittedStr[0];
        const datasetField = splittedStr[1];
        const dataset = utils.findDataset(datasetId, this);
        if (dataset) {
          this.$mdDataset = dataset;
          this.mdDatasetField = datasetField;
          dataset.$on('selection-changed', this.mdDatasetSelectionChanged);
        }
      }
      if (this.smdDataset && this.smdDataset.split('.').length === 2) {
        const splittedStr = this.smdDataset.split('.');
        const datasetId = splittedStr[0];
        const datasetField = splittedStr[1];
        const dataset = utils.findDataset(datasetId, this);
        if (dataset) {
          this.$smdDataset = dataset;
          this.smdDatasetField = datasetField;
          dataset.$on('selection-changed', this.smdDatasetSelectionChanged);
        }
      }
    },
    unbindDataset() {
      if (this.$mdDataset) {
        this.$mdDataset.$off('selection-changed', this.mdDatasetSelectionChanged);
        this.$mdDataset = null;
      }
      if (this.$smdDataset) {
        this.$smdDataset.$off('selection-changed', this.smdDatasetSelectionChanged);
        this.$smdDataset = null;
      }
    },
    mdDatasetSelectionChanged() {
      const selectedRow = utils.getSelectedRow(this.$mdDataset);
      if (selectedRow) {
        this.selectMd(selectedRow[this.mdDatasetField]);
      }
    },
    smdDatasetSelectionChanged() {
      const selectedRow = utils.getSelectedRow(this.$smdDataset);
      if (selectedRow) {
        this.selectSmd(selectedRow[this.smdDatasetField]);
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>
