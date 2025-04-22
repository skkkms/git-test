<template>
  <div
    v-show="usePopup ? isOpen : true"
    :tabindex="searchable ? -1 : tabindex"
    :class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled, 'multiselect--above': isAbove }"
    class="multiselect"
    @click.prevent.stop="activate()"
    @keydown.self.down.prevent="pointerForward()"
    @keydown.self.up.prevent="pointerBackward()"
    @keypress.enter.tab.stop.self="addPointerElement($event)"
    @keyup.esc="deactivate('cancel')"
  >
    <slot
      name="caret"
      :toggle="toggle"
    >
      <div
        class="multiselect__select"
        @mousedown.prevent.stop="toggle()"
      />
    </slot>
    <slot
      name="clear"
      :search="search"
    />
    <div
      ref="tags"
      class="multiselect__tags"
    >
      <span
        v-if="showDefaultSelection && !isOpen"
        :title="selectedItemsLabel"
      >
        {{ selectedItemsLabel }}
      </span>
      <slot
        v-if="!showDefaultSelection"
        name="selection"
        :search="search"
        :remove="removeElement"
        :values="visibleValues"
        :is-open="isOpen"
      >
        <div
          v-show="visibleValues.length > 0"
          class="multiselect__tags-wrap"
        >
          <template
            v-for="(option, index) of visibleValues"
            @mousedown.prevent
          >
            <slot
              name="tag"
              :option="option"
              :search="search"
              :remove="removeElement"
            >
              <span
                :key="index"
                class="multiselect__tag"
              >
                <label
                  v-text="getOptionLabel(option)"
                />
                <i
                  aria-hidden="true"
                  tabindex="1"
                  class="multiselect__tag-icon"
                  @keypress.enter.prevent="removeElement(option)"
                  @mousedown.prevent="removeElement(option)"
                />
              </span>
            </slot>
          </template>
        </div>
        <template v-if="internalValue && internalValue.length > limit">
          <slot name="limit">
            <strong
              class="multiselect__strong"
              v-text="limitText(internalValue.length - limit)"
            />
          </slot>
        </template>
      </slot>
      <transition name="multiselect__loading">
        <slot name="loading">
          <div
            v-show="loading"
            class="multiselect__spinner"
          />
        </slot>
      </transition>
      <input
        v-if="searchable"
        :id="id"
        ref="search"
        :name="name"
        type="text"
        autocomplete="nope"
        :placeholder="placeholder"
        :style="inputStyle"
        :value="search"
        :disabled="disabled"
        :tabindex="tabindex"
        class="multiselect__input"
        @input="updateSearch($event.target.value)"
        @keyup.esc="deactivate('cancel')"
        @keydown.down.prevent="pointerForward()"
        @keydown.up.prevent="pointerBackward()"
        @keypress.enter.prevent.stop.self="addPointerElement($event)"
        @keydown.delete.stop="removeLastElement()"
      >
      <span
        v-else
        :id="id"
        ref="search"
        :name="name"
        type="text"
        autocomplete="nope"
        :placeholder="placeholder"
        :style="inputStyle"
        :value="search"
        :disabled="disabled"
        :tabindex="tabindex"
        class="multiselect__input"
        @focus.prevent="activate()"
        @keyup.esc="deactivate('cancel')"
        @keydown.down.prevent="pointerForward()"
        @keydown.up.prevent="pointerBackward()"
        @keypress.enter.prevent.stop.self="addPointerElement($event)"
        @keydown.delete.stop="removeLastElement()"
      >
        {{ selectedItemsLabel }}
      </span>
      <span
        v-if="isSingleLabelVisible"
        class="multiselect__single"
        @mousedown.prevent="toggle"
      >
        <slot
          name="singleLabel"
          :option="singleValue"
        >
          <template>{{ currentOptionLabel }}</template>
        </slot>
      </span>
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

    <div
      v-show="isOpen"
      ref="list"
      class="multiselect__content-wrapper"
      tabindex="-1"
      :style="{ maxHeight: optimizedHeight + 'px' }"
      @focus="activate"
      @mousedown.prevent
    >
      <ul
        class="multiselect__content"
        :style="contentStyle"
        :class="contentClass"
      >
        <slot
          name="beforeList"
        />
        <li v-if="multiple && max === internalValue.length">
          <span class="multiselect__option">
            <slot name="maxElements">
              Maximum of {{ max }} options selected. First remove a selected option to select another.
            </slot>
          </span>
        </li>
        <template v-if="!max || internalValue.length < max">
          <li
            v-for="(option, index) of filteredOptions"
            :key="index"
            class="multiselect__element"
          >
            <span
              v-if="!(option && (option.$isLabel || option.$isDisabled))"
              :class="optionHighlight(index, option)"
              :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
              :data-selected="selectedLabelText"
              :data-deselect="deselectLabelText"
              class="multiselect__option"
              @click.stop="select(option)"
              @mouseenter.self="pointerSet(index)"
            >
              <slot
                name="option"
                :option="option"
                :search="search"
              >
                <input
                  v-if="multiple && !isAllOption(option)"
                  readonly
                  type="checkbox"
                  :checked="isSelected(option)"
                >
                <input
                  v-if="isAllOption(option)"
                  readonly
                  type="checkbox"
                  :checked="isSelectedAll"
                  style="margin-left: 0"
                >
                <label
                  :title="getOptionLabel(option)"
                >
                  {{ getOptionLabel(option) }}
                </label>
              </slot>
            </span>
            <span
              v-if="option && (option.$isLabel || option.$isDisabled)"
              :data-select="groupSelect && selectGroupLabelText"
              :data-deselect="groupSelect && deselectGroupLabelText"
              :class="groupHighlight(index, option)"
              class="multiselect__option"
              @mouseenter.self="groupSelect && pointerSet(index)"
              @mousedown.prevent="selectGroup(option)"
            >
              <slot
                name="option"
                :option="option"
                :search="search"
              >
                <label>{{ getOptionLabel(option) }}</label>
              </slot>
            </span>
          </li>
        </template>
        <li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
          <span class="multiselect__option">
            <slot
              name="noResult"
              :search="search"
            >
              {{ noResultText }}
            </slot>
          </span>
        </li>
        <li v-show="showNoOptions && (options.length === 0 && !search && !loading)">
          <span class="multiselect__option">
            <slot name="noOptions">{{ noOptionsText }}</slot>
          </span>
        </li>
        <slot
          name="afterList"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import multiselectMixin from './multiselectMixin';
import pointerMixin from './pointerMixin';

export default {
  name: 'SuiMultiSelectPopup',
  mixins: [multiselectMixin, pointerMixin],
  props: {
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
    selectLabel: {
      type: String,
      // default: 'Press enter to select'
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectGroupLabel: {
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
      default: 'Selected'
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectLabel: {
      type: String,
      // default: 'Press enter to remove'
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectGroupLabel: {
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
      default: 240,
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
    // add for EHS start
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
    // add for EHS end
  },
  data() {
    return {
      noResultText: utils.getMessageById('MSG_TXT_NO_RESULT'),
      noOptionsText: utils.getMessageById('MSG_TXT_NO_OPT'),
    };
  },
  computed: {
    contentClass() {
      if (!this.multiple) {        
        return 'multiselect__content_single';
      }
    },
    isSingleLabelVisible() {
      return false; // popup 용도이기 때문에 선택된 Label이 보여지는 경우는 없음
      // return (
      //   (this.singleValue || this.singleValue === 0) &&
      //   (!this.isOpen || !this.searchable) &&
      //   !this.visibleValues.length
      // )
    },
    isPlaceholderVisible() {
      return !this.internalValue.length && (!this.searchable || !this.isOpen);
    },
    visibleValues() {
      return this.multiple ? this.internalValue.slice(0, this.limit) : [];
    },
    singleValue() {
      return this.internalValue[0]
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
    inputStyle() {
      if (
        this.searchable ||
        (this.multiple && this.value && this.value.length)
      ) {
        // Hide input by setting the width to 0 allowing it to receive focus
        return this.isOpen
          ? { width: '100%' }
          : { width: '0', position: 'absolute', padding: '0' }
      }
    },
    contentStyle() {
      return this.options.length
        ? { display: '' }
        : { display: 'block' }
    },
    isAbove() {
      if (this.openDirection === 'above' || this.openDirection === 'top') {
        return true;
      } else if (
        this.openDirection === 'below' ||
        this.openDirection === 'bottom'
      ) {
        return false
      } else {
        return this.preferredOpenDirection === 'above'
      }
    },
    showSearchInput() {
      return (
        this.searchable
        && (this.hasSingleSelectedSlot
        && (this.visibleSingleValue || this.visibleSingleValue === 0)
          ? this.isOpen
          : true)
      );
    },
    selectedItemsLabel() {
      let label = '';
      if (this.value.length > 1) {
        let i = 0;
        while (i < this.value.length) {
          if (!this.value[i][this.label]) {
            const target = _.find(this.options, option => {
              return option[this.trackBy] === this.value[i][this.trackBy];
            });
            if (target) {
              this.value[i] = target;
            }
          }
          const itemLabel = this.value[i][this.label];
          if (i === 0) {
            label += itemLabel;
          } else if (i > 2) {
            label += `, ...`;
            break;
          } else {
            label += `, ${itemLabel}`;
          }
          i++;
        }
      } else if (this.value.length === 1 && this.value[this.label]) {
        return this.value[this.label];
      }
      return label;
    },
  },
};
</script>

<style scoped>
</style>
