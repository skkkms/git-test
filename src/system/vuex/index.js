import Vue from 'vue';
import Vuex from 'vuex';
import Constants from '~system/Constants';

Vue.use(Vuex)

const state = {
  mdiPages: [],
  activePage: null,  
  page_meta: {},
  user_apis: [],
  user_pages: [],
  portal_menus: [],
  menu_path: [],
  user_info: [],
  config_list: [],
  portal_messages: {},
  dataservice_map: {},
  isServerOn: true,
  isLoggedIn: false,
  locale: '',
  lnbShowed: false,
  lnbCollapsed: true,
  lnbExtended: false,
  lnbItemsCollapsed: true,
  lnbActiveMenu: 'menu',
  gnbShowed: true,
  httpReqCount: 0,
  common_data_services: {},
  linkpage_map: {},
  common_messages: [],
  applications: [],
  favoritesMenu: [],
  recentlyUsedMenu: [],
  applicationName: null,
  currentApplication: null,
  notice_list: [],
  app_notice_list: [],
  page_notice_list: [],
  app_agreement_list: [],
  page_agreement_list: [],
  cacheMap: {},
  workflowId: '',
  workflowName: '',
  workflowMonitoringDetails: {},
  convasRefresh: '',
  processTaskStandardId: '',
  selectedStatus: ''
}

const cachedMetaProperties = ['messageList', 'dataServiceList'];

const mutations = {
  setWorkflowId(state, workflowId){
    state.workflowId = workflowId;
  },
  setworkflowName(state, workflowName){
    state.workflowName = workflowName;
  },
  setprocessTaskStandardId(state, processTaskStandardId){
    state.processTaskStandardId = processTaskStandardId;
  },
  setselectedStatus(state, selectedStatus){
    state.selectedStatus = selectedStatus;
  },
  setworkflowRefresh(state, convasRefresh){
    state.convasRefresh = convasRefresh;
  },
  setWorkflowMonitoringDetails(state, workflowMonitoringDetails){
    state.workflowMonitoringDetails = workflowMonitoringDetails;
  },
  setServerState(state, isOn) {
    state.isServerOn = isOn;
  },
  setMenuData(state, data) {
    state.portal_menus = data;
  },
  setMessages(state, data) {
    state.portal_messages[data.lang] = data.message;
  },
  setPageMeta(state, data) {
    const pageInfo = data[Constants.KEY_PAGE_INFO];
    if (pageInfo.fromPageId) { // link page 처리      
      const sourceData = _.cloneDeep(data);
      sourceData[Constants.KEY_PAGE_INFO]['pageTitleMessageResourceId'] = data[Constants.KEY_PAGE_INFO]['sourcePageTitleMessageResourceId'];
      state.page_meta[pageInfo.fromPageId] = data; // link
      state.page_meta[pageInfo.pageId] = sourceData; 
    } else {
      state.page_meta[pageInfo.pageId] = data;  
    }
  },
  setCommonDataServices(state, data)  {
    state.dataservice_list = data;
  },
  updatePageMeta(state, data) {
    const pageInfo = data[Constants.KEY_PAGE_INFO];
    if (pageInfo.fromPageId) { // link page 처리
      const sourceData = _.clone(data);
      sourceData['pageTitleMessageResourceId'] = data['sourcePageTitleMessageResourceId'];

      cachedMetaProperties.forEach(cachedProp => {
        data[cachedProp] = state.page_meta[pageInfo.fromPageId][cachedProp];
        sourceData[cachedProp] = state.page_meta[pageInfo.pageId][cachedProp];
      });

      state.page_meta[pageInfo.fromPageId] = data;      
      state.page_meta[pageInfo.pageId] = sourceData;
    } else {
      cachedMetaProperties.forEach(cachedProp => {
        data[cachedProp] = state.page_meta[pageInfo.pageId][cachedProp];
      });
      state.page_meta[pageInfo.pageId] = data;
    }
  },
  addPage(state, newPage) {
    if (state.mdiPages.indexOf(newPage) < 0) {
      state.mdiPages.push(newPage);
    }
  },
  setCodeList(state, {pageId, codeId, codeList}) {
    if (state.page_meta[pageId]) {
      state.page_meta[pageId]['loadedCodes'][codeId] = codeList;
    }
  },
  removePage(state, page) {
    const index = state.mdiPages.indexOf(page);
    if (index >= 0) {
      let nextActivePage = null;
      if (state.activePage === page) {
        nextActivePage = state.mdiPages[index + 1];
        if (!nextActivePage) {
          nextActivePage = state.mdiPages[index - 1];
        }
        if (!nextActivePage) {
          nextActivePage = null;
        }
        if (state.activePage !== nextActivePage) {
          state.activePage = nextActivePage;
        }
      }
      state.mdiPages.splice(index, 1);
    }
  },
  setActivePage(state, page)  {
    if (state.activePage !== page) {
      state.activePage = page;
    }
  },
  setMenuPath(state, menuPath)  {
    state.menu_path = menuPath;
  },
  setCurrentApplication(state, application) {
    state.currentApplication = application;
  },
  setLocale(state, locale) {
    if (state.locale !== locale) {
        state.locale = locale;
    }
  },
  setCacheMap(state, data) {
    state.cacheMap[data.key] = data.value;
  },
  showGNB(state) {
    state.gnbShowed = true;    
  },
  hideGNB(state) {
    state.gnbShowed = false;    
  },
  showLNB(state) {
    state.lnbShowed = true;    
  },
  hideLNB(state) {
    state.lnbShowed = false;    
  },
  collapseLNB(state) {
    state.lnbCollapsed = true;    
  },
  expandLNB(state) {
    state.lnbCollapsed = false;
  },
  extendLNB(state) {
    state.lnbExtended = true;
  },
  shrinkLNB(state) {
    state.lnbExtended = false;
  },
  collapseLNBItems(state) {
    state.lnbItemsCollapsed = true;    
  },
  expandLNBItems(state) {
    state.lnbItemsCollapsed = false;
  },
  showLnbDefaultMenu() {
    state.lnbActiveMenu = 'menu';    
  },
  showLnbFavoriteMenu() {
    state.lnbActiveMenu = 'favorite';
  },  
  setLogin(state, loginData) {
    state.isLoggedIn = true;
    state.user_info = loginData.userInfo;
    state.config_list = loginData.configList;
    state.common_messages = loginData.messageList;
    const dataservices = {};
    loginData.dataServiceList.forEach(service => {
      dataservices[service.dataServiceId] = service;
    });
    state.dataservice_map = dataservices;

    const linkpages = {};
    loginData.linkPageList.forEach(linkpage => {
      linkpages[linkpage.pageId] = linkpage;
      const params = {};
      linkpage.pageParameter.forEach(parameter => {
        params[parameter.pageParameterName] = parameter.pageParameterValue;
      });
      linkpage.params = params;
    });
    state.linkpage_map = linkpages;
    
    const appNotices = [];
    const pageNotices = [];
    const appAgreements = [];
    const pageAgreements = [];

    if (loginData.noticeList) {
      loginData.noticeList.forEach(notice => {
        const isPageTarget = (notice.noticeApplyPageId && notice.noticeApplyPageId.trim() !== '')? true:false;
        if (isPageTarget) {
          pageNotices.push(notice);
        } else {
          appNotices.push(notice);
        }
      });
    }
    state.app_notice_list = appNotices;
    state.page_notice_list = pageNotices;
    state.notice_list = loginData.noticeList;
  },
  incHttpRequest(state) {
    state.httpReqCount = state.httpReqCount + 1;
  },
  decHttpRequest(state) {
    state.httpReqCount = state.httpReqCount - 1;
  },
  setApplications(state, applications) {
    state.applications = applications;
  },
  setFavoritesMenu(state, menu) {
    state.favoritesMenu = menu;
  },
  setRecentlyUsedMenu(state, menu) {
    state.recentlyUsedMenu = menu;
  },
}

const actions = {

}

const getters = {
  getPageMeta: state => pageID => {
    return state.page_meta[pageID];
  },
  getPageMetaMap: state => {
    return state.page_meta;
  },
  getCacheMap: state => {
    return state.cacheMap;
  },
  isServerOn: state => {
    return state.isServerOn;
  },
  isLnbShowed: state => {
    return state.lnbShowed;
  },
  isGnbShowed: state => {
    return state.gnbShowed;
  },
  userInfo: state => {
    return state.user_info;
  },
  configList: state => {
	return state.config_list;
  },
  linkPageMap: state => {
    return state.linkpage_map;
  }, 
  httpReqCount: state => {
    return state.httpReqCount;
  },
  dataservices: state => {
    return state.dataservice_map;
  },
  commonMessages: state => {
    return state.common_messages;
  },
  application: state => applicationId => {
    return _.find(state.applications, (application) => {
      return application.applicationId === applicationId;
    })
  },
  lnbShowed: state => {
    return state.lnbShowed;
  },
  lnbCollapsed: state => {
    return state.lnbCollapsed;
  },
  lnbExtended: state => {
    return state.lnbExtended;
  },
  lnbItemsCollapsed: state => {
    return state.lnbItemsCollapsed;
  },
  lnbMenuActivated: state => {
    return state.lnbActiveMenu === 'menu';
  },
  showLnbFavoriteActivated: state => {
    return state.lnbActiveMenu === 'favorite';
  },
  applicationName: state => {
    return state.currentApplication? state.currentApplication.applicationName:null;
  },
  applicationId: state => {
    return state.currentApplication? state.currentApplication.applicationId:null;
  },
  noticeList: state => {
    return state.notice_list;
  },
  appNoticeList: state => {
    return state.app_notice_list;
  },
  pageNoticeList: state => pageId => {
    return _.filter(state.page_notice_list, notice => { return notice.noticeApplyPageId === pageId });
  },  
  pageAgreement: state => pageId => {
    return _.filter(state.page_agreement_list, agreement => { return agreement.noticeApplyPageId === pageId });
  },
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
