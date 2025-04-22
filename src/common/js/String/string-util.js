//import _ from 'lodash';
import { _ } from 'core-js';
import store from '~system/vuex';

export default{

  /**
   * camel case 문자열로 변환해서 반환한다.
   *
   * @function camelCase
   * @param  {string} str
   * @return  {string}
   */
  camelCase : (str) => _.camelCase(str),

  /**
   * 문자열의 첫번째 문자를 대문자로 변경해서 반환한다.
   *
   * @function capitalize
   * @param  {string} str
   * @return  {string}
   */
  capitalize : (str) => _.capitalize(str),

  /**
   * 문자열에 포함된 "&", "<", ">", '"', 와 "'" 를 HTML 엔터티로 변환해서 반환한다.
   *
   * @function escape
   * @param  {string} str
   * @return  {string}
   */
  escape : (str) => _.escape(str),

  /**
   * 문자열을 kebalCase로 변환해서 반환
   *
   * @function kebabCase
   * @param  {string} str
   * @return  {string}
   */
  kebabCase : (str) => _.kebabCase(str),

  /**
   * 단어사이를 스페이스로 구분하고 소문자로 변환해서 반환한다.
   *
   * @function lowerCase
   * @param  {string} str
   * @return  {string}
   */
  lowerCase : (str) => _.lowerCase(str),

  /**
   * 문자열의 첫번재 문자만 소문자로 변환해서 반환한다.
   *
   * @function lowerFirst
   * @param  {string} str
   * @return  {string}
   */
  lowerFirst : (str) => _.lowerFirst(str),

  /**
  * 문자열을 n 번 반복한 값을 반환한다.
  *
  * @function repeat
  * @param  {string} str
  * @param  {integer} n
  * @return  {string}
  */
  repeat : (str, n) => _.repeat(str, n),

  /**
   * 문자열에서 패턴에 일치하는 부분을 교체할 문자열과 바꾼값을 반환한다.
   *
   * @function replace
   * @param  {string} str
   * @param  {RegExp|string} pattern
   * @param  {Function|string} replacement
   * @return  {string}
   */
  replace : (str, pattern, replacement) => _.replace(str, pattern, replacement),

  /**
   * 문자열을 구분자 기준으로 분리하여 배열을 빈환한다.
   *
   * @function split
   * @param  {string} str
   * @param  {RegExp|string} separator : 분리해야 할 기준 문자열 혹은 패턴
   * @param  {number} [limit]: 반환되는 배열의 length 제한
   * @return  {string}
   */
  split : (str, separator, limit) => _.split(str, separator, limit),

  /**
   * 문자열이 타겟 문자열과 일치하는 문자로 시작하는지 여부를 true/false로 반환
   *
   * @function startWith
   * @param  {string} str
   * @param  {string} target : 찾아야 할 문자열
   * @param  {number} [position=0]: 탐색을 시작할 문자열 위치
   * @return  {boolean}
   */
  startsWith : (str, target, position) => _.startsWith(str, target, position),

  /**
   * "보간" 구분자 사이에 포함된 데이터 프라퍼티를 보간(정해진 규칙대로 치환)할 수 있는 컴파일된 템플릿 펑션을 생성한다.
   * "escape" 구분자 사이에는 HTML -escape 할 데이터 프라퍼티를 보간.
   * "evaluate" 구분자 사이에는 자바스크립트를 실행할 데이터 프라퍼티를 보간.
   * 데이터 프라퍼티는 템플릿 내에서는 자유 변수(free variable)로 취급되어 접근이 가능하다.
   * 만약 설정 오브젝트가 주어진다면, 그것은 templateSettings 값보다 우선한다.
   *
   * @function template
   * @param  {string} str
   * @param  {Object} str
   * @param  {RegExp} str
   * @param  {RegExp} str
   * @param  {Object} str
   * @param  {RegExp} str
   * @param  {string} str
   * @param  {string} str
   * @return  {string}
   */
  template : (str) => "사용여부를 검토중입니다.",

  /**
   * 문자열을 소문자로 변환해서 반환한다.
   *
   * @function toLower
   * @param  {string} str
   * @return  {string}
   */
  toLower : (str) => _.toLower(str),

  /**
   * 문자열을 대문자로 변환해서 반환한다.
   *
   * @function toUpper
   * @param  {string} str
   * @return  {string}
   */
  toUpper : (str) => _.toUpper(str),

  /**
   * 문자열 앞/뒤에서 공백 혹은 지정한 문자열을 제거하고 반환한다.
   *
   * @function trim
   * @param  {string} str
   * @param  {string} [chars=whitespace]: 트림해야 할 문자들의 집합을 지정
   * @return  {string}
   */
  trim : (str, c) => _.trim(str, c),

  /**
   * 문자열 뒤에서 공백 혹은 지정한 문자열을 제거하고 반환한다.
   *
   * @function trimEnd
   * @param  {string} str
   * @param  {string} c
   * @return  {string}
   */
  trimEnd : (str) => _.trimEnd(str),

  /**
   * 문자열 앞에서 공백 혹은 지정한 문자열을 제거하고 반환한다.
   *
   * @function trimStart
   * @param  {string} str
   * @param  {string} c
   * @return  {string}
   */
  trimStart : (str) => _.trimStart(str),

  /**
   * 지정한 길이보다 긴 문자열의 뒷부분을 잘라내고 반환한다.
   * 잘려진 문자열의 마지막 문자들은 생략 문자로 치환된다( default "...")
   *
   * @function truncate
   * @param  {string} str: 문자열
   * @param  {Object} [options={}]: 옵션 오브젝트
   * @param  {number} [options.length=30] : 최고 문자열 길이
   * @param  {string} [options.omission='...'] : 생략되었음을 의미하는 문자( default "...")
   * @param  {RegExp|string} [options.separator] : 잘라야 할 문자열 패턴
   * @return  {string}
   */
  //truncate : (str, obj) => _.truncate(str, obj),
  truncate : (str, num) =>  _.truncate(str, { length: num ? num : 30}),

  /**
   * escape 메소드와 반대의 기능을 가진 메소드로서 HTML 엔티티( &amp;, &lt;, &gt;, &quot;, and &#39;)들을
   * 그에 대응하는 문자열로 변환해서 반환한다.
   *
   * @function unescape
   * @param  {string} str
   * @return  {string}
   */
  unescape : (str) => _.unescape(str),

  /**
   * 문자열의 첫번째 문자를 대분자로 변환해서 반환한다.
   *
   * @function upperFirst
   * @param  {string} str
   * @return  {string}
   */
  upperFirst : (str) => _.upperFirst(str),

  /**
   * 묹자열을 지정한 기수의 정수로 변환하여 반환한다.
   * 만약 기수가 undefined 이거나 0이면, 값이 16진수일 경우에는 16진법으로 그 이외에는
   * 10진법으로 계산하여 반환한다.
   *
   * @function parseInt
   * @param  {string} str
   * @param  {number} [radix=10]
   * @return  {string}
   */
  parseInt : (str, radix) => _.parseInt(str, radix),

  /**
   * 값이 Number 원시형 혹은 오브젝트인지 구분하여 true/false 를 반환한다.
   * 문자열은 무조건 false 를 반환하므로 숫자형으로 넘겨야 함.
   *
   * @function isNumber
   * @param  {number} num
   * @return  {boolean}
   */
  isNumber : (num) => _.isNumber(num) && _.isFinite(num),

  forIn : _.forIn,

  forInRight: _.forInRight,

  forOwn: _.forOwn,

  forOwnRight: _.forOwnRight,

  // /**
  //  * 값이 비어있는지 확인하여 true/false 를 반환한다.
  //  * 오브젝트는 자신만의 열거형 문자열 키 프라퍼티가 없다면 비어있다고 판단한다.
  //  * arguments object, arrays, buffers, strings 등의 유사배열(?) 오브젝트와
  //  * jQuery 같은 콜렉션들은 length가 0이면 비어있다고 간주한다.
  //  * 비슷하게 map 과 set 은 size가 0이면 비어있다고 간주한다.
  //  *
  //  * @function isEmpty
  //  * @param  {string|object} str
  //  * @return  {boolean}
  //  */
  // isEmpty : (str) => _.isEmpty(str),

  // /**
  //  * 두 개의 값이 동일한지 아닌지 심층(?) 비교를 수행하여 true/false 를 반환한다.
  //  * Note: arrays, array buffers, booleans, date objects, error objects, maps,
  //  * numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
  //  *
  //  * 오브젝트는 상속받지 않은 자신만의 열거형 프라퍼티를 비교한다.
  //  * 펑션과 DOM 노드는 strict equality( 즉, ===)로 비교한다.
  //  *
  //  * @function isEqual
  //  * @param  {string} str1
  //  * @param  {string} str2
  //  * @return  {boolean}
  //  */
  // isEqual : (str1, str2) => _.isEqual(str1, str2),

  // /**
  //  * 유사(?)배열 값들에 대한 length 를 반환함으로써 콜렉션의 size를 가져온다.
  //  * 오브젝트에 대해서는 자신만의 열거형 문자열 키 프라퍼티의 갯수를 반환한다.
  //  *
  //  * @function size
  //  * @param  {string} str
  //  * @return  {boolean}
  //  */
  // size : (str) => _.size(str),

  /**
   * 유사(?)배열 값들에 대한 length 를 반환함으로써 콜렉션의 size를 가져온다.
   * 오브젝트에 대해서는 자신만의 열거형 문자열 키 프라퍼티의 갯수를 반환한다.
   *
   * @function toComma
   * @param  {string} str
   * @return  {string}
   */
  toComma : (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  },

  numberFormat: function(amount, decimalCount = -1) {
    const digitGroupType = store.getters.userInfo.digitGroupType;
    let decimal = '.';
    let thousands = ",";
    if(digitGroupType) {
      thousands = digitGroupType.substr(1,1);
      decimal = digitGroupType.substr(5,1);
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
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + decimalArea;
    } catch (e) {
      console.log(e)
    }
  },

  // /**
  //  * 인자가 있는 메시지 리소스를 조합하여 조합된 문자열을 반환
  //  * 등록된 메인 메시지 문자열 속에 변수를 받을 식별자 {n}가 1개 이상 존재할 때 사용
  //  * n 값은 0부터 1씩 순차적으로 증가
  //  *
  //  * @function getMessage
  //  * @param  {string} str  : 식별자를 포함하고 있는 메인 메시지 문자열키
  //  * @param  {array} str  : 조합에 포함될 하위 문자열키 배열 n개 만큼 존재해야 함
  //  * @return  {string}  : 조합된 문자열
  //  */
  // getMessage : ( msgMain, arrSubMsg) => {
  //
  //   let str = msgMain;
  //   let it = arrSubMsg.keys();
  //
  //   for (let key of it) {
  //     str = str.replace("{" + key + "}", arrSubMsg[key]);
  //   }
  //   return str;
  // },

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
   * 넘어온 문자열이 url 형식인지 체크하여 true/false 반환\n
   * Note: 현재는 일반 url 형식에서 대문자만 허용하지 않은 표현식으로 구성되어 있음
   * @function isUrlFormat
   * @param {String} sUrl : url 체크대상 문자열
   * @returns {Boolean}
   */
  isUrlFormat : (sUrl) => {
    const regTypeUrl = /^[a-z|0-9|/|\-|{}]+$/;
    return regTypeUrl.test( sUrl);
  },

  /**
   * 넘어온 문자열에 특수문자가 존재하는지 체크하여 true/false 반환\n
   * @function isExistSpecialChar
   * @param {String} str : 특수문자 존재유무 테스트 대상 문자열
   * @returns {Boolean}
   */
  isExistSpecialChar : (str) => {
    //const regType = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Z|a-z|0-9|_|\s]*$/;
    const regType = /[~!@#$%^&*()-+=|\\'",.]/;
    return regType.test( str);
  },

  /**
   * 넘어온 문자열에 특수문자가 존재하는지 체크하여 true/false 반환\n
   * @function isExistSpecialCharExceptSearchForEmail
   * @param {String} str : 특수문자 존재유무 테스트 대상 문자열
   * @returns {Boolean}
   */
   isExistSpecialCharExceptSearchForEmail : (str) => {
    const regType = /[~!#$%^&*()-+=|\\'",]/;
    return regType.test( str);
  },

  /**
   * 문자열에 영문,숫자 이외의 문자가 존재하는지 체크하여 true/false 반환
   * @function isEngNum
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isEngNum : (str) => {
    const regType = /^[A-Z|a-z|0-9]+$/;
    return regType.test( str);
  },

  /**
   * 문자열에 영문,한글,숫자,대쉬(-)가 존재하는지 체크하여 true/false 반환
   * @function isEngKorNumDash
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isEngKorNumDash : (str) => {
    const regType = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Z|a-z|0-9|-]+$/;
    return regType.test( str);
  },

  /**
   * 문자열에 영문,한글,숫자,언더바(_)가 존재하는지 체크하여 true/false 반환
   * @function isEngKorNum_
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isEngKorNum_ : (str) => {
    const regType = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Z|a-z|0-9|_]+$/;
    return regType.test( str);
  },

  /**
   * 문자열에 영문,한글,숫자,대쉬,언더바(_)가 존재하는지 체크하여 true/false 반환
   * @function isEngKorNumDash_
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isEngKorNumDash_ : (str) => {
    const regType = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Z|a-z|0-9|_|-]+$/;
    return regType.test( str);
  },

  /**
   * 문자열이 일반적인 전자메일 형식인지 체크하여 true/false 반환
   * @function isEmailFormat
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isEmailFormat : (str) => {
    const regType = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regType.test( str);
  },

  /**
   * 문자열이 일반적인 전화번호 형식인지 체크하여 true/false 반환
   * 지역번호,국가번호,유선,무선 check 가능? 일단 만들어 두고 나중에 보완
   * @function isPhoneNumber
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isPhoneNumber : (str) => {
    const regType = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return regType.test( str);
  },

  /**
   * 문자열이 숫자로만 구성되었는지 체크하여 true/false 반환
   * @function isOnlyDigit
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isOnlyDigit : (str) => {
    const regType = /^\d+$/;
    return regType.test( str);
  },

  /**
   * 문자열이 영문자로만 구성되었는지 체크하여 true/false 반환
   * @function isOnlyEng
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isOnlyEng : (str) => {
    const regType = /^[A-Z|a-z]+$/;
    return regType.test( str);
  },

  /**
   * 문자열에 영문,숫자,언더바(_)가 존재하는지 체크하여 true/false 반환
   * @function isEngNum_
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isEngNum_ : (str) => {
    const regType = /^[A-Z|a-z|0-9|_]+$/;
    return regType.test( str);
  },

  /**
   * 문자열에 영문,숫자,대쉬(-)가 존재하는지 체크하여 true/false 반환
   * @function isEngNumDash
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isEngNumDash : (str) => {
    const regType = /^[A-Z|a-z|0-9|-]*$/;
    return regType.test( str);
  },

  /**
   * 문자열에 소문자,대쉬(-)가 존재하는지 체크하여 true/false 반환
   * @function isSmallLetterDash
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isSmallLetterDash : (str) => {
    const regType = /^[a-z|-]*$/;
    return regType.test( str);
  },

   /**
   * 문자열에 한글이 존재하는지 체크하여 true/false 반환
   * @function isOnlyKor
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isOnlyKor : (str) => {
    const regType = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
    return regType.test( str);
  },

  /**
   * 문자열에 숫자/대쉬(-) 체크하여 true/false 반환
   * @function isNumDash
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isNumDash : (str) => {
    const regType = /^[0-9|-]*$/;
    return regType.test( str);
  },

  /**
   * 문자열에 영문 대문자,숫자가 존재하는지 체크하여 true/false 반환
   * @function isUpperEngNum
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
     isUpperEngNum : (str) => {
      const regType = /^[A-Z|0-9]+$/;
      return regType.test( str);
    },

  /**
   * 문자열에 영문 대문자,숫자,언더바(_)가 존재하는지 체크하여 true/false 반환
   * @function isUpperEngNum_
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isUpperEngNum_ : (str) => {
    const regType = /^[A-Z|0-9|_]+$/;
    return regType.test( str);
  },

  /**
   * 사업자 식별번호가 000-00-00000 형식인지 체크하여 true/false 반환
   * @function isKoreaCorpRegNumber
   * @param {String} str : 대상 문자열
   * @returns {Boolean}
   */
  isKoreaCorpRegNumber : (str) => {
    const regType = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
    return regType.test( str);
  },

  /**
   * 매개변수로 넘어온 문자열을 clipboard 로 복사 함.
   * @function copyToClipboard
   * @param {String} str: clipboard 에 copy 할 문자열
   * @returns {None}
   */
  copyToClipboard : (str) => {
    const _body = document.getElementsByTagName('body')[0];
    const _tempInput = document.createElement('INPUT');
    _body.appendChild(_tempInput);
    _tempInput.setAttribute('value', str);
    _tempInput.select();
    document.execCommand('copy');
    _body.removeChild(_tempInput);
  },

  /**
   * 공지팝업 보지않기 정보를 쿠키에 저장
   * @function setCookieNoNotice
   * @param {String} noticeUid
   * @param {String} noticePopupTypeCode: 팝업빈도 - 'D'(매번), 'O'(1회)
   * @returns {None}
   */
  setCookieNoNotice : (noticeUid, noticePopupTypeCode = 'D') => {
    let expireDate = null;
    let expires = '';
    if (noticePopupTypeCode === 'D'){
      const today = new Date();
      expireDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 0);
    }
    else {
      expireDate = new Date(2999, 11, 31, 23, 59, 59, 0);
    }
    expires = `expires=${expireDate.toUTCString()}`;
    document.cookie = `no_notice^${noticeUid}=${noticePopupTypeCode};${expires};path=/`;
  },

  /**
   * 쿠키에 저장된 공지팝업 정보를 반환
   * @function getCookieNoNotice
   * @param {String} noticeUid
   * @returns {String}
   */
  getCookieNoNotice : (noticeUid) => {
    const re = new RegExp(`no_notice\\^${noticeUid}=(\\w+)\\b`);
    if (re.test(document.cookie)){
      return re.exec(document.cookie)[1];
    }
    else {
      return '';
    }
  },
  deleteCookieNoNotice : (noticeUid) => {
    let expireDate = new Date(1970, 11, 31, 23, 59, 59, 0);
    let expires = `expires=${expireDate.toUTCString()}`;
    document.cookie = `no_notice^${noticeUid}=;${expires};path=/`;
  },
  arraybufferToString: (arraybuffer) => {
    let retString = '';
    // chrome only
    //if( window.TextDecoder){
      //let enc = new window.TextDecoder("utf-8");
      //retString = enc.decode(arraybuffer);
    //} else {
      // ie and chrome both
      let encodedString = String.fromCharCode.apply(null, new Uint8Array(arraybuffer));
      retString = decodeURIComponent(escape(encodedString));
    //}
    return retString;
  },
  /**
   * arraybuffer data 를 인코딩한 문자열로 변환하여 반환
   * 이미지와 같은 이진 데이터 라고 판단된 응답 내용에 에러코드가 포함되어 있을 경우를 확인하기 위한 목적
   * 따라서, 에러를 확인하기 위해 앞의 200 byte 까지만 잘라서 확인한다.
   */
  arraybufferToEncodedString: (arraybuffer) => {
    return String.fromCharCode.apply(null, new Uint8Array(arraybuffer, 0, Math.min(arraybuffer.byteLength, 200)));
  },
  /**
   * Uint8Array 를 string 으로 변환해서 반환
   */
  uintToString: (uintArray) => {
    let encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
  },

  getByte: (str) => {
    return str
      .split('')
      .map(s => s.charCodeAt(0))
      .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
  },

}
