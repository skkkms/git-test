import Vue from 'vue';
import VueRouter from 'vue-router';
import pageMap from '~config/pageMap';
import pubRoutes from '~system/router/pubRoutes';
import store from '../vuex';
import Constants from '../Constants';

class Router {
  constructor(mode, i18n) {
    this.mode = mode;
    this.i18n = i18n;
    this.router = null;
    Vue.use(VueRouter);
  }

  getInstance() {
    if (!this.router) {
      this.router = new VueRouter({
        mode: this.mode,
        routes: [...pageMap, ...pubRoutes],
      });
    }
    return this.router;
  }

  setPageLoader(pageLoader) {
    this.pageLoader = pageLoader;
  }

  checkAuth() {
    return store.state.isLoggedIn;
  }

  installAPI() {
    window.utils.install('goPage', this.goPage.bind(this));
    window.utils.install('goHome', this.goHome.bind(this));
    window.utils.install('goEmpty', this.goEmpty.bind(this));
  }

  init() {
    const router = this.getInstance();
    this.installAPI();

    router.beforeEach((to, from, next) => {
      let pageId = null;
      if (to.matched && to.matched.length) {
        const target = to.matched[0];
        if (target.props.default && target.props.default._routerlinkPageId) { // link인경우 prop에 임으로 넣어서 사용함
          pageId = target.path.split('/')[1];
          if (!pageId) { // 홈카드 처리
            pageId = target.props.default._routerlinkPageId;
          }
        } else if (target.name) { // link인 경우 name이 없음
          pageId = target.name;
        } else if (target.components) {
          pageId = target.components.default.name;
        }
      } else {
        pageId = to.name;
      }
      if (!pageId || pageId.indexOf('PGE_') === -1) { // redirect인경우 skip
        pageId = null;
      } else if (window.location.pathname.indexOf('/portal.html') > 0 && from.path === '/' && to.path !== '/') { // 새로고침 또는 첫 진입인 경우
        this.goHome();
      }

      if (pageId) {
        http.loadPageMeta(pageId, true).then(
          meta => {
            if (this.isPageBlocked(meta)) {
              window.$toast.makeToast(`${this.getPageBlockMessage(meta)}`);
            } else {
              // if (sourcePageId) { // link인경우, source가 되는 page 메타도 로드함
              //   http.loadPageMeta(sourcePageId, true).then(() => {
              //     next();
              //     utils.showNotices(meta.noticeList);
              //   }).catch(()=>{
              //     next();
              //   });
              // } else {
              //   next();
              //   utils.showNotices(meta.noticeList);
              // }
              next();
              utils.showNotices(meta.noticeList);
            }
          },
        ).catch(
          error => {
            next();
          },
        );
      } else {
        next(); // check validate
      }
    });
  }

  isValidRoutePath(pageId) {
    if (pageId && pageId.startsWith('PGE_')) {
      return true;
    }
    return false;
  }

  setMdiData(pageID) {
    if (store.state.mdiPages.indexOf(pageID) < 0) {
      store.commit('addPage', pageID);
    }
    if (store.state.activePage !== pageID) {
      store.commit('setActivePage', pageID);
    }
  }

  getPageState(pageMeta) {
    let state = Constants.STATE_PAGE_NORMAL;
    if (pageMeta && pageMeta[Constants.KEY_PAGE_INFO]) {
      state = pageMeta[Constants.KEY_PAGE_INFO][Constants.KEY_PAGE_INFO_STATE];
    }
    return state;
  }

  isPageBlocked(pageMeta) {
    if (pageMeta && (this.getPageState(pageMeta) === Constants.STATE_PAGE_BLOCK)) {
      return true;
    }
    return false;
  }

  getPageBlockMessage(pageMeta) {
    return pageMeta[Constants.KEY_PAGE_INFO][Constants.KEY_PAGE_INFO_BLOCK_MESSAGE];
  }

  goPage(pageId, params) {
    this.getInstance().push({
      path: pageId,
      // 화면전환시 query string 안보이게 수정
      //query: params,
      name: pageId,
      params: params,
    });
  }

  goHome() {
    if(this.getInstance().history.current.path !== '/'){
      store.commit('hideLNB');
      this.getInstance().push({
        path: '/',
      });
    }
  }

  goEmpty() {
    this.getInstance().push({
      path: '/Empty',
    });
  }
}

export default Router;
