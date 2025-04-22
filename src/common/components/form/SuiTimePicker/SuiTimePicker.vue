<template>
  <div
    :class="['sui-time-picker', classes]"
  >
    <vue-timepicker
      ref="timePicker"
      v-model="localTimeValue"
      v-time-picker-click-outside="closeTimePicker"
      :format="format"
      :minute-interval="minuteInterval"
      :second-interval="secondInterval"
      :hide-clear-button="hideClearButton"
      :ko="ko"
      :disabled="disabled"
      :readonly="readonly"
      :sticky="sticky"
      :class="vuetimepickerClasses"
      :icon="icon"
      :typeable="typeable"
      :hideInput="hideInput"
      @opened="onOpened"
      @reset="resetData"
      @save-data="saveOriginData"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
/**
 * 이름 : SuiTimePicker
 * 설명 : 시간 선택 컴포넌트. vue2-timepicker (open source)를 wrapping하여 개발
 * 최종 수정 일시 : 2019 - 02 - 07
 */
import VueTimepicker from './vue2-timepicker/vue-timepicker';
import DatasetBase from '~common/components/form/SuiDatasetBase/SuiDatasetBase';

// 구분자
const TIME_SEPARATOR = ':';

// 사이즈
const TIME_PICKER_OPENED_WIDTH = 170;
const TIME_PICKER_OPENED_HEIGHT = 302;
const TIME_PICKER_WIDESPREAD_OPENED_WIDTH = 228;
const TIME_PICKER_WIDESPREAD_OPENED_HEIGHT = 302;

export default {
  name: 'SuiTimePicker',
  components: {
    VueTimepicker,
  },
  directives: {
    // 타이머 외부 영역 click이벤트 발생시, 닫힘처리
    'time-picker-click-outside': {
      bind(el, binding) {
        // Define Handler and cache it on the element
        const handler = e => {
          if (!el.contains(e.target) && el !== e.target) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener('click', handler);
      },

      unbind(el) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },
  extends: DatasetBase,
  props: {
    value: {
      type: [Object, String],
      default: undefined,
    },
    format: {
      type: String,
      default: 'HH:mm',
    },
    minuteInterval: {
      type: Number,
      default: undefined,
    },
    secondInterval: {
      type: Number,
      default: undefined,
    },
    hideClearButton: {
      type: Boolean,
      default: true, // 생명프로젝트는 기본값을 숨기는 것으로.
    },
    ko: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false, // NOTE: SEHS용으로 readonly 추가
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    sticky: {
      // 타임피커가 input 옆에 붙는 여부(popup X)
      type: Boolean,
      default: true, // NOTE: SEHS 용으로 sticky 하게 보이도록 기본값 수정
    },
    small: {
      // 타임피커가 small 사이즈 여부
      type: Boolean,
      default: false,
    },
    icon: {
      // 타임피커 우측 icon 영역 표시 여부
      type: Boolean,
      default: true, // NOTE: SEHS 용으로 아이콘 보이도록 기본값 수정
    },
    mobile: {
      // 타임피커 mobile 사이즈 여부
      type: Boolean,
      default: false,
    },
    typeable: { type: Boolean, default: true }, // NOTE: SEHS 용으로 추가됨.
    hideInput: { // 외부로 띄울대 컨텐츠만 보여주기 위한 용도
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localTimeValue: {},
      originTimeValue: this.value,

      // CSS: with position
      popupPositionUp: false,
      popupPositionRight: false,
    };
  },
  computed: {
    classes() {
      return [
        { 'sui-time-picker--small': this.small },
        { 'sui-time-picker--mobile': this.mobile },
        { 'sui-time-picker--typeable': this.typeable },
        { 'sui-time-picker--disabled': this.disabled },
        { 'sui-time-picker--readonly': this.readonly },
        { 'sui-time-picker--popup-position-up': this.popupPositionUp },
        { 'sui-time-picker--popup-position-down': !this.popupPositionUp }, // default
        { 'sui-time-picker--popup-position-right': this.popupPositionRight },
        { 'sui-time-picker--popup-position-left': !this.popupPositionRight }, // default
      ];
    },
    vuetimepickerClasses() {
      return [
        { 'sui-time-picker--sticky': this.sticky },
      ];
    },
  },
  watch: {
    value(newValue) {
      this.localTimeValue = this.getTimeObjectFromValue(newValue);
    },
    localTimeValue(newValue) {
      this.$emit('input', newValue);
    },
  },
  created() {
    if (typeof this.value === 'string') {
      const timeObject = this.getTimeObjectFromString(this.value);
      if (timeObject) {
        this.localTimeValue = timeObject;
      }
    } else {
      this.localTimeValue = this.value;
    }
  },
  mounted() {
    this.bindDataset();
  },
  beforeDestroy() {
    this.unbindDataset();
  },
  methods: {
    // TimePicker 띄울 때 기본 값을 저장.
    saveOriginData() {
      this.originTimeValue = this.value;
    },
    // Popup형태일 때 X 버튼 누르면 이전 값으로 리턴.
    resetData() {
      // this.$emit('input', this.originTimeValue);

      // emit
      if (this.format === 'HH:mm') {
        this.$emit('input', {
          HH: '',
          mm: '',
        });
      } else if (this.format === 'HH:mm:ss') {
        this.$emit('input', {
          HH: '',
          mm: '',
          ss: '',
        });
      }
      this.$emit('close');
    },
    // Popup형태일 때 확인버튼 누르면 confirm 이벤트emit.
    onConfirm() {
      let timeValue = this.localTimeValue;
      if (this.value.constructor === String) {
        timeValue = this.getStringFromTimeObject;
      }
      this.$emit('input', timeValue);
      this.$emit('confirm', timeValue);
    },
    onDatasetSelectionChanged(selectedValue, selectedRow) {
      this.localTimeValue = selectedValue;
    },
    getEmitInputValue() {
      const timeObject = this.localTimeValue;
      if (this.value.constructor === String) {
        const HH = timeObject.HH ? `HH:${timeObject.HH}` : '';
        const mm = timeObject.mm ? `mm:${timeObject.mm}` : '';
        const ss = timeObject.ss ? `ss:${timeObject.ss}` : '';
        return `${HH}${mm}${ss}`;
      }
      return timeObject;
    },
    getTimeObjectFromValue(value) {
      if (value.constructor === String) {
        return this.getTimeObjectFromString(value);
      }
      return value;
    },
    getTimeStringFromValue(value) {
      if (value.constructor === String) {
        return value;
      }
      return this.getTimeObjectFromString(value);
    },
    getStringFromTimeObject(timeObject) {
      const HH = timeObject.HH ? `${timeObject.HH}` : '';
      const mm = timeObject.mm ? `:${timeObject.mm}` : '';
      const ss = timeObject.ss ? `:${timeObject.ss}` : '';
      return `${HH}${mm}${ss}`;
    },
    getTimeObjectFromString(timeStr) {
      let timeObject = null;
      if (typeof timeStr === 'string') {
        const splittedStr = timeStr.split(':');
        if (splittedStr.length === 3) {
          timeObject = {
            HH: splittedStr[0],
            mm: splittedStr[1],
            ss: splittedStr[2],
          };
        } else if (splittedStr.length === 2) {
          timeObject = {
            HH: splittedStr[0],
            mm: splittedStr[1],
          };
        }
      }
      return timeObject;
    },
    setTimeStr(timeStr) {
      const timeObject = this.getTimeObjectFromString(timeStr);
      if (timeObject) {
        this.localTimeValue = timeObject;
      }
    },
    show(value, position) {
      if (this.$refs.timePicker) {
        this.setTimeStr(value);
        const el = this.$refs.timePicker.$el;
        el.style.left = `${position.x}px`;
        el.style.top = `${position.y}px`;
        this.$refs.timePicker.show();
      }
    },

    onOpened() {
      let openedWidth = TIME_PICKER_OPENED_WIDTH;
      let openedHeight = TIME_PICKER_OPENED_HEIGHT;

      if (this.format === 'HH:mm:ss') {
        openedWidth = TIME_PICKER_WIDESPREAD_OPENED_WIDTH;
        openedHeight = TIME_PICKER_WIDESPREAD_OPENED_HEIGHT;
      }

      const element = this.$refs.timePicker.$el;
      const [page] = document.getElementsByClassName('-page-contents__wrapper');

      // get positions.
      const positions = utils.retrieveCurrentPositioningStatus(
        openedWidth,
        openedHeight,
        element,
        page,
      );

      // assigned.
      this.popupPositionUp = positions.up;
      this.popupPositionRight = positions.right;
    },

    /**
     * 외부 영역 클릭 이벤트 발생 시 자동닫힘 처리
     */
    closeTimePicker() {
      this.$emit('close', this);
      this.$refs.timePicker.close();
    },

    isValid() {
      if (this.$refs.timePicker) {
        return this.$refs.timePicker.validationCode;
      }
      return false;
    },
  },
};
</script>

<style scoped>
</style>
