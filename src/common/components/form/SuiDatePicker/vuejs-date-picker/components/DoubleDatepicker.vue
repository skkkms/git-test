<template>
  <div
    class="vdp-datepicker"
    :class="[wrapperClass, isRtl ? 'rtl' : '']"
  >
    <date-input
      v-if="!isPopup"
      :id="id"
      ref="fdpDateInput"
      :selectedDate="selectedInputDate"
      :resetTypedDate="resetTypedDate"
      :format="format"
      :translation="translation"
      :inline="inline"
      :name="name"
      :refName="refName"
      :openDate="openDate"
      :placeholder="placeholder"
      :inputClass="inputClass"
      :typeable="typeable"
      :virtual="virtual"
      :minimumView="minimumView"
      :clearButton="clearButton"
      :clearButtonIcon="clearButtonIcon"
      :calendarButton="calendarButton"
      :calendarButtonIcon="calendarButtonIcon"
      :calendarButtonIconContent="calendarButtonIconContent"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :sticky="sticky"
      :mobile="mobile"
      :small="small"
      :clearOnError="clearOnError"
      :is-range="isRange"
      :bootstrapStyling="bootstrapStyling"
      :use-utc="useUtc"
      :initial-view="initialView"
      @showCalendar="onShowCalendar"
      @closeCalendar="close"
      @typedDate="setTypedDate"
      @clearDate="clearDate"
      @dateIsNan="dateIsNan"
    >
      <slot
        slot="afterDateInput"
        name="afterDateInput"
      />
    </date-input>
    <div
      v-show="isOpen && !sticky"
      class="sui-datepicker__outer"
      @click="close"
    />
    <div
      v-if="isPopup"
      class="vdp-datepicker-double"
      :class="classViewContainer"
    >
      <picker-single
        ref="pickerLeft"
        class="vdp-datepicker-single-left"
        :isShow="showRangeView"
        :value="highlighted.from"
        :selectedDate="selectedDate"
        :fullMonthName="fullMonthName"
        :allowedToShowView="allowedToShowView"
        :disabledDates="disabledDatesFrom"
        :highlighted="highlighted"
        :calendarClass="calendarClass"
        :calendarStyle="calendarStyle"
        :translation="translation"      
        :title="setTitle"
        :sticky="sticky"
        :isRtl="isRtl"
        :mondayFirst="mondayFirst"
        :dayCellContent="dayCellContent"
        :use-utc="useUtc"
        :disabled="disabled"
        :readonly="readonly"
        @selected="onFromDateSelected"
      />
      <picker-single
        ref="pickerRight"
        class="vdp-datepicker-single-right"
        :isShow="showRangeView"
        :value="highlighted.to"
        :selectedDate="selectedDateRight"
        :fullMonthName="fullMonthName"
        :allowedToShowView="allowedToShowView"
        :disabledDates="disabledDatesTo"
        :highlighted="highlighted"
        :calendarClass="calendarClass"
        :calendarStyle="calendarStyle"
        :translation="translation"
        :title="setTitle"
        :sticky="sticky"
        :isRtl="isRtl"
        :mondayFirst="mondayFirst"
        :dayCellContent="dayCellContent"
        :use-utc="useUtc"
        :disabled="disabled"
        :readonly="readonly"
        :showConfirmButton="true"
        @selected="onToDateSelected"
        @confirm="onConfirmFromPicker"
      />
    </div>
  </div>
</template>
<script>
import en from '../locale/translations/en';
import DateInput from './DateInput.vue';
import PickerSingle from './PickerSingle.vue';
import { makeDateUtils } from '../utils/DateUtils';

export default {
  name: 'DoubleDatepicker',
  components: {
    DateInput,
    PickerSingle,
  },
  props: {
    hideInput: {
      type: Boolean,
      default: false,
    },
    value: {
      validator: (val) => {
        return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number' || typeof val === 'object';
      },
    },
    name: String,
    refName: String,
    id: String,
    format: {
      type: [String, Function],
      default: 'dd MMM yyyy',
    },
    language: {
      type: Object,
      default: () => en,
    },
    openDate: {
      validator: (val) => {
        return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number' || typeof val === 'object';
      },
    },
    dayCellContent: Function,
    fullMonthName: Boolean,
    disabledDates: Object,
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClass: [String, Object, Array],
    inputClass: [String, Object, Array],
    wrapperClass: [String, Object, Array],
    mondayFirst: {
      type: Boolean,
      default: true, // (SEHS) 항상 월요일부터 시작하는 달력을 보여야 함.
    },
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    bootstrapStyling: Boolean,
    initialView: {
      type: String,
      default: 'day',
    },
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
    typeable: Boolean,
    virtual: Boolean,
    useUtc: Boolean,
    minimumView: {
      type: String,
      default: 'day',
    },
    maximumView: {
      type: String,
      default: 'year',
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    clearOnError: {
      type: Boolean,
      default: false,
    },
    isRange: {
      type: Boolean,
      default: false,
    },
    isPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc);

    const startDate = this.highlighted && this.highlighted.from ? new Date(this.highlighted.from) : new Date();
    const endDate = this.highlighted && this.highlighted.to ? new Date(this.highlighted.to) : new Date();    
    const pageTimestamp = constructedDateUtils.setDate(startDate, 1);
    const pageTimestampRight = constructedDateUtils.setDate(endDate, 1);
    return {
      activated: false, // 활성화 여부
      portalComponent: null, // 팝업으로 뜨는 컴포넌트
      eventBindedElements: [], // scroll 이벤트가 연결된 element
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp,
      pageTimestampRight,
      selectedDate: null,
      selectedDateRight: null,

      selectedInputDate: null,

      /*
       * Selected Date
       * {Date}
       */
      
      /*
       * Flags to show calendar views
       * {Boolean}
       */
      showDayView: false,
      showWeekView: false,
      showMonthView: false,
      showYearView: false,
      showRangeView: false,
      /*
       * Positioning
       */
      calendarHeight: 0,
      resetTypedDate: new Date(),
      utils: constructedDateUtils,
      /*
       * Range
       */
      isFirstSelect: false,
    };
  },
  computed: {
    setTitle() {
      if (this.minimumView === 'month') {
        return '월 선택';
      }
      if (this.minimumView === 'year') {
        return '년 선택';
      }
      return '날짜선택';
    },
    computedInitialView() {
      if (!this.initialView) {
        return this.minimumView;
      }

      return this.initialView;
    },
    pageDate() {
      return new Date(this.pageTimestamp);
    },
    pageDateRight() {
      return new Date(this.pageTimestampRight);
    },
    translation() {
      return this.language;
    },
    calendarStyle() {
      return {
        position: this.isInline ? 'static' : undefined,
      };
    },
    isOpen() {
      return this.showDayView || this.showMonthView || this.showYearView || this.showRangeView || this.showWeekView;
    },
    isInline() {
      return !!this.inline;
    },
    isRtl() {
      return this.translation.rtl === true;
    },
    disabledDatesFrom() {
      // if (this.disabledDates) {
      //   return this.disabledDates;
      // }
      return {
        to: new Date(1901, 0, 1),
        from: this.selectedDateRight,
      }      
    },
    disabledDatesTo() {
      // if (this.disabledDates) {
      //   return this.disabledDates;
      // }
      return {
        to: this.selectedDate,
        from: new Date(9999, 11, 31),
      }
    },
    classViewContainer() {
      if (this.showRangeView) {
        return 'vdp-datepicker-double__show'
      }
      return ''
    }
  },
  watch: {
    value() {
      if (this.isRange || this.initialView === 'week') {
        this.setRangeValue(this.value);
      } else {
        this.setValue(this.value);
      }
    },
    openDate() {
      this.setPageDate();
    },
    initialView() {
      const initialView = this.computedInitialView;
      if (!this.allowedToShowView(initialView)) {
        throw new Error(`initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`); // eslint-disable-line max-len
      }
    },
    isOpen(newValue) {
      this.$emit('isDatePickerOpen', newValue);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    dateIsNan(selectedDate) { // date형식에 맞지 않는 값을 키인했을때 뭐라고 입력했는지를 파라미터로 들고 넘어오는 에러이벤트
      this.$emit('dateIsNan', selectedDate);
    },

    resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate();
        return;
      }
      this.setPageDate(this.selectedDate);
    },
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed}
     */
    showCalendar() {
      if (this.disabled || this.isInline || this.readonly) {
        return false;
      }
      if (this.isOpen) {
        return this.close(true);
      }
      this.setInitialView();
      if (!this.isInline) {
        this.$emit('opened');
      }
      return true;
    },
    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView;
      if (!this.allowedToShowView(initialView)) {
        throw new Error(`initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`); // eslint-disable-line max-len
      }

      switch (initialView) {
        case 'range':
          this.showRangeCalendar();
          break;
        case 'year':
          this.showYearCalendar();
          break;
        case 'month':
          this.showMonthCalendar();
          break;
        case 'week':
          this.showWeekCalendar();
          break;
        case 'none':
          break;
        default:
          this.showDayCalendar();
          break;
      }
    },

    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
      if (!this.isPopup) {
        return false;
      }
      const views = ['day', 'range', 'week', 'month', 'year'];
      const minimumViewIndex = views.indexOf(this.minimumView);
      const maximumViewIndex = views.indexOf(this.maximumView);
      const viewIndex = views.indexOf(view);

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
    },
    /**
     * Show the day picker
     * @return {Boolean}
     */
    showDayCalendar() {
      if (!this.allowedToShowView('day')) {
        return false;
      }
      this.close();
      this.showDayView = true;
      return true;
    },
    /**
     * Show the week picker
     * @return {Boolean}
     */
    showWeekCalendar() {
      if (!this.allowedToShowView('week')) {
        return false;
      }
      this.close();
      this.showWeekView = true;
      return true;
    },
    /**
     * Show the month picker
     * @return {Boolean}
     */
    showMonthCalendar() {
      if (!this.allowedToShowView('month')) {
        return false;
      }
      this.close();
      this.showMonthView = true;
      return true;
    },
    /**
     * Show the year picker
     * @return {Boolean}
     */
    showYearCalendar() {
      if (!this.allowedToShowView('year')) {
        return false;
      }
      this.close()
      this.showYearView = true;
      return true;
    },
    /**
     * Show the range picker
     * @return {Boolean}
     */
    showRangeCalendar() {
      if (!this.allowedToShowView('range')) {
        return false;
      }
      this.close();
      this.showRangeView = true;
      return true;
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate(timestamp) {
      if (timestamp) {
        const date = new Date(timestamp);
        this.selectedDate = date;
        if (!this.isRange) {
          this.setPageDate(date);
        }
        // this.$emit('input', date);
        this.$emit('selected', date);
      }
    },
    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null;
      this.setPageDate();
      this.$emit('input', '');
      this.$emit('selected', '');
      this.$emit('confirm', '');
      this.$emit('cleared');
      if (this.isRange) this.setRangeValue();
    },
    selectRangeDate(date) {
      this.setDate(date.timestamp);
      this.setRangeDate(date);
      this.resetTypedDate = new Date();
      this.$emit('selected', '');
    },
    /**
     * @param {Object} date
     */
    selectDate(date) {
      this.setDate(date.timestamp);
      // NOTICE: (S-EHS) Confirm 버튼으로 대체.
      // if (!this.isInline && !this.isRange) {
      //   this.close(true)
      // } else if (this.isRange) {
      //   this.setRangeDate(date)
      // }
      this.resetTypedDate = new Date();
    },

    selectWeekDate(date) {
      if (this.initialView === 'week') {
        this.setHilightedDate(date);
      }
    },

    setHilightedDate(date) {
      const fromDate = new Date(date.from);
      const toDate = new Date(date.to);
      this.highlighted.from = fromDate;
      this.highlighted.to = toDate;
      this.resetTypedDate = new Date();
      this.$emit('selected', this.highlighted);
    },

    /**
     * @param {Object} date
     */
    setRangeDate(date) {
      this.isFirstSelect = !this.isFirstSelect;
      const selectedDate = new Date(date.timestamp);

      if (this.isFirstSelect) {
        this.highlighted.from = selectedDate;
        this.highlighted.to = undefined;
      } else if (this.highlighted.from <= selectedDate) {
        this.highlighted.to = selectedDate;
      } else {
        this.highlighted.to = this.highlighted.from;
        this.highlighted.from = selectedDate;
      }
    },
    /**
     * @param {Object} date
     */
    selectDisabledDate(date) {
      this.$emit('selectedDisabled', date);
    },
    /**
     * @param {Object} month
     */
    selectMonth(month) {
      const date = new Date(month.timestamp);
      if (this.allowedToShowView('day')) {
        this.setPageDate(date);
        this.$emit('changedMonth', month);
        this.showDayCalendar();
      } else {
        this.selectDate(month);
      }
    },
    /**
     * @param {Object} year
     */
    selectYear(year) {
      const date = new Date(year.timestamp)
      if (this.allowedToShowView('month')) {
        this.setPageDate(date);
        this.$emit('changedYear', year);
        this.showMonthCalendar();
      } else {
        this.selectDate(year);
      }
    },
    setRangeValue(date) {
      if (!date) {
        this.setPageDate();
        this.highlighted.from = '';
        this.highlighted.to = '';
        return;
      }

      const fromDate = date.from ? new Date(date.from) : '';
      const toDate = date.to ? new Date(date.to) : '';

      const startDate = fromDate || new Date();
      const endDate = toDate || new Date();
      
      this.pageTimestamp = this.utils.setDate(new Date(startDate), 1);
      this.pageTimestampRight = this.utils.setDate(new Date(endDate), 1);

      this.highlighted.from = fromDate;
      this.highlighted.to = toDate;

      // this.selectedDate = date.from ? fromDate : undefined;
      // this.selectedDateRight = date.to ? toDate : undefined;
      this.selectedDate = date.from ? fromDate : null;
      this.selectedDateRight = date.to ? toDate : null;

      this.selectedInputDate = date;
      this.resetTypedDate = new Date();
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue(date) {
      let computedDate = date;
      if (typeof date === 'string' || typeof date === 'number') {
        const parsed = new Date(date);
        computedDate = isNaN(parsed.valueOf()) ? null : parsed;
      }
      if (!computedDate) {
        this.setPageDate();
        this.selectedDate = null;
        this.selectedInputDate = null;
        this.$emit('input', ''); // 타이핑 한 값이 Date 가 아닐 경우 초기화 하는 로직 추가.(19.03.21)
        return;
      }

      this.selectedDate = date;
      this.selectedInputDate = date;
      this.setPageDate(date);
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate(date) {
      if (!date) {
        if (this.openDate) {
          date = new Date(this.openDate);
        } else {
          date = new Date();
        }
      }
      // this.pageTimestamp = this.utils.setDate(new Date(date), 1);
    },

    setThisWeekDate(range) {
      this.pageTimestamp = this.utils.setDate(new Date(), 1);
    },

    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date)
      this.$emit('changedMonth', date)
    },
    /**
     * Set the date from a typedDate event
     */
    setTypedDate(date) {
      if (this.isRange || this.initialView === 'week') {
        this.setHilightedDate(date);
      } else {
        this.setDate(date.getTime());
      }
      this.$emit('typedDate', date);
      if (this.portal) {
        this.deactivate();
      }
    },
    /**
     * Close all calendar layers
     * @param {Boolean} full - emit close event
     */
    close(full = false) {
      this.showRangeView = false;
      this.showYearView = false;
      this.showMonthView = false;
      this.showWeekView = false;
      this.showDayView = false;

      if (!this.isInline) {
        if (full) {
          this.$emit('closed');
        }
      }
    },
    /**
     * Initiate the component
     */
    init() {
      if (this.isRange || this.initialView === 'week') {
        this.setRangeValue(this.value);
      } else {
        this.setValue(this.value);
      }
      if (this.isInline) {
        this.setInitialView();
      }
    },    

    isValid() {
      if (this.$refs.fdpDateInput) {
        return this.$refs.fdpDateInput.isValid();
      }
      return false;
    },

    onConfirmFromPopup(value) {
      if (value) {
        this.selectedInputDate = value;
        this.$emit('input', value);
        // this.$emit('selected', value);
        this.$emit('confirm', value);
      }
      this.deactivate();
    },

    onConfirmFromPicker() {
      const from = this.$refs.pickerLeft.getSelectedDate();
      const to = this.$refs.pickerRight.getSelectedDate();
      this.$emit('confirm', {from, to});
      // if (from && to) {
      //   this.$emit('confirm', {from, to});
      // } else {
      //   this.$emit('confirm', null);
      // }
      this.deactivate();
    },

    getPortalComponent() {     
      if (!this.portalComponent) {        
        const propsData = {
          value: this.selectedDate,
          minimumView: this.minimumView,
          maximumView: this.maximumView,
          initialView: this.initialView,
          isPopup: true,
        };
        
        const componentName = this.isRange? 'sui-range-date-picker':'sui-date-picker';  
        const componentInstance = utils.createPortalComponent(componentName, propsData);
        this.portalComponent = componentInstance;
      }
      return this.portalComponent;      
    },
    onShowCalendar() {
      if (this.disabled || this.isInline || this.readonly) {
        return false;
      }
      this.$emit('reqOpen')
    },
    activate() {
      this.showCalendar();      
    },
    deactivate() {
      this.close();      
    },
    // BEGIN Popup API
    bindEvents(portal) {
      if (!portal) {
        return;
      }
      portal.$on('confirm', this.onConfirmFromPopup);
      document.addEventListener('mousedown', this.onDocumentMouseDown, true);
      let parentElement = this.$el.parentElement;
      while (parentElement) {
        this.eventBindedElements.push(parentElement);
        parentElement.addEventListener('scroll', this.deactivate);
        parentElement = parentElement.parentElement;
      }
    },
    unbindEvents(portal) {
      portal.$off('confirm', this.onConfirmFromPopup);
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

    onFromDateSelected(date) {
      this.selectedDate = date;
    },

    onToDateSelected(date) {
      this.selectedDateRight = date;
    },
  },
  beforeDestroy() {
    if (this.portalComponent) {
      this.unbindEvents(this.portalComponent)
      this.portalComponent.$destroy();
      this.portalComponent = null;
    }
  },
}
// eslint-disable-next-line
;
</script>
<style lang="stylus">
@import '../styles/style'
</style>

<style scoped>

</style>