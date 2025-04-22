<template>
  <div
    v-show="isShow"
    class="vdp-datepicker vdp-datepicker-single"
  >        
    <!-- Day View -->
    <picker-day
      :pageDate="pageDate"
      :selectedDate="selectedDate"
      :showDayView="showDayView"
      :fullMonthName="fullMonthName"
      :allowedToShowView="allowedToShowView"
      :disabledDates="disabledDates"      
      :calendarClass="calendarClass"
      :calendarStyle="calendarStyle"
      :translation="translation"
      :pageTimestamp="pageTimestamp"
      :title="setTitle"
      :sticky="sticky"
      :isRtl="isRtl"
      :mondayFirst="mondayFirst"
      :dayCellContent="dayCellContent"
      :use-utc="useUtc"
      :showConfirmButton="showConfirmButton"
      @close="close"
      @changedMonth="handleChangedMonthFromDayPicker"
      @selectDate="selectDate"
      @showMonthCalendar="showMonthCalendar"
      @today="setPageDate"
      @selectedDisabled="selectDisabledDate"
      @confirm="onConfirm"
    >
      <slot
        slot="beforeCalendarHeader"
        name="beforeCalendarHeader"
      />
    </picker-day>

    <!-- Month View -->
    <picker-month      
      :pageDate="pageDate"
      :selectedDate="selectedDate"
      :showMonthView="showMonthView"
      :allowedToShowView="allowedToShowView"
      :disabledDates="disabledDates"
      :calendarClass="calendarClass"
      :calendarStyle="calendarStyle"
      :translation="translation"
      :isRtl="isRtl"
      :use-utc="useUtc"
      :title="setTitle"
      :sticky="sticky"
      :initial-view="initialView"
      @close="close"
      @selectMonth="selectMonth"
      @showYearCalendar="showYearCalendar"
      @changedYear="setPageDate"
      @confirm="onConfirm"
    >
      <slot
        slot="beforeCalendarHeader"
        name="beforeCalendarHeader"
      />
    </picker-month>

    <!-- Year View -->
    <picker-year      
      :pageDate="pageDate"
      :selectedDate="selectedDate"
      :showYearView="showYearView"
      :allowedToShowView="allowedToShowView"
      :disabledDates="disabledDates"
      :calendarClass="calendarClass"
      :calendarStyle="calendarStyle"
      :translation="translation"
      :isRtl="isRtl"
      :use-utc="useUtc"
      :title="setTitle"
      :sticky="sticky"
      :initial-view="initialView"
      @close="close"
      @selectYear="selectYear"
      @changedDecade="setPageDate"
      @confirm="onConfirm"
    >
      <slot
        slot="beforeCalendarHeader"
        name="beforeCalendarHeader"
      />
    </picker-year>
  </div>
</template>
<script>
import PickerDay from './PickerDay.vue';
import PickerMonth from './PickerMonth.vue';
import PickerYear from './PickerYear.vue';
import { makeDateUtils } from '../utils/DateUtils';

export default {
  name: 'PickerSingle',
  components: {    
    PickerDay,    
    PickerMonth,
    PickerYear,
  },
  props: {
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
    isRtl: {
      type: Boolean,
    },    
    translation: Object,
    showConfirmButton: {
      type: Boolean,
      default: false,
    },
    // pageTimestamp: Number,
    selectedDate: [Date],
    isShow: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc);
    const pageTimestamp = this.value ? constructedDateUtils.setDate(new Date(this.value), 1) : constructedDateUtils.setDate(new Date(), 1);
    return {
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      /*
       * Selected Date
       * {Date}
       */      
      // selectedDate: null,
      /*
       * Flags to show calendar views
       * {Boolean}
       */
      showDayView: false,
      showWeekView: false,
      showMonthView: false,
      showYearView: false,
      /*
       * Positioning
       */
      calendarHeight: 0,
      resetTypedDate: new Date(),      
      utils: constructedDateUtils,
      pageTimestamp,
      /*
       * Range
       */      
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
  },
  watch: {
    value() {
      if (this.value && this.selectedDate) {
        // this.selectedDate = new Date(this.value);
        // this.setDate(new Date(this.value))
        // this.$emit('selected', new Date(this.value));
        this.setPageDate(this.selectedDate);
      } else {
        // this.$emit('selected', null);
        // this.selectedDate = null;
        this.setPageDate(new Date());
      }
    },
    openDate() {
      this.setPageDate();
    },
    isShow() {
      if (this.isShow) {
        this.showDayCalendar();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {       
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed}
     */
    showCalendar() {
      this.showDayCalendar();      
    },        
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
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
        // this.selectedDate =  date;
        this.$emit('selected', date);
      } else {
        this.$emit('selected', null);
      }
    },
    /**
     * @param {Object} date
     */
    selectDate(date) {
      this.setDate(date.timestamp);
      this.resetTypedDate = new Date();
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
      this.pageTimestamp = this.utils.setDate(new Date(date), 1);
    },    

    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date)
      this.$emit('changedMonth', date)
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
      this.showDayCalendar();
    },

    onConfirm(value) {      
      this.$emit('input', value);
      this.$emit('confirm', value);      
    },

    getSelectedDate() {
      return this.selectedDate;
    },    
  },  
}
// eslint-disable-next-line
;
</script>
<style lang="stylus">
@import '../styles/style'
</style>
