import _ from 'lodash';

export default {

  /**
   * 소스 객체의 속성을 대상 객체에 할당
   * @param object
   * @param sources
   * @returns {*}
   */
  assign: (object, ...sources) => {
    return _.assign(object, ...sources);
  },

  /**
   * paths에 대응하는 배열 생성
   * @param object
   * @param paths
   * @returns {Object|*}
   */
  at: (object, paths) => {
    return _.at(object, paths);
  },

  /**
   * 복제 된 값을 반환
   * @param value
   * @returns {*}
   */
  clone: (value) => {
    return _.clone(value);
  },

  /**
   * 복제 된 값을 반환 (deep copy)
   * @param value
   * @returns {*}
   */
  cloneDeep: (value) => {
    return _.cloneDeep(value);
  },

  /**
   * 객체내 속성 유무 확인
   * @param object
   * @param path
   * @returns {boolean}
   */
  has: (object, path) => {
    return _.has(object, path);
  },

  // /**
  //  * 비어있는지 여부 확인
  //  * @param value
  //  * @returns {boolean}
  //  */
  // isEmpty: (value) => {
  //   return _.isEmpty(value);
  // },

  /**
   * 두 값을 비교
   * @param value
   * @param other
   * @returns {boolean}
   */
  isEqual: (value, other) => {
    return _.isEqual(value, other);
  },

  /**
   * undefined 여부 확인
   * @param value
   * @returns {boolean}
   */
  isUndefined: (value) => {
    return _.isUndefined(value);
  },

  /**
   * 객체의 path 내 값 설정
   * @param object
   * @param path
   * @param value
   * @returns {Object}
   */
  set: (object, path, value) => {
    return _.set(object, path, value);
  },

  /**
   * 객체의 path 내 값 조회
   * @param object
   * @param path
   * @param value
   * @returns {Object}
   */
  get: (object, path, value) => {
    return _.get(object, path, value);
  },

  /**
   * 객체의 value 값의 존재 여부 확인
   * @param object
   * @param value
   * @returns {boolean}
   */
  isMatchWith: (object, value) => {
    return _.isMatchWith(object,value);
  },

}
