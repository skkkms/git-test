import 'core-js'
import 'regenerator-runtime/runtime'
import _ from 'lodash';
// import '@babel/polyfill';
import './polyfills';
import './classList.min';
import UidJqwidgets from 'uid-jqwidgets';
// import UidJqwidgets from 'aui-jqwidgets';
import uidevComponent from 'uidev-component/index.js';
import {uidevGrid} from 'uidev-component';
//import { validator } from 'uidev-component';
import 'uidev-component/styles/uidev.direct.scss';
//import 'uidev-component/dist/uidev.css';
// import 'primevue/resources/primevue.min.css';
// import 'primevue/resources/themes/nova/theme.css';
import 'primeicons/primeicons.css';
import VeeValidate from 'vee-validate';
import moment from 'moment';
import Vue from 'vue';
import VTooltip from '~system/directives/tooltip';
import VTooltipWhite from '~system/directives/tooltip_white';
import utils from '~common/js/utils';
import DateFormatter from '~common/js/util/DateFormatter';
import I18n from '~system/i18n/I18n';
import store from '~system/vuex'
import Router from '~system/router/Router';
import HTTPClient from '~system/http/HTTPClient';
import modules from '~config/modules';
import pageMap from '~config/pageMap';
import PageLoader from '~system/page-loader/PageLoader';
import componentRegister from '~common/components/componentRegister';
import datasetUtil from '~common/js/util/datasetUtil';
import GridCellFactory from '~common/components/gridCell/GridCellFactory';
import tooltipOptions from './tooltipOptions';
import Directives from '~system/directives';
import CommonConstants from '~common/js/common-constants';
import DatasetMixin from '~common/components/form/SuiDatasetBase/DatasetMixin';
import systemConfig from '~config/config';

// TODO: Checks again that 'fdp-flat-ui'. The file path seems to have changed.
import '~assets/css/THEME-1/theme-1.scss';
import '~assets/css/scroller.css';
import 'suneditor/src/assets/css/suneditor.css';
import 'suneditor/src/assets/css/suneditor-contents.css';
import TextAreaPopup from '~common/components/form/SuiTextareaPopup/SuiTextareaPopup';

class AppInitializer {
  constructor() {
    this.pageMetaLoader = null;
    Vue.config.devtools = true;
    Vue.config.productionTip = true; // 배포에 대한 팁 출럭
    Vue.config.performance = true; // 브라우저 devtool의 타임라인에서 컴포넌트 초기화, 컴파일, 렌더링 및 패치 성능 추적을 활성화
    const http = new HTTPClient(store.getters.getPageMetaMap);

    // NOTE: S-EHS용. monday first 설정
    moment.locale('en', {
      week: {
        dow: 1,
      },
    });

    window._ = _;
    window.moment = moment;
    window.http = http;

    window.utils.install('findDataset', datasetUtil.findDataset);
    window.utils.install('getSelectedRow', datasetUtil.getSelectedRow);
    window.utils.install('printDatasetFieldsFromObject', datasetUtil.printDatasetFieldsFromObject);
    window.utils.install('loadPageMeta', http.loadPageMeta.bind(http));
    window.utils.install('openTextAreaEditor', (closeCallback, data) => {
      utils.openLayerPopup(TextAreaPopup,
        closeCallback,
        data,
      );
    });
    window.utils.install('createPortalComponent', (componentName, propsData) => {
      const componentClass = Vue.extend(utils.getComponentByName(componentName));
      if (componentClass) {
        const componentInstance = new componentClass({
          propsData,
        });
        componentInstance.$mount();
        utils.getComponentPortalContainer().appendChild(componentInstance.$el);
        componentInstance.$el.style.position = 'fixed';
        return componentInstance;
      }
      return null;
    });
    window.utils.install('activatePortalComponent', (portalComponent, targetElement, deactivateHandler, width) => {
      const bound = targetElement.getBoundingClientRect();
      const newStyle = {
        left: `${bound.left}px`,
        top: `${bound.top}px`,
        width: `${bound.width}px`,
      }
      if (width) {
        newStyle.width = `${width}px`;
      }
      const style = portalComponent.$el.style;
      if (style.left !== newStyle.left) {
        style.left = newStyle.left;
      }
      if (style.top !== newStyle.top) {
        style.top = newStyle.top;
      }
      if (style.width !== newStyle.width) {
        style.width = newStyle.width;
      }
      portalComponent.activate(targetElement);
      // utils.showEventBlocker(deactivateHandler);
    });
    window.utils.install('showMenual', pageId => {
      utils.openLayerPopup('PGE_CMU_00013', () => {}, {
        pageInitialData: {
          type: 'page',
          pageId: pageId,
        },
        size: 'lg',
      });
    });

    // FIXME: windows.utils로 모두 변경 후, 삭제 됩니다.
    window.util = {
      dateFormatter: DateFormatter,
      findDataset: datasetUtil.findDataset,
      getSelectedRow: datasetUtil.getSelectedRow,
      printDatasetFieldsFromObject: datasetUtil.printDatasetFieldsFromObject,
      getGridCellFactory() {
        return GridCellFactory;
      }
    };
  }

  initI18n() {
    const i18nClass = new I18n();
    i18nClass.init('ko');
    this.i18nClass = i18nClass;
    this.i18n = i18nClass.getInstance();
  }

  initRouter() {
    this.routerClass = new Router('hash', this.i18n);
    // this.routerClass = new Router('history', this.i18n);
    this.routerClass.init();
    this.router = this.routerClass.getInstance();
  }

  initPageLoader() {
    this.pageLoader = new PageLoader(this.router, this.i18n);
    this.pageLoader.installAPI();
    window.utils.install('getMessageById', (messageId) => {
      return this.i18n.messages[this.i18n.locale][messageId];
    });
    window.utils.install('getGridCellFactory', () => { return GridCellFactory });
    // GridCellFactory.installAPI();
    window.utils.install('openWindowPopup', (pageId, params = {}, title = pageId, options = {}) => {
      let nHeight = '';
      let nWidth = '';
      const defaultOptions = {
        location: 'no',
        menubar: 'no',
        status: 'no',
        toolbar: 'no',
        resizable: 'yes',
      };
      _.forEach(options, (value, key) => {
        defaultOptions[key] = value;
      });
      let openOptions = '';
      _.forEach(defaultOptions, (value, key) => {
        openOptions += `${key}=${value}, `;
        if (key === "height") {
          nHeight = value;
        }
        if (key === "width") {
          nWidth = value;
        }
      });

      let url = '';
      let queryString = '';
      if (typeof params === 'string') {
        queryString = `?${params}`;
      } else {
        _.forEach(params, (value, key) => {
          if (queryString === '') {
            queryString = `?${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });
      }

      // 윈도우 팝업 위치 계산
      // let curX = window.screenLeft;
      // let curY = window.screenTop;
      let curX = window.screenX || window.screenLeft || 0; // 현재창의 x좌표
      let curY = window.screenY || window.screenTop || 0; // 현재창의 y좌표

      let curWidth = document.body.clientWidth;
      let curHeight = document.body.clientHeight;

      let nLeft = curX + (curWidth / 2) - (nWidth / 2);
      let nTop = curY + (curHeight / 2) - (nHeight / 2);

      // let strOption = "";
      openOptions = '';
      openOptions += "left=" + nLeft + "px,";
      openOptions += "top=" + nTop + "px,";
      openOptions += "width=" + nWidth + "px,";
      openOptions += "height=" + nHeight + "px,";
      openOptions += "toolbar=no,menubar=no,location=no,";
      openOptions += "resizable=yes,status=no";

      if (pageId) {
        url = `${_.replace(systemConfig.publicPath, /^\/$/, '')}${systemConfig.popupTheme1Url}#/${pageId}${queryString}`;
        return window.open(url, `${title}_${Math.ceil(Math.random()*100)}`, openOptions);
      }
    });

    // FIXME: windows.utils 로 대체되면 삭제 예정.
    window.util.openLayerPopup = this.pageLoader.openLayerPopup.bind(this.pageLoader);
    window.util.loadPageMeta = http.loadPageMeta.bind(http);
    window.util.getAllPageList = this.pageLoader.getAllPageList.bind(this.pageLoader);
    window.util.getPageComponentById = this.pageLoader.getPageComponentById.bind(this.pageLoader);

    window.CommonConstants = CommonConstants;
  }

  initStore() {
    this.store = store;
  }

  getHomePageId() {
    let homepageId = utils.getConfigurationValue('CFG_CMP_HOME_PAGE_ID');
    return homepageId;
  }

  addLinkRoutes() {
    const routes = [];
    const linkpageMap = this.store.getters.linkPageMap;
    _.forEach(linkpageMap, (page) => {
      page.params.routerOriginPageId = page.pageId;
      routes.push({
        path: `/${page.pageId}`,
        component: utils.getPageComponentById(page.linkPageId),
        props: {
          _params: page.params,
          _routerlinkPageId: page.linkPageId, // add for linkpage
        },
      })
    });
    const homePageId = this.getHomePageId();
    routes.push({
      path: `/`,
      component: utils.getPageComponentById(homePageId),
      props: {
        _routerlinkPageId: homePageId,
      },
    });
    routes.push({
      path: `/Empty`,
      component: utils.getPageComponentById(utils.getConfigurationValue('CFG_CMZ_EMPTY_PAGE_ID')),
      props: {
        _routerlinkPageId: homePageId,
      },
    });
    this.router.addRoutes(routes);
  }

  addCommonMessages() {
    this.i18nClass.mergeMessages(this.store.getters.commonMessages);
  }

  init() {
    this.initI18n();
    this.initRouter();
    this.initPageLoader();
    this.initStore();
    this.routerClass.setPageLoader(this.pageLoader);
    http.setI18n(this.i18nClass);
    this.addLinkRoutes();
    this.addCommonMessages();
  }

  createVueApp(VueApp, loginData) {
    if (loginData) {
      store.commit('setLogin', loginData);
    }
    Vue.mixin(DatasetMixin)
    Vue.use(VeeValidate);
    Vue.use(UidJqwidgets);
    Vue.use(uidevComponent);
    Vue.use(uidevGrid);
    // Vue.use(FdpFlatUi, {VeeValidate: VeeValidate});
    Vue.use(VTooltip, tooltipOptions);
    Vue.use(VTooltipWhite, tooltipOptions);
    componentRegister.registCommonComponents();
    this.init();
    Directives.install();

    Vue.mixin({
      props: {
        _params: {
          type: Object,
          default: null,
        },
      },
      // beforeRouteEnter(to, from, next) {
      //   next(vm => {
      //     console.log(vm, vm.$options.name);
      //     vm.$options.name = 'custom';
      //     console.log(vm, vm.$options.name);
      //   });
      // },
      // beforeRouteLeave(to, from, next) {
      //   const isChanged = _.some(this.datasets, ds => {
      //     return ds.isChanged();
      //   });
      //   if (isChanged) {
      //     utils.messageBox('confirm', '저장되지 않은 데이터가 있습니다. 이동하시겠습니까?', '', () => {next(true)}, () => {next(false)});
      //   } else {
      //     next(true);
      //   }
      // },
      mounted() {
        const componentName = this.$options.name;
        if (componentName && componentName.length === 13 && componentName.split('PGE').length === 2) { // TODO : FIX ME
          this.$emit('component-mounted', this.$options.name);
        }
      },
    })

    // this.app = window.ideVueInstance = window.$vue = new Vue({
    //   render: h => h(VueApp),
    //   store,
    //   router: this.router,
    //   i18n: this.i18n,
    // }).$mount('#app')
    let systemTitle = utils.getConfigurationValue('CFG_CMP_SYSTEM_TITLE');

    document.title = systemTitle;

    this.app = new Vue({
      render: h => h(VueApp),
      store,
      router: this.router,
      i18n: this.i18n,
    }).$mount('#app')
  }

  getVueApp() {
    return this.app;
  }

  setVueApp(vueApp) {
    this.app = vueApp;
  }
}

export default AppInitializer;