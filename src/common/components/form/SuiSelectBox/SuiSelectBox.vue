<template>
  <div
    class="sui-select"
    :class="classes"
  >
    <div
      class="sui-select__input"
      :class="inputClasses"
      :title="currLabel"
      @click="activate"
    >
      {{ currLabel }}
    </div>
    <div v-if="!usePopup">
      <ul
        v-show="isActive"
        class="sui-select__ul"
        :style="listStyle"
      >
        <li
          v-for="item in optionList"
          :key="item.key"
          class="sui-select__li"
          :class="{ 'sui-select--selected':item.key === value.key,
                    'sui-select__item-disabled': item.disabled,
                    'sui-select__item--style': item.style
          }"
          @click.stop="listClick(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 이름 : suiSelect
 * 설명 : ul,li 구조로 커스터마이즈를 가능케한 select
 * 최종 수정 일시 : 2018 - 10 - 15
 */
export default {
  name: 'SuiSelect',
  props: {
    value: { // 옵션리스트 중 선택된 값
      type: Object,
      required: true,
    },
    optionList: { // 표기 대상인 옵션 리스트
      type: Array,
      default: () => [],
    },
    placeholder: { // 최초 화면 구성시 보여질 값
      type: String,
      default: '',
    },
    disabled: { // 선택가능 여부
      type: Boolean,
      default: false,
    },
    highlight: { // 선택이 완료 된 경우 input영역 하이라이트 컬러 값 적용 여부
      type: Boolean,
      default: false,
    },
    custom: { // input영역 및 옵션리스트 영역 스타일 커스터마이즈 여부
      type: Boolean,
      default: false,
    },
    up: { // 옵션 리스트 위로펼침 여부
      type: Boolean,
      default: false,
    },
    alignRight: { // 옵션 리스트 오른쪽 맞춤 여부
      type: Boolean,
      default: false,
    },
    ellipsis: { // 긴텍스트항목의 경우 말줄임표 처리 여부
      type: Boolean,
      default: false,
    },
    listHeight: {
      type: [String, Number],
      default: '',
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
      selected: [],
      isActive: false, // 옵션 리스트 펼침 여부
      isSelected: this.value.label !== '' && !this.disabled, // 선택완료 되었는지 여부
      currLabel: this.value.label !== '' ? this.value.label : this.placeholder, // 현재 선택된 값으로 노출 될 레이블 텍스트
    };
  },
  computed: {
    classes() { // 최상단 div에 적용될 class속성
      return [
        { 'sui-select--active': this.isActive },
        { 'sui-select--up': this.up },
        { 'sui-select--align-right': this.alignRight },
        { 'sui-select--ellipsis': this.ellipsis },
        { 'sui-select--selected': this.isSelected && this.highlight },
        { 'sui-select--disabled': this.disabled },
      ];
    },
    inputClasses() { // input영역에 적용될 class속성
      return [
        { 'sui-select--disabled': this.disabled },
        { 'sui-select--selected': this.isSelected && this.highlight },
        { 'sui-select--placeholder': this.currLabel === this.placeholder },
      ];
    },
    listStyle() {
      const listStyleArr = [];
      if (this.listHeight) {
        listStyleArr.push({ 'max-height': `${this.listHeight}px` });
      }
      return listStyleArr;
    },
  },
  watch: {
    value(newValue) {
      // 선택 된 옵션이 바뀌면 선택완료 여부와 현재 선택된 값으로 노출될 레이블 텍스트를 변경하여준다
      this.isSelected = (newValue.key !== '' && !this.disabled);
      const foundOption = _.find(this.optionList, option => option.key === newValue.key);
      if (foundOption) {
        this.currLabel = foundOption.label !== '' ? foundOption.label : this.placeholder;
      } else {
        this.currLabel = newValue.label !== '' ? newValue.label : this.placeholder;
      }
    },
    optionList(newList) {
      // 선택 된 옵션이 바뀌면 선택완료 여부와 현재 선택된 값으로 노출될 레이블 텍스트를 변경하여준다
      this.isSelected = (this.value.key !== '' && !this.disabled);
      const foundOption = _.find(newList, option => option.key === this.value.key);
      if (foundOption) {
        this.currLabel = foundOption.label !== '' ? foundOption.label : this.placeholder;
      } else {
        this.currLabel = this.value.label !== '' ? this.value.label : this.placeholder;
      }
    },
  },
  methods: {
    activate() {
      if (!this.disabled) {
        if (this.isActive) {
          this.$emit('deactivate');
          this.isActive = false;
          return;
        }
        this.isActive = true;
        if (this.usePopup) {
          this.selected.splice(0, this.selected.length);
          this.selected.push(this.value);
          const portal = this.getPortalComponent();
          portal.setOptions(this.optionList);
          utils.activatePortalComponent(portal, this.$el, this.deactivatePortal);
          this.$emit('activate');
        }
        this.bindEvents(this.portal);
      }
    },
    deactivate() { // portal에서 선택시 여기로 들어옴
      if (this.disabled || !this.isActive) {
        return;
      }
      this.isActive = false;
      this.unbindEvents(this.portal);
      if (this.usePopup && this.selected[0]) {
        this.listClick(this.selected[0]);
      }
      this.$emit('deactivate');
    },
    listClick(target) { // 옵션 리스트 클릭 이벤트 발생 시 선택된 옵션을 현재 선택값에 반영
      if (target.disabled) {
        return;
      }
      this.currLabel = target.label;
      this.$emit('input', target);
      this.isActive = false;
      this.unbindEvents();
      this.$emit('list-click', target);
    },
    getPortalComponent() {
      if (!this.portal) {
        const propsData = {
          options: _.clone(this.optionList),
          value: this.selected,
          multiple: false,
          closeOnSelect: true,
          usePopup: true,
          searchable: this.searchable,
        };
        const componentInstance = utils.createPortalComponent('sui-multi-select-popup', propsData);
        this.portal = componentInstance;
      }
      return this.portal;
    },
    deactivatePortal(fromEsc) {
      this.deactivate();
    },
    onItemSelected(event) {
      this.selected.splice(0, this.selected.length);
      if (event === null) {
        // do nothing
      } else {
        this.selected.push(event);
      }
    },
    setFocus() {
      this.activate();
    },
    handleDocumentMouseDown(e) {
      if (!this.$el.contains(e.target)) {
        this.deactivate();
      }
    },
    bindEvents(componentInstance) {
      if (this.usePopup) {
        if (componentInstance) {
          componentInstance.$on('deactivate', this.deactivatePortal);
          componentInstance.$on('input', this.onItemSelected);
        }
      } else {
        document.addEventListener('mousedown', this.handleDocumentMouseDown, true);
      }
    },
    unbindEvents(componentInstance) {
      if (this.usePopup) {
        if (componentInstance) {
          componentInstance.$off('deactivate', this.deactivatePortal);
          componentInstance.$off('input', this.onItemSelected);
        }
      } else {
        document.removeEventListener('mousedown', this.handleDocumentMouseDown, true);
      }
    }
  },

};
</script>

<style>
</style>
