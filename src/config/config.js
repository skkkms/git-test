// config 로딩
const env = process.env.NODE_ENV;
const production = env === 'production';
const publicPath = process.env.NODE_ENV === 'production' ? '/LEUIU/' : '/';
const currentTheme = process.env.THEME;
const wasEndPoint = require('./wasEndPoint.json')

export default {
  popupUrl: `popup.html`,
  // popupUrl: 'popup_' + currentTheme + '.html',
  popupTheme1Url: `popup_theme1.html`,
  popupTheme2Url: `popup_theme2.html`,
  popupTheme3Url: `popup_theme3.html`,
  popupTheme4Url: `popup_theme4.html`,
  publicPath,

  // 데이서 서비스 호출 URL
  dataService: {
    baseURL: production ? wasEndPoint[process.env.VUE_APP_WAS_ENV] : 'http://localhost:8090',
    // baseURL: 'http://localhost:8080',
  },
};
