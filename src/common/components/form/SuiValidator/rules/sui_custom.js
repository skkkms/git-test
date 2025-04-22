export default {

  getMessage: (field, params) => {
    if (params && params[1]) {
      return params[1]
    } else {
      return `The ${field} field format is invalid.`
    }
  },
  validate: function (value, params) { // value는 v-model에 바인딩 된 값. params는 rules로 넘어온 값
    if (params && params.length > 0 && params[0]) {
      // params의 0번째 인자는 에러여부(false가 에러)
      // params로 넘어온 1번째 인자인 메시지는 ko.js에서 사용
      return true
    } else {
      return false
    }
  }
}
