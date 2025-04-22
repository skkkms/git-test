<template>
  <div v-show="visibility" class='-grid-cell-component'>
    <cell-label
      v-if="!editable"
      :value="selectedLabel"
    />
    <div ref="select" :disabled="disabled" v-show="editable" tabindex="-1" class="multiselect multiselect--above" @click.prevent.stop="onFocus()">
      <div class="multiselect__select"></div>
      <div class="multiselect__tags">
        <span :title="selectedLabel">{{selectedLabel}}</span>
        <!-- <input class="multiselect__input" name="" type="text" :readonly="true" autocomplete="nope" tabindex="0" :style="inputStyle"
          @input="updateSearch($event.target.value)"
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MultiSelect from '~common/components/form/SuiMultiSelect/SuiMultiSelect';
import CellLabel from '../CellLabel/CellLabelView';

export default {
  name: 'CellMultiSelect',
  components: {
    'cell-label': CellLabel,
  },
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
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: null,
    },
    optionList: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    closeOnSelect: {
      type: Boolean,
      default: false,
    },
    filterFunction: {
      default: null,
    },
    width: {
      default: null,
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
      editable: true,
      disabled: false,
      visibility: true,
      focused: false,
      selectedlabels: [],
      selectedLabel: this.value && _.find(this.optionList, option => option.key === this.value) ? _.find(this.optionList, option => option.key === this.value).label : '',
      selectedKeys: [],
      selected: [],
      isActivate: false,
      filteredOptionList: [],
    };
  },
  computed: {
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
    updateValue: function(value) {
      this.selectedValue = value;
      this.$emit('input', value);
    },
    select(value) {
      if (this.selectedValue !== value) {
        this.selectedValue = value;
      }
    },
    onFocus() {
      if (!this.disabled) {
        this.focused = true;
        this.activate();
      }
    },
    activate() {
      if (!this.disabled) {
        this.activatePortal();
      }
    },
    deactivate() {
      this.portal.deactivate();
    },
    updateSearch(event) {
      this.portal.updateSearch(event);
    },
    getPortalComponent() {
      const rowInfo = this.getRowInfo();
      if (!this.portal) {
        if (this.filterFunction) {
          this.filteredOptionList = this.filterFunction(this.optionList, rowInfo.rowIndex, rowInfo.rowData, rowInfo.columnName, rowInfo.value, rowInfo.dataset, rowInfo.grid);
        } else {
          this.filteredOptionList = _.clone(this.optionList);
        }
        const propsData = {
          options: this.filteredOptionList,
          value: this.selected,
          multiple: this.multiple,
          closeOnSelect: this.closeOnSelect,
          usePopup: true,
          placeholder: '',
          searchable: this.searchable,
        };
        const componentInstance = utils.createPortalComponent('sui-multi-select-popup', propsData);
        this.portal = componentInstance;
      } else if (this.filterFunction) {
        const filteredOptionList = this.filterFunction(this.optionList, rowInfo.rowIndex, rowInfo.rowData, rowInfo.columnName, rowInfo.value, rowInfo.dataset, rowInfo.grid);
        this.filteredOptionList.splice(0, this.filteredOptionList.length);
        _.forEach(filteredOptionList, option => this.filteredOptionList.push(option));
      }
      return this.portal;
    },
    onItemSelected(event) {
      this.selected.splice(0, this.selected.length);
      if (event === null) {
        // do nothing
      } else if (event.constructor.name === 'Array') {
        event.forEach(select => {
          this.selected.push(select);
        });
      } else {
        this.selected.push(event);
      }
    },    
    activatePortal() {
      if (this.isActivate) {
        return;
      }
      this.isActivate = true;
      this._selected = _.clone(this.selected);
      // this.$emit('activate');
      // this.portal.$on('deactivate', this.deactivatePortal);
      utils.activatePortalComponent(this.getPortalComponent(), this.$el, null, this.width);
      this.getPortalComponent().$on('deactivate', this.deactivatePortal);      
      this.portal.$on('input', this.onItemSelected);
    },
    deactivatePortal(value) {
      if (!this.isActivate) {
        return;
      }
      this.isActivate = false;
      this.focused = false;
      const newSelectedLabels = [];
      const newSelectedKeys = [];
      if (value) {
        this.selected.forEach(select => {
          newSelectedLabels.push(select.label);
          newSelectedKeys.push(select.key);
        });
      } else {
        this.selected.splice(0, this.selected.length);
        this._selected.forEach(item => {
          this.selected.push(item);
          newSelectedLabels.push(item.label);
          newSelectedKeys.push(item.key);
        });
      }
      this.selectedLabels = newSelectedLabels;
      this.selectedLabel = this.getDisplayLabel();
      this.selectedKeys = newSelectedKeys;
      this.portal.$off('input', this.onItemSelected);
      this.portal.$off('deactivate', this.deactivatePortal);
      if (value) {
        this.$emit('select', this.getStrValue());
      }
      this.$emit('deactivate');
    },
    setStrValue(strValue) {
      const splittedStr = strValue.split(',').map(item => item.trim());
      this.selectedOption = splittedStr;
      const selectedItems = [];
      const newSelectedLabels = [];
      const newSelectedKeys = [];
      _.forEach(this.optionList, option => {
        if (_.some(splittedStr, str => option.key === str)) {
          selectedItems.push(option);
          newSelectedLabels.push(option.label);
          newSelectedKeys.push(option.key);
        }
      });
      this.selected.splice(0, this.selected.length);
      selectedItems.forEach(select => {
        this.selected.push(select);
      });
      this.selectedlabels = newSelectedLabels;
      this.selectedKeys = newSelectedKeys;
      this.selectedLabel = this.getDisplayLabel();
    },
    getStrValue() {
      let label = '';
      for (let i = 0; i < this.selectedKeys.length; i += 1) {
        if (i !== this.selectedKeys.length - 1) {
          label += `${this.selectedKeys[i]},`;
        } else {
          label += `${this.selectedKeys[i]}`;
        }
      }
      return label;
    },
    setValue(strValue) {
      this.setStrValue(strValue);
    },
    getValue() {
      return this.getStrValue();
    },
    setFocus() {
      this.$refs.select.focus();
    },
    getDisplayLabel() {
      if (this.multiple && this.selectedlabels.length === this.optionList.length)  {
        return utils.getMessageById('MSG_TXT_ALL');
      }
      let label = ''
      for (let i = 0; i < this.selectedlabels.length; i++) {
        if (i === 0) {
          label += `${this.selectedlabels[i]}`;
        } else {
          label += `, ${this.selectedlabels[i]}`;
        }
      }
      return label;
    }
  },
  beforeDestroy() {
    if (this.portal) {
      if (this.portal.$el.parentNode) {
        this.portal.$el.parentNode.removeChild(this.portal.$el);
      }
      this.portal.$destroy();
      this.portal = null;
    }
    this.getRowInfo = null;
    this.handleBeforeDestroy();
  },
}
</script>

<style scoped>
</style>