import Vue from 'vue';
import axios from 'axios';
import pageMap from '~config/pageMap'
import store from '~system/vuex'
import Constants from '~system/Constants';
import systemConfig from '../../config/config';
import LayerPopup from '~common/components/form/SuiLayerPopup/SuiLayerPopup';

class PageMetaLoader {
  constructor (router, i18n) {
    this.router = router;
    this.i18n = i18n;
  }

  getPageComponentById(pageId) {
    let component = null;
    _.forEach(pageMap, route => {
      if (route.name === pageId) {
        component = route.component
      }
    });
    return component;
  }
  

  createComponentForVueApp(component, closeCallback, title, pageInitialData, size, width, height, titleMessageId) {
    const popupElem = document.createElement('div');
    document.body.appendChild(popupElem);
    const popupApp = new Vue({
      mounted() {
        this.checkRefCount = 0;
      },
      template: `
          <contents
            ref="contents"
            :pageComponent="pageComponent"
            :pageInitialData="pageInitialData"
            :closeCallback="onClose"
            :size="size"
            :width="width"
            :height="height"
            :title="title"/>
      `,
      components: {
        contents: LayerPopup,
      },
      data() {
        return {
          title: title? title : titleMessageId? this.$t(titleMessageId): '',
          pageInitialData: pageInitialData,
          size: size,
          width,
          height,          
          pageComponent: component,
        };
      },
      store,
      router: this.router,
      i18n: this.i18n,
      methods: {
        onClose(data) {
           if (closeCallback) {
             if (data instanceof MouseEvent) {
               closeCallback(null, pageInitialData);
             } else {
               closeCallback(data, pageInitialData);
             }
           }
           this.isModalShow = false;
           const el = this.$el;
           if (el) {
             this.$nextTick(() => {
              this.$refs.contents.$destroy();
              el.remove();
             });
           }
        },
      },
    }).$mount(popupElem);
  }

  openLayerPopup(target, closeCallback, { size, pageInitialData, title, width = null, height = null }) {
    let needLoadMeta = false;
    let component = target;
    if (typeof target === 'string') {
      needLoadMeta = true;
      component = this.getPageComponentById(target);
      if(pageInitialData) {
        pageInitialData.callingPageId = target;
      }
    }
    
    if (needLoadMeta) {
      return new Promise((resolve, reject) => {
        http.loadPageMeta(target)
          .then(meta => {          
            this.createComponentForVueApp(component, closeCallback, title, pageInitialData, size, width, height, meta.pageInfo.pageTitleMessageResourceId);
            resolve();
          }).catch(error => {
            reject(error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.createComponentForVueApp(component, closeCallback, title, pageInitialData, size, width, height);
        resolve();
      });
    }    
  }

  getAllPageList() {
    const config = {
      baseURL: systemConfig.dataService.baseURL,
      method : 'get',
      url: `/api/v1/common/pages`,
    }
    return axios(config);
  }

  getI18nDataFromPageMeta(data) {
    const messageList = data[Constants.KEY_MESSAGE_LIST];
    const i18nData = {};
    _.forEach(messageList, message => {
      i18nData[message[Constants.KEY_MESSAGE_ID]] = message[Constants.KEY_MESSAGE_TEXT];
    });
    return i18nData;
  }

  getPageBlockMessage(pageMeta) {
    return pageMeta[Constants.KEY_PAGE_INFO][Constants.KEY_PAGE_INFO_BLOCK_MESSAGE];
  }

  installAPI() {
    window.utils.install('openLayerPopup', this.openLayerPopup.bind(this));
    window.utils.install('getAllPageList', this.getAllPageList.bind(this));
    window.utils.install('getPageComponentById', this.getPageComponentById.bind(this));
  }
}

export default PageMetaLoader;
