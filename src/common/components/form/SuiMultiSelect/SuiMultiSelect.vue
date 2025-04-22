<template>
  <div
    :tabindex="tabindex"
    :class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled, 'multiselect--above': isAbove }"
    class="multiselect"
    @click.prevent.stop="activate()"
    @keyup.esc="deactivate('cancel')"
  >
    <slot name="caret" :toggle="toggle">
      <div class="multiselect__select" @mousedown.prevent.stop="toggle()" />
    </slot>
    <slot name="clear" :search="search" />
    <div ref="tags" class="multiselect__tags">
      <span v-if="showDefaultSelection && !isOpen" :title="selectedItemsLabel"> {{ selectedItemsLabel }} </span>
      <slot v-if="!showDefaultSelection"
            name="selection"
            :search="search"
            :remove="removeElement"
            :values="visibleValues"
            :is-open="isOpen"
      >
        <template v-if="internalValue && internalValue.length > limit">
          <slot name="limit">
            <strong class="multiselect__strong" v-text="limitText(internalValue.length - limit)" />
          </slot>
        </template>
      </slot>
      <transition name="multiselect__loading">
        <slot name="loading">
          <div v-show="loading" class="multiselect__spinner" />
        </slot>
      </transition>
      <span
        v-if="isPlaceholderVisible"
        class="multiselect__placeholder"
        @mousedown.prevent="toggle"
      >
        <slot name="placeholder">
          {{ placeholder }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuiMultiSelectBox',
  props: {
    options: {
      type: Array,
      required: true,
    },
    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     * @default false
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * Presets the selected options valuevalue.
     * @type {Object||Array||String||Integer}
     */
    value: {
      type: null,
      default() {
        return [];
      },
    },
    /**
     * Equivalent to the `placeholder` attribute on a `<select>` input.
     * @default 'Select option'
     * @type {String}
     */
    placeholder: {
      type: String,
      default() {
        return utils.getMessageById('MSG_TXT_SEL'); // For EHS
      },
    },
    /**
     * name attribute to match optional label element
     * @default ''
     * @type {String}
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectLabel: { // eslint-disable-line vue/require-default-prop
      type: String,
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectGroupLabel: { // eslint-disable-line vue/require-default-prop
      type: String,
      // default: 'Press enter to select group'
    },
    /**
     * String to show next to selected option
     * @default 'Selected'
     * @type {String}
     */
    selectedLabel: {
      type: String,
      default: 'Selected',
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectLabel: { // eslint-disable-line vue/require-default-prop
      type: String,
      // default: 'Press enter to remove'
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectGroupLabel: { // eslint-disable-line vue/require-default-prop
      type: String,
      // default: 'Press enter to deselect group'
    },
    /**
     * Decide whether to show pointer labels
     * @default true
     * @type {Boolean}
     */
    showLabels: {
      type: Boolean,
      default: true,
    },
    /**
     * Limit the display of selected options. The rest will be hidden within the limitText string.
     * @default 99999
     * @type {Integer}
     */
    limit: {
      type: Number,
      default: 99999,
    },
    /**
     * Sets maxHeight style value of the dropdown
     * @default 300
     * @type {Integer}
     */
    maxHeight: {
      type: Number,
      default: 180,
    },
    /**
     * Function that process the message shown when selected
     * elements pass the defined limit.
     * @default 'and * more'
     * @param {Int} count Number of elements more than limit
     * @type {Function}
     */
    limitText: {
      type: Function,
      default: count => `and ${count} more`,
    },
    /**
     * Set true to trigger the loading spinner.
     * @default False
     * @type {Boolean}
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * Disables the multiselect if true.
     * @default false
     * @type {Boolean}
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Fixed opening direction
     * @default ''
     * @type {String}
     */
    openDirection: {
      type: String,
      default: '',
    },
    /**
     * Shows slot with message about empty options
     * @default true
     * @type {Boolean}
     */
    showNoOptions: {
      type: Boolean,
      default: true,
    },
    showNoResults: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    showDefaultSelection: {
      type: Boolean,
      default: true,
    },
    usePopup: {
      type: Boolean,
      default: false,
    },
    useAllOption: {
      type: Boolean,
      default: true,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    trackBy: {
      type: String,
      default: 'key',
    },
    label: {
      type: String,
      default: 'label',
    },
    labelSelectedItmeCount: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      isOpen: false,
      preferredOpenDirection: 'below',
      optimizedHeight: this.maxHeight,
      eventBindedElements: [],
      selected: [],
    };
  },
  computed: {
    contentClass() {
      if (!this.multiple) {
        return 'multiselect__content_single';
      }

      return '';
    },
    isPlaceholderVisible() {
      return !this.internalValue.length && !this.isOpen;
    },
    visibleValues() {
      return this.multiple ? this.internalValue.slice(0, this.limit) : [];
    },
    singleValue() {
      return this.internalValue[0];
    },
    deselectLabelText() {
      return this.showLabels ? this.deselectLabel : '';
    },
    deselectGroupLabelText() {
      return this.showLabels ? this.deselectGroupLabel : '';
    },
    selectLabelText() {
      return this.showLabels ? this.selectLabel : '';
    },
    selectGroupLabelText() {
      return this.showLabels ? this.selectGroupLabel : '';
    },
    selectedLabelText() {
      return this.showLabels ? this.selectedLabel : '';
    },
    contentStyle() {
      return this.options.length
        ? { display: 'inline-block' }
        : { display: 'block' };
    },
    isAbove() {
      if (this.openDirection === 'above' || this.openDirection === 'top') {
        return true;
      }
      if (this.openDirection === 'below' || this.openDirection === 'bottom') {
        return false;
      }

      return this.preferredOpenDirection === 'above';
    },
    selectedItemsLabel() {
      let label = '';
      const count = this.value.length;
      if (count) {
        if (this.labelSelectedItmeCount) {
          label = `Selected Item (${count}/${this.options.length})`;
        } else if (count === this.options.length) {
          label = utils.getMessageById('MSG_TXT_ALL');
        } else {
          label = this.value.map(item => item.label).join(', ');
        }
      }
      return label;
    },
    internalValue() {
      // eslint-disable-next-line no-nested-ternary
      return this.value || this.value === 0
        ? Array.isArray(this.value) ? this.value : [this.value]
        : [];
    },
  },
  methods: {
    /**
     * Returns the internalValue in a way it can be emited to the parent
     * @returns {Object||Array||String||Integer}
     */
    getValue() {
      // eslint-disable-next-line no-nested-ternary
      return this.multiple
        ? this.internalValue
        : this.internalValue.length === 0
          ? null
          : this.internalValue[0];
    },
    /**
     * Updates the search value
     * @param  {String}
     */
    updateSearch(query) {
      this.search = query;
    },
    /**
     * Finds out if the given query is already present
     * in the available options
     * @param  {String}
     * @returns {Boolean} returns true if element is available
     */
    isExistingOption(query) {
      return !this.options
        ? false
        : this.optionKeys.indexOf(query) > -1;
    },
    /**
     * Finds out if the given element is already present
     * in the result value
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is selected
     */
    isSelected(option) {
      const opt = this.trackBy
        ? option[this.trackBy]
        : option;
      return this.valueKeys.indexOf(opt) > -1;
    },
    /**
     * Finds out if the given option is disabled
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is disabled
     */
    isOptionDisabled(option) {
      return !!option.$isDisabled;
    },
    /**
     * Add the given option to the list of selected options
     * or sets the option as the selected option.
     * If option is already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} option to select/deselect
     * @param  {Boolean} block removing
     */
    select(option, key) {
      /* istanbul ignore else */
      if (this.isConditionAllTrue(option.$isLabel, this.groupSelect)) {
        this.selectGroup(option);
        return;
      }
      if (this.isConditionAnyTrue((this.blockKeys.indexOf(key) !== -1),
        this.disabled,
        option.$isDisabled,
        option.$isLabel,
      )) return;
      /* istanbul ignore else */
      if (this.isConditionAllTrue(this.max, this.multiple, (this.internalValue.length === this.max))) return;
      /* istanbul ignore else */
      if (this.isConditionAllTrue((key === 'Tab'), !this.pointerDirty)) return;
      if (option.isTag) {
        this.$emit('tag', option.label, this.id);
        this.search = '';
        if (this.closeOnSelect && !this.multiple) this.deactivate();
      } else {
        const isSelected = this.isSelected(option);

        if (this.isConditionAllTrue(isSelected, this.multiple)) {
          if (key !== 'Tab') this.removeElement(option); // 멀티 선택인 경우에만 선택 해제 지원
          return;
        }

        if (this.isConditionAllTrue(isSelected, !this.multiple)) {
          // do nothing
        } else if (option[this.trackBy] !== '_ALL') {
          this.$emit('select', option, this.id);
        }

        if (this.multiple) {
          if (this.useAllOption && option[this.trackBy] === '_ALL') {
            if (this.isSelectedAll) {
              this.$emit('input', [], this.id);
            } else {
              // this.$emit('input', _.clone(this.options), this.id);
              let newOptions = this.internalValue;
              this.options.forEach(op => {
                if (!this.isSelected(op)) {
                  newOptions = newOptions.concat([op]);
                }
              });
              this.$emit('input', newOptions, this.id);
            }
          } else {
            this.$emit('input', this.internalValue.concat([option]), this.id);
          }
        } else {
          this.$emit('input', option, this.id);
        }

        /* istanbul ignore else */
        if (this.clearOnSelect) this.search = '';
      }
      /* istanbul ignore else */
      if (this.closeOnSelect) this.deactivate();
    },

    selectAll() {
      this.options.forEach(option => {
        if (!this.isSelected(option)) {
          this.select(option);
        }
      });
    },

    deselectAll() {
      this.options.forEach(option => {
        if (this.isSelected(option)) {
          this.select(option);
        }
      });
    },

    /**
     * Add the given group options to the list of selected options
     * If all group optiona are already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} group to select/deselect
     */
    selectGroup(selectedGroup) {
      const group = this.options.find(option => {
        return option[this.groupLabel] === selectedGroup.$groupLabel;
      });

      if (!group) return;

      if (this.wholeGroupSelected(group)) {
        this.$emit('remove', group[this.groupValues], this.id);
        const newValue = this.internalValue.filter(option => group[this.groupValues].indexOf(option) === -1);
        this.$emit('input', newValue, this.id);
      } else {
        const optionsToAdd = group[this.groupValues].filter(option => !(this.isOptionDisabled(option) || this.isSelected(option)));
        this.$emit('select', optionsToAdd, this.id);
        this.$emit(
          'input',
          this.internalValue.concat(optionsToAdd),
          this.id,
        );
      }
    },
    activate() {
      if (this.isOpen || this.disabled) {
        return;
      }
      this.isOpen = true;
      const selected = _.clone(this.value);
      this.selected.splice(0, this.selected.length);
      selected.forEach(item => { this.selected.push(item); });
      const portal = this.getPortalComponent();
      portal.setOptions(this.options);
      utils.activatePortalComponent(portal, this.$el);
      this.bindEvents(portal);
      this.$emit('open', this.id);
      this.$emit('activate', this.id);
    },
    deactivate() {
      if (!this.isOpen) {
        return;
      }
      this.isOpen = false;
      this.unbindEvents(this.portal);
      this.portal.deactivate();
    },
    toggle() {
      if (this.isOpen) {
        this.deactivate();
      } else {
        this.activate();
      }
    },
    getPortalComponent() {
      if (!this.portal) {
        const propsData = {
          options: _.clone(this.options),
          value: this.selected,
          multiple: this.multiple,
          closeOnSelect: this.closeOnSelect,
          usePopup: true,
        };
        const componentInstance = utils.createPortalComponent('sui-multi-select-popup', propsData);
        this.portal = componentInstance;
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
    onPortalClose(value) {
      this.deactivate();
      if (value) {
        this.$emit('input', this.selected);
      }
    },
    bindEvents(componentInstance) {
      componentInstance.$on('deactivate', this.onPortalClose);
      componentInstance.$on('input', this.onItemSelected);
    },
    unbindEvents(componentInstance) {
      componentInstance.$off('deactivate', this.onPortalClose);
      componentInstance.$off('input', this.onItemSelected);
    },
    isConditionAllTrue(...items) {
      if (utils.isEmpty(items)) return false
      return !(items.filter(item => !item).length > 0)
    },
    isConditionAnyTrue(...items) {
      if (utils.isEmpty(items)) return false
      return items.filter(item => item).length > 0
    },
  },
};
</script>

<style scoped>
</style>
