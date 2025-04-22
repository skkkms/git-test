<template>
  <div v-show="visibility" ref="rootElem" class="-grid-cell-component">
    <cell-label
      v-show="!editable"
      :value="realText"
      :grid="grid"
      style="width:100%"
    />
    <div class="-grid-cell-component__textfield-container" v-show="editable">
      <div
        :class="['sui-text-field', wrapperClasses]"
      >
        <input
          ref="refInput"
          v-model="txtField"
          :type="inputType"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="computeReadonly"
          :maxlength="maxlength"
          :class="['sui-text-field__input', inputClasses]"
          @input="inputText($event.target.value)"
          @focus="fdpTextFieldFocused"
          @blur="fdpTextFieldBlur"
          @keyup.stop="fdpTextFieldKeyup"
          @keydown.stop=""
        >
        <div
          v-show="withIcon"
          class="sui-text-field__input__toggle-icon"
        >
          <div
            v-show="withFixedIcon"
            class="sui-text-field__img--clearable"
            @click="clearInputValue"
          />
          <div
            :class="['sui-text-field__img', iconClasses]"
            @click="toggleIcon"
          />
        </div>
      </div>
    </div>
    <div v-if="buttonProps" class="comp_spacing"></div>
    <button v-if="buttonProps" class='sui-text-field__btn-container'>
        button
    </button>
    <div v-if="labelProps" class="comp_spacing"></div>
    <div v-if="labelProps" class='sui-text-field__label-container'>
      label
    </div>
  </div>
</template>

<script>
import store from '~system/vuex';
import CellLabel from '../CellLabel/CellLabelView';

export default {
  name: 'CellTextField',
  components: {
    'cell-label': CellLabel,
  },
  props: {
    checkEditableFunction: {
      type: Function,
      default: null,
    },
    checkDisabledFunction: {
      type: Function,
      default: null,
    },
    checkVisibilityFunction: {
      type: Function,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    // clearable: { // NOTE: G-EHS용으로 단독적인 clearable 사용이 없어 삭제함.
    //   type: Boolean,
    //   default: false,
    // },
    readonly: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: null,
    },
    password: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [Number, String],
      default: 100,
    },
    noIcon: {
      type: Boolean,
      default: false,
    },
    fixedIcon: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Boolean,
      default: false,
    },
    virtual: {
      type: Boolean,
      default: false,
    },
    trim: {
      type: Boolean,
      default: false,
    },
    up: {
      type: Boolean,
      default: false,
    },
    alignRight: {
      type: Boolean,
      default: false,
    },
    preventEnterBlur: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    search: {
      type: Boolean,
      default: false,
    },
    small: { // 가상키패드 small 사이즈 여부
      type: Boolean,
      default: false,
    },
    mobile: { // 가상키패드 mobile 사이즈 여부
      type: Boolean,
      default: false,
    },
    virtualKeyPadAsync: { // 가상키패드 textfield sync 여부
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    labelProps: {
      type: Object,
      default: null,
    },
    buttonProps: {
      type: Object,
      default: null,
    },
    grid: {
      type: Object,
      default: null,
    },
    decimalLength: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
      txtField: this.value,
      realText: '',
      virtualTxtField: '',
      originValue: '',
      visible: false,
      isFocus: false,
      isActive: false,
      clickCancel: false, // X버튼 클릭 여부
      isPass: true,
      isTouchAvailable: 'ontouchstart' in window,
      customMessage: '날짜 형식이 맞지 않습니다.',
      predefinedMasks: {
      /* phone : ### - #### or #### - #### */
        phone: '### - ####',
        'full-phone': '### - ### - ####',
        'credit-card': '#### - #### - #### - ####',
        date: '####-##-##',
        'range-date': '####-##-## ~ ####-##-##',
        'date-with-time': '####-##-## ##:##',
        social: '######-#######',
        time: '##:##',
        'time-with-seconds': '##:##:##',
        number: '###############',
        'signed-number': '-##########',
        decimal: 'dddddddddd',
        ken: 'cccccccccc',
        serial: 'ssssssssssssssss',
      },
      allowedMasks: {
        '#': {
          test: char => char.match(/[0-9]/),
          convert: char => char,
        },
        A: {
          test: char => char.match(/[A-Z]/i),
          convert: char => char.toUpperCase(),
        },
        a: {
          test: char => char.match(/[a-z]/i),
          convert: char => char.toLowerCase(),
        },
        N: {
          test: char => char.match(/[0-9A-Z]/i),
          convert: char => char.toUpperCase(),
        },
        n: {
          test: char => char.match(/[0-9a-z]/i),
          convert: char => char.toLowerCase(),
        },
        U: {
          test: char => char.match(/[0-9A-Z_]/i), // 숫자, 영문대문자, _ 만 허용
          convert: char => char.toUpperCase(),
        },
        d: {
          test: char => char.match(/[0-9.-]/), // 숫자와 . 만 허용
          convert: char => char,
        },
        c: {
          test: char => char.match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/), // 한글, 영어, 숫자만 허용
          convert: char => char,
        },
        s: {
          test: char => char.match(/0-9A-Za-z_-]/), // 숫자와, 영문, _, - 허용
          convert: char => char,
        }
      },
    };
  },
  computed: {
    setTitle() {
      if (this.title) {
        return this.title;
      } if (this.mask === 'currency') {
        return '금액입력';
      }
      return '숫자입력';
    },
    inputType() {
      if (this.password && this.visible === false) {
        return 'password';
      } if (this.number) {
        return 'number';
      } if (this.search) {
        return 'search';
      }
      return 'text';
    },
    withFixedIcon() {
      return this.withIcon && this.fixedIcon && this.txtField && !this.disabled;
      // return this.withIcon && this.fixedIcon && this.txtField && !this.disabled && !this.readonly;
    },
    withIcon() {
      // NOTE: G-EHS용으로 변환, clerable은 단독사용할 수 없다. fixIcon일때만 함께 존재.
      // if (!this.noIcon
      //   && ((this.password && !this.clearable)
      //   || (this.clearable && this.txtField && !this.disabled)
      //   || this.fixedIcon)
      // ) {
      //   return true;
      // }
      // return false;
      if (!this.noIcon && (this.password || this.fixedIcon)) {
        return true;
      }
      return false;
    },
    iconClasses() {
      return [
        { 'sui-text-field__fixed-icon': this.fixedIcon },
        { 'sui-text-field__img--password': this.password && this.visible },
        { 'sui-text-field__img--password-visible': this.password && !this.visible },
      ];
    },
    wrapperClasses() {
      return {
        'sui-text-field--focus': this.isFocus,
        'sui-text-field--readonly': this.readonly,
        'sui-text-field--number': this.number,
        'sui-keypad--sticky': this.sticky,
        'sui-keypad--small': this.small,
        'sui-keypad--mobile': this.mobile,
      };
    },
    keypadClasses() {
      return {
        'sui-keypad--up': this.up,
        'sui-keypad--align-right': this.alignRight,
      };
    },
    inputClasses() {
      return {
        'sui-text-field__input--with-icon': this.withIcon,
        'sui-text-field__input--right': this.mask === 'currency',
      };
    },
    computeReadonly() {
      return this.readonly || this.virtual;
    },
    customRule() {
      // return {
      //   'fdp_custom': [this.isPass, this.customMessage] // 첫번째 인자가 패스여부(false일 때 에러), 두번째 인자가 에러 메시지
      // }
      return '';
    },
  },
  watch: {
    // value(v) {
    //   if (this.realText !== v) {
    //     this.inputText(v);
    //   }
    // },
    // isFocus(newValue) {
    //   if (newValue && !this.readonly && !this.disabled) {
    //     this.isActive = true;
    //   }
    // },
    // isActive(newValue) {
    //   if (!newValue) {
    //     // 가상키패드 꺼질때 blur 호출
    //     this.isPass = true; // isPass 초기화
    //     this.fdpTextFieldBlur();
    //   }
    //   if (newValue && this.virtual) {
    //     this.originValue = this.value; // 가상키패드 켜질 때 이전 값 저장
    //     this.clickCancel = false; // clickCancel false로 초기화
    //   }
    // },
    // virtualTxtField() { // 가사키패드 커스텀 에러 초기화
    //   this.isPass = true;
    // },
  },
  created() {
    this.setValue(this.value);
  },
  // mounted() {
  //   // this.bindEvents();
  //   if (!this.value) return;
  //   this.inputText(this.value);
  // },
  methods: {
    setEditable(rowData, columnName, dataset, grid) {
      if (this.checkEditableFunction) {
        this.editable = this.checkEditableFunction(rowData, columnName, dataset, grid);
      }
    },
    setDisabled(rowData, columnName, dataset, grid) {
      if (this.checkDisabledFunction) {
        this.disabled = this.checkDisabledFunction(rowData, columnName, dataset, grid);
      }
    },
    setVisibility(rowData, columnName, dataset, grid) {
      if (this.checkVisibilityFunction) {
        this.visibility = this.checkVisibilityFunction(rowData, columnName, dataset, grid);
      }
    },
    handleBeforeDestroy() {
      (this.$el && this.$el.parentNode)? this.$el.parentNode.removeChild(this.$el):'';
    },
    preventPropagation(event) {
      event.stopPropagation();
    },
    getRootElement() {
      return this.$refs.rootElem;
    },
    bindEvents() {
      const el = this.getRootElement();
      el.addEventListener('keydown', this.preventPropagation);
      el.addEventListener('keyup', this.preventPropagation);
    },
    unbindEvents() {
      const el = this.getRootElement();
      el.removeEventListener('keydown', this.preventPropagation);
      el.removeEventListener('keyup', this.preventPropagation);
    },
    inputText(inputValue, isAsync) {
      if (!inputValue) {
        this.txtField = '';
        this.realText = '';
        this.virtualTxtField = '';
        this.emitInput(this.realText);
        return;
      }

      if (inputValue.length > this.maxlength) {
        if (event && event.target.value) {
          event.target.value = event.target.value.substring(0, this.maxlength);
        }
        return;
      }

      if (this.mask) {
        if (this.mask === 'currency') {
          const currency = utils.getCurrencyInfoFromText(inputValue, null, this.decimalLength);
          this.realText = currency.value;
          this.txtField = currency.text;
          // this.realText = inputValue;
          // this.txtField = utils.numberFormat(inputValue);
          this.emitInput(this.realText);
        } else {
          if (this.mask === 'phone') {
            this.onlyNums(inputValue);
            if (this.onlyNums(inputValue) < 8) {
              this.predefinedMasks.phone = '### - ####';
            } else {
              this.predefinedMasks.phone = '#### - ####';
            }
          } else if (this.mask === 'full-phone') {
            if (this.onlyNums(inputValue) < 11) {
              this.predefinedMasks['full-phone'] = '### - ### - ####';
            } else {
              this.predefinedMasks['full-phone'] = '### - #### - ####';
            }
          } else if (this.mask === 'number') {
            let numberMask = '';
            for (let i = 0; i < this.maxlength; i += 1) {
              numberMask += '#';
            }
            this.predefinedMasks.number = numberMask;
          } else if (this.mask === 'signed-number') {
            let signedNumberMask = '';
            if (inputValue.charAt(0) === '-') {
              signedNumberMask = '-';
            }
            for (let i = 0; i < this.maxlength; i += 1) {
              signedNumberMask += '#';
            }
            this.predefinedMasks['signed-number'] = signedNumberMask;
          } else if (this.mask === 'decimal') {
            let decimalMask = '';
            for (let i = 0; i < this.maxlength; i += 1) {
              decimalMask += 'd';
            }
            this.predefinedMasks.decimal = decimalMask;
          } else if (this.mask === 'ken') {
            let kenMask = '';
            for (let i = 0; i < this.maxlength; i += 1) {
              kenMask += 'c';
            }
            this.predefinedMasks.ken = kenMask;
          }

          this.txtField = this.applyMask(inputValue, this.mask);
          this.realText = this.txtField;
          this.virtualTxtField = this.txtField;
          // event.target.value = this.txtField // 하위버전(51)에서 처리되지 않음
          this.emitInput(String(this.realText));
        }
      } else {
        this.txtField = inputValue;
        this.virtualTxtField = inputValue;
        this.realText = inputValue;
        this.emitInput(this.realText);
      }
    },
    resetData() {
      this.inputText(this.originValue);
    },
    emitInput(text) {
      this.$emit('input', text);
    },
    onlyNums(text, removeContininuousZeroStart) {
      let ret = '';
      let number = '';
      let isNoneZero = false;
      for (let i = 0; i < text.length; i += 1) {
        if (this.allowedMasks['#'].test(text[i])) { number += text[i]; }
      }
      for (let i = 0; i < number.length; i += 1) {
        if (number[i] !== '0') {
          isNoneZero = true;
        }
        if (i > 0 && removeContininuousZeroStart) {
          if (isNoneZero) {
            ret += number[i];
          }
        } else {
          ret += number[i];
        }

      }
      return ret;
    },
    applyMask(text, mask) {
      if (mask === 'decimal') {
        if (text.substring(0, text.length - 1).includes('.')) {
          const textDecimalArr = text.split('.');
          text = `${textDecimalArr[0]}.`;
          for (let i = 1; i < textDecimalArr.length; i += 1) {
            text += textDecimalArr[i];
          }
        }
      }
      const predefined = this.predefinedMasks[mask];
      const masks = predefined || mask;
      const masked = masks.split('');
      let textIdx = 0;
      let maskIdx = 0;
      let maskedText = '';
      this.realText = '';
      while (maskIdx < masked.length && textIdx < text.length) {
        let m = masked[maskIdx];
        const c = text[textIdx];
        if (this.isMask(m)) {
          if (this.allowedMasks[m].test(c)) {
            textIdx += 1;
            maskIdx += 1;
            this.realText += c;
            maskedText += this.allowedMasks[m].convert(c);
          } else {
            return maskedText;
          }
        } else {
          if (m === '[') {
            maskIdx += 1;
            m = masked[maskIdx];
          }
          if (c === m) {
            textIdx += 1;
          }
          maskIdx += 1;
          maskedText += m;
        }
      }
      return maskedText;
    },
    isMask(mask) {
      return Object.prototype.hasOwnProperty.call(this.allowedMasks, mask);
    },
    clearInputValue() {
      this.inputText('');
    },
    toggleIcon() {
      if (this.fixedIcon) {
        this.$emit('click');
      } else if (this.clearable) {
        this.inputText('');
      } else if (this.password) {
        this.visible = !this.visible;
      }
    },
    numberWithCommas(number, comma = ',') {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, comma);
    },
    activate() {
      if (!this.disabled) {
        this.$refs.refInput.focus();
      }
    },
    setFocus() {
      this.$refs.refInput.focus();
    },
    fdpTextFieldKeyup(event) {
      if (event.keyCode === 13 && !this.preventEnterBlur) {
        this.$refs.refInput.blur();
      }

      this.$emit('keyup', event);
    },
    fdpTextFieldFocused(event) {
      if (this.isFocus) return;
      this.isFocus = true;
      this.$emit('focus', event);
    },
    fdpTextFieldBlur(event) {
      // 가상키패드가 켜지면서 blur된 경우는 무시
      if (this.isActive && this.virtual) {
        return;
      }
      this.isFocus = false;
      if (typeof this.txtField === 'string' && this.trim) {
        this.inputText(this.txtField.trim());
      }
      this.$emit('blur', event, this.clickCancel);
    },
    /* 숫자인지 체크 */
    checkNumber(targetText) {
      const regex = /^[0-9]*$/;
      return regex.test(Number(targetText));
    },
    onTouchStartKey(event) {
      if (event.target.children && event.target.children.length > 0) {
        event.target.children[0].classList.add('sui-text-field__virtual-key--active');
        this.onVirtualKey(event.target.children[0].innerText);
      } else {
        event.target.classList.add('sui-text-field__virtual-key--active');
        this.onVirtualKey(event.target.innerText);
      }
    },
    onTouchEndKey(event) {
      if (event.target.children && event.target.children.length > 0) {
        event.target.children[0].classList.remove('sui-text-field__virtual-key--active');
      } else {
        event.target.classList.remove('sui-text-field__virtual-key--active');
      }
    },
    onClickVirtualButton(key) {
      if (!this.isTouchAvailable || key === '삭제' || key === '전체삭제' || key === '확인' || key === 'X') {
        this.onVirtualKey(key);
      }
    },
    /* 가상키 클릭 */
    onVirtualKey(key) {
      key = String(key);
      if (this.checkNumber(key) && this.virtualTxtField.length < this.maxlength) {
        this.inputText(this.virtualTxtField + key, true);
      } else if (key === '삭제') {
        this.inputText(this.virtualTxtField.substring(0, this.virtualTxtField.length - 1), true);
      } else if (key === 'X') {
        this.clickCancel = true;
        this.resetData();
        this.isActive = false;
      } else if (key === '확인') {
        this.inputText(this.virtualTxtField);
        this.$emit('confirm');
        this.isActive = false;
      } else if (key === '전체삭제') {
        this.inputText('', true);
      }
    },
    closeKeypad() {
      this.clickCancel = true;
      this.resetData();
      this.isActive = false;
    },
    setValue(value) {
      if (value && this.mask === 'currency') {
        const formattedValue = utils.getCurrencyFormattedValue(value);
        this.inputText(formattedValue);
      } else {
        this.inputText(value);
      }
    },
    getValue() {
      return this.realText;
    },
  },
  beforeDestroy() {
    this.unbindEvents();
    this.handleBeforeDestroy();
  }
};
</script>

<style scoped>
</style>
