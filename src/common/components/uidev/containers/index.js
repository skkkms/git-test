import urPageContainer from './page/urPageContainer';
import urBoxContainer from './box/urBoxContainer';
import urListContainer from './list/urListContainer';
import urTabsContainer from './tab/urTabsContainer';
import urTabItemContainer from './tab/urTabItemContainer';
import urFormItemContainer from './form/urFormItemContainer';

export default {
  install(Vue) {
    Vue.component('ur-page-container', urPageContainer);
    Vue.component('ur-box-container', urBoxContainer);
    Vue.component('ur-list-container', urListContainer);
    Vue.component('ur-tabs-container', urTabsContainer);
    Vue.component('ur-tab-item-container', urTabItemContainer);
    Vue.component('ur-form-item-container', urFormItemContainer);
  },
};
