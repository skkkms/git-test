import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Constants from '../Constants';

class I18N {
    constructor () {
        Vue.use(VueI18n)
        this.i18n = null;
    }
    getInstance () {
        if (!this.i18n) {
            this.i18n = new VueI18n({});
        }
        return this.i18n
    }
    init (locale) {
        this.getInstance().locale = locale;
        const MESSAGES = {
          en: {
            MSG_0000: 'Common',
            MSG_0001: 'FLMS',
            MSG_0002: 'BQMS',
            MSG_0003: 'Health',
            MSG_0004: 'ChemicalSubtance',
            MSG_0005: 'Safety',
            MSG_0006: 'DisasterPrevention',
            MSG_0007: 'Infra',
            MSG_0008: 'ProductEnvironment',
            MSG_0009: 'Common',
            MSG_0010: 'FRMS'
          },
          ko: {
            MSG_0000: '공통',
            MSG_0001: 'FLMS',
            MSG_0002: 'BQMS',
            MSG_0003: '보건',
            MSG_0004: '화학물질',
            MSG_0005: '안전',
            MSG_0006: '방재',
            MSG_0007: '인프라',
            MSG_0008: '제품환경',
            MSG_0009: '공통',
            MSG_0010: 'FRMS'
          }
        };
        _.forEach(MESSAGES, (value, key) => {
          this.i18n.mergeLocaleMessage(key, value);
        });
    }
    mergeMessages(messageList) {            
      if (messageList && messageList.length) {
        const i18nData = {};
        _.forEach(messageList, message => {
          i18nData[message[Constants.KEY_MESSAGE_ID]] = message[Constants.KEY_MESSAGE_TEXT];
        });
        this.i18n.mergeLocaleMessage(this.i18n.locale, i18nData);
      }
    }

}

export default I18N
