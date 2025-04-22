class SuiSelectUtil {
  static mergeDefaultOption(optionList, defaultOption) {
    const defaultOptions = CommonConstants.defaultOptions;
    let newOptions = [];
    if (optionList && optionList.constructor.name === 'Array') {
      newOptions = optionList;
    }
    if(defaultOptions[defaultOption]) {
      return [...defaultOptions[defaultOption], ...newOptions];
    }
    return [...newOptions];
  }

  static mergeOptionList(optionList, customOptions) {
    let newOptions = [];
    if (optionList && optionList.constructor.name === 'Array') {
      newOptions = optionList;
    }
    if (customOptions && customOptions.constructor.name === 'Array') {
      return [...customOptions, ...newOptions];
    }
    return [...newOptions];
  }
};

export default SuiSelectUtil;
