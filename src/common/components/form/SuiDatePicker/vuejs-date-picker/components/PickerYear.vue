<template>
  <div
    v-show="showYearView"
    :class="[calendarClass, 'vdp-datepicker__calendar']"
    :style="calendarStyle"
    @mousedown.prevent
  >
    <slot
      name="beforeCalendarHeader"
    />
    <div
      v-if="!sticky"
      class="sui-datepicker__header"
    >
      <div
        class="sui-datepicker-tit"
      >
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
        @click="isRtl ? nextDecade() : previousDecade()"
      >
        &lt;
      </span>
      <span>{{ getPageDecade }}</span>
      <span
        class="next"
        :class="{'disabled': isRightNavDisabled}"
        @click="isRtl ? previousDecade() : nextDecade()"
      >
        &gt;
      </span>
    </header>
    <div class="mrT20" />
    <div class="sui-datepicker__body">
      <span
        v-for="year in years"
        :key="year.timestamp"
        class="cell year"
        :class="{ 'selected': year.isSelected, 'disabled': year.isDisabled }"
        @click.stop="selectYear(year)"
      >
        {{ year.year }}
      </span>
    </div>
    <div
      v-show="checkInitialView"
      class="sui-datepicker-button-wrap"
    >
      <!-- <button
        type="button"
        class="btn_confirm"
        @click="onClickConfirm"
      >
        Apply
      </button> -->
    </div>
  </div>
</template>

<script>
import { makeDateUtils } from '../utils/DateUtils';

const INITIALVIEW_YEAR = 'year';
const INITIALVIEW_DAY = 'day';

export default {
  props: {
    showYearView: Boolean,
    selectedDate: null,
    pageDate: Date,
    pageTimestamp: Number,
    disabledDates: Object,
    highlighted: Object,
    calendarClass: [String, Object, Array],
    calendarStyle: Object,
    translation: Object,
    isRtl: Boolean,
    allowedToShowView: Function,
    useUtc: Boolean,
    title: {
      type: String,
      default: '날짜선택',
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    initialView: {
      type: String,
      default: INITIALVIEW_DAY,
    },
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      utils: constructedDateUtils,
    };
  },
  computed: {
    checkInitialView() {
      return this.initialView === INITIALVIEW_YEAR;
    },
    years() {
      const d = this.pageDate;
      const years = [];
      // set up a new date object to the beginning of the current 'page'7
      const dObj = this.useUtc
        ? new Date(Date.UTC(Math.floor(d.getUTCFullYear() / 12) * 12, d.getUTCMonth(), d.getUTCDate()))
        : new Date(Math.floor(d.getFullYear() / 12) * 12, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
      for (let i = 0; i < 12; i++) {
        years.push({
          year: this.utils.getFullYear(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedYear(dObj),
          isDisabled: this.isDisabledYear(dObj),
        });
        this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1);
      }
      return years;
    },
    /**
     * @return {String}
     */
    getPageDecade() {
      const decadeStart = Math.floor(this.utils.getFullYear(this.pageDate) / 12) * 12;
      const decadeEnd = decadeStart + 11;
      const { yearSuffix } = this.translation;
      return `${decadeStart} - ${decadeEnd}${yearSuffix}`;
    },
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled() {
      return this.isRtl
        ? this.isNextDecadeDisabled(this.pageTimestamp)
        : this.isPreviousDecadeDisabled(this.pageTimestamp);
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled() {
      return this.isRtl
        ? this.isPreviousDecadeDisabled(this.pageTimestamp)
        : this.isNextDecadeDisabled(this.pageTimestamp);
    },
  },
  methods: {
    selectYear(year) {
      if (year.isDisabled) {
        return;
      }
      this.$emit('selectYear', year);
    },
    changeYear(incrementBy) {
      const date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('changedDecade', date);
    },
    previousDecade() {
      if (this.isPreviousDecadeDisabled()) {
        return;
      }
      this.changeYear(-12);
    },
    isPreviousDecadeDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }
      return Math.floor(this.utils.getFullYear(this.disabledDates.to) / 12) * 12 >= Math.floor(this.utils.getFullYear(this.pageDate) / 12) * 12;
    },
    nextDecade() {
      if (this.isNextDecadeDisabled()) {
        return;
      }
      this.changeYear(12);
    },
    isNextDecadeDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }
      return Math.ceil(this.utils.getFullYear(this.disabledDates.from) / 12) * 12 <= Math.ceil(this.utils.getFullYear(this.pageDate) / 12) * 12;
    },

    /**
     * Whether the selected date is in this year
     * @param {Date}
     * @return {Boolean}
     */
    isSelectedYear(date) {
      return this.selectedDate && this.utils.getFullYear(new Date(this.selectedDate)) === this.utils.getFullYear(date);
    },
    /**
     * Whether a year is disabled
     * @param {Date}
     * @return {Boolean}
     */
    isDisabledYear(date) {
      let disabledDates = false;
      if (typeof this.disabledDates === 'undefined' || !this.disabledDates) {
        return false;
      }

      if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to) {
        if (this.utils.getFullYear(date) < this.utils.getFullYear(this.disabledDates.to)) {
          disabledDates = true;
        }
      }
      if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from) {
        if (this.utils.getFullYear(date) > this.utils.getFullYear(this.disabledDates.from)) {
          disabledDates = true;
        }
      }

      if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
        disabledDates = true;
      }

      return disabledDates;
    },

    /**
    * (S-EHS) Confirm 버튼 클릭시 날짜 선택.
    */
    onClickConfirm() {
      this.$emit('confirm', this.selectedDate);
      this.$emit('close', true);
    },
  },
};
</script>

<style scoped>
</style>
