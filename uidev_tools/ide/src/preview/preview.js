import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueCookies from 'vue-cookies';
// import Vuex from 'vuex';
import store from '~system/vuex'
import I18n from '~system/i18n/I18n';
import HTTPClient from '~system/http/HTTPClient';
import CommonConstants from '~common/js/common-constants';

import FrameIde from '../ide/components/frame/FrameIde.vue'
import '~common/js/utils';
import '~common/components';
import '~assets/css/THEME-1/theme-1.scss';
import '../ide/ide.scss';

import 'suneditor/src/assets/css/suneditor.css';
import 'suneditor/src/assets/css/suneditor-contents.css';  

import messages from '/uidev_tools/ide/descriptors/ref-resources/ide-messages.json';

Vue.config.productionTip = false;

// Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.component('ide-frame', FrameIde);
Vue.prototype.$http = Axios;

const router = new VueRouter();
// const store = new Vuex.Store({});
const i18n = new I18n();
i18n.init('ko');
const instanceofI18n = i18n.getInstance();
instanceofI18n.mergeLocaleMessage("ko", messages.ko)
instanceofI18n.mergeLocaleMessage("en", messages.en)
const vue = new Vue({
  router,
  store,
  i18n: instanceofI18n,
  template: '<div id="app" class="uidev-ide"><ide-frame /></div>'
}).$mount('#app');


window.http = new HTTPClient(store.getters.getPageMetaMap);
window.CommonConstants = CommonConstants;
window.utils.install('getMessageById', (messageId) => {
  return instanceofI18n.messages[instanceofI18n.locale][messageId];
});
window.__uide__ = {
  Vue,
  vue,
  router,
  store,
  i18n: instanceofI18n,
  webpackRequire: __webpack_require__,
  webpackAlias: {
    '@': '/src', // node_modules 하위가 아닐 경우 '/'로 시작
    'vue$': 'vue/dist/vue.esm.js', // template 사용에 필요
    "~assets": '/src/assets',
    "~config": '/src/config',
    "~common": '/src/common',
    "~system": '/src/system',
    "~modules": '/src/modules',
    "~cm": '/src/modules/CM',
    "~aa": '/src/modules/AA',
    "images": '/src/assets/images',
    // "~bq": '/src/modules/BQ'),
    // "~pe": '/src/modules/PE'),
    '@uidev': 'uidev-component',
  },
  webpackScssPrependData: `@use "~@/assets/css/THEME-1/UR-STYLES/variables.scss" as var;`,
  config: {
    errorType: process.env.VUE_APP__ERROR_TYPE
  }
};
