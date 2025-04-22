<template>
  <div class="range-date-picker">
    <sui-date-picker
      ref="datePicker"
      initial-view="range"
      :value="range"
      :range="range"
      :format="format"
      :dateValueFormat="dateValueFormat"
      :disabled-dates="rangeDisabledDates"
      :hideInput="hideInput"
      :readonly="readonly"
      :disabled="disabled"
      :is-range="true"
      :is-popup="isPopup"
      :placeholder="format.toUpperCase() + ' ~ ' + format.toUpperCase()"
      @selected="onRangeSelect"
      @cleared="cleared"
      @confirm="onConfirm"
      @close="onClose"
    />
  </div>
</template>

<script>
import moment from 'moment';
import store from '~system/vuex'; // for get user session saved at store
import DatasetBase from '~common/components/form/SuiDatasetBase/SuiDatasetBase';

const SEPARATOR = '~';

export default {
  name: 'SuiRangeDatePicker',
  extends: DatasetBase,
  props: {
    format: {
      type: String,
      default: () => store.getters.userInfo.dateFormat || 'YYYY-MM-DD',
    },
    dateValueFormat: {
      type: String,
      default: () => store.getters.userInfo.dateValueFormat || 'YYYYMMDD',
    },
    value: {
      type: [String, Object],
      default() {
        return {
          from: '',
          to: '',
        };
      },
    },
    disabledDates: {
      type: [String, Object],
      default() {
        return {
          from: null,
          to: null,
        };
      },
    },
    hideInput: { type: Boolean }, // EHS 용, input 없이 API를 통해 제어
    disabled: { type: Boolean, default: false }, // 해당 component의 disabled 여부
    readonly: { type: Boolean, default: false }, // 해당 component의 readonly 여부
    // placeholder: { type: String, default: `${this.format.toUpperCase()} ~ ${this.format.toUpperCase()}` },
    isPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      range: this.getValues(this.value),
      rangeDisabledDates: this.getValues(this.disabledDates),
    };
  },
  watch: {
    value() {
      this.updateDateValue(this.value);
    },
  },
  methods: {
    /**
     * 
     */
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
          fromDate = splitted[0];
          toDate = splitted[1];
        }
      } else {
        fromDate = moment.isDate(value.from) ? value.from : (value.from ? moment(value.from, this.dateValueFormat).toDate():'');
        toDate = moment.isDate(value.to) ? value.to : (value.to ? moment(value.to, this.dateValueFormat).toDate():'');
      }
      return {
        from: fromDate || '',
        to: toDate || '',
      };
    },

    updateDateValue(newValue) {
      this.range = this.getValues(newValue);
    },

    updateDisabledDatesValue(newValue) {
      this.rangeDisabledDates = this.getValues(newValue);
    },

    onDatasetSelectionChanged(selectedValue) {
      // 2020.03.16 아래 emit 이 updateDateValue 를 호출하지 않나?
      // 2020.03.16 this.updateDateValue(selectedValue);
      this.$emit('input', selectedValue);
      // 2020.03.16: this.$emit('input', this.range);
    },

    isRangeDataObject(dataObject) {
      if (dataObject !== null
        && typeof dataObject === 'object'
        && Object.prototype.hasOwnProperty.call(dataObject, 'from')
        && Object.prototype.hasOwnProperty.call(dataObject, 'to')
      ) {
        return true;
      }
      return false;
    },

    onRangeSelect(range) {
      this.$emit('selected', range);
    },
    /**
     * click event handler for apply button of clander
     * It convert Date type value to string and not assign to any data property value
     * It only emit events
     */
    onConfirm(value) {
      if (value) {
        let newValue = {
          from: moment.isDate(value.from) ? moment(value.from).format(this.dateValueFormat)
            : moment(value.from, this.dateValueFormat).format(this.dateValueFormat),
          to: moment.isDate(value.to) ? moment(value.to).format(this.dateValueFormat)
            : moment(value.to, this.dateValueFormat).format(this.dateValueFormat),
        };
        if (newValue.from.toUpperCase() === 'INVALID DATE') { // 선택안된 날짜 처리
          newValue.from = '';
        } 
        if (newValue.to.toUpperCase() === 'INVALID DATE') {
          newValue.to = '';
        }
        if (typeof this.value === 'string') {
          newValue = `${newValue.from}~${newValue.to}`;
        }
        this.$emit('input', newValue);
        this.$emit('selected', newValue);
        this.$emit('confirm', newValue);
      } else {
        this.$emit('confirm', value);
      }
    },

    onClose() {
      this.$emit('close', this);
    },

    setDateStr(dateStr) {
      this.updateDateValue(dateStr);
    },

    setDisabledDates(dateObj) {
      this.updateDisabledDatesValue(dateObj);
    },

    show(value, targetEl, propData = {}, option ={}) {
      const datepicker = this.$refs.datePicker;
      if (datepicker) {
        this.setDateStr(value);
        if (option.disabledDates) {
          this.setDisabledDates(option.disabledDates);
        }        
        datepicker.adjustsize(targetEl);
        datepicker.activate();
      }
    },

    activate() {
      if (this.$refs.datePicker) {
        this.$refs.datePicker.activate();
      }
    },

    deactivate() {
      if (this.$refs.datePicker) {
        this.$refs.datePicker.deactivate();
      }
    },

    cleared() {
      if (typeof this.value === 'string') {
        this.$emit('input', '');
        this.$emit('selected', '');
        this.$emit('confirm', '');
      } else {
        this.$emit('input', { from: '', to: '' });
        this.$emit('selected', { from: '', to: '' });
        this.$emit('confirm', { from: '', to: '' });
      }
      this.$emit('cleared');
    },

    isValid() {
      if (this.$refs.datePicker) {
        return this.$refs.datePicker.isValid();
      }
      return false;
    }
  },
};
</script>

<style scoped>
</style>
