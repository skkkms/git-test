// import _ from 'lodash';

import { _ } from 'core-js';
// import utils from 'markdown-it/lib/common/utils';
import store from '~system/vuex'; // eslint-disable-line import/no-unresolved
import decimalFormat from '../decimal-format';

const CONSTANTS_CHART_AXIS_DEFAULT_FMT = '#,##0.#';
const CONSTANTS_METRIC_PREFIX = {
  QUADRILLION: {
    value: 10 ** 15,
    name: 'quadrillion',
    prefix: 'Q',
  },
  // PETA: {
  //   value: 10**15,
  //   name: 'peta',
  //   prefix: 'P',
  // },
  TRILLION: {
    value: 10 ** 12,
    name: 'trillion',
    prefix: 'T',
  },
  // TERA: {
  //   value: 10**12,
  //   name: 'tera',
  //   prefix: 'T',
  // },
  BILLION: {
    value: 10 ** 9,
    name: 'billion',
    prefix: 'B',
  },
  // GIGA: {
  //   value: 10**9,
  //   name: 'giga',
  //   prefix: 'G',
  // },
  MILLION: {
    value: 10 ** 6,
    name: 'Million',
    prefix: 'M',
  },
  // MEGA: {
  //   value: 10**6,
  //   name: 'mega',
  //   prefix: 'M',
  // },
  KILO: {
    value: 10 ** 3,
    name: 'kilo',
    prefix: 'K',
  },
  ORIGIN: {
    value: 10 ** 0,
    name: 'origin',
    prefix: '',
  },
  MILLI: {
    value: 10 ** -3,
    name: 'milli',
    prefix: 'm',
  },
  MICRO: {
    value: 10 ** -6,
    name: 'micro',
    prefix: 'µ',
  },
  NANO: {
    value: 10 ** -9,
    name: 'nano',
    prefix: 'n',
  },
  PICO: {
    value: 10 ** -12,
    name: 'pico',
    prefix: 'p',
  },
};

export default {
  CONSTANTS_CHART_AXIS_DEFAULT_FMT,
  CONSTANTS_METRIC_PREFIX,

  /**
   * Converts value to a string. An empty string is returned for null and undefined values.
   * The sign of -0 is preserved.
   * number 타입 혹은 number형 string을 문자열로 반환한다.
   *
   * @function toCharNum
   * @param  {number|string} num
   * @return  {string}
   */
  // toCharNum : (num) => _.toString(num),
  toCharNum: num => _.toString(num),

  /**
   * 값이 정수인지 판단하여 true/false 를 반환한다.
   *
   * @function isInteger
   * @param  {number} num
   * @return  {boolean}
   */
  isInteger: num => num === parseInt(num, 10),

  /**
   * 값이 float인지 판단하여 true/false 를 반환한다.
   *
   * @function isFloat
   * @param  {number} num
   * @return  {boolean}
   */
  isFloat: num => num !== Infinity && num === +num && num !== (num | 0),

  /**
   * 수를 한글 금액으로 변환
   * @param value
   * @returns {string}
   */
  numberToHangul: value => {
    const num = value.toString();
    const hanA = new Array('', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구', '십'); // eslint-disable-line no-array-constructor
    const danA = new Array('', '십', '백', '천', '', '십', '백', '천', '', '십', '백', '천', '', '십', '백', '천'); // eslint-disable-line no-array-constructor
    let result = '';
    for (let i = 0; i < num.length; i += 1) {
      let str = '';
      const han = hanA[num.charAt(num.length - (i + 1))];
      if (han !== '') str += han + danA[i];
      if (i === 4) str += '만';
      if (i === 8) str += '억';
      if (i === 12) str += '조';
      result = str + result;
    }
    if (num !== 0) {
      result += '원';
    }
    return result;
  },

  numberWithCommas: (number, comma = ',') => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, comma);
  },

  onlyNums: (text, preventContininuousZeroStart) => {
    let ret = '';
    let number = '';
    let isNoneZero = false;
    const mask = {
      test: char => char.match(/[0-9]/),
      convert: char => char,
    };
    for (let i = 0; i < text.length; i += 1) {
      if (mask.test(text[i])) { number += text[i]; }
    }
    for (let i = 0; i < number.length; i += 1) {
      if (number[i] !== '0') {
        isNoneZero = true;
      }
      if (i > 0 && preventContininuousZeroStart) {
        if (isNoneZero) {
          ret += number[i];
        }
      } else {
        ret += number[i];
      }
    }
    return ret;
  },

  getCurrencyFormattedValue: inputValue => {
    let decimal = '.';
    if (store.getters.userInfo && store.getters.userInfo.digitGroupType) {
      decimal = store.getters.userInfo.digitGroupType.substr(5, 1);
    }
    return inputValue.replace(/\./g, `${decimal}`);
  },

  getCurrencyInfoFromText: (inputValue, digitGroupType, decimalLength = 3) => {
    let decimal = '.';
    let comma = ',';
    if (digitGroupType) {
      comma = digitGroupType.substr(1, 1);
      decimal = digitGroupType.substr(5, 1);
    } else if (store.getters.userInfo && store.getters.userInfo.digitGroupType) {
      comma = store.getters.userInfo.digitGroupType.substr(1, 1);
      decimal = store.getters.userInfo.digitGroupType.substr(5, 1);
    }
    const hasDecimal = (inputValue.indexOf(decimal) >= 0);

    let sign = '';
    if (inputValue[0] === '-') { // 부호 체크
      sign = inputValue[0];
    }

    const splittedValue = inputValue.split(decimal);
    const decimalValue = splittedValue[0];
    let decimalNumber = utils.onlyNums(decimalValue, true);
    let pointNumber = '';
    if (splittedValue.length > 1) {
      pointNumber = splittedValue[1].substring(0, decimalLength);
    }
    pointNumber = utils.onlyNums(pointNumber);
    decimalNumber = sign + decimalNumber;
    decimalNumber = (decimalNumber.length <= 2 && isNaN(parseInt(decimalNumber, 10))) ? '' : parseInt(decimalNumber, 10);

    let decimalText = '';
    if (decimalNumber !== '') {
      decimalText = utils.numberWithCommas(Math.abs(decimalNumber), comma);
    }

    let value = hasDecimal ? `${decimalNumber}.${pointNumber}` : `${decimalNumber}`;

    if (decimalNumber === 0 && hasDecimal && sign) { // -0. -> 0으로 나오는것 방지
      value = `${sign}${decimalNumber}.${pointNumber}`;
      // value = hasDecimal ? `${sign}${decimalNumber}.${pointNumber}` : `${sign}${decimalNumber}`;
    }

    const text = (hasDecimal && decimalNumber !== '') ? `${sign}${decimalText}${decimal}${pointNumber}` : `${sign}${decimalText}`;
    return {
      value,
      text,
    };
  },

  scalingNumber(value, scaling = 1, format = '#,###', roundingMode = decimalFormat.RoundingMode.HALF_UP) {
    let returnVal = 0;
    try {
      returnVal = decimalFormat.decimalFormat(value / scaling, format, roundingMode);
    } catch (e) {
      returnVal = e;
    }
    return returnVal;
  },

  autoScalingNumber(value) {
    let returnValue = parseFloat(value, 10);
    let unit = '';
    if (Math.abs(returnValue) >= 1E+15) {
      returnValue /= 1E+15;
      unit = 'Q';
    } else if (Math.abs(returnValue) >= 1E+12) {
      returnValue /= 1E+12;
      unit = 'T';
    } else if (Math.abs(returnValue) >= 1E+9) {
      returnValue /= 1E+9;
      unit = 'B';
    } else if (Math.abs(returnValue) >= 1E+6) {
      returnValue /= 1E+6;
      unit = 'M';
    } else if (Math.abs(returnValue) >= 1E+3) {
      returnValue /= 1E+3;
      unit = 'K';
    }

    return decimalFormat.decimalFormat(returnValue, `#,###.00${unit}`);
  },

  /**
   * 입력받은 숫자에 가장 가까운 단위를 반환
   * @param {*} value
   * @returns
   */
  getNearMetricPrefix(value) {
    const metricPrefixKeys = Object.keys(CONSTANTS_METRIC_PREFIX);
    let metricPrefix = '';
    const absValue = Math.abs(parseFloat(value, 10));

    // 10의 0승보다 큰 수라고 가정하고 peta 부터 prefix가 적합한지 차례대로 확인
    _.forEach(metricPrefixKeys, key => {
      if (absValue > 10 ** 0 && absValue >= CONSTANTS_METRIC_PREFIX[key].value) {
        metricPrefix = CONSTANTS_METRIC_PREFIX[key].prefix;
        return false;
      }
    });
    // 상위에서 결정이 안되었다면 10의 0승보다 작은 수에서 pico 부터 prefix가 적합한지 차례대로 확인
    if (metricPrefix === '') {
      _.forEach(metricPrefixKeys, key => {
        if (10 ** 0 > absValue && absValue >= CONSTANTS_METRIC_PREFIX[key].value && CONSTANTS_METRIC_PREFIX[key].value < 10 ** 0) {
          metricPrefix = CONSTANTS_METRIC_PREFIX[key].prefix;
          return false;
        }
      });
    }
    return metricPrefix;
  },

  /**
   * 단위로 나눈 결과를 리턴
   * @param {number} value
   * @param {string} metricPrefix
   * @returns {number}
   */
  getMetricPrefixedValue(value, metricPrefix) {
    const metricPrefixKeys = Object.keys(CONSTANTS_METRIC_PREFIX);
    let divideValue = 1;
    _.forEach(metricPrefixKeys, key => {
      if (CONSTANTS_METRIC_PREFIX[key].prefix === metricPrefix) {
        divideValue = CONSTANTS_METRIC_PREFIX[key].value;
      }
    });
    return value / divideValue;
  },

  chartAxisTicksCallback: (axisFormat = CONSTANTS_CHART_AXIS_DEFAULT_FMT, errorCallback) => {
    return (tickValue, index, ticks) => {
      let returnVal;

      // max 값 기준으로 metricPrefix 계산
      let maxValue = -99999999999;
      let metricPrefix = '';
      _.forEach(ticks, tick => {
        maxValue = Math.max(maxValue, Math.abs(tick.value));
      });
      metricPrefix = window.utils.getNearMetricPrefix(maxValue);
      const metricPrefixedValue = window.utils.getMetricPrefixedValue(tickValue, metricPrefix);

      // axisFormat에 '%' 하나만 있을 경우 기본 포맷팅된 값 + '%'
      if (_.trim(axisFormat) === '%') {
        returnVal = `${window.utils.scalingNumber(tickValue, 1, CONSTANTS_CHART_AXIS_DEFAULT_FMT)}%`;
      } else {
        // axisFormat 값이 '%' 하나가 아닐 경우 max 값 기준으로 metricPrefix 계산된 포맷팅 처리
        const re = /[#0]/g;
        if (!re.test(_.trim(axisFormat))) {
          // 포맷 특수문자가 하나도 없을 경우 에러 객체 생성
          returnVal = {
            message: `Invalid Format String "${axisFormat}"`,
            name: 'Error',
          };
        } else {
          // 포맷 특수문자가 존재할 경우 metricPrefix 추가된 포맷팅된 값으로 반환
          returnVal = metricPrefixedValue === 0 ? metricPrefixedValue : window.utils.scalingNumber(metricPrefixedValue, 1, `${axisFormat || CONSTANTS_CHART_AXIS_DEFAULT_FMT}${metricPrefix}`);
        }
      }

      // 에러 객체일 때
      if (typeof returnVal === 'object') {
        if (typeof errorCallback === 'function') {
          errorCallback(returnVal);
        }
        returnVal = window.utils.scalingNumber(metricPrefixedValue, 1, `${CONSTANTS_CHART_AXIS_DEFAULT_FMT}${metricPrefix}`);
      }
      return returnVal;
    };
  },

  // /**
  //  * 두 개의 값이 동일한지 아닌지 심층(?) 비교를 수행하여 true/false 를 반환한다.
  //  * Note: arrays, array buffers, booleans, date objects, error objects, maps,
  //  * numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
  //  *
  //  * 오브젝트는 상속받지 않은 자신만의 열거형 프라퍼티를 비교한다.
  //  * 펑션과 DOM 노드는 strict equality( 즉, ===)로 비교한다.
  //  *
  //  * @function isEqual
  //  * @param  {number} num1
  //  * @param  {number} num2
  //  * @return  {boolean}
  //  */
  // isEqual : (num1, num2) => _.isEqual(num1, num2),

};
