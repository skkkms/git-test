import _ from 'lodash';

export default {
  /**
   * Array를 size 만큼 자르기
   */
  chunk: (array, size, guard) => {
    return _.chunk(array, size, guard);
  },

  /**
   * Array 병합
   * @param array
   * @param values
   */
  concat: (array, values) => {
    return _.concat(array, values);
  },

  /**
   * array 기준 일치하는 부분이 없는 array 반환
   * @param array
   * @param value
   */
  difference: (array, values) => {
    return _.difference(array, values);
  },

  /**
   * 두 배열을 비교하여 차집합을 반환
   * @param array
   * @param values
   * @param iteratee
   * @returns {array}
   */
  differenceBy: (array, values, iteratee) => {
    return _.differenceBy(array, values, iteratee);
  },

  /**
   * 두 배열을 비교하여 차집합을 반환. 조건에 함수 사용
   * @param array
   * @param values
   * @param comparator
   * @returns {array}
   */
  differenceWith: (array, values, comparator) => {
    return _.differenceWith(array, values, comparator);
  },

  /**
   * number 위치에서 array 자르기
   * @param array
   * @param number
   */
  drop: (array, n, guard) => {
    return _.drop(array, n, guard);
  },

  /**
   * array 기준 일치하는 부분이 없는 array 반환
   * @param array
   * @param value
   * @param start
   * @param end
   */
  fill: (array, value, start, end) => {
    return _.fill(array, value, start, end);
  },

  // /**
  //  *
  //  * @param collection
  //  * @param predicate
  //  * @returns {Array}
  //  */
  // filter: (collection, predicate) => {
  //   return _.filter(collection, predicate);
  // },

  /**
   * array에서 조건에 맞는 결과 리턴
   * @param array
   * @param cond
   */
  find: (array, cond, fromIndex=0) => {
    return _.find(array, cond, fromIndex);
  },

  /**
   * array 에서 일치하는 첫번째 항목의 index를 리턴
   * @param array
   * @param identity
   */
  findIndex: (array, identity, fromIndex=0) => {
    return _.findIndex(array, identity, fromIndex);
  },

  /**
   * array 에서 일치하는 마지막 항목의 index를 리턴
   * @param array
   * @param identity
   */
  findLastIndex: (array, identity) => {
    return _.findLastIndex(array, identity);
  },

  // /**
  //  * 배열을 순환
  //  * @param array
  //  * @param iter
  //  * @returns {*|Array|Object}
  //  */
  // forEach: (array, iter) => {
  //   return _.forEach(array, iter);
  // },

  /**
   * 배열을 조건으로 그룹화하여 반환
   * @param array
   * @param identity
   * @returns {*}
   */
  groupBy: (array, identity) => {
    return _.groupBy(array, identity);
  },

  /**
   * 첫번째 값을 리턴
   * @param array
   */
  head: (array) => {
    return _.head(array);
  },

  /**
   * 각 array 항목에 seperator 로 병합
   * @param array
   * @param seperator
   */
  join: (array, seperator) => {
    return _.join(array, seperator);
  },

  /**
   * 마지막 값을 리턴
   * @param array
   */
  last: (array) => {
    return _.last(array);
  },

  /**
   * 배열 안에 객체들의 요소 중, 특정 요소만 빼서 배열로 반환
   * @param collection
   * @param iteratee
   * @returns {Array}
   */
  map: (collection, iteratee) => {
    return _.map(collection, iteratee);
  },

  /**
   * number 번째 array 항목을 리턴
   * @param array
   * @param number
   */
  nth: (array, number) => {
    return _.nth(array, number);
  },

  /**
   * collection 을 정렬하여 리턴
   * @param collection
   * @param iteratees
   * @param orders
   * @param guard
   * @returns {*|Array}
   */
  orderBy: (collection, iteratees, orders, guard) => {
    return _.orderBy(collection, iteratees, orders, guard);
  },

  /**
   * 배열에서 해당 요소를 삭제 후 배열을 반환
   * @param array
   * @param values
   * @returns {*}
   */
  pullAll: (array, values) => {
    return _.pullAll(array, values);
  },

  /**
   * 배열에서 해당 요소를 삭제 후 배열을 반환
   * @param array
   * @param indexes
   * @returns {*}
   */
  pullAt: (array, indexes) => {
    return _.pullAt(array, indexes);
  },
  /**
   * 배열에서 value 값을 comparator에 따라 비교 후 삭제, 배열을 반환
   * @param array
   * @param
   * @returns {*}
   */
  pullAllWith: (array, value, comparator) => {
    return _.pullAllWith(array, value, comparator);
  },
  /**
   * 누적된 값을 반환
   * @param array
   * @param iter
   * @param acucumulator
   * @returns {*}
   */
  reduce: (array, iter, accumulator) => {
    return _.reduce(array, iter, accumulator);
  },

  /**
   * 배열에서 해당 항목을 제거 후 배열 반환
   * @param array
   * @param predicate
   * @returns {Array}
   */
  remove: (array, predicate) => {
    return _.remove(array, predicate);
  },

  /**
   * 배열의 크기 반환
   * @param collection
   * @returns {number}
   */
  size: (collection) => {
    return _.size(collection);
  },

  /**
   * arrays의 합집합
   * @param arrays
   */
  union: (...Arrays) => {
    return _.union(...Arrays);
  },

  /**
   * ◾중복된 값 제거
   * @param arrays
   */
  uniq: (arrays) => {
    return _.uniq(arrays);
  },

  /**
   * array에서 value 제거
   * @param array
   * @param value
   */
  without: (array, values) => {
    return _.without(array, values);
  },

  /**
   * array에서 value의 index를 반환
   * @param array
   * @param value
   */
  indexOf: (array, value) => {
    return _.indexOf(array, value);
  },

  /**
   * array 값의 순서를 역으로 하여 반환
   */
  reverse: (array) => {
    return _.reverse(array);
  },

  mergeArray: (array1, array2) => {
    const newArray = [];
    utils.forEach(array1, arr => newArray.push(arr));
    utils.forEach(array2, arr => newArray.push(arr));
    return newArray;
  }
};
