import _ from 'lodash'

class Rules {
  // constructor() {}

  setI18n = i18n => {
    this.i18n = i18n
  }

  getRules = (...args) => {
    const rules = []
    while (args.length) {
      const rule = args.shift()
      rules.push(this.getRuleFunction(rule))
    }
    return rules
  }

  // eslint-disable-next-line consistent-return
  getRuleFunction = rule => {
    const ruleSplit = rule.replace(/ /g, '').split('(')
    const ruleName = ruleSplit[0]
    const args = ruleSplit.length > 1 ? ruleSplit[1].replace(')', '').split(',') : null

    switch (ruleName) {
    // 1. Null 체크
    case 'not_null': return v => !!v || utils.getMessageById('MSG_ALT_RULES_NOT_NULL')
    // 2. Empty 체크
    case 'not_empty': return v => !_.isEmpty(v) || utils.getMessageById('MSG_ALT_RULES_NOT_EMPTY')
    // 3. 최소값(정수) 체크
    case 'min_int': return v => {
      const min = parseInt(args[0], 10)
      return _.isEmpty(v) || min <= v || utils.strFormat(utils.getMessageById('MSG_ALT_RULES_MIN_INT'), [min])
    }
    // 4. 최대값(정수) 체크
    case 'max_int': return v => {
      const max = parseInt(args[0], 10)
      return _.isEmpty(v) || v <= max || utils.strFormat(utils.getMessageById('MSG_ALT_RULES_MAX_INT'), [max])
    }
    // 5. 사이값(정수) 체크
    case 'bet_int': return v => {
      const min = parseInt(args[0], 10)
      const max = parseInt(args[1], 10)
      return _.isEmpty(v) || (min <= v && v <= max) || utils.strFormat(utils.getMessageById('MSG_ALT_RULES_BET_INT'), [min, max])
    }
    // 6. 최소길이(정수) 체크
    case 'min_len': return v => {
      const minLen = parseInt(args[0], 10)
      const vLen = v ? String(v).length : 0
      return _.isEmpty(v) || minLen <= vLen || utils.strFormat(utils.getMessageById('MSG_ALT_RULES_MIN_LEN'), minLen)
    }
    // 7. 최대길이(정수) 체크
    case 'max_len': return v => {
      const maxLen = parseInt(args[0], 10)
      const vLen = v ? String(v).length : 0
      return _.isEmpty(v) || vLen <= maxLen || utils.strFormat(utils.getMessageById('MSG_ALT_RULES_MAX_LEN'), maxLen)
    }
    // 8. 사이길이(정수) 체크
    case 'bet_len': return v => {
      const minLen = parseInt(args[0], 10)
      const maxLen = parseInt(args[1], 10)
      const vLen = v ? String(v).length : 0
      return _.isEmpty(v) || (minLen <= vLen && vLen <= maxLen) || utils.strFormat(utils.getMessageById('MSG_ALT_RULES_BET_LEN'), [minLen, maxLen])
    }
    // 9. 영문자 포함 체크
    case 'cntn_alphabetic': return v => {
      const regexp = new RegExp('^(?=.*[a-zA-Z])')
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_CNTN_ALPHABETIC')
    }
    // 10. 숫자 포함 체크
    case 'cntn_numeric': return v => {
      const regexp = new RegExp('^(?=.*[0-9])')
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_CNTN_NUMERIC')
    }
    // 11. 영숫자 포함 체크
    case 'cntn_alphanumeric': return v => {
      const regexp = new RegExp('^(?=.*[a-z])')
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_CNTN_ALPHANUMERIC')
    }
    // 12. 이메일 형식 체크
    case 'tmpl_email': return v => {
      const regexp = /^[a-zA-Z0-9.!#$%&'*/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_TMPL_EMAIL')
    }
    // 13. IPv4 형식 체크
    case 'tmpl_ipv4': return v => {
      const regexp = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d|\*)(\.|$)){4}$/
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_TMPL_IPV4')
    }
    // 14. 영문자만 입력되었는지 체크
    case 'only_alphabetic': return v => {
      const regexp = /^[a-zA-Z]*$/
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_ONLY_ALPHABETIC')
    }
    // 15. 숫자만 입력되었는지 체크
    case 'only_numeric': return v => {
      const regexp = /^[0-9]*$/
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_ONLY_NUMERIC')
    }
    // 16. 숫자와 dot(.) 입력되었는지 체크
    case 'only_numeric_dot': return v => {
      const regexp = /^[0-9|.]*$/
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_ONLY_NUMERIC_DOT')
    }
    // 17. 영숫자만 입력되었는지 체크
    case 'only_alphanumeric': return v => {
      const regexp = /^[a-zA-Z0-9]*$/
      return _.isEmpty(v) || regexp.test(v) || utils.getMessageById('MSG_ALT_RULES_ONLY_ALPHANUMERIC')
    }
    // 18. 정규식 체크
    case 'regexp': return v => {
      const regexp = new RegExp(String(args[0]))
      return _.isEmpty(v) || regexp.test(v) || utils.strFormat(utils.getMessageById('MSG_ALT_RULES_REGEXP'), regexp)
    }
    // default 체크
    default: return () => utils.strFormat(utils.getMessageById('MSG_ALT_RULES_DEFAULT'), ruleName)
    }
  }

  validate = (rootNode = null) => {
    if (_.isEmpty(rootNode)) {
      utils.messageBox('error', utils.getMessageById('MSG_ALT_RULES_ROOTNODE_IS_NULL'))
      return false
    }

    // local 에서만 검사 : build 후에는 체크 불가
    if (process.env.VUE_APP_WAS_ENV === 'local') {
      if (rootNode instanceof Array) {
        // [VueComponent, VueComponent]와 같이 rootNode를 Array로 받은 경우
        for (let i = 0; i < rootNode.length; i += 1) {
          if (rootNode[i].constructor.name !== 'VueComponent') {
            utils.messageBox('error', utils.getMessageById('MSG_ALT_RULES_ROOTNODE_IS_NULL'))
            return false
          }
        }
      } else if (rootNode.constructor.name !== 'VueComponent') {
        utils.messageBox('error', utils.getMessageById('MSG_ALT_RULES_ROOTNODE_IS_NULL'))
        return false
      }
    }

    let result = true
    const validationTargets = this.findValidationTargets(rootNode)
    validationTargets.forEach(item => {
      if (!item.isValid()) {
        result = false
      }
    })
    return result
  }

  findValidationTargets = rootNode => {
    const validationTarget = []
    let searchTarget = [].concat(rootNode)
    while (searchTarget.length !== 0) {
      const node = searchTarget.shift()
      if (!_.isEmpty(node.$children)) {
        searchTarget = searchTarget.concat(node.$children)
      }
      if (this.isValidationTarget(node)) {
        validationTarget.push(node)
      }
    }
    return validationTarget
  }

  isValidationTarget = node => {
    const components = [
      'urButton', 'urCheckbox', 'urChip', 'urDatePicker', 'urDateTimePicker',
      'urDropdown', 'urMultiSelectDropDown', 'urRadio', 'urSegmentButton', 'urStepper',
      'urSwitch', 'urTextArea', 'urTextField', 'urTimePicker',
    ]
    return node.$options
      && (components.indexOf(node.$options.name) > -1)
      && !_.isEmpty(node.rules)
  }
}

const rules = new Rules()
window.rules = rules
export default rules
