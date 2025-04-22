export default {

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

  /**
   * 비어있는지 여부 확인
   * @param value
   * @returns {boolean}
   */
  isEmpty: (value) => {
	if (utils.isNumber(value)) {
		value = String(value);
	}
    return _.isEmpty(value);
  },

  /**
   * 두 개의 값이 동일한지 아닌지 심층(?) 비교를 수행하여 true/false 를 반환한다.
   * Note: arrays, array buffers, booleans, date objects, error objects, maps,
   * numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
   *
   * 오브젝트는 상속받지 않은 자신만의 열거형 프라퍼티를 비교한다.
   * 펑션과 DOM 노드는 strict equality( 즉, ===)로 비교한다.
   *
   * @function isEqual
   * @param  {number} num1
   * @param  {number} num2
   * @return  {boolean}
   */
  isEqual : (value, other) => _.isEqual(value, other),

  /**
   * 배열 안에 요소들 중, 특정 값만 filtering 하여 반환
   * @param array|object
   * @param predicate
   * @returns {Array}
   */
  filter: (collection, predicate) => {
    return _.filter(collection, predicate);
  },

  /**
   * 유사(?)배열 값들에 대한 length 를 반환함으로써 콜렉션의 size를 가져온다.
   * 오브젝트에 대해서는 자신만의 열거형 문자열 키 프라퍼티의 갯수를 반환한다.
   *
   * @function size
   * @param  {string} str
   * @return  {boolean}
   */
  size : (str) => _.size(str),

  /**
   * Page에 넘어온 parameter 값을 반환한다.
   * @param that
   * @param key
   * @returns {object}
   */
  getParameter(that, key) {
	// router를 먼저확인 (화면전환이나 window popup의 경우)
	if(that.$route.query && that.$route.query[key]) {
	  return that.$route.query[key];
    }

	// 화면전환시 query string 안보이게 수정
    if(that.$route.params && that.$route.params[key]) {
      return that.$route.params[key];
    }

    // link 타입인 경우, _params prop으로 전달됨
    if (that._params && that._params[key]) {
      return that._params[key];
    }

	// props 확인 (layer popup으로 띄우는 경우)
	if(that.$props && that.$props.pageInitialData && that.$props.pageInitialData[key]) {
	  return that.$props.pageInitialData[key];
    }

	return '';
  },

  /**
   * 32자리 UUID 생성
   *
   * @returns {string} prefix + random UUID ex)PREFIX-20893943-0F26-4B27-A484-E3E6C3C6837D
   */
  guid(prefix) {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    let uuid = prefix + '-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    return uuid.toUpperCase();
  },

  /**
   * null 여부 확인
   * @param value
   * @returns {boolean}
   */
  isNull: (value) => {
    return _.isNull(value);
  },

  getFilteredDataFromDataset(data, dataset, clear = false) {        
    const keys = [];
    dataset.datafields.forEach(field => {
      keys.push(field.map);
    });
    const newData = [];
    utils.forEach(data, row => {
      const newRow = {};
      utils.forEach(keys, key => {
        newRow[key] = row[key];
      });
      newData.push(newRow);
    });
    if (clear) {
      data.splice(0, data.length);
    }
    return newData;
  },
};
