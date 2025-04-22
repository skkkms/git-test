import corejs from 'core-js';
import _ from 'lodash';

export default{
  /**
   * 문자열 앞/뒤에서 공백 혹은 지정한 문자열을 제거하고 반환한다.
   *
   * @function trim
   * @param  {string} str
   * @param  {string} [chars=whitespace]: 트림해야 할 문자들의 집합을 지정
   * @return  {string}
   */
  trim : (str, c) => _.trim(str),

  // TODO: 구현
  /**
   * 배열|겍체를 순환
   * @param array
   * @param iter
   * @returns {*|Array|Object}
   */
   forEach: (array, iter) => {
    if (array && array.constructor === Array) {
      const length = array.length;
      for (let i = 0; i < length; i += 1) {
        if (iter(array[i], i) === false) {
          break;
        }
      }
    } else {
      return _.forEach(array, iter);
    }
  },
  forEachRight: (array, iter) => {
    if (array && array.constructor === Array) {
      const length = array.length;
      for (let i = length - 1; i >= 0; i -= 1) {
        iter(array[i], i);
      }
    } else {
      return _.forEachRight(array, iter);
    }
  },    
  mergeArray: (array1, array2) => {
    const newArray = [];
    forEach(array1, arr => newArray.push(arr));
    forEach(array2, arr => newArray.push(arr));
    return newArray;
  },
  /**
   * 전달받은 datasetId로 된 dataset 을 찾는다.
   * 현재 컴포넌트에 없으면 부모 컴포넌트에서 datasetId로 된 dataset을 찾는다.
   *
   * @function findDataset
   * @param  {string} datasetId
   * @param  {Component} component
   */
   findDataset: (datasetId, component) => {
    let dataset = null;
    if (!datasetId) {
      return dataset;
    }
    const id = datasetId.split('.').length === 2 ? datasetId.split('.')[0] : datasetId;
    let currentComponent = component;

    while (currentComponent && !dataset && typeof dataset !== 'string') {
      console.log(currentComponent);
      dataset = currentComponent[id];
      if (dataset && typeof dataset !== 'string') {
        return dataset;
      }
      currentComponent = currentComponent.$parent;
    }
    return null;
  },
  /**
   * dataset의 선택된 row의 데이터를 JSON 타입으로 변환하여 리턴
   *
   * @function getSelectedRow
   * @param  {Object} dataset dataset
   * @returns {Object} dataField 이름을 키로 매핑한 JSON 리턴
   */
   getSelectedRow: (dataset) => {
    if (dataset && dataset.getSelectedIndexes().length > 0) {
      const selectedRow = dataset.data[dataset.getSelectedIndexes()[0]];
      const dataFields = dataset.getDatafields();
      const selectedData = {};
      _.forEach(dataFields, field => {
        selectedData[field.name] = selectedRow[field.map];
      });
      return selectedData;
    }
  },  
  numberWithCommas: (number, comma = ',') => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, comma);
  },  
  numberFormat: function(amount, decimalCount = -1) {
    const digitGroupType = "#,###.##";
    let decimal = '.';
    let thousands = ",";
    if(digitGroupType) {
      thousands = digitGroupType.substring(1,1);
      decimal = digitGroupType.substring(5,1);
    }
    try {
      //decimalCount = Math.abs(decimalCount);
      //decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      let decimalArea = "";
      if(decimalCount < 0) {
    	  if(amount.toString().indexOf(".") > -1)
    		  decimalArea = decimal + amount.toString().substring(amount.toString().indexOf(".")+1);
      }
      else if(decimalCount > 0) {
    	  decimalArea = decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2);
      }
      return negativeSign + (j ? i.substring(0, j) + thousands : '') + i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + decimalArea;
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 메인 문자열 내 {index} 에 해당하는 파라미터 문자열로 대치하여 리턴
   * @param str : 메인 문자열
   * @param ...str : 메인 문자열에 삽입할 문자들
   * @returns {*} : 조합된 문자열
   */
   strFormat : function(str) {
    let theString = str;
    let args = arguments.length;
    for (let i = 0; i < args; i++) {
      let regExp = new RegExp('\\{' + i + '\\}', 'gm');
      if(arguments[i+1] !== undefined)
        theString = theString.replace(regExp, arguments[i+1]);
    }
    return theString;
  },
  /**
   * 값이 Number 원시형 혹은 오브젝트인지 구분하여 true/false 를 반환한다.
   * 문자열은 무조건 false 를 반환하므로 숫자형으로 넘겨야 함.
   *
   * @function isNumber
   * @param  {number} num
   * @return  {boolean}
   */
   isNumber : (num) => _.isNumber(num) && _.isFinite(num),  
  /**
   * array에서 조건에 맞는 결과 리턴
   * @param array
   * @param cond
   */
   find: (array, cond, fromIndex=0) => {
    return _.find(array, cond, fromIndex);
  },   
  /**
   * 비어있는지 여부 확인
   * @param value
   * @returns {boolean}
   */
   isEmpty: (value) => {
	if (isNumber(value)) {
		value = String(value);
	}
    return _.isEmpty(value);
  },  
  getCurrencyInfoFromText: (inputValue, digitGroupType, decimalLength = 3) => {
    let decimal = '.';
    let comma = ',';
    digitGroupType = "#,###.##";

    comma = digitGroupType.substr(1, 1);
    decimal = digitGroupType.substr(5, 1);
    
    // if (digitGroupType) {
    //   comma = digitGroupType.substr(1, 1);
    //   decimal = digitGroupType.substr(5, 1);
    // } else {
    //   comma = store.getters.userInfo.digitGroupType.substr(1, 1);
    //   decimal = store.getters.userInfo.digitGroupType.substr(5, 1);
    // }
    const hasDecimal = (inputValue.indexOf(decimal) >= 0);

    let sign = '';
    if (inputValue[0] === '-') { // 부호 체크
      sign = inputValue[0];
    }

    const splittedValue = inputValue.split(decimal);
    const decimalValue = splittedValue[0];
    let decimalNumber = onlyNums(decimalValue, true);
    let pointNumber = '';
    if (splittedValue.length > 1) {
      pointNumber = splittedValue[1].substring(0, decimalLength);
    }
    pointNumber = onlyNums(pointNumber);
    decimalNumber = sign + decimalNumber;
    decimalNumber = (decimalNumber.length <= 2 && isNaN(parseInt(decimalNumber, 10))) ? '' : parseInt(decimalNumber, 10);

    let decimalText = '';
    if (decimalNumber !== '') {
      decimalText = numberWithCommas(Math.abs(decimalNumber), comma);
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
  getCurrencyFormattedValue: inputValue => {
    let decimal = '.';
    const digitGroupType = '#,###.##';
    //if (store.getters.userInfo && store.getters.userInfo.digitGroupType) {
      decimal = digitGroupType.substring(5, 1);
    //}
    return inputValue.replace(/\./g, `${decimal}`);
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
  getByte: (str) => {
    return str
      .split('')
      .map(s => s.charCodeAt(0))
      .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
  },      
}