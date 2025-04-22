<template>
  <div :class="{'input-group' : bootstrapStyling}">
    <sui-validator
      :value="formattedValue"
      name="datepickerValidator"
      :rules="datepickerValidatorRules"
    >
      <!-- Input -->
      <sui-text-field
        :id="id"
        ref="suiTextField"
        :type="inline ? 'hidden' : 'text'"
        :class="computedInputClass"
        class="sui-date-picker__input"
        :name="name"
        :value="formattedValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly || !(virtual || typeable)"
        :sticky="sticky"
        :mobile="mobile || small"
        title="날짜입력"
        :virtual="virtual"
        :mask="computedMask"
        @keyup="parseTypedDate"
        @blur="inputBlurred"
      />
    </sui-validator>
    <!-- Calendar Button -->
    <span
      v-if="calendarButton"
      class="vdp-datepicker__calendar-button"
      :class="{'input-group-prepend' : bootstrapStyling}"
      :style="{'cursor:not-allowed;' : disabled}"
      @click="showCalendar"
    >
      <span :class="{'input-group-text' : bootstrapStyling}">
        <i :class="calendarButtonIcon">
          {{ calendarButtonIconContent }}
          <span v-if="!calendarButtonIcon">&hellip;</span>
        </i>
      </span>
    </span>
    <!-- Clear Button -->
    <span
      v-if="clearButton && selectedDate"
      class="vdp-datepicker__clear-button"
      :class="{'input-group-append' : bootstrapStyling}"
      @click="clearDate"
    >
      <span :class="{'input-group-text' : bootstrapStyling}">
        <i :class="clearButtonIcon">
          <span v-if="!clearButtonIcon">&times;</span>
        </i>
      </span>
    </span>
    <slot name="afterDateInput" />
  </div>
</template>

<script>
import { makeDateUtils } from '../utils/DateUtils';

const RANGE_DATE_PICKER_SEPARATOR = '~';

export default {
  name: 'DateInput',
  props: {
    dateValueFormat: {
      type: String,
      default: 'YYYYMMDD', // {YYYY}{MM}{DD} 3그룹만으로 구성하고 그룹간 위치이동만 가능
    },
    selectedDate: [Date, Object, String],
    resetTypedDate: [Date],
    format: [String, Function],
    translation: Object,
    inline: Boolean,
    id: String,
    name: String,
    refName: String, /** 오픈소스에 있던건데,  FDP-TEXT-FIELD 로 바꾸면서, 더이상 사용하지 않습니다. */
    openDate: Date,
    placeholder: String,
    inputClass: [String, Object, Array],
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    disabled: { type: Boolean, default: false },
    readonly: Boolean,
    required: Boolean,
    typeable: Boolean,
    bootstrapStyling: Boolean,
    useUtc: Boolean,
    virtual: {
      type: Boolean,
      default: false,
    },
    minimumView: String,
    sticky: { type: Boolean, default: false },
    mobile: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    clearOnError: { type: Boolean, default: false },
    // highlighted: Object,
    isRange: { type: Boolean, default: false },
    initialView: String,
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      input: null,
      typedDate: false,
      utils: constructedDateUtils,

      /**
       * Validation
       */
      validationCode: true, // 패스여부(false일 때 에러)
      validationMessage: '', // 에러 메시지
      formattedValue: '',
    };
  },
  computed: {
    computedInputClass() {
      if (this.bootstrapStyling) {
        if (typeof this.inputClass === 'string') {
          return [this.inputClass, 'form-control'].join(' ');
        }
        return { 'form-control': true, ...this.inputClass };
      }
      return this.inputClass;
    },
    /**
     * reset child component SuiTextField.mask props associated with change of this.props.format value.
     * child 컴포넌트인 SuiTextField.mask props 에 바인딩 됨
     */
    computedMask() {
      let computedResult = null;

      if (this.virtual || this.typeable) {
        if (this.isRange || this.initialView === 'week') {
          computedResult = '####-##-## ~ ####-##-##';
          if (this.format && typeof this.format === 'string') {
            computedResult = `range-date_${this.format} ~ ${this.format}`;
          }
        } else if (this.minimumView === 'year') {
          computedResult = '####';
        } else if (this.minimumView === 'month') {
          computedResult = '####-##';
        } else if (this.format && typeof this.format === 'string') {
          computedResult = `date_${this.format}`;
        } else {
          computedResult = 'date';
        }
      }
      return computedResult;
    },
    datepickerValidatorRules() {
      return {
        sui_custom: [
          this.validationCode, // 패스여부(false일 때 에러)
          this.validationMessage, // 에러 메시지
        ],
      };
    },
  },
  watch: {
    resetTypedDate() {
      this.typedDate = false;
    },
    selectedDate() {
      if (!this.selectedDate) {
        this.updateValidationCode(true);
      }
      if (this.isRange || this.initialView === 'week') {
        if (!this.selectedDate || !this.selectedDate.from || !this.selectedDate.to) {
          this.updateValidationCode(true);
        } else if (moment.isDate(this.selectedDate.from)) {
          this.updateValidationCode(this.validateDate(`${moment(this.selectedDate.from).format(this.format)}~${moment(this.selectedDate.to).format(this.format)}`));
        } else {
          this.updateValidationCode(this.validateDate(`${this.selectedDate.from}~${this.selectedDate.to}`));
        }
      } else {
        this.updateValidationCode(this.validateDate(this.selectedDate));
      }

      let formattedValue = '';

      if (!this.selectedDate) {
        formattedValue = '';
      } else if (this.isRange || this.initialView === 'week') {
        const fromDate = this.selectedDate.from ? moment(this.selectedDate.from, 'YYYY-MM-DD').format(this.format) : '';
        const toDate = this.selectedDate.to ? moment(this.selectedDate.to, 'YYYY-MM-DD').format(this.format) : '';
        formattedValue = `${fromDate} ~ ${toDate}`;
      } else {
        formattedValue = typeof this.format === 'function'
          ? this.format(this.selectedDate)
          : this.utils.formatDate(moment(this.selectedDate, this.dateValueFormat).toDate(), this.format.replace(/Y/g, 'y').replace(/D/g, 'd'), this.translation);
      }

      if (this.formattedValue !== formattedValue) {
        this.formattedValue = formattedValue;
      }
      this.$refs.suiTextField.inputText(this.formattedValue);
    },
  },
  mounted() {
    this.input = this.$refs.suiTextField.$refs.refInput;
  },
  methods: {
    showCalendar() {
      this.$emit('showCalendar');
    },
    /**
     * Attempt to parse a typed date
     * @param {Event} event
     */
    parseTypedDate(event) {
      // close calendar if escape or enter are pressed
      if ([
        27, // escape
        13, // enter
      ].includes(event.keyCode)) {
        this.input.blur();
      }

      // if (this.typeable) {
      //   const typedDate = Date.parse(this.input.value);
      //   if (!Number.isNaN(typedDate)) {
      //     this.typedDate = this.input.value;
      //     this.$emit('typedDate', new Date(this.typedDate));
      //   }
      // }
    },

    /**
     * nullify the typed date to defer to regular formatting
     * called once the input is blurred
     */
    inputBlurred(event, clickCancel) {
      if (!clickCancel && (this.virtual || this.typeable)) {
        const { value } = this.input;
        this.updateValidationCode(this.validateDate(value));

        if (!value) {
          // 사용자가 Input창 값을 모두 지운 경우.
          this.$emit('clearDate');
          return;
        }

        const parsed = value.split(RANGE_DATE_PICKER_SEPARATOR);
        const fromDate = _.trim(parsed[0]) || '';
        const toDate = _.trim(parsed[1]) || '';
        if (this.isRange || this.initialView === 'week') {
          this.$emit('input', {
            from: fromDate,
            to: toDate,
          });
        } else {
          this.$emit('input', value);
        }
        if (this.validationCode) {
          if (this.isRange || this.initialView === 'week') {
            this.typedDate = {
              from: fromDate,
              to: toDate,
            };
            this.$emit('typedDate', {
              from: moment(this.typedDate.from, this.format.toUpperCase()).toDate() || '',
              to: moment(this.typedDate.to, this.format.toUpperCase()).toDate() || '',
            });
          } else {
            this.typedDate = value;
            this.$emit('typedDate', moment(this.typedDate, this.format.toUpperCase()).toDate());
          }
        }
      }

      /** 잘못된 날짜 형식일때 빈칸을 만드는 경우 */
      //   const typedDate = Date.parse(this.input.value);
      //   const inputValue = this.$refs.suiTextField.$refs.refInput.value;
      //   // isNaN 또는 format length와 value length가 다를경우
      //   if (!this.input.value) {
      //     this.$emit('clearDate');
      //   } else if (Number.isNaN(typedDate) || (inputValue && this.format.length !== inputValue.length)) {
      //     if (this.virtual && inputValue) {
      //       // 가상키패드 다시 띄우기
      //       this.$refs.suiTextField.isActive = true;
      //       // 가상키패드에 에러 보여주기
      //       this.$refs.suiTextField.isPass = false;
      //       return;
      //     }
      //     this.$emit('dateIsNan', this.input.value);
      //     if (this.clearOnError) {
      //       this.$emit('clearDate'); // 에러시 text 클리어 할거면 이것 사용
      //     }
      //   } else {
      //     this.typedDate = this.input.value;
      //     this.$emit('typedDate', new Date(this.typedDate));
      //   }
      // }
      /**
       잘못된 날짜 형식일때 이전 값으로 되돌리려는 경우 여기 주석 풀어서 사용하셔요
      if (this.virtual || this.typeable) {
        if (Number.isNaN(Date.parse(this.input.value))) {
          let dateSelectedBefore = typeof this.format === 'function'
            ? this.format(this.selectedDate)
            : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation)
          this.$refs.suiTextField.inputText(dateSelectedBefore)
          this.typedDate = dateSelectedBefore
        } else {
          this.typedDate = this.input.value
          this.$emit('typedDate', new Date(this.typedDate))
        }
      }
      */
      this.$emit('closeCalendar');
    },
    parseDate(date) {
      if (!date) {
        return '';
      }

      let monthString = (date.getMonth() + 1).toString();
      let dateString = date.getDate().toString();

      if (monthString.length === 1) {
        monthString = `0${monthString}`;
      }
      if (dateString.length === 1) {
        dateString = `0${dateString}`;
      }
      return `${date.getFullYear()}-${monthString}-${dateString}`;
    },

    isValidWeekDate(value) {
      const parsed = value.split(RANGE_DATE_PICKER_SEPARATOR);
      if (parsed.length === 1) {
        return false;
      }

      const fromDate = _.trim(parsed[0]) || '';
      const toDate = _.trim(parsed[1]) || '';

      if (!fromDate && !toDate) {
        return true;
      }

      if (this.isValidDate(fromDate) && this.isValidDate(toDate)) {
        const weeknumberForFromDate = moment(moment(fromDate, this.dateValueFormat).toDate()).week();
        const weeknumberForToDate = moment(moment(toDate, this.dateValueFormat).toDate()).week();

        if (weeknumberForFromDate === weeknumberForToDate
          && fromDate === moment(moment(fromDate, this.dateValueFormat).toDate()).week(weeknumberForFromDate).startOf('week').format(this.dateValueFormat)
          && toDate === moment(moment(toDate, this.dateValueFormat).toDate()).week(weeknumberForFromDate).endOf('week').format(this.dateValueFormat)
          // && fromDate === moment(new Date(fromDate)).week(weeknumberForFromDate).startOf('week').format('YYYY-MM-DD')
          // && toDate === moment(new Date(toDate)).week(weeknumberForFromDate).endOf('week').format('YYYY-MM-DD')
        ) {
          return true;
        }
      }
      return false;
    },

    isValidRangeDate(value) {
      const parsed = value.split(RANGE_DATE_PICKER_SEPARATOR);
      if (parsed.length === 1) {
        return false;
      }

      let fromDate = _.trim(parsed[0]) || '';
      let toDate = _.trim(parsed[1]) || '';

      if (!fromDate && !toDate) {
        return true;
      }

      if (this.isValidDate(fromDate) && this.isValidDate(toDate)) {
        fromDate = moment(fromDate, this.format).toDate();
        toDate = moment(toDate, this.format).toDate();
        if (fromDate.getTime() <= toDate.getTime()) {
          return true;
        }
      }
      return false;
    },
    /**
     * check validation for date string
     */
    isValidDate(date) {
      return moment(date, this.format, true).isValid() || moment(date, this.dateValueFormat, true).isValid();
    },
    /**
     * check validation for input textField value for each case('range', 'week', default)
     */
    validateDate(value) {
      if (!value) {
        return true;
      }
      let isValidated = false;
      if (this.initialView === 'range') {
        isValidated = this.isValidRangeDate(value);
      } else if (this.initialView === 'week') {
        isValidated = this.isValidWeekDate(value);
      } else {
        isValidated = this.isValidDate(value);
      }
      return isValidated;
    },

    updateValidationCode(value) {
      this.validationCode = value;
    },

    isValid() {
      return this.validationCode;
    }
  },
};
</script>
