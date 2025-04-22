import Axios from 'axios'
import systemConfig from '../../config/config';
import Constants from '../Constants';
import store from '~system/vuex';

const MAP_REST_TYPE = {
  G: 'get',
  P: 'post',
  T: 'put',
  O: 'option',
  D: 'delete',
  H: 'head',
  C: 'patch',
};

const dataServiceBaseUrl = systemConfig.dataService.baseURL;

const showToast = (serviceID, state) => {
  if (state === Constants.STATE_DATA_SERVICE_NO_AUTH || state === Constants.STATE_DATA_SERVICE_BLOCK) {
    utils.toast(`${serviceID} - ${utils.getMessageById('MSG_ALT_NOT_ALLOWED_REQ')}`);
  }
};

const getDefaultQuery = (pageId, dataServiceId) => {
  return {
    pageId,
    dataServiceId,
  };
};

const getDefaultHeaders = (pageId, dataServiceId, skipErrorHandler) => {
  const header = {
    'X-PortalId': store.getters.userInfo ? store.getters.userInfo.portalId : '',
    'X-TenantId': store.getters.userInfo ? store.getters.userInfo.tenantId : '',
    'X-PageId': pageId ? pageId : '',
    'X-DataServiceId': dataServiceId ? dataServiceId : '',
    'X-SkipErrorHandler': skipErrorHandler === (true || 'Y') ? 'Y' : 'N',
    'Authorization' : 'Bearer '+ (localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''),
  };
  return header;
};

const getAxiosConfig = (service, dataServiceParams, pageId, dataServiceId, skipErrorHandling) => {
  const method = MAP_REST_TYPE[service[Constants.KEY_DATA_SERVICE_TYPE]];
  const url = service[Constants.KEY_DATA_SERVICE_URL];

  // TODO: Consider the path parameters.
  const pathParams = dataServiceParams.path;
  let newUrl = url;
  if (pathParams) {
    _.forEach(pathParams, (value, key) => {
      newUrl = newUrl.replace(`{${key}}`, value);
    });
  }

  const data = dataServiceParams.data ? dataServiceParams.data : null;
  const userQueryParams = dataServiceParams.query ? _.clone(dataServiceParams.query) : [];
  const defaultQueryParams = getDefaultQuery(pageId, dataServiceId);
  const headers = getDefaultHeaders(pageId, dataServiceId, skipErrorHandling);
  const responseType = dataServiceParams.responseType ? dataServiceParams.responseType : 'json';
  const responseEncoding = dataServiceParams.responseEncoding ? dataServiceParams.responseEncoding : 'utf8';
  return {
    baseURL: dataServiceBaseUrl,
    method,
    url: newUrl,
    params: _.merge(defaultQueryParams, userQueryParams),
    headers,
    data,
    responseType,
    responseEncoding,
  };
};

const POPS_CODE_PREFIX = 'COD_POPS_'

class HTTPClient {
  constructor(pageMetaMap) {
    this.pageMetaMap = pageMetaMap;
    this.axios = new Axios.create({});
    this.setAxiosInceptor(this.axios);
    this.sessionExpired = false;
  }

  setAxiosInceptor(axios) {
    axios.interceptors.request.use(
      config => {
        store.commit('incHttpRequest');
        return config;
      },
      error => Promise.reject(error),
    );

    axios.interceptors.response.use(
      response => {
        store.commit('decHttpRequest');
        if (response.data.errorType && (!response.config.headers['X-SkipErrorHandler'] || response.config.headers['X-SkipErrorHandler'] === 'N')) {
          this.handleError(response.data);
        }
       const newToken = response.headers['authorization']
       if (newToken) {
         if (localStorage.getItem("accessToken") !== newToken) {
           localStorage.setItem("accessToken", newToken)
         }
       }
        return response;
      },
      error => {
        store.commit('decHttpRequest');
        if (!this.sessionExpired) {
          utils.messageBox('error', utils.getMessageById('MSG_ALT_ERR_CONTACT_ADMIN'));
        }
        return Promise.reject(error);
      },
    );
  }

  getStaticService(serviceId) {
    if (!this.staticServices) {
      this.staticServices = store.getters.dataservices;
    }
    return this.staticServices[serviceId];
  }

  getService(pageId, serviceId) {
    let service = null;
    const staticService = this.getStaticService(serviceId);
    if (staticService) {
      return staticService;
    }
    if (this.pageMetaMap[pageId]) {
      const dataServiceList = this.pageMetaMap[pageId][Constants.KEY_DATA_SERVICE_LIST];
      _.some(dataServiceList, dataService => {
        if (dataService[Constants.KEY_DATA_SERVICE_ID] === serviceId) {
          service = dataService;
          return true;
        }
        return false;
      });
    }
    return service;
  }

  getServiceAndState(pageId, serviceId) {
    let service = null;
    let state = Constants.STATE_DATA_SERVICE_NO_AUTH;
    const staticService = this.getStaticService(serviceId);
    if (staticService) {
      return {
        service: staticService,
        state: staticService[Constants.KEY_DATA_SERVICE_STATE],
      };
    }
    if (this.pageMetaMap[pageId]) {
      const dataServiceList = this.pageMetaMap[pageId][Constants.KEY_DATA_SERVICE_LIST];
      _.forEach(dataServiceList, dataService => {
        if (dataService[Constants.KEY_DATA_SERVICE_ID] === serviceId) {
          service = dataService;
          if (dataService[Constants.KEY_DATA_SERVICE_STATE] === 'N' || dataService[Constants.KEY_DATA_SERVICE_STATE] === 'D') {
            state = Constants.STATE_DATA_SERVICE_NORMAL;
          } else if (dataService[Constants.KEY_DATA_SERVICE_STATE] === 'B') {
            state = Constants.STATE_DATA_SERVICE_BLOCK;
          }
        }
      });
    }
    return {
      service,
      state,
    };
  }

  handleError(error) {
    // error = {
    //   code: "",
    //   errorMessage: "",
    //   exception: "",    
    //   errorType: "E",      
    //   httpStatus: 200,      
    //   exceptionLogId: ""
    // }    
    if (this.sessionExpired) {
      return;
    }

    if (error && error.errorType) { // 서버에서 정상적인 에러 메세지를 보낸경우
      const type = error.errorType;
      if (type === 'R') {
        window.location.href = error.errorMessage;
      } else if (type === 'E') {
        utils.messageBox('error', error.errorMessage, { title: error.exceptionLogId, content: error.exception });
      } else if (type === 'S') {
        this.sessionExpired = true;
        localStorage.setItem('accessToken', '');
        utils.messageBox('error', utils.getMessageById('MSG_ALT_SESSION_EXPIRED'), utils.getMessageById('MSG_ALT_SESSION_EXPIRED_DTL'), () => {
          window.location.href = error.errorMessage;
        });
      } else {
        utils.messageBox('error', error.errorMessage);
      }
    } else {
      utils.messageBox('error', utils.getMessageById('MSG_ALT_ERR_CONTACT_ADMIN'));
    }
  }

  request(pageId, dataServiceId, dataServiceParams = {}, bSkipErrorHandling = false) {
    const {
      service,
      state,
    } = this.getServiceAndState(pageId, dataServiceId);
    if (state === Constants.STATE_DATA_SERVICE_NO_AUTH) {
      // update app state
      showToast(dataServiceId, state);
      return Promise.reject(new Error('no auth'));
    }

    if (state === Constants.STATE_DATA_SERVICE_BLOCK) {
      // update app state
      showToast(dataServiceId, state);
      return Promise.reject(new Error('service is blocked'));
    }

    try {
      const config = getAxiosConfig(service, dataServiceParams, pageId, dataServiceId, bSkipErrorHandling);
      return new Promise((resolve, reject) => {
        this.axios(config).then(res => {
          let resData = res.data;

          // check if responseType of file download.
          if (config.responseType.indexOf("arraybuffer") >= 0) {

            let resStringData = null;
            /*
            if( window.TextDecoder){
              let enc = new window.TextDecoder("utf-8");
              resStringData = enc.decode( res.data);
            } else {
              let utf8 = unescape(encodeURIComponent(res.data));
              resStringData = new Uint8Array(utf8.length);
              for (var i = 0; i < utf8.length; i++) {
                resStringData[i] = utf8.charCodeAt(i);
              }
            }
            */
            resStringData = utils.arraybufferToEncodedString(res.data);
            if (resStringData.indexOf("errorType") >= 0) {
              resData = JSON.parse(utils.arraybufferToString(res.data));
            }
          }

          if (resData && resData.errorType) {
            reject(res);
          } else {
            resolve(res);
          }
        }).catch(err => {
          reject(err);
        });
      });
    } catch (error) {
      return Promise.reject(error)
    }
  }

  checkCodeAuth(pageId) {
    const codeService = this.getService(pageId, Constants.DATA_SERVICE_ID_CODE);
    if (codeService) {
      return true;
    }
    return false;
  }

  getSubModuleCode(pageId, moduleCode) {
    const query = getDefaultQuery(pageId, Constants.DATA_SERVICE_ID_CODE);
    query[Constants.PARAM_QUERY_PARENT_CODE] = moduleCode;
    const params = {
      path: {
        'code-id': `${Constants.CODE_PREFIX_SUB_MODULE}`,
      },
      query,
    }

    return new Promise((resolve, reject) => {
      this.request(pageId, Constants.DATA_SERVICE_ID_CODE, params).then(
        res => {
          _.forEach(res.data, code => {
            code.label = code.codeName;
            code.key = code.codeId;
            code.text = code.codeName;
            code.value = code.codeId;
          });
          resolve(res);
        }).catch(err => {
          reject(err);
        })
    });
  }

  mergeCodeList(pageId, codeKeyList, codes) {
    return new Promise((resolve, reject) => {
      this.getCodeList(pageId, codeKeyList)
        .then(res => {
          _.forEach(res, (value, codeKey) => {
            _.forEach(value, code => {
              if (codes[codeKey]) {
                codes[codeKey].push(code);
              }
            });
          });
          resolve(codes);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  loadCodeList(pageId, codeKeyList, codes) {
    return new Promise((resolve, reject) => {
      this.getCodeList(pageId, codeKeyList)
        .then(res => {
          _.forEach(res, (value, codeKey) => {
            const prevCode = codes[codeKey];
            const userCode = [];
            _.forEach(prevCode, (codeValue) => {
              if (codeValue.key) {
                userCode.push(codeValue);
              }
            })
            codes[codeKey] = [...userCode, ...value];
          });
          resolve(codes);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  loadChildCode (pageId, codeKey, parentsCode) {
    return new Promise((resolve, reject) => {
      http.request(pageId, 'DTS_CMZ_00001', {
        path: { 'code-id': codeKey },
        query: { parentsCodeValidityValue: parentsCode },
      }).then(res => {
        // for
        _.forEach(res.data, code => {
          code.label = code.codeName;
          code.key = code.codeId;
          code.text = code.codeName;
          code.value = code.codeId;
        });
        resolve(res)
      }).catch(error => {
        reject(error);
      })
    });
  }

  getGnbMenus() {
    const headers = getDefaultHeaders();
    const config = {
      baseURL: systemConfig.dataService.baseURL,
      method: 'get',
      url: `/api/v1/common/portal/applications`,
      headers,
    };

    return new Promise((resolve, reject) => {
      this.axios(config).then(res => {
        if (res.data.errorType) {
          reject(res);
        } else {
          const menus = [];
          res.data.forEach(menu => {
            menu.text = menu.applicationName;
            menus.push(menu);
          });
          resolve(menus);
        }
      }).catch(error => {
        reject(error);
      })
    });
  }

  getLnbMenu(applicationId) {
    const headers = getDefaultHeaders();
    const config = {
      baseURL: systemConfig.dataService.baseURL,
      method: 'get',
      url: `/api/v1/common/portal/menu/${applicationId}`,
      headers,
    };

    return new Promise((resolve, reject) => {
      this.axios(config).then(res => {
        if (res.data.errorType) {
          reject(res);
        } else {
          const map = {};
          let rootMenus = [];

          //make tree
          res.data.forEach(menu => {
            menu.children = [];
            menu.key = menu.menuUid;
            menu.opened = true;
            map[menu.menuUid] = menu;
            menu.text = menu.menuName;
            const pMenu = map[menu.parentsMenuUid];
            if (pMenu) {
              pMenu.children.push(menu);
              menu['_parent'] = pMenu;
            }
          });

          res.data.forEach(menu => {
            if (menu.menuLevel === 0) {
              rootMenus.push(menu);
            }
            if (menu.children.length) {
              menu.state = {
                selectable: false,
              }
            }
            menu.data = { ...menu };
            // menu.data = menu;
          });

          // DFS
          const DFSOrder = [];
          rootMenus.forEach(rootMenu => {
            const queue = [rootMenu];
            while (queue.length) {
              const menu = queue.shift();
              DFSOrder.push(menu);
              if (menu.children) {
                menu.children.forEach(child => {
                  queue.push(child);
                });
              }
            }
          });

          // prune
          rootMenus = [];
          _.forEachRight(DFSOrder, menu => {
            if (menu.folderYn === 'Y' && menu.children.length === 0) {
              const pMenu = menu._parent;
              if (pMenu) {
                pMenu.children.splice(pMenu.children.indexOf(menu), 1);
              }
            } else if (menu.menuLevel === 0) {
              rootMenus.push(menu);
            }
          });

          rootMenus = rootMenus.reverse();

          resolve(rootMenus);
        }
      }).catch(error => {
        reject(error);
      })
    });
  }

  getCodeList(pageId, codeKeyList, siteId) {
    if (!this.checkCodeAuth(pageId)) {
      return Promise.reject('no auth');
    }

    const codeList = {};
    const requests = [];
    const requestedCodes = [];
    _.forEach(codeKeyList, codeKey => {
      const isPopsCodeKey = this.isPopsCodeKey(codeKey)
      const dataServiceId = isPopsCodeKey ? Constants.DATA_SERVICE_ID_POPS_CODE : Constants.DATA_SERVICE_ID_CODE

      const dataServiceParams = {
        path: { 'code-id': isPopsCodeKey ? this.adjustPopsCodekey(codeKey) : codeKey },
        query: {},
      };
      requestedCodes.push(codeKey);
      if (siteId) {
        dataServiceParams.query.siteId = siteId;
      }
      requests.push(this.request(pageId, dataServiceId, dataServiceParams));
    });

    return new Promise((resolve, reject) => {
      Promise.all(requests).then(
        resList => {
          _.forEach(requestedCodes, (codeKey, index) => {
            if (resList.length === requestedCodes.length) {
              codeList[codeKey] = resList[index].data;
              _.forEach(codeList[codeKey], code => {
                code.label = code.codeName;
                code.key = code.codeId;
                code.text = code.codeName;
                code.value = code.codeId;
              });
            }
          });
          resolve(codeList);
        }).catch(err => {
          reject(err);
        });
    });
  }

  loadPageMeta(pageId, refreshMeta = false) {
    let pageID = pageId;
    if (typeof pageId === 'function') {
      pageID = pageID.name;
    }
    const headers = getDefaultHeaders();
    const config = {
      baseURL: systemConfig.dataService.baseURL,
      method: 'get',
      url: `/api/v1/common/meta/${pageID}`,
      headers,
    }
    const preLoadedPageMeta = store.getters.getPageMeta(pageID);
    if (preLoadedPageMeta) {
      config.params = { metaCached: 'Y' };
    }
    return new Promise((resolve, reject) => {
      if (preLoadedPageMeta && !refreshMeta) {
        resolve(preLoadedPageMeta);
      } else {
        this.axios(config)
          .then(res => {
            const pageMeta = res.data;
            const errorType = pageMeta === null ? null : res.data.errorType;
            if (errorType && errorType !== 'R' && errorType !== 'E' && errorType !== 'S') {
              utils.goEmpty();
              reject(res);
            } else if (pageMeta && pageMeta[Constants.KEY_PAGE_INFO]) {
              pageMeta.loadedCodes = {};
              if (res.config.params && res.config.params.metaCached === 'Y') {
                store.commit('updatePageMeta', pageMeta);
              } else {
                store.commit('setPageMeta', pageMeta);
                this.i18n.mergeMessages(pageMeta[Constants.KEY_MESSAGE_LIST]);
              }
              resolve(pageMeta);
            } else {
              reject("page is not exist");
            }
          })
          .catch(error => {
            store.commit('setServerState', false);
            reject(error);
          });
      }
    });
  }

  
  requestTest(method, url, dataParams = {}) {
    const headers = getDefaultHeaders();
    const config = {
      baseURL: systemConfig.dataService.baseURL,
      method: method,
      url: url,
      headers,
      data: dataParams.data,
      params: dataParams.query,
    }
    return new Promise((resolve, reject) => {
      this.axios(config)
        .then(res => {
          if (res.data.errorType) {
            reject(res);
          } else {
            resolve(res);
          }
        }).catch(error => {
          reject(error);
        });
    });
  }

  getAllPageList() {
    const headers = getDefaultHeaders();
    const config = {
      baseURL: systemConfig.dataService.baseURL,
      method: 'get',
      url: `/api/v1/common/pages`,
      headers,
    }
    return new Promise((resolve, reject) => {
      this.axios(config)
        .then(res => {
          if (res.data.errorType) {
            reject(res);
          } else {
            resolve(res);
          }
        }).catch(error => {
          reject(error);
        });
    });
  }

  setI18n(i18n) {
    this.i18n = i18n;
  }

  getFavoriteMenu() {
    return new Promise((resolve, reject) => {
      this.request('', 'DTS_CMP_00131')
        .then(res => {
          const menus = [];
          const menuMap = {};
          _.forEach(res.data, menu => {
            menu.text = menu.bookmarkName;
            menu.data = { ...menu };
            menu.children = [];
            menuMap[menu.bookmarkUid] = menu;
            if (utils.trim(menu.parentsBookmarkUid)) {
              menuMap[menu.parentsBookmarkUid].children.push(menu);
            } else {
              menus.push(menu);
            }
          });
          const menu = {
            text: utils.getMessageById('MSG_TXT_BKMK'),
            data: {
              iconclass: '-edit-favorites',
            },
            state: {
              selectable: false,
              expanded: true,
            },
            children: menus,
          }
          resolve(menu);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  getRecentelyUsedMenu() {
    return new Promise((resolve, reject) => {
      this.request('', 'DTS_CMP_00034')
        .then(res => {
          _.forEach(res.data, menu => {
            menu.text = menu.menuName;
            menu.data = { ...menu };
          });
          const menu = {
            text: utils.getMessageById('MSG_TXT_RECENT_MENU'),
            state: {
              selectable: false,
              expanded: true,
            },
            children: res.data,
          }
          resolve(menu);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  toggleFavorites(pageId) {
    return new Promise((resolve, reject) => {
      this.loadPageMeta(pageId, true).then(meta => {
        if (meta.bookmarkPageYn === 'Y') {
          this.removeFavorites(pageId).then(() => {
            resolve({
              pageId,
              state: false,
            });
          }).catch(error => {
            reject(error);
          });
        } else {
          this.addFavorites(pageId, utils.getMessageById(meta.pageInfo.pageTitleMessageResourceId)).then(() => {
            resolve({
              pageId,
              state: true,
            });
          }).catch(error => {
            reject(error);
          });
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  addFavorites(pageId, bookmarkName) {
    return this.request(pageId, 'DTS_CMP_00021', {
      data: {
        bookmarkName,
        pageId,
      }
    })
  }

  removeFavorites(pageId) {
    return this.request(pageId, 'DTS_CMP_00022', {
      query: {
        pageId,
      }
    })
  }

  getQuickLinks() {
    return new Promise((resolve, reject) => {
      this.request(null, 'DTS_CMP_00054', {}).then(res => {
        const menuMap = {};
        const menus = [];
        res.data.forEach(quickLink => {
          if (!menuMap[quickLink.applicationId]) {
            menuMap[quickLink.applicationId] = [];
          }
          menuMap[quickLink.applicationId].push(quickLink);
        });
        _.forEach(menuMap, (value, key) => {
          const app = store.getters.application(key);
          menus.push({ applicationId: key, title: app.applicationName, children: value });
        });
        resolve(menus);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getLinks(linkId) {
    return this.request(null, 'DTS_CMP_00125', {
      path: {
        'link-id': linkId,
      }
    })
  }

  isPopsCodeKey(codeKey) {
    return String(codeKey).startsWith(POPS_CODE_PREFIX)
  }

  adjustPopsCodekey(codeKey) {
    return codeKey.replace(POPS_CODE_PREFIX, '')
  }

  downloadByUrl(pageId, fileUrl, fileName = null) {
    const dataServiceId = 'DTS_AAX_00002'

    // =========== From request() ========== //
    const { service, state } = this.getServiceAndState(pageId, dataServiceId);
    if (state === Constants.STATE_DATA_SERVICE_NO_AUTH) {
      // update app state
      showToast(dataServiceId, state);
      return Promise.reject(new Error('no auth'));
    }

    if (state === Constants.STATE_DATA_SERVICE_BLOCK) {
      // update app state
      showToast(dataServiceId, state);
      return Promise.reject(new Error('service is blocked'));
    }
    // =========== From request() ========== //

    let action = service[Constants.KEY_DATA_SERVICE_URL]
    console.log(`action : ${action}`)
    action = `${action}?pageId=${pageId}&dataServiceId=${dataServiceId}`

    // form
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
    document.body.appendChild(form)

    // input : Authorization
    const inputAuth = document.createElement('input')
    inputAuth.setAttribute('type', 'hidden')
    inputAuth.setAttribute('name', 'Authorization')
    inputAuth.setAttribute('value', localStorage.getItem('accessToken'))
    form.appendChild(inputAuth)

    // input : fileUrl
    const inputFileUrl = document.createElement('input')
    inputFileUrl.setAttribute('type', 'hidden')
    inputFileUrl.setAttribute('name', 'fileUrl')
    inputFileUrl.setAttribute('value', fileUrl)
    form.appendChild(inputFileUrl)

    let inputFileName = null
    if (fileName) {
      inputFileName = document.createElement('input')
      inputFileName.setAttribute('type', 'hidden')
      inputFileName.setAttribute('name', 'fileName')
      inputFileName.setAttribute('value', encodeURI(fileName))
      form.appendChild(inputFileName)
    }

    form.submit()

    if (fileName) {
      inputFileName.remove()
    }
    inputFileUrl.remove()
    inputAuth.remove()
    form.remove()
  }

  
}

export default HTTPClient;
