<template>
  <div
    v-show="showRangeView"
    :class="[calendarClass, 'vdp-datepicker__calendar']"
    :style="calendarStyle"
    @mousedown.prevent
  >
    <slot name="beforeCalendarHeader" />
    <header>
      <div class="rangepicker__header">
        <span
          class="rangepicker__prev-button"
          :class="{'disabled': isLeftNavDisabled}"
          @click="isRtl ? nextMonth() : previousMonth()"
        >&lt;</span>
        <span
          class="rangepicker__left-month"
        >{{ isYmd ? leftMonthName : leftYearName }}{{ yearMonthSeparator }}{{ isYmd ? leftYearName : leftMonthName }}</span>
        <span
          class="rangepicker__delimiter-months-between"
        >&#45;</span>
        <span
          class="rangepicker__right-month"
        >{{ isYmd ? rightMonthName : rightYearName }}{{ yearMonthSeparator }}{{ isYmd ? rightYearName : rightMonthName }}</span>
        <span
          class="rangepicker__next-button"
          :class="{'disabled': isRightNavDisabled}"
          @click="isRtl ? previousMonth() : nextMonth()"
        >&gt;</span>
      </div>
    </header>
    <div class="rangepicker__days-wrapper">
      <!-- Left -->
      <div class="rangepicker__days-left" :class="isRtl ? 'flex-rtl' : ''">
        <span
          v-for="d in daysOfWeek"
          :key="d.timestamp"
          class="cell day-header"
        >{{ d }}</span>
        <template v-if="blankDaysLeft > 0">
          <span
            v-for="d in blankDaysLeft"
            :key="d.timestamp"
            class="cell day blank"
          />
        </template>
        <span
          v-for="day in daysLeft"
          :key="day.timestamp"
          class="cell day"
          :class="dayClasses(day)"
          @click="selectDate(day)"
          v-html="dayCellContent(day)"
        />
      </div>

      <!-- Right -->
      <div class="rangepicker__days-right" :class="isRtl ? 'flex-rtl' : ''">
        <span
          v-for="d in daysOfWeek"
          :key="d.timestamp"
          class="cell day-header"
        >{{ d }}</span>
        <template v-if="blankDaysRight > 0">
          <span
            v-for="d in blankDaysRight"
            :key="d.timestamp"
            class="cell day blank"
          />
        </template>
        <span
          v-for="day in daysRight"
          :key="day.timestamp"
          class="cell day"
          :class="dayClasses(day)"
          @click="selectDate(day)"
          v-html="dayCellContent(day)"
        />
      </div>
    </div>

    <div class="sui-datepicker-button-wrap">
      <button
        type="button"
        class="btn_today"
        @click="onClickToday"
      >
        Today
      </button>
      <button
        type="button"
        class="btn_confirm"
        @click="onClickConfirm"
      >
        Apply
      </button>
    </div>
  </div>
</template>
<script>
import { makeDateUtils } from '../utils/DateUtils';

export default {
  props: {
    showRangeView: Boolean,
    selectedDate: null,
    pageDate: Date,
    pageTimestamp: Number,
    fullMonthName: Boolean,
    allowedToShowView: Function,
    dayCellContent: {
      type: Function,
      default: day => day.date,
    },
    disabledDates: Object,
    highlighted: Object,
    calendarClass: [String, Object, Array],
    calendarStyle: Object,
    translation: Object,
    isRtl: Boolean,
    mondayFirst: Boolean,
    useUtc: Boolean,
    title: {
      type: String,
      default: '날짜선택',
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    useNumberMonthName: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      utils: constructedDateUtils,
      today: new Date(),
      pageDateRight: null,
    };
  },
  computed: {
    yearMonthSeparator() {
      if (this.useNumberMonthName) {
        return '.';
      }
      return ' ';
    },
    rightMonth() {
      const date = new Date(this.pageDate);
      return new Date(this.utils.setMonth(date, this.utils.getMonth(date) + 1));
    },
    /**
     * Returns an array of day names
     * @return {String[]}
     */
    daysOfWeek() {
      if (this.mondayFirst) {
        const tempDays = this.translation.days.slice();
        tempDays.push(tempDays.shift());
        return tempDays;
      }
      return this.translation.days;
    },
    /**
     * Returns the day number of the week less one for the first of the current month
     * Used to show amount of empty cells before the first in the day calendar layout
     * @return {Number}
     */
    blankDaysLeft() {
      const d = this.pageDate;
      const dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      if (this.mondayFirst) {
        return this.utils.getDay(dObj) > 0 ? this.utils.getDay(dObj) - 1 : 6;
      }
      return this.utils.getDay(dObj);
    },
    blankDaysRight() {
      const d = this.rightMonth;
      const dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      if (this.mondayFirst) {
        return this.utils.getDay(dObj) > 0 ? this.utils.getDay(dObj) - 1 : 6;
      }
      return this.utils.getDay(dObj);
    },
    /**
     * @return {Object[]}
     */
    daysLeft() {
      const d = this.pageDate;
      const days = [];
      // set up a new date object to the beginning of the current 'page'
      const dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      const daysInMonth = this.utils.daysInMonth(this.utils.getFullYear(dObj), this.utils.getMonth(dObj));
      for (let i = 0; i < daysInMonth; i++) {
        days.push({
          date: this.utils.getDate(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedDate(dObj),
          isDisabled: this.isDisabledDate(dObj),
          isHighlighted: this.isHighlightedDate(dObj),
          isHighlightStart: this.isHighlightStart(dObj),
          isHighlightEnd: this.isHighlightEnd(dObj),
          isToday: this.utils.compareDates(dObj, this.today),
          isWeekend: this.utils.getDay(dObj) === 0 || this.utils.getDay(dObj) === 6,
          isSaturday: this.utils.getDay(dObj) === 6,
          isSunday: this.utils.getDay(dObj) === 0,
        });
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
      }
      return days;
    },
    /**
     * @return {Object[]}
     */
    daysRight() {
      const d = this.rightMonth;
      const days = [];
      // set up a new date object to the beginning of the current 'page'
      const dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      const daysInMonth = this.utils.daysInMonth(this.utils.getFullYear(dObj), this.utils.getMonth(dObj));
      for (let i = 0; i < daysInMonth; i++) {
        days.push({
          date: this.utils.getDate(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedDate(dObj),
          isDisabled: this.isDisabledDate(dObj),
          isHighlighted: this.isHighlightedDate(dObj),
          isHighlightStart: this.isHighlightStart(dObj),
          isHighlightEnd: this.isHighlightEnd(dObj),
          isToday: this.utils.compareDates(dObj, this.today),
          isWeekend: this.utils.getDay(dObj) === 0 || this.utils.getDay(dObj) === 6,
          isSaturday: this.utils.getDay(dObj) === 6,
          isSunday: this.utils.getDay(dObj) === 0,
        });
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
      }
      return days;
    },
    /**
     * Gets the name of the month the current page is on
     * @return {String}
     */
    leftMonthName() {
      let month = null;
      if (this.useNumberMonthName) {
        month = this.utils.getMonth(this.pageDate);
        month += 1;
        if (month < 10) {
          month = `0${month}`;
        }
      } else {
        const monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
        month = this.utils.getMonthNameAbbr(this.utils.getMonth(this.pageDate), monthName);
      }
      return month;
    },
    /**
     * Gets the name of the year that current page is on
     * @return {Number}
     */
    leftYearName() {
      const { yearSuffix } = this.translation;
      return `${this.utils.getFullYear(this.pageDate)}${yearSuffix}`;
    },
    rightMonthName() {
      let month = null;
      if (this.useNumberMonthName) {
        month = this.utils.getMonth(this.rightMonth);
        month += 1;
        if (month < 10) {
          month = `0${month}`;
        }
      } else {
        const monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
        month = this.utils.getMonthNameAbbr(this.utils.getMonth(this.rightMonth), monthName);
      }
      return month;
    },
    rightYearName() {
      const { yearSuffix } = this.translation;
      return `${this.utils.getFullYear(this.rightMonth)}${yearSuffix}`;
    },
    /**
     * Is this translation using year/month/day format?
     * @return {Boolean}
     */
    isYmd() {
      return false;
      // NOTE: S-EHS에서는 월/년 으로 보이도록 CX 가이드 받음.
      // return this.translation.ymd && this.translation.ymd === true
    },
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled() {
      return this.isRtl
        ? this.isNextMonthDisabled(this.pageTimestamp)
        : this.isPreviousMonthDisabled(this.pageTimestamp);
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled() {
      return this.isRtl
        ? this.isPreviousMonthDisabled(this.pageTimestamp)
        : this.isNextMonthDisabled(this.pageTimestamp);
    },
  },
  methods: {
    selectDate(date) {
      if (date.isDisabled) {
        this.$emit('selectedDisabled', date);
        return;
      }
      this.$emit('selectDate', date);
    },
    /**
     * Emit an event to show the month picker
     */
    showMonthCalendar() {
      this.$emit('showMonthCalendar');
    },
    /**
     * Change the page month
     * @param {Number} incrementBy
     */
    changeMonth(date, incrementBy) {
      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
      this.$emit('changedMonth', date);
    },
    /**
     * Decrement the page month
     */
    previousMonth() {
      if (!this.isPreviousMonthDisabled()) {
        this.changeMonth(this.pageDate, -1);
      }
    },
    /**
     * Is the previous month disabled?
     * @return {Boolean}
     */
    isPreviousMonthDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }
      const d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.to) >= this.utils.getMonth(d)
        && this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(d);
    },
    /**
     * Increment the current page month
     */
    nextMonth() {
      if (!this.isNextMonthDisabled()) {
        this.changeMonth(this.rightMonth, +1);
      }
    },
    /**
     * Is the next month disabled?
     * @return {Boolean}
     */
    isNextMonthDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }
      const d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.from) <= this.utils.getMonth(d)
        && this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(d);
    },
    /**
     * Whether a day is selected
     * @param {Date}
     * @return {Boolean}
     */
    isSelectedDate(dObj) {
      return this.selectedDate && this.utils.compareDates(new Date(this.selectedDate), dObj);
    },
    /**
     * Whether a day is disabled
     * @param {Date}
     * @return {Boolean}
     */
    isDisabledDate(date) {
      let disabledDates = false;

      if (typeof this.disabledDates === 'undefined') {
        return false;
      }

      if (typeof this.disabledDates.dates !== 'undefined') {
        this.disabledDates.dates.forEach(d => {
          if (this.utils.compareDates(date, d)) {
            disabledDates = true;
            return true;
          }
        });
      }
      if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to && date < this.disabledDates.to) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from && date > this.disabledDates.from) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.ranges !== 'undefined') {
        this.disabledDates.ranges.forEach(range => {
          if (typeof range.from !== 'undefined' && range.from && typeof range.to !== 'undefined' && range.to) {
            if (date < range.to && date > range.from) {
              disabledDates = true;
              return true;
            }
          }
        });
      }
      if (typeof this.disabledDates.days !== 'undefined' && this.disabledDates.days.indexOf(this.utils.getDay(date)) !== -1) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.daysOfMonth !== 'undefined' && this.disabledDates.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
        disabledDates = true;
      }
      return disabledDates;
    },
    /**
     * Whether a day is highlighted (only if it is not disabled already except when highlighted.includeDisabled is true)
     * @param {Date}
     * @return {Boolean}
     */
    isHighlightedDate(date) {
      if (!(this.highlighted && this.highlighted.includeDisabled) && this.isDisabledDate(date)) {
        return false;
      }

      let highlighted = false;

      if (typeof this.highlighted === 'undefined') {
        return false;
      }

      if (typeof this.highlighted.dates !== 'undefined') {
        this.highlighted.dates.forEach(d => {
          if (this.utils.compareDates(date, d)) {
            highlighted = true;
            return true;
          }
        });
      }

      if (this.isDefined(this.highlighted.from) && this.isDefined(this.highlighted.to)) {
        highlighted = date >= this.highlighted.from && date <= this.highlighted.to;
      }

      if (typeof this.highlighted.days !== 'undefined' && this.highlighted.days.indexOf(this.utils.getDay(date)) !== -1) {
        highlighted = true;
      }

      if (typeof this.highlighted.daysOfMonth !== 'undefined' && this.highlighted.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
        highlighted = true;
      }

      if (typeof this.highlighted.customPredictor === 'function' && this.highlighted.customPredictor(date)) {
        highlighted = true;
      }

      return highlighted;
    },
    dayClasses(day) {
      return {
        selected: day.isSelected,
        disabled: day.isDisabled,
        highlighted: day.isHighlighted,
        today: day.isToday,
        weekend: day.isWeekend,
        sat: day.isSaturday,
        sun: day.isSunday,
        'highlight-start': day.isHighlightStart,
        'highlight-end': day.isHighlightEnd,
      };
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date}
     * @return {Boolean}
     */
    isHighlightStart(date) {
      return this.isHighlightedDate(date)
        && (this.highlighted.from instanceof Date)
        && (this.utils.getFullYear(this.highlighted.from) === this.utils.getFullYear(date))
        && (this.utils.getMonth(this.highlighted.from) === this.utils.getMonth(date))
        && (this.utils.getDate(this.highlighted.from) === this.utils.getDate(date));
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date}
     * @return {Boolean}
     */
    isHighlightEnd(date) {
      return this.isHighlightedDate(date)
        && (this.highlighted.to instanceof Date)
        && (this.utils.getFullYear(this.highlighted.to) === this.utils.getFullYear(date))
        && (this.utils.getMonth(this.highlighted.to) === this.utils.getMonth(date))
        && (this.utils.getDate(this.highlighted.to) === this.utils.getDate(date));
    },
    /**
     * Helper
     * @param  {mixed}  prop
     * @return {Boolean}
     */
    isDefined(prop) {
      return typeof prop !== 'undefined' && prop;
    },

    /**
     * (S-EHS) Today 버튼 클릭시 오늘 날짜로 선택.
     */
    onClickToday() {
      this.$emit('today', this.today);
    },

    /**
     * (S-EHS) Confirm 버튼 클릭시 날짜 선택.
     */
    onClickConfirm() {
      this.$emit('confirm', this.highlighted);
      this.$emit('close', true);
    },
  },
}
// eslint-disable-next-line
;
</script>
