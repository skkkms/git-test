
class CommonConstants {
  static selectOptions() {
    return {
      allOption: [{ key: 'ALL', label: utils.getMessageById('MSG_TXT_ALL') || 'ALL' }],
      selOption: [{ key: ' ', label: utils.getMessageById('MSG_TXT_SEL') || 'SELECT' }],
    };
  }
  static get defaultOptions() {
    return {
      all: [{ key: 'ALL', label: utils.getMessageById('MSG_TXT_ALL') || 'ALL' }],
      select: [{ key: ' ', label: utils.getMessageById('MSG_TXT_SEL') || 'SELECT' }],
    };
  }
};

export default CommonConstants;
