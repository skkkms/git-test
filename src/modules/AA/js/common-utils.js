
class CommonUtils {
  static notify(parameters) {
    // TODO: For test.
    console.log(parameters)
  }

  static mapCode(list, columns) {
    const tmpList = []
    _.forEach(list, row => {
      const tmpRow = row
      _.forEach(columns, column => {
        if (column.type === 'code' && column.domain) {
          const code = column.domain.find(o => o.value === tmpRow[column.value])
          if (!_.isEmpty(code)) {
            tmpRow[column.value] = code.text
          }
        }
        if (column.type && column.type === 'datetime' && column.customValue) {
          tmpRow[column.value] = column.customValue(tmpRow[column.value], tmpRow)
        } else if (column.type && column.type === 'custom' && column.customValue) {
          tmpRow[column.value] = column.customValue(tmpRow[column.value], tmpRow)
        }
      })
      tmpList.push(tmpRow)
    })
    return tmpList
  }

  // 코드 리스트에서 key에 해당하는 text 값을 가져올때 사용
  static getCodeText(codes, key) {
    let codeText = ''
    _.forEach(codes, row => {
      if (row.value === key) {
        codeText = row.text
      }
    })
    return codeText
  }

  /**
     * 문자열에 숫자/점(.) 체크하여 true/false 반환
     * @function isNumDot
     * @param {String} str : 대상 문자열
     * @returns {Boolean}
     */
  static isNumDot(str) {
    const regType = /^[0-9|.]*$/
    return _.isEmpty(str) || regType.test(str)
  }

  /**
     * 문자열에 숫자 체크하여 true/false 반환
     * @function isStrNumber
     * @param {String} str : 대상 문자열
     * @returns {Boolean}
     */
  static isStrNumber(str) {
    const regType = /^[0-9]*$/
    return _.isEmpty(str) || regType.test(str)
  }

  /**
   * Get minDate compare with today
   * @param {String} dateString
   * @param {String} dateFormat
   * @description today와 비교하여 더 과거의 날짜를 return한다. (picker min-date용)
   */
  static getMinDateWithToday(dateString = null, dateFormat = 'YYYYMMDD') {
    const today = moment().startOf('day')
    const dateMoment = dateString ? moment(dateString, dateFormat).startOf('day') : today
    const minMoment = Math.min(today, dateMoment)
    return moment(minMoment).format('YYYY-MM-DD')
  }

  /**
   * 엑셀 양식 다운로드
   * @function downloadExcelForm
   * @param {String} pageId
   * @param {Object} columns
   * @param {String} excelFileName
   * @param {Boolean} isConf
   * @description 엑셀 양식을 다운로드한다. (양식 전용 함수)
   */
  static downloadExcelForm(pageId, columns, excelFileName, isConf = true) {
    http.request(pageId, 'DTS_AAX_00014', {
      data: {
        fileName: excelFileName,
        isConfidential: isConf,
        columnList: columns,
      },
      responseType: 'arraybuffer',
    }).then(res => {
      const blob = new Blob([res.data], { type: res.headers['content-type'] })
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, excelFileName)
      } else {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        if (excelFileName) link.download = excelFileName
        link.click()
      }
    })
  }

  /**
   * @function isAllTrue
   * @param {Array} items
   * @description 모든 파라미터가 true인지 확인한다.
   */
  static isAllTrue(...items) {
    if (utils.isEmpty(items)) return false
    return !(items.filter(item => !item).length > 0)
  }

  /**
   * @function isAnyTrue
   * @param {Array} items
   * @description 파라미터 중 하나라도 true가 있는지 확인한다.
   */
  static isAnyTrue(...items) {
    if (utils.isEmpty(items)) return false
    return items.filter(item => item).length > 0
  }
}

export default CommonUtils
