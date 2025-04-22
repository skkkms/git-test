<template>
  <span :class="['time-picker', classesTimePicker]">
    <!-- Input -->
    <!-- NOTE: G-EHS용으로 fdp사용
    <input
      v-show="!hideInput"
      :id="id"
      v-model="displayTime"
      class="display-time"
      type="text"
      :readonly="!typeable"
      :disabled="disabled"
    /> -->
    <!-- NODE: G-EHS용으로 fdp-validator 추가 -->
    <sui-validator
      v-model="displayTime"
      name="timepickerValidator"
      :rules="timepickerValidatorRules"
    >
      <sui-text-field
        v-show="!hideInput"
        :id="id"
        ref="fdpTimePickerInput"
        :value="displayTime"
        class="display-time"
        :readonly="readonly"
        :disabled="disabled"
        :mask="format === 'HH:mm' ? 'time' : 'time-with-seconds'"
        @blur="inputBlurred"
      />
    </sui-validator>
    <div
      v-if="icon"
      :class="['display-time__icon', classesTimeIcon]"
      @click.stop="toggleDropdown"
    />
    <!-- NOTE: G-EHS용. X 버튼 제거. -->
    <!-- <span
      v-if="!hideClearButton"
      v-show="!showDropdown && showClearBtn"
      class="clear-btn"
      @click.stop="clearTime"
    >&times;</span> -->
    <!-- <div
      v-if="showDropdown"
      class="time-picker-overlay"
      @click.stop="toggleDropdown('X')"
    /> -->
    <div
      v-show="showDropdown"
      class="dropdown"
    >
      <div v-if="!sticky" class="head">
        <span>시간 선택</span>
        <button type="button" class="btn-close" @click="toggleDropdown('X')">X</button>
      </div>
      <div ref="timePickerList" class="select-list">
        <div class="hours">
          <div class="hint" v-text="transHourType" />
          <ul style="position: relative;">
            <li
              v-for="(hr, index) in hours"
              :key="index"
              v-text="hr"
              :class="{active: hour === hr}"
              @click.stop="select('hour', hr)"
            />
          </ul>
        </div>
        <div class="minutes">
          <div class="hint" v-text="transMinuteType" />
          <ul style="position: relative;">
            <li
              v-for="(m, index) in minutes"
              :key="index"
              v-text="m"
              :class="{active: minute === m}"
              @click.stop="select('minute', m)"
            />
          </ul>
        </div>
        <div class="seconds" v-if="secondType">
          <div class="hint" v-text="transSecondType" />
          <ul style="position: relative;">
            <li
              v-for="(s, index) in seconds"
              :key="index"
              v-text="s"
              :class="{active: second === s}"
              @click.stop="select('second', s)"
            />
          </ul>
        </div>
        <div class="apms" v-if="apmType">
          <div class="hint" v-text="transApmType" />
          <ul style="position: relative;">
            <li
              v-for="(a, index) in apms"
              :key="index"
              v-text="a"
              :class="{active: apm === a}"
              @click.stop="select('apm', a)"
            />
          </ul>
        </div>
      </div>
      <!-- <div v-if="!sticky" class="bottom"> // NOTE: SEHS 용으로 항상 confirm 버튼 보이도록 수정 -->
      <div class="bottom">
        <button type="button" class="btn_confirm" @click="toggleDropdown('confirm')">Apply</button>
      </div>
    </div>
  </span>
</template>

<script>
const CONFIG = {
  HOUR_TOKENS: ['HH', 'H', 'hh', 'h', 'kk', 'k'],
  MINUTE_TOKENS: ['mm', 'm'],
  SECOND_TOKENS: ['ss', 's'],
  APM_TOKENS: ['A', 'a'],
};

const TIME_SEPARATOR = ':';

export default {
  name: 'VueTimepicker',

  props: {
    value: { type: Object },
    hideClearButton: { type: Boolean },
    ko: { type: Boolean },
    sticky: { type: Boolean, default: false },
    format: { type: String, default: 'HH:mm' },
    minuteInterval: { type: Number },
    secondInterval: { type: Number },
    id: { type: String },
    icon: {
      // 타임피커 우측 icon 영역 표시 여부
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    typeable: { type: Boolean, default: true }, // NOTE: SEHS 용으로 추가됨.
    hideInput: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      input: null, // <sui-text-field>
      hours: [],
      minutes: [],
      seconds: [],
      apms: [],
      showDropdown: false,
      muteWatch: false,
      hourType: 'HH',
      minuteType: 'mm',
      secondType: '',
      apmType: '',
      hour: '',
      minute: '',
      second: '',
      apm: '',
      currentHour: '',
      currentMinute: '',
      currentSecond: '',
      currentApm: '',
      fullValues: undefined,

      /**
       * Validation
       */
      validationCode: false, // 패스여부(false일 때 에러)
      validationMessage: '', // 에러 메시지
    };
  },

  computed: {
    classesTimePicker() {
      return [
        { 'time-picker__disabled': this.disabled },
        { 'time-picker__readonly': this.readonly },
      ];
    },
    classesTimeIcon() {
      return [
        { 'display-time__icon-disabled': this.disabled },
        { 'display-time__icon-disabled': this.readonly },
      ];
    },
    displayTime() {
      let formatString = String(this.format || 'HH:mm');
      if (this.currentHour && this.hourType) {
        formatString = formatString.replace(
          new RegExp(this.hourType, 'g'),
          this.currentHour
        );
      }
      if (this.currentMinute && this.minuteType) {
        formatString = formatString.replace(
          new RegExp(this.minuteType, 'g'),
          this.currentMinute
        );
      }
      if (this.currentSecond && this.secondType) {
        formatString = formatString.replace(
          new RegExp(this.secondType, 'g'),
          this.currentSecond
        );
      }
      if (this.currentApm && this.apmType) {
        formatString = formatString.replace(
          new RegExp(this.apmType, 'g'),
          this.currentApm
        );
      }
      return formatString;
    },
    showClearBtn() {
      if (
        (this.hour && this.hour !== '') ||
        (this.minute && this.minute !== '')
      ) {
        return true;
      }
      return false;
    },
    transHourType() {
      if (this.ko) {
        return 'Hours';
      }
      return this.hourType;
    },
    transMinuteType() {
      if (this.ko) {
        return 'Minutes';
      }
      return this.minuteType;
    },
    transSecondType() {
      if (this.ko) {
        return 'Seconds';
      }
      return this.secondType;
    },
    transApmType() {
      if (this.ko) {
        return '시간대';
      }
      return this.apmType;
    },

    // for <fdp-validator>
    timepickerValidatorRules() {
      return {
        sui_custom: [
          this.validationCode, // 패스여부(false일 때 에러)
          this.validationMessage, // 에러 메시지
        ],
      };
    },
  },

  watch: {
    format: 'renderFormat',
    minuteInterval(newInteval) {
      this.renderList('minute', newInteval);
    },
    secondInterval(newInteval) {
      this.renderList('second', newInteval);
    },
    value: 'readValues',
    // displayTime: 'fillValues',
    showDropdown(isShow) {
      if (isShow) {
        this.$nextTick(() => {
          this.autoFocusScroll();
        });
        this.$emit('save-data');
      }
    },
  },

  mounted() {
    this.input = this.$refs.fdpTimePickerInput.$refs.refInput;
    this.renderFormat();
  },

  methods: {
    formatValue(type, i) {
      switch (type) {
        case 'H':
        case 'm':
        case 's':
          return String(i);
        case 'HH':
        case 'mm':
        case 'ss':
          return i < 10 ? `0${i}` : String(i);
        case 'h':
        case 'k':
          return String(i + 1);
        case 'hh':
        case 'kk':
          return (i + 1) < 10 ? `0${i + 1}` : String(i + 1);
        default:
          return '';
      }
    },

    checkAcceptingType(validValues, formatString, fallbackValue) {
      if (!validValues || !formatString || !formatString.length) {
        return '';
      }
      for (let i = 0; i < validValues.length; i++) {
        if (formatString.indexOf(validValues[i]) > -1) {
          return validValues[i];
        }
      }
      return fallbackValue || '';
    },

    renderFormat(format) {
      let newFormat = format || this.format;
      if (!newFormat || !newFormat.length) {
        newFormat = 'HH:mm';
      }

      this.hourType = this.checkAcceptingType(
        CONFIG.HOUR_TOKENS,
        newFormat,
        'HH'
      );
      this.minuteType = this.checkAcceptingType(
        CONFIG.MINUTE_TOKENS,
        newFormat
      );
      this.secondType = this.checkAcceptingType(
        CONFIG.SECOND_TOKENS,
        newFormat
      );
      this.apmType = this.checkAcceptingType(
        CONFIG.APM_TOKENS,
        newFormat
      );

      this.renderHoursList();
      if (this.minuteType) {
        this.renderList('minute');
      }

      if (this.secondType) {
        this.renderList('second');
      }

      if (this.apmType) {
        this.renderApmList();
      }

      const self = this;
      this.$nextTick(() => {
        self.readValues();
      });
    },

    renderHoursList() {
      const hoursCount =
        this.hourType === 'h' || this.hourType === 'hh' ? 12 : 24;
      this.hours = [];
      for (let i = 0; i < hoursCount; i++) {
        this.hours.push(this.formatValue(this.hourType, i));
      }
    },

    renderList(listType, interval) {
      if (listType === 'second') {
        interval = interval || this.secondInterval;
      } else if (listType === 'minute') {
        interval = interval || this.minuteInterval;
      } else {
        return;
      }

      if (interval === 0) {
        interval = 60;
      } else if (interval > 60) {
        // window.console.warn('`' + listType + '-interval` should be less than 60. Current value is', interval)
        interval = 1;
      } else if (interval < 1) {
        // window.console.warn('`' + listType + '-interval` should be NO less than 1. Current value is', interval)
        interval = 1;
      } else if (!interval) {
        interval = 1;
      }

      if (listType === 'minute') {
        this.minutes = [];
      } else {
        this.seconds = [];
      }

      for (let i = 0; i < 60; i += interval) {
        if (listType === 'minute') {
          this.minutes.push(this.formatValue(this.minuteType, i));
        } else {
          this.seconds.push(this.formatValue(this.secondType, i));
        }
      }
    },

    renderApmList() {
      this.apms = [];
      if (!this.apmType) {
        return;
      }
      this.apms = this.apmType === 'A' ? ['AM', 'PM'] : ['am', 'pm'];
    },

    readValues() {
      if (!this.value || this.muteWatch) {
        return;
      }

      const timeValue = JSON.parse(JSON.stringify(this.value || {}));
      if (this.format === 'HH:mm') {
        this.updateValidationCode(this.isValidHHmm(timeValue));
      } else if (this.format === 'HH:mm:ss') {
        this.updateValidationCode(this.isValidHHmmss(timeValue));
      }
      const values = Object.keys(timeValue);
      if (values.length === 0) {
        return;
      }

      if (values.indexOf(this.hourType) > -1) {
        this.hour = timeValue[this.hourType];
        this.currentHour = this.hour;
      }

      if (values.indexOf(this.minuteType) > -1) {
        this.minute = timeValue[this.minuteType];
        this.currentMinute = this.minute;
      }

      if (values.indexOf(this.secondType) > -1) {
        this.second = timeValue[this.secondType];
      } else {
        this.second = 0;
      }
      this.currentSecond = this.second;

      if (values.indexOf(this.apmType) > -1) {
        this.apm = timeValue[this.apmType];
        this.currentApm = this.apm;
      }

      this.fillValues();
    },

    fillValues() {
      const fullValues = {};

      const baseHour = this.hour;
      const baseHourType = this.hourType;

      const hourValue = baseHour || baseHour === 0 ? Number(baseHour) : '';
      const baseOnTwelveHours = this.isTwelveHours(baseHourType);
      const apmValue = (baseOnTwelveHours && this.apm) ? String(this.apm).toLowerCase() : false;

      CONFIG.HOUR_TOKENS.forEach(token => {
        if (token === baseHourType) {
          fullValues[token] = baseHour;
          return;
        }

        let value;
        let apm;
        switch (token) {
          case 'H':
          case 'HH':
            if (!String(hourValue).length) {
              fullValues[token] = '';
              return;
            } else if (baseOnTwelveHours) {
              if (apmValue === 'pm') {
                // value = hourValue < 12 ? hourValue + 12 : hourValue;
                value = this.getValueByCond((hourValue < 12), (hourValue + 12), hourValue)
              } else {
                value = hourValue % 12;
              }
            } else {
              value = hourValue % 24;
            }
            // fullValues[token] =
            //   token === 'HH' && value < 10 ? `0${value}` : String(value);
            fullValues[token] =
              this.getValueByCond(this.isAllTrue((token === 'HH'), (value < 10)), (`0${value}`), (String(value)))
            break;
          case 'k':
          case 'kk':
            if (!String(hourValue).length) {
              fullValues[token] = '';
              return;
            } else if (baseOnTwelveHours) {
              if (apmValue === 'pm') {
                // value = hourValue < 12 ? hourValue + 12 : hourValue;
                value = this.getValueByCond((hourValue < 12), (hourValue + 12), hourValue)
              } else {
                // value = hourValue === 12 ? 24 : hourValue;
                value = this.getValueByCond((hourValue === 12), 24, hourValue)
              }
            } else {
              value = this.getValueByCond((hourValue === 0), 24, hourValue)
            }
            // fullValues[token] =
            //   token === 'kk' && value < 10 ? `0${value}` : String(value);
            fullValues[token] =
              this.getValueByCond(this.isAllTrue((token === 'kk'), (value < 10)), (`0${value}`), (String(value)))
            break;
          case 'h':
          case 'hh':
            if (apmValue) {
              value = hourValue;
              apm = 'am';
            } else {
              if (!String(hourValue).length) {
                fullValues[token] = '';
                fullValues.a = '';
                fullValues.A = '';
                return;
              } else if (hourValue > 11) {
                apm = 'pm';
                // value = hourValue === 12 ? 12 : hourValue % 12;
                value = this.getValueByCond((hourValue === 12), 12, (hourValue % 12))
              } else {
                if (baseOnTwelveHours) {
                  apm = '';
                } else {
                  apm = 'am';
                }
                // value = hourValue % 12 === 0 ? 12 : hourValue;
                value = this.getValueByCond((hourValue % 12 === 0), 12, hourValue)
              }
            }
            // fullValues[token] =
            //   token === 'hh' && value < 10 ? `0${value}` : String(value);
            fullValues[token] =
              this.getValueByCond(this.isAllTrue((token === 'hh'), (value < 10)), (`0${value}`), (String(value)))
            fullValues.a = apm;
            fullValues.A = apm.toUpperCase();
            break;
        }
      });

      if (this.minute || this.minute === 0) {
        const minuteValue = Number(this.minute);
        fullValues.m = String(minuteValue);
        fullValues.mm = (minuteValue < 10) ? `0${minuteValue}` : String(minuteValue);
      } else {
        fullValues.m = '';
        fullValues.mm = '';
      }

      if (this.second || this.second === 0) {
        const secondValue = Number(this.second);
        fullValues.s = String(secondValue);
        fullValues.ss = (secondValue < 10) ? `0${secondValue}` : String(secondValue);
      } else {
        fullValues.s = '';
        fullValues.ss = '';
      }
      this.fullValues = fullValues;
      this.updateTimeValue(fullValues);
      this.$emit('change', { data: fullValues });
    },

    updateTimeValue(fullValues) {
      this.muteWatch = true;
      const self = this;

      const baseTimeValue = JSON.parse(JSON.stringify(this.value || {}));
      const timeValue = {};

      Object.keys(baseTimeValue).forEach(key => {
        timeValue[key] = fullValues[key];
      });

      this.$emit('input', timeValue); // ==> [][][]

      this.$nextTick(() => {
        self.muteWatch = false;
      });
    },

    isTwelveHours(token) {
      return token === 'h' || token === 'hh';
    },

    toggleDropdown(param) {
      if (!this.disabled && !this.readonly) {
        this.showDropdown = !this.showDropdown;
        if (this.showDropdown) {
          this.$emit('opened');
        }

        if (param === 'X') {
          this.$emit('reset');
        } else if (param === 'confirm') {


          // with validation.
          let isValid = false;
          if (this.format === 'HH:mm') {
            isValid = this.isValidHHmm({
              HH: this.hour,
              mm: this.minute,
            });
          } else if (this.format === 'HH:mm:ss') {
            isValid = this.isValidHHmmss({
              HH: this.hour,
              mm: this.minute,
              ss: this.second,
            });
          }
          this.updateValidationCode(isValid);

          // confirm
          if (isValid) {
            this.currentHour = this.hour;
            this.currentMinute = this.minute;
            this.currentSecond = this.second;
            this.currentApm = this.apm;
            this.fillValues();
            this.$emit('confirm', this.fullValues);
          }
        }
      }
    },

    select(type, value) {
      if (type === 'hour') {
        this.hour = value;
        // this.currentHour = value;
      } else if (type === 'minute') {
        this.minute = value;
        // this.currentMinute = value;
      } else if (type === 'second') {
        this.second = value;
        // this.currentSecound = value;
      } else if (type === 'apm') {
        this.apm = value;
        // this.currentApm = value;
      }
    },

    clearTime() {
      this.hour = '';
      this.minute = '';
      this.second = '';
      this.apm = '';
    },

    autoFocusScroll() {
      Array.from(this.$refs.timePickerList.children).forEach(list => {
        if (list.children.length >= 2) {
          const activeTarget = list.children[1].getElementsByClassName(
            'active'
          );
          if (activeTarget.length > 0) {
            list.children[1].scrollTop =
              activeTarget[0].offsetTop - activeTarget[0].offsetHeight * 2;
          }
        }
      });
    },

    show() {
      this.showDropdown = true;
    },

    close() {
      this.showDropdown = false;
    },

    inputBlurred(event, clickCancel) {
      if (!clickCancel && this.typeable) {
        const { value } = this.input;
        this.updateValidationCode(this.validateTime(value));

        if (!value) {
          // 사용자가 input 을 모두 지운 경우
          this.$emit('reset');
          return;
        }

        const parsed = value.split(TIME_SEPARATOR);

        if (this.validationCode) {
          if (parsed.length === 2 && this.format === 'HH:mm') {
            this.$emit('input', {
              HH: _.trim(parsed[0]),
              mm: _.trim(parsed[1]),
            });
          } else if (parsed.length === 3 && this.format === 'HH:mm:ss') {
            this.$emit('input', {
              HH: _.trim(parsed[0]),
              mm: _.trim(parsed[1]),
              ss: _.trim(parsed[2]),
            });
          }
        }
      }
    },

    isValidHHmm(timeObj) {
      const hourValue = Number(timeObj.HH);
      const minuteValue = Number(timeObj.mm);
      let isValid = false;

      if (_.isEmpty(timeObj) || (_.isEmpty(timeObj.HH) && _.isEmpty(timeObj.mm))) {
        isValid = true;
      } else if (!_.isEmpty(timeObj) && (_.isEmpty(timeObj.HH) || _.isEmpty(timeObj.mm))) {
        isValid = false;
      } else if (hourValue >= 0 && hourValue <= 23 && minuteValue >= 0 && minuteValue <= 59) {
        isValid = true;
      }
      return isValid;
    },

    isValidHHmmss(timeObj) {
      let isValid = false;
      const secondValue = Number(timeObj.ss);

      if (_.isEmpty(timeObj) || (_.isEmpty(timeObj.HH) && _.isEmpty(timeObj.mm) && _.isEmpty(timeObj.ss))) {
        isValid = true;
      } else if (this.isValidHHmm(timeObj) && secondValue >= 0 && secondValue <= 59) {
        isValid = true;
      }
      return isValid;
    },

    validateTime(value) {
      if (!value) {
        return true;
      }

      let isValidated = false;

      const parsed = value.split(TIME_SEPARATOR);

      if (parsed.length === 2 && this.format === 'HH:mm') {
        isValidated = this.isValidHHmm({
          HH: _.trim(parsed[0]),
          mm: _.trim(parsed[1]),
        });
      } else if (parsed.length === 3 && this.format === 'HH:mm:ss') {
        isValidated = this.isValidHHmmss({
          HH: _.trim(parsed[0]),
          mm: _.trim(parsed[1]),
          ss: _.trim(parsed[2]),
        });
      }
      return isValidated;
    },

    updateValidationCode(value) {
      this.validationCode = value;
    },
    isAllTrue(...items) {
      if (utils.isEmpty(items)) return false
      return !(items.filter(item => !item).length > 0)
    },
    getValueByCond(condition, trueValue, falseValue = null) {
      return condition ? trueValue : falseValue
    },
  },
};
</script>

<style scoped>
</style>
