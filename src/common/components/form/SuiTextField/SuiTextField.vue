<template>
  <div :class="['sui-text-field', wrapperClasses]">
    <input
      ref="refInput"
      v-model="txtField"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="computeReadonly"
      :maxlength="maxlength"
      :title="showTooltip? txtField: null"
      :class="['sui-text-field__input', inputClasses]"
      @input="inputText($event.target.value)"
      @focus="fdpTextFieldFocused"
      @blur="fdpTextFieldBlur"
      @keyup="fdpTextFieldKeyup"
    >
    <div
      v-show="withIcon"
      class="sui-text-field__input__toggle-icon"
    >
      <div
        v-show="withFixedIcon"
        class="sui-text-field__img--clearable"
        @mousedown="clearInputValue"
      />
      <div
        :class="['sui-text-field__img', iconClasses]"
        @click="toggleIcon"
      />
    </div>
    <div
      v-show="isActive && virtual"
      class="sui-text-field__virtual-keypad-outer"
      @click="closeKeypad"
    />
    <!-- 디자인 반영 20181024 --><!-- 키패드가 input text field 기준으로 오른쪽정렬로 나올경우 sui-keypad--align-right -->
    <div
      v-show="isActive && virtual"
      class="sui-text-field__virtual-keypad"
      :class="keypadClasses"
    >
      <div>
        <div class="sui-keypad-tit">
          {{ setTitle }}
        </div>
      </div>
      <div
        class="sui-text-field__virtual-btn--close"
        @click="onClickVirtualButton('X')"
      >
        X
      </div>
      <sui-validator
        v-if="!sticky"
        v-model="txtField"
        name="fdp-text-field__virtual-keypad__input"
        display-name="날짜"
        :rules="customRule"
      >
        <input
          v-model="virtualTxtField"
          :type="inputType"
          :placeholder="placeholder"
          readonly
          :maxlength="maxlength"
          class="sui-text-field__virtual-input"
          :class="{'sui-text-field__input--right': mask === 'currency'}"
        >
      </sui-validator>
      <table class="sui-text-field__keypad-table">
        <tbody>
          <tr>
            <td
              v-for="i of 3"
              :key="i"
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton(i)"
              @touchstart="onTouchStartKey"
              @touchend="onTouchEndKey"
            >
              <div class="sui-text-field__virtual-key-num">
                {{ i }}
              </div>
            </td>
            <td
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton('전체삭제')"
            >
              <div class="sui-text-field__virtual-btn--all-delete">
                {{ messages.MSG_BTN_DEL_ALL }}
              </div>
            </td>
          </tr>
          <tr>
            <td
              v-for="i of 3"
              :key="i+3"
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton(i+3)"
              @touchstart="onTouchStartKey"
              @touchend="onTouchEndKey"
            >
              <div class="sui-text-field__virtual-key-num">
                {{ i+3 }}
              </div>
            </td>
            <td
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton('삭제')"
            >
              <div class="sui-text-field__virtual-btn--delete">
                {{ messages.MSG_BTN_DEL }}
              </div>
            </td>
          </tr>
          <tr>
            <td
              v-for="i of 3"
              :key="i+6"
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton(i+6)"
              @touchstart="onTouchStartKey"
              @touchend="onTouchEndKey"
            >
              <div class="sui-text-field__virtual-key-num">
                {{ i+6 }}
              </div>
            </td>
            <td
              class="sui-text-field__virtual-key"
              rowspan="2"
              @click="onClickVirtualButton('확인')"
            >
              <div class="sui-text-field__virtual-btn--ok">
                {{ messages.MSG_BTN_CFRM }}
              </div>
            </td>
          </tr>
          <tr>
            <td
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton('0')"
              @touchstart="onTouchStartKey"
              @touchend="onTouchEndKey"
            >
              <div class="sui-text-field__virtual-key-btm">
                0
              </div>
            </td>
            <td
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton('00')"
              @touchstart="onTouchStartKey"
              @touchend="onTouchEndKey"
            >
              <div class="sui-text-field__virtual-key-btm">
                00
              </div>
            </td>
            <td
              class="sui-text-field__virtual-key"
              @click="onClickVirtualButton('000')"
              @touchstart="onTouchStartKey"
              @touchend="onTouchEndKey"
            >
              <div class="sui-text-field__virtual-key-btm">
                000
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DatasetBase from '~common/components/form/SuiDatasetBase/SuiDatasetBase';

export default {
  name: 'SuiTextField',
  extends: DatasetBase,
  props: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
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
      default: true,
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
    decimalLength: {
      type: Number,
      default: 3,
    },
    showTooltip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      messages: {
        MSG_BTN_DEL_ALL: utils.getMessageById('MSG_BTN_DEL_ALL'),
        MSG_BTN_DEL: utils.getMessageById('MSG_BTN_DEL'),
        MSG_BTN_CFRM: utils.getMessageById('MSG_BTN_CFRM'),
      },
      txtField: '',
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
          test: char => char.match(/[0-9.]/), // 숫자와 . 만 허용
          convert: char => char,
        },
        c: {
          test: char => char.match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/), // 한글, 영어, 숫자만 허용
          convert: char => char,
        },
        s: {
          test: char => char.match(/[0-9A-Za-z_-]/), // 숫자와, 영문, _, - 허용
          convert: char => char,
        },
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
        'sui-text-field--disabled': this.disabled,
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
        'sui-text-field__input--right': !this.readonly && this.mask === 'currency',
      };
    },
    computeReadonly() {
      return this.readonly || this.virtual;
    },
    customRule() {
      return {
        sui_custom: [this.isPass, this.customMessage], // 첫번째 인자가 패스여부(false일 때 에러), 두번째 인자가 에러 메시지
      };
    },
  },
  watch: {
    value(v) {
      if (this.realText !== v) {
        this.setValue(v);
      }
    },
    isFocus(newValue) {
      if (newValue && !this.readonly && !this.disabled) {
        this.isActive = true;
      }
    },
    isActive(newValue) {
      if (!newValue) {
        // 가상키패드 꺼질때 blur 호출
        this.isPass = true; // isPass 초기화
        this.fdpTextFieldBlur();
      }
      if (newValue && this.virtual) {
        this.originValue = this.value; // 가상키패드 켜질 때 이전 값 저장
        this.clickCancel = false; // clickCancel false로 초기화
      }
    },
    virtualTxtField(newValue) { // 가사키패드 커스텀 에러 초기화
      this.isPass = true;
    },
  },
  created() {
    this.setValue(this.value);
  },
  mounted() {
    this.bindDataset();
    if (!this.value) return;
  },
  beforeDestroy() {
    this.unbindDataset();
  },
  methods: {
    inputText(inputValue, isAsync) {
      if (!inputValue) {
        if (this.isConditionAllTrue(this.virtualKeyPadAsync, isAsync)) {
          this.virtualTxtField = '';
          return;
        }
        this.txtField = '';
        this.realText = '';
        this.virtualTxtField = '';
        this.emitInput(this.realText);
        return;
      }

      if (inputValue.length > this.maxlength) {
        if (this.isConditionAllTrue(event, event.target.value)) {
          event.target.value = event.target.value.substring(0, this.maxlength);
        }
        return;
      }

      if (this.mask) {
        if (this.mask === 'currency') {
          const currency = utils.getCurrencyInfoFromText(inputValue, null, this.decimalLength);
          this.realText = currency.value;
          this.txtField = currency.text;
          this.emitInput(this.realText);
        } else {
          if (this.mask === 'phone') {
            // if (this.onlyNums(inputValue).length < 8) {
            //   this.predefinedMasks.phone = '### - ####';
            // } else {
            //   this.predefinedMasks.phone = '#### - ####';
            // }
            this.predefinedMasks.phone = this.getPhoneMask(inputValue)
          } else if (this.mask === 'full-phone') {
            // if (this.onlyNums(inputValue).length < 11) {
            //   this.predefinedMasks['full-phone'] = '### - ### - ####';
            // } else {
            //   this.predefinedMasks['full-phone'] = '### - #### - ####';
            // }
            this.predefinedMasks['full-phone'] = this.getFullPhoneMask(inputValue)
          } else if (this.mask === 'number') {
            // let numberMask = '';
            // for (let i = 0; i < this.maxlength; i += 1) {
            //   numberMask += '#';
            // }
            // this.predefinedMasks.number = numberMask;
            this.predefinedMasks.number = this.getNumberMask(inputValue)
          } else if (this.mask === 'signed-number') {
            // let signedNumberMask = '';
            // if (inputValue.charAt(0) === '-') {
            //   signedNumberMask = '-';
            // }
            // for (let i = 0; i < this.maxlength; i += 1) {
            //   signedNumberMask += '#';
            // }
            // this.predefinedMasks['signed-number'] = signedNumberMask;
            this.predefinedMasks['signed-number'] = this.getSignedNumberMask(inputValue)
          } else if (this.mask === 'decimal') {
            // let decimalMask = '';
            // for (let i = 0; i < this.maxlength; i += 1) {
            //   decimalMask += 'd';
            // }
            // this.predefinedMasks.decimal = decimalMask;
            this.predefinedMasks.decimal = this.getDecimalMask(inputValue)
          } else if (this.mask === 'ken') {
            // let kenMask = '';
            // for (let i = 0; i < this.maxlength; i += 1) {
            //   kenMask += 'c';
            // }
            // this.predefinedMasks.ken = kenMask;
            this.predefinedMasks.ken = this.getKenMask(inputValue)
          } else if (this.mask === 'serial') {
            // let serialMask = '';
            // for (let i = 0; i < this.maxlength; i += 1) {
            //   serialMask += 's';
            // }
            // this.predefinedMasks.serial = serialMask;
            this.predefinedMasks.serial = this.getSerialMask(inputValue)
          }
          if (this.isConditionAllTrue(this.virtualKeyPadAsync, isAsync)) {
            this.virtualTxtField = this.applyMask(inputValue, this.mask);
          } else {
            this.txtField = this.applyMask(inputValue, this.mask);
            this.virtualTxtField = this.txtField;
            // event.target.value = this.txtField // 하위버전(51)에서 처리되지 않음
            this.emitInput(String(this.realText));
          }
        }
      } else if (this.isConditionAllTrue(this.virtualKeyPadAsync, isAsync)) {
        this.virtualTxtField = inputValue;
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
    onlyNums(text) {
      let ret = '';
      for (let i = 0; i < text.length; i += 1) {
        if (this.allowedMasks['#'].test(text[i])) { ret += text[i]; }
      }
      return ret;
    },
    applyMask(text, mask) {
      // 사전 정의되지 않은 mask 이지만 동적 날짜 형식을 적용해야 하는 mask일 경우에 대한 처리 추가
      if (!Object.prototype.hasOwnProperty.call(this.predefinedMasks, mask)) {
        const reSingleDate = /^date_(.+)$/;
        const reRangeDate = /^range-date_(.+)$/;
        if (reSingleDate.test(mask)) {
          const _dateFmt = reSingleDate.exec(mask)[1];
          this.predefinedMasks[`date_${_dateFmt}`] = _dateFmt.replace(/[YMD]/ig, '#');
        } else if (reRangeDate.test(mask)) {
          const _dateFmt = reRangeDate.exec(mask)[1];
          this.predefinedMasks[`range-date_${_dateFmt}`] = _dateFmt.replace(/[YMD]/ig, '#');
        }
      } else if (mask === 'decimal') {
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
      this.$emit('clear-input');
    },
    toggleIcon() {
      if (this.fixedIcon) {
        this.$emit('click');
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
    onDatasetSelectionChanged(selectedValue) {
      this.inputText(selectedValue);
    },
    setValue(value) {
      if (value && this.mask === 'currency') {
        const formattedValue = utils.getCurrencyFormattedValue(value);
        this.inputText(formattedValue);
      } else {
        this.inputText(value);
      }
    },
    isConditionAllTrue(...items) {
      if (utils.isEmpty(items)) return false
      return !(items.filter(item => !item).length > 0)
    },
    getPhoneMask(inputValue) {
      if (this.onlyNums(inputValue).length < 8) {
        return '### - ####'
      }
      return '#### - ####'
    },
    getFullPhoneMask(inputValue) {
      if (this.onlyNums(inputValue).length < 11) {
        return '### - ### - ####'
      }
      return '### - #### - ####'
    },
    // eslint-disable-next-line no-unused-vars
    getNumberMask(inputValue) {
      let numberMask = ''
      for (let i = 0; i < this.maxlength; i += 1) {
        numberMask += '#'
      }
      return numberMask
    },
    getSignedNumberMask(inputValue) {
      let signedNumberMask = ''
      if (inputValue.charAt(0) === '-') {
        signedNumberMask = '-'
      }
      for (let i = 0; i < this.maxlength; i += 1) {
        signedNumberMask += '#'
      }
      return signedNumberMask
    },
    // eslint-disable-next-line no-unused-vars
    getDecimalMask(inputValue) {
      let decimalMask = ''
      for (let i = 0; i < this.maxlength; i += 1) {
        decimalMask += 'd'
      }
      return decimalMask
    },
    // eslint-disable-next-line no-unused-vars
    getKenMask(inputValue) {
      let kenMask = ''
      for (let i = 0; i < this.maxlength; i += 1) {
        kenMask += 'c'
      }
      return kenMask
    },
    // eslint-disable-next-line no-unused-vars
    getSerialMask(inputValue) {
      let serialMask = ''
      for (let i = 0; i < this.maxlength; i += 1) {
        serialMask += 's'
      }
      return serialMask
    },
  },
};
</script>

<style>
</style>
