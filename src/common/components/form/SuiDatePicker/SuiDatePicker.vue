<template>
  <div
    class="sui-date-picker"
    :class="classes"
    @touchstart="getTouchEvent"
  >
    <date-picker
      v-if="!isRange"
      ref="suiDatepicker"
      v-model="state"
      :typeable="typeable"
      :virtual="virtual"
      :dateValueFormat="dateValueFormat"
      calendarButton
      calendarButtonIcon="sui-date-picker--icon"
      :disabled="disabled"
      :disabledDates="stateForDisabledDates"
      :placeholder="hintText"
      :format="format"
      :sticky="sticky"
      :mobile="mobile"
      :small="small"
      :clearOnError="clearOnError"
      :minimumView="minimumView"
      :maximumView="maximumView"
      :initialView="initialView"
      :readonly="readonly"
      :highlighted="highlighted"
      :is-range="isRange"
      :inline="inline"
      :hideInput="hideInput"
      :is-popup="isPopup"
      bootstrapStyling
      @selected="selected"
      @dateIsNan="dateIsNan"
      @isDatePickerOpen="isDatePickerOpen"
      @range-select="onRangeSelect"
      @opened="onOpened"
      @typedDate="onConfirm"
      @cleared="cleared"
      @confirm="onConfirm"
      @reqOpen="activate"
    />
    <double-date-picker
      v-else
      ref="suiDatepicker"
      v-model="state"
      :typeable="typeable"
      :virtual="virtual"
      calendarButton
      calendarButtonIcon="sui-date-picker--icon"
      :disabled="disabled"
      :disabledDates="stateForDisabledDates"
      :placeholder="hintText"
      :format="format"
      :sticky="sticky"
      :mobile="mobile"
      :small="small"
      :clearOnError="clearOnError"
      :minimumView="minimumView"
      :maximumView="maximumView"
      :initialView="initialView"
      :readonly="readonly"
      :highlighted="highlighted"
      :is-range="isRange"
      :inline="inline"
      :hideInput="hideInput"
      :is-popup="isPopup"
      bootstrapStyling
      @selected="selected"
      @dateIsNan="dateIsNan"
      @isDatePickerOpen="isDatePickerOpen"
      @range-select="onRangeSelect"
      @opened="onOpened"
      @typedDate="onConfirm"
      @cleared="cleared"
      @confirm="onConfirm"
      @reqOpen="activate"
    />
  </div>
</template>

<script>
/**
 * 이름 : suiDatepicker
 * 설명 : 달력 컴포넌트 (vuejs-date-picker (open source)를 wrapping하여 개발)
 * 최종 수정 일시 : 2020 - 03 - 17
 */
import store from '~system/vuex'; // for get user session saved at store
import DatePicker from './vuejs-date-picker/components/Datepicker.vue';
import DoubleDatePicker from './vuejs-date-picker/components/DoubleDatepicker.vue';
import { ko } from './vuejs-date-picker/locale';
import datasetBase from '../SuiDatasetBase/SuiDatasetBase';


// Layout 사이즈
const DATE_PICKER_OPENED_WIDTH_FOR_WEEK = 198;
const DATE_PICKER_OPENED_HEIGHT_FOR_WEEK = 258;
const DATE_PICKER_OPENED_WIDTH_FOR_YEAR = 198;
const DATE_PICKER_OPENED_HEIGHT_FOR_YEAR = 258;
const DATE_PICKER_OPENED_WIDTH_FOR_MONTH = 198;
const DATE_PICKER_OPENED_HEIGHT_FOR_MONTH = 258;
const DATE_PICKER_OPEND_WIDTH_FOR_RANGE = 396;
const DATE_PICKER_OPEND_HEIGHT_FOR_RANGE = 258;
const DATE_PICKER_OPEND_WIDTH = 198;
const DATE_PICKER_OPEND_HEIGHT = 258;
const DATE_PICKER_INPUT_HEIGHT = 20;

// separator
const SEPARATOR = '~';

// TODO: Using this on getContainerElement().
const CLASSLIST_FOR_CONTAINER = [
  '-page-contents__wrapper',
];

const getContainerElement = function getContainerElement(element) {
  let currentElement = element.parentElement;
  while (currentElement) {
    // TODO: Using this on getContainerElement().
    if (_.includes(currentElement.classList, '-page-contents__wrapper')) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
};

export default {
  name: 'SuiDatepicker',
  components: { DatePicker, DoubleDatePicker },
  directives: {
    // 달력 외부를 선택하면 달력 끄는 동작 directive 연결
    'date-picker-click-outside': {
      bind(el, binding) {
        // Define Handler and cache it on the element
        const handler = e => {
          if ((!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener('mousedown', handler);
      },
      unbind(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('mousedown', el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },
  extends: datasetBase,
  props: {
    dateValueFormat: {
      type: String,
      default: () => store.getters.userInfo.dateValueFormat || 'YYYYMMDD',
    },
    value: { type: [String, Date, Object], default: '' }, // 부모로부터 입력 받은 날짜
    // 화면에 날짜를 표시하는 포맷
    format: {
      type: [String, Function],
      default: () => store.getters.userInfo.dateFormat || 'YYYY-MM-DD',
    },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false }, // 해당 component의 diabled 여부
    readonly: { type: Boolean, default: false }, // 해당 component의 readonly 여부
    minimumView: { type: String, default: 'day' }, // 달력 모양을 표시/선택하는 최소 범위
    maximumView: { type: String, default: 'year' }, // 달력 모양을 표시/선택하는 최대 범위
    initialView: { type: String, default: 'day' }, // 달력 모양을 표시/선택하는 초기 범위 - 'day', 'range', 'week', 'month', 'year'
    disabledDates: { type: [Object, String], default: () => {} }, // 달력에서 선택할 수 없는(disabled) 날짜 범위.
    up: { type: Boolean, default: false },
    alignRight: { type: Boolean, default: false },
    typeable: { type: Boolean, default: true }, // NOTE: G-EHS용은 항상 입력가능한 상태. 달력에 수동 input 가능 여부
    virtual: { type: Boolean, default: false }, // 가상키패드(넘버) 사용 여부
    sticky: { type: Boolean, default: true }, // NOTE: SEHS 용으로 기본값 true로 수정, 데이트피커가 input 옆에 붙는 여부(popup X)
    small: { type: Boolean, default: false }, // 데이트피커 small 버전 여부
    mobile: { type: Boolean, default: false }, // 데이트피커 mobile 버전 여부,
    range: Object, // 데이트피커 범위지정
    isRange: { type: Boolean, default: false }, // NOTE: SEHS 용으로 data영역에 있던 값을 Props영역으로 이동. RangeDatePicker 인지 아닌지 구분.
    clearOnError: { type: Boolean, default: false },
    inline: Boolean,
    hideInput: { type: Boolean, default: false }, // EHS 용, input 없이 API를 통해 제어
    isPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // state: fdp-date-picker 내에서 사용하는 date 값(value는 props이기 때문에 변경할 수 없으므로 따로 선언)
      state: this.range || this.value,
      // locale (언어 설정)
      ko,
      highlighted: this.range || { from: '', to: '' },
      isUp: this.up, // NOTE: SEHS 용으로 공간 계산해서 위로 보일 수 있게 수정
      stateForDisabledDates: this.updateDisabledDates(this.disabledDates),
      hintText: this.getHintText(),

      // CSS: with position
      popupPositionUp: this.up || false,
      popupPositionRight: false,
      activated: false, // 활성화 여부
      portalComponent: null, // 팝업으로 뜨는 컴포넌트
      eventBindedElements: [], // scroll 이벤트가 연결된 element
    };
  },
  computed: {
    classes() {
      return [
        { 'sui-date-picker--disabled': this.disabled },
        { 'sui-date-picker--readonly': this.readonly },
        { 'sui-date-picker--up': this.isUp && this.sticky },
        { 'sui-date-picker--align-right': this.alignRight && this.sticky },
        { 'sui-date-picker--sticky': this.sticky },
        { 'sui-date-picker--small': this.small },
        { 'sui-date-picker--mobile': this.mobile },
        { 'sui-date-picker--virtual': this.virtual },
        { 'sui-date-picker--typeable': this.typeable },
        { 'sui-date-picker--popup-position-up': this.popupPositionUp },
        { 'sui-date-picker--popup-position-down': !this.popupPositionUp }, // default
        { 'sui-date-picker--popup-position-right': this.popupPositionRight },
        { 'sui-date-picker--popup-position-left': !this.popupPositionRight }, // default
        { 'sui-date-picker--popup': this.isPopup },
      ];
    },
  },
  watch: {
    range(newValue) {
      // newValue 는 항상 date type 이 아닌 문자열로 넘어와야 함
      if (this.isRange) {
        const fromDate = newValue.from ? moment(newValue.from, this.dateValueFormat).toDate() : '';
        const toDate = newValue.to ? moment(newValue.to, this.dateValueFormat).toDate() : '';
        this.state = {
          from: fromDate,
          to: toDate,
        };
        this.highlighted = newValue;
      }
    },
    disabledDates() {
      this.updateDisabledDatesValue(this.disabledDates);
    },
    value(newValue) {
      // FIXME: Needs 리팩토링.
      if (this.isRange || this.initialView === 'week') {
        if (!newValue) {
          this.state = {
            from: '',
            to: '',
          };
          return;
        }
        const tempFromValue = moment(newValue.from, this.dateValueFormat).toDate();
        if (tempFromValue.toString().toUpperCase().indexOf('INVALID DATE') < 0 && (this.state.from === null || this.state.from === '' || (this.state.from !== tempFromValue))) { // eslint-disable-line max-len
          this.state.from = newValue.from;
        }

        const tempToValue = moment(newValue.to, this.dateValueFormat).toDate();
        if (tempToValue.toString().toUpperCase().indexOf('INVALID DATE') < 0 && (this.state.to === null || this.state.to === '' || (this.state.to !== tempToValue))) { // eslint-disable-line max-len
          this.state.to = newValue.to;
        }
      } else {
        if (newValue === null) { // 초기화
          this.state = '';
          return;
        }

        // const tempValue = moment(newValue, this.dateValueFormat).toDate();
        // if (tempValue.toString().toUpperCase().indexOf('INVALID DATE') < 0 && (this.state === null || this.state === '' || (this.state !== tempValue))) { // eslint-disable-line max-len
        // this.state = newValue;
        // } else {
        this.state = newValue;
        // }
      }
    },
    state() {
      // date 값이 바뀔 때마다 부모에게 전달
      if (this.isRange || this.initialView === 'week') {
        /**
        * Input event
        * @event input
        * @property {object} state
        */
        this.$emit('input', {
          from: this.state.from ? moment(this.state.from).format(this.dateValueFormat) : '',
          to: this.state.to ? moment(this.state.to).format(this.dateValueFormat) : '',
        });
      } else {
        const computedValue = this.state ? moment(this.state).format(this.dateValueFormat) : '';
        this.$emit('input', computedValue);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isRange = this.initialView === 'range';
      this.state = this.initState();
      // 내부 날짜에 값이 있으면 부모에게 전달
      if (this.state && this.state.length !== 0) {
        this.$emit('input', this.state);
      }
      this.bindDataset();
    });
  },
  methods: {
    getHintText() {
      if (this.placeholder) return this.placeholder;
      if (this.initialView === 'range' || this.initialView === 'week') {
        return `${this.format.toUpperCase()} ~ ${this.format.toUpperCase()}`;
      } else if (this.initialView === 'year') {
        return 'YYYY';
      } else if (this.initialView === 'month') {
        return 'YYYY-MM';
      }
      return `${this.format.toUpperCase()}`;
    },

    initState() {
      if (this.isRange || this.initialView === 'week') {
        return {
          from: this.value && this.value.from ? moment(this.value.from, this.dateValueFormat).toDate() : '',
          to: this.value && this.value.to ? moment(this.value.to, this.dateValueFormat).toDate() : '',
        };
      }
      return this.value ? moment(this.value, this.dateValueFormat).toDate() : '';
    },
    updateDisabledDates(disabledDates) {
      if (_.isEmpty(disabledDates)) {
        return {
          from: '',
          to: '',
        };
      }
      let fromDate = '';
      let toDate = '';

      if (typeof disabledDates === 'string') {
        const splitted = disabledDates.split(SEPARATOR);
        if (splitted.length === 1) {
          if (disabledDates.indexOf(SEPARATOR) === 0) {
            [fromDate] = splitted;
            toDate = '';
          } else {
            fromDate = '';
            [toDate] = splitted;
          }
        } else if (splitted.length === 2) {
          [fromDate, toDate] = splitted;
        }
      } else {
        fromDate = disabledDates.from ? disabledDates.from : '';
        toDate = disabledDates.to ? disabledDates.to : '';
      }

      return {
        from: fromDate ? moment(fromDate, this.dateValueFormat).toDate() : '',
        to: toDate ? moment(toDate, this.dateValueFormat).toDate() : '',
      };
    },
    // FIXME: 'opendWidth', 'openedHeight' variables declared and assigned but never used.
    onOpened() {
      let openedWidth = DATE_PICKER_OPEND_WIDTH;
      let openedHeight = DATE_PICKER_OPEND_HEIGHT;

      if (this.initialView === 'range') {
        openedWidth = DATE_PICKER_OPEND_WIDTH_FOR_RANGE;
        openedHeight = DATE_PICKER_OPEND_HEIGHT_FOR_RANGE;
      } else if (this.initialView === 'month') {
        openedWidth = DATE_PICKER_OPENED_WIDTH_FOR_MONTH;
        openedHeight = DATE_PICKER_OPENED_HEIGHT_FOR_MONTH;
      } else if (this.initialView === 'year') {
        openedWidth = DATE_PICKER_OPENED_WIDTH_FOR_YEAR;
        openedHeight = DATE_PICKER_OPENED_HEIGHT_FOR_YEAR;
      } else if (this.initialView === 'week') {
        openedWidth = DATE_PICKER_OPENED_WIDTH_FOR_WEEK;
        openedHeight = DATE_PICKER_OPENED_HEIGHT_FOR_WEEK;
      }

      // const element = this.$refs.suiDatepicker.$el;
      // let parentElement = null;
      // const isModal = !(document.getElementsByClassName('popup-body-wrapper').length === 0);
      // if (isModal) {
      //   [parentElement] = document.getElementsByClassName('popup-body-wrapper');
      // } else {
      //   [parentElement] = document.getElementsByClassName('-page-contents__wrapper');
      // }

      // get positions.
      // const positions = utils.retrieveCurrentPositioningStatus(
      //   openedWidth,
      //   openedHeight,
      //   element,
      //   parentElement,
      // );

      // assigned.
      // this.popupPositionUp = positions.up;
      // this.popupPositionRight = positions.right;
    },
    parseDate(date) {
      let monthString = (date.getMonth() + 1).toString();
      let dateString = date.getDate().toString();

      if (monthString.length === 1) {
        monthString = `0${monthString}`;
      }
      if (dateString.length === 1) {
        dateString = `0${dateString}`;
      }
      return `${date.getFullYear()}-${monthString}-${dateString}T00:00:00.000Z`;
    },
    dateIsNan(selectedDate) { // date형식에 맞지 않는 값을 키인했을때 뭐라고 입력했는지를 파라미터로 들고 넘어오는 에러이벤트
      this.$emit('date-is-nan', selectedDate);
    },
    // 선택한 날짜를 @selected로 부모에게 전달
    selected(date) {
      this.$emit('selected', date);
      if (this.isRange || this.initialView === 'week') { // 범위가 있는 경우 아무일도 안함

      } else {
        this.onConfirm(date);
      }
    },
    cleared() {
      this.$emit('input', '');
      this.$emit('selected', '');
      this.$emit('confirm', '');
      this.$emit('cleared');
    },
    // 달력 외부를 선택하면 달력 끄는 동작
    toggleItemOuter() {
      this.$emit('close', this);
      this.$refs.suiDatepicker.close();
    },
    getTouchEvent(e) {
      e.stopPropagation();
    },
    isDatePickerOpen(v) {
      this.$emit('is-open', v);
    },
    clear() {
      this.$refs.suiDatepicker.clearDate();
    },
    onRangeSelect(range) {
      this.$emit('range-select', range);
    },
    onDatasetSelectionChanged(selectedValue) {
      this.state = moment(selectedValue, this.dateValueFormat).toDate();
    },
    updateDisabledDatesValue(newValue) {
      this.stateForDisabledDates = this.updateDisabledDates(newValue);
    },
    getValues(value) {
      if (!value) {
        return {
          from: '',
          to: '',
        };
      }

      let fromDate = '';
      let toDate = '';

      if (typeof value === 'string') {
        const splitted = value.split(SEPARATOR);
        if (splitted.length === 1) {
          if (value.indexOf(SEPARATOR) === 0) {
            [fromDate] = splitted;
            toDate = '';
          } else {
            fromDate = '';
            [toDate] = splitted;
          }
        } else if (splitted.length === 2) {
          [fromDate, toDate] = splitted;
        }
      } else {
        fromDate = value.from ? value.from : '';
        toDate = value.to ? value.to : '';
      }
      return {
        from: fromDate || '',
        to: toDate || '',
      };
    },
    setDateStr(dateStr) {
      if (this.initialView === 'week') {
        this.state = this.getValues(dateStr);
      } else if (dateStr === '' || dateStr === null) {
        this.state = '';
      } else {
        this.state = moment(dateStr, this.dateValueFormat).toDate();
      }
    },
    setDisabledDates(dateObj) {
      this.updateDisabledDatesValue(dateObj);
    },
    onConfirm(value) {
      this.deactivate();
      if (this.isRange) {
        this.$emit('input', value);
        this.$emit('selected', value);
        this.$emit('confirm', value);
      } else if (this.initialView === 'week') {
        let newValue = { from: moment(value.from).format(this.dateValueFormat), to: moment(value.to).format(this.dateValueFormat) };
        if (newValue.from.toUpperCase() === 'INVALID DATE') { // 선택안된 날짜 처리
          newValue.from = '';
        }
        if (newValue.to.toUpperCase() === 'INVALID DATE') {
          newValue.to = '';
        }
        if (typeof this.value === 'string') {
          newValue = `${newValue.from}~${newValue.to}`;
        }
        // this.$emit('input', newValue);
        // this.$emit('selected', newValue);

        if (this.isPopup) {
          this.$emit('confirm', value);
        } else {
          this.setDateStr(newValue);
        }
      } else {
        const computedValue = moment(value).format(this.dateValueFormat);
        this.$emit('input', computedValue);
        this.$emit('selected', computedValue);
        this.$emit('confirm', computedValue);
      }
    },
    isValid() {
      if (this.$refs.suiDatepicker) {
        return this.$refs.suiDatepicker.isValid();
      }
      return false;
    },
    show(value, targetEl, propData = {}, option = {}) {
      this.setDateStr(value);
      if (this.$refs.suiDatepicker && targetEl) {
        this.adjustsize(targetEl);
        _.forEach(propData, (value, key) => {
          if (this[key]) {
            this[key] = value;
          }
        });
        this.activate();
      }
    },
    adjustsize(targetEl) {
      const bounds = targetEl.getBoundingClientRect();
      // this.isUp = true;
      let openedWidth = DATE_PICKER_OPEND_WIDTH;
      let openedHeight = DATE_PICKER_OPEND_HEIGHT;

      if (this.initialView === 'range') {
        openedWidth = DATE_PICKER_OPEND_WIDTH_FOR_RANGE;
        openedHeight = DATE_PICKER_OPEND_HEIGHT_FOR_RANGE;
      } else if (this.initialView === 'month') {
        openedWidth = DATE_PICKER_OPENED_WIDTH_FOR_MONTH;
        openedHeight = DATE_PICKER_OPENED_HEIGHT_FOR_MONTH;
      } else if (this.initialView === 'year') {
        openedWidth = DATE_PICKER_OPENED_WIDTH_FOR_YEAR;
        openedHeight = DATE_PICKER_OPENED_HEIGHT_FOR_YEAR;
      } else if (this.initialView === 'week') {
        openedWidth = DATE_PICKER_OPENED_WIDTH_FOR_WEEK;
        openedHeight = DATE_PICKER_OPENED_HEIGHT_FOR_WEEK;
      }

      let isUp = false;
      let isRight = false;
      if (document.body.clientHeight < bounds.bottom + openedHeight) {
        isUp = true;
      }

      if (document.body.clientWidth < bounds.right + openedWidth) {
        isRight = true;
      }

      if (isUp) {
        this.$el.style.top = `${bounds.top - openedHeight}px`;
      } else {
        this.$el.style.top = `${bounds.bottom}px`;
      }

      if (isRight) {
        this.$el.style.left = `${bounds.right - openedWidth}px`;
      } else {
        this.$el.style.left = `${bounds.left}px`;
      }
    },
    getPortalComponent() {
      if (!this.portalComponent) {
        const propsData = {
          value: this.value,
          disabledDates: this.disabledDates,
          minimumView: this.minimumView,
          maximumView: this.maximumView,
          initialView: this.initialView,
          isPopup: true,
        };

        const componentName = this.isRange ? 'sui-range-date-picker' : 'sui-date-picker';
        const componentInstance = utils.createPortalComponent(componentName, propsData);
        this.portalComponent = componentInstance;
      }
      return this.portalComponent;
    },
    activate() {
      if (this.disabled || this.isInline || this.readonly) {
        return false;
      }
      if (this.activated) {
        this.deactivate();
        return;
      }
      this.activated = true;
      if (this.isPopup) {
        this.$refs.suiDatepicker.activate();
      } else {
        this.portal = this.getPortalComponent();
        this.portal.show(this.value, this.$el, {
          // highlighted: this.highlighted,
        }, {
          disabledDates: this.disabledDates,
        });
        this.bindEvents(this.portal);
      }
    },
    deactivate() {
      if (this.disabled) {
        return;
      }
      if (!this.activated) {
        return;
      }
      this.activated = false;

      if (this.isPopup) {
        this.$refs.suiDatepicker.deactivate();
      } else {
        if (this.portal) {
          this.unbindEvents(this.portal);
          this.portal.deactivate();
          this.portal = null;
        }
      }
    },
    // BEGIN Popup API
    bindEvents(portal) {
      if (!portal) {
        return;
      }
      portal.$on('confirm', this.onConfirm);
      document.addEventListener('mousedown', this.onDocumentMouseDown, true);
      let parentElement = this.$el.parentElement;
      while (parentElement) {
        this.eventBindedElements.push(parentElement);
        parentElement.addEventListener('scroll', this.deactivate);
        parentElement = parentElement.parentElement;
      }
    },
    unbindEvents(portal) {
      portal.$off('confirm', this.onConfirm);
      document.removeEventListener('mousedown', this.onDocumentMouseDown, true);
      this.eventBindedElements.forEach(element => {
        element.removeEventListener('scroll', this.deactivate);
      });
      this.eventBindedElements = [];
    },
    onDocumentMouseDown(e) {
      if (!this.portal) {
        this.deactivate();
        return;
      }
      if (!this.$el.contains(e.target) && !this.portal.$el.contains(e.target)) {
        this.deactivate();
      }
    },
  },
};
</script>

<style scoped>
</style>
