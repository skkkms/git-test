<template>
  <div
    v-show="showWeekView"
    :class="[calendarClass, 'vdp-datepicker__calendar', 'sui-datepicker-weekview']"
    :style="calendarStyle"
    @mousedown.prevent
  >
    <slot name="beforeCalendarHeader" />
    <div
      v-if="!sticky"
      class="sui-datepicker__header"
    >
      <div class="sui-datepicker-tit">
        {{ title }}
      </div>
      <div
        class="sui-text-field__virtual-btn--close"
        @click="$emit('close')"
      />
    </div>
    <header>
      <span
        class="prev"
        :class="{'disabled': isLeftNavDisabled}"
        @click="isRtl ? nextMonth() : previousMonth()"
      >&lt;</span>
      <span
        class="day__month_btn"
        :class="allowedToShowView('month') ? 'up' : ''"
        @click="showMonthCalendar"
      >{{ isYmd ? currMonthName : currYearName }} {{ isYmd ? currYearName : currMonthName }}</span>
      <span
        class="next"
        :class="{'disabled': isRightNavDisabled}"
        @click="isRtl ? previousMonth() : nextMonth()"
      >&gt;</span>
    </header>
    <div
      class="sui-datepicker__body"
      :class="isRtl ? 'flex-rtl' : ''"
    >
      <span class="cell day-header week-number-header" />
      <span
        v-for="d in daysOfWeek"
        :key="d.timestamp"
        class="cell day-header"
      >
        {{ d }}
      </span>
      <div
        v-for="(week, index) in weeks"
        :key="index"
        :class="['week', weekClasses(week)]"
        @click="selectWeek(week)"
      >
        <span class="cell week-number">{{ `W${week.displayNumber}` }}</span>
        <template v-if="blankDays > 0 && index === 0">
          <span
            v-for="d in blankDays"
            :key="d.timestamp"
            class="cell day blank"
          />
        </template>
        <span
          v-for="day in week.dates"
          :key="day.timestamp"
          class="cell day"
          :class="dayClasses(day)"
          v-html="dayCellContent(day)"
        />
      </div>
    </div>
    <div class="sui-datepicker-button-wrap">
      <button
        type="button"
        class="btn_this_week"
        @click="onClickThisWeek"
      >
        This Week
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
    showWeekView: Boolean,
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
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      utils: constructedDateUtils,
      today: new Date(),
      week: null,
    };
  },
  computed: {
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
    blankDays() {
      const d = this.pageDate;
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
    weeks() {
      const d = this.pageDate;
      // set up a new date object to the beginning of the current 'page'
      let dObj = this.useUtc
        ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
        : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      const daysInMonth = this.utils.daysInMonth(this.utils.getFullYear(dObj), this.utils.getMonth(dObj));
      const weeks = [];
      let days = [];
      let day = null;
      for (let i = 0; i < daysInMonth; i += 1) {
        day = {
          date: this.utils.getDate(dObj),
          timestamp: dObj.getTime(),
          isToday: this.utils.compareDates(dObj, this.today),
          isWeekend: this.utils.getDay(dObj) === 0 || this.utils.getDay(dObj) === 6,
          isSaturday: this.utils.getDay(dObj) === 6,
          isSunday: this.utils.getDay(dObj) === 0,
        };
        days.push(day);
        if (this.utils.getDay(dObj) === 0) { //일요일
          const tempWeek = _.assign({
            isSelectedWeek: this.isSelectedWeek(days),
            weekNumber: this.utils.getWeekNumber(days),
            displayNumber: this.utils.getWeekNumber(days),
            fromDate: this.utils.getWeekFromDate(days),
            toDate: this.utils.getWeekToDate(days),
            dates: days,
          });
          weeks.push(tempWeek);
          days = [];
        }
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
      }

      if (days.length > 0) { // 남은 일자 처리
        const tempWeek = _.assign({
          weekNumber: this.utils.getWeekNumber(days),
          displayNumber: this.utils.getWeekNumber(days),
          isSelectedWeek: this.isSelectedWeek(days),          
          fromDate: this.utils.getWeekFromDate(days),
          toDate: this.utils.getWeekToDate(days),
          dates: days,
        });
        if (tempWeek.weekNumber === 1) { // 12월 마지막주가 1로 나오는것 방지
          tempWeek.displayNumber = weeks[weeks.length - 1].displayNumber + 1;
        }
        weeks.push(tempWeek);        
      }
      return weeks;
    },
    /**
     * Gets the name of the month the current page is on
     * @return {String}
     */
    currMonthName() {
      const monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
      return this.utils.getMonthNameAbbr(this.utils.getMonth(this.pageDate), monthName);
    },
    /**
     * Gets the name of the year that current page is on
     * @return {Number}
     */
    currYearName() {
      const { yearSuffix } = this.translation;
      return `${this.utils.getFullYear(this.pageDate)}${yearSuffix}`;
    },
    /**
     * Is this translation using year/month/day format?
     * @return {Boolean}
     */
    isYmd() {
      return true;
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
    selectWeek(week) {
      // console.log(`[PickerWeek] selectWeek(): ${week.fromDate.toString()}-${week.toDate.toString()}}`, week);
      this.week = week;
      this.$emit('selectDate', {
        from: new Date(this.week.fromDate),
        to: new Date(this.week.toDate),
      });
    },
    /**
     * @return {Number}
     */
    getPageMonth() {
      return this.utils.getMonth(this.pageDate);
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
    changeMonth(incrementBy) {
      const date = this.pageDate;
      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
      this.$emit('changedMonth', date);
    },
    /**
     * Decrement the page month
     */
    previousMonth() {
      if (!this.isPreviousMonthDisabled()) {
        this.changeMonth(-1);
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
        this.changeMonth(+1);
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
      return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj);
    },

    isSelectedWeek(dates) {
      const fromDate = dates[0];
      const toDate = dates[dates.length - 1];

      return this.highlighted
        && this.highlighted.from
        && this.highlighted.to
        && this.highlighted.from <= fromDate.timestamp
        && this.highlighted.to >= toDate.timestamp;
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
        today: day.isToday,
        weekend: day.isWeekend,
        sat: day.isSaturday,
        sun: day.isSunday,
      };
    },
    weekClasses(week) {
      return [
        { 'week-selected': week.isSelectedWeek },
      ];
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
     * (S-EHS) "This Week" 버튼 클릭시 오늘 날짜 포함된 주가 있는 달력으로 이동
     */
    onClickThisWeek() {
      const thisWeek = this.utils.getThisWeek();
      this.$emit('selectDate', thisWeek);
      this.$emit('today', thisWeek);
    },

    /**
     * (S-EHS) Confirm 버튼 클릭시 날짜 선택.
     */
    onClickConfirm() {
      // console.log(`[PickerWeek] onClickConfirm(): ${this.week.fromDate} ~ ${this.week.toDate}`);
      this.$emit('confirm', {
        from: new Date(this.week.fromDate),
        to: new Date(this.week.toDate),
      });
      this.$emit('close', true);
    },
  },
}
// eslint-disable-next-line
;
</script>

<style scoped>

</style>
